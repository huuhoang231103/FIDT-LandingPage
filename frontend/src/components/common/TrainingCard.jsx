import React from 'react';
import { FaClock } from 'react-icons/fa';
import SocialButton from '../common/SocialButton';

const TrainingCard = ({ 
  title, 
  category, 
  description, 
  highlights = [], 
  duration, 
  zaloUrl,
  facebookUrl,
  onContactClick
}) => {

  return (
    <div className="relative group h-full">
      {/* Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
      
      {/* Main Card */}
      <div className="relative bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-transparent h-full flex flex-col" style={{minHeight: '400px'}}>
        
        {/* Header */}
        <div className="p-4 flex-shrink-0" style={{minHeight: '120px'}}>
          {/* Title */}
          <div className="h-12 flex items-center justify-center mb-2">
            <h3 className="text-lg font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Category Tag */}
          <div className="flex justify-center">
            <span className="px-3 py-1 text-xs font-medium rounded-full 
              bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 
              text-blue-700 shadow-sm border border-blue-100">
              {category}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 flex-grow flex flex-col">
          <div className="mb-4">
            <p className="text-gray-600 text-center leading-relaxed text-sm">
              {description}
            </p>
          </div>

          {/* Highlights */}
          <div className="flex-grow mb-4">
            {highlights && highlights.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <ul className="text-sm text-gray-700 space-y-2">
                  {highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 flex-shrink-0 text-sm font-bold">✓</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex-shrink-0" style={{minHeight: '70px'}}>
          {/* Duration */}
          <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{duration || 'N/A'}</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-2">
            <SocialButton type="zalo" url={zaloUrl} />
            <SocialButton type="facebook" url={facebookUrl} />
            <SocialButton type="contact" onClick={onContactClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
