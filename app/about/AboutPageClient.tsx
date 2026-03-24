"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PILLARS = [
  {
    title: "Music",
    body: "Creative direction, production support, and release readiness built around artist identity.",
  },
  {
    title: "Brand",
    body: "Narrative, visual positioning, and market presentation that make the artist recognizable.",
  },
  {
    title: "Release",
    body: "Structured rollout systems that convert momentum into measurable campaign outcomes.",
  },
  {
    title: "Business",
    body: "Financial and operational systems that support long-term sustainability and decision quality.",
  },
  {
    title: "Live",
    body: "Performance strategy and showcase readiness that turn stage moments into career growth.",
  },
];

const PHILOSOPHY_BREAKDOWN = [
  {
    title: "Vision",
    body: "To move the industry away from short-term wins and toward a model that is competitive, durable, and sustainable like tech and finance.",
  },
  {
    title: "Mission",
    body: "To teach artists, producers, writers, engineers, and music entrepreneurs to organize and strategize their careers for long-term growth.",
  },
  {
    title: "Values",
    body: "Family, Hustle, Integrity, Humility, and Longevity guide every decision so execution stays principled, disciplined, and legacy-focused.",
  },
];

export default function AboutPageClient() {
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [howYouStartModalOpen, setHowYouStartModalOpen] = useState(false);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.20),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="accent-card rounded-2xl border border-[#d6ae66]/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_90px_rgba(0,0,0,0.12)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            About Us
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Why EMTEE Works
            </h1>
            <Image
              src="/EMG2.png"
              alt="EMTEE Music Group logo"
              width={86}
              height={86}
              priority
              className="h-16 w-16 rounded-lg object-contain sm:h-20 sm:w-20 justify-self-end"
            />
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-700 sm:text-base">
            EMTEE Music Group is a creative business launchpad built to help artists move with
            vision, structure, and intention. Our approach is simple: build the foundation, align
            the strategy, and execute with purpose. The result is work that doesn&apos;t just look
            good, it builds a real track record.
          </p>
        </div>

        <div className="mt-7 grid items-start gap-6 md:grid-cols-2">
          <div className="grid gap-6">
            <article className="accent-card-soft rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Philosophy
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                EMTEE exists to shift music careers away from short-term wins and toward the level of
                competitiveness and sustainability seen in technology and finance. Our mission is to
                teach artists, producers, writers, engineers, and music entrepreneurs how to organize,
                strategize, and execute for longevity. We apply this through five operating values:
                family (treat everyone as our own), hustle (work relentlessly for the dream),
                integrity (values over money), humility (stay level-headed), and longevity
                (long-term legacy over short-term gimmicks).
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {PHILOSOPHY_BREAKDOWN.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#d6ae66]/28 bg-[#d6ae66]/[0.06] p-3"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                      {item.title}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-700">{item.body}</p>
                  </div>
                ))}
              </div>
            </article>

            <section className="accent-card-soft rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Pillars</div>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {PILLARS.map((pillar, index) => (
                  <article
                    key={pillar.title}
                    className="rounded-xl border border-[#d6ae66]/28 bg-[linear-gradient(145deg,rgba(214,174,102,0.1),rgba(255,255,255,0.96))] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/12 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b6a2f]">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-zinc-900">{pillar.title}</h2>
                        <p className="mt-2 text-xs leading-relaxed text-zinc-700">{pillar.body}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6">
            <article className="accent-card-soft rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                How You Start
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {[
                  <span key="point-1">
                    Learn about EMTEE and review{" "}
                    <Link
                      href="/case-studies"
                      className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 hover:text-[#6f511a]"
                    >
                      case studies
                    </Link>{" "}
                    from artists we&apos;ve directly worked with.
                  </span>,
                  <span key="point-2">
                    Check out other{" "}
                    <Link
                      href="/artist-roster-releases"
                      className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 hover:text-[#6f511a]"
                    >
                      artists we&apos;ve supported
                    </Link>{" "}
                    through our resources.
                  </span>,
                  <span key="point-3">
                    Review our{" "}
                    <button
                      type="button"
                      onClick={() => setDepartmentModalOpen(true)}
                      className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 transition hover:text-[#6f511a]"
                    >
                      departments
                    </button>{" "}
                    to understand the lanes we specialize in and where your goals may fit best.
                  </span>,
                  <span key="point-4">
                    Review the{" "}
                    <Link href="/connect" className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 hover:text-[#6f511a]">
                      resources
                    </Link>{" "}
                    and packages attached to that department to understand what we have to offer.
                  </span>,
                  <span key="point-5">
                    Review our{" "}
                    <button
                      type="button"
                      onClick={() => setHowYouStartModalOpen(true)}
                      className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 transition hover:text-[#6f511a]"
                    >
                      structured process
                    </button>{" "}
                    to understand how the consultation works and what the next steps look like.
                  </span>,
                  <span key="point-6">
                    <Link
                      href="/consultation"
                      className="font-medium text-[#8b6a2f] underline decoration-[#d6ae66]/65 underline-offset-2 hover:text-[#6f511a]"
                    >
                      Book a consultation
                    </Link>{" "}
                    if you&apos;re interested in learning more and exploring whether we&apos;re the right fit to help you meet your goals.
                  </span>,
                ].map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d6ae66]/85" />
                    <div className="min-w-0 flex-1">
                      <span>{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

          </div>
        </div>
      </section>

      {departmentModalOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close department image"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setDepartmentModalOpen(false)}
          />
          <div className="relative z-[1] w-full max-w-5xl rounded-2xl border border-white/20 bg-white p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="text-sm font-semibold text-zinc-900">Department Overview</div>
              <button
                type="button"
                onClick={() => setDepartmentModalOpen(false)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Close
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d6ae66]/25 bg-white">
              <Image
                src="/rooms/departmenthq.png"
                alt="Department overview chart"
                width={1600}
                height={1000}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}

      {howYouStartModalOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close how you start image"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setHowYouStartModalOpen(false)}
          />
          <div className="relative z-[1] w-full max-w-5xl rounded-2xl border border-white/20 bg-white p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="text-sm font-semibold text-zinc-900">How You Start</div>
              <button
                type="button"
                onClick={() => setHowYouStartModalOpen(false)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Close
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d6ae66]/25 bg-white">
              <Image
                src="/rooms/howyoustarthd.png"
                alt="How you start framework"
                width={1600}
                height={1000}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
