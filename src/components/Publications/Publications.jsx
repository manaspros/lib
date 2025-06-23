import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLICATIONS } from '../../utils/constants';
import './Publications.css';

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const [publications] = useState(PUBLICATIONS);
  const [filteredPubs, setFilteredPubs] = useState(PUBLICATIONS);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const pubsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Filter publications
    let filtered = publications;

    if (selectedYear !== 'all') {
      filtered = filtered.filter(pub => pub.year.toString() === selectedYear);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(pub => pub.type.toLowerCase() === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPubs(filtered);
  }, [publications, selectedYear, selectedType, searchTerm]);

  useEffect(() => {
    // GSAP animations
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pubsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [filteredPubs]);

  const getUniqueYears = () => {
    const years = publications.map(pub => pub.year);
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const getUniqueTypes = () => {
    const types = publications.map(pub => pub.type.toLowerCase());
    return [...new Set(types)];
  };

  const handleDownload = (pdfUrl) => {
    // In a real implementation, this would handle PDF downloads
    window.open(pdfUrl, '_blank');
  };

  const copyCitation = (publication) => {
    const citation = `${publication.authors.join(', ')}. "${publication.title}." ${publication.venue}, ${publication.year}.`;
    navigator.clipboard.writeText(citation);
    // You could add a toast notification here
  };

  return (
    <section id="publications" className="publications-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Publications</h2>
          <p className="section-subtitle">
            Our latest research contributions and academic publications
          </p>
        </div>

        {/* Filters and Search */}
        <div className="publications-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>

          <div className="filter-controls">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Years</option>
              {getUniqueYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              {getUniqueTypes().map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        <div ref={pubsRef} className="publications-grid">
          {filteredPubs.map((publication, index) => (
            <div
              key={`${publication.title}-${index}`}
              ref={el => cardsRef.current[index] = el}
              className="publication-card"
            >
              <div className="publication-header">
                <span className={`publication-type ${publication.type.toLowerCase()}`}>
                  {publication.type}
                </span>
                <span className="publication-year">{publication.year}</span>
              </div>

              <h3 className="publication-title">{publication.title}</h3>
              
              <div className="publication-authors">
                {publication.authors.join(', ')}
              </div>

              <div className="publication-venue">{publication.venue}</div>

              {publication.abstract && (
                <div className="publication-abstract">
                  <p>{publication.abstract}</p>
                </div>
              )}

              <div className="publication-actions">
                <button
                  onClick={() => handleDownload(publication.pdf)}
                  className="action-btn download-btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                  </svg>
                  PDF
                </button>
                
                <button
                  onClick={() => copyCitation(publication)}
                  className="action-btn cite-btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  Cite
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPubs.length === 0 && (
          <div className="no-results">
            <p>No publications found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
