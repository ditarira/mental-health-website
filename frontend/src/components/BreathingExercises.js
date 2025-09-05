import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercise = () => {
  const { user, token } = useAuth();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [totalCycles, setTotalCycles] = useState(5);
  const [sessions, setSessions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showExerciseList, setShowExerciseList] = useState(true);
  const [showDetails, setShowDetails] = useState(null);
  const [isCountdown, setIsCountdown] = useState(false); // NEW: countdown state

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Format date in a simple, universal way
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Format duration in a simple way
  const formatDuration = (seconds) => {
    return Math.round(seconds) + 's';
  };

  const exercises = [
    {
      id: 1,
      name: '4•4•4 Breathing',
      description: 'Equal breathing for relaxation',
      inhale: 4,
      hold: 4,
      exhale: 4,
      emoji: '🌸',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      name: '4•7•8 Breathing',
      description: 'Calming, best before sleep',
      inhale: 4,
      hold: 7,
      exhale: 8,
      emoji: '🌙',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      name: 'Box Breathing',
      description: 'Stress relief & focus',
      inhale: 4,
      hold: 4,
      exhale: 4,
      hold2: 4,
      emoji: '📦',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      name: 'Quick Calm',
      description: 'Fast relaxation, anywhere',
      inhale: 3,
      hold: 3,
      exhale: 3,
      emoji: '⚡',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      name: 'Alternate Nostril',
      description: 'Balances mind & body',
      inhale: 4,
      hold: 4,
      exhale: 4,
      special: 'alternate',
      emoji: '🔄',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'Advanced'
    },
    {
      id: 6,
      name: 'Resonance Breathing',
      description: 'Heart-rate coherence, ~5.5 breaths/min',
      inhale: 5.5,
      exhale: 5.5,
      emoji: '🎵',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      difficulty: 'All levels'
    }
  ];

  const showNotification = (message, type = 'success') => {
    setMessage(message);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchSessions = async () => {
    try {
      if (!token) return;

      const response = await fetch(`${API_BASE}/api/breathing`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSessions(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const saveSession = async (exerciseData, duration, completed = false) => {
    try {
      if (!token) return;

      const response = await fetch(`${API_BASE}/api/breathing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: exerciseData.name,
          duration: duration,
          completed: completed,
          cycles: cycle
        })
      });

      if (response.ok) {
        showNotification(completed ? 'Breathing session completed!' : 'Session saved!', 'success');
        fetchSessions();
        window.dispatchEvent(new CustomEvent('journalUpdated'));
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // UPDATED: Start with countdown instead of immediately starting exercise
  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    setIsCountdown(true); // Start countdown phase
    setPhase('countdown');
    setTimeLeft(3); // Start countdown from 3
    setCycle(0);
    setStartTime(null); // Don't start timing until actual exercise begins
    setShowExerciseList(false);
  };

  const stopExercise = () => {
    if (currentExercise && startTime && !isCountdown) {
      const duration = (Date.now() - startTime) / 1000;
      saveSession(currentExercise, duration, false);
    }
    
    setCurrentExercise(null);
    setIsActive(false);
    setIsCountdown(false); // Reset countdown
    setPhase('');
    setTimeLeft(0);
    setCycle(0);
    setStartTime(null);
    setShowExerciseList(true);
  };

  const completeExercise = () => {
    if (currentExercise && startTime) {
      const duration = (Date.now() - startTime) / 1000;
      saveSession(currentExercise, duration, true);
    }
    
    setCurrentExercise(null);
    setIsActive(false);
    setIsCountdown(false); // Reset countdown
    setPhase('');
    setTimeLeft(0);
    setCycle(0);
    setStartTime(null);
    setShowExerciseList(true);
  };

  const getPhaseText = (currentPhase, exercise) => {
    if (currentPhase === 'countdown') {
      return timeLeft > 0 ? `Starting in ${timeLeft}` : 'Begin!';
    }
    if (exercise?.special === 'alternate') {
      if (currentPhase === 'inhale') return cycle % 2 === 1 ? 'Inhale Left' : 'Inhale Right';
      if (currentPhase === 'hold') return 'Hold';
      if (currentPhase === 'exhale') return cycle % 2 === 1 ? 'Exhale Right' : 'Exhale Left';
    }
    if (currentPhase === 'hold2') return 'Hold';
    return currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1);
  };

  // UPDATED: Handle countdown and exercise phases
  useEffect(() => {
    let interval = null;

    if (currentExercise && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (currentExercise && timeLeft === 0) {
      if (isCountdown) {
        // Countdown finished, start actual exercise
        setIsCountdown(false);
        setIsActive(true);
        setPhase('inhale');
        setTimeLeft(currentExercise.inhale);
        setCycle(1);
        setStartTime(Date.now()); // Start timing the actual exercise
      } else if (isActive) {
        // Handle exercise phases (existing logic)
        if (phase === 'inhale') {
          if (currentExercise.hold) {
            setPhase('hold');
            setTimeLeft(currentExercise.hold);
          } else {
            setPhase('exhale');
            setTimeLeft(currentExercise.exhale);
          }
        } else if (phase === 'hold') {
          setPhase('exhale');
          setTimeLeft(currentExercise.exhale);
        } else if (phase === 'exhale') {
          if (currentExercise.hold2) {
            setPhase('hold2');
            setTimeLeft(currentExercise.hold2);
          } else {
            // Complete cycle
            if (cycle >= totalCycles) {
              completeExercise();
              return;
            }
            setCycle(prev => prev + 1);
            setPhase('inhale');
            setTimeLeft(currentExercise.inhale);
          }
        } else if (phase === 'hold2') {
          // Complete cycle
          if (cycle >= totalCycles) {
            completeExercise();
            return;
          }
          setCycle(prev => prev + 1);
          setPhase('inhale');
          setTimeLeft(currentExercise.inhale);
        }
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, phase, currentExercise, cycle, totalCycles, isActive, isCountdown]);

  useEffect(() => {
    if (user && token) {
      fetchSessions();
    }
  }, [user, token]);

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧘‍♀️</div>
          <h2 style={{ color: '#1f2937', marginBottom: '10px' }}>Please log in</h2>
          <p style={{ color: '#6b7280' }}>Sign in to access breathing exercises</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0'
    }}>
      {/* Notification */}
      {message && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: message.includes('completed') || message.includes('saved') ?
            'linear-gradient(135deg, #10b981, #059669)' :
            'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: isMobile ? '300px' : '400px',
          fontSize: isMobile ? '0.9rem' : '1rem'
        }}>
          {message}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: isMobile ? '25px' : '30px',
            maxWidth: isMobile ? '320px' : '400px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{showDetails.emoji}</div>
            <h3 style={{
              color: '#374151',
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              fontWeight: '700',
              margin: '0 0 15px 0'
            }}>
              {showDetails.name}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: isMobile ? '0.9rem' : '1rem',
              margin: '0 0 20px 0',
              lineHeight: '1.5'
            }}>
              {showDetails.description}
            </p>
            
            {/* Phases Display */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '20px',
              fontFamily: 'Arial, sans-serif'
            }}>
              <h4 style={{ color: '#374151', margin: '0 0 10px 0', fontSize: '0.9rem' }}>Phases:</h4>
              {showDetails.special === 'alternate' ? (
                <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4' }}>
                  <div>Inhale Left {showDetails.inhale}s • Hold {showDetails.hold}s • Exhale Right {showDetails.exhale}s</div>
                  <div>Inhale Right {showDetails.inhale}s • Hold {showDetails.hold}s • Exhale Left {showDetails.exhale}s</div>
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  Inhale {showDetails.inhale}s
                  {showDetails.hold && ` • Hold ${showDetails.hold}s`}
                  • Exhale {showDetails.exhale}s
                  {showDetails.hold2 && ` • Hold ${showDetails.hold2}s`}
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setShowDetails(null)}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '10px',
                  padding: isMobile ? '10px 20px' : '12px 24px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowDetails(null);
                  startExercise(showDetails);
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: isMobile ? '10px 20px' : '12px 24px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                ▶ Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WHITE HEADER - HIDE ON MOBILE */}
      {!isMobile && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(25px)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          margin: '40px',
          marginBottom: '32px',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '2.5rem' }}>🧘‍♀️</span>
              <h1 style={{
                margin: 0,
                fontSize: '2rem',
                color: '#374151',
                fontWeight: '700',
                letterSpacing: '0',
                wordSpacing: '0'
              }}>
                Breathing Exercises
              </h1>
            </div>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: '#6b7280',
              letterSpacing: '0',
              wordSpacing: '0'
            }}>
              Find your calm through mindful breathing
            </p>
          </div>
        </div>
      )}
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 20px 40px' : '0 40px 40px'
      }}>
        {/* Rest of your existing layout code continues here... */}
        {/* I'll include the breathing circle updates for both mobile and desktop */}
        
        {/* MOBILE LAYOUT */}
        {isMobile ? (
          <div>
            {/* Show Exercise List OR Active Exercise */}
            {showExerciseList ? (
              /* Your existing exercise list code... */
              <div>
                {/* Header Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '20px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌬️</div>
                  <h2 style={{ 
                    color: '#374151', 
                    fontSize: '1.3rem', 
                    fontWeight: '700',
                    margin: '0 0 8px 0'
                  }}>
                    Breathing Exercises
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '1rem',
                    margin: 0
                  }}>
                    Choose a technique to begin
                  </p>
                </div>

                {/* Exercise List */}
                <div style={{
                  display: 'grid',
                  gap: '15px'
                }}>
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '15px',
                        padding: '20px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Your existing exercise card content... */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}>
                        <span style={{ 
                          fontSize: '1.5rem', 
                          marginRight: '10px' 
                        }}>
                          {exercise.emoji}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            fontFamily: 'Arial, sans-serif',
                            marginBottom: '2px'
                          }}>
                            Exercise #{index + 1} ({exercise.difficulty})
                          </div>
                          <h4 style={{
                            margin: 0,
                            color: '#374151',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                          }}>
                            {exercise.name}
                          </h4>
                        </div>
                      </div>

                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        margin: '0 0 12px 0',
                        lineHeight: '1.4'
                      }}>
                        Description: {exercise.description}
                      </p>

                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '15px',
                        fontSize: '0.8rem',
                        color: '#6b7280',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        <strong>Phases:</strong>{' '}
                        {exercise.special === 'alternate' ? (
                          <>
                            Inhale Left {exercise.inhale}s • Hold {exercise.hold}s • Exhale Right {exercise.exhale}s
                            <br />
                            Inhale Right {exercise.inhale}s • Hold {exercise.hold}s • Exhale Left {exercise.exhale}s
                          </>
                        ) : (
                          <>
                            Inhale {exercise.inhale}s
                            {exercise.hold && ` • Hold ${exercise.hold}s`}
                            • Exhale {exercise.exhale}s
                            {exercise.hold2 && ` • Hold ${exercise.hold2}s`}
                          </>
                        )}
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '10px'
                      }}>
                        <button
                          onClick={() => startExercise(exercise)}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>▶</span>
                          <span>Start Exercise</span>
                        </button>

                        <button
                          onClick={() => setShowDetails(exercise)}
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            border: '2px solid #667eea',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>ℹ</span>
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ACTIVE EXERCISE - MOBILE WITH COUNTDOWN */
              currentExercise && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  border: `3px solid ${isCountdown ? '#f59e0b' : '#667eea'}`
                }}>
                  {/* Back Button */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <button
                      onClick={stopExercise}
                      style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      ← Back
                    </button>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.2rem',
                      color: '#374151',
                      fontWeight: '700'
                    }}>
                      {currentExercise.name}
                    </h3>
                    <div style={{ width: '60px' }}></div>
                  </div>

                  {/* UPDATED: Breathing Circle with countdown styling */}
                  <div style={{
                    width: '200px',
                    height: '200px',
                    margin: '0 auto 25px auto',
                    borderRadius: '50%',
                    background: isCountdown ? 
                      'linear-gradient(135deg, #f59e0b, #d97706)' : 
                      currentExercise.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transform: phase === 'inhale' && !isCountdown ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                    boxShadow: isCountdown ? 
                      '0 20px 60px rgba(245, 158, 11, 0.3)' : 
                      '0 20px 60px rgba(102, 126, 234, 0.3)'
                  }}>
                    <div style={{
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '10px',
                        textTransform: 'capitalize'
                      }}>
                        {getPhaseText(phase, currentExercise)}
                      </div>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {isCountdown && timeLeft === 0 ? '🌟' : Math.ceil(timeLeft)}
                      </div>
                    </div>
                  </div>

                  {/* UPDATED: Progress - hide during countdown */}
                  {!isCountdown && (
                    <div style={{
                      marginBottom: '25px'
                    }}>
                      <p style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 10px 0',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        Cycle {cycle} of {totalCycles}
                      </p>
                      <div style={{
                        background: '#e5e7eb',
                        borderRadius: '10px',
                        height: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          height: '100%',
                          width: `${(cycle / totalCycles) * 100}%`,
                          borderRadius: '10px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>
                  )}

                  {/* UPDATED: Controls - show different buttons during countdown */}
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    {isCountdown ? (
                      /* Only show back button during countdown */
                      <button
                        onClick={stopExercise}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 20px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>✕</span>
                        <span>Cancel</span>
                      </button>
                    ) : (
                      /* Show normal controls during exercise */
                      <>
                        <button
                          onClick={stopExercise}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>⏹️</span>
                          <span>Stop</span>
                        </button>

                        <button
                          onClick={completeExercise}
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>✅</span>
                          <span>Complete</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Sessions History - MOBILE */}
            {sessions.length > 0 && showExerciseList && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '25px',
                marginTop: '20px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{
                  color: '#374151',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  margin: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📊</span>
                  Recent Sessions
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {sessions.slice(0, 5).map((session, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '15px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          {session.type}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: session.completed ? '#dcfce7' : '#fef3c7',
                          color: session.completed ? '#166534' : '#92400e'
                        }}>
                          {session.completed ? '✅ Completed' : '💾 Saved'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        color: '#6b7280'
                      }}>
                        <span>{formatDate(session.createdAt)}</span>
                        <span>{formatDuration(session.duration)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <div style={{
            display: 'grid',
            gridTemplateColumns: showExerciseList ? '2fr 1fr' : '1fr',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Left Column - Exercise List OR Active Exercise */}
            {showExerciseList ? (
              /* EXERCISE LIST - DESKTOP */
              <div>
                {/* Header Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '30px',
                  marginBottom: '25px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌬️</div>
                  <h2 style={{ 
                    color: '#374151', 
                    fontSize: '1.8rem', 
                    fontWeight: '700',
                    margin: '0 0 10px 0'
                  }}>
                    Breathing Exercises
                  </h2>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '1.1rem',
                    margin: 0
                  }}>
                    Choose a technique to begin
                  </p>
                </div>

                {/* Exercise Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '20px'
                }}>
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '25px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      {/* Exercise content - same as before */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px'
                      }}>
                        <span style={{ 
                          fontSize: '2rem', 
                          marginRight: '12px' 
                        }}>
                          {exercise.emoji}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            color: '#6b7280',
                            fontSize: '0.9rem',
                            fontFamily: 'Arial, sans-serif',
                            marginBottom: '4px'
                          }}>
                            Exercise #{index + 1} ({exercise.difficulty})
                          </div>
                          <h4 style={{
                            margin: 0,
                            color: '#374151',
                            fontSize: '1.3rem',
                            fontWeight: '700'
                          }}>
                            {exercise.name}
                          </h4>
                        </div>
                      </div>

                      <p style={{
                        color: '#6b7280',
                        fontSize: '1rem',
                        margin: '0 0 15px 0',
                        lineHeight: '1.5'
                      }}>
                        {exercise.description}
                      </p>

                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '15px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        <strong style={{ color: '#374151' }}>Phases:</strong>
                        <div style={{ marginTop: '5px' }}>
                          {exercise.special === 'alternate' ? (
                            <>
                              <div>Inhale Left {exercise.inhale}s • Hold {exercise.hold}s • Exhale Right {exercise.exhale}s</div>
                              <div>Inhale Right {exercise.inhale}s • Hold {exercise.hold}s • Exhale Left {exercise.exhale}s</div>
                            </>
                          ) : (
                            <>
                              Inhale {exercise.inhale}s
                              {exercise.hold && ` • Hold ${exercise.hold}s`}
                              • Exhale {exercise.exhale}s
                              {exercise.hold2 && ` • Hold ${exercise.hold2}s`}
                            </>
                          )}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '12px'
                      }}>
                        <button
                          onClick={() => startExercise(exercise)}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '14px 20px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                          }}
                        >
                          <span>▶</span>
                          <span>Start Exercise</span>
                        </button>

                        <button
                          onClick={() => setShowDetails(exercise)}
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            border: '2px solid #667eea',
                            borderRadius: '12px',
                            padding: '14px 20px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>ℹ</span>
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ACTIVE EXERCISE - DESKTOP WITH COUNTDOWN */
              currentExercise && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  border: `3px solid ${isCountdown ? '#f59e0b' : '#667eea'}`,
                  gridColumn: '1 / -1'
                }}>
                  {/* Back Button */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '30px'
                  }}>
                    <button
                      onClick={stopExercise}
                      style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ← Back
                    </button>
                    <h2 style={{
                      margin: 0,
                      fontSize: '2rem',
                      color: '#374151',
                      fontWeight: '700'
                    }}>
                      {currentExercise.name}
                    </h2>
                    <div style={{ width: '80px' }}></div>
                  </div>

                  {/* UPDATED: Breathing Circle - Desktop with countdown */}
                  <div style={{
                    width: '300px',
                    height: '300px',
                    margin: '0 auto 30px auto',
                    borderRadius: '50%',
                    background: isCountdown ? 
                      'linear-gradient(135deg, #f59e0b, #d97706)' : 
                      currentExercise.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transform: phase === 'inhale' && !isCountdown ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 1s ease',
                    boxShadow: isCountdown ? 
                      '0 30px 80px rgba(245, 158, 11, 0.4)' : 
                      '0 30px 80px rgba(102, 126, 234, 0.4)'
                  }}>
                    <div style={{
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        marginBottom: '15px',
                        textTransform: 'capitalize'
                      }}>
                        {getPhaseText(phase, currentExercise)}
                      </div>
                      <div style={{
                        fontSize: '4rem',
                        fontWeight: '700',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        {isCountdown && timeLeft === 0 ? '✨' : Math.ceil(timeLeft)}
                      </div>
                    </div>
                  </div>

                  {/* UPDATED: Progress - hide during countdown */}
                  {!isCountdown && (
                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <p style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 15px 0',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        Cycle {cycle} of {totalCycles}
                      </p>
                      <div style={{
                        background: '#e5e7eb',
                        borderRadius: '15px',
                        height: '12px',
                        overflow: 'hidden',
                        maxWidth: '400px',
                        margin: '0 auto'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          height: '100%',
                          width: `${(cycle / totalCycles) * 100}%`,
                          borderRadius: '15px',
                          transition: 'width 0.5s ease'
                        }}></div>
                      </div>
                    </div>
                  )}

                  {/* UPDATED: Controls - Desktop */}
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center'
                  }}>
                    {isCountdown ? (
                      /* Only show cancel button during countdown */
                      <button
                        onClick={stopExercise}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '15px',
                          padding: '16px 24px',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span>✕</span>
                        <span>Cancel</span>
                      </button>
                    ) : (
                      /* Show normal controls during exercise */
                      <>
                        <button
                          onClick={stopExercise}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            padding: '16px 24px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <span>⏹️</span>
                          <span>Stop</span>
                        </button>

                        <button
                          onClick={completeExercise}
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            padding: '16px 24px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <span>✅</span>
                          <span>Complete</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Right Column - Sessions History (Desktop Only) */}
            {showExerciseList && sessions.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                height: 'fit-content',
                position: 'sticky',
                top: '20px'
              }}>
                <h3 style={{
                  color: '#374151',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  margin: '0 0 25px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>📊</span>
                  Recent Sessions
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {sessions.slice(0, 8).map((session, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '18px',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          {session.type}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: session.completed ? '#dcfce7' : '#fef3c7',
                          color: session.completed ? '#166534' : '#92400e',
                          fontWeight: '600'
                        }}>
                          {session.completed ? '✅ Done' : '💾 Saved'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        <span>{formatDate(session.createdAt)}</span>
                        <span style={{ fontWeight: '600' }}>{formatDuration(session.duration)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;