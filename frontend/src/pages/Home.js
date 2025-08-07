import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>??</div>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>MindfulMe</h1>
      
      <h2 style={{
        fontSize: '1.5rem',
        marginBottom: '2rem',
        opacity: 0.9
      }}>
        Your Mental Wellness Journey Starts Here
      </h2>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '20px',
        maxWidth: '600px',
        marginBottom: '2rem'
      }}>
        <h3>? Features</h3>
        <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
          <li>?? Mood tracking & analytics</li>
          <li>?? Digital journaling</li>
          <li>?? Breathing exercises</li>
          <li>?? Personalized settings</li>
          <li>?? Achievement system</li>
        </ul>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <Link to="/login" style={{
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '2px solid white',
          padding: '1rem 2rem',
          borderRadius: '30px',
          fontSize: '1rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          ?? Sign In
        </Link>
        
        <Link to="/register" style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '30px',
          fontSize: '1rem',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          ? Create Account
        </Link>
      </div>
    </div>
  );
}

export default Home;
