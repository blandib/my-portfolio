import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const technicalSkills = [
    { name: "JavaScript", level: "90%", icon: "fab fa-js", color: "#f7df1e" },
    { name: "React", level: "85%", icon: "fab fa-react", color: "#61dafb" },
    { name: "Node.js", level: "80%", icon: "fab fa-node-js", color: "#339933" },
    { name: "PostgreSQL", level: "75%", icon: "fas fa-database", color: "#336791" },
    { name: "Python", level: "70%", icon: "fab fa-python", color: "#3776ab" },
    { name: "HTML & CSS", level: "95%", icon: "fab fa-html5", color: "#e34f26" },
    { name: "Responsive Design", level: "90%", icon: "fas fa-mobile-alt", color: "#264de4" },
    { name: "English", level: "100%", icon: "fas fa-globe-americas", color: "#28a745" },
    { name: "French", level: "100%", icon: "fas fa-feather-alt", color: "#28a745" }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(Array.isArray(res.data) ? res.data : (res.data.rows || []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

  return (
   <div className="main-content-wrapper" style={{ 
  marginLeft: '280px', 
  padding: '40px',
  minHeight: '100vh',
  backgroundColor: '#f4f7f6',
  position: 'relative', 
  zIndex: 1 // <--- ADD THIS LINE
}}>
      
      {/* 1. HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', fontSize: '2.5rem' }}>blandineTech Portfolio</h1>
        <a href="/Blandine_resume.pdf" target="_blank" rel="noreferrer" style={{ 
          padding: '12px 24px', backgroundColor: '#007bff', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,123,255,0.2)'
        }}>📄 View Resume</a>
      </div>

      {/* 2. TECHNICAL SKILLS GRID */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '60px' 
      }}>
        {technicalSkills.map((skill, i) => (
          <div key={i} className="skill-card" style={{ 
            background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={skill.icon} style={{ fontSize: '1.5rem', color: skill.color, marginRight: '15px' }}></i>
                <span style={{ fontWeight: '700' }}>{skill.name}</span>
              </div>
              <span style={{ fontWeight: 'bold', color: '#666' }}>{skill.level}</span>
            </div>
            
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ 
                width: skill.level, height: '100%', background: skill.color, borderRadius: '10px',
                animation: 'grow 2s ease-out forwards' 
              }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PROJECT SHOWCASE */}
      <h2 style={{ marginBottom: '40px', fontSize: '2rem' }}>Projects Showcase</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
        {projects.map((project) => (
          <div key={project.id} className="project-card" style={{ 
            background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #eee'
          }}>
            <img 
              src={project.image_url || 'https://via.placeholder.com/400x250'} 
              alt={project.title} 
              style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '25px' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#222' }}>{project.title}</h3>
              <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                {project.skills?.map((s, idx) => (
                  <span key={idx} style={{ background: '#f0f4ff', color: '#4466ff', padding: '5px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {s}
                  </span>
                ))}
              </div>

              <a 
                href={project.demo_link || project.demo_url} 
                target="_blank" rel="noreferrer" 
                style={{ 
                  display: 'inline-block', padding: '12px 20px', background: '#1a1a1a', color: '#fff', 
                  borderRadius: '8px', textDecoration: 'none', fontWeight: '600', textAlign: 'center'
                }}
              >
                Live Demo <i className="fas fa-external-link-alt" style={{ marginLeft: '10px' }}></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes grow { from { width: 0; } }
        .skill-card:hover { transform: translateY(-8px); transition: 0.3s ease; }
        .project-card:hover { transform: scale(1.02); transition: 0.3s ease; }
      `}</style>
    </div>
  );
};

export default ProjectList;