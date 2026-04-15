import axios from 'axios';
import { Navigate } from 'react-router-dom';
// Ensure this matches the port your backend is running on!
const api = axios.create({
  //baseURL: 'https://my-portfolio-v2cc.onrender.com', 
  baseURL: 'http://localhost:5000'
});

// This automatically attaches your JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;