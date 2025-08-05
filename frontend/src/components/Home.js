import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const mentalHealthArticles = [
    {
      title: "Understanding Anxiety: A Beginner's Guide",
      excerpt: "Learn about anxiety symptoms, causes, and effective coping strategies that can help you manage daily stress.",
      readTime: "5 min read",
      category: "Anxiety"
    },
    {
      title: "The Power of Mindfulness in Daily Life",
      excerpt: "Discover how mindfulness practices can improve your mental well-being and help you stay present.",
      readTime: "7 min read", 
      category: "Mindfulness"
    },
    {
      title: "Building Healthy Sleep Habits",
      excerpt: "Quality sleep is essential for mental health. Learn practical tips for better sleep hygiene.",
      readTime: "6 min read",
      category: "Sleep"
    },
    {
      title: "Breathing Techniques for Stress Relief",
      excerpt: "Simple breathing exercises that can help reduce stress and promote relaxation in minutes.",
      readTime: "4 min read",
      category: "Breathing"
    }
  ];

  const features = [
    {
      icon: "📝",
      title: "Digital Journaling",
      description: "Express your thoughts and track your emotional journey with our guided journaling tools."
    },
    {
      icon: "🫁", 
      title: "Breathing Exercises",
      description: "Practice guided breathing techniques designed to reduce anxiety and promote calm."
    },
    {
      icon: "📊",
      title: "Mood Tracking",
      description: "Monitor your emotional patterns and identify triggers with our intuitive mood tracker."
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description: "Set and achieve mental wellness goals with personalized recommendations and tracking."
    },
    {
      icon: "📚",
      title: "Resource Library",
      description: "Access curated mental health resources, articles, and professional guidance."
    },
    {
      icon: "🆘",
      title: "Crisis Support",
      description: "Immediate access to crisis resources and professional mental health support."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>🧠 MindfulMe</h1>
            <h2>Your Personal Mental Health Companion</h2>
            <p>
              Take control of your mental wellness journey. Track your mood, practice mindfulness, 
              journal your thoughts, and access professional resources - all in one safe, supportive space.
            </p>
            <div className="hero-buttons">
              <button className="btn" onClick={() => navigate('/register')}>
                ✨ Get Started Free
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/login')}>
                🔑 Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title text-center">Mental Wellness Tools</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mental Health Articles Section */}
      <section className="section" style={{backgroundColor: 'var(--light)'}}>
        <div className="container">
          <h2 className="section-title text-center">
            Mental Health Resources
          </h2>
          <div className="resources-grid">
            {mentalHealthArticles.map((article, index) => (
              <div key={index} className="resource-card">
                <div className="resource-content">
                  <div className="resource-header">
                    <span className="resource-category" style={{
                      backgroundColor: index % 2 === 0 ? 'var(--soft-purple)' : 'var(--gentle-pink)',
                      color: 'var(--dark)'
                    }}>
                      {article.category}
                    </span>
                    <span style={{fontSize: '0.9rem', color: '#777'}}>{article.readTime}</span>
                  </div>
                  <h3 className="resource-title">{article.title}</h3>
                  <p className="resource-description">{article.excerpt}</p>
                  <button className="btn btn-outline" style={{marginTop: '1rem'}}>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="section" style={{backgroundColor: '#ffe6e6', borderTop: '3px solid #e74c3c'}}>
        <div className="container text-center">
          <h3 style={{color: '#e74c3c', marginBottom: '1rem'}}>🆘 Need Immediate Help?</h3>
          <p style={{marginBottom: '1rem'}}>
            If you're experiencing a mental health crisis, please reach out for help immediately.
          </p>
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="tel:988" className="emergency-number">📞 988 - Suicide & Crisis Lifeline</a>
            <a href="tel:911" className="emergency-number">🚨 911 - Emergency Services</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
