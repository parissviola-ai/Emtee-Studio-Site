import type { Room } from "./types";

export const businessRoom: Room = {
  slug: "business",
  title: "Meeting Room",
  backgroundImage: "/rooms/finalmeetingroom-opt.jpg",
  hotspots: [
    {
      id: "business-consultation",
      label: "Consultation",
      x: 46.9,
      y: 56.18,
      positions: {
        laptop: { x: 46.9, y: 56.18 },
        tablet: { x: 46.9, y: 56.18 },
        mobile: { x: 46.9, y: 56.18 },
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
        laptop: { x: 75.89, y: 54.9 },
        tablet: { x: 75.89, y: 54.9 },
        mobile: { x: 75.89, y: 54.9 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "Brand Evaluation",
        body:
          "Extensive brand development session to clarify vision and niche.",
        links: [
          { label: "Case Study: Mike Cannz", href: "/case-studies/mike-cannz?example=mike-ar-sales" },
        ],
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Case Study: Yanchan Produced",
        secondaryHref: "/case-studies/yanchan?example=yanchan-business",
      },
    },
    {
      id: "business-operation-set-up",
      label: "Business Operation Set Up",
      x: 43.32,
      y: 76.04,
      positions: {
        laptop: { x: 43.32, y: 76.04 },
        tablet: { x: 43.32, y: 76.04 },
        mobile: { x: 43.32, y: 76.04 },
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
        laptop: { x: 69.85, y: 85.56 },
        tablet: { x: 69.85, y: 85.56 },
        mobile: { x: 69.85, y: 85.56 },
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
      id: "business-grantwriting",
      label: "Grantwriting",
      x: 60.96,
      y: 69.24,
      positions: {
        laptop: { x: 60.96, y: 69.24 },
        tablet: { x: 60.96, y: 69.24 },
        mobile: { x: 60.96, y: 69.24 },
      },
      direction: "left",
      variant: "dot",
      modal: {
        title: "Grantwriting",
        body:
          "Strategic support for grant research, application development and submission readiness.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Case Study: Yanchan Produced",
        secondaryHref: "/case-studies/yanchan?example=yanchan-business",
      },
    },
    {
      id: "business-six-month-project-roll-out",
      label: "6 Month Project Roll Out",
      x: 25.04,
      y: 65.12,
      positions: {
        laptop: { x: 25.04, y: 65.12 },
        tablet: { x: 25.04, y: 65.12 },
        mobile: { x: 25.04, y: 65.12 },
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
        laptop: { x: 24.74, y: 67.48 },
        tablet: { x: 24.74, y: 67.48 },
        mobile: { x: 24.74, y: 67.48 },
      },
      direction: "down",
      variant: "dot",
      modal: {
        title: "12 Month Career Roll Out",
        body:
          "Year long artist roll out taking into consideration all departments.",
        primaryLabel: "Apply For A Consultation",
        primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        secondaryLabel: "Case Study: Yanchan Produced",
        secondaryHref: "/case-studies/yanchan?example=yanchan-business",
      },
    },

    {
      id: "next-room",
      label: "Studio",
      href: "/rooms/music",
      x: 90,
      y: 17,
      positions: {
        laptop: { x: 90, y: 17 },
        tablet: { x: 90, y: 17 },
        mobile: { x: 90, y: 17 },
      },
      direction: "right",
    },
  ],
};
