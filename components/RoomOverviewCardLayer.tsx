"use client";

import NextImage from "next/image";
import Link from "next/link";
import type { InfoCard } from "@/components/roomSceneOverviewConfig";

type RoomOverviewCardLayerProps = {
  activeOverviewCard: InfoCard;
  roomSlug: string;
  showOrangeCard: boolean;
  mobileStaticUi: boolean;
  isCardCompact: boolean;
  isCardMinimized: boolean;
  isCardContentVisible: boolean;
  isModalOpen: boolean;
  exploreOpen: boolean;
  prefersReducedMotion: boolean;
  onToggleCard: () => void;
};

function SocialIcon({ label, className = "" }: { label: string; className?: string }) {
  const common = `h-4 w-4 ${className}`.trim();
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
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.45a.9.9 0 0 1-1.24.3c-3.39-2.07-7.66-2.54-12.68-1.38a.9.9 0 0 1-.41-1.75c5.51-1.27 10.25-.72 14.03 1.59.42.25.55.8.3 1.24Zm1.77-3.93a1.12 1.12 0 0 1-1.53.37c-3.88-2.39-9.79-3.08-14.38-1.67a1.13 1.13 0 0 1-.66-2.16c5.24-1.6 11.76-.82 16.22 1.92.53.33.7 1.02.35 1.54Zm.15-4.1c-4.65-2.76-12.32-3.01-16.75-1.75a1.35 1.35 0 0 1-.75-2.6c5.08-1.47 13.53-1.18 18.88 2 .64.38.85 1.2.47 1.84-.37.64-1.2.85-1.85.5Z" />
        </svg>
      );
    default:
      return <span className={`text-[10px] font-bold uppercase ${className}`.trim()}>{label.slice(0, 2)}</span>;
  }
}

export default function RoomOverviewCardLayer({
  activeOverviewCard,
  roomSlug,
  showOrangeCard,
  mobileStaticUi,
  isCardCompact,
  isCardMinimized,
  isCardContentVisible,
  isModalOpen,
  exploreOpen,
  prefersReducedMotion,
  onToggleCard,
}: RoomOverviewCardLayerProps) {
  const cardPositionClass = showOrangeCard
    ? "bottom-32 left-4 md:bottom-24"
    : mobileStaticUi
      ? isCardMinimized
        ? "bottom-32 left-4 md:bottom-28"
        : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      : "bottom-52 left-4 md:bottom-28";
  const shouldUseMobileLogoToggle = mobileStaticUi && isCardMinimized;

  return (
    <div
      className={[
        "absolute z-40 origin-right transition-[width] duration-300 ease-out",
        mobileStaticUi && isCardCompact ? "overflow-visible" : "overflow-hidden",
        cardPositionClass,
        isCardMinimized
          ? mobileStaticUi
            ? "w-8"
            : "w-12"
          : showOrangeCard
            ? "w-[min(84vw,340px)]"
            : "w-[min(94vw,420px)]",
        isModalOpen || exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "relative",
          isCardCompact && mobileStaticUi
            ? "h-8 w-8 rounded-full border-0 bg-transparent p-0 backdrop-blur-0 shadow-none"
            : "rounded-2xl border border-white/15 bg-black/45 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
          isCardCompact ? (mobileStaticUi ? "" : "h-12 p-2") : showOrangeCard ? "p-4" : "p-5",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onToggleCard}
          aria-label={isCardMinimized ? "Expand overview card" : "Minimize overview card"}
          className={[
            "absolute inline-flex items-center justify-center rounded-full overflow-visible",
            mobileStaticUi && isCardCompact
              ? "border border-black/70 bg-black/68 text-white"
              : "border border-white/35 bg-white/12 text-xs font-semibold text-white",
            mobileStaticUi && isCardCompact ? "mobile-overview-toggle-glow" : "",
            mobileStaticUi && isCardCompact
              ? "shadow-[0_0_0_1px_rgba(0,0,0,0.42),0_0_24px_rgba(0,0,0,0.5),0_0_46px_rgba(0,0,0,0.34)]"
              : mobileStaticUi
                ? "shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_0_24px_rgba(255,255,255,0.48),0_0_46px_rgba(255,255,255,0.28)]"
                : "shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.32),0_0_34px_rgba(255,255,255,0.18)]",
            mobileStaticUi && isCardCompact
              ? "transition hover:bg-black/78 hover:text-white hover:shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_0_28px_rgba(0,0,0,0.58),0_0_52px_rgba(0,0,0,0.38)]"
              : mobileStaticUi
                ? "transition hover:bg-white/24 hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_0_28px_rgba(255,255,255,0.56),0_0_52px_rgba(255,255,255,0.32)]"
                : "transition hover:bg-white/24 hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_0_22px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.24)]",
            isCardCompact
              ? mobileStaticUi
                ? "left-0 top-0 h-8 w-8"
                : "right-2 top-2 h-8 w-8"
              : "right-3 top-3 h-8 w-8",
          ].join(" ")}
        >
          {!mobileStaticUi ? (
            <span
              className={[
                "pointer-events-none absolute -inset-1 rounded-full border border-white/35",
                prefersReducedMotion ? "opacity-80" : "animate-[softPulse_1.8s_ease-in-out_infinite]",
              ].join(" ")}
            />
          ) : null}
          {shouldUseMobileLogoToggle ? (
            <NextImage
              src="/logotransparent.png"
              alt="EMTEE logo"
              width={22}
              height={22}
              className="h-4.5 w-auto object-contain invert opacity-90"
              draggable={false}
            />
          ) : isCardMinimized ? (
            ">"
          ) : (
            "<"
          )}
        </button>

        {!isCardMinimized && isCardContentVisible ? (
          <div
            className={
              showOrangeCard
                ? "max-h-[330px] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(214,214,214,0.6)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/45"
                : ""
            }
          >
            <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/60">
              {activeOverviewCard.eyebrow}
            </div>
            {activeOverviewCard.imageSrc ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-white/15">
                <NextImage
                  src={activeOverviewCard.imageSrc}
                  alt={activeOverviewCard.imageAlt ?? activeOverviewCard.title}
                  width={1000}
                  height={400}
                  sizes="(max-width: 768px) 94vw, 420px"
                  className="h-40 w-full object-cover object-[center_35%]"
                  draggable={false}
                />
              </div>
            ) : null}
            <div className="mt-3 text-base font-semibold text-white/92">{activeOverviewCard.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{activeOverviewCard.body}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeOverviewCard.socialLinks?.length ? (
                activeOverviewCard.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 transition hover:bg-white/15 hover:text-white"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                ))
              ) : (
                <>
                  {activeOverviewCard.primaryHref.startsWith("http") ? (
                    <a
                      href={activeOverviewCard.primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white"
                    >
                      {activeOverviewCard.primaryCta}
                    </a>
                  ) : (
                    <Link
                      href={activeOverviewCard.primaryHref}
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/15 hover:text-white"
                    >
                      {activeOverviewCard.primaryCta}
                    </Link>
                  )}
                  {activeOverviewCard.secondaryHref && activeOverviewCard.secondaryCta ? (
                    activeOverviewCard.secondaryHref.startsWith("http") ? (
                      <a
                        href={activeOverviewCard.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                      >
                        {activeOverviewCard.secondaryCta}
                      </a>
                    ) : (
                      <Link
                        href={activeOverviewCard.secondaryHref}
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                      >
                        {activeOverviewCard.secondaryCta}
                      </Link>
                    )
                  ) : null}
                  {activeOverviewCard.exampleHref && activeOverviewCard.strategyLabel && activeOverviewCard.exampleArtist ? (
                    <div className="rounded-2xl border border-[#d6ae66]/30 bg-[#d6ae66]/10 px-4 py-3">
                      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm">
                        <span className="font-semibold text-[#f6deb2]">
                          {activeOverviewCard.strategyLabel}:
                        </span>
                      {activeOverviewCard.exampleHref.startsWith("http") ? (
                        <a
                          href={activeOverviewCard.exampleHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex font-semibold text-white underline decoration-[#d6ae66]/70 decoration-2 underline-offset-4 transition hover:text-[#f6deb2]"
                        >
                          {activeOverviewCard.exampleArtist}
                        </a>
                      ) : (
                        <Link
                          href={activeOverviewCard.exampleHref}
                          className="inline-flex font-semibold text-white underline decoration-[#d6ae66]/70 decoration-2 underline-offset-4 transition hover:text-[#f6deb2]"
                        >
                          {activeOverviewCard.exampleArtist}
                        </Link>
                      )}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="h-8" />
        )}
      </div>
    </div>
  );
}
