import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Resources = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedResources, setSavedResources] = useState([]);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const categories = [
    { id: 'all', name: 'All Resources', icon: '🌟', color: 'linear-gradient(135deg, var(--primary), var(--accent))' },
    { id: 'anxiety', name: 'Anxiety', icon: '😰', color: 'linear-gradient(135deg, #f59e0b, #f97316)' },
    { id: 'depression', name: 'Depression', icon: '😔', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    { id: 'stress', name: 'Stress', icon: '😵', color: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { id: 'sleep', name: 'Sleep', icon: '😴', color: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
    { id: 'meditation', name: 'Meditation', icon: '🧘', color: 'linear-gradient(135deg, #10b981, #059669)' },
    { id: 'therapy', name: 'Therapy', icon: '💬', color: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
    { id: 'crisis', name: 'Crisis Support', icon: '🆘', color: 'linear-gradient(135deg, #dc2626, #b91c1c)' }
  ];

  const resources = [
    // Anxiety Resources
    {
      id: 1,
      title: "Understanding Anxiety Disorders",
      description: "Comprehensive guide to different types of anxiety and coping strategies",
      category: "anxiety",
      type: "article",
      url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      source: "NIMH",
      duration: "10 min read",
      rating: 4.8,
      tags: ["anxiety", "education", "coping"]
    },
    {
      id: 2,
      title: "5-4-3-2-1 Grounding Technique",
      description: "Quick anxiety relief technique using your five senses",
      category: "anxiety",
      type: "technique",
      content: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste",
      duration: "2-5 minutes",
      rating: 4.9,
      tags: ["anxiety", "grounding", "quick-relief"]
    },
    {
      id: 3,
      title: "Anxiety and Depression Association",
      description: "Professional resources and support groups for anxiety disorders",
      category: "anxiety",
      type: "organization",
      url: "https://adaa.org",
      source: "ADAA",
      rating: 4.7,
      tags: ["anxiety", "support", "professional"]
    },

    // Depression Resources
    {
      id: 4,
      title: "Depression: More Than Just Sadness",
      description: "Understanding the symptoms and treatment options for depression",
      category: "depression",
      type: "article",
      url: "https://www.nimh.nih.gov/health/topics/depression",
      source: "NIMH",
      duration: "15 min read",
      rating: 4.8,
      tags: ["depression", "education", "treatment"]
    },
    {
      id: 5,
      title: "Behavioral Activation Techniques",
      description: "Evidence-based strategies to combat depression through activity scheduling",
      category: "depression",
      type: "technique",
      content: "Schedule pleasant activities daily, start with small achievable goals, track your mood before and after activities",
      duration: "Ongoing practice",
      rating: 4.6,
      tags: ["depression", "behavioral", "activity"]
    },
    {
      id: 6,
      title: "National Alliance on Mental Illness",
      description: "Support groups, education, and advocacy for mental health conditions",
      category: "depression",
      type: "organization",
      url: "https://nami.org",
      source: "NAMI",
      rating: 4.9,
      tags: ["depression", "support", "advocacy"]
    },

    // Stress Management
    {
      id: 7,
      title: "Progressive Muscle Relaxation",
      description: "Systematic technique to reduce physical tension and stress",
      category: "stress",
      type: "technique",
      content: "Tense and relax each muscle group for 5 seconds, starting from your toes and working up to your head",
      duration: "10-20 minutes",
      rating: 4.7,
      tags: ["stress", "relaxation", "physical"]
    },
    {
      id: 8,
      title: "Stress Management Strategies",
      description: "Evidence-based approaches to managing daily stress",
      category: "stress",
      type: "article",
      url: "https://www.apa.org/topics/stress",
      source: "APA",
      duration: "12 min read",
      rating: 4.5,
      tags: ["stress", "management", "daily"]
    },

    // Sleep Resources
    {
      id: 9,
      title: "Sleep Hygiene Guidelines",
      description: "Essential practices for better sleep quality and mental health",
      category: "sleep",
      type: "article",
      url: "https://www.sleepfoundation.org/how-sleep-works/sleep-hygiene",
      source: "Sleep Foundation",
      duration: "8 min read",
      rating: 4.8,
      tags: ["sleep", "hygiene", "quality"]
    },
    {
      id: 10,
      title: "4-7-8 Breathing for Sleep",
      description: "Breathing technique to help you fall asleep faster",
      category: "sleep",
      type: "technique",
      content: "Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. Repeat 4 cycles.",
      duration: "2-3 minutes",
      rating: 4.6,
      tags: ["sleep", "breathing", "insomnia"]
    },

    // Meditation Resources
    {
      id: 11,
      title: "Mindfulness-Based Stress Reduction",
      description: "Introduction to MBSR practices and benefits",
      category: "meditation",
      type: "article",
      url: "https://www.mindful.org/meditation/mindfulness-getting-started",
      source: "Mindful.org",
      duration: "10 min read",
      rating: 4.9,
      tags: ["meditation", "mindfulness", "stress"]
    },
    {
      id: 12,
      title: "Loving-Kindness Meditation",
      description: "Practice compassion towards yourself and others",
      category: "meditation",
      type: "technique",
      content: "Begin with 'May I be happy, may I be healthy, may I be at peace' then extend to others",
      duration: "10-15 minutes",
      rating: 4.7,
      tags: ["meditation", "compassion", "loving-kindness"]
    },

    // Therapy Resources
    {
      id: 13,
      title: "Finding the Right Therapist",
      description: "Guide to choosing a mental health professional that fits your needs",
      category: "therapy",
      type: "article",
      url: "https://www.apa.org/topics/therapy/psychotherapy-approaches",
      source: "APA",
      duration: "15 min read",
      rating: 4.8,
      tags: ["therapy", "finding", "professional"]
    },
    {
      id: 14,
      title: "Psychology Today Therapist Directory",
      description: "Find therapists in your area with detailed profiles and specialties",
      category: "therapy",
      type: "directory",
      url: "https://www.psychologytoday.com/us/therapists",
      source: "Psychology Today",
      rating: 4.5,
      tags: ["therapy", "directory", "local"]
    },

    // Crisis Support
    {
      id: 15,
      title: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support and suicide prevention",
      category: "crisis",
      type: "hotline",
      phone: "988",
      url: "https://suicidepreventionlifeline.org",
      source: "NSPL",
      rating: 5.0,
      tags: ["crisis", "suicide", "24/7"]
    },
    {
      id: 16,
      title: "Crisis Text Line",
      description: "Free, 24/7 support via text message",
      category: "crisis",
      type: "text",
      phone: "Text HOME to 741741",
      url: "https://www.crisistextline.org",
      source: "Crisis Text Line",
      rating: 4.9,
      tags: ["crisis", "text", "24/7"]
    },
    {
      id: 17,
      title: "SAMHSA National Helpline",
      description: "Treatment referral and information service",
      category: "crisis",
      type: "hotline",
      phone: "1-800-662-4357",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      source: "SAMHSA",
      rating: 4.8,
      tags: ["crisis", "treatment", "referral"]
    }
  ];

  useEffect(() => {
    // Load saved resources from localStorage
    const saved = JSON.parse(localStorage.getItem('savedResources') || '[]');
    setSavedResources(saved);

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveResource = (resourceId) => {
    const newSaved = savedResources.includes(resourceId) 
      ? savedResources.filter(id => id !== resourceId)
      : [...savedResources, resourceId];
    
    setSavedResources(newSaved);
    localStorage.setItem('savedResources', JSON.stringify(newSaved));
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'article': return '📚';
      case 'technique': return '🛠️';
      case 'organization': return '🏢';
      case 'hotline': return '📞';
      case 'text': return '💬';
      case 'directory': return '📋';
      default: return '🔗';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'article': return '#3b82f6';
      case 'technique': return '#10b981';
      case 'organization': return '#8b5cf6';
      case 'hotline': return '#ef4444';
      case 'text': return '#f59e0b';
      case 'directory': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--light), #f0f9ff)',
      padding: isMobile ? '1rem' : '2rem'
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
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>📚 Mental Health Resources</h1>
          <p style={{
            color: 'var(--dark)',
            opacity: 0.8,
            fontSize: isMobile ? '1rem' : '1.1rem'
          }}>
            Find support, tools, and information for your mental wellness journey
          </p>
        </div>

        {/* Crisis Alert */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: 'white',
            padding: isMobile ? '1rem' : '1rem 2rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(220, 38, 38, 0.3)'
          }}
          onClick={() => setShowCrisisModal(true)}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(220, 38, 38, 0.3)';
          }}
        >
          <strong style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>🆘 In Crisis? Get Immediate Help</strong>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: isMobile ? '0.9rem' : '1rem' }}>
            24/7 support available • Click for crisis resources
          </p>
        </div>

        {/* Search */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <input
            type="text"
            placeholder="🔍 Search resources, techniques, or topics..."
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '15px',
              border: '2px solid #e5e7eb',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(124, 165, 184, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Categories */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(120px, 1fr))' : 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {categories.map(category => (
            <div
              key={category.id}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: isMobile ? '1rem' : '1.5rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
                border: activeCategory === category.id ? '2px solid var(--primary)' : '2px solid transparent',
                transform: activeCategory === category.id ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onClick={() => setActiveCategory(category.id)}
              onMouseOver={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }
              }}
              onMouseOut={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                }
              }}
            >
              <div style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                marginBottom: '0.5rem'
              }}>{category.icon}</div>
              <div style={{
                fontWeight: '600',
                color: 'var(--dark)',
                fontSize: isMobile ? '0.8rem' : '0.9rem'
              }}>{category.name}</div>
            </div>
          ))}
        </div>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredResources.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280',
              gridColumn: '1 / -1'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3>No resources found</h3>
              <p>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            filteredResources.map(resource => (
              <div
                key={resource.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'white',
                    flexShrink: 0,
                    background: getTypeColor(resource.type)
                  }}>
                    <span>{getTypeIcon(resource.type)}</span>
                    <span>{resource.type}</span>
                  </div>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      flexShrink: 0,
                      color: savedResources.includes(resource.id) ? '#f59e0b' : '#d1d5db'
                    }}
                    onClick={() => saveResource(resource.id)}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(0,0,0,0.05)';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'none';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {savedResources.includes(resource.id) ? '⭐' : '☆'}
                  </button>
                </div>

                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: 'var(--dark)',
                  marginBottom: '0.8rem',
                  lineHeight: '1.3'
                }}>{resource.title}</h3>
                
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>{resource.description}</p>

                {resource.content && (
                  <div style={{
                    background: 'rgba(124, 165, 184, 0.05)',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontStyle: 'italic',
                    color: 'var(--dark)',
                    marginTop: '1rem',
                    border: '1px solid rgba(124, 165, 184, 0.2)'
                  }}>
                    <strong>How to use:</strong> {resource.content}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}>
                  {resource.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.2rem 0.8rem',
                      background: 'rgba(124, 165, 184, 0.1)',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      color: 'var(--primary)',
                      fontWeight: '500'
                    }}>#{tag}</span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  padding: '1rem 0',
                  borderTop: '1px solid #f3f4f6',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--primary)',
                    fontWeight: '600'
                  }}>
                    {resource.source}
                  </div>
                  {resource.duration && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      background: '#f8fafc',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px'
                    }}>
                      ⏱️ {resource.duration}
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.9rem',
                    color: '#f59e0b'
                  }}>
                    <span>⭐</span>
                    <span>{resource.rating}</span>
                  </div>
                </div>

                {resource.url && (
                  <button
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: '12px',
                      border: 'none',
                      background: resource.type === 'hotline' ? 
                        'linear-gradient(135deg, #dc2626, #b91c1c)' : 
                        'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onClick={() => window.open(resource.url, '_blank')}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(124, 165, 184, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {resource.type === 'hotline' ? '📞 Call Now' : 
                     resource.type === 'text' ? '💬 Start Chat' :
                     '🔗 Visit Resource'}
                  </button>
                )}

                {resource.phone && (
                  <div style={{
                    textAlign: 'center',
                    padding: '1rem',
                    background: '#fef2f2',
                    borderRadius: '10px',
                    marginTop: '1rem',
                    fontWeight: '600',
                    color: '#dc2626'
                  }}>
                    📱 {resource.phone}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Crisis Modal */}
        {showCrisisModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }} onClick={() => setShowCrisisModal(false)}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative'
            }} onClick={(e) => e.stopPropagation()}>
              <button
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                onClick={() => setShowCrisisModal(false)}
              >
                ✕
              </button>
              
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: '1rem'
              }}>🆘 Crisis Support Resources</h2>
              <p style={{ color: '#6b7280' }}>
                If you're in immediate danger, call 911 or go to your nearest emergency room.
              </p>
            </div>

              {resources.filter(r => r.category === 'crisis').map(crisis => (
                <div key={crisis.id} style={{
                  padding: '1rem',
                  background: '#fef2f2',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  border: '1px solid #fecaca'
                }}>
                  <h3 style={{ color: '#dc2626', marginBottom: '0.5rem' }}>
                    {crisis.title}
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    {crisis.description}
                  </p>
                  {crisis.phone && (
                    <div style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      📱 {crisis.phone}
                    </div>
                  )}
                  {crisis.url && (
                    <button
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => window.open(crisis.url, '_blank')}
                    >
                      🔗 Visit Website
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helpful Tips */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginTop: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ 
            color: 'var(--dark)', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            💡 How to Use These Resources
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: '#f0f9ff',
              borderRadius: '15px',
              border: '1px solid #bfdbfe'
            }}>
              <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>
                🎯 Getting Started
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#374151' }}>
                <li style={{ marginBottom: '0.5rem' }}>Start with resources that match your current needs</li>
                <li style={{ marginBottom: '0.5rem' }}>Save helpful resources using the star button</li>
                <li style={{ marginBottom: '0.5rem' }}>Try techniques during calm moments first</li>
                <li style={{ marginBottom: '0.5rem' }}>Don't hesitate to seek professional help</li>
              </ul>
            </div>
            
            <div style={{
              padding: '1.5rem',
              background: '#f0fdf4',
              borderRadius: '15px',
              border: '1px solid #bbf7d0'
            }}>
              <h4 style={{ color: '#166534', marginBottom: '1rem' }}>
                🌱 Building Your Toolkit
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#374151' }}>
                <li style={{ marginBottom: '0.5rem' }}>Combine different types of resources</li>
                <li style={{ marginBottom: '0.5rem' }}>Practice techniques regularly</li>
                <li style={{ marginBottom: '0.5rem' }}>Keep crisis resources easily accessible</li>
                <li style={{ marginBottom: '0.5rem' }}>Share helpful resources with trusted friends</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          padding: '2rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>
            💬 Need More Help?
          </h3>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            Remember, seeking help is a sign of strength. If you need additional support or have questions about these resources, don't hesitate to reach out.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}
              onClick={() => setShowCrisisModal(true)}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🆘 Crisis Resources
            </button>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}
              onClick={() => setActiveCategory('therapy')}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              💬 Find a Therapist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
