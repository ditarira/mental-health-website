import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: "📝",
      title: "Journal & Track",
      description: "Document your thoughts, feelings, and daily experiences with our intuitive journaling system."
    },
    {
      icon: "🧘", 
      title: "Mindfulness",
      description: "Practice breathing exercises and meditation techniques to reduce stress and anxiety."
    },
    {
      icon: "📚",
      title: "Resources", 
      description: "Access helpful articles, tips, and professional support when you need it most."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(152, 193, 217, 0.8) 0%, rgba(124, 165, 184, 0.8) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          color: 'white',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            🧠 MindfulMe
          </h1>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Mental Health Platform
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}>
            Your personal companion for mental wellness. Track your mood, 
            journal your thoughts, practice mindfulness, and access 
            resources for better mental health.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/login"
              style={{
                display: 'inline-block',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#7ca5b8';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              🚀 Get Started
            </Link>
            <Link 
              to="/register"
              style={{
                display: 'inline-block',
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: '#7ca5b8',
                border: 'none',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ✨ Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '5rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
                textAlign: 'center',
                borderBottom: '4px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderBottom = '4px solid #7ca5b8';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderBottom = '4px solid transparent';
              }}
              >
                <div style={{
                  fontSize: '3rem',
                  color: '#7ca5b8',
                  marginBottom: '1.5rem',
                  display: 'inline-block',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(124, 165, 184, 0.1)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  marginBottom: '1rem',
                  color: '#2d4654'
                }}>{feature.title}</h3>
                <p style={{ color: '#666' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section style={{
        backgroundColor: '#ffe6e6',
        borderTop: '3px solid #e74c3c',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h3 style={{color: '#e74c3c', marginBottom: '1rem'}}>🆘 Need Immediate Help?</h3>
          <p style={{marginBottom: '1rem'}}>
            If you're experiencing a mental health crisis, please reach out for help immediately.
          </p>
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a 
              href="tel:988" 
              style={{
                color: '#e74c3c',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textDecoration: 'none'
              }}
            >
              📞 988 - Crisis Lifeline
            </a>
            <a 
              href="tel:911" 
              style={{
                color: '#e74c3c',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textDecoration: 'none'
              }}
            >
              🚨 911 - Emergency
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
