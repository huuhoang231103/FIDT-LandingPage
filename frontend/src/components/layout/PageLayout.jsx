import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonial from '../sections/Testimonial';
import ProjectsServices from '../sections/ProjectsServices';
import Training from '../sections/Training';
import Team from '../sections/Team';
import Contact from '../sections/Contact';
import FAQ from '../sections/FAQ';

const PageLayout = ({ 
  isLoggedIn, 
  sectionVisibility, 
  navLinkVisibility, 
  onAuthClick 
}) => {
  const renderSection = (key, Component, props = {}) => {
    if (!sectionVisibility[key]) return null;
    return <Component {...props} isLoggedIn={isLoggedIn} />;
  };

  return (
    <>
      {/* Header */}
      {renderSection('header', Header, { 
        onLoginClick: onAuthClick, 
        navLinkVisibility 
      })}

      {/* Hero Section - Always visible */}
      <Hero />

      {/* Main Content Sections */}
      <div className="bg-white bg-opacity-80">
        {renderSection('about', About)}
        {renderSection('whyChooseUs', WhyChooseUs)}
        {renderSection('testimonial', Testimonial)}
        {renderSection('services', ProjectsServices)}
        {renderSection('training', Training)}
        {renderSection('team', Team)}
      </div>

      {/* Bottom Sections */}
      {renderSection('contact', Contact)}
      {renderSection('faq', FAQ)}
      {renderSection('footer', Footer)}
    </>
  );
};

export default PageLayout;
