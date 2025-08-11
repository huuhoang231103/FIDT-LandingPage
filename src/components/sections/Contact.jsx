import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

// SendMail service để tương thích với PHP backend
const SendMail = async (data) => {
  try {
    const response = await fetch("http://localhost/be-ld/services/api/send_mail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });


    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Network response was not ok');
    }
    
    return result;
  } catch (error) {
    console.error('SendMail error:', error);
    return {
      success: false,
      message: error.message || 'Không thể kết nối đến server'
    };
  }
};

const LoadingPopup = ({ open }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium">Đang gửi...</span>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitError('');

    const currentTime = Date.now();
    if (currentTime - lastSubmitTime < 60000) {
      setSubmitError('Vui lòng đợi ít nhất 60 giây trước khi gửi lại.');
      return;
    }

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên.";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        subscribe: formData.subscribe
      };

      console.log('Data being sent:', dataToSend);

      const result = await SendMail(dataToSend);
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '', subscribe: false });
        setLastSubmitTime(currentTime);
        alert(result?.message || "Gửi tin nhắn thành công!");
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setSubmitError(result?.message || 'Không thể gửi tin nhắn');
        console.error('Server error:', result);
        alert(`${result?.message} ${result?.error || ''}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Không gửi được tin nhắn. Vui lòng kiểm tra kết nối và thử lại.');
      alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const contactItems = [
    { icon: Phone, title: "Số điện thoại", value: "0936 903 949", href: "tel:+84936903949" },
    { icon: Mail, title: "Email", value: "hana@thinhvuongtaichinh.net", href: "mailto:hana@thinhvuongtaichinh.net" },
    { icon: MapPin, title: "Địa chỉ", value: "54 Tuệ Tĩnh, Phường Phú Thọ, Thành phố Hồ Chí Minh", href: "https://maps.google.com/?q=54+Tue+Tinh,+Phu+Tho,+Ho+Chi+Minh" }
  ];

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
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">
                Thông tin liên hệ
              </h3>
              <div className="bg-blue-200 p-6 rounded-2xl space-y-6 shadow-md">
                {contactItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center group hover:bg-white hover:shadow-lg rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center w-12 h-12 min-w-[3rem] min-h-[3rem] bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.title}</p>
                      <p className="text-gray-700">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form bắt đầu từ đây */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nhập họ tên của bạn" required />
                  {errors.name && <p className="text-sm text-red-600 mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nhập địa chỉ email" required />
                  {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nhập nội dung tin nhắn của bạn..." required></textarea>
                  {errors.message && <p className="text-sm text-red-600 mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.message}</p>}
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="subscribe" name="subscribe" checked={formData.subscribe} onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
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

                <button type="submit" disabled={isLoading || isSubmitted}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    isSubmitted 
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : isLoading 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}>
                  <div className="flex items-center justify-center space-x-2">
                    {isLoading && (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>)}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
