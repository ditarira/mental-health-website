import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          fontSize: '6rem',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          borderRadius: '50%',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem auto',
          animation: 'pulse 2s ease-in-out infinite alternate'
        }}>🧠</div>
        
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          MindfulMe
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '300',
          marginBottom: '1rem',
          opacity: 0.9
        }}>
          Mental Health Platform
        </h2>
        
        <p style={{
          fontSize: '1.3rem',
          marginBottom: '3rem',
          opacity: 0.8,
          maxWidth: '600px'
        }}>
          Your personal companion for mental wellness. Track your mood, journal your thoughts, 
          practice mindfulness, and access resources for better mental health.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link
          to="/login"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: '600',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🚀 Get Started
        </Link>
        
        <Link
          to="/register"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: '600',
            border: 'none',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
          }}
        >
          ✨ Create Account
        </Link>
      </div>

      <div style={{
        marginTop: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        width: '100%'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Journal & Track</h3>
          <p style={{ opacity: 0.8 }}>Document your thoughts, feelings, and daily experiences with our intuitive journaling system.</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mindfulness</h3>
          <p style={{ opacity: 0.8 }}>Practice breathing exercises and meditation techniques to reduce stress and anxiety.</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Resources</h3>
          <p style={{ opacity: 0.8 }}>Access helpful articles, tips, and professional support when you need it most.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
