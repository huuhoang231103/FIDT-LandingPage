import { useState, useCallback } from 'react';

const AUTH_STORAGE_KEY = 'token';

export const useAuthManager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message, duration = 2000) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), duration);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setIsPopupOpen(false);
    showToast('Đăng nhập thành công!');
  }, [showToast]);

  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsLoggedIn(false);
    showToast('Đã đăng xuất!');
  }, [showToast]);

  const openLoginPopup = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const closeLoginPopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleAuthClick = useCallback(() => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      openLoginPopup();
    }
  }, [isLoggedIn, handleLogout, openLoginPopup]);

  return {
    // State
    isLoggedIn,
    isPopupOpen,
    toast,
    
    // Actions
    handleLoginSuccess,
    handleLogout,
    openLoginPopup,
    closeLoginPopup,
    handleAuthClick,
    showToast
  };
};
