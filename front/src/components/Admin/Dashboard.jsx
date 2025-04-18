// src/components/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import api from '../../services/api';
import { 
  FaStar, 
  FaSignOutAlt, 
  FaCheckCircle, 
  FaTrashAlt, 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaSpinner, 
  FaTimes, 
  FaCog, 
  FaEye, 
  FaEyeSlash, 
  FaLock,
  FaArrowLeft
} from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState({
    type: null,
    id: null
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [changingPassword, setChangingPassword] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
      return;
    }

    // Fetch data
    fetchReviews();
    fetchContacts();
  }, [navigate]);

  // Close message detail when tab changes
  useEffect(() => {
    setSelectedMessage(null);
  }, [activeTab]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await api.reviews.getAll();
      setReviews(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch reviews: ' + error.message);
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await api.contacts.getAll();
      setContacts(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch contacts: ' + error.message);
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id) => {
    try {
      setActionLoading({ type: 'approve', id });
      await api.reviews.approve(id);
      // Update reviews list
      fetchReviews();
    } catch (error) {
      setError('Failed to approve review: ' + error.message);
    } finally {
      setActionLoading({ type: null, id: null });
    }
  };

  const deleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        setActionLoading({ type: 'deleteReview', id });
        await api.reviews.delete(id);
        // Update reviews list
        fetchReviews();
      } catch (error) {
        setError('Failed to delete review: ' + error.message);
      } finally {
        setActionLoading({ type: null, id: null });
      }
    }
  };

  const markContactAsRead = async (id) => {
    try {
      setActionLoading({ type: 'read', id });
      await api.contacts.markAsRead(id);
      // Update contacts list
      fetchContacts();
    } catch (error) {
      setError('Failed to mark contact as read: ' + error.message);
    } finally {
      setActionLoading({ type: null, id: null });
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        setActionLoading({ type: 'deleteContact', id });
        await api.contacts.delete(id);
        // Update contacts list
        fetchContacts();
        // Close message detail if the deleted contact was selected
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        setError('Failed to delete contact: ' + error.message);
      } finally {
        setActionLoading({ type: null, id: null });
      }
    }
  };

  const openMessageDetail = (contact) => {
    setSelectedMessage(contact);
    // If message is unread, mark it as read
    if (contact && !contact.read) {
      markContactAsRead(contact._id);
    }
  };

  const closeMessageDetail = () => {
    setSelectedMessage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin');
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }
    
    try {
      setChangingPassword(true);
      
      // Call your API to change password
      await api.auth.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      // Close modal and show success message
      setShowSettingsModal(false);
      setSuccess('Password changed successfully');
      
      // Clear password data
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setPasswordErrors({
        form: error.message || 'Failed to change password. Please check your current password.'
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading && reviews.length === 0 && contacts.length === 0) {
    return <div className="dashboard-loading">Chargement des données...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Administration</h2>
        <div className="header-actions">
          <button className="settings-button" onClick={openSettingsModal} title="Paramètres">
            <FaCog />
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </div>
      
      {error && <div className="dashboard-error">{error}</div>}
      {success && <div className="dashboard-success">{success}</div>}
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'reviews' ? 'active' : ''} 
          onClick={() => setActiveTab('reviews')}
        >
          <FaStar /> Avis Clients {reviews.filter(r => !r.approved).length > 0 && 
            <span className="badge">{reviews.filter(r => !r.approved).length}</span>
          }
        </button>
        <button 
          className={activeTab === 'contacts' ? 'active' : ''} 
          onClick={() => setActiveTab('contacts')}
        >
          <FaEnvelope /> Messages {contacts.filter(c => !c.read).length > 0 && 
            <span className="badge">{contacts.filter(c => !c.read).length}</span>
          }
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'reviews' && (
          <div className="reviews-table-container">
            <h3>Gestion des Avis Clients</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Note</th>
                  <th>Avis</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">Aucun avis disponible</td>
                  </tr>
                ) : (
                  reviews.map(review => (
                    <tr key={review._id} className={review.approved ? 'approved' : 'pending'}>
                      <td data-label="Date">{formatDate(review.createdAt)}</td>
                      <td data-label="Nom">{review.name}</td>
                      <td data-label="Note" className="rating-cell">{renderStars(review.rating)}</td>
                      <td data-label="Avis" className="review-text-cell" title={review.text}>{review.text}</td>
                      <td data-label="Statut">
                        <span className={`status-badge ${review.approved ? 'approved' : 'pending'}`}>
                          {review.approved ? 'Approuvé' : 'En attente'}
                        </span>
                      </td>
                      <td data-label="Actions" className="actions-cell">
                        {!review.approved && (
                          <button 
                            className="approve-button" 
                            onClick={() => approveReview(review._id)}
                            disabled={actionLoading.type === 'approve' && actionLoading.id === review._id}
                          >
                            {actionLoading.type === 'approve' && actionLoading.id === review._id ? 
                              <FaSpinner className="spinner" /> : 
                              <FaCheckCircle />} Approuver
                          </button>
                        )}
                        <button 
                          className="delete-button" 
                          onClick={() => deleteReview(review._id)}
                          disabled={actionLoading.type === 'deleteReview' && actionLoading.id === review._id}
                        >
                          {actionLoading.type === 'deleteReview' && actionLoading.id === review._id ? 
                            <FaSpinner className="spinner" /> : 
                            <FaTrashAlt />} Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'contacts' && !selectedMessage && (
          <div className="contacts-table-container">
            <h3>Messages de Contact</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Message</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">Aucun message disponible</td>
                  </tr>
                ) : (
                  contacts.map(contact => (
                    <tr 
                      key={contact._id} 
                      className={contact.read ? 'read' : 'unread'}
                      onClick={() => openMessageDetail(contact)}
                    >
                      <td data-label="Date">{formatDate(contact.createdAt)}</td>
                      <td data-label="Nom">{contact.name}</td>
                      <td data-label="Email">
                        <a href={`mailto:${contact.email}`} className="email-link" onClick={(e) => e.stopPropagation()}>
                          {contact.email}
                        </a>
                      </td>
                      <td data-label="Téléphone">{contact.phone || 'N/A'}</td>
                      <td data-label="Message" className="message-cell" title={contact.message}>
                        {contact.message}
                      </td>
                      <td data-label="Statut">
                        <span className={`status-badge ${contact.read ? 'read' : 'unread'}`}>
                          {contact.read ? 'Lu' : 'Non lu'}
                        </span>
                      </td>
                      <td data-label="Actions" className="actions-cell" onClick={(e) => e.stopPropagation()}>
                        {!contact.read && (
                          <button 
                            className="read-button" 
                            onClick={() => markContactAsRead(contact._id)}
                            disabled={actionLoading.type === 'read' && actionLoading.id === contact._id}
                          >
                            {actionLoading.type === 'read' && actionLoading.id === contact._id ? 
                              <FaSpinner className="spinner" /> : 
                              <FaEnvelopeOpen />} Marquer lu
                          </button>
                        )}
                        <button 
                          className="delete-button" 
                          onClick={() => deleteContact(contact._id)}
                          disabled={actionLoading.type === 'deleteContact' && actionLoading.id === contact._id}
                        >
                          {actionLoading.type === 'deleteContact' && actionLoading.id === contact._id ? 
                            <FaSpinner className="spinner" /> : 
                            <FaTrashAlt />} Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'contacts' && selectedMessage && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h3>Détail du Message</h3>
              <button className="close-button" onClick={closeMessageDetail}>
                <FaTimes />
              </button>
            </div>
            <div className="message-detail-content">
              <div className="message-info">
                <div className="message-field">
                  <span className="field-label">Date:</span>
                  <span className="field-value">{formatDate(selectedMessage.createdAt)}</span>
                </div>
                <div className="message-field">
                  <span className="field-label">Nom:</span>
                  <span className="field-value">{selectedMessage.name}</span>
                </div>
                <div className="message-field">
                  <span className="field-label">Email:</span>
                  <span className="field-value">
                    <a href={`mailto:${selectedMessage.email}`} className="email-link">
                      {selectedMessage.email}
                    </a>
                  </span>
                </div>
                {selectedMessage.phone && (
                  <div className="message-field">
                    <span className="field-label">Téléphone:</span>
                    <span className="field-value">
                      <a href={`tel:${selectedMessage.phone}`} className="phone-link">
                        {selectedMessage.phone}
                      </a>
                    </span>
                  </div>
                )}
              </div>
              <div className="message-body">
                <span className="field-label">Message:</span>
                <div className="message-text">{selectedMessage.message}</div>
              </div>
              <div className="message-actions">
                <button 
                  className="delete-button" 
                  onClick={() => deleteContact(selectedMessage._id)}
                  disabled={actionLoading.type === 'deleteContact' && actionLoading.id === selectedMessage._id}
                >
                  {actionLoading.type === 'deleteContact' && actionLoading.id === selectedMessage._id ? 
                    <FaSpinner className="spinner" /> : 
                    <FaTrashAlt />} Supprimer
                </button>
                <button className="back-button" onClick={closeMessageDetail}>
                  <FaArrowLeft /> Retour
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal for Password Change */}
      {showSettingsModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-content">
            <div className="settings-modal-header">
              <h3>Paramètres</h3>
              <button className="close-button" onClick={closeSettingsModal}>
                <FaTimes />
              </button>
            </div>
            <div className="settings-modal-body">
              <form onSubmit={handleChangePassword}>
                {passwordErrors.form && (
                  <div className="form-error">{passwordErrors.form}</div>
                )}
                <div className="form-group">
                  <label htmlFor="currentPassword">Mot de passe actuel</label>
                  <div className="password-field">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <div className="form-error">{passwordErrors.currentPassword}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  <div className="password-field">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <div className="form-error">{passwordErrors.newPassword}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                  <div className="password-field">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <div className="form-error">{passwordErrors.confirmPassword}</div>
                  )}
                </div>
                <div className="settings-modal-footer">
                  <button type="button" className="cancel-button" onClick={closeSettingsModal}>
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={changingPassword}
                  >
                    {changingPassword ? 
                      <><FaSpinner className="spinner" /> Modification...</> : 
                      <><FaLock /> Modifier le mot de passe</>
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;