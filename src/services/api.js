import axios from 'axios';
import { Navigate } from 'react-router-dom';
// Ensure this matches the port your backend is running on!
const api = axios.create({
  baseURL: 'https://my-portfolio-v2cc.onrender.com', 
});

// This automatically attaches your JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If there is no token, send them back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default api;