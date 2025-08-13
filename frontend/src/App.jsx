import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import BreathingExercise from './components/BreathingExercise';
import MentalHealthAssessment from './components/MentalHealthAssessment';
import MeditationMindfulness from './components/MeditationMindfulness';
import SupportGroupsCommunity from './components/SupportGroupsCommunity';
import SelfHelpTools from './components/SelfHelpTools';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 return (
   <AuthProvider>
     <Router>
       <div className="App">
         <Routes>
           {/* Public Routes */}
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           
           {/* Protected Routes */}
           <Route path="/" element={
             <ProtectedRoute>
               <Navigation />
               <Navigate to="/dashboard" replace />
             </ProtectedRoute>
           } />
           
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
               <BreathingExercise />
             </ProtectedRoute>
           } />
           
           <Route path="/assessment" element={
             <ProtectedRoute>
               <Navigation />
               <MentalHealthAssessment />
             </ProtectedRoute>
           } />
           
           <Route path="/meditation" element={
             <ProtectedRoute>
               <Navigation />
               <MeditationMindfulness />
             </ProtectedRoute>
           } />
           
           <Route path="/support-groups" element={
             <ProtectedRoute>
               <Navigation />
               <SupportGroupsCommunity />
             </ProtectedRoute>
           } />
           
           <Route path="/self-help" element={
             <ProtectedRoute>
               <Navigation />
               <SelfHelpTools />
             </ProtectedRoute>
           } />
           
           <Route path="/settings" element={
             <ProtectedRoute>
               <Navigation />
               <Settings />
             </ProtectedRoute>
           } />
           
           {/* Catch all route */}
           <Route path="*" element={<Navigate to="/dashboard" replace />} />
         </Routes>
       </div>
     </Router>
   </AuthProvider>
 );
}

export default App;
