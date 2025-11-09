import { useEffect, useRef, useState } from 'react';
import { staggerAnimation } from '../../utils/gsapAnimations';
import { RESEARCH_AREAS } from '../../utils/constants';
import ResearchModal from '../ResearchModal/ResearchModal';
import './Research.css';

const Research = () => {
  const sectionRef = useRef(null);
  const [selectedResearchArea, setSelectedResearchArea] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (area) => {
    setSelectedResearchArea(area);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResearchArea(null);
  };

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.research-card');
      staggerAnimation(cards);
    }
  }, []);

  return (
    <section id="research" className="section research" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Research Areas</h2>
          <p className="section-subtitle">
            Exploring cutting-edge technologies and methodologies to advance the field of robotics
          </p>
        </div>

        <div className="research-grid">
          {RESEARCH_AREAS.map((area, index) => (
            <div key={index} className="research-card">
              <div className="card-header">
                <div className="research-icon">
                  <span className="icon-emoji">{area.icon}</span>
                </div>
                <h3 className="research-title">{area.title}</h3>
              </div>
              
              <div className="card-content">
                <p className="research-description">{area.description}</p>
                
                <div className="tech-stack">
                  <h4>Key Technologies:</h4>
                  <div className="tech-tags">
                    {area.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
              {/*  {area.projects && area.projects.length > 0 && (*/}
              {/*    <div className="projects-section">*/}
              {/*      <h4>Current Projects:</h4>*/}
              {/*      <ul className="projects-list">*/}
              {/*        {area.projects.map((project, projectIndex) => (*/}
              {/*          <li key={projectIndex} className="project-item">*/}
              {/*            {project}*/}
              {/*          </li>*/}
              {/*        ))}*/}
              {/*      </ul>*/}
              {/*    </div>*/}
              {/*  )}*/}
              </div>
            </div>
          ))}
        </div>

        <div className="research-highlight">
          <div className="highlight-content">
            <div className="highlight-text">
              <h3>Current Focus: Bio-Inspired Autonomous Systems</h3>
              <p>
                Our latest research initiative combines principles from biology and artificial intelligence 
                to create robots that can adapt and learn from their environment, much like living organisms. 
                This interdisciplinary approach is opening new frontiers in robotics.
              </p>
              <div className="highlight-stats">
                <div className="stat-item">
                  <span className="stat-value">5</span>
                  <span className="stat-label">Active Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">$2M</span>
                  <span className="stat-label">Funding Secured</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3</span>
                  <span className="stat-label">Industry Partners</span>
                </div>
              </div>
            </div>
            
            <div className="highlight-visual">
              <div className="research-diagram">
                <svg viewBox="0 0 400 300" className="diagram-svg">
                  <defs>
                    <linearGradient id="researchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)"/>
                      <stop offset="100%" stopColor="var(--secondary)"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Central node */}
                  <circle cx="200" cy="150" r="30" fill="url(#researchGradient)" className="central-node"/>
                  <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AI</text>
                  
                  {/* Research area nodes */}
                  <circle cx="120" cy="80" r="20" fill="var(--accent)" className="research-node"/>
                  <text x="120" y="85" textAnchor="middle" fill="white" fontSize="10">CV</text>
                  
                  <circle cx="280" cy="80" r="20" fill="var(--accent)" className="research-node"/>
                  <text x="280" y="85" textAnchor="middle" fill="white" fontSize="10">ML</text>
                  
                  <circle cx="120" cy="220" r="20" fill="var(--accent)" className="research-node"/>
                  <text x="120" y="225" textAnchor="middle" fill="white" fontSize="10">Bio</text>
                  
                  <circle cx="280" cy="220" r="20" fill="var(--accent)" className="research-node"/>
                  <text x="280" y="225" textAnchor="middle" fill="white" fontSize="10">Ctrl</text>
                  
                  {/* Connections */}
                  <line x1="170" y1="130" x2="140" y2="100" stroke="url(#researchGradient)" strokeWidth="2" className="connection"/>
                  <line x1="230" y1="130" x2="260" y2="100" stroke="url(#researchGradient)" strokeWidth="2" className="connection"/>
                  <line x1="170" y1="170" x2="140" y2="200" stroke="url(#researchGradient)" strokeWidth="2" className="connection"/>
                  <line x1="230" y1="170" x2="260" y2="200" stroke="url(#researchGradient)" strokeWidth="2" className="connection"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Research Modal */}
      <ResearchModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        researchArea={selectedResearchArea}
      />
    </section>
  );
};

export default Research;
