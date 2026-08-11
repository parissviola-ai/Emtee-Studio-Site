import type { Room } from "./types";

export const quietRoom: Room = {
    slug: "steeped-dreams-studio",
    title: "Steeped Dreams\nStudio",
    backgroundImage: "/rooms/steeped-dreams-zen-interior-poster.jpg",
    backgroundVideo: "/rooms/steeped-dreams-zen-interior-trimmed.mp4",
    backgroundVideoMobile: "/rooms/steeped-dreams-zen-interior-trimmed.mp4",
    hotspots: [
      { id: "next-room", label: "Lobby", href: "/rooms/lobby", x: 90, y: 17, direction: "right" },
      {
        id: "upcoming-events",
        label: "Event",
        x: 34.41,
        y: 30.88,
        stimulatedPosition: { x: 89.51, y: 47.53 },
        direction: "right",
        variant: "dot",
        modal: {
          title: "Event",
          imageGalleryVariant: "event-grid",
          imageGallery: [
            {
              src: "/rooms/steeped-dreams-kym-klay-session.jpg",
              alt: "Kym's Klay Session sensory art experience event flyer for March 21, 2026",
              label: "March 2026",
              width: 894,
              height: 1071,
              fit: "cover",
            },
            {
              src: "/rooms/steeped-dreams-after-the-almost-august-2026.jpg",
              alt: "After the Almost: The Sunflower Sessions event flyer for August 16, 2026",
              label: "August 2026",
              width: 1236,
              height: 1600,
            },
          ],
          body: "",
        },
      },
      {
        id: "kym-tea",
        label: "Kym Tea",
        x: 85.07,
        y: 34.39,
        stimulatedPosition: { x: 72.82, y: 33.73 },
        direction: "left",
        variant: "dot",
        modal: {
          title: "Kym Tea",
          imageGallery: [
            { src: "/rooms/kymtea4.jpg", alt: "Kym Tea portrait 1" },
            { src: "/rooms/kymtea1.jpg", alt: "Kym Tea portrait 2" },
            { src: "/rooms/kymtea3.jpg", alt: "Kym Tea portrait 3" },
          ],
          body:
            "Kym Tea is an entrepreneur, singer, dancer and the founder of Steeped Dreams Studio. As an artist she's constantly pushing the boundaries for neurodiversity. Kym has spent years working closely with autism-focused organizations in Canada and as a result has built a strong passion for neurodiversity. She's best known for dancing with Abanico Dance and Entertainment, dancing styles such as salsa and bachata.\n\nIn 2024, Kym began working with Emtee Music Group producing music geared for neurodiverse friendly experiences. In 2026, Kym launched Steeped Dreams Studio with her first ever Klay Night, a night of sensory-friendly artistic experiences including clay making and painting.",
          links: [
            { label: "Linktree", href: "https://linktr.ee/notthatkym" },
            { label: "Instagram", href: "https://www.instagram.com/notthatkym/" },
            { label: "YouTube", href: "https://www.youtube.com/@notthatkym/featured" },
          ],
        },
      },
      {
        id: "kym-tea-music",
        label: "Kym Tea Music",
        x: 79.15,
        y: 60.79,
        stimulatedPosition: { x: 9.45, y: 40.63 },
        direction: "left",
        variant: "dot",
        modal: {
          title: "Kym Tea Music",
          spotifyEmbed: "https://open.spotify.com/embed/artist/2Q0QjQdYdGZMHNFcpbpH6o?utm_source=generator&si=eaf79c46e33149ab",
          body: "",
        },
      },
      {
        id: "eight-d-mixes",
        label: "8D Mixes",
        x: 9.45,
        y: 40.63,
        stimulatedPosition: { x: 37.34, y: 37.24 },
        direction: "right",
        variant: "dot",
        modal: {
          title: "8D Mixes",
          spotifyEmbed: "https://open.spotify.com/embed/artist/5l3q6xxRsELcm2cIJNey8R?utm_source=generator&theme=0",
          body:
            "8D audio (eight-dimensional audio) is a type of spatial audio editing that makes a standard stereo song feel as if it is moving in a 360-degree circle around the listener's head. Producers create an effect by automating panning, volume shifts, and spatial reverb, making sounds travel, rotate, and change distance to the ear.\n\nThe listener's brain continues re-locating the source as it moves, making 8D immersive, trippy, and cinematic. This auditory illusion is designed specifically for headphone users, and it allows listeners to have a calming auditory experience.",
          links: [
            { label: "Spotify", href: "https://open.spotify.com/artist/5l3q6xxRsELcm2cIJNey8R" },
            { label: "About The Engineer", href: "modal:peri" },
            { label: "Request an 8D Mix", href: "mailto:contact@EmteeMusicGroup.com?subject=8D%20Mix%20Request" },
          ],
        },
      },
      {
        id: "peri",
        label: "PERI",
        x: 0,
        y: 0,
        hidden: true,
        modal: {
          title: "PERI",
          mobileImage: {
            src: "/rooms/peri-profile-mobile.jpg",
            alt: "Three portraits of PERI, Canadian-Guyanese music producer, songwriter and engineer",
            width: 1920,
            height: 1080,
          },
          imageGallery: [
            {
              src: "/rooms/peri-portrait-smiling.jpg",
              alt: "PERI smiling and holding the brim of his hat",
              width: 1365,
              height: 2048,
            },
            {
              src: "/rooms/peri-portrait-standing.jpg",
              alt: "PERI standing against a warm yellow backdrop",
              width: 1365,
              height: 2048,
            },
            {
              src: "/rooms/peri-portrait-jacket.jpg",
              alt: "PERI with a leather jacket over his shoulder",
              width: 1365,
              height: 2048,
            },
          ],
          body:
            "PERI is a Canadian-Guyanese music producer, songwriter and engineer. PERI currently works closely with Emtee Music Group where he previously worked as an A&R. Today, PERI works closely with Kym Tea and Steeped Dreams Studio as he develops 8D and acoustic mixes for the neuro-diverse community to enjoy with comfort. PERI is currently available for projects requiring 8D mixes.",
          links: [
            { label: "Spotify", href: "https://open.spotify.com/artist/5l3q6xxRsELcm2cIJNey8R" },
            { label: "Request an 8D Mix", href: "mailto:contact@EmteeMusicGroup.com?subject=8D%20Mix%20Request" },
          ],
        },
      },
      {
        id: "steeped-dreams-studio",
        label: "Steeped Dreams Studio",
        x: 44.08,
        y: 24.74,
        stimulatedPosition: { x: 32.45, y: 32.96 },
        stimulatedDirection: "left",
        direction: "right",
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
        stimulatedLabel: "Understimulated? Get Hyped",
        stimulatedModal: {
          title: "Understimulated? Get Hyped",
          videoSrc: "/rooms/steeped-dreams-get-hyped.mp4",
          videoPoster: "/rooms/steeped-dreams-get-hyped-poster.jpg",
          secondaryLabel: "Watch on YouTube",
          secondaryHref: "https://www.youtube.com/watch?v=Ojnr3EuNCc8",
          body: "",
        },
        x: 45.81,
        y: 47.32,
        stimulatedPosition: { x: 25.27, y: 73.61 },
        direction: "left",
        variant: "dot",
        modal: {
          title: "Overstimulated? Chill Out",
          videoSrc: "/rooms/steeped-dreams-chill-out.mp4",
          videoPoster: "/rooms/steeped-dreams-chill-out-poster.jpg",
          secondaryLabel: "Watch on YouTube",
          secondaryHref: "https://www.youtube.com/watch?v=fPd1YHokn-4",
          body: "",
        },
      },
    ],
  };
