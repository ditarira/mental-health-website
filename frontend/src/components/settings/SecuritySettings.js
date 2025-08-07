import React, { useState } from 'react';
import EmailService from '../../services/EmailService';

const SecuritySettings = ({ settings, updateSettings, saveSettings }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = async () => {
    setError('');
    setSuccess('');

    if (!settings.currentPassword || !settings.newPassword) {
      setError('Please fill in all password fields');
      return;
    }

    if (settings.newPassword !== settings.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (settings.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: settings.currentPassword,
          newPassword: settings.newPassword
        })
      });

      if (response.ok) {
        await EmailService.sendSettingsChangeNotification(
          localStorage.getItem('userEmail'),
          localStorage.getItem('userName'),
          'Password'
        );

        setSuccess('Password changed successfully!');
        updateSettings('security', {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to change password');
      }
    } catch (error) {
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const toggle2FA = async () => {
    setLoading(true);
    try {
      await saveSettings('security');
      
      await EmailService.sendSettingsChangeNotification(
        localStorage.getItem('userEmail'),
        localStorage.getItem('userName'),
        'Two-Factor Authentication'
      );

      setSuccess(`Two-factor authentication ${settings.twoFactorEnabled ? 'enabled' : 'disabled'}!`);
    } catch (error) {
      setError('Failed to update 2FA settings');
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
        ?? Security Settings
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

      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Change Password</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Current Password
          </label>
          <input
            type="password"
            value={settings.currentPassword}
            onChange={(e) => updateSettings('security', { currentPassword: e.target.value })}
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

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            New Password
          </label>
          <input
            type="password"
            value={settings.newPassword}
            onChange={(e) => updateSettings('security', { newPassword: e.target.value })}
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

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
            Confirm New Password
          </label>
          <input
            type="password"
            value={settings.confirmPassword}
            onChange={(e) => updateSettings('security', { confirmPassword: e.target.value })}
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

        <button
          onClick={handlePasswordChange}
          disabled={loading}
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Changing...' : '?? Change Password'}
        </button>
      </div>

      <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Two-Factor Authentication</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#374151', marginBottom: '0.5rem' }}>
              Add an extra layer of security to your account
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              {settings.twoFactorEnabled ? '? Currently enabled' : '? Currently disabled'}
            </p>
          </div>
          
          <button
            onClick={() => {
              updateSettings('security', { twoFactorEnabled: !settings.twoFactorEnabled });
              toggle2FA();
            }}
            style={{
              background: settings.twoFactorEnabled 
                ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {settings.twoFactorEnabled ? '?? Disable 2FA' : '?? Enable 2FA'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
