import type { Room } from "./types";

export const publishingDistroRoom: Room = {
    slug: "publishing-distribution",
    title: "Distribution / Publishing",
    backgroundImage: "/rooms/cdshop-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Artist: Yanchan Produced", href: "/rooms/dirty-elephant-studio", x: 90, y: 17, direction: "right" },
      {
    id: "publishing-distribution-workshop",
    label: "Publishing/Distribution Workshop",
    x: 38,
    y: 48,
    direction: "up",
    variant: "dot",
    modal: {
      title: "Publishing/Distribution Workshop",
      body:
        "An hour long workshop to teach artists pub/distro 101.",
      primaryLabel: "Apply For A Consultation",
      primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
      secondaryLabel: "Resources",
      secondaryHref: "/resources",
    },
  },

  {
    id: "split-sheet-development",
    label: "Split Sheet Development",
    x: 58.57,
    y: 67.13,
    direction: "down",
    variant: "dot",
    modal: {
      title: "Split Sheet Development",
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
