import React from 'react';

const MinimalAuthButton = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  if (isLoggedIn) {
    return (
      <div className="fixed top-4 right-4 z-30">
        <button
          onClick={onLogoutClick}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-30">
      <button
        onClick={onLoginClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        Đăng nhập
      </button>
    </div>
  );
};

export default MinimalAuthButton;
