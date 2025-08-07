// src/components/EmailVerification.js
import React, { useState } from 'react';
import EmailService from '../services/EmailService';

const EmailVerification = ({ email, onVerificationSuccess, onResendCode }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Here you would typically verify the code with your backend
      // For now, we'll just simulate success
      console.log('Verifying code:', verificationCode);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onVerificationSuccess(verificationCode);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setError('');

    try {
      const newCode = EmailService.generateVerificationCode();
      const result = await EmailService.sendVerificationCode(email, newCode, 'User');
      
      if (result.success) {
        onResendCode(newCode);
        alert('New verification code sent to your email!');
      } else {
        setError('Failed to resend verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to resend verification code. Please try again.');
    } finally {
      setResendLoading(false);
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
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
        
        <h1 style={{
          color: '#2d4654',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          Verify Your Email
        </h1>
        
        <p style={{
          color: '#666',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}>
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </p>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c53030',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerifyCode}>
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').substring(0, 6);
                setVerificationCode(value);
                if (error) setError('');
              }}
              placeholder="Enter 6-digit code"
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
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            style={{
              width: '100%',
              background: (loading || verificationCode.length !== 6) 
                ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
              color: 'white',
              padding: '1.2rem',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: (loading || verificationCode.length !== 6) ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div style={{
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Didn't receive the code?
          </p>
          
          <button
            onClick={handleResendCode}
            disabled={resendLoading}
            style={{
              background: 'transparent',
              color: '#7ca5b8',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: resendLoading ? 'not-allowed' : 'pointer',
              textDecoration: 'underline'
            }}
          >
            {resendLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
