// components/LoadingPopup.jsx
import React from 'react';

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

export default LoadingPopup;