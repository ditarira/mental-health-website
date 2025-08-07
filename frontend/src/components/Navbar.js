import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = user?.role === 'ADMIN' || user?.email === 'admin@mindfulme.com';

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: '🏠' },
    { path: '/journal', name: 'Journal', icon: '📝' },
    { path: '/breathing', name: 'Breathing', icon: '🧘‍♀️' },
    { path: '/resources', name: 'Resources', icon: '📚' },
    { path: '/settings', name: 'Settings', icon: '⚙️' }
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navLinks.push({ path: '/admin', name: 'Admin', icon: '👑' });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(124, 165, 184, 0.15)' 
          : '0 4px 20px rgba(124, 165, 184, 0.1)',
        padding: '1rem 2rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(124, 165, 184, 0.1)'
      }}>
        {/* Logo */}
        <Link 
          to="/dashboard" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#7ca5b8',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '15px',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(124, 165, 184, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            <span style={{ color: 'white' }}>🧠</span>
          </div>
          <span style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>MindfulMe</span>
        </Link>

        {/* Desktop Navigation */}
        <ul style={{
          display: window.innerWidth > 768 ? 'flex' : 'none',
          alignItems: 'center',
          gap: '0.5rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          background: 'rgba(124, 165, 184, 0.05)',
          borderRadius: '20px',
          padding: '0.5rem'
        }}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: isActive(link.path) ? 'white' : '#667eea',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  background: isActive(link.path) 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : link.name === 'Admin' 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : 'transparent',
                  boxShadow: isActive(link.path) || link.name === 'Admin'
                    ? '0 6px 20px rgba(102, 126, 234, 0.3)'
                    : 'none',
                  transform: isActive(link.path) ? 'translateY(-2px)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (!isActive(link.path) && link.name !== 'Admin') {
                    e.target.style.background = 'rgba(124, 165, 184, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(124, 165, 184, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive(link.path) && link.name !== 'Admin') {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop User Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* User Info */}
          <div style={{
            display: window.innerWidth > 768 ? 'flex' : 'none',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(124, 165, 184, 0.1), rgba(102, 126, 234, 0.05))',
            border: '1px solid rgba(124, 165, 184, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.9)'
            }}>
              {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <span style={{
                color: '#2d4654',
                fontWeight: '700',
                fontSize: '1rem',
                lineHeight: '1.2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {user?.firstName} {user?.lastName}
                {isAdmin && (
                  <span style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}>
                    👑 Admin
                  </span>
                )}
              </span>
              <span style={{
                fontSize: '0.8rem',
                color: '#7ca5b8',
                fontWeight: '500'
              }}>
                {isAdmin ? 'Administrator' : 'Wellness Member'}
              </span>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.25rem',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)'
            }}
            onClick={handleLogout}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.3)';
            }}
          >
            <span>👋</span>
            <span>Logout</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            style={{
              display: window.innerWidth <= 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(124, 165, 184, 0.1), rgba(102, 126, 234, 0.05))',
              border: '2px solid rgba(124, 165, 184, 0.2)',
              width: '45px',
              height: '45px',
              borderRadius: '12px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              color: '#667eea',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(124, 165, 184, 0.15), rgba(102, 126, 234, 0.1))';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(124, 165, 184, 0.1), rgba(102, 126, 234, 0.05))';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        display: showMobileMenu ? 'flex' : 'none',
        position: 'fixed',
        top: '90px',
        left: '1rem',
        right: '1rem',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        flexDirection: 'column',
        padding: '1.5rem',
        boxShadow: '0 20px 60px rgba(124, 165, 184, 0.2)',
        gap: '0.75rem',
        zIndex: 999,
        borderRadius: '20px',
        border: '1px solid rgba(124, 165, 184, 0.1)',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              textDecoration: 'none',
              color: isActive(link.path) ? 'white' : '#667eea',
              fontWeight: '600',
              padding: '1rem 1.25rem',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              background: isActive(link.path) 
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : link.name === 'Admin' 
                  ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                  : 'transparent',
              boxShadow: isActive(link.path) || link.name === 'Admin'
                ? '0 6px 20px rgba(102, 126, 234, 0.3)'
                : 'none'
            }}
            onClick={() => setShowMobileMenu(false)}
            onMouseOver={(e) => {
              if (!isActive(link.path) && link.name !== 'Admin') {
                e.target.style.background = 'rgba(124, 165, 184, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive(link.path) && link.name !== 'Admin') {
                e.target.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
        
        {/* Mobile User Section */}
        <div style={{
          borderTop: '1px solid rgba(124, 165, 184, 0.1)',
          paddingTop: '1.5rem',
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(124, 165, 184, 0.1), rgba(102, 126, 234, 0.05))',
            borderRadius: '15px',
            border: '1px solid rgba(124, 165, 184, 0.1)'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
            }}>
              {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{
                color: '#2d4654',
                fontWeight: '700',
                fontSize: '1rem'
              }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#7ca5b8',
                fontWeight: '500'
              }}>
                {isAdmin ? '👑 Administrator' : 'Wellness Member'}
              </div>
            </div>
          </div>
          
          <button
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '15px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)'
            }}
            onClick={() => {
              setShowMobileMenu(false);
              handleLogout();
            }}
          >
            <span>👋</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {showMobileMenu && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 998,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;
