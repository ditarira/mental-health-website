import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/journal', name: 'Journal', icon: '📝' },
    { path: '/breathing', name: 'Breathing', icon: '🫁' },
    { path: '/resources', name: 'Resources', icon: '📚' },
    { path: '/settings', name: 'Settings', icon: '⚙️' }
  ];

  if (isAdmin) {
    navLinks.push({ path: '/admin', name: 'Admin', icon: '👑' });
  }

  const isActive = (path) => location.pathname === path;

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 1000
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      textDecoration: 'none'
    },
    logoIcon: {
      fontSize: '1.8rem'
    },
    navLinks: {
      display: window.innerWidth > 768 ? 'flex' : 'none',
      alignItems: 'center',
      gap: '0.5rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      textDecoration: 'none',
      color: '#374151',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease'
    },
    activeNavLink: {
      background: '#1e3a8a',
      color: 'white'
    },
    adminLink: {
      background: '#fbbf24',
      color: 'white',
      fontWeight: '600'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userInfo: {
      display: window.innerWidth > 768 ? 'flex' : 'none',
      alignItems: 'center',
      gap: '0.5rem'
    },
    avatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: isAdmin ? '#fbbf24' : '#1e3a8a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.8rem'
    },
    logoutBtn: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    mobileMenuBtn: {
      display: window.innerWidth <= 768 ? 'block' : 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer'
    }
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.logo}>
        <span style={styles.logoIcon}>🧠</span>
        <span>MindfulMe</span>
      </Link>

      <ul style={styles.navLinks}>
        {navLinks.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              style={{
                ...styles.navLink,
                ...(isActive(link.path) ? styles.activeNavLink : {}),
                ...(link.name === 'Admin' ? styles.adminLink : {})
              }}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div style={styles.userSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user?.firstName?.[0]?.toUpperCase()}{user?.lastName?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
              {user?.firstName} {user?.lastName}
            </div>
            {isAdmin && (
              <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>Admin</div>
            )}
          </div>
        </div>
        
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>

        <button
          style={styles.mobileMenuBtn}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
