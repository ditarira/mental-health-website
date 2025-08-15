import React, { useState, useEffect } from 'react';

const Resources = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const resources = [
    {
      id: 1,
      category: 'crisis',
      title: '988 Suicide & Crisis Lifeline',
      shortTitle: 'Crisis Lifeline',
      description: 'Free, confidential emotional support 24/7 for people in suicidal crisis or emotional distress.',
      contact: '988',
      website: 'https://988lifeline.org',
      urgent: true,
      emoji: '🆘',
      bgColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
      placeholder: '🆘',
      article: {
        title: 'Understanding the 988 Suicide & Crisis Lifeline',
        sections: [
          {
            heading: 'What is the 988 Lifeline?',
            content: 'The 988 Suicide & Crisis Lifeline is a national network of local crisis centers that provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States.'
          },
          {
            heading: 'How to Handle a Crisis Situation',
            content: 'If you or someone you know is experiencing thoughts of suicide or severe emotional distress, call 988 immediately. When you call, you will be connected to a trained crisis counselor at a local crisis center in your area.'
          },
          {
            heading: 'Extra Support & Advice',
            content: '💡 The 988 Lifeline also offers specialized support: Press 1 for Veterans, Press 2 for Spanish language support, and Press 3 for LGBTQ+ youth support. You can also chat online at 988lifeline.org or text 988.'
          }
        ]
      }
    },
    {
      id: 2,
      category: 'crisis',
      title: 'Crisis Text Line',
      shortTitle: 'Text Support',
      description: 'Free, 24/7 crisis support via text message with trained crisis counselors.',
      contact: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      urgent: true,
      emoji: '💬',
      bgColor: 'linear-gradient(135deg, #10b981, #059669)',
      placeholder: '💬',
      article: {
        title: 'Crisis Text Line: Text-Based Mental Health Support',
        sections: [
          {
            heading: 'What is Crisis Text Line?',
            content: 'Crisis Text Line provides free, 24/7, confidential text-based mental health support and crisis intervention. When you text HOME to 741741, a live, trained Crisis Counselor receives the text and responds quickly.'
          },
          {
            heading: 'How Text-Based Crisis Support Works',
            content: 'Text messaging can be easier than talking on the phone for many people, especially younger individuals. When you text HOME to 741741, you will be connected to a Crisis Counselor within 5 minutes.'
          },
          {
            heading: 'Tips for Effective Crisis Texting',
            content: '💡 Be honest about what you are going through - Crisis Counselors are trained to handle any situation without judgment. Use specific words to describe your feelings. Save 741741 in your phone for quick access.'
          }
        ]
      }
    },
    {
      id: 3,
      category: 'crisis',
      title: 'National Domestic Violence Hotline',
      shortTitle: 'Domestic Violence Support',
      description: 'Confidential support for domestic violence survivors and their loved ones, available 24/7.',
      contact: '1-800-799-7233',
      website: 'https://thehotline.org',
      urgent: true,
      emoji: '🛡️',
      bgColor: 'linear-gradient(135deg, #7c2d12, #92400e)',
      placeholder: '🛡️',
      article: {
        title: 'National Domestic Violence Hotline: Safety and Support',
        sections: [
          {
            heading: 'Understanding Domestic Violence Support',
            content: 'The National Domestic Violence Hotline provides lifesaving tools and immediate support to enable victims to find safety and live lives free of abuse. Trained advocates are available 24/7.'
          },
          {
            heading: 'Creating a Safety Plan',
            content: 'If you are in an abusive relationship, creating a safety plan is crucial. This includes identifying safe places to go, keeping important documents and emergency money accessible.'
          },
          {
            heading: 'Supporting Someone in an Abusive Relationship',
            content: '💡 If someone you know is in an abusive relationship: Listen without judgment, believe them, let them know the abuse is not their fault, respect their decisions, help them create a safety plan.'
          }
        ]
      }
    },
    {
      id: 4,
      category: 'professional',
      title: 'Psychology Today Therapist Directory',
      shortTitle: 'Find a Therapist',
      description: 'Comprehensive directory to find licensed therapists and mental health professionals.',
      website: 'https://psychologytoday.com',
      emoji: '👩‍⚕️',
      bgColor: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
      placeholder: '👩‍⚕️',
      article: {
        title: 'Finding the Right Therapist: A Complete Guide',
        sections: [
          {
            heading: 'What is Psychology Today?',
            content: 'Psychology Today is the largest online directory of mental health professionals in the United States, featuring over 200,000 licensed therapists, psychiatrists, psychologists, counselors, and treatment centers.'
          },
          {
            heading: 'How to Choose the Right Therapist',
            content: 'Finding the right therapist is crucial for successful treatment. Start by identifying what you want to work on - whether it is anxiety, depression, relationship issues, trauma, or personal growth.'
          },
          {
            heading: 'Making the Most of Your Therapy Search',
            content: '💡 Use the advanced filters to narrow down your search by insurance, specialties, gender, language, and treatment approaches like CBT or EMDR. Read therapist profiles carefully.'
          }
        ]
      }
    },
    {
      id: 5,
      category: 'professional',
      title: 'BetterHelp Online Therapy',
      shortTitle: 'Online Therapy',
      description: 'Professional online counseling with licensed, accredited therapists.',
      website: 'https://betterhelp.com',
      cost: '-90/week',
      emoji: '💻',
      bgColor: 'linear-gradient(135deg, #059669, #047857)',
      placeholder: '💻',
      article: {
        title: 'Online Therapy with BetterHelp: Accessible Mental Health Care',
        sections: [
          {
            heading: 'What is BetterHelp?',
            content: 'BetterHelp is the world largest therapy service, providing professional counseling online through video, phone, and messaging. All BetterHelp therapists are licensed, trained, experienced, and accredited.'
          },
          {
            heading: 'How Online Therapy Works and Its Benefits',
            content: 'After completing a questionnaire about your needs and preferences, BetterHelp matches you with a therapist typically within 24-48 hours. You can communicate via live video sessions, phone calls, or messaging.'
          },
          {
            heading: 'Getting Started and Maximizing Your Experience',
            content: '💡 Be honest and detailed when filling out the initial questionnaire to get the best therapist match. If your first match is not ideal, you can easily switch therapists at no additional cost.'
          }
        ]
      }
    },
    {
      id: 6,
      category: 'support',
      title: 'National Alliance on Mental Illness (NAMI)',
      shortTitle: 'NAMI Support Groups',
      description: 'Largest grassroots mental health organization providing education, support groups, and advocacy.',
      contact: '1-800-950-6264',
      website: 'https://nami.org',
      emoji: '🤝',
      bgColor: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
      placeholder: '🤝',
      article: {
        title: 'NAMI: Community Support and Mental Health Advocacy',
        sections: [
          {
            heading: 'What is NAMI?',
            content: 'The National Alliance on Mental Illness (NAMI) is the nation largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.'
          },
          {
            heading: 'Support Groups and Educational Programs',
            content: 'NAMI offers various free support groups including NAMI Connection (peer-to-peer support for adults), NAMI Family Support Groups (for family members and caregivers), and educational programs.'
          },
          {
            heading: 'Finding Local Support and Getting Involved',
            content: '💡 Use NAMI website to find local chapters and support groups in your area. Most support groups meet weekly or bi-weekly and are facilitated by trained volunteers.'
          }
        ]
      }
    }
  ];

  const handleCall = (contact) => {
    if (contact.includes('Text')) {
      const parts = contact.split(' to ');
      if (parts.length === 2) {
        const phoneNumber = parts[1];
        const message = parts[0];
        window.open('sms:' + phoneNumber + '?body=' + message, '_self');
        showNotification('Opening text message...', 'success');
      }
    } else {
      const cleanNumber = contact.replace(/[^0-9]/g, '');
      window.open('tel:' + cleanNumber, '_self');
      showNotification('Calling ' + contact + '...', 'success');
    }
  };

  const handleWebsite = (website) => {
    window.open(website, '_blank');
    showNotification('Opening website...', 'success');
  };

  const openArticle = (resource) => {
    setSelectedArticle(resource);
    setSidebarOpen(false);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resources.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  if (selectedArticle) {
    return (
      <div className="article-view">
        {notification && (
          <div className={'resources-notification ' + notification.type}>
            <div className="notification-content">
              <span className="notification-icon">
                {notification.type === 'success' ? '✅' : '⚠️'}
              </span>
              <span className="notification-message">{notification.message}</span>
            </div>
            <button className="notification-close" onClick={() => setNotification(null)}>×</button>
          </div>
        )}

        <div className="resources-layout">
          {/* Mobile Hamburger */}
          {isMobile && (
            <div className="mobile-header">
              <button className="hamburger-btn" onClick={toggleSidebar}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              <h3>📚 Resources</h3>
              <button className="close-article-mobile" onClick={closeArticle}>×</button>
            </div>
          )}

          {/* Sidebar Navigation */}
          <div className={'sidebar-navigation ' + (isMobile ? (sidebarOpen ? 'mobile-open' : 'mobile-closed') : '')}>
            <div className="sidebar-header">
              <h3>📚 Mental Health Resources</h3>
              {!isMobile && (
                <button className="close-btn" onClick={closeArticle}>
                  ← Back
                </button>
              )}
            </div>
            
            <div className="sidebar-articles">
              {resources.map(resource => (
                <div
                  key={resource.id}
                  className={'sidebar-item ' + (selectedArticle.id === resource.id ? 'active' : '')}
                  onClick={() => openArticle(resource)}
                >
                  <span className="sidebar-emoji">{resource.emoji}</span>
                  <span className="sidebar-title">{resource.shortTitle}</span>
                  {resource.urgent && <span className="sidebar-urgent">🚨</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Overlay for Mobile */}
          {isMobile && sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
          )}

          {/* Article Content */}
          <div className="article-main">
            <div className="article-header" style={{ background: selectedArticle.bgColor }}>
              <div className="article-icon">{selectedArticle.emoji}</div>
              <div className="article-title-section">
                <h1>{selectedArticle.article.title}</h1>
                {selectedArticle.urgent && (
                  <div className="urgent-banner">🚨 Emergency Support Available 24/7</div>
                )}
              </div>
            </div>

            <div className="article-actions">
              {selectedArticle.contact && (
                <button
                  onClick={() => handleCall(selectedArticle.contact)}
                  className="article-action-btn primary"
                  style={{ background: selectedArticle.bgColor }}
                >
                  <span className="btn-icon">
                    {selectedArticle.contact.includes('Text') ? '💬' : '📞'}
                  </span>
                  <span>{selectedArticle.contact}</span>
                </button>
              )}
              {selectedArticle.website && (
                <button
                  onClick={() => handleWebsite(selectedArticle.website)}
                  className="article-action-btn secondary"
                >
                  <span className="btn-icon">🌐</span>
                  <span>Visit Website</span>
                </button>
              )}
            </div>

            <div className="article-body">
              {selectedArticle.article.sections.map((section, index) => (
                <div key={index} className="article-section">
                  <h2>{section.heading}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resources-main">
      {notification && (
        <div className={'resources-notification ' + notification.type}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <button className="notification-close" onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="resources-layout">
        {/* Mobile Hamburger */}
        {isMobile && (
          <div className="mobile-header">
            <button className="hamburger-btn" onClick={toggleSidebar}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <h3>📚 Mental Health Resources</h3>
            <div></div>
          </div>
        )}

        {/* Sidebar Navigation */}
        <div className={'sidebar-navigation ' + (isMobile ? (sidebarOpen ? 'mobile-open' : 'mobile-closed') : '')}>
          <div className="sidebar-header">
            <h3>📚 Mental Health Resources</h3>
            <p>Professional support and caring communities</p>
          </div>
          
          <div className="sidebar-articles">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="sidebar-item"
                onClick={() => openArticle(resource)}
              >
                <span className="sidebar-emoji">{resource.emoji}</span>
                <span className="sidebar-title">{resource.shortTitle}</span>
                {resource.urgent && <span className="sidebar-urgent">🚨</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {isMobile && sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Article Squares - Mobile Slider, Desktop Grid */}
        <div className="article-squares">
          {isMobile ? (
            <div className="mobile-slider">
              <div 
                className="slider-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="slider-track"
                  style={{ transform: 'translateX(-' + (currentSlide * 100) + '%)' }}
                >
                  {resources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className="slider-slide"
                      onClick={() => openArticle(resource)}
                    >
                      <div
                        className="article-square mobile-square"
                        style={{ background: resource.bgColor }}
                      >
                        <div className="square-content">
                          <div className="square-emoji">{resource.placeholder}</div>
                          <h4>{resource.shortTitle}</h4>
                          <p>{resource.description.substring(0, 80)}...</p>
                          {resource.urgent && <div className="square-urgent">🚨 URGENT</div>}
                        </div>
                        <div className="square-overlay">
                          <span className="read-text">Read Article</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button className="slider-btn prev-btn" onClick={prevSlide}>
                ‹
              </button>
              <button className="slider-btn next-btn" onClick={nextSlide}>
                ›
              </button>

              {/* Dots Navigation */}
              <div className="slider-dots">
                {resources.map((_, index) => (
                  <button
                    key={index}
                    className={'dot ' + (index === currentSlide ? 'active' : '')}
                    onClick={() => goToSlide(index)}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            // Desktop Grid
            resources.map(resource => (
              <div
                key={resource.id}
                className="article-square"
                onClick={() => openArticle(resource)}
                style={{ background: resource.bgColor }}
              >
                <div className="square-content">
                  <div className="square-emoji">{resource.placeholder}</div>
                  <h4>{resource.shortTitle}</h4>
                  <p>{resource.description.substring(0, 60)}...</p>
                  {resource.urgent && <div className="square-urgent">🚨 URGENT</div>}
                </div>
                <div className="square-overlay">
                  <span className="read-text">Read Article</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
