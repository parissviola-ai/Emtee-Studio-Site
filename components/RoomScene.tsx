"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { getActiveOverviewCard } from "@/components/roomSceneOverviewConfig";
import { getResourceContext } from "@/data/resource-context";
import type { OrangeRoomExtrasHandle } from "@/components/OrangeRoomExtras";
import {
  awaitRoomAssetsByHref,
  getRoomWarmNeighborhoodHrefsBySlug,
  warmImageAsset,
  warmRoomAssetsByHref,
  warmRoomNeighborhoodBySlug,
} from "@/lib/warmRoomAssets";
import { dispatchRoomHeroReady, startRoomTransitionHold } from "@/lib/roomTransitionHold";

const OrangeRoomExtras = dynamic(() => import("@/components/OrangeRoomExtras"), {
  ssr: false,
});
const RoomModalLayer = dynamic(() => import("@/components/RoomModalLayer"), {
  ssr: false,
});
const RoomExploreLayer = dynamic(() => import("@/components/RoomExploreLayer"), {
  ssr: false,
});
const RoomOverviewCardLayer = dynamic(() => import("@/components/RoomOverviewCardLayer"), {
  ssr: false,
});
const RoomHotspotLayer = dynamic(() => import("@/components/RoomHotspotLayer"), {
  ssr: false,
});
const PIN_HELPER_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PIN_HELPER === "1";
const MOBILE_TILT_ENABLED = true;

export type Hotspot = {
  id: string;
  label: string;
  hoverLabel?: string;
  x: number;
  y: number;
  positions?: Partial<Record<"mobile" | "tablet" | "laptop" | "desktop", { x: number; y: number }>>;
  allowLargeResponsiveShift?: boolean;
  hidden?: boolean;
  href?: string;

  action?: "explore";
  direction?: "left" | "right" | "up" | "down";

  variant?: "pill" | "dot"; // default pill
  tier?: "core" | "secondary";

  modal?: {
    title: string;
    body: string;
    previousLabel?: string;
    previousHref?: string;
    nextLabel?: string;
    nextHref?: string;
    carouselSlides?: Array<{
      src: string;
      alt: string;
      eyebrow?: string;
      title: string;
      body?: string;
      primaryLabel?: string;
      primaryHref?: string;
      primaryTargetBlank?: boolean;
      secondaryLabel?: string;
      secondaryHref?: string;
    }>;
    primaryLabel?: string;
    primaryHref?: string;
    primaryAction?: "openExplore";
    secondaryLabel?: string;
    secondaryHref?: string;
    links?: Array<{ label: string; href: string }>;
    headerLogo?: string;
    headerLogoAlt?: string;
    cornerLogo?: string;
    cornerLogoAlt?: string;
    hideTitle?: boolean;
    topImage?: string;
    topImageAlt?: string;
    imageGallery?: Array<{ src: string; alt: string }>;
    image?: string;
    videoEmbed?: string;
    highlightsTitle?: string;
    highlights?: string[];
  };
};

type Room = {
  slug: string;
  title?: string;
  backgroundImage: string;
  backgroundVideo?: string;
  backgroundVideoMobile?: string;
  hotspots: Hotspot[];
};

const EXPLORE_ROOMS = [
  { label: "Start Here", href: "/rooms/lobby?modal=About" },
  { label: "Artists & Partners", href: "/artist-affiliations" },
  { label: "Apply For A Consultation", href: "https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy" },
  { label: "Lobby", href: "/rooms/lobby" },
  { label: "Business Department", href: "/rooms/business" },
  { label: "Music Department", href: "/rooms/music" },
  { label: "Marketing Department", href: "/rooms/marketing" },
  { label: "A&R / Sales Department", href: "/rooms/ar-sales" },
  { label: "Publishing / Distribution Department", href: "/rooms/publishing-distribution" },
  { label: "Dirty Elephant Studios", href: "/rooms/dirty-elephant-studio" },
  { label: "Ten Ten Entertainment", href: "/rooms/ten-ten-entertainment" },
  { label: "Steeped Dreams Studio", href: "/rooms/steeped-dreams-studio" },
];
const ROOM_SEQUENCE = EXPLORE_ROOMS.filter((item) => item.href.startsWith("/rooms/"));
const KNOWN_ROOM_IMAGE_SIZES: Record<string, { w: number; h: number }> = {
  "/rooms/finishedlobby-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/lobbywithconcert-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/lobbynewstv-opt.jpg": { w: 3840, h: 1920 },
  "/rooms/prelobbyphotocn.png": { w: 1344, h: 768 },
  "/rooms/updatedttbg1-poster-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/finaltentendone-poster-opt.png": { w: 1920, h: 1080 },
  "/rooms/8-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/boardroom-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/cdshop-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/marketing1.png": { w: 3840, h: 2160 },
  "/rooms/finalfinalmarketing.png": { w: 4320, h: 2430 },
  "/rooms/front.jpg": { w: 2048, h: 1365 },
  "/rooms/live-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/kymteabg-opt.jpg": { w: 1536, h: 1024 },
  "/rooms/SDSFinal-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/finalsds.png": { w: 3840, h: 2160 },
  "/rooms/sdspagefinal.png": { w: 1920, h: 1080 },
  "/rooms/sdspagefinal-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/quietroomvid-firstframe-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/dirtyelephant2-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/dirtyelephantgb1.png": { w: 3840, h: 2160 },
  "/rooms/dirtyelephantgb1-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/finaldeswlogos-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/finaldescomplete.png": { w: 3840, h: 2160 },
  "/rooms/finaldescomplete-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/colorizedmarketing-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/marketingfinal3-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/meetingroom4.png": { w: 1920, h: 1080 },
  "/rooms/finalmeetingroom-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/finalmarketingdj-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/finalarsales-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/finalmarketingdj.png": { w: 1920, h: 1080 },
  "/rooms/finalarsales.png": { w: 1920, h: 1080 },
  "/rooms/musicwithelephant-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/mrlargeelephant.png": { w: 1920, h: 1080 },
  "/rooms/mrlargeelephant-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/musicroomupdate-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/orangeroomm-v2-opt.jpg": { w: 1536, h: 1024 },
  "/rooms/websitess-mobile-v2-opt.jpg": { w: 3840, h: 2160 },
};
const SENSITIVE_TRANSITION_ROOMS = new Set([
  "lobby",
  "business",
  "music",
  "marketing",
  "publishing-distribution",
  "ar-sales",
  "dirty-elephant-studio",
  "ten-ten-entertainment",
  "steeped-dreams-studio",
]);
const HOTSPOT_TIER_PILOT_ROOMS = new Set(["lobby"]);

const PREVIOUS_ROOM_LINKS: Record<string, string> = {
  business: "/rooms/lobby",
  music: "/rooms/business",
  marketing: "/rooms/music",
  "ar-sales": "/rooms/marketing",
  "publishing-distribution": "/rooms/ar-sales",
  "dirty-elephant-studio": "/rooms/publishing-distribution",
  "ten-ten-entertainment": "/rooms/dirty-elephant-studio",
  "steeped-dreams-studio": "/rooms/ten-ten-entertainment",
};
const YANCHAN_DISCOGRAPHY_SPOTLIGHT = [
  {
    src: "https://th-i.thgim.com/public/entertainment/movies/e45uic/article69343866.ece/alternates/LANDSCAPE_1200/SN%20%20Yanchan2.jpg",
    label: "Yanchan Produced & Sandeep Narayan - Arul",
    isJunoNominated: true,
    objectPosition: "center 24%",
  },
  {
    src: "/news/thinkyouglowed-opt.jpg",
    label: "Lil Durk - Think You Glowed",
    objectPosition: "center 18%",
  },
  {
    src: "/news/thewind-opt.jpg",
    label: "Russ - The Wind",
    objectPosition: "center 20%",
  },
  {
    src: "https://i.ytimg.com/vi/IIat8oxEIbE/maxresdefault.jpg",
    label: "Shruti Haasan & Kamal Haasan - Inimel",
    objectPosition: "center 24%",
  },
  {
    src: "https://i.ytimg.com/vi/lH3SdlkeudA/mqdefault.jpg",
    label: "Yanchan Produced & Anjulie - Chai & Sunshine",
    objectPosition: "center 18%",
  },
  {
    src: "https://i.ytimg.com/vi/ceDFShaaYOA/maxresdefault.jpg",
    label: "SVDP & Yanchan Produced - Mrithangam Raps",
    objectPosition: "center 18%",
  },
  {
    src: "https://i.ytimg.com/vi/XdJRxrdB66o/maxresdefault.jpg",
    label: "Charle$ Wolfie - Personal",
    objectPosition: "center 22%",
  },
  { src: "/news/pillabiseenit-opt.jpg", label: "Pilla B - I Seen It", objectPosition: "center 18%" },
];

function shouldDebugRoomNav() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("emtee-debug-nav") === "1";
  } catch {
    return false;
  }
}

function logRoomNav(event: string, detail: Record<string, unknown>) {
  if (!shouldDebugRoomNav()) return;
  const stamp = typeof performance !== "undefined" ? performance.now().toFixed(1) : Date.now().toString();
  console.log(`[emtee-nav ${stamp}ms] ${event}`, detail);
}

function getArrow(direction?: "left" | "right" | "up" | "down") {
  switch (direction) {
    case "right":
      return "→";
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "left":
    default:
      return "←";
  }
}

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

function tooltipPosition(
  direction: "left" | "right" | "up" | "down" | undefined,
  x: number,
  y: number,
  isMobileViewport: boolean,
  viewportW: number
) {
  // Flip tooltip direction near viewport edges so labels stay visible.
  const isCompactLaptop = viewportW > 0 && viewportW < 1280;
  const minX = isMobileViewport ? 28 : isCompactLaptop ? 20 : 14;
  const maxX = isMobileViewport ? 72 : isCompactLaptop ? 80 : 86;
  const minY = isMobileViewport ? 20 : 14;
  const maxY = isMobileViewport ? 82 : 86;

  let resolved = direction ?? "right";
  if (resolved === "left" && x < minX) resolved = "right";
  else if (resolved === "right" && x > maxX) resolved = "left";
  else if (resolved === "up" && y < minY) resolved = "down";
  else if (resolved === "down" && y > maxY) resolved = "up";

  switch (resolved) {
    case "left":
      return "right-full mr-3 top-1/2 -translate-y-1/2";
    case "up":
      return "left-1/2 -translate-x-1/2 bottom-full mb-3";
    case "down":
      return "left-1/2 -translate-x-1/2 top-full mt-3";
    case "right":
    default:
      return "left-full ml-3 top-1/2 -translate-y-1/2";
  }
}

function connectorStyle(
  spot: Hotspot,
  anchor: { x: number; y: number }
): CSSProperties {
  const dx = anchor.x - spot.x;
  const dy = anchor.y - spot.y;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const length = Math.max(Math.hypot(dx, dy) - 0.8, 0);

  return {
    left: `${spot.x}%`,
    top: `${spot.y}%`,
    width: `${length}%`,
    transform: `translateY(-50%) rotate(${angle}deg)`,
  };
}

function getHotspotBreakpoint(viewportW: number) {
  if (!viewportW) return "desktop" as const;
  if (viewportW < 768) return "mobile" as const;
  if (viewportW < 1024) return "tablet" as const;
  if (viewportW < 1440) return "laptop" as const;
  return "desktop" as const;
}

function getResponsiveRoomBackgroundObjectPositionY({
  basePositionY,
  viewportW,
  viewportH,
  isMobileViewport,
}: {
  basePositionY: number;
  viewportW: number;
  viewportH: number;
  isMobileViewport: boolean;
}) {
  if (isMobileViewport) return basePositionY;
  if (!viewportW || !viewportH) return basePositionY;

  const aspectRatio = viewportW / viewportH;
  let delta = 0;

  if (aspectRatio >= 2.2) delta = 8;
  else if (aspectRatio >= 2.0) delta = 6;
  else if (aspectRatio >= 1.85) delta = 4;
  else if (aspectRatio >= 1.7) delta = 2;
  else if (aspectRatio < 1.45) delta = -4;
  else if (aspectRatio < 1.55) delta = -2;

  return Math.max(-12, Math.min(118, basePositionY + delta));
}

function getCoverImageMetrics(
  viewportW: number,
  viewportH: number,
  naturalW: number,
  naturalH: number,
  scale = 1,
  fitMode: "cover" | "contain" = "cover",
  objectPositionX = 50,
  objectPositionY = 50
) {
  if (!viewportW || !viewportH || !naturalW || !naturalH) {
    return null;
  }

  const imageScale =
    fitMode === "contain"
      ? Math.min(viewportW / naturalW, viewportH / naturalH)
      : Math.max(viewportW / naturalW, viewportH / naturalH);
  const renderedW = naturalW * imageScale * scale;
  const renderedH = naturalH * imageScale * scale;
  const offsetX = (viewportW - renderedW) * (objectPositionX / 100);
  const offsetY = (viewportH - renderedH) * (objectPositionY / 100);

  return {
    renderedW,
    renderedH,
    offsetX,
    offsetY,
    maxPanX: Math.max((renderedW - viewportW) / 2, 0),
    maxPanY: Math.max((renderedH - viewportH) / 2, 0),
  };
}

function scheduleIdleWork(callback: () => void, timeout = 900) {
  if (typeof window === "undefined") return () => {};
  const idleWindow = window as Window & typeof globalThis & {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  if (idleWindow.requestIdleCallback) {
    const id = idleWindow.requestIdleCallback(() => callback(), { timeout });
    return () => idleWindow.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(callback, 120);
  return () => window.clearTimeout(id);
}

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
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
  }
}

function renderModalBodyWithBoldIncludes(text: string) {
  const firstIncludesIndex = text.indexOf("Includes:");
  if (firstIncludesIndex === -1) {
    return text;
  }

  const before = text.slice(0, firstIncludesIndex);
  const includes = "Includes:";
  const after = text.slice(firstIncludesIndex + includes.length);

  return (
    <>
      {before}
      <strong>{includes}</strong>
      {after}
    </>
  );
}

function renderStartHereStepsWithBoldTitles(text: string) {
  return text.split("\n").map((line, index) => {
    const isStepTitle = /^\d+\)\s/.test(line.trim());
    return (
      <Fragment key={`start-here-line-${index}`}>
        {isStepTitle ? <strong>{line}</strong> : line}
        {index < text.split("\n").length - 1 ? <br /> : null}
      </Fragment>
    );
  });
}

