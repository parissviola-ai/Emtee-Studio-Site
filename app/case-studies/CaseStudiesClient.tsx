"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CaseStudy } from "./caseStudiesData";
import { CASE_STUDIES } from "./caseStudiesData";

function normalizeIgUrl(url: string) {
  // IG embeds are picky — trailing slash helps.
  try {
    const u = new URL(url);
    // Remove query params that sometimes break embeds (optional, but safer)
    u.search = "";
    const s = u.toString();
    return s.endsWith("/") ? s : s + "/";
  } catch {
    return url.endsWith("/") ? url : url + "/";
  }
}

function getIgEmbedIframeSrc(url: string) {
  const safe = normalizeIgUrl(url);
  try {
    const u = new URL(safe);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && (parts[0] === "p" || parts[0] === "reel" || parts[0] === "tv")) {
      return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed`;
    }
  } catch {
    // Fall through to generic embed path.
  }
  return `${safe}embed`;
}

/**
 * Lightweight scroll-reveal (no framer-motion)
 */
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/**
 * Hover parallax image (mouse-based)
 */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "translate3d(0,0,0) scale(1.04)",
  });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const max = 10;
    const tx = (px - 0.5) * max;
    const ty = (py - 0.5) * max;

    setStyle({ transform: `translate3d(${tx}px, ${ty}px, 0) scale(1.08)` });
  }

  function onLeave() {
    setStyle({ transform: "translate3d(0,0,0) scale(1.04)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.08)]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
        style={style}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-black/10" />
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  const common = "h-4 w-4";
  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.98 1.38a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M14.4 3h2.58c.2 1.66 1.08 2.8 2.7 3.23v2.67a7.03 7.03 0 0 1-2.83-.72v6.08a6.25 6.25 0 1 1-6.2-6.24c.39 0 .76.04 1.13.12v2.73a3.6 3.6 0 0 0-1.13-.18 3.56 3.56 0 1 0 3.75 3.55V3Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M21.58 7.2a2.98 2.98 0 0 0-2.1-2.1C17.64 4.5 12 4.5 12 4.5s-5.63 0-7.48.6A2.98 2.98 0 0 0 2.42 7.2C1.83 9.04 1.83 12 1.83 12s0 2.96.59 4.8a2.98 2.98 0 0 0 2.1 2.1c1.85.6 7.48.6 7.48.6s5.64 0 7.49-.6a2.98 2.98 0 0 0 2.1-2.1c.58-1.84.58-4.8.58-4.8s0-2.96-.58-4.8ZM10.2 15.3V8.7L15.7 12l-5.5 3.3Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M13.5 21v-7.65h2.57l.38-2.97H13.5V8.48c0-.86.24-1.45 1.47-1.45h1.57V4.37c-.76-.08-1.52-.12-2.28-.12-2.25 0-3.8 1.38-3.8 3.92v2.21H8v2.97h2.46V21h3.04Z" />
        </svg>
      );
    case "Wikipedia":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M4 6h3.2v1.4h-.9l2.1 7.4 2.2-6.1-.4-1.3h-.9V6h4.1v1.4h-.8l2.4 7.2 2-7.2h-.9V6H20v1.4h-.9L15.7 18h-1.6l-2.2-6.4L9.5 18H8L4.9 7.4H4V6Z" />
        </svg>
      );
    case "Twitch":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M3 2h18v12l-4 4h-4l-2 2H7v-2H3V2Zm2 2v10h4v2l2-2h5l3-3V4H5Zm9 2h2v5h-2V6Zm-4 0h2v5h-2V6Z" />
        </svg>
      );
    case "Discord":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M20.3 4.4A16.5 16.5 0 0 0 16.2 3l-.2.4c1.7.4 2.5 1 2.5 1a10 10 0 0 0-3.1-1c-.8-.1-1.6-.1-2.4 0-1.4.1-2.7.5-4 1 0 0 .9-.7 2.8-1l-.2-.4a16.6 16.6 0 0 0-4.1 1.4C4.9 8.1 4.5 11.8 4.5 11.8a16.8 16.8 0 0 0 5 2.6l.6-1c-1-.4-1.5-.9-1.5-.9.1.1 2.1 1.1 4.9 1.1s4.8-1 4.9-1.1c0 0-.5.5-1.5.9l.6 1a16.8 16.8 0 0 0 5-2.6s-.4-3.7-2.2-7.4ZM10.2 11a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm3.6 0a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
  }
}

function CaseStudyCard({
  cs,
  activeEmbedSlug,
  setActiveEmbedSlug,
}: {
  cs: CaseStudy;
  activeEmbedSlug: string | null;
  setActiveEmbedSlug: (slug: string | null) => void;
}) {
  const { ref, visible } = useRevealOnScroll();

  const showEmbed = activeEmbedSlug === cs.slug;

  const embedSrc = useMemo(() => {
    if (!cs.featuredLink) return null;
    return getIgEmbedIframeSrc(cs.featuredLink);
  }, [cs.featuredLink]);

  function handleLoadPreview() {
    if (!embedSrc) return;
    setActiveEmbedSlug(cs.slug);
  }

  function handleClosePreview() {
    setActiveEmbedSlug(null);
  }

  // Escape closes preview
  useEffect(() => {
    if (!showEmbed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosePreview();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEmbed]);

  return (
    <section
      ref={ref}
      className={[
        "rounded-[28px] border border-black/10 bg-white shadow-[0_14px_70px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.08)] overflow-hidden",
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      {/* OPTION 2: Image | Text | IG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT: Image */}
        <div className="lg:col-span-4 p-6">
          <Link href={`/case-studies/${cs.slug}`} className="block group">
            <ParallaxImage src={cs.imageSrc} alt={cs.imageAlt ?? cs.name} />

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs tracking-widest uppercase text-[#8b6a2f]/85">
                Open case study
              </div>
              <div className="text-sm font-semibold text-black/70 group-hover:text-black transition">
                View →
              </div>
            </div>
          </Link>

          {cs.socialLinks?.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {cs.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-black/80 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.04] hover:text-[#7a5a24]"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* MIDDLE: Text (make room for IG on wide monitors) */}
        <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-3 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              {cs.name}
            </h2>

            {cs.selectedPackageLabel ? (
              <Link
                href={cs.selectedPackageHref ?? "/connect"}
                className="rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-xs font-semibold text-[#7a5a24] transition hover:bg-[#d6ae66]/18"
              >
                {cs.selectedPackageLabel}
              </Link>
            ) : cs.roleTag ? (
              <span className="rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-xs font-semibold text-[#7a5a24]">
                {cs.roleTag}
              </span>
            ) : null}
          </div>

          {cs.highlights?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-[#d6ae66]/30 bg-[#d6ae66]/8 px-3 py-1 text-xs text-[#7a5a24]"
                >
                  {h}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8b6a2f]/80">
              Resources Used
            </div>

            <ul className="mt-3 space-y-2 text-black/75">
              {cs.bullets.slice(0, 3).map((b, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#b88b3a] shadow-[0_0_8px_rgba(184,139,58,0.55)]" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/case-studies/${cs.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/16 px-4 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
              >
                Read Full Case Study →
              </Link>

              {cs.instagramUrl && (
                <a
                  href={cs.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                >
                  Instagram{" "}
                  {cs.instagramHandle ? `(${cs.instagramHandle})` : ""} →
                </a>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT: Dedicated IG column (WIDER on wide monitors) */}
        <div className="lg:col-span-4 xl:col-span-5 2xl:col-span-5 p-6 lg:p-8 border-t border-black/5 lg:border-t-0 lg:border-l border-black/5">
          <div className="rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06),0_0_0_1px_rgba(214,174,102,0.07)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/5">
              <div className="text-xs font-semibold tracking-widest uppercase text-[#8b6a2f]/80">
                Featured Instagram
              </div>

              <div className="flex items-center gap-4">
                {cs.featuredLink && (
                  <a
                    href={cs.featuredLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-black/70 hover:text-black hover:underline transition"
                  >
                    View →
                  </a>
                )}

                {showEmbed && (
                  <button
                    type="button"
                    onClick={handleClosePreview}
                    className="text-xs font-semibold text-black/70 hover:text-black hover:underline transition"
                  >
                    Close →
                  </button>
                )}
              </div>
            </div>

            {!cs.featuredLink ? (
              <div className="px-4 py-4 text-sm text-black/55">
                Add a <span className="font-semibold">featuredLink</span> to
                embed a post/reel here.
              </div>
            ) : !showEmbed ? (
              <div className="px-4 py-4">
                <div className="mt-1 text-sm text-black/55">
                  Load the preview to show the featured post here.
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadPreview}
                    className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/16 px-4 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
                  >
                    Load preview
                  </button>

                  <a
                    href={cs.instagramUrl ?? cs.featuredLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black/70 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                  >
                    Open profile →
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white text-black shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                  <div className="p-3">
                    <div className="h-[430px] overflow-hidden rounded-xl border border-black/10 bg-white">
                      <div className="ig-embed-scroll mx-auto h-full w-full overflow-y-auto p-2">
                        <iframe
                          src={embedSrc!}
                          title={`${cs.name} Instagram`}
                          className="h-full w-full rounded-lg border-0"
                          loading="lazy"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          scrolling="yes"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-black/40">
                  Tip: Press <span className="font-semibold">Esc</span> to close.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudiesClient() {
  const [activeEmbedSlug, setActiveEmbedSlug] = useState<string | null>(null);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_320px_at_50%_-10%,rgba(214,174,102,0.2),transparent_72%),radial-gradient(800px_420px_at_10%_95%,rgba(15,23,42,0.05),transparent_70%)]"
      />
      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-6 sm:pt-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight [text-shadow:0_1px_0_rgba(255,255,255,0.8),0_8px_26px_rgba(214,174,102,0.2)]">
                Case Studies
              </h1>
              <Image
                src="/Logo2.png"
                alt="EMTEE logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-md object-contain opacity-80"
              />
            </div>
            <p className="mt-3 max-w-2xl text-black/60">
              A snapshot of artists we&apos;ve supported and the framework behind each
              outcome: philosophy, pillars, foundations, and disciplined execution.
            </p>
          </div>

          <div className="flex w-full max-w-xs flex-col items-stretch gap-3 sm:items-end md:w-auto md:max-w-none">
            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Back to Lobby
            </Link>

            <Link
              href="/news"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              News
            </Link>

            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/16 px-5 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
            >
              Request a Consultation →
            </Link>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl space-y-10 px-5 pb-20 sm:px-6">
        {CASE_STUDIES.map((cs) => (
          <CaseStudyCard
            key={cs.slug}
            cs={cs}
            activeEmbedSlug={activeEmbedSlug}
            setActiveEmbedSlug={setActiveEmbedSlug}
          />
        ))}
      </div>
    </main>
  );
}
