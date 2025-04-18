// src/services/api.js

/**
 * Dynamically determines the API base URL based on the current environment
 * This handles GitHub Codespaces, local development, and production environments
 */
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // GitHub Codespaces
  if (hostname.includes('github.dev') || hostname.includes('codespaces')) {
    // Get the codespace domain and change port from frontend (3000) to backend (5000)
    // This works when you've made port 5000 public in Codespaces
    const codespaceUrl = window.location.origin;
    return codespaceUrl.replace('3000', '5000');
  }
  
  // Production environment - adjust as needed
  return '/api'; // In production, you might use a relative path if using the same domain
};

// Base API URL
const API_BASE_URL = getApiBaseUrl();

/**
 * Generic API request handler with authentication
 */
const apiRequest = async (endpoint, options = {}) => {
  // Get auth token if it exists
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Build request options
  const requestOptions = {
    ...options,
    headers,
  };
  
  // Make the request
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // If response is not ok, throw error with message from server
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } else {
      // Handle non-JSON response
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API service methods
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    
    changePassword: (passwordData) => apiRequest('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    }),
  },
  
  // Reviews endpoints
  reviews: {
    getApproved: () => apiRequest('/api/reviews/approved'),
    getAll: () => apiRequest('/api/reviews'),
    create: (review) => apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
    }),
    approve: (id) => apiRequest(`/api/reviews/${id}/approve`, {
      method: 'PATCH',
    }),
    delete: (id) => apiRequest(`/api/reviews/${id}`, {
      method: 'DELETE',
    }),
  },
  
  // Contacts endpoints
  contacts: {
    getAll: () => apiRequest('/api/contacts'),
    create: (contact) => apiRequest('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    }),
    markAsRead: (id) => apiRequest(`/api/contacts/${id}/read`, {
      method: 'PATCH',
    }),
    delete: (id) => apiRequest(`/api/contacts/${id}`, {
      method: 'DELETE',
    }),
  },
};

export default api;