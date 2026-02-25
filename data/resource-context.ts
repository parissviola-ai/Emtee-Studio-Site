export type ResourceContext = {
  what: string;
  why: string;
};

const RESOURCE_CONTEXT_BY_NAME: Record<string, ResourceContext> = {
  Consultation: {
    what: "A strategic intake and planning session that audits your current position, goals, and gaps before execution starts.",
    why: "Artists avoid random moves and start with a focused roadmap that saves time, money, and momentum.",
  },
  "Brand Evaluation": {
    what: "A review of your identity, niche, positioning, and overall market fit.",
    why: "Clear brand direction helps audiences, collaborators, and partners instantly understand your value.",
  },
  "Income Evaluation": {
    what: "A finance-oriented review of current revenue channels and weak points in monetization.",
    why: "Artists can prioritize the income channels that are most realistic and sustainable for their stage.",
  },
  "6-Month Rollout Strategy Plan": {
    what: "A mid-term release and business action plan for the next 6 months.",
    why: "It creates cadence and accountability so progress is measurable rather than reactive.",
  },
  "12-Month Rollout Strategy Plan": {
    what: "A long-range strategy map that connects releases, business decisions, and growth milestones.",
    why: "Long-term planning helps artists build compounding results instead of short bursts.",
  },
  "Business Operations Set-Up": {
    what: "Foundational setup for business structure, banking, licensing, and financial process.",
    why: "Strong operations protect the artist and make scaling opportunities easier to manage.",
  },
  "Single Creation": {
    what: "A focused production path to create one release-ready record with guided creative direction.",
    why: "It helps artists improve quality control and release stronger music consistently.",
  },
  "3 Song Creation": {
    what: "A short-form development package for creating a cohesive mini-body of work.",
    why: "Artists can test sound direction and build momentum with more than a one-off release.",
  },
  "Project Creation (5 Songs)": {
    what: "A deeper creation package for building a structured five-song project.",
    why: "A stronger project format increases storytelling, replay value, and catalog strength.",
  },
  "Content Creation": {
    what: "A recurring content system for capture, planning, and publishing.",
    why: "Consistent content keeps audiences engaged between releases and campaigns.",
  },
  "Brand Deck": {
    what: "A concise visual and messaging deck that defines your artist brand presentation.",
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
  "60min Live Performance Set Development": {
    what: "Expanded live set development for longer performances with higher production demands.",
    why: "Longer sets require stamina, pacing, and structure to sustain engagement. Artists improve stage confidence, transitions, and audience retention during shows.",
  },
  "Brand Deals": {
    what: "Partnership development support for potential brand collaborations.",
    why: "Well-structured brand opportunities can diversify artist income and visibility.",
  },
  "Tour Management": {
    what: "Support for coordinating tour logistics and execution support needs.",
    why: "Artists can deliver stronger live campaigns with fewer operational issues on the road.",
  },
  "Publishing/Distro Workshop": {
    what: "A release-readiness workshop to confirm publishing and distribution setup.",
    why: "Correct setup ensures artists can collect royalties and avoid preventable revenue loss.",
  },
  "Platform Setup Review": {
    what: "A publishing/distribution readiness review to confirm platform configuration and release setup.",
    why: "Artists reduce setup errors and protect royalty collection before launch.",
  },
  "CRM Set-Up": {
    what: "Implementation of a CRM system to organize fan and business relationships.",
    why: "Artists can build direct audience ownership and improve conversion over time.",
  },
  "CRM Fee/Retainer": {
    what: "Ongoing maintenance and optimization of the CRM platform.",
    why: "Long-term CRM upkeep keeps audience systems active, accurate, and revenue-ready.",
  },
  "Community Building": {
    what: "Frameworks for growing and nurturing a core fan community.",
    why: "A loyal community increases retention, repeat support, and long-term brand strength.",
  },
  Merchandise: {
    what: "Merchandising setup and storefront support for artist products.",
    why: "Merch can become a reliable direct-to-fan income stream and brand touchpoint.",
  },
  "Event Planning": {
    what: "Strategic planning for event structure, promo, and revenue model.",
    why: "Good planning increases turnout, experience quality, and financial outcomes.",
  },
  "Event Planner": {
    what: "Hands-on event support with additional execution coordination.",
    why: "More operational support reduces risk and improves live event consistency.",
  },
  "Tier 1: Starter Site": {
    what: "A focused starter website package that gives artists a clean, professional one-page home base.",
    why: "It establishes credibility quickly and gives fans one official place to discover your story, music, and contact path.",
  },
  "Tier 2: Growth Site": {
    what: "A multi-section website package designed for artists with active releases, media assets, and live momentum.",
    why: "It organizes your catalog and campaign visibility so fans, media, and booking contacts can navigate your career more easily.",
  },
  "Tier 3: Artist World": {
    what: "An advanced website package built to create a deeper, immersive fan experience around your brand universe.",
    why: "It helps retain audience attention between drops and supports long-term fan connection through interactive, evolving content.",
  },
  "All Packages Include": {
    what: "These are the core milestones included across every Website Design tier from kickoff to finalization.",
    why: "A consistent meeting structure keeps strategy, design direction, and final delivery aligned throughout the build process.",
  },
};

export function getResourceContext(name: string): ResourceContext | null {
  return RESOURCE_CONTEXT_BY_NAME[name] ?? null;
}
