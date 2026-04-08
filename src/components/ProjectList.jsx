import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/projects');
      
      // LOG THIS to see exactly what Render is sending back
      console.log("API Response Data:", res.data);

      // Check if the data is inside .rows (common with pg) or just res.data
      const projectData = Array.isArray(res.data) ? res.data : res.data.rows || [];
      
      setProjects(projectData);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]); // Fallback to empty array so .map doesn't crash
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);

  return (
      <section className="portfolio-section">
  <h2>My Technical Projects</h2>
  <div className="project-grid">
    {/* ADD THIS CHECK: Only map if projects is an Array and has items */}
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

            <div className="project-links">
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noreferrer" className="link-btn">
                  GitHub
                </a>
              )}
              {project.demo_link && (
                <a href={project.demo_link} target="_blank" rel="noreferrer" className="link-btn primary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))
    ) : (
      /* SHOW THIS if there are no projects or data is still loading */
      <div className="no-projects">
        <p>No projects to display yet. Check your database connection!</p>
      </div>
    )}
  </div>
</section>
  );
};

export default ProjectList;