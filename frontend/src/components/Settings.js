import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileSettings from './settings/ProfileSettings';
import SecuritySettings from './settings/SecuritySettings';
import NotificationSettings from './settings/NotificationSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import PrivacySettings from './settings/PrivacySettings';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      bio: '',
      avatar: null
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      journalReminders: true,
      breathingReminders: true,
      weeklyReports: true,
      reminderTime: '09:00'
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      colorScheme: 'default'
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketing: false
    }
  });

  const settingsMenu = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'privacy', label: 'Data & Privacy', icon: '📊' }
  ];

  // Load settings from backend on component mount
  useEffect(() => {
    loadSettings();
  }, []); // Empty dependency array is intentional

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/settings, {
        headers: {
          'Authorization': Bearer 
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updateSettings = (category, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], ...newSettings }
    }));
  };

  const saveSettings = async (category) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token');

      const response = await fetch(${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/settings/, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer 
        },
        body: JSON.stringify(settings[category])
      });

      if (response.ok) {
        return { success: true };
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  const renderActiveComponent = () => {
    const commonProps = {
      settings: settings[activeTab],
      updateSettings,
      saveSettings
    };

    switch (activeTab) {
      case 'profile':
        return <ProfileSettings {...commonProps} />;
      case 'security':
        return <SecuritySettings {...commonProps} />;
      case 'notifications':
        return <NotificationSettings {...commonProps} />;
      case 'appearance':
        return <AppearanceSettings {...commonProps} />;
      case 'privacy':
        return <PrivacySettings {...commonProps} />;
      default:
        return <ProfileSettings {...commonProps} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Settings
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Customize your MindfulMe experience
        </p>
      </div>

      {/* Settings Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '300px 1fr',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Settings Menu */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '1.5rem',
          height: 'fit-content',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1.5rem'
          }}>
            Settings Menu
          </h2>

          {settingsMenu.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                marginBottom: '0.5rem',
                background: activeTab === item.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'transparent',
                color: activeTab === item.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
