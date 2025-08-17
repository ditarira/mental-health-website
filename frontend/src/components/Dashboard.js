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
  const [refreshingStats, setRefreshingStats] = useState(false); // New state for partial refresh
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

      // Set appropriate loading state
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

  // Manual refresh function for the refresh button
  const handleRefreshStats = () => {
    fetchUserStats(true); // Pass true to indicate manual refresh
  };

  useEffect(() => {
    if (user && token) {
      fetchUserStats();
      const interval = setInterval(() => fetchUserStats(true), 30000); // Auto-refresh every 30 seconds

      // Listen for journal updates
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
            <h1>Welcome to MindfulMe</h1>
            <p>Your personal mental wellness companion</p>
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
              <button className="login-btn" onClick={handleLoginClick}>Sign In</button>
              <button className="signup-btn" onClick={handleSignupClick}>Create Account</button>
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
          <div className="loading-spinner"></div>
          <p>Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  if (error && !refreshingStats) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div style={{ color: 'red', textAlign: 'center' }}>
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={() => fetchUserStats()} style={{ padding: '10px 20px', marginTop: '10px' }}>
              Try Again
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
          <p>Continue your mindfulness journey</p>
        </div>
        <div className="header-actions">
          <div className="streak-counter">
            <div className="streak-number">{stats.currentStreak}</div>
            <div className="streak-label">Day Streak ??</div>
          </div>
          <button 
            onClick={handleRefreshStats}
            disabled={refreshingStats}
            className="refresh-button"
            style={{
              padding: '12px 20px',
              background: refreshingStats ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
              marginLeft: '20px'
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

      {/* Error banner for refresh errors (non-blocking) */}
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
        {/* Loading overlay for stats refresh */}
        {refreshingStats && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                marginBottom: '10px',
                animation: 'spin 1s linear infinite'
              }}>?</div>
              <div style={{ color: '#6b7280', fontWeight: '600' }}>Updating stats...</div>
            </div>
          </div>
        )}

        <div className="stat-card journal-stat">
          <div className="stat-icon">??</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalJournalEntries}</div>
            <div className="stat-label">Journal Entries</div>
            <div className="stat-sublabel">Total written</div>
          </div>
        </div>

        <div className="stat-card breathing-stat">
          <div className="stat-icon">?????</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalBreathingSessions}</div>
            <div className="stat-label">Breathing Sessions</div>
            <div className="stat-sublabel">Completed</div>
          </div>
        </div>

        <div className="stat-card total-stat">
          <div className="stat-icon">?</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalJournalEntries + stats.totalBreathingSessions}</div>
            <div className="stat-label">Total Activities</div>
            <div className="stat-sublabel">Your wellness score</div>
          </div>
        </div>

        {stats.favoriteExercise && (
          <div className="stat-card favorite-stat">
            <div className="stat-icon">?</div>
            <div className="stat-content">
              <div className="stat-favorite">{stats.favoriteExercise}</div>
              <div className="stat-label">Favorite Exercise</div>
              <div className="stat-sublabel">Most practiced</div>
            </div>
          </div>
        )}
      </div>

      <div className="activity-section">
        <div className="recent-journals">
          <h2>?? Recent Journal Entries</h2>
          {stats.recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>No journal entries yet</p>
              <button className="cta-btn" onClick={handleJournalClick}>Write Your First Entry</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentEntries.map(entry => (
                <div key={entry.id} className="activity-item">
                  <div className="activity-icon">??</div>
                  <div className="activity-content">
                    <div className="activity-title">{entry.title || 'Untitled Entry'}</div>
                    <div className="activity-date">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-mood">
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
              <p>No breathing sessions yet</p>
              <button className="cta-btn" onClick={handleBreathingClick}>Start Your First Session</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentSessions.map(session => (
                <div key={session.id} className="activity-item">
                  <div className="activity-icon">?????</div>
                  <div className="activity-content">
                    <div className="activity-title">{session.type}</div>
                    <div className="activity-date">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-duration">
                    {Math.round(session.duration)}s
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Continue Your Journey</h2>
        <div className="actions-grid">
          <div className="action-card journal-action">
            <div className="action-icon">??</div>
            <h3>Write in Journal</h3>
            <p>Express your thoughts and feelings</p>
            <button className="action-btn" onClick={handleJournalClick}>Start Writing</button>
          </div>

          <div className="action-card breathing-action">
            <div className="action-icon">?????</div>
            <h3>Breathing Exercise</h3>
            <p>Find calm with guided breathing</p>
            <button className="action-btn" onClick={handleBreathingClick}>Start Breathing</button>
          </div>
        </div>
      </div>

      {/* Add CSS for spin animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .header-actions {
          display: flex;
          align-items: center;
        }
        
        .refresh-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .stats-grid {
          transition: opacity 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
