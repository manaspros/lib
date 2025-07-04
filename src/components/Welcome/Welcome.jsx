import { useEffect, useRef } from 'react';
import { staggerAnimation, animateCounter } from '../../utils/gsapAnimations';
import FeaturesSection from '../ui/FeaturesSection';
import './Welcome.css';

const Welcome = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.welcome-card');
      staggerAnimation(elements);
      
      // Animate counters
      const counters = sectionRef.current.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, 0, target, 2);
      });
    }
  }, []);

  return (
    <section id="welcome" className="section welcome" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Welcome to BIRD Lab</h2>
          <p className="section-subtitle">
            Leading the advancement of bio-inspired robotics through innovative research, 
            nature-inspired design, and cutting-edge technology solutions
          </p>
        </div>

        <div className="welcome-content">
          <div className="welcome-grid">
            <div className="welcome-card mission">
              <div className="card-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3"/>
                  <path d="M20 32h24M32 20v24" stroke="currentColor" strokeWidth="3"/>
                  <circle cx="26" cy="26" r="3" fill="currentColor"/>
                  <circle cx="38" cy="38" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To advance bio-inspired robotics research and develop adaptive systems that learn 
                from nature to solve real-world challenges through innovative design and collaboration.
              </p>
            </div>

            <div className="welcome-card vision">
              <div className="card-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 32c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="currentColor" strokeWidth="3"/>
                  <circle cx="32" cy="32" r="4" fill="currentColor"/>
                  <path d="M32 28v-8M32 36v8M28 32h-8M36 32h8" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be a globally recognized center of excellence in bio-inspired robotics, fostering 
                innovation in wearable, collaborative, and reconfigurable robotic systems.
              </p>
            </div>

            <div className="welcome-card values">
              <div className="card-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="32,8 44,28 60,28 48,40 52,56 32,46 12,56 16,40 4,28 20,28" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <circle cx="32" cy="32" r="6" fill="currentColor"/>
                </svg>
              </div>
              <h3>Our Values</h3>
              <p>
                Bio-inspiration, innovation, collaboration, and ethical responsibility guide our research 
                in developing nature-inspired solutions for tomorrow's challenges.
              </p>
            </div>
          </div>

          <FeaturesSection />

          <div className="affiliation">
            <div className="affiliation-content">
              <div className="institution-logo">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="20" width="80" height="60" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <rect x="20" y="30" width="15" height="20" fill="currentColor"/>
                  <rect x="42.5" y="30" width="15" height="20" fill="currentColor"/>
                  <rect x="65" y="30" width="15" height="20" fill="currentColor"/>
                  <rect x="20" y="55" width="60" height="8" fill="currentColor"/>
                  <triangle points="50,5 20,20 80,20" fill="currentColor"/>
                </svg>
              </div>
              <div className="institution-info">
                <h4>Bio-Inspired Robotics Design Lab</h4>
                <p>Department of Robotics and Bio-Engineering</p>
                <div className="accreditation">
                  <span className="badge">ABET Accredited</span>
                  <span className="badge">Bio-Robotics Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
