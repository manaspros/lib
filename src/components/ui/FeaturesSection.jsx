import React, { useEffect, useRef } from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <div className="features-container">
        <h4 className="features-title">
          Advanced Research Capabilities
        </h4>
        <p className="features-subtitle">
          From autonomous systems to AI-powered robotics, our laboratory leads innovation 
          in cutting-edge research and development.
        </p>
      </div>

      <div className="bento-grid">
        <BentoGridItem
          title="Advanced Robotics Research"
          description="Cutting-edge research in autonomous systems, machine learning, and bio-inspired robotics."
          header={<SkeletonOne />}
          className="bento-item-large"
          icon="🤖"
        />
        <BentoGridItem
          title="AI-Powered Vision Systems"
          description="Computer vision and deep learning solutions for real-world applications."
          header={<SkeletonTwo />}
          className="bento-item-medium"
          icon="👁️"
        />
        <BentoGridItem
          title="Research Publications"
          description="Discover our latest research findings and breakthrough innovations in robotics."
          header={<SkeletonThree />}
          className="bento-item-medium"
          icon="📄"
        />
        <BentoGridItem
          title="Global Collaboration"
          description="Partnering with institutions worldwide to advance robotics research and innovation."
          header={<SkeletonFour />}
          className="bento-item-wide"
          icon="🌍"
        />
      </div>
    </div>
  );
};

const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div className={`bento-grid-item ${className || ''}`}>
      <div className="bento-header">
        {header}
      </div>
      <div className="bento-content">
        <div className="bento-icon">{icon}</div>
        <div className="bento-title">{title}</div>
        <div className="bento-description">{description}</div>
      </div>
    </div>
  );
};

const SkeletonOne = () => {
  const roboticsImages = [
    "/assets/first2.png",
    "/assets/Picture3.png",
    "/assets/Picture1.png",
    "/assets/Picture2.png",
  ];

  return (
    <div className="skeleton-one">
      <div className="robotics-gallery">
        <div className="main-image">
          <img src={roboticsImages[0]} alt="Advanced Robotics Research" />
          <div className="image-overlay">
            <div className="overlay-content">
              <div className="tech-badge">🤖 Autonomous Systems</div>
              <div className="tech-badge">🧠 Machine Learning</div>
            </div>
          </div>
        </div>
        <div className="thumbnail-grid">
          {roboticsImages.slice(1).map((image, idx) => (
            <div key={idx} className="thumbnail-item">
              <img src={image} alt={`Robotics ${idx + 2}`} />
              <div className="thumbnail-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonTwo = () => {
  const visionImages = [
    "/assets/second1.png",
    "/assets/first2.png",
    "/assets/first3.png",
    "/assets/first5.png",
    "/assets/BioinspiresTSA.png",
    "/assets/second1.png"
  ];

  const aiLabels = ["Computer Vision", "Deep Learning", "Neural Networks", "Object Detection", "Image Processing", "AI Analysis"];

  return (
    <div className="skeleton-two">
      <div className="vision-showcase">
        {visionImages.map((image, idx) => (
          <div
            key={`vision-${idx}`}
            className="vision-item"
            style={{
              animationDelay: `${idx * 0.2}s`
            }}
          >
            <div className="vision-image">
              <img src={image} alt={`AI Vision ${idx + 1}`} />
              <div className="vision-label">
                <span className="label-text">{aiLabels[idx]}</span>
              </div>
              <div className="processing-overlay">
                <div className="scanning-line"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonThree = () => {
  const publications = [
    {
      title: "Advanced Neural Networks in Robotics",
      journal: "Nature Robotics",
      year: "2024",
      status: "Published",
      citations: "127"
    },
    {
      title: "Bio-Inspired Locomotion Systems",
      journal: "IEEE Transactions",
      year: "2024", 
      status: "In Review",
      citations: "89"
    },
    {
      title: "Autonomous Decision Making",
      journal: "Science Robotics",
      year: "2023",
      status: "Published",
      citations: "245"
    }
  ];

  return (
    <div className="skeleton-three">
    </div>
  );
};

const SkeletonFour = () => {
  const collaborations = [
    { name: "Sogang", country: "South Korea", x: 32, y: 30 },
    { name: "Khalifa University", country: "UAE", x: 55, y: 30 },
    { name: "IIT Delhi", country: "India", x: 50, y: 15 },
    { name: "IIT Gandhinagar", country: "India", x: 65, y: 28 },
    { name: "University of Siena", country: "Italy", x: 40, y: 35 },
    { name: "KAIST", country: "South Korea", x: 52, y: 22 }
  ];

  return (
    <div className="skeleton-four">
      <div className="globe-container">
        <Globe collaborations={collaborations} />
        <div className="collaboration-markers">
          {collaborations.map((collab, idx) => (
            <div
              key={idx}
              className="marker"
              style={{
                left: `${collab.x}%`,
                top: `${collab.y}%`,
                animationDelay: `${idx * 0.5}s`
              }}
            >
              <div className="marker-pulse"></div>
              <div className="marker-tooltip">
                <div className="tooltip-title">{collab.name}</div>
                <div className="tooltip-country">{collab.country}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="connection-lines">
          {collaborations.map((_, idx) => (
            <div
              key={idx}
              className={`connection-line line-${idx + 1}`}
              style={{ animationDelay: `${idx * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Globe = ({ collaborations }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw globe background
      const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 100);
      gradient.addColorStop(0, 'rgba(79, 172, 254, 0.1)');
      gradient.addColorStop(1, 'rgba(79, 172, 254, 0.3)');
      
      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#4facfe';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const radiusX = Math.abs(Math.cos(angle) * 100);
        ctx.beginPath();
        ctx.ellipse(150, 150, radiusX, 100, angle + rotation, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(79, 172, 254, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw latitude lines (fixed calculation)
      for (let i = 1; i < 4; i++) {
        const y = 75 + (i * 25); // Adjusted for better distribution
        const distance = Math.abs(y - 150);
        if (distance < 100) { // Only draw if within globe bounds
          const radiusX = Math.sqrt(10000 - (distance * distance));
          const radiusY = radiusX * 0.2; // Flatter ellipse for latitude effect
          
          if (radiusX > 0 && radiusY > 0) { // Ensure positive radius
            ctx.beginPath();
            ctx.ellipse(150, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(79, 172, 254, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      // Draw connection points
      const connectionPoints = [
        { x: 120, y: 120 },
        { x: 180, y: 130 },
        { x: 160, y: 180 },
        { x: 130, y: 170 }
      ];
      
      connectionPoints.forEach((point, idx) => {
        const pulse = Math.sin(Date.now() * 0.003 + idx) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3 + pulse * 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.7 + pulse * 0.3})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(79, 172, 254, ${0.8 + pulse * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      rotation += 0.005;
      animationId = requestAnimationFrame(animate);
    };

    // Add error handling
    try {
      animate();
    } catch (error) {
      console.error('Globe animation error:', error);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="globe-canvas"
    />
  );
};

export default FeaturesSection;