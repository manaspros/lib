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
  { label: 'Events', href: '/events', section: 'events' },
  // { label: 'Contact', href: '/contact', section: 'contact' }

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

// Facilities data
export const FACILITIES = [
  {
    id: 1,
    name: "Bamboo Labs X1 E",
    category: "3D Printing",
    image: "/facilities/bamboo-labs-x1e.jpg",
    thumbnail: "/facilities/bamboo-labs-x1e.jpg",
    specifications: [
      { label: "Input", value: "100–240 V AC, 50/60 Hz" },
      { label: "Build volume", value: "256 × 256 × 256 mm" },
      { label: "Max power", value: "1400 W @ 220 V / 750 W @ 110 V" },
      { label: "Lidar sensor", value: "For calibration and surface scan" },
      { label: "Camera", value: "1080p for monitoring" },
      { label: "Connectivity", value: "Wi-Fi + Ethernet" },
      { label: "Network", value: "WPA2-Enterprise support, Offline LAN mode" },
      { label: "Materials Supported", value: "PLA, PETG, TPU, PVA, BVOH, ABS, ASA, PC, PA, PET" }
    ]
  },
  {
    id: 2,
    name: "Pratham 3.0",
    category: "3D Printing",
    image: "/facilities/pratham-3.jpg",
    thumbnail: "/facilities/pratham-3.jpg",
    specifications: [
      { label: "Build volume", value: "300 × 300 × 300 mm" },
      { label: "Filament diameter", value: "1.75 mm" },
      { label: "Nozzle diameter", value: "0.4 mm (standard)" },
      { label: "Max nozzle temperature", value: "280 °C" },
      { label: "Max bed temperature", value: "120 °C" },
      { label: "Materials Supported", value: "PLA, ABS, PETG, TPU, composites" },
      { label: "Layer resolution", value: "0.08 – 0.4 mm" },
      { label: "Dimensional accuracy", value: "±0.1 mm" },
      { label: "Print speed", value: "40 – 120 mm/s" },
      { label: "Connectivity", value: "USB" }
    ]
  },
  {
    id: 3,
    name: "Phrozen Sonic Mega 8K V2 Resin 3D Printer",
    category: "3D Printing",
    image: "/facilities/phrozen-sonic.jpg",
    thumbnail: "/facilities/phrozen-sonic.jpg",
    specifications: [
      { label: "Build volume", value: "330 × 185 × 400 mm" },
      { label: "XY resolution", value: "43 µm (0.043 mm)" },
      { label: "Layer thickness", value: "0.01 – 0.30 mm" },
      { label: "Screen", value: "15″ mono 8K LCD" },
      { label: "Speed", value: "~400 layers/hr" },
      { label: "Features", value: "Auto resin feed + air purifier" },
      { label: "Connectivity", value: "USB, Ethernet" },
      { label: "Software", value: "ChiTuBox compatible" },
      { label: "Power", value: "100–240 V" }
    ]
  },
  {
    id: 4,
    name: "Anycubic Kobra 2 Neo 3D Printer",
    category: "3D Printing",
    image: "/facilities/anycubic-kobra.jpg",
    thumbnail: "/facilities/anycubic-kobra.jpg",
    specifications: [
      { label: "Build volume", value: "250 × 220 × 220 mm" },
      { label: "Print speed", value: "Up to 250 mm/s" },
      { label: "Nozzle temp", value: "Max 260 °C (0.4 mm nozzle)" },
      { label: "Bed temp", value: "Max 110 °C" },
      { label: "Auto leveling", value: "LeviQ 2.0 (25-point mesh + Z-offset)" },
      { label: "Size", value: "485 × 440 × 440 mm" },
      { label: "Materials", value: "PLA, ABS, PETG, TPU" }
    ]
  },
  {
    id: 5,
    name: "Scientech 827 Workbench",
    category: "Electronics",
    image: "/facilities/scientech-827.jpg",
    thumbnail: "/facilities/scientech-827.jpg",
    specifications: [
      { label: "Function generator", value: "10 MHz AM/FM with 40 MHz frequency counter" },
      { label: "Oscilloscope", value: "50 MHz, 1 GSa/s, 4-channel digital storage" },
      { label: "Power supply", value: "Dual-tracking DC supply" },
      { label: "Multimeter", value: "3¾-digit digital multimeter" },
      { label: "Soldering/desoldering", value: "Station included" },
      { label: "Power", value: "Single AC input with MCB protection" },
      { label: "Size", value: "~1800 mm (W) × 820 mm (D)" },
      { label: "Features", value: "Mobile workbench with lockable wheels" }
    ]
  },
  {
    id: 6,
    name: "ESD Workstation",
    category: "Electronics",
    image: "/facilities/esd-workstation.jpg",
    thumbnail: "/facilities/esd-workstation.jpg",
    specifications: [
      { label: "Type", value: "Electrostatic Discharge Protected Workstation" },
      { label: "Purpose", value: "Safe handling of sensitive electronic components" }
    ]
  },
  {
    id: 7,
    name: "Electric Wheelchair and Treadmill",
    category: "Rehabilitation",
    image: "/facilities/wheelchair-treadmill.jpg",
    thumbnail: "/facilities/wheelchair-treadmill.jpg",
    specifications: [
      { label: "Treadmill", value: "Adjustable speeds with movable side supports" },
      { label: "Side supports", value: "Two movable supports" },
      { label: "Linear actuator", value: "For Exoskeleton Harness support" },
      { label: "Max load", value: "6000" },
      { label: "Power Rating", value: "24V DC" },
      { label: "Current Rating", value: "3.5A" },
      { label: "Battery - Charging Voltage", value: "24V" },
      { label: "Battery - Capacity", value: "12Ah" }
    ]
  },
  {
    id: 8,
    name: "Myrio 1900",
    category: "Control Systems",
    image: "/facilities/myrio-1900.jpg",
    thumbnail: "/facilities/myrio-1900.jpg",
    specifications: [
      { label: "Processor", value: "Dual-core ARM Cortex-A9 (Xilinx Zynq-7010 SoC)" },
      { label: "FPGA", value: "Integrated Xilinx Zynq-7010 FPGA" },
      { label: "Memory", value: "DDR3 RAM + onboard flash" },
      { label: "Wi-Fi", value: "IEEE 802.11 b/g/n (2.4 GHz)" },
      { label: "Analog Inputs", value: "±10 V (12-bit)" },
      { label: "Analog Outputs", value: "±10 V (12-bit)" },
      { label: "Digital I/O", value: "40 lines (PWM, SPI, I²C, UART supported)" },
      { label: "Other I/O", value: "USB Host/Device, Audio In/Out, Accelerometer" },
      { label: "Power", value: "6 – 16 V DC, ~14 W max" },
      { label: "Operating Temp", value: "0 – 40 °C" }
    ]
  },
  {
    id: 9,
    name: "CubeMars AK Series Actuators",
    category: "Actuators",
    image: "/facilities/cubemars-actuators.jpg",
    thumbnail: "/facilities/cubemars-actuators.jpg",
    description: "AK series motor actuators are high-torque BLDC units used in exoskeletons and robotics. They combine a brushless motor with a gearbox to provide strong torque and precise motion control. These actuators are commonly used for joint movement and load support in wearable and robotic systems.",
    specifications: [
      { label: "Model AK 10-9 KV60 - Voltage", value: "24V/48V" },
      { label: "Model AK 10-9 KV60 - Peak Torque", value: "48 Nm" },
      { label: "Model AK 10-9 KV60 - Rated Current", value: "10.6 A" },
      { label: "Model AK 80-64 - Voltage", value: "24V/48V" },
      { label: "Model AK 80-64 - Peak Torque", value: "120 Nm" },
      { label: "Model AK 80-64 - Rated Current", value: "7 A" },
      { label: "Model AK 80-6 - Voltage", value: "48V" },
      { label: "Model AK 80-6 - Peak Torque", value: "12 Nm" },
      { label: "Model AK 80-6 - Rated Current", value: "9.7 A" },
      { label: "Model AK 60-6 - Voltage", value: "24V" },
      { label: "Model AK 60-6 - Peak Torque", value: "9 Nm" },
      { label: "Model AK 60-6 - Rated Current", value: "3.8 A" }
    ]
  },
  {
    id: 10,
    name: "Metallic Breadboard",
    category: "Electronics",
    image: "/facilities/metallic-breadboard.jpg",
    thumbnail: "/facilities/metallic-breadboard.jpg",
    specifications: [
      { label: "Type", value: "Metallic prototyping breadboard" },
      { label: "Purpose", value: "Circuit prototyping and testing" }
    ]
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
