import React from 'react';
import { FaGift, FaStar, FaDownload, FaUsers, FaClock } from 'react-icons/fa';

const FreeServiceCard = ({ title, category, description, highlights = [], duration, onLearnMore }) => {
  return (
    <div className="relative group">
      {/* Gradient Border Animation */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
      
      <div className="relative bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-transparent">
        {/* Free Badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
          <FaGift className="inline mr-1" />
          MIỄN PHÍ
        </div>

        {/* Premium Stars */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-lg mx-0.5 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
          ))}
        </div>

        {/* Icon with Glow Effect */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            <FaDownload className="text-white text-2xl group-hover:animate-bounce" />
          </div>
        </div>

        {/* Title with Gradient */}
        <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h3>

        {/* Category Tag */}
        <div className="flex justify-center mb-4">
          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-4 leading-relaxed">
          {description}
        </p>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="mb-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
              <ul className="text-sm text-gray-700 space-y-1">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{duration || '30 phút'}</span>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-1 text-yellow-400" />
            <span>4.9/5</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onLearnMore}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
        >
          <FaDownload className="mr-2 group-hover:animate-bounce" />
          Tải ngay miễn phí
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            →
          </div>
        </button>

        {/* Floating Particles Effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-6 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-green-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default FreeServiceCard;