import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiUser, FiLogOut, FiGithub } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { name: 'My Projects', icon: <FiFolder />, path: '/projects' },
    { name: 'Profile', icon: <FiUser />, path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 1. FIXED STYLE OBJECT: Changed ; to , and added required layout styles
  const sidebarStyle = {
    width: '280px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000, 
    //backgroundColor: 'dark blue', // Keeps it solid so projects don't show through
    borderRight: '1px solid #eee'
  };

  return (
    /* 2. APPLIED STYLE: Added style={sidebarStyle} here */
    <div className="sidebar" style={sidebarStyle}>
      <div className="sidebar-logo">
        <h2>BlandineTech</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.name}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="https://github.com/blandib" target="_blank" rel="noreferrer" className="nav-item">
          <FiGithub /> <span>Source Code</span>
        </a>
        <div className="nav-item logout" onClick={handleLogout}>
          <FiLogOut /> <span>Logout</span>
        </div>
      </div>

      <div 
  className="nav-item" 
  onClick={() => navigate('/resume')}
  style={{ cursor: 'pointer' }}
>
  <FiUser /> <span>Resume Management</span>
</div>
    </div>
  );
};

export default Sidebar;