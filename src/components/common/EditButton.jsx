import React from 'react';
import { Edit3 } from 'lucide-react';

const EditButton = ({ onClick, isVisible = true, className = "" }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors ${className}`}
      title="Chỉnh sửa nội dung"
    >
      <Edit3 size={14} />
      <span>Chỉnh sửa</span>
    </button>
  );
};

export default EditButton;