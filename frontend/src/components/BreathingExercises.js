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

  // Breathing exercises with simplified data
  const exercises = [
    {
      id: 1,
      name: '4-7-8 Deep Relaxation',
      description: 'Promotes relaxation and reduces anxiety',
      icon: '🌙',
      color: 'from-indigo-500 to-purple-600',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
        { name: 'Hold', duration: 7, instruction: 'Hold your breath gently' },
        { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth' }
      ]
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Navy SEALs technique for focus and calm',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-600',
      phases: [
        { name: 'Inhale', duration: 4, instruction: 'Breathe in steadily' },
        { name: 'Hold', duration: 4, instruction: 'Hold with control' },
        { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly' },
        { name: 'Hold', duration: 4, instruction: 'Hold empty lungs' }
      ]
    },
    {
      id: 3,
      name: 'Triangle Breathing',
      description: 'Simple and effective stress relief',
      icon: '🔺',
      color: 'from-green-500 to-emerald-600',
      phases: [
        { name: 'Inhale', duration: 6, instruction: 'Breathe in deeply' },
        { name: 'Hold', duration: 6, instruction: 'Hold peacefully' },
        { name: 'Exhale', duration: 6, instruction: 'Release slowly' }
      ]
    },
    {
      id: 4,
      name: 'Coherent Breathing',
      description: 'Balance your nervous system',
      icon: '💙',
      color: 'from-teal-500 to-blue-600',
      phases: [
        { name: 'Inhale', duration: 5, instruction: 'Breathe in gently' },
        { name: 'Exhale', duration: 5, instruction: 'Breathe out smoothly' }
      ]
    }
  ];

  // Fetch breathing sessions
  const fetchSessions = async () => {
    try {
      if (!token) return;

      const response = await fetch(`${API_BASE}/api/breathing`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

      const response = await fetch(`${API_BASE}/api/breathing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
        showNotification(`Session completed! 🧘‍♀️ ${Math.round(duration)}s of ${exerciseName}`, 'success');
        fetchSessions(); // Refresh sessions
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
    const maxCycles = 6;

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
          <h2>Please log in to access breathing exercises</h2>
          <p>Sign in to start your mindfulness journey.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="breathing-container">
      {/* Custom Notification */}
      {notification && (
        <div className={`custom-notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      <div className="breathing-header">
        <h1>Breathing Exercises</h1>
        <p>Find your calm with guided breathing techniques</p>
      </div>

      {!isActive ? (
        <>
          {/* Exercise Selection */}
          <div className="exercises-grid">
            {exercises.map(exercise => (
              <div key={exercise.id} className={`exercise-card bg-gradient-to-r ${exercise.color}`}>
                <div className="exercise-icon">{exercise.icon}</div>
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <div className="exercise-details">
                  <span>{exercise.phases.length} phases</span>
                  <span>6 cycles</span>
                </div>
                <button 
                  onClick={() => startExercise(exercise)}
                  className="start-btn"
                >
                  Start Exercise
                </button>
              </div>
            ))}
          </div>

          {/* Recent Sessions */}
          <div className="recent-sessions">
            <h2>Recent Sessions ({sessions.length})</h2>
            {sessions.length === 0 ? (
              <div className="no-sessions">
                <p>No breathing sessions yet. Start your first exercise above! 🧘‍♀️</p>
              </div>
            ) : (
              <div className="sessions-grid">
                {sessions.slice(0, 6).map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-type">{session.type}</div>
                    <div className="session-duration">{Math.round(session.duration)}s</div>
                    <div className="session-date">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                    <div className={`session-status ${session.completed ? 'completed' : 'incomplete'}`}>
                      {session.completed ? '✅ Completed' : '⏸️ Incomplete'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Active Exercise */
        <div className="active-exercise">
          <div className={`breathing-circle bg-gradient-to-r ${selectedExercise.color}`}>
            <div className="circle-content">
              <div className="phase-name">{currentPhase}</div>
              <div className="countdown">{countdown}</div>
              <div className="cycle-count">Cycle {cycleCount + 1}/6</div>
            </div>
          </div>
          
          <div className="exercise-info">
            <h2>{selectedExercise.name}</h2>
            <p className="instruction">
              {selectedExercise.phases.find(p => p.name === currentPhase)?.instruction || 'Get ready...'}
            </p>
          </div>

          <button onClick={() => stopExercise(false)} className="stop-btn">
            Stop Exercise
          </button>
        </div>
      )}
    </div>
  );
};

export default BreathingExercises;
