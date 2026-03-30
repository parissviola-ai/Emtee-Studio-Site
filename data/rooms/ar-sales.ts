import type { Room } from "./types";

export const arSalesRoom: Room = {
    slug: "ar-sales",
    title: "Board Room",
    backgroundImage: "/rooms/finalarsales-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Publishing and Distro", href: "/rooms/publishing-distribution", x: 90, y: 17, direction: "right", tier: "core" },

      {
        id: "ar-sales-crm-set-up",
        label: "CRM Set Up",
        tier: "core",
        x: 68.33,
        y: 58.67,
        positions: {
          mobile: { x: 68, y: 16 },
        },
        allowLargeResponsiveShift: true,
        direction: "right",
        variant: "dot",
      modal: {
        title: "CRM Set Up",
        body:
            "High level CRM set up to develop company valuation and lead generation pipelines.",
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
        x: 43.54,
        y: 70.53,
        positions: {
          mobile: { x: 48, y: 42 },
        },
        allowLargeResponsiveShift: true,
        direction: "down",
        variant: "dot",
      modal: {
        title: "Community Building",
        body:
            "Assistance in the monitization of fan clubs and support groups.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        },
      },
      {
        id: "ar-sales-streaming",
        label: "Live Stream Strategy",
        tier: "secondary",
        x: 45.31,
        y: 48.49,
        positions: {
          mobile: { x: 27, y: 46 },
        },
        allowLargeResponsiveShift: true,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Live Stream Strategy",
          body:
            "Developing a live stream system to allow greater monetization.",
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
        x: 81.25,
        y: 50.62,
        positions: {
          mobile: { x: 86, y: 60 },
        },
        allowLargeResponsiveShift: true,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Merchandise",
          body:
            "Merchandising setup and storefront support for artist products.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
    ],
  };
