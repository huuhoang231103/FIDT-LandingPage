import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  X,
  Download,
  Search,
  Filter,
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

// Emails Popup Modal
const EmailsPopup = ({ open, onClose }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (open) {
      loadEmails();
    }
  }, [open, currentPage, search, serviceFilter, dateFrom, dateTo]);

  const loadEmails = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        search: search,
        service: serviceFilter,
        date_from: dateFrom,
        date_to: dateTo
      });

      const response = await fetch(`http://localhost:8000/api/get_emails_json.php?${params}`);
      const data = await response.json();

      if (data.success) {
        setEmails(data.data.emails);
        setTotalPages(data.data.pagination.pages);
        setServices(data.data.filters.services);
      } else {
        setError(data.message || "Không thể tải danh sách email");
      }
    } catch (error) {
      console.error('Error loading emails:', error);
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    const params = new URLSearchParams({
      search: search,
      service: serviceFilter,
      date_from: dateFrom,
      date_to: dateTo
    });

    const exportUrl = `http://localhost:8000/api/export_emails_json.php?${params}`;
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = exportUrl;
    link.download = `emails_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'});
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">📧 Danh sách Email đã gửi</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm kiếm
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tên, email, số điện thoại..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dịch vụ
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả dịch vụ</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={loadEmails}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Áp dụng bộ lọc
            </button>
            
            <button
              onClick={exportEmails}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải danh sách email...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Chưa có email nào để hiển thị</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{emails.length}</div>
                  <div className="text-sm text-gray-600">Email hiện tại</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {emails.filter(e => e.subscribe).length}
                  </div>
                  <div className="text-sm text-gray-600">Đăng ký nhận tin</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(emails.map(e => e.service)).size}
                  </div>
                  <div className="text-sm text-gray-600">Dịch vụ khác nhau</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {emails.filter(e => {
                      const today = new Date().toDateString();
                      return new Date(e.created_at).toDateString() === today;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">Email hôm nay</div>
                </div>
              </div>

              {/* Emails Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Tên</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Số điện thoại</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Dịch vụ</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Nội dung</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Đăng ký</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map((email, index) => (
                      <tr key={email.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-3 font-medium">{email.name}</td>
                        <td className="border border-gray-200 px-4 py-3">{email.phone}</td>
                        <td className="border border-gray-200 px-4 py-3">{email.email}</td>
                        <td className="border border-gray-200 px-4 py-3">{email.service}</td>
                        <td className="border border-gray-200 px-4 py-3 max-w-xs">
                          <div className="truncate" title={email.message}>
                            {email.message.length > 50 ? email.message.substring(0, 50) + '...' : email.message}
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-center">
                          {email.subscribe ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✅ Có
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              ❌ Không
                            </span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                          {formatDate(email.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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

// Dropdown Component
const DropdownField = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  options,
  isOpen,
  onToggle,
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
          error ? "border-red-500" : "border-gray-300"
        } ${value ? "text-gray-900" : "text-gray-500"}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onChange({ target: { name: id, value: option } });
                onToggle();
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
    {error && <ErrorText message={error} />}
  </div>
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

const Contact = ({ isLoggedIn = false }) => {
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
  const [isVisible, setIsVisible] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [showEmailsPopup, setShowEmailsPopup] = useState(false);

  // Services and courses options
  const serviceOptions = useMemo(() => [
    "Chọn dịch vụ hoặc khóa học",
    "MUA BĐS ĐẦU TIÊN",
    "GỠ NÚT THẮT TÀI CHÍNH", 
    "KHAI MỞ TÀI CHÍNH",
    "TÀI CHÍNH CHỦ ĐỘNG",
    "TÀI CHÍNH TOÀN DIỆN (12 THÁNG)",
    "TÀI CHÍNH HẠNH PHÚC (CHO CẶP ĐÔI, VỢ CHỒNG)",
    "GÓI TRẢI NGHIỆM MIỄN PHÍ",
    "THẨM ĐỊNH GIÁ BẤT ĐỘNG SẢN MIỄN PHÍ",
    "THẨM ĐỊNH DANH MỤC TÀI SẢN MIỄN PHÍ",
    "Khóa học Đầu tư",
    "Khóa học Phân tích Kỹ thuật"
  ], []);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsServiceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    
    // Service validation
    if (!formData.service || formData.service === "Chọn dịch vụ hoặc khóa học") {
      errs.service = "Vui lòng chọn dịch vụ hoặc khóa học.";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errs.message = "Vui lòng nhập nội dung.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Nội dung tin nhắn phải có ít nhất 10 ký tự.";
    } else if (formData.message.trim().length > 1000) {
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
      <EmailsPopup open={showEmailsPopup} onClose={() => setShowEmailsPopup(false)} />
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
                  label="Dịch vụ hoặc khóa học"
                  value={formData.service}
                  onChange={handleChange}
                  error={errors.service}
                  placeholder="Chọn dịch vụ hoặc khóa học"
                  options={serviceOptions}
                  isOpen={isServiceDropdownOpen}
                  onToggle={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                />
              </div>
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

              {/* View Emails Button - Only visible for admin */}
              {isLoggedIn && (
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEmailsPopup(true)}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
