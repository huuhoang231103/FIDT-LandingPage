import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../common/ServiceCard';

const ProjectsServices = () => {
  const services = [
    {
      title: 'It-Solution Work Projects',
      category: 'Business / Solution',
      fullDescription:
        'We deliver IT solutions that boost your team productivity and ensure scalability with cloud-first approach.',
    },
    {
      title: 'Digital Marketing',
      category: 'Marketing Strategy',
      fullDescription:
        'From campaign strategy to ad performance, we drive growth via digital marketing.',
    },
  ];

  const [selected, setSelected] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelected(null);
      }
    };

    if (selected) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected]);

  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Animated Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Projects & Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tech solutions designed to grow your business.
          </p>
        </motion.div>

        {/* Service Cards with Slide In */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ServiceCard
                title={item.title}
                category={item.category}
                onClick={() => setSelected(item)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white w-full max-w-2xl md:p-10 p-6 rounded-2xl relative shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              {selected.title}
            </h3>
            <p className="text-sm text-blue-600 italic mb-4">{selected.category}</p>
            <p className="text-gray-700 text-lg leading-relaxed">{selected.fullDescription}</p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProjectsServices;
