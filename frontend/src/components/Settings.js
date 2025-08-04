import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });
  
  // Password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Settings
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState({
    email: JSON.parse(localStorage.getItem('emailNotifications') || 'true'),
    journal: JSON.parse(localStorage.getItem('journalReminder') || 'true'),
    breathing: JSON.parse(localStorage.getItem('breathingReminder') || 'true')
  });
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showMessage = (msg, type = 'success') => {
    setMessage(`${type === 'success' ? '✅' : '❌'} ${msg}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put('/api/users/profile', profileData);
      if (response.data.success) {
        showMessage('Profile updated successfully!');
      }
    } catch (error) {
      showMessage('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('Passwords do not match!', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters!', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.put('/api/users/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      if (response.data.success) {
        showMessage('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      showMessage('Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const handleNotificationChange = (type, value) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
    localStorage.setItem(`${type}${type === 'email' ? 'Notifications' : 'Reminder'}`, JSON.stringify(value));
  };

  const handleExportData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/export-data', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `mindfulme-data-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showMessage('Data exported successfully!');
    } catch (error) {
      showMessage('Failed to export data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/users/account');
      showMessage('Account deleted successfully');
      setTimeout(() => logout(), 2000);
    } catch (error) {
      showMessage('Failed to delete account', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'data', name: 'Data', icon: '💾' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--light), #f0f9ff)',
      padding: '2rem 1rem'
    },
    settingsContainer: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: 'var(--dark)',
      opacity: 0.8
    },
    message: {
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
      textAlign: 'center',
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#059669',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth > 768 ? '200px 1fr' : '1fr',
      gap: '2rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    sidebar: {
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      padding: window.innerWidth > 768 ? '1rem 0' : '1rem',
      display: window.innerWidth > 768 ? 'block' : 'flex',
      overflowX: window.innerWidth > 768 ? 'visible' : 'auto'
    },
    tabBtn: {
      width: window.innerWidth > 768 ? '100%' : 'auto',
      minWidth: window.innerWidth > 768 ? 'auto' : '120px',
      padding: '1rem',
      background: 'none',
      border: 'none',
      color: 'rgba(255,255,255,0.8)',
      cursor: 'pointer',
      textAlign: window.innerWidth > 768 ? 'left' : 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: window.innerWidth > 768 ? 'flex-start' : 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      fontSize: '1rem'
    },
    tabBtnActive: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      borderRight: window.innerWidth > 768 ? '3px solid white' : 'none'
    },
    mainContent: {
      padding: '2rem'
    },
    sectionTitle: {
      marginBottom: '1.5rem',
      color: 'var(--dark)',
      fontSize: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: 'var(--dark)'
    },
    formInput: {
      width: '100%',
      padding: '0.8rem',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    formTextarea: {
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    button: {
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    buttonSecondary: {
      background: '#6b7280'
    },
    buttonDanger: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)'
    },
    themeOptions: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
      gap: '1rem',
      marginTop: '1rem'
    },
    themeOption: {
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      background: 'white'
    },
    themeOptionActive: {
      borderColor: 'var(--primary)',
      background: 'rgba(124, 165, 184, 0.1)'
    },
    notificationItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: '#f8fafc',
      borderRadius: '10px',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    },
    toggle: {
      position: 'relative',
      width: '50px',
      height: '24px'
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    slider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#ccc',
      transition: '0.4s',
      borderRadius: '24px'
    },
    sliderBefore: {
      position: 'absolute',
      content: '',
      height: '18px',
      width: '18px',
      left: '3px',
      bottom: '3px',
      background: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    },
    dangerZone: {
      background: 'rgba(239, 68, 68, 0.05)',
      border: '2px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '10px',
      padding: '1.5rem',
      marginTop: '2rem'
    },
    confirmDelete: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '2px solid #ef4444',
      borderRadius: '10px',
      padding: '1rem',
      marginTop: '1rem',
      textAlign: 'center'
    },
    confirmButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '1rem'
    },
    charCount: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textAlign: 'right',
      marginTop: '0.3rem'
    },
    passwordStrength: {
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    strengthBar: {
      flex: 1,
      height: '6px',
      background: '#e5e7eb',
      borderRadius: '3px',
      overflow: 'hidden'
    },
    strengthFill: {
      height: '100%',
      transition: 'all 0.3s ease',
      borderRadius: '3px'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.8rem',
      marginTop: '0.3rem'
    },
    securityTips: {
      background: '#f8fafc',
      borderRadius: '10px',
      padding: '1.5rem',
      marginTop: '2rem'
    },
    infoNote: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '8px',
      padding: '0.8rem',
      marginTop: '1rem',
      fontSize: '0.9rem',
      color: '#1e40af'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.settingsContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>⚙️ Settings</h1>
          <p style={styles.subtitle}>
            Customize your MindfulMe experience
          </p>
        </div>

        {/* Message */}
        {message && <div style={styles.message}>{message}</div>}

        {/* Content */}
        <div style={styles.content}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                style={{
                  ...styles.tabBtn,
                  ...(activeTab === tab.id ? styles.tabBtnActive : {})
                }}
                onClick={() => setActiveTab(tab.id)}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'none';
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                  }
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div style={styles.mainContent}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 style={styles.sectionTitle}>
                  👤 Profile Information
                </h2>
                <form onSubmit={handleProfileUpdate}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>First Name</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      placeholder="Enter your first name"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Last Name</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      placeholder="Enter your last name"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label>
                    <input
                      type="email"
                      style={styles.formInput}
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Bio</label>
                    <textarea
                      style={{...styles.formInput, ...styles.formTextarea}}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      maxLength="500"
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <div style={styles.charCount}>
                      {profileData.bio.length}/500 characters
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    style={{
                      ...styles.button,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                    disabled={loading}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 5px 15px rgba(124, 165, 184, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {loading ? '⏳ Updating...' : '💾 Update Profile'}
                  </button>
                </form>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 style={styles.sectionTitle}>
                  🎨 Appearance Settings
                </h2>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Theme</label>
                  <div style={styles.themeOptions}>
                    {[
                      { id: 'light', name: 'Light', icon: '☀️' },
                      { id: 'dark', name: 'Dark', icon: '🌙' },
                      { id: 'auto', name: 'Auto', icon: '🌓' }
                    ].map(themeOption => (
                      <div
                        key={themeOption.id}
                        style={{
                          ...styles.themeOption,
                          ...(theme === themeOption.id ? styles.themeOptionActive : {})
                        }}
                        onClick={() => handleThemeChange(themeOption.id)}
                        onMouseOver={(e) => {
                          if (theme !== themeOption.id) {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (theme !== themeOption.id) {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                          {themeOption.icon}
                        </div>
                        <div>{themeOption.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.infoNote}>
                  💡 Auto theme switches based on your system preference
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 style={styles.sectionTitle}>
                  🔔 Notification Settings
                </h2>
                {[
                  { key: 'email', title: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'journal', title: 'Journal Reminders', desc: 'Daily reminders to write' },
                  { key: 'breathing', title: 'Breathing Reminders', desc: 'Breathing exercise reminders' }
                ].map(notification => (
                  <div key={notification.key} style={styles.notificationItem}>
                    <div>
                      <strong>{notification.title}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {notification.desc}
                      </div>
                    </div>
                    <label style={styles.toggle}>
                      <input
                        type="checkbox"
                        style={styles.toggleInput}
                        checked={notifications[notification.key]}
                        onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                      />
                      <span 
                        style={{
                          ...styles.slider,
                          background: notifications[notification.key] ? 'var(--primary)' : '#ccc'
                        }}
                      >
                        <span style={{
                          ...styles.sliderBefore,
                          transform: notifications[notification.key] ? 'translateX(26px)' : 'translateX(0)'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 style={styles.sectionTitle}>
                  🛡️ Security Settings
                </h2>
                <form onSubmit={handlePasswordChange}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Current Password</label>
                    <input
                      type="password"
                      style={styles.formInput}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>New Password</label>
                    <input
                      type="password"
                      style={styles.formInput}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="Enter new password (min 6 characters)"
                      required
                      minLength="6"
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {passwordData.newPassword && (
                      <div style={styles.passwordStrength}>
                        <div style={styles.strengthBar}>
                          <div 
                            style={{
                              ...styles.strengthFill,
                              width: `${Math.min(100, (passwordData.newPassword.length / 12) * 100)}%`,
                              background: passwordData.newPassword.length < 6 ? '#ef4444' : 
                                         passwordData.newPassword.length < 8 ? '#f59e0b' : '#10b981'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                          {passwordData.newPassword.length < 6 ? 'Too short' :
                           passwordData.newPassword.length < 8 ? 'Fair' : 'Strong'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Confirm New Password</label>
                    <input
                      type="password"
                      style={styles.formInput}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <div style={styles.errorText}>Passwords do not match</div>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    style={{
                      ...styles.button,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                    disabled={loading}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 5px 15px rgba(124, 165, 184, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {loading ? '⏳ Changing...' : '🔐 Change Password'}
                  </button>
                </form>
                <div style={styles.securityTips}>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>🔐 Security Tips:</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                    <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Use a unique password you don't use elsewhere</li>
                    <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Include uppercase, lowercase, numbers, and symbols</li>
                    <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Avoid using personal information</li>
                    <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Don't share your password with anyone</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <div>
                <h2 style={styles.sectionTitle}>
                  💾 Data Management
                </h2>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--dark)' }}>📤 Export Your Data</h3>
                  <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                    Download all your journal entries and settings in JSON format.
                  </p>
                  <button 
                    style={{
                      ...styles.button,
                      ...styles.buttonSecondary,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                    onClick={handleExportData} 
                    disabled={loading}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 5px 15px rgba(107, 114, 128, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {loading ? '⏳ Exporting...' : '📥 Download Data'}
                  </button>
                </div>

                <div style={styles.dangerZone}>
                  <h3 style={{ color: '#dc2626', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚠️ Delete Account
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Permanently delete your account and all data. This cannot be undone.
                  </p>
                  
                  {showDeleteConfirm ? (
                    <div style={styles.confirmDelete}>
                      <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
                        Are you sure? This will delete everything permanently.
                      </p>
                      <div style={styles.confirmButtons}>
                        <button 
                          style={{
                            ...styles.button,
                            ...styles.buttonDanger,
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                          }}
                          onClick={handleDeleteAccount} 
                          disabled={loading}
                          onMouseOver={(e) => {
                            if (!loading) {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 5px 15px rgba(239, 68, 68, 0.3)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {loading ? '⏳ Deleting...' : 'Yes, Delete'}
                        </button>
                        <button 
                          style={{
                            ...styles.button,
                            ...styles.buttonSecondary,
                            opacity: loading ? 0.6 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                          }}
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={loading}
                          onMouseOver={(e) => {
                            if (!loading) {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 5px 15px rgba(107, 114, 128, 0.3)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      style={{
                        ...styles.button,
                        ...styles.buttonDanger
                      }}
                      onClick={() => setShowDeleteConfirm(true)}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 5px 15px rgba(239, 68, 68, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      🗑️ Delete Account
                    </button>
                  )}
                </div>

                {/* Support Section */}
                <div style={{
                  background: 'rgba(168, 85, 247, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  marginTop: '2rem',
                  textAlign: 'center'
                }}>
                  <h4 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>
                    💬 Need Help?
                  </h4>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    If you have questions about your data or need assistance, our support team is here to help.
                  </p>
                  <button 
                    style={{
                      ...styles.button,
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    📧 Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for dark theme and responsive adjustments */}
      <style jsx global>{`
        [data-theme="dark"] {
          --bg-primary: #1e293b;
          --bg-secondary: #334155;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
        }
        
        [data-theme="dark"] .settings-header,
        [data-theme="dark"] .settings-content {
          background: rgba(30, 41, 59, 0.95) !important;
          color: #f1f5f9 !important;
        }
        
        [data-theme="dark"] input,
        [data-theme="dark"] textarea {
          background: #334155 !important;
          border-color: #475569 !important;
          color: #f1f5f9 !important;
        }
        
        [data-theme="dark"] .notification-item {
          background: #334155 !important;
        }
        
        [data-theme="dark"] .theme-option {
          background: #334155 !important;
          border-color: #475569 !important;
          color: #f1f5f9 !important;
        }
        
        [data-theme="dark"] h2,
        [data-theme="dark"] h3,
        [data-theme="dark"] label {
          color: #f1f5f9 !important;
        }
        
        [data-theme="dark"] .security-tips {
          background: #334155 !important;
        }
        
        /* Auto theme system preference detection */
        @media (prefers-color-scheme: dark) {
          [data-theme="auto"] {
            --bg-primary: #1e293b;
            --bg-secondary: #334155;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
          }
          
          [data-theme="auto"] .settings-header,
          [data-theme="auto"] .settings-content {
            background: rgba(30, 41, 59, 0.95) !important;
            color: #f1f5f9 !important;
          }
          
          [data-theme="auto"] input,
          [data-theme="auto"] textarea {
            background: #334155 !important;
            border-color: #475569 !important;
            color: #f1f5f9 !important;
          }
          
          [data-theme="auto"] .notification-item {
            background: #334155 !important;
          }
          
          [data-theme="auto"] .theme-option {
            background: #334155 !important;
            border-color: #475569 !important;
            color: #f1f5f9 !important;
          }
          
          [data-theme="auto"] h2,
          [data-theme="auto"] h3,
          [data-theme="auto"] label {
            color: #f1f5f9 !important;
          }
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .settings-container {
            padding: 1rem 0.5rem !important;
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          input, textarea, button {
            border-width: 3px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
