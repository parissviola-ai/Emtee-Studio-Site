import type { Room } from "./types";

export const orangeRoom: Room = {
    slug: "orange",
    title: "Orange Room",
    backgroundImage: "/rooms/orangeroomm-v2-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Ten Ten Entertainment", href: "/rooms/live", x: 90, y:  20, direction: "right" },
      {
        id: "apply-custom-production",
        label: "Custom Production",
        x: 25,
        y: 54,
        positions: {
          laptop: { x: 24, y: 55 },
          tablet: { x: 23, y: 56 },
          mobile: { x: 22, y: 58 },
        },
        direction: "up",
        variant: "dot",
        modal: {
          title: "Apply For Custom Production",
          body:
            "Use the short form to submit your name and a link to your music so we can review fit for custom production.",
          primaryLabel: "Apply",
          primaryHref: "/custom-production-short-form",
          secondaryLabel: "Yanchan Produced Playlist",
          secondaryHref: "https://open.spotify.com/playlist/37i9dQZF1E4Abx1jG3AvIj?si=1kv1EGuXSfWyOJ44r1g4Zw",
          links: [
            { label: "Preview BTS of ORS (IG)", href: "https://www.instagram.com/p/DUn5iIUEZxh/" },
          ],
        },
      },
      {
        id: "yanchan-produced-music",
        label: "Yanchan Produced",
        x: 37,
        y: 59,
        positions: {
          laptop: { x: 36, y: 60 },
          tablet: { x: 35, y: 61 },
          mobile: { x: 34, y: 63 },
        },
        direction: "left",
        variant: "dot",
        modal: {
          title: "Yanchan Produced Music",
          body:
            "Yanchan is one of EMTEE Music Group's flagship artists, known for strong output, creative identity, and consistent momentum. Orange Room Sessions highlights his producer-led process and artist development approach.\n\nYanchan Produced is a Canadian-Tamil producer, mixing engineer, songwriter, and Mridangist. His solo and collaborative releases have earned 12M+ Spotify streams, with affiliations across reputable labels and collaborators including Russ, SVDP, Shruthi Hassan, Pressa, Kristina Maria, Yung Tory, and Charle$.",
          image: "/rooms/yanchanbiopic-opt.jpg",
          links: [
            { label: "Website", href: "https://yanchanproduced.com/" },
            { label: "Instagram", href: "https://www.instagram.com/yanchanproduced/" },
            { label: "Spotify", href: "https://open.spotify.com/artist/4GKSZvPRVHCR8TrVVWu9HH" },
            { label: "YouTube", href: "https://www.youtube.com/c/yanchanproduced" },
          ],
        },
      },
      {
        id: "yanchan-produced-discography",
        label: "Discography",
        x: 50,
        y: 70,
        positions: {
          laptop: { x: 49, y: 70 },
          tablet: { x: 48, y: 71 },
          mobile: { x: 47, y: 72 },
        },
        direction: "up",
        variant: "dot",
        modal: {
          title: "Yanchan Produced Discography",
          body:
            "Selected credits from Yanchan Produced's catalog, including award-recognized work and key collaborations.",
          highlightsTitle: "Credits & Milestones",
          highlights: [
            "FEATURE::ARUL - JUNO Award Nominated",
            "Lil Durk - Think You Glowed",
            "Russ - The Wind",
            "Shruti Hassan - Inimel",
            "Jonita - Beparwai",
            "Chai & Sunshine",
            "SVDP - mrdgm raps",
          ],
        },
      },
      {
        id: "apply-orange-room-session",
        label: "Orange Room Session",
        x: 95,
        y: 48,
        positions: {
          laptop: { x: 94, y: 48 },
          tablet: { x: 92, y: 49 },
          mobile: { x: 89, y: 50 },
        },
        direction: "left",
        variant: "dot",
        modal: {
          title: "Apply For An Orange Room Session",
          body:
            "Submit a short application to request an Orange Room Session slot.\n\nUse the preview link below to see the format and performance style.",
          primaryLabel: "Apply (Short Form)",
          primaryHref: "/orange-room-session",
          secondaryLabel: "Preview Orange Room Session",
          secondaryHref: "https://www.instagram.com/p/DUqfIvGER2F/",
        },
      },
      {
        id: "beatstore-buy-lease-beats",
        label: "Beatstore",
        x: 43,
        y: 54,
        positions: {
          laptop: { x: 42, y: 55 },
          tablet: { x: 41, y: 56 },
          mobile: { x: 40, y: 57 },
        },
        direction: "right",
        variant: "dot",
        href: "https://yanchanproduced.beatstars.com/",
      },
      {
        id: "yanchan-produced-live",
        label: "Yanchan Produced Live",
        x: 70,
        y: 54,
        positions: {
          laptop: { x: 69, y: 55 },
          tablet: { x: 68, y: 56 },
          mobile: { x: 66, y: 58 },
        },
        direction: "down",
        variant: "dot",
        modal: {
          title: "Yanchan Produced Live",
          body:
            "Live performance hub for show previews, upcoming dates, and ticket access.",
          videoEmbed:
            "https://www.youtube.com/embed/SePmCgtpw6s?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&enablejsapi=1",
          highlightsTitle: "Mock Tour Dates",
          highlights: [
            "Apr 18, 2026 · Toronto, ON · Rivoli",
            "May 02, 2026 · Montreal, QC · Le Belmont",
            "May 17, 2026 · New York, NY · SOB's",
            "Jun 06, 2026 · Chicago, IL · Subterranean",
            "Jun 20, 2026 · Los Angeles, CA · The Echo",
            "Jul 11, 2026 · Vancouver, BC · The Biltmore",
          ],
          primaryLabel: "Get Tickets",
          primaryHref: "https://www.stubhub.com/yanchan-produced-tickets/performer/150247431",
        },
      },
      {
        id: "join-community",
        label: "Join Community",
        x: 87,
        y: 86,
        positions: {
          laptop: { x: 86, y: 85 },
          tablet: { x: 84, y: 84 },
          mobile: { x: 82, y: 82 },
        },
        direction: "up",
        variant: "dot",
        modal: {
          title: "Join Community",
          body:
            "Choose your preferred community lane to connect directly with Yanchan and other producers.",
          image: "/rooms/yanchancrowd-opt.jpg",
          links: [
            { label: "IG Broadcast Channel", href: "https://www.instagram.com/yanchanproduced/" },
            { label: "Patreon", href: "https://www.patreon.com/" },
            { label: "Discord", href: "https://discord.com/" },
          ],
        },
      },
    ],
  };
