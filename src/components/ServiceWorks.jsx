import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ServiceWorks.css';

const ServiceWorks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const blockScroll = !!selectedImage;
    document.body.style.overflow = blockScroll ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  if (loading) return <div className="loading-spinner">Loading projects...</div>;

  if (!service) {
    return (
      <div className="service-works-container">
        <div className="service-not-found">
          <h2>Service not found</h2>
          <HashLink to="/#services"><button className="btn btn-primary">Go Back</button></HashLink>
        </div>
      </div>
    );
  }

  // Use the dynamic works array from Firestore
  const works = service.works || [];

  return (
    <div className="service-works-container">
      <div className="service-works-header">
        <HashLink to="/#services"><button className="back-button">← Back to Services</button></HashLink>
        <div className="service-info">
          <div className="service-icon-large"><span>{service.icon}</span></div>
          <div>
            <h1>{service.name}</h1>
            <p className="service-description">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="works-section">
        <h2>Our Project Gallery</h2>
        <p className="works-subtitle">Real-world results from our professional team</p>

        {works.length > 0 ? (
          <div className="works-grid">
            {works.map((work, index) => (
              <div key={index} className="work-card" onClick={() => setSelectedImage(work.image)}>
                <div className="work-image"><img src={work.image} alt={work.title} /></div>
                <div className="work-info">
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-works"><p>No specific project photos uploaded for this service yet.</p></div>
        )}
      </div>

      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} className="modal">
          <span className="close">&times;</span>
          <img src={selectedImage} alt="Full View" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default ServiceWorks;
