// Replace your App.js with this temporarily:
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Simple test component
const TestComponent = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '2rem',
    textAlign: 'center'
  }}>
    <div>
      <h1>🧠 MindfulMe</h1>
      <p>Mental Health Platform</p>
      <p style={{fontSize: '1rem'}}>App is working! Now adding components...</p>
    </div>
  </div>
);

function AppContent() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<TestComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
