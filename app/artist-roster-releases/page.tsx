"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type SupportedArtist = {
  artist: string;
  supportLane: string;
  note: string;
  caseStudyHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

type Partner = {
  name: string;
  src: string;
  href: string;
};

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
    imageSrc: "/rooms/hk.jpg",
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

const PARTNERS: Partner[] = [
  { name: "UMusic", src: "/partners/umusic.png", href: "https://www.universalmusic.com" },
  { name: "Republic Records", src: "/partners/republic.png", href: "https://www.republicrecords.com" },
  { name: "Sony", src: "/partners/sony.png", href: "https://www.sonymusic.com" },
  { name: "Cadence", src: "/partners/cadence.png", href: "https://cadencemusicgroup.com/" },
  { name: "Dharma Studio", src: "/partners/dharmastudio.png", href: "https://www.dharmaworldwide.com/" },
  { name: "Bonfire Records", src: "/partners/bonfire.png", href: "https://www.bonfiremusicgroup.com/about/" },
  { name: "Spinnin’ Records", src: "/partners/spinnin2.svg", href: "https://www.spinninrecords.com" },
];

export default function ArtistRosterReleasesPage() {
  const [activeView, setActiveView] = useState<"artists" | "partners">("artists");

  useEffect(() => {
    function syncViewFromHash() {
      setActiveView(window.location.hash === "#partners" ? "partners" : "artists");
    }

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  function switchView(nextView: "artists" | "partners") {
    setActiveView(nextView);
    const nextHash = nextView === "partners" ? "#partners" : "#artists";
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
  }

  if (activeView === "partners") {
    return (
      <main className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_-10%,rgba(214,174,102,0.16),transparent_68%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_25%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_55%,rgba(255,255,255,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
          <div className="min-h-[204px] rounded-2xl border border-white/12 bg-[linear-gradient(145deg,rgba(20,20,20,0.92),rgba(10,10,10,0.82))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.08),0_28px_75px_rgba(0,0,0,0.38)] sm:min-h-[216px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
              Labels & Partners
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Labels & Partners
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                  A selection of labels and partners we&apos;ve collaborated with to elevate our artists&apos; careers.
                </p>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/50">
                  Trusted by industry leaders
                </div>
                <div className="mt-2 h-px w-24 bg-gradient-to-r from-[#d6ae66]/80 via-white/45 to-transparent" />
              </div>
              <Image
                src="/logotransparent.png"
                alt="EMTEE logo"
                width={52}
                height={52}
                className="h-10 w-10 rounded-md object-contain brightness-0 invert opacity-80 sm:h-[52px] sm:w-[52px]"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchView("artists")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-[#d6ae66]/45 hover:bg-white/15 hover:text-white"
                >
                  Other Artists
                </button>
                <button
                  type="button"
                  onClick={() => switchView("partners")}
                  className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/45 bg-white/12 px-5 py-2 text-sm font-semibold text-white transition"
                >
                  Labels & Partners
                </button>
              </div>
              <Link
                href="/rooms/lobby"
                className="inline-flex items-center justify-center self-start rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:border-[#d6ae66]/45 hover:bg-white/15 hover:text-white hover:shadow-[0_0_24px_rgba(214,174,102,0.24),0_0_18px_rgba(255,255,255,0.14)] sm:self-auto"
              >
                Back to Lobby
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
              {PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  className="group relative flex items-center justify-center rounded-3xl border border-white/12 bg-black/35 px-8 py-10 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_25px_80px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#d6ae66]/45 hover:bg-black/45 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_0_1px_rgba(214,174,102,0.16),0_30px_90px_rgba(0,0,0,0.65),0_0_40px_rgba(255,255,255,0.10),0_0_52px_rgba(214,174,102,0.18)] hover:after:absolute hover:after:bottom-6 hover:after:h-px hover:after:w-12 hover:after:bg-gradient-to-r hover:after:from-[#d6ae66]/85 hover:after:via-white/40 hover:after:to-transparent hover:after:content-[''] sm:px-12 sm:py-16"
                >
                  <div className="relative h-16 w-full sm:h-24">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                      className="object-contain opacity-90 transition group-hover:opacity-100 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.16)] group-hover:drop-shadow-[0_0_24px_rgba(214,174,102,0.2)]"
                    />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-xs text-white/45">
              Want to be listed as a partner?{" "}
              <Link href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">
                Apply For A Consultation
              </Link>
              .
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.18),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="accent-card min-h-[204px] rounded-2xl border border-[#d6ae66]/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_75px_rgba(0,0,0,0.14)] sm:min-h-[216px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            Artist Catalog
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                Other Artist We&apos;ve Worked With
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700 sm:text-base">
                A selection of artists EMTEE has worked with through department resources, execution, and development support.
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => switchView("artists")}
              className={[
                "inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition",
                activeView === "artists"
                  ? "border-[#d6ae66]/55 bg-[#d6ae66]/12 text-[#6f511a]"
                  : "border-black/15 bg-white text-black/70 hover:border-[#d6ae66]/45 hover:bg-black/[0.03]",
              ].join(" ")}
            >
              Other Artists
            </button>
            <button
              type="button"
              onClick={() => switchView("partners")}
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/70 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Labels & Partners
            </button>
          </div>
          <Link
            href="/rooms/lobby"
            className="inline-flex items-center justify-center self-start rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03] sm:self-auto"
          >
            Back to Lobby
          </Link>
        </div>

        <section className="mt-8">
          <div className="animate-[fadeIn_220ms_ease-out]">
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
        </section>
      </section>
    </main>
  );
}
