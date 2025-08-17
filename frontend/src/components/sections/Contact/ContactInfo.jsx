import React, { useMemo } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  const contactItems = useMemo(
    () => [
      {
        icon: Phone,
        title: "Số điện thoại",
        value: "0936 903 949",
        href: "tel:+84936903949",
      },
      {
        icon: Mail,
        title: "Email",
        value: "hana@thinhvuongtaichinh.net",
        href: "mailto:hana@thinhvuongtaichinh.net",
      },
      {
        icon: MapPin,
        title: "Địa chỉ",
        value: "54 Tuệ Tĩnh, Phường Phú Thọ, TP. Hồ Chí Minh",
        href: "https://maps.google.com/?q=54+Tue+Tinh,+Phu+Tho,+Ho+Chi+Minh",
      },
    ],
    []
  );

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8">Thông tin liên hệ</h3>
      <div className="bg-blue-200 p-6 rounded-2xl space-y-6 shadow-md">
        {contactItems.map((item, i) => (
          <ContactItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

// Contact Info Item
const ContactItem = ({ icon: Icon, title, value, href }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : "_self"}
    rel={href.startsWith("http") ? "noopener noreferrer" : ""}
    className="flex items-center group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105"
  >
    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </p>
      <p className="text-gray-700">{value}</p>
    </div>
  </a>
);

export default ContactInfo;
