import type { Room } from "./types";

export const musicRoom: Room = {
    slug: "music",
    title: "Studio",
    backgroundImage: "/rooms/mrlargeelephant-opt.jpg",
  hotspots: [
    { id: "next-room", label: "Media Room", href: "/rooms/marketing", x: 90, y: 17, direction: "right" },
    {
      id: "music-single-creation",
      label: "Single Creation",
      x: 30,
      y: 47,
      direction: "down",
      variant: "dot",
      modal: {
        title: "Single Creation",
        body:
          "Direction, production, writing and engineering for a single.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "music-3-song-creation",
      label: "EP Creation (3 Songs)",
      x: 70.26,
      y: 46.48,
      direction: "right",
      variant: "dot",
      modal: {
        title: "EP Creation (3 Songs)",
        body:
          "Direction, production, writing and engineering for a 3-song EP.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "music-project-creation-5-songs",
      label: "Project Creation (5 Songs)",
      x: 49.32,
      y: 56.11,
      direction: "down",
      variant: "dot",
      modal: {
        title: "Project Creation (5 Songs)",
        body:
          "Direction, production, writing and engineering for a 5-song project.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "music-dirty-elephant-studios",
      label: "Dirty Elephant Studios",
      x: 59.9,
      y: 48.87,
      direction: "down",
      variant: "dot",
      href: "/rooms/dirty-elephant-studio",
    },
    
  ],
};
