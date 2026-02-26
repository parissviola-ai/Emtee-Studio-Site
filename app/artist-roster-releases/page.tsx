"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type RosterItem = {
  artist: string;
  role: string;
  instagramHref: string;
  imageSrc: string;
  imageAlt: string;
  catalogId: string;
  imagePosition?: string;
};

type SupportedArtist = {
  artist: string;
  supportLane: string;
  note: string;
  caseStudyHref?: string;
};

const DIRECT_ROSTER: RosterItem[] = [
  {
    artist: "Yanchan Produced",
    role: "Producer / Artist",
    instagramHref: "https://www.instagram.com/yanchanproduced/",
    imageSrc: "/case-studies/yanchan-opt.jpg",
    imageAlt: "Yanchan Produced portrait",
    catalogId: "AR-001",
    imagePosition: "center 22%",
  },
  {
    artist: "Mike Cannz",
    role: "Artist / Entrepreneur",
    instagramHref: "https://www.instagram.com/mikecannz/",
    imageSrc: "/case-studies/mikecannz-opt.jpg",
    imageAlt: "Mike Cannz portrait",
    catalogId: "AR-002",
    imagePosition: "center 20%",
  },
  {
    artist: "KISAKI",
    role: "Producer / DJ / Vocalist",
    instagramHref: "https://www.instagram.com/kisakimusic/",
    imageSrc: "/case-studies/kisaki-opt.jpg",
    imageAlt: "KISAKI portrait",
    catalogId: "AR-003",
  },
];

const RESOURCE_SUPPORTED_ARTISTS: SupportedArtist[] = [
  {
    artist: "Fame Holiday",
    supportLane: "Music Department",
    note: "Resource-supported artist case study through EMTEE department workflows.",
    caseStudyHref: "/case-studies/fame-holiday",
  },
  {
    artist: "Artist Name (Placeholder)",
    supportLane: "Business Department",
    note: "Artist supported through strategy, operations, and rollout planning resources.",
  },
  {
    artist: "Artist Name (Placeholder)",
    supportLane: "Publishing / Distribution Department",
    note: "Artist supported through publishing and distribution setup resources.",
  },
  {
    artist: "Artist Name (Placeholder)",
    supportLane: "A&R / Sales Department",
    note: "Artist supported through CRM, community-building, and conversion resources.",
  },
];

export default function ArtistRosterReleasesPage() {
  const [activePanel, setActivePanel] = useState<"direct" | "supported">("direct");

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.18),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="accent-card rounded-2xl border border-[#d6ae66]/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_75px_rgba(0,0,0,0.14)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            Artist Catalog
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Artist Roster & Releases
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700 sm:text-base">
                Two categories are shown below: direct EMTEE roster artists, and artists supported through
                department resources.
              </p>
            </div>
            <Image
              src="/Logo2.png"
              alt="EMTEE logo"
              width={52}
              height={52}
              className="h-10 w-10 rounded-md object-contain opacity-80 sm:h-[52px] sm:w-[52px]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-full border border-black/12 bg-white px-4 py-2 text-xs font-semibold tracking-[0.14em] text-black/65">
            Direct Roster + Resource-Supported Artists
          </div>
          <Link
            href="/rooms/front"
            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
          >
            Back to Lobby
          </Link>
        </div>

        <section className="mt-8">
          <div className="mb-4 inline-flex rounded-full border border-black/15 bg-white p-1 shadow-[0_8px_22px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={() => setActivePanel("direct")}
              className={[
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                activePanel === "direct"
                  ? "bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
                  : "text-black/65 hover:text-black",
              ].join(" ")}
            >
              Direct EMTEE Artists
            </button>
            <button
              type="button"
              onClick={() => setActivePanel("supported")}
              className={[
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                activePanel === "supported"
                  ? "bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
                  : "text-black/65 hover:text-black",
              ].join(" ")}
            >
              Artists Supported Through Resources
            </button>
          </div>

          {activePanel === "direct" ? (
            <div className="animate-[fadeIn_220ms_ease-out]">
              <div className="mb-4 rounded-xl border border-black/18 bg-[linear-gradient(145deg,rgba(0,0,0,0.05),rgba(0,0,0,0.015))] px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-black/88">
                    Direct EMTEE Artists
                  </div>
                  <div className="rounded-full border border-black/25 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/75">
                    Core Roster
                  </div>
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-700">
                  Artists in EMTEE&apos;s direct roster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {DIRECT_ROSTER.map((item) => (
                <article
                  key={item.artist}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white p-3 shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6ae66]/62 hover:shadow-[0_0_0_1px_rgba(214,174,102,0.28),0_0_24px_rgba(214,174,102,0.2),0_24px_58px_rgba(0,0,0,0.18)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(460px_240px_at_8%_0%,rgba(214,174,102,0.24),transparent_72%)]"
                  />

                  <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={1200}
                      height={720}
                      className="aspect-[3/4] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
                    <div className="absolute left-2 top-2 rounded-full border border-black/12 bg-white/75 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/70">
                      {item.catalogId}
                    </div>
                  </div>

                  <div className="relative mt-3 min-h-[2.9rem] text-[10px] font-semibold uppercase tracking-[0.16em] text-black/65 sm:min-h-0">
                    {item.role}
                  </div>
                  <h2 className="relative mt-1.5 min-h-[2.25rem] text-base font-semibold text-zinc-900 sm:min-h-0 sm:text-lg">
                    {item.artist}
                  </h2>

                  <div className="relative mt-auto pt-3 flex">
                    <a
                      href={item.instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/16 px-3 py-1.5 text-xs font-semibold text-[#6f511a] shadow-[0_0_14px_rgba(214,174,102,0.18)] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
                    >
                      Instagram
                    </a>
                  </div>
                </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-[fadeIn_220ms_ease-out]">
              <div className="mb-4 rounded-xl border border-black/15 border-dashed bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(0,0,0,0.02))] px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-black/78">
                    Artists Supported Through Resources
                  </div>
                  <div className="rounded-full border border-black/20 bg-black/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/70">
                    Department Support
                  </div>
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-700">
                  Artists supported through specific department resources.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {RESOURCE_SUPPORTED_ARTISTS.map((item, index) => (
                  <article
                    key={`${item.artist}-${item.supportLane}-${index}`}
                    className="rounded-xl border border-black/10 bg-white p-4 shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
                  >
                    <div className="inline-flex rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7c5b20]">
                      {item.supportLane}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-zinc-900">{item.artist}</h2>
                    <p className="mt-1 text-sm text-zinc-700">{item.note}</p>
                    {item.caseStudyHref ? (
                      <Link
                        href={item.caseStudyHref}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-[#7c5b20] transition hover:text-[#5b4217]"
                      >
                        View Case Study →
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
