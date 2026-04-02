import type { Room } from "./types";

export const marketingRoom: Room = {
    slug: "marketing",
    title: "Photo Studio",
    backgroundImage: "/rooms/finalmarketingdj-opt.jpg",
    hotspots: [
      { id: "next-room", label: "A&R / Sales", href: "/rooms/ar-sales", x: 90, y: 17, direction: "right" },
      {
        id: "marketing-content-production",
        label: "Content Production",
        x: 9.01,
        y: 42.69,
        direction: "right",
        variant: "dot",
      modal: {
        title: "Content Production",
        body:
          "Brainstorming, shooting and editing while developing set content series.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-brand-deck-epk",
        label: "EPK",
        x: 3.49,
        y: 22.74,
        direction: "left",
        variant: "dot",
      modal: {
        title: "EPK",
        body:
          "One-pager for promo and press.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-tour-management",
        label: "Tour Management",
        x: 33.39,
        y: 81.2,
        direction: "down",
        variant: "dot",
      modal: {
        title: "Tour Management",
        body:
          "On-road assistance, bookings and tour strategy.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Case Study: KISAKI",
          secondaryHref: "/case-studies/kisaki",
        },
      },
      {
        id: "marketing-brand-deck",
        label: "Brand Deck",
        x: 5.42,
        y: 27.04,
        direction: "left",
        variant: "dot",
      modal: {
        title: "Brand Deck",
        body:
          "Extensive development of set brand standards including font, colours and feelings.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-30min-ten-ten-entertainment-performance-set-development",
        label: "Live Performance Development",
        x: 88.18,
        y: 25.37,
        direction: "down",
        variant: "dot",
      modal: {
        title: "Live Performance Development",
        body:
          "Assistance in the development of an artist's live set.",
        links: [
          { label: "View Kisaki Case Study", href: "/case-studies/kisaki" },
          { label: "View Yanchan Case Study", href: "/case-studies/yanchan?example=yanchan-marketing" },
          ],
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Case Study: KISAKI",
          secondaryHref: "/case-studies/kisaki",
        },
      },
      {
        id: "marketing-60min-ten-ten-entertainment-performance-set-development",
        label: "BTS Content Production",
        x: 23.18,
        y: 30.37,
        direction: "up",
        variant: "dot",
      modal: {
        title: "BTS Content Production",
        body:
          "Shooting, editing and scripting BTS-style reels.",
        links: [
          { label: "View Kisaki Case Study", href: "/case-studies/kisaki" },
          { label: "View Yanchan Case Study", href: "/case-studies/yanchan?example=yanchan-marketing" },
        ],
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
        },
      },
      {
        id: "marketing-brand-deals",
        label: "Brand Partnership Strategies",
        x: 19.48,
        y: 81.39,
        direction: "up",
        variant: "dot",
      modal: {
        title: "Brand Partnership Strategies",
        body:
          "Developing a strategy for corporate partnerships and collaborations.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-website-development",
        label: "Website Development",
        x: 85.83,
        y: 71.94,
        direction: "up",
        variant: "dot",
      modal: {
        title: "Website Development",
        body:
          "High-level website design and development.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-event-planning",
        label: "Event Planning",
        x: 62.81,
        y: 36.2,
        direction: "up",
        variant: "dot",
        modal: {
          title: "Event Planning",
          body:
            "Assisting in the development of new events.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
      {
        id: "marketing-on-site-dj",
        label: "On-site DJ",
        x: 72.29,
        y: 42.87,
        direction: "up",
        variant: "dot",
        modal: {
          title: "On-site DJ",
          body:
            "On-site DJ support for events, activations and live experiences.",
          primaryLabel: "Apply For A Consultation",
          primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
          secondaryLabel: "Resources",
          secondaryHref: "/resources",
        },
      },
    ],
  };
