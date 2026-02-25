export type CaseStudy = {
  slug: string;
  name: string;
  roleTag?: string;
  selectedPackageLabel?: string;
  selectedPackageHref?: string;
  imageSrc: string;
  imageAlt?: string;
  bio?: string;

  bullets: string[];
  highlights?: string[];
  accomplishments?: string[];
  roadmap?: Array<{
    phase: string;
    title: string;
    detail: string;
  }>;

  instagramHandle?: string;
  instagramUrl?: string;
  socialLinks?: Array<{ label: string; href: string }>;
  spotifyEmbedUrl?: string;

  /**
   * MUST be a specific IG Post or Reel URL for embeds to work.
   * Example:
   * https://www.instagram.com/reel/XXXXXXXXXXX/
   * https://www.instagram.com/p/XXXXXXXXXXX/
   */
  featuredLink?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "yanchan",
    name: "Yanchan Produced",
    roleTag: "Artist Development / Production",
    selectedPackageLabel: "Selected Path: Multi-Department Resource Stack",
    selectedPackageHref: "/connect",
    imageSrc: "/case-studies/yanchan-opt.jpg",
    bio:
      "Yanchan Produced is a Canadian-Tamil producer, mixing engineer, songwriter and Mridangist. Known for making beats with a South Asian twist, his release of solo and collaborative projects has garnered over 12 million streams on Spotify.\n\nYanchan’s production has been affiliated with reputable labels and high-level artists over the years including collaborators Russ, SVDP, Shruthi Hassan, Pressa, Kristina Maria, Yung Tory, and Charle$.",
    bullets: [
      "Single Creation (Music Department)",
      "Content Creation (Marketing Department)",
      "Brand Deck + EPK (Marketing Department)",
      "Publishing/Distro Workshop (Publishing / Distribution Department)",
      "Business Operations Set-Up (Business Department)",
      "CRM Set-Up (A&R / Sales Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    accomplishments: [
      "12M+ Spotify streams across solo and collaborative catalog",
      "Producer and engineering collaborations with high-profile artists",
      "Built a recognizable producer identity with South Asian influence",
      "Scaled Orange Room Sessions into a repeatable artist development concept",
      "Established as EMTEE's premier full-spectrum development case",
    ],
    roadmap: [
      {
        phase: "Phase 01",
        title: "Positioning + Brand Alignment",
        detail:
          "Clarified Yanchan's producer identity, visual direction, and artist narrative so every release communicated a consistent brand.",
      },
      {
        phase: "Phase 02",
        title: "Release Systems + Content Cadence",
        detail:
          "Implemented a practical release checklist and recurring content format to maintain momentum between drops.",
      },
      {
        phase: "Phase 03",
        title: "Network + Opportunity Conversion",
        detail:
          "Focused outreach, strategic collaborations, and platform consistency to convert visibility into measurable growth.",
      },
    ],
    highlights: [
      "Music Department",
      "Marketing Department",
      "Publishing / Distribution Department",
      "Business Department",
      "A&R / Sales Department",
    ],
    instagramHandle: "@yanchanproduced",
    instagramUrl: "https://www.instagram.com/yanchanproduced/",
    socialLinks: [
      { label: "Website", href: "https://yanchanproduced.com/" },
      { label: "Instagram", href: "https://www.instagram.com/yanchanproduced/" },
      { label: "TikTok", href: "https://www.tiktok.com/@yanchanproduced/" },
      { label: "YouTube", href: "https://www.youtube.com/c/yanchanproduced" },
      { label: "Facebook", href: "https://www.facebook.com/yanchanproduced/" },
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Yanchan_Produced" },
    ],
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/4GKSZvPRVHCR8TrVVWu9HH?utm_source=generator",
    featuredLink:"https://www.instagram.com/p/DS2ejp8DoxN/",
  },
  {
    slug: "mike-cannz",
    name: "Mike Cannz",
    roleTag: "Management / Label Services",
    selectedPackageLabel: "Selected Path: Business + Marketing + A&R/Sales",
    selectedPackageHref: "/connect",
    imageSrc: "/case-studies/mikecannz-opt.jpg",
    bio:
      'Michael Cannataro, professionally known as Mike Cannz, is a middle-class Canadian artist and entertainment entrepreneur from Mississauga, Ontario. Mike is best known for his musical endeavours which includes his events company, Ten Ten Entertainment, where he gives local musicians the opportunity to perform. Prior to music, Cannz also ventured into acting where he starred in the featured film "Hostage." Since 2020, Mike Cannz has been an inaugural artist managed by Emtee Music Group.',
    bullets: [
      "Consultation (Business Department)",
      "12-Month Rollout Strategy Plan (Business Department)",
      "Business Operations Set-Up (Business Department)",
      "Brand Deck + EPK (Marketing Department)",
      "Tour Management (Marketing Department)",
      "60min Live Performance Set Development (Marketing Department)",
      "CRM Set-Up (A&R / Sales Department)",
      "CRM Fee/Retainer (A&R / Sales Department)",
      "Event Planner (A&R / Sales Department)",
    ],
    accomplishments: [
      "Improved consistency in release execution and turnaround times",
      "Strengthened campaign readiness with cleaner asset delivery",
      "Built stronger partnership communication flow across initiatives",
      "Established repeatable weekly content operations for visibility",
    ],
    roadmap: [
      {
        phase: "Phase 01",
        title: "Operations Audit",
        detail:
          "Mapped bottlenecks in release preparation, team communication, and deadlines to identify high-impact fixes.",
      },
      {
        phase: "Phase 02",
        title: "Execution Framework",
        detail:
          "Introduced a streamlined workflow for assets, approvals, and launch timing to reduce chaos and missed windows.",
      },
      {
        phase: "Phase 03",
        title: "Partnership Support",
        detail:
          "Packaged campaigns more clearly for collaborators and external partners to improve response quality and deal flow.",
      },
    ],
    highlights: [
      "Business Department",
      "Marketing Department",
      "A&R / Sales Department",
    ],
    instagramHandle: "@mikecannz",
    instagramUrl: "https://www.instagram.com/mikecannz/",
    socialLinks: [
      { label: "Website", href: "https://www.mikecannzentertainment.com/" },
      { label: "Instagram", href: "https://www.instagram.com/mikecannz/" },
      { label: "TikTok", href: "https://www.tiktok.com/@mikecannz/" },
      { label: "YouTube", href: "https://www.youtube.com/@mikecannz" },
      { label: "Facebook", href: "https://www.facebook.com/mikecannz/" },
    ],
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/playlist/5Usj5DLi7RstSUHG6kw0ul?utm_source=generator",
    featuredLink: "https://www.instagram.com/p/DLGbpR6AQcA/",
  },
  {
    slug: "kisaki",
    name: "KisakiMusic",
    roleTag: "Label Services",
    selectedPackageLabel: "Selected Path: Music + Marketing + Publishing",
    selectedPackageHref: "/connect",
    imageSrc: "/case-studies/kisaki-opt.jpg",
    bio:
      "KISAKI is a Korean-Canadian electronic music producer, DJ, and vocalist based in Toronto, known for her electrifying fusion of dynamic vocals with hard-hitting beats and cinematic experience. Blending elements of rock, K-Pop, J-Pop and anime, her live performances feel like stepping into the soundtrack of a cyber dream.\nA former Touhou Vocal artist with Japan's doujin circles including EastNewSound, she channels the soul of a lost android searching for freedom and love into a dark yet melodic soundscape influenced by cyberpunk and neo noir.\nSince 2024, she has taken her sound on the road, lighting up stages in over fifteen cities across North America, and earning a growing following in the Canadian underground scene.",
    bullets: [
      "3 Song Creation (Music Department)",
      "Project Creation (5 Songs) (Music Department)",
      "Content Creation (Marketing Department)",
      "Brand Deck (Marketing Department)",
      "30min Live Performance Set Development (Marketing Department)",
      "Publishing/Distro Workshop (Publishing / Distribution Department)",
      "Website Creation (Website Design)",
    ],
    accomplishments: [
      "Built reliable release quality-control checkpoints",
      "Created a more predictable launch rhythm and campaign timeline",
      "Improved preparedness for live opportunities and showcases",
      "Elevated overall presentation consistency across releases",
    ],
    roadmap: [
      {
        phase: "Phase 01",
        title: "Catalog Quality Control",
        detail:
          "Standardized artwork, metadata, and final delivery checks to reduce errors and maintain professional release standards.",
      },
      {
        phase: "Phase 02",
        title: "Launch Planning",
        detail:
          "Built a repeatable pre-release and post-release framework to keep each rollout organized and measurable.",
      },
      {
        phase: "Phase 03",
        title: "Live Readiness",
        detail:
          "Aligned performance preparation and media support so live moments reinforced the broader artist brand.",
      },
    ],
    highlights: [
      "Music Department",
      "Marketing Department",
      "Publishing / Distribution Department",
      "Website Design",
    ],
    instagramHandle: "@kisakimusic",
    instagramUrl: "https://www.instagram.com/kisakimusic/",
    socialLinks: [
      { label: "Website", href: "https://kisakimusic.com/#:~:text=About%20KISAKI,soundtrack%20of%20a%20cyber%2Ddream.&text=A%20former%20Touhou%20arrangement%20artist,dubstep%2C%20and%20drum%20and%20bass.&text=Since%202024%2C%20she%20has%20taken,in%20the%20Canadian%20underground%20scene." },
      { label: "Instagram", href: "https://www.instagram.com/kisakimusic/" },
      { label: "TikTok", href: "https://www.tiktok.com/@kisakimusic/" },
      { label: "YouTube", href: "https://www.youtube.com/@kisakimusic" },
      { label: "Facebook", href: "https://www.facebook.com/kisakimusic/" },
      { label: "Twitch", href: "https://www.twitch.tv/itskisakimusic" },
      { label: "Discord", href: "https://discord.com/invite/4EzKjMMa4u" },
    ],
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/3UiEZLi8PvA5aAwAdpt4ee?utm_source=generator",
    featuredLink: "https://www.instagram.com/p/DPwqdXHjGON/",
  },
  {
    slug: "fame-holiday",
    name: "Fame Holiday",
    roleTag: "A&R / Creative Direction",
    selectedPackageLabel: "Selected Path: A&R/Sales + Music + Marketing",
    selectedPackageHref: "/connect",
    imageSrc: "/case-studies/fh-opt.jpg",
    bio:
      "Award winning Mississauga rapper Fame Holiday has been establishing himself in the Canadian music scene since his first talent show at 14. His consistency and work ethic over the years has earned him a loyal fan-following that has streamed his music over one million times.",
    bullets: [
      "CRM Set-Up (A&R / Sales Department)",
      "Community Building (A&R / Sales Department)",
      "Event Planning (A&R / Sales Department)",
      "Single Creation (Music Department)",
      "3 Song Creation (Music Department)",
      "Content Creation (Marketing Department)",
      "Brand Deck + EPK (Marketing Department)",
      "Income Evaluation (Business Department)",
    ],
    accomplishments: [
      "Refined song selection process with stronger creative focus",
      "Improved visual cohesion across cover art and campaign assets",
      "Built smoother handoffs between creative and production teams",
      "Increased rollout clarity from concept through release week",
    ],
    roadmap: [
      {
        phase: "Phase 01",
        title: "Creative Direction Reset",
        detail:
          "Aligned sonic direction and visual references to build a clearer brand world around the artist.",
      },
      {
        phase: "Phase 02",
        title: "A&R Structuring",
        detail:
          "Introduced track selection criteria, session priorities, and decision checkpoints to improve output quality.",
      },
      {
        phase: "Phase 03",
        title: "Team Execution Model",
        detail:
          "Set up a dependable workflow between producers, engineers, and content contributors for faster campaign delivery.",
      },
    ],
    highlights: [
      "A&R / Sales Department",
      "Music Department",
      "Marketing Department",
      "Business Department",
    ],
    instagramHandle: "@officialfameholiday",
    instagramUrl: "https://www.instagram.com/officialfameholiday/?hl=en",
    socialLinks: [
      { label: "Website", href: "https://officialfameholiday.com/" },
      { label: "Instagram", href: "https://www.instagram.com/officialfameholiday/?hl=en" },
      { label: "TikTok", href: "https://www.tiktok.com/@fameholiday?lang=en" },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCJOyDTybz3O4Z5GG9agfjZA" },
      { label: "Facebook", href: "https://www.facebook.com/TeamFameHoliday/" },
    ],
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/2AjbOeYS0jcF0t2F0RDgNy?utm_source=generator",
    featuredLink: "https://www.instagram.com/p/DURvS64kSxg/",
  },
];
