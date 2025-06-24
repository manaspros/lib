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
          <h2 className="section-title">Welcome to Our Laboratory</h2>
          <p className="section-subtitle">
            Leading the advancement of robotics and autonomous systems through innovative research and cutting-edge technology
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
                To push the boundaries of robotics research and develop autonomous systems that can 
                solve real-world challenges while advancing scientific understanding in the field.
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
                To be a globally recognized center of excellence in robotics research, fostering 
                innovation and training the next generation of robotics engineers and researchers.
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
                Innovation, collaboration, excellence, and ethical responsibility guide our research 
                efforts and shape our contributions to the robotics community.
              </p>
            </div>
          </div>

          <FeaturesSection />

          <div className="lab-highlights">
            <div className="highlight-grid">
              <div className="highlight-item">
                <div className="highlight-number">
                  <span className="counter" data-target="15">0</span>+
                </div>
                <div className="highlight-label">Years of Excellence</div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-number">
                  <span className="counter" data-target="50">0</span>+
                </div>
                <div className="highlight-label">Research Publications</div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-number">
                  <span className="counter" data-target="25">0</span>+
                </div>
                <div className="highlight-label">Active Projects</div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-number">
                  <span className="counter" data-target="100">0</span>+
                </div>
                <div className="highlight-label">Collaborations</div>
              </div>
            </div>
          </div>

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
                <h4>Institute of Technology</h4>
                <p>Department of Robotics and Autonomous Systems</p>
                <div className="accreditation">
                  <span className="badge">ABET Accredited</span>
                  <span className="badge">Research Excellence</span>
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
