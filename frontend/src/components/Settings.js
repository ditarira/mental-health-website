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

  useEffect(() => {
    loadSettings();
  }, []);

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
    console.log('?? FORCING background change:', settingsData);
    
    // Apply font size
    const fontSize = settingsData.fontSize === 'small' ? '14px' : 
                    settingsData.fontSize === 'large' ? '18px' : '16px';
    document.documentElement.style.fontSize = fontSize;
    
    // FORCE background color changes with !important
    const backgroundColors = {
      purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      blue: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
      green: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)',
      pink: 'linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f472b6 100%)'
    };
    
    const background = backgroundColors[settingsData.colorScheme] || backgroundColors.purple;
    
    // Remove existing stylesheets that might override
    const existingStyle = document.getElementById('dynamic-theme');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create a new style element with !important rules
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-theme';
    styleElement.innerHTML = `
      html {
        background: ${background} !important;
        background-attachment: fixed !important;
        min-height: 100vh !important;
      }
      
      body {
        background: ${background} !important;
        background-attachment: fixed !important;
        min-height: 100vh !important;
      }
      
      #root {
        background: ${background} !important;
        min-height: 100vh !important;
      }
      
      .app, .main, main {
        background: ${background} !important;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    // Also apply directly as backup
    document.body.style.setProperty('background', background, 'important');
    document.documentElement.style.setProperty('background', background, 'important');
    
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.setProperty('background', background, 'important');
    }
    
    console.log('? FORCED background with style element:', settingsData.colorScheme);
    console.log('? Background:', background);
    
    // Show visual feedback
    showVisualFeedback(settingsData.colorScheme, background);
  };

  const showVisualFeedback = (colorScheme, background) => {
    // Remove existing indicator
    const existing = document.getElementById('color-indicator');
    if (existing) existing.remove();
    
    // Create visual indicator
    const indicator = document.createElement('div');
    indicator.id = 'color-indicator';
    indicator.innerHTML = `?? Background FORCED to ${colorScheme}!`;
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      font-weight: bold;
      border: 2px solid white;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 4000);
    
    // Also create a test area to show the color
    const testArea = document.createElement('div');
    testArea.innerHTML = `${colorScheme.toUpperCase()} BACKGROUND TEST`;
    testArea.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: ${background};
      color: white;
      padding: 20px;
      border-radius: 12px;
      z-index: 9999;
      font-weight: bold;
      border: 3px solid white;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    `;
    
    document.body.appendChild(testArea);
    
    setTimeout(() => {
      if (testArea.parentNode) {
        testArea.parentNode.removeChild(testArea);
      }
    }, 4000);
  };

  const handleSettingsChange = async (key, value) => {
    console.log('?? CHANGING SETTING:', key, 'to:', value);
    
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Apply changes immediately with force
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

      {/* Current Settings Display */}
      <div style={{
        padding: '10px',
        marginBottom: '15px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ color: 'white', fontSize: '0.9em' }}>
          ?? Current: Font {settings.fontSize} | Background {settings.colorScheme}
        </div>
      </div>

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
          ?? Font Size
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

      {/* Background Color */}
      <div>
        <label style={{ 
          display: 'block',
          color: 'white',
          marginBottom: '8px',
          fontSize: '0.95em',
          fontWeight: '500'
        }}>
          ?? Background Color (FORCING with !important)
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

      <div style={{
        marginTop: '15px',
        fontSize: '0.8em',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center'
      }}>
        Using CSS !important to force background changes!
      </div>
    </div>
  );
};

export default Settings;
