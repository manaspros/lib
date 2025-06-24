// Fallback team data when Google Sheets is unavailable
export const FALLBACK_TEAM_DATA = {
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
  ],
  masters: [],
  undergraduate: [],
  others: []
};
