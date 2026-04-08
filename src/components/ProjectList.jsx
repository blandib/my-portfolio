import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(res.rows || res.data); // Adjust based on your API response structure
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="portfolio-section">
      <h2>My Technical Projects</h2>
      <div className="project-grid">
  {projects.map((project) => (
    <div key={project.id} className="project-card">
      {/* 1. Improved Image Handling */}
      <div className="project-image-container">
        <img 
          src={project.image_url || 'https://via.placeholder.com/400x250?text=No+Project+Image'} 
          alt={project.title} 
          className="project-img"
          // If the external link is broken, this shows a placeholder instead of an empty box
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found'; }}
        />
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {/* 2. Safe Skills Mapping */}
        <div className="skills-tags">
          {project.skills?.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>

        {/* 3. Link Handling */}
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
  ))}
</div>
    </section>
  );
};

export default ProjectList;