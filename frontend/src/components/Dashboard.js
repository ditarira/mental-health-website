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

  // Format date in a simple, universal way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

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
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔒</div>
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

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>

        {/* MOBILE LAYOUT */}
        {isMobile ? (
          <div>
            {/* Greeting Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👋</div>
              <h2 style={{ 
                color: '#374151', 
                fontSize: '1.3rem', 
                fontWeight: '700',
                margin: '0 0 8px 0'
              }}>
                Welcome back, {user?.firstName}!
              </h2>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '1rem',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Keep going, you're doing great today 💫"
              </p>
            </div>

            {/* STAT CARDS (2x2 Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '15px',
                padding: '20px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📝</div>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  marginBottom: '3px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.totalEntries}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Journal Entries
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '15px',
                padding: '20px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🌬</div>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  marginBottom: '3px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.totalSessions}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Sessions
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '15px',
                padding: '20px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🔥</div>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  marginBottom: '3px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.currentStreak}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Day Streak
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '15px',
                padding: '20px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  {stats.averageMood >= 4 ? '😊' : stats.averageMood >= 3 ? '😐' : '😞'}
                </div>
                <div style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '700', 
                  marginBottom: '3px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.averageMood || '0.0'}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Avg Mood
                </div>
              </div>
            </div>

            {/* PROGRESS VISUAL */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📊</div>
              <h3 style={{ 
                color: '#374151', 
                fontSize: '1.2rem', 
                fontWeight: '700',
                margin: '0 0 15px 0'
              }}>
                Weekly Summary
              </h3>
              
              {/* Progress Bars */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>📝 Journals</span>
                  <span style={{ 
                    color: '#374151', 
                    fontWeight: '600',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {stats.totalEntries}
                  </span>
                </div>
                <div style={{
                  background: '#e5e7eb',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    height: '100%',
                    width: `${Math.min((stats.totalEntries / 10) * 100, 100)}%`,
                    borderRadius: '10px',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>

              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>🌬 Breathing</span>
                  <span style={{ 
                    color: '#374151', 
                    fontWeight: '600',
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {stats.totalSessions}
                  </span>
                </div>
                <div style={{
                  background: '#e5e7eb',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    height: '100%',
                    width: `${Math.min((stats.totalSessions / 15) * 100, 100)}%`,
                    borderRadius: '10px',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '15px'
            }}>
              <button
                onClick={() => window.location.href = '/journal'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
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
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>➕</div>
                <div style={{ 
                  color: '#374151', 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Write Journal
                </div>
              </button>

              <button
                onClick={() => window.location.href = '/breathing'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
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
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌬</div>
                <div style={{ 
                  color: '#374151', 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Start Breathing
                </div>
              </button>
            </div>

            {/* SECONDARY ACTIONS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => window.location.href = '/resources'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
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
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📚</div>
                <div style={{ 
                  color: '#374151', 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Get Help
                </div>
              </button>

              <button
                onClick={() => window.location.href = '/settings'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
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
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚙</div>
                <div style={{ 
                  color: '#374151', 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Settings
                </div>
              </button>
           </div>
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <div>
            {/* ADD - Desktop Greeting Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '30px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👋</div>
              <h2 style={{ 
                color: '#374151', 
                fontSize: '2rem', 
                fontWeight: '700',
                margin: '0 0 10px 0',
                letterSpacing: '0',
                wordSpacing: '0'
              }}>
                Welcome back, {user?.firstName}!
              </h2>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '1.2rem',
                margin: 0,
                fontStyle: 'italic',
                letterSpacing: '0',
                wordSpacing: '0'
              }}>
                "Continue your mindfulness journey 🧘‍♀️"
              </p>
            </div>
            {/* Desktop Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '20px',
                padding: '25px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>📝</div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: '5px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.totalEntries}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Journal Entries
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                padding: '25px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🧘‍♀️</div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: '5px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.totalSessions}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Breathing Sessions
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '20px',
                padding: '25px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🔥</div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: '5px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.currentStreak}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Day Streak
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '20px',
                padding: '25px',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                  {stats.averageMood >= 4 ? '😊' : stats.averageMood >= 3 ? '😐' : '😞'}
                </div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  marginBottom: '5px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {stats.averageMood || '0.0'}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Avg Mood
                </div>
              </div>
            </div>

            {/* Desktop Quick Actions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              marginBottom: '30px'
            }}>
              <button
                onClick={() => window.location.href = '/journal'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px 15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.9rem',
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
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>✏️</div>
                Write in Journal
              </button>

              <button
                onClick={() => window.location.href = '/breathing'}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '20px 15px',
                  cursor: 'pointer',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(10px)',
                 fontSize: '0.9rem',
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
               <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🧘‍♀️</div>
               Start Breathing
             </button>

             <button
               onClick={() => window.location.href = '/resources'}
               style={{
                 background: 'rgba(255, 255, 255, 0.95)',
                 border: 'none',
                 borderRadius: '15px',
                 padding: '20px 15px',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(10px)',
                 fontSize: '0.9rem',
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
               <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📚</div>
               Get Help
             </button>

             <button
               onClick={() => window.location.href = '/settings'}
               style={{
                 background: 'rgba(255, 255, 255, 0.95)',
                 border: 'none',
                 borderRadius: '15px',
                 padding: '20px 15px',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                 backdropFilter: 'blur(10px)',
                 fontSize: '0.9rem',
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
               <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>⚙️</div>
               Settings
             </button>
           </div>

           {/* Desktop Recent Activity */}
           <div style={{
             display: 'grid',
             gridTemplateColumns: '1fr 1fr',
             gap: '30px'
           }}>

             {/* Recent Journal Entries */}
             <div style={{
               background: 'rgba(255, 255, 255, 0.95)',
               borderRadius: '20px',
               padding: '25px',
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
                     fontSize: '1.3rem',
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
                           padding: '15px',
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
                             fontSize: '1rem',
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
                               fontSize: '1.2rem',
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
                           fontSize: '0.8rem',
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
                           color: '#9ca3af',
                           fontFamily: 'Arial, sans-serif'
                         }}>
                           {formatDate(entry.createdAt)}
                         </p>
                       </div>
                     );
                   })}
                 </div>
               )}
             </div>

             {/* Recent Breathing Sessions */}
             <div style={{
               background: 'rgba(255, 255, 255, 0.95)',
               borderRadius: '20px',
               padding: '25px',
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
                     fontSize: '1.3rem',
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
                         padding: '15px',
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
                           fontSize: '1rem',
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
                           fontSize: '0.8rem',
                           color: '#6b7280',
                           fontFamily: 'Arial, sans-serif'
                         }}>
                           Duration: {Math.round(session.duration)}s
                         </p>
                         <p style={{
                           margin: 0,
                           fontSize: '0.7rem',
                           color: '#9ca3af',
                           fontFamily: 'Arial, sans-serif'
                         }}>
                           {formatDate(session.createdAt)}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default Dashboard;