import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercises = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentTechnique, setCurrentTechnique] = useState('478');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [countdown, setCountdown] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  const intervalRef = useRef(null);
  const sessionRef = useRef(null);

  const techniques = {
    '478': {
      name: '4-7-8 Deep Relaxation',
      description: 'Inhale 4, hold 7, exhale 8',
      category: 'Sleep & Anxiety',
      emoji: '🌙',
      benefits: 'Perfect for falling asleep and reducing anxiety',
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in slowly through your nose...', color: '#10b981' },
        { name: 'hold', duration: 7, instruction: 'Hold your breath gently...', color: '#f59e0b' },
        { name: 'exhale', duration: 8, instruction: 'Exhale slowly through your mouth...', color: '#06b6d4' }
      ]
    },
    'box': {
      name: 'Box Breathing',
      description: 'Equal 4-4-4-4 rhythm',
      category: 'Focus & Stress',
      emoji: '📦',
      benefits: 'Navy SEALs technique for focus and stress relief',
      color: '#059669',
      bgColor: 'rgba(5, 150, 105, 0.1)',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in slowly...', color: '#10b981' },
        { name: 'hold', duration: 4, instruction: 'Hold with control...', color: '#f59e0b' },
        { name: 'exhale', duration: 4, instruction: 'Breathe out steadily...', color: '#06b6d4' },
        { name: 'pause', duration: 4, instruction: 'Rest and prepare...', color: '#8b5cf6' }
      ]
    },
    'triangle': {
      name: 'Triangle Breathing',
      description: 'Simple 4-4-4 pattern',
      category: 'Beginner Friendly',
      emoji: '🔺',
      benefits: 'Easy technique perfect for beginners',
      color: '#0891b2',
      bgColor: 'rgba(8, 145, 178, 0.1)',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in gently...', color: '#10b981' },
        { name: 'hold', duration: 4, instruction: 'Hold peacefully...', color: '#f59e0b' },
        { name: 'exhale', duration: 4, instruction: 'Release slowly...', color: '#06b6d4' }
      ]
    },
    'coherent': {
      name: 'Coherent Breathing',
      description: 'Balanced 5-5 pattern',
      category: 'Heart Rate Variability',
      emoji: '💓',
      benefits: 'Balances nervous system and improves heart health',
      color: '#dc2626',
      bgColor: 'rgba(220, 38, 38, 0.1)',
      phases: [
        { name: 'inhale', duration: 5, instruction: 'Breathe in with your heart...', color: '#10b981' },
        { name: 'exhale', duration: 5, instruction: 'Breathe out with gratitude...', color: '#06b6d4' }
      ]
    },
    'wim': {
      name: 'Wim Hof Technique',
      description: '30 breaths + retention',
      category: 'Energy & Cold',
      emoji: '❄️',
      benefits: 'Boosts energy, immune system, and cold tolerance',
      color: '#7c3aed',
      bgColor: 'rgba(124, 58, 237, 0.1)',
      phases: [
        { name: 'inhale', duration: 2, instruction: 'Deep belly breath in...', color: '#10b981' },
        { name: 'exhale', duration: 1, instruction: 'Let go naturally...', color: '#06b6d4' }
      ]
    },
    'ujjayi': {
      name: 'Ujjayi (Ocean Breath)',
      description: 'Deep ocean-like breathing',
      category: 'Yoga & Meditation',
      emoji: '🌊',
      benefits: 'Calms mind and generates internal heat',
      color: '#0d9488',
      bgColor: 'rgba(13, 148, 136, 0.1)',
      phases: [
        { name: 'inhale', duration: 6, instruction: 'Breathe deeply through nose...', color: '#10b981' },
        { name: 'exhale', duration: 6, instruction: 'Exhale with ocean sound...', color: '#06b6d4' }
      ]
    },
    'bellows': {
      name: 'Bellows Breath',
      description: 'Rapid energizing breaths',
      category: 'Energy & Alertness',
      emoji: '🔥',
      benefits: 'Increases energy and mental alertness',
      color: '#ea580c',
      bgColor: 'rgba(234, 88, 12, 0.1)',
      phases: [
        { name: 'inhale', duration: 1, instruction: 'Quick breath in...', color: '#10b981' },
        { name: 'exhale', duration: 1, instruction: 'Quick breath out...', color: '#06b6d4' }
      ]
    },
    'alternate': {
      name: 'Alternate Nostril',
      description: 'Left-right nostril breathing',
      category: 'Balance & Harmony',
      emoji: '⚖️',
      benefits: 'Balances left and right brain hemispheres',
      color: '#9333ea',
      bgColor: 'rgba(147, 51, 234, 0.1)',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe through left nostril...', color: '#10b981' },
        { name: 'hold', duration: 2, instruction: 'Pause between nostrils...', color: '#f59e0b' },
        { name: 'exhale', duration: 4, instruction: 'Breathe through right nostril...', color: '#06b6d4' },
        { name: 'pause', duration: 2, instruction: 'Switch and prepare...', color: '#8b5cf6' }
      ]
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sessionRef.current) clearInterval(sessionRef.current);
    };
  }, []);

  const startSession = () => {
    setIsActive(true);
    setPhase('inhale');
    setCycle(1);
    setSessionTime(0);

    const technique = techniques[currentTechnique];
    let currentPhaseIndex = 0;
    let phaseTime = 0;

    setCountdown(technique.phases[0].duration);

    sessionRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    intervalRef.current = setInterval(() => {
      phaseTime++;
      setCountdown(technique.phases[currentPhaseIndex].duration - phaseTime);

      if (phaseTime >= technique.phases[currentPhaseIndex].duration) {
        phaseTime = 0;
        currentPhaseIndex = (currentPhaseIndex + 1) % technique.phases.length;

        if (currentPhaseIndex === 0) {
          setCycle(prev => prev + 1);
        }

        setPhase(technique.phases[currentPhaseIndex].name);
        setCountdown(technique.phases[currentPhaseIndex].duration);
      }
    }, 1000);
  };

    const stopSession = () => {
    // Save session data before stopping (only if session was meaningful)
    if (sessionTime > 10) { // Only save if session lasted more than 10 seconds
      saveSession(sessionTime, techniques[currentTechnique].name, true);
    }

    setIsActive(false);
    setPhase('ready');
    setCountdown(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (sessionRef.current) clearInterval(sessionRef.current);
  };

  const saveSession = async (duration, technique, completed = true) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping session save');
        return;
      }

      const sessionData = {
        duration: Math.floor(duration), // session time in seconds
        type: technique,
        completed
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/breathing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Breathing session saved:', result);
      } else {
        console.error('❌ Failed to save breathing session');
      }
    } catch (error) {
      console.error('❌ Error saving breathing session:', error);
    }
  };

  const currentPhase = techniques[currentTechnique].phases.find(p => p.name === phase) || techniques[currentTechnique].phases[0];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 25%, #06b6d4 50%, #3b82f6 75%, #8b5cf6 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Beautiful Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: isMobile ? '2rem' : '3rem',
            marginBottom: '2rem',
            boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'inline-block',
              marginBottom: '1.5rem',
              boxShadow: '0 15px 40px rgba(6, 182, 212, 0.3)'
            }}>
              <span style={{ fontSize: '3rem', color: 'white' }}>🧘‍♀️</span>
            </div>
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em'
            }}>
              Mindful Breathing
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '1.3rem',
              margin: 0,
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover the power of breath to calm your mind, reduce stress, and find inner peace ✨
            </p>
          </div>

          {/* Technique Selection Grid */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: isMobile ? '2rem' : '2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              color: '#1f2937',
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              🌈 Choose Your Breathing Technique
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {Object.entries(techniques).map(([key, technique]) => (
                <button
                  key={key}
                  style={{
                    background: currentTechnique === key
                      ? `linear-gradient(135deg, ${technique.color}, ${technique.color}dd)`
                      : 'rgba(255, 255, 255, 0.9)',
                    color: currentTechnique === key ? 'white' : '#1f2937',
                    border: currentTechnique === key ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: isActive ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    boxShadow: currentTechnique === key 
                      ? `0 15px 40px ${technique.color}40`
                      : '0 8px 25px rgba(0, 0, 0, 0.1)',
                    opacity: isActive && currentTechnique !== key ? 0.6 : 1,
                    transform: currentTechnique === key ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                  onClick={() => !isActive && setCurrentTechnique(key)}
                  disabled={isActive}
                  onMouseOver={(e) => {
                    if (!isActive && currentTechnique !== key) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentTechnique !== key) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>{technique.emoji}</span>
                    <div>
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        marginBottom: '0.25rem'
                      }}>
                        {technique.name}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        {technique.category}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    fontWeight: '500'
                  }}>
                    {technique.description}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    lineHeight: '1.4'
                  }}>
                    {technique.benefits}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Breathing Animation Circle */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: isMobile ? '3rem 2rem' : '4rem 3rem',
            marginBottom: '2rem',
            boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            
            {/* Current Technique Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{techniques[currentTechnique].emoji}</span>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: techniques[currentTechnique].color,
                  margin: '0 0 0.25rem 0'
                }}>
                  {techniques[currentTechnique].name}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  margin: 0
                }}>
                  {techniques[currentTechnique].category}
                </p>
              </div>
            </div>

            {/* Breathing Circle */}
            <div style={{
              width: isMobile ? '250px' : '350px',
              height: isMobile ? '250px' : '350px',
              margin: '0 auto 2rem',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${isActive ? currentPhase.color : techniques[currentTechnique].color}, transparent)`,
              border: `6px solid ${isActive ? currentPhase.color : techniques[currentTechnique].color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isActive ? (
                phase === 'inhale' ? 'scale(1.3)' : 
                phase === 'hold' ? 'scale(1.3)' : 
                'scale(0.8)'
              ) : 'scale(1)',
              opacity: isActive ? (phase === 'hold' ? '0.9' : '1') : '1',
              boxShadow: `0 20px 60px ${isActive ? currentPhase.color : techniques[currentTechnique].color}40`,
              position: 'relative'
            }}>
              {/* Inner glow effect */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${isActive ? currentPhase.color : techniques[currentTechnique].color}20, transparent)`,
                animation: isActive ? 'pulse 2s infinite' : 'none'
              }}></div>
              
              <div style={{
                color: 'white',
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: '800',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                zIndex: 2
              }}>
                {isActive ? countdown : '🫁'}
              </div>
            </div>

            {/* Phase Instructions */}
            <div style={{
              fontSize: isMobile ? '1.3rem' : '1.6rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              minHeight: '2.5rem',
              lineHeight: '1.4'
            }}>
              {isActive ? currentPhase.instruction : `Ready to begin ${techniques[currentTechnique].name}?`}
            </div>

            {/* Session Stats */}
            {isActive && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '2rem' : '3rem',
                marginBottom: '2rem',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                <div style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  color: '#0891b2'
                }}>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.25rem' }}>Cycle</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{cycle}</div>
                </div>
                <div style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  color: '#8b5cf6'
                }}>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.25rem' }}>Time</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>
                    {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            )}

            {/* Control Button */}
            <button
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : `linear-gradient(135deg, ${techniques[currentTechnique].color}, ${techniques[currentTechnique].color}dd)`,
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '1.5rem 3rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '700',
                fontSize: '1.2rem',
                boxShadow: `0 15px 40px ${isActive ? '#ef4444' : techniques[currentTechnique].color}40`,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: '0 auto'
              }}
              onClick={isActive ? stopSession : startSession}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = `0 20px 50px ${isActive ? '#ef4444' : techniques[currentTechnique].color}50`;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 15px 40px ${isActive ? '#ef4444' : techniques[currentTechnique].color}40`;
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>
                {isActive ? '⏹️' : '▶️'}
              </span>
              {isActive ? 'Stop Session' : 'Start Breathing'}
            </button>
          </div>

          {/* Enhanced Benefits Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: isMobile ? '2rem' : '2.5rem',
            boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              color: '#1f2937',
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              🌟 The Science of Breathing
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  emoji: '😌',
                  title: 'Activates Parasympathetic System',
                  desc: 'Deep breathing triggers your body\'s natural relaxation response, reducing cortisol and stress hormones.',
                  color: '#06b6d4',
                  bg: 'rgba(6, 182, 212, 0.1)'
                },
                {
                  emoji: '🎯',
                  title: 'Enhances Mental Clarity',
                  desc: 'Controlled breathing increases oxygen to the brain, improving focus, concentration, and decision-making.',
                  color: '#10b981',
                  bg: 'rgba(16, 185, 129, 0.1)'
                },
                {
                  emoji: '😴',
                  title: 'Improves Sleep Quality',
                  desc: 'Evening breathing practices calm the nervous system, preparing your body for deeper, more restful sleep.',
                  color: '#8b5cf6',
                  bg: 'rgba(139, 92, 246, 0.1)'
                },
                {
                  emoji: '❤️',
                  title: 'Supports Heart Health',
                  desc: 'Regular practice helps lower blood pressure, improves heart rate variability, and strengthens cardiovascular health.',
                  color: '#ef4444',
                  bg: 'rgba(239, 68, 68, 0.1)'
                },
                {
                  emoji: '🧠',
                  title: 'Balances Brain Hemispheres',
                  desc: 'Techniques like alternate nostril breathing harmonize left and right brain activity for better emotional regulation.',
                  color: '#f59e0b',
                  bg: 'rgba(245, 158, 11, 0.1)'
                },
                {
                  emoji: '💪',
                  title: 'Boosts Immune Function',
                  desc: 'Deep breathing increases lymphatic circulation and oxygenation, strengthening your body\'s natural defenses.',
                  color: '#0891b2',
                  bg: 'rgba(8, 145, 178, 0.1)'
                }
              ].map((benefit, index) => (
                <div key={index} style={{
                  background: benefit.bg,
                  padding: '2rem',
                  borderRadius: '20px',
                  border: `2px solid ${benefit.color}20`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = `0 15px 40px ${benefit.color}20`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {benefit.emoji}
                  </div>
                  <h3 style={{
                    color: benefit.color,
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {benefit.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Add CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default BreathingExercises;


