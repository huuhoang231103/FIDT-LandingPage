// src/services/sendMail.js
export const SendMail = async (formData) => {
  try {
    const response = await fetch("http://localhost/be-ld/services/api/send_mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: error.message || 'Không thể kết nối đến server' };
  }
};
