import React, { useState } from 'react';
import ServiceCard from '../common/ServiceCard';
import FreeServiceCard from '../common/FreeServiceCard'; // Import component mới
import servicesData from '../../datas/DataService.json';
import freeServicesData from '../../datas/dataFree.json'; // Import data free services

import { FaUserTie, FaBuilding, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const iconMap = {
  'Cá nhân': <FaUserTie className="text-blue-600 text-2xl" />,
  'Doanh nghiệp': <FaBuilding className="text-green-600 text-2xl" />,
  'Tài chính': <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
  'Đầu tư': <FaChartLine className="text-purple-500 text-2xl" />,
};

const ProjectsServices = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const handleCardClose = () => {
    setActiveCard(null);
  };

  // Tách riêng free services và paid services
  const freeServices = freeServicesData.freeServices; // Lấy từ file dataFree.json
  
  const paidServices = servicesData.services.filter(service => 
    service.price !== 'Miễn phí' && service.price !== 'Free' && service.isFree !== true
  );

  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          <span className="text-blue-600">Sản phẩm và Dịch vụ</span> của chúng tôi
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
          Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.
        </p>

        {/* Free Services Section */}
        {freeServices.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                🎁 Ưu Đãi Đặc Biệt – Gói Tư Vấn Miễn Phí
              </h3>
              <p className="text-gray-600">Trải nghiệm ngay dịch vụ tư vấn cá nhân hóa, hoàn toàn miễn phí – giúp bạn định hướng rõ ràng và tự tin trong từng quyết định tài chính.</p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
                {freeServices.map((service, idx) => (
                  <FreeServiceCard
                    key={`free-${idx}`}
                    title={service.name}
                    category={service.target}
                    description={service.highlights?.[0] || 'Dịch vụ miễn phí hữu ích'}
                    highlights={service.highlights?.slice(1) || []}
                    duration={service.duration}
                    onLearnMore={() => handleCardClick(`free-${idx}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        {freeServices.length > 0 && paidServices.length > 0 && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow border-t border-gray-300 max-w-xs"></div>
          <div className="mx-6 text-blue-900 font-semibold text-3xl tracking-wide">
            🎯 Dịch vụ Tư Vấn Chuyên Nghiệp
          </div>

            <div className="flex-grow border-t border-gray-300 max-w-xs"></div>
          </div>
        )}

        {/* Paid Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paidServices.map((service, idx) => {
            const {
              name,
              target,
              highlights = [],
              price,
              bonus,
              duration = 'Không xác định',
              suitability = 'Chưa rõ'
            } = service;

            const description = highlights[0] || 'Chi tiết đang cập nhật...';

            const formattedHighlights = highlights.map(item => `• ${item}`).join('\n');

            const fullDescription = [
              `🕐 Thời lượng: ${duration}`,
              `🔍 Nội dung nổi bật:\n${formattedHighlights}`,
              `📌 Chi phí: ${price}`,
              ...(bonus ? [`✅ Tặng kèm: ${bonus}`] : [])
            ].join('\n\n');

            const icon = iconMap[target] || <FaChartLine className="text-gray-500 text-2xl" />;

            return (
              <ServiceCard
                key={`paid-${idx}`}
                title={name}
                category={target}
                icon={icon}
                description={description}
                fullDescription={fullDescription}
                isActive={activeCard === `paid-${idx}`}
                onClick={() => handleCardClick(`paid-${idx}`)}
                onClose={handleCardClose}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsServices;