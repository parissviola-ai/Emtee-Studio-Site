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
  "EP Creation (3 Songs)": {
    what: "A short-form development package for creating a cohesive three-song body of work.",
    why: "Artists can test sound direction and build momentum with more than a one-off release.",
  },
  "Content Creation": {
    what: "A recurring content system for capture, planning, and publishing.",
    why: "Consistent content keeps audiences engaged between releases and campaigns.",
  },
  EPK: {
    what: "A professional electronic press kit that packages your artist story, visuals, music, and key links in one place.",
    why: "It makes you easier to book, feature, and pitch because partners can review your brand quickly.",
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
    what: "Expanded ten-ten-entertainment set development for longer performances with higher production demands.",
    why: "Longer sets require stamina, pacing, and structure to sustain engagement. Artists improve stage confidence, transitions, and audience retention during shows.",
  },
  "BTS Content Production": {
    what: "A behind-the-scenes content package for capturing and shaping process-driven reels and supporting visuals.",
    why: "It helps audiences connect with the story behind the work, not just the final release.",
  },
  "Brand Deals": {
    what: "Partnership development support for potential brand collaborations.",
    why: "Well-structured brand opportunities can diversify artist income and visibility.",
  },
  "Brand Partnership Strategies": {
    what: "A strategy package for identifying, shaping, and pitching artist-to-brand partnership opportunities.",
    why: "The right brand alignment can unlock additional reach, credibility, and non-streaming revenue.",
  },
  "Tour Management": {
    what: "Support for coordinating tour logistics and execution support needs.",
    why: "Artists can deten-ten-entertainmentr stronger ten-ten-entertainment campaigns with fewer operational issues on the road.",
  },
  "Publishing/Distro Workshop": {
    what: "A release-readiness workshop to confirm publishing and distribution setup.",
    why: "Correct setup ensures artists can collect royalties and avoid preventable revenue loss.",
  },
  "Platform Setup Review": {
    what: "A publishing/distribution readiness review to confirm platform configuration and release setup.",
    why: "Artists reduce setup errors and protect royalty collection before launch.",
  },
  "Split Sheet Set Up": {
    what: "Split sheet development support for your releases so song ownership is documented clearly.",
    why: "Clear split sheets help everyone involved in the project receive their agreed share of the song and reduce future disputes.",
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
  Streaming: {
    what: "A livestream setup and strategy lane designed to help artists show up consistently online and create new audience touchpoints.",
    why: "It adds another monetization and community channel without depending only on in-person moments.",
  },
  Merchandise: {
    what: "Merchandising setup and storelobby support for artist products.",
    why: "Merch can become a reliable direct-to-fan income stream and brand touchpoint.",
  },
  "Event Planning": {
    what: "Strategic planning for event structure, promo, and revenue model.",
    why: "Good planning increases turnout, experience quality, and financial outcomes.",
  },
  "Event Planner": {
    what: "Hands-on event support with additional execution coordination.",
    why: "More operational support reduces risk and improves ten-ten-entertainment event consistency.",
  },
  "Accounting Set Up": {
    what: "A bookkeeping and payroll system setup that organizes how money is tracked, reported, and managed.",
    why: "Clear accounting systems reduce confusion and help artists make smarter financial decisions as they grow.",
  },
  "Website Design": {
    what: "A website planning and build lane that turns your artist story, assets, and calls-to-action into a working digital home base.",
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
      "3 Song Creation": "EP Creation (3 Songs)",
      "Brand Deck + EPK": "EPK",
      "Brand Deals": "Brand Partnership Strategies",
    }[name] ?? name;

  return RESOURCE_CONTEXT_BY_NAME[normalizedName] ?? null;
}
