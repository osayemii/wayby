import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="animated-background"></div>
        <div className="hero-overlay"></div>
      </div>

      <div className="container-2">
        <div className="hero-content">
          <h1 className="hero-title">
            Wayby Classic Furniture
            <br/>&<br/>
            <span className="highlight"> Multiservice Ltd</span>
          </h1>
          <p className="hero-subtitle">
            Transform your space with our exquisite furniture collection and comprehensive home improvement services including electrical work, plumbing, and interior design.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToCategories}>
              Explore Products
            </button>
            <a href="#services">
              <button className="btn btn-secondary">
                Our Services
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;