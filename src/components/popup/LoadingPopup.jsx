import { createPortal } from "react-dom";

export const LoadingPopup = ({ open }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/50 text-gray-300">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      {/* Text */}
      <p className="mt-4 text-lg font-medium">Vui lòng đợi</p>
    </div>,
    document.body
  );
};
