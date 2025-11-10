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
              <img src="/logo.jpeg" alt="Bird Lab Logo" style={{ height: 40, width: 40 }} />
            </div>
            <span className="logo-text">BIRD</span>
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