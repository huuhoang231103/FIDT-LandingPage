import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Testimonial from './components/sections/Testimonial';
import ProjectsServices from './components/sections/ProjectsServices';
import Training from './components/sections/Training';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact'; // Giữ nguyên đường dẫn gốc
import FAQ from './components/sections/FAQ';
import Popup from './components/common/Popup';

import backgroundImage from './assets/background_2.jpg';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    // Tránh lỗi khi localStorage không có sẵn (SSR)
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
  );
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsPopupOpen(false);
    // Hiện toast thành công
    setToast({ show: true, message: 'Đăng nhập thành công!' });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setIsLoggedIn(false);
    setToast({ show: true, message: 'Đã đăng xuất!' });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Toast thông báo */}
      {toast.show && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
          style={{ top: 'calc(64px + 16px)' }} // chiều cao header + khoảng cách
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded shadow">
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        onLoginClick={() =>
          isLoggedIn ? handleLogout() : setIsPopupOpen(true)
        }
        isLoggedIn={isLoggedIn}
      />

      <Hero />

      <div className="bg-white bg-opacity-80">
        <About isLoggedIn={isLoggedIn} />
        <WhyChooseUs isLoggedIn={isLoggedIn} />
        <Testimonial isLoggedIn={isLoggedIn} />
        <ProjectsServices isLoggedIn={isLoggedIn} />
        {/* <Training /> */}
        <Team isLoggedIn={isLoggedIn} />
      </div>

      <Contact isLoggedIn={isLoggedIn} />
      <FAQ isLoggedIn={isLoggedIn} />
      <Footer />

      {/* Popup đăng nhập */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;