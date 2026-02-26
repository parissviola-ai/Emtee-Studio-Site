import type { Room } from "./types";

export const arSalesRoom: Room = {
    slug: "EMTEEARSalesDept",
    title: "A&R / Sales",
    backgroundImage: "/rooms/8.png",
    hotspots: [
      { id: "next-room", label: "Steeped Dreams Studio", href: "/rooms/quiet", x: 90, y: 17, direction: "right", tier: "core" },

      {
        id: "ar-sales-crm-set-up",
        label: "CRM Set-Up",
        tier: "core",
        x: 70,
        y: 13,
        positions: {
          mobile: { x: 68, y: 9 },
        },
        allowLargeResponsiveShift: true,
        direction: "right",
        variant: "dot",
        modal: {
          title: "CRM Set-Up",
          body:
            "A&R/Sales department CRM package.\n\nIncludes:\n• a Full CRM Automation",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "ar-sales-community-building",
        label: "Community Building",
        tier: "core",
        x: 45,
        y: 49,
        positions: {
          mobile: { x: 48, y: 42 },
        },
        allowLargeResponsiveShift: true,
        direction: "down",
        variant: "dot",
        modal: {
          title: "Community Building",
          body:
            "A&R/Sales audience growth package.\n\nIncludes:\n• Personal Community (for your die hard fans) Growth on All\n• Necessary Platforms Including Membership Based",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "ar-sales-crm-retainer",
        label: "CRM Fee/Retainer",
        tier: "secondary",
        x: 15,
        y: 67,
        positions: {
          mobile: { x: 19, y: 62 },
        },
        allowLargeResponsiveShift: true,
        direction: "right",
        variant: "dot",
        modal: {
          title: "CRM Fee/Retainer",
          body:
            "A&R/Sales CRM management package.\n\nIncludes:\n• Oversight + Updating the CRM platform",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "ar-sales-merchandise",
        label: "Merchandise",
        tier: "secondary",
        x: 84,
        y: 58,
        positions: {
          mobile: { x: 86, y: 60 },
        },
        allowLargeResponsiveShift: true,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Merchandise",
          body:
            "A&R/Sales merchandise package.\n\nIncludes:\n• Online Merch Store",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "ar-sales-event-planning",
        label: "Event Planning",
        tier: "core",
        x: 69,
        y: 65,
        positions: {
          mobile: { x: 67, y: 60 },
        },
        allowLargeResponsiveShift: true,
        direction: "down",
        variant: "dot",
        modal: {
          title: "Event Planning",
          body:
            "A&R/Sales event strategy package.\n\nIncludes:\n• Event Strategy\n• Revenue Strategy\n• Promo Strategy",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
      {
        id: "ar-sales-event-planner",
        label: "Event Planner",
        tier: "secondary",
        x: 42,
        y: 77,
        positions: {
          mobile: { x: 42, y: 71 },
        },
        allowLargeResponsiveShift: true,
        direction: "right",
        variant: "dot",
        modal: {
          title: "Event Planner",
          body:
            "A&R/Sales event execution package.\n\nIncludes:\n• Event Strategy\n• Revenue Strategy\n• Promo Strategy\n• On-Site Manager/Coordinator",
          primaryLabel: "Request a Consultation",
          primaryHref: "/consultation",
          secondaryLabel: "Resource Packages",
          secondaryHref: "/connect",
        },
      },
    ],
  };
