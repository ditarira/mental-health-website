import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import emailjs from '@emailjs/browser';

// MOVE COMPONENTS OUTSIDE - THIS IS THE KEY FIX
const StyledInput = ({ label, type = 'text', value, onChange, placeholder, icon, isTextarea = false, isMobile, ...props }) => {
  const inputStyle = {
    width: '100%',
    padding: isMobile ? '18px 24px' : '16px 20px',
    borderRadius: '16px',
    border: '3px solid #e2e8f0',
    background: 'white',
    color: '#1e293b',
    fontSize: isMobile ? '16px' : '15px',
    fontFamily: 'inherit',
    fontWeight: '500',
    outline: 'none',
    minHeight: isMobile ? '56px' : '52px',
    boxSizing: 'border-box',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        color: '#475569',
        fontSize: '0.95rem',
        marginBottom: '10px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon && <span style={{ fontSize: '1.1rem' }}>{icon}</span>}
        {label}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            ...inputStyle,
            minHeight: isMobile ? '120px' : '100px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}
          {...props}
        />
      )}
    </div>
  );
};

const StyledButton = ({ children, variant = 'primary', onClick, disabled, isLoading, style = {}, isMobile, ...props }) => {
  const baseStyle = {
    padding: isMobile ? '18px 28px' : '16px 24px',
    borderRadius: '16px',
    fontSize: isMobile ? '16px' : '15px',
    fontWeight: '700',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: isMobile ? '56px' : '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(0)',
    ...style
  };

  const variants = {
    primary: {
      ...baseStyle,
      background: disabled || isLoading 
        ? 'linear-gradient(135deg, #cbd5e1, #94a3b8)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: disabled || isLoading 
        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
        : '0 10px 15px -3px rgba(102, 126, 234, 0.4), 0 4px 6px -2px rgba(102, 126, 234, 0.05)'
    },
    secondary: {
      ...baseStyle,
      background: 'white',
      color: '#667eea',
      border: '3px solid #667eea'
    },
    success: {
      ...baseStyle,
      background: disabled || isLoading 
        ? 'linear-gradient(135deg, #cbd5e1, #94a3b8)' 
        : 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      boxShadow: disabled || isLoading 
        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
        : '0 10px 15px -3px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.05)'
    },
    danger: {
      ...baseStyle,
      background: disabled || isLoading 
        ? 'linear-gradient(135deg, #cbd5e1, #94a3b8)' 
        : 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: 'white',
      boxShadow: disabled || isLoading 
        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
        : '0 10px 15px -3px rgba(239, 68, 68, 0.4), 0 4px 6px -2px rgba(239, 68, 68, 0.05)'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={variants[variant]}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          e.target.style.transform = 'translateY(0)';
        }
      }}
      {...props}
    >
      {isLoading && (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTop: '2px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {children}
    </button>
  );
};

// BEAUTIFUL CARD COMPONENT
const SettingsCard = ({ title, icon, children, gradient }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    padding: '40px',
    marginBottom: '32px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Gradient accent */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: gradient
    }} />
    
    {/* Header */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '32px',
      paddingBottom: '16px',
      borderBottom: '2px solid #f1f5f9'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginRight: '16px'
      }}>
        {icon}
      </div>
      <h2 style={{ 
        margin: 0, 
        color: '#1e293b',
        fontSize: '1.8rem',
        fontWeight: '800'
      }}>
        {title}
      </h2>
    </div>
    
    {/* Content */}
    {children}
  </div>
);

