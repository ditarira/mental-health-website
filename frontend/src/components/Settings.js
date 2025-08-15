import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    colorScheme: 'purple'
  });

  // Apply settings immediately when component mounts
  useEffect(() => {
    loadSettings();
  }, []);

  // Also apply settings when user changes
  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, using default settings');
        applySettingsToWebsite(settings);
        return;
      }

      const response = await fetch(`https://mental-health-backend-2mtp.onrender.com/api/users/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Loaded settings from server:', data.settings);
        setSettings(data.settings);
        applySettingsToWebsite(data.settings);
      } else {
        console.log('Failed to load settings, using defaults');
        applySettingsToWebsite(settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      applySettingsToWebsite(settings);
    }
  };

  const applySettingsToWebsite = (settingsData) => {
    console.log('Applying settings to website:', settingsData);
    
    // Apply font size to entire website
    const fontSize = settingsData.fontSize === 'small' ? '14px' : 
                    settingsData.fontSize === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSize;
    
    // ONLY change the main background color - keep components unchanged
    const backgroundColors = {
      purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      blue: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      green: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      pink: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)'
    };
    
    const background = backgroundColors[settingsData.colorScheme] || backgroundColors.purple;
    
    // Apply ONLY to main background
    document.body.style.background = background;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
    
    // Also apply to html element to ensure it persists
    document.documentElement.style.background = background;
    
    console.log('? Applied background:', settingsData.colorScheme, '->', background);
    console.log('? Applied font size:', fontSize);
  };

  const handleSettingsChange = async (key, value) => {
    console.log('?? Changing setting:', key, 'to:', value);
    
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Apply changes immediately
    applySettingsToWebsite(newSettings);
    
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
        const data = await response.json();
        console.log('? Saved settings to server:', data.settings);
        setMessage('? Settings saved and applied!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage('? Failed to save');
      console.error('Settings save error:', error);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '20px',
      maxWidth: '500px'
    }}>
      <h2 style={{ 
        margin: '0 0 15px 0',
        color: 'white',
        fontSize: '1.3em',
        fontWeight: '600'
      }}>
        ?? Settings
      </h2>

      {message && (
        <div style={{
          padding: '8px 12px',
          marginBottom: '12px',
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

      {/* Font Size */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block',
          color: 'white',
          marginBottom: '8px',
          fontSize: '0.95em',
          fontWeight: '500'
        }}>
          ?? Font Size: {settings.fontSize}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleSettingsChange('fontSize', size)}
              disabled={loading}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: settings.fontSize === size 
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85em',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                border: settings.fontSize === size ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Background Color Only */}
      <div>
        <label style={{ 
          display: 'block',
          color: 'white',
          marginBottom: '8px',
          fontSize: '0.95em',
          fontWeight: '500'
        }}>
          ?? Background Color: {settings.colorScheme}
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { name: 'purple', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { name: 'blue', preview: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' },
            { name: 'green', preview: 'linear-gradient(135deg, #10B981 0%, #047857 100%)' },
            { name: 'pink', preview: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' }
          ].map(scheme => (
            <button
              key={scheme.name}
              onClick={() => handleSettingsChange('colorScheme', scheme.name)}
              disabled={loading}
              style={{
                padding: '12px 18px',
                border: settings.colorScheme === scheme.name ? '3px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                background: scheme.preview,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85em',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                minWidth: '80px'
              }}
            >
              {scheme.name}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '0.9em',
          marginTop: '12px',
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px'
        }}>
          ?? Saving settings...
        </div>
      )}
      
      <div style={{
        marginTop: '15px',
        fontSize: '0.8em',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center'
      }}>
        Settings persist after refresh and apply automatically
      </div>
    </div>
  );
};

export default Settings;
