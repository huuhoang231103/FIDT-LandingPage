import React from 'react';
import { FaGift, FaStar, FaFacebookF, FaClock } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

const FreeServiceCard = ({ title, category, description, highlights = [], duration, onLearnMore }) => {
  return (
    <div className="relative group h-full">
      {/* Gradient Border Animation */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
      
      <div className="relative bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-transparent h-full flex flex-col min-h-[320px]">
        {/* Free Badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce z-10">
          <FaGift className="inline mr-1" />
          MIỄN PHÍ
        </div>

        {/* Header Section */}
        <div className="p-4 flex-shrink-0">
          {/* Premium Stars */}
          <div className="flex justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-base mx-0.5 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
            ))}
          </div>

          {/* Icon with Glow Effect */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
              <FaGift className="text-white text-lg group-hover:animate-bounce" />
            </div>
          </div>

          {/* Title with Gradient */}
          <h3 className="text-lg font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {title}
          </h3>

          {/* Category Tag */}
          <div className="flex justify-center mb-3">
            <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>

        {/* Content Section - Flexible */}
        <div className="px-4 flex-grow flex flex-col">
          {/* Description */}
          <p className="text-gray-600 text-center mb-3 leading-relaxed text-sm">
            {description}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mb-3 flex-grow">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2 border border-green-200 h-full">
                <ul className="text-xs text-gray-700 space-y-1">
                  {highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-1 flex-shrink-0 text-xs">✓</span>
                      <span className="line-clamp-2">{highlight}</span>
                    </li>
                  ))}
                  {highlights.length > 2 && (
                    <li className="text-gray-500 text-xs italic">
                      +{highlights.length - 2} tính năng khác...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="p-4 flex-shrink-0">
          {/* Stats Row */}
          <div className="flex justify-between items-center mb-3 text-xs text-gray-500">
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{duration || '30 phút'}</span>
            </div>
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              <span>4.9/5</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Zalo Button */}
            <button
              onClick={() => window.open('https://zalo.me/your-zalo-id', '_blank')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-xs"
              title="Liên hệ qua Zalo"
            >
              <SiZalo className="text-sm group-hover:animate-bounce" />
            </button>

            {/* Facebook Button */}
            <button
              onClick={() => window.open('https://facebook.com/your-facebook-page', '_blank')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-xs"
              title="Liên hệ qua Facebook"
            >
              <FaFacebookF className="text-sm group-hover:animate-bounce" />
            </button>

            {/* Contact Form Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-xs"
              title="Gửi liên hệ"
            >
              <HiMail className="text-sm group-hover:animate-bounce" />
            </button>
          </div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-6 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-green-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default FreeServiceCard;