function parseIncludesFromModalBody(text: string) {
  const marker = "Includes:";
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) {
    return {
      before: text,
      includes: [] as string[],
      after: "",
    };
  }

  const before = text.slice(0, markerIndex).trimEnd();
  const afterMarker = text.slice(markerIndex + marker.length).trimStart();
  const lines = afterMarker.split("\n");
  const includes: string[] = [];
  const trailingLines: string[] = [];
  let readingIncludes = true;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (readingIncludes && line.startsWith("•")) {
      includes.push(line.replace(/^•\s*/, "").trim());
      continue;
    }
    readingIncludes = false;
    trailingLines.push(rawLine);
  }

  return {
    before,
    includes,
    after: trailingLines.join("\n").trim(),
  };
}

export default function RoomScene({
  room,
  transparentShell = false,
}: {
  room: Room;
  transparentShell?: boolean;
}) {
  const router = useRouter();
  const isLiveRoom = room.slug === "ten-ten-entertainment";
  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [exploreOpen, setExploreOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<Hotspot["modal"] | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [modalBackModal, setModalBackModal] = useState<Hotspot["modal"] | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [minimizedByRoom, setMinimizedByRoom] = useState<Record<string, boolean>>({});
  const [contentVisibleByRoom, setContentVisibleByRoom] = useState<Record<string, boolean>>({});
  const [clickedHotspotIdByRoom, setClickedHotspotIdByRoom] = useState<Record<string, string | null>>({});
  const [backgroundVideoVisibleByRoom, setBackgroundVideoVisibleByRoom] = useState<Record<string, boolean>>({});
  const [isOrangePreviewMuted, setIsOrangePreviewMuted] = useState(false);
  const [isLobbyExploreHoverOpen, setIsLobbyExploreHoverOpen] = useState(false);
  const [showMoreHotspotsByRoom, setShowMoreHotspotsByRoom] = useState<Record<string, boolean>>({});
  const [expandedPackageIncludesByModal, setExpandedPackageIncludesByModal] = useState<Record<string, boolean>>({});
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [tiltAvailable, setTiltAvailable] = useState(false);
  const [tiltPermissionNeeded, setTiltPermissionNeeded] = useState(false);
  const [tiltStatus, setTiltStatus] = useState<"idle" | "listening" | "active" | "blocked">("idle");
  const [mobileTiltPan, setMobileTiltPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefetchedExploreRoutesRef = useRef<Set<string>>(new Set());
  const isMobileViewportRaw = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(max-width: 767px)");
      const handler = () => onStoreChange();
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false),
    () => false
  );
  const touchCapableViewportRaw = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const coarsePointerMedia = window.matchMedia("(any-pointer: coarse)");
      const handler = () => onStoreChange();
      coarsePointerMedia.addEventListener("change", handler);
      window.addEventListener("orientationchange", handler);
      return () => {
        coarsePointerMedia.removeEventListener("change", handler);
        window.removeEventListener("orientationchange", handler);
      };
    },
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0
        : false,
    () => false
  );
  const prefersReducedMotionRaw = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => onStoreChange();
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
  const cardToggleTimerRef = useRef<Record<string, number | undefined>>({});
  const clickedHotspotTimerRef = useRef<number | undefined>(undefined);
  const touchPanStartRef = useRef<{ x: number; y: number; panX: number; panY: number; dragging: boolean } | null>(null);
  const panFrameRef = useRef<number | undefined>(undefined);
  const panNextRef = useRef<{ x: number; y: number } | null>(null);
  const tiltPanFrameRef = useRef<number | undefined>(undefined);
  const tiltPanTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const desktopPanFrameRef = useRef<number | undefined>(undefined);
  const desktopPanTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageNaturalSize, setImageNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const imageNaturalSizeCacheRef = useRef<Record<string, { w: number; h: number }>>({});
  const imageMetricsCacheRef = useRef<Record<string, ReturnType<typeof getCoverImageMetrics>>>({});
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const orangeExtrasRef = useRef<OrangeRoomExtrasHandle | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoCompletedPlaysRef = useRef(0);
  const backgroundVideoLastTimeRef = useRef(0);
  const backgroundVideoShouldStayPausedRef = useRef(false);
  const lobbyHeroReadyRef = useRef(false);
  const lobbyExploreHoverCloseTimerRef = useRef<number | undefined>(undefined);
  const lobbyHeaderRef = useRef<HTMLDivElement | null>(null);
  const lobbyStartHereOpenedRef = useRef(false);
  const isClosingLobbyModalRef = useRef(false);
  const tiltBaselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const tiltFilteredReadingRef = useRef<{ beta: number; gamma: number } | null>(null);
  const tiltSignalSeenRef = useRef(false);
  const tiltInputSourceRef = useRef<"orientation" | "motion" | null>(null);
  const shouldLoopBackgroundVideo = room.slug !== "steeped-dreams-studio";
  const shouldFreezeAfterTwoPlays = false;
  const shouldNativeLoopBackgroundVideo = shouldLoopBackgroundVideo;
  const backgroundVideoPlaybackRate = room.slug === "steeped-dreams-studio" ? 0.9 : 1;
  // Ten Ten ships distinct desktop/mobile videos; defer mounting so mobile
  // doesn't briefly choose the desktop source before hydration completes.
  const shouldDeferBackgroundVideoMount = room.slug === "ten-ten-entertainment";
  const [backgroundVideoEnabled, setBackgroundVideoEnabled] = useState(!shouldDeferBackgroundVideoMount);

  // video audio state
  const [videoMuted, setVideoMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const shouldStartVideoMuted = useCallback(
    (modal: Hotspot["modal"]) => {
      const shouldAllowSoundOnOpen =
        modal?.title === "Who We Are" || modal?.title === "Yanchan Produced Live";
      return !shouldAllowSoundOnOpen;
    },
    []
  );
  const openModal = useCallback((modal: Hotspot["modal"]) => {
    if (room.slug === "lobby" && modal?.title === "Start Here") {
      lobbyStartHereOpenedRef.current = true;
    }
    setActiveModal(modal);
    setActiveCarouselIndex(0);
    if (modal) {
      setExpandedPackageIncludesByModal((prev) => ({ ...prev, [`${room.slug}:${modal.title}`]: false }));
    }
    setVideoMuted(shouldStartVideoMuted(modal));

    const shouldSkipLobbyStepReveal =
      room.slug === "lobby" &&
      (
        modal?.title === "Start Here" ||
        !!modal?.previousHref ||
        !!modal?.nextHref
      );

    if (shouldSkipLobbyStepReveal) {
      setRevealStep(3);
      return;
    }

    setRevealStep(0);
    requestAnimationFrame(() => setRevealStep(1));
    setTimeout(() => setRevealStep(2), 140);
    setTimeout(() => setRevealStep(3), 280);
  }, [room.slug]);

  function closeModal() {
    if (room.slug === "lobby" && typeof window !== "undefined") {
      isClosingLobbyModalRef.current = true;
      const url = new URL(window.location.href);
      if (url.searchParams.has("modal")) {
        url.searchParams.delete("modal");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }
    }
    if (room.slug === "lobby" && lobbyStartHereOpenedRef.current) {
      lobbyStartHereOpenedRef.current = false;
      setShowMoreHotspots(room.slug, true);
    }
    setActiveModal(null);
    setActiveCarouselIndex(0);
    setModalBackModal(null);
    setRevealStep(0);
    setVideoMuted(true);
  }

  const syncLobbyModalFromUrl = useCallback(() => {
    if (room.slug !== "lobby") return;
    if (typeof window === "undefined") return;
    if (isClosingLobbyModalRef.current) {
      isClosingLobbyModalRef.current = false;
      return;
    }

    const modalId = new URLSearchParams(window.location.search).get("modal");
    if (!modalId) return;

    const targetSpot = room.hotspots.find((spot) => spot.id === modalId);
    if (!targetSpot?.modal) return;

    setModalBackModal(null);
    openModal(targetSpot.modal);
  }, [openModal, room.hotspots, room.slug]);

  useEffect(() => {
    if (room.slug !== "lobby") return;
    if (typeof window === "undefined") return;

    syncLobbyModalFromUrl();
    window.addEventListener("popstate", syncLobbyModalFromUrl);

    return () => {
      window.removeEventListener("popstate", syncLobbyModalFromUrl);
    };
  }, [room.slug, syncLobbyModalFromUrl]);

  useEffect(() => {
    if (room.slug !== "lobby") return;
    if (typeof window === "undefined") return;

    function handleFrontModalOpen(event: Event) {
      const customEvent = event as CustomEvent<{ modalId?: string }>;
      const modalId = customEvent.detail?.modalId;
      if (!modalId) return;
      const targetSpot = room.hotspots.find((spot) => spot.id === modalId);
      if (!targetSpot?.modal) return;
      setModalBackModal(null);
      openModal(targetSpot.modal);
    }

    window.addEventListener("emtee:open-lobby-modal", handleFrontModalOpen as EventListener);
    return () => {
      window.removeEventListener("emtee:open-lobby-modal", handleFrontModalOpen as EventListener);
    };
  }, [openModal, room.hotspots, room.slug]);

  // YouTube IFrame Player API (postMessage) unmute
  function unmuteYoutube() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    win.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*");
    win.postMessage(JSON.stringify({ event: "command", func: "setVolume", args: [100] }), "*");
    win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
  }

  function muteYoutube() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    win.postMessage(JSON.stringify({ event: "command", func: "mute", args: [] }), "*");
    win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
  }

  const setBackgroundVideoNode = useCallback((node: HTMLVideoElement | null) => {
    backgroundVideoRef.current = node;
    if (!node) return;
    node.defaultMuted = true;
    node.muted = true;
    node.autoplay = true;
    node.loop = shouldNativeLoopBackgroundVideo;
    node.playbackRate = backgroundVideoPlaybackRate;
    node.defaultPlaybackRate = backgroundVideoPlaybackRate;
    node.playsInline = true;
    node.preload = "auto";
    node.setAttribute("autoplay", "");
    node.setAttribute("muted", "");
    if (shouldNativeLoopBackgroundVideo) {
      node.setAttribute("loop", "");
    } else {
      node.removeAttribute("loop");
    }
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "");
    node.setAttribute("preload", "auto");
  }, [backgroundVideoPlaybackRate, shouldNativeLoopBackgroundVideo]);

  const closeLobbyExploreHover = useCallback(() => {
    if (lobbyExploreHoverCloseTimerRef.current !== undefined) {
      window.clearTimeout(lobbyExploreHoverCloseTimerRef.current);
    }
    lobbyExploreHoverCloseTimerRef.current = window.setTimeout(() => {
      setIsLobbyExploreHoverOpen(false);
      lobbyExploreHoverCloseTimerRef.current = undefined;
    }, 240);
  }, []);

  const isModalOpen = !!activeModal;
  const showVaultCards = room.slug === "ar-sales";
  const showStudioCard = room.slug === "music";
  const showMediaCard = room.slug === "marketing";
  const showBoardRoomCard = room.slug === "business";
  const showArtistsCard = room.slug === "publishing-distribution";
  const showWebsiteDesignCard = room.slug === "EMTEEWebDesign";
  const showOrangeCard = room.slug === "dirty-elephant-studio";
  const isMarketingRoom = room.slug === "marketing";
  const isWebsiteDesignRoom = room.slug === "EMTEEWebDesign";
  const isOrangeRoom = room.slug === "dirty-elephant-studio";
  const isLobbyRoom = room.slug === "lobby";
  const hasLobbyStyleDesktopPan =
    room.slug === "lobby" ||
    room.slug === "marketing";
  const isArSalesRoom = room.slug === "ar-sales";
  const isHotspotTierPilotRoom = HOTSPOT_TIER_PILOT_ROOMS.has(room.slug);
  const showAllRoomHotspots = !isHotspotTierPilotRoom || (showMoreHotspotsByRoom[room.slug] ?? false);
  const activeOverviewCard =
    showVaultCards || showStudioCard || showMediaCard || showBoardRoomCard || showArtistsCard || showWebsiteDesignCard
      ? getActiveOverviewCard(room.slug)
      : null;
  const previousRoomHref = PREVIOUS_ROOM_LINKS[room.slug];
  const previousRoomExploreEntry = previousRoomHref
    ? ROOM_SEQUENCE.find((item) => item.href === previousRoomHref)
    : null;
  const [mobilePanByContext, setMobilePanByContext] = useState<Record<string, { x: number; y: number }>>({});
  const [desktopCursorPan, setDesktopCursorPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showPinHelper, setShowPinHelper] = useState(false);
  const [pinHelperLocked, setPinHelperLocked] = useState(false);
  const pinHelperLockedRef = useRef(false);
  const [pinHelperPoint, setPinHelperPoint] = useState<{
    left: number;
    top: number;
    x: number;
    y: number;
  } | null>(null);
  const viewportKeyRaw = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("resize", onStoreChange);
      window.addEventListener("orientationchange", onStoreChange);
      return () => {
        window.removeEventListener("resize", onStoreChange);
        window.removeEventListener("orientationchange", onStoreChange);
      };
    },
    () => (typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "0x0"),
    () => "0x0"
  );
  const isMobileViewport = hasHydrated ? isMobileViewportRaw : false;
  const [rawViewportW] = viewportKeyRaw.split("x").map((n) => Number(n) || 0);
  const mobileStaticUi = isMobileViewportRaw || (rawViewportW > 0 && rawViewportW < 1024);
  const tiltViewportEnabled = hasHydrated ? (touchCapableViewportRaw || mobileStaticUi) : false;
  const prefersReducedMotion = hasHydrated ? prefersReducedMotionRaw : false;
  const viewportKey = hasHydrated ? viewportKeyRaw : "0x0";
  const backgroundUsesMobileLayout = isLobbyRoom ? isMobileViewportRaw : isMobileViewport;
  const lobbyResponsiveIsMobile = isLobbyRoom ? isMobileViewportRaw : isMobileViewport;
  const shouldDefaultMobileOverviewCollapsed = isMobileViewportRaw && !!activeOverviewCard;
  const hasOverviewCardState =
    minimizedByRoom[room.slug] !== undefined || contentVisibleByRoom[room.slug] !== undefined;
  const isCardMinimized = shouldDefaultMobileOverviewCollapsed && !hasOverviewCardState
    ? true
    : (minimizedByRoom[room.slug] ?? false);
  const isCardContentVisible = shouldDefaultMobileOverviewCollapsed && !hasOverviewCardState
    ? false
    : (contentVisibleByRoom[room.slug] ?? true);
  const isCardCompact = isCardMinimized || !isCardContentVisible;
  const isYoutubeEmbed = !!activeModal?.videoEmbed?.includes("youtube.com/embed");
  const shouldAutoplayMutedYoutubeEmbed = activeModal?.title === "Overstimulated? Chill Out";
  const shouldAutoplayWithSoundYoutubeEmbed = isMobileViewport && activeModal?.title === "Who We Are";
  const resolvedVideoEmbedSrc = useMemo(() => {
    if (!activeModal?.videoEmbed) return null;
    if (!shouldAutoplayMutedYoutubeEmbed && !shouldAutoplayWithSoundYoutubeEmbed) {
      return activeModal.videoEmbed;
    }
    try {
      const url = new URL(activeModal.videoEmbed);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", shouldAutoplayMutedYoutubeEmbed ? "1" : "0");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("enablejsapi", "1");
      return url.toString();
    } catch {
      return shouldAutoplayMutedYoutubeEmbed
        ? activeModal.videoEmbed.replace("mute=0", "mute=1")
        : activeModal.videoEmbed.replace("mute=1", "mute=0");
    }
  }, [activeModal?.videoEmbed, shouldAutoplayMutedYoutubeEmbed, shouldAutoplayWithSoundYoutubeEmbed]);
  const isYanchanMusicModal = activeModal?.title === "Yanchan Produced Music";
  const isYanchanDiscographyModal = activeModal?.title === "Discography";
  const isJoinCommunityModal = activeModal?.title === "Join Community";
  const isCustomProductionModal = activeModal?.title === "Apply For Custom Production";
  const isLivePackagesModal = room.slug === "ten-ten-entertainment" && activeModal?.title === "Packages";
  const isWebsiteDesignMainModal =
    room.slug === "marketing" && activeModal?.title === "Website Design";
  const isPackageGridModal = isLivePackagesModal || isWebsiteDesignMainModal;
  const isLivePackageDetailModal =
    room.slug === "ten-ten-entertainment" &&
    (
      activeModal?.title === "Up & Coming Artist Package" ||
      activeModal?.title === "Rising Star Showcase Package" ||
      activeModal?.title === "Ten Ten Community"
    );
  const isWebsiteDesignTierModal =
    room.slug === "marketing" &&
    (
      activeModal?.title === "Tier 1: Starter Site" ||
      activeModal?.title === "Tier 2: Growth Site" ||
      activeModal?.title === "Tier 3: Artist World"
    );
  const isOrangeModal = isOrangeRoom && !!activeModal;
  const isOrangeSessionModalOpen = isOrangeRoom && activeModal?.title === "Orange Room Session";
  const isStartHereModal = activeModal?.title === "Start Here";
  const isCarouselModal = !!activeModal?.carouselSlides?.length;
  const isLiveRoomModal = room.slug === "ten-ten-entertainment" && !!activeModal && !isPackageGridModal;
  const activeResourceContext = activeModal ? getResourceContext(activeModal.title) : null;
  const suppressLobbyResponsiveUiUntilHydrated = isLobbyRoom && !hasHydrated;
  const activeCarouselSlide =
    isCarouselModal && activeModal?.carouselSlides
      ? activeModal.carouselSlides[((activeCarouselIndex % activeModal.carouselSlides.length) + activeModal.carouselSlides.length) % activeModal.carouselSlides.length]
      : null;
  const isQuietModal = room.slug === "steeped-dreams-studio" && !!activeModal;
  const isDepartmentRoom =
    room.slug === "business" ||
    room.slug === "music" ||
    room.slug === "marketing" ||
    room.slug === "publishing-distribution" ||
    room.slug === "ar-sales";
  const shouldShowDefaultEmteeCornerLogo =
    !!activeModal &&
    (
      isDepartmentRoom ||
      (
        room.slug === "lobby" &&
        (
          activeModal.title === "Who We Are" ||
          activeModal.title === "What We Offer" ||
          activeModal.title === "How You Start"
        )
      )
    );
  const shouldShowSteepedDreamsCornerLogo =
    !!activeModal &&
    room.slug === "steeped-dreams-studio" &&
    activeModal.title !== "Kym Tea Music";
  const resolvedCornerLogo =
    activeModal?.cornerLogo ??
    (shouldShowSteepedDreamsCornerLogo
      ? "/rooms/sdslogoforcard.png"
      : shouldShowDefaultEmteeCornerLogo
      ? "/logotransparent.png"
      : undefined);
  const resolvedCornerLogoAlt =
    activeModal?.cornerLogoAlt ??
    (shouldShowSteepedDreamsCornerLogo
      ? "Steeped Dreams Studio logo"
      : shouldShowDefaultEmteeCornerLogo
      ? "EMTEE logo"
      : undefined);
  const [viewportW, viewportH] = viewportKey.split("x").map((n) => Number(n) || 0);
  const viewportKnown = viewportW > 0 && viewportH > 0;
  const hotspotBreakpoint = getHotspotBreakpoint(viewportW);
  const useBaseHotspotCoordinates =
    room.slug === "lobby" ||
    room.slug === "ten-ten-entertainment" ||
    room.slug === "business" ||
    room.slug === "marketing" ||
    room.slug === "dirty-elephant-studio" ||
    room.slug === "ar-sales" ||
    room.slug === "steeped-dreams-studio";
  const resolvedHotspots = useMemo(
    () =>
      room.hotspots.map((spot) => {
        const breakpointPosition =
          useBaseHotspotCoordinates
            ? undefined
            : spot.positions?.[hotspotBreakpoint] ??
              (hotspotBreakpoint === "desktop" ? undefined : spot.positions?.desktop);
        return {
          ...spot,
          x: breakpointPosition?.x ?? spot.x,
          y: breakpointPosition?.y ?? spot.y,
        };
      }),
    [hotspotBreakpoint, room.hotspots, useBaseHotspotCoordinates]
  );
  const lobbyStartHereAnchor = isLobbyRoom ? resolvedHotspots.find((spot) => spot.id === "start-here") : undefined;
  const lobbyStartHereSpot =
    isLobbyRoom && lobbyStartHereAnchor
      ? { ...lobbyStartHereAnchor, id: "start-here-floating" }
      : undefined;
  const isPortraitViewport = viewportH >= viewportW;
  const mobileOrientationKey = isPortraitViewport ? "portrait" : "landscape";
  const panContextKey = `${room.slug}:${isMobileViewport ? mobileOrientationKey : "desktop"}`;
  const storedMobilePan = mobilePanByContext[panContextKey];
  const cardConnectorAnchor = isMobileViewport ? { x: 50, y: 66 } : { x: 23, y: 70 };
  const navCircleClass = "flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/85 bg-black/10 backdrop-blur-sm";
  const navPillClass = "inline-flex h-9 sm:h-7 items-center whitespace-nowrap rounded-full border border-white/85 bg-black/10 px-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/30 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.2)] group-hover:[text-shadow:0_0_12px_rgba(255,255,255,0.52)]";
  const compactHotspotUi = viewportW > 0 && viewportW < 1280;
  const eagerBackgroundLoad = room.slug === "lobby" || SENSITIVE_TRANSITION_ROOMS.has(room.slug);
  const isMusicRoom = room.slug === "music";
  const isMarketingRoomZoomedOut = room.slug === "marketing";
  const isTenTenRoom = room.slug === "ten-ten-entertainment";
  const viewportAspectRatio = viewportW > 0 && viewportH > 0 ? viewportW / viewportH : 0;
  const arSalesLaptopViewport = isArSalesRoom && !backgroundUsesMobileLayout && viewportW > 0 && viewportW < 1440;
  const arSalesCompactLaptopViewport = arSalesLaptopViewport && viewportW < 1280;
  const marketingLaptopViewport = isMarketingRoom && !backgroundUsesMobileLayout && viewportW > 0 && viewportW < 1440;
  const marketingCompactLaptopViewport = marketingLaptopViewport && viewportW < 1280;
  const mobileSceneScale = tiltEnabled && isMobileViewport ? 1.08 : 1;
  const lobbyDesktopSceneScale =
    !backgroundUsesMobileLayout && isLobbyRoom
      ? clamp(1.02 + Math.max(viewportAspectRatio - 1.7, 0) * 0.14, 1.02, 1.05)
      : 1;
  const desktopSceneScale =
    room.slug === "EMTEEWebDesign" || isArSalesRoom
      ? 1
      : isLobbyRoom
        ? lobbyDesktopSceneScale
        : isMusicRoom
          ? 1
        : isMarketingRoomZoomedOut
          ? 1
        : 1.06;
  const sceneScale = backgroundUsesMobileLayout ? mobileSceneScale : desktopSceneScale;
  const baseRoomBackgroundObjectPositionX =
    arSalesCompactLaptopViewport
      ? 60
      : arSalesLaptopViewport
        ? 55
        : 50;
  const baseRoomBackgroundObjectPositionY =
    room.slug === "EMTEEWebDesign"
      ? 60
      : room.slug === "business"
        ? 110
        : room.slug === "ar-sales"
        ? arSalesCompactLaptopViewport
          ? 8
          : arSalesLaptopViewport
            ? 2
            : -6
        : isTenTenRoom
          ? backgroundUsesMobileLayout
            ? 62
            : 33
        : room.slug === "lobby"
          ? 58
          : 50;
  const shouldUseFixedBaseBackgroundPosition =
    isArSalesRoom || room.slug === "dirty-elephant-studio" || room.slug === "steeped-dreams-studio";
  const backgroundObjectPositionY = shouldUseFixedBaseBackgroundPosition
    ? baseRoomBackgroundObjectPositionY
    : getResponsiveRoomBackgroundObjectPositionY({
        basePositionY: baseRoomBackgroundObjectPositionY,
        viewportW,
        viewportH,
        isMobileViewport: backgroundUsesMobileLayout,
      });
  const backgroundOffsetY = isTenTenRoom ? 50 : 0;
  const backgroundImageSrc =
    isWebsiteDesignRoom && backgroundUsesMobileLayout ? "/rooms/websitess-mobile-v2-opt.jpg" : room.backgroundImage;
  const knownBackgroundImageSize = KNOWN_ROOM_IMAGE_SIZES[backgroundImageSrc];
  const baseActiveBackgroundVideo =
    backgroundUsesMobileLayout && room.backgroundVideoMobile ? room.backgroundVideoMobile : room.backgroundVideo;
  const activeBackgroundVideo = backgroundVideoEnabled ? baseActiveBackgroundVideo : undefined;
  const useContainedBackground = false;
  const baseBackgroundObjectPositionY = shouldUseFixedBaseBackgroundPosition
    ? baseRoomBackgroundObjectPositionY
    : getResponsiveRoomBackgroundObjectPositionY({
        basePositionY:
          isTenTenRoom
            ? baseRoomBackgroundObjectPositionY
            : isMarketingRoom && !backgroundUsesMobileLayout
              ? marketingCompactLaptopViewport
                ? 34
                : marketingLaptopViewport
                  ? 38
                  : 42
              : baseRoomBackgroundObjectPositionY,
        viewportW,
        viewportH,
        isMobileViewport: backgroundUsesMobileLayout,
      });
  const coverMetricsObjectPositionY = backgroundUsesMobileLayout
    ? room.slug === "lobby"
      ? 58
      : backgroundObjectPositionY
    : baseBackgroundObjectPositionY;
  const coverMetricsObjectPositionX = backgroundUsesMobileLayout ? 50 : baseRoomBackgroundObjectPositionX;
  const shouldRenderBackgroundImage =
    !activeBackgroundVideo ||
    room.slug === "ten-ten-entertainment" ||
    room.slug === "steeped-dreams-studio";
  const shouldRenderImmediateBackgroundFallback =
    shouldRenderBackgroundImage && SENSITIVE_TRANSITION_ROOMS.has(room.slug) && room.slug !== "lobby";
  const shouldUseNativeBackgroundImage = shouldRenderBackgroundImage;
  const shouldApplyBackgroundTransform =
    !isMobileViewport && (backgroundOffsetY !== 0 || sceneScale !== 1);
  const showWebsiteDesignEmbed =
    isWebsiteDesignRoom && !isMobileViewport && !isModalOpen && !exploreOpen;
  const parsedModalBody = useMemo(
    () => (activeModal ? parseIncludesFromModalBody(activeModal.body) : { before: "", includes: [] as string[], after: "" }),
    [activeModal]
  );
  const modalIncludesKey = activeModal ? `${room.slug}:${activeModal.title}` : "";
  const isPilotFoldablePackageModal =
    room.slug === "ar-sales" && !!activeModal && parsedModalBody.includes.length > 0;
  const isPilotModalIncludesExpanded = modalIncludesKey ? (expandedPackageIncludesByModal[modalIncludesKey] ?? false) : false;
  const visiblePilotModalIncludes =
    isPilotFoldablePackageModal && !isPilotModalIncludesExpanded
      ? parsedModalBody.includes.slice(0, 3)
      : parsedModalBody.includes;
  const mobileImageMetrics = useMemo(
    () => {
      if (!(backgroundUsesMobileLayout || useContainedBackground)) return null;
      const fitMode = useContainedBackground ? "contain" : "cover";
      const metricsCacheKey = `${room.slug}:${backgroundImageSrc}:${viewportW}x${viewportH}:${sceneScale}:${fitMode}`;
      const cachedMetrics = imageMetricsCacheRef.current[metricsCacheKey];
      if (cachedMetrics) return cachedMetrics;
      if (!imageNaturalSize) return null;
      const computed = getCoverImageMetrics(
        viewportW,
        viewportH,
        imageNaturalSize.w,
        imageNaturalSize.h,
        sceneScale,
        fitMode,
        coverMetricsObjectPositionX,
        coverMetricsObjectPositionY
      );
      if (computed) {
        imageMetricsCacheRef.current[metricsCacheKey] = computed;
      }
      return computed;
    },
    [backgroundImageSrc, backgroundUsesMobileLayout, coverMetricsObjectPositionX, coverMetricsObjectPositionY, imageNaturalSize, room.slug, sceneScale, useContainedBackground, viewportH, viewportW]
  );
  const requiresMetricBasedHotspots = true;
  const desktopCoverMetrics = useMemo(
    () =>
      !backgroundUsesMobileLayout && imageNaturalSize
        ? getCoverImageMetrics(
            viewportW,
            viewportH,
            imageNaturalSize.w,
            imageNaturalSize.h,
            sceneScale,
            "cover",
            coverMetricsObjectPositionX,
            coverMetricsObjectPositionY
          )
        : null,
    [backgroundUsesMobileLayout, coverMetricsObjectPositionX, coverMetricsObjectPositionY, imageNaturalSize, sceneScale, viewportH, viewportW]
  );
  const touchPanMetrics = isMobileViewport ? mobileImageMetrics : tiltViewportEnabled ? desktopCoverMetrics : null;
  const hotspotImageMetrics = isMobileViewport ? mobileImageMetrics : desktopCoverMetrics;
  const canShowPinHelper = PIN_HELPER_ENABLED && !!hotspotImageMetrics && !isModalOpen && !exploreOpen;
  const lobbyMobileHotspotsReady = !isMobileViewport || !!hotspotImageMetrics;
  const sceneReady =
    hasHydrated && viewportKnown && !!imageNaturalSize && (!requiresMetricBasedHotspots || !!hotspotImageMetrics);
  const hotspotsReady =
    hasHydrated && viewportKnown && (!requiresMetricBasedHotspots || !!hotspotImageMetrics);
  const areHotspotsPositionReady = hotspotsReady;
  const visibleHotspots = useMemo(
    () =>
      resolvedHotspots.filter((spot) => {
        if (spot.hidden) return false;
        if (spot.id === "next-room") return false;
        if (isLobbyRoom && !hasHydrated && spot.id === "explore") return false;
        if (isLobbyRoom && lobbyResponsiveIsMobile && spot.id === "explore") return false;
        if (isLobbyRoom && !showAllRoomHotspots) {
          return spot.id === "News";
        }
        if (!isHotspotTierPilotRoom) return true;
        if (showAllRoomHotspots) return true;
        return (spot.tier ?? "core") === "core";
      }),
    [hasHydrated, isHotspotTierPilotRoom, isLobbyRoom, lobbyResponsiveIsMobile, resolvedHotspots, showAllRoomHotspots]
  );
  const connectableDots = visibleHotspots.filter((spot) => spot.variant === "dot");
  const showDotConnectors =
    sceneReady &&
    !!activeOverviewCard &&
    connectableDots.length > 0 &&
    !isModalOpen &&
    !exploreOpen &&
    !isCardCompact &&
    !isMobileViewport;
  const nextRoomHotspot = room.hotspots.find((spot) => spot.id === "next-room");
  const nextRoomHotspotHref = nextRoomHotspot?.href;
  const nextRoomExploreEntry = nextRoomHotspotHref
    ? ROOM_SEQUENCE.find((item) => item.href === nextRoomHotspotHref)
    : null;
  const currentRoomHref = `/rooms/${room.slug}`;
  const currentExploreIndex = ROOM_SEQUENCE.findIndex((item) => item.href === currentRoomHref);
  const fallbackNextExploreEntry =
    currentExploreIndex >= 0
      ? ROOM_SEQUENCE[(currentExploreIndex + 1) % ROOM_SEQUENCE.length]
      : ROOM_SEQUENCE[0];
  const fallbackPrevExploreEntry =
    currentExploreIndex >= 0
      ? ROOM_SEQUENCE[(currentExploreIndex - 1 + ROOM_SEQUENCE.length) % ROOM_SEQUENCE.length]
      : ROOM_SEQUENCE[ROOM_SEQUENCE.length - 1];
  const exploreArrowHref = nextRoomHotspotHref ?? fallbackNextExploreEntry.href;
  const exploreArrowLabel = nextRoomExploreEntry?.label ?? fallbackNextExploreEntry.label;
  const explorePrevHref = previousRoomHref ?? fallbackPrevExploreEntry.href;
  const explorePrevLabel = previousRoomExploreEntry?.label ?? fallbackPrevExploreEntry.label;

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function updatePinHelperPosition(clientX: number, clientY: number, rect: DOMRect) {
    if (!canShowPinHelper || !showPinHelper || pinHelperLockedRef.current || !hotspotImageMetrics) return;
    const renderedLeft = rect.left + hotspotImageMetrics.offsetX + (shouldUseTouchPanOffsets ? displayedPan.x : desktopCursorPan.x);
    const renderedTop = rect.top + hotspotImageMetrics.offsetY + displayedPan.y;
    const rawX = ((clientX - renderedLeft) / hotspotImageMetrics.renderedW) * 100;
    const rawY = ((clientY - renderedTop) / hotspotImageMetrics.renderedH) * 100;
    const x = clamp(Number(rawX.toFixed(2)), 0, 100);
    const y = clamp(Number(rawY.toFixed(2)), 0, 100);
    setPinHelperPoint({
      left: clientX - rect.left,
      top: clientY - rect.top,
      x,
      y,
    });
  }

  function lockPinHelperPosition(clientX: number, clientY: number, rect: DOMRect) {
    if (!canShowPinHelper || !showPinHelper || !hotspotImageMetrics) return;
    const renderedLeft = rect.left + hotspotImageMetrics.offsetX + (shouldUseTouchPanOffsets ? displayedPan.x : desktopCursorPan.x);
    const renderedTop = rect.top + hotspotImageMetrics.offsetY + displayedPan.y;
    const rawX = ((clientX - renderedLeft) / hotspotImageMetrics.renderedW) * 100;
    const rawY = ((clientY - renderedTop) / hotspotImageMetrics.renderedH) * 100;
    const x = clamp(Number(rawX.toFixed(2)), 0, 100);
    const y = clamp(Number(rawY.toFixed(2)), 0, 100);
    setPinHelperPoint({
      left: clientX - rect.left,
      top: clientY - rect.top,
      x,
      y,
    });
    pinHelperLockedRef.current = true;
    setPinHelperLocked(true);
  }

  async function enableTiltPan() {
    if (!MOBILE_TILT_ENABLED) return;
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    const hasDeviceMotion = "DeviceMotionEvent" in window;
    if (!hasDeviceOrientation && !hasDeviceMotion) {
      setTiltStatus("blocked");
      return;
    }

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DeviceMotionEventWithPermission = DeviceMotionEvent as typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    try {
      if (typeof DeviceOrientationEventWithPermission.requestPermission === "function") {
        const permission = await DeviceOrientationEventWithPermission.requestPermission();
        if (permission !== "granted") {
          setTiltStatus("blocked");
          return;
        }
      }
      if (typeof DeviceMotionEventWithPermission.requestPermission === "function") {
        const permission = await DeviceMotionEventWithPermission.requestPermission();
        if (permission !== "granted") {
          setTiltStatus("blocked");
          return;
        }
      }
    } catch {
      setTiltStatus("blocked");
      return;
    }

    tiltBaselineRef.current = null;
    tiltFilteredReadingRef.current = null;
    tiltSignalSeenRef.current = false;
    tiltInputSourceRef.current = null;
    setTiltPermissionNeeded(false);
    setTiltStatus("listening");
    setTiltEnabled(true);
  }

  const clickedHotspotId = clickedHotspotIdByRoom[room.slug] ?? null;

  const prefetchExploreRoute = useCallback((href: string) => {
    if (prefetchedExploreRoutesRef.current.has(href)) return;
    prefetchedExploreRoutesRef.current.add(href);
    router.prefetch(href);
    warmRoomAssetsByHref(href);
  }, [router]);

  const navigateToRoomHref = useCallback(async (href: string, source = "room-scene") => {
    if (room.slug === "lobby" && href.startsWith("/rooms/lobby?modal=") && typeof window !== "undefined") {
      const modalId = new URL(href, window.location.origin).searchParams.get("modal");
      logRoomNav("nav:click", { from: `/rooms/${room.slug}`, to: href, source });
      window.history.replaceState({}, "", href);
      window.dispatchEvent(new CustomEvent("emtee:open-lobby-modal", { detail: { modalId } }));
      return;
    }
    logRoomNav("nav:click", { from: `/rooms/${room.slug}`, to: href, source });
    startRoomTransitionHold(href);
    await awaitRoomAssetsByHref(href);
    logRoomNav("nav:push", { from: `/rooms/${room.slug}`, to: href, source });
    router.push(href);
  }, [room.slug, router]);

  useEffect(() => {
    const routesToWarm = Array.from(
      new Set([
        ...getRoomWarmNeighborhoodHrefsBySlug(room.slug),
        nextRoomHotspotHref,
        exploreArrowHref,
        explorePrevHref,
      ].filter((href): href is string => !!href))
    );

    return scheduleIdleWork(() => {
      for (const href of routesToWarm) {
        if (prefetchedExploreRoutesRef.current.has(href)) continue;
        prefetchedExploreRoutesRef.current.add(href);
        logRoomNav("nav:warmRoute", { from: `/rooms/${room.slug}`, to: href, source: "room-scene-effect" });
        router.prefetch(href);
        warmRoomAssetsByHref(href, { includeVideo: false });
      }
    });
  }, [exploreArrowHref, explorePrevHref, nextRoomHotspotHref, room.slug, router]);

  useEffect(() => {
    return scheduleIdleWork(() => {
      warmRoomNeighborhoodBySlug(room.slug, { includeVideo: false });
    });
  }, [room.slug]);

  useEffect(() => {
    logRoomNav("room:mount", {
      slug: room.slug,
      backgroundImage: room.backgroundImage,
      backgroundVideo: room.backgroundVideo ?? null,
      backgroundVideoMobile: room.backgroundVideoMobile ?? null,
    });
  }, [room.backgroundImage, room.backgroundVideo, room.backgroundVideoMobile, room.slug]);

  function triggerHotspotLabelGlow(spot: Hotspot) {
    if (spot.id === "next-room") return;
    if (clickedHotspotTimerRef.current) {
      window.clearTimeout(clickedHotspotTimerRef.current);
    }
    setClickedHotspotIdByRoom((prev) => ({ ...prev, [room.slug]: spot.id }));
    clickedHotspotTimerRef.current = window.setTimeout(() => {
      setClickedHotspotIdByRoom((prev) =>
        prev[room.slug] === spot.id ? { ...prev, [room.slug]: null } : prev
      );
    }, 1800);
  }

  function openExploreMenu(e?: { preventDefault?: () => void; stopPropagation?: () => void }) {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setExploreOpen(true);
  }

  function getShowMoreStorageKey(slug: string) {
    return `showMore:${slug}`;
  }

  function setShowMoreHotspots(slug: string, next: boolean) {
    setShowMoreHotspotsByRoom((prev) => ({ ...prev, [slug]: next }));
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(getShowMoreStorageKey(slug), next ? "1" : "0");
    } catch {}
    if (slug === "lobby") {
      window.dispatchEvent(new CustomEvent("emtee:lobby-room-list-state", { detail: { open: next } }));
    }
  }

  function toggleShowMoreHotspots() {
    if (!isHotspotTierPilotRoom) return;
    const slug = room.slug;
    const next = !(showMoreHotspotsByRoom[slug] ?? false);
    setShowMoreHotspots(slug, next);
  }

  useEffect(() => {
    if (room.slug !== "lobby") return;
    if (typeof window === "undefined") return;

    function handleLobbyShowRoomsToggle() {
      toggleShowMoreHotspots();
    }

    window.addEventListener("emtee:toggle-lobby-room-list", handleLobbyShowRoomsToggle as EventListener);
    return () => {
      window.removeEventListener("emtee:toggle-lobby-room-list", handleLobbyShowRoomsToggle as EventListener);
    };
  }, [room.slug, showMoreHotspotsByRoom]);

  function minimizeOverviewCard() {
    const slug = room.slug;
    const isMin = minimizedByRoom[slug] ?? false;
    if (isMin) return;
    const pending = cardToggleTimerRef.current[slug];
    if (pending) window.clearTimeout(pending);
    setContentVisibleByRoom((prev) => ({ ...prev, [slug]: false }));
    cardToggleTimerRef.current[slug] = window.setTimeout(() => {
      setMinimizedByRoom((prev) => ({ ...prev, [slug]: true }));
    }, 16);
  }

  function scheduleMobilePan(nextPan: { x: number; y: number }) {
    panNextRef.current = nextPan;
    if (panFrameRef.current) return;
    panFrameRef.current = window.requestAnimationFrame(() => {
      panFrameRef.current = undefined;
      const queuedPan = panNextRef.current;
      if (!queuedPan) return;
      setMobilePanByContext((prev) => ({
        ...prev,
        [panContextKey]: queuedPan,
      }));
    });
  }

  function animateTiltPan() {
    const target = tiltPanTargetRef.current;
    setMobileTiltPan((prev) => {
      const nextX = prev.x + (target.x - prev.x) * 0.066;
      const nextY = prev.y + (target.y - prev.y) * 0.066;
      if (Math.abs(nextX - target.x) < 0.2 && Math.abs(nextY - target.y) < 0.2) {
        tiltPanFrameRef.current = undefined;
        return { x: target.x, y: target.y };
      }
      tiltPanFrameRef.current = window.requestAnimationFrame(animateTiltPan);
      return { x: nextX, y: nextY };
    });
  }

  const scheduleTiltPan = useCallback((nextPan: { x: number; y: number }) => {
    tiltPanTargetRef.current = nextPan;
    if (tiltPanFrameRef.current) return;
    tiltPanFrameRef.current = window.requestAnimationFrame(animateTiltPan);
  }, []);

  function isInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof Element)) return false;
    return !!target.closest("a,button,input,textarea,select,iframe,[data-no-pan]");
  }

  const canPanRoom = isMobileViewport && !tiltEnabled && !isModalOpen && !exploreOpen;
  const canUseTilt = tiltViewportEnabled && tiltEnabled && !isModalOpen && !exploreOpen;
  const canDesktopCursorPan =
    !lobbyResponsiveIsMobile &&
    hasLobbyStyleDesktopPan &&
    !isModalOpen &&
    !exploreOpen &&
    !!desktopCoverMetrics &&
    desktopCoverMetrics.maxPanX > 0;
  const useCanonicalLobbyDesktopPanEndpoints = isLobbyRoom && !lobbyResponsiveIsMobile;
  const lobbyDesktopPanLimits = useMemo(() => {
    if (!useCanonicalLobbyDesktopPanEndpoints || !desktopCoverMetrics) return null;

    // Match the visual left/right endpoints of the reference desktop layout,
    // then translate them into the current viewport's rendered image space.
    // The left edge gets a little more room because the lobby composition
    // needs a slightly farther hallway reveal than the right side does.
    return {
      left: Math.min(desktopCoverMetrics.maxPanX, desktopCoverMetrics.renderedW * 0.084),
      right: Math.min(desktopCoverMetrics.maxPanX, desktopCoverMetrics.renderedW * 0.069),
    };
  }, [desktopCoverMetrics, useCanonicalLobbyDesktopPanEndpoints]);
  const rawTouchPanLeftLimit = touchPanMetrics ? Math.max(0, -touchPanMetrics.offsetX) : 0;
  const rawTouchPanRightLimit = touchPanMetrics
    ? Math.max(0, touchPanMetrics.renderedW + touchPanMetrics.offsetX - viewportW)
    : 0;
  const rawMaxPanX = Math.max(rawTouchPanLeftLimit, rawTouchPanRightLimit);
  const rawMaxPanY = touchPanMetrics?.maxPanY ?? 0;
  const maxPanX = rawMaxPanX;
  const mobilePanLeftLimit = rawTouchPanLeftLimit;
  const mobilePanRightLimit = rawTouchPanRightLimit;
  const maxPanY = rawMaxPanY;
  const mobilePan = useMemo(() => {
    if (storedMobilePan) return storedMobilePan;
    if (!isLobbyRoom || !isMobileViewport || !hotspotImageMetrics || !lobbyStartHereAnchor) {
      return { x: 0, y: 0 };
    }

    const currentHotspotX =
      hotspotImageMetrics.offsetX + (lobbyStartHereAnchor.x / 100) * hotspotImageMetrics.renderedW;
    const desiredHotspotX = viewportW * 0.44;
    const initialPanX = clamp(desiredHotspotX - currentHotspotX, -mobilePanLeftLimit, mobilePanRightLimit);

    return { x: initialPanX, y: 0 };
  }, [
    hotspotImageMetrics,
    isLobbyRoom,
    isMobileViewport,
    lobbyStartHereAnchor,
    mobilePanLeftLimit,
    mobilePanRightLimit,
    storedMobilePan,
    viewportW,
  ]);
  const tiltBasePan = useMemo(() => {
    if (!(canUseTilt && isLobbyRoom && isMobileViewport)) return mobilePan;

    const centeredX = (mobilePanRightLimit - mobilePanLeftLimit) / 2;

    return {
      x: mobilePan.x + (centeredX - mobilePan.x) * 0.4,
      y: mobilePan.y,
    };
  }, [canUseTilt, isLobbyRoom, isMobileViewport, mobilePan, mobilePanLeftLimit, mobilePanRightLimit]);
  const shouldUseTouchPanOffsets = isMobileViewport || (tiltViewportEnabled && tiltEnabled);
  const displayedPan = shouldUseTouchPanOffsets
    ? {
        x: clamp(tiltBasePan.x + mobileTiltPan.x, -mobilePanLeftLimit, mobilePanRightLimit),
        y: clamp(tiltBasePan.y + mobileTiltPan.y, -maxPanY, maxPanY),
      }
    : { x: 0, y: 0 };
  const displayedHotspotPan = shouldUseTouchPanOffsets
    ? {
        x: clamp(tiltBasePan.x + mobileTiltPan.x * 0.82, -mobilePanLeftLimit, mobilePanRightLimit),
        y: clamp(tiltBasePan.y + mobileTiltPan.y * 0.86, -maxPanY, maxPanY),
      }
    : { x: 0, y: 0 };

  function getMobileHotspotStyle(spot: Hotspot) {
    const shiftConversationBlueprintRight =
      room.slug === "ar-sales" && spot.id === "ar-sales-conversion-blueprint";

    if (isMobileViewport && spot.id === "next-room") {
      return {
        right: "1rem",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      };
    }
    if (!requiresMetricBasedHotspots || !hotspotImageMetrics) {
      return {
        left: shiftConversationBlueprintRight
          ? `calc(${spot.x}% + 2in)`
          : `${spot.x}%`,
        top: `${spot.y}%`,
      };
    }
    const left =
      hotspotImageMetrics.offsetX + (spot.x / 100) * hotspotImageMetrics.renderedW + displayedHotspotPan.x;
    const top =
      hotspotImageMetrics.offsetY + (spot.y / 100) * hotspotImageMetrics.renderedH + displayedHotspotPan.y;
    return {
      left: shiftConversationBlueprintRight
        ? `calc(${left}px + 2in)`
        : `${left}px`,
      top: `${top}px`,
    };
  }

  function getHotspotAnchorTransform(spot: Hotspot) {
    if (isMobileViewport && spot.id === "next-room") return undefined;
    if ((spot.variant ?? "pill") === "dot") return "translate(-50%, -50%)";

    const isLeftLabelLobbyPill =
      room.slug === "lobby" &&
      (
        spot.id === "Board Rooms" ||
        spot.id === "departments" ||
        spot.id === "Ten Ten Entertainment" ||
        spot.id === "Dirty Elephant Studios" ||
        spot.id === "Steeped Dreams Studio"
      );
    const tipInset = 6;

    if (spot.direction === "right") {
      return isLeftLabelLobbyPill
        ? `translate(calc(-100% + ${tipInset}px), -50%)`
        : `translate(-${tipInset}px, -50%)`;
    }
    if (spot.direction === "left") {
      return isLeftLabelLobbyPill
        ? `translate(calc(-100% - ${tipInset}px), -50%)`
        : `translate(${tipInset}px, -50%)`;
    }
    if (spot.direction === "up") {
      return `translate(-50%, ${tipInset}px)`;
    }
    if (spot.direction === "down") {
      return `translate(-50%, -${tipInset}px)`;
    }
    return isLeftLabelLobbyPill
      ? `translate(calc(-100% + ${tipInset}px), -50%)`
      : `translate(-${tipInset}px, -50%)`;
  }

  useEffect(() => {
    const timers = cardToggleTimerRef.current;
    const clickedHotspotTimer = clickedHotspotTimerRef.current;
    const panFrame = panFrameRef.current;
    const desktopPanFrame = desktopPanFrameRef.current;
    return () => {
      Object.values(timers).forEach((t) => {
        if (t) window.clearTimeout(t);
      });
      if (clickedHotspotTimer) {
        window.clearTimeout(clickedHotspotTimer);
      }
      if (panFrame) {
        window.cancelAnimationFrame(panFrame);
      }
      if (tiltPanFrameRef.current) {
        window.cancelAnimationFrame(tiltPanFrameRef.current);
      }
      if (desktopPanFrame) {
        window.cancelAnimationFrame(desktopPanFrame);
      }
    };
  }, []);

  function animateDesktopPan() {
    const target = desktopPanTargetRef.current;
    setDesktopCursorPan((prev) => {
      const nextX = prev.x + (target.x - prev.x) * 0.13;
      const nextY = prev.y + (target.y - prev.y) * 0.13;
      if (Math.abs(nextX - target.x) < 0.25 && Math.abs(nextY - target.y) < 0.25) {
        desktopPanFrameRef.current = undefined;
        return { x: target.x, y: target.y };
      }
      desktopPanFrameRef.current = window.requestAnimationFrame(animateDesktopPan);
      return { x: nextX, y: nextY };
    });
  }

  function scheduleDesktopPan(nextPan: { x: number; y: number }) {
    desktopPanTargetRef.current = nextPan;
    if (desktopPanFrameRef.current) return;
    desktopPanFrameRef.current = window.requestAnimationFrame(animateDesktopPan);
  }

  useEffect(() => {
    if (canDesktopCursorPan) return;
    desktopPanTargetRef.current = { x: 0, y: 0 };
    setDesktopCursorPan({ x: 0, y: 0 });
  }, [canDesktopCursorPan, room.slug]);

  useEffect(() => {
    if (room.slug === "lobby") return;

    // Warm route + key lobby asset so "Back to Lobby" feels snappier.
    return scheduleIdleWork(() => {
      router.prefetch("/rooms/lobby");
      warmRoomNeighborhoodBySlug("lobby", { includeVideo: false });
    });
  }, [room.slug, router]);

  useEffect(() => {
    if (!isLiveRoom) return;

    const preconnectTargets = [
      { rel: "preconnect", href: "https://www.instagram.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://static.cdninstagram.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://www.instagram.com" },
      { rel: "dns-prefetch", href: "https://static.cdninstagram.com" },
    ];

    preconnectTargets.forEach((target) => {
      const existing = document.querySelector(`link[rel="${target.rel}"][href="${target.href}"]`);
      if (existing) return;
      const link = document.createElement("link");
      link.rel = target.rel;
      link.href = target.href;
      if (target.crossOrigin) link.crossOrigin = target.crossOrigin;
      document.head.appendChild(link);
    });
  }, [isLiveRoom]);

  useEffect(() => {
    if (room.slug !== "lobby") return;

    // Keep lobby startup focused on the immediate room neighborhood.
    return scheduleIdleWork(() => {
      getRoomWarmNeighborhoodHrefsBySlug("lobby").forEach((href) => {
        router.prefetch(href);
        warmRoomAssetsByHref(href, { includeVideo: false });
      });
      warmImageAsset("/rooms/bizcardupdate.png");
    });
  }, [room.slug, router]);

  useEffect(() => {
    if (!isLobbyRoom || !isMobileViewport) return;
    if (!hotspotImageMetrics || !lobbyStartHereAnchor) return;
    if (mobilePanByContext[panContextKey]) return;

    const currentHotspotX =
      hotspotImageMetrics.offsetX + (lobbyStartHereAnchor.x / 100) * hotspotImageMetrics.renderedW;
    const desiredHotspotX = viewportW * 0.44;
    const initialPanX = clamp(desiredHotspotX - currentHotspotX, -mobilePanLeftLimit, mobilePanRightLimit);

    setMobilePanByContext((prev) => ({
      ...prev,
      [panContextKey]: { x: initialPanX, y: 0 },
    }));
  }, [
    hotspotImageMetrics,
    isLobbyRoom,
    isMobileViewport,
    lobbyStartHereAnchor,
    mobilePanByContext,
    mobilePanLeftLimit,
    mobilePanRightLimit,
    panContextKey,
    viewportW,
  ]);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") return;
    if (!isHotspotTierPilotRoom) return;

    try {
      const raw = window.sessionStorage.getItem(getShowMoreStorageKey(room.slug));
      if (raw == null) return;
      setShowMoreHotspots(room.slug, raw === "1");
    } catch {}
  }, [hasHydrated, isHotspotTierPilotRoom, room.slug]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isMobileViewport) return;
    if (!activeOverviewCard) return;
    if (minimizedByRoom[room.slug] !== undefined) return;

    setMinimizedByRoom((prev) => ({ ...prev, [room.slug]: true }));
    setContentVisibleByRoom((prev) => ({ ...prev, [room.slug]: false }));
  }, [activeOverviewCard, hasHydrated, isMobileViewport, minimizedByRoom, room.slug]);

  useEffect(() => {
    if (!isLobbyRoom || !isLobbyExploreHoverOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (lobbyHeaderRef.current?.contains(target)) return;
      closeLobbyExploreHover();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closeLobbyExploreHover, isLobbyExploreHoverOpen, isLobbyRoom]);

  useEffect(() => {
    if (!MOBILE_TILT_ENABLED) {
      setTiltEnabled(false);
      setTiltAvailable(false);
      setTiltPermissionNeeded(false);
      setTiltStatus("idle");
      return;
    }
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    const hasDeviceMotion = "DeviceMotionEvent" in window;
    setTiltAvailable(hasDeviceOrientation || hasDeviceMotion);
    if (!hasDeviceOrientation && !hasDeviceMotion) return;

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DeviceMotionEventWithPermission = DeviceMotionEvent as typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    setTiltPermissionNeeded(
      typeof DeviceOrientationEventWithPermission.requestPermission === "function" ||
      typeof DeviceMotionEventWithPermission.requestPermission === "function"
    );
  }, []);

  useEffect(() => {
    if (!canUseTilt) {
      setMobileTiltPan({ x: 0, y: 0 });
      tiltBaselineRef.current = null;
      tiltFilteredReadingRef.current = null;
      tiltSignalSeenRef.current = false;
      tiltInputSourceRef.current = null;
      tiltPanTargetRef.current = { x: 0, y: 0 };
      if (tiltPanFrameRef.current) {
        window.cancelAnimationFrame(tiltPanFrameRef.current);
        tiltPanFrameRef.current = undefined;
      }
      setTiltStatus((prev) => (prev === "blocked" ? prev : "idle"));
      return;
    }
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    const hasDeviceMotion = "DeviceMotionEvent" in window;
    if (!hasDeviceOrientation && !hasDeviceMotion) return;

    tiltSignalSeenRef.current = false;
    setTiltStatus("listening");

    const getScreenAdjustedTilt = (beta: number, gamma: number) => {
      const screenOrientation = window.screen?.orientation;
      const rawAngle =
        screenOrientation && typeof screenOrientation.angle === "number"
          ? screenOrientation.angle
          : typeof (window as typeof window & { orientation?: number }).orientation === "number"
            ? Number((window as typeof window & { orientation?: number }).orientation)
            : isPortraitViewport
              ? 0
              : 90;
      const normalizedAngle = ((Math.round(rawAngle / 90) * 90) % 360 + 360) % 360;

      switch (normalizedAngle) {
        case 90:
          return { horizontal: beta, vertical: -gamma };
        case 180:
          return { horizontal: -gamma, vertical: -beta };
        case 270:
          return { horizontal: -beta, vertical: gamma };
        default:
          return { horizontal: gamma, vertical: beta };
      }
    };

    const tiltProfile = isMobileViewport
      ? {
          readingSmoothing: 0.12,
          baselineDrift: 0.18,
          horizontalDivisor: 14,
          verticalDivisor: 16,
          deadzone: 1.6,
          rangeFactorX: 0.98,
          rangeFactorY: 0.86,
        }
      : {
          readingSmoothing: 0.14,
          baselineDrift: 0.16,
          horizontalDivisor: 10,
          verticalDivisor: 12,
          deadzone: 1.2,
          rangeFactorX: 0.98,
          rangeFactorY: 0.82,
        };

    function applyTiltReading(reading: { beta: number; gamma: number }, source: "orientation" | "motion") {
      if (tiltInputSourceRef.current && tiltInputSourceRef.current !== source) return;
      if (!tiltInputSourceRef.current) {
        tiltInputSourceRef.current = source;
      }
      tiltSignalSeenRef.current = true;
      setTiltStatus("active");
      const adjustedReading = getScreenAdjustedTilt(reading.beta, reading.gamma);
      const previousFiltered = tiltFilteredReadingRef.current ?? {
        beta: adjustedReading.vertical,
        gamma: adjustedReading.horizontal,
      };
      const nextReading = {
        beta: previousFiltered.beta + (adjustedReading.vertical - previousFiltered.beta) * tiltProfile.readingSmoothing,
        gamma: previousFiltered.gamma + (adjustedReading.horizontal - previousFiltered.gamma) * tiltProfile.readingSmoothing,
      };
      tiltFilteredReadingRef.current = nextReading;

      if (!tiltBaselineRef.current) {
        tiltBaselineRef.current = nextReading;
      }

      const baseline = tiltBaselineRef.current;
      const deltaHorizontal = nextReading.gamma - baseline.gamma;
      const deltaVertical = nextReading.beta - baseline.beta;

      if (
        Math.abs(deltaHorizontal) < tiltProfile.deadzone &&
        Math.abs(deltaVertical) < tiltProfile.deadzone
      ) {
        scheduleTiltPan({ x: 0, y: 0 });
        tiltBaselineRef.current = {
          beta: baseline.beta + (nextReading.beta - baseline.beta) * tiltProfile.baselineDrift,
          gamma: baseline.gamma + (nextReading.gamma - baseline.gamma) * tiltProfile.baselineDrift,
        };
        return;
      }

      const normalizedHorizontal = clamp(
        deltaHorizontal / tiltProfile.horizontalDivisor,
        -1,
        1,
      );
      const normalizedVertical = clamp(
        deltaVertical / tiltProfile.verticalDivisor,
        -1,
        1,
      );
      const horizontalWithDeadzone = Math.abs(normalizedHorizontal) < 0.12 ? 0 : normalizedHorizontal;
      const verticalWithDeadzone = Math.abs(normalizedVertical) < 0.12 ? 0 : normalizedVertical;
      const shapedHorizontal =
        Math.sign(horizontalWithDeadzone) * Math.pow(Math.abs(horizontalWithDeadzone), 1.08);
      const shapedVertical = Math.sign(verticalWithDeadzone) * Math.pow(Math.abs(verticalWithDeadzone), 1.15);
      const availableLeft = Math.max(0, mobilePanLeftLimit + tiltBasePan.x);
      const availableRight = Math.max(0, mobilePanRightLimit - tiltBasePan.x);
      const xTravel =
        shapedHorizontal >= 0
          ? availableRight * tiltProfile.rangeFactorX
          : availableLeft * tiltProfile.rangeFactorX;
      const yRange = maxPanY * tiltProfile.rangeFactorY;
      const nextX = clamp(
        -shapedHorizontal * xTravel,
        -availableLeft,
        availableRight,
      );
      const nextY = clamp(
        clamp(-shapedVertical * yRange, -yRange, yRange),
        -maxPanY - tiltBasePan.y,
        maxPanY - tiltBasePan.y,
      );

      scheduleTiltPan({ x: nextX, y: nextY });
    }

    let orientationSignalSeen = false;

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
      if (event.beta == null || event.gamma == null) return;
      orientationSignalSeen = true;
      applyTiltReading({ beta: event.beta, gamma: event.gamma }, "orientation");
    }

    function handleDeviceMotion(event: DeviceMotionEvent) {
      const gravity = event.accelerationIncludingGravity;
      if (!gravity) return;
      const gravityX = gravity.x;
      const gravityY = gravity.y;
      if (gravityX == null || gravityY == null) return;

      applyTiltReading({ beta: gravityY * 3.1, gamma: gravityX * 3.1 }, "motion");
    }

    const blockTimer = window.setTimeout(() => {
      if (!tiltSignalSeenRef.current) {
        setTiltStatus("blocked");
      }
    }, 1500);

    let orientationAbsoluteAttached = false;
    let motionAttached = false;
    let absoluteFallbackTimer: number | undefined;
    let motionFallbackTimer: number | undefined;

    const attachOrientationAbsolute = () => {
      if (!hasDeviceOrientation || orientationAbsoluteAttached) return;
      orientationAbsoluteAttached = true;
      window.addEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
    };

    const attachMotion = () => {
      if (!hasDeviceMotion || motionAttached) return;
      motionAttached = true;
      window.addEventListener("devicemotion", handleDeviceMotion, true);
    };

    if (hasDeviceOrientation) {
      window.addEventListener("deviceorientation", handleDeviceOrientation, true);
      absoluteFallbackTimer = window.setTimeout(() => {
        if (!orientationSignalSeen && !tiltSignalSeenRef.current) {
          attachOrientationAbsolute();
        }
      }, 360);
    }
    if (hasDeviceMotion) {
      motionFallbackTimer = window.setTimeout(() => {
        if (!tiltSignalSeenRef.current && !tiltInputSourceRef.current) {
          attachMotion();
        }
      }, 820);
    }

    return () => {
      window.clearTimeout(blockTimer);
      if (absoluteFallbackTimer !== undefined) {
        window.clearTimeout(absoluteFallbackTimer);
      }
      if (motionFallbackTimer !== undefined) {
        window.clearTimeout(motionFallbackTimer);
      }
      if (hasDeviceOrientation) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
      }
      if (orientationAbsoluteAttached) {
        window.removeEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
      }
      if (motionAttached) {
        window.removeEventListener("devicemotion", handleDeviceMotion, true);
      }
    };
  }, [canUseTilt, isMobileViewport, isPortraitViewport, maxPanY, mobilePan.x, mobilePan.y, mobilePanLeftLimit, mobilePanRightLimit, scheduleTiltPan, tiltBasePan.x, tiltBasePan.y]);

  useEffect(() => {
    return () => {
      if (lobbyExploreHoverCloseTimerRef.current !== undefined) {
        window.clearTimeout(lobbyExploreHoverCloseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldDeferBackgroundVideoMount) {
      setBackgroundVideoEnabled(true);
      return;
    }
    setBackgroundVideoEnabled(false);

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const enableVideo = () => {
      if (cancelled) return;
      setBackgroundVideoEnabled(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableVideo, { timeout: 1200 });
    } else if (typeof window !== "undefined") {
      timeoutId = setTimeout(enableVideo, 700);
    }

    return () => {
      cancelled = true;
      if (typeof window !== "undefined" && idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldDeferBackgroundVideoMount, room.slug]);

  useLayoutEffect(() => {
    if (!activeBackgroundVideo) return;
    const video = backgroundVideoRef.current;
    if (!video) return;

    let cancelled = false;
    backgroundVideoShouldStayPausedRef.current = false;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = shouldNativeLoopBackgroundVideo;
    video.playbackRate = backgroundVideoPlaybackRate;
    video.defaultPlaybackRate = backgroundVideoPlaybackRate;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("preload", "auto");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    if (shouldNativeLoopBackgroundVideo) {
      video.setAttribute("loop", "");
    } else {
      video.removeAttribute("loop");
    }
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (cancelled) return;
      if (backgroundVideoShouldStayPausedRef.current) return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    requestAnimationFrame(tryPlay);
    requestAnimationFrame(() => {
      requestAnimationFrame(tryPlay);
    });
    const retryInterval = window.setInterval(() => {
      if (video.paused && !cancelled) tryPlay();
    }, 250);
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("canplaythrough", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "hidden") return;
      tryPlay();
    };
    const handleFirstInteraction = () => {
      tryPlay();
    };
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("pageshow", handleVisibilityOrFocus);
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      cancelled = true;
      window.clearInterval(retryInterval);
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("pageshow", handleVisibilityOrFocus);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [activeBackgroundVideo, backgroundVideoPlaybackRate, shouldNativeLoopBackgroundVideo]);

  useEffect(() => {
    backgroundVideoCompletedPlaysRef.current = 0;
    backgroundVideoLastTimeRef.current = 0;
  }, [activeBackgroundVideo, room.slug]);

  useEffect(() => {
    setBackgroundVideoVisibleByRoom((prev) =>
      prev[room.slug] === false && activeBackgroundVideo
        ? prev
        : { ...prev, [room.slug]: !activeBackgroundVideo }
    );
  }, [activeBackgroundVideo, room.slug]);

  useEffect(() => {
    const known = KNOWN_ROOM_IMAGE_SIZES[backgroundImageSrc];
    if (known) {
      imageNaturalSizeCacheRef.current[backgroundImageSrc] = known;
      setImageNaturalSize(known);
      return;
    }
    const cached = imageNaturalSizeCacheRef.current[backgroundImageSrc];
    if (cached) {
      setImageNaturalSize(cached);
      return;
    }
    setImageNaturalSize(null);
    return scheduleIdleWork(() => {
      const probe = new window.Image();
      probe.decoding = "async";
      probe.onload = () => {
        const w = probe.naturalWidth || probe.width;
        const h = probe.naturalHeight || probe.height;
        if (!w || !h) return;
        const next = { w, h };
        imageNaturalSizeCacheRef.current[backgroundImageSrc] = next;
        setImageNaturalSize(next);
      };
      probe.src = backgroundImageSrc;
    }, 1200);
  }, [backgroundImageSrc]);

  const announceRoomHeroReady = useCallback(() => {
    if (typeof window === "undefined") return;
    dispatchRoomHeroReady(`/rooms/${room.slug}`);
    if (room.slug !== "lobby") return;
    if (lobbyHeroReadyRef.current) return;
    lobbyHeroReadyRef.current = true;
    window.dispatchEvent(
      new CustomEvent("emtee:lobby-hero-ready", { detail: { src: backgroundImageSrc } })
    );
  }, [backgroundImageSrc, room.slug]);

  useEffect(() => {
    lobbyHeroReadyRef.current = false;
    if (room.slug !== "lobby") return;
    if (typeof window === "undefined") return;
    const heroNode = backgroundImageRef.current;
    if (!heroNode?.complete) return;
    const frameId = window.requestAnimationFrame(() => {
      announceRoomHeroReady();
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [announceRoomHeroReady, backgroundImageSrc, room.slug]);

  useEffect(() => {
    if (room.slug !== "EMTEEWebDesign" && room.slug !== "publishing-distribution") return;
    return scheduleIdleWork(() => {
      router.prefetch("/website-design-consultation");
    });
  }, [room.slug, router]);

  // ===== HOTSPOT RENDERERS =====

  function PillHotspotContent(spot: Hotspot) {
    const isNavigationSpot = spot.id === "next-room";
    const isMobileNavigationSpot = isNavigationSpot && isMobileViewport;
    const isClickedLabelVisible = clickedHotspotId === spot.id && !isNavigationSpot;
    const isLobbyPill = room.slug === "lobby" && !isNavigationSpot;
    const isExpanded = true;
    const isWhoWeArePin = room.slug === "lobby" && spot.id === "About";
    const isLobbyExplorePin = room.slug === "lobby" && spot.id === "explore";
    const isLeftLabelLobbyPill =
      room.slug === "lobby" &&
      (
        spot.id === "Board Rooms" ||
        spot.id === "departments" ||
        spot.id === "Ten Ten Entertainment" ||
        spot.id === "Dirty Elephant Studios" ||
        spot.id === "Steeped Dreams Studio"
      );
    const showLabelOnLeft = isLeftLabelLobbyPill && !isMobileNavigationSpot;
    const lobbyPillCircleSize = compactHotspotUi
      ? "clamp(24px, 1.95vw, 28px)"
      : "clamp(26px, 2.05vw, 32px)";
    const lobbyPillFontSize = "clamp(10px, 0.78vw, 12px)";
    const lobbyPillPaddingX = "clamp(10px, 0.95vw, 14px)";
    const lobbyPillPaddingY = "clamp(5px, 0.42vw, 7px)";
    return (
      <span
        className={[
          "group inline-flex items-center",
          isMobileNavigationSpot ? "flex-row-reverse" : "",
          showLabelOnLeft ? "flex-row-reverse" : "",
        ].join(" ")}
      >
        {/* Circle */}
        {!isLobbyExplorePin ? (
          <span
            className={[
              isNavigationSpot
                ? `relative ${navCircleClass}`
                : [
                    "relative flex items-center justify-center rounded-full border bg-black/10 backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/28 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)]",
                    isLobbyPill
                      ? ""
                      : compactHotspotUi
                        ? "h-7 w-7 sm:h-6 sm:w-6"
                        : "h-8 w-8 sm:h-7 sm:w-7",
                  ].join(" "),
              isWhoWeArePin
                ? "border-[#d6ae66]/90 shadow-[0_0_0_2px_rgba(214,174,102,0.28),0_0_22px_rgba(214,174,102,0.6)]"
                : "border-white/85",
            ].join(" ")}
            style={
              isLobbyPill && !isNavigationSpot
                ? { width: lobbyPillCircleSize, height: lobbyPillCircleSize }
                : undefined
            }
          >
            <span className="text-xs leading-none">{getArrow(spot.direction)}</span>
          </span>
        ) : null}

        {/* Label */}
        <span className={`${isMobileNavigationSpot || showLabelOnLeft ? "mr-2" : "ml-2"} ${isNavigationSpot ? navPillClass : "overflow-hidden rounded-full border border-white/85 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/28 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.22)]"} ${
          isExpanded ? "max-w-[300px]" : "max-w-0 group-hover:max-w-[260px]"
        } ${
          isClickedLabelVisible
            ? "border-white/95 bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.26),0_0_22px_rgba(255,255,255,0.34)]"
            : ""
        }`}>
          <span className={`block whitespace-nowrap font-medium transition-all duration-300 ease-out ${
            isLobbyPill ? "py-1.5" : "py-2"
          } ${
            isExpanded ? (isLobbyPill ? "px-3 opacity-100" : "px-4 opacity-100") : "px-0 opacity-0 group-hover:px-4 group-hover:opacity-100"
          } ${
            isLobbyPill ? "text-[11px] sm:text-[12px]" : compactHotspotUi ? "text-xs sm:text-[11px]" : "text-sm"
          } ${
            isClickedLabelVisible ? "[text-shadow:0_0_12px_rgba(255,255,255,0.55)]" : "group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.48)]"
          }`}
          style={
            isLobbyPill
              ? {
                  fontSize: lobbyPillFontSize,
                  paddingLeft: lobbyPillPaddingX,
                  paddingRight: lobbyPillPaddingX,
                  paddingTop: lobbyPillPaddingY,
                  paddingBottom: lobbyPillPaddingY,
                }
              : undefined
          }>
            <HotspotLabelText
              spot={spot}
              showHoverLabel={isLobbyPill && !!spot.hoverLabel ? "hover" : false}
            />
          </span>
        </span>
      </span>
    );
  }

  function DotHotspotContent(spot: Hotspot) {
    const isClickedLabelVisible = clickedHotspotId === spot.id;
    const isOrangeSessionDot = spot.id === "dirty-elephant-studio-room-sessions";
    const isMusicDirtyElephantDot = spot.id === "music-dirty-elephant-studios";
    const useDirtyElephantDotAccent = isOrangeRoom || isMusicDirtyElephantDot;
    const isMediaRoom = room.slug === "marketing";
    const isLobbyDot = room.slug === "lobby";
    const isLiveRoomSocialDot =
      room.slug === "ten-ten-entertainment" &&
      (spot.id === "mike-cannz-youtube" || spot.id === "mike-cannz-spotify");
    const liveRoomSocialLabel =
      spot.id === "mike-cannz-youtube"
        ? "YouTube"
        : spot.id === "mike-cannz-spotify"
          ? "Spotify"
          : null;
    const dotSize = isMusicDirtyElephantDot
      ? isMobileViewport
        ? 5
        : compactHotspotUi
          ? 6
          : 7
      : isMobileViewport
        ? 8
        : compactHotspotUi
          ? 9
          : 10;
    const dotLabelMaxWidth = isMobileViewport
      ? Math.min(Math.max(viewportW * 0.62, 170), 240)
      : Math.min(Math.max(viewportW * 0.34, 180), 360);
    const dotLabelFontSize = isMobileViewport ? "11px" : compactHotspotUi ? "12px" : "13px";
    const resolvedTooltipDirection =
      isOrangeRoom && spot.id === "apply-custom-production" ? "up" : spot.direction;
    const customTooltipOffsetClass =
      isOrangeRoom && spot.id === "apply-custom-production" ? "translate-x-3 sm:translate-x-4" : "";
    const isChillOutCommunityDot = spot.id === "chill-out-community";
    const isQuietAccentDot =
      room.slug === "steeped-dreams-studio" &&
      (spot.id === "kym-tea-music" ||
        spot.id === "eight-d-mixes" ||
        spot.id === "steeped-dreams-studio" ||
        spot.id === "chill-out-community");
    const isWebsiteDesignEnterDot =
      room.slug === "EMTEEWebDesign" && spot.id === "website-design-enter-website";
    const dotBase = useDirtyElephantDotAccent
      ? "rounded-full bg-[#ff9f3f] shadow-[0_0_0_2px_rgba(255,159,63,0.35),0_0_22px_rgba(255,159,63,0.7)]"
      : isWebsiteDesignEnterDot
        ? "rounded-full bg-[#d6ae66] shadow-[0_0_0_2px_rgba(214,174,102,0.45),0_0_24px_rgba(214,174,102,0.8)]"
        : "rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_0_18px_rgba(255,255,255,0.55)]";
    const haloBase = useDirtyElephantDotAccent
      ? "bg-[#ff9f3f]/35"
      : isWebsiteDesignEnterDot
        ? "bg-[#d6ae66]/40"
      : "bg-white/20";
    const ringBase = useDirtyElephantDotAccent
      ? "border-[#ff9f3f]/70"
      : isWebsiteDesignEnterDot
          ? "border-[#d6ae66]/85"
      : "border-white/45";

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

    // Pure dot + hover label tooltip (NO pill markup => no stray border line)
    return (
      <span className="group relative inline-flex items-center">
        {/* DOT */}
        <span
          className={[
            "relative inline-flex items-center justify-center",
            dotBase,
            isOrangeSessionDot && !prefersReducedMotion ? "animate-[softPulse_1.35s_ease-in-out_infinite]" : "",
          ].join(" ")}
          style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
        >
          {/* Soft halo */}
          <span
            className={[
              "pointer-events-none absolute rounded-full blur-md",
              "-inset-2",
              haloBase,
            ].join(" ")}
          />

          {/* Pulse ring (subtle) */}
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
                        : isMediaRoom
                            ? "border-zinc-800/85"
                            : "border-white/70"
                    )
                  : ringBase,
            ].join(" ")}
          />
        </span>

        {/* Dot label */}
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
          <HotspotLabelText spot={spot} showHoverLabel />
        </span>
      </span>
    );
  }

  return (
    <main
      className={[
        "relative min-h-[100dvh] w-full overflow-hidden text-white",
        transparentShell || isLobbyRoom ? "bg-transparent" : "bg-black",
        canPanRoom ? "touch-none" : "",
      ].join(" ")}
      onClickCapture={(e) => {
        if (PIN_HELPER_ENABLED && showPinHelper && canShowPinHelper && !isInteractiveTarget(e.target)) {
          lockPinHelperPosition(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
        }
        if (!isMobileViewport) return;
        if (!activeOverviewCard) return;
        if (isModalOpen || exploreOpen) return;
        if (isCardMinimized) return;
        minimizeOverviewCard();
      }}
      onTouchStart={(e) => {
        if (!canPanRoom || e.touches.length !== 1) return;
        if (isInteractiveTarget(e.target)) return;
        const t = e.touches[0];
        touchPanStartRef.current = {
          x: t.clientX,
          y: t.clientY,
          panX: displayedPan.x,
          panY: displayedPan.y,
          dragging: false,
        };
      }}
      onTouchMove={(e) => {
        const start = touchPanStartRef.current;
        if (!canPanRoom || !start || e.touches.length !== 1) return;
        const t = e.touches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (!start.dragging && Math.hypot(dx, dy) < 6) return;
        if (!start.dragging) {
          start.dragging = true;
          touchPanStartRef.current = start;
        }
        e.preventDefault();
        const nextX = clamp(start.panX + dx * 0.7, -mobilePanLeftLimit, mobilePanRightLimit);
        const nextY = clamp(start.panY + dy * 0.58, -maxPanY, maxPanY);
        scheduleMobilePan({ x: nextX, y: nextY });
      }}
      onTouchEnd={() => {
        touchPanStartRef.current = null;
      }}
      onTouchCancel={() => {
        touchPanStartRef.current = null;
      }}
      onMouseMove={(e) => {
        if (PIN_HELPER_ENABLED) {
          updatePinHelperPosition(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
        }
        if (!canDesktopCursorPan || !desktopCoverMetrics) return;
        const rect = e.currentTarget.getBoundingClientRect();
        if (!rect.width) return;
        const rawNormalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const deadZone = useCanonicalLobbyDesktopPanEndpoints ? 0.02 : 0.08;
        const normalizedX =
          Math.abs(rawNormalizedX) < deadZone
            ? 0
            : ((Math.abs(rawNormalizedX) - deadZone) / (1 - deadZone)) * Math.sign(rawNormalizedX);
        const edgeExponent = useCanonicalLobbyDesktopPanEndpoints ? 1 : 2;
        const edgeWeightedX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), edgeExponent);
        const targetPanRange = useCanonicalLobbyDesktopPanEndpoints
          ? Math.max(lobbyDesktopPanLimits?.left ?? 0, lobbyDesktopPanLimits?.right ?? 0)
          : desktopCoverMetrics.maxPanX;
        // Keep non-lobby desktop pan slightly inside the true cover-image bounds so the black page background never peeks through.
        const rightPanLimit = useCanonicalLobbyDesktopPanEndpoints
          ? (lobbyDesktopPanLimits?.right ?? desktopCoverMetrics.maxPanX)
          : targetPanRange * 0.97;
        const leftPanLimit = useCanonicalLobbyDesktopPanEndpoints
          ? (lobbyDesktopPanLimits?.left ?? desktopCoverMetrics.maxPanX)
          : rightPanLimit * 1.15;
        const rawTargetX = -edgeWeightedX * targetPanRange;
        const targetX = clamp(rawTargetX, -rightPanLimit, leftPanLimit);
        scheduleDesktopPan({ x: targetX, y: 0 });
      }}
      onMouseLeave={() => {
        if (!pinHelperLockedRef.current) {
          setPinHelperPoint(null);
        }
      }}
    >
      {/* Background */}
      <div
        data-room-hero-surface="true"
        data-moving-layer="true"
        className={[
          "absolute inset-0 transition-[filter] duration-300 ease-out",
          !isMobileViewport ? "will-change-transform" : "",
          exploreOpen ? "blur-xl" : "",
        ].join(" ")}
        style={{
          ...(shouldApplyBackgroundTransform
            ? { transform: `translate3d(0, ${backgroundOffsetY}px, 0) scale(${sceneScale})` }
            : undefined),
          ...(shouldRenderImmediateBackgroundFallback
            ? {
                backgroundImage: `url("${backgroundImageSrc}")`,
                backgroundSize: useContainedBackground ? "contain" : "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition:
                  backgroundUsesMobileLayout
                    ? room.slug === "lobby"
                      ? `calc(50% + ${displayedPan.x}px) calc(58% + ${displayedPan.y}px)`
                      : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                    : shouldUseTouchPanOffsets
                      ? `calc(${baseRoomBackgroundObjectPositionX}% + ${displayedPan.x}px) calc(${baseBackgroundObjectPositionY}% + ${displayedPan.y}px)`
                    : canDesktopCursorPan
                      ? `calc(50% + ${desktopCursorPan.x}px) ${baseBackgroundObjectPositionY}%`
                      : `50% ${baseBackgroundObjectPositionY}%`,
              }
            : undefined),
        }}
      >
        {shouldRenderBackgroundImage && shouldUseNativeBackgroundImage ? (
          <img
            ref={backgroundImageRef}
            src={backgroundImageSrc}
            alt={room.title || room.slug}
            width={knownBackgroundImageSize?.w}
            height={knownBackgroundImageSize?.h}
            loading={eagerBackgroundLoad ? "eager" : "lazy"}
            fetchPriority={eagerBackgroundLoad ? "high" : "auto"}
            decoding={eagerBackgroundLoad ? "sync" : "async"}
            data-lobby-hero={room.slug === "lobby" ? "true" : undefined}
            data-room-foreground-hero="true"
            className={[
              "pointer-events-none absolute inset-0 h-full w-full select-none [-webkit-user-drag:none]",
              useContainedBackground ? "object-contain" : "object-cover",
            ].join(" ")}
            style={{
              objectPosition: backgroundUsesMobileLayout
                ? room.slug === "lobby"
                  ? `calc(50% + ${displayedPan.x}px) calc(58% + ${displayedPan.y}px)`
                  : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                : shouldUseTouchPanOffsets
                  ? `calc(${baseRoomBackgroundObjectPositionX}% + ${displayedPan.x}px) calc(${baseBackgroundObjectPositionY}% + ${displayedPan.y}px)`
                : canDesktopCursorPan
                  ? `calc(50% + ${desktopCursorPan.x}px) ${baseBackgroundObjectPositionY}%`
                  : `${baseRoomBackgroundObjectPositionX}% ${baseBackgroundObjectPositionY}%`,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            onLoad={() => {
              announceRoomHeroReady();
              logRoomNav("room:imageLoaded", { slug: room.slug, src: backgroundImageSrc });
            }}
            draggable={false}
          />
        ) : null}
        {activeBackgroundVideo ? (
          <video
            ref={setBackgroundVideoNode}
            className={[
              "pointer-events-none absolute inset-0 h-full w-full object-cover select-none [-webkit-user-drag:none] transition-opacity duration-150",
              backgroundVideoVisibleByRoom[room.slug] ? "opacity-100" : "opacity-0",
            ].join(" ")}
            autoPlay
            loop={shouldNativeLoopBackgroundVideo}
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            poster={room.slug === "ten-ten-entertainment" ? backgroundImageSrc : undefined}
            preload={room.slug === "ten-ten-entertainment" || room.slug === "lobby" || room.slug === "steeped-dreams-studio" ? "auto" : "metadata"}
            onLoadedData={() => {
              setBackgroundVideoVisibleByRoom((prev) => ({ ...prev, [room.slug]: true }));
              logRoomNav("room:videoLoadedData", { slug: room.slug, src: activeBackgroundVideo });
            }}
            onCanPlay={() => {
              setBackgroundVideoVisibleByRoom((prev) => ({ ...prev, [room.slug]: true }));
              logRoomNav("room:videoCanPlay", { slug: room.slug, src: activeBackgroundVideo });
            }}
            onPlaying={() => {
              backgroundVideoShouldStayPausedRef.current = false;
              setBackgroundVideoVisibleByRoom((prev) => ({ ...prev, [room.slug]: true }));
              logRoomNav("room:videoPlaying", { slug: room.slug, src: activeBackgroundVideo });
            }}
            onTimeUpdate={(event) => {
              if (!shouldFreezeAfterTwoPlays) return;
              const video = event.currentTarget;
              const lastTime = backgroundVideoLastTimeRef.current;
              const currentTime = video.currentTime;
              if (lastTime > currentTime + 0.25) {
                backgroundVideoCompletedPlaysRef.current += 1;
                if (backgroundVideoCompletedPlaysRef.current >= 1) {
                  video.loop = false;
                  video.removeAttribute("loop");
                }
              }
              backgroundVideoLastTimeRef.current = currentTime;
            }}
            onEnded={(event) => {
              if (shouldLoopBackgroundVideo) return;
              const video = event.currentTarget;
              backgroundVideoShouldStayPausedRef.current = true;
              video.pause();
              if (Number.isFinite(video.duration) && video.duration > 0) {
                try {
                  video.currentTime = Math.max(0, video.duration - 0.033);
                } catch {}
              }
            }}
            style={
              shouldUseTouchPanOffsets
                ? {
                    backgroundColor: isTenTenRoom ? "#000000" : undefined,
                    objectPosition: isMobileViewport
                      ? `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                      : `calc(${baseRoomBackgroundObjectPositionX}% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`,
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }
                : isTenTenRoom
                  ? {
                      backgroundColor: "#000000",
                      objectPosition: `50% ${baseBackgroundObjectPositionY}%`,
                      WebkitTouchCallout: "none",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                    }
                  : canDesktopCursorPan
                    ? {
                        objectPosition: `calc(50% + ${desktopCursorPan.x}px) ${backgroundObjectPositionY}%`,
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                      }
                    : {
                        objectPosition: `${baseRoomBackgroundObjectPositionX}% ${backgroundObjectPositionY}%`,
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                      }
            }
            src={activeBackgroundVideo}
          />
        ) : null}
        {showWebsiteDesignEmbed ? (
          <div
            data-no-pan
            className="absolute z-20 overflow-hidden bg-white"
            style={
              isMobileViewport
                ? {
                    left: "12%",
                    top: "14%",
                    width: "76%",
                    height: "57%",
                  }
                : {
                    left: "41.8%",
                    top: "7.8%",
                    width: "56.7%",
                    height: "64.1%",
                }
            }
          >
            <iframe
              src="/website-design"
              title="Website Design Interactive Screen"
              className="h-full w-full border-0"
              loading="eager"
            />
          </div>
        ) : null}
      </div>

      {PIN_HELPER_ENABLED && (showPinHelper || canShowPinHelper) ? (
        <div className="absolute left-3 top-3 z-[120] flex flex-col items-start gap-2" data-no-pan>
          <button
            type="button"
            onClick={() => {
              setShowPinHelper((prev) => {
                const next = !prev;
                if (!next) {
                  setPinHelperPoint(null);
                  pinHelperLockedRef.current = false;
                  setPinHelperLocked(false);
                }
                return next;
              });
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88 backdrop-blur-md transition hover:bg-black/70"
          >
            {showPinHelper ? "Pin Helper On" : "Pin Helper Off"}
          </button>

          {showPinHelper ? (
            <div className="min-w-[11rem] rounded-2xl border border-white/14 bg-black/60 px-3 py-2 text-[11px] text-white/84 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="font-semibold uppercase tracking-[0.14em] text-white/62">Pin Coordinates</div>
              <div className="mt-1">
                {pinHelperPoint ? `x: ${pinHelperPoint.x}%` : "x: move cursor"}
              </div>
              <div>
                {pinHelperPoint ? `y: ${pinHelperPoint.y}%` : "y: move cursor"}
              </div>
              <div className="mt-1 text-[10px] text-white/58">
                {pinHelperLocked ? "Locked. Click Unlock or click scene after unlocking." : "Move cursor, then click scene to lock."}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    pinHelperLockedRef.current = false;
                    setPinHelperLocked(false);
                  }}
                  disabled={!pinHelperLocked}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Unlock
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPinHelperPoint(null);
                    pinHelperLockedRef.current = false;
                    setPinHelperLocked(false);
                  }}
                  disabled={!pinHelperPoint}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Clear
                </button>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!pinHelperPoint || typeof navigator === "undefined" || !navigator.clipboard) return;
                  await navigator.clipboard.writeText(`x: ${pinHelperPoint.x}, y: ${pinHelperPoint.y}`);
                }}
                disabled={!pinHelperPoint}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Copy Coordinates
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {PIN_HELPER_ENABLED && showPinHelper && pinHelperPoint && canShowPinHelper ? (
        <div
          className="pointer-events-none absolute z-[115] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-cyan-300/35 shadow-[0_0_0_4px_rgba(103,232,249,0.12),0_0_18px_rgba(34,211,238,0.45)]"
          style={{ left: `${pinHelperPoint.left}px`, top: `${pinHelperPoint.top}px` }}
        />
      ) : null}

      {MOBILE_TILT_ENABLED && tiltViewportEnabled && !exploreOpen && !isModalOpen ? (
        <div className="absolute bottom-20 right-2 z-50 flex flex-col items-end gap-1.5" data-no-pan>
          {tiltEnabled ? (
            <button
              type="button"
              onClick={() => {
                setTiltEnabled(false);
                setMobileTiltPan({ x: 0, y: 0 });
                tiltBaselineRef.current = null;
                tiltFilteredReadingRef.current = null;
                tiltSignalSeenRef.current = false;
                setTiltStatus("idle");
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88 backdrop-blur-md transition hover:bg-black/70"
            >
              {tiltStatus === "active" ? "Tilt On" : "Tilt Ready"}
            </button>
          ) : (
            <button
              type="button"
              onClick={enableTiltPan}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/78 backdrop-blur-md transition hover:bg-black/60 hover:text-white"
            >
              {tiltPermissionNeeded || tiltAvailable ? "Enable Tilt" : "Tilt Off"}
            </button>
          )}
        </div>
      ) : null}

      {isOrangeRoom ? (
        <OrangeRoomExtras
          ref={orangeExtrasRef}
          isOrangeRoom={isOrangeRoom}
          isMobileViewport={isMobileViewport}
          isSessionModalOpen={isOrangeSessionModalOpen}
          isPreviewMuted={isOrangePreviewMuted}
          onPreviewMutedChange={setIsOrangePreviewMuted}
        />
      ) : null}

      {/* Room label */}
      <div
        className={[
          "absolute top-28 z-50 transition-opacity duration-100",
          mobileStaticUi ? "left-8" : "left-6",
          isLobbyRoom || mobileStaticUi || !mobileStaticUi ? "hidden" : "",
          exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <div className="text-xs tracking-widest text-white/60">
            {room.slug === "lobby" || room.slug === "dirty-elephant-studio" || room.slug === "steeped-dreams-studio" || room.slug === "ten-ten-entertainment"
              ? "ROOM"
              : "DEPARTMENT"}
          </div>
        </div>
        <div className="mt-1 flex items-center gap-3">
          <div
            className={[
              "font-semibold whitespace-pre-line",
              mobileStaticUi ? "text-[1.6rem] leading-tight" : "text-3xl",
              room.slug === "dirty-elephant-studio"
                ? "text-[#ff9f3f] [text-shadow:0_0_10px_rgba(255,159,63,0.75),0_0_24px_rgba(255,159,63,0.45)]"
                : room.slug === "steeped-dreams-studio"
                  ? "text-white [text-shadow:0_0_8px_rgba(255,255,255,0.22),0_0_18px_rgba(255,255,255,0.1)]"
                  : room.slug === "ar-sales"
                    ? "rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm [text-shadow:0_0_8px_rgba(255,255,255,0.18)]"
                  : "",
            ].join(" ")}
          >
            {room.title || "Lobby"}
          </div>
        </div>
        {isHotspotTierPilotRoom ? (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleShowMoreHotspots}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/82 transition hover:border-white/35 hover:bg-black/45 hover:text-white"
            >
              {showAllRoomHotspots ? "Hide Rooms" : "Show Rooms"}
            </button>
            {!isLobbyRoom ? (
              <span className="text-[11px] text-white/62">
                {showAllRoomHotspots ? "Showing all actions" : "Showing core actions"}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      {isLobbyRoom && !suppressLobbyResponsiveUiUntilHydrated ? (
        <div
          ref={lobbyHeaderRef}
          className={[
            "absolute left-1/2 z-50 -translate-x-1/2 justify-center transition-opacity duration-100",
            isMobileViewport ? "hidden" : "hidden top-24 w-[min(calc(100vw-2.5rem),18rem)] px-3 xl:flex",
            exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          ].join(" ")}
          data-no-pan
        >
          {isHotspotTierPilotRoom ? (
            <button
              type="button"
              onClick={toggleShowMoreHotspots}
              className="inline-flex min-w-[7.25rem] items-center justify-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/88 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:border-white/28 hover:bg-black/40 hover:text-white"
            >
              {showAllRoomHotspots ? "Hide Rooms" : "Show Rooms"}
            </button>
          ) : null}
        </div>
      ) : null}

      {isLobbyRoom && lobbyStartHereSpot && !suppressLobbyResponsiveUiUntilHydrated && lobbyMobileHotspotsReady ? (
        <div
          className={[
            "absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-100",
            isModalOpen || exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          ].join(" ")}
          style={{
            ...getMobileHotspotStyle(lobbyStartHereSpot),
            transform:
              canDesktopCursorPan && !isMobileViewport
                ? `translate3d(${desktopCursorPan.x}px, 0, 0) translate(-50%, -50%)`
                : "translate(-50%, -50%)",
          }}
          data-no-pan
        >
          <button
            type="button"
            onClick={() => {
              if (room.slug === "lobby") {
                lobbyStartHereOpenedRef.current = true;
              }
              const startSpot =
                room.hotspots.find((spot) => spot.id === "About") ??
                room.hotspots.find((spot) => spot.id === "start-here") ??
                room.hotspots.find((spot) => spot.id === "how-you-start") ??
                room.hotspots.find((spot) => spot.id === "departments");
              if (!startSpot?.modal) return;
              setModalBackModal(null);
              openModal(startSpot.modal);
            }}
            className="start-here-priority inline-flex min-w-[6.5rem] items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.02em] transition"
          >
            Start Here
          </button>
        </div>
      ) : null}

      {showDotConnectors && (
        <div
          className="pointer-events-none absolute inset-0 z-[35] opacity-100 transition-opacity duration-150"
          style={
            canDesktopCursorPan && !isMobileViewport
              ? { transform: `translate3d(${desktopCursorPan.x}px, 0, 0)` }
              : undefined
          }
        >
          {connectableDots.map((spot) => (
            <div
              key={`connector-${spot.id}`}
              className="connector-line"
              style={connectorStyle(spot, cardConnectorAnchor)}
            />
          ))}
        </div>
      )}

      {/* Room overview cards */}
      {activeOverviewCard ? (
        <RoomOverviewCardLayer
          activeOverviewCard={activeOverviewCard}
          roomSlug={room.slug}
          showOrangeCard={showOrangeCard}
          mobileStaticUi={mobileStaticUi}
          isCardCompact={isCardCompact}
          isCardMinimized={isCardMinimized}
          isCardContentVisible={isCardContentVisible}
          isModalOpen={isModalOpen}
          exploreOpen={exploreOpen}
          prefersReducedMotion={prefersReducedMotion}
          onToggleCard={() => {
            const slug = room.slug;
            const isMin = minimizedByRoom[slug] ?? false;
            const pending = cardToggleTimerRef.current[slug];
            if (pending) window.clearTimeout(pending);

            if (isMin) {
              setMinimizedByRoom((prev) => ({ ...prev, [slug]: false }));
              cardToggleTimerRef.current[slug] = window.setTimeout(() => {
                setContentVisibleByRoom((prev) => ({ ...prev, [slug]: true }));
              }, 240);
            } else {
              minimizeOverviewCard();
            }
          }}
        />
      ) : null}

      {/* Hotspots */}
      <RoomHotspotLayer
        visibleHotspots={visibleHotspots}
        areHotspotsPositionReady={areHotspotsPositionReady}
        isMobileViewport={isMobileViewport}
        isModalOpen={isModalOpen}
        exploreOpen={exploreOpen}
        isLobbyRoom={isLobbyRoom}
        isLobbyExploreHoverOpen={isLobbyExploreHoverOpen}
        canDesktopCursorPan={canDesktopCursorPan}
        desktopCursorPanX={desktopCursorPan.x}
        hasHydrated={hasHydrated}
        roomSlug={room.slug}
        lobbyResponsiveIsMobile={lobbyResponsiveIsMobile}
        getMobileHotspotStyle={getMobileHotspotStyle}
        getHotspotAnchorTransform={getHotspotAnchorTransform}
        renderHotspotContent={(spot) =>
          (spot.variant ?? "pill") === "dot" ? DotHotspotContent(spot) : PillHotspotContent(spot)
        }
        onOpenExplore={(spot) => {
          triggerHotspotLabelGlow(spot);
          setExploreOpen(true);
        }}
        onOpenModal={(spot) => {
          triggerHotspotLabelGlow(spot);
          setModalBackModal(null);
          openModal(spot.modal!);
        }}
        onExternalLinkClick={(spot) => {
          triggerHotspotLabelGlow(spot);
        }}
        onInternalLinkClick={(event, spot) => {
          event.preventDefault();
          triggerHotspotLabelGlow(spot);
          void navigateToRoomHref(spot.href!, "room-scene-hotspot");
        }}
        prefetchExploreRoute={prefetchExploreRoute}
      />

      <RoomExploreLayer
        suppressLobbyResponsiveUiUntilHydrated={suppressLobbyResponsiveUiUntilHydrated}
        isMobileViewport={isMobileViewport}
        isStartHereModal={isStartHereModal}
        isLobbyRoom={isLobbyRoom}
        explorePrevLabel={explorePrevLabel}
        explorePrevHref={explorePrevHref}
        exploreArrowLabel={exploreArrowLabel}
        exploreArrowHref={exploreArrowHref}
        navigateToRoomHref={navigateToRoomHref}
        openExploreMenu={openExploreMenu}
        exploreOpen={exploreOpen}
        setExploreOpen={setExploreOpen}
        exploreRooms={EXPLORE_ROOMS}
        prefetchExploreRoute={prefetchExploreRoute}
      />

      {/* MODAL OVERLAY */}
      <RoomModalLayer
        roomSlug={room.slug}
        isMobileViewport={isMobileViewport}
        activeModal={activeModal}
        closeModal={closeModal}
        openModal={openModal}
        modalBackModal={modalBackModal}
        setModalBackModal={setModalBackModal}
        isStartHereModal={isStartHereModal}
        isOrangeModal={isOrangeModal}
        isQuietModal={isQuietModal}
        resolvedCornerLogo={resolvedCornerLogo}
        resolvedCornerLogoAlt={resolvedCornerLogoAlt}
        revealStep={revealStep}
        iframeRef={iframeRef}
        resolvedVideoEmbedSrc={resolvedVideoEmbedSrc}
        isYoutubeEmbed={isYoutubeEmbed}
        videoMuted={videoMuted}
        setVideoMuted={setVideoMuted}
        muteYoutube={muteYoutube}
        unmuteYoutube={unmuteYoutube}
        isCarouselModal={isCarouselModal}
        activeCarouselSlide={activeCarouselSlide}
        activeCarouselIndex={activeCarouselIndex}
        setActiveCarouselIndex={setActiveCarouselIndex}
        setExpandedPackageIncludesByModal={setExpandedPackageIncludesByModal}
        renderModalBodyWithBoldIncludes={renderModalBodyWithBoldIncludes}
        renderStartHereStepsWithBoldTitles={renderStartHereStepsWithBoldTitles}
        roomHotspots={resolvedHotspots}
        expandedPackageIncludesByModal={expandedPackageIncludesByModal}
        yanchanDiscographySpotlight={YANCHAN_DISCOGRAPHY_SPOTLIGHT}
        SocialIcon={SocialIcon}
        openExploreMenu={openExploreMenu}
      />
    </main>
  );
}
