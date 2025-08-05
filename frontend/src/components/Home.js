import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>🧠 MindfulMe</h1>
            <h2>Mental Health Platform</h2>
            <p>
              Your personal companion for mental wellness. Track your mood, 
              journal your thoughts, practice mindfulness, and access 
              resources for better mental health.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-outline" onClick={() => navigate('/login')}>
                🚀 Get Started
              </button>
              <button className="btn" onClick={() => navigate('/register')}>
                ✨ Create Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <div className="features-grid" style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div className="feature-card">
              <div className="feature-icon" style={{fontSize: '4rem'}}>📝</div>
              <h3>Journal & Track</h3>
              <p>
                Document your thoughts, feelings, and daily experiences 
                with our intuitive journaling system.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{fontSize: '4rem'}}>🧘</div>
              <h3>Mindfulness</h3>
              <p>
                Practice breathing exercises and meditation techniques to 
                reduce stress and anxiety.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{fontSize: '4rem'}}>📚</div>
              <h3>Resources</h3>
              <p>
                Access helpful articles, tips, and professional support when 
                you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" style={{backgroundColor: 'var(--light)'}}>
        <div className="container">
          <h2 className="section-title text-center">Why Choose MindfulMe?</h2>
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--dark)'}}>
              Mental health care should be accessible, personalized, and empowering. 
              Our platform provides you with evidence-based tools to support your wellness journey.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔒</div>
                <h3>Private & Secure</h3>
                <p>Your data is encrypted and protected with industry-standard security.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👨‍⚕️</div>
                <h3>Evidence-Based</h3>
                <p>All our tools are based on proven psychological and therapeutic methods.</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📱</div>
                <h3>Always Available</h3>
                <p>Access your mental health tools anytime, anywhere, on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section text-center" style={{
        background: 'linear-gradient(135deg, var(--gentle-pink) 0%, var(--soft-purple) 100%)'
      }}>
        <div className="container">
          <h2 style={{color: 'var(--dark)', marginBottom: '1rem'}}>
            Ready to Start Your Wellness Journey?
          </h2>
          <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--dark)'}}>
            Join thousands who have improved their mental health with MindfulMe.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button className="btn" onClick={() => navigate('/register')}>
              🚀 Start Free Today
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/login')}>
              🔑 Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="crisis-alert">
        <div className="container text-center">
          <h3 style={{color: '#e74c3c', marginBottom: '1rem'}}>🆘 Need Immediate Help?</h3>
          <p style={{marginBottom: '1rem'}}>
            If you're experiencing a mental health crisis, please reach out for help immediately.
          </p>
          <div className="emergency-contacts">
            <a href="tel:988" className="emergency-number">📞 988 - Crisis Lifeline</a>
            <a href="tel:911" className="emergency-number">🚨 911 - Emergency</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
