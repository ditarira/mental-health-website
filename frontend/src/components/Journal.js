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
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Refresh dashboard stats
  const refreshDashboard = () => {
    window.dispatchEvent(new CustomEvent('journalUpdated'));
  };

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      if (!token) {
        console.log('No token available for fetching entries');
        return;
      }

      const response = await fetch(API_BASE + '/api/journal', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
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

  // Save new journal entry
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

      const response = await fetch(API_BASE + '/api/journal', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
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

      if (data.success) {
        showNotification('Journal entry saved successfully! 📝✨', 'success');
        setNewEntry({ title: '', content: '', mood: '3', tags: [] });
        fetchEntries();
        refreshDashboard();
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

  // Edit journal entry
  const editEntry = async (entryId, updatedData) => {
    try {
      setLoading(true);

      const response = await fetch(API_BASE + '/api/journal/' + entryId, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Entry updated successfully! ✏️✨', 'success');
        setEditingEntry(null);
        fetchEntries();
        refreshDashboard();
      } else {
        showNotification(data.message || 'Failed to update entry', 'error');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      showNotification('Failed to update entry', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete journal entry
  const deleteEntry = async (entryId) => {
    try {
      setLoading(true);
      console.log('🗑️ Attempting to delete entry with ID:', entryId);

      const response = await fetch(API_BASE + '/api/journal/' + entryId, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      console.log('🗑️ Delete response status:', response.status);
      console.log('🗑️ Delete response headers:', response.headers);

      let data;
      try {
        data = await response.json();
        console.log('🗑️ Delete response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        data = { success: false, message: 'Invalid server response' };
      }

      if (response.ok && data.success) {
        showNotification('Entry deleted successfully! 🗑️', 'success');
        fetchEntries();
        refreshDashboard();
      } else {
        const errorMsg = data.message || data.details || 'Unknown error occurred';
        console.error('Delete failed:', errorMsg);
        showNotification('Delete failed: ' + errorMsg, 'error');
      }
    } catch (error) {
      console.error('Network error deleting entry:', error);
      showNotification('Network error: Could not delete entry', 'error');
    } finally {
      setLoading(false);
      setDeleteConfirm(null); // Always close modal
    }
  };

  // Start editing an entry
  const startEditing = (entry) => {
    setEditingEntry({
      id: entry.id,
      title: entry.title || '',
      content: entry.content,
      mood: entry.mood
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingEntry(null);
  };

  // Save edited entry
  const saveEditedEntry = () => {
    if (!editingEntry.content.trim()) {
      showNotification('Please write something in your journal', 'error');
      return;
    }

    editEntry(editingEntry.id, {
      title: editingEntry.title || 'Untitled Entry',
      content: editingEntry.content,
      mood: editingEntry.mood
    });
  };

  // Confirm delete
  const confirmDelete = (entryId) => {
    setDeleteConfirm(entryId);
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
          <div className="auth-icon">🔐</div>
          <h2>Please log in to access your journal</h2>
          <p>Sign in to start writing your thoughts and track your mood.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      {notification && (
        <div className={'journal-notification ' + notification.type}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <button className="notification-close" onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>🗑️ Delete Entry</h3>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete this journal entry? This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn delete-btn" 
                onClick={() => deleteEntry(deleteConfirm)}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="journal-header">
        <div className="header-content">
          <div className="header-text">
            <h1>✨ My Personal Journal</h1>
            <p>Express your thoughts, track your mood, and reflect on your journey</p>
          </div>
          <div className="header-stats">
            <div className="stat-bubble">
              <span className="stat-number">{entries.length}</span>
              <span className="stat-label">Entries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="new-entry-form">
        <div className="form-header">
          <h2>📝 Write New Entry</h2>
          <div className="form-decoration">✨</div>
        </div>

        <div className="form-content">
          <input
            type="text"
            placeholder="Give your entry a title... (optional)"
            value={newEntry.title}
            onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
            className="entry-title-input"
          />

          <textarea
            placeholder="How are you feeling today? Pour your heart out here... 💭"
            value={newEntry.content}
            onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
            rows="6"
            className="entry-content-textarea"
          />

          <div className="entry-controls">
            <div className="mood-selector">
              <label className="mood-label">
                <span className="mood-icon">🎭</span>
                How are you feeling?
              </label>
              <div className="mood-options">
                <button
                  type="button"
                  className={'mood-btn ' + (newEntry.mood === '1' ? 'active' : '')}
                  onClick={() => setNewEntry({...newEntry, mood: '1'})}
                >
                  <span className="mood-emoji">😢</span>
                  <span className="mood-text">Very Sad</span>
                </button>
                <button
                  type="button"
                  className={'mood-btn ' + (newEntry.mood === '2' ? 'active' : '')}
                  onClick={() => setNewEntry({...newEntry, mood: '2'})}
                >
                  <span className="mood-emoji">😞</span>
                  <span className="mood-text">Sad</span>
                </button>
                <button
                  type="button"
                  className={'mood-btn ' + (newEntry.mood === '3' ? 'active' : '')}
                  onClick={() => setNewEntry({...newEntry, mood: '3'})}
                >
                  <span className="mood-emoji">😐</span>
                  <span className="mood-text">Neutral</span>
                </button>
                <button
                  type="button"
                  className={'mood-btn ' + (newEntry.mood === '4' ? 'active' : '')}
                  onClick={() => setNewEntry({...newEntry, mood: '4'})}
                >
                  <span className="mood-emoji">😊</span>
                  <span className="mood-text">Happy</span>
                </button>
                <button
                  type="button"
                  className={'mood-btn ' + (newEntry.mood === '5' ? 'active' : '')}
                  onClick={() => setNewEntry({...newEntry, mood: '5'})}
                >
                  <span className="mood-emoji">😄</span>
                  <span className="mood-text">Very Happy</span>
                </button>
              </div>
            </div>

            <button
              onClick={saveEntry}
              disabled={loading || !newEntry.content.trim()}
              className="save-entry-btn"
            >
              <span className="btn-icon">💾</span>
              <span className="btn-text">
                {loading ? 'Saving...' : 'Save Entry'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="entries-list">
        <div className="entries-header">
          <h2>📖 Your Journal Entries</h2>
          <div className="entries-count">{entries.length} total entries</div>
        </div>

        {entries.length === 0 ? (
          <div className="no-entries">
            <div className="empty-illustration">📝✨</div>
            <h3>No entries yet</h3>
            <p>Start your journaling journey by writing your first entry above!</p>
          </div>
        ) : (
          <div className="entries-grid">
            {entries.map(entry => (
              <div key={entry.id} className="entry-card">
                {editingEntry && editingEntry.id === entry.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editingEntry.title}
                      onChange={(e) => setEditingEntry({...editingEntry, title: e.target.value})}
                      className="edit-title-input"
                      placeholder="Entry title..."
                    />
                    
                    <textarea
                      value={editingEntry.content}
                      onChange={(e) => setEditingEntry({...editingEntry, content: e.target.value})}
                      className="edit-content-textarea"
                      rows="4"
                    />
                    
                    <div className="edit-mood-selector">
                      <button
                        type="button"
                        className={'edit-mood-btn ' + (editingEntry.mood === '1' ? 'active' : '')}
                        onClick={() => setEditingEntry({...editingEntry, mood: '1'})}
                      >
                        😢
                      </button>
                      <button
                        type="button"
                        className={'edit-mood-btn ' + (editingEntry.mood === '2' ? 'active' : '')}
                        onClick={() => setEditingEntry({...editingEntry, mood: '2'})}
                      >
                        😞
                      </button>
                      <button
                        type="button"
                        className={'edit-mood-btn ' + (editingEntry.mood === '3' ? 'active' : '')}
                        onClick={() => setEditingEntry({...editingEntry, mood: '3'})}
                      >
                        😐
                      </button>
                      <button
                        type="button"
                        className={'edit-mood-btn ' + (editingEntry.mood === '4' ? 'active' : '')}
                        onClick={() => setEditingEntry({...editingEntry, mood: '4'})}
                      >
                        😊
                      </button>
                      <button
                        type="button"
                        className={'edit-mood-btn ' + (editingEntry.mood === '5' ? 'active' : '')}
                        onClick={() => setEditingEntry({...editingEntry, mood: '5'})}
                      >
                        😄
                      </button>
                    </div>
                    
                    <div className="edit-actions">
                      <button className="edit-save-btn" onClick={saveEditedEntry} disabled={loading}>
                        {loading ? '💾 Saving...' : '💾 Save'}
                      </button>
                      <button className="edit-cancel-btn" onClick={cancelEditing}>
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="entry-header">
                      <div className="entry-title-section">
                        <h3 className="entry-title">{entry.title || 'Untitled Entry'}</h3>
                        <div className="entry-actions">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => startEditing(entry)}
                            title="Edit entry"
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => confirmDelete(entry.id)}
                            title="Delete entry"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      
                      <div className="entry-meta">
                        <span className="entry-date">
                          📅 {new Date(entry.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="entry-mood-display">
                          <span className="mood-emoji-large">
                            {entry.mood === '1' && '😢'}
                            {entry.mood === '2' && '😞'}
                            {entry.mood === '3' && '😐'}
                            {entry.mood === '4' && '😊'}
                            {entry.mood === '5' && '😄'}
                          </span>
                          <span className="mood-label-small">
                            {entry.mood === '1' && 'Very Sad'}
                            {entry.mood === '2' && 'Sad'}
                            {entry.mood === '3' && 'Neutral'}
                            {entry.mood === '4' && 'Happy'}
                            {entry.mood === '5' && 'Very Happy'}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="entry-content">
                      {entry.content}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
