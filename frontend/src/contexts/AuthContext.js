import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('🔍 Checking stored token:', token ? 'Found' : 'Not found');

      if (!token) {
        console.log('❌ No token found, user not authenticated');
        setLoading(false);
        return;
      }

      console.log('🔐 Verifying token with backend...');

      // Use the correct verify endpoint
      const response = await axios.get(API_BASE + '/api/auth/verify', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      console.log('✅ Token verified, user data:', response.data);
      setUser(response.data.user);

      // Set default header for future requests
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    } catch (error) {
      console.error('❌ Token verification failed:', error.response?.data || error.message);

      // Clear invalid token
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      console.log('📡 API Base URL:', API_BASE);
      console.log('📡 Sending request to:', API_BASE + '/api/auth/login');

      const requestData = { email, password };
      console.log('📤 Request data:', { email, password: '[HIDDEN]' });

      const response = await axios.post(API_BASE + '/api/auth/login', requestData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });

      console.log('📡 Full response:', response);
      console.log('📊 Response status:', response.status);
      console.log('📋 Response data:', response.data);

      const { token, user: userData } = response.data;

      if (token && userData) {
        // Store token
        localStorage.setItem('token', token);

        // Set header
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        // Set user
        setUser(userData);

        console.log('✅ Login successful:', userData.email);
        return { success: true, user: userData };
      } else {
        console.log('❌ Invalid response format:', response.data);
        return { success: false, error: 'Invalid response from server' };
      }

    } catch (error) {
      console.error('❌ Full login error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error data:', error.response?.data);
      console.error('❌ Error headers:', error.response?.headers);
      
      let errorMessage = 'Login failed';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.error || 
                      error.response.data?.message || 
                      'Server error: ' + error.response.status;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something else went wrong
        errorMessage = error.message || 'An unexpected error occurred';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      console.log('📝 Registration attempt:', Object.assign({}, userData, { password: '[HIDDEN]' }));
      
      const response = await axios.post(API_BASE + '/api/auth/register', userData);
      const { token, user: newUser } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Registration failed';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    console.log('👋 Logging out user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAdmin = () => {
    return user && (user.role === 'ADMIN' || user.email === 'admin@mindfulme.com');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: isAdmin(),
    initializeAuth
  };

  console.log('🔄 AuthContext state:', {
    userEmail: user?.email,
    isAdmin: isAdmin(),
    loading,
    apiBase: API_BASE
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
