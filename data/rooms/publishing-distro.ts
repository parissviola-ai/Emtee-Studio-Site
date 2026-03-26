import type { Room } from "./types";

export const publishingDistroRoom: Room = {
    slug: "publishing-distribution",
    title: "Distribution / Publishing",
    backgroundImage: "/rooms/cdshop-opt.jpg",
    hotspots: [
      { id: "next-room", label: "The Strategy Suite", href: "/rooms/ar-sales", x: 90, y: 17, direction: "right" },
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
        "Includes:\n• Confirming The Artist is Set-Up on All Necessary Platforms to Collect the $$ They Deserve\n• 60-90min Meeting",
      primaryLabel: "Apply For A Consultation",
      primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
      secondaryLabel: "Resources",
      secondaryHref: "/resources",
    },
  },

  {
    id: "publishing-platform-setup-review",
    label: "Platform Setup Review",
    x: 68,
    y: 58,
    direction: "right",
    variant: "dot",
    modal: {
      title: "Platform Setup Review",
      body:
        "Publishing/distribution readiness support focused on making sure key release platforms are correctly configured.\n\nIncludes:\n• Confirming The Artist is Set-Up on All Necessary Platforms to Collect the $$ They Deserve\n• 60-90min Meeting",
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
        "Includes:\n• Split sheet development for your releases\n• Everyone involved in the project gets their share of the song",
      primaryLabel: "Apply For A Consultation",
      primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
      secondaryLabel: "Resources",
      secondaryHref: "/resources",
    },
  },

    ],
    
    
  };
