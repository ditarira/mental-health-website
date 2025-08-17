import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJournalEntries: 0,
    totalBreathingSessions: 0,
    recentEntries: [],
    recentSessions: [],
    currentStreak: 0,
    favoriteExercise: null
  });
  const [loading, setLoading] = useState(true);
  const [refreshingStats, setRefreshingStats] = useState(false);
  const [error, setError] = useState(null);
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

  const handleJournalClick = () => {
    navigate('/journal');
  };

  const handleBreathingClick = () => {
    navigate('/breathing');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  const fetchUserStats = async (isManualRefresh = false) => {
    try {
      if (!token) return;

      if (isManualRefresh) {
        setRefreshingStats(true);
        setError(null);
      } else {
        setLoading(true);
        setError(null);
      }

      const response = await fetch(API_BASE + '/api/dashboard/personal-stats', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch personal stats: ' + response.status);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setStats({
          totalJournalEntries: data.data.totalJournalEntries || 0,
          totalBreathingSessions: data.data.totalBreathingSessions || 0,
          recentEntries: data.data.recentEntries || [],
          recentSessions: data.data.recentSessions || [],
          currentStreak: data.data.currentStreak || 0,
          favoriteExercise: data.data.favoriteExercise || null
        });
        setError(null);
      } else {
        setError('Invalid personal stats data received');
      }
    } catch (error) {
      console.error('Error fetching personal stats:', error);
      setError(error.message);
    } finally {
      if (isManualRefresh) {
        setRefreshingStats(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleRefreshStats = () => {
    fetchUserStats(true);
  };

  // Calculate mood analytics
  const getMoodAnalytics = () => {
    if (!stats.recentEntries || stats.recentEntries.length === 0) {
      return { averageMood: 0, moodTrend: 'neutral', moodDistribution: {} };
    }

    const moods = stats.recentEntries.map(entry => parseInt(entry.mood) || 3);
    const averageMood = moods.reduce((sum, mood) => sum + mood, 0) / moods.length;
    
    const moodDistribution = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    const halfPoint = Math.floor(moods.length / 2);
    const firstHalf = moods.slice(0, halfPoint);
    const secondHalf = moods.slice(halfPoint);
    
    const firstAvg = firstHalf.length > 0 ? firstHalf.reduce((sum, mood) => sum + mood, 0) / firstHalf.length : 0;
    const secondAvg = secondHalf.length > 0 ? secondHalf.reduce((sum, mood) => sum + mood, 0) / secondHalf.length : 0;
    
    let moodTrend = 'neutral';
    if (secondAvg > firstAvg + 0.3) moodTrend = 'improving';
    else if (secondAvg < firstAvg - 0.3) moodTrend = 'declining';

    return { averageMood, moodTrend, moodDistribution };
  };

  const moodAnalytics = getMoodAnalytics();

  useEffect(() => {
    if (user && token) {
      fetchUserStats();
      const interval = setInterval(() => fetchUserStats(true), 30000);

      const handleJournalUpdate = () => {
        fetchUserStats(true);
      };

      window.addEventListener('journalUpdated', handleJournalUpdate);

      return () => {
        clearInterval(interval);
        window.removeEventListener('journalUpdated', handleJournalUpdate);
      };
    }
  }, [user, token]);

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
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
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '20px' }}>??</div>
          <h1 style={{ 
            fontSize: isMobile ? '1.8rem' : '2.5rem', 
            margin: '0 0 10px 0', 
            color: '#1f2937' 
          }}>
            Welcome to MindfulMe
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.2rem', 
            color: '#6b7280', 
            marginBottom: '30px' 
          }}>
            Your personal mental wellness companion
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center'
          }}>
            <button 
              onClick={handleLoginClick}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              Sign In
            </button>
            <button 
              onClick={handleSignupClick}
              style={{
                background: 'transparent',
                color: '#4f46e5',
                border: '2px solid #4f46e5',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>??</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>Loading your wellness journey...</div>
        </div>
      </div>
    );
  }

  if (error && !refreshingStats) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>??</div>
          <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>Error Loading Data</h3>
          <p style={{ color: '#6b7280', marginBottom: '25px' }}>{error}</p>
          <button 
            onClick={() => fetchUserStats()}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      padding: '0'
    }}>
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
              ?? Welcome back, {user.firstName}!
            </h1>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Continue your mindfulness journey ?
            </p>
          </div>
          
          <button 
            onClick={handleRefreshStats}
            disabled={refreshingStats}
            style={{
              background: refreshingStats ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: isMobile ? '8px 14px' : '12px 20px',
              borderRadius: '10px',
              cursor: refreshingStats ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(5px)'
            }}
          >
            <span>??</span>
            {refreshingStats ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>
        {/* Error Banner */}
        {error && refreshingStats && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px',
            padding: '15px 20px',
            marginBottom: '20px',
            color: '#dc2626',
            backdropFilter: 'blur(5px)'
          }}>
            ?? {error}
          </div>
        )}

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: isMobile ? '12px' : '20px',
          marginBottom: isMobile ? '25px' : '40px',
          position: 'relative'
        }}>
          {/* Loading Overlay */}
          {refreshingStats && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              backdropFilter: 'blur(3px)'
            }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>?</div>
                <div style={{ fontWeight: '600', fontSize: '0.8rem' }}>Updating...</div>
              </div>
            </div>
          )}

          {/* Journal Card - Blue Gradient */}
          <div onClick={!isMobile ? handleJournalClick : undefined} style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '15px' : '25px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: !isMobile ? 'pointer' : 'default',
            minHeight: isMobile ? '100px' : '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: isMobile ? '6px' : '10px' }}>
              ??
            </div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: '900',
              marginBottom: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {stats.totalJournalEntries}
            </div>
            <div style={{
              fontSize: isMobile ? '0.75rem' : '1rem',
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              Journal Entries
            </div>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              opacity: 0.9
            }}>
              Total written
            </div>
          </div>

          {/* Breathing Card - Coral Gradient */}
          <div onClick={!isMobile ? handleBreathingClick : undefined} style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '15px' : '25px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: !isMobile ? 'pointer' : 'default',
            minHeight: isMobile ? '100px' : '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: isMobile ? '6px' : '10px' }}>
              ?????
            </div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: '900',
              marginBottom: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {stats.totalBreathingSessions}
            </div>
            <div style={{
              fontSize: isMobile ? '0.75rem' : '1rem',
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              {isMobile ? 'Sessions' : 'Breathing Sessions'}
            </div>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              opacity: 0.9
            }}>
              Completed
            </div>
          </div>

          {/* Streak Card - Gold Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffb700 100%)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '15px' : '25px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
            color: '#8b4513',
            transition: 'all 0.3s ease',
            minHeight: isMobile ? '100px' : '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: isMobile ? '6px' : '10px' }}>
              ??
            </div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: '900',
              marginBottom: '4px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {stats.currentStreak}
            </div>
            <div style={{
              fontSize: isMobile ? '0.75rem' : '1rem',
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              Day Streak
            </div>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              opacity: 0.8
            }}>
              Consecutive days
            </div>
          </div>

          {/* Mood Analytics Card - Emerald Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: isMobile ? '12px' : '20px',
            padding: isMobile ? '15px' : '25px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            minHeight: isMobile ? '100px' : '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: isMobile ? '6px' : '10px' }}>
              {moodAnalytics.averageMood >= 4 ? '??' : 
               moodAnalytics.averageMood >= 3 ? '??' : 
               moodAnalytics.averageMood >= 2 ? '??' : '??'}
            </div>
            <div style={{
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              fontWeight: '900',
              marginBottom: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {moodAnalytics.averageMood.toFixed(1)}
            </div>
            <div style={{
              fontSize: isMobile ? '0.75rem' : '1rem',
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              Avg Mood
            </div>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '0.8rem',
              opacity: 0.9
            }}>
              {moodAnalytics.moodTrend === 'improving' ? 'Improving' :
               moodAnalytics.moodTrend === 'declining' ? 'Needs attention' : 'Stable'}
            </div>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
              color: 'white',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>??</div>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '1.3rem',
                fontWeight: '700'
              }}>
                Write in Journal
              </h3>
              <p style={{ 
                margin: '0 0 20px 0', 
                fontSize: '0.95rem',
                opacity: 0.9
              }}>
                Express your thoughts and feelings
              </p>
              <button 
                onClick={handleJournalClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(5px)'
                }}
              >
                Start Writing
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(255, 107, 107, 0.2)',
              color: 'white',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>?????</div>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '1.3rem',
                fontWeight: '700'
              }}>
                Breathing Exercise
              </h3>
              <p style={{ 
                margin: '0 0 20px 0', 
                fontSize: '0.95rem',
                opacity: 0.9
              }}>
                Find calm with guided breathing
              </p>
              <button 
                onClick={handleBreathingClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(5px)'
                }}
              >
                Start Breathing
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? '15px' : '20px'
        }}>
          {/* Recent Journal Entries */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '12px' : '16px',
            padding: isMobile ? '15px' : '25px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <h2 style={{
              margin: '0 0 15px 0',
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#1f2937',
              fontWeight: '700'
            }}>
              ?? Recent Journal Entries
            </h2>
            {stats.recentEntries.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '15px 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>??</div>
                <p style={{ marginBottom: '15px', fontSize: '0.9rem' }}>No journal entries yet</p>
                <button 
                  onClick={handleJournalClick}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Write First Entry
                </button>
              </div>
            ) : (
              <div>
                {stats.recentEntries.slice(0, 3).map(entry => (
                  <div key={entry.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ fontSize: '1.3rem', marginRight: '10px' }}>??</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: '#1f2937', 
                        fontSize: isMobile ? '0.8rem' : '0.9rem', 
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {entry.title || 'Untitled Entry'}
                      </div>
                      <div style={{ fontSize: isMobile ? '0.7rem' : '0.75rem', color: '#6b7280' }}>
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.2rem', marginLeft: '8px' }}>
                      {entry.mood === '1' && '??'}
                      {entry.mood === '2' && '??'}
                      {entry.mood === '3' && '??'}
                      {entry.mood === '4' && '??'}
                      {entry.mood === '5' && '??'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Breathing Sessions */}
         <div style={{
           background: 'rgba(255, 255, 255, 0.95)',
           borderRadius: isMobile ? '12px' : '16px',
           padding: isMobile ? '15px' : '25px',
           boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
           backdropFilter: 'blur(10px)',
           border: '1px solid rgba(255, 255, 255, 0.3)'
         }}>
           <h2 style={{
             margin: '0 0 15px 0',
             fontSize: isMobile ? '1rem' : '1.2rem',
             color: '#1f2937',
             fontWeight: '700'
           }}>
             ????? Recent Breathing Sessions
           </h2>
           {stats.recentSessions.length === 0 ? (
             <div style={{ textAlign: 'center', color: '#6b7280', padding: '15px 0' }}>
               <div style={{ fontSize: '2rem', marginBottom: '10px' }}>??</div>
               <p style={{ marginBottom: '15px', fontSize: '0.9rem' }}>No breathing sessions yet</p>
               <button 
                 onClick={handleBreathingClick}
                 style={{
                   background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                   color: 'white',
                   border: 'none',
                   padding: '10px 20px',
                   borderRadius: '8px',
                   fontSize: '0.85rem',
                   fontWeight: '600',
                   cursor: 'pointer',
                   boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                 }}
               >
                 Start First Session
               </button>
             </div>
           ) : (
             <div>
               {stats.recentSessions.slice(0, 3).map(session => (
                 <div key={session.id} style={{
                   display: 'flex',
                   alignItems: 'center',
                   padding: '10px 0',
                   borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                 }}>
                   <div style={{ fontSize: '1.3rem', marginRight: '10px' }}>?????</div>
                   <div style={{ flex: 1, minWidth: 0 }}>
                     <div style={{ 
                       fontWeight: '600', 
                       color: '#1f2937', 
                       fontSize: isMobile ? '0.8rem' : '0.9rem', 
                       marginBottom: '2px',
                       overflow: 'hidden',
                       textOverflow: 'ellipsis',
                       whiteSpace: 'nowrap'
                     }}>
                       {session.type}
                     </div>
                     <div style={{ fontSize: isMobile ? '0.7rem' : '0.75rem', color: '#6b7280' }}>
                       {new Date(session.createdAt).toLocaleDateString()}
                     </div>
                   </div>
                   <div style={{
                     background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                     color: 'white',
                     padding: '3px 6px',
                     borderRadius: '4px',
                     fontSize: isMobile ? '0.65rem' : '0.7rem',
                     fontWeight: '600',
                     marginLeft: '8px'
                   }}>
                     {Math.round(session.duration)}s
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     </div>

     <style>
       {`
         div:hover {
           transform: ${isMobile ? 'none' : 'translateY(-3px)'};
         }
         
         button:hover {
           transform: translateY(-2px);
           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
         }
       `}
     </style>
   </div>
 );
};

export default Dashboard;
