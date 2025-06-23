import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Lectures.css';

gsap.registerPlugin(ScrollTrigger);

const LECTURES_DATA = [
  {
    id: 1,
    title: "Introduction to Autonomous Systems",
    date: "2024-03-15",
    time: "14:00",
    speaker: "Dr. Sarah Chen",
    type: "seminar",
    status: "upcoming",
    description: "A comprehensive introduction to autonomous robotic systems and their applications in modern industry.",
    location: "Main Auditorium",
    registration: "https://example.com/register/1"
  },
  {
    id: 2,
    title: "Deep Learning for Robotics",
    date: "2024-02-28",
    time: "16:00",
    speaker: "Dr. Michael Rodriguez",
    type: "workshop",
    status: "past",
    description: "Hands-on workshop covering deep learning techniques specifically designed for robotic applications.",
    location: "Lab 301",
    videoUrl: "https://example.com/videos/deep-learning-robotics"
  },
  {
    id: 3,
    title: "Bio-inspired Navigation Systems",
    date: "2024-04-10",
    time: "15:30",
    speaker: "Guest: Prof. Jane Smith",
    type: "guest",
    status: "upcoming",
    description: "Exploring how biological systems inspire navigation algorithms in autonomous robots.",
    location: "Conference Room A",
    registration: "https://example.com/register/3"
  },
  {
    id: 4,
    title: "Swarm Robotics Fundamentals",
    date: "2024-01-20",
    time: "13:00",
    speaker: "Alex Thompson",
    type: "educational",
    status: "past",
    description: "Understanding the principles of swarm intelligence and collective robotic behavior.",
    location: "Virtual Event",
    videoUrl: "https://example.com/videos/swarm-robotics"
  }
];

const Lectures = () => {
  const [lectures] = useState(LECTURES_DATA);
  const [filteredLectures, setFilteredLectures] = useState(LECTURES_DATA);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const lecturesRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Filter lectures
    let filtered = lectures;

    if (selectedType !== 'all') {
      filtered = filtered.filter(lecture => lecture.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(lecture => lecture.status === selectedStatus);
    }

    // Sort by date (upcoming first, then by date)
    filtered.sort((a, b) => {
      if (a.status === 'upcoming' && b.status === 'past') return -1;
      if (a.status === 'past' && b.status === 'upcoming') return 1;
      return new Date(b.date) - new Date(a.date);
    });

    setFilteredLectures(filtered);
  }, [lectures, selectedType, selectedStatus]);

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
  }, [filteredLectures]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      seminar: '📊',
      workshop: '🔧',
      guest: '🎤',
      educational: '📚'
    };
    return icons[type] || '📋';
  };

  const getStatusColor = (status) => {
    return status === 'upcoming' ? '#00ffff' : '#646cff';
  };

  const handleRegister = (registrationUrl) => {
    window.open(registrationUrl, '_blank');
  };

  const handleWatchVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <section id="lectures" className="lectures-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lectures & Events</h2>
          <p className="section-subtitle">
            Join our seminars, workshops, and educational events to advance your knowledge in robotics
          </p>
        </div>

        {/* Filters */}
        <div className="lectures-filters">
          <div className="filter-group">
            <label>Event Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="seminar">Seminars</option>
              <option value="workshop">Workshops</option>
              <option value="guest">Guest Lectures</option>
              <option value="educational">Educational</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past Events</option>
            </select>
          </div>
        </div>

        {/* Lectures Timeline */}
        <div ref={lecturesRef} className="lectures-timeline">
          {filteredLectures.map((lecture, index) => (
            <div
              key={lecture.id}
              ref={el => cardsRef.current[index] = el}
              className={`lecture-card ${lecture.status}`}
            >
              <div className="lecture-indicator">
                <div 
                  className="indicator-dot"
                  style={{ backgroundColor: getStatusColor(lecture.status) }}
                ></div>
              </div>

              <div className="lecture-content">
                <div className="lecture-header">
                  <div className="lecture-meta">
                    <span className="lecture-type">
                      {getTypeIcon(lecture.type)} {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)}
                    </span>
                    <span 
                      className={`lecture-status ${lecture.status}`}
                    >
                      {lecture.status.charAt(0).toUpperCase() + lecture.status.slice(1)}
                    </span>
                  </div>
                  <div className="lecture-date-time">
                    <div className="lecture-date">{formatDate(lecture.date)}</div>
                    <div className="lecture-time">{lecture.time}</div>
                  </div>
                </div>

                <h3 className="lecture-title">{lecture.title}</h3>
                
                <div className="lecture-speaker">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {lecture.speaker}
                </div>

                <div className="lecture-location">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {lecture.location}
                </div>

                <p className="lecture-description">{lecture.description}</p>

                <div className="lecture-actions">
                  {lecture.status === 'upcoming' && lecture.registration && (
                    <button
                      onClick={() => handleRegister(lecture.registration)}
                      className="action-btn register-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      Register
                    </button>
                  )}
                  
                  {lecture.status === 'past' && lecture.videoUrl && (
                    <button
                      onClick={() => handleWatchVideo(lecture.videoUrl)}
                      className="action-btn video-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Watch Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLectures.length === 0 && (
          <div className="no-results">
            <p>No lectures found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Lectures;
