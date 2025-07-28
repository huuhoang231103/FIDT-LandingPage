import { Users, MessageSquare, Globe, Heart, ThumbsUp } from "react-feather";
import { motion } from "framer-motion";
import backgroundImage from '../../assets/background.jpg';



const WhyChooseHana = () => {
  const reasons = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Kinh nghiệm thực chiến",
      description:
        "Ms. Hana Trần từng đồng hành cùng nhiều doanh nhân, CEO và startup tại Việt Nam, mang lại kinh nghiệm tư vấn đa lĩnh vực.",
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
      title: "Phong cách tư vấn thực tế",
      description:
        "Phong cách làm việc thẳng thắn, thực tế và định hướng hành động. Không lý thuyết suông mà tập trung giải quyết vấn đề cụ thể.",
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: "Hiểu thị trường Việt Nam",
      description:
        "Có cái nhìn sát thực tế thị trường, văn hóa doanh nghiệp Việt Nam – một lợi thế rõ ràng so với mô hình tư vấn nước ngoài.",
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: "Khả năng truyền cảm hứng",
      description:
        "Ngoài tư vấn, cô còn là diễn giả truyền cảm hứng, giúp nhiều cá nhân vượt qua khủng hoảng hoặc mất phương hướng.",
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-blue-600" />,
      title: "Uy tín & phản hồi tích cực",
      description:
        "Nhận được đánh giá tích cực từ học viên, doanh nghiệp, thường xuyên xuất hiện tại các talkshow, hội thảo uy tín.",
    },
  ];

  return (
    <section
      id="why-choose"
      className="scroll-mt-24 py-16 md:py-24 bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* BG */}
      <div className="absolute inset-0 bg-blue-900 opacity-80 z-0"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-center">
              <span className="block md:inline">Tại sao chọn </span>
              <span className="block md:inline text-blue-300">Ms. Hana Trần?</span>
            </h2>

            <p className="text-lg max-w-3xl mx-auto">
              Uy tín – Kinh nghiệm – Truyền cảm hứng. Tư vấn đi vào thực tiễn, giúp bạn thay đổi rõ rệt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <div className="group h-full bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.07] hover:shadow-2xl hover:bg-blue-100 relative overflow-hidden border border-blue-200 hover:border-blue-400 text-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-80 blur-sm animate-sweep rounded-2xl z-0 pointer-events-none"></div>
                  <div className="relative z-10 mb-6 flex items-center justify-center">
                    <div className="group-hover:spin-y-360">{reason.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-blue-800">
                    {reason.title}
                  </h3>
                  <p className="text-center group-hover:text-blue-700">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>


  );
};

export default WhyChooseHana;
