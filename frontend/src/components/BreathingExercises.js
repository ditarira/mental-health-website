import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercises = () => {
  const { user } = useAuth();
  const [currentTechnique, setCurrentTechnique] = useState('478');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [countdown, setCountdown] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userMood, setUserMood] = useState('');

  const intervalRef = useRef(null);
  const sessionRef = useRef(null);
  const phaseTimeoutRef = useRef(null);

  const techniques = {
    '478': {
      name: '4-7-8 Relaxation',
      description: 'Inhale 4, hold 7, exhale 8',
      category: 'anxiety',
      benefits: 'Perfect for anxiety and sleep',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in slowly through your nose...', color: '#4CAF50' },
        { name: 'hold', duration: 7, instruction: 'Hold your breath gently...', color: '#FF9800' },
        { name: 'exhale', duration: 8, instruction: 'Exhale slowly through your mouth...', color: '#2196F3' }
      ]
    },
    'box': {
      name: 'Box Breathing',
      description: 'Equal 4-4-4-4 rhythm',
      category: 'stress',
      benefits: 'Great for focus and stress relief',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in...', color: '#4CAF50' },
        { name: 'hold', duration: 4, instruction: 'Hold...', color: '#FF9800' },
        { name: 'exhale', duration: 4, instruction: 'Breathe out...', color: '#2196F3' },
        { name: 'pause', duration: 4, instruction: 'Pause and rest...', color: '#9C27B0' }
      ]
    },
    'triangle': {
      name: 'Triangle',
      description: 'Simple 4-4-4 pattern',
      category: 'calm',
      benefits: 'Easy technique for beginners',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in...', color: '#4CAF50' },
        { name: 'hold', duration: 4, instruction: 'Hold...', color: '#FF9800' },
        { name: 'exhale', duration: 4, instruction: 'Breathe out...', color: '#2196F3' }
      ]
    },
    'calm': {
      name: 'Calm & Focus',
      description: 'Breathe 6, hold 2, exhale 6',
      category: 'focus',
      benefits: 'Enhanced concentration',
      phases: [
        { name: 'inhale', duration: 6, instruction: 'Deep breath in...', color: '#4CAF50' },
        { name: 'hold', duration: 2, instruction: 'Brief hold...', color: '#FF9800' },
        { name: 'exhale', duration: 6, instruction: 'Long exhale...', color: '#2196F3' }
      ]
    },
    'energize': {
      name: 'Energizing',
      description: 'Quick 3-3-3 rhythm',
      category: 'energy',
      benefits: 'Boost energy and alertness',
      phases: [
        { name: 'inhale', duration: 3, instruction: 'Quick inhale...', color: '#4CAF50' },
        { name: 'hold', duration: 3, instruction: 'Hold briefly...', color: '#FF9800' },
        { name: 'exhale', duration: 3, instruction: 'Quick exhale...', color: '#2196F3' }
      ]
    },
    'wim_hof': {
      name: 'Wim Hof Method',
      description: '30 deep breaths + retention',
      category: 'advanced',
      benefits: 'Boosts immune system and energy',
      phases: [
        { name: 'inhale', duration: 2, instruction: 'Deep powerful inhale...', color: '#4CAF50' },
        { name: 'exhale', duration: 2, instruction: 'Natural exhale, let go...', color: '#2196F3' }
      ]
    },
    'coherent': {
      name: 'Coherent Breathing',
      description: '5 seconds in, 5 seconds out',
      category: 'balance',
      benefits: 'Balances nervous system',
      phases: [
        { name: 'inhale', duration: 5, instruction: 'Smooth inhale for 5...', color: '#4CAF50' },
        { name: 'exhale', duration: 5, instruction: 'Smooth exhale for 5...', color: '#2196F3' }
      ]
    },
    'alternate_nostril': {
      name: 'Alternate Nostril',
      description: 'Balancing breath technique',
      category: 'balance',
      benefits: 'Balances left/right brain',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Inhale through left nostril...', color: '#4CAF50' },
        { name: 'hold', duration: 4, instruction: 'Hold, switch to right...', color: '#FF9800' },
        { name: 'exhale', duration: 4, instruction: 'Exhale through right nostril...', color: '#2196F3' },
        { name: 'pause', duration: 2, instruction: 'Switch back to left...', color: '#9C27B0' }
      ]
    },
    'belly': {
      name: 'Belly Breathing',
      description: 'Deep diaphragmatic breathing',
      category: 'relaxation',
      benefits: 'Activates relaxation response',
      phases: [
        { name: 'inhale', duration: 6, instruction: 'Breathe deep into your belly...', color: '#4CAF50' },
        { name: 'hold', duration: 2, instruction: 'Gentle pause...', color: '#FF9800' },
        { name: 'exhale', duration: 8, instruction: 'Slowly deflate your belly...', color: '#2196F3' }
      ]
    },
    'ocean': {
      name: 'Ocean Breath (Ujjayi)',
      description: 'Yoga breathing with sound',
      category: 'yoga',
      benefits: 'Calming and meditative',
      phases: [
        { name: 'inhale', duration: 5, instruction: 'Inhale with slight throat constriction...', color: '#4CAF50' },
        { name: 'exhale', duration: 5, instruction: 'Exhale with ocean sound...', color: '#2196F3' }
      ]
    },
    'counted': {
      name: 'Counted Breathing',
      description: '4-4-6-2 pattern',
      category: 'structured',
      benefits: 'Systematic stress relief',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Count: 1-2-3-4 inhale...', color: '#4CAF50' },
        { name: 'hold', duration: 4, instruction: 'Hold: 1-2-3-4...', color: '#FF9800' },
        { name: 'exhale', duration: 6, instruction: 'Count: 1-2-3-4-5-6 exhale...', color: '#2196F3' },
        { name: 'pause', duration: 2, instruction: 'Pause: 1-2...', color: '#9C27B0' }
      ]
    },
    'breathe_of_fire': {
      name: 'Breath of Fire',
      description: 'Rapid energizing breaths',
      category: 'energy',
      benefits: 'Increases alertness and warmth',
      phases: [
        { name: 'inhale', duration: 1, instruction: 'Quick sharp inhale...', color: '#4CAF50' },
        { name: 'exhale', duration: 1, instruction: 'Quick sharp exhale...', color: '#2196F3' }
      ]
    }
  };

  const getMoodRecommendation = (mood) => {
    const recommendations = {
      stressed: {
        technique: 'box',
        reason: 'Box breathing helps regulate your nervous system and reduces stress hormones.'
      },
      anxious: {
        technique: '478',
        reason: '4-7-8 breathing activates your parasympathetic nervous system, promoting calm.'
      },
      tired: {
        technique: 'energize',
        reason: 'Energizing breath work increases oxygen flow and alertness.'
      },
      unfocused: {
        technique: 'calm',
        reason: 'This technique enhances concentration and mental clarity.'
      },
      angry: {
        technique: 'coherent',
        reason: 'Coherent breathing helps balance emotions and restore inner peace.'
      },
      sad: {
        technique: 'belly',
        reason: 'Belly breathing activates the relaxation response and promotes comfort.'
      },
      overwhelmed: {
        technique: 'alternate_nostril',
        reason: 'This balancing technique helps organize scattered thoughts and emotions.'
      },
      restless: {
        technique: 'ocean',
        reason: 'Ocean breath provides a meditative focus to calm restless energy.'
      }
    };
    return recommendations[mood] || { technique: 'triangle', reason: 'A gentle, beginner-friendly technique.' };
  };

  const handleMoodSelection = (mood) => {
    const recommendation = getMoodRecommendation(mood);
    setCurrentTechnique(recommendation.technique);
    setUserMood(mood);
    setShowRecommendations(false);
  };

  // Session timer
  useEffect(() => {
    if (isActive) {
      sessionRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (sessionRef.current) {
        clearInterval(sessionRef.current);
      }
    }

    return () => {
      if (sessionRef.current) clearInterval(sessionRef.current);
    };
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sessionRef.current) clearInterval(sessionRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, []);

  const playSound = (frequency) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not available');
    }
  };

  const startBreathing = () => {
    console.log('🚀 Starting breathing session...');
    
    // Clear any existing timers first
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    
    setIsActive(true);
    setCycle(1);
    setSessionTime(0);
    
    // Small delay to ensure state is set, then start
    setTimeout(() => {
      startPhase(0, 1);
    }, 100);
  };

  const startPhase = (phaseIndex, currentCycle) => {
    const technique = techniques[currentTechnique];
    const phaseData = technique.phases[phaseIndex];

    if (!phaseData) {
      console.error('❌ No phase data found for index:', phaseIndex);
      return;
    }

    console.log(`🔄 Starting ${phaseData.name} - Cycle ${currentCycle} - Phase ${phaseIndex + 1}/${technique.phases.length}`);

    // Update UI immediately
    setPhase(phaseData.name);
    setCountdown(phaseData.duration);
    setCycle(currentCycle);

    // Play sound for phase
    const sounds = { inhale: 220, hold: 330, exhale: 165, pause: 110 };
    playSound(sounds[phaseData.name]);

    // Clear any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);

    let timeRemaining = phaseData.duration;
    console.log(`⏱️ Starting countdown from ${timeRemaining} seconds`);

    // Start countdown timer
    intervalRef.current = setInterval(() => {
      timeRemaining--;
      console.log(`⏱️ ${phaseData.name}: ${timeRemaining}s left`);
      setCountdown(timeRemaining);

      if (timeRemaining <= 0) {
        console.log(`✅ ${phaseData.name} complete!`);
        clearInterval(intervalRef.current);
        
        // Move to next phase or cycle
        const nextPhaseIndex = phaseIndex + 1;
        
        if (nextPhaseIndex >= technique.phases.length) {
          // Cycle complete
          console.log(`🎯 Cycle ${currentCycle} complete!`);
          const nextCycle = currentCycle + 1;
          
          if (nextCycle > 5) {
            // All cycles complete
            console.log('🎉 All cycles complete! Session finished!');
            stopBreathing();
            playSound(523); // Success sound
            return;
          } else {
            // Start next cycle
            console.log(`🔄 Starting cycle ${nextCycle}`);
            phaseTimeoutRef.current = setTimeout(() => {
              startPhase(0, nextCycle);
            }, 800);
          }
        } else {
          // Continue to next phase in same cycle
          console.log(`➡️ Moving to next phase: ${technique.phases[nextPhaseIndex].name}`);
          phaseTimeoutRef.current = setTimeout(() => {
            startPhase(nextPhaseIndex, currentCycle);
          }, 800);
        }
      }
    }, 1000);
  };

  const stopBreathing = () => {
    console.log('⏹️ Stopping breathing session');
    setIsActive(false);
    setPhase('ready');
    setCountdown(0);

    // Clear all timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  const getCurrentPhaseData = () => {
    if (phase === 'ready') {
      return { instruction: 'Press start to begin your breathing session', color: '#7ca5b8' };
    }

    const technique = techniques[currentTechnique];
    const phaseData = technique.phases.find(p => p.name === phase);
    return phaseData || { instruction: 'Get ready...', color: '#7ca5b8' };
  };

  const getCircleStyle = () => {
    const baseSize = window.innerWidth > 768 ? 200 : 160;
    let scale = 1;
    let opacity = 0.5;

    if (isActive) {
      switch (phase) {
        case 'inhale':
          scale = 1.5;
          opacity = 0.9;
          break;
        case 'hold':
          scale = 1.6;
          opacity = 1.0;
          break;
        case 'exhale':
          scale = 0.7;
          opacity = 0.6;
          break;
        case 'pause':
          scale = 1.0;
          opacity = 0.5;
          break;
        default:
          scale = 1.0;
          opacity = 0.5;
      }
    }

    const currentPhaseData = getCurrentPhaseData();

    return {
      width: `${baseSize}px`,
      height: `${baseSize}px`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: opacity,
      background: `radial-gradient(circle, ${currentPhaseData.color}60, ${currentPhaseData.color}20)`,
      transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%'
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPhaseData = getCurrentPhaseData();

  return (
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f1f5 0%, #c8e6c9 50%, #bbdefb 100%)'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            color: '#2d4654',
            fontSize: window.innerWidth > 768 ? '3rem' : '2.2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            🧘 Breathing Studio
          </h1>
          <p style={{
            color: '#5a6c7d',
            fontSize: window.innerWidth > 768 ? '1.2rem' : '1rem',
            marginBottom: '1rem'
          }}>
            Professional breathing techniques for wellness
          </p>
          
          {/* Mood-Based Recommendations */}
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            disabled={isActive}
            style={{
              background: 'linear-gradient(135deg, #98c1d9, #7ca5b8)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isActive ? 'not-allowed' : 'pointer',
              opacity: isActive ? 0.6 : 1,
              marginBottom: showRecommendations ? '1rem' : '0',
              transition: 'all 0.3s ease'
            }}
          >
            🎯 How are you feeling? Get personalized recommendation
          </button>

          {showRecommendations && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '1.5rem',
              marginTop: '1rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              margin: '1rem auto 0'
            }}>
              <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>
                How are you feeling right now?
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)',
                gap: '0.8rem'
              }}>
                {[
                  { mood: 'stressed', emoji: '😰', label: 'Stressed' },
                  { mood: 'anxious', emoji: '😟', label: 'Anxious' },
                  { mood: 'tired', emoji: '😴', label: 'Tired' },
                  { mood: 'unfocused', emoji: '🤯', label: 'Unfocused' },
                  { mood: 'angry', emoji: '😠', label: 'Angry' },
                  { mood: 'sad', emoji: '😢', label: 'Sad' },
                  { mood: 'overwhelmed', emoji: '🤪', label: 'Overwhelmed' },
                  { mood: 'restless', emoji: '😤', label: 'Restless' }
                ].map(({ mood, emoji, label }) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    style={{
                      background: userMood === mood ? '#7ca5b8' : 'white',
                      color: userMood === mood ? 'white' : '#2d4654',
                      border: `2px solid ${userMood === mood ? '#7ca5b8' : '#ddd'}`,
                      borderRadius: '10px',
                      padding: '0.8rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{emoji}</div>
                    {label}
                  </button>
                ))}
              </div>
              
              {userMood && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#7ca5b815',
                  borderRadius: '10px',
                  border: '2px solid #7ca5b830'
                }}>
                  <p style={{ color: '#2d4654', margin: '0', fontSize: '0.9rem' }}>
                    💡 <strong>Recommended:</strong> {techniques[getMoodRecommendation(userMood).technique].name} - {getMoodRecommendation(userMood).reason}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '300px 1fr 300px' :
                             window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Techniques */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            order: window.innerWidth <= 768 ? 2 : 1
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#2d4654'
            }}>
              Select Technique
            </h3>

            <div style={{
              display: window.innerWidth <= 768 ? 'grid' : 'block',
              gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(auto-fit, minmax(140px, 1fr))' : 'none',
              gap: '0.5rem',
              maxHeight: window.innerWidth <= 768 ? 'none' : '400px',
              overflowY: window.innerWidth <= 768 ? 'visible' : 'auto'
            }}>
              {Object.entries(techniques).map(([key, technique]) => (
                <button
                  key={key}
                  onClick={() => !isActive && setCurrentTechnique(key)}
                  disabled={isActive}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    marginBottom: window.innerWidth > 768 ? '0.5rem' : '0',
                    border: currentTechnique === key ? '2px solid #7ca5b8' : '1px solid #ddd',
                    borderRadius: '10px',
                    background: currentTechnique === key ? '#7ca5b8' : 'white',
                    color: currentTechnique === key ? 'white' : '#2d4654',
                    cursor: isActive ? 'not-allowed' : 'pointer',
                    opacity: isActive ? 0.6 : 1,
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>
                    {technique.name}
                  </div>
                  {window.innerWidth > 768 && (
                    <>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.2rem' }}>
                        {technique.description}
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.9, fontStyle: 'italic' }}>
                        {technique.benefits}
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Breathing Circle */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '25px',
            padding: window.innerWidth > 768 ? '3rem' : '2rem',
            textAlign: 'center',
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: 1
          }}>
            {/* Breathing Circle Container */}
            <div style={{
              position: 'relative',
              width: window.innerWidth > 768 ? '250px' : '200px',
              height: window.innerWidth > 768 ? '250px' : '200px',
              margin: '0 auto 2rem'
            }}>
              {/* Animated Outer Circle */}
              <div style={getCircleStyle()} />

              {/* Inner Display Circle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: window.innerWidth > 768 ? '150px' : '120px',
                height: window.innerWidth > 768 ? '150px' : '120px',
                borderRadius: '50%',
                backgroundColor: 'white',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 10px 25px rgba(0,0,0,0.1), inset 0 0 0 3px ${currentPhaseData.color}`,
                zIndex: 10
              }}>
                <div style={{
                  fontSize: window.innerWidth > 768 ? '1.3rem' : '1.1rem',
                  fontWeight: 'bold',
                  color: currentPhaseData.color,
                  marginBottom: '0.3rem',
                  textTransform: 'capitalize'
                }}>
                  {phase}
                </div>

                {isActive && countdown > 0 && (
                  <div style={{
                    fontSize: window.innerWidth > 768 ? '2.2rem' : '1.8rem',
                    fontWeight: 'bold',
                    color: currentPhaseData.color
                  }}>
                    {countdown}
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div style={{
              padding: '1rem',
              background: `${currentPhaseData.color}15`,
              borderRadius: '15px',
              marginBottom: '2rem',
              border: `2px solid ${currentPhaseData.color}30`
            }}>
              <p style={{
                fontSize: window.innerWidth > 768 ? '1.2rem' : '1rem',
                color: '#2d4654',
                margin: '0',
                fontWeight: '500'
              }}>
                {currentPhaseData.instruction}
              </p>
            </div>

            {/* Control Button */}
            {!isActive ? (
              <button
                onClick={startBreathing}
                style={{
                  background: 'linear-gradient(135deg, #7ca5b8, #4d7a97)',
                  padding: window.innerWidth > 768 ? '1.2rem 2.5rem' : '1rem 2rem',
                  fontSize: window.innerWidth > 768 ? '1.2rem' : '1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(124, 165, 184, 0.3)',
                  transition: 'all 0.3s ease',
                  width: window.innerWidth <= 480 ? '100%' : 'auto'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(124, 165, 184, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(124, 165, 184, 0.3)';
                }}
              >
                🚀 Start Breathing
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                style={{
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  padding: window.innerWidth > 768 ? '1.2rem 2.5rem' : '1rem 2rem',
                  fontSize: window.innerWidth > 768 ? '1.2rem' : '1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  width: window.innerWidth <= 480 ? '100%' : 'auto'
                }}
              >
                ⏹️ Stop Session
              </button>
            )}
          </div>

          {/* Stats Panel */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            order: 3
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#2d4654'
            }}>
              Session Stats
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr 1fr' : '1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                padding: '1rem',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>
                  {cycle}/5
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Cycles</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                padding: '1rem',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7b1fa2' }}>
                  {formatTime(sessionTime)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Time</div>
              </div>
            </div>

            {/* Current Technique Info */}
            <div style={{
              background: `${currentPhaseData.color}15`,
              padding: '1rem',
              borderRadius: '10px',
              border: `2px solid ${currentPhaseData.color}30`,
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#2d4654', marginBottom: '0.5rem' }}>
                {techniques[currentTechnique].name}
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                {techniques[currentTechnique].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercises;
