import type { Room } from "./types";

export const publishingDistroRoom: Room = {
    slug: "EMTEEPublishingandDistroDept",
    title: "Distribution / Publishing",
    backgroundImage: "/rooms/cdshop.png",
    hotspots: [
      { id: "next-room", label: "Website Design", href: "/rooms/EMTEEWebDesign", x: 90, y: 17, direction: "right" },
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
      primaryLabel: "Request a Consultation",
      primaryHref: "/consultation",
      secondaryLabel: "Resource Packages",
      secondaryHref: "/connect",
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
      primaryLabel: "Request a Consultation",
      primaryHref: "/consultation",
      secondaryLabel: "Resource Packages",
      secondaryHref: "/connect",
    },
  },

    ],
    
    
  };
