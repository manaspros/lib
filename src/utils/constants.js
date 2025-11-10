// Navigation items
export const NAV_ITEMS = [
  { label: 'Welcome', href: '/', section: 'welcome' },
  { label: 'People', href: '/people', section: 'people' },
  { label: 'Research', href: '/research', section: 'research' },
  { label: 'Publications', href: '/publications', section: 'publications' },
  { label: 'Lectures', href: '/lectures', section: 'lectures' },
  { label: 'Collaboration', href: '/gallery', section: 'gallery' },
  { label: 'Facilities', href: '/facilities', section: 'facilities' },
  { label: 'Open Positions', href: '/positions', section: 'positions' },
  { label: 'Contact', href: '/contact', section: 'contact' }
    
];

// Team data
export const TEAM_DATA = {
  director: {
    name: "Dr. Sarah Chen",
    title: "Principal Investigator & Lab Director",
    image: "/api/placeholder/300/300",
    bio: "Leading expert in bio-inspired robotics with 15+ years of experience in autonomous systems, machine learning, and bio-inspired design methodologies.",
    research: ["Bio-inspired Mechanisms", "Wearable & Collaborative Robotics", "Reconfigurable and Growing Robotics"],
    email: "s.chen@birdlab.edu",
    website: "https://example.com/sarah-chen"
  },
  researchers: [
    {
      name: "Dr. Michael Rodriguez",
      title: "Senior Research Scientist",
      image: "/api/placeholder/300/300",
      research: ["Tele-Robotics and Haptics", "Applied AI in Robotics", "Bio-inspired Vision Systems"],
      email: "m.rodriguez@birdlab.edu"
    },
    {
      name: "Dr. Emily Wang",
      title: "Research Scientist",
      image: "/api/placeholder/300/300",
      research: ["Reconfigurable and Growing Robotics", "Bio-inspired Control Systems", "Soft Robotics"],
      email: "e.wang@birdlab.edu"
    }
  ],
  phd: [
    {
      name: "Alex Thompson",
      title: "PhD Student",
      image: "/api/placeholder/300/300",
      research: ["Wearable Robotics", "Bio-inspired Locomotion"],
      year: "3rd Year"
    },
    {
      name: "Priya Patel",
      title: "PhD Student", 
      image: "/api/placeholder/300/300",
      research: ["Collaborative Robotics", "Bio-inspired Navigation"],
      year: "2nd Year"
    }
  ]
};
// Research areas - Updated to match BIRD Lab focus
export const RESEARCH_AREAS = [
  {
    title: "Bio-inspired Mechanisms",
    description: "Human-like fingers, Artificial muscle, Prosthetic Limbs, actuations, sensors, etc.",
    icon: "🦋",
    technologies: ["Biomimetics", "Morphological Design", "Adaptive Structures", "Nature-Inspired Materials"],
    projects: [
      {
        name: "Bio-inspired Muscles-TSA",
        description: "Developing twisted and coiled actuators that mimic natural muscle behavior, providing high force-to-weight ratios and efficient energy conversion for robotic applications."
      },
      {
        name: "Artificial muscle-based robotic finger",
        description: "Creating dexterous robotic fingers using artificial muscle actuators to achieve human-like grasping capabilities with compliant and adaptive force control."
      },
      {
        name: "Artificial muscle-based Robotic hand",
        description: "A fully articulated robotic hand powered by artificial muscles, enabling natural grasping motions and tactile feedback for prosthetic and manipulation tasks."
      },
      {
        name: "Hawk Gripper",
        description: "Bird-inspired gripper design that mimics hawk talons, allowing secure grasping of various objects with adaptive grip strength and passive locking mechanisms."
      },
      {
        name: "Bio-inspired Cat-Leap Parkour Rolling Mechanism",
        description: "Robotic mobility system inspired by feline agility, incorporating dynamic leaping and rolling mechanisms for navigating complex terrains and obstacles."
      }
    ]
  },
  {
    title: "Wearable Robotics (Bio-signal-controlled Robotics)",
    description: "Soft actuators, Exoskeleton, Exosuit for assistive, rehabilitation",
    icon: "🤝",
    technologies: ["Human-Robot Interaction", "Wearable Systems", "Collaborative Control", "Assistive Robotics"],
    projects: [
      {
        name: "Exoskeleton",
        description: "Rigid wearable robotic frameworks designed to enhance human strength and endurance, providing support for rehabilitation, industrial tasks, and mobility assistance."
      },
      {
        name: "Exosuits",
        description: "Soft, lightweight wearable systems that assist human movement using flexible actuators, ideal for rehabilitation therapy and augmenting physical performance."
      },
      {
        name: "Prosthetic Limbs",
        description: "Advanced artificial limbs controlled by bio-signals (EMG/EEG) that restore mobility and function for amputees with natural, intuitive control interfaces."
      },
      {
        name: "Supernumerary Robotic Limbs",
        description: "Additional robotic limbs that extend human capabilities beyond natural limitations, enabling multitasking and enhanced manipulation in complex scenarios."
      }
    ]
  },
  {
    title: "Reconfigurable and Growing Robotics",
    description: "Metamorphic drone arm, Aerial Manipulation, Soft robotics, etc.",
    icon: "🔄",
    technologies: ["Modular Robotics", "Self-Assembly", "Adaptive Architecture", "Growth Algorithms"],
    projects: [
      {
        name: "Foldable Supernumerary Robotic Arms",
        description: "Compact, deployable robotic arms that fold for storage and extend when needed, providing additional manipulation capabilities for wearable or mobile platforms."
      },
      {
        name: "Extendable Drone Arm",
        description: "Telescopic robotic arm integrated with aerial drones for extended reach manipulation, enabling inspection, grasping, and interaction tasks in hard-to-reach areas."
      },
      {
        name: "Extendable Space Arm",
        description: "Growing robotic manipulator designed for space applications, capable of extending its length for satellite servicing, assembly tasks, and exploration missions."
      }
    ]
  },
  {
    title: "Tele-Robotics and Haptics",
    description: "Bi-manual exoskeletons, haptic feedback, haptic display, etc.",
    icon: "🎮",
    technologies: ["Haptic Feedback", "Remote Control", "Force Sensing", "Teleoperation"],
    projects: [
      {
        name: "Master Device",
        description: "Haptic control interface worn by the operator, capturing hand movements and providing force feedback for intuitive remote control of robotic systems."
      },
      {
        name: "Slave Device",
        description: "Remote robotic system that replicates operator movements from the master device, enabling precise manipulation in hazardous or distant environments."
      },
      {
        name: "Haptic Feedback",
        description: "Advanced force and tactile feedback systems that transmit touch sensations from remote robots to operators, enhancing telepresence and control precision."
      }
    ]
  },
  {
    title: "Applied AI in Robotics",
    description: "Implementing artificial intelligence algorithms to enhance robotic decision-making and autonomy.",
    icon: "🧠",
    technologies: ["Machine Learning", "Neural Networks", "Reinforcement Learning", "Computer Vision"],
    projects: [
      {
        name: "Computer Vision for Robotics",
        description: "Deep learning-based vision systems for object detection, recognition, and scene understanding, enabling robots to perceive and navigate complex environments."
      },
      {
        name: "Machine Learning Models",
        description: "Training neural networks for robotic tasks including motion planning, trajectory optimization, and adaptive control in dynamic scenarios."
      },
      {
        name: "Autonomous Decision Making",
        description: "Reinforcement learning algorithms that enable robots to make intelligent decisions, learn from experience, and adapt to new situations without human intervention."
      }
    ]
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

// Contact information - Updated for BIRD Lab
export const CONTACT_INFO = {
  address: {
    building: "Bio-Inspired Robotics Design Lab",
    street: "123 University Avenue",
    city: "Tech City, TC 12345",
    country: "United States"
  },
  phone: "+1 (555) 123-4567",
  email: "info@birdlab.edu",
  officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
  social: {
    twitter: "https://twitter.com/birdlab",
    linkedin: "https://linkedin.com/company/birdlab",
    github: "https://github.com/birdlab",
    youtube: "https://youtube.com/birdlab"
  }
};

// Animation configurations
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1
};
