import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    setTimeout(() => setLoading(false), 800);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <div>Loading MindfulMe...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '1.2rem' : '2.5rem'
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        
        {/* Slightly Larger Welcome Card */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '25px',
          padding: isMobile ? '2rem' : '2.5rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.12)'
        }}>
          <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '1rem' }}>👋</div>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Welcome back, {user?.firstName || 'Friend'}! ✨
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            margin: 0,
            lineHeight: '1.5'
          }}>
            How are you feeling today? Let's continue your wellness journey! 🌟
          </p>
        </div>

        {/* Larger Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(2, 1fr)' 
            : 'repeat(4, 1fr)',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Day Streak */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '0.75rem' }}>🏆</div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem', opacity: 0.9 }}>Day Streak</div>
          </div>

          {/* Journal Entries */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/journal')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '0.75rem' }}>📝</div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem', opacity: 0.9 }}>Journal Entries</div>
          </div>

          {/* Breathing Sessions */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/breathing')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '0.75rem' }}>🧘</div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem', opacity: 0.9 }}>Breathing Sessions</div>
          </div>

          {/* Mood Tracking */}
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/journal')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '0.75rem' }}>😊</div>
            <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ready</div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem', opacity: 0.9 }}>to track!</div>
          </div>
        </div>

        {/* Larger Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Quick Journal */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: isMobile ? '2rem' : '2.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            border: '2px solid rgba(16, 185, 129, 0.2)',
            minHeight: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/journal')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '3.5rem' : '4rem', marginBottom: '1.5rem' }}>📝</div>
            <h3 style={{ 
              fontSize: isMobile ? '1.4rem' : '1.6rem', 
              color: '#374151', 
              marginBottom: '1rem' 
            }}>
              Quick Journal
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: '1.5',
              margin: '0 0 1.5rem 0'
            }}>
              Write down your thoughts and track your wellness journey
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}>
              Start Writing
            </button>
          </div>

          {/* Breathing Exercise */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: isMobile ? '2rem' : '2.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            border: '2px solid rgba(139, 92, 246, 0.2)',
            minHeight: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/breathing')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '3.5rem' : '4rem', marginBottom: '1.5rem' }}>🧘</div>
            <h3 style={{ 
              fontSize: isMobile ? '1.4rem' : '1.6rem', 
              color: '#374151', 
              marginBottom: '1rem' 
            }}>
              Breathing Exercise
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: '1.5',
              margin: '0 0 1.5rem 0'
            }}>
              Practice mindful breathing to reduce stress and find peace
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}>
              Start Session
            </button>
          </div>

          {/* Resources */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: isMobile ? '2rem' : '2.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            border: '2px solid rgba(59, 130, 246, 0.2)',
            minHeight: '240px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onClick={() => navigate('/resources')}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: isMobile ? '3.5rem' : '4rem', marginBottom: '1.5rem' }}>📚</div>
            <h3 style={{ 
              fontSize: isMobile ? '1.4rem' : '1.6rem', 
              color: '#374151', 
              marginBottom: '1rem' 
            }}>
              Mental Health Resources
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: '1.5',
              margin: '0 0 1.5rem 0'
            }}>
              Find professional support and helpful resources
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}>
              Browse Resources
            </button>
          </div>
        </div>

        {/* Larger Daily Inspiration */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: isMobile ? '2rem' : '2.5rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✨</div>
          <h3 style={{ 
            color: '#667eea', 
            fontSize: isMobile ? '1.4rem' : '1.6rem',
            marginBottom: '1.5rem',
            fontWeight: 'bold'
          }}>
            Daily Inspiration
          </h3>
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#374151', 
            fontStyle: 'italic',
            lineHeight: '1.6',
            margin: 0
          }}>
            Every small step counts on your mental health journey - you are growing stronger each day! 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
