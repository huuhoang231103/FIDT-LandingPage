import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "../common/ServiceCard";

const ProjectsServices = () => {
  const services = [
    {
      title: "Gói Tư Vấn Mua BĐS Lần Đầu",
      category: "Cá nhân hoặc gia đình lần đầu sở hữu BĐS",
      shortDescription: "Rà soát tài chính, xác định mục tiêu phù hợp, đề xuất chiến lược mua BĐS an toàn.",
      fullDescription:
        `📌 Đối tượng:
- Cá nhân hoặc gia đình lần đầu muốn sở hữu bất động sản

📋 Nội dung:
- Rà soát tài chính tổng thể
- Thiết lập mục tiêu mua BĐS phù hợp
- Xác định dòng tiền, khả năng vay mua nhà
- Đề xuất chiến lược mua an toàn và hiệu quả

💰 Chi phí: 5.000.000 VNĐ
🎁 Tặng kèm: Template ngân sách 12 tháng`,
    },
    {
      title: "Gói Tối Ưu Danh Mục BĐS",
      category: "Người đã sở hữu 2 BĐS trở lên",
      shortDescription: "Rà soát danh mục tài sản, phân tích hiệu suất và đề xuất tối ưu hoá danh mục.",
      fullDescription:
        `📌 Đối tượng:
- Người đã sở hữu 2 BĐS trở lên

📋 Nội dung:
- Rà soát lại danh mục tài sản
- Phân tích hiệu suất khai thác từng BĐS
- Đề xuất cơ cấu lại tài sản để tối ưu hiệu quả đầu tư

💰 Chi phí: 8.000.000 VNĐ
🎁 Tặng kèm: Bảng tính hiệu suất BĐS`,
    },
    {
      title: "Gói Phân Tích BĐS Trước Khi Mua",
      category: "Người đang phân vân trước khi ra quyết định mua",
      shortDescription: "Phân tích ưu nhược điểm BĐS cụ thể, hỗ trợ ra quyết định mua hay không.",
      fullDescription:
        `📌 Đối tượng:
- Người đang cân nhắc mua 1 BĐS cụ thể

📋 Nội dung:
- Phân tích ưu/nhược điểm vị trí, pháp lý, giá trị
- So sánh với các BĐS tương đương
- Hỗ trợ ra quyết định nên mua hay không

💰 Chi phí: 3.000.000 VNĐ`,
    },
    {
      title: "Gói Định Hướng Đầu Tư Cho Người Mới",
      category: "Người mới muốn bắt đầu đầu tư BĐS",
      shortDescription: "Hướng dẫn kiến thức cơ bản, xác định phân khúc phù hợp và chiến lược đầu tư ban đầu.",
      fullDescription:
        `📌 Đối tượng:
- Người mới bắt đầu tìm hiểu đầu tư BĐS

📋 Nội dung:
- Cung cấp kiến thức nền tảng đầu tư BĐS
- Định hướng phân khúc phù hợp với tài chính và khẩu vị rủi ro
- Đề xuất chiến lược đầu tư an toàn giai đoạn đầu

💰 Chi phí: 4.000.000 VNĐ`,
    },
    {
      title: "Gói Tư Vấn Tái Cấu Trúc Tài Chính",
      category: "Người gặp áp lực tài chính do đầu tư BĐS",
      shortDescription: "Phân tích tình trạng tài chính, đề xuất phương án xử lý nợ và tái cấu trúc danh mục.",
      fullDescription:
        `📌 Đối tượng:
- Người đang gặp khó khăn tài chính vì đầu tư BĐS

📋 Nội dung:
- Phân tích chi tiết dòng tiền và nợ
- Đề xuất giải pháp giảm áp lực tài chính
- Cân nhắc bán/chuyển nhượng BĐS không hiệu quả

💰 Chi phí: 6.000.000 VNĐ`,
    },
    {
      title: "Gói Tư Vấn Cho Nhà Đầu Tư Muốn Chốt Lời",
      category: "Người muốn bán BĐS đã lời",
      shortDescription: "Phân tích thời điểm bán, tư vấn giá và phương án chốt lời tối ưu.",
      fullDescription:
        `📌 Đối tượng:
- Nhà đầu tư đang sở hữu BĐS có lời và muốn chốt

📋 Nội dung:
- Đánh giá thị trường và thời điểm chốt lời
- Tư vấn phương án bán hoặc tái đầu tư
- Tối ưu lợi nhuận sau thuế/phí

💰 Chi phí: 5.000.000 VNĐ`,
    },
  ];

  const [selected, setSelected] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          <span className="text-blue-600">Sản phẩm và Dịch vụ</span> của chúng tôi
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 text-center">
          Dịch vụ tư vấn tài chính cá nhân & doanh nghiệp toàn diện, hiệu quả.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              category={service.category}
              description={service.shortDescription}
              onClick={() => setSelected(service)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white w-full max-w-2xl md:p-10 p-6 rounded-2xl relative shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                {selected.title}
              </h3>
              <p className="text-sm text-blue-600 italic mb-4">{selected.category}</p>
              <p className="text-gray-800 text-base leading-relaxed tracking-normal whitespace-pre-wrap">
                {selected.fullDescription}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsServices;
