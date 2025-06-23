import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Positions.css';

gsap.registerPlugin(ScrollTrigger);

const POSITIONS_DATA = [
  {
    id: 1,
    title: "PhD Position in Autonomous Robotics",
    type: "PhD",
    department: "Computer Science & Engineering",
    deadline: "2024-04-30",
    startDate: "Fall 2024",
    funding: "Full funding including stipend and tuition",
    requirements: [
      "Master's degree in Computer Science, Electrical Engineering, or related field",
      "Strong background in robotics, machine learning, or control systems",
      "Programming experience in Python, C++, or ROS",
      "Research experience preferred"
    ],
    responsibilities: [
      "Conduct cutting-edge research in autonomous robotic systems",
      "Develop and implement novel algorithms for robot navigation",
      "Collaborate with interdisciplinary research teams",
      "Publish research findings in top-tier conferences and journals"
    ],
    contact: "applications@roboticslab.edu",
    applicationUrl: "https://example.com/apply/phd-1"
  },
  {
    id: 2,
    title: "Postdoctoral Research Associate",
    type: "Postdoc",
    department: "Robotics Laboratory",
    deadline: "2024-05-15",
    startDate: "Immediate",
    funding: "Competitive salary with benefits",
    requirements: [
      "PhD in Robotics, Computer Science, or related field",
      "Proven track record of publications in robotics/AI",
      "Experience with deep learning frameworks (TensorFlow, PyTorch)",
      "Strong analytical and problem-solving skills"
    ],
    responsibilities: [
      "Lead research projects in bio-inspired robotics",
      "Mentor PhD and undergraduate students",
      "Secure external funding through grant proposals",
      "Represent the lab at international conferences"
    ],
    contact: "postdoc@roboticslab.edu",
    applicationUrl: "https://example.com/apply/postdoc-1"
  },
  {
    id: 3,
    title: "Research Internship - Computer Vision",
    type: "Internship",
    department: "Computer Vision Lab",
    deadline: "2024-03-31",
    startDate: "Summer 2024",
    funding: "Paid internship with housing assistance",
    requirements: [
      "Undergraduate or graduate student in relevant field",
      "Experience with computer vision libraries (OpenCV, etc.)",
      "Knowledge of machine learning concepts",
      "Minimum 10-week commitment"
    ],
    responsibilities: [
      "Assist in developing vision-based robot perception systems",
      "Implement and test computer vision algorithms",
      "Participate in weekly research meetings",
      "Prepare technical presentations and reports"
    ],
    contact: "internships@roboticslab.edu",
    applicationUrl: "https://example.com/apply/intern-1"
  },
  {
    id: 4,
    title: "Visiting Research Scholar",
    type: "Visiting",
    department: "Advanced Robotics Division",
    deadline: "Rolling basis",
    startDate: "Flexible",
    funding: "Self-funded or external fellowship",
    requirements: [
      "PhD degree or equivalent research experience",
      "Independent research capability",
      "Alignment with lab research interests",
      "Minimum 6-month commitment"
    ],
    responsibilities: [
      "Conduct independent research projects",
      "Collaborate with lab members on joint projects",
      "Share expertise through seminars and workshops",
      "Contribute to lab publications and proposals"
    ],
    contact: "visiting@roboticslab.edu",
    applicationUrl: "https://example.com/apply/visiting-1"
  }
];

const Positions = () => {
  const [positions] = useState(POSITIONS_DATA);
  const [filteredPositions, setFilteredPositions] = useState(POSITIONS_DATA);
  const [selectedType, setSelectedType] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const positionsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Filter positions
    let filtered = positions;

    if (selectedType !== 'all') {
      filtered = filtered.filter(position => position.type.toLowerCase() === selectedType);
    }

    setFilteredPositions(filtered);
  }, [positions, selectedType]);

  useEffect(() => {
    // GSAP animations
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: positionsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [filteredPositions]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlineClose = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const handleApply = (applicationUrl) => {
    window.open(applicationUrl, '_blank');
  };

  const toggleExpand = (positionId) => {
    setExpandedCard(expandedCard === positionId ? null : positionId);
  };

  const getTypeColor = (type) => {
    const colors = {
      'phd': '#646cff',
      'postdoc': '#00ffff',
      'internship': '#10b981',
      'visiting': '#f59e0b'
    };
    return colors[type.toLowerCase()] || '#646cff';
  };

  return (
    <section id="positions" className="positions-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">
            Join our research team and contribute to cutting-edge robotics research
          </p>
        </div>

        {/* Filter */}
        <div className="positions-filter">
          <div className="filter-group">
            <label>Position Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Positions</option>
              <option value="phd">PhD Positions</option>
              <option value="postdoc">Postdoc</option>
              <option value="internship">Internships</option>
              <option value="visiting">Visiting Scholar</option>
            </select>
          </div>
        </div>

        {/* Positions Grid */}
        <div ref={positionsRef} className="positions-grid">
          {filteredPositions.map((position, index) => (
            <div
              key={position.id}
              ref={el => cardsRef.current[index] = el}
              className={`position-card ${expandedCard === position.id ? 'expanded' : ''}`}
            >
              <div className="position-header">
                <div className="position-meta">
                  <span 
                    className="position-type"
                    style={{ backgroundColor: getTypeColor(position.type) }}
                  >
                    {position.type}
                  </span>
                  {isDeadlineClose(position.deadline) && (
                    <span className="deadline-warning">
                      ⚠️ Deadline Soon
                    </span>
                  )}
                </div>
                <h3 className="position-title">{position.title}</h3>
                <div className="position-department">{position.department}</div>
              </div>

              <div className="position-summary">
                <div className="summary-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <div>
                    <div className="summary-label">Application Deadline</div>
                    <div className="summary-value">{formatDate(position.deadline)}</div>
                  </div>
                </div>

                <div className="summary-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <div className="summary-label">Start Date</div>
                    <div className="summary-value">{position.startDate}</div>
                  </div>
                </div>

                <div className="summary-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  <div>
                    <div className="summary-label">Funding</div>
                    <div className="summary-value">{position.funding}</div>
                  </div>
                </div>
              </div>

              <button
                className="expand-btn"
                onClick={() => toggleExpand(position.id)}
              >
                {expandedCard === position.id ? 'Show Less' : 'Show Details'}
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className={expandedCard === position.id ? 'rotated' : ''}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>

              {expandedCard === position.id && (
                <div className="position-details">
                  <div className="details-section">
                    <h4>Requirements</h4>
                    <ul>
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="details-section">
                    <h4>Responsibilities</h4>
                    <ul>
                      {position.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="contact-info">
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span>Contact: {position.contact}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(position.applicationUrl)}
                    className="apply-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <div className="no-results">
            <p>No open positions found matching your criteria.</p>
            <p>Check back regularly for new opportunities or contact us directly.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Positions;
