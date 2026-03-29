"use client";

import type { Hotspot } from "@/data/rooms/types";

type RoomDotHotspotContentProps = {
  spot: Hotspot;
  clickedHotspotId: string | null;
  prefersReducedMotion: boolean;
  isOrangeRoom: boolean;
  isMobileViewport: boolean;
  viewportW: number;
  compactHotspotUi: boolean;
  roomSlug: string;
  tooltipPosition: (
    direction: Hotspot["direction"],
    x: number,
    y: number,
    isMobileViewport: boolean,
    viewportW: number
  ) => string;
  getDotPresentationState: (input: {
    roomSlug: string;
    spot: Hotspot;
    isMobileViewport: boolean;
    compactHotspotUi: boolean;
    viewportW: number;
    isOrangeRoom: boolean;
  }) => {
    isOrangeSessionDot: boolean;
    isLobbyDot: boolean;
    isLiveRoomSocialDot: boolean;
    liveRoomSocialLabel: string | null;
    dotSize: number;
    dotLabelMaxWidth: number;
    dotLabelFontSize: string;
    resolvedTooltipDirection: Hotspot["direction"];
    customTooltipOffsetClass: string;
    isChillOutCommunityDot: boolean;
    isQuietAccentDot: boolean;
    dotBase: string;
    haloBase: string;
    ringBase: string;
  };
};

