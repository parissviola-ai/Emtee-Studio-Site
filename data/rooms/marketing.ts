import type { Room } from "./types";

export const marketingRoom: Room = {
    slug: "EMTEEMarketingDept",
    title: "Marketing",
    backgroundImage: "/rooms/marketing1.png",
    hotspots: [
      { id: "next-room", label: "Publishing and Distro", href: "/rooms/EMTEEPublishingandDistroDept", x: 90, y: 17, direction: "right" },
      {
        id: "marketing-content-creation",
        label: "Content Creation",
        x: 50,
        y: 30,
        direction: "right",
        variant: "dot",
        modal: {
          title: "Content Creation",
          body:
            "Marketing department content package.\n\nIncludes:\n• 3-4 Pieces of Content (per month)\n• 1 Content Day (per month)\n• 1hr Brainstorm Meeting (per month)",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-brand-deck-epk",
        label: "Brand Deck + EPK",
        x: 3,
        y: 50,
        direction: "left",
        variant: "dot",
        modal: {
          title: "Brand Deck + EPK",
          body:
            "Marketing department branding package.\n\nIncludes:\n• 1-2 Page Electronic Press Kit\n• 1 Pager on Branding Aesthetic\n• 60-90min Meeting",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-tour-management",
        label: "Tour Management",
        x: 45,
        y: 80,
        direction: "down",
        variant: "dot",
        modal: {
          title: "Tour Management",
          body:
            "Marketing department live support package.\n\nIncludes:\n• BTS Footage\n• Road Manager",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-brand-deck",
        label: "Brand Deck",
        x: 6,
        y: 34,
        direction: "left",
        variant: "dot",
        modal: {
          title: "Brand Deck",
          body:
            "Marketing department branding package.\n\nIncludes:\n• 1 Pager on Branding Aesthetic\n• 60-90min Meeting\n• Develop Marketing Campaign",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-30min-live-performance-set-development",
        label: "30min Live Set Development",
        x: 80,
        y: 30,
        direction: "down",
        variant: "dot",
        modal: {
          title: "30min Live Performance Set Development",
          body:
            "Marketing department live performance package.\n\nIncludes:\n• One Emtee Music Group Executive Advisor\n• One Ten Ten Executive Advisor\n• Rehearsal Space",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-60min-live-performance-set-development",
        label: "60min Live Set Development",
        x: 25,
        y: 37,
        direction: "up",
        variant: "dot",
        modal: {
          title: "60min Live Performance Set Development",
          body:
            "Marketing department expanded live performance package.\n\nIncludes:\n• One Emtee Music Group Executive Advisor\n• One Ten Ten Executive Advisor\n• Rehearsal Space",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "marketing-brand-deals",
        label: "Brand Deals",
        x: 78,
        y: 65,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Brand Deals",
          body:
            "Marketing department partnership package.\n\nIncludes:\n• Brand partnership strategy and activation roadmap",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
    ],
  };
