// utils/SendMail.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const SendMail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: 'Contact Form Submission',
        message: formData.message,
        subscribe: formData.subscribe
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: result.message || 'Email sent successfully!',
      data: result
    };

  } catch (error) {
    console.error('SendMail Error:', error);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Unable to connect to server. Please check your internet connection.'
      };
    }

    return {
      success: false,
      message: error.message || 'An unexpected error occurred while sending the email.'
    };
  }
};

// Alternative function for quote requests
export const SendQuoteRequest = async (quoteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/request-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: result.message || 'Quote request sent successfully!',
      data: result
    };

  } catch (error) {
    console.error('SendQuoteRequest Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Unable to connect to server. Please check your internet connection.'
      };
    }

    return {
      success: false,
      message: error.message || 'An unexpected error occurred while sending the quote request.'
    };
  }
};

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    return {
      success: response.ok,
      status: result.status,
      message: result.message
    };
  } catch (error) {
    return {
      success: false,
      status: 'DOWN',
      message: 'Server is not reachable'
    };
  }
};