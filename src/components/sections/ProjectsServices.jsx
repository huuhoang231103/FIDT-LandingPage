import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
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

  // Close modal when clicking outside
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Projects & Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tech solutions designed to grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, index) => (
            <ServiceCard
              key={index}
              title={item.title}
              category={item.category}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div 
            ref={modalRef}
            className="bg-white w-full max-w-md p-8 rounded-lg relative shadow-xl animate-fadeIn transition-all duration-300 transform scale-95 hover:scale-100"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{selected.title}</h3>
            <p className="text-sm text-gray-500 italic mb-4">{selected.category}</p>
            <p className="text-gray-700 leading-relaxed">{selected.fullDescription}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsServices;
