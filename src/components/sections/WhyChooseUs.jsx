import { Award, Clock, CheckCircle, Users } from "react-feather";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Expert Team",
      description:
        "Our highly skilled professionals bring years of industry experience and cutting-edge expertise to every project.",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Timely Delivery",
      description:
        "We pride ourselves on delivering projects on time and within budget, ensuring your business stays on track.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
      title: "Quality Assurance",
      description:
        "Rigorous testing and quality control processes ensure that every solution meets the highest standards.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions or issues.",
    },
  ];

  return (
    <section id="why-choose" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">FIDT</span>?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We combine technical excellence with business insights to deliver
            solutions that drive real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="h-full"
            >
              <div className="group h-full bg-white p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.07] hover:shadow-2xl hover:bg-blue-100 relative overflow-hidden border border-blue-200 hover:border-blue-400">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-80 blur-sm animate-sweep rounded-2xl z-0 pointer-events-none"></div>
                <div className="relative z-10 mb-6 flex items-center justify-center">
                  <div className="group-hover:spin-y-360">{reason.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-blue-800">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-center group-hover:text-blue-700">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
