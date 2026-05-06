import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const { name, email, phone, message } = formData;
    
    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: new Date(),
        status: 'unread'
      });

      // 2. Open Email (mailto)
      const emailRecipient = 'waybyclassicfurniture@gmail.com';
      const emailSubject = `New Inquiry from ${name}`;
      const emailBody = `Full Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage:%0D%0A${message}`;
      
      window.location.href = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;

      alert("Thank you! Your message has been saved. Your email application will now open to send the inquiry.");
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again or contact us via WhatsApp directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section bg-light">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2>Get in Touch</h2>
          <p>Have questions about our furniture or need design consultation? We're here to help you create the perfect space.</p>
        </div>

        <div className="contact-content grid grid-2">
          <div className="contact-info">
            <h3>Visit Our Showroom</h3>
            <p>Experience our furniture collection in person at our beautiful showroom.</p>

            <div className="contact-details">
              <div className="contact-item">
                <h4>Address</h4>
                <p>House No. 5, Madaki Street,<br />Kaba, Kagini, Abuja, Nigeria</p>
              </div>

              <div className="contact-item">
                <h4>Phone</h4>
                <p>(+234) 706-6857-747</p>
              </div>

              <div className="contact-item">
                <h4>Email</h4>
                <p>waybyclassicfurniture@gmail.com</p>
              </div>

              <div className="contact-item">
                <h4>Hours</h4>
                <p>
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 10:00 AM - 6:00 PM<br />
                  Sunday: <span className='contact-item-span'>Closed</span>
                </p>
              </div>
            </div>
          </div>

          <div id='contact-form-co' className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Full Name'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='name@gmail.com'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type='tel'
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='+234 000 0000 000'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your furniture needs or ask any questions..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" id='submit' disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;