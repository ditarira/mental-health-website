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

      console.log('Fetching personal stats from API:', API_BASE);

      const response = await fetch(API_BASE + '/api/dashboard/personal-stats', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch personal stats: ' + response.status);
      }

      const data = await response.json();
      console.log('Personal stats data:', data);

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
      <div className="user-dashboard">
        <div className="welcome-guest">
          <div className="welcome-content">
            <h1>?? Welcome to MindfulMe</h1>
            <p>Your personal mental wellness companion ?</p>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">??</div>
                <h3>Journal</h3>
                <p>Express your thoughts and track your mood daily</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">?????</div>
                <h3>Breathing Exercises</h3>
                <p>Find calm with guided breathing techniques</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">??</div>
                <h3>Track Progress</h3>
                <p>Monitor your mental wellness journey</p>
              </div>
            </div>
            <div className="auth-buttons">
              <button className="login-btn" onClick={handleLoginClick}>?? Sign In</button>
              <button className="signup-btn" onClick={handleSignupClick}>?? Create Account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div className="loading-spinner">??</div>
          <p>Loading your wellness journey... ?</p>
        </div>
      </div>
    );
  }

  if (error && !refreshingStats) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div style={{ color: 'red', textAlign: 'center' }}>
            <h3>?? Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={() => fetchUserStats()} style={{ padding: '10px 20px', marginTop: '10px' }}>
              ?? Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="welcome-message">
          <h1>Welcome back, {user.firstName}! ??</h1>
          <p>Continue your mindfulness journey ??</p>
        </div>
        <div className="header-actions">
          <div className="streak-counter">
            <div className="streak-number" style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {stats.currentStreak}
            </div>
            <div className="streak-label">Day Streak ??</div>
          </div>
          <button 
            onClick={handleRefreshStats}
            disabled={refreshingStats}
            className="refresh-button"
            style={{
              padding: '12px 20px',
              background: refreshingStats ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: refreshingStats ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              marginLeft: '20px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
          >
            <span style={{ 
              animation: refreshingStats ? 'spin 1s linear infinite' : 'none',
              transformOrigin: 'center'
            }}>
              ??
            </span>
            {refreshingStats ? 'Refreshing...' : 'Refresh Stats'}
          </button>
        </div>
      </div>

      {error && refreshingStats && (
        <div style={{
          padding: '10px 15px',
          marginBottom: '20px',
          borderRadius: '8px',
          background: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          fontSize: '0.9rem'
        }}>
          ?? {error}
        </div>
      )}

      <div className="stats-grid" style={{ position: 'relative' }}>
        {refreshingStats && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '10px',
                animation: 'bounce 1s ease-in-out infinite'
              }}>?</div>
              <div style={{ color: '#6b7280', fontWeight: '600' }}>Updating stats...</div>
            </div>
          </div>
        )}

        <div className="stat-card journal-stat" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}>??</div>
          <div className="stat-content">
            <div className="stat-number" style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalJournalEntries}
            </div>
            <div className="stat-label" style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Journal Entries
            </div>
            <div className="stat-sublabel" style={{ 
              opacity: 0.9,
              fontSize: '0.9rem'
            }}>
              ?? Total written
            </div>
          </div>
        </div>

        <div className="stat-card breathing-stat" style={{
          background: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(6, 214, 160, 0.3)',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}>?????</div>
          <div className="stat-content">
            <div className="stat-number" style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalBreathingSessions}
            </div>
            <div className="stat-label" style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Breathing Sessions
            </div>
            <div className="stat-sublabel" style={{ 
              opacity: 0.9,
              fontSize: '0.9rem'
            }}>
              ??? Completed
            </div>
          </div>
        </div>

        <div className="stat-card total-stat" style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease'
        }}>
          <div className="stat-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}>?</div>
          <div className="stat-content">
            <div className="stat-number" style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.totalJournalEntries + stats.totalBreathingSessions}
            </div>
            <div className="stat-label" style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              Total Activities
            </div>
            <div className="stat-sublabel" style={{ 
              opacity: 0.9,
              fontSize: '0.9rem'
            }}>
              ?? Your wellness score
            </div>
          </div>
        </div>

        {stats.favoriteExercise && (
          <div className="stat-card favorite-stat" style={{
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            color: '#8b4513',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(252, 182, 159, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            <div className="stat-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}>?</div>
            <div className="stat-content">
              <div className="stat-favorite" style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                textShadow: '0 1px 4px rgba(0,0,0,0.1)',
                marginBottom: '8px'
              }}>
                {stats.favoriteExercise}
              </div>
              <div className="stat-label" style={{ 
                fontSize: '1.2rem', 
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                Favorite Exercise
              </div>
              <div className="stat-sublabel" style={{ 
                opacity: 0.8,
                fontSize: '0.9rem'
              }}>
                ?? Most practiced
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="activity-section">
        <div className="recent-journals">
          <h2>?? Recent Journal Entries</h2>
          {stats.recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>?? No journal entries yet</p>
              <button className="cta-btn" onClick={handleJournalClick}>? Write Your First Entry</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentEntries.map(entry => (
                <div key={entry.id} className="activity-item">
                  <div className="activity-icon">??</div>
                  <div className="activity-content">
                    <div className="activity-title">{entry.title || 'Untitled Entry'}</div>
                    <div className="activity-date">
                      ?? {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-mood" style={{ fontSize: '1.5rem' }}>
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

        <div className="recent-breathing">
          <h2>????? Recent Breathing Sessions</h2>
          {stats.recentSessions.length === 0 ? (
            <div className="empty-state">
              <p>??? No breathing sessions yet</p>
              <button className="cta-btn" onClick={handleBreathingClick}>????? Start Your First Session</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentSessions.map(session => (
                <div key={session.id} className="activity-item">
                  <div className="activity-icon">?????</div>
                  <div className="activity-content">
                    <div className="activity-title">??? {session.type}</div>
                    <div className="activity-date">
                      ?? {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-duration" style={{
                    background: 'linear-gradient(135deg, #06d6a0, #118ab2)',
                    color: 'white',
                    padding: '4px 8px',
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

      <div className="quick-actions">
        <h2>?? Continue Your Journey</h2>
        <div className="actions-grid">
          <div className="action-card journal-action" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
          }}>
            <div className="action-icon" style={{ fontSize: '3rem' }}>??</div>
            <h3>Write in Journal</h3>
            <p>Express your thoughts and feelings ?</p>
            <button className="action-btn" onClick={handleJournalClick} style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              ?? Start Writing
            </button>
          </div>

          <div className="action-card breathing-action" style={{
            background: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
            color: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(6, 214, 160, 0.2)'
          }}>
            <div className="action-icon" style={{ fontSize: '3rem' }}>?????</div>
            <h3>Breathing Exercise</h3>
            <p>Find calm with guided breathing ???</p>
            <button className="action-btn" onClick={handleBreathingClick} style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              ?? Start Breathing
            </button>
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
        
        .header-actions {
          display: flex;
          align-items: center;
        }
        
        .refresh-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .stat-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2) !important;
        }
        
        .action-btn:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          transform: translateY(-2px);
        }
        
        .stats-grid {
          transition: opacity 0.2s ease;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
