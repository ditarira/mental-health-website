import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BreathingExercises = () => {
  const { user, token } = useAuth();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [notification, setNotification] = useState(null);
  const intervalRef = useRef(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  // Show notification function
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Refresh dashboard stats
  const refreshDashboard = () => {
    window.dispatchEvent(new CustomEvent('journalUpdated'));
  };

  // Enhanced breathing exercises with more techniques
  const exercises = [
    {
      id: 1,
      name: '4-7-8 Deep Relaxation',
      description: 'Promotes relaxation and reduces anxiety. Perfect for sleep preparation.',
      icon: '😴',
      emoji: '😴',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'linear-gradient(135deg, #6366f1, #9333ea)',
      benefits: ['Better sleep', 'Reduced anxiety', 'Deep relaxation'],
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose', emoji: '🌬️⬆️' },
        { name: 'Hold', duration: 7, instruction: 'Hold your breath gently', emoji: '⏸️💙' },
        { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth', emoji: '🌊⬇️' }
      ]
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Navy SEALs technique for focus and calm. Great for concentration.',
      icon: '⬜',
      emoji: '⬜',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      benefits: ['Improved focus', 'Stress reduction', 'Mental clarity'],
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in steadily through your nose', emoji: '🌬️⬆️' },
        { name: 'Hold', duration: 4, instruction: 'Hold with control and awareness', emoji: '⏸️💙' },
        { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly and completely', emoji: '🌊⬇️' },
        { name: 'Hold', duration: 4, instruction: 'Hold with empty lungs peacefully', emoji: '✨😌' }
      ]
    },
    {
      id: 3,
      name: 'Triangle Breathing',
      description: 'Simple and effective stress relief. Perfect for beginners.',
      icon: '🔺',
      emoji: '🔺',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'linear-gradient(135deg, #10b981, #059669)',
      benefits: ['Easy to learn', 'Quick stress relief', 'Emotional balance'],
      phases: [
        { name: 'Inhale', duration: 6, instruction: 'Breathe in deeply and smoothly', emoji: '🌬️⬆️' },
        { name: 'Hold', duration: 6, instruction: 'Hold peacefully with awareness', emoji: '⏸️💙' },
        { name: 'Exhale', duration: 6, instruction: 'Release slowly and completely', emoji: '🌊⬇️' }
      ]
    },
    {
      id: 4,
      name: 'Coherent Breathing',
      description: 'Balance your nervous system. Promotes heart-brain coherence.',
      icon: '🌊',
      emoji: '🌊',
      color: 'from-teal-500 to-blue-600',
      bgColor: 'linear-gradient(135deg, #14b8a6, #2563eb)',
      benefits: ['Heart coherence', 'Emotional balance', 'Nervous system harmony'],
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe in gently and naturally', emoji: '🌬️⬆️' },
        { name: 'Exhale', duration: 5, instruction: 'Breathe out smoothly and evenly', emoji: '🌊⬇️' }
      ]
    },
    {
      id: 5,
      name: 'Extended Exhale',
      description: 'Longer exhale activates the calm response. Great for anxiety.',
      icon: '🕊️',
      emoji: '🕊️',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'linear-gradient(135deg, #f43f5e, #ec4899)',
      benefits: ['Reduced anxiety', 'Activates calm response', 'Lower heart rate'],
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in naturally and calmly', emoji: '🌬️⬆️' },
        { name: 'Hold', duration: 2, instruction: 'Brief pause with awareness', emoji: '⏸️💙' },
        { name: 'Exhale', duration: 8, instruction: 'Long, slow exhale for deep calm', emoji: '🌊⬇️' }
      ]
    },
    {
      id: 6,
      name: 'Energizing Breath',
      description: 'Quick breathing pattern to boost energy and alertness.',
      icon: '⚡',
      emoji: '⚡',
      color: 'from-orange-500 to-red-600',
      bgColor: 'linear-gradient(135deg, #f97316, #dc2626)',
      benefits: ['Increased energy', 'Enhanced alertness', 'Morning activation'],
      phases: [
        { name: 'Inhale', duration: 3, instruction: 'Quick, energizing inhale', emoji: '🌬️⬆️' },
        { name: 'Exhale', duration: 3, instruction: 'Quick, complete exhale', emoji: '🌊⬇️' }
      ]
    }
  ];

  // Fetch breathing sessions
  const fetchSessions = async () => {
    try {
      if (!token) return;

      const response = await fetch(API_BASE + '/api/breathing', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setSessions(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Save breathing session
  const saveSession = async (exerciseName, duration, completed = true) => {
    try {
      if (!token) {
        showNotification('Please log in to save sessions', 'error');
        return;
      }

      console.log('Saving breathing session:', { exerciseName, duration, completed });

      const response = await fetch(API_BASE + '/api/breathing', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: exerciseName,
          duration: Math.round(duration),
          completed: completed
        }),
      });

      const data = await response.json();
      console.log('Save session response:', data);

      if (data.success) {
        showNotification('Session completed! 🧘‍♀️ ' + Math.round(duration) + 's of ' + exerciseName, 'success');
        fetchSessions(); // Refresh sessions
        refreshDashboard(); // Update dashboard stats
      } else {
        showNotification(data.message || 'Failed to save session', 'error');
      }
    } catch (error) {
      console.error('Error saving session:', error);
      showNotification('Error saving session. Please try again.', 'error');
    }
  };

  // Start exercise
  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setCurrentPhase('Get Ready');
    setCountdown(3);
    setCycleCount(0);
    setSessionStartTime(Date.now());

    // Countdown before starting
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        runExercise(exercise);
      }
    }, 1000);
  };

  // Run exercise cycles
  const runExercise = (exercise) => {
    let phaseIndex = 0;
    let phaseTime = 0;
    let cycles = 0;
    const maxCycles = 8; // Increased cycles

    setCurrentPhase(exercise.phases[0].name);
    setCountdown(exercise.phases[0].duration);

    intervalRef.current = setInterval(() => {
      phaseTime++;
      setCountdown(exercise.phases[phaseIndex].duration - phaseTime);

      if (phaseTime >= exercise.phases[phaseIndex].duration) {
        phaseTime = 0;
        phaseIndex++;

        if (phaseIndex >= exercise.phases.length) {
          phaseIndex = 0;
          cycles++;
          setCycleCount(cycles);

          if (cycles >= maxCycles) {
            stopExercise(true);
            return;
          }
        }

        setCurrentPhase(exercise.phases[phaseIndex].name);
        setCountdown(exercise.phases[phaseIndex].duration);
      }
    }, 1000);
  };

  // Stop exercise
  const stopExercise = (completed = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (sessionStartTime && selectedExercise) {
      const duration = (Date.now() - sessionStartTime) / 1000;
      saveSession(selectedExercise.name, duration, completed);
    }

    setIsActive(false);
    setSelectedExercise(null);
    setCurrentPhase('');
    setCountdown(0);
    setCycleCount(0);
    setSessionStartTime(null);
  };

  useEffect(() => {
    if (user && token) {
      fetchSessions();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user, token]);

  if (!user) {
    return (
      <div className="breathing-container">
        <div className="auth-required">
          <div className="auth-icon">🧘‍♀️</div>
          <h2>Please log in to access breathing exercises</h2>
          <p>Sign in to start your mindfulness journey with guided breathing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="breathing-container">
      {/* Enhanced Notification */}
      {notification && (
        <div className={'breathing-notification ' + notification.type}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <button className="notification-close" onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="breathing-header">
        <h1>🧘‍♀️ Breathing Exercises</h1>
        <p>Find your calm with guided breathing techniques</p>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-number">{sessions.length}</span>
            <span className="stat-label">Total Sessions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{exercises.length}</span>
            <span className="stat-label">Techniques Available</span>
          </div>
        </div>
      </div>

      {!isActive ? (
        <>
          {/* Enhanced Exercise Selection */}
          <div className="exercises-grid">
            {exercises.map(exercise => (
              <div key={exercise.id} className="exercise-card">
                <div className="exercise-header" style={{ background: exercise.bgColor }}>
                  <div className="exercise-emoji">{exercise.emoji}</div>
                  <h3>{exercise.name}</h3>
                </div>
                
                <div className="exercise-content">
                  <p className="exercise-description">{exercise.description}</p>
                  
                  <div className="exercise-pattern">
                    <h4>Pattern:</h4>
                    <div className="pattern-steps">
                      {exercise.phases.map((phase, index) => (
                        <span key={index} className={'pattern-step ' + phase.name.toLowerCase()}>
                          {phase.emoji} {phase.name} {phase.duration}s
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="exercise-benefits">
                    <h4>Benefits:</h4>
                    <ul>
                      {exercise.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="exercise-info">
                    <span className="duration-info">
                      ~{Math.round((exercise.phases.reduce((sum, phase) => sum + phase.duration, 0) * 8) / 60)} min
                    </span>
                    <span className="cycles-info">8 cycles</span>
                  </div>
                </div>

                <button
                  onClick={() => startExercise(exercise)}
                  className="start-exercise-btn"
                  style={{ background: exercise.bgColor }}
                >
                  Start {exercise.name}
                </button>
              </div>
            ))}
          </div>

          {/* Enhanced Recent Sessions */}
          <div className="recent-sessions">
            <h2>📊 Recent Sessions ({sessions.length})</h2>
            {sessions.length === 0 ? (
              <div className="no-sessions">
                <div className="empty-illustration">🧘‍♀️✨</div>
                <h3>No sessions yet</h3>
                <p>Start your first breathing exercise above! 🌟</p>
              </div>
            ) : (
              <div className="sessions-grid">
                {sessions.slice(0, 6).map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-header">
                      <div className="session-type">{session.type}</div>
                      <div className={'session-status ' + (session.completed ? 'completed' : 'incomplete')}>
                        {session.completed ? '✅' : '⏸️'}
                      </div>
                    </div>
                    <div className="session-duration">{Math.round(session.duration)}s</div>
                    <div className="session-date">
                      {new Date(session.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Enhanced Active Exercise */
        <div className="active-exercise">
          <div className="exercise-progress">
            <div className="progress-info">
              <h2>{selectedExercise.name}</h2>
              <div className="cycle-progress">Cycle {cycleCount + 1} of 8</div>
            </div>
          </div>

          <div className="breathing-circle-container">
            <div 
              className={'breathing-circle active-' + currentPhase.toLowerCase()}
              style={{ background: selectedExercise.bgColor }}
            >
              <div className="circle-content">
                <div className="phase-emoji">
                  {selectedExercise.phases.find(p => p.name === currentPhase)?.emoji || '🧘‍♀️'}
                </div>
                <div className="phase-name">{currentPhase}</div>
                <div className="countdown">{countdown}</div>
              </div>
            </div>
          </div>

          <div className="exercise-instruction">
            <p className="instruction-text">
              {selectedExercise.phases.find(p => p.name === currentPhase)?.instruction || 'Get ready to begin...'}
            </p>
          </div>

          <div className="exercise-controls">
            <button onClick={() => stopExercise(false)} className="stop-exercise-btn">
              Stop Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathingExercises;
