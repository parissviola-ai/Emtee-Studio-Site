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
        x: 35.62,
        y: 34.15,
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
            "Kym Tea is an entrepreneur, singer, dancer and the founder of Steeped Dreams Studio. As an artist she's constantly pushing the boundaries for neurodiversity. Kym has spent years working closely with autism-focused organizations in Canada and as a result has built a strong passion for neurodiversity. She's best known for dancing with DANCE STUDIO NAME, dancing styles such as salsa and bachata.\n\nIn 2024, Kym began working with Emtee Music Group producing music geared for neurodiverse friendly experiences. In 2026, Kym launched Steeped Dreams Studio with her first ever Klay Night, a night of sensory-friendly artistic experiences including clay making and painting.",
          links: [
            { label: "Linktree", href: "https://linktr.ee/notthatkym" },
            { label: "Instagram", href: "https://www.instagram.com/notthatkym/" },
            { label: "YouTube", href: "https://www.youtube.com/@notthatkym/featured" },
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
            "8D audio (eight-dimensional audio) is a type of spatial audio editing that makes a standard stereo song feel as if it is moving in a 360-degree circle around the listener's head. Producers create an effect by automating panning, volume shifts, and spatial reverb, making sounds travel, rotate, and change distance to the ear.\n\nThe listener's brain continues re-locating the source as it moves, making 8D immersive, trippy, and cinematic. This auditory illusion is designed specifically for headphone users, and it allows listeners to have a calming auditory experience.",
          links: [
            { label: "8D Mixes on Spotify", href: "https://open.spotify.com/artist/5l3q6xxRsELcm2cIJNey8R" },
          ],
        },
      },
      {
        id: "steeped-dreams-studio",
        label: "Steeped Dreams Studio",
        x: 45.97,
        y: 19.7,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Steeped Dreams Studio",
          body:
            "Steeped Dreams Studio is a creative studio and community built around sensory-friendly music, events and shared experiences. Steeped Dreams' pillars include music, dance and event specialties held by the founder of the company, Kym Tea.\n\nAfter being diagnosed with anxiety and PTSD, founder Kym Tea found traditional crowded and loud music settings very difficult to navigate. The vision expanded further when a close family member was diagnosed with autism, and Kym witnessed firsthand the shortage of resources available for them and their loved ones.\n\nIn 2024, Kym partnered up with Emtee Music Group to begin the ideations of Steeped Dreams Studio. The mission is simple: to create open, welcoming environments where anyone can enjoy music, the arts and community without pressure to mask who they are.",
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
          body: "",
        },
      },
    ],
  };
