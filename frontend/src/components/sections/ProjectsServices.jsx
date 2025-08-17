// components/sections/ProjectsServices.js
import React, { useState } from 'react';
import ServiceCard from '../common/ServiceCard';
import FreeServicesSection from './FreeServicesSection';
import EditButton from '../common/EditButton';
import PopupEditService from '../common/PopupEditService';
import useServicesAPI from '../../hooks/useServicesAPI';
import { FaUserTie, FaBuilding, FaMoneyBillWave, FaChartLine, FaEdit, FaTimes } from 'react-icons/fa';

// Map service categories to icons
const iconMap = {
  'Cá nhân': <FaUserTie className="text-blue-600 text-2xl" />,
  'Doanh nghiệp': <FaBuilding className="text-green-600 text-2xl" />,
  'Tài chính': <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
  'Đầu tư': <FaChartLine className="text-purple-500 text-2xl" />,
};

const ProjectsServices = ({ isLoggedIn }) => {
  const [activeCards, setActiveCards] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Use custom hook for API operations
  const {
    paidServices,
    freeServices,
    isLoading,
    error,
    updateService,
    sectionTitles = {},
    updateSectionTitles,
  } = useServicesAPI();

  // Edit functionality state (services)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState('services');

  // Edit title modal state
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
  const [editingTitleKey, setEditingTitleKey] = useState(null);
  const [editingTitleValue, setEditingTitleValue] = useState('');
  const [isSavingTitle, setIsSavingTitle] = useState(false);

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
    try {
      const result = await updateService(payload);
      setIsEditOpen(false);
      setEditData(null);
      setEditIndex(null);
      alert(result.message || 'Cập nhật thành công');
    } catch (err) {
      alert(err.message || 'Lỗi khi cập nhật dịch vụ');
    }
  };

  // Handle delete service
  const handleDeleteService = async (type, index) => {
    const serviceType = type === 'services' ? 'paid service' : 'free service';
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa ${serviceType} này?`);
    
    if (!confirmDelete) return;

    try {
      const result = await updateService({
        index: index,
        type: type,
        service: null, // null indicates deletion
        isDelete: true
      });
      alert(result.message || 'Xóa thành công');
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa dịch vụ');
    }
  };

  // Handle add new service
  const handleAddNewService = (type) => {
    const newService = {
      name: 'Dịch vụ mới',
      target: 'Cá nhân',
      description: 'Mô tả dịch vụ mới',
      highlights: ['Tính năng 1', 'Tính năng 2'],
      price: 'Liên hệ',
      duration: '1-2 giờ',
      bonus: ''
    };

    setEditData(newService);
    setEditIndex(-1); // -1 indicates new service
    setEditType(type);
    setIsEditOpen(true);
  };

  // Open title edit modal
  const openEditTitle = (key, currentValue) => {
    setEditingTitleKey(key);
    setEditingTitleValue(currentValue ?? '');
    setIsEditTitleOpen(true);
  };

  // Save edited title
  const handleSaveTitle = async () => {
    if (!editingTitleKey) return;
    const trimmed = (editingTitleValue || '').trim();
    if (trimmed === '') {
      alert('Nội dung tiêu đề không được để trống.');
      return;
    }

    const newTitles = { ...(sectionTitles || {}) };
    newTitles[editingTitleKey] = trimmed;

    if (typeof updateSectionTitles !== 'function') {
      alert('Hàm cập nhật tiêu đề chưa có trong hook. Cần cập nhật hook.');
      return;
    }

    try {
      setIsSavingTitle(true);
      const res = await updateSectionTitles(newTitles);
      if (res && res.success === false) {
        throw new Error(res.message || 'Không thể cập nhật tiêu đề');
      }
      alert((res && res.message) || 'Cập nhật tiêu đề thành công');
      setIsEditTitleOpen(false);
      setEditingTitleKey(null);
      setEditingTitleValue('');
    } catch (err) {
      console.error('Lỗi cập nhật tiêu đề:', err);
      alert(err.message || 'Lỗi khi cập nhật tiêu đề');
    } finally {
      setIsSavingTitle(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section id="services" className="scroll-mt-24 py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">Đang tải dịch vụ...</div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="services" className="scroll-mt-24 py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400 text-xl">Lỗi: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  // helper: safe access of titles with fallback text
  const t = (key, fallback = '') => (sectionTitles && sectionTitles[key] ? sectionTitles[key] : fallback);

  return (
    <section id="services" className="scroll-mt-24 py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden">
      {/* Background (unchanged) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #172554 25%, #1e3a8a 50%, #2563eb 75%, #3b82f6 100%)' }}>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-2xl rotate-12" style={{ animation: 'float 15s ease-in-out infinite' }}></div>
          <div className="absolute top-32 right-16 w-24 h-24 border border-blue-300/10 rounded-xl rotate-45" style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '3s' }}></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/8 rounded-3xl -rotate-12" style={{ animation: 'float 18s ease-in-out infinite', animationDelay: '6s' }}></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 opacity-5">
            <div className="grid grid-cols-4 gap-1 h-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white rounded-sm" style={{ animation: `pulse ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/3 right-1/4 w-48 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" style={{ animation: 'slideRight 8s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ animation: 'slideLeft 10s ease-in-out infinite', animationDelay: '2s' }}></div>
          <div className="absolute top-1/6 right-1/6 text-xl text-blue-300/15 font-light select-none" style={{ animation: 'fadeFloat 12s ease-in-out infinite' }}>₿</div>
          <div className="absolute bottom-1/5 left-1/5 text-lg text-white/10 font-light select-none" style={{ animation: 'fadeFloat 14s ease-in-out infinite', animationDelay: '4s' }}>$</div>
          <div className="absolute top-3/5 right-1/3 text-base text-blue-400/12 font-light select-none" style={{ animation: 'fadeFloat 11s ease-in-out infinite', animationDelay: '7s' }}>€</div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-950/15 via-transparent to-slate-800/20"></div>
      </div>

      {/* CSS animations */}
      <style>{`
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
        {/* Edit Mode Toggle */}
        {isLoggedIn && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                editMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {editMode ? <FaTimes size={14} /> : <FaEdit size={14} />}
              {editMode ? 'Thoát chế độ chỉnh sửa' : 'Chế độ chỉnh sửa'}
            </button>
          </div>
        )}

        {/* Section Title (from JSON) */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t('main_title', 'Dịch vụ của chúng tôi')}
            </span>
          </h2>

          {/* edit main title button - only show in edit mode */}
          {isLoggedIn && editMode && (
            <div className="absolute right-0 top-0">
              <EditButton
                onClick={() => openEditTitle('main_title', t('main_title'))}
                className="text-xs px-2 py-1"
                isVisible={true}
                title="Sửa tiêu đề chính"
              />
            </div>
          )}

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            {t('main_subtitle', 'Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.')}
          </p>

          {/* edit subtitle button - only show in edit mode */}
          {isLoggedIn && editMode && (
            <div className="absolute right-0 top-12">
              <EditButton
                onClick={() => openEditTitle('main_subtitle', t('main_subtitle'))}
                className="text-xs px-2 py-1"
                isVisible={true}
                title="Sửa phụ đề"
              />
            </div>
          )}
        </div>

        {/* Free Services Section */}
        <FreeServicesSection
          freeServices={freeServices}
          isLoggedIn={isLoggedIn}
          sectionTitles={sectionTitles}
          onEditService={handleEditFreeService}
          onEditTitle={openEditTitle}
          onAddNewService={() => handleAddNewService('free_services')}
          onDeleteService={handleDeleteService}
          editMode={editMode}
        />

        {/* Divider with paid services title (from JSON) */}
        {freeServices.length > 0 && paidServices.length > 0 && (
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10 px-4 relative">
            <div className="flex-grow border-t border-gray-400/30 max-w-24 sm:max-w-48 md:max-w-xs"></div>
            <div className="mx-3 sm:mx-4 md:mx-6 text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide bg-gradient-to-r from-blue-600/80 to-indigo-600/80 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl md:rounded-full backdrop-blur-sm border border-blue-400/30 shadow-lg">
              <span className="hidden sm:inline">💼 </span>
              {t('paid_services_title', 'Dịch vụ Tư Vấn Chuyên Nghiệp')}
            </div>

            {/* edit paid services title - only show in edit mode */}
            {isLoggedIn && editMode && (
              <div className="absolute right-6 top-0">
                <EditButton
                  onClick={() => openEditTitle('paid_services_title', t('paid_services_title'))}
                  className="text-xs px-2 py-1"
                  isVisible={true}
                  title="Sửa tiêu đề paid services"
                />
              </div>
            )}

            <div className="flex-grow border-t border-gray-400/30 max-w-24 sm:max-w-48 md:max-w-xs"></div>
          </div>
        )}

        {/* Paid Services Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-indigo-600/12 to-slate-600/18 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm border border-blue-400/25 shadow-lg hover:shadow-xl transition-all duration-500 -m-2 sm:-m-4 md:-m-6"></div>
          <div className="absolute inset-0 bg-white/8 rounded-xl sm:rounded-2xl md:rounded-3xl -m-2 sm:-m-4 md:-m-6"></div>

          <div className="relative z-10 p-3 sm:p-4 md:p-6">
            {/* Add New Paid Service Button */}
            {isLoggedIn && editMode && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => handleAddNewService('services')}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <span className="text-lg">+</span>
                  Thêm dịch vụ mới
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {paidServices.map((service, idx) => {
                const { name, target, highlights = [], price, bonus, duration = 'Không xác định' } = service;
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
                    {/* Edit button - only show in edit mode */}
                    {isLoggedIn && editMode && (
                      <div className="absolute top-2 right-2 z-20">
                        <EditButton
                          onClick={() => handleEditPaidService(idx)}
                          className="text-xs px-2 py-1"
                          isVisible={true}
                        />
                      </div>
                    )}
                    {/* Delete button - only show in edit mode */}
                    {isLoggedIn && editMode && (
                      <div className="absolute top-2 left-2 z-20">
                        <button
                          onClick={() => handleDeleteService('services', idx)}
                          className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                          title="Xóa dịch vụ"
                        >
                          <FaTimes size={14} />
                        </button>
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

      {/* Modal: Edit Title */}
      {isEditTitleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h4 className="text-lg font-semibold mb-3">Chỉnh sửa tiêu đề</h4>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Key</label>
              <input value={editingTitleKey || ''} readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Nội dung</label>
              <textarea
                value={editingTitleValue}
                onChange={(e) => setEditingTitleValue(e.target.value)}
                className="w-full p-2 border rounded h-28"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditTitleOpen(false);
                  setEditingTitleKey(null);
                  setEditingTitleValue('');
                }}
                className="px-4 py-2 rounded border"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveTitle}
                disabled={isSavingTitle}
                className={`px-4 py-2 rounded text-white ${isSavingTitle ? 'bg-gray-400' : 'bg-blue-600'}`}
              >
                {isSavingTitle ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsServices;