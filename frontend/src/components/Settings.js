import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    confirmPassword: '',
    twoFactorEnabled: false
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
    // Apply font size
    const fontSize = settings.fontSize === 'small' ? '14px' : 
                    settings.fontSize === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSize;
    
    // Apply background colors
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
        updateUser(updatedUser.user);
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

  const changePassword = async () => {
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
    try {
      // Send password change email using EmailJS
      const emailData = {
        to_email: user.email,
        user_name: user.firstName,
        reset_link: `${window.location.origin}/reset-password?token=temp123`,
        service_id: 'service_mindfulme',
        template_id: 'template_password_change',
        user_id: 'user_mindfulme'
      };

      // For now, simulate the password change
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
        setMessage('? Password change email sent!');
        setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '', twoFactorEnabled: securityData.twoFactorEnabled });
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      setMessage('? Failed to change password');
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const renderProfile = () => (
    <div>
      <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1em' }}>?? Profile Information</h3>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
              First Name
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.9em'
              }}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
              Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.9em'
              }}
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em'
            }}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em',
              minHeight: '80px',
              resize: 'vertical'
            }}
            placeholder="Tell us about yourself..."
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={loading}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontSize: '0.9em',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px'
          }}
        >
          {loading ? '?? Saving...' : '?? Save Profile'}
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div>
      <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1em' }}>?? Appearance Settings</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '8px', display: 'block' }}>
          ?? Font Size: {appearanceData.fontSize}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => saveAppearance('fontSize', size)}
              disabled={loading}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: appearanceData.fontSize === size 
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85em',
                fontWeight: '600',
                textTransform: 'capitalize',
                border: appearanceData.fontSize === size ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '8px', display: 'block' }}>
          ?? Color Scheme: {appearanceData.colorScheme}
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { name: 'purple', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { name: 'blue', preview: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' },
            { name: 'green', preview: 'linear-gradient(135deg, #047857 0%, #10b981 100%)' },
            { name: 'pink', preview: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)' }
          ].map(scheme => (
            <button
              key={scheme.name}
              onClick={() => saveAppearance('colorScheme', scheme.name)}
              disabled={loading}
              style={{
                padding: '12px 18px',
                border: appearanceData.colorScheme === scheme.name ? '3px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: scheme.preview,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85em',
                fontWeight: '600',
                textTransform: 'capitalize',
                minWidth: '80px'
              }}
            >
              {scheme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div>
      <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '1.1em' }}>?? Security Settings</h3>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        <div>
          <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
            Current Password
          </label>
          <input
            type="password"
            value={securityData.currentPassword}
            onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em'
            }}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
            New Password
          </label>
          <input
            type="password"
            value={securityData.newPassword}
            onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em'
            }}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label style={{ color: 'white', fontSize: '0.9em', marginBottom: '5px', display: 'block' }}>
            Confirm New Password
          </label>
          <input
            type="password"
            value={securityData.confirmPassword}
            onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em'
            }}
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={changePassword}
          disabled={loading || !securityData.currentPassword || !securityData.newPassword}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            fontSize: '0.9em',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            opacity: (!securityData.currentPassword || !securityData.newPassword) ? 0.5 : 1
          }}
        >
          {loading ? '?? Sending Email...' : '?? Change Password (Email)'}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '20px',
      maxWidth: '600px'
    }}>
      <h2 style={{ 
        margin: '0 0 20px 0',
        color: 'white',
        fontSize: '1.4em',
        fontWeight: '600'
      }}>
        ?? Settings
      </h2>

      {message && (
        <div style={{
          padding: '10px 15px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: message.includes('?') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
          color: 'white',
          fontSize: '0.9em',
          textAlign: 'center',
          border: `1px solid ${message.includes('?') ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`
        }}>
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '25px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: '10px'
      }}>
        {[
          { id: 'profile', label: '?? Profile', icon: '??' },
          { id: 'appearance', label: '?? Appearance', icon: '??' },
          { id: 'security', label: '?? Security', icon: '??' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '8px',
              background: activeTab === tab.id 
                ? 'rgba(255, 255, 255, 0.3)' 
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '0.9em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: activeTab === tab.id ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'appearance' && renderAppearance()}
        {activeTab === 'security' && renderSecurity()}
      </div>
    </div>
  );
};

export default Settings;
