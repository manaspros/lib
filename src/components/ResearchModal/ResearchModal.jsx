import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ResearchModal.css';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_PROJECTS = [
  { name: "Sample Project 1", image: "/assets/image.png" },
  { name: "Sample Project 2", image: "/assets/image.png" },
  { name: "Sample Project 3", image: "/assets/image.png" }
];

const DEMO_TECHNOLOGIES = [
  "Deep Learning", "ROS", "3D Printing", "Embedded Systems"
];

const DEMO_PROJECT_INFO = {
  description: "This is a demonstration project to showcase the modal functionality. Replace with real project data.",
  status: "Demo Status",
  teamSize: "2-4 Demo Members",
  duration: "1 Year (Demo)"
};

const ResearchModal = ({ isOpen, onClose, researchArea }) => {
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    if (isOpen && researchArea && scrollContainerRef.current) {
      // Remove parallax for a cleaner, more modern look
      return () => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.scroller === scrollContainerRef.current) {
            trigger.kill();
          }
        });
      };
    }
  }, [isOpen, researchArea]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getProjectImage = (projectName, areaTitle) => {
    // Map projects to their respective images
    const imageMap = {
      'Bio-inspired Mechanisms': {
        'Bio-inspired Muscles-TSA': '/assets/BioinspiresTSA.png',
        'Artificial muscle-based robotic finger': '/assets/first2.png',
        'Artificial muscle-based Robotic hand': '/assets/first3.png',
        'Hawk Gripper': '/assets/first5.png',
        'Bio-inspired Cat-Leap Parkour Rolling Mechanism': '/assets/wing.png'
      },
      'Wearable Robotics (Bio-signal-controlled Robotics)': {
        'Exoskeleton': '/assets/second1.png',
        'Exosuits': '/assets/image.png',
        'Prosthetic Limbs': '/assets/JaipurFoot.png',
        'Supernumerary Robotic Limbs': '/assets/blbg.png'
      },
      'Reconfigurable and Growing Robotics': {
        'Foldable Supernumerary Robotic Arms': '/assets/blbg.png',
        'Extendable Drone Arm': '/assets/first2.png',
        'Extendable Space Arm': '/assets/wing.png'
      },
      'Tele-Robotics and Haptics': {
        'Master device': '/assets/first3.png',
        'Slave Device': '/assets/second1.png',
        'Haptic feedback': '/assets/first5.png'
      },
      'Applied AI in Robotics': {
        'Computer Vision for Robotics': '/assets/image.png',
        'Machine Learning Models': '/assets/blbg.png',
        'Autonomous Decision Making': '/assets/wing.png'
      }
    };

    return imageMap[areaTitle]?.[projectName] || '/assets/image.png';
  };

  const getProjectDescription = (projectName, areaTitle) => {
    const descriptionMap = {
      'Bio-inspired Mechanisms': {
        'Bio-inspired Muscles-TSA': 'Revolutionary twisted and coiled actuators inspired by biological muscle fibers for enhanced robotic movement.',
        'Artificial muscle-based robotic finger': 'Advanced finger mechanisms using artificial muscle technology for precise manipulation tasks.',
        'Artificial muscle-based Robotic hand': 'Complete robotic hand system with bio-inspired muscle actuators for natural grasping motions.',
        'Hawk Gripper': 'Bird-inspired gripping mechanism designed for versatile object manipulation and aerial robotics.',
        'Bio-inspired Cat-Leap Parkour Rolling Mechanism': 'Dynamic locomotion system inspired by feline agility for advanced robotic mobility.'
      },
      'Wearable Robotics (Bio-signal-controlled Robotics)': {
        'Exoskeleton': 'Full-body robotic exoskeleton systems for human augmentation and rehabilitation applications.',
        'Exosuits': 'Lightweight, soft robotic suits providing assistive force for human movement enhancement.',
        'Prosthetic Limbs': 'Advanced prosthetic devices with neural control interfaces for natural limb replacement.',
        'Supernumerary Robotic Limbs': 'Additional robotic limbs that work alongside human arms for enhanced manipulation capabilities.'
      },
      'Reconfigurable and Growing Robotics': {
        'Foldable Supernumerary Robotic Arms': 'Compact, deployable robotic arms that can be folded and unfolded as needed.',
        'Extendable Drone Arm': 'Telescopic robotic arms for aerial vehicles enabling extended reach and manipulation.',
        'Extendable Space Arm': 'Space-qualified robotic arms with extending capabilities for satellite servicing and space exploration.'
      },
      'Tele-Robotics and Haptics': {
        'Master device': 'Haptic control interfaces allowing operators to feel and manipulate remote robotic systems.',
        'Slave Device': 'Remote robotic systems that replicate operator movements with high precision and fidelity.',
        'Haptic feedback': 'Advanced force feedback systems providing tactile sensation for remote robotic operations.'
      },
      'Applied AI in Robotics': {
        'Computer Vision for Robotics': 'AI-powered vision systems enabling robots to understand and interact with their environment.',
        'Machine Learning Models': 'Advanced ML algorithms for robotic decision making and autonomous behavior.',
        'Autonomous Decision Making': 'Intelligent systems allowing robots to make complex decisions in dynamic environments.'
      }
    };

    return descriptionMap[areaTitle]?.[projectName] || 'Advanced research project exploring innovative robotics technologies.';
  };

  if (!researchArea) return null;

  const isRealProjects = researchArea.projects && researchArea.projects.length > 0;
  const projects = isRealProjects
    ? researchArea.projects
    : PLACEHOLDER_PROJECTS.map(p => p.name);

  // Use real or demo technologies
  const technologies = (researchArea.technologies && researchArea.technologies.length > 0)
    ? researchArea.technologies
    : DEMO_TECHNOLOGIES;

  // Helper for project thumbnail
  const getThumb = (project, area) => {
    const placeholder = PLACEHOLDER_PROJECTS.find(p => p.name === project);
    if (placeholder) return placeholder.image;
    return getProjectImage(project, area);
  };

  // Helper for project info (real or demo)
  const getProjectInfo = (project, area) => {
    const isPlaceholder = PLACEHOLDER_PROJECTS.some(p => p.name === project);
    if (isPlaceholder) {
      return {
        image: PLACEHOLDER_PROJECTS.find(p => p.name === project).image,
        title: project,
        description: DEMO_PROJECT_INFO.description,
        status: DEMO_PROJECT_INFO.status,
        teamSize: DEMO_PROJECT_INFO.teamSize,
        duration: DEMO_PROJECT_INFO.duration
      };
    }
    return {
      image: getProjectImage(project, area),
      title: project,
      description: getProjectDescription(project, area),
      status: "Active Research",
      teamSize: "3-5 Researchers",
      duration: "2-3 Years"
    };
  };

  const projectInfo = getProjectInfo(projects[activeProject], researchArea.title);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="research-modal-overlay"
          style={{ zIndex: 99999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          ref={modalRef}
        >
          <motion.div
            className="research-modal redesigned"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="modal-header redesigned">
              <div className="modal-title-section redesigned">
                <div className="modal-icon redesigned">
                  <span>{researchArea.icon || '🔬'}</span>
                </div>
                <div>
                  <h2 className="modal-title redesigned">{researchArea.title || 'Research Area'}</h2>
                  <p className="modal-subtitle redesigned">{researchArea.description || 'Research description not available'}</p>
                </div>
              </div>
              <button className="modal-close redesigned" onClick={onClose} aria-label="Close">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#00ffff" strokeWidth="2" fill="rgba(0,0,0,0.2)" />
                  <path d="M18 10L10 18M10 10l8 8" stroke="#00ffff" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            {/* Split Layout */}
            <div className="modal-main-layout">
              {/* Sidebar: Project List */}
              <aside className="modal-sidebar">
                <h4 className="sidebar-title">Projects</h4>
                <div className="sidebar-projects-list">
                  {projects.map((project, idx) => (
                    <button
                      key={idx}
                      className={`sidebar-project-btn${activeProject === idx ? ' active' : ''}`}
                      onClick={() => setActiveProject(idx)}
                    >
                      <img
                        src={getThumb(project, researchArea.title)}
                        alt={project}
                        className="sidebar-project-thumb"
                      />
                      <span className="sidebar-project-name">{project}</span>
                    </button>
                  ))}
                </div>
              </aside>
              {/* Main Content */}
              <section className="modal-content redesigned" ref={scrollContainerRef}>
                <motion.div
                  key={activeProject}
                  className="project-card"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="project-image-wrap">
                    <img
                      src={projectInfo.image}
                      alt={projectInfo.title}
                      className="project-image"
                    />
                  </div>
                  <div className="project-info redesigned">
                    <h3 className="project-title redesigned">{projectInfo.title}</h3>
                    <p className="project-description redesigned">
                      {projectInfo.description}
                    </p>
                    <div className="project-details redesigned">
                      <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className="detail-value">{projectInfo.status}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Team Size</span>
                        <span className="detail-value">{projectInfo.teamSize}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{projectInfo.duration}</span>
                      </div>
                    </div>
                    <div className="project-actions redesigned">
                      <button className="action-btn primary redesigned">
                        View Publications
                      </button>
                      <button className="action-btn secondary redesigned">
                        Contact Team
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* Technologies Section */}
                {technologies.length > 0 && (
                  <div className="technologies-section redesigned">
                    <h3>Key Technologies</h3>
                    <div className="tech-grid redesigned">
                      {technologies.map((tech, idx) => (
                        <div key={idx} className="tech-card redesigned">
                          <h4>{tech}</h4>
                          <p>Advanced implementation in our research projects</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResearchModal;