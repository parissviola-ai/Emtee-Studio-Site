import type { Room } from "./types";

export const businessRoom: Room = {
  slug: "business",
  title: "Meeting Room",
  backgroundImage: "/rooms/meetingroomfinall.png",
  hotspots: [
    {
      id: "business-consultation",
      label: "Consultation",
      x: 46.9,
      y: 59.18,
      positions: {
        laptop: { x: 47, y: 50 },
        tablet: { x: 46.9, y: 59.18 },
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
      x: 75.89,
      y: 54.9,
      positions: {
        laptop: { x: 79, y: 49 },
        tablet: { x: 75.89, y: 54.9 },
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
      x: 43.32,
      y: 76.04,
      positions: {
        laptop: { x: 64, y: 78 },
        tablet: { x: 43.32, y: 76.04 },
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
      x: 69.85,
      y: 85.56,
      positions: {
        laptop: { x: 32, y: 64 },
        tablet: { x: 69.85, y: 85.56 },
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
      x: 25.04,
      y: 65.12,
      positions: {
        laptop: { x: 22, y: 52 },
        tablet: { x: 25.04, y: 65.12 },
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
      x: 24.74,
      y: 67.48,
      positions: {
        laptop: { x: 49, y: 80 },
        tablet: { x: 24.74, y: 67.48 },
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
        tablet: { x: 90, y: 17 },
        mobile: { x: 85, y: 21 },
      },
      direction: "right",
    },
  ],
};
