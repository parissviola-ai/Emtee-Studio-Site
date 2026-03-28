import type { Room } from "./types";

export const publishingDistroRoom: Room = {
    slug: "publishing-distribution",
    title: "Distribution / Publishing",
    backgroundImage: "/rooms/cdshop-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Artist: Yanchan Produced", href: "/rooms/dirty-elephant-studio", x: 90, y: 17, direction: "right" },
      {
    id: "publishing-distro-workshop",
    label: "Publishing/Distro Workshop",
    x: 38,
    y: 48,
    direction: "up",
    variant: "dot",
    modal: {
      title: "Publishing/Distro Workshop",
      body:
        "An hour long workshop to teach artists pub/distro 101.",
      primaryLabel: "Apply For A Consultation",
      primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
      secondaryLabel: "Resources",
      secondaryHref: "/resources",
    },
  },

  {
    id: "split-sheet-set-up",
    label: "Split Sheet Set Up",
    x: 52,
    y: 38,
    direction: "down",
    variant: "dot",
    modal: {
      title: "Split Sheet Set Up",
      body:
        "Developing a split sheet to help organize royalty and ownership.",
      primaryLabel: "Apply For A Consultation",
      primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
      secondaryLabel: "Resources",
      secondaryHref: "/resources",
    },
  },

    ],
    
    
  };
