import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, category, description, fullDescription, isActive, onClick, onClose }) => {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 min-h-[400px] bg-white">
      {/* Nội dung mặc định - Tên dịch vụ */}
      <div 
        className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-all duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={onClick}
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-blue-600 opacity-80 uppercase tracking-wide mb-4">
          {category}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
        >
          Xem chi tiết
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Nội dung chi tiết - Ghi đè lên card */}
      <div className={`absolute inset-0 bg-white transition-all duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col">
          {/* Header với nút đóng */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 leading-tight">
                {title}
              </h3>
              <p className="text-xs text-blue-600 opacity-80">
                {category}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline text-xs">Quay lại</span>
            </button>
          </div>

          {/* Nội dung chi tiết */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {fullDescription}
            </div>
          </div>

          {/* Footer với CTA */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;