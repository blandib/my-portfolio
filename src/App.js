import React from 'react';
import AppRouter from './components/navigation/AppRouter.jsx';
import './App.css';

import ProjectList from './components/ProjectList'; 
function App() {
  return (
    <div className="App">
      {/* Your Navbar would go here */}
      
      <main>
        {/* Other sections like Hero or About */}
        
        {/* ADD THIS LINE TO SHOW YOUR PROJECTS */}
        <ProjectList /> 
      </main>

      {/* Your Footer */}
    </div>
  );
}

export default App;