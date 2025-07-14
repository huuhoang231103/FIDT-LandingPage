import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Testimonial from './components/sections/Testimonial';
import ProjectsServices from './components/sections/ProjectsServices';
import Training from './components/sections/Training';
import Team from './components/sections/Team';
import Contact from './components/sections/Contact';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <WhyChooseUs />
      <Testimonial />
      <ProjectsServices />
      <Training />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
