import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, journalEntries: 0, breathingSessions: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  const API_BASE = process.env.REACT_APP_API_URL || 'https://mental-health-backend-2mtp.onrender.com';

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
      
      // Set up real-time updates every 30 seconds
      const interval = setInterval(() => {
        fetchAdminData(true); // Silent refresh
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const fetchAdminData = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
        setError('');
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      };

      console.log('🔍 Fetching admin data...');

      // Fetch stats and users in parallel
      const [statsResponse, usersResponse] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/admin/stats`, config),
        axios.get(`${API_BASE}/api/admin/users`, config)
      ]);

      // Handle stats response
      if (statsResponse.status === 'fulfilled') {
        setStats(statsResponse.value.data);
        console.log('✅ Stats loaded:', statsResponse.value.data);
      } else {
        console.error('❌ Stats error:', statsResponse.reason);
        if (!silent) setError('Failed to load statistics');
      }

      // Handle users response
      if (usersResponse.status === 'fulfilled') {
        setUsers(usersResponse.value.data.users || []);
        console.log('✅ Users loaded:', usersResponse.value.data.users?.length || 0);
      } else {
        console.error('❌ Users error:', usersResponse.reason);
        if (!silent) setError(prev => prev ? prev + ' and users data' : 'Failed to load users data');
      }

      setLastUpdated(new Date());

    } catch (error) {
      console.error('❌ Admin data fetch failed:', error);
      if (!silent) {
        setError('Failed to load admin data: ' + (error.response?.data?.error || error.message));
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const getActivityLevel = (user) => {
    const totalActivity = (user._count?.journalEntries || 0) + (user._count?.breathingSessions || 0);
    if (totalActivity >= 20) return { level: 'High', color: '#10b981', emoji: '🔥' };
    if (totalActivity >= 10) return { level: 'Medium', color: '#f59e0b', emoji: '⚡' };
    if (totalActivity >= 1) return { level: 'Low', color: '#ef4444', emoji: '📈' };
    return { level: 'Inactive', color: '#6b7280', emoji: '💤' };
  };

  // Check admin access
  if (!isAdmin) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a8a, #581c87)'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2>🚫 Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a8a, #581c87)'
      }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
          <div style={{ fontSize: '1.5rem' }}>Loading Admin Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <h1 style={{ color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '2.5rem' }}>
            👑 Admin Dashboard
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Welcome, {user?.firstName}! Monitor your MindfulMe platform
          </p>
          
          {/* Status Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginTop: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span>🟢 System Online</span>
            <span>🕐 Last Updated: {lastUpdated.toLocaleTimeString()}</span>
            <span>👤 {user?.email}</span>
          </div>
          
          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>⚠️ {error}</span>
              <button 
                onClick={() => fetchAdminData()}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🔄 Retry
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'users', label: '👥 Users (' + users.length + ')' },
              { id: 'analytics', label: '📈 Analytics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #1e3a8a, #581c87)' 
                    : 'rgba(30, 58, 138, 0.1)',
                  color: activeTab === tab.id ? 'white' : '#1e3a8a',
                  border: activeTab === tab.id ? 'none' : '2px solid #1e3a8a',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #1e3a8a, #581c87)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem', fontSize: '1.2rem' }}>Total Users</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.totalUsers}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Registered members</div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem', fontSize: '1.2rem' }}>Active Users</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.activeUsers}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Last 30 days</div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem', fontSize: '1.2rem' }}>Journal Entries</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.journalEntries}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Total entries</div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🫁</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem', fontSize: '1.2rem' }}>Breathing Sessions</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.breathingSessions}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Completed sessions</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>⚡ Quick Actions</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setActiveTab('users')}
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  👥 Manage Users
                </button>
                <button
                  onClick={() => fetchAdminData()}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🔄 Refresh Data
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  📈 View Analytics
                </button>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
              👥 User Management ({users.length} Users)
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {users.map((user) => {
                const activity = getActivityLevel(user);
                return (
                  <div
                    key={user.id}
                    style={{
                      background: '#f8f9fa',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: user.email === 'admin@mindfulme.com' ? '3px solid #fbbf24' : '1px solid #dee2e6',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{ margin: 0, fontSize: '1.2rem' }}>
                        {user.firstName} {user.lastName}
                        {user.email === 'admin@mindfulme.com' && (
                          <span style={{
                            marginLeft: '0.5rem',
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                            color: 'white',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.7rem'
                          }}>
                            👑 YOU
                          </span>
                        )}
                      </h4>
                      <span style={{
                        background: activity.color,
                        color: 'white',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {activity.emoji} {activity.level}
                      </span>
                    </div>
                    
                    <div style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      📧 {user.email}
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                          {user._count?.journalEntries || 0}
                        </div>
                        <div style={{ fontSize: '0.8rem' }}>Journal Entries</div>
                      </div>
                      <div style={{
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        color: 'white',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                          {user._count?.breathingSessions || 0}
                        </div>
                        <div style={{ fontSize: '0.8rem' }}>Breathing Sessions</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
              📈 Platform Analytics
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Engagement Metrics */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>📊 Engagement Rate</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Active users / Total users
                </div>
              </div>

              {/* Average Activity */}
              <div style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>🎯 Avg. Activities</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {stats.totalUsers > 0 ? Math.round((stats.journalEntries + stats.breathingSessions) / stats.totalUsers) : 0}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  Activities per user
                </div>
              </div>

              {/* Growth Indicator */}
              <div style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                color: 'white',
                padding: '2rem',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>📈 Platform Health</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {(stats.journalEntries + stats.breathingSessions) > 0 ? '🟢' : '🟡'}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  {(stats.journalEntries + stats.breathingSessions) > 0 ? 'Active' : 'Growing'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
