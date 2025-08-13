import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
 const { user } = useAuth();
 const navigate = useNavigate();
 const [moodToday, setMoodToday] = useState(null);
 const [todaysGoal, setTodaysGoal] = useState('');
 const [completedActivities, setCompletedActivities] = useState([]);
 const [showQuickHelp, setShowQuickHelp] = useState(false);

 const moods = [
   { emoji: '😄', label: 'Excellent', value: 5, color: '#10b981' },
   { emoji: '😊', label: 'Good', value: 4, color: '#3b82f6' },
   { emoji: '😐', label: 'Okay', value: 3, color: '#f59e0b' },
   { emoji: '😔', label: 'Not Great', value: 2, color: '#ef4444' },
   { emoji: '😢', label: 'Difficult', value: 1, color: '#dc2626' }
 ];

 const wellnessActivities = [
   { id: 1, name: 'Morning Meditation', icon: '🧘', duration: '10 min', category: 'mindfulness' },
   { id: 2, name: 'Gratitude Journaling', icon: '📝', duration: '5 min', category: 'reflection' },
   { id: 3, name: 'Breathing Exercise', icon: '🌬️', duration: '3 min', category: 'relaxation' },
   { id: 4, name: 'Nature Walk', icon: '🌳', duration: '20 min', category: 'physical' },
   { id: 5, name: 'Mindful Eating', icon: '🥗', duration: '15 min', category: 'nutrition' },
   { id: 6, name: 'Connect with Friend', icon: '💬', duration: '10 min', category: 'social' },
   { id: 7, name: 'Gentle Stretching', icon: '🤸', duration: '8 min', category: 'physical' },
   { id: 8, name: 'Listen to Music', icon: '🎵', duration: '15 min', category: 'entertainment' }
 ];

 const quickActions = [
   { 
     icon: '📝', 
     title: 'Journal Entry', 
     path: '/journal', 
     color: '#3b82f6',
     description: 'Write about your thoughts and feelings'
   },
   { 
     icon: '🧘', 
     title: 'Breathing Exercise', 
     path: '/breathing', 
     color: '#8b5cf6',
     description: 'Calm your mind with guided breathing'
   },
   { 
     icon: '📊', 
     title: 'Take Assessment', 
     path: '/assessment', 
     color: '#06b6d4',
     description: 'Check your mental health status'
   },
   { 
     icon: '🧘‍♀️', 
     title: 'Meditation', 
     path: '/meditation', 
     color: '#059669',
     description: 'Find peace with guided meditation'
   },
   { 
     icon: '👥', 
     title: 'Support Groups', 
     path: '/support-groups', 
     color: '#f59e0b',
     description: 'Connect with others who understand'
   },
   { 
     icon: '🛠️', 
     title: 'Self-Help Tools', 
     path: '/self-help', 
     color: '#ef4444',
     description: 'Learn coping strategies and techniques'
   }
 ];

 const toggleActivity = (activityId) => {
   if (completedActivities.includes(activityId)) {
     setCompletedActivities(prev => prev.filter(id => id !== activityId));
   } else {
     setCompletedActivities(prev => [...prev, activityId]);
   }
 };

 const getGreeting = () => {
   const hour = new Date().getHours();
   if (hour < 12) return 'Good morning';
   if (hour < 17) return 'Good afternoon';
   return 'Good evening';
 };

 const getMoodMessage = () => {
   if (!moodToday) return "How are you feeling today?";
   
   switch(moodToday.value) {
     case 5: return "Wonderful! Keep embracing this positive energy! ✨";
     case 4: return "Great to hear you're doing well! 🌟";
     case 3: return "Thanks for checking in. Remember, okay days are valid too. 💙";
     case 2: return "I hear you. It's okay to have difficult moments. You're not alone. 🤗";
     case 1: return "Thank you for sharing. Please consider reaching out for support. You matter. 💜";
     default: return "How are you feeling today?";
   }
 };

 return (
   <div style={{
     minHeight: '100vh',
     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
     padding: '2rem'
   }}>
     <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
       {/* Welcome Header */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '25px',
         padding: '2rem',
         marginBottom: '2rem',
         boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
         backdropFilter: 'blur(10px)'
       }}>
         <h1 style={{
           background: 'linear-gradient(135deg, #667eea, #764ba2)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
           fontSize: '2.5rem',
           fontWeight: 'bold',
           marginBottom: '0.5rem'
         }}>
           {getGreeting()}, {user?.firstName}! 🌟
         </h1>
         <p style={{ 
           color: '#64748b', 
           fontSize: '1.1rem',
           lineHeight: '1.6'
         }}>
           Welcome to your mental wellness dashboard. Take a moment to check in with yourself and explore the tools available to support your journey.
         </p>
       </div>

       {/* Mood Check-in and Quick Help */}
       <div style={{
         display: 'grid',
         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
         gap: '2rem',
         marginBottom: '2rem'
       }}>
         {/* Mood Check-in */}
         <div style={{
           background: 'rgba(255, 255, 255, 0.95)',
           borderRadius: '20px',
           padding: '2rem',
           boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
         }}>
           <h3 style={{
             color: '#667eea',
             fontSize: '1.5rem',
             marginBottom: '1rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}>
             💭 Mood Check-in
           </h3>
           
           {!moodToday ? (
             <div>
               <p style={{ 
                 color: '#64748b', 
                 marginBottom: '1.5rem',
                 lineHeight: '1.5'
               }}>
                 Take a moment to check in with yourself today.
               </p>
               <div style={{
                 display: 'grid',
                 gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                 gap: '0.5rem'
               }}>
                 {moods.map(mood => (
                   <button
                     key={mood.value}
                     onClick={() => setMoodToday(mood)}
                     style={{
                       background: 'white',
                       border: `2px solid ${mood.color}`,
                       borderRadius: '15px',
                       padding: '1rem 0.5rem',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       textAlign: 'center'
                     }}
                     onMouseOver={(e) => {
                       e.currentTarget.style.background = mood.color;
                       e.currentTarget.style.color = 'white';
                       e.currentTarget.style.transform = 'scale(1.05)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.background = 'white';
                       e.currentTarget.style.color = 'initial';
                       e.currentTarget.style.transform = 'scale(1)';
                     }}
                   >
                     <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                       {mood.emoji}
                     </div>
                     <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>
                       {mood.label}
                     </div>
                   </button>
                 ))}
               </div>
             </div>
           ) : (
             <div style={{ textAlign: 'center' }}>
               <div style={{
                 fontSize: '4rem',
                 marginBottom: '1rem'
               }}>
                 {moodToday.emoji}
               </div>
               <p style={{
                 color: moodToday.color,
                 fontSize: '1.2rem',
                 fontWeight: 'bold',
                 marginBottom: '0.5rem'
               }}>
                 Feeling {moodToday.label}
               </p>
               <p style={{ 
                 color: '#64748b',
                 marginBottom: '1rem',
                 lineHeight: '1.5'
               }}>
                 {getMoodMessage()}
               </p>
               <button
                 onClick={() => setMoodToday(null)}
                 style={{
                   background: 'transparent',
                   color: '#667eea',
                   border: '2px solid #667eea',
                   borderRadius: '10px',
                   padding: '0.5rem 1rem',
                   cursor: 'pointer',
                   fontSize: '0.9rem',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseOver={(e) => {
                   e.currentTarget.style.background = '#667eea';
                   e.currentTarget.style.color = 'white';
                 }}
                 onMouseOut={(e) => {
                   e.currentTarget.style.background = 'transparent';
                   e.currentTarget.style.color = '#667eea';
                 }}
               >
                 Change Mood
               </button>
             </div>
           )}
         </div>

         {/* Today's Wellness Goal */}
         <div style={{
           background: 'rgba(255, 255, 255, 0.95)',
           borderRadius: '20px',
           padding: '2rem',
           boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
         }}>
           <h3 style={{
             color: '#667eea',
             fontSize: '1.5rem',
             marginBottom: '1rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem'
           }}>
             🎯 Today's Wellness Goal
           </h3>
           <textarea
             value={todaysGoal}
             onChange={(e) => setTodaysGoal(e.target.value)}
             placeholder="What's one thing you want to focus on for your mental health today?"
             style={{
               width: '100%',
               minHeight: '100px',
               border: '2px solid #e2e8f0',
               borderRadius: '12px',
               padding: '1rem',
               fontSize: '1rem',
               resize: 'vertical',
               outline: 'none',
               transition: 'all 0.3s ease',
               lineHeight: '1.5'
             }}
             onFocus={(e) => {
               e.currentTarget.style.borderColor = '#667eea';
               e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
             }}
             onBlur={(e) => {
               e.currentTarget.style.borderColor = '#e2e8f0';
               e.currentTarget.style.boxShadow = 'none';
             }}
           />
           {todaysGoal && (
             <div style={{
               marginTop: '1rem',
               padding: '1rem',
               background: 'linear-gradient(135deg, #10b981, #059669)',
               borderRadius: '12px',
               color: 'white',
               textAlign: 'center'
             }}>
               ✨ Great goal! You've got this! ✨
             </div>
           )}
         </div>
       </div>

       {/* Wellness Activities */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '2rem',
         boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
         marginBottom: '2rem'
       }}>
         <h3 style={{
           color: '#667eea',
           fontSize: '1.5rem',
           marginBottom: '1.5rem',
           display: 'flex',
           alignItems: 'center',
           gap: '0.5rem'
         }}>
           ✨ Today's Wellness Activities
         </h3>
         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
           gap: '1rem'
         }}>
           {wellnessActivities.map(activity => (
             <div
               key={activity.id}
               style={{
                 background: completedActivities.includes(activity.id) 
                   ? 'linear-gradient(135deg, #10b981, #059669)' 
                   : 'white',
                 border: '2px solid #e2e8f0',
                 borderRadius: '15px',
                 padding: '1.5rem',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
                 color: completedActivities.includes(activity.id) ? 'white' : '#334155'
               }}
               onClick={() => toggleActivity(activity.id)}
               onMouseOver={(e) => {
                 if (!completedActivities.includes(activity.id)) {
                   e.currentTarget.style.transform = 'translateY(-3px)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
                 }
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = 'none';
               }}
             >
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 marginBottom: '0.5rem'
               }}>
                 <span style={{ fontSize: '2rem' }}>{activity.icon}</span>
                 <div style={{ flex: 1 }}>
                   <h4 style={{
                     margin: 0,
                     fontSize: '1.1rem',
                     fontWeight: '600'
                   }}>
                     {activity.name}
                   </h4>
                   <p style={{
                     margin: 0,
                     fontSize: '0.9rem',
                     opacity: 0.8
                   }}>
                     {activity.duration}
                   </p>
                 </div>
                 <div style={{
                   width: '24px',
                   height: '24px',
                   borderRadius: '50%',
                   background: completedActivities.includes(activity.id) 
                     ? 'rgba(255,255,255,0.3)' 
                     : '#e2e8f0',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: '1rem'
                 }}>
                   {completedActivities.includes(activity.id) ? '✓' : ''}
                 </div>
               </div>
             </div>
           ))}
         </div>
         <div style={{
           marginTop: '1.5rem',
           textAlign: 'center',
           color: '#64748b'
         }}>
           <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
             Progress: {completedActivities.length}/{wellnessActivities.length} activities completed
           </div>
           <div style={{
             width: '100%',
             height: '8px',
             background: '#e2e8f0',
             borderRadius: '4px',
             overflow: 'hidden',
             marginBottom: '1rem'
           }}>
             <div style={{
               width: `${(completedActivities.length / wellnessActivities.length) * 100}%`,
               height: '100%',
               background: 'linear-gradient(135deg, #10b981, #059669)',
               borderRadius: '4px',
               transition: 'width 0.3s ease'
             }} />
           </div>
           {completedActivities.length === wellnessActivities.length && (
             <div style={{
               padding: '1rem',
               background: 'linear-gradient(135deg, #f59e0b, #d97706)',
               borderRadius: '12px',
               color: 'white',
               fontWeight: 'bold'
             }}>
               🎉 Amazing! You've completed all activities today! 🎉
             </div>
           )}
         </div>
       </div>

       {/* Quick Actions Grid */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '2rem',
         boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
         marginBottom: '2rem'
       }}>
         <h3 style={{
           color: '#667eea',
           fontSize: '1.5rem',
           marginBottom: '1.5rem',
           display: 'flex',
           alignItems: 'center',
           gap: '0.5rem'
         }}>
           🚀 Quick Actions
         </h3>
         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
           gap: '1rem'
         }}>
           {quickActions.map((action, index) => (
             <button
               key={index}
               onClick={() => navigate(action.path)}
               style={{
                 background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                 color: 'white',
                 border: 'none',
                 borderRadius: '15px',
                 padding: '1.5rem',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
                 textAlign: 'center',
                 fontSize: '1rem',
                 fontWeight: '600'
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'translateY(-5px)';
                 e.currentTarget.style.boxShadow = `0 12px 30px ${action.color}40`;
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = 'none';
               }}
             >
               <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                 {action.icon}
               </div>
               <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                 {action.title}
               </div>
               <div style={{ 
                 fontSize: '0.85rem', 
                 opacity: 0.9,
                 lineHeight: '1.4'
               }}>
                 {action.description}
               </div>
             </button>
           ))}
         </div>
       </div>

       {/* Mental Health Tips */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '2rem',
         boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
       }}>
         <h3 style={{
           color: '#667eea',
           fontSize: '1.5rem',
           marginBottom: '1.5rem',
           display: 'flex',
           alignItems: 'center',
           gap: '0.5rem'
         }}>
           💡 Daily Mental Health Tips
         </h3>
         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
           gap: '1.5rem'
         }}>
           {[
             {
               icon: '🌱',
               title: 'Practice Gratitude',
               tip: 'Write down three things you\'re grateful for each day to boost your mood and perspective.',
               color: '#10b981'
             },
             {
               icon: '💧',
               title: 'Stay Hydrated',
               tip: 'Drinking enough water helps maintain energy levels and supports brain function.',
               color: '#06b6d4'
             },
             {
               icon: '🌙',
               title: 'Prioritize Sleep',
               tip: 'Aim for 7-9 hours of quality sleep to support emotional regulation and mental clarity.',
               color: '#8b5cf6'
             },
             {
               icon: '🤝',
               title: 'Connect with Others',
               tip: 'Reach out to friends, family, or support groups. Social connection is vital for mental health.',
               color: '#f59e0b'
             }
           ].map((tip, index) => (
             <div
               key={index}
               style={{
                 background: 'white',
                 border: `2px solid ${tip.color}20`,
                 borderRadius: '15px',
                 padding: '1.5rem',
                 transition: 'all 0.3s ease'
               }}
               onMouseOver={(e) => {
                 e.currentTarget.style.transform = 'translateY(-3px)';
                 e.currentTarget.style.boxShadow = `0 8px 25px ${tip.color}20`;
                 e.currentTarget.style.borderColor = `${tip.color}40`;
               }}
               onMouseOut={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = 'none';
                 e.currentTarget.style.borderColor = `${tip.color}20`;
               }}
             >
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 marginBottom: '1rem'
               }}>
                 <div style={{
                   fontSize: '2rem',
                   background: `${tip.color}20`,
                   borderRadius: '12px',
                   padding: '0.5rem',
                   minWidth: '50px',
                   textAlign: 'center'
                 }}>
                   {tip.icon}
                 </div>
                 <h4 style={{
                   color: tip.color,
                   fontSize: '1.1rem',
                   fontWeight: 'bold',
                   margin: 0
                 }}>
                   {tip.title}
                 </h4>
               </div>
               <p style={{
                 color: '#64748b',
                 fontSize: '0.95rem',
                 lineHeight: '1.5',
                 margin: 0
               }}>
                 {tip.tip}
               </p>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
};

export default Dashboard;
