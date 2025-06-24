import { useEffect, useRef, useState } from 'react';
import { staggerAnimation } from '../../utils/gsapAnimations';
import { getTeamData } from '../../services/googleSheets';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import './People.css';

const People = () => {
  const sectionRef = useRef(null);
  const [teamData, setTeamData] = useState({
    professor: [],
    postdoc: [],
    phd: [],
    juniorResearcher: [],
    masters: [],
    webmaster: [],
    alumni: [],
    graduateStudent: [],
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
      const cards = sectionRef.current.querySelectorAll('.expandable-card-item');
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
        </div>

        <div className="team-sections-container">
          {/* Professor Section */}
          {teamData.professor && teamData.professor.length > 0 && (
            <div className="team-section professor-section">
              <h3 className="team-category-title">Professor</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.professor} />
              </div>
            </div>
          )}

          {/* Post-doctoral Researchers */}
          {teamData.postdoc && teamData.postdoc.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Post-doctoral Researchers</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.postdoc} />
              </div>
            </div>
          )}

          {/* PhD Students */}
          {teamData.phd && teamData.phd.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">PhD Students</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.phd} />
              </div>
            </div>
          )}        {/* Junior Research Fellows */}
          {teamData.juniorResearcher && teamData.juniorResearcher.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Junior Research Fellows</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.juniorResearcher} />
              </div>
            </div>
          )}

          {/* Masters Students */}
          {teamData.masters && teamData.masters.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Master Students</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.masters} />
              </div>
            </div>
          )}

          {/* Graduate Students */}
          {teamData.graduateStudent && teamData.graduateStudent.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Graduate Students</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.graduateStudent} />
              </div>
            </div>
          )}

          {/* Web Masters */}
          {teamData.webmaster && teamData.webmaster.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Web Masters</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.webmaster} />
              </div>
            </div>
          )}

          {/* Other Team Members */}
          {teamData.others && teamData.others.length > 0 && (
            <div className="team-section">
              <h3 className="team-category-title">Other Team Members</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.others} />
              </div>
            </div>
          )}

          {/* Alumni */}
          {teamData.alumni && teamData.alumni.length > 0 && (
            <div className="team-section alumni-section">
              <h3 className="team-category-title">Alumni</h3>
              <div className="team-grid-horizontal">
                <ExpandableCard cards={teamData.alumni} />
              </div>
            </div>
          )}
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