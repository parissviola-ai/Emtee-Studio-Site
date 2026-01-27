
// data/rooms.ts

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;

  // Normal navigation (optional)
  href?: string;

  // Optional popup modal
  modal?: {
    title: string;
    body: string;
    primaryLabel?: string;
    primaryHref?: string;
    image?: string; //
  };
};

export type Room = {
  slug: string;
  title: string;
  backgroundImage: string;
  hotspots: Hotspot[];
};
export const rooms = [
  // =========================
  // LOBBY / FRONT
  // =========================
  {
    slug: "front",
    title: "Lobby",
    backgroundImage: "/rooms/front.jpg",
    hotspots: [
      // Spread these around the image so it feels “interactive”
      { id: "apply", label: "Apply", href: "/apply", x: 13, y: 60 },
      { id: "artists", label: "Featured Artists", href: "/rooms/artists", x: 70, y: 50 },
      { id: "projects", label: "Projects", href: "/rooms/projects", x: 38, y: 50 },
      { id: "book", label: "Book a Session", href: "/rooms/session", x: 90, y: 70 },
    ],
  },

  // =========================
  // Artist
  // =========================
  {
    slug: "artists",
    title: "Featured Artists",
    backgroundImage: "/rooms/front.jpg", // temporary reuse
    hotspots: [
      { id: "front", label: "Back to Lobby", href: "/rooms/front", x: 14, y: 22 },
      { id: "social media", label: "Social Media", href: "/rooms/socialmedia", x: 14, y: 50 },
      { id: "book", label: "Book a Session", href: "/booking", x: 88, y: 80 },
      { id: "listen", label: "Listen", href: "#", x: 35, y: 58 },

    ],
  },

  // =========================
  // Projects
  // =========================

  {
  slug: "projects",
  title: "Projects",
  backgroundImage: "/rooms/Hallway.png", // swap later to a "lounge" or wide creative shot
  hotspots: [
    {
  id: "intensive",
  label: "4 Day Intensive",
  x: 73,
  y: 51,
  modal: {
    title: "4 Day Intensive",
    body:
      "The 4 day intensive is the first step to working with Emtee Music Group. The intensive gives independent artists a chance to experience the feeling of working as an artist on an industry level. During the 4 days artists are supported by a team of personnel assisting them in their music, brand and business.",
    primaryLabel: "Apply",
    primaryHref: "/apply",
  },
},
{
  id: "labels and partners",
  label: "Labels & Partners",
  x: 90,
  y: 60,
  modal: {
    title: "Labels We've Worked With",
    body:
      " Labels and partners we've collaborated with to elevate our artists' careers.",
    primaryLabel: "",
    image: "/Rooms/LogoDoc.png"
    
  },
},
{
  id: "services",
  label: "Major Label Services",
  x: 35,
  y: 52,
  modal: {
    title: "Major Label Services",
    body:
      " Emtee believes every aspect of building up a successful music career begins with understanding and defining the artist. Confidence in the artist's identity will reflect in the development of their five pillars of their career; music, branding, release, business and live. By independently financing their own development artists are given the opportunity to retain their ownership and creative control. ",
    primaryLabel: "",
    
  },
},
{
  id: "what we do",
  label: "What We Do",
  x: 18,
  y: 60,
  modal: {
    title: "What We Do",
    body:
      " Emtee Projects is the artist development and music education division of Emtee Music Group. We provide artists and labels the tools and services necessary to build a long-lasting and fulfilling music career. Emtee is determined to bring mentorship and education back into the forefront to help build a truly sustainable music industry. We're home to some of the best industry professionals specializing in music, brand, release, business and live development. Want to learn more about what we do? Check out what we've done for our artists. " ,
    primaryLabel: "News",
    primaryHref: "/News",
    
  },
},
    { id: "back", label: "Back to Lobby", href: "/rooms/front", x: 10, y: 14 },
  ],
},

  // =========================
  // Sessions
  // =========================
 {
  slug: "session",
  title: "Session Room",
  backgroundImage: "/rooms/Session.png", // swap later when you add session photo
  hotspots: [
    { id: "front", label: "Back to Lobby", href: "/rooms/front", x: 10, y: 15 },
    { id: "book-session", label: "Book a Session", href: "/booking", x: 53, y: 20 },
    { id: "packages", label: "Session Packages", href: "/rooms/session-packages", x: 22, y: 58 },
    { id: "engineer", label: "Meet the Engineer", href: "/rooms/engineer", x: 90, y: 45 },
  ],
}, 
];