// Update your RegisterScreen.jsx to use the service
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import your bridge

const RegisterScreen = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Use the api service instead of fetch
      await api.post('/auth/register', formData);
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      console.error("Register Error:", err);
      // This will show you exactly why the call is failing in the console
      alert(err.response?.data?.message || "Registration failed");
    }
  };

 
  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input 
          name="name"
          type="text" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="email"
          type="email" 
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
        />
        <input 
          name="password"
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/login')}>Already have an account? Login here.</p>
    </div>
  );
};

export default RegisterScreen;