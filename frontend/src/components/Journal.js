import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [mood, setMood] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_URL = 'https://mental-health-backend-2mtp.onrender.com';

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad' },
    { value: 2, emoji: '😞', label: 'Sad' },
    { value: 3, emoji: '😐', label: 'Neutral' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Great' },
    { value: 6, emoji: '😄', label: 'Excellent' },
    { value: 7, emoji: '🤩', label: 'Amazing' }
  ];

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL + '/api/journal', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    if (!currentEntry.trim()) return;
    
    setSaving(true);
    try {
      const response = await fetch(API_URL + '/api/journal', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: currentEntry,
          mood: mood,
          date: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setEntries([data, ...entries]);
        setCurrentEntry('');
        setMood(5);
      } else {
        alert('Failed to save entry. Please try again.');
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Failed to save entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #7ca5b8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }}></div>
          <p>Loading your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#2d4654', marginBottom: '0.5rem' }}>
            📝 Journal
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            How are you feeling today? Take a moment to reflect on your thoughts and emotions.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #eee'
            }}>
              <h3 style={{ color: '#2d4654', margin: 0 }}>Today's Entry</h3>
              <span style={{ fontSize: '0.9rem', color: '#777' }}>
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {moods.map((moodOption) => (
                <span
                  key={moodOption.value}
                  style={{
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    opacity: mood === moodOption.value ? 1 : 0.5,
                    transform: mood === moodOption.value ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setMood(moodOption.value)}
                  title={moodOption.label}
                >
                  {moodOption.emoji}
                </span>
              ))}
            </div>

            <textarea
              style={{
                width: '100%',
                minHeight: '200px',
                border: '1px solid #eee',
                borderRadius: '10px',
                padding: '1rem',
                fontSize: '1rem',
                resize: 'vertical',
                marginBottom: '1rem',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              placeholder="What's on your mind today? Write about your thoughts, feelings, or experiences..."
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#7ca5b8';
                e.target.style.boxShadow = '0 0 0 2px rgba(124, 165, 184, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#eee';
                e.target.style.boxShadow = 'none';
              }}
            />

            <button 
              onClick={saveEntry} 
              disabled={saving || !currentEntry.trim()}
              style={{
                width: '100%',
                background: saving || !currentEntry.trim() ? '#ccc' : 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: saving || !currentEntry.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? '💾 Saving...' : '💾 Save Entry'}
            </button>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{ color: '#2d4654', marginBottom: '1.5rem' }}>Recent Entries</h4>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {entries.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                  No journal entries yet. Start writing!
                </p>
              ) : (
                entries.slice(0, 5).map((entry, index) => (
                  <div key={entry._id || index} style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }}
                  >
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#777',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{formatDate(entry.createdAt || entry.date)}</span>
                      <span>
                        {moods.find(m => m.value === entry.mood)?.emoji || '😐'}
                      </span>
                    </div>
                    <div style={{
                      color: '#555',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {entry.content.substring(0, 100)}
                      {entry.content.length > 100 ? '...' : ''}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
