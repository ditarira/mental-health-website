import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

const login = async (email, password) => {
  try {
    console.log('🔐 Attempting login...', { email });
    
    const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('🔐 Login response:', data);

    if (response.ok && data.token) {
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      console.log('🔐 Token saved:', data.token);
      
      // Save user to localStorage (THIS WAS MISSING!)
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('🔐 User saved to localStorage:', data.user);
      
      // Update states
      setToken(data.token);
      setUser(data.user);
      console.log('🔐 User state updated:', data.user);
      
      // Return success
      return { success: true, user: data.user };
    } else {
      console.log('🔐 Login failed:', data.error);
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    console.error('🔐 Login error:', error);
    return { success: false, error: 'Network error' };
  }
};
  const register = async (userData) => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      
      console.log('📝 Registration attempt for:', userData.email);
      console.log('📝 Registration data:', userData);
      
      // Extract data from userData object
      const { firstName, lastName, email, password } = userData;
      
      // Validate required fields
      if (!email || !password || !firstName || !lastName) {
        const missingFields = [];
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!firstName) missingFields.push('firstName');
        if (!lastName) missingFields.push('lastName');
        
        console.error('❌ Missing required fields:', missingFields);
        return { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        };
      }

      const requestBody = {
        email: email.trim(),
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      };

      console.log('📤 Sending registration request:', requestBody);

      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('📨 Registration response:', data);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ Registration successful, user logged in');
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN' || user?.email === 'admin@mindfulme.com'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
