import React, { useState, useEffect } from 'react';

const Resources = () => {
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [alarmOpen, setAlarmOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add this useEffect after your existing useEffect
  useEffect(() => {
    if (alarmOpen) {
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when popup is closed
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [alarmOpen]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const resources = [
    {
      id: 1,
      category: 'crisis',
      title: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential emotional support 24/7 for people in suicidal crisis or emotional distress.',
      contact: '988',
      website: 'https://988lifeline.org',
      urgent: true,
      emoji: '🆘',
    },
    {
      id: 2,
      category: 'crisis',
      title: 'Crisis Text Line',
      description: 'Free, 24/7 crisis support via text message with trained crisis counselors.',
      contact: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      urgent: true,
      emoji: '💬',
    },
    {
      id: 3,
      category: 'crisis',
      title: 'National Domestic Violence Hotline',
      description: 'Confidential support for domestic violence survivors and their loved ones, available 24/7.',
      contact: '1-800-799-7233',
      website: 'https://thehotline.org',
      urgent: true,
      emoji: '🛡️',
    },
    {
      id: 4,
      category: 'professional',
      title: 'Psychology Today Therapist Directory',
      description: 'Comprehensive directory to find licensed therapists and mental health professionals.',
      website: 'https://psychologytoday.com',
      emoji: '👩‍⚕️',
    },
    {
      id: 5,
      category: 'professional',
      title: 'BetterHelp Online Therapy',
      description: 'Professional online counseling with licensed, accredited therapists.',
      website: 'https://betterhelp.com',
      cost: '$60-90/week',
      emoji: '💻',
    },
    {
      id: 6,
      category: 'support',
      title: 'National Alliance on Mental Illness (NAMI)',
      description: 'Largest grassroots mental health organization providing education, support groups, and advocacy.',
      contact: '1-800-950-6264',
      website: 'https://nami.org',
      emoji: '🤝',
    },
    {
      id: 7,
      category: 'support',
      title: 'Anxiety and Depression Association of America',
      description: 'Educational resources and support for anxiety, depression, and related disorders.',
      website: 'https://adaa.org',
      emoji: '🧠',
    },
    {
      id: 8,
      category: 'wellness',
      title: 'Headspace: Meditation and Mindfulness',
      description: 'Guided meditation, sleep stories, and mindfulness exercises for mental wellness.',
      website: 'https://headspace.com',
      emoji: '🧘‍♂️',
    },
    {
      id: 9,
      category: 'wellness',
      title: 'Calm: Sleep and Relaxation',
      description: 'Sleep stories, meditation, and relaxation techniques for better mental health.',
      website: 'https://calm.com',
      emoji: '😴',
    },
    {
      id: 10,
      category: 'wellness', 
      title: 'Ten Percent Happier',
      description: 'Practical meditation and mindfulness courses for stress reduction.',
      website: 'https://tenpercent.com',
      emoji: '☮️',
    },
    {
      id: 11,
      category: 'professional',
      title: 'Open Path Psychotherapy Collective',
      description: 'Affordable therapy sessions ($30-$60) with licensed mental health professionals.',
      website: 'https://openpathcollective.org',
      cost: '$30-60/session',
      emoji: '💚',
    },
    {
      id: 12,
      category: 'support',
      title: 'Mental Health America',
      description: 'Mental health screening tools, resources, and advocacy for mental wellness.',
      website: 'https://mhanational.org',
      emoji: '🩺',
    },
    {
      id: 13,
      category: 'support',
      title: 'Crisis Support Network',
      description: 'Peer support groups and crisis intervention training programs.',
      website: 'https://crisissupportnetwork.org',
      emoji: '🤲',
    }
  ];

  const handleCall = (contact) => {
    if (contact.includes('Text')) {
      const parts = contact.split(' to ');
      if (parts.length === 2) {
        const phoneNumber = parts[1];
        const message = parts[0];
        window.open(`sms:${phoneNumber}?body=${message}`, '_self');
        showNotification('Opening text message...', 'success');
      }
    } else {
      const cleanNumber = contact.replace(/[^0-9]/g, '');
      window.open(`tel:${cleanNumber}`, '_self');
      showNotification(`Calling ${contact}...`, 'success');
    }
  };

  const handleWebsite = (website) => {
    window.open(website, '_blank');
    showNotification('Opening website...', 'success');
  };

  const crisisResources = resources.filter(r => r.urgent);
  const otherResources = resources.filter(r => !r.urgent);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '1rem' : '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      letterSpacing: '0',
      whiteSpace: 'nowrap'
    }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          maxWidth: isMobile ? '300px' : '400px',
          letterSpacing: '0'
        }}>
          <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
          <span style={{ flex: 1, whiteSpace: 'normal' }}>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '0'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* FIXED ALARM BUTTON - PERFECTLY ROUND */}
      <button
        onClick={() => setAlarmOpen(true)}
        style={{
          position: 'fixed',
          top: isMobile ? '80px' : '100px',
          left: isMobile ? '20px' : '30px',
          width: isMobile ? '60px' : '70px',
          height: isMobile ? '60px' : '70px',
          borderRadius: '50%', // Perfect circle
          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
          border: 'none',
          color: 'white',
          fontSize: isMobile ? '1.5rem' : '2rem',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s infinite',
          transition: 'all 0.3s ease',
          aspectRatio: '1 / 1' // Ensures perfect circle even if width/height differ
        }}
      >
        🚨
      </button>

      {/* Alarm Popup */}
      {alarmOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '20px 10px 10px 10px',  // More padding at top   
            overflow: 'hidden' // Prevent scrolling
          }}
          onClick={() => setAlarmOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '1rem' : '1.5rem',
              maxWidth: isMobile ? '280px' : '350px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              maxHeight: '80vh', // Ensure it fits in viewport
              overflow: 'hidden' // No internal scrolling
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Compact Header */}
            <div style={{ 
              fontSize: isMobile ? '2rem' : '2.5rem', 
              marginBottom: '0.5rem' 
            }}>🆘</div>
            
            <h2 style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: '700',
              color: '#dc2626',
              margin: '0 0 1rem 0',
              letterSpacing: '0'
            }}>
              Need Help Now?
            </h2>
            
            {/* Compact Action Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.6rem', 
              marginBottom: '1rem' 
            }}>
              <button
                onClick={() => {
                  window.open('tel:988', '_self');
                  setAlarmOpen(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  letterSpacing: '0'
                }}
              >
                <span>📞</span>
                <span>Call 988</span>
              </button>
              
              <button
                onClick={() => {
                  window.open('sms:741741?body=HOME', '_self');
                  setAlarmOpen(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  letterSpacing: '0'
                }}
              >
                <span>💬</span>
                <span>Text 741741</span>
              </button>
              
              <button
                onClick={() => {
                  window.location.href = '/breathing';
                  setAlarmOpen(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  letterSpacing: '0'
                }}
              >
                <span>🧘</span>
                <span>Breathing</span>
              </button>
            </div>
            
            {/* Compact Close Button */}
            <button
              onClick={() => setAlarmOpen(false)}
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                color: '#6b7280',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                letterSpacing: '0'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '2rem' : '3rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-1px'
          }}>
            Mental Health Resources
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            margin: '0',
            letterSpacing: '0'
          }}>
            Professional support and caring communities
          </p>
        </div>

        {/* Emergency Crisis Support */}
        <div style={{
          background: 'rgba(185, 28, 28, 0.15)',
          border: '2px solid rgba(185, 28, 28, 0.3)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: isMobile ? '2rem' : '3rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '1.5rem' : '2rem'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              letterSpacing: '0'
            }}>
              🚨 Emergency Crisis Support
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              margin: '0',
              fontSize: isMobile ? '0.9rem' : '1rem',
              letterSpacing: '0'
            }}>
              If you're in crisis, these resources are available 24/7
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (window.innerWidth <= 1366 ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)'),
            gap: isMobile ? '1rem' : '1.5rem'
          }}>
            {crisisResources.map(resource => (
              <div
                key={resource.id}
                style={{
                  background: 'linear-gradient(135deg, #b91c1c, #991b1b)',
                  borderRadius: '15px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  color: 'white',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{resource.emoji}</span>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}>
                    24/7 AVAILABLE
                  </span>
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  fontWeight: '700',
                  margin: '0 0 0.8rem 0',
                  textAlign: 'center',
                  letterSpacing: '0',
                  whiteSpace: 'normal'
                }}>
                  {resource.title}
                </h3>

                {/* FIXED TEXT COLOR FOR READABILITY */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.95)', // CHANGED from opacity: 0.9 to bright white
                  margin: '0 0 1.5rem 0',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  letterSpacing: '0',
                  whiteSpace: 'normal',
                  fontWeight: '500' // ADDED weight for better readability
                }}>
                  {resource.description}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {resource.contact && (
                    <button
                      onClick={() => handleCall(resource.contact)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#1f2937',
                        border: 'none',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        letterSpacing: '0',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>{resource.contact.includes('Text') ? '💬' : '📞'}</span>
                      <span>{resource.contact}</span>
                    </button>
                  )}

                  {resource.website && (
                    <button
                      onClick={() => handleWebsite(resource.website)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        letterSpacing: '0',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>🌐</span>
                      <span>Website</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Support & Wellness Resources */}
        <div>
          <h2 style={{
            color: 'white',
            fontSize: isMobile ? '1.3rem' : '1.5rem',
            fontWeight: '700',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'center',
            letterSpacing: '0'
          }}>
            🏥 Professional Support & Wellness Resources
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : (window.innerWidth <= 1366 ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)'),
            gap: isMobile ? '1rem' : '1.5rem'
          }}>
            {otherResources.map(resource => (
              <div
                key={resource.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  color: '#1f2937',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{resource.emoji}</span>
                  {resource.cost && (
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      letterSpacing: '0',
                      whiteSpace: 'nowrap'
                    }}>
                      {resource.cost}
                    </span>
                  )}
                </div>

                <h3 style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: '700',
                  margin: '0 0 0.8rem 0',
                  color: '#1f2937',
                  textAlign: 'center',
                  letterSpacing: '0',
                  whiteSpace: 'normal'
                }}>
                  {resource.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  margin: '0 0 1.5rem 0',
                  lineHeight: '1.5',
                  color: '#374151',
                  textAlign: 'center',
                  letterSpacing: '0',
                  whiteSpace: 'normal'
                }}>
                  {resource.description}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  {resource.contact && (
                    <button
                      onClick={() => handleCall(resource.contact)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        letterSpacing: '0',
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </button>
                  )}

                  {resource.website && (
                    <button
                      onClick={() => handleWebsite(resource.website)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        letterSpacing: '0',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span>🌐</span>
                      <span>Visit</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 12px 35px rgba(220, 38, 38, 0.6);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default Resources;