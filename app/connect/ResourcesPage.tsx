"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getResourceContext } from "@/data/resource-context";

type ResourceCard = {
  department: string;
  summary: string;
  artistCaseStudy: string;
  artistCaseStudyHref?: string;
  items: {
    name: string;
    notes: string[];
    sectionHeading?: boolean;
  }[];
};

const RESOURCE_CARDS: ResourceCard[] = [
  {
    department: "Business Department",
    summary: "Operational setup, finance clarity, and rollout planning resources.",
    artistCaseStudy: "Artist Name (Placeholder)",
    items: [
      {
        name: "Consultation",
        notes: [
          "Includes Recommendation List",
          "Includes 60-90min Meeting",
          "Includes Artist Report",
        ],
      },
      {
        name: "Brand Evaluation",
        notes: [
          "Niche",
          "Includes 2-3hr Meeting focused on Vision, Mission, Values",
        ],
      },
      {
        name: "Income Evaluation",
        notes: ["Assessing Business Finance"],
      },
      {
        name: "6-Month Rollout Strategy Plan",
        notes: ["Includes 2hr Meeting Focused on Long Term Strategy"],
      },
      {
        name: "12-Month Rollout Strategy Plan",
        notes: ["Includes 3hr Meeting Focused on Long Term Strategy"],
      },
      {
        name: "Business Operations Set-Up",
        notes: [
          "Bookkeeping",
          "Tax Advisory",
          "Set-up Proper Business Bank Account",
          "Set-up Proper Business Licensing",
          "Includes Income Evaluation",
        ],
      },
    ],
  },
  {
    department: "Music Department",
    summary: "Single, multi-song, and project creation resources.",
    artistCaseStudy: "Fame Holiday",
    artistCaseStudyHref: "/case-studies/fame-holiday",
    items: [
      {
        name: "Single Creation",
        notes: [
          "Includes an EMG A&R for Sound Direction / Songwriting",
          "Includes In-Session Vocal Coaching",
          "Includes Mix + 2 Post Edits",
          "Includes 1 Custom Beat",
          "Includes Two 3hr Studio Sessions",
        ],
      },
      {
        name: "3 Song Creation",
        notes: [
          "Includes an EMG A&R for Sound Direction / Songwriting",
          "Includes In-Session Vocal Coaching",
          "Includes Mix + 2 Post Edits (per song)",
          "Includes 1 Custom Beat (per song)",
          "Includes Six 3hr Studio Sessions",
        ],
      },
      {
        name: "Project Creation (5 Songs)",
        notes: [
          "Includes an EMG A&R for Sound Direction / Songwriting",
          "Includes In-Session Vocal Coaching",
          "Includes Mix + 2 Post Edits (per song)",
          "Includes 1 Custom Beat (per song)",
          "Includes Ten 3hr Studio Sessions",
        ],
      },
    ],
  },
  {
    department: "Marketing Department",
    summary: "Brand, content, tour, and live development resources.",
    artistCaseStudy: "Kisaki",
    artistCaseStudyHref: "/case-studies/kisaki",
    items: [
      {
        name: "Content Creation",
        notes: [
          "Includes 3-4 Pieces of Content (per month)",
          "Includes 1 Content Day (per month)",
          "Includes 1hr Brainstorm Meeting (per month)",
        ],
      },
      {
        name: "Brand Deck",
        notes: [
          "1 Pager on Branding Aesthetic",
          "Includes 60-90min Meeting",
          "Develop Marketing Campaign",
        ],
      },
      {
        name: "Brand Deck + EPK",
        notes: [
          "1-2 Page Electronic Press Kit",
          "1 Pager on Branding Aesthetic",
          "Includes 60-90min Meeting",
        ],
      },
      {
        name: "30min Live Performance Set Development",
        notes: [
          "Includes One Emtee Music Group Executive Advisor",
          "Includes One Ten Ten Executive Advisor",
          "Includes Rehearsal Space",
        ],
      },
      {
        name: "60min Live Performance Set Development",
        notes: [
          "Includes One Emtee Music Group Executive Advisor",
          "Includes One Ten Ten Executive Advisor",
          "Includes Rehearsal Space",
        ],
      },
      {
        name: "Brand Deals",
        notes: ["Includes brand partnership strategy and activation roadmap"],
      },
      {
        name: "Tour Management",
        notes: ["Includes BTS Footage", "Includes Road Manager"],
      },
      {
        name: "Website Design",
        notes: [],
        sectionHeading: true,
      },
      {
        name: "All Packages Include",
        notes: [
          "60min Meeting to Solidify Details",
          "60min Meeting to Review Rough Mock-Up",
          "60min Meeting to Finalize Website",
          "Final 30min Live Site Presentation",
        ],
      },
      {
        name: "Tier 1: Starter Site",
        notes: [
          "1-page professional artist website",
          "Artist bio",
          "Music player (Spotify / Apple / SoundCloud)",
          "Social links hub",
          "Email fan signup form",
          "Press photo gallery + contact/booking",
          "Mobile-ready layout",
          "Basic search visibility setup",
        ],
      },
      {
        name: "Tier 2: Growth Site",
        notes: [
          "Everything in Tier 1",
          "Multi-section website structure",
          "Dedicated song & video pages",
          "Release archive",
          "Show & event listings",
          "Press/booking + EPK section",
          "Expanded SEO + share preview optimization",
        ],
      },
      {
        name: "Tier 3: Artist World",
        notes: [
          "Everything in Tier 2",
          "Interactive layout experience",
          "Fan-only/hidden content sections",
          "Integration with Online Merch Store package from Marketing Department.",
          "Engagement features (exclusive drops / collectibles)",
          "Designed to evolve with future releases",
          "Priority visual polish",
        ],
      },
    ],
  },
  {
    department: "Publishing / Distribution Department",
    summary: "Publishing and distro setup resources.",
    artistCaseStudy: "Artist Name (Placeholder)",
    items: [
      {
        name: "Publishing/Distro Workshop",
        notes: [
          "Confirming The Artist is Set-Up on All Necessary Platforms to Collect the $$ They Deserve",
          "Includes 60-90min Meeting",
        ],
      },
    ],
  },
  {
    department: "A&R / Sales Department",
    summary: "CRM and audience monetization resources.",
    artistCaseStudy: "Artist Name (Placeholder)",
    items: [
      {
        name: "CRM Set-Up",
        notes: ["Includes a Full CRM Automation"],
      },
      {
        name: "CRM Fee/Retainer",
        notes: ["Includes Oversight + Updating the CRM platform"],
      },
      {
        name: "Community Building",
        notes: [
          "Personal Community (for your die hard fans) Growth on All",
          "Necessary Platforms Including Membership Based",
        ],
      },
      {
        name: "Merchandise",
        notes: ["Includes Online Merch Store"],
      },
      {
        name: "Event Planning",
        notes: [
          "Includes Event Strategy",
          "Includes Revenue Strategy",
          "Includes Promo Strategy",
        ],
      },
      {
        name: "Event Planner",
        notes: [
          "Includes Event Strategy",
          "Includes Revenue Strategy",
          "Includes Promo Strategy",
          "Includes On-Site Manager/Coordinator",
        ],
      },
    ],
  },
];

