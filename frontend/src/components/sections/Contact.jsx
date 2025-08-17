import React, { useState, useEffect } from "react";
import ContactForm from "./Contact/ContactForm";
import ContactInfo from "./Contact/ContactInfo";
import EmailsPopup from "./Contact/EmailsPopup";
import useContactServices from "../../hooks/useContactServices";

const Contact = ({ isLoggedIn = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailsPopup, setShowEmailsPopup] = useState(false);
  
  // Use custom hook for services
                const { serviceOptions, isLoadingServices, lastUpdate } = useContactServices();

  useEffect(() => setIsVisible(true), []);

  const handleShowEmails = () => {
    setShowEmailsPopup(true);
  };

  return (
    <>
      <EmailsPopup 
        open={showEmailsPopup} 
        onClose={() => setShowEmailsPopup(false)} 
      />
      
      <section
        id="contact"
        className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Liên hệ với <span className="text-blue-600">chúng tôi</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bạn đã sẵn sàng cho dự án mới? Liên hệ để được tư vấn miễn phí.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <ContactInfo />
            </div>

            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
                                        <ContactForm
                            isLoggedIn={isLoggedIn}
                            onShowEmails={handleShowEmails}
                            serviceOptions={serviceOptions}
                            isLoadingServices={isLoadingServices}
                            lastUpdate={lastUpdate}
                          />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
