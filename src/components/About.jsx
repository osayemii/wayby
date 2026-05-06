import React from 'react';
import './About.css';
import livingroom from '../assets/Livingroom/livingroom.jpg';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-content grid grid-2">
          <div className="about-text">
            <h2>Furniture Excellence & Complete Home Solutions</h2>
            <p>
              For over three decades, Wayby Classic has been your trusted partner for premium 
              furniture and comprehensive home services. We've evolved from a furniture specialist 
              to a complete home solution provider, offering everything from handcrafted furniture 
              to professional electrical, plumbing, and renovation services.
            </p>
            <p>
              Our team of skilled craftsmen, electricians, plumbers, and specialists work together 
              to transform your living spaces. Whether you need a single piece of furniture or a 
              complete home makeover, we deliver excellence in every project.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <h3>30+</h3>
                <p>Years of Experience</p>
              </div>
              <div className="stat">
                <h3>8000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <h3>6</h3>
                <p>Service Categories</p>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-primary">Learn More</a>
          </div>
          
          <div className="about-image">
            <img 
              src={livingroom}
              alt="Beautiful furnished living room showcasing our work"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;