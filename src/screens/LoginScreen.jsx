import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginScreen = () => {
  // 1. Define states inside the component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 2. Define the function inside the component
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };

  // 3. Return the UI
  return (
    <div className="login-container">
      <h2>Login to Your Dashboard</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;