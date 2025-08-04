import React from 'react';

const Home = ({ setCurrentPage }) => {
  return (
    <div className="main-content">
      <div className="container">
        {/* Hero Section */}
        <section style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(152, 193, 217, 0.8) 0%, rgba(124, 165, 184, 0.8) 100%)',
          borderRadius: '20px',
          margin: '2rem 0',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ width: '100%', padding: '2rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>
              Your Journey to Mental Wellness Starts Here
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Discover tools for mindfulness, journaling, and emotional balance. Take the first step towards a healthier mind today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentPage('register')} 
                className="btn"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              >
                🌟 Get Started Free
              </button>
              <button 
                onClick={() => setCurrentPage('login')} 
                className="btn btn-outline"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', color: 'white', borderColor: 'white' }}
              >
                🔐 Sign In
              </button>
            </div>
          </div>
        </section>

        {/* What is MindfulMe Section */}
        <section style={{ padding: '4rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>What is MindfulMe?</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>
              MindfulMe is a comprehensive mental health platform designed to support your emotional wellbeing journey. 
              Our evidence-based tools help you develop mindfulness, track your mood, and build healthy coping strategies.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
                <h4>Mindfulness</h4>
                <p style={{ color: '#666' }}>Guided meditation and breathing exercises</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h4>Progress Tracking</h4>
                <p style={{ color: '#666' }}>Monitor your emotional wellbeing over time</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <h4>Private & Secure</h4>
                <p style={{ color: '#666' }}>Your data is encrypted and completely private</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <h4>Personalized</h4>
                <p style={{ color: '#666' }}>Tailored insights based on your patterns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section style={{ padding: '4rem 0', backgroundColor: 'white', borderRadius: '20px', margin: '2rem 0' }}>
          <div style={{ padding: '0 2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Features Available After Login</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{ marginBottom: '1rem' }}>Personal Journal</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Write daily entries, track your moods, and see patterns in your emotional wellbeing over time.
                </p>
                <div style={{ color: 'var(--primary)', fontWeight: '600' }}>🔐 Login Required</div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
                <h3 style={{ marginBottom: '1rem' }}>Breathing Exercises</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Guided breathing techniques including 4-7-8, Box Breathing, and more for stress relief.
                </p>
                <div style={{ color: 'var(--calm-green)', fontWeight: '600' }}>✅ Try Now (No Login)</div>
                <button 
                  onClick={() => setCurrentPage('breathing')} 
                  style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    backgroundColor: 'var(--calm-green)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                >
                  Try Free Preview
                </button>
              </div>
              
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ marginBottom: '1rem' }}>Growth Analytics</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  View your progress with mood charts, entry statistics, and personalized insights.
                </p>
                <div style={{ color: 'var(--primary)', fontWeight: '600' }}>🔐 Login Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Health Information */}
        <section style={{ padding: '4rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Mental Health Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('resources')}>
              <div style={{ backgroundColor: '#aad9bb', height: '150px', borderRadius: '10px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>😰</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Understanding Anxiety</h3>
              <p style={{ color: '#666' }}>Learn about anxiety disorders, symptoms, and effective coping strategies for daily life.</p>
            </div>
            
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('resources')}>
              <div style={{ backgroundColor: '#c9b6e4', height: '150px', borderRadius: '10px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>😔</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Depression Support</h3>
              <p style={{ color: '#666' }}>Comprehensive information about depression, treatment options, and support resources.</p>
            </div>
            
            <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('resources')}>
              <div style={{ backgroundColor: '#f2d7ee', height: '150px', borderRadius: '10px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>😤</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Stress Management</h3>
              <p style={{ color: '#666' }}>Practical techniques for managing stress in personal and professional life.</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => setCurrentPage('resources')} 
              className="btn"
              style={{ padding: '1rem 2rem' }}
            >
              📚 View All Resources
            </button>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
          color: 'white', 
          padding: '4rem 2rem', 
          borderRadius: '20px', 
          textAlign: 'center',
          margin: '4rem 0'
        }}>
          <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2.5rem' }}>Ready to Start Your Journey?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
            Join thousands of users who have improved their mental wellbeing with MindfulMe
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setCurrentPage('register')} 
              style={{ 
                padding: '1rem 2rem', 
                backgroundColor: 'white', 
                color: 'var(--primary)', 
                border: 'none', 
                borderRadius: '30px', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              🚀 Start Free Today
            </button>
            <button 
              onClick={() => setCurrentPage('login')} 
              style={{ 
                padding: '1rem 2rem', 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: '2px solid white', 
                borderRadius: '30px', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              Already have an account?
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;