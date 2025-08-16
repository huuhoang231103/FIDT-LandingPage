import React, { useState } from 'react';

const SectionVisibilityToggle = ({ 
  sectionVisibility = {}, 
  onToggleSection = () => {}, 
  onShowAll = () => {}, 
  onHideAll = () => {},
  navLinkVisibility = {},
  onToggleNavLink = () => {},
  onShowAllNavLinks = () => {},
  onHideAllNavLinks = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' or 'navLinks'

  const sections = [
    { key: 'header', name: 'Header' },
    { key: 'about', name: 'Giới thiệu' },
    { key: 'whyChooseUs', name: 'Tại sao chọn chúng tôi' },
    { key: 'testimonial', name: 'Đánh giá khách hàng' },
    { key: 'services', name: 'Dịch vụ' },
    { key: 'training', name: 'Khóa học' },
    { key: 'team', name: 'Ms. Hana Tran' },
    { key: 'contact', name: 'Liên hệ' },
    { key: 'faq', name: 'Câu hỏi thường gặp' },
    { key: 'footer', name: 'Footer' }
  ];

  const navLinks = [
    { key: 'home', name: 'Trang chủ' },
    { key: 'about', name: 'Giới thiệu' },
    { key: 'whyChoose', name: 'Tại sao chọn Ms. Hana Tran?' },
    { key: 'services', name: 'Dịch vụ' },
    { key: 'team', name: 'Ms. Hana Tran' },
    { key: 'contact', name: 'Liên hệ' },
    { key: 'training', name: 'Khóa học' },
    { key: 'faq', name: 'Câu hỏi thường gặp' },
  ];

  const visibleSectionsCount = Object.values(sectionVisibility || {}).filter(Boolean).length;
  const totalSectionsCount = sections.length;
  
  // Sửa logic đếm navigation links - chỉ đếm những items có giá trị true
  const visibleNavLinksCount = navLinks.filter(link => (navLinkVisibility || {})[link.key] !== false).length;
  const totalNavLinksCount = navLinks.length;

  return (
    <div className="fixed top-20 right-4 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        title="Quản lý hiển thị các phần"
      >
        <span className="text-sm">⚙️</span>
        <span className="text-sm font-medium">
          {visibleSectionsCount}/{totalSectionsCount}
        </span>
        <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-72 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-sm">⚙️</span>
              Quản lý hiển thị
            </h3>
            
            {/* Tab Navigation */}
            <div className="flex mb-3 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('sections')}
                className={`flex-1 py-2 px-3 text-xs font-medium transition-colors ${
                  activeTab === 'sections'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📄 Phần nội dung
              </button>
              <button
                onClick={() => setActiveTab('navLinks')}
                className={`flex-1 py-2 px-3 text-xs font-medium transition-colors ${
                  activeTab === 'navLinks'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🔗 Liên kết
              </button>
            </div>

            {/* Sections Tab */}
            {activeTab === 'sections' && (
              <>
                {/* Quick Actions for Sections */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={onShowAll}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded transition-colors"
                  >
                    Hiện tất cả
                  </button>
                  <button
                    onClick={onHideAll}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors"
                  >
                    Ẩn tất cả
                  </button>
                </div>
                
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div
                      key={section.key}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{section.name}</span>
                      </div>
                      
                      <button
                        onClick={() => onToggleSection(section.key)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          (sectionVisibility || {})[section.key]
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        title={(sectionVisibility || {})[section.key] ? 'Ẩn phần này' : 'Hiện phần này'}
                      >
                        {(sectionVisibility || {})[section.key] ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary for Sections */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Hiển thị:</span>
                    <span className="font-medium">
                      {visibleSectionsCount} / {totalSectionsCount} phần
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Links Tab */}
            {activeTab === 'navLinks' && (
              <>
                {/* Quick Actions for Nav Links */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={onShowAllNavLinks}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded transition-colors"
                  >
                    Hiện tất cả
                  </button>
                  <button
                    onClick={onHideAllNavLinks}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors"
                  >
                    Ẩn tất cả
                  </button>
                </div>
                
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <div
                      key={link.key}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{link.name}</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          console.log('Toggling nav link:', link.key, 'current value:', (navLinkVisibility || {})[link.key]);
                          onToggleNavLink(link.key);
                        }}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          (navLinkVisibility || {})[link.key] !== false
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        title={(navLinkVisibility || {})[link.key] !== false ? 'Ẩn liên kết này' : 'Hiện liên kết này'}
                      >
                        {(navLinkVisibility || {})[link.key] !== false ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary for Nav Links */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Hiển thị:</span>
                    <span className="font-medium">
                      {visibleNavLinksCount} / {totalNavLinksCount} liên kết
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionVisibilityToggle;