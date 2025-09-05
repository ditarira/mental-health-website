import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      lineHeight: '1.6',
      color: '#1f2937',
      overflowX: 'hidden'
    }}>
      {/* Navigation */}
      {/* Navigation */}
<nav style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  transition: 'all 0.3s ease'
}}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: window.innerWidth <= 768 ? '1rem' : '1rem 2rem'
  }}>
    {/* Brand - Updated to match Navigation.js */}
    <Link to="/" style={{
      display: 'flex',
      alignItems: 'center',
      gap: window.innerWidth <= 768 ? '0' : '0.8rem',
      textDecoration: 'none',
      color: '#1f2937',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: window.innerWidth <= 768 ? '40px' : '45px',
        height: window.innerWidth <= 768 ? '40px' : '45px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
      }}>
        <span className="brain-animate" style={{
          fontSize: window.innerWidth <= 768 ? '1.5rem' : '1.8rem',
          color: 'white'
        }}>
          🧠
        </span>
      </div>
      {/* Show text only on desktop */}
      {window.innerWidth > 768 && (
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(102, 126, 234, 0.1)',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '-1px'
        }}>
          MindfulMe
        </span>
      )}
    </Link>

    {/* Desktop Navigation Links */}
    {window.innerWidth > 768 && (
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <a href="#features" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}>Features</a>
        <a href="#how-it-works" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}>How It Works</a>
        <a href="#testimonials" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}>Reviews</a>
        <a href="#faq" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          transition: 'color 0.3s ease'
        }}>FAQ</a>
      </div>
    )}

    {/* Auth Buttons */}
    <div style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }}>
      {window.innerWidth > 768 && (
        <Link to="/login" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          transition: 'color 0.3s ease'
        }}>
          Log In
        </Link>
      )}

      <Link to="/register" style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        textDecoration: 'none',
        padding: window.innerWidth <= 768 ? '0.5rem 1rem' : '0.75rem 1.5rem',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}>
        Try Free
      </Link>

      {/* Mobile Hamburger */}
      {window.innerWidth <= 768 && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          ☰
        </button>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && window.innerWidth <= 768 && (
    <div style={{
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '1rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <a href="#features" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          padding: '0.5rem 0'
        }}>Features</a>
        <a href="#how-it-works" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          padding: '0.5rem 0'
        }}>How It Works</a>
        <a href="#testimonials" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          padding: '0.5rem 0'
        }}>Reviews</a>
        <a href="#faq" style={{
          textDecoration: 'none',
          color: '#6b7280',
          fontWeight: '500',
          padding: '0.5rem 0'
        }}>FAQ</a>
        <Link to="/login" style={{
          textDecoration: 'none',
          color: '#667eea',
          fontWeight: '600',
          padding: '0.5rem 0',
          borderTop: '1px solid #e5e7eb',
          marginTop: '0.5rem',
          paddingTop: '1rem'
        }}>
          Log In
        </Link>
      </div>
    </div>
  )}
</nav>

      {/* Hero Section */}
 <section style={{
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/1aac982e-9668-4e85-92c3-c7b101401235.gif)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  padding: window.innerWidth <= 768 ? '2rem 1rem' : '2rem',
  marginTop: '80px'
}}>
{/* Dark overlay for text readability */}
<div style={{
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
  zIndex: 1
}}></div>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          zIndex: 2,
          position: 'relative'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            🏆 #1 Mental Wellness App
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '2.5rem' : '3.5rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Find Peace in Just
            <span style={{
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block'
            }}> 5 Minutes a Day</span>
          </h1>
{/* Subtitle */}
<p style={{
  fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.25rem',
  color: '#1f2937',
  marginBottom: '3rem',
  lineHeight: '1.6',
  fontWeight: '900',
  background: 'rgba(255, 255, 255, 0.85)',
  padding: '1.2rem 1.8rem',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
}}>
  Join thousands who have transformed their mental health with MindfulMe's
  gentle, science-backed approach to wellness. Start your journey to a calmer,
  happier you - completely free.
