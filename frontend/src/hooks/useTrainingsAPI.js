import { useState, useEffect } from "react";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://thinhvuongtaichinh.net/backend").replace(/\/$/, "");

const useTrainingsAPI = () => {
  const [trainings, setTrainings] = useState([]);
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingSubtitle, setTrainingSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizeArrayFromBE = (arr = []) => {
    return arr.map((item, idx) => {
      const t = item && item.training ? item.training : item;
      return { ...t, __origIndex: idx };
    });
  };

  /** Lấy danh sách trainings + tiêu đề từ BE */
  const fetchTrainings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE}/trainings/get_trainings.php`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();

      // Kỳ vọng API trả: { success: true, data: [...], trainingTitle, trainingSubtitle }
      if (result.success && Array.isArray(result.data)) {
        setTrainings(normalizeArrayFromBE(result.data));
        setTrainingTitle(result.trainingTitle || "");
        setTrainingSubtitle(result.trainingSubtitle || "");
      } else {
        setError("Dữ liệu trả về không hợp lệ");
      }
    } catch (err) {
      console.error("Lỗi khi tải training:", err);
      setError(err.message || "Lỗi khi tải training");
    } finally {
      setIsLoading(false);
    }
  };

  /** Cập nhật 1 khóa học */
  const updateTraining = async (payload) => {
    try {
      const res = await fetch(
        `${API_BASE}/trainings/update_training.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...payload,
            isNew: payload.index === -1, // Flag to indicate new training
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.success) {
        const action = payload.isDelete ? 'Xóa' : (payload.index === -1 ? 'Thêm mới' : 'Cập nhật');
        alert(`${action} khóa học thành công!`);
        await fetchTrainings();
      } else {
        throw new Error(data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      console.error("Error while updating training:", err);
      alert(err.message || "Lỗi mạng hoặc server.");
      throw err;
    }
  };

  /** Cập nhật tiêu đề + subtitle */
  const updateTrainingHeader = async (title, subtitle) => {
    try {
      const res = await fetch(
        `${API_BASE}/trainings/update_training.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            trainingTitle: title,
            trainingSubtitle: subtitle,
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.success) {
        setTrainingTitle(title);
        setTrainingSubtitle(subtitle);
        alert("Cập nhật tiêu đề thành công!");
      } else {
        throw new Error(data.message || "Cập nhật tiêu đề thất bại");
      }
    } catch (err) {
      console.error("Error while updating training header:", err);
      alert(err.message || "Lỗi mạng hoặc server.");
      throw err;
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return {
    trainings,
    trainingTitle,
    trainingSubtitle,
    isLoading,
    error,
    fetchTrainings,
    updateTraining,
    updateTrainingHeader,
    setTrainingTitle,
    setTrainingSubtitle,
  };
};

export default useTrainingsAPI;
