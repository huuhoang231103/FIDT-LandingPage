import { useEffect, useState } from "react";
import { Users, Globe, Tv, FileText } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { target: 300, suffix: "+", label: "Đã tư vấn khách hàng" },
    { target: 900_000_000_000, label: "Tài sản đang quản lý (VNĐ)" },
  ];

  const pressLinks = [
    {
      icon: FileText,
      label: "VietnamFinance",
      url: "https://vietnamfinance.vn/lam-giau-nho-tang-truong-tai-san-4-yeu-to-can-luu-tam-d108727.html",
      description: "4 yếu tố giúp tăng tài sản.",
    },
    {
      icon: Tv,
      label: "Lao Động TV",
      url: "https://laodong.vn/video/tai-chinh-thong-minh-4t-can-nho-trong-thua-ke-de-tranh-thiet-thoi-1176620.ldo",
      description: "4T cần nhớ khi thừa kế.",
    },
    {
      icon: Globe,
      label: "Tiếp thị Gia Đình",
      url: "https://tiepthigiadinh.vn/tiet-kiem-3-hay-6-thang-thu-nhap-de-khong-lo-khi-gap-kho-khan-d24219.html",
      description: "Tiết kiệm 3–6 tháng thu nhập.",
    },

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

  const formatNumber = (num, suffix = "") => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)} tỉ${suffix}`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)} triệu${suffix}`;
    return `${new Intl.NumberFormat("vi-VN").format(num)}${suffix}`;
  };

  return (
    <section id="about" className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Về <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Ms. Hana Tran</span>
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Chị Hana Tran ( Trần Thị Mai Hân ) là một trong những <span className="font-semibold text-blue-700">Hội viên Chuyên gia tiêu biểu đầu tiên</span> của Hiệp hội Tài chính Việt Nam (VFCA). 
                Hiện là Cố vấn Tài chính tại Công ty CP Tư vấn đầu tư và Quản lý Tài sản FIDT, chị đã tư vấn cho hơn <span className="font-bold text-blue-600">300 khách hàng cá nhân</span>, với giá trị tài sản đang quản lý hơn <span className="font-bold text-blue-600">900 tỉ đồng</span>.
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  🏆 Thành tích nổi bật
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>🥇 <span className="font-medium">"Ngôi sao Toàn năng 2024"</span> – Team leader đạt KPI cao nhất tại <span className="text-red-600 font-bold">FIDT</span></p>
                  <p>🥇 <span className="font-medium">"Financial Planner xuất sắc 2023"</span> tại <span className="text-red-600 font-bold">FIDT</span></p>
                  <p>🥇 <span className="font-medium">"Financial Planner cống hiến 2022–2024"</span> – với số lượng khách hàng và NAV quản lý cao nhất</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  📚 Hoạt động truyền thông & đào tạo
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>📕 Cộng tác viên chuyên mục Tài chính cá nhân trên các báo lớn: <span className="font-medium">VnExpress, Lao Động, VietnamFinance, Dân trí, aFamily, Tiếp Thị Gia Đình, Zing, CafeF...</span></p>
                  <p>🎤 Diễn giả tại các workshop Tài chính cá nhân ở các trường đại học, doanh nghiệp, và giảng viên học phần <span className="font-medium">"Hoạch định thuế TNCN"</span> tại FIDT.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Vision Card */}
          <motion.div
            className="lg:col-span-1 flex items-stretch"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 shadow-2xl rounded-3xl p-4 w-full flex flex-col items-center justify-center transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-blue-200/50 backdrop-blur-sm">
              <div className="text-center flex flex-col justify-center h-full max-w-xs">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-gray-800">✨</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  Tầm nhìn
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  Trở thành chuyên gia tư vấn tài chính cá nhân <span className="text-blue-700 font-semibold">đáng tin cậy</span> tại Việt Nam, góp phần nâng cao nhận thức tài chính cho cộng đồng và đồng hành cùng khách hàng trên hành trình xây dựng cuộc sống <span className="text-blue-700 font-semibold">tự do tài chính</span>, hướng tới tương lai chủ động.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats and Press Links section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thành tựu & Hoạt động</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Stats */}
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {formatNumber(counts[index], stat.suffix)}

                </div>
                <div className="text-gray-600 font-medium text-sm leading-tight">{stat.label}</div>
              </motion.div>
            ))}

            {/* Press Links */}
            {pressLinks.map((press, index) => (
              <motion.a
                key={index}
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center group transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 2), duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300 shadow-lg mx-auto">
                  <press.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{press.label}</h4>
                <p className="text-sm text-gray-600 leading-tight group-hover:text-gray-700 transition-colors">{press.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;