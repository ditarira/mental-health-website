import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#2d4654', marginBottom: '0.5rem' }}>
            Welcome back, {user?.name}! 🎉
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            How are you feeling today? Let's continue your mental wellness journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Quick Journal</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Write down your thoughts and feelings
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Start Writing
            </button>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
            <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Breathing Exercise</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Practice mindful breathing to reduce stress
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #aad9bb, #7cc49a)',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Start Session
            </button>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Mood Tracker</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Track your daily mood and emotions
            </p>
            <button style={{
              background: 'linear-gradient(135deg, #c9b6e4, #a695d1)',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Log Mood
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>🌟 Your Progress</h3>
          <p style={{ color: '#666' }}>
            Great job! You've logged in to your mental wellness dashboard. 
            This is where you'll track your journey and access all your tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
