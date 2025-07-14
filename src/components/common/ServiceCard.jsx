import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image1 from '../../assets/image.png'; 

const ServiceCard = ({ title, category, onClick }) => {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow transition-all duration-300 hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Hình ảnh */}
      <img
        src={Image1}
        alt={title}
        className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Lớp phủ bóng mờ */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 z-10" />

      {/* Overlay đáy */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
        <div className="bg-blue-600 text-white px-5 py-4 flex justify-between items-center rounded-b-lg">
          <div>
            <p className="text-xs uppercase opacity-80 tracking-widest">{category}</p>
            <h3 className="text-sm md:text-base font-bold">{title}</h3>
          </div>
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
