import React, { useState, useEffect } from "react";
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://thinhvuongtaichinh.net/backend").replace(/\/$/, "");
import { X, Download, Search, Filter, AlertCircle } from "lucide-react";

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
      console.log("Loading emails from API...");
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        search: search,
        service: serviceFilter,
        date_from: dateFrom,
        date_to: dateTo
      });

      const apiUrl = `${API_BASE}/api/get_emails_json.php?${params}`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response data:", data);

      if (data.success) {
        setEmails(data.data.emails);
        setTotalPages(data.data.pagination.pages);
        setServices(data.data.filters.services);
      } else {
        setError(data.message || "Không thể tải danh sách email");
      }
    } catch (error) {
      console.error('Error loading emails:', error);
      
      // Provide more specific error messages
      if (error.message?.includes('Failed to fetch')) {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
      } else if (error.message?.includes('HTTP error')) {
        setError("Lỗi server. Vui lòng thử lại sau.");
      } else {
        setError("Lỗi kết nối. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = async () => {
    try {
      console.log("Exporting emails...");
      const params = new URLSearchParams({
        search: search,
        service: serviceFilter,
        date_from: dateFrom,
        date_to: dateTo
      });

      const exportUrl = `${API_BASE}/api/export_emails_json.php?${params}`;
      console.log("Export URL:", exportUrl);
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = exportUrl;
      link.download = `emails_${new Date().toISOString().slice(0, 10)}.xls`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("Export completed successfully");
    } catch (error) {
      console.error('Export error:', error);
      alert('Lỗi khi xuất file. Vui lòng thử lại.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format for Vietnam timezone display
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh'
    });
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

export default EmailsPopup;
