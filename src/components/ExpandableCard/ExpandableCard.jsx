import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
            >
              <motion.div layoutId={`image-${active.name}`}>
                <img
                  src={active.image}
                  alt={active.name}
                  className="modal-image"
                />
              </motion.div>

              <div className="modal-body">
                <div className="modal-header">
                  <div>
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
                  </div>

                  <motion.a
                    layoutId={`button-${active.name}`}
                    href={`mailto:${active.email}`}
                    className="modal-cta-btn"
                  >
                    Contact
                  </motion.a>
                </div>
                
                <div className="modal-details">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-content-text"
                  >
                    <div className="person-details">
                      <p className="person-bio">{active.bio}</p>
                      
                      <div className="research-section">
                        <h4>Research Interests:</h4>
                        <div className="research-tags">
                          {active.research.map((interest, index) => (
                            <span key={index} className="research-tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                      
                      {active.publications && (
                        <div className="publications-section">
                          <h4>Recent Publications:</h4>
                          <ul className="publications-list">
                            {active.publications.map((pub, index) => (
                              <li key={index}>{pub}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {active.achievements && (
                        <div className="achievements-section">
                          <h4>Achievements:</h4>
                          <ul className="achievements-list">
                            {active.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
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
          >
            <div className="card-content">
              <motion.div layoutId={`image-${card.name}`} className="card-image-container">
                <img
                  src={card.image}
                  alt={card.name}
                  className="card-image"
                />
              </motion.div>
              
              <div className="card-info">
                <motion.h3
                  layoutId={`title-${card.name}`}
                  className="card-title"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.title}`}
                  className="card-subtitle"
                >
                  {card.title}
                </motion.p>
                <div className="card-research-preview">
                  {card.research.slice(0, 2).map((interest, idx) => (
                    <span key={idx} className="research-preview-tag">{interest}</span>
                  ))}
                  {card.research.length > 2 && <span className="more-tag">+{card.research.length - 2} more</span>}
                </div>
              </div>
            </div>
            
            <motion.button
              layoutId={`button-${card.name}`}
              className="card-expand-btn"
            >
              View Profile
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableCard;
