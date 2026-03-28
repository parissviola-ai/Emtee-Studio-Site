export type CaseStudyDeckItem = {
  id: string;
  artist: string;
  lane: string;
  imageSrc: string;
  imageAlt: string;
  snapshot: string;
  points: string[];
  departmentHref: string;
  departmentLabel: string;
  caseStudyHref?: string;
};

export const CASE_STUDY_DECK: CaseStudyDeckItem[] = [
  {
    id: "yanchan-business",
    artist: "Yanchan Produced",
    lane: "Business Department",
    imageSrc: "/rooms/yanchancasestudybus.png",
    imageAlt: "Yanchan business department case card",
    snapshot:
      "Business support focused on operations setup and decision structure so creative momentum could convert into repeatable execution.",
    points: [
      "Business Operation Set Up (Business Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    departmentHref: "/rooms/business",
    departmentLabel: "Open Business Department",
    caseStudyHref: "/case-studies/yanchan",
  },
  {
    id: "fame-music",
    artist: "Fame Holiday",
    lane: "Music Department",
    imageSrc: "/rooms/famecasestudymusic.png",
    imageAlt: "Fame Holiday music department case card",
    snapshot:
      "Song development and creative direction, backed with cross-department campaign support.",
    points: [
      "Single Creation (Music Department)",
      "EP Creation (3 Songs) (Music Department)",
    ],
    departmentHref: "/rooms/music",
    departmentLabel: "Open Music Department",
    caseStudyHref: "/case-studies/fame-holiday",
  },
  {
    id: "kisaki-marketing",
    artist: "KISAKI",
    lane: "Marketing Department",
    imageSrc: "/rooms/casestudykisakimarket.png",
    imageAlt: "Kisaki marketing department case card",
    snapshot:
      "Strong emphasis on campaign presentation, structured content output and live performance set positioning.",
    points: [
      "Content Production (Marketing Department)",
      "Brand Deck (Marketing Department)",
      "Live Performance Development (Marketing Department)",
    ],
    departmentHref: "/rooms/marketing",
    departmentLabel: "Open Marketing Department",
    caseStudyHref: "/case-studies/kisaki",
  },
  {
    id: "mike-ar-sales",
    artist: "Mike Cannz",
    lane: "A&R / Sales Department",
    imageSrc: "/rooms/mikecasestudyar.png",
    imageAlt: "Mike Cannz A&R and sales department case card",
    snapshot:
      "CRM and community-building support to improve conversion flow, campaign coordination and on-going monetization.",
    points: [
      "CRM Set Up (A&R / Sales Department)",
      "Community Building (A&R / Sales Department)",
      "Streaming (A&R / Sales Department)",
    ],
    departmentHref: "/rooms/ar-sales",
    departmentLabel: "Open A&R / Sales Department",
    caseStudyHref: "/case-studies/mike-cannz",
  },
  {
    id: "yanchan-publishing-distro",
    artist: "Yanchan Produced",
    lane: "Publishing / Distribution Department",
    imageSrc: "/rooms/yanchancasestudypub.png",
    imageAlt: "Yanchan publishing and distribution department case card",
    snapshot:
      "Publishing and distribution support including catalog management, split royalties negotiations and on-going sync.",
    points: [
      "Publishing/Distribution Workshop (Publishing / Distribution Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    departmentHref: "/rooms/publishing-distribution",
    departmentLabel: "Open Publishing / Distribution Department",
    caseStudyHref: "/case-studies/yanchan",
  },
];
