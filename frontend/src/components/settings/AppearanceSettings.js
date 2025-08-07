import React, { useState, useEffect } from 'react';

const AppearanceSettings = ({ settings, updateSettings, saveSettings }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings('appearance');
      
      applyTheme(settings.theme);
      
      setSuccess('Appearance settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating appearance:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  useEffect(() => {
    if (settings.theme) {
      applyTheme(settings.theme);
    }
  }, [settings.theme]);

  const ThemeOption = ({ value, label, description, current, onChange }) => (
    <div
      onClick={() => onChange(value)}
      style={{
        padding: '1rem',
        border: current === value ? '2px solid #3b82f6' : '2px solid #e5e7eb',
        borderRadius: '8px',
        cursor: 'pointer',
        background: current === value ? '#eff6ff' : '#f9fafb',
        marginBottom: '1rem',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <input
          type="radio"
          name="theme"
          value={value}
          checked={current === value}
          onChange={() => onChange(value)}
          style={{ marginRight: '0.5rem' }}
        />
        <span style={{ fontWeight: '600' }}>{label}</span>
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>{description}</p>
    </div>
  );

  const colorSchemes = [
    { value: 'default', label: 'Default', colors: ['#667eea', '#764ba2'] },
    { value: 'ocean', label: 'Ocean', colors: ['#06b6d4', '#0891b2'] },
    { value: 'forest', label: 'Forest', colors: ['#10b981', '#059669'] },
    { value: 'sunset', label: 'Sunset', colors: ['#f59e0b', '#d97706'] },
    { value: 'lavender', label: 'Lavender', colors: ['#8b5cf6', '#7c3aed'] }
  ];

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
        ?? Appearance Settings
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
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>?? Theme</h3>
        
        <ThemeOption
          value="light"
          label="?? Light Theme"
          description="Clean and bright interface for daytime use"
          current={settings.theme}
          onChange={(value) => updateSettings('appearance', { theme: value })}
        />
        
        <ThemeOption
          value="dark"
          label="?? Dark Theme"
          description="Easy on the eyes for nighttime sessions"
          current={settings.theme}
          onChange={(value) => updateSettings('appearance', { theme: value })}
        />
        
        <ThemeOption
          value="auto"
          label="?? Auto Theme"
          description="Automatically switch based on system preference"
          current={settings.theme}
          onChange={(value) => updateSettings('appearance', { theme: value })}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>?? Font Size</h3>
        
        <select
          value={settings.fontSize}
          onChange={(e) => updateSettings('appearance', { fontSize: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            background: 'white'
          }}
        >
          <option value="small">Small - Better for larger screens</option>
          <option value="medium">Medium - Default size</option>
          <option value="large">Large - Better accessibility</option>
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>?? Color Scheme</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          {colorSchemes.map(scheme => (
            <div
              key={scheme.value}
              onClick={() => updateSettings('appearance', { colorScheme: scheme.value })}
              style={{
                padding: '1rem',
                border: settings.colorScheme === scheme.value ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
                background: settings.colorScheme === scheme.value ? '#eff6ff' : 'white'
              }}
            >
              <div
                style={{
                  height: '40px',
                  background: `linear-gradient(135deg, ${scheme.colors[0]}, ${scheme.colors[1]})`,
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{scheme.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : '?? Save Appearance'}
      </button>
    </div>
  );
};

export default AppearanceSettings;
