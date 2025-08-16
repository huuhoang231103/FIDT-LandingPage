import React, { useState, useEffect } from "react";

const PopupEditFaq = ({ isOpen, onClose, onSave, faqCategory, categoryIndex }) => {
  const [formData, setFormData] = useState(faqCategory || {});

  useEffect(() => {
    setFormData(faqCategory || {});
  }, [faqCategory]);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], [field]: value };
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...(prev.questions || []), { question: "", answer: "" }]
    }));
  };

  const removeQuestion = (qIndex) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== qIndex);
    setFormData(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = () => {
    onSave({ categoryIndex, categoryData: formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chỉnh sửa FAQ</h2>

        {/* Category */}
        <label className="block text-sm font-medium">Tên Category</label>
        <input
          value={formData.category || ""}
          onChange={handleCategoryChange}
          className="border w-full p-2 mb-4"
        />

        {/* Questions */}
        <h3 className="text-md font-semibold mb-2">Danh sách câu hỏi</h3>
        {(formData.questions || []).map((q, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <label className="block text-sm font-medium">Câu hỏi</label>
            <input
              value={q.question || ""}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              className="border w-full p-2 mb-2"
            />

            <label className="block text-sm font-medium">Trả lời</label>
            <textarea
              value={q.answer || ""}
              onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
              className="border w-full p-2 mb-2"
              rows="4"
            />

            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="text-red-500"
            >
              Xóa câu hỏi
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="text-blue-600 mb-4"
        >
          + Thêm câu hỏi
        </button>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PopupEditFaq;
