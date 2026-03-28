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
    imageSrc: "/rooms/Yanchan- Business .png",
    imageAlt: "Yanchan business department case card",
    snapshot:
      "Business support focused on operations setup and decision structure so creative momentum could convert into repeatable execution.",
    points: [
      "Business Operations Set-Up (Business Department)",
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
    imageSrc: "/rooms/Fame-Music.png",
    imageAlt: "Fame Holiday music department case card",
    snapshot:
      "Fame Holiday's music lane focused on song development and tighter creative direction, backed by cross-department campaign support.",
    points: [
      "Single Creation (Music Department)",
      "3 Song Creation (Music Department)",
    ],
    departmentHref: "/rooms/music",
    departmentLabel: "Open Music Department",
    caseStudyHref: "/case-studies/fame-holiday",
  },
  {
    id: "kisaki-marketing",
    artist: "KISAKI",
    lane: "Marketing Department",
    imageSrc: "/rooms/Kisaki -Marketing.png",
    imageAlt: "Kisaki marketing department case card",
    snapshot:
      "KISAKI's marketing lane emphasized stronger campaign presentation, structured content output, and ten-ten-entertainment set positioning.",
    points: [
      "Content Creation (Marketing Department)",
      "Brand Deck (Marketing Department)",
      "30min Live Performance Set Development (Marketing Department)",
    ],
    departmentHref: "/rooms/marketing",
    departmentLabel: "Open Marketing Department",
    caseStudyHref: "/case-studies/kisaki",
  },
  {
    id: "mike-ar-sales",
    artist: "Mike Cannz",
    lane: "A&R / Sales Department",
    imageSrc: "/rooms/Mike Cannz- A&R Sales.png",
    imageAlt: "Mike Cannz A&R and sales department case card",
    snapshot:
      "Mike Cannz received CRM and community-building support to improve conversion flow, campaign coordination, and partner readiness.",
    points: [
      "CRM Set-Up (A&R / Sales Department)",
      "CRM Fee/Retainer (A&R / Sales Department)",
      "Event Planner (A&R / Sales Department)",
    ],
    departmentHref: "/rooms/ar-sales",
    departmentLabel: "Open A&R / Sales Department",
    caseStudyHref: "/case-studies/mike-cannz",
  },
  {
    id: "yanchan-publishing-distro",
    artist: "Yanchan Produced",
    lane: "Publishing / Distribution Department",
    imageSrc: "/rooms/Yanchan- Distro Publishing.png",
    imageAlt: "Yanchan publishing and distribution department case card",
    snapshot:
      "Yanchan used EMTEE publishing and distribution support to tighten release structure and set up cleaner catalog operations.",
    points: [
      "Publishing/Distro Workshop (Publishing / Distribution Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    departmentHref: "/rooms/publishing-distribution",
    departmentLabel: "Open Publishing / Distribution Department",
    caseStudyHref: "/case-studies/yanchan",
  },
];
