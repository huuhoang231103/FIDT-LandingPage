import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ show, message, type = 'success' }) => {
  const getToastStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-1/2 transform -translate-x-1/2 z-50"
          style={{ top: 'calc(64px + 16px)' }}
        >
          <div className={`px-4 py-2 rounded shadow-lg ${getToastStyles()}`}>
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
