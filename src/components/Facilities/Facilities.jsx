import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FACILITIES } from '../../utils/constants';
import './Facilities.css';

const Facilities = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const facilitiesRef = useRef(null);

  const categories = ['all', ...new Set(FACILITIES.map(f => f.category))];

  const filteredFacilities = selectedCategory === 'all'
    ? FACILITIES
    : FACILITIES.filter(f => f.category === selectedCategory);

  useEffect(() => {
    if (selectedFacility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedFacility]);

  const handleImageClick = (facility) => {
    setSelectedFacility(facility);
  };

  const closeLightbox = () => {
    setSelectedFacility(null);
  };

  return (
    <section id="facilities" className="facilities-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lab Facilities</h2>
          <p className="section-subtitle">
            State-of-the-art equipment and infrastructure for cutting-edge research
          </p>
        </div>

        {/* Category Filter */}
        <div className="facilities-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Facilities' : category}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div ref={facilitiesRef} className="facilities-grid">
          {filteredFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              className="facility-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleImageClick(facility)}
            >
              <div className="facility-image-container">
                <img
                  src={facility.thumbnail}
                  alt={facility.name}
                  className="facility-image"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/300';
                  }}
                />
                <div className="facility-overlay">
                  <div className="facility-category">{facility.category}</div>
                  <svg className="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
              <div className="facility-info">
                <h3 className="facility-name">{facility.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            className="facility-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="lightbox-grid">
                {/* Left side - Image */}
                <div className="lightbox-image-section">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.name}
                    className="lightbox-image"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/800/600';
                    }}
                  />
                </div>

                {/* Right side - Specifications */}
                <div className="lightbox-specs-section">
                  <h2 className="lightbox-title">{selectedFacility.name}</h2>
                  <div className="lightbox-category-badge">{selectedFacility.category}</div>

                  {selectedFacility.description && (
                    <p className="lightbox-description">{selectedFacility.description}</p>
                  )}

                  <div className="specifications-container">
                    <h3 className="specs-heading">Specifications</h3>
                    <div className="specs-list">
                      {selectedFacility.specifications.map((spec, index) => (
                        <div key={index} className="spec-item">
                          <span className="spec-label">{spec.label}:</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Facilities;