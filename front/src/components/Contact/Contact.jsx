// src/components/Contact/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Error submitting form');
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Show success message
      setSubmitStatus({
        show: true,
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.'
      });
      
      // Hide status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ ...submitStatus, show: false });
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    }
  };

  return (
    <div className="contact-section" id="contact">
      <h1 data-aos="fade-down" className="contact-title">NOUS CONTACTER</h1>
      
      {submitStatus.show && (
        <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <div className="contact-container">
        <div className="contact-info" data-aos="fade-right">
          <div className="info-item">
            <FaPhone className="info-icon" />
            <div>
              <h3>Téléphone</h3>
              <p>+33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>contact@rayane-pro.fr</p>
            </div>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Adresse</h3>
              <p>123 Rue Principale, 75000 Paris</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form" data-aos="fade-left">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom et Prénom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">ENVOYER</button>
          </form>
        </div>
      </div>
      
      {/* Google Maps Embed */}
      <div className="map-container" data-aos="fade-up">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.75769373754!2d2.277319!3d48.85889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1649962265358!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Notre emplacement"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;