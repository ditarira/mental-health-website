import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import emailjs from '@emailjs/browser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (user) {
      console.log('User already logged in, redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      console.log('Attempting login...');
      const result = await login(email, password);
      if (result.success) {
        console.log('Login successful! Redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

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
      await emailjs.send(
        'service_770dbc6',
        'template_ggoczaq',
        {
          email: forgotEmail,
          user_name: 'User',
          reset_code: code
        },
        'vbeur3IfUOfHG1olR'
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
      const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, newPassword: newPassword })
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Password reset successfully! You can now login with your new password.');
        setShowForgotPassword(false);
        setResetStep('email');
        setForgotEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setGeneratedCode('');
      } else {
        setError(result.error || 'Failed to reset password');
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
    return <div>Redirecting...</div>;
  }

  if (showForgotPassword) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
            <h1 style={{
              color: '#2d4654',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              {resetStep === 'email' && 'Forgot Password'}
              {resetStep === 'code' && 'Enter Reset Code'}
              {resetStep === 'newpassword' && 'Set New Password'}
            </h1>
          </div>

          {(error || message) && (
            <div style={{
              background: error ? '#fee' : '#f0f9ff',
              color: error ? '#c53030' : '#1e40af',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              border: `1px solid ${error ? '#fecaca' : '#bfdbfe'}`,
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              {error || message}
            </div>
          )}

          {resetStep === 'email' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
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
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
                  color: 'white',
                  padding: '1.2rem',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '1.5rem'
                }}
              >
                {loading ? 'Sending...' : '📧 Send Reset Code'}
              </button>
            </div>
          )}

          {resetStep === 'code' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  Reset Code
                </label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    fontFamily: 'monospace',
                    textAlign: 'center',
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
                  padding: '1.2rem',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: resetCode.length !== 6 ? 'not-allowed' : 'pointer',
                  marginBottom: '1.5rem'
                }}
              >
                ✅ Verify Code
              </button>
            </div>
          )}

          {resetStep === 'newpassword' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter new password"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={resetPassword}
                disabled={loading || !newPassword || !confirmPassword}
                style={{
                  width: '100%',
                  background: loading || !newPassword || !confirmPassword ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '1.2rem',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: loading || !newPassword || !confirmPassword ? 'not-allowed' : 'pointer',
                  marginBottom: '1.5rem'
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
                color: '#7ca5b8',
                fontSize: '0.9rem',
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
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <h1 style={{
            color: '#2d4654',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Sign in to continue your mental wellness journey
          </p>
        </div>

        {(error || message) && (
          <div style={{
            background: error ? '#fee' : '#f0f9ff',
            color: error ? '#c53030' : '#1e40af',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: `1px solid ${error ? '#fecaca' : '#bfdbfe'}`,
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error || message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '600'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: loading ? '#f9fafb' : 'white',
                cursor: loading ? 'not-allowed' : 'text',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              onFocus={(e) => {
                e.target.style.borderColor = '#7ca5b8';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#374151',
              fontWeight: '600'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: loading ? '#f9fafb' : 'white',
                cursor: loading ? 'not-allowed' : 'text',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              onFocus={(e) => {
                e.target.style.borderColor = '#7ca5b8';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#7ca5b8',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
              color: 'white',
              padding: '1.2rem',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1.5rem'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                Signing In...
              </span>
            ) : (
              '🚀 Sign In'
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Don't have an account?
          </p>
          <Link
            to="/register"
            style={{
              color: '#7ca5b8',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'color 0.3s ease'
            }}
          >
            ✨ Create New Account
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link
            to="/"
            style={{
              color: '#7ca5b8',
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