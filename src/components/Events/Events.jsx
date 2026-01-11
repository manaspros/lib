import { useEffect, useRef, useState } from 'react';
import { staggerAnimation } from '../../utils/gsapAnimations';
import './Events.css';

const Events = () => {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "International Robotics Conference 2025",
      date: "March 15-17, 2025",
      location: "IIT Jodhpur, India",
      description: "Join us for our annual robotics conference featuring keynote speakers, workshops, and demonstrations of cutting-edge bio-inspired robotics research.",
      image: "https://via.placeholder.com/600x400/646cff/ffffff?text=Robotics+Conference",
      category: "Conference",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Workshop on Wearable Robotics",
      date: "February 10, 2025",
      location: "BIRD Lab, IIT Jodhpur",
      description: "Hands-on workshop covering the latest developments in wearable robotics, exoskeletons, and bio-signal controlled systems.",
      image: "https://via.placeholder.com/600x400/10b981/ffffff?text=Wearable+Robotics",
      category: "Workshop",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Guest Lecture: Dr. Sarah Chen",
      date: "January 28, 2025",
      location: "Online",
      description: "Distinguished lecture on 'Future of Bio-Inspired Mechanisms' by Dr. Sarah Chen from MIT.",
      image: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Guest+Lecture",
      category: "Lecture",
      status: "Upcoming"
    },
    {
      id: 4,
      title: "BIRD Lab Open House 2024",
      date: "December 5, 2024",
      location: "BIRD Lab, IIT Jodhpur",
      description: "Successfully hosted our annual open house event showcasing student projects, research demonstrations, and lab tours.",
      image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Open+House",
      category: "Event",
      status: "Past"
    },
    {
      id: 5,
      title: "ICRA 2024 Participation",
      date: "May 13-17, 2024",
      location: "Yokohama, Japan",
      description: "Our team presented 3 papers at the International Conference on Robotics and Automation, receiving best paper award for work on reconfigurable robotics.",
      image: "https://via.placeholder.com/600x400/ef4444/ffffff?text=ICRA+2024",
      category: "Conference",
      status: "Past"
    }
  ]);

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.event-card');
      staggerAnimation(cards);
    }
  }, [filter]);

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(event => event.status === filter);

  const categories = ['All', 'Upcoming', 'Past'];

  return (
    <section id="events" className="section events" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recent Events</h2>
          <p className="section-subtitle">
            Stay updated with our latest conferences, workshops, and academic activities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="events-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="event-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-category-badge">{event.category}</div>
                <div className={`event-status-badge ${event.status.toLowerCase()}`}>
                  {event.status}
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>

                <div className="event-meta">
                  <div className="event-meta-item">
                    <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>

                  <div className="event-meta-item">
                    <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <p>No events found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
