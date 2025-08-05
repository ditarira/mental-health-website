import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
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
          <h1 className="app-title">Join MindfulMe</h1>
          <p className="app-subtitle">Start your mental wellness journey today</p>
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
              👤 Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              placeholder="Enter your full name"
            />
          </div>

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

          <div style={{marginBottom: '1.5rem'}}>
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
              minLength={6}
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
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div style={{marginBottom: '2rem'}}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              🔒 Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              placeholder="Confirm your password"
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
            {loading ? '🔄 Creating Account...' : '✨ Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <p>Already have an account? {' '}
            <Link to="/login" className="link-btn">
              🚀 Sign In
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
            🔒 Your privacy is our priority
          </p>
          <p style={{fontSize: '0.8rem', color: '#777'}}>
            We never share your personal information with third parties
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

export default Register;