function HotspotLabelText({
  spot,
  showHoverLabel,
}: {
  spot: Hotspot;
  showHoverLabel: boolean | "hover";
}) {
  if (!spot.hoverLabel) {
    return <>{spot.label}</>;
  }

  if (showHoverLabel === "hover") {
    return (
      <span className="relative inline-flex w-full items-center justify-center text-center">
        <span className="transition-all duration-200 group-hover:opacity-0">
          {spot.label}
        </span>
        <span className="absolute inset-0 inline-flex items-center justify-center text-center opacity-0 transition-all duration-200 group-hover:opacity-100">
          {spot.hoverLabel}
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-flex w-full items-center justify-center text-center">
      <span
        className={[
          "transition-all duration-200",
          showHoverLabel ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {spot.label}
      </span>
      <span
        className={[
          "absolute inset-0 inline-flex items-center justify-center text-center transition-all duration-200",
          showHoverLabel ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {spot.hoverLabel}
      </span>
    </span>
  );
}

function SocialIcon({ label, className = "" }: { label: string; className?: string }) {
  const common = `h-4 w-4 ${className}`.trim();
  switch (label) {
    case "Spotify":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.7 8.8c4.9-1.5 10.5-1 14.6 1.4" />
          <path d="M5.8 12.2c3.9-1.1 8.2-.7 11.4 1.2" />
          <path d="M7 15.4c2.8-.7 5.8-.5 8.2.8" />
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

export default function RoomDotHotspotContent({
  spot,
  clickedHotspotId,
  prefersReducedMotion,
  isOrangeRoom,
  isMobileViewport,
  viewportW,
  compactHotspotUi,
  roomSlug,
  tooltipPosition,
  getDotPresentationState,
}: RoomDotHotspotContentProps) {
  const {
    isOrangeSessionDot,
    isLobbyDot,
    isLiveRoomSocialDot,
    liveRoomSocialLabel,
    dotSize,
    dotLabelMaxWidth,
    dotLabelFontSize,
    resolvedTooltipDirection,
    customTooltipOffsetClass,
    isChillOutCommunityDot,
    isQuietAccentDot,
    dotBase,
    haloBase,
    ringBase,
  } = getDotPresentationState({
    roomSlug,
    spot,
    isMobileViewport,
    compactHotspotUi,
    viewportW,
    isOrangeRoom,
  });
  const isClickedLabelVisible = clickedHotspotId === spot.id;

  if (isLiveRoomSocialDot && liveRoomSocialLabel) {
    const isYoutube = liveRoomSocialLabel === "YouTube";
    return (
      <span className="group relative inline-flex items-center">
        <span
          className={[
            "relative inline-flex items-center justify-center rounded-full text-white",
            isMobileViewport ? "h-8 w-8" : "h-9 w-9",
            "border border-white/14 bg-black/24 backdrop-blur-[3px]",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_20px_rgba(255,255,255,0.18),0_10px_24px_rgba(0,0,0,0.26)] transition-all duration-200",
            "group-hover:border-white/28 group-hover:bg-black/34 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_28px_rgba(255,255,255,0.3),0_10px_26px_rgba(0,0,0,0.3)]",
          ].join(" ")}
        >
          {isYoutube ? (
            <span className="inline-flex h-4 w-5.5 items-center justify-center rounded-[5px] bg-[#FF0033]/88">
              <span className="ml-0.5 h-0 w-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-white" />
            </span>
          ) : (
            <span className="inline-flex items-center justify-center text-[#1ED760]/90">
              <SocialIcon label="Spotify" className="h-4 w-4" />
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span className="group relative inline-flex items-center">
      <span
        className={[
          "relative inline-flex items-center justify-center",
          dotBase,
          isOrangeSessionDot && !prefersReducedMotion ? "animate-[softPulse_1.35s_ease-in-out_infinite]" : "",
        ].join(" ")}
        style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
      >
        <span
          className={[
            "pointer-events-none absolute rounded-full blur-md",
            "-inset-2",
            haloBase,
          ].join(" ")}
        />

        <span
          className={[
            "pointer-events-none absolute rounded-full border-2",
            isLobbyDot
              ? "-inset-2 animate-[ping_1.9s_cubic-bezier(0,0,0.2,1)_infinite]"
              : "-inset-4 animate-[ping_1.55s_cubic-bezier(0,0,0.2,1)_infinite]",
            prefersReducedMotion ? "animate-none" : "",
            isLobbyDot
              ? "border-white/35"
              : isOrangeSessionDot
                ? (
                    isOrangeRoom
                      ? "border-[#ff9f3f]/85"
                      : "border-white/70"
                  )
                : ringBase,
          ].join(" ")}
        />
      </span>

      <span
        className={[
          "absolute z-50",
          tooltipPosition(resolvedTooltipDirection, spot.x, spot.y, isMobileViewport, viewportW),
          customTooltipOffsetClass,
          isChillOutCommunityDot
            ? "whitespace-pre-line break-words md:whitespace-pre-line rounded-full leading-tight"
            : "whitespace-nowrap rounded-full leading-tight",
          "border border-white/18 bg-black/55 backdrop-blur-xl",
          "px-2.5 py-1 font-semibold text-white/85 sm:px-3 sm:py-1.5 md:px-3.5",
          "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
          "pointer-events-auto cursor-pointer",
          "opacity-100 translate-y-0",
          "transition-all duration-200",
          isQuietAccentDot
            ? "border-emerald-200/24 bg-emerald-300/8 text-emerald-50/88 shadow-[0_0_0_1px_rgba(110,231,183,0.14),0_14px_40px_rgba(0,0,0,0.52),0_0_18px_rgba(16,185,129,0.16)] group-hover:border-emerald-200/38 group-hover:bg-emerald-300/12 group-hover:text-emerald-50 group-hover:[text-shadow:0_0_8px_rgba(110,231,183,0.36)] group-hover:shadow-[0_0_0_1px_rgba(110,231,183,0.2),0_14px_40px_rgba(0,0,0,0.52),0_0_20px_rgba(16,185,129,0.24)]"
            : "group-hover:border-white/40 group-hover:bg-black/72 group-hover:text-white group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.48)] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_14px_40px_rgba(0,0,0,0.52),0_0_22px_rgba(255,255,255,0.16)]",
          isClickedLabelVisible
            ? "pointer-events-auto cursor-pointer opacity-100 translate-y-0 border-white/45 bg-black/75 text-white [text-shadow:0_0_12px_rgba(255,255,255,0.52)] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_44px_rgba(0,0,0,0.55),0_0_24px_rgba(255,255,255,0.18)]"
            : "",
        ].join(" ")}
        style={{ maxWidth: `${dotLabelMaxWidth}px`, fontSize: dotLabelFontSize }}
      >
        <HotspotLabelText spot={spot} showHoverLabel={false} />
      </span>
    </span>
  );
}
