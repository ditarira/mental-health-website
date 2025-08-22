import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import emailjs from '@emailjs/browser';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // ADD THESE FORGOT PASSWORD STATES
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetStep, setResetStep] = useState('email');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User state updated, redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!formData.password || !formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email.trim(), formData.password);
      
      if (result && result.success) {
        console.log('Login successful, user:', result.user);
        // The useEffect should handle redirect when user state updates
      } else {
        setError(result?.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ADD FORGOT PASSWORD FUNCTIONS
  const sendResetCode = async () => {
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setError('');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    try {
      // Try different variable names
      await emailjs.send(
        'service_124ityi',
        'template_obyjj06',
        {
          to_email: forgotEmail,      // Try 'to_email' instead of 'email'
          to_name: 'User',           // Try 'to_name' instead of 'user_name'  
          code: code                 // Try 'code' instead of 'reset_code'
        },
        'oFTP-7JkGYa9jCIZK'
      );  
      
      setResetStep('code');
      setMessage('✅ Reset code sent to your email! Check your inbox and spam folder.');
    } catch (error) {
      console.error('EmailJS error:', error);
      setError('❌ Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const verifyResetCode = () => {
    if (resetCode !== generatedCode) {
      setError('❌ Invalid reset code. Please check your email.');
      return;
    }
    setResetStep('newpassword');
    setError('');
  };

  const resetPassword = async () => {
  if (newPassword !== confirmPassword) {
    setError('❌ Passwords do not match');
    return;
  }
  if (newPassword.length < 6) {
    setError('❌ Password must be at least 6 characters');
    return;
  }
  setLoading(true);
  try {
    // FIXED: Use generatedCode as the token
    const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token: generatedCode,  // ✅ Use code as token
        newPassword: newPassword 
      })
    });
    
    const result = await response.json();
    if (response.ok) {
      // AUTO-LOGIN AFTER PASSWORD RESET
      setMessage('✅ Password reset successfully! Logging you in...');

      // Login with new password
      const loginResult = await login(forgotEmail, newPassword);

      if (loginResult.success) {
        navigate('/dashboard');
      } else {
        setMessage('✅ Password reset successfully! Please login with your new password.');
        setShowForgotPassword(false);
        setResetStep('email');
        // Clear form
        setForgotEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setGeneratedCode('');
      }
    } else {
      setError(result.message || 'Failed to reset password');
    }
  } catch (error) {
    console.error('Reset password error:', error);
    setError('❌ Network error. Please try again.');
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(''), 5000);
  }
};

  if (user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <div>Redirecting to dashboard...</div>
        </div>
      </div>
    );
  }

  // ADD FORGOT PASSWORD FORM UI
  if (showForgotPassword) {
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
              <span style={{ color: 'white' }}>🔑</span>
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
              {resetStep === 'email' && 'Forgot Password'}
              {resetStep === 'code' && 'Enter Reset Code'}
              {resetStep === 'newpassword' && 'Set New Password'}
            </h1>
            <p style={{ 
              color: '#666', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: '1.5'
            }}>
              {resetStep === 'email' && 'Enter your email to reset password'}
              {resetStep === 'code' && `We sent a code to ${forgotEmail}`}
              {resetStep === 'newpassword' && 'Choose your new password'}
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

          {message && (
            <div style={{
              background: '#dcfce7',
              color: '#166534',
              padding: isMobile ? '1rem' : '1.2rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>
              {message}
            </div>
          )}

          {resetStep === 'email' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: isMobile ? '1rem' : '1.2rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              <button
                onClick={sendResetCode}
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
                {loading ? 'Sending...' : '📧 Send Reset Code'}
              </button>
            </div>
          )}

          {resetStep === 'code' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '1rem' : '1.2rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    textAlign: 'center',
                    letterSpacing: '0.5rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="000000"
                  maxLength="6"
                />
              </div>
              <button
                onClick={verifyResetCode}
                disabled={resetCode.length !== 6}
                style={{
                  width: '100%',
                  background: resetCode.length !== 6 ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: isMobile ? '1rem' : '1.2rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: '600',
                  cursor: resetCode.length !== 6 ? 'not-allowed' : 'pointer',
                  marginBottom: '1rem'
                }}
              >
                ✅ Verify Code
              </button>
            </div>
          )}

          {resetStep === 'newpassword' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '1rem' : '1.2rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="New Password"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '1rem' : '1.2rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Confirm Password"
                />
              </div>
              <button
                onClick={resetPassword}
                disabled={loading || !newPassword || !confirmPassword}
                style={{
                  width: '100%',
                  background: loading || !newPassword || !confirmPassword ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: isMobile ? '1rem' : '1.2rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: '600',
                  cursor: loading || !newPassword || !confirmPassword ? 'not-allowed' : 'pointer',
                  marginBottom: '1rem'
                }}
              >
                {loading ? 'Resetting...' : '🔐 Reset Password'}
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetStep('email');
                setError('');
                setMessage('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontSize: isMobile ? '0.9rem' : '1rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Welcome Back
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: '1.5'
          }}>
            Sign in to continue your mental wellness journey
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

        {message && (
          <div style={{
            background: '#dcfce7',
            color: '#166534',
            padding: isMobile ? '1rem' : '1.2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
              required
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Email Address"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                padding: isMobile ? '1rem' : '1.2rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Password"
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                fontSize: isMobile ? '0.9rem' : '1rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.email.trim() || !formData.password.trim()}
            style={{
              width: '100%',
              background: loading || !formData.email.trim() || !formData.password.trim()
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: isMobile ? '1rem' : '1.2rem',
              borderRadius: '12px',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              cursor: loading || !formData.email.trim() || !formData.password.trim() ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ 
            color: '#666',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            Don't have an account? 
          </span>
          <Link
            to="/register"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem',
              marginLeft: '0.25rem'
            }}
          >
            Create New Account
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

export default Login;