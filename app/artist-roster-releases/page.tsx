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
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
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
    artist: "Lil Durk",
    supportLane: "Music Department",
    note: "Co-production on “Think You Glowed.”",
    imageSrc: "/news/thinkyouglowed-opt.jpg",
    imageAlt: "Lil Durk - Think You Glowed artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "50 Cent",
    supportLane: "Live Performance",
    note: "Yanchan Produced opened up for him during the “Final Lap” tour in Mumbai.",
    imageSrc: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/07/10141737/50-Cent-Final-Lap-tour-1600x900.jpg?tr=w-1600",
    imageAlt: "50 Cent Final Lap tour artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Russ",
    supportLane: "Music Department",
    note: "Co-production on “The Wind.”",
    imageSrc: "https://yt3.googleusercontent.com/f16R_n3YKPthxphDOdHNX9qE1c8-1gN67Ax4uARDL_n0K0nCqMTdNroE-fBhbuA_ouU48wE9yBY=s900-c-k-c0x00ffffff-no-rj",
    imageAlt: "Russ artwork",
    imagePosition: "center 20%",
  },
  {
    artist: "Shruti Hassan",
    supportLane: "Music Department",
    note: "Production + writing on “Inimel.”",
    imageSrc: "https://i.ytimg.com/vi/IIat8oxEIbE/maxresdefault.jpg",
    imageAlt: "Shruti Haasan artwork",
    imagePosition: "center 24%",
  },
  {
    artist: "Hanumankind",
    supportLane: "Music Department",
    note: "Collaborated in the studio.",
    imageSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/2025%20cover%20photo%20Hanumankind.jpg",
    imageAlt: "Hanumankind portrait",
    imagePosition: "center top",
  },
  {
    artist: "Killy",
    supportLane: "Music Department",
    note: "Collaborated in the studio.",
    imageSrc: "https://i.scdn.co/image/ab676161000051745e7e0070e0e8ab2e3e44917f",
    imageAlt: "Killy portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Pressa",
    supportLane: "Music Department",
    note: "Collaborated in the studio.",
    imageSrc: "https://shiftermagazine.com/wp-content/uploads/2022/09/Pressa-featured.jpg",
    imageAlt: "Pressa portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Charlie B",
    supportLane: "Music Department",
    note: "Released a collaboration project.",
    imageSrc: "https://i.scdn.co/image/ab67616d0000b27389a4cc45a9b423e83ffda3f2",
    imageAlt: "Charlie B artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "Bugus",
    supportLane: "Live Performance",
    note: "EMG roster artist toured with him as opening act during his first Canadian tour.",
    imageSrc: "https://www.melodicmag.com/wp-content/uploads/2019/05/Bugus-Diemon-Color-hires-web-2-683x1024.jpg.webp",
    imageAlt: "Bugus portrait",
    imagePosition: "center 16%",
  },
  {
    artist: "Karl Wolf",
    supportLane: "Live Performance",
    note: "EMG roster artists toured with him as opening act during his “DIY Tour.”",
    imageSrc: "https://i.ytimg.com/vi/k6ARKKvNaRg/sddefault.jpg?v=6339cf8c",
    imageAlt: "Karl Wolf artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Yung Tory",
    supportLane: "Music Department",
    note: "Collaborated in the studio.",
    imageSrc: "https://hiphopcanada.com/wp-content/uploads/2021/07/yung-tory-1200x675-1.jpg",
    imageAlt: "Yung Tory portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Kristina Maria",
    supportLane: "Music Department",
    note: "6-month sound development alongside her manager Vito Luprano, Celine Dion’s former manager.",
    imageSrc: "https://r2.theaudiodb.com/images/media/artist/widethumb/qpquvu1545303993.jpg/medium",
    imageAlt: "Kristina Maria portrait",
    imagePosition: "center 20%",
  },
  {
    artist: "Birdman",
    supportLane: "Business Department",
    note: "Signed an artist for Birdman to executive produce for an EMG artist.",
    imageSrc: "https://preview.redd.it/jokes-aside-how-good-a-rapper-would-you-say-baby-birdman-is-v0-i8yuz03q2mn81.jpg?auto=webp&s=14e3bafe57ef32c64edb8e831bf23a91b0d875e1",
    imageAlt: "Birdman portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Caskey",
    supportLane: "Music Department",
    note: "Collaborated in the studio.",
    imageSrc: "https://s1.ticketm.net/dam/a/8de/c4a53e1e-6eec-497e-a203-b1b2c05908de_RETINA_PORTRAIT_3_2.jpg",
    imageAlt: "Caskey portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Jacquees",
    supportLane: "A&R / Sales Department",
    note: "Assistant A&R support.",
    imageSrc: "https://theshaderoom.com/wp-content/uploads/2025/05/Jacquees-Baby-Snow-Twin-It-Up-In-Icy-Chains-For-His-9-Month-Milestone-Flicks-e1746844020106.jpg",
    imageAlt: "Jacquees portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Austin Mahone",
    supportLane: "A&R / Sales Department",
    note: "Assistant A&R support.",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BNjg4NTUwNDgtNWY2Mi00ZTIzLThiZDEtYWI3NDY0NjY2MDU3XkEyXkFqcGc@._V1_.jpg",
    imageAlt: "Austin Mahone portrait",
    imagePosition: "center 14%",
  },
  {
    artist: "London On Da Track",
    supportLane: "Business Department",
    note: "Business management support, assistant A&R support, and label deal negotiation.",
    imageSrc: "https://m.media-amazon.com/images/M/MV5BMjlkMWZhYzktOWEwOS00YTEzLTgxOGItYzZkZDNhNmJjN2Y1XkEyXkFqcGc@._V1_.jpg",
    imageAlt: "London On Da Track portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Rich Homie Quan",
    supportLane: "A&R / Sales Department",
    note: "Assistant A&R support.",
    imageSrc: "https://www.rollingstone.com/wp-content/uploads/2024/09/rich-homie-quan-obit.jpg?w=1581&h=1054&crop=1",
    imageAlt: "Rich Homie Quan portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Yung Thug",
    supportLane: "A&R / Sales Department",
    note: "Assistant A&R support.",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjJSHhUY0pvkgVZfBvGyVF2sH5_prNXEvetA&s",
    imageAlt: "Young Thug portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Charle$ (WolfieRaps)",
    supportLane: "Music Department",
    note: "Production + writing on “Personal.”",
    imageSrc: "https://i.ytimg.com/vi/XdJRxrdB66o/maxresdefault.jpg",
    imageAlt: "Charle$ artwork",
    imagePosition: "center 22%",
  },
  {
    artist: "Dom Vallie",
    supportLane: "Orange Room",
    note: "Orange Room Session.",
    imageSrc: "https://images.genius.com/b5bebe5fb2a22e2dbe6937168283cd6c.1000x1000x1.jpg",
    imageAlt: "Dom Vallie artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "Omega",
    supportLane: "Orange Room",
    note: "Orange Room Session.",
    imageSrc: "https://r2.theaudiodb.com/images/media/artist/thumb/ytrqry1429549354.jpg",
    imageAlt: "Omega portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Kwazii",
    supportLane: "Orange Room",
    note: "Orange Room Session, with a single coming soon.",
    imageSrc: "https://www.socanmagazine.ca/wp-content/uploads/2025/03/Kwazii_2025_Banner.jpg",
    imageAlt: "Kwazii artwork",
    imagePosition: "center 18%",
  },
  {
    artist: "TOME",
    supportLane: "Music Department",
    note: "Production on “Have Fun.”",
    imageSrc: "https://www.shedoesthecity.com/wp-content/uploads/files/2021/09/Tome-copy.jpg",
    imageAlt: "TOME portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Aqyila",
    supportLane: "Music Department",
    note: "Production on “Believe.”",
    imageSrc: "https://static.wixstatic.com/media/ec807a_21e69783cd104aed8e2c05bfd9e9a2d0~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ec807a_21e69783cd104aed8e2c05bfd9e9a2d0~mv2.jpg",
    imageAlt: "Aqyila portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Trey Joshua",
    supportLane: "Music Department",
    note: "Production on “Need a Friend.”",
    imageSrc: "https://static.wixstatic.com/media/d759fc_ccc2ac10428b498d98d2d1aa1134b385~mv2.jpg/v1/fill/w_980,h_1470,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d759fc_ccc2ac10428b498d98d2d1aa1134b385~mv2.jpg",
    imageAlt: "Trey Joshua portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Saukrates",
    supportLane: "Music Department",
    note: "Production on “Shine On.”",
    imageSrc: "https://welcometothemusic.com/wp-content/uploads/2025/01/Saukrates-Toronto-vs-Everybody-promo-pic.jpg",
    imageAlt: "Saukrates portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Pilla B",
    supportLane: "Music Department",
    note: "Production on “I Seen It.”",
    imageSrc: "https://hiphopcanada.com/wp-content/uploads/2018/10/pilla-b-1200w-1.jpg",
    imageAlt: "Pilla B portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Jonita Gandhi",
    supportLane: "Music Department",
    note: "Production on “Beprwai.”",
    imageSrc: "/news/jonitabeparwai-opt.jpg",
    imageAlt: "Jonita Gandhi - Beparwai artwork",
  },
  {
    artist: "Anjulie",
    supportLane: "Music Department",
    note: "Production on “Chai & Sunshine.”",
    imageSrc: "https://i.ytimg.com/vi/lH3SdlkeudA/mqdefault.jpg",
    imageAlt: "Chai & Sunshine artwork",
    imagePosition: "center 20%",
  },
  {
    artist: "Zach Zoya",
    supportLane: "Music Department",
    note: "Production on “Hard to Love.”",
    imageSrc: "https://readrange.com/wp-content/uploads/elementor/thumbs/ZZ-hero-2-1-rgg6zplx91a7gfdyzq0hcilhpf4n1dkato0i15bnyo.jpg",
    imageAlt: "Zach Zoya portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "SVDP",
    supportLane: "Music Department",
    note: "Production on multiple releases + Mridangam Raps.",
    imageSrc: "https://g5afoundation.org/culture/wp-content/uploads/2023/08/SVDP-by-Gajan-Balan-1-1-474x324.jpg",
    imageAlt: "SVDP portrait",
    imagePosition: "center 18%",
  },
  {
    artist: "Fame Holiday",
    supportLane: "Music Department",
    note: "Won Song of the Year for “Letter to My Dad” (production + writing), plus production + writing on multiple releases.",
    caseStudyHref: "/case-studies/fame-holiday",
    imageSrc: "/case-studies/fh-opt.jpg",
    imageAlt: "Fame Holiday artwork",
  },
  {
    artist: "King Cruff",
    supportLane: "Orange Room",
    note: "Collaboration in studio + Orange Room Session.",
    imageSrc: "https://www.socanmagazine.ca/wp-content/uploads/2025/01/KingCruff_CourtesyUMC_Banner_Scaled.jpg",
    imageAlt: "King Cruff portrait",
    imagePosition: "center 18%",
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
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                Artist Supported Through Our Resources
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
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/artist-roster-releases/case-studies-2"
              className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/12 px-5 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/20"
            >
              Case Study 2
            </Link>
            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Back to Lobby
            </Link>
          </div>
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
                    {item.imageSrc ? (
                      <div className="overflow-hidden rounded-lg border border-black/8 bg-black/[0.02]">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt ?? `${item.artist} image`}
                          width={1200}
                          height={720}
                          className="aspect-[16/9] w-full object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                          draggable={false}
                        />
                      </div>
                    ) : null}
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
