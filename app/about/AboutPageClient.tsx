"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PILLARS = [
  {
    title: "A&R/Sales",
    body: "CRMs, company valuations and the question of long-lasting, sustainable monetization of your music business.",
  },
  {
    title: "Business",
    body: "Financial and operational systems that support long-term sustainability and decision quality. This also includes grant strategies.",
  },
  {
    title: "Marketing",
    body: "Branding, content, touring and everything that fuels the reach of your brand and expansion of your audience.",
  },
  {
    title: "Publishing & Distribution",
    body: "Catalog management, publishing administration and royalty collections.",
  },
  {
    title: "Music",
    body: "Creative direction, production support and release readiness built around artist identity.",
  },
];

const PHILOSOPHY_BREAKDOWN = [
  {
    title: "Vision",
    body: "To move music and creative careers away from short-term wins and toward a more competitive, sustainable long-term model.",
  },
  {
    title: "Mission",
    body: "To teach artists, producers, writers, engineers and music/creative entrepreneurs to organize and strategize their careers for long-term growth.",
  },
  {
    title: "Values",
    body: "Family, Hustle, Integrity, Humility and Longevity guide every decision so execution stays principled, disciplined and legacy-focused.",
  },
];

export default function AboutPageClient() {
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);

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
            Emtee Music Group is the first ever creative business launchpad built to help creatives
            move with vision, structure and intention. Our approach is simple: build the
            foundation, align the strategy and launch with purpose. The result is work that
            doesn&apos;t just look successful, but actually IS successful.
          </p>
        </div>

        <div className="mt-7 grid items-start gap-6 md:grid-cols-2">
          <article className="accent-card-soft flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Philosophy
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              EMTEE exists to shift music/creative careers away from short-term wins and toward
              the level of competitiveness and sustainability seen in sectors such as technology
              and finance. Our mission is to teach artists, producers, writers, engineers and
              music/creative entrepreneurs how to organize, strategize and execute for longevity.
              We apply this through our five operating values: family (treat everyone as our
              own), hustle (work relentlessly for the dream), integrity (values over money),
              humility (stay level-headed) and longevity (long-term legacy over short-term
              gimmicks).
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

          <section className="accent-card-soft flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Departments/Pillars</div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {PILLARS.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="rounded-xl border border-[#d6ae66]/28 bg-[linear-gradient(145deg,rgba(214,174,102,0.1),rgba(255,255,255,0.96))] p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b6a2f]">
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

        <div className="mt-8 flex justify-center">
          <Link
            href="https://tinyurl.com/connectwithemtee"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-[#c89b4b]/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(214,174,102,0.14))] px-3 py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#5d4314] shadow-[0_12px_30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.08)] transition duration-200 hover:border-[#b9862d]/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(214,174,102,0.12)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c89b4b]/40 bg-[#fff8ea] text-[#8b6a2f] transition group-hover:border-[#b9862d]/70 group-hover:bg-[#f8ebc8]">
              →
            </span>
            <span>Apply For A Consultation</span>
          </Link>
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

    </main>
  );
}
