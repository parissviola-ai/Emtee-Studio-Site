import type { Room } from "./types";

export const musicRoom: Room = {
    slug: "EMTEEMusicDept",
    title: "Music",
    backgroundImage: "/rooms/front.jpg",
  hotspots: [
    { id: "next-room", label: "Media Room", href: "/rooms/EMTEEMarketingDept", x: 90, y: 17, direction: "right" },
    {
      id: "music-single-creation",
      label: "Single Creation",
      x: 30,
      y: 47,
      direction: "up",
      variant: "dot",
      modal: {
        title: "Single Creation",
        body:
          "Music department creation package.\n\nIncludes:\n• an EMG A&R for Sound Direction / Songwriting\n• In-Session Vocal Coaching\n• Mix + 2 Post Edits\n• 1 Custom Beat\n• Two 3hr Studio Sessions",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "music-3-song-creation",
      label: "3 Song Creation",
      x: 64,
      y: 52,
      direction: "right",
      variant: "dot",
      modal: {
        title: "3 Song Creation",
        body:
          "Music department multi-song package.\n\nIncludes:\n• an EMG A&R for Sound Direction / Songwriting\n• In-Session Vocal Coaching\n• Mix + 2 Post Edits (per song)\n• 1 Custom Beat (per song)\n• Six 3hr Studio Sessions",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "music-project-creation-5-songs",
      label: "Project Creation (5 Songs)",
      x: 56,
      y: 67,
      direction: "down",
      variant: "dot",
      modal: {
        title: "Project Creation (5 Songs)",
        body:
          "Full project creation package from the music department.\n\nIncludes:\n• an EMG A&R for Sound Direction / Songwriting\n• In-Session Vocal Coaching\n• Mix + 2 Post Edits (per song)\n• 1 Custom Beat (per song)\n• Ten 3hr Studio Sessions",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    
  ],
};
