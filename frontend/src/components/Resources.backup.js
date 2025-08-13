import React, { useState } from 'react';
import Navigation from './Navigation';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    // Crisis & Emergency Resources
    {
      id: 1,
      category: 'crisis',
      title: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support 24/7 for people in distress and prevention resources.',
      contact: '988',
      website: 'https://988lifeline.org',
      type: 'hotline',
      urgent: true
    },
    {
      id: 2,
      category: 'crisis',
      title: 'Crisis Text Line',
      description: 'Free, 24/7 support via text message for people in crisis.',
      contact: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      type: 'text',
      urgent: true
    },
    {
      id: 3,
      category: 'crisis',
      title: 'National Domestic Violence Hotline',
      description: '24/7 confidential support for domestic violence survivors.',
      contact: '1-800-799-7233',
      website: 'https://thehotline.org',
      type: 'hotline',
      urgent: true
    },
    {
      id: 4,
      category: 'crisis',
      title: 'LGBTQ+ National Hotline',
      description: 'Confidential support for LGBTQ+ individuals in crisis.',
      contact: '1-888-843-4564',
      website: 'https://lgbthotline.org',
      type: 'hotline',
      urgent: true
    },
    {
      id: 5,
      category: 'crisis',
      title: 'Veterans Crisis Line',
      description: 'Free, confidential support for veterans and their families.',
      contact: '1-800-273-8255',
      website: 'https://veteranscrisisline.net',
      type: 'hotline',
      urgent: true
    },

    // Professional Help
    {
      id: 6,
      category: 'professional',
      title: 'Psychology Today Therapist Finder',
      description: 'Find licensed therapists, psychiatrists, and support groups in your area.',
      website: 'https://psychologytoday.com',
      type: 'directory'
    },
    {
      id: 7,
      category: 'professional',
      title: 'NAMI (National Alliance on Mental Illness)',
      description: 'Mental health support, education, and advocacy organization.',
      contact: '1-800-950-6264',
      website: 'https://nami.org',
      type: 'organization'
    },
    {
      id: 8,
      category: 'professional',
      title: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service for mental health and substance abuse.',
      contact: '1-800-662-4357',
      website: 'https://samhsa.gov',
      type: 'hotline'
    },
    {
      id: 9,
      category: 'professional',
      title: 'BetterHelp Online Therapy',
      description: 'Professional online counseling and therapy services.',
      website: 'https://betterhelp.com',
      type: 'online-therapy'
    },
    {
      id: 10,
      category: 'professional',
      title: 'Talkspace Online Therapy',
      description: 'Text-based therapy and video sessions with licensed therapists.',
      website: 'https://talkspace.com',
      type: 'online-therapy'
    },

    // Self-Help Tools
    {
      id: 11,
      category: 'self-help',
      title: 'Headspace Meditation App',
      description: 'Guided meditation, mindfulness, and sleep stories.',
      website: 'https://headspace.com',
      type: 'app'
    },
    {
      id: 12,
      category: 'self-help',
      title: 'Calm Meditation App',
      description: 'Meditation, sleep stories, and relaxation techniques.',
      website: 'https://calm.com',
      type: 'app'
    },
    {
      id: 13,
      category: 'self-help',
      title: 'Insight Timer',
      description: 'Free meditation app with thousands of guided meditations.',
      website: 'https://insighttimer.com',
      type: 'app'
    },
    {
      id: 14,
      category: 'self-help',
      title: 'MindShift Anxiety App',
      description: 'CBT-based app for managing anxiety and worry.',
      website: 'https://anxietycanada.com/resources/mindshift-app',
      type: 'app'
    },

    // Educational Resources
    {
      id: 15,
      category: 'educational',
      title: 'Mental Health America',
      description: 'Comprehensive mental health information and screening tools.',
      website: 'https://mhanational.org',
      type: 'website'
    },
    {
      id: 16,
      category: 'educational',
      title: 'NIMH (National Institute of Mental Health)',
      description: 'Research-based information on mental health conditions and treatments.',
      website: 'https://nimh.nih.gov',
      type: 'website'
    },
    {
      id: 17,
      category: 'educational',
      title: 'Anxiety and Depression Association',
      description: 'Educational resources about anxiety, depression, and related disorders.',
      website: 'https://adaa.org',
      type: 'website'
    },

    // Support Communities
    {
      id: 18,
      category: 'community',
      title: 'NAMI Support Groups',
      description: 'Local peer support groups for individuals and families.',
      website: 'https://nami.org/Support-Education/Support-Groups',
      type: 'support-group'
    },
    {
      id: 19,
      category: 'community',
      title: 'Depression and Bipolar Support Alliance',
      description: 'Peer support groups and online communities.',
      website: 'https://dbsalliance.org',
      type: 'support-group'
    },
    {
      id: 20,
      category: 'community',
      title: '7 Cups Online Support',
      description: 'Free emotional support through active listening and counseling.',
      website: 'https://7cups.com',
      type: 'online-support'
    },

    // Specialized Resources
    {
      id: 21,
      category: 'specialized',
      title: 'JED Campus Mental Health',
      description: 'Mental health resources specifically for college students.',
      website: 'https://jedfoundation.org',
      type: 'student'
    },
    {
      id: 22,
      category: 'specialized',
      title: 'National Eating Disorders Association',
      description: 'Support and resources for eating disorder recovery.',
      contact: '1-800-931-2237',
      website: 'https://nationaleatingdisorders.org',
      type: 'specialized'
    },
    {
      id: 23,
      category: 'specialized',
      title: 'Postpartum Support International',
      description: 'Support for perinatal mental health conditions.',
      contact: '1-944-944-4773',
      website: 'https://postpartum.net',
      type: 'specialized'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'crisis', name: 'Crisis Support', icon: '🚨' },
    { id: 'professional', name: 'Professional Help', icon: '🏥' },
    { id: 'self-help', name: 'Self-Help Tools', icon: '🧘' },
    { id: 'educational', name: 'Learn More', icon: '📖' },
    { id: 'community', name: 'Support Groups', icon: '👥' },
    { id: 'specialized', name: 'Specialized Care', icon: '🎯' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (number) => {
    window.open('tel:' + number, '_self');
  };

  const handleWebsite = (url) => {
    window.open(url, '_blank');
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'hotline': return '📞';
      case 'text': return '💬';
      case 'app': return '📱';
      case 'website': return '🌐';
      case 'directory': return '🔍';
      case 'online-therapy': return '💻';
      case 'support-group': return '👥';
      case 'online-support': return '🤝';
      case 'organization': return '🏢';
      case 'student': return '🎓';
      case 'specialized': return '🎯';
      default: return '📋';
    }
  };

  return (
    <div>
      <Navigation />
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              📚 Mental Health Resources
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Find support, tools, and information to help you on your mental health journey. 
              Remember: you are not alone, and help is always available.
            </p>
          </div>

          {/* Emergency Banner */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.95)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
              🚨 In Crisis? Get Help Now
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleCall('988')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📞 Call 988
              </button>
              <button
                onClick={() => window.open('sms:741741?body=HOME', '_self')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                💬 Text 741741
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="🔍 Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  border: 'none',
                  borderRadius: '10px',
                  background: 'white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id 
                      ? 'white' 
                      : 'rgba(255, 255, 255, 0.2)',
                    color: selectedCategory === category.id 
                      ? '#667eea' 
                      : 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
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
            gap: '1.5rem'
          }}>
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                style={{
                  background: resource.urgent 
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))'
                    : 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: resource.urgent ? '2px solid rgba(255, 255, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{getResourceIcon(resource.type)}</span>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: resource.urgent ? 'white' : '#334155',
                    margin: 0
                  }}>
                    {resource.title}
                  </h3>
                </div>

                <p style={{
                  color: resource.urgent ? 'rgba(255, 255, 255, 0.9)' : '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {resource.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {resource.contact && (
                    <button
                      onClick={() => {
                        if (resource.contact.includes('Text')) {
                          window.open('sms:741741?body=HOME', '_self');
                        } else {
                          handleCall(resource.contact.replace(/\D/g, ''));
                        }
                      }}
                      style={{
                        background: resource.urgent ? 'rgba(255, 255, 255, 0.2)' : '#667eea',
                        color: 'white',
                        border: resource.urgent ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {resource.contact}
                    </button>
                  )}
                  {resource.website && (
                    <button
                      onClick={() => handleWebsite(resource.website)}
                      style={{
                        background: resource.urgent ? 'rgba(255, 255, 255, 0.2)' : '#10b981',
                        color: 'white',
                        border: resource.urgent ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      🌐 Visit Website
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
              💙 Remember: Seeking Help is a Sign of Strength
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Taking care of your mental health is just as important as taking care of your physical health.
              These resources are here to support you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;