import React, { useState } from 'react';
import EmailService from '../../services/EmailService';

const PrivacySettings = ({ settings, updateSettings, saveSettings }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings('privacy');
      
      await EmailService.sendSettingsChangeNotification(
        localStorage.getItem('userEmail'),
        localStorage.getItem('userName'),
        'Privacy & Data'
      );
      
      setSuccess('Privacy settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/user/export-data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mindfulme-data-export.json';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/user/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const PrivacyToggle = ({ label, description, checked, onChange, icon }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      background: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span>{icon}</span>
          <span style={{ fontWeight: '600', color: '#374151' }}>{label}</span>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>{description}</p>
      </div>
      
      <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: checked ? '#10b981' : '#ccc',
          borderRadius: '34px',
          transition: '0.4s'
        }}>
          <span style={{
            position: 'absolute',
            content: '',
            height: '26px',
            width: '26px',
            left: checked ? '30px' : '4px',
            bottom: '4px',
            background: 'white',
            borderRadius: '50%',
            transition: '0.4s'
          }} />
        </span>
      </label>
    </div>
  );

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
        ?? Data & Privacy
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

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>?? Privacy Preferences</h3>
        
        <PrivacyToggle
          icon="??"
          label="Data Sharing"
          description="Allow anonymous data sharing for research purposes"
          checked={settings.dataSharing}
          onChange={(e) => updateSettings('privacy', { dataSharing: e.target.checked })}
        />

        <PrivacyToggle
          icon="??"
          label="Analytics"
          description="Help us improve the app with usage analytics"
          checked={settings.analytics}
          onChange={(e) => updateSettings('privacy', { analytics: e.target.checked })}
        />

        <PrivacyToggle
          icon="??"
          label="Marketing Communications"
          description="Receive tips and updates about mental wellness"
          checked={settings.marketing}
          onChange={(e) => updateSettings('privacy', { marketing: e.target.checked })}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>?? Data Management</h3>
        
        <div style={{
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>?? Export Your Data</h4>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Download all your journal entries, mood tracking data, and settings
          </p>
          <button
            onClick={exportData}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ?? Export Data
          </button>
        </div>

        <div style={{
          padding: '1rem',
          background: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#dc2626' }}>??? Delete Account</h4>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ??? Delete Account
            </button>
          ) : (
            <div>
              <p style={{ color: '#dc2626', fontWeight: '600', marginBottom: '1rem' }}>
                Are you absolutely sure? This will permanently delete your account.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={deleteAccount}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Yes, Delete Forever
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : '?? Save Privacy Settings'}
      </button>
    </div>
  );
};

export default PrivacySettings;
