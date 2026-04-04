import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DashboardScreen = () => {
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();

  // --- 1. Fetch Logic ---
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await api.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Session expired", err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  // --- 2. Delete Logic (MUST BE INSIDE THE COMPONENT) ---
  const handleDelete = async (postId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("Are you sure you want to remove this saved post?")) return;

    try {
      // Matches your backend route: /unsave-post/:id
      await api.delete(`/unsave-post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the UI immediately without refreshing the whole page
      setUserData({
        ...userData,
        savedPosts: userData.savedPosts.filter(post => post.id !== postId)
      });
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not remove the post.");
    }
  };

  // --- 3. UI Render ---
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {userData ? (
        <>
          <h1>Welcome, {userData.user.name}! 👋</h1>
          <p>Email: {userData.user.email}</p>
          
          <hr />

          <h3>Your Saved Posts ({userData.savedPosts.length})</h3>
          {userData.savedPosts.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {userData.savedPosts.map((post) => (
                <li key={post.id} style={{ 
                  background: '#f4f4f4', 
                  padding: '15px', 
                  marginBottom: '10px', 
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{post.post_title}</strong> <br />
                    <a href={post.post_url} target="_blank" rel="noreferrer">View Link</a>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(post.id)}
                    style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts saved yet.</p>
          )}

          <hr />
          <h3>Donation History</h3>
          {/* ... donation map code stays the same ... */}
          
          <button 
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
            style={{ marginTop: '20px', padding: '10px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading your dashboard...</p>
      )}
    </div>
  );
};

export default DashboardScreen;