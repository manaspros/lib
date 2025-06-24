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
                {/* Robot head */}
                <rect x="15" y="12" width="20" height="18" rx="4" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
                {/* Eyes */}
                <circle cx="21" cy="19" r="2" fill="url(#logoGradient)"/>
                <circle cx="29" cy="19" r="2" fill="url(#logoGradient)"/>
                {/* Antenna */}
                <line x1="25" y1="12" x2="25" y2="8" stroke="url(#logoGradient)" strokeWidth="2"/>
                <circle cx="25" cy="6" r="2" fill="url(#logoGradient)"/>
                {/* Body */}
                <rect x="18" y="30" width="14" height="12" rx="2" stroke="url(#logoGradient)" strokeWidth="2" fill="none"/>
                {/* Arms */}
                <line x1="15" y1="33" x2="10" y2="33" stroke="url(#logoGradient)" strokeWidth="2"/>
                <line x1="35" y1="33" x2="40" y2="33" stroke="url(#logoGradient)" strokeWidth="2"/>
                <circle cx="8" cy="33" r="2" fill="url(#logoGradient)"/>
                <circle cx="42" cy="33" r="2" fill="url(#logoGradient)"/>
                {/* Connection lines */}
                <line x1="25" y1="30" x2="25" y2="30" stroke="url(#logoGradient)" strokeWidth="1"/>
              </svg>
            </div>
            <span className="logo-text">RoboLab</span>
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
