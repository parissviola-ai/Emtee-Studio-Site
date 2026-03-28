import type { Room } from "./types";

export const arSalesRoom: Room = {
    slug: "ar-sales",
    title: "A&R / Sales",
    backgroundImage: "/rooms/8-opt.jpg",
    hotspots: [
      { id: "next-room", label: "Publishing and Distro", href: "/rooms/publishing-distribution", x: 90, y: 17, direction: "right", tier: "core" },

      {
        id: "ar-sales-crm-set-up",
        label: "CRM Set Up",
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
            "Assistance in the monitization of fan clubs and support groups.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "ar-sales-streaming",
        label: "Streaming",
        tier: "secondary",
        x: 24,
        y: 47,
        positions: {
          mobile: { x: 27, y: 46 },
        },
        allowLargeResponsiveShift: true,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Streaming",
          body:
            "Developing a live stream system to allow greater monetization.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
    ],
  };
