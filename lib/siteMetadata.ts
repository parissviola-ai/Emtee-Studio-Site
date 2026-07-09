import type { Metadata } from "next";

export const SITE_URL = "https://www.emteemusicgroup.com";
export const SITE_NAME = "Emtee Music Group";
export const BUSINESS_NAME = "Emtee Music Group Inc.";
export const CONTACT_EMAIL = "contact@emteemusicgroup.com";
export const SOCIAL_LINKS = [
  "https://instagram.com/emteemusicgroup",
  "https://facebook.com/emteemusicgroup",
];

export const SITE_DESCRIPTION =
  "The official website for Emtee Music Group, the first ever creative business launchpad. EMTEE is where music and the creative arts come to develop all the foundational pieces to build a sound and stable business in the creative world.";

export const PAGE_METADATA = {
  home: {
    title: "Welcome to Emtee Music Group",
    description:
      'When you "ENTER" the building, you\'ll notice multiple interactive rooms to explore. For the best experience, click "Start Here" to begin the tour. To have a self-led tour click "Show Rooms" or "Explore All Rooms."',
  },
  about: {
    title: "About",
    description:
      "Information on Emtee Music Group. The history of the company as well as a presentation of their philosophies, beliefs and approaches in music and business development.",
  },
  resources: {
    title: "Resources",
    description:
      "Browse each Emtee Music Group department to explore the resources, capabilities, and in-house support available across business, music, marketing, A&R / sales, and publishing / distribution.",
  },
  artistAffiliations: {
    title: "Artists & Partners",
    description:
      "A list of different artists, labels and businesses that Emtee Music Group is affiliated with, have worked with or is connected to in some capacity.",
  },
  caseStudies: {
    title: "Case Studies",
    description:
      "Clients of present and past who have benefited from the systemization of their businesses through EMTEE resources. Get to know Yanchan Produced's artist development processes.",
  },
  news: {
    title: "News",
    description:
      "News and highlights for Emtee Music Group and the different artists and team members.",
  },
  lobby: {
    title: "Lobby",
    description:
      "Welcome to Emtee Music Group. The home page or \"LOBBY\" of Emtee Music Group is where you will find a guided tour throughout our launchpad. For a self-guided tour visitors can also browse through on their own.",
  },
  business: {
    title: "Business Room",
    description:
      "Welcome to Emtee Music Group. The meeting room is where we discuss all business-related projects and tasks. The business department is responsible for the initial consultation and brand sessions. This department will also help set up your business licensing, accounting, banking and grant strategies. Explore the room dots to view what EMTEE is able to do with your Business Department.",
  },
  music: {
    title: "Music Room",
    description:
      "Welcome to Emtee Music Group. The studio is where the magic happens. In the music department we're not only concerned about making music; we're looking to help you find a sound and identity. This is where we'll make sure you get the right writing development, production, mixing and mastering. Explore the room dots to view what EMTEE is able to do with your Music Department.",
  },
  marketing: {
    title: "Marketing Room",
    description:
      "Welcome to Emtee Music Group. The photo studio is where you'll find our marketing department. This is where we help artists develop their content strategy, brand partnerships, as well as their live touring and performance strategy. Explore the room dots to see what EMTEE can add to your Marketing Department.",
  },
  arSales: {
    title: "A&R / Sales Room",
    description:
      "Welcome to Emtee Music Group. The board room holds all A&R/Sales department ventures. Core scope of work in this department includes audience strategy, community building and revenue generation. Explore the room dots to view what EMTEE is able to do with your A&R/Sales Department.",
  },
  publishingDistribution: {
    title: "Publishing / Distribution Room",
    description:
      "The catalog room is where our Publishing & Distribution Department lives. This is where you'll go to discuss how to distribute your music and how to make sure you are collecting all the royalties that are owed to you.",
  },
  dirtyElephantStudio: {
    title: "Dirty Elephant Studios",
    description:
      "Welcome to Emtee Music Group. Dirty Elephant Studios is the brainchild of Yanchan Rajmohan. In collaboration with Emtee Music Group Yanchan has built a successful business revolving around his vision to bridge the gap between South Indian traditional culture/music with contemporary western top 40 in North America. Dirty Elephant Studios is the space for artists and fans to get a chance to collaborate on custom production, guest in an Orange Room Session and keep up-to-date with Yanchan Produced Live, Yanchan's live performance experience.",
  },
  tenTenEntertainment: {
    title: "Ten Ten Entertainment",
    description:
      'Welcome to Emtee Music Group. Ten Ten was developed by musician/entrepreneur Mississauga native, Michael "Mike Cannz" Cannataro and Emtee Music Group. Ten Ten prides itself in being an elite entertainment company focused on assisting artists in the development and promotion of their confidence through live performance. Ten Ten\'s premier services include their showcases, where artists are given a platform to grow as live entertainers. Artists also have the opportunity to build their live sets with Ten Ten, tour and throw their own Ten Ten-managed private events, release parties and performances. In 2026, Ten Ten announced a new showcase event that will also involve a networking component giving up and coming artists the ability to connect with industry professionals. Apply below for your chance to perform at our next event.',
  },
  steepedDreamsStudio: {
    title: "Steeped Dreams Studio",
    description:
      "Welcome to Emtee Music Group. Steeped Dreams Studio is a creative studio and community built around sensory-friendly music, events and shared experiences. Steeped Dreams' pillars include music, dance and event specialties held by the founder of the company, Kym Tea.",
  },
} as const;

export const ROOM_METADATA_BY_SLUG = {
  lobby: PAGE_METADATA.lobby,
  business: PAGE_METADATA.business,
  music: PAGE_METADATA.music,
  marketing: PAGE_METADATA.marketing,
  "ar-sales": PAGE_METADATA.arSales,
  "publishing-distribution": PAGE_METADATA.publishingDistribution,
  "dirty-elephant-studio": PAGE_METADATA.dirtyElephantStudio,
  "ten-ten-entertainment": PAGE_METADATA.tenTenEntertainment,
  "steeped-dreams-studio": PAGE_METADATA.steepedDreamsStudio,
} as const;

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function fullPageTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}

export function createPageMetadata({
  title,
  description,
  path,
  imageAlt = "Emtee Music Group lobby preview",
}: {
  title?: string;
  description?: string;
  path: string;
  imageAlt?: string;
}): Metadata {
  const resolvedDescription = description ?? SITE_DESCRIPTION;
  const resolvedTitle = fullPageTitle(title);
  const url = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: "/twitter-image.png",
          alt: imageAlt,
        },
      ],
    },
  };
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS_NAME,
  alternateName: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: absoluteUrl("/icon.png"),
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_LINKS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      url: SITE_URL,
    },
  ],
} as const;
