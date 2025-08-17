import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

// Error Alert Component
export const ErrorAlert = ({ message }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center space-x-2 text-red-800">
      <AlertCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

// Success Alert Component
export const SuccessAlert = ({ message }) => (
  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center space-x-2 text-green-800">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

// Loading Popup Component
export const LoadingPopup = ({ open }) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium">Đang gửi...</span>
      </div>
    </div>
  ) : null;
