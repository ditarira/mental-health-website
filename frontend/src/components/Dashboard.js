import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div style={{
        paddingTop: '100px', // Account for fixed navbar
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 2rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Welcome Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Welcome back, {user?.firstName}! 🎉
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '2rem'
            }}>
              How are you feeling today? Let's continue your mental wellness journey.
            </p>
            
            {/* Stats Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              color: 'white'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                <div style={{ fontWeight: 'bold' }}>0 Day Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                <div style={{ fontWeight: 'bold' }}>0 Journals</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧘</div>
                <div style={{ fontWeight: 'bold' }}>0 Sessions</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😊</div>
                <div style={{ fontWeight: 'bold' }}>Ready to track!</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Quick Journal */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2d4654',
                marginBottom: '1rem'
              }}>
                Quick Journal
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                Write down your thoughts and feelings
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
              }}
              >
                Start Writing
              </button>
            </div>

            {/* Breathing Exercise */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧘‍♀️</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2d4654',
                marginBottom: '1rem'
              }}>
                Breathing Exercise
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                Practice mindful breathing to reduce stress
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #00bcd4, #00acc1)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(0, 188, 212, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 188, 212, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 188, 212, 0.3)';
              }}
              >
                Start Session
              </button>
            </div>
          </div>

          {/* Mood Tracker */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2d4654',
              marginBottom: '1rem'
            }}>
              Track Mood
            </h3>
            <p style={{
              color: '#666',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              Log your daily mood and track patterns
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {['😢', '😔', '😐', '😊', '😄'].map((emoji, index) => (
                <button
                  key={index}
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #ff9800, #ff5722)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(255, 152, 0, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.4)';
}}
           onMouseOut={(e) => {
             e.target.style.transform = 'translateY(0)';
             e.target.style.boxShadow = '0 6px 20px rgba(255, 152, 0, 0.3)';
           }}
           >
             Save Mood
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Dashboard;
