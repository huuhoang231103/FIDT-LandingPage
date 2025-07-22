import React, { useState } from 'react';
import ServiceCard from '../common/ServiceCard';
import servicesData from '../../datas/DataService.json';

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

  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          <span className="text-blue-600">Sản phẩm và Dịch vụ</span> của chúng tôi
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
          Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.map((service, idx) => {
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
              `🎯 Phù hợp với: ${suitability}`,
              `🔍 Nội dung nổi bật:\n${formattedHighlights}`,
              `📌 Chi phí: ${price}`,
              ...(bonus ? [`✅ Tặng kèm: ${bonus}`] : [])
            ].join('\n\n');

            const icon = iconMap[target] || <FaChartLine className="text-gray-500 text-2xl" />;

            return (
              <ServiceCard
                key={idx}
                title={name}
                category={target}
                icon={icon}
                description={description}
                fullDescription={fullDescription}
                isActive={activeCard === idx}
                onClick={() => handleCardClick(idx)}
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
