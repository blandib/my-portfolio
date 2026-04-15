import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen.jsx';
import RegisterScreen from '../../screens/RegisterScreen.jsx';
import HomeScreen from '../../screens/HomeScreen.jsx';
import DashboardScreen from '../../screens/DashboardScreen.jsx';
import ProjectList from '../ProjectList.jsx'; 
import Sidebar from './Sidebar.jsx'; 
import ResumePage from '../Resume.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Sidebar only appears once here */}
        {token && <Sidebar />}

        <main style={{ flex: 1, 
          marginLeft: token ? '100px' : '0', // Automatically adds the gap if you are logged in
        width: '100%',
        }}>
          <Routes>
            {/* PUBLIC ROUTES */}
            {/* The 'path="/"' combined with 'index' ensures Home ONLY shows at the start */}
            <Route path="/" element={<HomeScreen />} index /> 
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* PROTECTED ROUTES */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} 
            />
            <Route 
              path="/projects" 
              element={<ProtectedRoute><ProjectList /></ProtectedRoute>} 
            />
            <Route 
              path="/resume" 
              element={<ProtectedRoute><ResumePage /></ProtectedRoute>} 
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppRouter;