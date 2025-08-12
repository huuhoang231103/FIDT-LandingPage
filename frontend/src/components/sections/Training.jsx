import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Training = () => {
  const courses = [
    {
      title: "Full Stack Development",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      price: "$999",
      features: [
        "React & Node.js",
        "Database Design",
        "API Development",
        "Deployment",
      ],
    },
    {
      title: "Digital Marketing Mastery",
      duration: "8 weeks",
      level: "Intermediate",
      price: "$699",
      features: [
        "SEO Strategies",
        "Social Media Marketing",
        "Analytics",
        "Campaign Management",
      ],
    },
    {
      title: "Cloud Computing",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      price: "$899",
      features: ["AWS/Azure", "DevOps", "Security", "Scalability"],
    },
  ];

  return (
    <section id="training" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tiêu đề xuất hiện từ dưới và bật nhẹ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="text-blue-600">Training Programs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elevate your skills with our comprehensive training programs designed by industry experts.
          </p>
        </motion.div>

        {/* Card khóa học */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{course.title}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-2xl font-bold text-blue-600 mb-4">{course.price}</div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Enroll Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
