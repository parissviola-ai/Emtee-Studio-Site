import type { Room } from "./types";

export const arSalesRoom: Room = {
    slug: "ar-sales",
    title: "A&R / Sales",
    backgroundImage: "/rooms/8-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Publishing and Distro", href: "/rooms/publishing-distribution", x: 90, y: 17, direction: "right", tier: "core" },

      {
        id: "ar-sales-crm-set-up",
        label: "CRM Set-Up",
        tier: "core",
        x: 70,
        y: 20,
        positions: {
          mobile: { x: 68, y: 16 },
        },
        allowLargeResponsiveShift: true,
        direction: "right",
        variant: "dot",
        modal: {
          title: "CRM Set-Up",
          body:
            "A&R/Sales department CRM package.\n\nIncludes:\n• a Full CRM Automation",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-community-building",
        label: "Community Building",
        tier: "core",
        x: 44.17,
        y: 45.19,
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
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-crm-retainer",
        label: "CRM Fee/Retainer",
        tier: "secondary",
        x: 17.45,
        y: 59.54,
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
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-merchandise",
        label: "Merchandise",
        tier: "secondary",
        x: 88.91,
        y: 55.65,
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
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-event-planning",
        label: "Event Planning",
        tier: "core",
        x: 66.56,
        y: 58.43,
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
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-event-planner",
        label: "Event Planner",
        tier: "secondary",
        x: 41.09,
        y: 70,
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
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
    ],
  };
