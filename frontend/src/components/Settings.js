import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState('form'); // 'form', 'code', 'success'
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: '',
    phone: '',
    location: ''
  });

  // Appearance settings
  const [appearanceData, setAppearanceData] = useState({
    fontSize: 'medium',
    colorScheme: 'purple'
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Load user profile
      const profileResponse = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfileData({
          firstName: profileData.user.firstName || '',
          lastName: profileData.user.lastName || '',
          email: profileData.user.email || '',
          bio: profileData.user.bio || '',
          phone: profileData.user.phone || '',
          location: profileData.user.location || ''
        });
      }

      // Load appearance settings
      const settingsResponse = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setAppearanceData(settingsData.settings);
        applyAppearanceSettings(settingsData.settings);
      }

    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const applyAppearanceSettings = (settings) => {
    const fontSize = settings.fontSize === 'small' ? '14px' : 
                    settings.fontSize === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSize;
    
    const backgroundColors = {
      purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      blue: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
      green: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)',
      pink: 'linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f472b6 100%)'
    };
    
    const background = backgroundColors[settings.colorScheme] || backgroundColors.purple;
    
    const existingStyle = document.getElementById('dynamic-theme');
    if (existingStyle) existingStyle.remove();
    
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-theme';
    styleElement.innerHTML = `
      html, body, #root {
        background: ${background} !important;
        background-attachment: fixed !important;
        min-height: 100vh !important;
      }
    `;
    document.head.appendChild(styleElement);
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setMessage('? Profile updated successfully!');
        const updatedUser = await response.json();
        if (updateUser) updateUser(updatedUser.user);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setMessage('? Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const saveAppearance = async (key, value) => {
    const newSettings = { ...appearanceData, [key]: value };
    setAppearanceData(newSettings);
    applyAppearanceSettings(newSettings);
    
    setLoading(true);
    try {
      const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setMessage('? Appearance updated!');
      } else {
        throw new Error('Failed to save appearance');
      }
    } catch (error) {
      setMessage('? Failed to save appearance');
      console.error('Appearance save error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const sendVerificationEmail = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage('? Passwords do not match');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (securityData.newPassword.length < 6) {
      setMessage('? Password must be at least 6 characters');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    
    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    try {
      // Import EmailJS
      const emailjs = await import('@emailjs/browser');

      // Send verification email
      const templateParams = {
        to_email: user.email,
        user_name: user.firstName || 'User',
        verification_code: code,
        app_name: 'MindfulMe'
      };

      await emailjs.send(
        'service_mindfulme', // Your EmailJS service ID
        'template_verification', // Your EmailJS template ID
        templateParams,
        'your_public_key' // Your EmailJS public key
      );

      setVerificationStep('code');
      setMessage('?? Verification code sent to your email!');
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('? Failed to send verification email');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const verifyCodeAndChangePassword = async () => {
    if (verificationCode !== generatedCode) {
      setMessage('? Invalid verification code');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: securityData.currentPassword,
          newPassword: securityData.newPassword
        })
      });

      if (response.ok) {
        setVerificationStep('success');
        setMessage('? Password changed successfully!');
        setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setVerificationCode('');
        setGeneratedCode('');
        
        // Reset to form after 3 seconds
        setTimeout(() => {
          setVerificationStep('form');
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }
    } catch (error) {
      setMessage(`? ${error.message}`);
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const renderProfile = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <span style={{ fontSize: '2rem', marginRight: '15px' }}>??</span>
        <h3 style={{ 
          color: '#374151', 
          margin: 0, 
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Profile Information
        </h3>
      </div>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? First Name
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Enter first name"
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Enter last name"
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        <div>
          <label style={{ 
            color: '#6b7280', 
            fontSize: '0.9rem', 
            marginBottom: '8px', 
            display: 'block',
            fontWeight: '500'
          }}>
            ?? Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              background: '#f9fafb',
              color: '#374151',
              fontSize: '1rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            placeholder="Enter email address"
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div>
          <label style={{ 
            color: '#6b7280', 
            fontSize: '0.9rem', 
            marginBottom: '8px', 
            display: 'block',
            fontWeight: '500'
          }}>
            ?? Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              background: '#f9fafb',
              color: '#374151',
              fontSize: '1rem',
              fontFamily: 'inherit',
              minHeight: '100px',
              resize: 'vertical',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            placeholder="Tell us about yourself..."
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? Phone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Phone number"
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="City, Country"
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          style={{
            padding: '15px 25px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0px)')}
        >
          {loading ? '?? Saving...' : '?? Save Profile'}
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <span style={{ fontSize: '2rem', marginRight: '15px' }}>??</span>
        <h3 style={{ 
          color: '#374151', 
          margin: 0, 
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Appearance Settings
        </h3>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <label style={{ 
          color: '#6b7280', 
          fontSize: '1rem', 
          marginBottom: '12px', 
          display: 'block',
          fontWeight: '500'
        }}>
          ?? Font Size: {appearanceData.fontSize}
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => saveAppearance('fontSize', size)}
              disabled={loading}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '12px',
                background: appearanceData.fontSize === size 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                  : '#f3f4f6',
                color: appearanceData.fontSize === size ? 'white' : '#6b7280',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                boxShadow: appearanceData.fontSize === size ? '0 4px 15px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ 
          color: '#6b7280', 
          fontSize: '1rem', 
          marginBottom: '12px', 
          display: 'block',
          fontWeight: '500'
        }}>
          ?? Color Scheme: {appearanceData.colorScheme}
        </label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { name: 'purple', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '??' },
            { name: 'blue', preview: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', emoji: '??' },
            { name: 'green', preview: 'linear-gradient(135deg, #047857 0%, #10b981 100%)', emoji: '??' },
            { name: 'pink', preview: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)', emoji: '??' }
          ].map(scheme => (
            <button
              key={scheme.name}
              onClick={() => saveAppearance('colorScheme', scheme.name)}
              disabled={loading}
              style={{
                padding: '15px 22px',
                border: appearanceData.colorScheme === scheme.name ? '3px solid #374151' : '2px solid #e5e7eb',
                borderRadius: '12px',
                background: scheme.preview,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'capitalize',
                minWidth: '90px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{scheme.emoji}</span>
              {scheme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <span style={{ fontSize: '2rem', marginRight: '15px' }}>??</span>
        <h3 style={{ 
          color: '#374151', 
          margin: 0, 
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Security Settings
        </h3>
      </div>
      
      {verificationStep === 'form' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? Current Password
            </label>
            <input
              type="password"
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Enter current password"
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? New Password
            </label>
            <input
              type="password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Enter new password"
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ? Confirm New Password
            </label>
            <input
              type="password"
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="Confirm new password"
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            onClick={sendVerificationEmail}
            disabled={loading || !securityData.currentPassword || !securityData.newPassword}
            style={{
              padding: '15px 25px',
              borderRadius: '12px',
              border: 'none',
              background: (!securityData.currentPassword || !securityData.newPassword) 
                ? '#d1d5db' 
                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading || (!securityData.currentPassword || !securityData.newPassword) ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              transition: 'all 0.2s ease',
              boxShadow: (!securityData.currentPassword || !securityData.newPassword) ? 'none' : '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
          >
            {loading ? '?? Sending Code...' : '?? Send Verification Code'}
          </button>
        </div>
      )}

      {verificationStep === 'code' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>??</span>
            <h4 style={{ color: '#374151', margin: '0 0 10px 0' }}>Verification Code Sent!</h4>
            <p style={{ color: '#6b7280', margin: 0 }}>
              We sent a 6-digit code to {user.email}
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '8px', 
              display: 'block',
              fontWeight: '500'
            }}>
              ?? Enter Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{
                width: '200px',
                padding: '15px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                color: '#374151',
                fontSize: '1.2rem',
                fontFamily: 'monospace',
                textAlign: 'center',
                letterSpacing: '5px',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              placeholder="000000"
              maxLength="6"
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={verifyCodeAndChangePassword}
              disabled={loading || verificationCode.length !== 6}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: verificationCode.length === 6 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : '#d1d5db',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: loading || verificationCode.length !== 6 ? 'not-allowed' : 'pointer',
               transition: 'all 0.2s ease'
             }}
           >
             {loading ? '?? Verifying...' : '? Verify & Change Password'}
           </button>

           <button
             onClick={() => {
               setVerificationStep('form');
               setVerificationCode('');
               setGeneratedCode('');
             }}
             style={{
               padding: '12px 20px',
               borderRadius: '10px',
               border: '2px solid #e5e7eb',
               background: 'white',
               color: '#6b7280',
               fontSize: '0.9rem',
               fontWeight: '600',
               cursor: 'pointer',
               transition: 'all 0.2s ease'
             }}
           >
             ?? Back
           </button>
         </div>
       </div>
     )}

     {verificationStep === 'success' && (
       <div style={{ textAlign: 'center' }}>
         <span style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>??</span>
         <h4 style={{ color: '#059669', margin: '0 0 10px 0' }}>Password Changed Successfully!</h4>
         <p style={{ color: '#6b7280', margin: 0 }}>
           Your password has been updated securely.
         </p>
       </div>
     )}
   </div>
 );

 return (
   <div style={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: '40px 20px',
     minHeight: '100vh',
     maxWidth: '900px',
     margin: '0 auto'
   }}>
     {/* Header Section */}
     <div style={{
       background: 'rgba(255, 255, 255, 0.95)',
       borderRadius: '20px',
       padding: '30px',
       boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
       width: '100%',
       marginBottom: '20px',
       textAlign: 'center'
     }}>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
         <span style={{ fontSize: '3rem', marginRight: '20px' }}>??</span>
         <h1 style={{ 
           color: '#1f2937', 
           margin: 0, 
           fontSize: '2.5rem',
           fontWeight: '700'
         }}>
           Settings
         </h1>
       </div>
       <p style={{ 
         color: '#6b7280', 
         margin: 0, 
         fontSize: '1.1rem',
         fontWeight: '400'
       }}>
         Customize your profile, appearance, and security preferences
       </p>
     </div>

     {message && (
       <div style={{
         padding: '15px 25px',
         marginBottom: '20px',
         borderRadius: '12px',
         backgroundColor: message.includes('?') ? '#dcfce7' : '#fee2e2',
         color: message.includes('?') ? '#166534' : '#dc2626',
         fontSize: '1rem',
         textAlign: 'center',
         border: `2px solid ${message.includes('?') ? '#bbf7d0' : '#fecaca'}`,
         width: '100%',
         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
       }}>
         {message}
       </div>
     )}

     {/* Tab Navigation */}
     <div style={{ 
       display: 'flex', 
       gap: '15px', 
       marginBottom: '25px',
       background: 'rgba(255, 255, 255, 0.95)',
       padding: '10px',
       borderRadius: '15px',
       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
     }}>
       {[
         { id: 'profile', label: 'Profile', icon: '??' },
         { id: 'appearance', label: 'Appearance', icon: '??' },
         { id: 'security', label: 'Security', icon: '??' }
       ].map(tab => (
         <button
           key={tab.id}
           onClick={() => setActiveTab(tab.id)}
           style={{
             padding: '12px 20px',
             border: 'none',
             borderRadius: '10px',
             background: activeTab === tab.id 
               ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
               : 'transparent',
             color: activeTab === tab.id ? 'white' : '#6b7280',
             fontSize: '1rem',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.2s ease',
             display: 'flex',
             alignItems: 'center',
             gap: '8px',
             boxShadow: activeTab === tab.id ? '0 4px 15px rgba(59, 130, 246, 0.3)' : 'none'
           }}
           onMouseEnter={(e) => activeTab !== tab.id && (e.target.style.background = '#f3f4f6')}
           onMouseLeave={(e) => activeTab !== tab.id && (e.target.style.background = 'transparent')}
         >
           <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
           {tab.label}
         </button>
       ))}
     </div>

     {/* Tab Content */}
     <div style={{ width: '100%' }}>
       {activeTab === 'profile' && renderProfile()}
       {activeTab === 'appearance' && renderAppearance()}
       {activeTab === 'security' && renderSecurity()}
     </div>
   </div>
 );
};

export default Settings;
