import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmailService from '../services/EmailService';

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
  const [step, setStep] = useState(1); // 1: form, 2: email verification
  const [verificationCode, setVerificationCode] = useState('');
  const [userVerificationCode, setUserVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      // Generate verification code
      const code = EmailService.generateVerificationCode();
      setVerificationCode(code);

      // Send verification email
      const emailResult = await EmailService.sendVerificationCode(
        formData.email,
        code,
        `${formData.firstName} ${formData.lastName}`
      );

      if (emailResult.success) {
        setStep(2); // Move to verification step
      } else {
        // If email fails, register anyway but skip verification
        console.warn('Email failed, registering without verification');
        await completeRegistration();
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (userVerificationCode === verificationCode) {
      await completeRegistration();
    } else {
      setError('Invalid verification code. Please try again.');
      setLoading(false);
    }
  };

  const completeRegistration = async () => {
    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        // Send welcome email
        EmailService.sendWelcomeEmail(formData.email, formData.firstName);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
        setStep(1); // Go back to form
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);
    try {
      const code = EmailService.generateVerificationCode();
      setVerificationCode(code);
      
      await EmailService.sendVerificationCode(
        formData.email,
        code,
        `${formData.firstName} ${formData.lastName}`
      );
      
      setError('');
      alert('New verification code sent!');
    } catch (error) {
      setError('Failed to resend code');
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
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <span style={{ color: 'white' }}>🧠</span>
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            {step === 1 ? 'Join MindfulMe' : 'Verify Your Email'}
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            {step === 1 
              ? 'Start your mental wellness journey today' 
              : `We sent a verification code to ${formData.email}`
            }
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {step === 1 ? (
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
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
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
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
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
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
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
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
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
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
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
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1rem'
              }}
            >
              {loading ? 'Creating Account...' : '📧 Create Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📧</div>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Enter the 6-digit code we sent to your email
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="000000"
                value={userVerificationCode}
                onChange={(e) => setUserVerificationCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.5rem',
                  outline: 'none'
                }}
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1rem'
              }}
            >
              {loading ? 'Verifying...' : '✅ Verify & Complete'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={resendCode}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.9rem'
                }}
              >
                Didn't receive code? Resend
              </button>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={{ color: '#666' }}>Already have an account? </span>
          <Link 
            to="/login" 
            style={{ 
              color: '#667eea', 
              textDecoration: 'none', 
              fontWeight: '600' 
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
