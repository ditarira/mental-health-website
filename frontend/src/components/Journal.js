import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Journal = () => {
 const { user, token } = useAuth();
 const [entries, setEntries] = useState([]);
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [mood, setMood] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
 const [editingEntry, setEditingEntry] = useState(null);
 const [showDeletePopup, setShowDeletePopup] = useState(false);
 const [entryToDelete, setEntryToDelete] = useState(null);

 const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

 useEffect(() => {
   const handleResize = () => {
     setIsMobile(window.innerWidth <= 768);
   };
   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 const showNotification = (message, type = 'success') => {
   setMessage(message);
   setTimeout(() => setMessage(''), 3000);
 };

 const refreshDashboard = () => {
   window.dispatchEvent(new CustomEvent('journalUpdated'));
 };

 const moods = [
   { value: 'very_sad', emoji: '😢', label: 'Very Sad' },
   { value: 'sad', emoji: '😞', label: 'Sad' },
   { value: 'neutral', emoji: '😐', label: 'Neutral' },
   { value: 'happy', emoji: '😊', label: 'Happy' },
   { value: 'very_happy', emoji: '😃', label: 'Very Happy' }
 ];

 const fetchEntries = async () => {
   try {
     if (!token) return;

     const response = await fetch(`${API_BASE}/api/journal`, {
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     });

     if (response.ok) {
       const data = await response.json();
       setEntries(data.data || []);
     }
   } catch (error) {
     console.error('Error fetching entries:', error);
   }
 };

 const saveEntry = async () => {
   if (!content.trim()) {
     showNotification('Please write something in your journal entry', 'error');
     return;
   }

   if (!mood) {
     showNotification('Please select how you are feeling', 'error');
     return;
   }

   setLoading(true);
   try {
     const url = editingEntry ? `${API_BASE}/api/journal/${editingEntry.id}` : `${API_BASE}/api/journal`;
     const method = editingEntry ? 'PUT' : 'POST';

     const response = await fetch(url, {
       method: method,
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         title: title.trim() || `Entry from ${new Date().toLocaleDateString()}`,
         content: content.trim(),
         mood: mood
       })
     });

     if (response.ok) {
       showNotification(editingEntry ? 'Journal entry updated successfully! ✏️' : 'Journal entry saved successfully! 📝', 'success');
       setTitle('');
       setContent('');
       setMood('');
       setEditingEntry(null);
       fetchEntries();
       refreshDashboard();
     } else {
       const errorData = await response.json();
       showNotification(errorData.message || 'Failed to save entry', 'error');
     }
   } catch (error) {
     console.error('Error saving entry:', error);
     showNotification('Error saving entry. Please try again.', 'error');
   } finally {
     setLoading(false);
   }
 };

 const editEntry = (entry) => {
   setEditingEntry(entry);
   setTitle(entry.title);
   setContent(entry.content);
   setMood(entry.mood);
   // Scroll to top
   window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const cancelEdit = () => {
   setEditingEntry(null);
   setTitle('');
   setContent('');
   setMood('');
 };

 const openDeletePopup = (entry) => {
   setEntryToDelete(entry);
   setShowDeletePopup(true);
 };

 const closeDeletePopup = () => {
   setShowDeletePopup(false);
   setEntryToDelete(null);
 };

 const confirmDelete = async () => {
   if (!entryToDelete) return;

   try {
     const response = await fetch(`${API_BASE}/api/journal/${entryToDelete.id}`, {
       method: 'DELETE',
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     });

     if (response.ok) {
       showNotification('Journal entry deleted successfully! 🗑️', 'success');
       fetchEntries();
       refreshDashboard();
       closeDeletePopup();
     } else {
       const errorData = await response.json();
       showNotification(errorData.message || 'Failed to delete entry', 'error');
     }
   } catch (error) {
     console.error('Error deleting entry:', error);
     showNotification('Error deleting entry. Please try again.', 'error');
   }
 };

 useEffect(() => {
   if (user && token) {
     fetchEntries();
   }
 }, [user, token]);
// ADD THIS NEW useEffect:
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
  `;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);

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
         <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
         <h2 style={{ color: '#1f2937', marginBottom: '10px' }}>Please log in</h2>
         <p style={{ color: '#6b7280' }}>Sign in to access your personal journal</p>
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
     {/* Delete Popup */}
     {showDeletePopup && (
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
           <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗑️</div>
           <h3 style={{
             color: '#dc2626',
             fontSize: isMobile ? '1.2rem' : '1.4rem',
             fontWeight: '700',
             margin: '0 0 15px 0'
           }}>
             Delete Journal Entry?
           </h3>
           <p style={{
             color: '#6b7280',
             fontSize: isMobile ? '0.9rem' : '1rem',
             margin: '0 0 25px 0',
             lineHeight: '1.5'
           }}>
             Are you sure you want to delete "{entryToDelete?.title}"? This action cannot be undone.
           </p>
           
           <div style={{
             display: 'flex',
             gap: '10px',
             justifyContent: 'center'
           }}>
             <button
               onClick={closeDeletePopup}
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
               onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
               onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
             >
               Cancel
             </button>
             
             <button
               onClick={confirmDelete}
               style={{
                 background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                 color: 'white',
                 border: 'none',
                 borderRadius: '10px',
                 padding: isMobile ? '10px 20px' : '12px 24px',
                 fontSize: isMobile ? '0.9rem' : '1rem',
                 fontWeight: '600',
                 cursor: 'pointer',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
               }}
               onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
             >
               🗑️ Delete
             </button>
           </div>
         </div>
       </div>
     )}

     {/* Notification */}
     {message && (
       <div style={{
         position: 'fixed',
         top: '20px',
         right: '20px',
         background: message.includes('successfully') ? 
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
           <span style={{ fontSize: isMobile ? '2.5rem' : '3rem' }}>📝</span>
           <h1 style={{
             margin: 0,
             fontSize: isMobile ? '1.8rem' : '2.5rem',
             color: 'white',
             fontWeight: '700'
           }}>
             My Personal Journal
           </h1>
         </div>
         <p style={{
           margin: 0,
           fontSize: isMobile ? '1rem' : '1.1rem',
           color: 'rgba(255, 255, 255, 0.9)'
         }}>
           Express your thoughts and track your mood ❤️
         </p>
         <div style={{
           background: 'rgba(255, 255, 255, 0.25)',
           padding: '8px 16px',
           borderRadius: '20px',
           color: 'white',
           fontWeight: '600',
           fontSize: '0.9rem',
           backdropFilter: 'blur(5px)',
           display: 'inline-block',
           marginTop: '10px'
         }}>
           {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
         </div>
       </div>
     </div>

     {/* Main Content */}
     <div style={{
       maxWidth: '1000px',
       margin: '0 auto',
       padding: isMobile ? '20px' : '40px'
     }}>
       {/* Write New Entry */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: isMobile ? '15px' : '20px',
         padding: isMobile ? '25px' : '30px',
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         marginBottom: '30px',
         border: editingEntry ? '3px solid #667eea' : 'none'
       }}>
         <div style={{
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'space-between',
           gap: '10px',
           marginBottom: '25px'
         }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <span style={{ fontSize: '1.5rem' }}>{editingEntry ? '✏️' : '✍️'}</span>
             <h3 style={{
               margin: 0,
               fontSize: isMobile ? '1.3rem' : '1.5rem',
               color: '#374151',
               fontWeight: '700'
             }}>
               {editingEntry ? 'Edit Entry' : 'Write New Entry'}
             </h3>
           </div>
           {editingEntry && (
             <button
               onClick={cancelEdit}
               style={{
                 background: '#f3f4f6',
                 color: '#6b7280',
                 border: 'none',
                 borderRadius: '8px',
                 padding: '8px 12px',
                 fontSize: '0.8rem',
                 fontWeight: '600',
                 cursor: 'pointer'
               }}
             >
               Cancel
             </button>
           )}
         </div>

         {/* Title Input */}
         <div style={{ marginBottom: '20px' }}>
           <label style={{
             display: 'block',
             color: '#6b7280',
             fontSize: '0.9rem',
             marginBottom: '8px',
             fontWeight: '500'
           }}>
             📖 Give your entry a title... (optional)
           </label>
           <input
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="What's on your mind today?"
             style={{
               width: '100%',
               padding: isMobile ? '14px 16px' : '16px 20px',
               borderRadius: '12px',
               border: '2px solid #e5e7eb',
               background: '#f9fafb',
               color: '#374151',
               fontSize: isMobile ? '1rem' : '1.1rem',
               fontFamily: 'inherit',
               transition: 'all 0.2s ease',
               outline: 'none'
             }}
             onFocus={(e) => e.target.style.borderColor = '#667eea'}
             onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
           />
         </div>

         {/* Content Textarea */}
         <div style={{ marginBottom: '25px' }}>
           <label style={{
             display: 'block',
             color: '#6b7280',
             fontSize: '0.9rem',
             marginBottom: '8px',
             fontWeight: '500'
           }}>
             💭 How are you feeling today? Pour your heart out here...
           </label>
           <textarea
             value={content}
             onChange={(e) => setContent(e.target.value)}
             placeholder="Write about your day, thoughts, feelings, or anything that comes to mind..."
             style={{
               width: '100%',
               minHeight: isMobile ? '120px' : '150px',
               padding: isMobile ? '14px 16px' : '16px 20px',
               borderRadius: '12px',
               border: '2px solid #e5e7eb',
               background: '#f9fafb',
               color: '#374151',
               fontSize: isMobile ? '1rem' : '1.1rem',
               fontFamily: 'inherit',
               resize: 'vertical',
               transition: 'all 0.2s ease',
               outline: 'none',
               lineHeight: '1.6'
             }}
             onFocus={(e) => e.target.style.borderColor = '#667eea'}
             onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
           />
         </div>

         {/* Mood Selection - SMALLER EMOJIS FOR MOBILE */}
         <div style={{ marginBottom: '25px' }}>
           <label style={{
             display: 'block',
             color: '#6b7280',
             fontSize: '0.9rem',
             marginBottom: '12px',
             fontWeight: '500'
           }}>
             ❤️ How are you feeling?
           </label>
           <div style={{
             display: 'flex',
             gap: isMobile ? '6px' : '10px',
             flexWrap: 'wrap',
             justifyContent: 'center'
           }}>
             {moods.map(moodOption => (
               <button
                 key={moodOption.value}
                 onClick={() => setMood(moodOption.value)}
                 style={{
                   background: mood === moodOption.value
                     ? 'linear-gradient(135deg, #667eea, #764ba2)'
                     : 'rgba(102, 126, 234, 0.1)',
                   border: mood === moodOption.value
                     ? '3px solid #667eea'
                     : '2px solid #e5e7eb',
                   borderRadius: isMobile ? '10px' : '16px',
                   padding: isMobile ? '8px 10px' : '12px 16px',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   fontSize: isMobile ? '1.2rem' : '1.8rem',
                   minWidth: isMobile ? '45px' : '65px',
                   minHeight: isMobile ? '45px' : '65px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: mood === moodOption.value
                     ? '0 8px 25px rgba(102, 126, 234, 0.3)'
                     : '0 2px 8px rgba(0, 0, 0, 0.1)',
                   transform: mood === moodOption.value ? 'scale(1.05)' : 'scale(1)'
                 }}
                 onMouseEnter={(e) => {
                   if (mood !== moodOption.value) {
                     e.target.style.transform = 'scale(1.02)';
                     e.target.style.background = 'rgba(102, 126, 234, 0.15)';
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (mood !== moodOption.value) {
                     e.target.style.transform = 'scale(1)';
                     e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                   }
                 }}
                 title={moodOption.label}
               >
                 {moodOption.emoji}
               </button>
             ))}
           </div>
         </div>

         {/* Save Button */}
         <button
           onClick={saveEntry}
           disabled={loading}
           style={{
             width: '100%',
             padding: isMobile ? '14px 20px' : '16px 25px',
             borderRadius: '12px',
             border: 'none',
             background: loading
               ? '#d1d5db'
               : editingEntry 
                 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                 : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
             color: 'white',
             fontSize: isMobile ? '1rem' : '1.1rem',
             fontWeight: '600',
             cursor: loading ? 'not-allowed' : 'pointer',
             transition: 'all 0.2s ease',
             boxShadow: loading
               ? 'none'
               : editingEntry
                 ? '0 8px 25px rgba(16, 185, 129, 0.3)'
                 : '0 8px 25px rgba(102, 126, 234, 0.3)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '8px'
           }}
           onMouseEnter={(e) => {
             if (!loading) {
               e.target.style.transform = 'translateY(-2px)';
             }
           }}
           onMouseLeave={(e) => {
             if (!loading) {
               e.target.style.transform = 'translateY(0)';
             }
           }}
         >
           {loading ? (
             <>
               <span>⏳</span>
               <span>Saving...</span>
             </>
           ) : editingEntry ? (
             <>
               <span>✏️</span>
               <span>Update Entry</span>
             </>
           ) : (
             <>
               <span>💾</span>
               <span>Save Entry</span>
             </>
           )}
         </button>
       </div>

       {/* Journal Entries */}
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
           <span style={{ fontSize: '1.5rem' }}>📖</span>
           <h3 style={{
             margin: 0,
             fontSize: isMobile ? '1.3rem' : '1.5rem',
             color: '#374151',
             fontWeight: '700'
           }}>
             Your Journal Entries
           </h3>
         </div>

         {entries.length === 0 ? (
           <div style={{
             textAlign: 'center',
             padding: isMobile ? '30px 20px' : '40px',
             color: '#6b7280'
           }}>
             <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📔</div>
             <h3 style={{ color: '#374151', marginBottom: '10px' }}>No entries yet</h3>
             <p style={{ margin: 0 }}>Start writing your first journal entry above!</p>
           </div>
         ) : (
           <div style={{
             display: 'grid',
             gap: isMobile ? '15px' : '20px'
           }}>
             {entries.map(entry => {
               const entryMood = moods.find(m => m.value === entry.mood);
               return (
                 <div
                   key={entry.id}
                   style={{
                     background: '#f8fafc',
                     borderRadius: '15px',
                     padding: isMobile ? '20px' : '25px',
                     border: '2px solid #e2e8f0',
                     transition: 'all 0.2s ease',
                     position: 'relative'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-2px)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}
                 >
                   {/* Entry Header */}
                   <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'flex-start',
                     marginBottom: '15px',
                     flexWrap: 'wrap',
                     gap: '10px'
                   }}>
                     <div style={{ flex: 1, minWidth: isMobile ? '150px' : '200px' }}>
                       <h4 style={{
                         margin: '0 0 5px 0',
                         color: '#374151',
                         fontSize: isMobile ? '1.1rem' : '1.2rem',
                         fontWeight: '600'
                       }}>
                         {entry.title}
                       </h4>
                      <p style={{
                          margin: '8px 0 0 0',
                          fontSize: '0.7rem',
                          color: '#9ca3af'
                        }} className="mobile-date">  // ADD THIS
                 {new Date(entry.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric', 
                    year: 'numeric'
                    })}
                  </p>
                     </div>
                     
                     <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       gap: '8px'
                     }}>
                       {/* SHOW ONLY EMOJI - NO TEXT */}
                       {entryMood && (
                         <div style={{
                           background: 'rgba(102, 126, 234, 0.1)',
                           padding: '6px 10px',
                           borderRadius: '10px',
                           fontSize: isMobile ? '1rem' : '1.4rem',
                           border: '2px solid rgba(102, 126, 234, 0.2)'
                         }}>
                           {entryMood.emoji}
                         </div>
                       )}

                       {/* Edit & Delete Buttons */}
                       <div style={{
                         display: 'flex',
                         gap: '4px'
                       }}>
                         <button
                           onClick={() => editEntry(entry)}
                           style={{
                             background: 'linear-gradient(135deg, #10b981, #059669)',
                             color: 'white',
                             border: 'none',
                             borderRadius: '8px',
                             padding: isMobile ? '6px 8px' : '8px 10px',
                             fontSize: isMobile ? '0.8rem' : '0.9rem',
                             cursor: 'pointer',
                             transition: 'all 0.2s ease',
                             fontWeight: '600'
                           }}
                           onMouseEnter={(e) => {
                             e.target.style.transform = 'scale(1.05)';
                           }}
                           onMouseLeave={(e) => {
                             e.target.style.transform = 'scale(1)';
                           }}
                           title="Edit entry"
                         >
                           ✏️ {!isMobile && 'Edit'}
                         </button>
                         
                         <button
                           onClick={() => openDeletePopup(entry)}
                           style={{
                             background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                             color: 'white',
                             border: 'none',
                             borderRadius: '8px',
                             padding: isMobile ? '6px 8px' : '8px 10px',
                             fontSize: isMobile ? '0.8rem' : '0.9rem',
                             cursor: 'pointer',
                             transition: 'all 0.2s ease',
                             fontWeight: '600'
                           }}
                           onMouseEnter={(e) => {
                             e.target.style.transform = 'scale(1.05)';
                           }}
                           onMouseLeave={(e) => {
                             e.target.style.transform = 'scale(1)';
                           }}
                           title="Delete entry"
                         >
                           🗑️ {!isMobile && 'Delete'}
                         </button>
                       </div>
                     </div>
                   </div>

                   {/* Entry Content */}
                   <div style={{
                     color: '#374151',
                     fontSize: isMobile ? '0.95rem' : '1rem',
                     lineHeight: '1.6',
                     whiteSpace: 'pre-wrap'
                   }}>
                     {entry.content}
                   </div>
                 </div>
               );
             })}
           </div>
         )}
       </div>
     </div>
   </div>
 );
};

export default Journal;
