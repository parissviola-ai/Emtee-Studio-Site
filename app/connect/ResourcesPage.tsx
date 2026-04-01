"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ResourceCard = {
  department: string;
  summary: string;
  roomHref: string;
  strategyLabel: string;
  exampleArtist: string;
  exampleArtistHref?: string;
  items: {
    name: string;
    notes: string[];
    sectionHeading?: boolean;
  }[];
};

const RESOURCE_CARDS: ResourceCard[] = [
  {
    department: "Business Department",
    summary: "Financial and operational systems that support long-term sustainability and decision quality. This also includes grant strategies.",
    roomHref: "/rooms/business",
    strategyLabel: "Business Strategy",
    exampleArtist: "Yanchan Produced",
    exampleArtistHref: "/case-studies/yanchan",
    items: [
      {
        name: "Consultation",
        notes: [
          "The first step is an indepth evaluation and report of an artists' career and business.",
        ],
      },
      {
        name: "Brand Evaluation",
        notes: [
          "Extensive brand development session to clarify vision and niche.",
        ],
      },
      {
        name: "Accounting Set Up",
        notes: ["Financial systemization of bookeeping and payroll."],
      },
      {
        name: "6 Month Project Roll Out",
        notes: ["Developing a plan for promo, production and campaign releases."],
      },
      {
        name: "12 Month Career Roll Out",
        notes: ["Year long artist roll out taking into consideration all departments."],
      },
      {
        name: "Business Operation Set Up",
        notes: ["Business licensing, bank set up and tax set up."],
      },
    ],
  },
  {
    department: "Music Department",
    summary: "Creative direction, production support and release readiness built around artist identity.",
    roomHref: "/rooms/music",
    strategyLabel: "Music Strategy",
    exampleArtist: "Fame Holiday",
    exampleArtistHref: "/case-studies/fame-holiday",
    items: [
      {
        name: "Single Creation",
        notes: ["Direction, production, writing and engineering for a single."],
      },
      {
        name: "EP Creation (3 Songs)",
        notes: ["Direction, production, writing and engineering for a 3-song EP."],
      },
      {
        name: "Project Creation (5 Songs)",
        notes: ["Direction, production, writing and engineering for a 5-song project."],
      },
    ],
  },
  {
    department: "Marketing Department",
    summary: "Branding, content, touring and everything that fuels the reach of your brand and expansion of your audience.",
    roomHref: "/rooms/marketing",
    strategyLabel: "Marketing Strategy",
    exampleArtist: "KISAKI",
    exampleArtistHref: "/case-studies/kisaki",
    items: [
      {
        name: "Brand Deck",
        notes: ["Extensive development of set brand standards including font, colours and feelings."],
      },
      {
        name: "EPK",
        notes: ["One-pager for promo and press."],
      },
      {
        name: "Content Production",
        notes: ["Brainstorming, shooting and editing while developing set content series'."],
      },
      {
        name: "BTS Content Production",
        notes: ["Shooting, editing and scripting BTS-style reels."],
      },
      {
        name: "Brand Partnership Strategies",
        notes: ["Developing a strategy for corporate partnerships and collaborations."],
      },
      {
        name: "Tour Management",
        notes: ["On-road assistance, bookings and tour strategy."],
      },
      {
        name: "Live Performance Development",
        notes: ["Assistance in the development of an artists' live set."],
      },
      {
        name: "Event Planning",
        notes: ["Assisting in the development of new events."],
      },
      {
        name: "On-site DJ",
        notes: ["On-site DJ support for events, activations and live experiences."],
      },
      {
        name: "Website Development",
        notes: ["High-level website design and development."],
      },
    ],
  },
  {
    department: "A&R / Sales Department",
    summary: "CRMs, company valuations and the question of long-lasting, sustainable monetization of your music business.",
    roomHref: "/rooms/ar-sales",
    strategyLabel: "A&R/Sales Strategy",
    exampleArtist: "Mike Cannz",
    exampleArtistHref: "/case-studies/mike-cannz",
    items: [
      {
        name: "CRM Set Up",
        notes: ["High level CRM set up to develop company valuation and lead generation pipelines."],
      },
      {
        name: "Community Building",
        notes: ["Assistance in the monitization of fan clubs and support groups."],
      },
      {
        name: "Live Stream Strategy",
        notes: ["Developing a live stream system to allow greater monetization."],
      },
      {
        name: "Merchandise",
        notes: ["Merchandising setup and storefront support for artist products."],
      },
      {
        name: "Event Planner",
        notes: ["Hands-on event support with additional execution coordination."],
      },
    ],
  },
  {
    department: "Publishing / Distribution Department",
    summary: "Catalog management, publishing administration and royalty collections.",
    roomHref: "/rooms/publishing-distribution",
    strategyLabel: "Publishing/Distribution Strategy",
    exampleArtist: "Yanchan Produced",
    exampleArtistHref: "/case-studies/yanchan",
    items: [
      {
        name: "Publishing/Distribution Workshop",
        notes: ["An hour long workshop to teach artists pub/distro 101."],
      },
      {
        name: "Platform Setup Review",
        notes: ["A publishing/distribution readiness review to confirm platform configuration and release setup."],
      },
      {
        name: "Split Sheet Development",
        notes: ["Developing a split sheet to help organize royalty and ownership."],
      },
    ],
  },
];

