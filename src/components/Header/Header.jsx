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
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        const menu = document.querySelector('.mobile-nav');
        if (isMobileMenuOpen) {
            mobileMenuClose(menu);
        } else {
            mobileMenuOpen(menu);
        }
        setIsMobileMenuOpen(prev => !prev);
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

    const renderDesktopLinks = () => {
        return NAV_ITEMS.map((item) => (
            <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => {
                    if (item.href === '/' || (location.pathname === '/' && item.section)) {
                        scrollToSection(item.section);
                    }
                }}
            >
                {item.label}
            </Link>
        ));
    };

    const renderMobileLinks = () => {
        return NAV_ITEMS.map(item => (
            <Link
                key={item.label}
                to={item.href}
                className="nav-item"
                onClick={() => {
                    toggleMobileMenu();
                }}
            >
                {item.label}
            </Link>
        ));
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <div className="logo-icon">
                            <img
                                src="/logo.jpeg"
                                alt="Bird Lab Logo"
                                style={{ height: 40, width: 40 }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                        <span className="logo-text">BIRDLab</span>
                    </Link>

                    <nav className="desktop-nav" aria-label="Primary">
                        {renderDesktopLinks()}
                    </nav>

                    <button
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                </div>
            </div>

            <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
                <div className="mobile-nav-content">
                    {renderMobileLinks()}
                </div>
            </div>
        </header>
    );
};

export default Header;