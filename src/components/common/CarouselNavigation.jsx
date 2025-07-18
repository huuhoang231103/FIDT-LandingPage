import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselNavigation = ({ 
  onPrev, 
  onNext, 
  totalSlides, 
  currentSlide, 
  onGoToSlide,
  showDots = true,
  showArrows = true,
  className = "" 
}) => {
  return (
    <div className={className}>
      {/* Arrow Navigation */}
      {showArrows && (
        <>
          {/* Left Arrow */}
          <div className="absolute top-0 left-0 h-full w-1/2 z-10 group">
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 
                bg-white text-gray-700 p-2 rounded-full shadow-md border 
                transition-all duration-300 opacity-0 group-hover:opacity-100 
                hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute top-0 right-0 h-full w-1/2 z-10 group">
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 
                bg-white text-gray-700 p-2 rounded-full shadow-md border 
                transition-all duration-300 opacity-0 group-hover:opacity-100 
                hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselNavigation;
