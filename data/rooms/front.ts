import type { Room } from "./types";

export const frontRoom: Room = {
    slug: "front",
    title: "Lobby",
    backgroundImage: "/rooms/lobby-opt.jpg",
    hotspots: [
      {
        id: "News",
        label: "News",
        href: "/news",
        x: 72,
        y: 44,
        positions: {
          laptop: { x: 71, y: 45 },
          tablet: { x: 70, y: 46 },
          mobile: { x: 68, y: 47 },
        },
      },
      {
        id: "Board Rooms",
        label: "Board Room",
        href: "/rooms/EMTEEBusinessDept",
        x: 40,
        y: 45,
        positions: {
          laptop: { x: 39, y: 46 },
          tablet: { x: 38, y: 47 },
          mobile: { x: 36, y: 49 },
        },
      },
      {
        id: "Studio",
        label: "Studio",
        href: "/rooms/EMTEEMusicDept",
        x: 49,
        y: 50,
        positions: {
          laptop: { x: 48, y: 51 },
          tablet: { x: 47, y: 52 },
          mobile: { x: 46, y: 54 },
        },
      },
      {
        id: "explore",
        label: "Explore All Rooms",
        action: "explore",
        x: 92,
        y: 40,
        positions: {
          laptop: { x: 91, y: 41 },
          tablet: { x: 89, y: 42 },
          mobile: { x: 87, y: 43 },
        },
      },

       // ✅ Departments FIRST (opens modal)
    {
      id: "departments",
      label: "Departments",
      x: 54,
      y: 48,
      positions: {
        laptop: { x: 53, y: 49 },
        tablet: { x: 52, y: 50 },
        mobile: { x: 50, y: 52 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Departments",
        body:
          "Each department is a package lane inside our artist development system, built to move your music, brand, and business with structure.\n\nChoose the path that matches your stage, then execute with a clear rollout framework.",
        image: "/rooms-misc/departmentschart.avif",
        primaryLabel: "See How These Packages Perform in Case Studies",
        primaryHref: "/case-studies",
        secondaryLabel: "View Resource Packages",
        secondaryHref: "/connect",
      },
    },

    // ✅ How You Start (opens modal)
    {
      id: "how-you-start",
      label: "How You Start",
      x: 21,
      y: 52,
      positions: {
        laptop: { x: 22, y: 52 },
        tablet: { x: 23, y: 53 },
        mobile: { x: 24, y: 55 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "How You Start",
        body:
          "This is your artist-development starting path: diagnose your current stage, select the right package lane, and execute in sequence so each move builds momentum.\n\nUse this site as the roadmap to understand where you are now and what to do next.",
        image: "/rooms-misc/how-you-start.avif",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
      },
    },
    {
      id: "About",
      label: "Who We Are",
      x: 25,
      y: 40,
      positions: {
        laptop: { x: 26, y: 41 },
        tablet: { x: 27, y: 42 },
        mobile: { x: 28, y: 44 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Who We Are",
        videoEmbed:
          "https://www.youtube.com/embed/SePmCgtpw6s?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&enablejsapi=1",
        body:
          "Emtee Music Group began in the pits of the pandemic, formed by a small collective of music managers, producers, and industry professionals stalled by the inaction of major labels. Between 2021 and 2025, this team of disruptors operated an independent label that earned a Juno Award nomination, a Number 1 charting single on IG Music, and numerous releases and performances.\n\nThose outcomes shaped EMTEE's core philosophy: clarity before action, systems over randomness, and execution that compounds. Today, EMTEE operates as a creative business launch pad built on five pillars — music, brand, release, business, and live — with foundations that turn creative momentum into long-term career structure.",
        primaryLabel: "Why EMTEE Works",
        primaryHref: "/about",
      },
    },
    ],
  };
