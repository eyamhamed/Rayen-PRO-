import React, { useState, useEffect } from 'react';
import "./NosClients.css";
import { FaStar } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Aos from "aos";
import "aos/dist/aos.css";

const NosClients = () => {
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    text: '',
    rating: 5
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: ''
  });

  useEffect(() => {
    Aos.init({ duration: 500 });
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews/approved');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      });
      
      if (!response.ok) {
        throw new Error('Error submitting review');
      }
      
      setNewReview({ name: '', text: '', rating: 5 });
      setShowModal(false);
      setSubmitStatus({
        show: true,
        success: true,
        message: 'Merci pour votre avis ! Il sera affiché après modération.'
      });
      
      // Hide status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ ...submitStatus, show: false });
      }, 5000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    }
  };

  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  if (loading) {
    return <div className="loading">Chargement des avis...</div>;
  }

  return (
    <div className='clients' id="clients">
      <h1 data-aos="fade-down" className='titre-clients'>AVIS CLIENTS</h1>
      
      {submitStatus.show && (
        <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <button 
        className="add-review-btn" 
        onClick={() => setShowModal(true)}
        data-aos="fade-up"
      >
        AJOUTER UN AVIS
      </button>
      
      <div className="reviews-grid">
        {reviews.length === 0 ? (
          <p className="no-reviews">Aucun avis pour le moment</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review._id}
              className="review-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-name">- {review.name}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" data-aos="fade-down">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <AiOutlineClose />
            </button>
            <h2>Ajouter un avis</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="rating-select">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < newReview.rating ? 'star-filled' : 'star-empty'}
                    onClick={() => handleRatingClick(index + 1)}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Votre nom"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Votre avis"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                required
              />
              <button type="submit">SOUMETTRE</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NosClients;