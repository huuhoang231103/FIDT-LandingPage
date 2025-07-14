import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#' },
    { icon: <Twitter className="w-5 h-5" />, href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { icon: <Instagram className="w-5 h-5" />, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">FIDT</div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming businesses through innovative technology solutions, comprehensive training, and strategic consulting services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#training" className="text-gray-400 hover:text-blue-400 transition-colors">Training</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-blue-400 transition-colors">Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Consulting</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 FIDT. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
