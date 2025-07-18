import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';

import img1 from '../../assets/Img_Slider/1.jpg';
import img2 from '../../assets/Img_Slider/2.jpg';
import img3 from '../../assets/Img_Slider/3.jpg';
import img4 from '../../assets/Img_Slider/4.jpg';
import img5 from '../../assets/Img_Slider/5.jpg';
import img6 from '../../assets/Img_Slider/6.jpg';
import img7 from '../../assets/Img_Slider/7.jpg';

const backgrounds = [img1, img2, img3, img4, img5, img6, img7];

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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Transform Your Business with{' '}
              <span className="text-blue-300">FIDT Solutions</span>
            </h1>

            <p
              className={`text-xl text-blue-100 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 hover:opacity-80 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Leading technology solutions provider specializing in digital transformation, training, and innovative project development for businesses worldwide.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2">
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
