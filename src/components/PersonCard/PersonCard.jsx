import React from 'react';
import './PersonCard.css';

const PersonCard = ({ person, showDetails = false }) => {
  const hasEducation = person.education && 
    (person.education.phd || person.education.masters || person.education.bachelors);

  return (
    <div className="person-card-detailed">
      <div className="person-image">
        <img src={person.image} alt={person.name} />
        {person.year && <div className="year-badge">{person.year}</div>}
        <div className="image-overlay">
          <div className="social-links">
            {person.email && (
              <a href={`mailto:${person.email}`} className="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="person-info">
        <h4 className="person-name">{person.name}</h4>
        <p className="person-title">{person.title}</p>
        
        {person.postAffiliation && (
          <p className="person-affiliation">{person.postAffiliation}</p>
        )}
        
        {person.research && person.research.length > 0 && (
          <div className="research-interests">
            <h5>Research Interests:</h5>
            <div className="interest-tags">
              {person.research.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        )}
        
        {showDetails && hasEducation && (
          <div className="education-section">
            <h5>Education:</h5>
            <div className="education-list">
              {person.education.phd && (
                <div className="education-item">
                  <strong>PhD:</strong> {person.education.phd.degree}
                  {person.education.phd.institution && ` - ${person.education.phd.institution}`}
                  {person.education.phd.year && ` (${person.education.phd.year})`}
                </div>
              )}
              {person.education.masters && (
                <div className="education-item">
                  <strong>Masters:</strong> {person.education.masters.degree}
                  {person.education.masters.institution && ` - ${person.education.masters.institution}`}
                  {person.education.masters.year && ` (${person.education.masters.year})`}
                </div>
              )}
              {person.education.bachelors && (
                <div className="education-item">
                  <strong>Bachelors:</strong> {person.education.bachelors.degree}
                  {person.education.bachelors.institution && ` - ${person.education.bachelors.institution}`}
                  {person.education.bachelors.year && ` (${person.education.bachelors.year})`}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
