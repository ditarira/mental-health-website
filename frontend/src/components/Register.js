import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      console.log('🔍 Registration result:', result);

      if (result.success) {
        console.log('✅ Registration successful, user logged in, redirecting to dashboard');
        navigate('/dashboard');
      } else {
        setError(result.message || result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration catch error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: isMobile ? '2.5rem' : '3.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: isMobile ? '400px' : '550px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: isMobile ? '3rem' : '3.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            width: isMobile ? '80px' : '100px',
            height: isMobile ? '80px' : '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <span style={{ color: 'white' }}>🧠</span>
          </div>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Join MindfulMe
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.5'
          }}>
            Start your mental wellness journey today
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: isMobile ? '1rem' : '1.2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: isMobile ? '1rem' : '1.2rem',
              borderRadius: '12px',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Creating Account...' : '🚀 Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ 
            color: '#666',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            Already have an account? 
          </span>
          <Link 
            to="/login" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem',
              marginLeft: '0.25rem'
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Back to Home Link */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#9ca3af', 
              textDecoration: 'none', 
              fontSize: isMobile ? '0.9rem' : '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;