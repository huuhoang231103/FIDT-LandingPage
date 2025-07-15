import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import QRImage from "../../assets/QR.jpeg"; // ⬅️ Import ảnh QR

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({}); // ⬅️ Thêm state lỗi

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) newErrors.email = "Please enter your email.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Giả lập gửi dữ liệu
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '', subscribe: false });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const contactItems = [
    {
      icon: Phone,
      title: "Phone",
      value: "+84 123 456 789",
      delay: "0ms"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@fidt.com",
      delay: "200ms"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Đà Lạt, Lâm Đồng Province, Vietnam",
      delay: "400ms"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-blue-600 relative">
              Touch
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full transform scale-x-0 animate-[scaleX_1s_ease-in-out_1s_forwards]"></div>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your project? Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">
              Contact Information
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h3>
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</p>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* QR Code */}
            <div className="mt-6">
              <div className="flex items-center group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">QR Code</p>
                  <p className="text-gray-600">Scan to connect with us!</p>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <img
                  src={QRImage}
                  alt="QR Code"
                  className="w-32 h-32 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>


            {/* Online status */}
            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">We're online and ready to help!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
                {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Subscribe to our newsletter for updates
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitted 
                    ? 'bg-green-500 text-white shadow-lg'
                    : isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </>
                  )}
                </div>
              </button>

              {isSubmitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-[slideInUp_0.5s_ease-out]">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Thank you! We'll get back to you soon.</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to { transform: scaleX(1); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
