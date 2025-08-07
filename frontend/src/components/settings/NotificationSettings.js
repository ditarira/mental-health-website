import React, { useState } from 'react';
import EmailService from '../../services/EmailService';

const NotificationSettings = ({ settings, updateSettings, saveSettings }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings('notifications');
      
      await EmailService.sendSettingsChangeNotification(
        localStorage.getItem('userEmail'),
        localStorage.getItem('userName'),
        'Notification Preferences'
      );
      
      setSuccess('Notification settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const NotificationToggle = ({ label, description, checked, onChange, icon }) => (
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
        🔔 Notification Preferences
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

      <NotificationToggle
        icon="📧"
        label="Email Notifications"
        description="Receive important updates via email"
        checked={settings.emailNotifications}
        onChange={(e) => updateSettings('notifications', { emailNotifications: e.target.checked })}
      />

      <NotificationToggle
        icon="📱"
        label="Push Notifications"
        description="Get real-time notifications on your device"
        checked={settings.pushNotifications}
        onChange={(e) => updateSettings('notifications', { pushNotifications: e.target.checked })}
      />

      <NotificationToggle
        icon="📝"
        label="Journal Reminders"
        description="Daily reminders to write in your journal"
        checked={settings.journalReminders}
        onChange={(e) => updateSettings('notifications', { journalReminders: e.target.checked })}
      />

      <NotificationToggle
        icon="🧘"
        label="Breathing Exercise Reminders"
        description="Reminders for mindfulness and breathing exercises"
        checked={settings.breathingReminders}
        onChange={(e) => updateSettings('notifications', { breathingReminders: e.target.checked })}
      />

      <NotificationToggle
        icon="📊"
        label="Weekly Progress Reports"
        description="Weekly summary of your mental wellness journey"
        checked={settings.weeklyReports}
        onChange={(e) => updateSettings('notifications', { weeklyReports: e.target.checked })}
      />

      <div style={{
        padding: '1rem',
        background: '#f0f9ff',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          ⏰ Daily Reminder Time
        </label>
        <input
          type="time"
          value={settings.reminderTime}
          onChange={(e) => updateSettings('notifications', { reminderTime: e.target.value })}
          style={{
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            width: '200px'
          }}
        />
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
          When should we send your daily wellness reminders?
        </p>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : '🔔 Save Notification Settings'}
      </button>
    </div>
  );
};

export default NotificationSettings;
