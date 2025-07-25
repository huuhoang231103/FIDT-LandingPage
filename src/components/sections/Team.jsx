import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../../assets/avatar/avatar.jpg';

const TeamSection = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="team" className="scroll-mt-24 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Gặp gỡ <span className="text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-full shadow-md">Cố vấn tài chính</span>
                    </h2>
                    <p className="text-lg text-blue-800 max-w-xl mx-auto">
Chuyên gia hoạch định tài chính giúp bạn chủ động tương lai.                    </p>
                </motion.div>

                {/* CEO Card with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="ceo-card p-8 rounded-lg shadow-md mb-10 max-w-7xl mx-auto transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600"
                >
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img
                            src={avatar}
                            alt="Portrait of Ms. Hana Trần"
                            className="rounded-full border-4 border-blue-200 w-40 h-40 object-cover"
                            />

                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-3xl font-bold text-blue-900 mb-3">Ms. Hana Trần</h3>
                            <p className="text-blue-600 font-semibold mb-6 text-2xl">Cố vấn tài chính</p>

                            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border-l-4 border-blue-300 max-h-60 overflow-y-auto lg:max-h-none lg:overflow-visible">
                                <p className="text-blue-800 text-lg leading-relaxed mb-4">
                                    Chị Hana Tran là một trong những Hội viên Chuyên gia tiêu biểu đầu tiên của Hiệp hội Tài chính Việt Nam (VFCA). Bằng sự tận tâm trong việc phục vụ Khách hàng cũng như sự tâm huyết với lĩnh vực Hoạch định Tài chính cá nhân, chị Hana Trần đã nhận vinh danh vào các năm 2022-2024 cho sự đóng góp xuất sắc tại Công ty CP Tư vấn Đầu tư và Quản lý Tài sản FIDT.                                </p>
                                <p className="text-blue-800 text-lg leading-relaxed mb-4">
                                    Với bề dày hoạt động trong lĩnh vực tài chính và tư vấn, cũng như là một nhà đầu tư cá nhân giàu kinh nghiệm, chị Hana Tran có thế mạnh toàn diện trong cả Tài chính Doanh nghiệp và Tài chính Cá nhân. Chị luôn đặt lợi ích khách hàng lên hàng đầu, và sẵn sàng đồng hành cùng các khách hàng để xây dựng giải pháp hoạch định tài chính, để các khách hàng đạt được thịnh vượng tài chính bền vững.
                                </p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-lg mb-6 border border-blue-200">
                                <p className="text-blue-900 text-lg font-medium italic">
                                    "Sự giàu có không phải là sở hữu rất nhiều, mà là có rất ít mong muốn"
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                                <button 
                                    onClick={scrollToContact}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all hover:shadow-lg text-lg"
                                >
                                    Liên hệ tư vấn
                                </button>
                                <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full transition-all hover:shadow-lg text-lg">
                                    Tìm hiểu thêm
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;