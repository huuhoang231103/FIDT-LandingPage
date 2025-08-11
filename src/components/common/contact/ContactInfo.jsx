// components/ContactInfo.jsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfo = ({ isVisible }) => {
  const contactItems = [
    { icon: Phone, title: "Số điện thoại", value: "0936 903 949", href: "tel:+84936903949" },
    { icon: Mail, title: "Email", value: "hana@thinhvuongtaichinh.net", href: "mailto:hana@thinhvuongtaichinh.net" },
    { icon: MapPin, title: "Địa chỉ", value: "54 Tuệ Tĩnh, Phường Phú Thọ, Thành phố Hồ Chí Minh", href: "https://maps.google.com/?q=54+Tue+Tinh,+Phu+Tho,+Ho+Chi+Minh" }
  ];

  return (
    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">
        Thông tin liên hệ
      </h3>
      <div className="bg-blue-200 p-6 rounded-2xl space-y-6 shadow-md">
        {contactItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : '_self'}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
            className="flex items-center group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-12 h-12 min-w-[3rem] min-h-[3rem] bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</p>
              <p className="text-gray-700">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;