import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../../utils/constants';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(GALLERY_ITEMS);
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Filter items based on active category
    const filtered = activeCategory === 'all' 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(item => item.category === activeCategory);
    setFilteredItems(filtered);
  }, [activeCategory]);

  useEffect(() => {
    // GSAP animations for gallery items
    if (itemsRef.current.length > 0) {
      gsap.fromTo(itemsRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [filteredItems]);

  const openLightbox = (item) => {
    setLightboxItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = 'auto';
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Animate category change
    gsap.to(itemsRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        gsap.to(itemsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05
        });
      }
    });
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">        <div 
          className="section-header"
        >
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Explore our laboratory, projects, and research in action
          </p>
        </div>

        <div className="gallery-filters">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div ref={galleryRef} className="gallery-grid">
          {filteredItems.map((item, index) => (            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className={`gallery-item ${item.type}`}
              onClick={() => openLightbox(item)}
            >
              <div className="gallery-item-content">
                {item.type === 'video' ? (
                  <div className="video-thumbnail">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img src={item.thumbnail} alt={item.title} />
                )}
                
                <div className="gallery-item-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>                  <div className="item-category">{item.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              
              <div className="lightbox-media">
                {lightboxItem.type === 'video' ? (
                  <video controls autoPlay>
                    <source src={lightboxItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={lightboxItem.src} alt={lightboxItem.title} />
                )}
              </div>
              
              <div className="lightbox-info">
                <h3>{lightboxItem.title}</h3>                <p>{lightboxItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
