import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const Resources = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  useEffect(() => {
    // Load favorites from user data or use empty array
    // Note: Avoiding localStorage as it's not supported in artifacts
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFavorite = (resourceId) => {
    const newFavorites = favorites.includes(resourceId)
      ? favorites.filter(id => id !== resourceId)
      : [...favorites, resourceId];
    
    setFavorites(newFavorites);
    // In a real app, you'd save this to your backend/user profile
  };

  const resources = [
    // Crisis Support
    {
      id: 1,
      title: "National Suicide Prevention Lifeline",
      description: "24/7 free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
      category: "crisis",
      type: "hotline",
      contact: "988",
      icon: "🆘",
      website: "https://suicidepreventionlifeline.org/",
      availability: "24/7",
      featured: true
    },
    {
      id: 2,
      title: "Crisis Text Line",
      description: "Free 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US.",
      category: "crisis",
      type: "text",
      contact: "Text HOME to 741741",
      icon: "💬",
      website: "https://www.crisistextline.org/",
      availability: "24/7",
      featured: true
    },
    {
      id: 3,
      title: "SAMHSA National Helpline",
      description: "Treatment referral and information service for mental health and substance abuse disorders.",
      category: "crisis",
      type: "hotline",
      contact: "1-800-662-4357",
      icon: "🏥",
      website: "https://www.samhsa.gov/find-help/national-helpline",
      availability: "24/7"
    },

    // Therapy & Counseling
    {
      id: 4,
      title: "BetterHelp",
      description: "Professional counseling online with licensed therapists. Start therapy from the comfort of your home.",
      category: "therapy",
      type: "online",
      contact: "Online Platform",
      icon: "👩‍⚕️",
      website: "https://www.betterhelp.com/",
      availability: "Flexible",
      featured: true
    },
    {
      id: 5,
      title: "Psychology Today",
      description: "Find therapists, psychiatrists, treatment centers, and support groups in your area.",
      category: "therapy",
      type: "directory",
      contact: "Online Directory",
      icon: "🔍",
      website: "https://www.psychologytoday.com/",
      availability: "Always available"
    },
    {
      id: 6,
      title: "Open Path Collective",
      description: "Affordable mental health care for individuals, families, and children. Sessions from $30-$60.",
      category: "therapy",
      type: "affordable",
      contact: "Online Directory",
      icon: "💰",
      website: "https://openpathcollective.org/",
      availability: "Varies"
    },

    // Self-Help & Apps
    {
      id: 7,
      title: "Headspace",
      description: "Meditation and mindfulness app with guided sessions for stress, sleep, and anxiety management.",
      category: "selfhelp",
      type: "app",
      contact: "Mobile App",
      icon: "🧘‍♀️",
      website: "https://www.headspace.com/",
      availability: "Always available"
    },
    {
      id: 8,
      title: "Calm",
      description: "Sleep stories, meditation, and relaxation tools to help reduce anxiety and improve sleep quality.",
      category: "selfhelp",
      type: "app",
      contact: "Mobile App",
      icon: "🌙",
      website: "https://www.calm.com/",
      availability: "Always available"
    },
    {
      id: 9,
      title: "Youper",
      description: "AI-powered emotional health assistant that helps track mood and provides personalized mental health insights.",
      category: "selfhelp",
      type: "app",
      contact: "Mobile App",
      icon: "🤖",
      website: "https://www.youper.ai/",
      availability: "Always available"
    },

    // Support Groups
    {
      id: 10,
      title: "NAMI Support Groups",
      description: "National Alliance on Mental Illness peer-led support groups for individuals and families.",
      category: "support",
      type: "group",
      contact: "Local Chapters",
      icon: "👥",
      website: "https://www.nami.org/Support-Education/Support-Groups",
      availability: "Scheduled meetings"
    },
    {
      id: 11,
      title: "Mental Health America",
      description: "Community-based mental health support groups and educational resources nationwide.",
      category: "support",
      type: "organization",
      contact: "Local Affiliates",
      icon: "🇺🇸",
      website: "https://www.mhanational.org/",
      availability: "Varies by location"
    },
    {
      id: 12,
      title: "7 Cups",
      description: "Free online therapy and emotional support through trained listeners and licensed therapists.",
      category: "support",
      type: "online",
      contact: "Online Platform",
      icon: "☕",
      website: "https://www.7cups.com/",
      availability: "24/7"
    },

    // Educational Resources
    {
      id: 13,
      title: "National Institute of Mental Health",
      description: "Comprehensive information about mental health conditions, treatments, and research findings.",
      category: "education",
      type: "information",
      contact: "Website",
      icon: "📚",
      website: "https://www.nimh.nih.gov/",
      availability: "Always available"
    },
    {
      id: 14,
      title: "Mental Health First Aid",
      description: "Learn how to help someone developing a mental health problem or experiencing a mental health crisis.",
      category: "education",
      type: "training",
      contact: "Course Registration",
      icon: "🎓",
      website: "https://www.mentalhealthfirstaid.org/",
      availability: "Scheduled courses"
    },
    {
      id: 15,
      title: "Anxiety and Depression Association",
      description: "Evidence-based information about anxiety, depression, and related conditions.",
      category: "education",
      type: "information",
      contact: "Website",
      icon: "🧠",
      website: "https://adaa.org/",
      availability: "Always available"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '🌟', count: resources.length },
    { id: 'crisis', name: 'Crisis Support', icon: '🆘', count: resources.filter(r => r.category === 'crisis').length },
    { id: 'therapy', name: 'Therapy & Counseling', icon: '👩‍⚕️', count: resources.filter(r => r.category === 'therapy').length },
    { id: 'selfhelp', name: 'Self-Help & Apps', icon: '📱', count: resources.filter(r => r.category === 'selfhelp').length },
    { id: 'support', name: 'Support Groups', icon: '👥', count: resources.filter(r => r.category === 'support').length },
    { id: 'education', name: 'Education', icon: '📚', count: resources.filter(r => r.category === 'education').length }
  ];

  // Filter resources based on active category and search term
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type) => {
    const colors = {
      hotline: '#ef4444',
      text: '#3b82f6',
      online: '#10b981',
      app: '#8b5cf6',
      directory: '#f59e0b',
      group: '#ec4899',
      organization: '#06b6d4',
      information: '#6366f1',
      training: '#f97316',
      affordable: '#22c55e'
    };
    return colors[type] || '#6b7280';
  };

  // Crisis Modal Component
  const CrisisModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => setShowCrisisModal(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ✕
        </button>
        
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
          Need Immediate Help?
        </h2>
        <p style={{ color: '#374151', marginBottom: '2rem', lineHeight: '1.6' }}>
          If you're having thoughts of suicide or are in immediate danger, please reach out for help right now.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a
            href="tel:988"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: '#dc2626',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            📞 Call 988 - Suicide Prevention Lifeline
          </a>
          <a
            href="sms:741741?body=HOME"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            💬 Text HOME to 741741
          </a>
          <a
            href="tel:911"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: '#dc2626',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            🚨 Emergency 911
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {showCrisisModal && <CrisisModal />}
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '100px 1rem 2rem 1rem' : '120px 2rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 0.5rem 0'
            }}>
              📚 Mental Health Resources
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '1.1rem',
              margin: '0 0 1.5rem 0'
            }}>
              Comprehensive resources for mental health support, therapy, and wellness
            </p>

            {/* Search Bar */}
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                color: '#9ca3af'
              }}>
                🔍
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#dc2626',
              margin: '0 0 0.5rem 0',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              🚨 In Crisis? Get Help Now
            </h3>
            <p style={{
              color: '#7f1d1d',
              margin: '0 0 1rem 0',
              lineHeight: '1.5'
            }}>
              If you're having thoughts of suicide or are in immediate danger, please reach out for help immediately.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <a
                href="tel:988"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#dc2626',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#dc2626';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                📞 Call 988
              </a>
              <a
                href="sms:741741?body=HOME"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#dc2626',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#dc2626';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                💬 Text 741741
              </a>
              <button
                onClick={() => setShowCrisisModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#b91c1c';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#dc2626';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🆘 Crisis Help
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#2d3748',
              margin: '0 0 1rem 0',
              textAlign: 'center'
            }}>
              Browse by Category
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    background: activeCategory === category.id 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                      : 'white',
                    color: activeCategory === category.id ? 'white' : '#374151',
                    border: activeCategory === category.id ? 'none' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    if (activeCategory !== category.id) {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeCategory !== category.id) {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    {category.icon}
                  </div>
                  <div>{category.name}</div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    opacity: 0.8,
                    marginTop: '0.25rem'
                  }}>
                    {category.count} resources
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredResources.map(resource => (
              <div key={resource.id} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: resource.featured ? '0 10px 30px rgba(102, 126, 234, 0.2)' : '0 10px 30px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                border: resource.featured ? '2px solid rgba(102, 126, 234, 0.3)' : 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = resource.featured ? '0 20px 40px rgba(102, 126, 234, 0.3)' : '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = resource.featured ? '0 10px 30px rgba(102, 126, 234, 0.2)' : '0 10px 30px rgba(0,0,0,0.1)';
              }}>
                
                {/* Featured Badge */}
                {resource.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '1rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    ⭐ Featured
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(resource.id)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {favorites.includes(resource.id) ? '❤️' : '🤍'}
                </button>

                {/* Resource Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1rem',
                  marginTop: resource.featured ? '1rem' : '0'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    flexShrink: 0
                  }}>
                    {resource.icon}
                  </div>
                  <div style={{ flex: 1, paddingRight: '2rem' }}>
                    <h3 style={{
                      color: '#2d3748',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.3'
                    }}>
                      {resource.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        background: getTypeColor(resource.type),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {resource.type}
                      </span>
                      <span style={{
                        background: '#f1f5f9',
                        color: '#64748b',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {resource.availability}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Resource Description */}
                <p style={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: '0 0 1.5rem 0'
                }}>
                  {resource.description}
                </p>

                {/* Contact Information */}
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#374151',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    📞 Contact: {resource.contact}
                  </div>
                  {resource.availability && (
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#64748b'
                    }}>
                      🕒 Available: {resource.availability}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    🌐 Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{
                color: '#2d3748',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                No Resources Found
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                Try adjusting your search terms or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🔄 Clear Filters
              </button>
            </div>
          )}

          {/* Statistics Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#2d3748',
              margin: '0 0 1.5rem 0',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}>
              📊 Resource Statistics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🆘</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {resources.filter(r => r.category === 'crisis').length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Crisis Support</div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👩‍⚕️</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                  {resources.filter(r => r.category === 'therapy').length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Therapy Options</div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                  {resources.filter(r => r.category === 'selfhelp').length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Self-Help Apps</div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ec4899' }}>
                  {favorites.length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Your Favorites</div>
              </div>
            </div>
          </div>

          {/* Quick Access Actions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: '#2d3748',
              margin: '0 0 1.5rem 0',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}>
              🚀 Quick Actions
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              <button
                onClick={() => setActiveCategory('crisis')}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🆘</div>
                <div>Crisis Resources</div>
              </button>
              
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('therapy');
                }}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
                <div>Find Therapy</div>
              </button>
              
              <button
                onClick={() => setActiveCategory('selfhelp')}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
                <div>Self-Help Apps</div>
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#2d3748',
              margin: '0 0 1rem 0'
            }}>
              💡 Important Note
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              margin: '0 0 1rem 0'
            }}>
              These resources are provided for informational purposes and are not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of qualified mental health professionals with any questions you may have 
              regarding a medical condition.
            </p>
            <p style={{
              color: '#dc2626',
              fontSize: '0.9rem',
              fontWeight: '600',
              margin: 0
            }}>
              If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
