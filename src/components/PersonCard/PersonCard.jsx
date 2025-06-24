import React, { useState } from 'react';
import './PersonCard.css';

const PersonCard = ({ person, onViewProfile, layout = 'horizontal' }) => {
  const [imageError, setImageError] = useState(false);
  
  const hasEducation = person.education && 
    (person.education.phd || person.education.masters || person.education.bachelors);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) return '/api/placeholder/300/300';
    return person.image || person.Photo || '/api/placeholder/300/300';
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(person);
    }
  };

  if (layout === 'detailed') {
    return (
      <div className="person-card person-card-detailed">
        <div className="person-image">
          <img 
            src={getImageSrc()} 
            alt={person.name}
            onError={handleImageError}
          />
          {person.year && <div className="year-badge">{person.year}</div>}
        </div>
        
        <h4 className="person-name">{person.name}</h4>
        <p className="person-title">{person.title}</p>
        
        {person.postAffiliation && (
          <p className="person-affiliation">{person.postAffiliation}</p>
        )}
        
        {person.bio && (
          <p className="person-bio">{person.bio}</p>
        )}
        
        {person.research && person.research.length > 0 && (
          <div className="research-interests">
            <h5>Research Interests</h5>
            <div className="interest-tags">
              {person.research.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        )}
        
        {hasEducation && (
          <div className="education-section">
            <h5>Education</h5>
            <div className="education-list">
              {person.education.phd && (
                <div className="education-item">
                  <strong>PhD:</strong> {typeof person.education.phd === 'object' 
                    ? `${person.education.phd.degree || 'PhD'} ${person.education.phd.institution ? 'from ' + person.education.phd.institution : ''} ${person.education.phd.year ? '(' + person.education.phd.year + ')' : ''}`.trim()
                    : person.education.phd}
                </div>
              )}
              {person.education.masters && (
                <div className="education-item">
                  <strong>Masters:</strong> {typeof person.education.masters === 'object'
                    ? `${person.education.masters.degree || 'Masters'} ${person.education.masters.institution ? 'from ' + person.education.masters.institution : ''} ${person.education.masters.year ? '(' + person.education.masters.year + ')' : ''}`.trim()
                    : person.education.masters}
                </div>
              )}
              {person.education.bachelors && (
                <div className="education-item">
                  <strong>Bachelors:</strong> {typeof person.education.bachelors === 'object'
                    ? `${person.education.bachelors.degree || 'Bachelors'} ${person.education.bachelors.institution ? 'from ' + person.education.bachelors.institution : ''} ${person.education.bachelors.year ? '(' + person.education.bachelors.year + ')' : ''}`.trim()
                    : person.education.bachelors}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div className="person-card person-card-horizontal">
      <div className="person-image-horizontal">
        <img 
          src={getImageSrc()} 
          alt={person.name}
          onError={handleImageError}
        />
        {person.year && <div className="year-badge">{person.year}</div>}
        <div className="image-overlay">
          <div className="social-links">
            {person.email && (
              <a href={`mailto:${person.email}`} className="social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            )}
            {person.linkedin && (
              <a href={person.linkedin} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
            {person.website && (
              <a href={person.website} className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="person-info-horizontal">
        <h4 className="person-name">{person.name}</h4>
        <p className="person-title">{person.title}</p>
        
        {person.postAffiliation && (
          <p className="person-affiliation">{person.postAffiliation}</p>
        )}
        
        {person.bio && (
          <p className="person-bio-preview">
            {person.bio.length > 150 ? `${person.bio.substring(0, 150)}...` : person.bio}
          </p>
        )}
        
        {person.research && person.research.length > 0 && (
          <div className="research-interests">
            <div className="interest-tags">
              {person.research.slice(0, 3).map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
              {person.research.length > 3 && (
                <span className="interest-tag more-tag">+{person.research.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        {(hasEducation || person.research?.length > 0 || person.bio || person.publications || person.achievements) && (
          <button className="expand-button" onClick={handleViewProfile}>
            View Profile
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
