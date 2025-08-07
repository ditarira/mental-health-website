import React, { useState } from 'react';
import EmailService from '../../services/EmailService';

const ProfileSettings = ({ settings, updateSettings, saveSettings }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings('profile');
      
      // Send email notification about profile update
      await EmailService.sendSettingsChangeNotification(
        settings.email,
        settings.firstName,
        'Profile'
      );
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        👤 Profile Information
      </h2>

      {success && (
        <div style={{
          background: '#dcfce7',
          color: '#166534',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            First Name
          </label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => updateSettings('profile', { firstName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Last Name
          </label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => updateSettings('profile', { lastName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Email Address
        </label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => updateSettings('profile', { email: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Bio
        </label>
        <textarea
          value={settings.bio}
          onChange={(e) => updateSettings('profile', { bio: e.target.value })}
          placeholder="Tell us about your mental wellness journey..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            minHeight: '100px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : '💾 Save Profile'}
      </button>
    </div>
  );
};

export default ProfileSettings;
