import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Navigation items for mobile menu
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'journal', name: 'Journal', icon: '📝', path: '/journal' },
    { id: 'breathing', name: 'Breathing', icon: '🫁', path: '/breathing' },
    { id: 'resources', name: 'Resources', icon: '📚', path: '/resources' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/settings' }
  ];

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

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1)
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

  const handleNavigation = (path, pageId) => {
    setShowMobileMenu(false);
    if (setCurrentPage) {
      setCurrentPage(pageId);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, var(--light), #f0f9ff)',
        fontSize: '1.5rem',
        color: 'var(--primary)'
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
      background: 'linear-gradient(135deg, var(--light), #f0f9ff)',
      position: 'relative'
    }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(124, 165, 184, 0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'none';
            }}
          >
            ☰
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 'bold',
            color: 'var(--primary)',
            fontSize: '1.2rem'
          }}>
            <span>🧠</span>
            <span>MindfulMe</span>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150
          }}
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: showMobileMenu ? 0 : '-100%',
          width: '280px',
          height: '100vh',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          zIndex: 200,
          transition: 'left 0.3s ease',
          padding: '2rem 0',
          color: 'white'
        }}>
          <button
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setShowMobileMenu(false)}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'none';
            }}
          >
            ✕
          </button>
          
          <div style={{
            padding: '0 2rem',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  Welcome back!
                </div>
              </div>
            </div>
          </div>

          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'none',
                border: 'none',
                color: 'white',
                width: '100%',
                textAlign: 'left',
                fontSize: '1rem'
              }}
              onClick={() => handleNavigation(item.path, item.id)}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'none';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: 'none',
              border: 'none',
              color: 'white',
              width: '100%',
              textAlign: 'left',
              fontSize: '1rem',
              marginTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              paddingTop: '2rem'
            }}
            onClick={handleLogout}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'none';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🚪</span>
            <span>Logout</span>
          </button>

          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            right: '2rem',
            textAlign: 'center',
            opacity: 0.7,
            fontSize: '0.8rem'
          }}>
            MindfulMe v1.0
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        {/* Header */}
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
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 0.5rem 0'
          }}>
            Welcome back, {user?.firstName || 'Friend'}! 👋
          </h1>
          <p style={{
            color: 'var(--dark)',
            opacity: 0.8,
            fontSize: isMobile ? '1rem' : '1.1rem',
            margin: 0
          }}>
            Here's your mental wellness journey summary
          </p>
        </div>

        {/* Daily Inspiration */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent), var(--primary))',
          color: 'white',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(124, 165, 184, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1
          }}></div>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            fontWeight: '500',
            lineHeight: '1.6',
            position: 'relative',
            zIndex: 2,
            margin: 0
          }}>
            {dailyMessage}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '1rem' : '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1rem'
            }}>📝</div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '0.5rem'
            }}>{stats.journalEntries}</div>
            <div style={{
              color: 'var(--dark)',
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Journal Entries</div>
          </div>

          <div style={{
            background: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1rem'
            }}>😊</div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '0.5rem'
            }}>{stats.averageMood}/5</div>
            <div style={{
              color: 'var(--dark)',
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Average Mood</div>
          </div>

          <div style={{
            background: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1rem'
            }}>🔥</div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '0.5rem'
            }}>{stats.currentStreak}</div>
            <div style={{
              color: 'var(--dark)',
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Day Streak</div>
          </div>

          <div style={{
            background: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1rem'
            }}>📅</div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
              marginBottom: '0.5rem'
            }}>{stats.activeDays || stats.journalEntries}</div>
            <div style={{
              color: 'var(--dark)',
              fontWeight: '600',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Active Days</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            color: 'var(--dark)',
            fontSize: isMobile ? '1.5rem' : '1.8rem'
          }}>🚀 Quick Actions</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1rem'
          }}>
            <button
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '600'
              }}
              onClick={() => handleNavigation('/journal', 'journal')}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(124, 165, 184, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem' }}>📝</div>
              <div>Write Journal Entry</div>
            </button>

            <button
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '600'
              }}
              onClick={() => handleNavigation('/breathing', 'breathing')}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem' }}>🧘</div>
              <div>Breathing Exercise</div>
            </button>

            <button
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '600'
              }}
              onClick={() => handleNavigation('/resources', 'resources')}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem' }}>📚</div>
              <div>Read Resources</div>
            </button>

            <button
              style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '600',
                gridColumn: isMobile ? '1' : '1 / -1'
              }}
              onClick={() => handleNavigation('/crisis-support', 'crisis')}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem' }}>🆘</div>
              <div>Crisis Support - Get Help Now</div>
            </button>
          </div>
        </div>

        {/* Recent Journal Entries */}
        {recentEntries.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{
              marginBottom: '1.5rem',
              color: 'var(--dark)',
              fontSize: isMobile ? '1.5rem' : '1.8rem'
            }}>📖 Recent Journal Entries</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {recentEntries.map(entry => (
                <div key={entry.id} style={{
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '15px',
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid var(--primary)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateX(5px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.9rem'
                    }}>{formatDate(entry.createdAt)}</span>
                    <span style={{
                      fontSize: '1.5rem'
                    }}>{getMoodEmoji(entry.mood)}</span>
                  </div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    color: 'var(--dark)',
                    fontSize: '1.1rem'
                  }}>{entry.title || 'Untitled Entry'}</h3>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    lineHeight: '1.4'
                  }}>{entry.content.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'color 0.3s',
                padding: '0.5rem 0'
              }}
              onClick={() => handleNavigation('/journal', 'journal')}
              onMouseOver={(e) => {
                e.target.style.color = 'var(--secondary)';
              }}
              onMouseOut={(e) => {
                e.target.style.color = 'var(--primary)';
              }}
            >
              View All Entries →
            </button>
          </div>
        )}

        {/* Helpful Tips for New Users */}
        {stats.journalEntries === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginTop: '2rem',
            border: '1px solid rgba(124, 165, 184, 0.2)'
          }}>
            <h3 style={{
              color: 'var(--primary)',
              marginBottom: '1rem',
              fontSize: isMobile ? '1.3rem' : '1.5rem'
            }}>🌟 Getting Started</h3>
            <p style={{
              color: '#374151',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Welcome to your mental health journey! Here are some ways to get started:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
                border: '1px solid rgba(124, 165, 184, 0.1)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📝</div>
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>Write Your First Entry</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                  Start by writing about your day, feelings, or thoughts
                </p>
              </div>
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
                border: '1px solid rgba(124, 165, 184, 0.1)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧘</div>
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>Try Breathing Exercises</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                  Practice mindfulness with guided breathing techniques
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
