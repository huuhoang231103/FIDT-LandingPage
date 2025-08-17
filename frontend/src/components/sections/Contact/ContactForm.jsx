import React, { useState, useCallback } from "react";
import { Send, CheckCircle } from "lucide-react";
import { SendMail } from "../../../services/sendMail";
import { InputField, TextAreaField, CheckboxField, DropdownField } from "../../common/FormFields";
import { ErrorAlert, SuccessAlert, LoadingPopup } from "../../common/Alerts";

const ContactForm = ({ isLoggedIn, onShowEmails, serviceOptions, isLoadingServices, lastUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    subscribe: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    isLoading: false,
    isSubmitted: false,
    error: "",
  });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const validate = useCallback(() => {
    const errs = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errs.name = "Vui lòng nhập họ tên.";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Họ tên phải có ít nhất 2 ký tự.";
    } else if (formData.name.trim().length > 100) {
      errs.name = "Họ tên không được vượt quá 100 ký tự.";
    }
    
    // Phone validation (Vietnamese format)
    if (!formData.phone.trim()) {
      errs.phone = "Vui lòng nhập số điện thoại.";
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
      const phonePatterns = [
        /^\+84[3|5|7|8|9][0-9]{8}$/,  // +84xxxxxxxxx
        /^84[3|5|7|8|9][0-9]{8}$/,     // 84xxxxxxxxx
        /^0[3|5|7|8|9][0-9]{8}$/       // 0xxxxxxxxx
      ];
      
      const isValidPhone = phonePatterns.some(pattern => pattern.test(cleanPhone));
      if (!isValidPhone) {
        errs.phone = "Số điện thoại không hợp lệ. Vui lòng sử dụng định dạng Việt Nam.";
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errs.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Email không hợp lệ.";
    }
    
    // Service validation - now optional
    if (formData.service && formData.service === "Chọn dịch vụ hoặc khóa học") {
      formData.service = ""; // Set to empty if default option selected
    }
    
    // Message validation - now optional, only validate length if provided
    if (formData.message.trim() && formData.message.trim().length > 1000) {
      errs.message = "Nội dung tin nhắn không được vượt quá 1000 ký tự.";
    }
    
    return errs;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus((prev) => ({ ...prev, error: "" }));

    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      setStatus((prev) => ({
        ...prev,
        error: "Vui lòng đợi ít nhất 60 giây trước khi gửi lại.",
      }));
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ isLoading: true, isSubmitted: false, error: "" });

    try {
      const result = await SendMail(formData);
      if (result.success) {
        setFormData({ 
          name: "", 
          phone: "", 
          email: "", 
          service: "", 
          message: "", 
          subscribe: false 
        });
        setLastSubmitTime(now);
        setStatus({ isLoading: false, isSubmitted: true, error: "" });
        setTimeout(
          () => setStatus((prev) => ({ ...prev, isSubmitted: false })),
          5000
        );
      } else {
        // Handle different error types from backend
        let errorMessage = result?.message || "Không thể gửi tin nhắn";
        
        // Check for rate limiting error
        if (result?.error_type === 'rate_limit' || result?.message?.includes('15 phút')) {
          errorMessage = "Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.";
        }
        // Check for validation errors
        else if (result?.error_type === 'validation_error') {
          errorMessage = result.message || "Thông tin không hợp lệ, vui lòng kiểm tra lại.";
        }
        // Check for system errors
        else if (result?.error_type === 'system_error') {
          errorMessage = "Lỗi hệ thống, vui lòng thử lại sau.";
        }
        
        setStatus({
          isLoading: false,
          isSubmitted: false,
          error: errorMessage,
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Handle network errors
      let errorMessage = "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.";
      
      if (error.message?.includes('Network Error') || error.message?.includes('Failed to fetch')) {
        errorMessage = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.";
      } else if (error.message?.includes('timeout')) {
        errorMessage = "Yêu cầu quá thời gian chờ. Vui lòng thử lại.";
      }
      
      setStatus({
        isLoading: false,
        isSubmitted: false,
        error: errorMessage,
      });
    }
  };

  return (
    <>
      <LoadingPopup open={status.isLoading} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="name"
          label="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Nhập họ tên"
        />
        <InputField
          id="phone"
          type="tel"
          label="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Nhập số điện thoại"
        />
        <InputField
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Nhập email"
        />
                 <div className="dropdown-container">
           <DropdownField
             id="service"
             label="Dịch vụ hoặc khóa học (không bắt buộc)"
             value={formData.service}
             onChange={handleChange}
             error={errors.service}
             placeholder="Chọn dịch vụ hoặc khóa học"
             options={serviceOptions}
             isOpen={isServiceDropdownOpen}
             onToggle={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
             isLoading={isLoadingServices}
           />
           {lastUpdate > 0 && (
             <p className="text-xs text-gray-500 mt-1">
               Cập nhật lúc: {new Date(lastUpdate).toLocaleTimeString('vi-VN')}
             </p>
           )}
         </div>
        <TextAreaField
          id="message"
          label="Nội dung (không bắt buộc)"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Nhập nội dung tin nhắn (không bắt buộc)"
        />
        <CheckboxField
          id="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
          label="Đăng ký nhận bản tin"
        />

        {status.error && <ErrorAlert message={status.error} />}

        <button
          type="submit"
          disabled={status.isLoading || status.isSubmitted}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all ${
            status.isSubmitted
              ? "bg-green-500"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {status.isSubmitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Đã gửi!</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>
                  {status.isLoading ? "Đang gửi..." : "Gửi tin nhắn"}
                </span>
              </>
            )}
          </div>
        </button>

        {/* View Emails Button - Only visible for admin */}
        {isLoggedIn && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onShowEmails}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              📧 Xem danh sách email đã gửi
            </button>
          </div>
        )}

        {status.isSubmitted && (
          <div className="space-y-4">
            <SuccessAlert message="Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất." />
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