function getResourceContextWithFallback(name: string, notes: string[]) {
  return (
    getResourceContext(name) ?? {
      what: `${name} is a structured resource package designed to support execution in this department.`,
      why: `It helps artists move with clarity and consistency. Key support includes: ${notes.slice(0, 2).join("; ")}.`,
    }
  );
}

export default function ResourcesPage() {
  const questionsEmail = "contact@emteemusicgroup.com";
  const questionsHref = `mailto:${questionsEmail}?subject=${encodeURIComponent("Resources Question")}&body=${encodeURIComponent("Hi Emtee team,\n\nI have a question about the artist resources.\n\nThanks,")}`;
  const [openDepartments, setOpenDepartments] = useState<string[]>([]);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [activeResource, setActiveResource] = useState<{
    department: string;
    name: string;
    notes: string[];
  } | null>(null);

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
              Resource Packages
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
            href="/rooms/front"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 backdrop-blur-xl transition hover:border-[#d6ae66]/45 hover:bg-zinc-50 hover:text-zinc-900"
          >
            Back to Lobby
          </Link>
        </div>

        <div className="accent-card relative z-10 mt-4 max-w-3xl rounded-xl border border-[#d6ae66]/35 bg-white/90 px-5 py-4 text-sm text-zinc-700 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_12px_36px_rgba(0,0,0,0.10)]">
          Browse each department to see available resources, package options, and what each one includes.
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {RESOURCE_CARDS.map((item) => (
            <article
              key={item.department}
              onMouseEnter={() => setHoveredDepartment(item.department)}
              onMouseLeave={() => setHoveredDepartment((prev) => (prev === item.department ? null : prev))}
              className={[
                "accent-card-soft rounded-2xl border bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(255,255,255,0.9))] p-5 transition duration-300",
                hoveredDepartment === item.department && !openDepartments.includes(item.department)
                  ? "border-[#d6ae66]/45 shadow-[0_0_0_1px_rgba(214,174,102,0.28),0_0_36px_rgba(214,174,102,0.38),0_24px_64px_rgba(0,0,0,0.26)]"
                  : "border-zinc-200 shadow-[0_14px_46px_rgba(0,0,0,0.12)]",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenDepartments((prev) =>
                    prev.includes(item.department)
                      ? prev.filter((dep) => dep !== item.department)
                      : [...prev, item.department]
                  )
                }
                className="flex w-full items-start justify-between gap-3 px-1 py-1 text-left transition"
                aria-expanded={openDepartments.includes(item.department)}
              >
                <div>
                  <div className="text-lg font-semibold uppercase tracking-[0.08em] text-[#8b6a2f]">
                    {item.department}
                  </div>
                  <p className="mt-2 text-sm text-zinc-700">{item.summary}</p>
                </div>
                <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#d6ae66]/45 bg-white text-[#8b6a2f]">
                  {openDepartments.includes(item.department) ? "−" : "+"}
                </span>
              </button>

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
                      <button
                        type="button"
                        onClick={() =>
                          setActiveResource({
                            department: item.department,
                            name: resource.name,
                            notes: resource.notes,
                          })
                        }
                        className="text-left text-base font-semibold text-zinc-900 underline decoration-[#d6ae66]/60 decoration-2 underline-offset-4 transition hover:text-[#7a5a24] hover:[text-shadow:0_0_14px_rgba(214,174,102,0.75)]"
                      >
                        {resource.name}
                      </button>
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
                      Artist Case Study
                    </div>
                    {item.artistCaseStudyHref ? (
                      <Link
                        href={item.artistCaseStudyHref}
                        className="mt-1 inline-flex text-sm font-medium text-zinc-900 underline decoration-[#d6ae66]/60 decoration-2 underline-offset-4 transition hover:text-[#7a5a24] hover:[text-shadow:0_0_14px_rgba(214,174,102,0.75)]"
                      >
                        {item.artistCaseStudy}
                      </Link>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-zinc-800">{item.artistCaseStudy}</p>
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
            Choose your department package first, then finalize onboarding and rollout with the EMTEE team.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/18 px-5 py-2 text-sm font-semibold text-[#6f511a] shadow-[0_0_26px_rgba(214,174,102,0.28)] transition hover:bg-[#d6ae66]/26 hover:text-[#3d2b0c]"
            >
              Request a Consultation
            </Link>
            <Link
              href={questionsHref}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:border-[#d6ae66]/45 hover:bg-zinc-50"
            >
              Have Any Questions?
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500">{questionsEmail}</p>
        </div>

        {activeResource ? (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-5"
            onClick={() => setActiveResource(null)}
          >
            <div
              className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b6a2f]">
                    {activeResource.department}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-900">{activeResource.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveResource(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100"
                  aria-label="Close resource details"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm text-zinc-700">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#8b6a2f]">
                    What It Is
                  </div>
                  <p className="mt-1 leading-relaxed">
                    {getResourceContextWithFallback(activeResource.name, activeResource.notes).what}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#8b6a2f]">
                    Why It Matters for Artists
                  </div>
                  <p className="mt-1 leading-relaxed">
                    {getResourceContextWithFallback(activeResource.name, activeResource.notes).why}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
