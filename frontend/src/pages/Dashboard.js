import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    journalEntries: 0,
    breathingSessions: 0,
    currentStreak: 0,
    totalMinutes: 0,
    averageMood: 0
  });
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Daily inspiration messages
  const inspirationalMessages = [
    "🌱 Every small step counts on your mental health journey",
    "💪 You're stronger than you think, braver than you feel",
    "🌈 Healing isn't linear, and that's perfectly okay",
    "✨ Your mental health matters, and so do you",
    "🏔️ Mountains are climbed one step at a time",
    "💝 Be patient with yourself as you grow and heal",
    "🌊 Like waves, difficult emotions will pass",
    "🦋 Your transformation is happening, trust the process"
  ];

  const [dailyMessage] = useState(
    inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)]
  );

  useEffect(() => {
    fetchUserStats();
    fetchRecentEntries();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Fetch journal entries
      const journalRes = await axios.get('/api/journal', config);
      const entries = journalRes.data.entries || [];

      // Calculate average mood
      const avgMood = entries.length > 0
        ? (entries.reduce((sum, entry) => sum + (entry.mood || 3), 0) / entries.length).toFixed(1)
        : 0;

      // Calculate streak (simplified - consecutive days with entries)
      const today = new Date().toDateString();
      const hasEntryToday = entries.some(e => new Date(e.createdAt).toDateString() === today);

      // Calculate active days (unique days with entries)
      const uniqueDays = new Set(entries.map(e => new Date(e.createdAt).toDateString()));

      setStats({
        journalEntries: entries.length,
        breathingSessions: 0, // Will be updated when breathing API is ready
        currentStreak: hasEntryToday ? 1 : 0,
        totalMinutes: entries.length * 5, // Estimate 5 min per entry
        averageMood: avgMood,
        activeDays: uniqueDays.size
      });

      setRecentEntries(entries.slice(0, 3));
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/journal', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentEntries((response.data.entries || []).slice(0, 3));
    } catch (error) {
      console.error('Error fetching recent entries:', error);
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = ['😢', '😟', '😐', '😊', '😄'];
    return moods[mood - 1] || '😐';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '1.5rem',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
          <div>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Navigation />
      
      <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Welcome Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome back, {user?.firstName || 'Friend'}! 👋
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: isMobile ? '1rem' : '1.1rem',
              margin: 0
            }}>
              How are you feeling today? Let's continue your mental wellness journey.
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '1rem' : '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.currentStreak}
              </div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>Day Streak</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>📝</div>
              <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.journalEntries}
              </div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>Journals</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🧘</div>
              <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.breathingSessions}
              </div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>Sessions</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)';
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>😊</div>
              <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.averageMood || 'Ready to track!'}
              </div>
              <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.9 }}>
                {stats.averageMood ? 'Avg Mood' : 'Mood'}
              </div>
            </div>
          </div>

          {/* Daily Inspiration */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h3 style={{
              color: '#667eea',
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>✨ Daily Inspiration</h3>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: '#374151',
              lineHeight: '1.6',
              margin: 0,
              fontStyle: 'italic'
            }}>
              {dailyMessage}
            </p>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => handleNavigation('/journal')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ color: '#374151', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quick Journal</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Write down your thoughts and feelings</p>
              <button style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start Writing
              </button>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => handleNavigation('/breathing')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧘</div>
              <h3 style={{ color: '#374151', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Breathing Exercise</h3>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Practice mindful breathing to reduce stress</p>
              <button style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start Session
              </button>
            </div>
          </div>

          {/* Recent Entries or Welcome Message */}
          {recentEntries.length > 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: '#374151',
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                marginBottom: '1.5rem'
              }}>📖 Recent Journal Entries</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {recentEntries.map(entry => (
                  <div key={entry.id} style={{
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '15px',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #667eea',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNavigation('/journal')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>
                          {getMoodEmoji(entry.mood)}
                        </span>
                        <span style={{
                          fontSize: '0.9rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                      <div style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        Mood: {entry.mood}/5
                      </div>
                    </div>
                    <p style={{
                      color: '#374151',
                      lineHeight: '1.5',
                      margin: 0,
                      fontSize: '0.95rem'
                    }}>
                      {entry.content.length > 120 
                        ? entry.content.substring(0, 120) + '...' 
                        : entry.content}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        {entry.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} style={{
                            background: '#e0f2fe',
                            color: '#0369a1',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
                  fontSize: '1rem',
                  width: '100%',
                  marginTop: '1.5rem'
                }}
                onClick={() => handleNavigation('/journal')}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📝 View All Journal Entries
              </button>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{
                color: '#374151',
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                marginBottom: '1rem'
              }}>
                Start Your Mental Health Journey
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Your journey to better mental health begins with a single entry. 
                Take a moment to reflect on your day and capture your thoughts.
              </p>
              <button
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '1.2rem 2.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                }}
                onClick={() => handleNavigation('/journal')}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                }}
              >
                📝 Write Your First Entry
              </button>
            </div>
          )}

          {/* Emergency Support */}
          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleNavigation('/resources')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(239, 68, 68, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.3)';
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🆘</div>
            <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', marginBottom: '0.5rem' }}>
              Need Immediate Help?
            </h3>
            <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
              Access crisis support and emergency mental health resources
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: '0.75rem 1.5rem',
              display: 'inline-block',
              fontWeight: '600'
            }}>
              Get Help Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
