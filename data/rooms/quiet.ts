import type { Room } from "./types";

export const quietRoom: Room = {
    slug: "steeped-dreams-studio",
    title: "Steeped Dreams\nStudio",
    backgroundImage: "/rooms/quietroomvid-firstframe-opt.jpg",
    backgroundVideo: "/rooms/quietroomvid-opt.mp4",
    backgroundVideoMobile: "/rooms/quietroomvid-opt.mp4",
    hotspots: [
      { id: "next-room", label: "Lobby", href: "/rooms/lobby", x: 90, y: 17, direction: "right" },
      {
        id: "kym-tea-music",
        label: "Kym Tea Music",
        x: 80,
        y: 57,
        direction: "left",
        variant: "dot",
        modal: {
          title: "Kym Tea Music",
          imageGallery: [
            { src: "/rooms/kymtea4.jpg", alt: "Kym Tea portrait 1" },
            { src: "/rooms/kymtea1.jpg", alt: "Kym Tea portrait 2" },
            { src: "/rooms/kymtea3.jpg", alt: "Kym Tea portrait 3" },
          ],
          body:
            "Kym Tea is the founder of Steeped Dreams Studio. Through her artist project and community work, she is building sensory-friendly music experiences that support people who need calmer, more flexible environments.",
          links: [
            { label: "YouTube", href: "https://www.youtube.com/@notthatkym/featured" },
            { label: "Linktree", href: "https://linktr.ee/notthatkym" },
            { label: "Instagram", href: "https://www.instagram.com/notthatkym/" },
          ],
        },
      },
      {
        id: "eight-d-mixes",
        label: "8D Mixes",
        x: 10.5,
        y: 41.96,
        direction: "right",
        variant: "dot",
        modal: {
          title: "8D Mixes",
          body:
            "8D Mixes make music feel like it is moving around your head instead of staying fixed left and right.\n\nProducers create this effect by automating panning, volume shifts, and spatial reverb so sounds seem to travel, rotate, and change distance. Your brain keeps re-locating the source as it moves, which is why 8D can feel immersive, trippy, and cinematic.\n\nIt is a creative mixing style (not a new audio file format), and headphones are essential. Without headphones, the left/right separation blends together and the movement effect is reduced.",
          links: [
            { label: "8D Mixes on Spotify", href: "#" },
          ],
        },
      },
      {
        id: "steeped-dreams-studio",
        label: "Steeped Dreams Studio",
        x: 63,
        y: 65,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Steeped Dreams Studio",
          body:
            "Steeped Dreams Studio is a creative space and community built around sensory-friendly music, events, and shared experiences.\n\nFounder Kym Tea created the studio after being diagnosed with anxiety and PTSD and finding traditional crowded music settings difficult to navigate. The vision expanded further when a close family member was diagnosed with autism and had significant sensory needs.\n\nNeed a break to reset? The studio includes a dedicated chill-out area where guests can recharge for as little or as long as they need.\n\nThe mission is to create open, welcoming environments where people can enjoy music and community without feeling pressure to mask who they are.",
          links: [
            { label: "Watch Video", href: "https://www.instagram.com/p/DUrMEmwEZGf/" },
            { label: "Instagram", href: "https://www.instagram.com/notthatkym/" },
          ],
        },
      },
      {
        id: "chill-out-community",
        label: "Overstimulated? Chill Out",
        x: 50,
        y: 50,
        direction: "left",
        variant: "dot",
        modal: {
          title: "Overstimulated? Chill Out",
          videoEmbed: "https://www.youtube.com/embed/fPd1YHokn-4?si=34wO5SzrnnaPcdGa",
          body:
            "A peaceful community space is on the way. Stay tuned for updates, future gatherings, and new ways to connect with Steeped Dreams Studio.",
        },
      },
    ],
  };
