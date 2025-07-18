import { Star } from "lucide-react";
import { motion } from "framer-motion";

const CardReview = ({ 
  name, 
  position, 
  image, 
  rating, 
  text, 
  className = "",
  animationDelay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: animationDelay
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ${className}`}
    >
      {/* Rating Stars */}
      <div className="flex items-center mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-blue-500 fill-current"
          />
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-gray-600 mb-8 italic text-base leading-relaxed">
        "{text}"
      </p>
      
      {/* User Info */}
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <div className="font-semibold text-gray-900 text-lg mb-1">
            {name}
          </div>
          <div className="text-gray-500 text-sm">
            {position}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardReview;