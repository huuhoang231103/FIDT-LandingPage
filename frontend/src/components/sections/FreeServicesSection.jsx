// components/sections/FreeServicesSection.jsx
import React from 'react';
import FreeServiceCard from '../common/FreeServiceCard';
import EditButton from '../common/EditButton';

const FreeServicesSection = ({
  freeServices = [],
  isLoggedIn = false,
  sectionTitles = {},
  onEditService,
  onEditTitle,
  onAddNewService,
  onDeleteService,
  editMode = false,
}) => {
  // Helper function for safe access of titles with fallback text
  const t = (key, fallback = '') => (sectionTitles && sectionTitles[key] ? sectionTitles[key] : fallback);

  if (freeServices.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/8 to-teal-500/12 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm border border-emerald-400/20 shadow-lg hover:shadow-xl transition-all duration-500"></div>
        <div className="absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8 relative">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
              {t('free_services_title', '🎁 Ưu Đãi Đặc Biệt – Gói Tư Vấn Miễn Phí')}
            </h3>

            {/* Edit free services title - only show in edit mode */}
            {isLoggedIn && editMode && (
              <div className="absolute right-2 top-0">
                <EditButton
                  onClick={() => onEditTitle && onEditTitle('free_services_title', t('free_services_title'))}
                  className="text-xs px-2 py-1"
                  isVisible={true}
                  title="Sửa tiêu đề free services"
                />
              </div>
            )}

            <p className="text-sm sm:text-base text-gray-300 px-2 relative">
              {t(
                'free_services_subtitle',
                'Trải nghiệm ngay dịch vụ tư vấn cá nhân hóa, hoàn toàn miễn phí – giúp bạn định hướng rõ ràng và tự tin trong từng quyết định tài chính.'
              )}
            </p>

            {/* Edit free services subtitle - only show in edit mode */}
            {isLoggedIn && editMode && (
              <div className="absolute right-2 top-10">
                <EditButton
                  onClick={() => onEditTitle && onEditTitle('free_services_subtitle', t('free_services_subtitle'))}
                  className="text-xs px-2 py-1"
                  isVisible={true}
                  title="Sửa phụ đề free services"
                />
              </div>
            )}
          </div>

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
                  {/* Edit button - only show in edit mode */}
                  {isLoggedIn && editMode && (
                    <div className="absolute top-2 right-2 z-20">
                      <EditButton
                        onClick={() => onEditService && onEditService(idx)}
                        className="text-xs px-2 py-1"
                        isVisible={true}
                      />
                    </div>
                  )}
                  {/* Delete button - only show in edit mode */}
                  {isLoggedIn && editMode && (
                    <div className="absolute top-2 left-2 z-20">
                      <button
                        onClick={() => onDeleteService && onDeleteService('free_services', idx)}
                        className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        title="Xóa dịch vụ miễn phí"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add New Free Service Button */}
              {isLoggedIn && editMode && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => onAddNewService && onAddNewService()}
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-emerald-400/50 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors duration-200 text-emerald-400 hover:text-emerald-300"
                  >
                    <span className="text-3xl mb-2">+</span>
                    <span className="text-sm font-medium">Thêm dịch vụ miễn phí</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeServicesSection;