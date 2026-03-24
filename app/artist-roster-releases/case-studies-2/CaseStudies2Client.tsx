"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type DepartmentCaseCard = {
  id: string;
  artist: string;
  lane: string;
  imageSrc: string;
  imageAlt: string;
  note: string;
  yearTag: string;
  snapshot: string;
  points: string[];
  departmentHref: string;
  departmentLabel: string;
  caseStudyHref?: string;
};

const DEPARTMENT_CASE_CARDS: DepartmentCaseCard[] = [
  {
    id: "yanchan-publishing-distro",
    artist: "Yanchan Produced",
    lane: "Publishing / Distribution Department",
    imageSrc: "/rooms/Yanchan- Distro Publishing.png",
    imageAlt: "Yanchan publishing and distribution department case card",
    note: "Publishing And Distro Lane",
    yearTag: "CS2-01",
    snapshot:
      "Yanchan used EMTEE publishing and distribution support to tighten release structure and set up cleaner catalog operations.",
    points: [
      "Publishing/Distro Workshop (Publishing / Distribution Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    departmentHref: "/rooms/EMTEEPublishingandDistroDept",
    departmentLabel: "Open Publishing / Distribution Department",
    caseStudyHref: "/case-studies/yanchan",
  },
  {
    id: "yanchan-business",
    artist: "Yanchan Produced",
    lane: "Business Department",
    imageSrc: "/rooms/Yanchan- Business .png",
    imageAlt: "Yanchan business department case card",
    note: "Business Strategy Lane",
    yearTag: "CS2-02",
    snapshot:
      "Business support focused on operations setup and decision structure so creative momentum could convert into repeatable execution.",
    points: [
      "Business Operations Set-Up (Business Department)",
      "Progressed through all EMTEE department resources across Music, Marketing, Publishing/Distribution, Business, and A&R/Sales.",
    ],
    departmentHref: "/rooms/EMTEEBusinessDept",
    departmentLabel: "Open Business Department",
    caseStudyHref: "/case-studies/yanchan",
  },
  {
    id: "mike-ar-sales",
    artist: "Mike Cannz",
    lane: "A&R / Sales Department",
    imageSrc: "/rooms/Mike Cannz- A&R Sales.png",
    imageAlt: "Mike Cannz A&R and sales department case card",
    note: "A&R And Sales Lane",
    yearTag: "CS2-03",
    snapshot:
      "Mike Cannz received CRM and community-building support to improve conversion flow, campaign coordination, and partner readiness.",
    points: [
      "CRM Set-Up (A&R / Sales Department)",
      "CRM Fee/Retainer (A&R / Sales Department)",
      "Event Planner (A&R / Sales Department)",
    ],
    departmentHref: "/rooms/EMTEEARSalesDept",
    departmentLabel: "Open A&R / Sales Department",
    caseStudyHref: "/case-studies/mike-cannz",
  },
  {
    id: "kisaki-marketing",
    artist: "KISAKI",
    lane: "Marketing Department",
    imageSrc: "/rooms/Kisaki -Marketing.png",
    imageAlt: "Kisaki marketing department case card",
    note: "Marketing Lane",
    yearTag: "CS2-04",
    snapshot:
      "KISAKI's marketing lane emphasized stronger campaign presentation, structured content output, and live set positioning.",
    points: [
      "Content Creation (Marketing Department)",
      "Brand Deck (Marketing Department)",
      "30min Live Performance Set Development (Marketing Department)",
    ],
    departmentHref: "/rooms/EMTEEMarketingDept",
    departmentLabel: "Open Marketing Department",
    caseStudyHref: "/case-studies/kisaki",
  },
  {
    id: "fame-music",
    artist: "Fame Holiday",
    lane: "Music Department",
    imageSrc: "/rooms/Fame-Music.png",
    imageAlt: "Fame Holiday music department case card",
    note: "Music Development Lane",
    yearTag: "CS2-05",
    snapshot:
      "Fame Holiday's music lane focused on song development and tighter creative direction, backed by cross-department campaign support.",
    points: [
      "Single Creation (Music Department)",
      "3 Song Creation (Music Department)",
    ],
    departmentHref: "/rooms/EMTEEMusicDept",
    departmentLabel: "Open Music Department",
    caseStudyHref: "/case-studies/fame-holiday",
  },
];

export default function CaseStudies2Client() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCard, setActiveCard] = useState<DepartmentCaseCard | null>(null);

  useEffect(() => {
    const selectedExampleId = searchParams.get("example");
    if (!selectedExampleId) {
      return;
    }
    const matchedCard = DEPARTMENT_CASE_CARDS.find((card) => card.id === selectedExampleId);
    if (matchedCard) {
      setActiveCard(matchedCard);
    }
  }, [searchParams]);

  function openCard(card: DepartmentCaseCard) {
    setActiveCard(card);
    router.replace(`${pathname}?example=${card.id}`, { scroll: false });
  }

  function closeCard() {
    setActiveCard(null);
    router.replace(pathname, { scroll: false });
  }

  function goToAdjacentCard(direction: "prev" | "next") {
    if (!activeCard) return;
    const currentIndex = DEPARTMENT_CASE_CARDS.findIndex((card) => card.id === activeCard.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % DEPARTMENT_CASE_CARDS.length
        : (currentIndex - 1 + DEPARTMENT_CASE_CARDS.length) % DEPARTMENT_CASE_CARDS.length;
    openCard(DEPARTMENT_CASE_CARDS[nextIndex]);
  }

  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard();
      if (event.key === "ArrowRight") goToAdjacentCard("next");
      if (event.key === "ArrowLeft") goToAdjacentCard("prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard]);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_340px_at_50%_-10%,rgba(214,174,102,0.2),transparent_72%),radial-gradient(800px_420px_at_8%_95%,rgba(15,23,42,0.05),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_55px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.09)] sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2f]/85">
            Artist Subpage Concept
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Case Studies
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 sm:text-base">
            Explore artist case studies through individual department lanes, with each card highlighting the specific
            EMTEE resources used to support development, rollout, and execution.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a5a24]">
              EMTEE Internal Concept
            </span>
            <span className="rounded-full border border-black/12 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70">
              Department Cards
            </span>
          </div>
        </div>

        <section className="mt-8 grid gap-7 lg:grid-cols-2">
          {DEPARTMENT_CASE_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => openCard(card)}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-[0_12px_38px_rgba(0,0,0,0.07)] transition hover:border-[#d6ae66]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6ae66]/60"
              aria-label={`Open snapshot for ${card.artist} - ${card.lane}`}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex rounded-full border border-black/12 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-black/65">
                    {card.yearTag}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8b6a2f]/80">Open Snapshot</div>
                </div>
                <div className="mt-3 flex items-center justify-center rounded-2xl border border-black/10 bg-[#f8f8f8] p-4">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={1400}
                    height={1600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
                    className="h-auto max-h-[560px] w-full object-contain"
                    draggable={false}
                  />
                </div>
                <div className="mt-4 inline-flex rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#7a5a24]">
                  {card.lane}
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">{card.artist}</h2>
                <p className="mt-1 text-base font-medium text-black/62">{card.note}</p>
              </div>
            </button>
          ))}
        </section>

      </section>

      {activeCard ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCard.artist} snapshot`}
        >
          <button
            type="button"
            onClick={closeCard}
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            aria-label="Close modal"
          />
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="border-b border-black/8 p-4 sm:p-5">
              <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-[#f8f8f8] p-3">
                <Image
                  src={activeCard.imageSrc}
                  alt={activeCard.imageAlt}
                  width={1400}
                  height={1600}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="h-auto max-h-[420px] w-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={closeCard}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white text-black/70 transition hover:bg-black/[0.04]"
                aria-label="Close snapshot"
              >
                ×
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => goToAdjacentCard("prev")}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 transition hover:bg-black/[0.04]"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => goToAdjacentCard("next")}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 transition hover:bg-black/[0.04]"
                >
                  Next →
                </button>
              </div>
              <div className="inline-flex rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#7a5a24]">
                {activeCard.lane}
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-black">{activeCard.artist}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/72 sm:text-base">{activeCard.snapshot}</p>
              <ul className="mt-4 space-y-2 text-sm text-black/80">
                {activeCard.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#b88b3a]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/case-studies"
                  onClick={closeCard}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                >
                  View All Case Studies
                </Link>
                <Link
                  href={activeCard.departmentHref}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                >
                  {activeCard.departmentLabel}
                </Link>
                {activeCard.caseStudyHref ? (
                  <Link
                    href={activeCard.caseStudyHref}
                    className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/16 px-4 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
                  >
                    View Full Case Study
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
