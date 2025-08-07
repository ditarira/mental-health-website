// src/components/EmailTest.js
import React, { useState } from 'react';
import EmailService from '../services/EmailService';

const EmailTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [confirmTest, setConfirmTest] = useState(false);

  const handleTest = async (testType) => {
    if (!testEmail) {
      alert('Please enter your email address first!');
      return;
    }

    if (!confirmTest) {
      alert('Please confirm you want to send a test email (this counts toward your EmailJS quota)!');
      return;
    }

    setLoading(true);
    setTestResult(null);

    try {
      const result = await EmailService.testEmailConfiguration(testEmail, testType);
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
      setConfirmTest(false); // Reset confirmation
    }
  };

  const quotaInfo = EmailService.getQuotaInfo();

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2d4654' }}>
        📧 EmailJS Test Panel
      </h2>
      
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #fbbf24',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <strong>⚠️ Warning:</strong> You're on the {quotaInfo.plan} plan ({quotaInfo.limit} emails/month).
        <br />Test emails count toward your quota!
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#374151',
          fontWeight: '600'
        }}>
          Your Email Address:
        </label>
        <input
          type="email"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#374151',
          fontWeight: '600'
        }}>
          <input
            type="checkbox"
            checked={confirmTest}
            onChange={(e) => setConfirmTest(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
          I understand this will use one of my free emails
        </label>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <button
          onClick={() => handleTest('verification')}
          disabled={loading || !testEmail || !confirmTest}
          style={{
            padding: '1rem',
            backgroundColor: (testEmail && confirmTest) ? '#10b981' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (loading || !testEmail || !confirmTest) ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? '⏳ Sending...' : '🔑 Test Verification'}
        </button>

        <button
          onClick={() => handleTest('reset')}
          disabled={loading || !testEmail || !confirmTest}
          style={{
            padding: '1rem',
            backgroundColor: (testEmail && confirmTest) ? '#f59e0b' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (loading || !testEmail || !confirmTest) ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? '⏳ Sending...' : '🔒 Test Password Reset'}
        </button>
      </div>

      {testResult && (
        <div style={{
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: testResult.success ? '#f0f9ff' : '#fef2f2',
          border: '1px solid ' + (testResult.success ? '#93c5fd' : '#fecaca'),
          marginBottom: '1rem'
        }}>
          <h4 style={{
            color: testResult.success ? '#1e40af' : '#dc2626',
            marginBottom: '0.5rem'
          }}>
            {testResult.success ? '✅ Test Email Sent!' : '❌ Test Failed'}
          </h4>
          
          <pre style={{
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: '1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      <div style={{
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#64748b'
      }}>
        <h4 style={{ color: '#374151', marginBottom: '1rem' }}>📋 Configuration:</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Service ID:</strong> service_wo991hq ✅</li>
          <li><strong>Public Key:</strong> W42E2JtVKWVg1M3t- ✅</li>
          <li><strong>Templates:</strong> template_verification, template_password_reset</li>
        </ul>
        
        <h4 style={{ color: '#374151', marginTop: '1.5rem', marginBottom: '1rem' }}>🎯 Email Types:</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Verification:</strong> Sent when users register</li>
          <li><strong>Password Reset:</strong> Sent when users forgot password</li>
          <li><strong>No Welcome Emails:</strong> To save quota</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailTest;
