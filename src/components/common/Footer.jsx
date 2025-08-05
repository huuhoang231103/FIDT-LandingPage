import React from 'react';
import { Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <p className="text-white mb-6 max-w-md">
              Đồng hành cùng bạn trên hành trình làm chủ tài chính cá nhân.<br />
              Ms. Tran – chuyên gia tài chính đồng hành cùng bạn xây dựng tương lai vững chắc.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100093331643195&mibextid=LQQJ4d"
                className="text-white hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me/0936903949"
                className="text-white hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zalo
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white hover:text-blue-400 transition-colors">Giới thiệu</a></li>
              <li><a href="#why-choose" className="text-white hover:text-blue-400 transition-colors whitespace-nowrap">
                  Tại sao chọn Ms. Tran?
                </a>
              </li>
              <li><a href="#services" className="text-white hover:text-blue-400 transition-colors">Dịch vụ</a></li>
              {/* <li><a href="#team" className="text-white hover:text-blue-400 transition-colors">Ms. Hana Tran</a></li> */}
              <li><a href="#contact" className="text-white hover:text-blue-400 transition-colors">Liên hệ</a></li>
              <li><a href="#FAQ" className="text-white hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white text-sm mb-4 md:mb-0">© Copyright ThinhVuongTaiChinh.</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Chính sách bảo mật</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Điều khoản dịch vụ</a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">Chính sách cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
