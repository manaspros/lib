import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TracingBeam } from '../ui/TracingBeam';
import './Lectures.css';

gsap.registerPlugin(ScrollTrigger);

const COURSES_DATA = [
  {
    id: 1,
    code: "CSL7570",
    title: "Introduction to Augmented Reality and Virtual Reality",
    credits: "3 (3-0-0)",
    department: "AIDE",
    type: "postgraduate",
    description: "Comprehensive introduction to AR/VR technologies, their applications, and development frameworks."
  },
  {
    id: 2,
    code: "MEL7080",
    title: "Robotics",
    credits: "3-0-2",
    department: "IDRP-RMS",
    type: "postgraduate",
    description: "Advanced robotics concepts covering kinematics, dynamics, control systems, and robot programming."
  },
  {
    id: 3,
    code: "RML6010",
    title: "Introduction to Robotics",
    credits: "3 (3-0-0)",
    department: "IDRP-RMS",
    type: "undergraduate",
    description: "Fundamental concepts of robotics including robot anatomy, sensors, actuators, and basic programming."
  },
  {
    id: 4,
    code: "SHL7350",
    title: "Wearable Devices",
    credits: "2",
    department: "MedTech",
    type: "postgraduate",
    description: "Design and development of wearable technology for healthcare and fitness monitoring applications."
  },
  {
    id: 5,
    code: "MEL6080",
    title: "Mechatronics",
    credits: "3 (2-0-2)",
    department: "ME",
    type: "undergraduate",
    description: "Integration of mechanical, electrical, and computer engineering in automated systems design."
  },
  {
    id: 6,
    code: "RML7360",
    title: "Tele Robotics",
    credits: "3",
    department: "IDRP-RMS",
    type: "postgraduate",
    description: "Remote control and operation of robotic systems, including telepresence and teleoperation technologies."
  }
];

const Lectures = () => {
  const [courses] = useState(COURSES_DATA);
  const [filteredCourses, setFilteredCourses] = useState(COURSES_DATA);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const lecturesRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Filter courses
    let filtered = courses;

    if (selectedType !== 'all') {
      filtered = filtered.filter(course => course.type === selectedType);
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(course => course.department === selectedDepartment);
    }

    setFilteredCourses(filtered);
  }, [courses, selectedType, selectedDepartment]);

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
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lecturesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [filteredCourses]);

  const getDepartmentIcon = (department) => {
    const icons = {
      'AIDE': '🤖',
      'IDRP-RMS': '🔬',
      'MedTech': '⚕️',
      'ME': '⚙️'
    };
    return icons[department] || '📚';
  };

  const getTypeColor = (type) => {
    return type === 'postgraduate' ? '#00ffff' : '#646cff';
  };

  return (
    <section id="lectures" className="lectures-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Courses & Curriculum</h2>
          <p className="section-subtitle">
            Explore our comprehensive course offerings in robotics, mechatronics, and related technologies
          </p>
        </div>

        {/* Filters */}
        <div className="lectures-filters">
          <div className="filter-group">
            <label>Course Level:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Department:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Departments</option>
              <option value="AIDE">AIDE</option>
              <option value="IDRP-RMS">IDRP-RMS</option>
              <option value="MedTech">MedTech</option>
              <option value="ME">ME</option>
            </select>
          </div>
        </div>

        {/* Courses Timeline with TracingBeam */}
        <TracingBeam className="lectures-tracing-beam">
          <div ref={lecturesRef} className="lectures-timeline-content">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                ref={el => cardsRef.current[index] = el}
                className={`lecture-item course`}
              >
                <div className="lecture-badge">
                  <span className="lecture-type-badge">
                    {getDepartmentIcon(course.department)} {course.department}
                  </span>
                  <span 
                    className={`lecture-status-badge ${course.type}`}
                    style={{ backgroundColor: getTypeColor(course.type) }}
                  >
                    {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                  </span>
                </div>

                <div className="lecture-content-card">
                  <div className="lecture-header">
                    <div className="course-code-credits">
                      <div className="course-code">{course.code}</div>
                      <div className="course-credits">{course.credits} Credits</div>
                    </div>
                  </div>

                  <h3 className="lecture-title">{course.title}</h3>
                  
                  <div className="lecture-meta-info">
                    <div className="lecture-speaker">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                      {course.department}
                    </div>

                    <div className="lecture-location">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      {course.type.charAt(0).toUpperCase() + course.type.slice(1)} Level
                    </div>
                  </div>

                  <p className="lecture-description">{course.description}</p>

                  <div className="lecture-actions">
                    <button className="action-btn register-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                      Course Details
                    </button>
                    
                    <button className="action-btn video-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.12,16.5 8.91,15.71C9.71,14.93 10.59,14.29 11.5,13.82C9.91,13.05 8.83,11.36 8.83,9.4C8.83,6.95 10.8,4.96 13.26,4.96C15.72,4.96 17.69,6.95 17.69,9.4A4.54,4.54 0 0,1 13.26,13.95C14.17,14.29 15.05,14.93 15.84,15.71C16.64,16.5 17.26,17.38 17.69,18.28C16.89,19.23 15.73,19.94 14.42,20.34C13.95,20.47 13.46,20.54 12.95,20.54C12.44,20.54 11.95,20.47 11.48,20.34C10.17,19.94 9.01,19.23 8.21,18.28H7.07Z"/>
                      </svg>
                      Enrollment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <p>No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Lectures;