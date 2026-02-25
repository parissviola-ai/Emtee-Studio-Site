import type { Room } from "./types";

export const businessRoom: Room = {
  slug: "EMTEEBusinessDept",
  title: "Business",
  backgroundImage: "/rooms/boardroom-opt.jpg",
  hotspots: [
    {
      id: "business-consultation",
      label: "Consultation",
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
        title: "Consultation",
        body:
          "Business department resource package for first-step strategy alignment.\n\nIncludes:\n• Recommendation List\n• 60-90min Meeting\n• Artist Report",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "business-brand-evaluation",
      label: "Brand Evaluation",
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
        title: "Brand Evaluation",
        body:
          "Business department brand-direction package.\n\nIncludes:\n• Niche\n• 2-3hr Meeting focused on Vision, Mission, Values",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "business-operations-set-up",
      label: "Business Operations Set-Up",
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
        title: "Business Operations Set-Up",
        body:
          "Business operations setup package.\n\nIncludes:\n• Bookkeeping\n• Tax Advisory\n• Set-up Proper Business Bank Account\n• Set-up Proper Business Licensing\n• Income Evaluation",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "business-income-evaluation",
      label: "Income Evaluation",
      x: 43,
      y: 74,
      positions: {
        laptop: { x: 32, y: 64 },
        tablet: { x: 31, y: 65 },
        mobile: { x: 30, y: 66 },
      },
      direction: "left",
      variant: "dot",
      modal: {
        title: "Income Evaluation",
        body:
          "Business department finance review package.\n\nIncludes:\n• Assessing Business Finance",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "business-six-month-rollout-strategy-plan",
      label: "6-Month Rollout Strategy Plan",
      x: 53,
      y: 63,
      positions: {
        laptop: { x: 22, y: 52 },
        tablet: { x: 21, y: 53 },
        mobile: { x: 20, y: 54 },
      },
      direction: "right",
      variant: "dot",
      modal: {
        title: "6-Month Rollout Strategy Plan",
        body:
          "Business department strategy package.\n\nIncludes:\n• 2hr Meeting Focused on Long Term Strategy",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },
    {
      id: "business-twelve-month-rollout-strategy-plan",
      label: "12-Month Rollout Strategy Plan",
      x: 45,
      y: 80,
      positions: {
        laptop: { x: 49, y: 80 },
        tablet: { x: 48, y: 78 },
        mobile: { x: 47, y: 76 },
      },
      direction: "down",
      variant: "dot",
      modal: {
        title: "12-Month Rollout Strategy Plan",
        body:
          "Business department long-range strategy package.\n\nIncludes:\n• 3hr Meeting Focused on Long Term Strategy",
        primaryLabel: "Request a Consultation",
        primaryHref: "/consultation",
        secondaryLabel: "Resource Packages",
        secondaryHref: "/connect",
      },
    },

    {
      id: "next-room",
      label: "Studio",
      href: "/rooms/EMTEEMusicDept",
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
