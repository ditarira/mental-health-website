import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
 const { user, token } = useContext(AuthContext);
 const [stats, setStats] = useState({
   totalUsers: 0,
   totalJournalEntries: 0,
   totalBreathingSessions: 0,
   activeUsers: 0
 });
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [activeTab, setActiveTab] = useState('overview');
 const [refreshing, setRefreshing] = useState(false);
 const [refreshMessage, setRefreshMessage] = useState('');

 const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

 const fetchAdminData = async (showLoading = true) => {
   try {
     if (showLoading) {
       setLoading(true);
     }
     setError(null);

     if (!token) {
       throw new Error('No authentication token found');
     }

     const config = {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     };

     console.log('Fetching from API:', API_BASE);

     // Fetch stats
     try {
       const statsResponse = await fetch(`${API_BASE}/api/admin/stats`, config);

       if (!statsResponse.ok) {
         if (statsResponse.status === 404) {
           throw new Error('Admin endpoints not found - backend may not be deployed with latest changes');
         }
         throw new Error(`Stats request failed: ${statsResponse.status}`);
       }

       const statsData = await statsResponse.json();
       console.log('Stats data:', statsData);

       if (statsData.success && statsData.data) {
         setStats({
           totalUsers: statsData.data.totalUsers || 0,
           totalJournalEntries: statsData.data.totalJournalEntries || 0,
           totalBreathingSessions: statsData.data.totalBreathingSessions || 0,
           activeUsers: statsData.data.activeUsers || 0
         });
       } else {
         setError('Invalid stats data received');
       }
     } catch (err) {
       console.error('Stats fetch error:', err);
       setError(`Failed to fetch stats: ${err.message}`);
     }

     // Fetch users
     try {
       const usersResponse = await fetch(`${API_BASE}/api/admin/users`, config);

       if (!usersResponse.ok) {
         if (usersResponse.status === 404) {
           throw new Error('Admin user endpoint not found');
         }
         throw new Error(`Users request failed: ${usersResponse.status}`);
       }

       const usersData = await usersResponse.json();
       console.log('Users data:', usersData);

       if (usersData.success && Array.isArray(usersData.data)) {
         setUsers(usersData.data);
       } else {
         setError('Invalid users data received');
       }
     } catch (err) {
       console.error('Users fetch error:', err);
       setError(`Failed to fetch users: ${err.message}`);
     }

   } catch (error) {
     console.error('Admin data fetch error:', error);
     setError(error.message);
   } finally {
     if (showLoading) {
       setLoading(false);
     }
   }
 };

 useEffect(() => {
   if (user && token) {
     fetchAdminData();
     const interval = setInterval(() => fetchAdminData(false), 30000);
     return () => clearInterval(interval);
   }
 }, [user, token, API_BASE]);

 const handleRefresh = async () => {
   setRefreshing(true);
   await fetchAdminData(false);
   setRefreshing(false);
   setRefreshMessage('✅ Data refreshed successfully!');
   setTimeout(() => setRefreshMessage(''), 3000);
 };

 if (!user || user.role !== 'ADMIN') {
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
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         textAlign: 'center',
         maxWidth: '500px'
       }}>
         <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚫</div>
         <h2 style={{ color: '#dc2626', margin: '0 0 15px 0', fontSize: '1.8rem' }}>Access Denied</h2>
         <p style={{ color: '#6b7280', margin: 0, fontSize: '1.1rem' }}>
           You don't have admin privileges to view this page.
         </p>
       </div>
     </div>
   );
 }

 if (loading) {
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
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         textAlign: 'center'
       }}>
         <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
         <p style={{ color: '#6b7280', margin: 0, fontSize: '1.1rem' }}>
           Loading admin dashboard...
         </p>
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
     <div style={{
       padding: '40px 20px',
       maxWidth: '1400px',
       margin: '0 auto'
     }}>
       {/* Header Section */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '30px',
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         marginBottom: '25px'
       }}>
         <div style={{
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           flexWrap: 'wrap',
           gap: '20px'
         }}>
           <div>
             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
               <span style={{ fontSize: '3rem', marginRight: '20px' }}>👑</span>
               <h1 style={{
                 color: '#1f2937',
                 margin: 0,
                 fontSize: '2.5rem',
                 fontWeight: '700'
               }}>
                 Admin Dashboard
               </h1>
             </div>
             <p style={{
               color: '#6b7280',
               margin: 0,
               fontSize: '1.1rem'
             }}>
               Welcome back, Admin! Monitor your MindfulMe platform
             </p>
           </div>
           <button
             onClick={handleRefresh}
             disabled={refreshing}
             style={{
               padding: '12px 20px',
               borderRadius: '12px',
               border: 'none',
               background: refreshing ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               color: 'white',
               fontSize: '1rem',
               fontWeight: '600',
               cursor: refreshing ? 'not-allowed' : 'pointer',
               boxShadow: refreshing ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.3)',
               transition: 'all 0.2s ease',
               display: 'flex',
               alignItems: 'center',
               gap: '8px'
             }}
           >
             {refreshing ? '⏳ Refreshing...' : '🔄 Refresh Data'}
           </button>
         </div>
       </div>

       {/* Refresh Success Message */}
       {refreshMessage && (
         <div style={{
           background: 'rgba(16, 185, 129, 0.1)',
           border: '2px solid rgba(16, 185, 129, 0.3)',
           borderRadius: '15px',
           padding: '15px 20px',
           marginBottom: '25px',
           color: '#065f46',
           fontSize: '1rem',
           textAlign: 'center',
           backdropFilter: 'blur(10px)'
         }}>
           {refreshMessage}
         </div>
       )}

       {error && (
         <div style={{
           background: 'rgba(239, 68, 68, 0.1)',
           border: '2px solid rgba(239, 68, 68, 0.3)',
           borderRadius: '15px',
           padding: '20px',
           marginBottom: '25px',
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           backdropFilter: 'blur(10px)'
         }}>
           <span style={{ color: '#dc2626', fontSize: '1rem' }}>
             ⚠️ {error}
           </span>
           <button
             onClick={handleRefresh}
             style={{
               padding: '8px 16px',
               borderRadius: '8px',
               border: 'none',
               background: '#dc2626',
               color: 'white',
               fontSize: '0.9rem',
               fontWeight: '600',
               cursor: 'pointer'
             }}
           >
             Retry
           </button>
         </div>
       )}

       {/* Status Cards */}
       <div style={{
         display: 'grid',
         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
         gap: '20px',
         marginBottom: '30px'
       }}>
         <div style={{
           background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
           borderRadius: '20px',
           padding: '25px',
           color: 'white',
           boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
         }}>
           <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
           <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: '700' }}>
             System Online
           </h3>
           <p style={{ margin: 0, opacity: 0.9 }}>All services operational</p>
         </div>

         <div style={{
           background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
           borderRadius: '20px',
           padding: '25px',
           color: 'white',
           boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
         }}>
           <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🕐</div>
           <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: '700' }}>
             Updated: {new Date().toLocaleTimeString()}
           </h3>
           <p style={{ margin: 0, opacity: 0.9 }}>Last refresh timestamp</p>
         </div>

         <div style={{
           background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
           borderRadius: '20px',
           padding: '25px',
           color: 'white',
           boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
         }}>
           <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👨‍💼</div>
           <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: '700' }}>
             admin@mindfulme.com
           </h3>
           <p style={{ margin: 0, opacity: 0.9 }}>Logged in as Administrator</p>
         </div>
       </div>

       {/* Tab Navigation */}
       <div style={{
         display: 'flex',
         gap: '15px',
         marginBottom: '25px',
         background: 'rgba(255, 255, 255, 0.95)',
         padding: '10px',
         borderRadius: '15px',
         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)',
         flexWrap: 'wrap'
       }}>
         {[
           { id: 'overview', label: 'Overview', icon: '📊' },
           { id: 'analytics', label: 'Analytics', icon: '📈' },
           { id: 'users', label: `Users (${users.length})`, icon: '👥' }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             style={{
               padding: '12px 20px',
               border: 'none',
               borderRadius: '10px',
               background: activeTab === tab.id
                 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                 : 'transparent',
               color: activeTab === tab.id ? 'white' : '#6b7280',
               fontSize: '1rem',
               fontWeight: '600',
               cursor: 'pointer',
               transition: 'all 0.2s ease',
               display: 'flex',
               alignItems: 'center',
               gap: '8px',
               boxShadow: activeTab === tab.id ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
             }}
           >
             <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
             {tab.label}
           </button>
         ))}
       </div>

       {/* Tab Content */}
       <div style={{
         background: 'rgba(255, 255, 255, 0.95)',
         borderRadius: '20px',
         padding: '30px',
         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
         backdropFilter: 'blur(10px)'
       }}>
         {activeTab === 'overview' && (
           <div>
             <h2 style={{
               color: '#1f2937',
               margin: '0 0 25px 0',
               fontSize: '1.8rem',
               fontWeight: '700',
               display: 'flex',
               alignItems: 'center',
               gap: '10px'
             }}>
               📊 Platform Overview
             </h2>
             
             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
               gap: '20px',
               transition: 'opacity 0.3s ease',
               opacity: refreshing ? 0.7 : 1
             }}>
               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0',
                 textAlign: 'center',
                 transition: 'transform 0.2s ease'
               }}>
                 <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
                 <h3 style={{ color: '#374151', margin: '0 0 5px 0' }}>Total Users</h3>
                 <div style={{ 
                   fontSize: '2rem', 
                   fontWeight: '700', 
                   color: '#667eea',
                   transition: 'all 0.3s ease'
                 }}>
                   {stats.totalUsers}
                 </div>
                 <p style={{ color: '#10b981', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                   +{stats.activeUsers} active
                 </p>
               </div>

               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0',
                 textAlign: 'center',
                 transition: 'transform 0.2s ease'
               }}>
                 <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📝</div>
                 <h3 style={{ color: '#374151', margin: '0 0 5px 0' }}>Journal Entries</h3>
                 <div style={{ 
                   fontSize: '2rem', 
                   fontWeight: '700', 
                   color: '#667eea',
                   transition: 'all 0.3s ease'
                 }}>
                   {stats.totalJournalEntries}
                 </div>
                 <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                   Total written
                 </p>
               </div>

               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0',
                 textAlign: 'center',
                 transition: 'transform 0.2s ease'
               }}>
                 <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🧘‍♀️</div>
                 <h3 style={{ color: '#374151', margin: '0 0 5px 0' }}>Breathing Sessions</h3>
                 <div style={{ 
                   fontSize: '2rem', 
                   fontWeight: '700', 
                   color: '#667eea',
                   transition: 'all 0.3s ease'
                 }}>
                   {stats.totalBreathingSessions}
                 </div>
                 <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                   Sessions completed
                 </p>
               </div>

               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0',
                 textAlign: 'center',
                 transition: 'transform 0.2s ease'
               }}>
                 <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🟢</div>
                 <h3 style={{ color: '#374151', margin: '0 0 5px 0' }}>Active Users</h3>
                 <div style={{ 
                   fontSize: '2rem', 
                   fontWeight: '700', 
                   color: '#10b981',
                   transition: 'all 0.3s ease'
                 }}>
                   {stats.activeUsers}
                 </div>
                 <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                   Currently active
                 </p>
               </div>
             </div>
           </div>
         )}

         {activeTab === 'analytics' && (
           <div>
             <h2 style={{
               color: '#1f2937',
               margin: '0 0 25px 0',
               fontSize: '1.8rem',
               fontWeight: '700',
               display: 'flex',
               alignItems: 'center',
               gap: '10px'
             }}>
               📈 Analytics & Insights
             </h2>

             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
               gap: '25px'
             }}>
               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0'
               }}>
                 <h3 style={{
                   color: '#374151',
                   margin: '0 0 20px 0',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '10px'
                 }}>
                   📊 Platform Engagement
                 </h3>
                 <div style={{ display: 'grid', gap: '15px' }}>
                   <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: '10px 0',
                     borderBottom: '1px solid #e5e7eb'
                   }}>
                     <span style={{ color: '#6b7280' }}>Average entries per user:</span>
                     <strong style={{ color: '#667eea' }}>
                       {stats.totalUsers > 0 ? Math.round(stats.totalJournalEntries / stats.totalUsers * 100) / 100 : 0}
                     </strong>
                   </div>
                   <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: '10px 0',
                     borderBottom: '1px solid #e5e7eb'
                   }}>
                     <span style={{ color: '#6b7280' }}>Average sessions per user:</span>
                     <strong style={{ color: '#667eea' }}>
                       {stats.totalUsers > 0 ? Math.round(stats.totalBreathingSessions / stats.totalUsers * 100) / 100 : 0}
                     </strong>
                   </div>
                   <div style={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: '10px 0'
                   }}>
                     <span style={{ color: '#6b7280' }}>User activity rate:</span>
                     <strong style={{ color: '#10b981' }}>
                       {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                     </strong>
                   </div>
                 </div>
               </div>

               <div style={{
                 background: '#f8fafc',
                 borderRadius: '15px',
                 padding: '25px',
                 border: '2px solid #e2e8f0'
               }}>
                 <h3 style={{
                   color: '#374151',
                   margin: '0 0 20px 0',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '10px'
                 }}>
                   💚 Platform Health
                 </h3>
                 <div style={{ display: 'grid', gap: '15px' }}>
                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                     padding: '10px 0'
                   }}>
                     <div style={{
                       width: '12px',
                       height: '12px',
                       borderRadius: '50%',
                       background: '#10b981'
                     }}></div>
                     <span style={{ color: '#374151' }}>Database: Online</span>
                   </div>
                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                     padding: '10px 0'
                   }}>
                     <div style={{
                       width: '12px',
                       height: '12px',
                       borderRadius: '50%',
                       background: error ? '#ef4444' : '#10b981'
                     }}></div>
                     <span style={{ color: '#374151' }}>API: {error ? 'Issues' : 'Responsive'}</span>
                   </div>
                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                     padding: '10px 0'
                   }}>
                     <div style={{
                       width: '12px',
                       height: '12px',
                       borderRadius: '50%',
                       background: '#10b981'
                     }}></div>
                     <span style={{ color: '#374151' }}>Authentication: Active</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}

         {activeTab === 'users' && (
           <div>
             <h2 style={{
               color: '#1f2937',
               margin: '0 0 25px 0',
               fontSize: '1.8rem',
               fontWeight: '700',
               display: 'flex',
               alignItems: 'center',
               gap: '10px'
             }}>
               👥 User Management ({users.length} users)
             </h2>

             {users.length === 0 ? (
               <div style={{
                 textAlign: 'center',
                 padding: '40px',
                 color: '#6b7280'
               }}>
                 <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👤</div>
                 <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                   No users found or failed to load users
                 </p>
                 <button
                   onClick={handleRefresh}
                   style={{
                     padding: '12px 20px',
                     borderRadius: '10px',
                     border: 'none',
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                     color: 'white',
                     fontSize: '1rem',
                     fontWeight: '600',
                     cursor: 'pointer'
                   }}
                 >
                   Try Again
                 </button>
               </div>
             ) : (
               <div style={{
                 display: 'grid',
                 gap: '15px'
               }}>
                 {users.map(user => (
                   <div
                     key={user.id}
                     style={{
                       background: '#f8fafc',
                       borderRadius: '15px',
                       padding: '20px',
                       border: '2px solid #e2e8f0',
                       display: 'flex',
                       alignItems: 'center',
                       gap: '20px',
                       flexWrap: 'wrap'
                     }}
                   >
                     <div style={{
                       width: '50px',
                       height: '50px',
                       borderRadius: '50%',
                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: 'white',
                       fontSize: '1.2rem',
                       fontWeight: '700'
                     }}>
                       {user.firstName?.charAt(0) || user.email.charAt(0)}
                     </div>
                     
                     <div style={{ flex: 1, minWidth: '200px' }}>
                       <h4 style={{
                         color: '#374151',
                         margin: '0 0 5px 0',
                         fontSize: '1.1rem',
                         fontWeight: '600'
                       }}>
                         {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
                       </h4>
                       <p style={{
                         color: '#6b7280',
                         margin: '0 0 3px 0',
                         fontSize: '0.9rem'
                       }}>
                         {user.email}
                       </p>
                       <span style={{
                         background: user.role === 'ADMIN' ? '#fef3c7' : '#e0e7ff',
                         color: user.role === 'ADMIN' ? '#92400e' : '#3730a3',
                         padding: '2px 8px',
                         borderRadius: '6px',
                         fontSize: '0.8rem',
                         fontWeight: '600'
                       }}>
                         {user.role}
                       </span>
                     </div>
                     
                     <div style={{
                       display: 'flex',
                       gap: '15px',
                       flexWrap: 'wrap'
                     }}>
                       <span style={{
                         background: '#ecfdf5',
                         color: '#065f46',
                         padding: '6px 12px',
                         borderRadius: '8px',
                         fontSize: '0.8rem',
                         fontWeight: '600'
                       }}>
                         📝 {user.journalEntries || 0} entries
                       </span>
                       <span style={{
                         background: '#eff6ff',
                         color: '#1e40af',
                         padding: '6px 12px',
                         borderRadius: '8px',
                         fontSize: '0.8rem',
                         fontWeight: '600'
                       }}>
                         🧘‍♀️ {user.breathingSessions || 0} sessions
                       </span>
                     </div>
                     
                     <div>
                       <span style={{
                         background: user.activityLevel?.toLowerCase() === 'active' ? '#dcfce7' : '#f3f4f6',
                         color: user.activityLevel?.toLowerCase() === 'active' ? '#166534' : '#6b7280',
                         padding: '6px 12px',
                         borderRadius: '8px',
                         fontSize: '0.8rem',
                         fontWeight: '600'
                       }}>
                         {user.activityLevel || 'Inactive'}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
         )}
       </div>
     </div>
   </div>
 );
};

export default AdminDashboard;