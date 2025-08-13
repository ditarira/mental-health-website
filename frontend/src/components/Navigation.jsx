import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .modal-content {
        animation: slideIn 0.3s ease-out;
      }
      .modal-backdrop {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'journal', name: 'Journal', icon: '📝', path: '/journal' },
    { id: 'breathing', name: 'Breathing', icon: '🧘', path: '/breathing' },
    { id: 'assessment', name: 'Assessment', icon: '📊', path: '/assessment' },
    { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️', path: '/meditation' },
    { id: 'support', name: 'Support Groups', icon: '👥', path: '/support-groups' },
    { id: 'tools', name: 'Self-Help', icon: '🛠️', path: '/self-help' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  if (user?.role === 'ADMIN') {
    navigationItems.push({ id: 'admin', name: 'Admin', icon: '👑', path: '/admin' });
  }

  // COMPREHENSIVE MENTAL HEALTH RESOURCES DATABASE
  const resources = [
    // CRISIS & EMERGENCY RESOURCES
    {
      id: 1,
      category: 'crisis',
      title: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support 24/7 for people in distress and prevention resources.',
      contact: '988',
      website: 'https://988lifeline.org',
      type: 'hotline',
      urgent: true,
      availability: '24/7',
      languages: ['English', 'Spanish'],
      color: '#dc2626'
    },
    {
      id: 2,
      category: 'crisis',
      title: 'Crisis Text Line',
      description: 'Free, 24/7 support via text message for people in crisis.',
      contact: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      type: 'text',
      urgent: true,
      availability: '24/7',
      color: '#059669'
    },
    {
      id: 3,
      category: 'crisis',
      title: 'National Domestic Violence Hotline',
      description: '24/7 confidential support for domestic violence survivors.',
      contact: '1-800-799-7233',
      website: 'https://thehotline.org',
      type: 'hotline',
      urgent: true,
      availability: '24/7',
      color: '#7c2d12'
    },
    {
      id: 4,
      category: 'crisis',
      title: 'LGBTQ+ National Hotline',
      description: 'Confidential support for LGBTQ+ individuals in crisis.',
      contact: '1-888-843-4564',
      website: 'https://lgbthotline.org',
      type: 'hotline',
      urgent: true,
      availability: 'Daily 4pm-12am ET',
      color: '#be185d'
    },
    {
      id: 5,
      category: 'crisis',
      title: 'Veterans Crisis Line',
      description: 'Free, confidential support for veterans and their families.',
      contact: '1-800-273-8255',
      website: 'https://veteranscrisisline.net',
      type: 'hotline',
      urgent: true,
      availability: '24/7',
      color: '#1e40af'
    },
    {
      id: 6,
      category: 'crisis',
      title: 'The Trevor Project',
      description: 'Crisis intervention and suicide prevention for LGBTQ+ youth.',
      contact: '1-866-488-7386',
      website: 'https://thetrevorproject.org',
      type: 'youth-crisis',
      urgent: true,
      availability: '24/7',
      color: '#9333ea'
    },
    {
      id: 7,
      category: 'crisis',
      title: 'National Eating Disorders Association Helpline',
      description: 'Support for individuals and families affected by eating disorders.',
      contact: '1-800-931-2237',
      website: 'https://nationaleatingdisorders.org',
      type: 'specialized',
      urgent: true,
      color: '#b91c1c'
    },
    {
      id: 8,
      category: 'crisis',
      title: 'Trans Lifeline',
      description: 'Hotline staffed by transgender people for transgender people.',
      contact: '877-565-8860',
      website: 'https://translifeline.org',
      type: 'peer-crisis',
      urgent: true,
      availability: '24/7',
      color: '#ec4899'
    },
    
    // PROFESSIONAL MENTAL HEALTH SERVICES
    {
      id: 9,
      category: 'professional',
      title: 'Psychology Today Therapist Directory',
      description: 'Comprehensive directory to find licensed therapists, psychiatrists, and support groups.',
      website: 'https://psychologytoday.com',
      type: 'directory',
      services: ['Therapist search', 'Insurance verification', 'Specialty matching'],
      color: '#0891b2'
    },
    {
      id: 10,
      category: 'professional',
      title: 'BetterHelp Online Therapy',
      description: 'Professional online counseling with licensed therapists via video, phone, and messaging.',
      website: 'https://betterhelp.com',
      type: 'online-therapy',
      services: ['Individual therapy', 'Couples therapy', 'Teen therapy'],
      cost: 'Subscription-based',
      color: '#059669'
    },
    {
      id: 11,
      category: 'professional',
      title: 'Talkspace Online Therapy',
      description: 'Text-based therapy and video sessions with licensed mental health professionals.',
      website: 'https://talkspace.com',
      type: 'online-therapy',
      services: ['Text therapy', 'Video sessions', 'Psychiatry services'],
      cost: 'Subscription-based',
      color: '#0891b2'
    },
    {
      id: 12,
      category: 'professional',
      title: 'NAMI (National Alliance on Mental Illness)',
      description: 'Mental health support, education, and advocacy organization.',
      contact: '1-800-950-6264',
      website: 'https://nami.org',
      type: 'organization',
      services: ['Support groups', 'Education', 'Advocacy'],
      color: '#1e40af'
    },
    {
      id: 13,
      category: 'professional',
      title: 'SAMHSA National Helpline',
      description: 'Treatment referral and information service for mental health and substance abuse.',
      contact: '1-800-662-4357',
      website: 'https://samhsa.gov',
      type: 'referral',
      availability: '24/7',
      color: '#059669'
    },
    {
      id: 14,
      category: 'professional',
      title: 'Cerebral Mental Health Care',
      description: 'Online mental health platform offering therapy and medication management.',
      website: 'https://cerebral.com',
      type: 'comprehensive-care',
      services: ['Therapy', 'Medication management', 'Care counseling'],
      cost: 'Subscription-based',
      color: '#7c3aed'
    },
    {
      id: 15,
      category: 'professional',
      title: 'Open Path Psychotherapy Collective',
      description: 'Affordable therapy sessions ($30-$80 per session).',
      website: 'https://openpathcollective.org',
      type: 'affordable-therapy',
      cost: '$30-80 per session',
      color: '#14b8a6'
    },

    // DIGITAL MENTAL HEALTH TOOLS & APPS
    {
      id: 16,
      category: 'digital',
      title: 'Headspace',
      description: 'Guided meditation, mindfulness exercises, and sleep stories.',
      website: 'https://headspace.com',
      type: 'app',
      platforms: ['iOS', 'Android', 'Web'],
      features: ['Meditation', 'Sleep stories', 'Mindfulness exercises'],
      cost: 'Freemium',
      color: '#f59e0b'
    },
    {
      id: 17,
      category: 'digital',
      title: 'Calm',
      description: 'Meditation, sleep stories, and relaxation techniques for better mental health.',
      website: 'https://calm.com',
      type: 'app',
      platforms: ['iOS', 'Android', 'Web'],
      features: ['Daily calm', 'Sleep stories', 'Masterclasses'],
      cost: 'Freemium',
      color: '#3b82f6'
    },
    {
      id: 18,
      category: 'digital',
      title: 'Insight Timer',
      description: 'Free meditation app with thousands of guided meditations.',
      website: 'https://insighttimer.com',
      type: 'app',
      platforms: ['iOS', 'Android', 'Web'],
      features: ['Free meditations', 'Timer', 'Community'],
      cost: 'Free with premium options',
      color: '#8b5cf6'
    },
    {
      id: 19,
      category: 'digital',
      title: 'MindShift',
      description: 'Anxiety Canada\'s app using CBT strategies to manage anxiety and worry.',
      website: 'https://anxietycanada.com/resources/mindshift-app',
      type: 'app',
      platforms: ['iOS', 'Android'],
      features: ['CBT tools', 'Anxiety tracking', 'Quick relief'],
      cost: 'Free',
      color: '#14b8a6'
    },
    {
      id: 20,
      category: 'digital',
      title: 'Sanvello',
      description: 'Mood tracking, guided meditations, and CBT-based tools for anxiety and depression.',
      website: 'https://sanvello.com',
      type: 'app',
      platforms: ['iOS', 'Android'],
      features: ['Mood tracking', 'CBT tools', 'Meditation'],
      cost: 'Freemium',
      color: '#06b6d4'
    },
    {
      id: 21,
      category: 'digital',
      title: 'Daylio Mood Tracker',
      description: 'Simple micro mood diary that helps track emotional patterns.',
      website: 'https://daylio.webflow.io',
      type: 'app',
      platforms: ['iOS', 'Android'],
      features: ['Mood tracking', 'Statistics', 'Custom activities'],
      cost: 'Freemium',
      color: '#f59e0b'
    },

    // EDUCATIONAL RESOURCES
    {
      id: 22,
      category: 'educational',
      title: 'Mental Health America',
      description: 'Mental health screening tools and comprehensive information resources.',
      website: 'https://mhanational.org',
      type: 'website',
      services: ['Mental health screening', 'Educational resources', 'Advocacy'],
      color: '#7c3aed'
    },
    {
      id: 23,
      category: 'educational',
      title: 'National Institute of Mental Health (NIMH)',
      description: 'Research-based information on mental health conditions and treatments.',
      website: 'https://nimh.nih.gov',
      type: 'website',
      services: ['Research findings', 'Treatment information', 'Educational materials'],
      color: '#059669'
    },
    {
      id: 24,
      category: 'educational',
      title: 'Anxiety and Depression Association of America',
      description: 'Educational resources about anxiety, depression, and related disorders.',
      website: 'https://adaa.org',
      type: 'website',
      services: ['Educational webinars', 'Resource library', 'Professional directory'],
      color: '#dc2626'
    },
    {
      id: 25,
      category: 'educational',
      title: 'Centre for Addiction and Mental Health (CAMH)',
      description: 'Research and educational resources on mental health and addiction.',
      website: 'https://camh.ca',
      type: 'website',
      services: ['Research', 'Education', 'Treatment information'],
      color: '#0891b2'
    },

    // SUPPORT COMMUNITIES & PEER SUPPORT
    {
      id: 26,
      category: 'community',
      title: 'NAMI Support Groups',
      description: 'Local peer support groups for individuals and families.',
      website: 'https://nami.org/Support-Education/Support-Groups',
      type: 'support-group',
      formats: ['In-person', 'Virtual'],
      color: '#8b5cf6'
    },
    {
      id: 27,
      category: 'community',
      title: 'Depression and Bipolar Support Alliance',
      description: 'Peer support groups and online communities for mood disorders.',
      website: 'https://dbsalliance.org',
      type: 'support-group',
      formats: ['In-person', 'Online'],
      color: '#06b6d4'
    },
    {
      id: 28,
      category: 'community',
      title: '7 Cups',
      description: 'Free emotional support through active listening and counseling.',
      website: 'https://7cups.com',
      type: 'online-support',
      availability: '24/7',
      cost: 'Free',
      color: '#14b8a6'
    },
    {
      id: 29,
      category: 'community',
      title: 'Mental Health Forum',
      description: 'Online community for mental health support and discussion.',
      website: 'https://mentalhealthforum.net',
      type: 'online-community',
      availability: '24/7',
      color: '#6366f1'
    },

    // SPECIALIZED RESOURCES
    {
      id: 30,
      category: 'specialized',
      title: 'JED Campus Mental Health',
      description: 'Mental health resources specifically for college students.',
      website: 'https://jedfoundation.org',
      type: 'student',
      population: 'College students',
      color: '#3b82f6'
    },
    {
      id: 31,
      category: 'specialized',
      title: 'Postpartum Support International',
      description: 'Support for perinatal mental health conditions.',
      contact: '1-944-944-4773',
      website: 'https://postpartum.net',
      type: 'specialized',
      population: 'New mothers',
      color: '#f59e0b'
    },
    {
      id: 32,
      category: 'specialized',
      title: 'Mental Health America for Teens',
      description: 'Mental health resources specifically designed for teenagers.',
      website: 'https://mhanational.org/teens',
      type: 'youth',
      population: 'Teenagers',
      color: '#9333ea'
    },
    {
      id: 33,
      category: 'specialized',
      title: 'Elder Mental Health Resources',
      description: 'Mental health support specifically for older adults.',
      website: 'https://aging.org/mental-health',
      type: 'elderly',
      population: 'Older adults',
      color: '#059669'
    },

    // WORKPLACE MENTAL HEALTH
    {
      id: 34,
      category: 'workplace',
      title: 'Employee Assistance Programs (EAP)',
      description: 'Confidential counseling services provided by many employers.',
      type: 'employer-benefit',
      services: ['Free counseling', 'Work-life balance', 'Crisis intervention'],
      color: '#0891b2'
    },
    {
      id: 35,
      category: 'workplace',
      title: 'Mental Health First Aid at Work',
      description: 'Training program for workplace mental health support.',
      website: 'https://mentalhealthfirstaid.org',
      type: 'training',
      services: ['Mental health training', 'Workplace support'],
      color: '#14b8a6'
    },

    // FINANCIAL ASSISTANCE
    {
      id: 36,
      category: 'financial',
      title: 'GoodRx Mental Health',
      description: 'Discounted mental health medications and therapy.',
      website: 'https://goodrx.com/mental-health',
      type: 'discount',
      services: ['Prescription discounts', 'Therapy discounts'],
      color: '#f59e0b'
    },
    {
      id: 37,
      category: 'financial',
      title: 'Partnership for Prescription Assistance',
      description: 'Help finding patient assistance programs for medications.',
      website: 'https://pparx.org',
      type: 'prescription-assistance',
      services: ['Medicine assistance', 'State programs'],
      color: '#7c3aed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', color: '#667eea' },
    { id: 'crisis', name: 'Crisis Support', icon: '🚨', color: '#ef4444' },
    { id: 'professional', name: 'Professional Help', icon: '🏥', color: '#10b981' },
    { id: 'digital', name: 'Apps & Tools', icon: '📱', color: '#8b5cf6' },
    { id: 'educational', name: 'Learn More', icon: '📖', color: '#3b82f6' },
    { id: 'community', name: 'Support Groups', icon: '👥', color: '#06b6d4' },
    { id: 'specialized', name: 'Specialized Care', icon: '🎯', color: '#f59e0b' },
    { id: 'workplace', name: 'Workplace', icon: '💼', color: '#059669' },
    { id: 'financial', name: 'Financial Help', icon: '💰', color: '#7c3aed' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type) => {
    const iconMap = {
      'hotline': '📞',
      'text': '💬',
      'app': '📱',
      'website': '🌐',
      'directory': '🔍',
      'online-therapy': '💻',
      'support-group': '👥',
      'online-support': '🤝',
      'organization': '🏢',
      'student': '🎓',
      'specialized': '🎯',
      'referral': '🔄',
      'comprehensive-care': '🏥',
      'affordable-therapy': '💙',
      'training': '📚',
      'discount': '💰',
      'prescription-assistance': '💊'
    };
    return iconMap[type] || '📋';
  };

  const handleNavigation = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

  const handleResourcesClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowResourcesModal(true);
  };

  const handleCrisisClick = () => {
    setShowCrisisModal(true);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const handleCall = (contact) => {
    if (contact.includes('Text')) {
      const parts = contact.split(' to ');
      if (parts.length === 2) {
        window.open(`sms:${parts[1]}?body=${parts[0]}`, '_self');
      }
    } else {
      window.open(`tel:${contact.replace(/\D/g, '')}`, '_self');
    }
  };

  const handleWebsite = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 'bold',
          color: '#667eea',
          fontSize: '1.5rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => handleNavigation('/dashboard')}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.textShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.textShadow = 'none';
        }}>
          <span style={{ animation: 'bounce 2s infinite' }}>🧠</span>
          <span>MindfulMe</span>
        </div>

        {/* Navigation Items */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {navigationItems.slice(0, 6).map(item => (
            <button
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: isActive(item.path) 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'transparent',
                color: isActive(item.path) ? 'white' : '#667eea',
                border: '2px solid transparent',
                borderImage: isActive(item.path) ? 'none' : 'linear-gradient(135deg, #667eea, #764ba2) 1',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleNavigation(item.path)}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
          
          {/* Resources Button */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: showResourcesModal 
                ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                : 'transparent',
              color: showResourcesModal ? 'white' : '#667eea',
              border: '2px solid transparent',
              borderImage: showResourcesModal ? 'none' : 'linear-gradient(135deg, #667eea, #764ba2) 1',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onClick={handleResourcesClick}
            onMouseOver={(e) => {
              if (!showResourcesModal) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!showResourcesModal) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <span>📚</span>
            <span>Resources</span>
          </button>
        </div>

        {/* User Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Crisis Alarm Button */}
          <button
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
              animation: 'pulse 2s infinite'
            }}
            onClick={handleCrisisClick}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
            }}
            title="🚨 Crisis Support - Get Help Now"
          >
            🚨
          </button>

          {/* User Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                {user?.role === 'ADMIN' ? 'Administrator' : 'Member'}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',color: 'white',
             border: 'none',
             borderRadius: '15px',
             padding: '0.75rem 1.5rem',
             cursor: 'pointer',
             fontSize: '0.9rem',
             fontWeight: '600',
             transition: 'all 0.3s ease',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}
           onClick={handleLogout}
           onMouseOver={(e) => {
             e.currentTarget.style.transform = 'translateY(-3px)';
             e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
           }}
           onMouseOut={(e) => {
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.boxShadow = 'none';
           }}
         >
           🚪 Logout
         </button>
       </div>
     </div>

     {/* Crisis Modal */}
     {showCrisisModal && (
       <div 
         className="modal-backdrop"
         style={{
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           background: 'rgba(0, 0, 0, 0.8)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           zIndex: 1001,
           padding: '1rem'
         }}
         onClick={(e) => {
           if (e.target === e.currentTarget) {
             setShowCrisisModal(false);
           }
         }}
       >
         <div className="modal-content" style={{
           background: 'linear-gradient(135deg, #fff, #f8fafc)',
           borderRadius: '25px',
           padding: '2.5rem',
           maxWidth: '600px',
           width: '100%',
           boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
           border: '3px solid #ef4444'
         }}>
           <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
             <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 1s infinite' }}>🆘</div>
             <h2 style={{
               background: 'linear-gradient(135deg, #ef4444, #dc2626)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               fontSize: '2.2rem',
               marginBottom: '1rem',
               fontWeight: 'bold'
             }}>
               Need Immediate Help?
             </h2>
             <p style={{
               color: '#64748b',
               fontSize: '1.1rem',
               lineHeight: '1.6'
             }}>
               You are not alone. Professional help is available 24/7.
             </p>
           </div>

           <div style={{
             display: 'flex',
             flexDirection: 'column',
             gap: '1rem',
             marginBottom: '2rem'
           }}>
             <button
               onClick={() => window.open('tel:988', '_self')}
               style={{
                 background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                 color: 'white',
                 padding: '1.2rem',
                 borderRadius: '15px',
                 border: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 fontWeight: '700',
                 fontSize: '1.1rem',
                 cursor: 'pointer',
                 width: '100%',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'translateY(-3px)';
                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
               }}
             >
               <span style={{ fontSize: '2rem' }}>📞</span>
               <div style={{ textAlign: 'left' }}>
                 <div>Call 988 - Suicide & Crisis Lifeline</div>
                 <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Free, confidential, 24/7</div>
               </div>
             </button>

             <button
               onClick={() => window.open('sms:741741?body=HOME', '_self')}
               style={{
                 background: 'linear-gradient(135deg, #10b981, #059669)',
                 color: 'white',
                 padding: '1.2rem',
                 borderRadius: '15px',
                 border: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 fontWeight: '700',
                 fontSize: '1.1rem',
                 cursor: 'pointer',
                 width: '100%',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'translateY(-3px)';
                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.5)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
               }}
             >
               <span style={{ fontSize: '2rem' }}>💬</span>
               <div style={{ textAlign: 'left' }}>
                 <div>Text HOME to 741741</div>
                 <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Crisis Text Line</div>
               </div>
             </button>

             <button
               style={{
                 background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                 color: 'white',
                 padding: '1.2rem',
                 borderRadius: '15px',
                 border: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 fontWeight: '700',
                 fontSize: '1.1rem',
                 cursor: 'pointer',
                 width: '100%',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
               }}
               onClick={() => {
                 setShowCrisisModal(false);
                 handleNavigation('/breathing');
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'translateY(-3px)';
                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.5)';
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
               }}
             >
               <span style={{ fontSize: '2rem' }}>🧘</span>
               <div style={{ textAlign: 'left' }}>
                 <div>Emergency Breathing Exercise</div>
                 <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Calm your mind now</div>
               </div>
             </button>
           </div>

           <button
             style={{
               background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
               color: '#64748b',
               border: 'none',
               borderRadius: '15px',
               padding: '1rem 2rem',
               cursor: 'pointer',
               transition: 'all 0.3s ease',
               fontWeight: '600',
               fontSize: '1rem',
               width: '100%'
             }}
             onClick={() => setShowCrisisModal(false)}
           >
             Close
           </button>
         </div>
       </div>
     )}

     {/* COMPREHENSIVE RESOURCES MODAL */}
     {showResourcesModal && (
       <div 
         className="modal-backdrop"
         style={{
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           background: 'rgba(0, 0, 0, 0.8)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           zIndex: 1001,
           padding: '1rem'
         }}
         onClick={(e) => {
           if (e.target === e.currentTarget) {
             setShowResourcesModal(false);
           }
         }}
       >
         <div className="modal-content" style={{
           background: 'linear-gradient(135deg, #fff, #f8fafc)',
           borderRadius: '25px',
           padding: '0',
           maxWidth: '95vw',
           width: '1200px',
           maxHeight: '90vh',
           boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
           border: '2px solid rgba(102, 126, 234, 0.2)',
           overflow: 'hidden',
           display: 'flex',
           flexDirection: 'column'
         }}>
           {/* Header */}
           <div style={{
             background: 'linear-gradient(135deg, #667eea, #764ba2)',
             color: 'white',
             padding: '2rem',
             borderRadius: '25px 25px 0 0',
             position: 'relative'
           }}>
             <div style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center'
             }}>
               <div>
                 <h2 style={{
                   fontSize: '2.5rem',
                   marginBottom: '0.5rem',
                   fontWeight: 'bold',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '1rem'
                 }}>
                   <span style={{ fontSize: '3rem' }}>📚</span>
                   Mental Health Resources
                 </h2>
                 <p style={{
                   fontSize: '1.1rem',
                   opacity: 0.9,
                   margin: 0
                 }}>
                   Comprehensive support, tools, and professional services
                 </p>
               </div>
               
               <button
                 style={{
                   background: 'rgba(255,255,255,0.2)',
                   color: 'white',
                   border: 'none',
                   borderRadius: '50%',
                   width: '50px',
                   height: '50px',
                   cursor: 'pointer',
                   fontSize: '1.5rem',
                   fontWeight: 'bold',
                   transition: 'all 0.3s ease',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}
                 onClick={() => setShowResourcesModal(false)}
                 onMouseOver={(e) => {
                   e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                   e.currentTarget.style.transform = 'scale(1.1)';
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                   e.currentTarget.style.transform = 'scale(1)';
                 }}
               >
                 ✕
               </button>
             </div>
           </div>

           {/* Search and Filter Section */}
           <div style={{
             padding: '2rem',
             borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
             background: 'rgba(102, 126, 234, 0.02)'
           }}>
             {/* Search Bar */}
             <div style={{
               position: 'relative',
               marginBottom: '1.5rem',
               maxWidth: '500px'
             }}>
               <input
                 type="text"
                 placeholder="🔍 Search resources..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 style={{
                   width: '100%',
                   padding: '1rem 1rem 1rem 3rem',
                   border: '2px solid rgba(102, 126, 234, 0.2)',
                   borderRadius: '15px',
                   fontSize: '1rem',
                   background: 'white',
                   boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
                   transition: 'all 0.3s ease',
                   outline: 'none'
                 }}
                 onFocus={(e) => {
                   e.currentTarget.style.borderColor = '#667eea';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
                 }}
                 onBlur={(e) => {
                   e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                   e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.1)';
                 }}
               />
               <span style={{
                 position: 'absolute',
                 left: '1rem',
                 top: '50%',
                 transform: 'translateY(-50%)',
                 fontSize: '1.2rem',
                 color: '#667eea'
               }}>
                 🔍
               </span>
             </div>

             {/* Category Filters */}
             <div style={{
               display: 'flex',
               gap: '0.75rem',
               flexWrap: 'wrap'
             }}>
               {categories.map(category => (
                 <button
                   key={category.id}
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     padding: '0.75rem 1.25rem',
                     background: selectedCategory === category.id 
                       ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)` 
                       : 'white',
                     color: selectedCategory === category.id ? 'white' : category.color,
                     border: `2px solid ${category.color}`,
                     borderRadius: '20px',
                     cursor: 'pointer',
                     fontSize: '0.9rem',
                     fontWeight: '600',
                     transition: 'all 0.3s ease',
                     boxShadow: selectedCategory === category.id 
                       ? `0 4px 15px ${category.color}40` 
                       : '0 2px 8px rgba(0,0,0,0.1)'
                   }}
                   onClick={() => setSelectedCategory(category.id)}
                   onMouseOver={(e) => {
                     if (selectedCategory !== category.id) {
                       e.currentTarget.style.background = `${category.color}15`;
                       e.currentTarget.style.transform = 'translateY(-2px)';
                     }
                   }}
                   onMouseOut={(e) => {
                     if (selectedCategory !== category.id) {
                       e.currentTarget.style.background = 'white';
                       e.currentTarget.style.transform = 'translateY(0)';
                     }
                   }}
                 >
                   <span>{category.icon}</span>
                   <span>{category.name}</span>
                   <span style={{
                     background: selectedCategory === category.id ? 'rgba(255,255,255,0.3)' : `${category.color}20`,
                     borderRadius: '10px',
                     padding: '0.2rem 0.5rem',
                     fontSize: '0.8rem',
                     fontWeight: 'bold'
                   }}>
                     {filteredResources.filter(r => category.id === 'all' || r.category === category.id).length}
                   </span>
                 </button>
               ))}
             </div>
           </div>

           {/* Resources Grid */}
           <div style={{
             flex: 1,
             overflow: 'auto',
             padding: '2rem',
             background: 'linear-gradient(135deg, #f8fafc, #fff)'
           }}>
             {filteredResources.length > 0 ? (
               <>
                 {/* Crisis Resources First (if any) */}
                 {selectedCategory === 'all' || selectedCategory === 'crisis' ? (
                   filteredResources.some(r => r.urgent) && (
                     <div style={{ marginBottom: '2rem' }}>
                       <h3 style={{
                         background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         fontSize: '1.5rem',
                         fontWeight: 'bold',
                         marginBottom: '1rem',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.5rem'
                       }}>
                         <span style={{ color: '#ef4444', animation: 'pulse 2s infinite' }}>🚨</span>
                         Emergency & Crisis Support
                       </h3>
                       <div style={{
                         display: 'grid',
                         gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                         gap: '1.5rem',
                         marginBottom: '2rem'
                       }}>
                         {filteredResources.filter(resource => resource.urgent).map(resource => (
                           <div
                             key={resource.id}
                             style={{
                               background: 'linear-gradient(135deg, #fff, #fef2f2)',
                               border: '2px solid #ef4444',
                               borderRadius: '20px',
                               padding: '1.5rem',
                               boxShadow: '0 8px 25px rgba(239, 68, 68, 0.15)',
                               transition: 'all 0.3s ease',
                               position: 'relative'
                             }}
                             onMouseOver={(e) => {
                               e.currentTarget.style.transform = 'translateY(-5px)';
                               e.currentTarget.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.25)';
                             }}
                             onMouseOut={(e) => {
                               e.currentTarget.style.transform = 'translateY(0)';
                               e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.15)';
                             }}
                           >
                             {/* Urgent Badge */}
                             <div style={{
                               position: 'absolute',
                               top: '1rem',
                               right: '1rem',
                               background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                               color: 'white',
                               padding: '0.3rem 0.8rem',
                               borderRadius: '15px',
                               fontSize: '0.8rem',
                               fontWeight: 'bold',
                               animation: 'pulse 2s infinite'
                             }}>
                               URGENT
                             </div>

                             <div style={{
                               display: 'flex',
                               alignItems: 'flex-start',
                               gap: '1rem',
                               marginBottom: '1rem'
                             }}>
                               <div style={{
                                 fontSize: '2.5rem',
                                 background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                 borderRadius: '15px',
                                 padding: '0.5rem',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 minWidth: '60px',
                                 height: '60px'
                               }}>
                                 {getResourceIcon(resource.type)}
                               </div>
                               <div style={{ flex: 1, paddingRight: '3rem' }}>
                                 <h4 style={{
                                   color: '#ef4444',
                                   fontSize: '1.3rem',
                                   fontWeight: 'bold',
                                   margin: '0 0 0.5rem 0',
                                   lineHeight: '1.3'
                                 }}>
                                   {resource.title}
                                 </h4>
                                 <p style={{
                                   color: '#64748b',
                                   fontSize: '0.95rem',
                                   lineHeight: '1.5',
                                   margin: 0
                                 }}>
                                   {resource.description}
                                 </p>
                                 {resource.availability && (
                                   <div style={{
                                     background: '#059669',
                                     color: 'white',
                                     padding: '0.25rem 0.75rem',
                                     borderRadius: '15px',
                                     fontSize: '0.8rem',
                                     fontWeight: '600',
                                     display: 'inline-block',
                                     marginTop: '0.5rem'
                                   }}>
                                     ⏰ {resource.availability}
                                   </div>
                                 )}
                               </div>
                             </div>

                             <div style={{
                               display: 'flex',
                               gap: '0.75rem',
                               marginTop: '1rem'
                             }}>
                               {resource.contact && (
                                 <button
                                   onClick={() => handleCall(resource.contact)}
                                   style={{
                                     background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                     color: 'white',
                                     border: 'none',
                                     borderRadius: '12px',
                                     padding: '0.75rem 1.25rem',
                                     cursor: 'pointer',
                                     fontSize: '0.9rem',
                                     fontWeight: '600',
                                     transition: 'all 0.3s ease',
                                     display: 'flex',
                                     alignItems: 'center',
                                     gap: '0.5rem',
                                     flex: 1
                                   }}
                                   onMouseOver={(e) => {
                                     e.currentTarget.style.transform = 'scale(1.05)';
                                     e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
                                   }}
                                   onMouseOut={(e) => {
                                     e.currentTarget.style.transform = 'scale(1)';
                                     e.currentTarget.style.boxShadow = 'none';
                                   }}
                                 >
                                   📞 {resource.contact}
                                 </button>
                               )}
                               {resource.website && (
                                 <button
                                   onClick={() => handleWebsite(resource.website)}
                                   style={{
                                     background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                                     color: '#64748b',
                                     border: '2px solid #ef4444',
                                     borderRadius: '12px',
                                     padding: '0.75rem 1.25rem',
                                     cursor: 'pointer',
                                     fontSize: '0.9rem',
                                     fontWeight: '600',
                                     transition: 'all 0.3s ease',
                                     display: 'flex',
                                     alignItems: 'center',
                                     gap: '0.5rem'
                                   }}
                                   onMouseOver={(e) => {
                                     e.currentTarget.style.background = '#ef4444';
                                     e.currentTarget.style.color = 'white';
                                   }}
                                   onMouseOut={(e) => {
                                     e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)';
                                     e.currentTarget.style.color = '#64748b';
                                   }}
                                 >
                                   🌐 Visit Website
                                 </button>
                               )}
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )
                 ) : null}

                 {/* Regular Resources */}
                 <div style={{
                   display: 'grid',
                   gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                   gap: '1.5rem'
                 }}>
                   {filteredResources.filter(resource => !resource.urgent).map(resource => (
                     <div
                       key={resource.id}
                       style={{
                         background: 'linear-gradient(135deg, #fff, #f8fafc)',
                         border: `2px solid ${resource.color || '#667eea'}20`,
                         borderRadius: '20px',
                         padding: '1.5rem',
                         boxShadow: `0 8px 25px ${resource.color || '#667eea'}15`,
                         transition: 'all 0.3s ease',
                         position: 'relative'
                       }}
                       onMouseOver={(e) => {
                         e.currentTarget.style.transform = 'translateY(-5px)';
                         e.currentTarget.style.boxShadow = `0 12px 35px ${resource.color || '#667eea'}25`;
                         e.currentTarget.style.borderColor = `${resource.color || '#667eea'}40`;
                       }}
                       onMouseOut={(e) => {
                         e.currentTarget.style.transform = 'translateY(0)';
                         e.currentTarget.style.boxShadow = `0 8px 25px ${resource.color || '#667eea'}15`;
                         e.currentTarget.style.borderColor = `${resource.color || '#667eea'}20`;
                       }}
                     >
                       {/* Category Badge */}
                       <div style={{
                         position: 'absolute',
                         top: '1rem',
                         right: '1rem',
                         background: `linear-gradient(135deg, ${resource.color || '#667eea'}, ${resource.color || '#667eea'}dd)`,
                         color: 'white',
                         padding: '0.3rem 0.8rem',
                         borderRadius: '15px',
                         fontSize: '0.75rem',
                         fontWeight: 'bold',
                         textTransform: 'uppercase'
                       }}>
                         {categories.find(cat => cat.id === resource.category)?.name || 'Resource'}
                       </div>

                       <div style={{
                         display: 'flex',
                         alignItems: 'flex-start',
                         gap: '1rem',
                         marginBottom: '1rem'
                       }}>
                         <div style={{
                           fontSize: '2.5rem',
                           background: `${resource.color || '#667eea'}20`,
                           borderRadius: '15px',
                           padding: '0.5rem',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           minWidth: '60px',
                           height: '60px',
                           border: `2px solid ${resource.color || '#667eea'}30`
                         }}>
                           {getResourceIcon(resource.type)}
                         </div>
                         <div style={{ flex: 1, paddingRight: '3rem' }}>
                           <h4 style={{
                             color: resource.color || '#667eea',
                             fontSize: '1.2rem',
                             fontWeight: 'bold',
                             margin: '0 0 0.5rem 0',
                             lineHeight: '1.3'
                           }}>
                             {resource.title}
                           </h4>
                           <p style={{
                             color: '#64748b',
                             fontSize: '0.95rem',
                             lineHeight: '1.5',
                             margin: '0 0 0.5rem 0'
                           }}>
                             {resource.description}
                           </p>
                           
                           {/* Additional Info */}
                           <div style={{
                             display: 'flex',
                             flexWrap: 'wrap',
                             gap: '0.5rem',
                             marginTop: '0.5rem'
                           }}>
                             {resource.availability && (
                               <span style={{
                                 background: '#059669',
                                 color: 'white',
                                 padding: '0.2rem 0.6rem',
                                 borderRadius: '12px',
                                 fontSize: '0.75rem',
                                 fontWeight: '600'
                               }}>
                                 ⏰ {resource.availability}
                               </span>
                             )}
                             {resource.cost && (
                               <span style={{
                                 background: '#f59e0b',
                                 color: 'white',
                                 padding: '0.2rem 0.6rem',
                                 borderRadius: '12px',
                                 fontSize: '0.75rem',
                                 fontWeight: '600'
                               }}>
                                 💰 {resource.cost}
                               </span>
                             )}
                             {resource.languages && resource.languages.length > 1 && (
                               <span style={{
                                 background: '#8b5cf6',
                                 color: 'white',
                                 padding: '0.2rem 0.6rem',
                                 borderRadius: '12px',
                                 fontSize: '0.75rem',
                                 fontWeight: '600'
                               }}>
                                 🌍 Multi-language
                               </span>
                             )}
                           </div>
                         </div>
                       </div>

                       <div style={{
                         display: 'flex',
                         gap: '0.75rem',
                         marginTop: '1rem'
                       }}>
                         {resource.contact && (
                           <button
                             onClick={() => handleCall(resource.contact)}
                             style={{
                               background: `linear-gradient(135deg, ${resource.color || '#667eea'}, ${resource.color || '#667eea'}dd)`,
                               color: 'white',
                               border: 'none',
                               borderRadius: '12px',
                               padding: '0.75rem 1.25rem',
                               cursor: 'pointer',
                               fontSize: '0.9rem',
                               fontWeight: '600',
                               transition: 'all 0.3s ease',
                               display: 'flex',
                               alignItems: 'center',
                               gap: '0.5rem',
                               flex: 1
                             }}
                             onMouseOver={(e) => {
                               e.currentTarget.style.transform = 'scale(1.05)';
                               e.currentTarget.style.boxShadow = `0 4px 15px ${resource.color || '#667eea'}40`;
                             }}
                             onMouseOut={(e) => {
                               e.currentTarget.style.transform = 'scale(1)';
                               e.currentTarget.style.boxShadow = 'none';
                             }}
                           >
                             📞 Call Now
                           </button>
                         )}
                         {resource.website && (
                           <button
                             onClick={() => handleWebsite(resource.website)}
                             style={{
                               background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                               color: '#64748b',
                               border: `2px solid ${resource.color || '#667eea'}`,
                               borderRadius: '12px',
                               padding: '0.75rem 1.25rem',
                               cursor: 'pointer',
                               fontSize: '0.9rem',
                               fontWeight: '600',
                               transition: 'all 0.3s ease',
                               display: 'flex',
                               alignItems: 'center',
                               gap: '0.5rem',
                               flex: resource.contact ? 'none' : 1
                             }}
                             onMouseOver={(e) => {
                               e.currentTarget.style.background = resource.color || '#667eea';
                               e.currentTarget.style.color = 'white';
                             }}
                             onMouseOut={(e) => {
                               e.currentTarget.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)';
                               e.currentTarget.style.color = '#64748b';
                             }}
                           >
                             🌐 Visit
                           </button>
                         )}
                       </div>
                     </div>
                   ))}
                 </div>
               </>
             ) : (
               <div style={{
                 textAlign: 'center',
                 padding: '3rem',
                 color: '#64748b'
               }}>
                 <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No resources found</h3>
                 <p>Try adjusting your search or filter criteria</p>
               </div>
             )}
           </div>

           {/* Footer */}
           <div style={{
             background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
             padding: '1.5rem 2rem',
             borderTop: '1px solid rgba(102, 126, 234, 0.1)',
             textAlign: 'center'
           }}>
             <p style={{
               color: '#64748b',
               fontSize: '0.9rem',
               margin: '0 0 1rem 0',
               lineHeight: '1.5'
             }}>
               💙 Remember: Seeking help is a sign of strength, not weakness. You deserve support and care.
             </p>
             <div style={{
               display: 'flex',
               justifyContent: 'center',
               gap: '1rem',
               flexWrap: 'wrap'
             }}>
               <button
                 onClick={handleCrisisClick}
                 style={{
                   background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                   color: 'white',
                   border: 'none',
                   borderRadius: '20px',
                   padding: '0.75rem 1.5rem',
                   cursor: 'pointer',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   transition: 'all 0.3s ease',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem',
                   animation: 'pulse 3s infinite'
                 }}
                 onMouseOver={(e) => {
                   e.currentTarget.style.transform = 'scale(1.05)';
                   e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.transform = 'scale(1)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}
               >
                 🚨 Need Immediate Help?
               </button>
               <button
                 style={{
                   background: 'linear-gradient(135deg, #667eea, #764ba2)',
                   color: 'white',
                   border: 'none',
                   borderRadius: '20px',
                   padding: '0.75rem 1.5rem',
                   cursor: 'pointer',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   transition: 'all 0.3s ease',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem'
                 }}
                 onClick={() => setShowResourcesModal(false)}
                 onMouseOver={(e) => {
                   e.currentTarget.style.transform = 'scale(1.05)';
                   e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.transform = 'scale(1)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}
               >
                 ✨ Close Resources
               </button>
             </div>
           </div>
         </div>
       </div>
     )}
   </>
 );
};

export default Navigation;
