import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/api/resources`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResources(response.data.resources || []);
    } catch (error) {
      console.error('Resources fetch error:', error);
      setResources(defaultResources);
    } finally {
      setLoading(false);
    }
  };

  const defaultResources = [
    {
      id: 1,
      title: 'Crisis Hotlines',
      description: 'Immediate help when you need it most',
      category: 'emergency',
      urgent: true,
      icon: '🚨',
      content: [
        '🇺🇸 National Suicide Prevention Lifeline: 988',
        '📱 Crisis Text Line: Text HOME to 741741',
        '🌍 International Association for Suicide Prevention',
        '📞 SAMHSA National Helpline: 1-800-662-4357'
      ]
    },
    {
      id: 2,
      title: 'Breathing Techniques',
      description: 'Simple exercises to calm your mind',
      category: 'self-care',
      icon: '🫁',
      content: [
        '4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8',
        'Box Breathing: 4 counts in, hold 4, out 4, hold 4',
        'Belly Breathing: Focus on expanding your diaphragm',
        'Progressive Muscle Relaxation'
      ]
    },
    {
      id: 3,
      title: 'Mindfulness & Meditation',
      description: 'Practices for present-moment awareness',
      category: 'mindfulness',
      icon: '🧘',
      content: [
        'Daily 10-minute meditation practice',
        'Body scan meditation techniques',
        'Mindful walking exercises',
        'Gratitude and loving-kindness practices'
      ]
    },
    {
      id: 4,
      title: 'Professional Help',
      description: 'Finding qualified mental health professionals',
      category: 'professional',
      icon: '👩‍⚕️',
      content: [
        '🔍 Psychology Today: Find local therapists',
        '💻 BetterHelp: Online therapy platform',
        '🏥 Local community mental health centers',
        '💼 Employee assistance programs (EAP)'
      ]
    },
    {
      id: 5,
      title: 'Stress Management',
      description: 'Tools and techniques for managing daily stress',
      category: 'self-care',
      icon: '😌',
      content: [
        'Time management and prioritization',
        'Setting healthy boundaries',
        'Regular exercise and movement',
        'Healthy sleep hygiene practices'
      ]
    },
    {
      id: 6,
      title: 'Anxiety Support',
      description: 'Resources specifically for anxiety management',
      category: 'anxiety',
      icon: '💙',
      content: [
        'Grounding techniques (5-4-3-2-1 method)',
        'Cognitive behavioral therapy (CBT) techniques',
        'Anxiety and Depression Association resources',
        'Panic attack management strategies'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '🌟' },
    { id: 'emergency', name: 'Crisis Support', icon: '🚨' },
    { id: 'self-care', name: 'Self-Care', icon: '💚' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧘' },
    { id: 'professional', name: 'Professional Help', icon: '👩‍⚕️' },
    { id: 'anxiety', name: 'Anxiety', icon: '💙' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Loading Resources...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: window.innerWidth > 768 ? '3rem' : '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            📚 Mental Health Resources
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#5a6c7d'
          }}>
            Find support, tools, and information for your mental wellness journey
          </p>
        </div>

        {/* Crisis Support Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onClick={() => setSelectedCategory('emergency')}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
            🚨 In Crisis? Get Immediate Help
          </h3>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            24/7 support available • Click for crisis resources
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="🔍 Search resources, techniques, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '0.5rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '12px',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                    : '#f8f9fa',
                  color: selectedCategory === category.id ? 'white' : '#374151',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: resource.urgent ? '3px solid #ef4444' : 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  background: resource.urgent ? '#ef4444' : 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '15px',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {resource.icon}
                </div>
                <div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    color: '#2d4654',
                    fontSize: '1.3rem'
                  }}>
                    {resource.title}
                    {resource.urgent && (
                      <span style={{
                        marginLeft: '0.5rem',
                        background: '#ef4444',
                        color: 'white',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem'
                      }}>
                        URGENT
                      </span>
                    )}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '0.9rem'
                  }}>
                    {resource.description}
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h4 style={{
                  margin: '0 0 1rem 0',
                  color: '#374151',
                  fontSize: '1rem'
                }}>
                  Available Resources:
                </h4>
                <ul style={{
                  margin: 0,
                  padding: '0 0 0 1rem',
                  color: '#4b5563'
                }}>
                  {resource.content.map((item, index) => (
                    <li key={index} style={{
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      lineHeight: '1.4'
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {resource.urgent && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                  borderRadius: '12px',
                  border: '1px solid #ef4444'
                }}>
                  <p style={{
                    margin: 0,
                    color: '#dc2626',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    ⚠️ If you're in immediate danger, call 911 or go to your nearest emergency room.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredResources.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#374151', marginBottom: '1rem' }}>No Resources Found</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔄 Clear Filters
            </button>
          </div>
        )}

        {/* Additional Support Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#2d4654',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            💪 Need More Support?
          </h3>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            Remember, seeking help is a sign of strength. You don't have to face challenges alone.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedCategory('professional')}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👩‍⚕️</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Find a Therapist</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                Connect with qualified mental health professionals
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/breathing'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧘</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Practice Mindfulness</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                Try our guided breathing exercises
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/journal'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Start Journaling</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                Express your thoughts and feelings
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '1.5rem',
          textAlign: 'center',
          marginBottom: '2rem',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '0.9rem'
          }}>
            💙 These resources are for educational purposes and don't replace professional medical advice. 
            If you're experiencing a mental health emergency, please contact emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
