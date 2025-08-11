// services/emailService.js
export const SendMail = async (formData) => {
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