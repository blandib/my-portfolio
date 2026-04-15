import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  // FIX: Added the missing loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/projects');
        
        console.log("API Response Data:", res.data);

        // Check if the data is inside .rows (common with pg) or just res.data
        const projectData = Array.isArray(res.data) ? res.data : (res.data.rows || []);
        
        setProjects(projectData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]); 
      } finally {
        // This now works because setLoading is defined above
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Show a loading message so the user knows data is coming
  if (loading) {
    return <div className="loading">Loading your amazing projects...</div>;
  }

 return (
    <section className="portfolio-section">
      {/* ADDED: Resume Section at the top of the dashboard */}
      <div className="dashboard-controls" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Technical Projects</h2>
        <a 
          href="/Blandine_resume.pdf" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-resume"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          📄 View/Download Resume
        </a>
      </div>

      <div className="project-grid">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img 
                  src={project.image_url || 'https://via.placeholder.com/400x250?text=No+Project+Image'} 
                  alt={project.title} 
                  className="project-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found'; }}
                />
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="skills-tags">
                  {project.skills?.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="card-actions">
                  {/* FIX: Added rel="noreferrer" for security */}
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-demo"
                  >
                    Live Demo
                  </a>
                  
                  {/* FIX: Commented out handleEdit to stop the 'not defined' error */}
                  {/* <button onClick={() => console.log("Edit functionality coming soon")}>Edit</button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-projects">
            <p>No projects to display yet. Check your database connection!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectList;