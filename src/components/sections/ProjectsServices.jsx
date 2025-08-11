import React, { useState, useEffect } from 'react';
import ServiceCard from '../common/ServiceCard';
import FreeServiceCard from '../common/FreeServiceCard';
import EditButton from '../common/EditButton';
import PopupEditService from '../common/PopupEditService';
import { FaUserTie, FaBuilding, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

// Map service categories to icons
const iconMap = {
  'Cá nhân': <FaUserTie className="text-blue-600 text-2xl" />,
  'Doanh nghiệp': <FaBuilding className="text-green-600 text-2xl" />,
  'Tài chính': <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
  'Đầu tư': <FaChartLine className="text-purple-500 text-2xl" />,
};

const ProjectsServices = ({ isLoggedIn }) => {
  const [activeCards, setActiveCards] = useState([]); // State for multiple active cards

  // Backend integrated state
  const [paidServices, setPaidServices] = useState([]);
  const [freeServices, setFreeServices] = useState([]);

  // Edit functionality state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState('services');

  // Normalize array data from backend
  const normalizeArrayFromBE = (arr = []) => {
    return arr.map((item, idx) => {
      const s = item && item.service ? item.service : item;
      return { ...s, __origIndex: idx };
    });
  };

  // Fetch services from backend
  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost/BE-LD/get_services.php', {
        credentials: 'include',
        cache: 'no-store',
      });
      const result = await res.json();
      if (result.success && result.data) {
        const beServices = result.data.services || [];
        const normalized = normalizeArrayFromBE(beServices);

        // Filter paid services
        setPaidServices(
          normalized.filter(
            s =>
              s.price !== 'Miễn phí' &&
              s.price !== 'Free' &&
              s.isFree !== true
          )
        );

        // Free services from backend
        const beFree = result.data.free_services || result.data.freeServices || [];
        const normalizedFree = normalizeArrayFromBE(beFree);
        setFreeServices(normalizedFree);
      } else {
        console.warn('get_services trả về không success:', result);
      }
    } catch (err) {
      console.error('Lỗi khi tải dịch vụ:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Toggle card open/close
  const handleCardClick = (key) => {
    setActiveCards((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Handle edit paid service
  const handleEditPaidService = (idx) => {
    const svc = paidServices[idx];
    if (!svc) return;
    const copy = JSON.parse(JSON.stringify(svc));
    delete copy.__origIndex;
    setEditData(copy);
    setEditIndex(svc.__origIndex);
    setEditType('services');
    setIsEditOpen(true);
  };

  // Handle edit free service
  const handleEditFreeService = (idx) => {
    const svc = freeServices[idx];
    if (!svc) return;
    const copy = JSON.parse(JSON.stringify(svc));
    delete copy.__origIndex;
    setEditData(copy);
    setEditIndex(svc.__origIndex);
    setEditType('free_services');
    setIsEditOpen(true);
  };

  // Handle save service
  const handleSaveService = async (payload) => {
    if (
      !payload ||
      typeof payload.index !== 'number' ||
      !payload.type ||
      !payload.service
    ) {
      alert('Dữ liệu gửi đi không hợp lệ.');
      return;
    }

    const serviceToSend = { ...payload.service };
    if (serviceToSend.__origIndex !== undefined) {
      delete serviceToSend.__origIndex;
    }
    if (serviceToSend.index !== undefined && payload.type === 'services') {
      delete serviceToSend.index;
    }

    try {
      const res = await fetch('http://localhost/BE-LD/update_service.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          index: payload.index,
          type: payload.type,
          service: serviceToSend,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchServices();
        setIsEditOpen(false);
        setEditData(null);
        setEditIndex(null);
        alert('Cập nhật thành công!');
      } else {
        alert(data.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      console.error('Error while updating service:', err);
      alert('Lỗi mạng hoặc server.');
    }
  };

  return (
    <section id="services" className="scroll-mt-24 py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden">
      {/* Enhanced professional background with new color scheme */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #0f172a 0%, #172554 25%, #1e3a8a 50%, #2563eb 75%, #3b82f6 100%)'}}>
        
        {/* Modern geometric patterns */}
        <div className="absolute inset-0">
          {/* Large geometric shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-2xl rotate-12" style={{animation: 'float 15s ease-in-out infinite'}}></div>
          <div className="absolute top-32 right-16 w-24 h-24 border border-blue-300/10 rounded-xl rotate-45" style={{animation: 'float 12s ease-in-out infinite', animationDelay: '3s'}}></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/8 rounded-3xl -rotate-12" style={{animation: 'float 18s ease-in-out infinite', animationDelay: '6s'}}></div>
          
          {/* Financial grid patterns */}
          <div className="absolute top-1/4 left-1/3 w-16 h-16 opacity-5">
            <div className="grid grid-cols-4 gap-1 h-full">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="bg-white rounded-sm" style={{animation: `pulse ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s`}}></div>
              ))}
            </div>
          </div>
          
          {/* Flowing data lines */}
          <div className="absolute top-1/3 right-1/4 w-48 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" style={{animation: 'slideRight 8s ease-in-out infinite'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{animation: 'slideLeft 10s ease-in-out infinite', animationDelay: '2s'}}></div>
          
          {/* Modern currency symbols */}
          <div className="absolute top-1/6 right-1/6 text-xl text-blue-300/15 font-light select-none" style={{animation: 'fadeFloat 12s ease-in-out infinite'}}>₿</div>
          <div className="absolute bottom-1/5 left-1/5 text-lg text-white/10 font-light select-none" style={{animation: 'fadeFloat 14s ease-in-out infinite', animationDelay: '4s'}}>$</div>
          <div className="absolute top-3/5 right-1/3 text-base text-blue-400/12 font-light select-none" style={{animation: 'fadeFloat 11s ease-in-out infinite', animationDelay: '7s'}}>€</div>
          
          {/* Subtle dot matrix */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
        </div>
        
        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-950/15 via-transparent to-slate-800/20"></div>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-15px) rotate(5deg); opacity: 0.6; }
        }
        @keyframes fadeFloat {
          0%, 100% { opacity: 0.08; transform: translateY(0px); }
          50% { opacity: 0.2; transform: translateY(-8px); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        @keyframes slideLeft {
          0% { transform: translateX(100px); opacity: 0; }
          50% { opacity: 0.2; }
          100% { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dịch vụ</span> của chúng tôi
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.
          </p>
        </div>

        {/* Free Services Section */}
        {freeServices.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            {/* Improved responsive container with better border radius */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/8 to-teal-500/12 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm border border-emerald-400/20 shadow-lg hover:shadow-xl transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
              
              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                    🎁 Ưu Đãi Đặc Biệt – Gói Tư Vấn Miễn Phí
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 px-2">
                    Trải nghiệm ngay dịch vụ tư vấn cá nhân hóa, hoàn toàn miễn phí – giúp bạn định
                    hướng rõ ràng và tự tin trong từng quyết định tài chính.
                  </p>
                </div>

                {/* Free service cards with improved responsive grid */}
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl w-full">
                    {freeServices.map((service, idx) => (
                      <div key={`free-${idx}`} className="relative">
                        <FreeServiceCard
                          title={service.name}
                          category={service.target || service.description}
                          description={service.description || 'Dịch vụ miễn phí hữu ích'}
                          highlights={service.highlights || []}
                          duration={service.duration}
                          zaloUrl={service.zaloUrl}
                          facebookUrl={service.facebookUrl}
                          onContactClick={() => console.log('Contact clicked for:', service.name)}
                        />
                        {isLoggedIn && (
                          <div className="absolute top-2 right-2 z-20">
                            <EditButton
                              onClick={() => handleEditFreeService(idx)}
                              className="text-xs px-2 py-1"
                              isVisible={isLoggedIn}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced divider with better responsive design */}
        {freeServices.length > 0 && paidServices.length > 0 && (
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10 px-4">
            <div className="flex-grow border-t border-gray-400/30 max-w-24 sm:max-w-48 md:max-w-xs"></div>
            <div className="mx-3 sm:mx-4 md:mx-6 text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide bg-gradient-to-r from-blue-600/80 to-indigo-600/80 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl md:rounded-full backdrop-blur-sm border border-blue-400/30 shadow-lg">
              <span className="hidden sm:inline">💼 </span>Dịch vụ Tư Vấn<span className="hidden md:inline"> Chuyên Nghiệp</span>
            </div>
            <div className="flex-grow border-t border-gray-400/30 max-w-24 sm:max-w-48 md:max-w-xs"></div>
          </div>
        )}

        {/* Paid Services Section with improved responsive design */}
        <div className="relative">
          {/* Enhanced background with better mobile adaptation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-indigo-600/12 to-slate-600/18 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm border border-blue-400/25 shadow-lg hover:shadow-xl transition-all duration-500 -m-2 sm:-m-4 md:-m-6"></div>
          <div className="absolute inset-0 bg-white/8 rounded-xl sm:rounded-2xl md:rounded-3xl -m-2 sm:-m-4 md:-m-6"></div>
          
          <div className="relative z-10 p-3 sm:p-4 md:p-6">
            {/* Improved responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {paidServices.map((service, idx) => {
                const {
                  name,
                  target,
                  highlights = [],
                  price,
                  bonus,
                  duration = 'Không xác định',
                  suitability = 'Chưa rõ',
                } = service;

                const description = highlights[0] || 'Chi tiết đang cập nhật...';

                const formattedHighlights = highlights.map((item) => `• ${item}`).join('\n');

                const fullDescription = [
                  `🕐 Thời lượng: ${duration}`,
                  `🔍 Nội dung nổi bật:\n${formattedHighlights}`,
                  `📌 Chi phí: ${price}`,
                  ...(bonus ? [`✅ Tặng kèm: ${bonus}`] : []),
                ].join('\n');

                const icon = iconMap[target] || <FaChartLine className="text-gray-400 text-2xl" />;

                return (
                  <div key={`paid-${idx}`} className="relative">
                    <ServiceCard
                      title={name}
                      category={target}
                      icon={icon}
                      description={description}
                      fullDescription={fullDescription}
                      isActive={activeCards.includes(`paid-${idx}`)}
                      onClick={() => handleCardClick(`paid-${idx}`)}
                      onClose={() => handleCardClick(`paid-${idx}`)}
                    />
                    {isLoggedIn && (
                      <div className="absolute top-2 right-2 z-20">
                        <EditButton
                          onClick={() => handleEditPaidService(idx)}
                          className="text-xs px-2 py-1"
                          isVisible={isLoggedIn}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Edit Service */}
      <PopupEditService
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(edited) => {
          handleSaveService({
            index: editIndex,
            type: editType,
            service: edited,
          });
        }}
        serviceData={editData}
        type={editType}
        index={editIndex}
      />
    </section>
  );
};

export default ProjectsServices;