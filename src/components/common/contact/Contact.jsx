import React, { useState, useEffect } from 'react';
import LoadingPopup from './LoadingPopup';
import ContactInfo from './ContactInfo';  
import ContactForm from './ContactForm';
import { useContactForm } from '../../hooks/useContactForm';


const Contact = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    formData,
    isLoading,
    isSubmitted,
    errors,
    submitError,
    handleSubmit,
    handleChange
  } = useContactForm();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <LoadingPopup open={isLoading} />
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Liên hệ với <span className="text-blue-600 relative">chúng tôi</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bạn đã sẵn sàng cho dự án mới? Liên hệ để được tư vấn miễn phí.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo isVisible={isVisible} />
            <ContactForm 
              formData={formData}
              isLoading={isLoading}
              isSubmitted={isSubmitted}
              isVisible={isVisible}
              errors={errors}
              submitError={submitError}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;