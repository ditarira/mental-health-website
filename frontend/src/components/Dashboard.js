import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalEntries: 0,
    totalSessions: 0,
    currentStreak: 0,
    averageMood: 0
  });
  const [recentEntries, setRecentEntries] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moods = [
    { value: 'very_sad', emoji: '😢', label: 'Very Sad', score: 1 },
    { value: 'sad', emoji: '😞', label: 'Sad', score: 2 },
    { value: 'neutral', emoji: '😐', label: 'Neutral', score: 3 },
    { value: 'happy', emoji: '😊', label: 'Happy', score: 4 },
    { value: 'very_happy', emoji: '😃', label: 'Very Happy', score: 5 }
  ];

  const fetchDashboardData = async () => {
    try {
      if (!token) return;

      setLoading(true);

      // Fetch journal entries
      const journalResponse = await fetch(`${API_BASE}/api/journal`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Fetch breathing sessions
      const breathingResponse = await fetch(`${API_BASE}/api/breathing`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (journalResponse.ok && breathingResponse.ok) {
        const journalData = await journalResponse.json();
        const breathingData = await breathingResponse.json();

        const entries = journalData.data || [];
        const sessions = breathingData.data || [];

        // Calculate stats
        const totalEntries = entries.length;
        const totalSessions = sessions.length;
        
        // Calculate average mood
        const moodScores = entries.map(entry => {
          const mood = moods.find(m => m.value === entry.mood);
          return mood ? mood.score : 3;
        });
        const averageMood = moodScores.length > 0 
          ? moodScores.reduce((a, b) => a + b, 0) / moodScores.length 
          : 0;

        // Calculate streak (simplified)
        const currentStreak = Math.min(totalEntries, 7);

        setStats({
          totalEntries,
          totalSessions,
          currentStreak,
          averageMood: Math.round(averageMood * 10) / 10
        });

        // Set recent data (last 3 items for mobile, 5 for desktop)
        const recentLimit = isMobile ? 3 : 5;
        setRecentEntries(entries.slice(0, recentLimit));
        setRecentSessions(sessions.slice(0, recentLimit));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchDashboardData();
    }

    // Listen for updates from other components
    const handleJournalUpdate = () => fetchDashboardData();
    window.addEventListener('journalUpdated', handleJournalUpdate);
    
    return () => {
      window.removeEventListener('journalUpdated', handleJournalUpdate);
    };
  }, [user, token, isMobile]);

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
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏠</div>
          <h2 style={{ color: '#1f2937', marginBottom: '10px' }}>Please log in</h2>
          <p style={{ color: '#6b7280' }}>Sign in to access your dashboard</p>
        </div>
      </div>
    );
  }

  if (loading) {
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
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <p style={{ color: '#6b7280', margin: 0 }}>Loading your dashboard...</p>
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
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: isMobile ? '20px' : '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <span style={{ fontSize: isMobile ? '2.5rem' : '3rem' }}>✨</span>
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              color: 'white',
              fontWeight: '700'
            }}>
              Welcome back, {user?.firstName}!
            </h1>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? '1rem' : '1.1rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Continue your mindfulness journey 🧘‍♀️
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>
        
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '15px' : '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom: '8px' }}>📝</div>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '5px' }}>
              {stats.totalEntries}
            </div>
            <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>
              Journal Entries
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom: '8px' }}>🧘‍♀️</div>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '5px' }}>
              {stats.totalSessions}
            </div>
            <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>
              Breathing Sessions
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom: '8px' }}>🔥</div>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '5px' }}>
              {stats.currentStreak}
            </div>
            <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>
              Day Streak
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom: '8px' }}>
              {stats.averageMood >= 4 ? '😊' : stats.averageMood >= 3 ? '😐' : '😞'}
            </div>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '5px' }}>
              {stats.averageMood || '0.0'}
            </div>
            <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>
              Avg Mood
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '12px' : '15px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => window.location.href = '/journal'}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: isMobile ? '12px' : '15px',
              padding: isMobile ? '15px 12px' : '20px 15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              color: '#374151',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: '8px' }}>✍️</div>
            Write in Journal
          </button>

          <button
            onClick={() => window.location.href = '/breathing'}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: isMobile ? '12px' : '15px',
              padding: isMobile ? '15px 12px' : '20px 15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              color: '#374151',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: '8px' }}>🧘‍♀️</div>
            Start Breathing
          </button>

          <button
            onClick={() => window.location.href = '/resources'}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: isMobile ? '12px' : '15px',
              padding: isMobile ? '15px 12px' : '20px 15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              color: '#374151',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: '8px' }}>📚</div>
            Get Help
          </button>

          <button
            onClick={() => window.location.href = '/settings'}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: isMobile ? '12px' : '15px',
              padding: isMobile ? '15px 12px' : '20px 15px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              color: '#374151',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: '8px' }}>⚙️</div>
            Settings
          </button>
        </div>

        {/* Recent Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '30px'
        }}>
          
          {/* Recent Journal Entries - CONDENSED */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>📝</span>
                <h3 style={{
                  margin: 0,
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  color: '#374151',
                  fontWeight: '700'
                }}>
                  Recent Entries
                </h3>
              </div>
              <button
                onClick={() => window.location.href = '/journal'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All →
              </button>
            </div>

            {recentEntries.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📔</div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No entries yet</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {recentEntries.map(entry => {
                  const entryMood = moods.find(m => m.value === entry.mood);
                  return (
                    <div
                      key={entry.id}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '10px',
                        padding: isMobile ? '12px' : '15px',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.location.href = '/journal'}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          fontWeight: '600',
                          color: '#374151',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          flex: 1,
                          marginRight: '10px'
                        }}>
                          {entry.title}
                        </h4>
                        {entryMood && (
                          <span style={{ 
                            fontSize: isMobile ? '1rem' : '1.2rem',
                            background: 'rgba(102, 126, 234, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            {entryMood.emoji}
                          </span>
                        )}
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                        color: '#6b7280',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {entry.content}
                      </p>
                      <p style={{
                        margin: '8px 0 0 0',
                        fontSize: '0.7rem',
                        color: '#9ca3af'
                      }}>
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Breathing Sessions - CONDENSED */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '20px' : '25px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🧘‍♀️</span>
                <h3 style={{
                  margin: 0,
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  color: '#374151',
                  fontWeight: '700'
                }}>
                  Recent Sessions
                </h3>
              </div>
              <button
                onClick={() => window.location.href = '/breathing'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View All →
              </button>
            </div>

            {recentSessions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧘‍♀️</div>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No sessions yet</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {recentSessions.map(session => (
                  <div
                    key={session.id}
                    style={{
                      background: '#f8fafc',
                      borderRadius: '10px',
                      padding: isMobile ? '12px' : '15px',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = '/breathing'}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {session.type}
                      </h4>
                      <span style={{
                        background: session.completed ? '#dcfce7' : '#fef3c7',
                        color: session.completed ? '#166534' : '#92400e',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        {session.completed ? '✅ Done' : '⏸️ Paused'}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                        color: '#6b7280'
                      }}>
                        Duration: {Math.round(session.duration)}s
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '0.7rem',
                        color: '#9ca3af'
                      }}>
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
