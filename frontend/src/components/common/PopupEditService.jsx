import React, { useState, useEffect } from "react";

const PopupEditService = ({ isOpen, onClose, onSave, serviceData, type, index }) => {
  const [formData, setFormData] = useState(serviceData || {});

  useEffect(() => {
    setFormData(serviceData || {});
  }, [serviceData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHighlightsChange = (index, value) => {
    const newHighlights = [...(formData.highlights || [])];
    newHighlights[index] = value;
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), ""]
    }));
  };

  const removeHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, highlights: newHighlights }));
  };

  const handleSubmit = () => {
    onSave({ index, type, service: formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Thêm max-h và scroll */}
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {type === "trainingHeader" ? "Chỉnh sửa tiêu đề & mô tả" : "Chỉnh sửa dịch vụ"}
        </h2>

        {type === "trainingHeader" ? (
          <>
            <label className="block text-sm font-medium">Tiêu đề</label>
            <input
              name="trainingTitle"
              value={formData.trainingTitle || ""}
              onChange={handleChange}
              className="border w-full p-2 mb-3"
            />

            <label className="block text-sm font-medium">Mô tả</label>
            <textarea
              name="trainingSubtitle"
              value={formData.trainingSubtitle || ""}
              onChange={handleChange}
              className="border w-full p-2 mb-3"
              rows="2"
            />
          </>
        ) : (
          <>
            <label className="block text-sm font-medium">Tên dịch vụ</label>
            <input name="name" value={formData.name || ""} onChange={handleChange} className="border w-full p-2 mb-3" />

            <label className="block text-sm font-medium">Thời lượng</label>
            <input name="duration" value={formData.duration || ""} onChange={handleChange} className="border w-full p-2 mb-3" />

            <label className="block text-sm font-medium">Đối tượng</label>
            <input name="target" value={formData.target || ""} onChange={handleChange} className="border w-full p-2 mb-3" />

            <label className="block text-sm font-medium">Nội dung nổi bật</label>
            {(formData.highlights || []).map((highlight, index) => (
              <div key={index} className="flex items-center mb-2">
                <textarea
                  value={highlight}
                  onChange={(e) => handleHighlightsChange(index, e.target.value)}
                  className="border w-full p-2"
                  rows="2"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="ml-2 text-red-500"
                >
                  Xóa
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 mb-4"
            >
              Thêm nội dung nổi bật
            </button>

            <label className="block text-sm font-medium">Giá</label>
            <input name="price" value={formData.price || ""} onChange={handleChange} className="border w-full p-2 mb-3" />

            <label className="block text-sm font-medium">Bonus</label>
            <input name="bonus" value={formData.bonus || ""} onChange={handleChange} className="border w-full p-2 mb-4" />
          </>
        )}

        <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PopupEditService;
