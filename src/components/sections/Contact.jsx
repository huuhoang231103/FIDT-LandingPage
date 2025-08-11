import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { SendMail } from "../../services/sendMail";

// Loading Popup
const LoadingPopup = ({ open }) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium">Đang gửi...</span>
      </div>
    </div>
  ) : null;

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

// Form Field Components
const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {error && <ErrorText message={error} />}
  </div>
);

const TextAreaField = ({ label, id, value, onChange, error, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      rows="5"
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {error && <ErrorText message={error} />}
  </div>
);

const CheckboxField = ({ id, checked, onChange, label }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
      {label}
    </label>
  </div>
);

// Alerts
const ErrorText = ({ message }) => (
  <p className="text-sm text-red-600 mt-1 flex items-center">
    <AlertCircle className="w-4 h-4 mr-1" /> {message}
  </p>
);

const ErrorAlert = ({ message }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center space-x-2 text-red-800">
      <AlertCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

const SuccessAlert = ({ message }) => (
  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center space-x-2 text-green-800">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => setIsVisible(true), []);

  const validate = useCallback(() => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Vui lòng nhập họ tên.";
    if (!formData.email.trim()) errs.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Email không hợp lệ.";
    if (!formData.message.trim()) errs.message = "Vui lòng nhập nội dung.";
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
        setFormData({ name: "", email: "", message: "", subscribe: false });
        setLastSubmitTime(now);
        setStatus({ isLoading: false, isSubmitted: true, error: "" });
        setTimeout(
          () => setStatus((prev) => ({ ...prev, isSubmitted: false })),
          5000
        );
      } else {
        setStatus({
          isLoading: false,
          isSubmitted: false,
          error: result?.message || "Không thể gửi tin nhắn",
        });
      }
    } catch {
      setStatus({
        isLoading: false,
        isSubmitted: false,
        error: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.",
      });
    }
  };

  return (
    <>
      <LoadingPopup open={status.isLoading} />
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
              <h3 className="text-2xl font-bold mb-8">Thông tin liên hệ</h3>
              <div className="bg-blue-200 p-6 rounded-2xl space-y-6 shadow-md">
                {contactItems.map((item, i) => (
                  <ContactItem key={i} {...item} />
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <InputField
                id="name"
                label="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Nhập họ tên"
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
              <TextAreaField
                id="message"
                label="Nội dung"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Nhập nội dung tin nhắn"
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

              {status.isSubmitted && (
                <SuccessAlert message="Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất." />
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
