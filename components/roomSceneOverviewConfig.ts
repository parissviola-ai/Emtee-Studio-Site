export type InfoCard = {
  title: string;
  body: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  strategyLabel?: string;
  exampleArtist?: string;
  exampleHref?: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  socialLinks?: Array<{ label: string; href: string }>;
};

const BANK_VAULT_OVERVIEW_CARD: InfoCard = {
  title: "A&R / Sales Department",
  body:
    "The board room holds all A&R/Sales department ventures. Core scope of work in this department includes audience strategy, community building and revenue generation.\n\nExplore the room dots to view what EMTEE is able to do with your A&R/Sales Department.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Mike Cannz",
  exampleHref: "/case-studies/mike-cannz",
  eyebrow: "Board Room",
};

const STUDIO_OVERVIEW_CARD: InfoCard = {
  title: "Music Department",
  body:
    "This room is a representation of EMTEE's Music department. Core scope includes studio sessions, custom production, and mixing/mastering so artists move from creative direction to release-ready execution.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Fame Holiday",
  exampleHref: "/case-studies/fame-holiday",
  eyebrow: "Studio",
};

const MEDIA_OVERVIEW_CARD: InfoCard = {
  title: "Marketing Department",
  body:
    "This room is a representation of EMTEE's Marketing department. Core scope includes content production, brand deck/media kits, and set/tour development to drive campaign clarity and repeatable audience growth.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "KISAKI",
  exampleHref: "/case-studies/kisaki",
  eyebrow: "Photo Studio",
};

const BOARDROOM_OVERVIEW_CARD: InfoCard = {
  title: "Business Department",
  body:
    "This room is a representation of EMTEE's Business department. Core scope includes accounting system setup, grant writing, and vision building so artists can operate with structure and long-term decision clarity.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Yanchan Produced",
  exampleHref: "/case-studies/yanchan",
  eyebrow: "Meeting Room",
};

const ARTISTS_OVERVIEW_CARD: InfoCard = {
  title: "Distribution / Publishing Department",
  body:
    "This room is a representation of EMTEE's Distribution / Publishing department. Core scope includes publishing workshops, catalog organization, and television/film sync preparation for cleaner release operations and stronger long-term rights monetization.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Yanchan Produced",
  exampleHref: "/case-studies/yanchan",
  eyebrow: "Catalog Room",
};

const WEBSITE_DESIGN_OVERVIEW_CARD: InfoCard = {
  title: "Website Development",
  body:
    "This room is a representation of EMTEE's Website Development lane. Core scope includes clarifying your artist story, structuring your digital home, and building a site fans, media, and bookers can actually use.\n\nExplore the room dots to view process and package options.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  eyebrow: "Website Development",
};

export function getActiveOverviewCard(roomSlug: string): InfoCard | null {
  switch (roomSlug) {
    case "ar-sales":
      return BANK_VAULT_OVERVIEW_CARD;
    case "music":
      return STUDIO_OVERVIEW_CARD;
    case "marketing":
      return MEDIA_OVERVIEW_CARD;
    case "business":
      return BOARDROOM_OVERVIEW_CARD;
    case "publishing-distribution":
      return ARTISTS_OVERVIEW_CARD;
    case "EMTEEWebDesign":
      return WEBSITE_DESIGN_OVERVIEW_CARD;
    default:
      return null;
  }
}
