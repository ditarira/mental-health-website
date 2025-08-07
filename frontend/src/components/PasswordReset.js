// src/components/PasswordReset.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailService from '../services/EmailService';

const PasswordReset = () => {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const code = EmailService.generateResetCode();
      const result = await EmailService.sendPasswordResetCode(email, code, 'User');
      
      if (result.success) {
        setGeneratedCode(code);
        setStep(2);
        console.log('Reset code sent:', code); // For testing
      } else {
        setError('Failed to send reset code. Please try again.');
      }
    } catch (err) {
      setError('Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    
    if (resetCode !== generatedCode) {
      setError('Invalid reset code. Please try again.');
      return;
    }
    
    setError('');
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would call your backend to actually reset the password
    console.log('Password reset successful for:', email);
    alert('Password reset successful! You can now login with your new password.');
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
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{
            color: '#2d4654',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Reset Password
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            {step === 1 && 'Enter your email to receive a reset code'}
            {step === 2 && 'Enter the 5-digit code sent to your email'}
            {step === 3 && 'Create your new password'}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c53030',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendResetCode}>
            <div style={{ marginBottom: '2rem' }}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
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
                marginBottom: '1rem'
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div style={{ marginBottom: '2rem' }}>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').substring(0, 5);
                  setResetCode(value);
                  if (error) setError('');
                }}
                placeholder="Enter 5-digit code"
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.2rem',
                  fontWeight: 'bold'
                }}
                maxLength={5}
              />
            </div>

            <button
              type="submit"
              disabled={resetCode.length !== 5}
              style={{
                width: '100%',
                background: resetCode.length !== 5
                  ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                  : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
                color: 'white',
                padding: '1.2rem',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: resetCode.length !== 5 ? 'not-allowed' : 'pointer',
                marginBottom: '1rem'
              }}
            >
              Verify Code
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
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
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter new password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Confirm new password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
                color: 'white',
                padding: '1.2rem',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Reset Password
            </button>
          </form>
        )}

        <div style={{
          textAlign: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <Link
            to="/login"
            style={{
              color: '#7ca5b8',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
