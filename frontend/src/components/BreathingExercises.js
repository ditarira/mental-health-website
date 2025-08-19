import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercise = () => {
  const { user, token } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [completedCycles, setCompletedCycles] = useState([]); // NEW: Track completed cycles
  
  // Fixed timing configurations
  const exercises = [
    {
      id: 'basic',
      name: '4-4-4 Basic Breathing',
      description: 'Simple and calming breathing pattern for beginners',
      icon: '🌸',
      color: 'linear-gradient(135deg, #a7c7e7 0%, #6fa8dc 100%)',
      pattern: {
        inhale: 4,
        hold: 4,
        exhale: 4,
        pause: 0
      },
      totalCycles: 8
    },
    {
      id: 'box',
      name: '4-4-4-4 Box Breathing',
      description: 'Equal timing for maximum focus and calm',
      icon: '📦',
      color: 'linear-gradient(135deg, #c6efce 0%, #a9dfbf 100%)',
      pattern: {
        inhale: 4,
        hold: 4,
        exhale: 4,
        pause: 4
      },
      totalCycles: 6
    },
    {
      id: 'triangle',
      name: '4-4-6 Triangle Breathing',
      description: 'Longer exhale for deep relaxation',
      icon: '🔺',
      color: 'linear-gradient(135deg, #f4c2c2 0%, #dda0dd 100%)',
      pattern: {
        inhale: 4,
        hold: 4,
        exhale: 6,
        pause: 0
      },
      totalCycles: 7
    },
    {
      id: 'advanced',
      name: '4-7-8 Advanced Relaxation',
      description: 'Powerful technique for deep relaxation and sleep',
      icon: '🌙',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      pattern: {
        inhale: 4,
        hold: 7,
        exhale: 8,
        pause: 0
      },
      totalCycles: 5
    }
  ];

  const intervalRef = useRef(null);
  const sessionStartRef = useRef(null);
  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user && token) {
      fetchSessions();
    }
  }, [user, token]);

  // Add CSS for better number rendering
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .mobile-numbers {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0;
        font-feature-settings: "tnum";
      }
      
      .mobile-date {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
        font-variant-numeric: normal;
        white-space: nowrap;
      }

      .mobile-pattern {
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        letter-spacing: 1px;
        font-weight: 600;
      }

      .cycle-complete {
        animation: cycleComplete 0.8s ease-in-out;
      }

      @keyframes cycleComplete {
        0% { transform: scale(1); background: #10b981; }
        50% { transform: scale(1.2); background: #059669; }
        100% { transform: scale(1); background: #10b981; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const fetchSessions = async () => {
    try {
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

  const saveSession = async (exerciseData, completed = false) => {
    if (!user || !token) return;

    try {
      const duration = sessionStartRef.current 
        ? (Date.now() - sessionStartRef.current) / 1000 
        : 0;

      await fetch(`${API_BASE}/api/breathing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: exerciseData.name,
          duration: Math.round(duration),
          cycles: currentCycle,
          completed: completed
        })
      });

      fetchSessions();
      window.dispatchEvent(new CustomEvent('journalUpdated'));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(exercise.pattern.inhale);
    setCurrentCycle(0);
    setCompletedCycles([]); // Reset completed cycles
    sessionStartRef.current = Date.now();
    
  };

  const stopExercise = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (selectedExercise && sessionStartRef.current) {
      saveSession(selectedExercise, currentCycle >= selectedExercise.totalCycles);
    }
    
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(0);
    setCurrentCycle(0);
    setCompletedCycles([]);
    setSelectedExercise(null);
    sessionStartRef.current = null;
    
     };

  // CORE TIMING ENGINE - PROPERLY FIXED!
useEffect(() => {
  if (!isActive || !selectedExercise) return;

  intervalRef.current = setInterval(() => {
    setTimeLeft(prevTime => {
      if (prevTime <= 1) {
        setPhase(prevPhase => {
          const pattern = selectedExercise.pattern;
          
          switch (prevPhase) {
            case 'inhale':
              return pattern.hold > 0 ? 'hold' : 'exhale';
            case 'hold':
              return 'exhale';
            case 'exhale':
              // If no pause, complete cycle here
              if (pattern.pause === 0) {
                setCurrentCycle(prev => {
                  const newCycle = prev + 1;
                  console.log(`Cycle ${prev + 1} completed! Moving to cycle ${newCycle + 1}`);
                  
                  // Mark this cycle as completed
                  setCompletedCycles(prevCompleted => [...prevCompleted, prev]);
                  
                  if (newCycle >= selectedExercise.totalCycles) {
                    console.log('All cycles completed!');
                    setTimeout(() => stopExercise(), 1000);
                    return prev;
                  }
                  return newCycle;
                });
                return 'inhale';
              } else {
                return 'pause';
              }
            case 'pause':
              // Complete cycle after pause
              setCurrentCycle(prev => {
                const newCycle = prev + 1;
                console.log(`Cycle ${prev + 1} completed! Moving to cycle ${newCycle + 1}`);
                
                // Mark this cycle as completed
                setCompletedCycles(prevCompleted => [...prevCompleted, prev]);
                
                if (newCycle >= selectedExercise.totalCycles) {
                  console.log('All cycles completed!');
                  setTimeout(() => stopExercise(), 1000);
                  return prev;
                }
                return newCycle;
              });
              return 'inhale';
            default:
              return 'inhale';
          }
        });
        
        // Set correct timing for next phase
        const pattern = selectedExercise.pattern;
        switch (phase) {
          case 'inhale':
            return pattern.hold > 0 ? pattern.hold : pattern.exhale;
          case 'hold':
            return pattern.exhale;
          case 'exhale':
            return pattern.pause > 0 ? pattern.pause : pattern.inhale;
          case 'pause':
            return pattern.inhale;
          default:
            return pattern.inhale;
        }
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [isActive, selectedExercise, phase]);
  // Visual breathing guide
  const getCircleScale = () => {
    if (!selectedExercise) return 1;
    
    const pattern = selectedExercise.pattern;
    const totalPhaseTime = pattern[phase] || 4;
    const progress = (totalPhaseTime - timeLeft) / totalPhaseTime;
    
    switch (phase) {
      case 'inhale':
        return 0.7 + (progress * 0.6);
      case 'hold':
        return 1.3;
      case 'exhale':
        return 1.3 - (progress * 0.6);
      case 'pause':
        return 0.7;
      default:
        return 1;
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In 🌬️';
      case 'hold':
        return 'Hold 🫁';
      case 'exhale':
        return 'Breathe Out 💨';
      case 'pause':
        return 'Pause ⏸️';
      default:
        return 'Ready 🧘‍♀️';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#10b981';
      case 'hold':
        return '#3b82f6';
      case 'exhale':
        return '#ef4444';
      case 'pause':
        return '#6b7280';
      default:
        return '#667eea';
    }
  };

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
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: isMobile ? '300px' : '400px',
          fontSize: isMobile ? '0.9rem' : '1rem'
        }}>
          {notification}
        </div>
      )}

      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: isMobile ? '20px' : '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
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
            gap: '15px',
            marginBottom: '15px'
          }}>
            <span style={{ fontSize: isMobile ? '2.5rem' : '3rem' }}>🧘‍♀️</span>
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              color: 'white',
              fontWeight: '700'
            }}>
              Breathing Exercises
            </h1>
          </div>
          <p style={{
            margin: 0,
            fontSize: isMobile ? '1rem' : '1.1rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Find your calm with guided breathing techniques 🌸
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: isMobile ? '20px' : '40px'
      }}>

        {/* Active Exercise View - NO RECENT SESSIONS HERE! */}
        {isActive && selectedExercise && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: isMobile ? '15px' : '20px',
            padding: isMobile ? '30px' : '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            {/* Exercise Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  margin: '0 0 5px 0',
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  color: '#374151',
                  fontWeight: '700'
                }}>
                  {selectedExercise.icon} {selectedExercise.name}
                </h3>
                <p style={{
                  margin: 0,
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  Cycle {currentCycle + 1} of {selectedExercise.totalCycles}
                </p>
              </div>
              <button
                onClick={stopExercise}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Stop Exercise
              </button>
            </div>

            {/* Breathing Circle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
              marginBottom: '30px'
            }}>
              <div style={{
                width: isMobile ? '200px' : '250px',
                height: isMobile ? '200px' : '250px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${getPhaseColor()}20, ${getPhaseColor()}10)`,
                border: `4px solid ${getPhaseColor()}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${getCircleScale()})`,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 0 40px ${getPhaseColor()}40`
              }}>
                <div style={{
                  textAlign: 'center',
                  color: getPhaseColor(),
                  fontWeight: '700'
                }}>
                  <div style={{
                    fontSize: isMobile ? '3rem' : '4rem',
                    marginBottom: '10px'
                  }} className="mobile-numbers">
                    {timeLeft}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.2rem'
                  }}>
                    {getPhaseInstruction()}
                  </div>
                </div>
              </div>
            </div>

            {/* VISUAL CYCLE PROGRESS - NEW! */}
            <div style={{
              marginBottom: '30px'
            }}>
              <h4 style={{
                color: '#374151',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '15px'
              }}>
                Cycles Progress
              </h4>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {Array.from({ length: selectedExercise.totalCycles }, (_, index) => (
                  <div
                    key={index}
                    className={completedCycles.includes(index) ? 'cycle-complete' : ''}
                    style={{
                      width: isMobile ? '12px' : '16px',
                      height: isMobile ? '12px' : '16px',
                      borderRadius: '50%',
                      background: index < currentCycle 
                        ? '#10b981' 
                        : index === currentCycle 
                          ? getPhaseColor() 
                          : '#e5e7eb',
                      border: index === currentCycle ? `2px solid ${getPhaseColor()}` : 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: index === currentCycle ? `0 0 10px ${getPhaseColor()}50` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <div style={{
                width: `${((currentCycle) / selectedExercise.totalCycles) * 100}%`,
                height: '100%',
                background: getPhaseColor(),
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }} />
            </div>

            {/* Pattern Display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedExercise.pattern.pause > 0 
                ? 'repeat(4, 1fr)' 
                : 'repeat(3, 1fr)',
              gap: '10px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <div style={{
                padding: '8px',
                borderRadius: '8px',
                background: phase === 'inhale' ? '#10b98120' : '#f3f4f6',
                color: phase === 'inhale' ? '#10b981' : '#6b7280',
                fontSize: '0.8rem',
                fontWeight: '600',
                textAlign: 'center'
              }} className="mobile-pattern">
                Inhale {selectedExercise.pattern.inhale}s
              </div>
              {selectedExercise.pattern.hold > 0 && (
                <div style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: phase === 'hold' ? '#3b82f620' : '#f3f4f6',
                  color: phase === 'hold' ? '#3b82f6' : '#6b7280',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }} className="mobile-pattern">
                  Hold {selectedExercise.pattern.hold}s
                </div>
              )}
              <div style={{
                padding: '8px',
                borderRadius: '8px',
                background: phase === 'exhale' ? '#ef444420' : '#f3f4f6',
                color: phase === 'exhale' ? '#ef4444' : '#6b7280',
                fontSize: '0.8rem',
                fontWeight: '600',
                textAlign: 'center'
              }} className="mobile-pattern">
                Exhale {selectedExercise.pattern.exhale}s
              </div>
              {selectedExercise.pattern.pause > 0 && (
                <div style={{
                  padding: '8px',
                  borderRadius: '8px',
                  background: phase === 'pause' ? '#6b728020' : '#f3f4f6',
                  color: phase === 'pause' ? '#6b7280' : '#6b7280',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }} className="mobile-pattern">
                  Pause {selectedExercise.pattern.pause}s
                </div>
              )}
            </div>
          </div>
        )}

        {/* Exercise Selection - ONLY SHOW WHEN NOT ACTIVE */}
        {!isActive && (
          <>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: isMobile ? '15px' : '20px',
              padding: isMobile ? '25px' : '30px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🌸</span>
                <h3 style={{
                  margin: 0,
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  color: '#374151',
                  fontWeight: '700'
                }}>
                  Choose Your Breathing Exercise
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '15px' : '20px'
              }}>
                {exercises.map(exercise => (
                  <div
                    key={exercise.id}
                    style={{
                      background: exercise.color,
                      borderRadius: '15px',
                      padding: isMobile ? '20px' : '25px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}
                    onClick={() => startExercise(exercise)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <span style={{ fontSize: '2rem' }}>{exercise.icon}</span>
                      <div>
                        <h4 style={{
                          margin: '0 0 5px 0',
                          fontSize: isMobile ? '1.1rem' : '1.2rem',
                          fontWeight: '700'
                        }}>
                          {exercise.name}
                        </h4>
                        <p style={{
                          margin: 0,
                          fontSize: '0.85rem',
                          opacity: 0.9
                        }} className="mobile-numbers">
                          {exercise.totalCycles} cycles
                        </p>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.9rem',
                      opacity: 0.9,
                      margin: '0 0 15px 0',
                      lineHeight: '1.4'
                    }}>
                      {exercise.description}
                    </p>

                    {/* Pattern Preview */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '15px'
                    }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }} className="mobile-pattern">
                        {exercise.pattern.inhale}s in
                      </span>
                      {exercise.pattern.hold > 0 && (
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }} className="mobile-pattern">
                          {exercise.pattern.hold}s hold
                        </span>
                      )}
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }} className="mobile-pattern">
                        {exercise.pattern.exhale}s out
                      </span>
                      {exercise.pattern.pause > 0 && (
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }} className="mobile-pattern">
                          {exercise.pattern.pause}s pause
                        </span>
                      )}
                    </div>

                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.2s ease'
                    }}>
                      Start Exercise 🧘‍♀️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions - ONLY SHOW WHEN NOT ACTIVE */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: isMobile ? '15px' : '20px',
              padding: isMobile ? '25px' : '30px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <h3 style={{
                  margin: 0,
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  color: '#374151',
                  fontWeight: '700'
                }}>
                  Recent Sessions
                </h3>
              </div>

              {sessions.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: isMobile ? '30px 20px' : '40px',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧘‍♀️</div>
                  <h3 style={{ color: '#374151', marginBottom: '10px' }}>No sessions yet</h3>
                  <p style={{ margin: 0 }}>Start your first breathing exercise above!</p>
                </div>
              ) : (
              <div style={{
                 display: 'grid',
                 gap: isMobile ? '12px' : '15px'
               }}>
                 {sessions.slice(0, 5).map(session => (
                   <div
                     key={session.id}
                     style={{
                       background: '#f8fafc',
                       borderRadius: '10px',
                       padding: isMobile ? '15px' : '20px',
                       border: '2px solid #e2e8f0',
                       transition: 'all 0.2s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-2px)';
                       e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                   >
                     <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',
                       marginBottom: '10px',
                       flexWrap: 'wrap',
                       gap: '10px'
                     }}>
                       <h4 style={{
                         margin: 0,
                         color: '#374151',
                         fontSize: isMobile ? '1rem' : '1.1rem',
                         fontWeight: '600'
                       }}>
                         {session.type}
                       </h4>
                       <span style={{
                         background: session.completed ? '#dcfce7' : '#fef3c7',
                         color: session.completed ? '#166534' : '#92400e',
                         padding: '4px 8px',
                         borderRadius: '6px',
                         fontSize: '0.75rem',
                         fontWeight: '600'
                       }}>
                         {session.completed ? '✅ Completed' : '⏸️ Paused'}
                       </span>
                     </div>
                     <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',
                       fontSize: '0.85rem',
                       color: '#6b7280'
                     }}>
                       <span className="mobile-numbers">Duration: {Math.round(session.duration)} sec</span>
                       <span className="mobile-date">{new Date(session.createdAt).toLocaleDateString('en-US', {
                         month: 'short',
                         day: 'numeric',
                         year: 'numeric'
                       })}</span>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
         </>
       )}
     </div>
   </div>
 );
};

export default BreathingExercise;