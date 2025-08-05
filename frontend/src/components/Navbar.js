import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo" onClick={() => navigate('/dashboard')}>
          🧠 MindfulMe
        </h1>
        
        <div className="nav-links">
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/journal')}
          >
            📝 Journal
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/breathing')}
          >
            🫁 Breathing
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/resources')}
          >
            📚 Resources
          </button>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('/settings')}
          >
            ⚙️ Settings
          </button>
          <button 
            className="nav-link logout-btn" 
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