</p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: window.innerWidth <= 768 ? '1rem' : '2rem',
            margin: '3rem 0',
            padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <Link to="/register" style={{
              background: 'white',
              color: '#667eea',
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              textAlign: 'center'
            }}>
              🚀 Start Your Free Journey
            </Link>
            <Link to="/login" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              👋 Already a Member?
            </Link>
          </div>

          {/* Trust Line */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: window.innerWidth <= 768 ? '0.5rem' : '1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <span>🔒 Completely Private</span>
            {window.innerWidth > 768 && <span>•</span>}
            <span>🆓 Always Free</span>
            {window.innerWidth > 768 && <span>•</span>}
            <span>💝 No Ads Ever</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Everything You Need for Mental Wellness
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#6b7280',
            marginBottom: '4rem'
          }}>
            Simple tools, powerful results
          </p>

          {/* Features List - Stacked Vertically */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setCurrentFeature(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${index === currentFeature ? '#667eea' : 'transparent'}`,
                  boxShadow: index === currentFeature ? '0 8px 25px rgba(102, 126, 234, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  transform: index === currentFeature ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '15px',
                  color: 'white',
                  flexShrink: 0
                }}>
                  {feature.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: '#667eea',
                  marginLeft: 'auto'
                }}>
                  →
                </div>
              </div>
            ))}
          </div>

          {/* Preview Box */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#e5e7eb'
                  }}></span>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#e5e7eb'
                  }}></span>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#e5e7eb'
                  }}></span>
                </div>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>MindfulMe</span>
              </div>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {features[currentFeature].icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                {features[currentFeature].title}
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                {features[currentFeature].preview}
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                Try It Now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{
        padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '4rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Get Started in 3 Simple Steps
          </h2>

          {/* Steps - Stacked Vertically on Mobile */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: window.innerWidth <= 768 ? '2rem' : '4rem'
          }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center', maxWidth: '300px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800'
              }}>
                1
              </div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Sign Up Free
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Create your account in 30 seconds. No credit card required, ever.
              </p>
            </div>

            {/* Arrow */}
            {window.innerWidth > 768 && (
              <div style={{
                fontSize: '2rem',
                color: '#667eea',
                fontWeight: '800'
              }}>
                →
              </div>
            )}
            {window.innerWidth <= 768 && (
              <div style={{
                fontSize: '2rem',
                color: '#667eea',
                fontWeight: '800',
                transform: 'rotate(90deg)'
              }}>
                →
              </div>
            )}

            {/* Step 2 */}
            <div style={{ textAlign: 'center', maxWidth: '300px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800'
              }}>
                2
              </div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Choose Your Goal
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Whether it's reducing anxiety, better sleep, or emotional awareness - we'll guide you.
              </p>
            </div>

            {/* Arrow */}
            {window.innerWidth > 768 && (
              <div style={{
                fontSize: '2rem',
                color: '#667eea',
                fontWeight: '800'
              }}>
                →
              </div>
            )}
            {window.innerWidth <= 768 && (
              <div style={{
                fontSize: '2rem',
                color: '#667eea',
                fontWeight: '800',
                transform: 'rotate(90deg)'
              }}>
                →
              </div>
            )}

            {/* Step 3 */}
            <div style={{ textAlign: 'center', maxWidth: '300px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '2rem',
                fontWeight: '800'
              }}>
                3
              </div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Watch Yourself Grow
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Track your progress and celebrate small wins as you build lasting habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{
        padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '4rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
         }}>
           Loved by Thousands
         </h2>

         {/* Single Testimonial Card */}
         <div style={{
           background: 'white',
           borderRadius: '20px',
           padding: window.innerWidth <= 768 ? '2rem' : '3rem',
           boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
           textAlign: 'center',
           maxWidth: '600px',
           margin: '0 auto 2rem'
         }}>
           <div style={{
             display: 'flex',
             justifyContent: 'center',
             gap: '0.25rem',
             marginBottom: '1.5rem'
           }}>
             {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
               <span key={i} style={{ fontSize: '1.5rem' }}>⭐</span>
             ))}
           </div>
           <blockquote style={{
             fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem',
             fontStyle: 'italic',
             color: '#1f2937',
             lineHeight: '1.6',
             marginBottom: '2rem',
             margin: '0 0 2rem 0'
           }}>
             "{testimonials[currentTestimonial].text}"
           </blockquote>
           <cite style={{
             fontSize: '1rem',
             color: '#6b7280',
             fontWeight: '600',
             fontStyle: 'normal'
           }}>
             — {testimonials[currentTestimonial].author}
           </cite>
         </div>

         {/* Dots Navigation */}
         <div style={{
           display: 'flex',
           justifyContent: 'center',
           gap: '0.5rem',
           marginBottom: '3rem'
         }}>
           {testimonials.map((_, index) => (
             <button
               key={index}
               onClick={() => setCurrentTestimonial(index)}
               style={{
                 width: '12px',
                 height: '12px',
                 borderRadius: '50%',
                 border: 'none',
                 background: index === currentTestimonial ? '#667eea' : '#d1d5db',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease'
               }}
             ></button>
           ))}
         </div>
       </div>
     </section>

     {/* FAQ Section */}
     <section id="faq" style={{
       padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
       background: 'white'
     }}>
       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
         <h2 style={{
           fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
           fontWeight: '800',
           textAlign: 'center',
           marginBottom: '1rem',
           background: 'linear-gradient(135deg, #667eea, #764ba2)',
           backgroundClip: 'text',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent'
         }}>
           Frequently Asked Questions
         </h2>
         <p style={{
           textAlign: 'center',
           fontSize: '1.1rem',
           color: '#6b7280',
           marginBottom: '4rem'
         }}>
           Everything you need to know about MindfulMe
         </p>

         {/* FAQ Accordion */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           {faqs.map((faqItem, index) => (
             <div key={index} style={{
               background: '#f8fafc',
               borderRadius: '15px',
               overflow: 'hidden',
               border: '1px solid #e5e7eb'
             }}>
               <button
                 onClick={() => toggleFaq(index)}
                 style={{
                   width: '100%',
                   padding: '1.5rem',
                   background: 'none',
                   border: 'none',
                   textAlign: 'left',
                   cursor: 'pointer',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                   fontSize: '1.1rem',
                   fontWeight: '600',
                   color: '#1f2937'
                 }}
               >
                 <span>{faqItem.question}</span>
                 <span style={{
                   fontSize: '1.5rem',
                   color: '#667eea',
                   transition: 'transform 0.3s ease',
                   transform: currentFaq === index ? 'rotate(45deg)' : 'rotate(0deg)'
                 }}>
                   {currentFaq === index ? '−' : '+'}
                 </span>
               </button>

               {currentFaq === index && (
                 <div style={{
                   padding: '0 1.5rem 1.5rem',
                   color: '#6b7280',
                   lineHeight: '1.6'
                 }}>
                   <p style={{ margin: 0 }}>{faqItem.answer}</p>
                 </div>
               )}
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* Crisis Support Section */}
     <section id="crisis" style={{
       padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
       background: '#fef2f2'
     }}>
       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
         <div style={{
           background: 'white',
           borderRadius: '20px',
           padding: window.innerWidth <= 768 ? '2rem' : '3rem',
           textAlign: 'center',
           border: '2px solid #fca5a5',
           boxShadow: '0 10px 30px rgba(248, 113, 113, 0.1)'
         }}>
           <div style={{
             fontSize: '4rem',
             marginBottom: '1rem'
           }}>
             🆘
           </div>
           <h3 style={{
             fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
             fontWeight: '700',
             color: '#dc2626',
             marginBottom: '1rem'
           }}>
             In Crisis? Get Help Now
           </h3>
           <p style={{
             color: '#6b7280',
             fontSize: '1.1rem',
             marginBottom: '2rem',
             lineHeight: '1.6'
           }}>
             If you're having thoughts of self-harm, please reach out immediately. You matter, and help is available 24/7.
           </p>
           <div style={{
             display: 'flex',
             flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
             gap: '1rem',
             justifyContent: 'center'
           }}>
             <a href="tel:988" style={{
               background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
               color: 'white',
               textDecoration: 'none',
               padding: '1rem 2rem',
               borderRadius: '12px',
               fontWeight: '700',
               fontSize: '1.1rem',
               transition: 'all 0.3s ease',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '0.5rem'
             }}>
               📞 Call 988 - Crisis Lifeline
             </a>
             <a href="sms:741741" style={{
               background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
               color: 'white',
               textDecoration: 'none',
               padding: '1rem 2rem',
               borderRadius: '12px',
               fontWeight: '700',
               fontSize: '1.1rem',
               transition: 'all 0.3s ease',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '0.5rem'
             }}>
               💬 Text HOME to 741741
             </a>
           </div>
         </div>
       </div>
     </section>

     {/* Final CTA Section */}
     <section style={{
       padding: window.innerWidth <= 768 ? '4rem 1rem' : '6rem 2rem',
       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
       textAlign: 'center'
     }}>
       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
         <h2 style={{
           fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
           fontWeight: '800',
           color: 'white',
           marginBottom: '1rem'
         }}>
           Ready to Feel Better?
         </h2>
         <p style={{
           fontSize: '1.2rem',
           color: 'rgba(255, 255, 255, 0.9)',
           marginBottom: '3rem',
           lineHeight: '1.6'
         }}>
           Join thousands who have found peace with MindfulMe. Your mental health journey starts with a single step.
         </p>

         <Link to="/register" style={{
           background: 'white',
           color: '#667eea',
           textDecoration: 'none',
           padding: '1.25rem 2.5rem',
           borderRadius: '15px',
           fontWeight: '700',
           fontSize: '1.2rem',
           transition: 'all 0.3s ease',
           boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
           display: 'inline-block',
           marginBottom: '3rem'
         }}>
           ✨ Start Free Today - No Risk
         </Link>

         <div style={{
           display: 'flex',
           flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
           justifyContent: 'center',
           alignItems: 'center',
           gap: window.innerWidth <= 768 ? '1rem' : '3rem',
           marginBottom: '2rem'
         }}>
           <div style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem',
             color: 'rgba(255, 255, 255, 0.9)'
           }}>
             <span>🔒</span>
             <span>100% Privacy Guaranteed</span>
           </div>
           <div style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem',
             color: 'rgba(255, 255, 255, 0.9)'
           }}>
             <span>🆓</span>
             <span>Always Free Core Features</span>
           </div>
           <div style={{
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem',
             color: 'rgba(255, 255, 255, 0.9)'
           }}>
             <span>💝</span>
             <span>Cancel Anytime</span>
           </div>
         </div>

         <p style={{
           color: 'rgba(255, 255, 255, 0.8)',
           fontSize: '1rem'
         }}>
           Already have an account?{' '}
           <Link to="/login" style={{
             color: 'white',
             textDecoration: 'underline',
             fontWeight: '600'
           }}>
             Sign in here
           </Link>
         </p>
       </div>
     </section>

     {/* Footer */}
     <footer style={{
       background: '#1f2937',
       color: 'white',
       padding: window.innerWidth <= 768 ? '3rem 1rem 2rem' : '4rem 2rem 2rem'
     }}>
       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         {/* Footer Content */}
         <div style={{
           display: 'grid',
           gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '2fr 1fr 1fr 1fr 1fr',
           gap: window.innerWidth <= 768 ? '2rem' : '3rem',
           marginBottom: '3rem'
         }}>
           {/* Brand Column */}
           <div>
             <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: '0.5rem',
               marginBottom: '1rem'
             }}>
               <span style={{ fontSize: '2rem' }}>🧠</span>
               <span style={{
                 fontSize: '1.5rem',
                 fontWeight: '700'
               }}>
                 MindfulMe
               </span>
             </div>
             <p style={{
               color: '#9ca3af',
               lineHeight: '1.6',
               marginBottom: '1.5rem'
             }}>
               Your trusted companion for mental wellness. Find peace, track progress, and grow stronger every day.
             </p>
            </div>

           {/* Features Column */}
           <div>
             <h4 style={{
               fontSize: '1.1rem',
               fontWeight: '600',
               marginBottom: '1rem',
               color: 'white'
             }}>
               Features
             </h4>
             <ul style={{
               listStyle: 'none',
               padding: 0,
               margin: 0
             }}>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#features" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Mood Tracking
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#features" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Private Journaling
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#features" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Breathing Exercises
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#features" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Progress Insights
                 </a>
               </li>
             </ul>
           </div>

           {/* Company Column */}
           <div>
             <h4 style={{
               fontSize: '1.1rem',
               fontWeight: '600',
               marginBottom: '1rem',
               color: 'white'
             }}>
               Company
             </h4>
             <ul style={{
               listStyle: 'none',
               padding: 0,
               margin: 0
             }}>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   About Us
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Careers
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Press Kit
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Contact
                 </a>
               </li>
             </ul>
           </div>

           {/* Resources Column */}
           <div>
             <h4 style={{
               fontSize: '1.1rem',
               fontWeight: '600',
               marginBottom: '1rem',
               color: 'white'
             }}>
               Resources
             </h4>
             <ul style={{
               listStyle: 'none',
               padding: 0,
               margin: 0
             }}>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Blog
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Help Center
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#crisis" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Crisis Support
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Research
                 </a>
               </li>
             </ul>
           </div>

           {/* Legal Column */}
           <div>
             <h4 style={{
               fontSize: '1.1rem',
               fontWeight: '600',
               marginBottom: '1rem',
               color: 'white'
             }}>
               Legal
             </h4>
             <ul style={{
               listStyle: 'none',
               padding: 0,
               margin: 0
             }}>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Privacy Policy
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Terms of Service
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Security
                 </a>
               </li>
               <li style={{ marginBottom: '0.5rem' }}>
                 <a href="#" style={{
                   color: '#9ca3af',
                   textDecoration: 'none',
                   transition: 'color 0.3s ease'
                 }}>
                   Accessibility
                 </a>
               </li>
             </ul>
           </div>
         </div>

         {/* Footer Bottom */}
         <div style={{
           borderTop: '1px solid #374151',
           paddingTop: '2rem',
           display: 'flex',
           flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
           justifyContent: 'space-between',
           alignItems: 'center',
           gap: '1rem'
         }}>
           <p style={{
             color: '#9ca3af',
             margin: 0,
             fontSize: '0.9rem'
           }}>
             &copy; 2025 MindfulMe. All rights reserved. Made with 💝 for mental wellness.
           </p>
           <div style={{
             display: 'flex',
             flexWrap: 'wrap',
             gap: '1rem',
             justifyContent: 'center'
           }}>
             <span style={{
               background: '#374151',
               color: '#9ca3af',
               padding: '0.25rem 0.75rem',
               borderRadius: '6px',
               fontSize: '0.8rem',
               fontWeight: '600'
             }}>
               🔒 HIPAA Compliant
             </span>
             <span style={{
               background: '#374151',
               color: '#9ca3af',
               padding: '0.25rem 0.75rem',
               borderRadius: '6px',
               fontSize: '0.8rem',
               fontWeight: '600'
             }}>
               ⭐ 4.9/5 Rating
             </span>
             <span style={{
               background: '#374151',
               color: '#9ca3af',
               padding: '0.25rem 0.75rem',
               borderRadius: '6px',
               fontSize: '0.8rem',
               fontWeight: '600'
             }}>
               💙 Therapist Approved
             </span>
           </div>
         </div>
       </div>
     </footer>

    {/* CSS Animations */}
<style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes brainFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(5deg); }
  }
  
  .brain-animate {
    animation: brainFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
       }
 `}
</style>
 </div>
 );
}

export default Home;