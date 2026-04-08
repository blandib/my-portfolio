import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiUser, FiLogOut, FiGithub } from 'react-icons/fi'; // Install react-icons

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

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Blandine.dev</h2>
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
    </div>
  );
};

export default Sidebar;