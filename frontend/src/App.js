import React from 'react';

import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import Login from './pages/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import BreathingExercises from './components/BreathingExercises';
import Resources from './components/Resources';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';
import EmailTest from './components/EmailTest';
import EmailVerification from './components/EmailVerification';
import PasswordReset from './components/PasswordReset';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '1.5rem',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <div>Loading MindfulMe...</div>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '1.5rem',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}> 🧠 </div>
          <div>Loading MindfulMe...</div>
        </div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (<AuthProvider>
      
      <ThemeProvider><Router>
        <div className="App">
          <Routes>
            {/* Public routes - NO Navigation */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/email-test" element={<EmailTest />} />
            
            {/* Protected routes - WITH Navigation */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigation />
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <Navigation />
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="/breathing" element={
              <ProtectedRoute>
                <Navigation />
                <BreathingExercises />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Navigation />
                <Resources />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Navigation />
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Navigation />
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    
      </ThemeProvider></AuthProvider>);
}

export default App;


