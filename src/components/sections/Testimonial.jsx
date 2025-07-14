import { Star } from "lucide-react";

const Testimonial = () => {
    const testimonials = [
      {
        name: 'Sarah Johnson',
        position: 'CEO, TechCorp',
        image: '👩‍💼',
        rating: 5,
        text: 'FIDT transformed our business operations completely. Their expertise and dedication to quality are unmatched.'
      },
      {
        name: 'Michael Chen',
        position: 'CTO, InnovateLab',
        image: '👨‍💻',
        rating: 5,
        text: 'Working with FIDT was a game-changer. They delivered beyond our expectations and on time.'
      },
      {
        name: 'Emily Rodriguez',
        position: 'Founder, StartupX',
        image: '👩‍🚀',
        rating: 5,
        text: 'The training programs provided by FIDT elevated our team\'s skills to the next level.'
      }
    ];
  
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
export default Testimonial;
  