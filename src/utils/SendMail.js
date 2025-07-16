import axios from "axios";

// Gọi đúng URL backend thực tế
const apiBase = "http://localhost/FIDT-LandingPage_Demo/backend/api";

export const SendMail = async (data) => {
  try {
    const response = await axios.post(`${apiBase}/send_mail.php`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: response.data.success,
      message: response.data.message || "Gửi email thành công.",
    };
  } catch (error) {
    let message = "Gửi email thất bại.";
    let detailedError = null;

    if (error.response) {
      message = error.response.data?.message || message;
      detailedError = error.response.data?.error || null;
    } else {
      detailedError = error.message;
    }

    return {
      success: false,
      message,
      error: detailedError,
    };
  }
};
