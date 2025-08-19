import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Journal = () => {
  const { user, token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (!token) return;

      const response = await fetch(API_BASE + '/api/journal', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
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
        showNotification('Journal entry saved! 💾', 'success');
        setNewEntry({ title: '', content: '', mood: '3', tags: [] });
        fetchEntries();
        refreshDashboard();
      } else {
        showNotification(data.message || 'Failed to save entry', 'error');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      showNotification('Error saving entry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const goToPreviousEntry = () => {
    if (currentEntryIndex > 0) {
      setCurrentEntryIndex(currentEntryIndex - 1);
    }
  };

  const goToNextEntry = () => {
    if (currentEntryIndex < entries.length - 1) {
      setCurrentEntryIndex(currentEntryIndex + 1);
    }
  };

  // Delete journal entry
  const deleteEntry = async (entryId) => {
    try {
      setLoading(true);

      const response = await fetch(API_BASE + '/api/journal/' + entryId, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showNotification('Entry deleted! ✅', 'success');
        fetchEntries();
        refreshDashboard();
        if (currentEntryIndex >= entries.length - 1) {
          setCurrentEntryIndex(Math.max(0, entries.length - 2));
        }
      } else {
        showNotification('Delete failed: ' + (data.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      showNotification('Network error: Could not delete entry', 'error');
    } finally {
      setLoading(false);
      setDeleteConfirm(null);
    }
  };

  // Get mood emoji and text
  const getMoodInfo = (mood) => {
    const moods = {
      '1': { emoji: '😢', text: 'Very Sad', color: '#ef4444' },
      '2': { emoji: '😕', text: 'Sad', color: '#f97316' },
      '3': { emoji: '😐', text: 'Neutral', color: '#6b7280' },
      '4': { emoji: '😊', text: 'Happy', color: '#10b981' },
      '5': { emoji: '😄', text: 'Very Happy', color: '#3b82f6' }
    };
    return moods[mood] || moods['3'];
  };
  useEffect(() => {
    if (user && token) {
      fetchEntries();
    }
  }, [user, token]);

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: isMobile ? '30px 20px' : '60px 40px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
          <h2 style={{ color: '#1f2937', marginBottom: '10px' }}>Please log in</h2>
          <p style={{ color: '#6b7280' }}>Sign in to access your personal journal</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          maxWidth: isMobile ? '300px' : '400px'
        }}>
          <span>{notification.type === 'success' ? '?' : '✅'}</span>
          <span style={{ flex: 1 }}>{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0'
            }}
          >
            → 
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
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
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗑️</div>
            <h3 style={{ color: '#1f2937', marginBottom: '10px' }}>Delete Entry</h3>
            <p style={{ color: '#6b7280', marginBottom: '25px' }}>
              Are you sure? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteEntry(deleteConfirm)}
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: isMobile ? '15px 20px' : '30px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div>
            <h1 style={{
              margin: '0 0 5px 0',
              fontSize: isMobile ? '1.4rem' : '2.2rem',
              color: 'white',
              fontWeight: '700',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              📝 My Personal Journal
            </h1>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Express your thoughts and track your mood ❤️
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.25)',
            padding: '10px 20px',
            borderRadius: '15px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            backdropFilter: 'blur(5px)'
          }}>
            {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>
        
        {/* New Entry Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: isMobile ? '12px' : '20px',
          padding: isMobile ? '20px' : '30px',
          marginBottom: '30px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            color: '#1f2937',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ✍️ Write New Entry
          </h2>

          <input
            type="text"
            placeholder="Give your entry a title...📖 (optional)"
            value={newEntry.title}
            onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
            style={{
              width: '100%',
              padding: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              marginBottom: '15px',
              background: '#f9fafb',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
          />

          <textarea
            placeholder="How are you feeling today? Pour your heart out here... 📓"
            value={newEntry.content}
            onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
            rows={isMobile ? "4" : "6"}
            style={{
              width: '100%',
              padding: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              marginBottom: '20px',
              background: '#f9fafb',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
          />

          {/* Mood Selector */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '12px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: '600',
              color: '#374151'
            }}>
               ❤️ How are you feeling?
            </label>
            <div style={{
              display: 'flex',
              gap: isMobile ? '6px' : '12px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'space-between' : 'flex-start'
            }}>
              {['1', '2', '3', '4', '5'].map(mood => {
                const moodInfo = getMoodInfo(mood);
                const isActive = newEntry.mood === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setNewEntry({...newEntry, mood})}
                    style={{
                      background: isActive ? moodInfo.color : '#f3f4f6',
                      color: isActive ? 'white' : '#6b7280',
                      border: 'none',
                      padding: isMobile ? '8px 12px' : '12px 16px',
                      borderRadius: '10px',
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      minWidth: isMobile ? '60px' : '80px',
                      justifyContent: 'center',
                      flexDirection: isMobile ? 'column' : 'row'
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{moodInfo.emoji}</span>
                    {!isMobile && <span>{moodInfo.text}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={saveEntry}
            disabled={loading || !newEntry.content.trim()}
            style={{
              background: loading || !newEntry.content.trim() ? '#d1d5db' : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading || !newEntry.content.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              boxShadow: loading || !newEntry.content.trim() ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span>💾</span>
            <span>{loading ? 'Saving...' : 'Save Entry'}</span>
          </button>
        </div>

        {/* Journal Entries Navigation */}
        {entries.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '20px' : '30px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            {/* Navigation Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                margin: '0',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                color: '#1f2937',
                fontWeight: '700'
              }}>
                📖  Your Entries
              </h2>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <button
                  onClick={goToPreviousEntry}
                  disabled={currentEntryIndex === 0}
                  style={{
                    background: currentEntryIndex === 0 ? '#f3f4f6' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    color: currentEntryIndex === 0 ? '#9ca3af' : 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: currentEntryIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  ←
                </button>
                
                <span style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  {currentEntryIndex + 1} of {entries.length}
                </span>
                
                <button
                  onClick={goToNextEntry}
                  disabled={currentEntryIndex === entries.length - 1}
                  style={{
                    background: currentEntryIndex === entries.length - 1 ? '#f3f4f6' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    color: currentEntryIndex === entries.length - 1 ? '#9ca3af' : 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: currentEntryIndex === entries.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Current Entry Display */}
            {entries[currentEntryIndex] && (
              <div style={{
                background: '#f8fafc',
                borderRadius: '15px',
                padding: isMobile ? '20px' : '25px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: '0 0 5px 0',
                      fontSize: isMobile ? '1.1rem' : '1.3rem',
                      color: '#1f2937',
                      fontWeight: '700'
                    }}>
                      {entries[currentEntryIndex].title || 'Untitled Entry'}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      marginBottom: '10px'
                    }}>
                      <span>📝 {new Date(entries[currentEntryIndex].createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: getMoodInfo(entries[currentEntryIndex].mood).color,
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        <span>{getMoodInfo(entries[currentEntryIndex].mood).emoji}</span>
                        <span>{getMoodInfo(entries[currentEntryIndex].mood).text}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setDeleteConfirm(entries[currentEntryIndex].id)}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                
                <div style={{
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  whiteSpace: 'pre-wrap'
                }}>
                  {entries[currentEntryIndex].content}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {entries.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '40px 20px' : '60px 40px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📓</div>
            <h3 style={{
              color: '#1f2937',
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              marginBottom: '10px',
              fontWeight: '700'
            }}>
              No entries yet
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: isMobile ? '0.9rem' : '1rem',
              marginBottom: '0'
            }}>
              Start your journaling journey by writing your first entry above! ✍️
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;



