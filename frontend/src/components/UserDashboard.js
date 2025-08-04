import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    journalEntries: 0,
    averageMood: 0,
    currentStreak: 0,
    totalDays: 0
  });
  const [recentEntries, setRecentEntries] = useState([]);
  const [moodTrend, setMoodTrend] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = () => {
    const allJournals = JSON.parse(localStorage.getItem('allJournals')) || {};
    const userEntries = allJournals[user.id] || [];
    
    // Calculate stats
    const stats = calculateStats(userEntries);
    setUserStats(stats);
    
    // Get recent entries (last 3)
    const recent = userEntries
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    setRecentEntries(recent);
    
    // Calculate mood trend (last 7 days)
    const trend = calculateMoodTrend(userEntries);
    setMoodTrend(trend);
  };

  const calculateStats = (entries) => {
    if (entries.length === 0) {
      return { journalEntries: 0, averageMood: 0, currentStreak: 0, totalDays: 0 };
    }

    const total = entries.length;
    const avgMood = entries.reduce((sum, entry) => sum + entry.mood, 0) / total;
    
    // Calculate streak (consecutive days with entries)
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    const uniqueDates = [...new Set(sortedEntries.map(e => e.date))];
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      if (uniqueDates[i] === checkDateStr) {
        streak++;
      } else {
        break;
      }
    }

    return {
      journalEntries: total,
      averageMood: parseFloat(avgMood.toFixed(1)),
      currentStreak: streak,
      totalDays: uniqueDates.length
    };
  };

  const calculateMoodTrend = (entries) => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEntries = entries.filter(entry => entry.date === dateStr);
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length 
        : null;
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: avgMood ? Math.round(avgMood) : null,
        hasEntry: dayEntries.length > 0
      });
    }
    
    return last7Days;
  };

  const getMoodEmoji = (mood) => {
    const moodMap = { 1: '😞', 2: '😔', 3: '😐', 4: '🙂', 5: '😃' };
    return moodMap[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const colorMap = { 1: '#ff6b6b', 2: '#ffa726', 3: '#66bb6a', 4: '#42a5f5', 5: '#ab47bc' };
    return colorMap[mood] || '#ddd';
  };

  return (
    <div className="main-content">
      <div className="container">
        {/* Welcome Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1>🌟 Welcome back, {user?.firstName}!</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Here's your mental wellness journey summary
            {user?.joinDate && (
              <span> • Member since {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
            )}
          </p>
        </div>

        {/* Personal Stats - Real Data */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#e8f1ff' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>{userStats.journalEntries}</h3>
            <p style={{ color: '#666' }}>Journal Entries</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#e8f5e8' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😊</div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>
              {userStats.averageMood > 0 ? `${userStats.averageMood}/5` : 'N/A'}
            </h3>
            <p style={{ color: '#666' }}>Average Mood</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#fff4e8' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>{userStats.currentStreak}</h3>
            <p style={{ color: '#666' }}>Day Streak</p>
          </div>
          
          <div className="card" style={{ textAlign: 'center', backgroundColor: '#f0e8ff' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
            <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>{userStats.totalDays}</h3>
            <p style={{ color: '#666' }}>Active Days</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>🚀 Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button 
              className="btn" 
              onClick={() => setCurrentPage('journal')}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '2rem' }}>📝</span>
              Write Journal Entry
            </button>
            <button 
              className="btn" 
              onClick={() => setCurrentPage('breathing')}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '2rem' }}>🧘</span>
              Breathing Exercise
            </button>
            <button 
              className="btn" 
              onClick={() => setCurrentPage('settings')}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '2rem' }}>📊</span>
              View Progress
            </button>
            <button 
              className="btn" 
              onClick={() => setCurrentPage('resources')}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ fontSize: '2rem' }}>📚</span>
              Read Resources
            </button>
          </div>
        </div>

        {/* Real Mood Trend */}
        <div className="card" style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>📈 Your Mood Trend (Last 7 Days)</h3>
          {moodTrend.some(day => day.hasEntry) ? (
            <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', height: '200px', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
              {moodTrend.map((day, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    height: day.mood ? `${day.mood * 30}px` : '20px', 
                    backgroundColor: day.mood ? getMoodColor(day.mood) : '#f0f0f0', 
                    width: '100%', 
                    borderRadius: '5px 5px 0 0',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    border: day.mood ? 'none' : '2px dashed #ccc'
                  }}>
                    {day.mood ? getMoodEmoji(day.mood) : '?'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{day.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h4 style={{ marginBottom: '1rem' }}>No mood data yet</h4>
              <p>Start journaling to see your mood trends!</p>
              <button onClick={() => setCurrentPage('journal')} className="btn" style={{ marginTop: '1rem' }}>
                Write First Entry
              </button>
            </div>
          )}
        </div>

        {/* Real Recent Journal Entries */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>📝 Recent Journal Entries</h3>
            <button onClick={() => setCurrentPage('journal')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              View All
            </button>
          </div>
          
          {recentEntries.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentEntries.map(entry => (
                <div key={entry.id} style={{ 
                  padding: '1.5rem', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '10px', 
                  borderLeft: `4px solid ${getMoodColor(entry.mood)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{getMoodEmoji(entry.mood)}</span>
                      <div>
                        <h4 style={{ marginBottom: '0.3rem' }}>{entry.title || 'Untitled Entry'}</h4>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          {new Date(entry.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'long', day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: '#555', fontSize: '0.95rem' }}>
                    {entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h4 style={{ marginBottom: '1rem' }}>No journal entries yet</h4>
              <p>Start your mental wellness journey by writing your first entry!</p>
              <button onClick={() => setCurrentPage('journal')} className="btn" style={{ marginTop: '1rem' }}>
                Write First Entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;