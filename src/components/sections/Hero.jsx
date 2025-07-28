import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

// import img1 from '../../assets/Img_Slider/1.jpg';
import img2 from '../../assets/Img_Slider/2.jpg';
import img3 from '../../assets/Img_Slider/3.jpg';

const backgrounds = [img2, img3];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Show content animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // đổi ảnh mỗi 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden transition-all duration-1000"
    >
      {/* Backgrounds */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === bgIndex ? 'opacity-100 z-0' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Enhanced Overlay with new color scheme */}
      <div className="absolute inset-0 z-10">
        {/* Primary gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              #0f172a 0%, 
              #172554cc 25%, 
              #1e3a8a99 50%, 
              #2563eb66 75%, 
              #3b82f633 100%
            )`
          }}
        />
        
        {/* Secondary overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, 
              transparent 30%, 
              #0f172a55 70%, 
              #172554aa 100%
            )`
          }}
        />
        
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 4px
            )`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span 
                className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
                }}
              >
                Ms. Hana Trần
              </span> – Định hướng tài chính, dẫn lối tương lai
            </h1>

            <p
              className={`text-xl mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 hover:opacity-80 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ color: '#d1d5db' }}
            >
              Ms. Hana Trần là một chuyên gia tài chính đáng tin cậy, giúp bạn hiểu rõ tài chính cá nhân và xây dựng tương lai vững chắc.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button 
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)';
                  e.target.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
                  e.target.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
                }}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                className="font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: 'transparent',
                  border: '2px solid #d1d5db',
                  color: '#d1d5db'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#d1d5db';
                  e.target.style.color = '#172554';
                  e.target.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#d1d5db';
                  e.target.style.borderColor = '#d1d5db';
                }}
              >
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;