import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

// New FAQ Data
const faqData = [
  {
    category: "I. Câu hỏi về Quản lý chi tiêu",
    questions: [
      {
        question: "Phương pháp phổ biến là 50-30-20:",
        answer: `• 50% cho nhu cầu thiết yếu (ăn, ở, đi lại)\n• 30% cho mong muốn cá nhân (mua sắm, giải trí)\n• 20% để tiết kiệm hoặc đầu tư.\n\nTuy nhiên, chúng ta cần điều chỉnh số liệu cho phù hợp với thu nhập, chứ không áp dụng cứng nhắc 50/30/20. Với mức thu nhập 10 triệu đồng của bạn, tỉ lệ phù hợp lần lượt là:\n• 10-20% để tiết kiệm hoặc đầu tư (tiết kiệm trước, chi tiêu sau)\n• 10% cho mong muốn cá nhân (mua sắm, giải trí)\n• 70-80% cho nhu cầu thiết yếu (ăn, ở, đi lại)`
      },
      {
        question: "Làm sao để Quản lý chi tiêu hiệu quả ?",
        answer: `CÁCH THỰC HIỆN QUẢN LÝ CHI TIÊU 3 KHÔNG (KHÔNG APP, KHÔNG EXCEL, KHÔNG GHI CHÉP):\n\n• Lập 2 tài khoản riêng cho CP Hưởng thụ và CP Thiết yếu\n• Hàng tháng chuyển tiền theo định mức vào 2 tài khoản này\n\n📌 CP HƯỞNG THỤ:\nCứ đều đặn chuyển tiền vào, cho dù sử dụng không hết vẫn tích lũy ở đó. Bất cứ khi nào chi tiêu cho hưởng thụ, có thể nhìn vào số dư tài khoản mà xác định được mức tiền có thể chi tiêu. Muốn chi tiêu cho cả A và B, thì tiêu cho A nhiều thì B phải ít đi, và ngược lại. CHI TIÊU TRONG HẠN MỨC CHO PHÉP.\n\n📌 CP THIẾT YẾU:\nGồm các chi phí cố định (tiền thuê nhà, tiền học, tiền điện nước…), phần còn lại là tiền chợ, tiêu vặt... không cố định. Chia chi phí không cố định theo tuần. Tuần trước chi nhiều, tuần sau đó cân đối lại, chi ít hơn.\n\n🎯 LỢI ÍCH:\n• 3 KHÔNG: không app, không excel, không ghi chép\n• Tiết kiệm thời gian nên có thể áp dụng lâu dài\n• Vào bất cứ thời điểm nào trong năm cũng có thể xác định được tổng chi phí phát sinh và đã chi tiêu\n• Ngay tại thời điểm chi tiêu, nhìn số dư có thể lựa chọn và quyết định chi tiêu vào mục gì, bao nhiêu – dựa trên số tiền còn lại trong tài khoản. Đây mới là QUẢN LÝ.`
      }
    ]
  },
  {
    category: "II. Câu hỏi về Tiết kiệm – Đầu tư",
    questions: [
      {
        question: "Nên bắt đầu đầu tư từ đâu nếu chưa có nhiều tiền?",
        answer: `Bắt đầu nhỏ với:\n• Gửi tiết kiệm online lãi suất cao\n• Quỹ đầu tư mở (chỉ cần từ 100.000đ)\n• Chứng chỉ quỹ ETF (rủi ro thấp, thanh khoản tốt)\n• Vàng vật chất (nếu muốn giữ an toàn)\n\nQuan trọng nhất là: **hiểu sản phẩm – không “đu trend”**.`
      },
      {
        question: "Em mới bắt đầu, nên đầu tư hay tiết kiệm trước?",
        answer: `• Ưu tiên tiết kiệm quỹ khẩn cấp trước (ít nhất 3–6 tháng chi phí sinh hoạt)\n• Sau đó mới bắt đầu đầu tư đều đặn mỗi tháng (DCA – Dollar Cost Averaging)`
      }
    ]
  },
  {
    category: "III. Câu hỏi về Quản lý nợ và tín dụng",
    questions: [
      {
        question: "Nợ xấu có ảnh hưởng gì đến kế hoạch tài chính không?",
        answer: `Rất nhiều. Nợ xấu ảnh hưởng tới:\n• Điểm tín dụng (khó vay ngân hàng)\n• Áp lực tâm lý – tài chính\n• Mất cơ hội đầu tư trong tương lai\n\nCần ưu tiên xử lý triệt để nợ xấu, rồi mới tính đến tiết kiệm hay đầu tư.`
      },
      {
        question: "Vay tiền mua nhà có hợp lý không?",
        answer: `Có, nếu:\n• Khoản trả gốc lãi hàng tháng < 50% thu nhập hàng tháng\n• Có sẵn ít nhất 40-45% giá trị nhà\n• Tài chính ổn định\n\nCần tận dụng đòn bẩy tài chính khi lãi vay thấp và phải có biện pháp quản trị rủi ro trước khi vay.`
      }
    ]
  },
  {
    category: "IV. Câu hỏi về Bảo hiểm và Rủi ro",
    questions: [
      {
        question: "Em có cần mua bảo hiểm nhân thọ không?",
        answer: `Có, nếu:\n• Bạn muốn tự bảo vệ bản thân, không trở thành gánh nặng cho người khác khi có sự cố xảy ra\n• Bạn là trụ cột gia đình, có người phụ thuộc vào thu nhập của bạn\n\nTuy nhiên, phải hiểu kỹ hợp đồng và **không nên xem bảo hiểm là kênh đầu tư**.`
      },
      {
        question: "Nên có những loại bảo hiểm nào cơ bản?",
        answer: `• Bảo hiểm y tế (bắt buộc)\n• Bảo hiểm sức khỏe (chi trả viện phí)\n• Bảo hiểm tai nạn\n• Bảo hiểm bệnh lý nghiêm trọng (bệnh hiểm nghèo)\n• Bảo hiểm nhân thọ\n• Bảo hiểm tài sản (nhà, xe...)`
      }
    ]
  },
  {
    category: "V. Câu hỏi về Mục tiêu Tài chính",
    questions: [
      {
        question: "Làm sao để lập mục tiêu tài chính rõ ràng?",
        answer: `Áp dụng mô hình SMART:\n• Specific (cụ thể): Mua nhà, đi du học, nghỉ hưu sớm...\n• Measurable (đo lường): Cần bao nhiêu tiền?\n• Attainable (khả thi): Lập kế hoạch tài chính để xác nhận tính khả thi\n• Relevant (mục tiêu phù hợp với nguồn lực)\n• Time-bound (khung thời gian cụ thể thực hiện mục tiêu)`
      },
      {
        question: "Em muốn đạt tự do tài chính, bắt đầu từ đâu?",
        answer: `• Quản lý chi tiêu\n• Lập quỹ dự phòng và có bảo hiểm đầy đủ\n• Tăng thu nhập chủ động và thu nhập thụ động\n• Đầu tư sớm – đều – dài hạn\n• Xây dựng lối sống tối giản và đầu tư vào tri thức\n• Lập kế hoạch tài chính và có lộ trình thực thi rõ ràng\n• Định kì đánh giá kế hoạch tài chính và có những điều chỉnh phù hợp, đảm bảo đạt mục tiêu `
      }
    ]
  }
];


// Animation configs
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
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Câu hỏi thường gặp (FAQ)
      </motion.h1>

      {faqData.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {section.category}
          </h2>

          {section.questions.map((item, index) => {
            const flatIndex = sectionIdx * 10 + index; // unique index
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
        </div>
      ))}
    </motion.section>
  );
};

export default FAQ;
