import { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);
  const [carouselIsTransitioning, setCarouselIsTransitioning] = useState(false);
  const carouselTimerRef = useRef(null);

  const carouselNextSlide = () => {
    if (carouselIsTransitioning) return;
    setCarouselIsTransitioning(true);
    setCarouselCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setCarouselIsTransitioning(false), 500);
  };

  const carouselGoToSlide = (index) => {
    if (carouselIsTransitioning || index === carouselCurrentIndex) return;
    setCarouselIsTransitioning(true);
    setCarouselCurrentIndex(index);
    setTimeout(() => setCarouselIsTransitioning(false), 500);
  };

  useEffect(() => {
    carouselTimerRef.current = setInterval(() => {
      carouselNextSlide();
    }, interval);

    return () => {
      if (carouselTimerRef.current) {
        clearInterval(carouselTimerRef.current);
      }
    };
  }, [carouselCurrentIndex, interval]);

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <div className="carousel-slides">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === carouselCurrentIndex ? 'active' : ''} ${
                index === (carouselCurrentIndex - 1 + images.length) % images.length ? 'prev' : ''
              } ${index === (carouselCurrentIndex + 1) % images.length ? 'next' : ''}`}
            >
              <img src={image.src} alt={image.alt} />
              {image.caption && (
                <div className="carousel-caption">
                  <h3>{image.caption}</h3>
                  {image.description && <p>{image.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === carouselCurrentIndex ? 'active' : ''}`}
              onClick={() => carouselGoToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
