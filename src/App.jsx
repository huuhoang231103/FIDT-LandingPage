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
import FAQ from './components/sections/FAQ';

import backgroundImage from './assets/background_2.jpg';

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <div className="bg-white bg-opacity-80">
        <About />
        <WhyChooseUs />
        <Testimonial />
        <ProjectsServices />
        {/* <Training /> */}
        <Team />
      </div>

      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
};


export default App;