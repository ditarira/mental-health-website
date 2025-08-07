import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('🔍 Checking authentication status...');
      
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('✅ Found existing session for user:', parsedUser.email);
          setUser(parsedUser);
        } catch (error) {
          console.error('❌ Error parsing stored user data:', error);
          // Clear corrupted data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('ℹ️ No existing session found');
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    console.log('🔐 AuthContext login attempt for:', email);
    
    try {
      // Admin check first
      if (email === 'admin@mindfulme.com' && password === 'admin123') {
        console.log('👑 Admin login detected');
        const adminUser = {
          id: 'admin-user',
          email: 'admin@mindfulme.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN'
        };
        
        const adminToken = 'admin-token-' + Date.now();
        
        // Store admin session
        localStorage.setItem('token', adminToken);
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        
        console.log('✅ Admin login successful');
        return { success: true, user: adminUser };
      }

      // Regular API login
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      console.log('🌐 Attempting API login to:', API_BASE);

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ API login successful:', data);

        if (data.success && data.user && data.token) {
          // Store the token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          
          return { success: true, user: data.user };
        } else {
          console.error('❌ Invalid API response format:', data);
          return { success: false, error: 'Invalid response from server' };
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API login failed:', response.status, errorData);
        return { 
          success: false, 
          error: errorData.message || `Login failed (${response.status})` 
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Fallback for demo purposes
      if (email === 'demo@mindfulme.com' && password === 'demo123') {
        console.log('🎭 Demo login detected - using fallback');
        const demoUser = {
          id: 'demo-user',
          email: 'demo@mindfulme.com',
          firstName: 'Demo',
          lastName: 'User',
          role: 'USER'
        };
        
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        
        return { success: true, user: demoUser };
      }
      
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      };
    }
  };

  const register = async (userData) => {
    console.log('📝 AuthContext register attempt for:', userData.email);
    
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Registration successful:', data);

        if (data.success && data.user && data.token) {
          // Store the token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          
          return { success: true, user: data.user };
        } else {
          return { success: false, error: 'Invalid response from server' };
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Registration failed:', errorData);
        return { 
          success: false, 
          error: errorData.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user:', user?.email);
    
    // Clear all stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('journalEntries');
    localStorage.removeItem('breathingSessions');
    localStorage.removeItem('notificationSettings');
    localStorage.removeItem('appearanceSettings');
    
    setUser(null);
    console.log('✅ Logout complete');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
