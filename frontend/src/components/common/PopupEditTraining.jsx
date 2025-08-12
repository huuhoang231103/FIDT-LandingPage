import React, { useState, useEffect } from "react";

const PopupEditTraining = ({ isOpen, onClose, onSave, trainingData, index }) => {
  const [formData, setFormData] = useState(trainingData || {});

  useEffect(() => {
    setFormData(trainingData || {});
  }, [trainingData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e) => {
    const arr = e.target.value.split("\n").map(line => line.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, features: arr }));
  };

  const handleSubmit = () => {
    onSave({ index, training: formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Chỉnh sửa khóa training</h2>

        <label className="block text-sm font-medium">Tên khóa học</label>
        <input
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
        />

        <label className="block text-sm font-medium">Thời lượng</label>
        <input
          name="duration"
          value={formData.duration || ""}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
        />

        <label className="block text-sm font-medium">Cấp độ</label>
        <input
          name="level"
          value={formData.level || ""}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
        />

        <label className="block text-sm font-medium">Nội dung (mỗi dòng 1 mục)</label>
        <textarea
          value={(formData.features || []).join("\n")}
          onChange={handleFeaturesChange}
          className="border w-full p-2 mb-3"
          rows="5"
        />

        <label className="block text-sm font-medium">Giá</label>
        <input
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
        />


        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PopupEditTraining;
