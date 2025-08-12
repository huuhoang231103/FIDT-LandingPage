import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/Test/Mai_Test.jpg';
import img2 from '../../assets/Test/Minh_Test.jpg';
import img3 from '../../assets/Test/ThaoPhong_Test.jpg';

const testimonials = [
  {
    name: "Nguyễn Thị Mai",
    position: "32 tuổi, Nhân viên văn phòng",
    image: img1,
    content:
      "Trước khi gặp Ms. Hana Tran, tôi khá mơ hồ về tình hình tài chính của bản thân – chi tiêu không kiểm soát, không biết nên tiết kiệm bao nhiêu hay đầu tư vào đâu cho hợp lý.\nSau buổi tư vấn, tôi thật sự bất ngờ vì sự chuyên nghiệp và tận tâm của chị Hana. Chị không chỉ giúp tôi đánh giá lại toàn bộ thu chi, tài sản và nợ hiện tại, mà còn hướng dẫn cách xây dựng kế hoạch tài chính phù hợp với mục tiêu cá nhân trong ngắn hạn và dài hạn.\nTôi đặc biệt ấn tượng với cách chị Hana phân tích rất cụ thể, dễ hiểu, và đưa ra những giải pháp thiết thực, không áp đặt – hoàn toàn dựa trên mong muốn và khả năng của tôi.\nSau buổi tư vấn, tôi cảm thấy an tâm hơn rất nhiều và có định hướng rõ ràng hơn trong việc quản lý tiền bạc, tích lũy và chuẩn bị cho tương lai.\nCảm ơn chị Hana vì sự đồng hành và những lời khuyên quý báu!",
  },
  {
    name: "Trần Đức Minh",
    position: "24 tuổi, Nhân viên IT",
    image: img2,
    content:
      "Tôi là người mới đi làm được hơn 1 năm, thu nhập cũng tạm ổn nhưng lúc nào cũng cảm thấy không đủ, cuối tháng là cháy túi.\nNhờ buổi tư vấn với chị Tran, tôi mới hiểu rõ mình đang tiêu tiền như thế nào, và lý do vì sao dù có thu nhập nhưng lại không tích lũy được gì.\nChị đã giúp tôi thiết lập một kế hoạch quản lý thu chi đơn giản, dễ áp dụng, đồng thời đưa ra những lời khuyên thực tế về việc xây dựng quỹ dự phòng, bảo hiểm, và bắt đầu đầu tư với số vốn nhỏ.\nĐiều tôi quý nhất là chị luôn lắng nghe kỹ lưỡng, không đánh giá hay ép buộc, mà chỉ đưa ra những lựa chọn để tôi tự quyết định theo điều kiện và mục tiêu riêng của mình.\nSau 3 tháng áp dụng theo hướng dẫn, tôi đã có khoản tiết kiệm đầu tiên trong đời! Cảm ơn chị Hana rất nhiều!",
  },
  {
    name: "Lê Thảo & Nguyễn Phong",
    position: "35 tuổi, Gia đình",
    image: img3,
    content:
      "Gia đình tôi có hai con nhỏ, thu nhập hai vợ chồng cũng ổn định nhưng luôn cảm thấy áp lực vì nhiều khoản chi: học phí, nhà cửa, sức khỏe... Chúng tôi từng nghĩ rằng việc lập kế hoạch tài chính chỉ dành cho người nhiều tiền.\nSau khi được chị Hana Tran tư vấn, vợ chồng tôi mới 'vỡ ra' rằng tài chính cá nhân không liên quan đến việc kiếm bao nhiêu, mà là cách mình dùng tiền như thế nào.\nChị Hana rất nhẹ nhàng nhưng sâu sắc, giúp chúng tôi nhìn rõ tình hình tài chính của gia đình, sắp xếp lại thứ tự ưu tiên, xây dựng các quỹ dự phòng và mục tiêu dài hạn như quỹ học vấn cho con, quỹ hưu trí,...\nNhờ có chị, hai vợ chồng đã cùng nhau ngồi xuống, nói chuyện tài chính một cách thoải mái và đồng lòng hơn. Một trải nghiệm thực sự ý nghĩa và thay đổi tư duy!",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxIndex = testimonials.length - (isMobile ? 1 : 2);
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 20000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTestimonials = isMobile
    ? [testimonials[currentIndex]]
    : testimonials.slice(currentIndex, currentIndex + 2);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 font-sans">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        <span className="text-blue-600">Khách hàng</span> nói gì?
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-10">
        Lắng nghe những câu chuyện thực tế từ khách hàng đã trải nghiệm dịch vụ tư vấn tài chính của chúng tôi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleTestimonials.map((testimonial, index) => {
          const globalIndex = isMobile ? currentIndex : currentIndex + index;
          const isExpanded = expandedIndexes.includes(globalIndex);

          return (
            <motion.div
              key={globalIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700 text-base md:text-base leading-relaxed whitespace-pre-line transition-all">
                {isExpanded
                  ? testimonial.content
                  : testimonial.content.slice(0, 180) + (testimonial.content.length > 180 ? "..." : "")}
              </p>

              {testimonial.content.length > 180 && (
                <button
                  onClick={() => toggleExpand(globalIndex)}
                  className="text-blue-600 text-sm hover:underline self-start"
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: testimonials.length - (isMobile ? 0 : 1) }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-blue-600" : "bg-gray-300"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;