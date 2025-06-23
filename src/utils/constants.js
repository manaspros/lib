// Navigation items
export const NAV_ITEMS = [
  { label: 'Welcome', href: '/', section: 'welcome' },
  { label: 'People', href: '/people', section: 'people' },
  { label: 'Research', href: '/research', section: 'research' },
  { label: 'Publications', href: '/publications', section: 'publications' },
  { label: 'Lectures', href: '/lectures', section: 'lectures' },
  { label: 'Gallery', href: '/gallery', section: 'gallery' },
  { label: 'Open Positions', href: '/positions', section: 'positions' },
  { label: 'Contact', href: '/contact', section: 'contact' }
];

// Team data
export const TEAM_DATA = {
  director: {
    name: "Dr. Sarah Chen",
    title: "Principal Investigator & Lab Director",
    image: "/api/placeholder/300/300",
    bio: "Leading expert in autonomous robotics with 15+ years of experience in bio-inspired systems and machine learning.",
    research: ["Autonomous Systems", "Bio-inspired Robotics", "Machine Learning"],
    email: "s.chen@roboticslab.edu",
    website: "https://example.com/sarah-chen"
  },
  researchers: [
    {
      name: "Dr. Michael Rodriguez",
      title: "Senior Research Scientist",
      image: "/api/placeholder/300/300",
      research: ["Computer Vision", "Deep Learning", "Perception Systems"],
      email: "m.rodriguez@roboticslab.edu"
    },
    {
      name: "Dr. Emily Wang",
      title: "Research Scientist",
      image: "/api/placeholder/300/300",
      research: ["Control Systems", "Motion Planning", "Optimization"],
      email: "e.wang@roboticslab.edu"
    }
  ],
  phd: [
    {
      name: "Alex Thompson",
      title: "PhD Student",
      image: "/api/placeholder/300/300",
      research: ["Swarm Robotics", "Distributed Systems"],
      year: "3rd Year"
    },
    {
      name: "Priya Patel",
      title: "PhD Student", 
      image: "/api/placeholder/300/300",
      research: ["Human-Robot Interaction", "Social Robotics"],
      year: "2nd Year"
    }
  ]
};

// Research areas
export const RESEARCH_AREAS = [
  {
    title: "Autonomous Systems",
    description: "Developing intelligent robots capable of independent decision-making and navigation in complex environments.",
    icon: "🤖",
    technologies: ["ROS", "SLAM", "Path Planning", "Sensor Fusion"]
  },
  {
    title: "Machine Learning & AI",
    description: "Implementing advanced ML algorithms for robot learning, adaptation, and intelligent behavior.",
    icon: "🧠",
    technologies: ["Deep Learning", "Reinforcement Learning", "Computer Vision", "NLP"]
  },
  {
    title: "Bio-inspired Robotics",
    description: "Creating robots that mimic biological systems for enhanced mobility and functionality.",
    icon: "🦋",
    technologies: ["Biomechanics", "Soft Robotics", "Morphology", "Evolutionary Algorithms"]
  },
  {
    title: "Computer Vision",
    description: "Advanced visual perception systems for object recognition, tracking, and scene understanding.",
    icon: "👁️",
    technologies: ["Image Processing", "3D Vision", "Object Detection", "LIDAR"]
  }
];

// Publications data
export const PUBLICATIONS = [
  {
    title: "Adaptive Learning in Autonomous Robotic Systems",
    authors: ["S. Chen", "M. Rodriguez", "A. Thompson"],
    venue: "IEEE Transactions on Robotics",
    year: 2024,
    type: "Journal",
    pdf: "/papers/adaptive-learning-2024.pdf",
    abstract: "This paper presents a novel approach to adaptive learning in autonomous robotic systems..."
  },
  {
    title: "Bio-inspired Navigation for Swarm Robotics",
    authors: ["A. Thompson", "S. Chen", "E. Wang"],
    venue: "ICRA 2024",
    year: 2024,
    type: "Conference",
    pdf: "/papers/bio-inspired-nav-2024.pdf",
    abstract: "We demonstrate a bio-inspired navigation algorithm for coordinated swarm behavior..."
  }
];

// Gallery categories
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All', count: 0 },
  { id: 'lab', label: 'Lab Photos', count: 0 },
  { id: 'projects', label: 'Projects', count: 0 },
  { id: 'events', label: 'Events', count: 0 },
  { id: 'videos', label: 'Videos', count: 0 }
];

// Sample gallery items
export const GALLERY_ITEMS = [
  {
    id: 1,
    type: 'image',
    category: 'lab',
    title: 'Main Laboratory Space',
    src: '/api/placeholder/600/400',
    thumbnail: '/api/placeholder/300/200',
    description: 'Our state-of-the-art robotics laboratory featuring advanced equipment and workstations.'
  },
  {
    id: 2,
    type: 'video',
    category: 'projects',
    title: 'Autonomous Drone Navigation',
    src: '/videos/drone-demo.mp4',
    thumbnail: '/api/placeholder/300/200',
    description: 'Demonstration of our autonomous drone navigation system in complex environments.'
  },
  {
    id: 3,
    type: 'image',
    category: 'events',
    title: 'ICRA 2024 Conference',
    src: '/api/placeholder/600/400',
    thumbnail: '/api/placeholder/300/200',
    description: 'Team presentation at the International Conference on Robotics and Automation.'
  }
];

// Contact information
export const CONTACT_INFO = {
  address: {
    building: "Engineering Building, Room 301",
    street: "123 University Avenue",
    city: "Tech City, TC 12345",
    country: "United States"
  },
  phone: "+1 (555) 123-4567",
  email: "info@roboticslab.edu",
  officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
  social: {
    twitter: "https://twitter.com/roboticslab",
    linkedin: "https://linkedin.com/company/roboticslab",
    github: "https://github.com/roboticslab",
    youtube: "https://youtube.com/roboticslab"
  }
};

// Animation configurations
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1
};
