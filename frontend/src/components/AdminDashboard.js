import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    journalEntries: 0,
    breathingSessions: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAdminData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/users')
      ]);
      
      setStats(statsResponse.data);
      setUsers(usersResponse.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  const getActivityLevel = (user) => {
    const totalActivity = (user._count?.journalEntries || 0) + (user._count?.breathingSessions || 0);
    if (totalActivity >= 20) return { level: 'High', color: '#10b981', emoji: '🔥' };
    if (totalActivity >= 10) return { level: 'Medium', color: '#f59e0b', emoji: '⚡' };
    if (totalActivity >= 1) return { level: 'Low', color: '#ef4444', emoji: '📈' };
    return { level: 'Inactive', color: '#6b7280', emoji: '💤' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            Loading Admin Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '100px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)'
    }}>
      <div className="container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Admin Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: window.innerWidth > 768 ? '3rem' : '2.2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Welcome Back, Admin {user?.firstName}! 👨‍💼
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#5a6c7d',
            marginBottom: '1.5rem'
          }}>
            Monitor and manage the MindfulMe platform
          </p>

          {/* Admin Info Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'inline-block',
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            🛡️ Admin Dashboard • {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'overview', label: '📊 Overview', emoji: '📊' },
              { id: 'users', label: '👥 Users', emoji: '👥' },
              { id: 'activity', label: '📈 Activity', emoji: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #1e3a8a, #581c87)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === tab.id ? 'white' : '#1e3a8a',
                  border: activeTab === tab.id ? 'none' : '2px solid #1e3a8a',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(30, 58, 138, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 1200 ? 'repeat(4, 1fr)' :
                                 window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Total Users */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Total Users</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #1e3a8a, #581c87)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stats.totalUsers}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Registered members
                </div>
              </div>

              {/* Active Users */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Active Users</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stats.activeUsers}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Last 30 days
                </div>
              </div>

              {/* Journal Entries */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Journal Entries</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stats.journalEntries}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Total entries written
                </div>
              </div>

              {/* Breathing Sessions */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘</div>
                <h3 style={{ color: '#2d4654', marginBottom: '1rem' }}>Breathing Sessions</h3>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stats.breathingSessions}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Completed sessions
                </div>
              </div>
            </div>

            {/* Platform Summary Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Platform Health */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{
                  color: '#2d4654',
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  🔥 Platform Health
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '15px'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {Math.round((stats.activeUsers / stats.totalUsers) * 100) || 0}%
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>User Engagement</div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '15px'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {Math.round(stats.journalEntries / (stats.totalUsers || 1))}
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>Avg Entries/User</div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '15px'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {Math.round(stats.breathingSessions / (stats.totalUsers || 1))}
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>Avg Sessions/User</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{
                  color: '#2d4654',
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  ⚡ Quick Actions
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => setActiveTab('users')}
                    style={{
                      background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    👥 Manage Users
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📈 View Analytics
                  </button>
                  <button
                    onClick={() => fetchAdminData()}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    🔄 Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: '#2d4654',
              fontSize: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              👥 User Management ({users.length} Users)
            </h2>
            
            {users.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
                <h3 style={{ marginBottom: '1rem' }}>No Users Found</h3>
                <p>No users have registered yet.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? 'repeat(auto-fit, minmax(350px, 1fr))' : '1fr',
                gap: '1.5rem'
              }}>
                {users.map((user) => {
                  const activity = getActivityLevel(user);
                  return (
                    <div
                      key={user.id}
                      style={{
                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        border: '1px solid #dee2e6',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
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
                        <h4 style={{
                          color: '#2d4654',
                          fontSize: '1.2rem',
                          margin: '0'
                        }}>
                          {user.firstName} {user.lastName}
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
                      
                      <div style={{
                        color: '#666',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                      }}>
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
                      
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#999',
                        textAlign: 'center'
                      }}>
                        Joined: {formatDate(user.createdAt)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '25px',
            padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: '#2d4654',
              fontSize: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              📈 Platform Activity & Analytics
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Activity Summary */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  📊 Engagement Metrics
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                      {Math.round((stats.activeUsers / (stats.totalUsers || 1)) * 100)}%
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Active Users
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                      {Math.round((stats.journalEntries + stats.breathingSessions) / (stats.totalUsers || 1))}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Avg Activities/User
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Usage */}
              <div style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  🎯 Feature Usage
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                      {stats.journalEntries > stats.breathingSessions ? '📝' : '🧘'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Most Used Feature
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                      {stats.totalUsers > 0 ? '🚀' : '🌱'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Platform Status
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 1200 ? 'repeat(4, 1fr)' : 
                                 window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '15px',
                padding: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.totalUsers}
                </div>
                <div style={{ fontSize: '0.9rem' }}>Total Registrations</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '15px',
                padding: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.activeUsers}
                </div>
                <div style={{ fontSize: '0.9rem' }}>Monthly Active</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '15px',
                padding: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.journalEntries + stats.breathingSessions}
                </div>
                <div style={{ fontSize: '0.9rem' }}>Total Activities</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '15px',
                padding: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {Math.round(((stats.activeUsers / (stats.totalUsers || 1)) * 100))}%
                </div>
                <div style={{ fontSize: '0.9rem' }}>Retention Rate</div>
              </div>
            </div>

            {/* Platform Insights */}
            <div style={{
              background: 'linear-gradient(135deg, #e0f2fe, #b3e5fc)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2d4654', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                💡 Platform Insights & Recommendations
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                  <h4 style={{ color: '#2d4654', marginBottom: '0.5rem' }}>User Growth</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                    {stats.totalUsers > 100 ? 'Excellent growth! Platform is thriving.' :
                     stats.totalUsers > 50 ? 'Good momentum. Focus on retention.' :
                     stats.totalUsers > 10 ? 'Building user base. Continue marketing.' :
                     'Early stage. Focus on user acquisition.'}
                  </p>
                </div>
                
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                  <h4 style={{ color: '#2d4654', marginBottom: '0.5rem' }}>Engagement</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                    {((stats.activeUsers / (stats.totalUsers || 1)) * 100) > 70 ? 'High engagement! Users love the platform.' :
                     ((stats.activeUsers / (stats.totalUsers || 1)) * 100) > 40 ? 'Good engagement. Room for improvement.' :
                     ((stats.activeUsers / (stats.totalUsers || 1)) * 100) > 20 ? 'Average engagement. Focus on features.' :
                     'Low engagement. Improve user experience.'}
                  </p>
                </div>
                
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                  <h4 style={{ color: '#2d4654', marginBottom: '0.5rem' }}>Popular Feature</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                    {stats.journalEntries > stats.breathingSessions ? 
                     `Journal (${stats.journalEntries} entries) is leading!` :
                     stats.breathingSessions > stats.journalEntries ?
                     `Breathing (${stats.breathingSessions} sessions) is popular!` :
                     'Both features are equally popular!'}
                  </p>
                </div>
              </div>

              {/* Action Items */}
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 style={{ color: '#2d4654', marginBottom: '1rem' }}>📋 Recommended Actions</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
                  gap: '1rem',
                  textAlign: 'left'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                    padding: '1rem',
                    borderRadius: '10px',
                    borderLeft: '4px solid #0ea5e9'
                  }}>
                    <strong style={{ color: '#0c4a6e' }}>Immediate Actions:</strong>
                    <ul style={{ margin: '0.5rem 0 0 1rem', color: '#334155' }}>
                      <li>Monitor user engagement trends</li>
                      <li>Check for inactive users</li>
                      <li>Review platform performance</li>
                    </ul>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    padding: '1rem',
                    borderRadius: '10px',
                    borderLeft: '4px solid #22c55e'
                  }}>
                    <strong style={{ color: '#14532d' }}>Growth Opportunities:</strong>
                    <ul style={{ margin: '0.5rem 0 0 1rem', color: '#334155' }}>
                      <li>Promote less-used features</li>
                      <li>Gather user feedback</li>
                      <li>Plan new wellness features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Status Footer */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '1.5rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981'
              }}></div>
              <span>System Healthy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#f59e0b'
              }}></div>
              <span>Database Connected</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#8b5cf6'
              }}></div>
              <span>API Responsive</span>
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#999'
            }}>
              Last Updated: {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
