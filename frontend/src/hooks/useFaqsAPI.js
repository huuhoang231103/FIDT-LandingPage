// src/hooks/useFaqsAPI.js
import { useState, useEffect, useRef } from "react";

const API_BASE = `${(import.meta.env.VITE_API_BASE_URL || 'https://thinhvuongtaichinh.net/backend').replace(/\/$/, '')}/FAQ`;

const useFaqsAPI = () => {
  const [faqData, setFaqData] = useState([]); // [{ category, questions: [{question,answer}], __origIndex }]
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    fetchFaqs();
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizeFaqFromBE = (rawData = []) =>
    rawData.map((category, idx) => ({
      category: category.category ?? `Danh mục ${idx + 1}`,
      __origIndex: idx,
      ...Object.keys(category)
        .filter((k) => !["category", "questions"].includes(k))
        .reduce((acc, k) => ({ ...acc, [k]: category[k] }), {}),
      questions: (category.questions || []).map((q, qIdx) => ({
        question: q.question ?? "",
        answer: q.answer ?? "",
        __origIndex: qIdx,
        ...Object.keys(q)
          .filter((k) => !["question", "answer"].includes(k))
          .reduce((acc, k) => ({ ...acc, [k]: q[k] }), {}),
      })),
    }));

  const cleanCategoryForSend = (category) => {
    if (!category || typeof category !== "object") return category;
    const { __origIndex, ...restCat } = category;
    const cleaned = Object.keys(restCat).reduce((acc, k) => {
      if (k === "questions") {
        acc.questions = (restCat.questions || []).map((q) => {
          const { __origIndex: __q, ...restQ } = q || {};
          return restQ;
        });
      } else acc[k] = restCat[k];
      return acc;
    }, {});
    return cleaned;
  };

  const fetchFaqs = async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/get_faqs.php`, {
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();
      let faqArray = [];

      // Hỗ trợ nhiều format trả về
      if (result?.success && Array.isArray(result.data?.faqData)) {
        faqArray = result.data.faqData;
      } else if (result?.success && Array.isArray(result.data)) {
        faqArray = result.data;
      } else if (Array.isArray(result.faqData)) {
        faqArray = result.faqData;
      } else if (Array.isArray(result)) {
        faqArray = result;
      } else {
        throw new Error("Dữ liệu FAQ trả về không hợp lệ");
      }

      if (mountedRef.current) setFaqData(normalizeFaqFromBE(faqArray));
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Lỗi khi tải FAQ:", err);
      if (mountedRef.current) setError(err.message || "Lỗi khi tải FAQ");
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  };

  /**
   * updateCategory -> cập nhật toàn bộ 1 category
   * payload: { categoryIndex: number, categoryData: object }
   * backend expects: { type: 'faqData', categoryIndex, categoryData }
   */
  const updateCategory = async ({ categoryIndex, categoryData }) => {
    if (typeof categoryIndex !== "number" || !categoryData || typeof categoryData !== "object") {
      throw new Error("Dữ liệu gửi đi không hợp lệ.");
    }
    const cleaned = cleanCategoryForSend(categoryData);
    const body = { type: "faqData", categoryIndex, categoryData: cleaned };

    const res = await fetch(`${API_BASE}/update_faq.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success) {
      await fetchFaqs();
      return { success: true, message: data.message || "Cập nhật thành công" };
    } else throw new Error(data.message || "Cập nhật thất bại");
  };

  /**
   * updateAllFaqs -> ghi đè toàn bộ faqData
   * body: { type: 'faqData_all', faqData: [...] }
   */
  const updateAllFaqs = async (newFaqArray) => {
    if (!Array.isArray(newFaqArray)) throw new Error("faqData không hợp lệ.");
    const cleaned = newFaqArray.map((c) => cleanCategoryForSend(c));
    const body = { type: "faqData_all", faqData: cleaned };

    const res = await fetch(`${API_BASE}/update_faq.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success) {
      await fetchFaqs();
      return { success: true, message: data.message || "Cập nhật toàn bộ FAQ thành công" };
    } else throw new Error(data.message || "Cập nhật thất bại");
  };

  /**
   * updateQuestion -> cập nhật 1 câu hỏi trong 1 category
   * updateQuestion(categoryIndex: number, questionIndex: number, newQuestion: {question,answer})
   */
  const updateQuestion = async (categoryIndex, questionIndex, newQuestion) => {
    if (typeof categoryIndex !== "number" || typeof questionIndex !== "number" || !newQuestion) {
      throw new Error("Dữ liệu gửi đi không hợp lệ.");
    }
    const currentCategory = faqData[categoryIndex];
    if (!currentCategory) throw new Error("Category không tồn tại");

    const updatedCategory = {
      ...currentCategory,
      questions: (currentCategory.questions || []).map((q, i) => (i === questionIndex ? { ...q, ...newQuestion } : q)),
    };

    return await updateCategory({ categoryIndex, categoryData: updatedCategory });
  };

  return {
    faqData,
    isLoading,
    error,
    fetchFaqs,
    updateCategory,
    updateAllFaqs,
    updateQuestion,
  };
};

export default useFaqsAPI;
