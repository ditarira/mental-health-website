import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🧠</div>
          <h1 className="app-title">Welcome Back!</h1>
          <p className="app-subtitle">Sign in to continue your mental wellness journey</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffe6e6',
            color: '#e74c3c',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            border: '1px solid #e74c3c'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #eee',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
              placeholder="Enter your email"
            />
          </div>

          <div style={{marginBottom: '2rem'}}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #eee',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = '#eee'}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}
          >
            {loading ? '🔄 Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          <p>Don't have an account? {' '}
            <Link to="/register" className="link-btn">
              ✨ Create Account
            </Link>
          </p>
        </div>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'var(--light)',
          borderRadius: '10px'
        }}>
          <p style={{fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '0.5rem'}}>
            🔒 Your data is secure and private
          </p>
          <p style={{fontSize: '0.8rem', color: '#777'}}>
            We use industry-standard encryption to protect your information
          </p>
        </div>

        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
          <Link 
            to="/" 
            style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
