import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen.jsx';
import RegisterScreen from '../../screens/RegisterScreen.jsx';
import HomeScreen from '../../screens/HomeScreen.jsx';
import DashboardScreen from '../../screens/DashboardScreen.jsx';
import ProjectList from '../ProjectList.jsx'; // Path to  projects
import Sidebar from './Sidebar.jsx'; // Path to  sidebar

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Only show Sidebar if logged in */}
        {token && <Sidebar />}

        <main style={{ flex: 1, padding: '20px' }}>
          {/* Public Nav: Only show if NOT logged in */}
          {!token && (
            <nav className="public-nav">
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/register">Register</Link>
            </nav>
          )}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Protected Routes (These use your existing Dashboard logic) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardScreen /> 
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <ProjectList />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

 // Express 5 Wildcard Fix:
 //* Using '(.*)' handles the catch-all for React Router navigation 
 //* without triggering the PathError in Express 5.
 //*/
// This is a Regular Expression that matches any path
//app.get(/.*/, (req, res) => {
 // res.sendFile(path.join(__dirname, '../build', 'index.html'));
//});
export default AppRouter;