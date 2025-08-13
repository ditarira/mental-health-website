import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Journal = () => {
  const { user, token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '3',
    tags: []
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      if (!token) {
        console.log('No token available for fetching entries');
        return;
      }

      const response = await fetch(`${API_BASE}/api/journal`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Fetched entries:', data);

      if (data.success) {
        setEntries(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  // Save journal entry
  const saveEntry = async () => {
    try {
      if (!token) {
        showNotification('Please log in to save entries', 'error');
        return;
      }

      if (!newEntry.content.trim()) {
        showNotification('Please write something in your journal', 'error');
        return;
      }

      setLoading(true);
      console.log('Saving entry with token:', token);
      console.log('Entry data:', newEntry);

      const response = await fetch(`${API_BASE}/api/journal`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEntry.title || 'Untitled Entry',
          content: newEntry.content,
          mood: newEntry.mood,
          tags: newEntry.tags
        }),
      });

      const data = await response.json();
      console.log('Save response:', data);

      if (data.success) {
        showNotification('Journal entry saved successfully! 📝', 'success');
        setNewEntry({ title: '', content: '', mood: '3', tags: [] });
        fetchEntries(); // Refresh entries
      } else {
        showNotification(data.message || 'Failed to save entry', 'error');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      showNotification('There was an error saving your entry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchEntries();
    }
  }, [user, token]);

  if (!user) {
    return (
      <div className="journal-container">
        <div className="auth-required">
          <h2>Please log in to access your journal</h2>
          <p>Sign in to start writing your thoughts and track your mood.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      {/* Custom Notification */}
      {notification && (
        <div className={`custom-notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="journal-header">
        <h1>My Journal</h1>
        <p>Express your thoughts and track your mood</p>
      </div>

      {/* New Entry Form */}
      <div className="new-entry-form">
        <input
          type="text"
          placeholder="Entry title (optional)"
          value={newEntry.title}
          onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
          className="entry-title-input"
        />
        
        <textarea
          placeholder="How are you feeling today? Write your thoughts here..."
          value={newEntry.content}
          onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
          rows="6"
          className="entry-content-textarea"
        />

        <div className="entry-controls">
          <div className="mood-selector">
            <label>Mood:</label>
            <select 
              value={newEntry.mood} 
              onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
              className="mood-select"
            >
              <option value="1">😢 Very Sad</option>
              <option value="2">😞 Sad</option>
              <option value="3">😐 Neutral</option>
              <option value="4">😊 Happy</option>
              <option value="5">😄 Very Happy</option>
            </select>
          </div>

          <button 
            onClick={saveEntry}
            disabled={loading || !newEntry.content.trim()}
            className="save-entry-btn"
          >
            {loading ? '💾 Saving...' : '💾 Save Entry'}
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="entries-list">
        <h2>Your Recent Entries ({entries.length})</h2>
        {entries.length === 0 ? (
          <div className="no-entries">
            <p>No journal entries yet. Start writing your first entry above! ✨</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <h3>{entry.title || 'Untitled Entry'}</h3>
                <div className="entry-meta">
                  <span className="entry-date">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  <span className="entry-mood">
                    {entry.mood === '1' && '😢'}
                    {entry.mood === '2' && '😞'}
                    {entry.mood === '3' && '😐'}
                    {entry.mood === '4' && '😊'}
                    {entry.mood === '5' && '😄'}
                  </span>
                </div>
              </div>
              <div className="entry-content">
                {entry.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
