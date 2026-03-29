import type { Room } from "./types";

export const businessRoom: Room = {
  slug: "business",
  title: "Business",
  backgroundImage: "/rooms/boardroom-opt.jpg",
  hotspots: [
    {
      id: "business-consultation",
      label: "Consultation",
      x: 48,
      y: 47,
      positions: {
        laptop: { x: 47, y: 50 },
        tablet: { x: 46, y: 51 },
        mobile: { x: 45, y: 53 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Consultation",
        body:
          "The first step is an indepth evaluation and report of an artists' career and business.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "business-brand-evaluation",
      label: "Brand Evaluation",
      x: 80,
      y: 46,
      positions: {
        laptop: { x: 79, y: 49 },
        tablet: { x: 77, y: 50 },
        mobile: { x: 75, y: 52 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Brand Evaluation",
        body:
          "Extensive brand development session to clarify vision and niche.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "business-operation-set-up",
      label: "Business Operation Set Up",
      x: 64,
      y: 78,
      positions: {
        laptop: { x: 64, y: 78 },
        tablet: { x: 62, y: 76 },
        mobile: { x: 60, y: 74 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Business Operation Set Up",
        body:
          "Business licensing, bank set up and tax set up.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "business-income-evaluation",
      label: "Accounting Set Up",
      x: 43.17,
      y: 71.93,
      positions: {
        laptop: { x: 32, y: 64 },
        tablet: { x: 31, y: 65 },
        mobile: { x: 30, y: 66 },
      },
      direction: "left",
      variant: "dot",
      modal: {
        title: "Accounting Set Up",
        body:
          "Financial systemization of bookeeping and payroll.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "business-six-month-project-roll-out",
      label: "6 Month Project Roll Out",
      x: 27.1,
      y: 62.4,
      positions: {
        laptop: { x: 22, y: 52 },
        tablet: { x: 21, y: 53 },
        mobile: { x: 20, y: 54 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "6 Month Project Roll Out",
        body:
          "Developing a plan for promo, production and campaign releases.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },
    {
      id: "business-twelve-month-career-roll-out",
      label: "12 Month Career Roll Out",
      x: 25.09,
      y: 63.54,
      positions: {
        laptop: { x: 49, y: 80 },
        tablet: { x: 48, y: 78 },
        mobile: { x: 47, y: 76 },
      },
      direction: "down",
      variant: "dot",
      modal: {
        title: "12 Month Career Roll Out",
        body:
          "Year long artist roll out taking into consideration all departments.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Resources",
        secondaryHref: "/resources",
      },
    },

    {
      id: "next-room",
      label: "Studio",
      href: "/rooms/music",
      x: 90,
      y: 17,
      positions: {
        laptop: { x: 89, y: 18 },
        tablet: { x: 87, y: 19 },
        mobile: { x: 85, y: 21 },
      },
      direction: "right",
    },
  ],
};
