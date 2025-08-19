import React, { useState, useEffect } from 'react';

const Resources = () => {
 const [selectedArticle, setSelectedArticle] = useState(null);
 const [notification, setNotification] = useState(null);
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isMobile, setIsMobile] = useState(false);
 const [touchStart, setTouchStart] = useState(0);
 const [touchEnd, setTouchEnd] = useState(0);

 useEffect(() => {
   const checkMobile = () => {
     setIsMobile(window.innerWidth <= 768);
   };

   checkMobile();
   window.addEventListener('resize', checkMobile);
   return () => window.removeEventListener('resize', checkMobile);
 }, []);

 const showNotification = (message, type = 'success') => {
   setNotification({ message, type });
   setTimeout(() => setNotification(null), 3000);
 };

 const resources = [
   {
     id: 1,
     category: 'crisis',
     title: '988 Suicide & Crisis Lifeline',
     shortTitle: 'Crisis Lifeline',
     description: 'Free, confidential emotional support 24/7 for people in suicidal crisis or emotional distress.',
     contact: '988',
     website: 'https://988lifeline.org',
     urgent: true,
     emoji: '🆘',
     bgColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
     placeholder: '🆘',
     article: {
       title: 'Understanding the 988 Suicide & Crisis Lifeline',
       sections: [
         {
           heading: 'What is the 988 Lifeline?',
           content: 'The 988 Suicide & Crisis Lifeline is a national network of local crisis centers that provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States.'
         },
         {
           heading: 'How to Handle a Crisis Situation',
           content: 'If you or someone you know is experiencing thoughts of suicide or severe emotional distress, call 988 immediately. When you call, you will be connected to a trained crisis counselor at a local crisis center in your area.'
         },
         {
           heading: 'Extra Support & Advice',
           content: 'The 988 Lifeline also offers specialized support: Press 1 for Veterans, Press 2 for Spanish language support, and Press 3 for LGBTQ+ youth support. You can also chat online at 988lifeline.org or text 988.'
         }
       ]
     }
   },
   {
     id: 2,
     category: 'crisis',
     title: 'Crisis Text Line',
     shortTitle: 'Text Support',
     description: 'Free, 24/7 crisis support via text message with trained crisis counselors.',
     contact: 'Text HOME to 741741',
     website: 'https://crisistextline.org',
     urgent: true,
     emoji: '💬',
     bgColor: 'linear-gradient(135deg, #a7c7e7 0%, #6fa8dc 100%)',
     placeholder: '💬',
     article: {
       title: 'Crisis Text Line: Text-Based Mental Health Support',
       sections: [
         {
           heading: 'What is Crisis Text Line?',
           content: 'Crisis Text Line provides free, 24/7, confidential text-based mental health support and crisis intervention. When you text HOME to 741741, a live, trained Crisis Counselor receives the text and responds quickly.'
         },
         {
           heading: 'How Text-Based Crisis Support Works',
           content: 'Text messaging can be easier than talking on the phone for many people, especially younger individuals. When you text HOME to 741741, you will be connected to a Crisis Counselor within 5 minutes.'
         },
         {
           heading: 'Tips for Effective Crisis Texting',
           content: 'Be honest about what you are going through - Crisis Counselors are trained to handle any situation without judgment. Use specific words to describe your feelings. Save 741741 in your phone for quick access.'
         }
       ]
     }
   },
   {
     id: 3,
     category: 'crisis',
     title: 'National Domestic Violence Hotline',
     shortTitle: 'Domestic Violence Support',
     description: 'Confidential support for domestic violence survivors and their loved ones, available 24/7.',
     contact: '1-800-799-7233',
     website: 'https://thehotline.org',
     urgent: true,
     emoji: '🛡️',
     bgColor: 'linear-gradient(135deg, #f4c2c2 0%, #dda0dd 100%)',
     placeholder: '🛡️',
     article: {
       title: 'National Domestic Violence Hotline: Safety and Support',
       sections: [
         {
           heading: 'Understanding Domestic Violence Support',
           content: 'The National Domestic Violence Hotline provides lifesaving tools and immediate support to enable victims to find safety and live lives free of abuse. Trained advocates are available 24/7.'
         },
         {
           heading: 'Creating a Safety Plan',
           content: 'If you are in an abusive relationship, creating a safety plan is crucial. This includes identifying safe places to go, keeping important documents and emergency money accessible.'
         },
         {
           heading: 'Supporting Someone in an Abusive Relationship',
           content: 'If someone you know is in an abusive relationship: Listen without judgment, believe them, let them know the abuse is not their fault, respect their decisions, help them create a safety plan.'
         }
       ]
     }
   },
   {
     id: 4,
     category: 'professional',
     title: 'Psychology Today Therapist Directory',
     shortTitle: 'Find a Therapist',
     description: 'Comprehensive directory to find licensed therapists and mental health professionals.',
     website: 'https://psychologytoday.com',
     emoji: '👩‍⚕️',
     bgColor: 'linear-gradient(135deg, #c6efce 0%, #a9dfbf 100%)',
     placeholder: '👩‍⚕️',
     article: {
       title: 'Finding the Right Therapist: A Complete Guide',
       sections: [
         {
           heading: 'What is Psychology Today?',
           content: 'Psychology Today is the largest online directory of mental health professionals in the United States, featuring over 200,000 licensed therapists, psychiatrists, psychologists, counselors, and treatment centers.'
         },
         {
           heading: 'How to Choose the Right Therapist',
           content: 'Finding the right therapist is crucial for successful treatment. Start by identifying what you want to work on - whether it is anxiety, depression, relationship issues, trauma, or personal growth.'
         },
         {
           heading: 'Making the Most of Your Therapy Search',
           content: 'Use the advanced filters to narrow down your search by insurance, specialties, gender, language, and treatment approaches like CBT or EMDR. Read therapist profiles carefully.'
         }
       ]
     }
   },
   {
     id: 5,
     category: 'professional',
     title: 'BetterHelp Online Therapy',
     shortTitle: 'Online Therapy',
     description: 'Professional online counseling with licensed, accredited therapists.',
     website: 'https://betterhelp.com',
     cost: '$60-90/week',
     emoji: '💻',
     bgColor: 'linear-gradient(135deg, #fff2cc 0%, #ffe599 100%)',
     placeholder: '💻',
     article: {
       title: 'Online Therapy with BetterHelp: Accessible Mental Health Care',
       sections: [
         {
           heading: 'What is BetterHelp?',
           content: 'BetterHelp is the world largest therapy service, providing professional counseling online through video, phone, and messaging. All BetterHelp therapists are licensed, trained, experienced, and accredited.'
         },
         {
           heading: 'How Online Therapy Works and Its Benefits',
           content: 'After completing a questionnaire about your needs and preferences, BetterHelp matches you with a therapist typically within 24-48 hours. You can communicate via live video sessions, phone calls, or messaging.'
         },
         {
           heading: 'Getting Started and Maximizing Your Experience',
           content: 'Be honest and detailed when filling out the initial questionnaire to get the best therapist match. If your first match is not ideal, you can easily switch therapists at no additional cost.'
         }
       ]
     }
   },
   {
     id: 6,
     category: 'support',
     title: 'National Alliance on Mental Illness (NAMI)',
     shortTitle: 'NAMI Support Groups',
     description: 'Largest grassroots mental health organization providing education, support groups, and advocacy.',
     contact: '1-800-950-6264',
     website: 'https://nami.org',
     emoji: '🤝',
     bgColor: 'linear-gradient(135deg, #a7c7e7 0%, #6fa8dc 100%)',
     placeholder: '🤝',
     article: {
       title: 'NAMI: Community Support and Mental Health Advocacy',
       sections: [
         {
           heading: 'What is NAMI?',
           content: 'The National Alliance on Mental Illness (NAMI) is the nation largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.'
         },
         {
           heading: 'Support Groups and Educational Programs',
           content: 'NAMI offers various free support groups including NAMI Connection (peer-to-peer support for adults), NAMI Family Support Groups (for family members and caregivers), and educational programs.'
         },
         {
           heading: 'Finding Local Support and Getting Involved',
           content: 'Use NAMI website to find local chapters and support groups in your area. Most support groups meet weekly or bi-weekly and are facilitated by trained volunteers.'
         }
       ]
     }
   },
   {
     id: 7,
     category: 'support',
     title: 'Anxiety and Depression Association of America',
     shortTitle: 'ADAA Resources',
     description: 'Educational resources and support for anxiety, depression, and related disorders.',
     website: 'https://adaa.org',
     emoji: '🧠',
     bgColor: 'linear-gradient(135deg, #f4c2c2 0%, #dda0dd 100%)',
     placeholder: '🧠',
     article: {
       title: 'ADAA: Understanding Anxiety and Depression',
       sections: [
         {
           heading: 'What is ADAA?',
           content: 'The Anxiety and Depression Association of America (ADAA) is a national nonprofit organization dedicated to the prevention, treatment, and cure of anxiety, depression, and related disorders through education, practice, and research.'
         },
         {
           heading: 'Understanding Anxiety and Depression',
           content: 'Anxiety disorders are the most common mental health concern in the United States. Depression often co-occurs with anxiety disorders. Both are highly treatable with proper care and support.'
         },
         {
           heading: 'Self-Help and Coping Strategies',
           content: 'Regular exercise, adequate sleep, healthy eating, mindfulness practices, and social support can significantly help manage anxiety and depression symptoms alongside professional treatment.'
         }
       ]
     }
   },
   {
     id: 8,
     category: 'wellness',
     title: 'Headspace: Meditation and Mindfulness',
     shortTitle: 'Meditation App',
     description: 'Guided meditation, sleep stories, and mindfulness exercises for mental wellness.',
     website: 'https://headspace.com',
     emoji: '🧘‍♂️',
     bgColor: 'linear-gradient(135deg, #c6efce 0%, #a9dfbf 100%)',
     placeholder: '🧘‍♂️',
     article: {
       title: 'Headspace: Building a Meditation Practice',
       sections: [
         {
           heading: 'What is Headspace?',
           content: 'Headspace is a digital mental health platform that provides guided meditation sessions, mindfulness exercises, sleep stories, and focus music to help improve mental wellbeing and reduce stress.'
         },
         {
           heading: 'Benefits of Regular Meditation',
           content: 'Research shows that regular meditation can reduce stress, improve focus, enhance emotional regulation, better sleep quality, and increase overall life satisfaction. Even 10 minutes daily can make a difference.'
         },
         {
           heading: 'Getting Started with Meditation',
           content: 'Start with short 3-5 minute sessions and gradually increase duration. Find a quiet space, sit comfortably, and focus on your breath. Consistency is more important than duration when building a meditation habit.'
         }
       ]
     }
   }
 ];

 const handleCall = (contact) => {
   if (contact.includes('Text')) {
     const parts = contact.split(' to ');
     if (parts.length === 2) {
       const phoneNumber = parts[1];
       const message = parts[0];
       window.open('sms:' + phoneNumber + '?body=' + message, '_self');
       showNotification('Opening text message...', 'success');
     }
   } else {
     const cleanNumber = contact.replace(/[^0-9]/g, '');
     window.open('tel:' + cleanNumber, '_self');
     showNotification('Calling ' + contact + '...', 'success');
   }
 };

 const handleWebsite = (website) => {
   window.open(website, '_blank');
   showNotification('Opening website...', 'success');
 };

 const openArticle = (resource) => {
   setSelectedArticle(resource);
   setSidebarOpen(false);
 };

 const closeArticle = () => {
   setSelectedArticle(null);
 };

 const toggleSidebar = () => {
   setSidebarOpen(!sidebarOpen);
 };

 const nextSlide = () => {
   setCurrentSlide((prev) => (prev + 1) % resources.length);
 };

 const prevSlide = () => {
   setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
 };

 const goToSlide = (index) => {
   setCurrentSlide(index);
 };

 // Touch handlers for swipe
 const handleTouchStart = (e) => {
   setTouchStart(e.targetTouches[0].clientX);
 };

 const handleTouchMove = (e) => {
   setTouchEnd(e.targetTouches[0].clientX);
 };

 const handleTouchEnd = () => {
   if (!touchStart || !touchEnd) return;

   const distance = touchStart - touchEnd;
   const isLeftSwipe = distance > 50;
   const isRightSwipe = distance < -50;

   if (isLeftSwipe) {
     nextSlide();
   }
   if (isRightSwipe) {
     prevSlide();
   }
 };

 if (selectedArticle) {
   return (
     <div style={{
       minHeight: '100vh',
       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
       padding: '0'
     }}>
       {/* Enhanced Notification */}
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

       <div style={{ display: 'flex', minHeight: '100vh' }}>
         {/* Mobile Hamburger */}
         {isMobile && (
           <div style={{
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             background: 'rgba(255, 255, 255, 0.1)',
             backdropFilter: 'blur(15px)',
             padding: '15px 20px',
             borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
             zIndex: 100,
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center'
           }}>
             <button
               onClick={toggleSidebar}
               style={{
                 background: 'none',
                 border: 'none',
                 color: 'white',
                 fontSize: '1.5rem',
                 cursor: 'pointer',
                 padding: '5px'
               }}
             >
               ☰
             </button>
             <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>📚 Resources</h3>
             <button
               onClick={closeArticle}
               style={{
                 background: 'none',
                 border: 'none',
                 color: 'white',
                 fontSize: '1.5rem',
                 cursor: 'pointer',
                 padding: '5px'
               }}
             >
               ×
             </button>
           </div>
         )}

         {/* Sidebar Navigation */}
         <div style={{
           width: isMobile ? (sidebarOpen ? '280px' : '0px') : '320px',
           background: 'rgba(255, 255, 255, 0.95)',
           borderRight: '1px solid rgba(255, 255, 255, 0.3)',
           backdropFilter: 'blur(10px)',
           overflow: 'hidden',
           transition: 'width 0.3s ease',
           position: isMobile ? 'fixed' : 'relative',
           height: '100vh',
           zIndex: 200,
           boxShadow: isMobile ? '0 0 20px rgba(0,0,0,0.3)' : 'none'
         }}>
           <div style={{ padding: '30px 25px' }}>
             <div style={{ marginBottom: '30px' }}>
               <h3 style={{
                 margin: '0 0 8px 0',
                 color: '#1f2937',
                 fontSize: '1.3rem',
                 fontWeight: '700'
               }}>
                 📚 Mental Health Resources
               </h3>
               {!isMobile && (
                 <button
                   onClick={closeArticle}
                   style={{
                     background: 'linear-gradient(135deg, #667eea, #764ba2)',
                     color: 'white',
                     border: 'none',
                     padding: '8px 16px',
                     borderRadius: '8px',
                     fontSize: '0.85rem',
                     fontWeight: '600',
                     cursor: 'pointer',
                     marginTop: '10px'
                   }}
                 >
                   ← Back
                 </button>
               )}
               <p style={{
                 margin: '10px 0 0 0',
                 color: '#6b7280',
                 fontSize: '0.9rem'
               }}>
                 Professional support and caring communities
               </p>
             </div>

             <div>
               {resources.map(resource => (
                 <div
                   key={resource.id}
                   onClick={() => openArticle(resource)}
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     padding: '12px 15px',
                     marginBottom: '8px',
                     borderRadius: '10px',
                     cursor: 'pointer',
                     transition: 'all 0.2s ease',
                     background: selectedArticle.id === resource.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                     color: selectedArticle.id === resource.id ? 'white' : '#374151'
                   }}
                 >
                   <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>{resource.emoji}</span>
                   <span style={{
                     flex: 1,
                     fontWeight: '600',
                     fontSize: '0.9rem',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap'
                   }}>
                     {resource.shortTitle}
                   </span>
                   {resource.urgent && (
                     <span style={{
                       fontSize: '0.7rem',
                       opacity: 0.8,
                       marginLeft: '8px'
                     }}>
                       🚨
                     </span>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>

         {/* Sidebar Overlay for Mobile */}
         {isMobile && sidebarOpen && (
           <div
             onClick={() => setSidebarOpen(false)}
             style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'rgba(0, 0, 0, 0.5)',
               zIndex: 150
             }}
           ></div>
         )}

         {/* Article Content */}
         <div style={{
           flex: 1,
           padding: isMobile ? '70px 20px 20px 20px' : '40px',
           overflowY: 'auto'
         }}>
           <div style={{
             maxWidth: '800px',
             margin: '0 auto'
           }}>
             {/* Article Header */}
             <div style={{
               background: selectedArticle.bgColor,
               borderRadius: '20px',
               padding: '40px',
               textAlign: 'center',
               marginBottom: '30px',
               boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
               color: 'white'
             }}>
               <div style={{ fontSize: '4rem', marginBottom: '15px' }}>
                 {selectedArticle.emoji}
               </div>
               <h1 style={{
                 margin: '0 0 15px 0',
                 fontSize: isMobile ? '1.5rem' : '2rem',
                 fontWeight: '700'
               }}>
                 {selectedArticle.article.title}
               </h1>
               {selectedArticle.urgent && (
                 <div style={{
                   background: 'rgba(255, 255, 255, 0.2)',
                   padding: '8px 16px',
                   borderRadius: '20px',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   display: 'inline-block'
                 }}>
                   🚨 Emergency Support Available 24/7
                 </div>
               )}
             </div>

             {/* Action Buttons */}
             <div style={{
               display: 'flex',
               gap: '15px',
               justifyContent: 'center',
               marginBottom: '40px',
               flexWrap: 'wrap'
             }}>
               {selectedArticle.contact && (
                 <button
                   onClick={() => handleCall(selectedArticle.contact)}
                   style={{
                     background: selectedArticle.bgColor,
                     color: 'white',
                     border: 'none',
                     padding: '15px 25px',
                     borderRadius: '12px',
                     fontSize: '1rem',
                     fontWeight: '600',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                   }}
                 >
                   <span>{selectedArticle.contact.includes('Text') ? '💬' : '📞'}</span>
                   <span>{selectedArticle.contact}</span>
                 </button>
               )}
               {selectedArticle.website && (
                 <button
                   onClick={() => handleWebsite(selectedArticle.website)}
                   style={{
                     background: 'rgba(255, 255, 255, 0.9)',
                     color: '#374151',
                     border: 'none',
                     padding: '15px 25px',
                     borderRadius: '12px',
                     fontSize: '1rem',
                     fontWeight: '600',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                   }}
                 >
                   <span>🌐</span>
                   <span>Visit Website</span>
                 </button>
               )}
             </div>

             {/* Article Sections */}
             <div style={{
               background: 'rgba(255, 255, 255, 0.95)',
               borderRadius: '20px',
               padding: '40px',
               boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
               backdropFilter: 'blur(10px)'
             }}>
               {selectedArticle.article.sections.map((section, index) => (
                 <div key={index} style={{ marginBottom: index < selectedArticle.article.sections.length - 1 ? '35px' : '0' }}>
                   <h2 style={{
                     color: '#1f2937',
                     fontSize: '1.3rem',
                     fontWeight: '700',
                     marginBottom: '15px'
                   }}>
                     {section.heading}
                   </h2>
                   <p style={{
                     color: '#374151',
                     fontSize: '1rem',
                     lineHeight: '1.6',
                     margin: '0'
                   }}>
                     {section.content}
                   </p>
                 </div>
               ))}
             </div>
           </div>
         </div>
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
     {/* Enhanced Notification */}
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

     <div style={{ display: 'flex', minHeight: '100vh' }}>
       {/* Mobile Hamburger */}
       {isMobile && (
         <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           background: 'rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(15px)',
           padding: '15px 20px',
           borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
           zIndex: 100,
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center'
         }}>
           <button
             onClick={toggleSidebar}
             style={{
               background: 'none',
               border: 'none',
               color: 'white',
               fontSize: '1.5rem',
               cursor: 'pointer',
               padding: '5px'
             }}
           >
             ☰
           </button>
           <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>📚 Mental Health Resources</h3>
           <div></div>
         </div>
       )}

       {/* Sidebar Navigation */}
       <div style={{
         width: isMobile ? (sidebarOpen ? '280px' : '0px') : '320px',
         background: 'rgba(255, 255, 255, 0.95)',
         borderRight: '1px solid rgba(255, 255, 255, 0.3)',
         backdropFilter: 'blur(10px)',
         overflow: 'hidden',
         transition: 'width 0.3s ease',
         position: isMobile ? 'fixed' : 'relative',
         height: '100vh',
         zIndex: 200,
         boxShadow: isMobile ? '0 0 20px rgba(0,0,0,0.3)' : 'none'
       }}>
         <div style={{ padding: '30px 25px' }}>
           <div style={{ marginBottom: '30px' }}>
             <h3 style={{
               margin: '0 0 8px 0',
               color: '#1f2937',
               fontSize: '1.3rem',
               fontWeight: '700'
             }}>
               📚 Mental Health Resources
             </h3>
             <p style={{
               margin: '0',
               color: '#6b7280',
               fontSize: '0.9rem'
             }}>
               Professional support and caring communities
             </p>
           </div>

           <div>
             {resources.map(resource => (
               <div
                 key={resource.id}
                 onClick={() => openArticle(resource)}
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   padding: '12px 15px',
                   marginBottom: '8px',
                   borderRadius: '10px',
                   cursor: 'pointer',
                   transition: 'all 0.2s ease',
                   background: 'transparent',
                   color: '#374151'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'}
                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
               >
                 <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>{resource.emoji}</span>
                 <span style={{ 
                   flex: 1, 
                   fontWeight: '600', 
                   fontSize: '0.9rem',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   whiteSpace: 'nowrap'
                 }}>
                   {resource.shortTitle}
                 </span>
                 {resource.urgent && (
                   <span style={{ 
                     fontSize: '0.7rem', 
                     opacity: 0.8,
                     marginLeft: '8px'
                   }}>
                     🚨
                   </span>
                 )}
               </div>
             ))}
           </div>
         </div>
       </div>

       {/* Sidebar Overlay for Mobile */}
       {isMobile && sidebarOpen && (
         <div 
           onClick={() => setSidebarOpen(false)}
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             background: 'rgba(0, 0, 0, 0.5)',
             zIndex: 150
           }}
         ></div>
       )}

       {/* Main Content Area - Resource Cards Grid */}
       <div style={{
         flex: 1,
         padding: isMobile ? '70px 20px 20px 20px' : '40px',
         overflowY: 'auto'
       }}>
         {/* Header */}
         <div style={{
           textAlign: 'center',
           marginBottom: '40px',
           color: 'white'
         }}>
           <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
           <h1 style={{
             fontSize: isMobile ? '2rem' : '2.5rem',
             fontWeight: '700',
             margin: '0 0 10px 0'
           }}>
             Mental Health Resources
           </h1>
           <p style={{
             fontSize: '1.1rem',
             opacity: 0.9,
             margin: '0'
           }}>
             Professional support and caring communities
           </p>
         </div>

         {/* Crisis Resources - Emergency Section */}
         <div style={{
           background: 'rgba(239, 68, 68, 0.1)',
           border: '2px solid rgba(239, 68, 68, 0.3)',
           borderRadius: '20px',
           padding: '30px',
           marginBottom: '30px',
           backdropFilter: 'blur(10px)'
         }}>
           <div style={{ textAlign: 'center', marginBottom: '25px' }}>
             <h2 style={{ 
               color: 'white', 
               fontSize: '1.5rem', 
               fontWeight: '700',
               margin: '0 0 10px 0',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               gap: '10px'
             }}>
               🚨 Emergency Crisis Support
             </h2>
             <p style={{ color: 'rgba(255,255,255,0.9)', margin: '0' }}>
               If you're in crisis, these resources are available 24/7
             </p>
           </div>
           
           <div style={{
             display: 'grid',
             gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
             gap: '20px'
           }}>
             {resources.filter(r => r.urgent).map(resource => (
               <div
                 key={resource.id}
                 style={{
                   background: resource.bgColor,
                   borderRadius: '15px',
                   padding: '25px',
                   color: 'white',
                   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                   transition: 'transform 0.2s ease',
                   cursor: 'pointer'
                 }}
                 onClick={() => openArticle(resource)}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
               >
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   marginBottom: '15px'
                 }}>
                   <span style={{ fontSize: '2rem', marginRight: '15px' }}>
                     {resource.emoji}
                   </span>
                   <span style={{
                     background: 'rgba(255, 255, 255, 0.2)',
                     padding: '4px 8px',
                     borderRadius: '12px',
                     fontSize: '0.7rem',
                     fontWeight: '600'
                   }}>
                     24/7 AVAILABLE
                   </span>
                 </div>
                 
                 <h3 style={{
                   fontSize: '1.2rem',
                   fontWeight: '700',
                   margin: '0 0 10px 0'
                 }}>
                   {resource.title}
                 </h3>
                 
                 <p style={{
                   fontSize: '0.9rem',
                   opacity: 0.9,
                   margin: '0 0 20px 0',
                   lineHeight: '1.5'
                 }}>
                   {resource.description}
                 </p>

                 <div style={{
                   display: 'flex',
                   gap: '10px',
                   flexWrap: 'wrap'
                 }}>
                   {resource.contact && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleCall(resource.contact);
                       }}
                       style={{
                         background: 'rgba(255, 255, 255, 0.9)',
                         color: '#1f2937',
                         border: 'none',
                         padding: '10px 15px',
                         borderRadius: '10px',
                         fontSize: '0.9rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px',
                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                       }}
                     >
                       <span>{resource.contact.includes('Text') ? '💬' : '📞'}</span>
                       <span>{resource.contact}</span>
                     </button>
                   )}
                   
                   {resource.website && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleWebsite(resource.website);
                       }}
                       style={{
                         background: 'rgba(255, 255, 255, 0.2)',
                         color: 'white',
                         border: 'none',
                         padding: '10px 15px',
                         borderRadius: '10px',
                         fontSize: '0.9rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px'
                       }}
                     >
                       <span>🌐</span>
                       <span>Website</span>
                     </button>
                   )}
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Professional Help Section */}
         <div style={{
           marginBottom: '30px'
         }}>
           <h2 style={{
             color: 'white',
             fontSize: '1.5rem',
             fontWeight: '700',
             marginBottom: '20px',
             display: 'flex',
             alignItems: 'center',
             gap: '10px'
           }}>
             👩‍⚕️ Professional Mental Health Services
           </h2>
           
           <div style={{
             display: 'grid',
             gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
             gap: '20px'
           }}>
             {resources.filter(r => r.category === 'professional').map(resource => (
               <div
                 key={resource.id}
                 style={{
                   background: 'rgba(255, 255, 255, 0.95)',
                   borderRadius: '20px',
                   padding: '30px',
                   color: '#1f2937',
                   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                   transition: 'transform 0.2s ease',
                   cursor: 'pointer',
                   backdropFilter: 'blur(10px)'
                 }}
                 onClick={() => openArticle(resource)}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
               >
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   marginBottom: '15px'
                 }}>
                   <span style={{ fontSize: '2rem', marginRight: '15px' }}>
                     {resource.emoji}
                   </span>
                   {resource.cost && (
                     <span style={{
                       background: 'linear-gradient(135deg, #667eea, #764ba2)',
                       color: 'white',
                       padding: '4px 8px',
                       borderRadius: '12px',
                       fontSize: '0.7rem',
                       fontWeight: '600'
                     }}>
                       {resource.cost}
                     </span>
                   )}
                 </div>
                 
                 <h3 style={{
                   fontSize: '1.3rem',
                   fontWeight: '700',
                   margin: '0 0 10px 0',
                   color: '#1f2937'
                 }}>
                   {resource.title}
                 </h3>
                 
                 <p style={{
                   fontSize: '0.9rem',
                   opacity: 0.8,
                   margin: '0 0 20px 0',
                   lineHeight: '1.5',
                   color: '#374151'
                 }}>
                   {resource.description}
                 </p>

                 <div style={{
                   display: 'flex',
                   gap: '10px',
                   flexWrap: 'wrap'
                 }}>
                   {resource.website && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleWebsite(resource.website);
                       }}
                       style={{
                         background: 'linear-gradient(135deg, #667eea, #764ba2)',
                         color: 'white',
                         border: 'none',
                         padding: '10px 15px',
                         borderRadius: '10px',
                         fontSize: '0.9rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px',
                         boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                       }}
                     >
                       <span>🌐</span>
                       <span>Visit Website</span>
                     </button>
                   )}
                   
                   <button
                     onClick={() => openArticle(resource)}
                     style={{
                       background: 'transparent',
                       color: '#667eea',
                       border: '2px solid #667eea',
                       padding: '10px 15px',
                       borderRadius: '10px',
                       fontSize: '0.9rem',
                       fontWeight: '600',
                       cursor: 'pointer',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '8px'
                     }}
                   >
                     <span>📖</span>
                     <span>Learn More</span>
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Support Groups & Wellness Section */}
         <div style={{
           marginBottom: '30px'
         }}>
           <h2 style={{
             color: 'white',
             fontSize: '1.5rem',
             fontWeight: '700',
             marginBottom: '20px',
             display: 'flex',
             alignItems: 'center',
             gap: '10px'
           }}>
             🤝 Support Groups & Wellness Resources
           </h2>
           
           <div style={{
             display: 'grid',
             gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
             gap: '20px'
           }}>
             {resources.filter(r => r.category === 'support' || r.category === 'wellness').map(resource => (
               <div
                 key={resource.id}
                 style={{
                   background: resource.bgColor,
                   borderRadius: '20px',
                   padding: '30px',
                   color: 'white',
                   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                   transition: 'transform 0.2s ease',
                   cursor: 'pointer'
                 }}
                 onClick={() => openArticle(resource)}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
               >
                 <div style={{
                   display: 'flex',
                   alignItems: 'center',
                   marginBottom: '15px'
                 }}>
                   <span style={{ fontSize: '2rem', marginRight: '15px' }}>
                     {resource.emoji}
                   </span>
                   <span style={{
                     background: 'rgba(255, 255, 255, 0.2)',
                     padding: '4px 8px',
                     borderRadius: '12px',
                     fontSize: '0.7rem',
                     fontWeight: '600'
                   }}>
                     {resource.category === 'support' ? 'COMMUNITY' : 'WELLNESS'}
                   </span>
                 </div>
                 
                 <h3 style={{
                   fontSize: '1.3rem',
                   fontWeight: '700',
                   margin: '0 0 10px 0'
                 }}>
                   {resource.title}
                 </h3>
                 
                 <p style={{
                   fontSize: '0.9rem',
                   opacity: 0.9,
                   margin: '0 0 20px 0',
                   lineHeight: '1.5'
                 }}>
                   {resource.description}
                 </p>

                 <div style={{
                   display: 'flex',
                   gap: '10px',
                   flexWrap: 'wrap'
                 }}>
                   {resource.contact && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleCall(resource.contact);
                       }}
                       style={{
                         background: 'rgba(255, 255, 255, 0.2)',
                         color: 'white',
                         border: 'none',
                         padding: '8px 12px',
                         borderRadius: '8px',
                         fontSize: '0.8rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '5px'
                       }}
                     >
                       <span>📞</span>
                       <span>{resource.contact}</span>
                     </button>
                   )}
                   
                   {resource.website && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleWebsite(resource.website);
                       }}
                       style={{
                         background: 'rgba(255, 255, 255, 0.2)',
                         color: 'white',
                         border: 'none',
                         padding: '8px 12px',
                         borderRadius: '8px',
                         fontSize: '0.8rem',
                         fontWeight: '600',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '5px'
                       }}
                     >
                       <span>🌐</span>
                       <span>Visit</span>
                     </button>
                   )}
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Resources;
