import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import useFaqsAPI from "../../hooks/useFaqsAPI";
import EditButton from "../common/EditButton";
import PopupEditFaq from "../common/PopupEditFaq";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const FAQ = ({ isLoggedIn }) => {
  const { faqData, isLoading, error, updateCategory } = useFaqsAPI();
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleEditCategory = (section, sectionIdx) => {
    setEditingCategory(section);
    setEditingCategoryIndex(sectionIdx);
    setIsEditPopupOpen(true);
  };



  const handleSaveEdit = async ({ categoryIndex, categoryData }) => {
    try {
      // Call the API to update the FAQ
      await updateCategory({ categoryIndex, categoryData });
      
      // Close the popup
      setIsEditPopupOpen(false);
      setEditingCategory(null);
      setEditingCategoryIndex(null);
      
      // Show success message (optional)
      alert('Cập nhật FAQ thành công!');
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Lỗi khi cập nhật FAQ: ' + error.message);
    }
  };

  const handleCloseEdit = () => {
    setIsEditPopupOpen(false);
    setEditingCategory(null);
    setEditingCategoryIndex(null);
  };

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500">Đang tải...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  return (
    <motion.section
      id="faq"
      className="max-w-5xl mx-auto px-4 md:px-8 py-16 scroll-mt-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Câu hỏi thường gặp (FAQ)
      </motion.h1>

      {faqData.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-10 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {isLoggedIn && (
                <EditButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(section, sectionIdx);
                  }}
                  className="mr-2"
                />
              )}
              {section.category}
            </span>
          </h2>

          {section.questions.map((item, index) => {
            const flatIndex = sectionIdx * 100 + index;
            const isOpen = openIndexes.includes(flatIndex);

            return (
              <motion.div
                key={flatIndex}
                variants={itemVariants}
                className="mb-4 border border-gray-200 rounded-md shadow-sm bg-white"
              >
                <button
                  onClick={() => toggleIndex(flatIndex)}
                  className="w-full px-4 md:px-6 pt-5 pb-3 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <div className="flex-1">
                    <div
                      className={`text-base md:text-lg font-semibold ${
                        isOpen ? "text-blue-600" : "text-black"
                      }`}
                    >
                      {item.question}
                    </div>
                  </div>

                  <div
                    className={`flex-shrink-0 aspect-square w-8 sm:w-9 flex items-center justify-center rounded-full border border-blue-600 transition-all duration-300 ${
                      isOpen ? "bg-blue-600 text-white" : "text-blue-600"
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, scaleY: 0.95 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ transformOrigin: "top" }}
                      className="px-4 md:px-6 pb-6 text-gray-700 text-sm md:text-base"
                    >
                      <hr className="border-t border-gray-200 my-3" />
                      <div className="whitespace-pre-line">{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Edit FAQ Popup */}
      <PopupEditFaq
        isOpen={isEditPopupOpen}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        faqCategory={editingCategory}
        categoryIndex={editingCategoryIndex}
      />
    </motion.section>
  );
};

export default FAQ;
