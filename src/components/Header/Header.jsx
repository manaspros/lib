import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';
import { mobileMenuOpen, mobileMenuClose } from '../../utils/gsapAnimations';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.mobile-nav');
    
    if (isMobileMenuOpen) {
      mobileMenuClose(menu);
    } else {
      mobileMenuOpen(menu);
    }
    
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    // Only scroll to sections that exist on the home page
    const homeSections = ['hero', 'welcome', 'research'];
    
    if (location.pathname === '/' && sectionId && homeSections.includes(sectionId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#646cff"/>
                    <stop offset="100%" stopColor="#00ffff"/>
                  </linearGradient>
                </defs>
                {/* Bird-inspired robot design */}
                <path d="M25 8 L15 15 Q25 20 35 15 Z" stroke="url(#logoGradient)" strokeWidth="2" fill="url(#logoGradient)" fillOpacity="0.3"/>
                {/* Wings */}
                <path d="M15 15 Q10 18 12 25 Q15 20 20 18" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none"/>
                <path d="M35 15 Q40 18 38 25 Q35 20 30 18" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none"/>
                {/* Body */}
                <ellipse cx="25" cy="30" rx="8" ry="12" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
                {/* Tech elements */}
                <circle cx="20" cy="12" r="1.5" fill="url(#logoGradient)"/>
                <circle cx="30" cy="12" r="1.5" fill="url(#logoGradient)"/>
                <line x1="25" y1="25" x2="25" y2="35" stroke="url(#logoGradient)" strokeWidth="1"/>
                <circle cx="25" cy="36" r="2" fill="url(#logoGradient)"/>
              </svg>
            </div>
            <span className="logo-text">BIRD Lab</span>
          </Link>

          <nav className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => {
                  // Only try to scroll if we're staying on home page and section exists
                  if (item.href === '/' || (location.pathname === '/' && item.section)) {
                    scrollToSection(item.section);
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      <div className="mobile-nav">
        <div className="mobile-nav-content">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="nav-item"
              onClick={() => {
                toggleMobileMenu();
                // Only try to scroll if we're staying on home page and section exists
                if (item.href === '/' || (location.pathname === '/' && item.section)) {
                  scrollToSection(item.section);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
