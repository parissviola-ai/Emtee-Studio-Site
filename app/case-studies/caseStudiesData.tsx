export type CaseStudy = {
  slug: string;
  name: string;
  roleTag?: string;
  imageSrc: string;
  imageAlt?: string;
  bio?: string;

  bullets: string[];
  highlights?: string[];
  accomplishments?: string[];

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
    imageSrc: "/rooms/yanchancasestudymar.png",
    imageAlt: "Yanchan Produced marketing case card",
    bio:
      "Yanchan Produced is a Canadian-Tamil producer, mixing engineer, songwriter and Mridangist. Known for making beats with a South Asian twist, his release of solo and collaborative projects has garnered over 12 million streams on Spotify.\n\nYanchan’s production has been affiliated with reputable labels and high-level artists over the years including collaborators Russ, SVDP, Shruthi Hassan, Pressa, Kristina Maria, Yung Tory, and Charle$.",
    bullets: [
      "Business Operation Set Up (Business Department)",
      "Single Creation (Music Department)",
      "Content Production (Marketing Department)",
      "Brand Deck (Marketing Department)",
      "EPK (Marketing Department)",
      "Publishing/Distribution Workshop (Publishing / Distribution Department)",
      "CRM Set Up (A&R / Sales Department)",
    ],
    accomplishments: [
      "12M+ Spotify streams across solo and collaborative catalog",
      "Producer and engineering collaborations with high-profile artists",
      "Built a recognizable producer identity with South Asian influence",
      "Scaled Orange Room Sessions into a repeatable content series",
      "Successfully developed a lucrative custom production business",
    ],
    highlights: [
      "Business Department",
      "Music Department",
      "Marketing Department",
      "Publishing / Distribution Department",
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
    imageSrc: "/rooms/mikecasestudyar.png",
    imageAlt: "Mike Cannz A&R and sales case card",
    bio:
      'Michael Cannataro, professionally known as Mike Cannz, is a middle-class Canadian artist and entertainment entrepreneur from Mississauga, Ontario. Mike is best known for his musical endeavours which includes his events company, Ten Ten Entertainment, where he gives local musicians the opportunity to perform. Prior to music, Cannz also ventured into acting where he starred in the featured film "Hostage." Since 2020, Mike Cannz has been an inaugural artist managed by Emtee Music Group.',
    bullets: [
      "Consultation (Business Department)",
      "12 Month Career Roll Out (Business Department)",
      "Business Operation Set Up (Business Department)",
      "Brand Deck (Marketing Department)",
      "EPK (Marketing Department)",
      "Tour Management (Marketing Department)",
      "Live Performance Development (Marketing Department)",
      "CRM Set Up (A&R / Sales Department)",
      "Community Building (A&R / Sales Department)",
      "Streaming (A&R / Sales Department)",
    ],
    accomplishments: [
      "Improved consistency in release execution and turnaround times",
      "Built stronger partnership communication flow across initiatives",
      "Established repeatable weekly content operations for visibility",
      "Developed income generating business in Ten Ten Entertainment",
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
    name: "KISAKI",
    roleTag: "Label Services",
    imageSrc: "/rooms/casestudykisakimarket.png",
    imageAlt: "KISAKI marketing case card",
    bio:
      "KISAKI is a Korean-Canadian electronic music producer, DJ, and vocalist based in Toronto, known for her electrifying fusion of dynamic vocals with hard-hitting beats and cinematic experience. Blending elements of rock, K-Pop, J-Pop and anime, her ten-ten-entertainment performances feel like stepping into the soundtrack of a cyber dream.\nA former Touhou Vocal artist with Japan's doujin circles including EastNewSound, she channels the soul of a lost android searching for freedom and love into a dark yet melodic soundscape influenced by cyberpunk and neo noir.\nSince 2024, she has taken her sound on the road, lighting up stages in over fifteen cities across North America, and earning a growing following in the Canadian underground scene.",
    bullets: [
      "Brand Development (Business Department)",
      "Brand Deck (Marketing Department)",
      "Live Performance Development (Marketing Department)",
      "Publishing/Distribution Workshop (Publishing / Distribution Department)",
    ],
    accomplishments: [
      "Built reliable release quality-control checkpoints",
      "Created a more predictable launch rhythm and campaign timeline",
      "Development for live touring and performances",
      "Elevated overall presentation consistency across releases",
    ],
    highlights: [
      "Business Department",
      "Music Department",
      "Marketing Department",
      "Publishing / Distribution Department",
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
    imageSrc: "/rooms/famecasestudymusic.png",
    imageAlt: "Fame Holiday music case card",
    bio:
      "Award winning Mississauga rapper Fame Holiday has been establishing himself in the Canadian music scene since his first talent show at 14. His consistency and work ethic over the years has earned him a loyal fan-following that has streamed his music over one million times.",
    bullets: [
      "Single Creation (Music Department)",
      "EP Creation (3 Songs) (Music Department)",
    ],
    accomplishments: [
      "Refined song selection process with stronger creative focus",
      "Improved visual cohesion across cover art and campaign assets",
      "Built smoother handoffs between creative and production teams",
      "Increased rollout clarity from concept through release week",
    ],
    highlights: [
      "Music Department",
      "A&R / Sales Department",
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
