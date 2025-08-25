import React, { useState, useEffect } from "react";
import ContactForm from "./Contact/ContactForm";
import ContactInfo from "./Contact/ContactInfo";
import EmailsPopup from "./Contact/EmailsPopup";
import useContactSections from "../../hooks/useContactSections";
import EditButton from "../common/EditButton";
import EditSectionsPopup from "../popup/EditSectionsPopup";

const Contact = ({ isLoggedIn = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEmailsPopup, setShowEmailsPopup] = useState(false);
  const [showEditSections, setShowEditSections] = useState(false);
  
  const { sections, loading, lastUpdate, refresh } = useContactSections();

  useEffect(() => setIsVisible(true), []);

  const handleShowEmails = () => { setShowEmailsPopup(true); };

  return (
    <>
      <EmailsPopup 
        open={showEmailsPopup} 
        onClose={() => setShowEmailsPopup(false)} 
      />
      <EditSectionsPopup
        open={showEditSections}
        onClose={() => { setShowEditSections(false); refresh?.(); }}
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
            {isLoggedIn && (
              <div className="mt-4 flex justify-center">
                <EditButton onClick={() => setShowEditSections(true)} />
              </div>
            )}
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
                serviceOptions={sections}
                isLoadingServices={loading}
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
