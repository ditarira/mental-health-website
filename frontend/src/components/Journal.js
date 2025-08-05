import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [mood, setMood] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      const response = await axios.get(\\/api/journal\);
      setEntries(response.data);
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
      const response = await axios.post(\\/api/journal\, {
        content: currentEntry,
        mood: mood,
        date: new Date().toISOString()
      });
      
      setEntries([response.data, ...entries]);
      setCurrentEntry('');
      setMood(5);
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
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your journal...</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="container">
        <div className="section">
          <h1 className="section-title text-center">📝 Journal</h1>
          
          <div className="journal-wrapper">
            <div className="journal-content">
              <h2>How are you feeling today?</h2>
              <p>Take a moment to reflect on your thoughts and emotions.</p>
            </div>

            <div className="journal-demo">
              <div className="journal-header">
                <h3 className="journal-title">Today's Entry</h3>
                <span className="journal-date">{new Date().toLocaleDateString()}</span>
              </div>

              <div className="mood-tracker">
                {moods.map((moodOption) => (
                  <span
                    key={moodOption.value}
                    className={\mood \\}
                    onClick={() => setMood(moodOption.value)}
                    title={moodOption.label}
                  >
                    {moodOption.emoji}
                  </span>
                ))}
              </div>

              <textarea
                className="journal-entry"
                placeholder="What's on your mind today? Write about your thoughts, feelings, or experiences..."
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                rows={8}
              />

              <button 
                className="btn" 
                onClick={saveEntry} 
                disabled={saving || !currentEntry.trim()}
              >
                {saving ? 'Saving...' : '💾 Save Entry'}
              </button>

              <div className="journal-entries-list">
                <h4>Recent Entries</h4>
                {entries.length === 0 ? (
                  <p>No journal entries yet. Start writing!</p>
                ) : (
                  entries.slice(0, 5).map((entry, index) => (
                    <div key={entry._id || index} className="entry-item">
                      <div className="entry-date">
                        {formatDate(entry.createdAt || entry.date)}
                        <span className="mood">
                          {moods.find(m => m.value === entry.mood)?.emoji || '😐'}
                        </span>
                      </div>
                      <div className="entry-preview">
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
    </div>
  );
};

export default Journal;
