// hooks/useServicesAPI.js
import { useState, useEffect } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://thinhvuongtaichinh.net/backend').replace(/\/$/, '');

const useServicesAPI = () => {
  const [paidServices, setPaidServices] = useState([]);
  const [freeServices, setFreeServices] = useState([]);
  const [sectionTitles, setSectionTitles] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Chuẩn hóa mảng từ BE
  const normalizeArrayFromBE = (arr = []) => {
    return arr.map((item, idx) => {
      const s = item && item.service ? item.service : item;
      return { ...s, __origIndex: idx };
    });
  };

  // Lấy dịch vụ từ BE (giữ vị trí scroll)
  const fetchServices = async () => {
    const scrollY = window.scrollY;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/service_apis/get_services.php`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success && result.data) {
        const beServices = result.data.services || [];
        const normalized = normalizeArrayFromBE(beServices);

        setPaidServices(
          normalized.filter(
            s =>
              s.price !== 'Miễn phí' &&
              s.price !== 'Free' &&
              s.isFree !== true
          )
        );

        const beFree = result.data.free_services || result.data.freeServices || [];
        const normalizedFree = normalizeArrayFromBE(beFree);
        setFreeServices(normalizedFree);

        // Lấy section_titles
        if (result.data.section_titles) {
          setSectionTitles(result.data.section_titles);
        }

        setTimeout(() => {
          window.scrollTo(0, scrollY);
        }, 0);
      } else {
        setError('Dữ liệu trả về không hợp lệ');
      }
    } catch (err) {
      console.error('Lỗi khi tải dịch vụ:', err);
      setError(err.message || 'Lỗi khi tải dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật dịch vụ
  const updateService = async (payload) => {
    if (
      !payload ||
      (typeof payload.index !== 'number' && payload.index !== -1) ||
      !payload.type ||
      (!payload.service && !payload.isDelete) // Allow null service only for deletion
    ) {
      throw new Error('Dữ liệu gửi đi không hợp lệ.');
    }

    const serviceToSend = payload.service ? { ...payload.service } : null;

    if (serviceToSend && serviceToSend.__origIndex !== undefined) {
      delete serviceToSend.__origIndex;
    }
    if (serviceToSend && serviceToSend.index !== undefined && payload.type === 'services') {
      delete serviceToSend.index;
    }

    try {
      const res = await fetch(`${API_BASE}/service_apis/update_service.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          index: payload.index,
          type: payload.type,
          service: serviceToSend,
          isNew: payload.index === -1, // Flag to indicate new service
          isDelete: payload.isDelete || false, // Flag to indicate deletion
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        await fetchServices();
        const action = payload.isDelete ? 'Xóa' : (payload.index === -1 ? 'Thêm mới' : 'Cập nhật');
        return { success: true, message: `${action} thành công!` };
      } else {
        throw new Error(data.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      console.error('Error while updating service:', err);
      throw new Error(err.message || 'Lỗi mạng hoặc server.');
    }
  };

  // Cập nhật section_titles
  const updateSectionTitles = async (newTitles) => {
    if (!newTitles || typeof newTitles !== 'object') {
      throw new Error('section_titles không hợp lệ.');
    }

    try {
      const res = await fetch(`${API_BASE}/service_apis/update_service.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          type: 'section_titles',
          section_titles: newTitles,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        await fetchServices();
        return { success: true, message: 'Cập nhật tiêu đề thành công!' };
      } else {
        throw new Error(data.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      console.error('Error while updating section_titles:', err);
      throw new Error(err.message || 'Lỗi mạng hoặc server.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    paidServices,
    freeServices,
    sectionTitles,
    isLoading,
    error,
    fetchServices,
    updateService,
    updateSectionTitles,
  };
};

export default useServicesAPI;
