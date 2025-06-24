import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion';
import './TracingBeam.css';

export const TracingBeam = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, [children]);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={`tracing-beam-container ${className}`}
    >
      <div className="tracing-beam-indicator">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0
              ? "none"
              : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="tracing-beam-dot-container"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#00ffff" : "#4facfe",
              borderColor: scrollYProgress.get() > 0 ? "#00ffff" : "#4facfe",
            }}
            className="tracing-beam-dot"
          />
        </motion.div>
        
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="tracing-beam-svg"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeOpacity="0.3"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="tracing-beam-animated-path"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#4facfe" stopOpacity="0" />
              <stop stopColor="#4facfe" />
              <stop offset="0.325" stopColor="#00ffff" />
              <stop offset="1" stopColor="#646cff" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="tracing-beam-content">
        {children}
      </div>
    </motion.div>
  );
};
