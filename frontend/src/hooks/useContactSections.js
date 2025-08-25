import { useEffect, useState, useCallback } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://thinhvuongtaichinh.net/backend').replace(/\/$/, '');

const useContactSections = () => {
  const [sections, setSections] = useState(["Chọn dịch vụ hoặc khóa học"]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/sections/get_sections.php`, { cache: 'no-store' });
      const data = await res.json();
      const list = Array.isArray(data?.data) ? data.data : [];
      setSections(["Chọn dịch vụ hoặc khóa học", ...list]);
      setLastUpdate(Date.now());
    } catch (e) {
      // fallback to default only
      setSections(["Chọn dịch vụ hoặc khóa học"]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const refresh = useCallback(() => load(), [load]);

  return { sections, loading, refresh, lastUpdate };
};

export default useContactSections;
