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
  exampleArtists?: Array<{ artist: string; href: string }>;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  socialLinks?: Array<{ label: string; href: string }>;
};

const BANK_VAULT_OVERVIEW_CARD: InfoCard = {
  title: "A&R / Sales Department",
  body:
    "The board room holds all A&R/Sales department ventures. Core scope of work in this department includes audience strategy, community building and revenue generation. Explore the room dots to view what EMTEE is able to do with your A&R/Sales Department.",
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
    "The studio is where the magic happens. In the music department we're not only concerns about making music we'll looking to help you find a sound and identity. This is where we'll make sure you get the right writing development, production, mixing and mastering. Explore the room dots to view what EMTEE is able to do with your Music Department.",
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
    "The photo studio is where you'll find out marketing department. This is where we help artists develop their content strategy, brand partnerships as well as their live touring/performance strategy. Explore the room dots to see what EMTEE can add to your Marketing Department.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtists: [
    { artist: "KISAKI", href: "/case-studies/kisaki" },
    { artist: "Yanchan Produced", href: "/case-studies/yanchan?example=yanchan-marketing" },
  ],
  eyebrow: "Photo Studio",
};

const BOARDROOM_OVERVIEW_CARD: InfoCard = {
  title: "Business Department",
  body:
    "The meeting room is where we discuss all business related projects and tasks. The business department is responsible for the initial consultation and brand sessions. This department will also help set up your business licensing, accounting, banking and grant strategies. Explore the room dots to view what EMTEE is able to do with your Business Department.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Yanchan Produced",
  exampleHref: "/case-studies/yanchan?example=yanchan-business",
  eyebrow: "Meeting Room",
};

const ARTISTS_OVERVIEW_CARD: InfoCard = {
  title: "Distribution / Publishing Department",
  body:
    "The catalog room is where our Publishing & Distribution Department lives. This is where you'll go to discuss how to distribute your music and how to make sure you are collecting all the royalties that are owed to you.",
  primaryCta: "Apply For A Consultation",
  primaryHref: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy",
  strategyLabel: "Case Study",
  exampleArtist: "Yanchan Produced",
  exampleHref: "/case-studies/yanchan?example=yanchan-publishing-distro",
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
