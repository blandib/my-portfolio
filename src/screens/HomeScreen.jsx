import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My App</h1>
      <p>This is the home screen.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;