import { useEffect, useRef } from 'react';
import { floatingAnimation, fadeInUp, parallaxEffect } from '../../utils/gsapAnimations';
import heroImage from '../../assets/image.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const robotRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (robotRef.current) {
      floatingAnimation(robotRef.current, 4);
    }

    if (particlesRef.current) {
      parallaxEffect(particlesRef.current, 0.3);
    }

    // Initialize hero animations
    const heroElements = heroRef.current?.querySelectorAll('.hero-content > *');
    if (heroElements) {
      heroElements.forEach((el, index) => {
        fadeInUp(el, index * 0.2);
      });
    }
  }, []);

  const scrollToWelcome = () => {
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToResearch = () => {
    const researchSection = document.getElementById('research');
    if (researchSection) {
      researchSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-image-bg">
          <img src={heroImage} alt="Robotics Background" className="bg-image" />
          <div className="bg-overlay"></div>
          <div className="bg-gradient"></div>
        </div>
        
        <div className="particles" ref={particlesRef}>
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        
        <div className="circuit-lines">
          <svg viewBox="0 0 1200 800" className="circuit-svg">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#646cff" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <path d="M0,400 Q300,200 600,400 T1200,400" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" className="circuit-path"/>
            <path d="M200,100 L200,700 M400,50 L400,750 M800,100 L800,700 M1000,50 L1000,750" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" className="circuit-vertical"/>
            <circle cx="200" cy="400" r="3" fill="#00ffff" className="circuit-node"/>
            <circle cx="600" cy="400" r="3" fill="#646cff" className="circuit-node"/>
            <circle cx="1000" cy="400" r="3" fill="#00ffff" className="circuit-node"/>
          </svg>
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">🤖</span>
              <span>Advanced AI Research</span>
            </div>
            <h1 className="hero-title">
              Next-Generation <span className="gradient-text">Robotics</span> 
              <br />& <span className="gradient-text">AI Systems</span>
            </h1>
            <p className="hero-subtitle">
              Transforming the future through cutting-edge robotics research, 
              artificial intelligence, and autonomous systems that push the boundaries 
              of what's possible in technology and innovation.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Research</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Publications</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Active Projects</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn-primary" onClick={scrollToWelcome}>
                <span>Explore Our Work</span>
                <span className="btn-icon">→</span>
              </button>
              <button className="btn-secondary" onClick={scrollToResearch}>
                <span>View Research</span>
                <span className="btn-icon">📊</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-container" ref={robotRef}>
              <div className="glass-card">
                <div className="hero-image-container">
                  <img 
                    src={heroImage} 
                    alt="Advanced Robotics" 
                    className="hero-image"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                <div className="tech-orbits">
                  <div className="orbit orbit-1">
                    <div className="tech-icon">
                      <span>AI</span>
                    </div>
                  </div>
                  <div className="orbit orbit-2">
                    <div className="tech-icon">
                      <span>CV</span>
                    </div>
                  </div>
                  <div className="orbit orbit-3">
                    <div className="tech-icon">
                      <span>ML</span>
                    </div>
                  </div>
                  <div className="orbit orbit-4">
                    <div className="tech-icon">
                      <span>IoT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span>↓</span>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;

