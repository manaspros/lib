import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import './ExpandableCard.css';

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="close-icon"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const ExpandableCard = ({ cards }) => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const getImageSrc = (card) => {
    // Prioritize the image field, then Photo field, then fallback
    const imageUrl = card.image || card.Photo;
    
    if (imageUrl && imageUrl !== '/api/placeholder/300/300') {
      return imageUrl;
    }
    
    // Fallback to a more specific placeholder or default image
    return 'https://via.placeholder.com/300x300/e2e8f0/64748b?text=No+Photo';
  };

  const getCardBio = (card) => {
    // Show only a brief preview in the card
    if (card.postAffiliation && card.research && card.research.length > 0) {
      return `${card.postAffiliation} • ${card.research[0]}${card.research.length > 1 ? ' and more' : ''}`;
    }
    if (card.postAffiliation) return card.postAffiliation;
    if (card.research && card.research.length > 0) {
      return card.research[0] + (card.research.length > 1 ? ' and more' : '');
    }
    return `${card.title} with expertise in research`;
  };

  const formatEducation = (education) => {
    if (!education) return null;
    
    const formatDegree = (degree) => {
      if (!degree) return null;
      if (typeof degree === 'string') return degree;
      if (typeof degree === 'object' && degree !== null) {
        const parts = [];
        if (degree.degree) parts.push(degree.degree);
        if (degree.institution) parts.push(`from ${degree.institution}`);
        if (degree.year) parts.push(`(${degree.year})`);
        return parts.length > 0 ? parts.join(' ') : null;
      }
      return null;
    };

    return {
      phd: formatDegree(education.phd),
      masters: formatDegree(education.masters),
      bachelors: formatDegree(education.bachelors)
    };
  };

  const getHighestEducation = (education) => {
    const formatted = formatEducation(education);
    if (!formatted) return null;
    
    // Return the highest degree available
    if (formatted.phd) return { type: 'PhD', details: formatted.phd };
    if (formatted.masters) return { type: 'Masters', details: formatted.masters };
    if (formatted.bachelors) return { type: 'Bachelors', details: formatted.bachelors };
    
    return null;
  };

  return (
    <div className="expandable-card-container">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active ? (
          <div className="modal-container">
            <motion.button
              key={`button-${active.name}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="modal-close-btn"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.name}`}
              ref={ref}
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <motion.div layoutId={`image-${active.name}`} className="modal-image-container">
                <img
                  src={getImageSrc(active)}
                  alt={active.name}
                  className="modal-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/e2e8f0/64748b?text=Photo+Not+Available';
                  }}
                />
                <div className="modal-image-overlay">
                  <div className="image-gradient"></div>
                </div>
              </motion.div>

              <div className="modal-body">
                <div className="modal-header">
                  <div className="modal-header-info">
                    <motion.h3
                      layoutId={`title-${active.name}`}
                      className="modal-title"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.title}`}
                      className="modal-subtitle"
                    >
                      {active.title}
                    </motion.p>
                    {active.postAffiliation && (
                      <motion.p 
                        className="modal-affiliation"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {active.postAffiliation}
                      </motion.p>
                    )}
                  </div>

                  <div className="modal-actions">
                    {active.email && (
                      <motion.a
                        layoutId={`button-${active.name}`}
                        href={`mailto:${active.email}`}
                        className="modal-cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact
                      </motion.a>
                    )}
                  </div>
                </div>
                
                <div className="modal-details">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="modal-content-text"
                  >
                    <div className="person-details">
                      {active.bio && (
                        <motion.div 
                          className="bio-section"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4>About</h4>
                          <p className="person-bio">{active.bio}</p>
                        </motion.div>
                      )}
                      
                      {active.research && active.research.length > 0 && (
                        <motion.div 
                          className="research-section"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4>Research Interests</h4>
                          <div className="research-tags">
                            {active.research.map((interest, index) => (
                              <motion.span 
                                key={index} 
                                className="research-tag"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {interest}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {active.education && (
                        <motion.div 
                          className="education-section"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h4>Education</h4>
                          <div className="education-details">
                            {(() => {
                              const formattedEducation = formatEducation(active.education);
                              return (
                                <>
                                  {formattedEducation.phd && (
                                    <div className="education-item">
                                      <span className="degree-type">PhD</span>
                                      <span className="degree-details">{formattedEducation.phd}</span>
                                    </div>
                                  )}
                                  {formattedEducation.masters && (
                                    <div className="education-item">
                                      <span className="degree-type">Masters</span>
                                      <span className="degree-details">{formattedEducation.masters}</span>
                                    </div>
                                  )}
                                  {formattedEducation.bachelors && (
                                    <div className="education-item">
                                      <span className="degree-type">Bachelors</span>
                                      <span className="degree-details">{formattedEducation.bachelors}</span>
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                      
                      {active.publications && active.publications.length > 0 && (
                        <motion.div 
                          className="publications-section"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h4>Recent Publications</h4>
                          <div className="publications-list">
                            {active.publications.slice(0, 5).map((pub, index) => (
                              <motion.div 
                                key={index} 
                                className="publication-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                              >
                                <span className="publication-text">{pub}</span>
                              </motion.div>
                            ))}
                            {active.publications.length > 5 && (
                              <div className="show-more-publications">
                                +{active.publications.length - 5} more publications
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                      
                      {active.achievements && active.achievements.length > 0 && (
                        <motion.div 
                          className="achievements-section"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h4>Achievements & Awards</h4>
                          <div className="achievements-list">
                            {active.achievements.map((achievement, index) => (
                              <motion.div 
                                key={index} 
                                className="achievement-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                              >
                                <svg className="achievement-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <span className="achievement-text">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="card-list">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.name}`}
            key={`card-${card.name}-${index}`}
            onClick={() => setActive(card)}
            className="expandable-card-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <div className="card-content">
              <motion.div layoutId={`image-${card.name}`} className="card-image-container">
                <img
                  src={getImageSrc(card)}
                  alt={card.name}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/280x280/e2e8f0/64748b?text=Photo+Not+Available';
                  }}
                />
                <div className="card-image-overlay">
                  <div className="view-profile-hint">Click to view profile</div>
                </div>
              </motion.div>
              
              <div className="card-info">
                <div className="card-header">
                  <motion.h3
                    layoutId={`title-${card.name}`}
                    className="card-title"
                  >
                    {card.name}
                  </motion.h3>
                  <motion.button
                    layoutId={`description-${card.title}`}
                    className="card-title-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Could add specific functionality here if needed
                    }}
                  >
                    {card.title}
                  </motion.button>
                </div>
                
                {card.postAffiliation && (
                  <div className="card-affiliation">
                    <svg className="affiliation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{card.postAffiliation}</span>
                  </div>
                )}
                
                {card.research && card.research.length > 0 && (
                  <div className="card-research-preview">
                    <div className="research-inline-container">
                      <div className="research-label">Research:</div>
                      <div className="research-tags-container">
                        {card.research.slice(0, 2).map((interest, idx) => (
                          <span key={idx} className="research-preview-tag">{interest}</span>
                        ))}
                        {card.research.length > 2 && (
                          <span className="more-tag">+{card.research.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {card.education && (
                  <div className="card-education-preview">
                    {(() => {
                      const highestEducation = getHighestEducation(card.education);
                      
                      if (!highestEducation) return null;
                      
                      return (
                        <div className="education-preview">
                          <svg className="education-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          <span className="education-text">{highestEducation.details}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}
                
                {card.email && (
                  <div className="card-email">
                    <span>{card.email}</span>
                  </div>
                )}
              </div>
            </div>
            
            <motion.button
              className="card-expand-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Profile
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableCard;