import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import googleScholarService from '../../services/scholarPublications';
import './Publications.css';

gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [filteredPubs, setFilteredPubs] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCitations: 0,
    hIndex: 0,
    i10Index: 0,
    journalCount: 0,
    conferenceCount: 0
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cacheInfo, setCacheInfo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Show 10 by default (was missing before)
  const pubsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [pubs, pubStats] = await Promise.all([
          googleScholarService.getPublications('3KZSSEIAAAAJ'),
          googleScholarService.getStats()
        ]);
        setPublications(pubs);
        setStats(pubStats);
        setFilteredPubs(pubs);
        setCacheInfo(googleScholarService.getCacheInfo());
        setLastUpdated(new Date().toLocaleString());
      } catch {
        setPublications([]);
        setFilteredPubs([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const pubs = await googleScholarService.refreshData('3KZSSEIAAAAJ');
      const pubStats = await googleScholarService.getStats();
      setPublications(pubs);
      setStats(pubStats);
      setFilteredPubs(pubs);
      setCacheInfo(googleScholarService.getCacheInfo());
      setLastUpdated(new Date().toLocaleString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = publications;
    if (selectedYear !== 'all') {
      filtered = filtered.filter(pub => pub.year && pub.year.toString() === selectedYear);
    }
    if (selectedType !== 'all') {
      filtered = filtered.filter(pub => pub.type && pub.type.toLowerCase() === selectedType);
    }
    if (searchTerm) {
      filtered = filtered.filter(pub =>
        (pub.title && pub.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof pub.authors === 'string'
          ? pub.authors.toLowerCase().includes(searchTerm.toLowerCase())
          : Array.isArray(pub.authors)
            ? pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
            : false) ||
        (pub.journal && pub.journal.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredPubs(filtered);
  }, [publications, selectedYear, selectedType, searchTerm]);

  useEffect(() => {
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
    const years = publications.map(pub => pub.year).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const getUniqueTypes = () => {
    const types = publications.map(pub => (pub.type || "Other").toLowerCase());
    return [...new Set(types)];
  };

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) window.open(pdfUrl, '_blank');
  };

  const copyCitation = (publication) => {
    const citation = `${(typeof publication.authors === 'string'
      ? publication.authors
      : (publication.authors || []).join(', '))}. "${publication.title}." ${publication.journal || publication.venue}, ${publication.year}.`;
    navigator.clipboard.writeText(citation);
  };

  // Update displayed publications to support "Load More"
  const displayedPubs = filteredPubs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPubs.length;

  return (
    <section id="publications" className="publications-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Publications</h2>
          <p className="section-subtitle">
            Our latest research contributions and academic publications
          </p>
        </div>

        {/* Metrics and refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div className="publications-metrics2">
            <div className="metrics-card2">
              <div className="metric-item">
                <span className="metric-number" data-value={stats.totalCitations || 0}>
                  {isNaN(stats.totalCitations) ? '0' : stats.totalCitations}
                </span>
                <span className="metric-label">Total Citations</span>
              </div>
              <div className="metric-item">
                <span className="metric-number" data-value={stats.hIndex}>{stats.hIndex}</span>
                <span className="metric-label">H-index</span>
              </div>
              <div className="metric-item">
                <span className="metric-number" data-value={stats.i10Index}>{stats.i10Index}</span>
                <span className="metric-label">i10-index</span>
              </div>
            </div>
          </div>
          <div>
            <button
              className="refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              style={{ marginRight: 8 }}
              title="Refresh publications from Google Scholar"
            >
              <svg className={`refresh-icon ${loading ? 'spinning' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4V9H4.58152M4.58152 9C5.80611 6.78392 8.18951 5.19621 11.0174 5.19621C15.0138 5.19621 18.25 8.43241 18.25 12.4288C18.25 16.4252 15.0138 19.6614 11.0174 19.6614C8.18951 19.6614 5.80611 18.0737 4.58152 15.8576M4.58152 9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh
            </button>
            {lastUpdated && (
              <span style={{ fontSize: '0.95em', color: '#888' }}>
                Last updated: {lastUpdated}
                {cacheInfo && cacheInfo.hasCache && (
                  <span style={{ color: cacheInfo.isValid ? '#0a0' : '#a00' }}>
                    {cacheInfo.isValid ? ' (cached)' : ' (cache expired)'}
                  </span>
                )}
              </span>
            )}
          </div>
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
          {displayedPubs.map((publication, index) => (
            <div
              key={`${publication.title}-${index}`}
              ref={el => cardsRef.current[index] = el}
              className="publication-card"
            >
              <div className="publication-header">
                <span className={`publication-type ${publication.type ? publication.type.toLowerCase() : 'other'}`}>
                  {publication.type}
                </span>
                <span className="publication-year">{publication.year}</span>
              </div>

              <h3 className="publication-title">{publication.title}</h3>
              
              <div className="publication-authors">
                {typeof publication.authors === 'string'
                  ? publication.authors
                  : (publication.authors || []).join(', ')}
              </div>

              <div className="publication-venue">{publication.journal || publication.venue}</div>

              {publication.abstract && (
                <div className="publication-abstract">
                  <p>{publication.abstract}</p>
                </div>
              )}

              <div className="publication-actions">
                <button
                  onClick={() => handleDownload(publication.pdf || publication.url)}
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

        {hasMore && (
          <div className="load-more-controls" style={{ textAlign: 'center', margin: '2rem 0' }}>
            <button className="load-more-btn" onClick={() => setVisibleCount(v => v + 10)}>
              Load More Publications
            </button>
          </div>
        )}

        {filteredPubs.length === 0 && !loading && (
          <div className="no-results">
            <p>No publications found matching your criteria.</p>
            <button className="refresh-btn" onClick={handleRefresh}>Try Again</button>
          </div>
        )}
        {loading && (
          <div className="loading-indicator" style={{ margin: '2rem 0' }}>
            <div className="loading-spinner"></div>
            <span>Loading publication data...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
