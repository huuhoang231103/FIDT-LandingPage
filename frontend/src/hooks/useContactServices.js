// src/hooks/useContactServices.js
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook quản lý services/trainings từ backend sections API.
 * - GET  http://localhost:8000/sections/get_sections.php  -> { success:true, data: {...} }
 * - POST http://localhost:8000/sections/update_sections.php
 *    payloads supported:
 *      { index: -1, isNew: true, type: 'services'|'free_services'|'trainings', service: {...} }
 *      { index: N, type: 'services'|'free_services'|'trainings', service: {...} }  // edit
 *      { index: N, type: 'services'|'free_services'|'trainings', isDelete: true }   // delete
 *
 * IMPORTANT:
 * - If your backend requires auth via header token, pass `opts.adminToken` to the CRUD functions;
 *   these functions will set `X-Admin-Token` header (or rely on cookies if you prefer).
 */

const API_BASE = "http://localhost:8000/sections"; // adjust host/port if needed

const useContactServices = () => {
  const [rawData, setRawData] = useState(null); // full sections object
  const [serviceOptions, setServiceOptions] = useState(["Chọn dịch vụ hoặc khóa học"]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);
  const mountedRef = useRef(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    fetchSections();

    // optional auto-refresh every 30s (mirror behavior you had before)
    intervalRef.current = setInterval(() => {
      fetchSections().catch(() => {});
    }, 30000);

    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizeOptions = (data = {}) => {
    // combine services, free_services, trainings into single options array
    const out = [];

    const addArray = (arr) => {
      if (!Array.isArray(arr)) return;
      for (const item of arr) {
        // accept item as object { name, value? } or string
        if (item == null) continue;
        if (typeof item === "string") out.push(item.trim());
        else if (typeof item === "object") {
          // try name, label, title, value
          const name = item.name ?? item.label ?? item.title ?? item.value ?? "";
          if (name && String(name).trim()) out.push(String(name).trim());
        }
      }
    };

    addArray(data.services);
    addArray(data.free_services);
    addArray(data.trainings);

    // remove duplicates, keep order
    const seen = new Set();
    const unique = [];
    for (const v of out) {
      if (!seen.has(v)) {
        seen.add(v);
        unique.push(v);
      }
    }
    // always put placeholder first
    return ["Chọn dịch vụ hoặc khóa học", ...unique];
  };

  const fetchSections = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoadingServices(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/get_sections.php`, {
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();

      if (!json || (!json.success && !json.data && typeof json !== "object")) {
        throw new Error("Dữ liệu sections trả về không hợp lệ");
      }

      const data = json.data ?? json; // support different shapes
      if (mountedRef.current) {
        setRawData(data);
        setServiceOptions(normalizeOptions(data));
        setLastUpdate(Date.now());
      }
      return { success: true, data };
    } catch (err) {
      if (err.name === "AbortError") return { success: false, aborted: true };
      console.error("Lỗi khi tải sections:", err);
      if (mountedRef.current) setError(err.message || "Lỗi khi tải sections");
      return { success: false, error: err.message || String(err) };
    } finally {
      if (mountedRef.current) setIsLoadingServices(false);
    }
  }, []);

  // refresh alias
  const refreshServices = useCallback(() => {
    return fetchSections();
  }, [fetchSections]);

  // helper to call update endpoint
  const callUpdate = async (payload = {}, adminToken = null) => {
    try {
      const headers = { "Content-Type": "application/json" };
      if (adminToken) headers["X-Admin-Token"] = adminToken;
      const res = await fetch(`${API_BASE}/update_sections.php`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      const json = await res.json();
      if (!json || json.success !== true) {
        throw new Error(json?.message || "Update failed");
      }
      // refresh local state after successful update
      await fetchSections();
      return { success: true, message: json.message ?? "Cập nhật thành công", data: json };
    } catch (err) {
      console.error("Update error:", err);
      return { success: false, message: err.message ?? String(err) };
    }
  };

  /**
   * addItem({ type: 'services'|'free_services'|'trainings', item: {name, ...} })
   * The backend expects: { index: -1, isNew: true, type, service: item }
   * adminToken optional -> sent in header X-Admin-Token
   */
  const addItem = async ({ type = "services", item = {} } = {}, adminToken = null) => {
    if (!item || (typeof item !== "object")) return { success: false, message: "Missing item" };
    const payload = { index: -1, isNew: true, type, service: item };
    return await callUpdate(payload, adminToken);
  };

  /**
   * editItem({ type, index, item })
   * backend expects: { index: N, type, service: item }
   */
  const editItem = async ({ type = "services", index, item = {} } = {}, adminToken = null) => {
    if (typeof index !== "number") return { success: false, message: "Missing index" };
    if (!item || typeof item !== "object") return { success: false, message: "Missing item" };
    const payload = { index, type, service: item };
    return await callUpdate(payload, adminToken);
  };

  /**
   * deleteItem({ type, index })
   * backend expects: { index: N, type, isDelete: true }
   */
  const deleteItem = async ({ type = "services", index } = {}, adminToken = null) => {
    if (typeof index !== "number") return { success: false, message: "Missing index" };
    const payload = { index, type, isDelete: true };
    return await callUpdate(payload, adminToken);
  };

  /**
   * Convenience: add by name only
   */
  const addItemByName = async ({ type = "services", name = "" } = {}, adminToken = null) => {
    if (!name || !String(name).trim()) return { success: false, message: "Missing name" };
    const item = { name: String(name).trim(), visible: true };
    return await addItem({ type, item }, adminToken);
  };

  return {
    rawData, // the whole sections object (services, trainings, etc.)
    serviceOptions, // array of strings suitable for dropdowns
    isLoadingServices,
    lastUpdate,
    error,
    refreshServices,
    fetchSections, // direct access if needed
    addItem,
    addItemByName,
    editItem,
    deleteItem,
  };
};

export default useContactServices;
