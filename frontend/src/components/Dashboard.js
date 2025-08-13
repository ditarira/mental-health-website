import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalJournalEntries: 0,
    totalBreathingSessions: 0,
    recentEntries: [],
    recentSessions: [],
    currentStreak: 0,
    favoriteExercise: null
  });
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  // Fetch user's personal stats
  const fetchUserStats = async () => {
    try {
      if (!token) return;

      setLoading(true);

      // Fetch journal entries
      const journalResponse = await fetch(`${API_BASE}/api/journal`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Fetch breathing sessions
      const breathingResponse = await fetch(`${API_BASE}/api/breathing`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const journalData = await journalResponse.json();
      const breathingData = await breathingResponse.json();

      if (journalData.success && breathingData.success) {
        const entries = journalData.data || [];
        const sessions = breathingData.data || [];

        // Calculate stats
        const recentEntries = entries.slice(0, 3);
        const recentSessions = sessions.slice(0, 3);
        
        // Find favorite breathing exercise
        const exerciseCounts = {};
        sessions.forEach(session => {
          exerciseCounts[session.type] = (exerciseCounts[session.type] || 0) + 1;
        });
        const favoriteExercise = Object.keys(exerciseCounts).reduce((a, b) => 
          exerciseCounts[a] > exerciseCounts[b] ? a : b, null
        );

        // Calculate streak (days with activity)
        const today = new Date();
        let streak = 0;
        for (let i = 0; i < 30; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const dayStart = new Date(checkDate);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(checkDate);
          dayEnd.setHours(23, 59, 59, 999);

          const hasActivity = entries.some(entry => {
            const entryDate = new Date(entry.createdAt);
            return entryDate >= dayStart && entryDate <= dayEnd;
          }) || sessions.some(session => {
            const sessionDate = new Date(session.createdAt);
            return sessionDate >= dayStart && sessionDate <= dayEnd;
          });

          if (hasActivity) {
            if (i === 0 || streak === i) streak++;
            else break;
          } else if (i === 0) {
            break;
          }
        }

        setStats({
          totalJournalEntries: entries.length,
          totalBreathingSessions: sessions.length,
          recentEntries,
          recentSessions,
          currentStreak: streak,
          favoriteExercise
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchUserStats();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchUserStats, 30000);
      return () => clearInterval(interval);
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
              <button className="login-btn">Sign In</button>
              <button className="signup-btn">Create Account</button>
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

  return (
    <div className="user-dashboard">
      {/* Welcome Header */}
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

      {/* Quick Stats */}
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

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="recent-journals">
          <h2>Recent Journal Entries</h2>
          {stats.recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>No journal entries yet</p>
              <button className="cta-btn">Write Your First Entry</button>
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
          <h2>Recent Breathing Sessions</h2>
          {stats.recentSessions.length === 0 ? (
            <div className="empty-state">
              <p>No breathing sessions yet</p>
              <button className="cta-btn">Start Your First Session</button>
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

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Continue Your Journey</h2>
        <div className="actions-grid">
          <div className="action-card journal-action">
            <div className="action-icon">📝</div>
            <h3>Write in Journal</h3>
            <p>Express your thoughts and feelings</p>
            <button className="action-btn">Start Writing</button>
          </div>
          
          <div className="action-card breathing-action">
            <div className="action-icon">🧘‍♀️</div>
            <h3>Breathing Exercise</h3>
            <p>Find calm with guided breathing</p>
            <button className="action-btn">Start Breathing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
