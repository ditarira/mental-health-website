import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    journalEntries: 0,
    breathingSessions: 0,
    currentStreak: 0,
    totalMinutes: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    setLoading(false);
  }, []);

  const getMoodEmoji = (moodScore) => {
    if (moodScore >= 4.5) return '😄';
    if (moodScore >= 3.5) return '😊';
    if (moodScore >= 2.5) return '😐';
    if (moodScore >= 1.5) return '😔';
    return '😢';
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '🌟';
    if (streak >= 3) return '💪';
    return '🌱';
  };

  if (loading) {
    return (
      <div style={{
        paddingTop: '80px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧠</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            Loading your wellness journey...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Fixed spacing to match navbar height */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Welcome Header - Better proportions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.firstName || 'User'}! 🎉
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#5a6c7d',
            marginBottom: '1.5rem'
          }}>
            How are you feeling today? Let's continue your mental wellness journey.
          </p>

          {/* Quick Stats Bar - Compact */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '50px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            <span>{getStreakEmoji(stats.currentStreak)} {stats.currentStreak} Day Streak</span>
            <span>📝 {stats.journalEntries} Journals</span>
            <span>🧘 {stats.breathingSessions} Sessions</span>
            <span>{getMoodEmoji(3)} Ready to track!</span>
          </div>
        </div>

        {/* Action Cards - Better Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Quick Journal */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
          }}
          onClick={() => window.location.href = '/journal'}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Quick Journal</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Write down your thoughts and feelings
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Start Writing
            </button>
          </div>

          {/* Breathing Exercise */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
          }}
          onClick={() => window.location.href = '/breathing'}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧘</div>
            <h3 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Breathing Exercise</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Practice mindful breathing to reduce stress
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #48cae4, #0077b6)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Start Session
            </button>
          </div>

          {/* Mood Tracker */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
          }}
          onClick={() => window.location.href = '/journal'}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Track Mood</h3>
<p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
             Log your daily mood and emotions
           </p>
           <button style={{
             background: 'linear-gradient(135deg, #f093fb, #f5576c)',
             color: 'white',
             border: 'none',
             padding: '0.75rem 1.5rem',
             borderRadius: '12px',
             fontSize: '0.95rem',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.3s ease'
           }}>
             Log Mood
           </button>
         </div>
       </div>

       {/* Progress Section - Compact but informative */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '2rem',
         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         marginBottom: '2rem'
       }}>
         <h2 style={{
           color: '#2d4654',
           fontSize: '1.8rem',
           marginBottom: '1.5rem',
           textAlign: 'center'
         }}>
           🌟 Your Progress
         </h2>
         
         <div style={{
           textAlign: 'center',
           padding: '1.5rem',
           background: 'linear-gradient(135deg, #e0f2fe, #b3e5fc)',
           borderRadius: '15px'
         }}>
           <p style={{ 
             fontSize: '1.1rem', 
             color: '#2d4654',
             marginBottom: '1rem'
           }}>
             Great job! You've logged into your mental wellness dashboard.
           </p>
           <p style={{ 
             color: '#666',
             marginBottom: '1.5rem',
             fontSize: '0.95rem'
           }}>
             This is where you'll track your journey and access all your tools.
           </p>
           
           <div style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
             gap: '1rem'
           }}>
             <div style={{
               background: 'white',
               padding: '1.5rem',
               borderRadius: '12px',
               boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
             }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
               <h4 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Goal</h4>
               <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                 Start building your daily wellness habits!
               </p>
             </div>
             
             <div style={{
               background: 'white',
               padding: '1.5rem',
               borderRadius: '12px',
               boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
             }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
               <h4 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Journey</h4>
               <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                 Every entry and session counts towards your growth!
               </p>
             </div>
             
             <div style={{
               background: 'white',
               padding: '1.5rem',
               borderRadius: '12px',
               boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
             }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
               <h4 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Achievement</h4>
               <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                 Welcome to your wellness journey!
               </p>
             </div>
           </div>
         </div>
       </div>

       {/* Motivational Footer - Compact */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '15px',
         padding: '1.5rem',
         textAlign: 'center',
         marginBottom: '2rem',
         boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
       }}>
         <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>💪</div>
         <h3 style={{ color: '#2d4654', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
           Ready to begin your wellness journey?
         </h3>
         <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
           Small daily actions lead to big life changes. You're investing in your mental well-being! 🌟
         </p>
       </div>
     </div>
   </div>
 );
};

export default Dashboard;
