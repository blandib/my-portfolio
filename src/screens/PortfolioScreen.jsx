const handleLogout = () => {
  // 1. Remove the token
  localStorage.removeItem('token');
  
  // 2. Redirect to Home or Login
  navigate('/login');
  
  // 3. Optional: Clear any global state/user data
  alert("You have been logged out.");
};