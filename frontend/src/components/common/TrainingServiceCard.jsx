import React from 'react';
import { FaGift, FaClock } from 'react-icons/fa';
import SocialButton from './SocialButton';

const TrainingServiceCard = ({ 
  title, 
  duration, 
  level, 
  price,
  features = []
}) => {
  return (
    <div className="relative group h-full">
      <div className="relative bg-white rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-blue-100 h-full flex flex-col hover:scale-[1.02]">
        
        {/* Header */}
        <div className="p-4 flex-shrink-0">
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <FaGift className="text-white text-lg" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {title}
          </h3>

          {/* Level */}
          {level && (
            <p className="text-center text-sm text-gray-500 mb-1">
              {level}
            </p>
          )}

          {/* Price */}
          {price && (
            <p className="text-center text-blue-600 font-semibold mb-2">
              {price}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="px-4 flex-grow mb-4">
          {features.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <ul className="text-sm text-gray-700 space-y-2">
                {features.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 flex-shrink-0 text-sm font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          {/* Duration */}
          <div className="flex justify-center items-center text-xs text-gray-500 mb-3">
            <FaClock className="mr-1" />
            <span>{duration}</span>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-2">
            <SocialButton type="zalo" />
            <SocialButton type="facebook" />
            <SocialButton type="contact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingServiceCard;
