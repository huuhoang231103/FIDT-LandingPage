import { useState, useEffect, useCallback } from 'react';

const useContactServices = () => {
  const [serviceOptions, setServiceOptions] = useState(["Chọn dịch vụ hoặc khóa học"]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  // Hàm load services với kiểm tra visibility
  const loadServices = useCallback(async () => {
    setIsLoadingServices(true);
    try {
      const allServices = [];
      
      // 1. Load services từ API
      const servicesResponse = await fetch('http://localhost:8000/service_apis/get_services.php');
      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        if (servicesData.success && servicesData.data) {
          // Thêm paid services
          if (servicesData.data.services) {
            servicesData.data.services.forEach(service => {
              if (service.name && service.visible !== false) {
                allServices.push(service.name);
              }
            });
          }
          
          // Thêm free services
          if (servicesData.data.free_services) {
            servicesData.data.free_services.forEach(service => {
              if (service.name && service.visible !== false) {
                allServices.push(service.name);
              }
            });
          }
        }
      }

      // 2. Kiểm tra section "Khóa học" có đang hiển thị không
      try {
        const sectionResponse = await fetch('http://localhost:8000/sections/get_sections.php');
        if (sectionResponse.ok) {
          const sectionData = await sectionResponse.json();
          if (sectionData.success && sectionData.data) {
            const coursesSection = sectionData.data.find(section => 
              section.name === "Khóa học" || section.id === "courses"
            );
            
            // Chỉ load courses nếu section đang ON
            if (coursesSection && coursesSection.visible !== false) {
              const trainingsResponse = await fetch('http://localhost:8000/trainings/get_trainings.php');
              if (trainingsResponse.ok) {
                const trainingsData = await trainingsResponse.json();
                if (trainingsData.success && trainingsData.data) {
                  trainingsData.data.forEach(course => {
                    if (course.name && course.visible !== false) {
                      allServices.push(course.name);
                    }
                  });
                }
              }
            }
          }
        }
      } catch (error) {
        console.log('Không thể kiểm tra section visibility:', error);
        // Fallback: load courses nếu không thể kiểm tra section
        try {
          const trainingsResponse = await fetch('http://localhost:8000/trainings/get_trainings.php');
          if (trainingsResponse.ok) {
            const trainingsData = await trainingsResponse.json();
            if (trainingsData.success && trainingsData.data) {
              trainingsData.data.forEach(course => {
                if (course.name && course.visible !== false) {
                  allServices.push(course.name);
                }
              });
            }
          }
        } catch (error) {
          console.log('Không thể load courses:', error);
        }
      }
      
      setServiceOptions(["Chọn dịch vụ hoặc khóa học", ...allServices]);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Lỗi khi load services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  // Load services khi component mount
  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Auto-refresh mỗi 30 giây để cập nhật thay đổi từ admin
  useEffect(() => {
    const interval = setInterval(() => {
      loadServices();
    }, 30000); // 30 giây

    return () => clearInterval(interval);
  }, [loadServices]);

  // Hàm refresh thủ công
  const refreshServices = useCallback(() => {
    loadServices();
  }, [loadServices]);

  return {
    serviceOptions,
    isLoadingServices,
    refreshServices,
    lastUpdate
  };
};

export default useContactServices;
