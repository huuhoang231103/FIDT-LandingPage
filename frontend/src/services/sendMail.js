import axios from "axios";

// Normalize and append /api if not present when using backend root
const ROOT_BASE = (import.meta.env.VITE_API_BASE_URL || "https://thinhvuongtaichinh.net/backend").replace(/\/$/, "");
const apiBase = ROOT_BASE.endsWith('/api') ? ROOT_BASE : `${ROOT_BASE}/api`;

export const SendMail = async (data) => {
  try {
    console.log("Sending data to:", `${apiBase}/send_mail.php`);
    console.log("Data:", data);
    
    const response = await axios.post(`${apiBase}/send_mail.php`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data);

    return {
      success: true,
      message: response.data.message || "Gửi email thành công.",
    };
  } catch (error) {
    console.error("SendMail error:", error);
    
    let message = "Gửi email thất bại.";
    let detailedError = null;

    if (error.response) {
      message = error.response.data?.message || message;
      detailedError = error.response.data?.error || null;
      console.error("HTTP Error:", error.response.status, error.response.data);
    } else if (error.request) {
      message = "Không thể kết nối đến máy chủ.";
      detailedError = error.request;
      console.error("Network Error:", error.request);
    } else {
      detailedError = error.message;
      console.error("Request Error:", error.message);
    }

    return {
      success: false,
      message,
      error: detailedError,
    };
  }
};
