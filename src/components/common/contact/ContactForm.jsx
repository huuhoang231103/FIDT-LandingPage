// components/ContactForm.jsx
import React from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = ({ 
  formData, 
  isLoading, 
  isSubmitted, 
  isVisible, 
  errors, 
  submitError, 
  handleSubmit, 
  handleChange 
}) => {
  return (
    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Nhập họ tên của bạn" 
            required 
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Nhập địa chỉ email" 
            required 
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Nhập nội dung tin nhắn của bạn..." 
            required
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
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
          <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-700">
            Đăng ký nhận bản tin từ chúng tôi
          </label>
        </div>

        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-[slideInUp_0.5s_ease-out]">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{submitError}</span>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading || isSubmitted}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isSubmitted 
              ? 'bg-green-500 text-white cursor-not-allowed'
              : isLoading 
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Đã gửi!</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}</span>
              </>
            )}
          </div>
        </button>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-[slideInUp_0.5s_ease-out]">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;