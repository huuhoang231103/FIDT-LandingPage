import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

const SocialButton = ({ type, url, onClick, title, className = "" }) => {
  const buttonConfigs = {
    zalo: {
      icon: SiZalo,
      gradient: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      defaultTitle: "Liên hệ qua Zalo",
      defaultUrl: "https://zalo.me/0936903949"
    },
    facebook: {
      icon: FaFacebookF,
      gradient: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      defaultTitle: "Liên hệ qua Facebook",
      defaultUrl: "https://www.facebook.com/profile.php?id=100093331643195&mibextid=LQQJ4d"    
    },
    contact: {
      icon: HiMail,
      gradient: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      defaultTitle: "Gửi liên hệ"
    }
  };

  const config = buttonConfigs[type];
  if (!config) return null;

  const IconComponent = config.icon;

  const handleClick = () => {
    if (type === 'contact') {
      if (onClick) {
        try { onClick(); } catch (e) { /* no-op */ }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (onClick) {
      onClick();
    } else if (url || config.defaultUrl) {
      window.open(url || config.defaultUrl, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 bg-gradient-to-r ${config.gradient} text-white font-medium py-2 px-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-xs ${className}`}
      title={title || config.defaultTitle}
    >
      <IconComponent className="text-sm group-hover:animate-bounce" />
    </button>
  );
};

export default SocialButton;