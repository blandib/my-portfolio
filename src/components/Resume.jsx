import api from '../services/api';

const ResumeSection = () => {
  const handleDownload = async () => {
    try {
      // 1. Send the signal to the backend
      await api.post('/api/analytics/resume');
      
      // 2. Actually open/download the file
      // Replace with your actual file path (should be in the 'public' folder)
      window.open('/Blandine_Resume.pdf', '_blank'); 
    } catch (err) {
      // Even if tracking fails, let them download the resume
      window.open('/Blandine_Resume.pdf', '_blank');
    }
  };

  return (
    <div className="resume-container">
      <h3>My Professional Resume</h3>
      <button onClick={handleDownload} className="download-btn">
        Download CV
      </button>
    </div>
  );
};