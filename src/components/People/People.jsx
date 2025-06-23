import { useEffect, useRef } from 'react';
import { staggerAnimation } from '../../utils/gsapAnimations';
import { TEAM_DATA } from '../../utils/constants';
import './People.css';

const People = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.person-card');
      staggerAnimation(cards);
    }
  }, []);

  return (
    <section id="people" className="section people" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the brilliant minds driving innovation in robotics research
          </p>
        </div>

        {/* Director Section */}
        <div className="director-section">
          <div className="director-card">
            <div className="director-image">
              <img src={TEAM_DATA.director.image} alt={TEAM_DATA.director.name} />
              <div className="image-overlay">
                <div className="social-links">
                  <a href={`mailto:${TEAM_DATA.director.email}`} className="social-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                  {TEAM_DATA.director.website && (
                    <a href={TEAM_DATA.director.website} className="social-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="director-info">
              <h3 className="person-name">{TEAM_DATA.director.name}</h3>
              <p className="person-title">{TEAM_DATA.director.title}</p>
              <p className="person-bio">{TEAM_DATA.director.bio}</p>
              <div className="research-interests">
                <h4>Research Interests:</h4>
                <div className="interest-tags">
                  {TEAM_DATA.director.research.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Team */}
        <div className="team-section">
          <h3 className="team-category-title">Research Scientists</h3>
          <div className="team-grid">
            {TEAM_DATA.researchers.map((person, index) => (
              <div key={index} className="person-card">
                <div className="person-image">
                  <img src={person.image} alt={person.name} />
                  <div className="image-overlay">
                    <div className="social-links">
                      <a href={`mailto:${person.email}`} className="social-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="person-info">
                  <h4 className="person-name">{person.name}</h4>
                  <p className="person-title">{person.title}</p>
                  <div className="research-interests">
                    <div className="interest-tags">
                      {person.research.map((interest, resIndex) => (
                        <span key={resIndex} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PhD Students */}
        <div className="team-section">
          <h3 className="team-category-title">PhD Students</h3>
          <div className="team-grid">
            {TEAM_DATA.phd.map((person, index) => (
              <div key={index} className="person-card">
                <div className="person-image">
                  <img src={person.image} alt={person.name} />
                  <div className="year-badge">{person.year}</div>
                </div>
                <div className="person-info">
                  <h4 className="person-name">{person.name}</h4>
                  <p className="person-title">{person.title}</p>
                  <div className="research-interests">
                    <div className="interest-tags">
                      {person.research.map((interest, resIndex) => (
                        <span key={resIndex} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-us-section">
          <div className="join-us-content">
            <h3>Join Our Team</h3>
            <p>
              We're always looking for passionate researchers and students to join our team. 
              Explore opportunities to work on cutting-edge robotics projects and contribute 
              to groundbreaking research.
            </p>
            <div className="join-us-actions">
              <button className="btn-primary">View Open Positions</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>
          <div className="join-us-visual">
            <div className="team-illustration">
              <svg viewBox="0 0 400 300" className="illustration-svg">
                <defs>
                  <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)"/>
                    <stop offset="100%" stopColor="var(--secondary)"/>
                  </linearGradient>
                </defs>
                
                {/* Team representation */}
                <circle cx="200" cy="100" r="25" fill="url(#teamGradient)" opacity="0.8"/>
                <circle cx="150" cy="150" r="20" fill="var(--accent)" opacity="0.7"/>
                <circle cx="250" cy="150" r="20" fill="var(--accent)" opacity="0.7"/>
                <circle cx="120" cy="200" r="18" fill="var(--secondary)" opacity="0.6"/>
                <circle cx="180" cy="220" r="18" fill="var(--secondary)" opacity="0.6"/>
                <circle cx="220" cy="220" r="18" fill="var(--secondary)" opacity="0.6"/>
                <circle cx="280" cy="200" r="18" fill="var(--secondary)" opacity="0.6"/>
                
                {/* Connection lines */}
                <line x1="200" y1="125" x2="150" y2="130" stroke="url(#teamGradient)" strokeWidth="2" opacity="0.5"/>
                <line x1="200" y1="125" x2="250" y2="130" stroke="url(#teamGradient)" strokeWidth="2" opacity="0.5"/>
                <line x1="150" y1="170" x2="120" y2="182" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
                <line x1="150" y1="170" x2="180" y2="202" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
                <line x1="250" y1="170" x2="220" y2="202" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
                <line x1="250" y1="170" x2="280" y2="182" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default People;
