import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Common animation configurations
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1
};

// Page load animations
export const initPageAnimations = () => {
  const tl = gsap.timeline();
  
  tl.set('body', { opacity: 1 })
    .from('.header', { y: -100, opacity: 0, duration: 0.8 })
    .from('.hero-content > *', { 
      y: 50, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.2 
    }, "-=0.4");
    
  return tl;
};

// Fade in up animation for sections
export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(element, 
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements, direction = "up") => {
  const fromVars = direction === "up" ? { y: 60, opacity: 0 } : { x: 60, opacity: 0 };
  const toVars = direction === "up" ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 };
  
  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    duration: ANIMATION_CONFIG.duration,
    ease: ANIMATION_CONFIG.ease,
    stagger: ANIMATION_CONFIG.stagger,
    scrollTrigger: {
      trigger: elements[0],
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
};

// Scale animation for cards
export const scaleIn = (element, delay = 0) => {
  return gsap.fromTo(element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Parallax scrolling effect
export const parallaxEffect = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Floating animation for hero elements
export const floatingAnimation = (element, duration = 3) => {
  return gsap.to(element, {
    y: -20,
    duration,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });
};

// Text reveal animation
export const textReveal = (element, delay = 0) => {
  const chars = element.textContent.split('');
  element.innerHTML = chars.map(char => 
    `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('');
  
  const spans = element.querySelectorAll('span');
  
  return gsap.fromTo(spans,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.02,
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Mouse follow effect
export const mouseFollowEffect = (element) => {
  const handleMouseMove = (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(element, {
      rotationX: y * 10,
      rotationY: x * 10,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Gallery lightbox animations
export const lightboxOpen = (element) => {
  const tl = gsap.timeline();
  
  tl.set(element, { display: 'flex' })
    .fromTo(element, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    .fromTo(element.querySelector('.lightbox-content'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.1"
    );
    
  return tl;
};

export const lightboxClose = (element) => {
  const tl = gsap.timeline();
  
  tl.to(element.querySelector('.lightbox-content'),
      { scale: 0.8, opacity: 0, duration: 0.3 }
    )
    .to(element,
      { opacity: 0, duration: 0.2 },
      "-=0.1"
    )
    .set(element, { display: 'none' });
    
  return tl;
};

// Button hover effects
export const buttonHoverEffect = (button) => {
  const handleMouseEnter = () => {
    gsap.to(button, {
      scale: 1.05,
      y: -2,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(button, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  button.addEventListener('mouseenter', handleMouseEnter);
  button.addEventListener('mouseleave', handleMouseLeave);
  
  return () => {
    button.removeEventListener('mouseenter', handleMouseEnter);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Counter animation
export const animateCounter = (element, start = 0, end = 100, duration = 2) => {
  const obj = { value: start };
  
  return gsap.to(obj, {
    value: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
};

// Navigation menu animations
export const mobileMenuOpen = (menu) => {
  const tl = gsap.timeline();
  
  tl.set(menu, { display: 'flex' })
    .fromTo(menu,
      { x: '100%' },
      { x: '0%', duration: 0.4, ease: "power3.out" }
    )
    .fromTo(menu.querySelectorAll('.nav-item'),
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
    
  return tl;
};

export const mobileMenuClose = (menu) => {
  const tl = gsap.timeline();
  
  tl.to(menu.querySelectorAll('.nav-item'),
      { x: 50, opacity: 0, duration: 0.2, stagger: 0.05 }
    )
    .to(menu,
      { x: '100%', duration: 0.3, ease: "power3.in" },
      "-=0.1"
    )
    .set(menu, { display: 'none' });
    
  return tl;
};
