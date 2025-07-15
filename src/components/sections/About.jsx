import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const About = () => {
  const stats = [
    { target: 500, suffix: "+", label: "Projects Completed" },
    { target: 100, suffix: "+", label: "Happy Clients" },
    { target: 50, suffix: "+", label: "Team Members" },
    { target: 5, suffix: "+", label: "Years Experience" },
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

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">FIDT</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              FIDT is a leading technology solutions company dedicated to empowering businesses
              through innovative digital transformation. We specialize in cutting-edge software
              development, comprehensive training programs, and strategic consulting services.
            </p>
            <p className="text-gray-700 mb-8">
              Our mission is to bridge the gap between technology and business success,
              helping organizations adapt to the digital age while maintaining their competitive edge.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transition-transform transform hover:scale-105">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-blue-100 shadow-lg rounded-lg p-8 h-96 flex items-center justify-center transition-transform transform hover:scale-105">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                <p className="text-gray-600 mt-2">
                  Leading the digital transformation revolution
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
