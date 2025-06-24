import { useEffect, useRef, useState } from 'react';
import { staggerAnimation } from '../../utils/gsapAnimations';
import { getTeamData } from '../../services/googleSheets';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import './People.css';

const People = () => {
  const sectionRef = useRef(null);
  const [teamData, setTeamData] = useState({
    director: null,
    researchers: [],
    phd: [],
    masters: [],
    undergraduate: [],
    others: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTeamData();
        setTeamData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch team data:', err);
        setError('Failed to load team data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sectionRef.current && !loading) {
      const cards = sectionRef.current.querySelectorAll('.person-card');
      staggerAnimation(cards);
    }
  }, [loading, teamData]);

  if (loading) {
    return (
      <section id="people" className="section people" ref={sectionRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">Loading team information...</p>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="people" className="section people" ref={sectionRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle error-message">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="people" className="section people" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the brilliant minds driving innovation in robotics research
          </p>
        </div>        {/* Director Section */}
        {teamData.director && (
          <div className="director-section">
            <div className="director-card">
              <div className="director-image">
                <img src={teamData.director.image} alt={teamData.director.name} />
                <div className="image-overlay">
                  <div className="social-links">
                    <a href={`mailto:${teamData.director.email}`} className="social-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
                    {teamData.director.website && (
                      <a href={teamData.director.website} className="social-link">
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
                <h3 className="person-name">{teamData.director.name}</h3>
                <p className="person-title">{teamData.director.title}</p>
                <p className="person-bio">{teamData.director.bio}</p>
                {teamData.director.research && teamData.director.research.length > 0 && (
                  <div className="research-interests">
                    <h4>Research Interests:</h4>
                    <div className="interest-tags">
                      {teamData.director.research.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}        {/* Research Team */}
        {teamData.researchers && teamData.researchers.length > 0 && (
          <div className="team-section">
            <h3 className="team-category-title">Research Scientists</h3>
            <div className="team-grid">
              {teamData.researchers.map((person, index) => (
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
                    {person.research && person.research.length > 0 && (
                      <div className="research-interests">
                        <div className="interest-tags">
                          {person.research.map((interest, resIndex) => (
                            <span key={resIndex} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}        {/* PhD Students */}
        {teamData.phd && teamData.phd.length > 0 && (
          <div className="team-section">
            <h3 className="team-category-title">PhD Students</h3>
            <div className="team-grid">
              {teamData.phd.map((person, index) => (
                <div key={index} className="person-card">
                  <div className="person-image">
                    <img src={person.image} alt={person.name} />
                    <div className="year-badge">{person.year}</div>
                  </div>
                  <div className="person-info">
                    <h4 className="person-name">{person.name}</h4>
                    <p className="person-title">{person.title}</p>
                    {person.research && person.research.length > 0 && (
                      <div className="research-interests">
                        <div className="interest-tags">
                          {person.research.map((interest, resIndex) => (
                            <span key={resIndex} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}        {/* Masters Students */}
        {teamData.masters && teamData.masters.length > 0 && (
          <div className="team-section">
            <h3 className="team-category-title">Masters Students</h3>
            <div className="team-grid">
              {teamData.masters.map((person, index) => (
                <div key={index} className="person-card">
                  <div className="person-image">
                    <img src={person.image} alt={person.name} />
                  </div>
                  <div className="person-info">
                    <h4 className="person-name">{person.name}</h4>
                    <p className="person-title">{person.title}</p>
                    {person.research && person.research.length > 0 && (
                      <div className="research-interests">
                        <div className="interest-tags">
                          {person.research.map((interest, resIndex) => (
                            <span key={resIndex} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}        {/* Undergraduate Students */}
        {teamData.undergraduate && teamData.undergraduate.length > 0 && (
          <div className="team-section">
            <h3 className="team-category-title">Undergraduate Students</h3>
            <div className="team-grid">
              {teamData.undergraduate.map((person, index) => (
                <div key={index} className="person-card">
                  <div className="person-image">
                    <img src={person.image} alt={person.name} />
                  </div>
                  <div className="person-info">
                    <h4 className="person-name">{person.name}</h4>
                    <p className="person-title">{person.title}</p>
                    {person.research && person.research.length > 0 && (
                      <div className="research-interests">
                        <div className="interest-tags">
                          {person.research.map((interest, resIndex) => (
                            <span key={resIndex} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}        {/* Other Team Members */}
        {teamData.others && teamData.others.length > 0 && (
          <div className="team-section">
            <h3 className="team-category-title">Other Team Members</h3>
            <div className="team-grid">
              {teamData.others.map((person, index) => (
                <div key={index} className="person-card">
                  <div className="person-image">
                    <img src={person.image} alt={person.name} />
                  </div>
                  <div className="person-info">
                    <h4 className="person-name">{person.name}</h4>
                    <p className="person-title">{person.title}</p>
                    {person.research && person.research.length > 0 && (
                      <div className="research-interests">
                        <div className="interest-tags">
                          {person.research.map((interest, resIndex) => (
                            <span key={resIndex} className="interest-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Expandable Team Profiles Section */}
        <div className="team-section expandable-section">
          <h3 className="team-category-title">Detailed Team Profiles</h3>
          <p className="section-description">
            Click on any team member to explore their detailed research background, 
            publications, and achievements.
          </p>
          <ExpandableCard cards={[
            ...(teamData.researchers || []), 
            ...(teamData.phd || []), 
            ...(teamData.masters || []),
            ...(teamData.undergraduate || []),
            ...(teamData.others || [])
          ]} />
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
