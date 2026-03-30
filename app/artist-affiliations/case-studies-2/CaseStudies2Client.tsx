"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { CASE_STUDY_DECK, type CaseStudyDeckItem } from "@/data/case-study-deck";

type DepartmentCaseCard = CaseStudyDeckItem & {
  yearTag: string;
};

const DEPARTMENT_CASE_CARDS: DepartmentCaseCard[] = CASE_STUDY_DECK.map((card, index) => ({
  ...card,
  yearTag: `CS2-0${index + 1}`,
}));

export default function CaseStudies2Client() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCard = useMemo(() => {
    const selectedExampleId = searchParams.get("example");
    if (!selectedExampleId) return null;
    return DEPARTMENT_CASE_CARDS.find((card) => card.id === selectedExampleId) ?? null;
  }, [searchParams]);

  const openCard = useCallback((card: DepartmentCaseCard) => {
    router.replace(`${pathname}?example=${card.id}`, { scroll: false });
  }, [pathname, router]);

  const closeCard = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const goToAdjacentCard = useCallback((direction: "prev" | "next") => {
    if (!activeCard) return;
    const currentIndex = DEPARTMENT_CASE_CARDS.findIndex((card) => card.id === activeCard.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % DEPARTMENT_CASE_CARDS.length
        : (currentIndex - 1 + DEPARTMENT_CASE_CARDS.length) % DEPARTMENT_CASE_CARDS.length;
    openCard(DEPARTMENT_CASE_CARDS[nextIndex]);
  }, [activeCard, openCard]);

  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard();
      if (event.key === "ArrowRight") goToAdjacentCard("next");
      if (event.key === "ArrowLeft") goToAdjacentCard("prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard, closeCard, goToAdjacentCard]);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_340px_at_50%_-10%,rgba(214,174,102,0.2),transparent_72%),radial-gradient(800px_420px_at_8%_95%,rgba(15,23,42,0.05),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_55px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.09)] sm:p-8">
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Case Studies
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 sm:text-base">
            Explore artist case studies through individual department resources they’ve used. Each card highlights the specific resources used to support development, rollout and execution for each artist.
          </p>
        </div>

        <section className="mt-8 grid gap-7 lg:grid-cols-2">
          {DEPARTMENT_CASE_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => openCard(card)}
              className="group flex h-full min-h-[34rem] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-[0_12px_38px_rgba(0,0,0,0.07)] transition hover:border-[#d6ae66]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6ae66]/60"
              aria-label={`Open snapshot for ${card.artist} - ${card.lane}`}
            >
              <div className="shrink-0 border-b border-black/8 p-4 sm:p-5">
                <div className="flex h-[min(42vh,420px)] items-center justify-center rounded-2xl border border-black/10 bg-[#f8f8f8] p-3">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={1400}
                    height={1600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mt-4 inline-flex rounded-full border border-[#c69a45]/34 bg-[linear-gradient(135deg,rgba(255,248,232,0.98),rgba(233,212,166,0.74))] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6c4b14] shadow-[0_10px_24px_rgba(180,137,59,0.14)]">
                  {card.lane}
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">{card.artist}</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/72 sm:text-base">{card.snapshot}</p>
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
          <div className="relative z-10 flex max-h-[calc(100svh-2rem)] w-full max-w-[900px] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="shrink-0 border-b border-black/8 p-4 sm:p-5">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_18px_48px_rgba(0,0,0,0.16)]">
                <Image
                  src={activeCard.imageSrc}
                  alt={activeCard.imageAlt}
                  width={1400}
                  height={1600}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="w-full max-h-[460px] object-contain"
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
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => goToAdjacentCard("prev")}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 transition hover:bg-black/[0.04]"
                >
                  ← Prev
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
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-black/8 pt-5">
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
