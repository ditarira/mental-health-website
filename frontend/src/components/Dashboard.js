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

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          maxWidth: '600px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          animation: 'slideInUp 0.8s ease-out'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            animation: 'bounce 2s ease-in-out infinite'
          }}>??</div>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#1f2937' }}>Welcome to MindfulMe ?</h1>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '40px' }}>Your personal mental wellness companion ??</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>??</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Journal</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Track your thoughts ??</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>?????</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Breathe</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Find your calm ??</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>??</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Progress</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Watch growth ??</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={handleLoginClick}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              ?? Sign In
            </button>
            <button 
              onClick={handleSignupClick}
              style={{
                background: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ?? Create Account
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>??</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>Loading your wellness journey... ?</div>
        </div>
      </div>
    );
  }

  if (error && !refreshingStats) {
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
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>??</div>
          <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>Error Loading Data</h3>
          <p style={{ color: '#6b7280', marginBottom: '25px' }}>{error}</p>
          <button 
            onClick={() => fetchUserStats()}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ?? Try Again
          </button>
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
      {/* Animated Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: '30px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <h1 style={{
              margin: '0 0 5px 0',
              fontSize: '2.2rem',
              color: 'white',
              fontWeight: '700',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              <span style={{ 
                display: 'inline-block',
                animation: 'wave 2s ease-in-out infinite'
              }}>??</span> Welcome back, {user.firstName}!
            </h1>
            <p style={{
              margin: 0,
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Continue your mindfulness journey <span style={{ animation: 'twinkle 1.5s ease-in-out infinite' }}>?</span>
            </p>
          </div>
          
          <button 
            onClick={handleRefreshStats}
            disabled={refreshingStats}
            style={{
              background: refreshingStats ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: refreshingStats ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(5px)',
              animation: 'slideInRight 0.8s ease-out'
            }}
          >
            <span style={{ 
              animation: refreshingStats ? 'spin 1s linear infinite' : 'none'
            }}>
              ??
            </span>
            {refreshingStats ? 'Refreshing...' : 'Refresh Stats'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 40px 60px 40px'
      }}>
        {/* Error Banner */}
        {error && refreshingStats && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px',
            padding: '15px 20px',
            marginBottom: '30px',
            color: '#dc2626',
            backdropFilter: 'blur(5px)',
            animation: 'slideInDown 0.5s ease-out'
          }}>
            ?? {error}
          </div>
        )}

        {/* Colorful Stats Grid - 4 Equal Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
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
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '10px',
                  animation: 'bounce 1s ease-in-out infinite'
                }}>?</div>
                <div style={{ fontWeight: '600' }}>Updating stats... ??</div>
              </div>
            </div>
          )}

          {/* Journal Card - Purple Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInUp 0.6s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>??</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '8px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalJournalEntries}
            </div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Journal Entries
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              ?? Total written
            </div>
          </div>

          {/* Breathing Card - Teal Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(6, 214, 160, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInUp 0.7s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>?????</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '8px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalBreathingSessions}
            </div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Breathing Sessions
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              ??? Completed
            </div>
          </div>

          {/* Total Activities Card - Pink Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)',
            color: 'white',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInUp 0.8s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>?</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '8px',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalJournalEntries + stats.totalBreathingSessions}
            </div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Total Activities
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              ?? Wellness score
            </div>
          </div>

          {/* Streak Card - Orange Gradient */}
          <div style={{
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(252, 182, 159, 0.3)',
            color: '#8b4513',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInUp 0.9s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>??</div>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {stats.currentStreak}
            </div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Day Streak
            </div>
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              ??? Consecutive days
            </div>
          </div>
        </div>

        {/* Action Buttons - Colorful */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
            color: 'white',
            transition: 'all 0.3s ease',
            animation: 'slideInLeft 0.8s ease-out'
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
              Express your thoughts and feelings ?
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
              ?? Start Writing
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
            borderRadius: '20px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(6, 214, 160, 0.2)',
            color: 'white',
            transition: 'all 0.3s ease',
            animation: 'slideInRight 0.8s ease-out'
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
              Find calm with guided breathing ???
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
              ?? Start Breathing
            </button>
          </div>
        </div>

        {/* Recent Activity - White Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {/* Recent Journal Entries */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 1s ease-out'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              fontSize: '1.4rem',
              color: '#1f2937',
              fontWeight: '700'
            }}>
              ?? Recent Journal Entries
            </h2>
            {stats.recentEntries.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>??</div>
                <p style={{ marginBottom: '15px' }}>No journal entries yet ??</p>
                <button 
                  onClick={handleJournalClick}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  ? Write Your First Entry
                </button>
              </div>
            ) : (
              <div>
                {stats.recentEntries.slice(0, 3).map(entry => (
                  <div key={entry.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 0',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{ fontSize: '1.8rem', marginRight: '15px' }}>??</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '1rem', marginBottom: '4px' }}>
                        {entry.title || 'Untitled Entry'}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        ?? {new Date(entry.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>
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
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'slideInUp 1.1s ease-out'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              fontSize: '1.4rem',
              color: '#1f2937',
              fontWeight: '700'
            }}>
              ????? Recent Breathing Sessions
            </h2>
            {stats.recentSessions.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>???</div>
                <p style={{ marginBottom: '15px' }}>No breathing sessions yet ?????</p>
                <button 
                  onClick={handleBreathingClick}
                  style={{
                    background: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(6, 214, 160, 0.3)'
                 }}
               >
                 ?? Start Your First Session
               </button>
             </div>
           ) : (
             <div>
               {stats.recentSessions.slice(0, 3).map(session => (
                 <div key={session.id} style={{
                   display: 'flex',
                   alignItems: 'center',
                   padding: '15px 0',
                   borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                 }}>
                   <div style={{ fontSize: '1.8rem', marginRight: '15px' }}>?????</div>
                   <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '1rem', marginBottom: '4px' }}>
                       ??? {session.type}
                     </div>
                     <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                       ?? {new Date(session.createdAt).toLocaleDateString()}
                     </div>
                   </div>
                   <div style={{
                     background: 'linear-gradient(135deg, #06d6a0, #118ab2)',
                     color: 'white',
                     padding: '6px 12px',
                     borderRadius: '8px',
                     fontSize: '0.8rem',
                     fontWeight: '600'
                   }}>
                     ?? {Math.round(session.duration)}s
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     </div>

     <style jsx>{`
       @keyframes spin {
         from { transform: rotate(0deg); }
         to { transform: rotate(360deg); }
       }
       
       @keyframes bounce {
         0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
         40% { transform: translateY(-10px); }
         60% { transform: translateY(-5px); }
       }
       
       @keyframes pulse {
         0% { opacity: 0.6; }
         50% { opacity: 1; }
         100% { opacity: 0.6; }
       }
       
       @keyframes wave {
         0% { transform: rotate(0deg); }
         10% { transform: rotate(14deg); }
         20% { transform: rotate(-8deg); }
         30% { transform: rotate(14deg); }
         40% { transform: rotate(-4deg); }
         50% { transform: rotate(10deg); }
         60% { transform: rotate(0deg); }
         100% { transform: rotate(0deg); }
       }
       
       @keyframes twinkle {
         0%, 100% { opacity: 1; }
         50% { opacity: 0.3; }
       }
       
       @keyframes slideInUp {
         from {
           opacity: 0;
           transform: translateY(30px);
         }
         to {
           opacity: 1;
           transform: translateY(0);
         }
       }
       
       @keyframes slideInLeft {
         from {
           opacity: 0;
           transform: translateX(-30px);
         }
         to {
           opacity: 1;
           transform: translateX(0);
         }
       }
       
       @keyframes slideInRight {
         from {
           opacity: 0;
           transform: translateX(30px);
         }
         to {
           opacity: 1;
           transform: translateX(0);
         }
       }
       
       @keyframes slideInDown {
         from {
           opacity: 0;
           transform: translateY(-30px);
         }
         to {
           opacity: 1;
           transform: translateY(0);
         }
       }
       
       div:hover {
         transform: translateY(-5px);
       }
       
       button:hover {
         transform: translateY(-2px);
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
       }
     `}</style>
   </div>
 );
};

export default Dashboard;
