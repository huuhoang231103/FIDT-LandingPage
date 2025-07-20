import React, { useState } from 'react';
import ServiceCard from '../common/ServiceCard';
import servicesData from '../../datas/DataService.json';

const ProjectsServices = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const handleCardClose = () => {
    setActiveCard(null);
  };

  return (
    <section id="why-choose" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          <span className="text-blue-600">Sản phẩm và Dịch vụ</span> của chúng tôi
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
          Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              category={service.category}
              description={service.description}
              fullDescription={service.fullDescription}
              isActive={activeCard === idx}
              onClick={() => handleCardClick(idx)}
              onClose={handleCardClose}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsServices;