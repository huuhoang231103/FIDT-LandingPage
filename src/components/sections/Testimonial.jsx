import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechCorp",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c8ee?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "FIDT transformed our business operations completely. Their expertise and dedication to quality are unmatched in the industry.",
    },
    {
      name: "Michael Chen",
      position: "CTO, InnovateLab",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Working with FIDT was a game-changer for our development process. They delivered beyond our expectations and on time.",
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, StartupX",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The training programs provided by FIDT elevated our team's skills to the next level. Highly professional service.",
    },
    {
      name: "David Kim",
      position: "VP Marketing, GrowthCo",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "FIDT's strategic approach helped us achieve 200% growth in just 6 months. Their dedication is remarkable.",
    },
    {
      name: "Lisa Wang",
      position: "Product Manager, TechFlow",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The level of professionalism and expertise at FIDT is outstanding. They truly understand business needs.",
    },
    {
      name: "James Wilson",
      position: "Director, Innovation Labs",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "FIDT provided exceptional consulting services that transformed our workflow and improved our efficiency significantly.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalTime = 4000;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (isMobile) {
            return prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1;
          } else {
            return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2;
          }
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length, isMobile]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2;
      }
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2;
      }
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(isMobile ? index : index * 2);
  };

  const totalSlides = isMobile
    ? testimonials.length
    : Math.ceil(testimonials.length / 2);

  return (
    <section id="about" className="py-16 md:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with us.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  isMobile ? currentIndex * 100 : (currentIndex / 2) * 100
                }%)`,
              }}
            >
              {isMobile
                ? testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-blue-500 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-8 italic text-base leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 text-lg mb-1">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {testimonial.position}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="w-full flex-shrink-0 grid grid-cols-2 gap-8 px-4"
                    >
                      {testimonials
                        .slice(slideIndex * 2, slideIndex * 2 + 2)
                        .map((testimonial, index) => (
                          <motion.div
                            key={slideIndex * 2 + index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 12,
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                          >
                            <div className="flex items-center mb-6">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 text-blue-500 fill-current"
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 mb-8 italic text-base leading-relaxed">
                              "{testimonial.text}"
                            </p>
                            <div className="flex items-center">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover mr-4"
                              />
                              <div>
                                <div className="font-semibold text-gray-900 text-lg mb-1">
                                  {testimonial.name}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  {testimonial.position}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  ))}
            </div>

            <div className="absolute top-0 left-0 h-full w-1/2 z-10 group">
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 
                  bg-white text-gray-700 p-2 rounded-full shadow-md border 
                  transition-all duration-300 opacity-0 group-hover:opacity-100 
                  hover:bg-blue-600 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-0 right-0 h-full w-1/2 z-10 group">
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 
                  bg-white text-gray-700 p-2 rounded-full shadow-md border 
                  transition-all duration-300 opacity-0 group-hover:opacity-100 
                  hover:bg-blue-600 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index ===
                  (isMobile ? currentIndex : Math.floor(currentIndex / 2))
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
