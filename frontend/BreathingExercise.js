import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercise = () => {
  const { user } = useAuth();
  const [currentTechnique, setCurrentTechnique] = useState('478');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [countdown, setCountdown] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalSessions, setTotalSessions] = useState(0);
  const intervalRef = useRef(null);

  const techniques = {
    '478': {
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Great for stress relief and sleep.',
      targetCycles: 4,
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in through your nose...' },
        { name: 'hold', duration: 7, instruction: 'Hold your breath...' },
        { name: 'exhale', duration: 8, instruction: 'Exhale slowly through your mouth...' }
      ]
    },
    'box': {
      name: 'Box Breathing',
      description: 'Equal timing for all phases. Used by Navy SEALs for focus and calm.',
      targetCycles: 6,
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in slowly...' },
        { name: 'hold', duration: 4, instruction: 'Hold your breath...' },
        { name: 'exhale', duration: 4, instruction: 'Breathe out slowly...' },
        { name: 'hold', duration: 4, instruction: 'Hold empty...' }
      ]
    },
    'deep': {
      name: 'Deep Breathing',
      description: 'Simple deep breathing to activate your relaxation response.',
      targetCycles: 8,
      phases: [
        { name: 'inhale', duration: 6, instruction: 'Take a deep breath in...' },
        { name: 'exhale', duration: 6, instruction: 'Slowly breathe out...' }
      ]
    },
    'calm': {
      name: 'Calming Breath',
      description: 'Extended exhale for maximum relaxation and stress relief.',
      targetCycles: 6,
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Breathe in gently...' },
        { name: 'exhale', duration: 8, instruction: 'Long, slow exhale...' }
      ]
    }
  };

  useEffect(() => {
    loadSessionCount();
    console.log('BreathingExercise component mounted with localStorage tracking');
  }, []);

  useEffect(() => {
    if (isActive && phase !== 'ready' && phase !== 'completed') {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            moveToNextPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, phase]);

  const loadSessionCount = () => {
    try {
      const sessions = JSON.parse(localStorage.getItem('breathingSessions') || '[]');
      setTotalSessions(sessions.length);
      console.log('Loaded breathing sessions:', sessions.length, sessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const saveBrethingSession = (completed = false) => {
    if (!sessionStartTime) {
      console.log('No session start time, not saving');
      return;
    }

    const endTime = new Date();
    const duration = Math.floor((endTime - sessionStartTime) / 1000);
    
    const session = {
      id: Date.now(),
      userId: user?.id || 'anonymous',
      technique: currentTechnique,
      duration: duration,
      completed: completed,
      cyclesCompleted: cycle,
      targetCycles: techniques[currentTechnique].targetCycles,
      createdAt: endTime.toISOString(),
      techniqueName: techniques[currentTechnique].name
    };

    try {
      const existingSessions = JSON.parse(localStorage.getItem('breathingSessions') || '[]');
      existingSessions.push(session);
      localStorage.setItem('breathingSessions', JSON.stringify(existingSessions));
      
      console.log('✅ BREATHING SESSION SAVED!', session);
      console.log('Total sessions now:', existingSessions.length);
      
      setTotalSessions(existingSessions.length);

      if (completed) {
        setTimeout(() => {
          alert(🎉 Great job! You completed  cycles of !\\n\\nTotal sessions: );
        }, 500);
      }
    } catch (error) {
      console.error('❌ Error saving session:', error);
    }
  };

  const moveToNextPhase = () => {
    const currentPhases = techniques[currentTechnique].phases;
    const currentPhaseIndex = currentPhases.findIndex(p => p.name === phase);
    
    if (currentPhaseIndex < currentPhases.length - 1) {
      const nextPhase = currentPhases[currentPhaseIndex + 1];
      setPhase(nextPhase.name);
      setCountdown(nextPhase.duration);
      console.log(Moving to phase: );
    } else {
      const newCycle = cycle + 1;
      setCycle(newCycle);
      console.log(Completed cycle  of );
      
      if (newCycle >= techniques[currentTechnique].targetCycles) {
        console.log('🎉 Session complete! Saving...');
        setIsActive(false);
        setPhase('completed');
        saveBrethingSession(true);
        return;
      }
      
      const firstPhase = currentPhases[0];
      setPhase(firstPhase.name);
      setCountdown(firstPhase.duration);
    }
  };

  const startExercise = () => {
    console.log('🚀 Starting breathing exercise');
    const firstPhase = techniques[currentTechnique].phases[0];
    setIsActive(true);
    setPhase(firstPhase.name);
    setCountdown(firstPhase.duration);
    setCycle(1);
    setSessionStartTime(new Date());
  };

  const stopExercise = () => {
    console.log('⏹️ Stopping exercise');
    if (sessionStartTime && cycle > 0) {
      console.log('Saving partial session...');
      saveBrethingSession(false);
    }
    
    setIsActive(false);
    setPhase('ready');
    setCountdown(0);
    setCycle(0);
    setSessionStartTime(null);
    clearInterval(intervalRef.current);
  };

  const resetExercise = () => {
    console.log('🔄 Resetting exercise');
    stopExercise();
  };

  const getCurrentInstruction = () => {
    if (phase === 'ready') {
      return 'Click "Begin Exercise" to start';
    }
    
    if (phase === 'completed') {
      return '🎉 Session Complete! Well done!';
    }
    
    const currentPhaseData = techniques[currentTechnique].phases.find(p => p.name === phase);
    return currentPhaseData ? currentPhaseData.instruction : '';
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 1.8;
    if (phase === 'hold') return 1.8;
    if (phase === 'exhale') return 1.0;
    return 1.0;
  };

  return (
    <div style={{paddingTop: '100px', minHeight: '100vh'}}>
      {/* Progress Banner */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <strong>🧘‍♀️ Your Progress: {totalSessions} breathing sessions completed!</strong>
        <br />
        <small>Debug: Phase: {phase}, Active: {isActive ? 'Yes' : 'No'}, Cycle: {cycle}</small>
      </div>

      <section className="breathing" style={{padding: '4rem 0'}}>
        <div className="container">
          <div className="breathing-content">
            <h2 className="breathing-title" style={{marginBottom: '2rem'}}>🧘 Breathing Studio</h2>
            <p className="breathing-subtitle" style={{marginBottom: '3rem'}}>
              Interactive breathing techniques for wellness
            </p>
            
            {/* Technique Selection */}
            <div style={{marginBottom: '3rem', textAlign: 'center'}}>
              <h3 style={{marginBottom: '1.5rem', color: 'white'}}>Choose Technique:</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
                {Object.entries(techniques).map(([key, technique]) => (
                  <button
                    key={key}
                    onClick={() => {
                      console.log(Selected technique: );
                      setCurrentTechnique(key);
                      resetExercise();
                    }}
                    disabled={isActive}
                    style={{
                      padding: '0.7rem 1.5rem',
                      borderRadius: '30px',
                      border: currentTechnique === key ? '2px solid white' : '2px solid rgba(255,255,255,0.3)',
                      backgroundColor: currentTechnique === key ? 'white' : 'rgba(255,255,255,0.2)',
                      color: currentTechnique === key ? 'var(--primary)' : 'white',
                      cursor: isActive ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      opacity: isActive && currentTechnique !== key ? 0.5 : 1
                    }}
                  >
                    {technique.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Technique Info */}
            <div style={{backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '15px', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>{techniques[currentTechnique].name}</h3>
              <p style={{color: 'rgba(255,255,255,0.9)', lineHeight: '1.6'}}>
                {techniques[currentTechnique].description}
              </p>
              <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginTop: '0.5rem'}}>
                Target: {techniques[currentTechnique].targetCycles} cycles
              </p>
            </div>
            
            {/* Instructions */}
            <div className="breathing-instructions" style={{minHeight: '3rem', marginBottom: '3rem', textAlign: 'center'}}>
              <div style={{fontSize: '1.5rem', marginBottom: '1rem', color: 'white'}}>
                {getCurrentInstruction()}
              </div>
              {isActive && phase !== 'completed' && (
                <div>
                  <div style={{fontSize: '3rem', fontWeight: 'bold', color: 'white'}}>
                    {countdown > 0 ? countdown : ''}
                  </div>
                  <div style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)'}}>
                    Cycle {cycle} of {techniques[currentTechnique].targetCycles}
                  </div>
                </div>
              )}
            </div>
            
            {/* Breathing Circle */}
            <div className="breathing-container" style={{position: 'relative', width: '300px', height: '300px', margin: '0 auto 3rem'}}>
              <div 
                className="breathing-circle" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 	ranslate(-50%, -50%) scale(),
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  transition: isActive ? 	ransform s ease-in-out : 'transform 0.5s ease'
                }}
              />
              <div 
                className="circle" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  backgroundColor: phase === 'completed' ? '#4CAF50' : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: phase === 'completed' ? 'white' : 'var(--dark)',
                  fontWeight: '600',
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                {phase === 'ready' ? '🧘' : 
                 phase === 'completed' ? '✅' : 
                 phase.charAt(0).toUpperCase() + phase.slice(1)}
              </div>
            </div>
            
            {/* Controls */}
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem'}}>
              {!isActive && phase !== 'completed' ? (
                <button 
                  onClick={startExercise} 
                  className="btn" 
                  style={{fontSize: '1.2rem', padding: '1rem 2rem', backgroundColor: '#4CAF50'}}
                >
                  🚀 Begin Exercise
                </button>
              ) : phase === 'completed' ? (
                <div style={{textAlign: 'center'}}>
                  <button onClick={resetExercise} className="btn" style={{fontSize: '1.2rem', padding: '1rem 2rem', marginBottom: '1rem'}}>
                    Start New Session
                  </button>
                  <div style={{color: 'white'}}>
                    <strong>Session saved to localStorage!</strong>
                  </div>
                </div>
              ) : (
                <>
                  <button onClick={stopExercise} className="btn" style={{backgroundColor: '#dc3545', fontSize: '1.1rem', padding: '1rem 1.5rem'}}>
                    ⏹️ Stop
                  </button>
                  <button onClick={resetExercise} className="btn btn-outline" style={{fontSize: '1.1rem', padding: '1rem 1.5rem'}}>
                    🔄 Reset
                  </button>
                </>
              )}
            </div>

            {/* Test localStorage button */}
            <div style={{textAlign: 'center'}}>
              <button 
                onClick={() => {
                  const sessions = JSON.parse(localStorage.getItem('breathingSessions') || '[]');
                  console.log('Current localStorage sessions:', sessions);
                  alert(localStorage has  breathing sessions);
                }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: '1px solid white',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                🔍 Test localStorage ({totalSessions} sessions)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BreathingExercise;
