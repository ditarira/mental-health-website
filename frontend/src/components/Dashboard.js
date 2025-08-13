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

  // Simple mood colors for design
  const moodColors = {
    '1': '#ef4444', // Red
    '2': '#f97316', // Orange  
    '3': '#eab308', // Yellow
    '4': '#22c55e', // Green
    '5': '#06b6d4'  // Cyan
  };

  // Fetch user stats (simplified)
  const fetchUserStats = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const [journalResponse, breathingResponse] = await Promise.all([
        fetch(`${API_BASE}/api/journal`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }),
        fetch(`${API_BASE}/api/breathing`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
      ]);

      const journalData = await journalResponse.json();
      const breathingData = await breathingResponse.json();

      if (journalData.success && breathingData.success) {
        const entries = journalData.data || [];
        const sessions = breathingData.data || [];

        // Simple calculations
        const recentEntries = entries.slice(0, 3);
        const recentSessions = sessions.slice(0, 3);
        
        // Find favorite exercise
        const exerciseCounts = {};
        sessions.forEach(session => {
          exerciseCounts[session.type] = (exerciseCounts[session.type] || 0) + 1;
        });
        const favoriteExercise = Object.keys(exerciseCounts).reduce((a, b) => 
          exerciseCounts[a] > exerciseCounts[b] ? a : b, null
        );

        // Simple streak calculation
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 7; i++) {
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
          } else if (i === 0) break;
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
      const interval = setInterval(fetchUserStats, 30000);
      return () => clearInterval(interval);
    }
  }, [user, token]);

  if (!user) {
    return (
      <div className="stunning-dashboard">
        <div className="hero-welcome">
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <div className="floating-emojis">
              <span className="floating-emoji">🌈</span>
              <span className="floating-emoji">✨</span>
              <span className="floating-emoji">🦋</span>
              <span className="floating-emoji">🌸</span>
              <span className="floating-emoji">💫</span>
            </div>
            <h1 className="hero-title">Welcome to MindfulMe</h1>
            <p className="hero-subtitle">Your beautiful journey to mental wellness</p>
            <div className="hero-buttons">
              <button className="btn-primary">Start Your Journey ✨</button>
              <button className="btn-secondary">Learn More 🌟</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="stunning-dashboard">
        <div className="loading-beautiful">
          <div className="loading-rainbow-circle"></div>
          <h2>Loading your beautiful journey...</h2>
          <div className="loading-dots">
            <span style={{backgroundColor: moodColors['1']}}>😢</span>
            <span style={{backgroundColor: moodColors['2']}}>😞</span>
            <span style={{backgroundColor: moodColors['3']}}>😐</span>
            <span style={{backgroundColor: moodColors['4']}}>😊</span>
            <span style={{backgroundColor: moodColors['5']}}>😄</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stunning-dashboard">
      {/* Beautiful Header */}
      <div className="dashboard-header-gorgeous">
        <div className="header-gradient"></div>
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="welcome-title">Hello, {user.firstName}! 👋</h1>
            <p className="welcome-subtitle">Your wellness journey continues beautifully</p>
          </div>
          <div className="streak-badge">
            <div className="streak-fire">🔥</div>
            <div className="streak-number">{stats.currentStreak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Gorgeous Stats Cards */}
      <div className="stats-gorgeous-grid">
        <div className="stat-card-gorgeous journal-gorgeous">
          <div className="card-gradient journal-gradient"></div>
          <div className="card-icon">📝</div>
          <div className="card-content">
            <div className="card-number">{stats.totalJournalEntries}</div>
            <div className="card-label">Journal Entries</div>
            <div className="card-sublabel">Stories written</div>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        <div className="stat-card-gorgeous breathing-gorgeous">
          <div className="card-gradient breathing-gradient"></div>
          <div className="card-icon">🧘‍♀️</div>
          <div className="card-content">
            <div className="card-number">{stats.totalBreathingSessions}</div>
            <div className="card-label">Breathing Sessions</div>
            <div className="card-sublabel">Moments of calm</div>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        <div className="stat-card-gorgeous total-gorgeous">
          <div className="card-gradient total-gradient"></div>
          <div className="card-icon">⚡</div>
          <div className="card-content">
            <div className="card-number">{stats.totalJournalEntries + stats.totalBreathingSessions}</div>
            <div className="card-label">Total Activities</div>
            <div className="card-sublabel">Wellness score</div>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        {stats.favoriteExercise && (
          <div className="stat-card-gorgeous favorite-gorgeous">
            <div className="card-gradient favorite-gradient"></div>
            <div className="card-icon">⭐</div>
            <div className="card-content">
              <div className="card-favorite">{stats.favoriteExercise}</div>
              <div className="card-label">Favorite Exercise</div>
              <div className="card-sublabel">Most practiced</div>
            </div>
            <div className="card-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Beautiful Recent Activity */}
      <div className="activity-gorgeous-section">
        <div className="recent-journals-gorgeous">
          <h2 className="section-title">📖 Recent Journal Entries</h2>
          {stats.recentEntries.length === 0 ? (
            <div className="empty-gorgeous">
              <div className="empty-icon">🌱</div>
              <p>Your journal is waiting for your first beautiful story</p>
              <button className="btn-gorgeous">Write Your First Entry ✨</button>
            </div>
          ) : (
            <div className="activity-gorgeous-list">
              {stats.recentEntries.map((entry, index) => (
                <div key={entry.id} className="activity-gorgeous-item" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="activity-gorgeous-icon">📝</div>
                  <div className="activity-gorgeous-content">
                    <div className="activity-gorgeous-title">{entry.title || 'Untitled Entry'}</div>
                    <div className="activity-gorgeous-date">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-gorgeous-mood" style={{backgroundColor: moodColors[entry.mood] + '20', color: moodColors[entry.mood]}}>
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

        <div className="recent-breathing-gorgeous">
          <h2 className="section-title">🌸 Recent Breathing Sessions</h2>
          {stats.recentSessions.length === 0 ? (
            <div className="empty-gorgeous">
              <div className="empty-icon">🧘‍♀️</div>
              <p>Begin your mindful breathing journey</p>
              <button className="btn-gorgeous">Start First Session 🌸</button>
            </div>
          ) : (
            <div className="activity-gorgeous-list">
              {stats.recentSessions.map((session, index) => (
                <div key={session.id} className="activity-gorgeous-item" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="activity-gorgeous-icon">🧘‍♀️</div>
                  <div className="activity-gorgeous-content">
                    <div className="activity-gorgeous-title">{session.type}</div>
                    <div className="activity-gorgeous-date">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="activity-gorgeous-duration">
                    {Math.round(session.duration)}s
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gorgeous Action Cards */}
      <div className="actions-gorgeous">
        <h2 className="section-title">✨ Continue Your Beautiful Journey</h2>
        <div className="actions-gorgeous-grid">
          <div className="action-gorgeous-card journal-action-gorgeous">
            <div className="action-gorgeous-background"></div>
            <div className="action-gorgeous-icon">📝</div>
            <h3>Write in Journal</h3>
            <p>Express your thoughts with beautiful mood colors</p>
            <button className="action-gorgeous-btn">Start Writing ✨</button>
          </div>
          
          <div className="action-gorgeous-card breathing-action-gorgeous">
            <div className="action-gorgeous-background"></div>
            <div className="action-gorgeous-icon">🧘‍♀️</div>
            <h3>Breathing Exercise</h3>
            <p>Find calm with gorgeous guided animations</p>
            <button className="action-gorgeous-btn">Start Breathing 🌸</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
