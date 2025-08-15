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

  const loadSettings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com'}/api/users/settings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        applySettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const applySettings = (settingsData) => {
    document.documentElement.style.setProperty('--font-size-multiplier', 
      settingsData.fontSize === 'small' ? '0.9' : 
      settingsData.fontSize === 'large' ? '1.1' : '1.0'
    );
    document.documentElement.setAttribute('data-color-scheme', settingsData.colorScheme);
  };

  const handleSettingsChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com'}/api/users/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('? Settings saved!');
        applySettings(data.settings);
        setTimeout(() => setMessage(''), 2000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage('? Failed to save');
      console.error('Settings save error:', error);
      setTimeout(() => setMessage(''), 2000);
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
          padding: '6px 10px',
          marginBottom: '12px',
          borderRadius: '6px',
          backgroundColor: message.includes('?') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: 'white',
          fontSize: '0.85em',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      {/* Font Size */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block',
          color: 'white',
          marginBottom: '6px',
          fontSize: '0.9em',
          fontWeight: '500'
        }}>
          ?? Font Size
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleSettingsChange('fontSize', size)}
              disabled={loading}
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '6px',
                background: settings.fontSize === size 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.8em',
                fontWeight: '500',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <label style={{ 
          display: 'block',
          color: 'white',
          marginBottom: '6px',
          fontSize: '0.9em',
          fontWeight: '500'
        }}>
          ?? Color Scheme
        </label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { name: 'purple', color: '#8B5CF6' },
            { name: 'blue', color: '#3B82F6' },
            { name: 'green', color: '#10B981' },
            { name: 'pink', color: '#EC4899' }
          ].map(scheme => (
            <button
              key={scheme.name}
              onClick={() => handleSettingsChange('colorScheme', scheme.name)}
              disabled={loading}
              style={{
                padding: '6px 12px',
                border: settings.colorScheme === scheme.name ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                background: scheme.color,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.8em',
                fontWeight: '500',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
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
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.8em',
          marginTop: '8px'
        }}>
          Saving...
        </div>
      )}
    </div>
  );
};

export default Settings;


