import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

// FAQ data
const faqData = [
  {
    question: "Does EmailJS expose my account to spam?",
    answer:
      "EmailJS allows you to create predefined templates and trigger them via frontend code, making it safer than exposing SMTP credentials..."
  },
  {
    question: "Can I use EmailJS for free?",
    answer: "Yes, EmailJS offers a free tier for developers."
  },
  {
    question: "Can't I use services like Sendgrid or Mandrill directly?",
    answer:
      "Yes, but EmailJS simplifies the integration and requires no backend."
  },
  {
    question: "Can I send HTML emails?",
    answer: "Absolutely. You can customize the HTML template as you like."
  },
  {
    question: "What about plain text emails?",
    answer:
      "Plain text emails are supported as well for better deliverability."
  }
];

// Animation config
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <motion.section
      id="faq"
      className="max-w-7xl mx-auto px-4 md:px-8 py-16 scroll-mt-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        FAQ
      </motion.h1>

      {faqData.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="mb-6 border border-gray-200 rounded-md shadow-sm bg-white"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full px-4 md:px-6 pt-5 pb-3 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div
                className={`text-base md:text-lg font-semibold flex-1 ${
                  isOpen ? "text-blue-600" : "text-black"
                }`}
              >
                {item.question}
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
    </motion.section>
  );
};

export default FAQ;
