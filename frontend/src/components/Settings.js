import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  // Security state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    journalReminders: true,
    breathingReminders: false,
    weeklyReports: true,
    reminderTime: '09:00'
  });

  // Appearance state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en',
    fontSize: 'medium'
  });

  useEffect(() => {
    // Load user preferences from localStorage or API
    const savedNotifications = localStorage.getItem('notificationSettings');
    const savedAppearance = localStorage.getItem('appearanceSettings');
    
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
    if (savedAppearance) {
      setAppearanceSettings(JSON.parse(savedAppearance));
    }
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        showMessage('Profile updated successfully! 🎉');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Error updating profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('New passwords do not match!', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long!', 'error');
      return;
    }

    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        showMessage('Password changed successfully! 🔐');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      showMessage('Error changing password. Please check your current password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    showMessage('Notification preferences saved! 🔔');
  };

  const handleAppearanceUpdate = () => {
    localStorage.setItem('appearanceSettings', JSON.stringify(appearanceSettings));
    showMessage('Appearance settings saved! 🎨');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data including journal entries and breathing sessions.'
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'This will permanently delete ALL your data. Type "DELETE" to confirm.'
    );

    if (!doubleConfirm) return;

    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/users/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Clear all local data
        localStorage.clear();
        showMessage('Account deleted successfully. Goodbye! 👋');
        
        setTimeout(() => {
          logout();
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showMessage('Error deleting account. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderProfileSection = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        👤 Profile Information
      </h2>

      <form onSubmit={handleProfileUpdate}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              First Name
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us about your mental wellness journey..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '🔄 Saving...' : '💾 Save Profile'}
        </button>
      </form>
    </div>
  );

  const renderSecuritySection = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🔒 Security Settings
      </h2>

      <form onSubmit={handlePasswordChange}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Current Password
          </label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            New Password
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '2rem'
          }}
        >
          {loading ? '🔄 Changing...' : '🔐 Change Password'}
        </button>
      </form>

      {/* Danger Zone */}
      <div style={{
        background: '#fef2f2',
        border: '2px solid #fecaca',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>⚠️ Danger Zone</h3>
        <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
          Once you delete your account, there is no going back. This will permanently delete your profile, journal entries, breathing sessions, and all associated data.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          🗑️ Delete Account
        </button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🔔 Notification Settings
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        {[
          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive important updates via email' },
          { key: 'journalReminders', label: 'Journal Reminders', desc: 'Daily reminders to write in your journal' },
          { key: 'breathingReminders', label: 'Breathing Exercise Reminders', desc: 'Notifications for breathing sessions' },
          { key: 'weeklyReports', label: 'Weekly Progress Reports', desc: 'Summary of your wellness progress' }
        ].map(({ key, label, desc }) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            marginBottom: '1rem'
          }}>
            <div>
              <div style={{ fontWeight: '600', color: '#374151' }}>{label}</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{desc}</div>
            </div>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={notificationSettings[key]}
                onChange={(e) => setNotificationSettings(prev => ({ 
                  ...prev, 
                  [key]: e.target.checked 
                }))}
                style={{ width: '20px', height: '20px', accentColor: '#667eea' }}
              />
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Daily Reminder Time
        </label>
        <input
          type="time"
          value={notificationSettings.reminderTime}
          onChange={(e) => setNotificationSettings(prev => ({ 
            ...prev, 
            reminderTime: e.target.value 
          }))}
          style={{
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      <button
        onClick={handleNotificationUpdate}
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        💾 Save Notification Settings
      </button>
    </div>
  );

  const renderAppearanceSection = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🎨 Appearance Settings
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Theme
        </label>
        <select
          value={appearanceSettings.theme}
          onChange={(e) => setAppearanceSettings(prev => ({ 
            ...prev, 
            theme: e.target.value 
          }))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="light">🌞 Light Mode</option>
          <option value="dark">🌙 Dark Mode</option>
          <option value="auto">🔄 Auto (System)</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Language
        </label>
        <select
          value={appearanceSettings.language}
          onChange={(e) => setAppearanceSettings(prev => ({ 
            ...prev, 
            language: e.target.value 
          }))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="de">🇩🇪 Deutsch</option>
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Font Size
        </label>
        <select
          value={appearanceSettings.fontSize}
          onChange={(e) => setAppearanceSettings(prev => ({ 
            ...prev, 
            fontSize: e.target.value 
          }))}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            outline: 'none',
            background: 'white'
          }}
        >
          <option value="small">📝 Small</option>
          <option value="medium">📄 Medium</option>
          <option value="large">📰 Large</option>
        </select>
      </div>

      <button
        onClick={handleAppearanceUpdate}
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        💾 Save Appearance Settings
      </button>
    </div>
  );

  const renderDataPrivacySection = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🛡️ Data & Privacy
      </h2>

      <div style={{
        background: '#f0f9ff',
        border: '2px solid #bae6fd',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>Your Data Rights</h3>
        <ul style={{ color: '#0c4a6e', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
          <li>Your journal entries are encrypted and stored securely</li>
          <li>We never share your personal data with third parties</li>
          <li>You can export or delete your data at any time</li>
          <li>All data transfers are protected with industry-standard encryption</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
        gap: '1rem'
      }}>
        <button
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          onClick={() => showMessage('Data export feature coming soon! 📦')}
        >
          📥 Export My Data
        </button>

        <button
          style={{
            background: 'linear-gradient(135deg, #6b7280, #4b5563)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          onClick={() => window.open('/privacy-policy', '_blank')}
        >
          📋 Privacy Policy
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 1rem 2rem 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: window.innerWidth > 768 ? '2.5rem' : '2rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              ⚙️ Settings
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.1rem',
              margin: 0
            }}>
              Customize your MindfulMe experience
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div style={{
              background: messageType === 'error' ? '#fef2f2' : '#f0fdf4',
              border: `2px solid ${messageType === 'error' ? '#fecaca' : '#bbf7d0'}`,
              color: messageType === 'error' ? '#dc2626' : '#16a34a',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {message}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 1024 ? '300px 1fr' : '1fr',
            gap: '2rem'
          }}>
            {/* Settings Menu */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <h3 style={{
                color: '#2d3748',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Settings Menu
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: window.innerWidth > 1024 ? 'column' : 'row',
                gap: '0.5rem',
                overflowX: window.innerWidth <= 1024 ? 'auto' : 'visible'
              }}>
                {[
                  { key: 'profile', label: 'Profile', icon: '👤' },
                  { key: 'security', label: 'Security', icon: '🔒' },
                  { key: 'notifications', label: 'Notifications', icon: '🔔' },
                  { key: 'appearance', label: 'Appearance', icon: '🎨' },
                  { key: 'privacy', label: 'Data & Privacy', icon: '🛡️' }
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      padding: '1rem',
                      border: activeSection === key ? '2px solid #667eea' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      background: activeSection === key ? '#667eea' : 'white',
                      color: activeSection === key ? 'white' : '#374151',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      minWidth: window.innerWidth <= 1024 ? '120px' : 'auto',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Content */}
            <div>
              {activeSection === 'profile' && renderProfileSection()}
              {activeSection === 'security' && renderSecuritySection()}
              {activeSection === 'notifications' && renderNotificationsSection()}
              {activeSection === 'appearance' && renderAppearanceSection()}
              {activeSection === 'privacy' && renderDataPrivacySection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
