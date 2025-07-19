import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Why Choose Us', href: '#why-choose' },
    { name: 'Services', href: '#services' },
    { name: 'Training', href: '#training' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 absolute right-0"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu
              className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex`}
      >
        {/* Sidebar */}
        <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold text-blue-500">Menu</div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <nav className="flex-1 space-y-4">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block text-sm font-semibold hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <p className="text-sm mb-1 flex items-center gap-2">
              <span>📧</span> hana@thinhvuongtaichinh.net
            </p>
            <p className="text-sm">📞 0936903949</p>
            <div className="flex gap-3 mt-4 text-white">
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
              <i className="fab fa-pinterest-p" />
              <i className="fab fa-instagram" />
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className="flex-1 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </motion.header>
  );
};

export default Header;