// NOW THE MAIN COMPONENT
const Settings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState('form');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: ''
  });

  // Appearance settings - SIMPLIFIED
  const [appearanceData, setAppearanceData] = useState({
    fontSize: 'medium',
    fontWeight: 'normal'
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // STABLE HANDLERS
  const updateSecurityData = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const updateProfileData = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadAllSettings();
  }, []);

  // Add spinning animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes slideUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const loadAllSettings = async () => {
    setLoadingProfile(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingProfile(false);
        return;
      }

      const profileResponse = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (profileResponse.ok) {
        const profileResult = await profileResponse.json();
        const userData = profileResult.user;
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          bio: userData.bio || ''
        });
      }

      const settingsResponse = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setAppearanceData({
          fontSize: settingsData.settings.fontSize || 'medium',
          fontWeight: settingsData.settings.fontWeight || 'normal'
        });
        applyAppearanceSettings({
          fontSize: settingsData.settings.fontSize || 'medium',
          fontWeight: settingsData.settings.fontWeight || 'normal'
        });
      }

    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const applyAppearanceSettings = (settings) => {
    // Apply font size
    const fontSize = settings.fontSize === 'small' ? '14px' :
                    settings.fontSize === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSize;

    // Apply font weight
    const fontWeight = settings.fontWeight === 'light' ? '300' :
                      settings.fontWeight === 'bold' ? '700' : '400';
    document.body.style.fontWeight = fontWeight;
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

      const responseData = await response.json();

      if (response.ok) {
        setMessage('✅ Profile updated successfully!');
        if (updateUser && responseData.user) {
          updateUser(responseData.user);
        }
      } else {
        throw new Error(responseData.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('❌ Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const saveAppearance = async (key, value) => {
    const newSettings = { ...appearanceData, [key]: value };
    setAppearanceData(newSettings);
    applyAppearanceSettings(newSettings);

    try {
      await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });
    } catch (error) {
      console.error('Failed to save appearance:', error);
    }
  };
const sendVerificationEmail = async () => {
  if (securityData.newPassword !== securityData.confirmPassword) {
    setMessage('❌ Passwords do not match');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (securityData.newPassword.length < 6) {
    setMessage('❌ Password must be at least 6 characters');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  if (!profileData.email) {
    setMessage('❌ No email address found. Please update your profile first.');
    setTimeout(() => setMessage(''), 3000);
    return;
  }

  setLoading(true);
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  setGeneratedCode(code);

  try {
    // Updated EmailJS credentials for Settings
    await emailjs.send(
      'service_124ityi',        // NEW Service ID
      'template_g324dl9',       // NEW Template 2 (Password Change)
      {
        email: profileData.email,              // Template expects: email
        user_name: profileData.firstName || 'User',  // Template expects: user_name
        verification_code: code                // Template expects: verification_code
      },
      'oFTP-7JkGYa9jCIZK'      // NEW Public Key
    );

    setVerificationStep('code');
    setMessage('✅ Verification code sent to your email! Check your inbox and spam folder.');
    
  } catch (error) {
    console.error('EmailJS error:', error);
    
    // User-friendly error messages
    let errorMessage = '❌ Failed to send verification email. ';
    
    if (error.message.includes('Failed to send email')) {
      errorMessage += 'Email service temporarily unavailable.';
    } else if (error.message.includes('network') || error.name === 'TypeError') {
      errorMessage += 'Check your internet connection.';
    } else {
      errorMessage += 'Please try again or contact support.';
    }
    
    setMessage(errorMessage);
    setGeneratedCode(''); // Clear the code if email failed
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(''), 5000);
  }
};
const verifyCodeAndChangePassword = async () => {
  if (verificationCode !== generatedCode) {
    setMessage('❌ Invalid verification code. Please check your email.');
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

    const result = await response.json();

    if (response.ok) {
      setVerificationStep('success');
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setVerificationCode('');
      setGeneratedCode('');
      setMessage('✅ Password changed successfully!');
    } else {
      throw new Error(result.error || 'Failed to change password');
    }
  } catch (error) {
    console.error('Password change error:', error);
    setMessage('❌ Failed to change password: ' + error.message);
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(''), 4000);
  }
};
  if (loadingProfile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '20px' : '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          padding: '48px',
          textAlign: 'center',
          animation: 'slideUp 0.5s ease-out'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <h3 style={{ margin: 0, color: '#1e293b' }}>Loading Settings...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '20px' : '40px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          padding: isMobile ? '32px' : '48px',
          marginBottom: '32px',
          textAlign: 'center',
          animation: 'slideUp 0.5s ease-out',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            margin: '0 0 16px 0',
            fontSize: isMobile ? '2.5rem' : '3.2rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚙️ Settings
          </h1>
          <p style={{
            margin: 0,
            color: '#64748b',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            fontWeight: '500'
          }}>
            Customize your experience and manage your account
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            background: message.includes('✅') 
              ? 'linear-gradient(135deg, #10b981, #059669)' 
              : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '24px',
            borderRadius: '16px',
            marginBottom: '32px',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            {message}
          </div>
        )}

        {/* Grid Layout for Desktop, Stack for Mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px',
          animation: 'slideUp 0.7s ease-out'
        }}>

          {/* Profile Card */}
          <SettingsCard 
            title="Profile Settings" 
            icon="👤"
            gradient="linear-gradient(135deg, #667eea, #764ba2)"
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '20px'
            }}>
              <StyledInput
                label="First Name"
                icon="👤"
                value={profileData.firstName}
                onChange={(e) => updateProfileData('firstName', e.target.value)}
                placeholder="Enter first name"
                isMobile={isMobile}
              />
              <StyledInput
                label="Last Name"
                icon="👤"
                value={profileData.lastName}
                onChange={(e) => updateProfileData('lastName', e.target.value)}
                placeholder="Enter last name"
                isMobile={isMobile}
              />
            </div>

            <StyledInput
              label="Email Address"
              icon="📧"
              type="email"
              value={profileData.email}
              onChange={(e) => updateProfileData('email', e.target.value)}
              placeholder="Enter email address"
              isMobile={isMobile}
            />

            <StyledInput
              label="Bio"
              icon="📝"
              value={profileData.bio}
              onChange={(e) => updateProfileData('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              isTextarea={true}
              isMobile={isMobile}
            />

            <StyledButton
              onClick={saveProfile}
              disabled={loading}
              isLoading={loading}
              variant="success"
              style={{ width: '100%' }}
              isMobile={isMobile}
            >
              {loading ? 'Saving Profile...' : '💾 Save Profile'}
            </StyledButton>
          </SettingsCard>

          {/* Appearance Card */}
          <SettingsCard 
            title="Appearance" 
            icon="🎨"
            gradient="linear-gradient(135deg, #10b981, #059669)"
          >
            {/* Font Size */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem', fontWeight: '700' }}>
                🔤 Font Size
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                {['small', 'medium', 'large'].map(size => (
                  <StyledButton
                    key={size}
                    onClick={() => saveAppearance('fontSize', size)}
                    variant={appearanceData.fontSize === size ? 'primary' : 'secondary'}
                    style={{ textTransform: 'capitalize' }}
                    isMobile={isMobile}
                  >
                    {size === 'small' && '🔤'} {size === 'medium' && '🔠'} {size === 'large' && '🔡'} {size}
                  </StyledButton>
                ))}
              </div>
            </div>

            {/* Font Weight */}
            <div>
              <h3 style={{ marginBottom: '16px', color: '#475569', fontSize: '1.2rem', fontWeight: '700' }}>
                💪 Font Weight
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                {['light', 'normal', 'bold'].map(weight => (
                  <StyledButton
                    key={weight}
                    onClick={() => saveAppearance('fontWeight', weight)}
                    variant={appearanceData.fontWeight === weight ? 'primary' : 'secondary'}
                    style={{ 
                      textTransform: 'capitalize',
                      fontWeight: weight === 'light' ? '300' : weight === 'bold' ? '700' : '400'
                    }}
                    isMobile={isMobile}
                  >
                    {weight === 'light' && '📝'} {weight === 'normal' && '📄'} {weight === 'bold' && '📋'} {weight}
                  </StyledButton>
                ))}
              </div>
            </div>
          </SettingsCard>

        </div>

        {/* Security Card - SEPARATE AND SIMPLE */}
        <div style={{ animation: 'slideUp 0.9s ease-out' }}>
          <SettingsCard 
            title="Security" 
            icon="🔐"
            gradient="linear-gradient(135deg, #ef4444, #dc2626)"
          >
            {verificationStep === 'form' && (
              <div>
                <StyledInput
                  label="Current Password"
                  icon="🔒"
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => updateSecurityData('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                  isMobile={isMobile}
                />

                <StyledInput
                  label="New Password"
                  icon="🆕"
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => updateSecurityData('newPassword', e.target.value)}
                  placeholder="Enter new password"
                  isMobile={isMobile}
                />

                <StyledInput
                  label="Confirm New Password"
                  icon="✅"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => updateSecurityData('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                  isMobile={isMobile}
                />

                <StyledButton
                  onClick={sendVerificationEmail}
                  disabled={loading || !securityData.currentPassword || !securityData.newPassword}
                  isLoading={loading}
                  variant="danger"
                  style={{ width: '100%' }}
                  isMobile={isMobile}
                >
                  {loading ? 'Sending...' : '📧 Send Verification Code'}
                </StyledButton>
              </div>
            )}

            {verificationStep === 'code' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px', color: '#1e293b', fontSize: '1.5rem' }}>📧 Enter Verification Code</h3>
                <p style={{ marginBottom: '24px', color: '#6b7280' }}>Check your email: {profileData.email}</p>
                
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="000000"
                  maxLength="6"
                  style={{
                    width: '200px',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '3px solid #e2e8f0',
                    fontSize: '1.5rem',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    marginBottom: '24px',
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <StyledButton
                    onClick={verifyCodeAndChangePassword}
                    disabled={loading || verificationCode.length !== 6}
                    isLoading={loading}
                    variant="success"
                    isMobile={isMobile}
                  >
                    {loading ? 'Verifying...' : '✅ Verify & Change'}
                  </StyledButton>

                  <StyledButton
                    onClick={() => {
                      setVerificationStep('form');
                      setVerificationCode('');
                      setGeneratedCode('');
                    }}
                    variant="secondary"
                    isMobile={isMobile}
                  >
                    ⬅️ Back
                  </StyledButton>
                </div>
              </div>
            )}

            {verificationStep === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px', color: '#1e293b', fontSize: '1.5rem' }}>🎉 Password Changed!</h3>
                <p style={{ marginBottom: '24px', color: '#6b7280' }}>Your account is now more secure.</p>
                
                <StyledButton
                  onClick={() => setVerificationStep('form')}
                  variant="primary"
                  isMobile={isMobile}
                >
                  ✅ Done
                </StyledButton>
              </div>
            )}
          </SettingsCard>
        </div>

      </div>
    </div>
  );
};

export default Settings;