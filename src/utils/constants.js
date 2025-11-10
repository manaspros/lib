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
    description: "Bio-inspired mechanisms that draw principles from nature to design efficient, adaptive, and intelligent systems. By studying the movement, structure, and functionality of living organisms, we aim to create innovative robotic and mechanical designs that mimic natural efficiency and resilience. Our work integrates biology, robotics, and engineering to develop next-generation systems for real-world applications.",
    icon: "🦋"
  },
  {
    title: "Wearable Robotics (Bio-signal-controlled Robotics)",
    description: "Wearable Robotics, focusing on bio-signal-controlled systems that respond to human physiological signals for intuitive interaction. This includes the development of soft actuators, exoskeletons, and exosuits designed to assist and rehabilitate individuals with mobility challenges. By integrating robotics with human bio-signals, we aim to create lightweight, comfortable, and responsive wearable systems that enhance strength, restore movement, and support physical rehabilitation.",
    icon: "🤝"
  },
  {
    title: "Reconfigurable and Growing Robotics",
    description: "Reconfigurable and Growing Robotics, exploring systems that can adapt, transform, and extend their structures to meet dynamic tasks. This includes research on metamorphic drone arms, aerial manipulation, and soft robotics, enabling robots to change their shape or functionality in real time. By combining flexibility, modularity, and intelligent control, we aim to develop robots capable of operating in complex and unpredictable environments for applications in exploration, rescue, and adaptive manufacturing.",
    icon: "🔄"
  },
  {
    title: "Tele-Robotics and Haptics",
    description: "Tele-Robotics and Haptics is an emerging field that enables humans to remotely control robots while experiencing realistic touch sensations through advanced technologies such as bi-manual exoskeletons, haptic feedback devices, and haptic displays. It bridges the gap between human perception and robotic control, allowing users to interact with distant or virtual environments as if they were physically present, achieving precise and intuitive manipulation. Our aim is to advance this field through innovations that enhance robot-assisted surgery, space exploration, hazardous environment handling, rehabilitation, and immersive virtual reality systems. We strive to develop intelligent, compact, and responsive tele-robotic and haptic systems that foster seamless human–robot collaboration and transform the way humans interact with machines and digital environments.",
    icon: "🎮"
  },
  {
    title: "Applied AI in Robotics",
    description: "Applied AI in Robotics focuses on integrating artificial intelligence algorithms to enhance robotic perception, decision-making, and autonomy. In our lab, we aim to harness AI to create intelligent robotic systems capable of learning from their environment, adapting to new challenges, and making real-time decisions with minimal human intervention, solving real-life problems such as automation in healthcare, disaster response, precision agriculture, and industrial inspection. By combining machine learning, computer vision, and adaptive control, we strive to develop autonomous, efficient, and reliable robots that can operate effectively in complex and unstructured environments.",
    icon: "🧠"
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
    building: "SAIDE ,IIT Jodhpur Permanent Campus",
    street: "National Highway 65, Nagaur Road, Karwar",
    city: "Jodhpur",
    country: "India"
  },
  phone: "+1 (555) 123-4567",
  email: "info@birdlab.edu",
  officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
  social: {
    youtube: "https://www.youtube.com/@bhivrajsuthar2234"
  }
};

// Animation configurations
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1
};
