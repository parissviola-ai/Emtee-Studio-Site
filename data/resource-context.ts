export type ResourceContext = {
  what: string;
  why: string;
};

const RESOURCE_CONTEXT_BY_NAME: Record<string, ResourceContext> = {
  Consultation: {
    what: "The first step is an indepth evaluation and report of an artists' career and business.",
    why: "Artists avoid random moves and start with a focused roadmap that saves time, money, and momentum.",
  },
  "Brand Evaluation": {
    what: "Extensive brand development session to clarify vision and niche.",
    why: "Clear brand direction helps audiences, collaborators, and partners instantly understand your value.",
  },
  "Income Evaluation": {
    what: "A finance-oriented review of current revenue channels and weak points in monetization.",
    why: "Artists can prioritize the income channels that are most realistic and sustainable for their stage.",
  },
  "6 Month Project Roll Out": {
    what: "Developing a plan for promo, production and campaign releases.",
    why: "It creates cadence and accountability so progress is measurable rather than reactive.",
  },
  "12 Month Career Roll Out": {
    what: "Year long artist roll out taking into consideration all departments.",
    why: "Long-term planning helps artists build compounding results instead of short bursts.",
  },
  "Business Operation Set Up": {
    what: "Business licensing, bank set up and tax set up.",
    why: "Strong operations protect the artist and make scaling opportunities easier to manage.",
  },
  "Single Creation": {
    what: "Direction, production, writing and engineering for a single.",
    why: "It helps artists improve quality control and release stronger music consistently.",
  },
  "3 Song Creation": {
    what: "A short-form development package for creating a cohesive mini-body of work.",
    why: "Artists can test sound direction and build momentum with more than a one-off release.",
  },
  "Project Creation (5 Songs)": {
    what: "Direction, production, writing and engineering for a 5-song project.",
    why: "A stronger project format increases storytelling, replay value, and catalog strength.",
  },
  "EP Creation (3 Songs)": {
    what: "Direction, production, writing and engineering for a 3-song EP.",
    why: "Artists can test sound direction and build momentum with more than a one-off release.",
  },
  "Content Production": {
    what: "Brainstorming, shooting and editing while developing set content series'.",
    why: "Consistent content keeps audiences engaged between releases and campaigns.",
  },
  EPK: {
    what: "One-pager for promo and press.",
    why: "It makes you easier to book, feature, and pitch because partners can review your brand quickly.",
  },
  "Brand Deck": {
    what: "Extensive development of set brand standards including font, colours and feelings.",
    why: "It improves clarity when pitching to partners, media, and collaborators.",
  },
  "Brand Deck + EPK": {
    what: "A brand presentation plus electronic press kit for professional outreach.",
    why: "Artists become easier to book, feature, and market with complete assets in one place.",
  },
  "30min Live Performance Set Development": {
    what: "Performance coaching and rehearsal support for a 30-minute set.",
    why: "Artists improve stage confidence, transitions, and audience retention during shows.",
  },
  "Live Performance Development": {
    what: "Assistance in the development of an artists' live set.",
    why: "Artists improve stage confidence, transitions, and audience retention during shows.",
  },
  "60min Live Performance Set Development": {
    what: "Expanded ten-ten-entertainment set development for longer performances with higher production demands.",
    why: "Longer sets require stamina, pacing, and structure to sustain engagement. Artists improve stage confidence, transitions, and audience retention during shows.",
  },
  "BTS Content Production": {
    what: "Shooting, editing and scripting BTS-style reels.",
    why: "It helps audiences connect with the story behind the work, not just the final release.",
  },
  "Brand Deals": {
    what: "Partnership development support for potential brand collaborations.",
    why: "Well-structured brand opportunities can diversify artist income and visibility.",
  },
  "Brand Partnership Strategies": {
    what: "Developing a strategy for corporate partnerships and collaborations.",
    why: "The right brand alignment can unlock additional reach, credibility, and non-streaming revenue.",
  },
  "Tour Management": {
    what: "On-road assistance, bookings and tour strategy.",
    why: "Artists can deten-ten-entertainmentr stronger ten-ten-entertainment campaigns with fewer operational issues on the road.",
  },
  "Publishing/Distribution Workshop": {
    what: "An hour long workshop to teach artists pub/distro 101.",
    why: "Correct setup ensures artists can collect royalties and avoid preventable revenue loss.",
  },
  "Platform Setup Review": {
    what: "A publishing/distribution readiness review to confirm platform configuration and release setup.",
    why: "Artists reduce setup errors and protect royalty collection before launch.",
  },
  "Split Sheet Development": {
    what: "Developing a split sheet to help organize royalty and ownership.",
    why: "Clear split sheets help everyone involved in the project receive their agreed share of the song and reduce future disputes.",
  },
  "CRM Set Up": {
    what: "High level CRM set up to develop company valuation and lead generation pipelines.",
    why: "Artists can build direct audience ownership and improve conversion over time.",
  },
  "CRM Fee/Retainer": {
    what: "Ongoing maintenance and optimization of the CRM platform.",
    why: "Long-term CRM upkeep keeps audience systems active, accurate, and revenue-ready.",
  },
  "Community Building": {
    what: "Assistance in the monitization of fan clubs and support groups.",
    why: "A loyal community increases retention, repeat support, and long-term brand strength.",
  },
  "Live Stream Strategy": {
    what: "Developing a live stream system to allow greater monetization.",
    why: "It adds another monetization and community channel without depending only on in-person moments.",
  },
  Merchandise: {
    what: "Merchandising setup and storelobby support for artist products.",
    why: "Merch can become a reliable direct-to-fan income stream and brand touchpoint.",
  },
  "Event Planning": {
    what: "Assisting in the development of new events.",
    why: "Good planning increases turnout, experience quality, and financial outcomes.",
  },
  "Event Planner": {
    what: "Hands-on event support with additional execution coordination.",
    why: "More operational support reduces risk and improves ten-ten-entertainment event consistency.",
  },
  "Accounting Set Up": {
    what: "Financial systemization of bookeeping and payroll.",
    why: "Clear accounting systems reduce confusion and help artists make smarter financial decisions as they grow.",
  },
  "Website Development": {
    what: "High-level website design and development.",
    why: "A strong site gives fans, media, and bookers one clear place to understand your world and take action.",
  },
  "Tier 1: Starter Site": {
    what: "A focused starter website package that gives artists a clean, professional one-page home base.",
    why: "It establishes credibility quickly and gives fans one official place to discover your story, music, and contact path.",
  },
  "Tier 2: Growth Site": {
    what: "A multi-section website package designed for artists with active releases, media assets, and ten-ten-entertainment momentum.",
    why: "It organizes your catalog and campaign visibility so fans, media, and booking contacts can navigate your career more easily.",
  },
  "Tier 3: Artist World": {
    what: "An advanced website package built to create a deeper, immersive fan experience around your brand universe.",
    why: "It helps retain audience attention between drops and supports long-term fan connection through interactive, evolving content.",
  },
  "All Packages Include": {
    what: "These are the core milestones included across every Website Design tier from kickoff to finalization.",
    why: "A consistent meeting structure keeps strategy, design direction, and final deten-ten-entertainmentry aligned throughout the build process.",
  },
  Packages: {
    what: "A package selector that lets artists compare the main Ten Ten showcase support options before applying.",
    why: "It helps artists choose the lane that best fits their stage of development, promo needs, and performance goals.",
  },
  "Up & Coming Artist Package": {
    what: "A showcase package for artists building early stage confidence, ticket movement, and live audience experience.",
    why: "It creates a lower-barrier way to sharpen performance skills while learning how to convert supporters in a real room.",
  },
  "Rising Star Showcase Package": {
    what: "An expanded showcase package with added promo, content, and artist support around the live performance experience.",
    why: "It gives developing artists more infrastructure so the performance can create stronger momentum before and after show day.",
  },
  "Live Set Performance Development": {
    what: "A coaching lane focused on tightening your live set structure, pacing, transitions, and stage presence before you perform.",
    why: "Better live preparation helps artists hold attention longer and turn performances into stronger fan conversion moments.",
  },
  "Ten Ten Community": {
    what: "A recurring artist community membership built around motivation, accountability, exposure, and peer connection.",
    why: "Consistent community support helps artists sustain momentum between releases and stay connected to opportunity.",
  },
};

export function getResourceContext(name: string): ResourceContext | null {
  const normalizedName =
    {
      "6-Month Rollout Strategy Plan": "6 Month Project Roll Out",
      "12-Month Rollout Strategy Plan": "12 Month Career Roll Out",
      "Business Operations Set-Up": "Business Operation Set Up",
      "3 Song Creation": "EP Creation (3 Songs)",
      "Content Creation": "Content Production",
      "Brand Deck + EPK": "EPK",
      "Brand Deals": "Brand Partnership Strategies",
      "Publishing/Distro Workshop": "Publishing/Distribution Workshop",
      "Split Sheet Set Up": "Split Sheet Development",
      "CRM Set-Up": "CRM Set Up",
      "Website Design": "Website Development",
    }[name] ?? name;

  return RESOURCE_CONTEXT_BY_NAME[normalizedName] ?? null;
}
