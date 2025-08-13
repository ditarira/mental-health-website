// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com/api';

// Create axios-like instance for API calls
const api = {
  get: async (url) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  post: async (url, data) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
};

const resourceService = {
  // Get all resources
  getResources: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);
      if (params.featured) queryParams.append('featured', params.featured);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/resources?${queryString}` : '/resources';
      
      const response = await api.get(url);
      return response;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  // Get single resource
  getResource: async (id) => {
    try {
      const response = await api.get(`/resources/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  },

  // Save user favorites
  saveFavorites: async (resourceIds) => {
    try {
      const response = await api.post('/resources/favorites', { resourceIds });
      return response;
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  },

  // Get user favorites
  getFavorites: async () => {
    try {
      const response = await api.get('/resources/favorites/user');
      return response;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  // Get resource statistics
  getStats: async () => {
    try {
      const response = await api.get('/resources/stats');
      return response;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Seed resources (admin function)
  seedResources: async () => {
    try {
      const response = await api.get('/resources/seed');
      return response;
    } catch (error) {
      console.error('Error seeding resources:', error);
      throw error;
    }
  }
};

export default resourceService;
