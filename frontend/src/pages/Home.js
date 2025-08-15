import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFaq, setCurrentFaq] = useState(null);
  
  const features = [
    {
      title: "Daily Mood Tracking",
      description: "Understand your emotional patterns with beautiful, insightful analytics",
      icon: "📊",
      preview: "Track your journey to better mental health"
    },
    {
      title: "Private Journaling", 
      description: "Express your thoughts safely in your personal digital sanctuary",
      icon: "📝",
      preview: "Your thoughts, completely private and secure"
    },
    {
      title: "Guided Breathing",
      description: "Find instant calm with scientifically-backed breathing exercises", 
      icon: "🧘‍♀️",
      preview: "Reduce anxiety in just 3 minutes"
    },
    {
      title: "Progress Insights",
      description: "Watch your wellness journey unfold with meaningful achievements",
      icon: "📈", 
      preview: "See your growth over time"
    }
  ];

  const testimonials = [
    { 
      text: "MindfulMe changed my life. The daily check-ins help me stay grounded, and the breathing exercises are a lifesaver during anxiety attacks.", 
      author: "Sarah M., Teacher",
      rating: 5
    },
    { 
      text: "Finally, a mental health app that feels safe and genuine. I love how private everything is - no judgment, just support.", 
      author: "Alex R., Student", 
      rating: 5
    },
    { 
      text: "The mood tracking helped me recognize patterns I never noticed. My therapist even uses the insights in our sessions!", 
      author: "Jamie L., Nurse",
      rating: 5 
    }
  ];

  const faqs = [
    {
      question: "What's included in MindfulMe?",
      answer: "MindfulMe includes daily mood tracking, private journaling, guided breathing exercises, progress insights, and achievement tracking. All core features are completely free forever."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. Your data is encrypted, never shared with third parties, and stored securely. We believe mental health is deeply personal - your thoughts and feelings stay completely private."
    },
    {
      question: "How does mood tracking work?",
      answer: "Simply log your mood daily using our intuitive 5-point scale. Over time, you'll see patterns, triggers, and improvements in beautiful, easy-to-understand charts and insights."
    },
    {
      question: "What breathing techniques are available?",
      answer: "We offer 4-7-8 breathing, box breathing, triangle breathing, and coherent breathing. Each technique is guided with visual animations and proven to reduce stress and anxiety."
    },
    {
      question: "How do I get started?",
      answer: "Simply create your free account, choose your wellness goals, and start with a quick mood check-in or 3-minute breathing exercise. No credit card required, ever."
    },
    {
      question: "Is MindfulMe really free?",
      answer: "Yes! All core features including journaling, mood tracking, and breathing exercises are completely free. We believe mental wellness should be accessible to everyone."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Improved" },
    { number: "4.9★", label: "User Rating" },
    { number: "95%", label: "Feel Better" },
    { number: "24/7", label: "Always Here" }
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, [features.length, testimonials.length]);

  const toggleFaq = (index) => {
    setCurrentFaq(currentFaq === index ? null : index);
  };

  return (
    <div className="marketing-page">
      <nav className="marketing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="brand-link">
              <span className="brand-icon">🧠</span>
              <span className="brand-name">MindfulMe</span>
            </Link>
          </div>
          
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#crisis">Support</a>
          </div>
          
          <div className="nav-auth">
            <Link to="/login" className="nav-login">Log In</Link>
            <Link to="/register" className="nav-signup">Try Free</Link>
          </div>
        </div>
      </nav>

      <section className="hero-marketing">
        <div className="hero-background">
          <div className="floating-elements">
            <span className="float-1">✨</span>
            <span className="float-2">🌟</span>
            <span className="float-3">💫</span>
            <span className="float-4">🌸</span>
            <span className="float-5">🦋</span>
            <span className="float-6">🌿</span>
          </div>
        </div>
        
        <div className="hero-content-marketing">
          <div className="hero-badge">
            <span>🏆 #1 Mental Wellness App</span>
          </div>
          
          <h1 className="hero-title-marketing">
            Find Peace in Just
            <span className="gradient-text"> 5 Minutes a Day</span>
          </h1>
          
          <p className="hero-subtitle-marketing">
            Join thousands who have transformed their mental health with MindfulMe's 
            gentle, science-backed approach to wellness. Start your journey to a calmer, 
            happier you - completely free.
          </p>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <Link to="/register" className="cta-primary-marketing">
              🚀 Start Your Free Journey
            </Link>
            <Link to="/login" className="cta-secondary-marketing">
              👋 Already a Member?
            </Link>
          </div>

          <div className="trust-line">
            <span>🔒 Completely Private</span>
            <span>•</span>
            <span>🆓 Always Free</span>
            <span>•</span>
            <span>💝 No Ads Ever</span>
          </div>
        </div>
      </section>

      <section id="features" className="features-showcase">
        <div className="container">
          <h2 className="section-title-marketing">Everything You Need for Mental Wellness</h2>
          <p className="section-subtitle">Simple tools, powerful results</p>
          
          <div className="features-demo">
            <div className="features-list">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={index === currentFeature ? "feature-item active" : "feature-item"}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="feature-icon-marketing">{feature.icon}</div>
                  <div className="feature-content-marketing">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <div className="feature-arrow">→</div>
                </div>
              ))}
            </div>
            
            <div className="feature-preview-large">
              <div className="preview-screen">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span>MindfulMe</span>
                </div>
                <div className="preview-content">
                  <div className="preview-icon-large">{features[currentFeature].icon}</div>
                  <h3>{features[currentFeature].title}</h3>
                  <p>{features[currentFeature].preview}</p>
                  <div className="preview-action">
                    <div className="action-button">Try It Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-marketing">
        <div className="container">
          <h2 className="section-title-marketing">Get Started in 3 Simple Steps</h2>
          
          <div className="steps-visual">
            <div className="step-marketing">
              <div className="step-visual">
                <div className="step-circle">1</div>
                <div className="step-illustration">📱</div>
              </div>
              <h3>Sign Up Free</h3>
              <p>Create your account in 30 seconds. No credit card required, ever.</p>
            </div>
            
            <div className="step-connector">→</div>
            
            <div className="step-marketing">
              <div className="step-visual">
                <div className="step-circle">2</div>
                <div className="step-illustration">🎯</div>
              </div>
              <h3>Choose Your Goal</h3>
              <p>Whether it's reducing anxiety, better sleep, or emotional awareness - we'll guide you.</p>
            </div>
            
            <div className="step-connector">→</div>
            
            <div className="step-marketing">
              <div className="step-visual">
                <div className="step-circle">3</div>
                <div className="step-illustration">🌱</div>
              </div>
              <h3>Watch Yourself Grow</h3>
              <p>Track your progress and celebrate small wins as you build lasting habits.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="social-proof">
        <div className="container">
          <h2 className="section-title-marketing">Loved by Thousands</h2>
          
          <div className="testimonial-showcase">
            <div className="testimonial-large">
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <blockquote>"{testimonials[currentTestimonial].text}"</blockquote>
                <cite>— {testimonials[currentTestimonial].author}</cite>
              </div>
            </div>
            
            <div className="testimonial-dots-marketing">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={index === currentTestimonial ? "dot active" : "dot"}
                  onClick={() => setCurrentTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>

          <div className="social-logos">
            <div className="social-item">
              <span className="social-icon">📱</span>
              <span>App Store Featured</span>
            </div>
            <div className="social-item">
              <span className="social-icon">🏆</span>
              <span>Wellness Award Winner</span>
            </div>
            <div className="social-item">
              <span className="social-icon">💙</span>
              <span>Therapist Recommended</span>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container">
          <h2 className="section-title-marketing">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about MindfulMe</p>
          
          <div className="faq-container">
            {faqs.map((faqItem, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={currentFaq === index ? "faq-question active" : "faq-question"}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faqItem.question}</span>
                  <span className="faq-icon">{currentFaq === index ? '−' : '+'}</span>
                </button>
                
                {currentFaq === index && (
                  <div className="faq-answer">
                    <p>{faqItem.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="crisis" className="crisis-support-marketing">
        <div className="container">
          <div className="crisis-card-marketing">
            <div className="crisis-icon-marketing">🆘</div>
            <h3>In Crisis? Get Help Now</h3>
            <p>If you're having thoughts of self-harm, please reach out immediately. You matter, and help is available 24/7.</p>
            <div className="crisis-buttons">
              <a href="tel:988" className="crisis-btn-marketing urgent">
                📞 Call 988 - Crisis Lifeline
              </a>
              <a href="sms:741741" className="crisis-btn-marketing">
                💬 Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-marketing">
        <div className="container">
          <div className="cta-content-marketing">
            <h2>Ready to Feel Better?</h2>
            <p>Join thousands who have found peace with MindfulMe. Your mental health journey starts with a single step.</p>
            
            <div className="final-buttons-marketing">
              <Link to="/register" className="btn-cta-large">
                ✨ Start Free Today - No Risk
              </Link>
            </div>
            
            <div className="final-guarantees">
              <div className="guarantee">
                <span>🔒</span>
                <span>100% Privacy Guaranteed</span>
              </div>
              <div className="guarantee">
                <span>🆓</span>
                <span>Always Free Core Features</span>
              </div>
              <div className="guarantee">
                <span>💝</span>
                <span>Cancel Anytime</span>
              </div>
            </div>

            <p className="login-link">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="marketing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="brand-icon">🧠</span>
                <span className="brand-name">MindfulMe</span>
              </div>
              <p>Your trusted companion for mental wellness. Find peace, track progress, and grow stronger every day.</p>
              <div className="footer-social">
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="YouTube">📺</a>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Features</h4>
                <ul>
                  <li><a href="#features">Mood Tracking</a></li>
                  <li><a href="#features">Private Journaling</a></li>
                  <li><a href="#features">Breathing Exercises</a></li>
                  <li><a href="#features">Progress Insights</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#press">Press Kit</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#crisis">Crisis Support</a></li>
                  <li><a href="#research">Research</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#security">Security</a></li>
                  <li><a href="#accessibility">Accessibility</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 MindfulMe. All rights reserved. Made with 💝 for mental wellness.</p>
              <div className="footer-badges">
                <span className="badge">🔒 HIPAA Compliant</span>
                <span className="badge">⭐ 4.9/5 Rating</span>
                <span className="badge">💙 Therapist Approved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
