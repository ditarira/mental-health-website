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
      const response = await axios.get(`${API_BASE}/api/auth/verify`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      console.log('✅ Token verified, user data:', response.data);
      setUser(response.data.user);
      
      // Set default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
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
      
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password
      });
      
      const { token, user: userData } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user
      setUser(userData);
      
      console.log('✅ Login successful:', userData.email);
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Login failed';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, userData);
      const { token, user: newUser } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
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
    loading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
