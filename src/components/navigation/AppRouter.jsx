import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Check if these files actually have "export default"
import LoginScreen from '../../screens/LoginScreen.jsx';
import RegisterScreen from '../../screens/RegisterScreen.jsx';
//import DashboardScreen from '../../screens/DashboardScreen.jsx';
import HomeScreen from '../../screens/HomeScreen.jsx';
import DashboardScreen from '../../screens/DashboardScreen.jsx';
console.log("DashboardScreen component is:", DashboardScreen); // Add this!
// Define the security guard once
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If token is missing, force redirect to login
  return token ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardScreen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;