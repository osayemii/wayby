import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { migrateAllData } from '../utils/migrateData';
import './Services.css';

const scrollToContact = () => {
  const contactSection = document.getElementById('contact-form-co');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (servicesData.length === 0) {
          // Automatic migration if empty
          console.log("Database empty, starting automatic migration...");
          await migrateAllData();
          // Fetch again after migration
          const newSnapshot = await getDocs(collection(db, "services"));
          const newServicesData = newSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setServices(newServicesData);
        } else {
          setServices(servicesData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services: ", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  if (loading) return <div className="text-center p-5">Loading services...</div>;

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2>Multipurpose Home Services</h2>
          <p>Beyond furniture, we offer comprehensive home services to complete your living space transformation.</p>
          {services.length === 0 && (
            <button className="btn btn-secondary mt-3" onClick={migrateAllData}>
              Initialize Services Data
            </button>
          )}
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
            >
              <div className="service-image">
                <img src={service.image} alt={service.name} />
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
              </div>
              <div className="service-content">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <h3>{service.name}</h3>
                  {service.works && service.works.length > 0 && (
                    <span className="gallery-badge" style={{fontSize: '0.7rem', background: '#8B7355', color: 'white', padding: '2px 8px', borderRadius: '10px'}}>
                      {service.works.length} Projects
                    </span>
                  )}
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features && service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-check" style={{color: '#fff', backgroundColor: '#8B7355', fontSize: '0.8rem'}}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-actions" style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                   <button className="btn btn-primary" onClick={scrollToContact} style={{flex: 1}}>Get Quote</button>
                   {service.works && service.works.length > 0 && (
                     <button className="btn btn-secondary" onClick={() => handleServiceClick(service.id)} style={{flex: 1, padding: '10px', fontSize: '0.9rem'}}>View Gallery</button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;