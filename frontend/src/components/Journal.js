import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Journal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');

  // New entry form state
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 3,
    tags: '',
    isPrivate: false
  });

  // Edit entry form state
  const [editEntry, setEditEntry] = useState({
    id: '',
    title: '',
    content: '',
    mood: 3,
    tags: '',
    isPrivate: false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchEntries();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

      const response = await fetch(`${API_BASE}/api/journal`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      } else {
        // Fallback to localStorage if API fails
        const localEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        setEntries(localEntries);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      // Fallback to localStorage
      const localEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      setEntries(localEntries);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      const entryData = {
        title: newEntry.title || 'Untitled Entry',
        content: newEntry.content,
        mood: parseInt(newEntry.mood),
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPrivate: newEntry.isPrivate
      };

      const response = await fetch(`${API_BASE}/api/journal`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryData)
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(prev => [data.entry, ...prev]);

        // Reset form
        setNewEntry({
          title: '',
          content: '',
          mood: 3,
          tags: '',
          isPrivate: false
        });
        setShowNewEntry(false);

        alert('Journal entry saved successfully! 🎉');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save entry');
      }
    } catch (error) {
      console.error('Error saving entry:', error);

      // Fallback: save to localStorage
      const localEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      const newLocalEntry = {
        id: Date.now().toString(),
        title: newEntry.title || 'Untitled Entry',
        content: newEntry.content,
        mood: parseInt(newEntry.mood),
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPrivate: newEntry.isPrivate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.id || 'local-user'
      };

      localEntries.unshift(newLocalEntry);
      localStorage.setItem('journalEntries', JSON.stringify(localEntries));
      setEntries(localEntries);

      // Reset form
      setNewEntry({
        title: '',
        content: '',
        mood: 3,
        tags: '',
        isPrivate: false
      });
      setShowNewEntry(false);

      alert('Entry saved locally! 📝');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (entry) => {
    setEditEntry({
      id: entry.id,
      title: entry.title || '',
      content: entry.content,
      mood: entry.mood,
      tags: Array.isArray(entry.tags) ? entry.tags.join(', ') : '',
      isPrivate: entry.isPrivate || false
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';
      const entryData = {
        title: editEntry.title || 'Untitled Entry',
        content: editEntry.content,
        mood: parseInt(editEntry.mood),
        tags: editEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPrivate: editEntry.isPrivate
      };

      const response = await fetch(`${API_BASE}/api/journal/${editEntry.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryData)
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(prev => prev.map(entry =>
          entry.id === editEntry.id ? data.entry : entry
        ));
      } else {
        // Fallback to localStorage
        const localEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const updatedEntries = localEntries.map(entry =>
          entry.id === editEntry.id
            ? { ...entry, ...entryData, updatedAt: new Date().toISOString() }
            : entry
        );
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        setEntries(updatedEntries);
      }

      setShowEditModal(false);
      alert('Entry updated successfully! ✨');
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('There was an error updating your entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

      const response = await fetch(`${API_BASE}/api/journal/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
      } else {
        // Fallback to localStorage
        const localEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const filteredEntries = localEntries.filter(entry => entry.id !== entryId);
        localStorage.setItem('journalEntries', JSON.stringify(filteredEntries));
        setEntries(filteredEntries);
      }

      alert('Entry deleted successfully.');
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('There was an error deleting your entry. Please try again.');
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = ['😢', '😟', '😐', '😊', '😄'];
    return moods[mood - 1] || '😐';
  };

  const getMoodColor = (mood) => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    return colors[mood - 1] || '#eab308';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  // Filter and sort entries
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = (entry.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (Array.isArray(entry.tags) && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesMood = filterMood === '' || entry.mood.toString() === filterMood;
    return matchesSearch && matchesMood;
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'mood-high':
        return b.mood - a.mood;
      case 'mood-low':
        return a.mood - b.mood;
      default: // 'newest'
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: '1.5rem',
          color: 'white',
          paddingTop: '100px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <div>Loading your journal...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '100px 1rem 2rem 1rem' : '120px 2rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div>
              <h1 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 0.5rem 0'
              }}>
                📝 My Journal
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                margin: 0
              }}>
                Reflect, write, and track your mental wellness journey
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                  {entries.length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Entries</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                  {entries.length > 0 ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1) : '0'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Avg Mood</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                  {new Set(entries.map(e => new Date(e.createdAt).toDateString())).size}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Active Days</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                  {entries.filter(e => new Date(e.createdAt).toDateString() === new Date().toDateString()).length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Today's Entries</div>
              </div>
            </div>
          </div>

          {/* New Entry Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}
              onClick={() => setShowNewEntry(!showNewEntry)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              {showNewEntry ? '✕ Cancel' : '✏️ Write New Entry'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* New Entry Form */}
          {showNewEntry && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: isMobile ? '1.5rem' : '2rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                color: '#2d3748',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                ✨ New Journal Entry
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Title (optional)
                  </label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your entry a title..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  />
                </div>

                {/* Mood Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    How are you feeling today? {getMoodEmoji(newEntry.mood)}
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {[1, 2, 3, 4, 5].map(mood => (
                      <button
                        key={mood}
                        type="button"
                        style={{
                          background: newEntry.mood === mood ? getMoodColor(mood) : '#f1f5f9',
                          color: newEntry.mood === mood ? 'white' : '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                      >
                        {getMoodEmoji(mood)} {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Textarea */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    What's on your mind? *
                  </label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your thoughts, feelings, experiences, or anything that's important to you today..."
                    style={{
                      width: '100%',
                      minHeight: '200px',
                      padding: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                    required
                  />
                </div>

                {/* Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newEntry.tags}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="anxiety, work, family, gratitude, exercise..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  />
                </div>

                {/* Privacy Toggle */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#374151'
                  }}>
                    <input
                      type="checkbox"
                      checked={newEntry.isPrivate}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#667eea'
                      }}
                    />
                    <span>🔒 Keep this entry private</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !newEntry.content.trim()}
                  style={{
                    background: submitting || !newEntry.content.trim()
                      ? '#9ca3af'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem 2rem',
                    cursor: submitting || !newEntry.content.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                >
                  {submitting ? '🔄 Saving...' : '💾 Save Entry'}
                </button>
              </form>
            </div>
          )}

          {/* Filters and Search */}
          {entries.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    🔍 Search
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search entries..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    😊 Filter by Mood
                  </label>
                  <select
                    value={filterMood}
                    onChange={(e) => setFilterMood(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    <option value="">All Moods</option>
                    <option value="1">😢 Very Sad (1)</option>
                    <option value="2">😟 Sad (2)</option>
                    <option value="3">😐 Neutral (3)</option>
                    <option value="4">😊 Happy (4)</option>
                    <option value="5">😄 Very Happy (5)</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    📅 Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: 'white'
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="mood-high">Highest Mood</option>
                    <option value="mood-low">Lowest Mood</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Entries List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {sortedEntries.length > 0 ? (
              sortedEntries.map(entry => (
                <div key={entry.id} style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderLeft: `5px solid ${getMoodColor(entry.mood)}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}>

                  {/* Entry Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '2.5rem'
                      }}>
                        {getMoodEmoji(entry.mood)}
                      </div>
                      <div>
                        {entry.title && (
                          <div style={{
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            color: '#2d3748',
                            marginBottom: '0.25rem'
                          }}>
                            {entry.title}
                          </div>
                        )}
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: '#2d3748',
                          marginBottom: '0.25rem'
                        }}>
                          {formatDate(entry.createdAt)}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          fontSize: '0.9rem',
                          color: '#64748b'
                        }}>
                          <span>Mood: {entry.mood}/5</span>
                          {entry.isPrivate && <span>🔒 Private</span>}
                          <span>{new Date(entry.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          transition: 'background 0.3s ease'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(entry);
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                        title="Edit entry"
                      >
                        ✏️
                      </button>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          transition: 'background 0.3s ease'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id);
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                        title="Delete entry"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div style={{
                    color: '#374151',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    maxHeight: selectedEntry === entry.id ? 'none' : '100px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {entry.content}
                    {selectedEntry !== entry.id && entry.content.length > 200 && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30px',
                        background: 'linear-gradient(transparent, rgba(255,255,255,0.95))',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: '#667eea',
                        fontWeight: '600'
                      }}>
                        Click to read more...
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {Array.isArray(entry.tags) && entry.tags.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginBottom: '1rem'
                    }}>
                      {entry.tags.map((tag, index) => (
                        <span key={index} style={{
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expand/Collapse Indicator */}
                  <div style={{
                    textAlign: 'center',
                    color: '#667eea',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {selectedEntry === entry.id ? '▼ Click to collapse' : '▶ Click to read more'}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: isMobile ? '2rem' : '3rem',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{
                  color: '#2d3748',
                  fontSize: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  {entries.length === 0 ? 'Start Your Journal Journey' : 'No entries match your filters'}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '1.1rem',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  {entries.length === 0
                    ? 'Your thoughts and feelings matter. Begin documenting your mental health journey by writing your first entry.'
                    : 'Try adjusting your search terms or filters to find what you are looking for.'
                  }
                </p>
                {entries.length === 0 && (
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '1rem 2rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '600',
                      fontSize: '1.1rem'
                    }}
                    onClick={() => setShowNewEntry(true)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    ✏️ Write Your First Entry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                color: '#2d3748',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                ✏️ Edit Journal Entry
              </h3>

              <form onSubmit={handleUpdate}>
                {/* Title */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={editEntry.title}
                    onChange={(e) => setEditEntry(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Entry title..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Mood Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Mood {getMoodEmoji(editEntry.mood)}
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {[1, 2, 3, 4, 5].map(mood => (
                      <button
                        key={mood}
                        type="button"
                        style={{
                          background: editEntry.mood === mood ? getMoodColor(mood) : '#f1f5f9',
                          color: editEntry.mood === mood ? 'white' : '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: '600',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onClick={() => setEditEntry(prev => ({ ...prev, mood }))}
                      >
                        {getMoodEmoji(mood)} {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Textarea */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Content
                  </label>
                  <textarea
                    value={editEntry.content}
                    onChange={(e) => setEditEntry(prev => ({ ...prev, content: e.target.value }))}
                    style={{
                      width: '100%',
                      minHeight: '200px',
                      padding: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                {/* Tags */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Tags
                  </label>
                  <input
                    type="text"
                    value={editEntry.tags}
                    onChange={(e) => setEditEntry(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="anxiety, work, family, gratitude..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Privacy Toggle */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#374151'
                  }}>
                    <input
                      type="checkbox"
                      checked={editEntry.isPrivate}
                      onChange={(e) => setEditEntry(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#667eea'
                      }}
                    />
                    <span>🔒 Keep this entry private</span>
                  </label>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    style={{
                      background: 'none',
                      border: '2px solid #e2e8f0',
                      color: '#64748b',
                      borderRadius: '12px',
                      padding: '0.75rem 1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !editEntry.content.trim()}
                    style={{
                      background: submitting || !editEntry.content.trim()
                        ? '#9ca3af'
                        : 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.75rem 1.5rem',
                      cursor: submitting || !editEntry.content.trim() ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '600'
                    }}
                  >
                    {submitting ? '🔄 Updating...' : '💾 Update Entry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