function getCaseStudyForResource(name: string) {
  if (name === "Live Performance Development" || name === "BTS Content Production") {
    return {
      label: "Open Kisaki Case Study",
      href: "/case-studies/kisaki",
    };
  }

  return null;
}

export default function ResourcesPage() {
  const [openDepartments, setOpenDepartments] = useState<string[]>([]);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const toggleDepartment = (department: string) => {
    setOpenDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.20),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Resources
            </h1>
            <Image
              src="/Logo2.png"
              alt="EMTEE logo"
              width={44}
              height={44}
              className="h-9 w-9 rounded-md object-contain opacity-80 sm:h-11 sm:w-11"
            />
          </div>
          <Link
            href="/rooms/lobby"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 backdrop-blur-xl transition hover:border-[#d6ae66]/45 hover:bg-zinc-50 hover:text-zinc-900"
          >
            Back to Lobby
          </Link>
        </div>

        <div className="accent-card relative z-10 mt-4 max-w-3xl rounded-xl border border-[#d6ae66]/35 bg-white/90 px-5 py-4 text-sm text-zinc-700 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_12px_36px_rgba(0,0,0,0.10)]">
          Browse each department to see the different capabilities our in-house specialists are able to provide.
          <br />
          Click the department card or the <span className="font-semibold text-[#8b6a2f]">+</span> to view available resources for you.
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {RESOURCE_CARDS.map((item) => (
            <article
              key={item.department}
              onMouseEnter={() => setHoveredDepartment(item.department)}
              onMouseLeave={() => setHoveredDepartment((prev) => (prev === item.department ? null : prev))}
              className={[
                "accent-card-soft flex flex-col self-start rounded-2xl border bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(255,255,255,0.9))] p-5 transition duration-300",
                hoveredDepartment === item.department && !openDepartments.includes(item.department)
                  ? "border-[#d6ae66]/45 shadow-[0_0_0_1px_rgba(214,174,102,0.28),0_0_36px_rgba(214,174,102,0.38),0_24px_64px_rgba(0,0,0,0.26)]"
                  : "border-zinc-200 shadow-[0_14px_46px_rgba(0,0,0,0.12)]",
              ].join(" ")}
            >
              <div
                className="flex w-full cursor-pointer items-start justify-between gap-3 px-1 py-1 text-left"
                onClick={() => toggleDepartment(item.department)}
              >
                <div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleDepartment(item.department);
                    }}
                    className="text-left text-lg font-semibold uppercase tracking-[0.08em] text-[#8b6a2f] underline decoration-[#d6ae66]/55 decoration-2 underline-offset-4 transition hover:text-[#6f511a]"
                  >
                    {item.department}
                  </button>
                  <p className="mt-2 text-sm text-zinc-700">{item.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleDepartment(item.department);
                  }}
                  className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#d6ae66]/45 bg-white text-[#8b6a2f] transition hover:bg-[#fff7eb]"
                  aria-label={openDepartments.includes(item.department) ? `Collapse ${item.department}` : `Expand ${item.department}`}
                  aria-expanded={openDepartments.includes(item.department)}
                >
                  {openDepartments.includes(item.department) ? "−" : "+"}
                </button>
              </div>

              {openDepartments.includes(item.department) ? (
                <div className="mt-4 space-y-4">
                  {item.items.map((resource) => (
                    <div key={`${item.department}-${resource.name}`}>
                      {resource.sectionHeading ? (
                        <div className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#8b6a2f]">
                          {resource.name}
                        </div>
                      ) : (
                      <>
                      <div className="text-base font-semibold text-zinc-900">
                        {resource.name}
                      </div>
                      <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
                        {resource.notes.map((note) => (
                          <li key={`${resource.name}-${note}`} className="flex gap-2">
                            <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d6ae66]/90 shadow-[0_0_8px_rgba(214,174,102,0.7)]" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                      </>
                      )}
                    </div>
                  ))}
                  <div className="border-t border-zinc-200 pt-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">
                      {item.strategyLabel}
                    </div>
                    {item.exampleArtistHref ? (
                      <Link
                        href={item.exampleArtistHref}
                        className="mt-1 inline-flex text-sm font-medium text-zinc-900 underline decoration-[#d6ae66]/60 decoration-2 underline-offset-4 transition hover:text-[#7a5a24] hover:[text-shadow:0_0_14px_rgba(214,174,102,0.75)]"
                      >
                        {item.exampleArtist}
                      </Link>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-zinc-800">{item.exampleArtist}</p>
                    )}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="accent-card-soft relative z-10 mt-6 rounded-2xl border border-zinc-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.75),0_18px_55px_rgba(0,0,0,0.12)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Next Step</div>
          <p className="mt-3 text-sm text-zinc-700">
            Click the button below to apply for a full artist consultation and begin working towards the launch of your career!
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/18 px-5 py-2 text-sm font-semibold text-[#6f511a] shadow-[0_0_26px_rgba(214,174,102,0.28)] transition hover:bg-[#d6ae66]/26 hover:text-[#3d2b0c]"
            >
              Apply For A Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
