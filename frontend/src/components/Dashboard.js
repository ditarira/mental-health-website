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

  const fetchUserStats = async () => {
    try {
      if (!token) return;

      setLoading(true);
      setError(null);

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
      } else {
        setError('Invalid personal stats data received');
      }
    } catch (error) {
      console.error('Error fetching personal stats:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchUserStats();
      const interval = setInterval(fetchUserStats, 30000);
      
      // Listen for journal updates
      const handleJournalUpdate = () => {
        fetchUserStats();
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
                <div className="feature-icon">📝</div>
                <h3>Journal</h3>
                <p>Express your thoughts and track your mood daily</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧘‍♀️</div>
                <h3>Breathing Exercises</h3>
                <p>Find calm with guided breathing techniques</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
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

  if (error) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div style={{ color: 'red', textAlign: 'center' }}>
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button onClick={fetchUserStats} style={{ padding: '10px 20px', marginTop: '10px' }}>
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
          <h1>Welcome back, {user.firstName}! 👋</h1>
          <p>Continue your mindfulness journey</p>
        </div>
        <div className="streak-counter">
          <div className="streak-number">{stats.currentStreak}</div>
          <div className="streak-label">Day Streak 🔥</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card journal-stat">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalJournalEntries}</div>
            <div className="stat-label">Journal Entries</div>
            <div className="stat-sublabel">Total written</div>
          </div>
        </div>

        <div className="stat-card breathing-stat">
          <div className="stat-icon">🧘‍♀️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalBreathingSessions}</div>
            <div className="stat-label">Breathing Sessions</div>
            <div className="stat-sublabel">Completed</div>
          </div>
        </div>

        <div className="stat-card total-stat">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalJournalEntries + stats.totalBreathingSessions}</div>
            <div className="stat-label">Total Activities</div>
            <div className="stat-sublabel">Your wellness score</div>
          </div>
        </div>

        {stats.favoriteExercise && (
          <div className="stat-card favorite-stat">
            <div className="stat-icon">⭐</div>
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
          <h2>📖 Recent Journal Entries</h2>
          {stats.recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>No journal entries yet</p>
              <button className="cta-btn" onClick={handleJournalClick}>Write Your First Entry</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentEntries.map(entry => (
                <div key={entry.id} className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <div className="activity-title">{entry.title || 'Untitled Entry'}</div>
                    <div className="activity-date">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-mood">
                    {entry.mood === '1' && '😢'}
                    {entry.mood === '2' && '😞'}
                    {entry.mood === '3' && '😐'}
                    {entry.mood === '4' && '😊'}
                    {entry.mood === '5' && '😄'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="recent-breathing">
          <h2>🧘‍♀️ Recent Breathing Sessions</h2>
          {stats.recentSessions.length === 0 ? (
            <div className="empty-state">
              <p>No breathing sessions yet</p>
              <button className="cta-btn" onClick={handleBreathingClick}>Start Your First Session</button>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentSessions.map(session => (
                <div key={session.id} className="activity-item">
                  <div className="activity-icon">🧘‍♀️</div>
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
            <div className="action-icon">📝</div>
            <h3>Write in Journal</h3>
            <p>Express your thoughts and feelings</p>
            <button className="action-btn" onClick={handleJournalClick}>Start Writing</button>
          </div>

          <div className="action-card breathing-action">
            <div className="action-icon">🧘‍♀️</div>
            <h3>Breathing Exercise</h3>
            <p>Find calm with guided breathing</p>
            <button className="action-btn" onClick={handleBreathingClick}>Start Breathing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
