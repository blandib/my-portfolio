import React from 'react';

const ResumePage = () => {
  return (
    // Inside Resume.jsx or ProjectList.jsx
<div style={{ 
  marginLeft: '280px', // This pushes the content 280px to the right
  padding: '40px', 
  width: 'calc(100% - 280px)', // This ensures the content doesn't go off-screen to the right
  boxSizing: 'border-box',
  minHeight: '100vh',
  backgroundColor: '#f4f7f6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}}>
      <div style={{ width: '100%', maxWidth: '1000px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#333', margin: 0 }}>Professional Resume</h1>
        <a 
          href="/Blandine_resume.pdf" 
          download 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            borderRadius: '5px', 
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Download PDF
        </a>
      </div>

      {/* The iframe container is what allows "two pages" to show by being wide enough */}
      <div style={{ 
        width: '100%', 
        maxWidth: '1000px', 
        backgroundColor: '#fff', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <iframe 
          src="/Blandine_resume.pdf#view=FitH" // #view=FitH helps the PDF fit the width
          width="100%" 
          height="1200px" // Increased height so you can see more pages
          style={{ border: 'none' }}
          title="Blandine Resume"
        />
      </div>
    </div>
  );
};

export default ResumePage;