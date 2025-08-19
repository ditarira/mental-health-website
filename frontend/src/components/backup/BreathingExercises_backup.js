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
 const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
 const intervalRef = useRef(null);

 const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

 // Handle window resize
 useEffect(() => {
   const handleResize = () => {
     setIsMobile(window.innerWidth <= 768);
   };
   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 // Show notification function
 const showNotification = (message, type = 'success') => {
   setNotification({ message, type });
   setTimeout(() => setNotification(null), 4000);
 };

 // Refresh dashboard stats
 const refreshDashboard = () => {
   window.dispatchEvent(new CustomEvent('journalUpdated'));
 };

 // Simplified breathing exercises
 const exercises = [
   {
     id: 1,
     name: '4-7-8 Deep Relaxation',
     totalDuration: 152, // 8 cycles * 19s per cycle
     sessions: sessions.filter(s => s.type.includes('4-7-8')).length,
     color: 'linear-gradient(135deg, #a7c7e7 0%, #6fa8dc 100%)',
     phases: [
       { name: 'Inhale🫁', duration: 4 },
       { name: 'Hold⏸️', duration: 7 },
       { name: 'Exhale🌬️', duration: 8 }
     ]
   },
   {
     id: 2,
     name: 'Box Breathing',
     totalDuration: 128, // 8 cycles * 16s per cycle
     sessions: sessions.filter(s => s.type.includes('Box')).length,
     color: 'linear-gradient(135deg, #f4c2c2 0%, #dda0dd 100%)',
     phases: [
       { name: 'Inhale🫁', duration: 4 },
       { name: 'Hold⏸️', duration: 4 },
       { name: 'Exhale🌬️', duration: 4 },
       { name: 'Hold⏸️', duration: 4 }
     ]
   },
   {
     id: 3,
     name: 'Triangle Breathing',
     totalDuration: 144, // 8 cycles * 18s per cycle
     sessions: sessions.filter(s => s.type.includes('Triangle')).length,
     color: 'linear-gradient(135deg, #c6efce 0%, #a9dfbf 100%)',
     phases: [
       { name: 'Inhale🫁', duration: 6 },
       { name: 'Hold⏸️', duration: 6 },
       { name: 'Exhale🌬️', duration: 6 }
     ]
   },
   {
     id: 4,
     name: 'Coherent Breathing',
     totalDuration: 80, // 8 cycles * 10s per cycle
     sessions: sessions.filter(s => s.type.includes('Coherent')).length,
     color: 'linear-gradient(135deg, #fff2cc 0%, #ffe599 100%)',
     phases: [
       { name: 'Inhale🫁', duration: 5 },
       { name: 'Exhale🌬️', duration: 5 }
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

     if (data.success) {
       showNotification('Session completed! ' + Math.round(duration) + 's', 'success');
       fetchSessions();
       refreshDashboard();
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
 const maxCycles = 8;

 setCurrentPhase(exercise.phases[0].name);
 setCountdown(exercise.phases[0].duration);

 intervalRef.current = setInterval(() => {
   phaseTime++;
   const remainingTime = exercise.phases[phaseIndex].duration - phaseTime;
   setCountdown(remainingTime);

   // Check if current phase is complete
   if (phaseTime >= exercise.phases[phaseIndex].duration) {
     // Move to next phase
     phaseTime = 0;
     phaseIndex++;

     // Check if we completed all phases in this cycle
     if (phaseIndex >= exercise.phases.length) {
       phaseIndex = 0;
       cycles++;
       setCycleCount(cycles);

       // Check if we completed all cycles
       if (cycles >= maxCycles) {
         stopExercise(true);
         return;
       }
     }

     // Set up next phase
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
         borderRadius: '24px',
         padding: isMobile ? '30px 20px' : '60px 40px',
         textAlign: 'center',
         maxWidth: '500px',
         width: '100%',
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
         background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
         color: 'white',
         padding: '15px 20px',
         borderRadius: '12px',
         boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
         zIndex: 1000,
         display: 'flex',
         alignItems: 'center',
         gap: '10px',
         maxWidth: isMobile ? '300px' : '400px'
       }}>
         <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
         <span style={{ flex: 1 }}>{notification.message}</span>
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

     {/* Header */}
     <div style={{
       background: 'rgba(255, 255, 255, 0.1)',
       backdropFilter: 'blur(15px)',
       padding: isMobile ? '15px 20px' : '30px 40px',
       borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
     }}>
       <div style={{
         maxWidth: '1200px',
         margin: '0 auto',
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         flexWrap: 'wrap',
         gap: '15px'
       }}>
         <div>
           <h1 style={{
             margin: '0 0 5px 0',
             fontSize: isMobile ? '1.4rem' : '2.2rem',
             color: 'white',
             fontWeight: '700',
             textShadow: '0 2px 10px rgba(0,0,0,0.2)'
           }}>
             🧘‍♀️ Breathing Exercises
           </h1>
           <p style={{
             margin: 0,
             fontSize: isMobile ? '0.9rem' : '1.1rem',
             color: 'rgba(255, 255, 255, 0.9)'
           }}>
             Find your calm with guided breathing ✨
           </p>
         </div>

         <div style={{
           background: 'rgba(255, 255, 255, 0.25)',
           padding: '10px 20px',
           borderRadius: '15px',
           color: 'white',
           fontWeight: '600',
           fontSize: '0.9rem',
           backdropFilter: 'blur(5px)'
         }}>
           {sessions.length} Sessions
         </div>
       </div>
     </div>

     {/* Main Content */}
     <div style={{
       maxWidth: '1200px',
       margin: '0 auto',
       padding: isMobile ? '20px' : '40px'
     }}>

       {!isActive ? (
         <>
           {/* Exercise Selection */}
           <div style={{
             display: 'grid',
             gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
             gap: isMobile ? '12px' : '20px',
             marginBottom: '40px'
           }}>
             {exercises.map(exercise => (
               <div
                 key={exercise.id}
                 onClick={() => startExercise(exercise)}
                 style={{
                   background: exercise.color,
                   borderRadius: isMobile ? '12px' : '20px',
                   padding: isMobile ? '20px' : '25px',
                   textAlign: 'center',
                   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                   color: 'white',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   minHeight: isMobile ? '120px' : '140px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'space-between'
                 }}
               >
                 <div>
                   <h3 style={{
                     margin: '0 0 10px 0',
                     fontSize: isMobile ? '0.9rem' : '1.1rem',
                     fontWeight: '700',
                     lineHeight: '1.2'
                   }}>
                     {exercise.name}
                   </h3>
                 </div>

                 <div style={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   fontSize: isMobile ? '0.7rem' : '0.8rem',
                   opacity: 0.9
                 }}>
                   <span>{exercise.sessions} sessions</span>
                   <span>{Math.round(exercise.totalDuration / 60)}min</span>
                 </div>
               </div>
             ))}
           </div>

           {/* Recent Sessions */}
           <div style={{
             background: 'rgba(255, 255, 255, 0.95)',
             borderRadius: isMobile ? '12px' : '20px',
             padding: isMobile ? '20px' : '30px',
             boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
             backdropFilter: 'blur(10px)',
             border: '1px solid rgba(255, 255, 255, 0.3)'
           }}>
             <h2 style={{
               margin: '0 0 20px 0',
               fontSize: isMobile ? '1.2rem' : '1.5rem',
               color: '#1f2937',
               fontWeight: '700'
             }}>
               📊 Recent Sessions
             </h2>

             {sessions.length === 0 ? (
               <div style={{
                 textAlign: 'center',
                 padding: '40px 20px',
                 color: '#6b7280'
               }}>
                 <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✨</div>
                 <h3 style={{ color: '#1f2937', marginBottom: '8px' }}>No sessions yet</h3>
                 <p style={{ margin: 0 }}>Start your first breathing exercise above!</p>
               </div>
             ) : (
               <div style={{
                 display: 'grid',
                 gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
                 gap: '15px'
               }}>
                 {sessions.slice(0, 6).map(session => (
                   <div key={session.id} style={{
                     background: '#f8fafc',
                     borderRadius: '12px',
                     padding: '15px',
                     border: '1px solid #e2e8f0'
                   }}>
                     <div style={{
                       fontSize: isMobile ? '0.8rem' : '0.9rem',
                       fontWeight: '600',
                       color: '#1f2937',
                       marginBottom: '5px'
                     }}>
                       {session.type}
                     </div>
                     <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',
                       fontSize: '0.75rem',
                       color: '#6b7280'
                     }}>
                       <span>{Math.round(session.duration)}s</span>
                       <span>{session.completed ? '✅' : '⏸️'}</span>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
         </>
       ) : (
         /* Active Exercise */
         <div style={{
           background: 'rgba(255, 255, 255, 0.95)',
           borderRadius: isMobile ? '12px' : '20px',
           padding: isMobile ? '30px 20px' : '50px 40px',
           textAlign: 'center',
           boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
           backdropFilter: 'blur(10px)',
           border: '1px solid rgba(255, 255, 255, 0.3)'
         }}>
           <div style={{
             marginBottom: '30px'
           }}>
             <h2 style={{
               margin: '0 0 10px 0',
               fontSize: isMobile ? '1.3rem' : '1.8rem',
               color: '#1f2937',
               fontWeight: '700'
             }}>
               {selectedExercise.name}
             </h2>
             <div style={{
               fontSize: isMobile ? '0.9rem' : '1rem',
               color: '#6b7280',
               fontWeight: '600'
             }}>
               Cycle {cycleCount + 1} of 8
             </div>
           </div>

           {/* Breathing Circle */}
           <div style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             marginBottom: '30px'
           }}>
             <div style={{
               width: isMobile ? '200px' : '300px',
               height: isMobile ? '200px' : '300px',
               borderRadius: '50%',
               background: selectedExercise.color,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               color: 'white',
               boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
               transform: currentPhase === 'Inhale🫁' ? 'scale(1.2)' :
                         currentPhase === 'Exhale🌬️' ? 'scale(0.8)' : 'scale(1)',
               transition: 'transform 1s ease-in-out'
             }}>
               <div style={{
                 fontSize: isMobile ? '1.2rem' : '1.5rem',
                 fontWeight: '700',
                 marginBottom: '10px'
               }}>
                 {currentPhase}
               </div>
               <div style={{
                 fontSize: isMobile ? '2rem' : '3rem',
                 fontWeight: '900'
               }}>
                 {countdown}
               </div>
             </div>
           </div>

           {/* Instruction */}
           <div style={{
             fontSize: isMobile ? '1rem' : '1.2rem',
             color: '#374151',
             marginBottom: '30px',
             fontWeight: '500'
           }}>
             {currentPhase === 'Inhale🫁' && 'Breathe in slowly and deeply'}
             {currentPhase === 'Hold⏸️' && 'Hold your breath gently'}
             {currentPhase === 'Exhale🌬️' && 'Breathe out slowly and completely'}
             {currentPhase === 'Get Ready' && 'Get ready to begin...'}
           </div>

           {/* Stop Button */}
           <button
             onClick={() => stopExercise(false)}
             style={{
               background: 'linear-gradient(135deg, #ef4444, #dc2626)',
               color: 'white',
               border: 'none',
               padding: '15px 30px',
               borderRadius: '12px',
               fontSize: '1rem',
               fontWeight: '600',
               cursor: 'pointer',
               transition: 'all 0.2s ease',
               boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
             }}
           >
             Stop Exercise ⏸️
           </button>
         </div>
       )}
     </div>
   </div>
 );
};

export default BreathingExercises;
