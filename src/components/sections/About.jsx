import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { target: 500, suffix: "+", label: "Projects Completed" },
    { target: 100, suffix: "+", label: "Happy Clients" },
    { target: 50, suffix: "+", label: "Team Members" },
    { target: 15, suffix: "+", label: "Years Experience" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = Math.ceil(stat.target / 60);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.target) {
            newCounts[index] = Math.min(stat.target, newCounts[index] + increment);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Về <span className="text-blue-600">Ms. Mai Hân</span>
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Chị Mai Hân là một trong những Hội viên Chuyên gia tiêu biểu đầu tiên của Hiệp hội Tài chính Việt Nam (VFCA). 
              Hiện là Cố vấn Tài chính tại Công ty CP Tư vấn đầu tư và Quản lý Tài sản FIDT, chị đã tư vấn cho hơn 300 khách hàng cá nhân, với giá trị tài sản đang quản lý hơn 900 tỉ đồng.
            </p>

            <p className="text-gray-700 mb-6">
              🥇 Danh hiệu “Ngôi sao Toàn năng 2024” – Team leader đạt KPI cao nhất FIDT<br />
              🥇 Danh hiệu “Financial Planner xuất sắc 2023” tại FIDT<br />
              🥇 Danh hiệu “Financial Planner cống hiến 2022–2024” – với số lượng khách hàng và NAV quản lý cao nhất
            </p>

            <p className="text-gray-700 mb-8">
              📕 Chị là cộng tác viên chuyên mục Tài chính cá nhân trên các báo lớn: VnExpress, Lao Động, VietnamFinance, Dân trí, aFamily, Tiếp Thị Gia Đình, Zing, CafeF...<br />
              🎤 Chị cũng là diễn giả tại các workshop Tài chính cá nhân ở các trường đại học, doanh nghiệp, và giảng viên học phần "Hoạch định thuế TNCN" tại FIDT.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-100 shadow-lg rounded-lg p-8 h-96 flex items-center justify-center transition-transform transform hover:scale-105">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Tầm nhìn</h3>
                <p className="text-gray-600 mt-2">
                  Trở thành chuyên gia tư vấn tài chính cá nhân được tin tưởng hàng đầu tại Việt Nam, góp phần nâng cao nhận thức tài chính cho cộng đồng và đồng hành cùng khách hàng trên hành trình xây dựng cuộc sống tự do tài chính, chủ động tương lai.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
