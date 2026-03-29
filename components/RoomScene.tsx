"use client";

import dynamic from "next/dynamic";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  awaitRoomAssetsByHref,
  getRoomWarmNeighborhoodHrefsBySlug,
  warmRoomAssetsByHref,
  warmRoomNeighborhoodBySlug,
} from "@/lib/warmRoomAssets";
import type { OrangeRoomExtrasHandle } from "@/components/OrangeRoomExtras";
import RoomDotHotspotContent from "@/components/RoomDotHotspotContent";
import RoomPillHotspotContent from "@/components/RoomPillHotspotContent";
import {
  getKnownRoomImageSize,
  getRoomSceneBackgroundConfig,
} from "@/components/roomSceneBackgroundConfig";
import { getActiveOverviewCard } from "@/components/roomSceneOverviewConfig";
import { getDotPresentationState } from "@/components/roomHotspotPresentation";

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
    carouselSlides?: Array<{
      src: string;
      alt: string;
      eyebrow?: string;
      title: string;
      body?: string;
      primaryLabel?: string;
      primaryHref?: string;
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
  { label: "Start Here", href: "/rooms/lobby?modal=start-here" },
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
const HOTSPOT_TIER_PILOT_ROOMS = new Set(["lobby"]);
const TEN_TEN_FIXED_NON_MOBILE_HOTSPOT_IDS = new Set([
  "mike-cannz-youtube",
  "mike-cannz-spotify",
  "ten-ten-entertainment-packages",
]);

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
const ORANGE_SESSION_PREVIEW_DOT_ID = "apply-dirty-elephant-studio-room-session";
const YANCHAN_DISCOGRAPHY_SPOTLIGHT = [
  { src: "/news/aruljuno-opt.jpg", label: "ARUL", isJunoNominated: true, objectPosition: "center 20%" },
  { src: "/news/thinkyouglowed-opt.jpg", label: "Lil Durk - Think You Glowed", objectPosition: "center 18%" },
  {
    src: "https://yt3.googleusercontent.com/f16R_n3YKPthxphDOdHNX9qE1c8-1gN67Ax4uARDL_n0K0nCqMTdNroE-fBhbuA_ouU48wE9yBY=s900-c-k-c0x00ffffff-no-rj",
    label: "Russ - The Wind",
    objectPosition: "center 20%",
  },
  {
    src: "https://i.ytimg.com/vi/IIat8oxEIbE/maxresdefault.jpg",
    label: "Shruti Hassan - Inimel",
    objectPosition: "center 24%",
  },
  { src: "/news/jonitabeparwai-opt.jpg", label: "Jonita - Beparwai" },
  { src: "/news/chaisunshinechart-opt.jpg", label: "Chai & Sunshine", objectPosition: "center 18%" },
  {
    src: "https://g5afoundation.org/culture/wp-content/uploads/2023/08/SVDP-by-Gajan-Balan-1-1-474x324.jpg",
    label: "SVDP - mrdgm raps",
    objectPosition: "center 18%",
  },
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

function getCoverImageMetrics(
  viewportW: number,
  viewportH: number,
  naturalW: number,
  naturalH: number,
  scale = 1,
  fitMode: "cover" | "contain" = "cover"
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
  const offsetX = (viewportW - renderedW) / 2;
  const offsetY = (viewportH - renderedH) / 2;

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

function ensureTenTenInstagramPreconnect() {
  if (typeof document === "undefined") return;

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
}: {
  room: Room;
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
  const orangeExtrasRef = useRef<OrangeRoomExtrasHandle | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoCompletedPlaysRef = useRef(0);
  const backgroundVideoLastTimeRef = useRef(0);
  const lobbyExploreHoverCloseTimerRef = useRef<number | undefined>(undefined);
  const lobbyHeaderRef = useRef<HTMLDivElement | null>(null);
  const lobbyStartHereOpenedRef = useRef(false);
  const isClosingLobbyModalRef = useRef(false);
  const tiltBaselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const tiltFilteredReadingRef = useRef<{ beta: number; gamma: number } | null>(null);
  const tiltSignalSeenRef = useRef(false);
  const shouldLoopBackgroundVideo = room.slug !== "steeped-dreams-studio";
  const shouldFreezeAfterTwoPlays = false;
  const shouldNativeLoopBackgroundVideo = shouldLoopBackgroundVideo;
  const backgroundVideoPlaybackRate = room.slug === "steeped-dreams-studio" ? 0.9 : 1;
  const shouldDeferBackgroundVideoMount = room.slug === "ten-ten-entertainment";
  const [backgroundVideoEnabled, setBackgroundVideoEnabled] = useState(!shouldDeferBackgroundVideoMount);

  // video audio state
  const [videoMuted, setVideoMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const shouldStartVideoMuted = useCallback(
    (modal: Hotspot["modal"]) => modal?.title !== "Who We Are" || isMobileViewportRaw,
    [isMobileViewportRaw]
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
    setRevealStep(0);
    setVideoMuted(shouldStartVideoMuted(modal));

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
      setShowMoreHotspotsByRoom((prev) => ({ ...prev, [room.slug]: true }));
      if (hasHydrated && typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(getShowMoreStorageKey(room.slug), "1");
        } catch {}
      }
    }
    setActiveModal(null);
    setActiveCarouselIndex(0);
    setModalBackModal(null);
    setRevealStep(0);
    setVideoMuted(true);
  }

  useEffect(() => {
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
    if (activeModal?.title === targetSpot.modal.title) return;
    setModalBackModal(null);
    openModal(targetSpot.modal);
  }, [activeModal?.title, openModal, room.hotspots, room.slug]);

  useEffect(() => {
    if (!hasHydrated || !isHotspotTierPilotRoom || room.slug !== "lobby") return;
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

  const toggleOrangePreviewMute = useCallback(() => {
    orangeExtrasRef.current?.togglePreviewMute();
  }, []);

  const startOrangeMobileSessionAudio = useCallback(() => {
    orangeExtrasRef.current?.startMobileSessionAudio();
  }, []);

  const showOrangeSessionPreview = useCallback(() => {
    orangeExtrasRef.current?.openSessionPreview();
  }, []);

  const hideOrangeSessionPreview = useCallback(() => {
    orangeExtrasRef.current?.closeSessionPreview();
  }, []);

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
  const showOrangeCard = room.slug === "dirty-elephant-studio";
  const isMarketingRoom = room.slug === "marketing";
  const isWebsiteDesignRoom = room.slug === "EMTEEWebDesign";
  const isOrangeRoom = room.slug === "dirty-elephant-studio";
  const isLobbyRoom = room.slug === "lobby";
  const isArSalesRoom = room.slug === "ar-sales";
  const isHotspotTierPilotRoom = HOTSPOT_TIER_PILOT_ROOMS.has(room.slug);
  const showAllRoomHotspots = !isHotspotTierPilotRoom || (showMoreHotspotsByRoom[room.slug] ?? false);
  const activeOverviewCard = getActiveOverviewCard(room.slug);
  const previousRoomHref = PREVIOUS_ROOM_LINKS[room.slug];
  const previousRoomExploreEntry = previousRoomHref
    ? ROOM_SEQUENCE.find((item) => item.href === previousRoomHref)
    : null;
  const [mobilePanByContext, setMobilePanByContext] = useState<Record<string, { x: number; y: number }>>({});
  const [desktopCursorPan, setDesktopCursorPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
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
  const mobileStaticUi = isMobileViewportRaw;
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
  const resolvedVideoEmbedSrc = useMemo(() => {
    if (!activeModal?.videoEmbed) return null;
    if (!(isMobileViewport && activeModal.title === "Who We Are")) {
      return activeModal.videoEmbed;
    }
    try {
      const url = new URL(activeModal.videoEmbed);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", "1");
      url.searchParams.set("playsinline", "1");
      return url.toString();
    } catch {
      return activeModal.videoEmbed.replace("mute=0", "mute=1");
    }
  }, [activeModal?.title, activeModal?.videoEmbed, isMobileViewport]);
  const isOrangeModal = isOrangeRoom && !!activeModal;
  const isOrangeSessionModalOpen = isOrangeRoom && activeModal?.title === "Apply For An Orange Room Session";
  const isStartHereModal = activeModal?.title === "Start Here";
  const isCarouselModal = !!activeModal?.carouselSlides?.length;
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
  const resolvedCornerLogo = activeModal?.cornerLogo ?? (shouldShowDefaultEmteeCornerLogo ? "/logotransparent.png" : undefined);
  const resolvedCornerLogoAlt = activeModal?.cornerLogoAlt ?? (shouldShowDefaultEmteeCornerLogo ? "EMTEE logo" : undefined);
  const [viewportW, viewportH] = viewportKey.split("x").map((n) => Number(n) || 0);
  const viewportKnown = viewportW > 0 && viewportH > 0;
  const hotspotBreakpoint = getHotspotBreakpoint(viewportW);
  const resolvedHotspots = useMemo(
    () =>
      room.hotspots.map((spot) => {
        const breakpointPosition =
          hotspotBreakpoint === "mobile"
            ? room.slug === "ten-ten-entertainment"
              ? spot.positions?.mobile
              : undefined
            : room.slug === "ten-ten-entertainment" && TEN_TEN_FIXED_NON_MOBILE_HOTSPOT_IDS.has(spot.id)
              ? undefined
            : spot.positions?.[hotspotBreakpoint] ??
              (hotspotBreakpoint === "desktop" ? undefined : spot.positions?.desktop);
        return {
          ...spot,
          x: breakpointPosition?.x ?? spot.x,
          y: breakpointPosition?.y ?? spot.y,
        };
      }),
    [hotspotBreakpoint, room.hotspots, room.slug]
  );
  const lobbyStartHereAnchor = isLobbyRoom ? resolvedHotspots.find((spot) => spot.id === "start-here") : undefined;
  const isPortraitViewport = viewportH >= viewportW;
  const mobileOrientationKey = isPortraitViewport ? "portrait" : "landscape";
  const panContextKey = `${room.slug}:${isMobileViewport ? mobileOrientationKey : "desktop"}`;
  const mobilePan = mobilePanByContext[panContextKey] ?? { x: 0, y: 0 };
  const cardConnectorAnchor = isMobileViewport ? { x: 50, y: 66 } : { x: 23, y: 70 };
  const navCircleClass = "flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/85 bg-black/10 backdrop-blur-sm";
  const navPillClass = "inline-flex h-9 sm:h-7 items-center whitespace-nowrap rounded-full border border-white/85 bg-black/10 px-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/30 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.2)] group-hover:[text-shadow:0_0_12px_rgba(255,255,255,0.52)]";
  const compactHotspotUi = viewportW > 0 && viewportW < 1280;
  const {
    activeBackgroundVideo,
    backgroundImageSrc,
    backgroundObjectPositionY,
    backgroundOffsetY,
    eagerBackgroundLoad,
    sceneScale,
    shouldRenderBackgroundImage,
    shouldRenderImmediateBackgroundFallback,
    shouldRenderStaticBackgroundImage,
    shouldUseNativeBackgroundImage,
    showWebsiteDesignEmbed,
    useContainedBackground,
  } = getRoomSceneBackgroundConfig({
    roomSlug: room.slug,
    backgroundImage: room.backgroundImage,
    backgroundVideo: room.backgroundVideo,
    backgroundVideoMobile: room.backgroundVideoMobile,
    backgroundUsesMobileLayout,
    isMobileViewport,
    isModalOpen,
    exploreOpen,
    tiltEnabled,
    backgroundVideoEnabled,
  });
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
        fitMode
      );
      if (computed) {
        imageMetricsCacheRef.current[metricsCacheKey] = computed;
      }
      return computed;
    },
    [backgroundImageSrc, backgroundUsesMobileLayout, imageNaturalSize, room.slug, sceneScale, useContainedBackground, viewportH, viewportW]
  );
  const requiresMetricBasedHotspots = true;
  const desktopCoverMetrics = useMemo(
    () =>
      !backgroundUsesMobileLayout && imageNaturalSize
        ? getCoverImageMetrics(viewportW, viewportH, imageNaturalSize.w, imageNaturalSize.h, sceneScale, "cover")
        : null,
    [backgroundUsesMobileLayout, imageNaturalSize, sceneScale, viewportH, viewportW]
  );
  const hotspotImageMetrics = isMobileViewport ? mobileImageMetrics : desktopCoverMetrics;
  const lobbyMobileHotspotsReady = !isMobileViewport || !!hotspotImageMetrics;
  const sceneReady =
    hasHydrated && viewportKnown && !!imageNaturalSize && (!requiresMetricBasedHotspots || !!hotspotImageMetrics);
  const hotspotsReady =
    hasHydrated && viewportKnown && (!requiresMetricBasedHotspots || !!hotspotImageMetrics);
  const areHotspotsPositionReady = hotspotsReady;
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

  async function enableTiltPan() {
    if (typeof window === "undefined") return;
    if (!("DeviceOrientationEvent" in window)) {
      setTiltStatus("blocked");
      return;
    }

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEventWithPermission.requestPermission === "function") {
      try {
        const permission = await DeviceOrientationEventWithPermission.requestPermission();
        if (permission !== "granted") {
          setTiltStatus("blocked");
          return;
        }
      } catch {
        setTiltStatus("blocked");
        return;
      }
    }

    tiltBaselineRef.current = null;
    tiltFilteredReadingRef.current = null;
    tiltSignalSeenRef.current = false;
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
    logRoomNav("nav:click", { from: `/rooms/${room.slug}`, to: href, source });
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
        warmRoomAssetsByHref(href);
      }
    });
  }, [exploreArrowHref, explorePrevHref, nextRoomHotspotHref, room.slug, router]);

  useEffect(() => {
    return scheduleIdleWork(() => {
      warmRoomNeighborhoodBySlug(room.slug);
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

  function toggleShowMoreHotspots() {
    if (!isHotspotTierPilotRoom) return;
    const slug = room.slug;
    const next = !(showMoreHotspotsByRoom[slug] ?? false);
    setShowMoreHotspotsByRoom((prev) => ({ ...prev, [slug]: next }));
    if (!hasHydrated || typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(getShowMoreStorageKey(slug), next ? "1" : "0");
    } catch {}
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
  }, [hasHydrated, isHotspotTierPilotRoom, room.slug, showMoreHotspotsByRoom]);

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
      const nextX = prev.x + (target.x - prev.x) * 0.052;
      const nextY = prev.y + (target.y - prev.y) * 0.052;
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
  const canUseTilt = isMobileViewport && tiltEnabled && !isModalOpen && !exploreOpen;
  const shouldProbeTiltSupport = hasHydrated && isMobileViewportRaw;
  const canDesktopCursorPan =
    !lobbyResponsiveIsMobile &&
    room.slug === "lobby" &&
    !isModalOpen &&
    !exploreOpen &&
    !!desktopCoverMetrics &&
    desktopCoverMetrics.maxPanX > 0;
  const rawMaxPanX = mobileImageMetrics?.maxPanX ?? 0;
  const rawMaxPanY = mobileImageMetrics?.maxPanY ?? 0;
  const maxPanX = rawMaxPanX;
  const mobilePanLeftLimit = isLobbyRoom && isMobileViewport ? rawMaxPanX * 1.02 : rawMaxPanX;
  const mobilePanRightLimit = rawMaxPanX;
  const maxPanY = rawMaxPanY;
  const displayedPan = isMobileViewport
    ? {
        x: clamp(mobilePan.x + mobileTiltPan.x, -mobilePanLeftLimit, mobilePanRightLimit),
        y: clamp(mobilePan.y + mobileTiltPan.y, -maxPanY, maxPanY),
      }
    : { x: 0, y: 0 };
  const displayedHotspotPan = isMobileViewport
    ? {
        x: clamp(mobilePan.x + mobileTiltPan.x * 0.82, -mobilePanLeftLimit, mobilePanRightLimit),
        y: clamp(mobilePan.y + mobileTiltPan.y * 0.86, -maxPanY, maxPanY),
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
      warmRoomNeighborhoodBySlug("lobby");
    });
  }, [room.slug, router]);

  useEffect(() => {
    if (!isLiveRoom) return;
    ensureTenTenInstagramPreconnect();
  }, [isLiveRoom]);

  useEffect(() => {
    if (room.slug !== "lobby") return;

    // Keep lobby startup focused on the immediate room neighborhood.
    return scheduleIdleWork(() => {
      getRoomWarmNeighborhoodHrefsBySlug("lobby").forEach((href) => {
        router.prefetch(href);
        warmRoomAssetsByHref(href);
      });
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

    if (room.slug === "lobby") {
      setShowMoreHotspotsByRoom((prev) => ({ ...prev, [room.slug]: false }));
      try {
        window.sessionStorage.removeItem(getShowMoreStorageKey(room.slug));
      } catch {}
      return;
    }

    try {
      const raw = window.sessionStorage.getItem(getShowMoreStorageKey(room.slug));
      if (raw == null) return;
      setShowMoreHotspotsByRoom((prev) => ({ ...prev, [room.slug]: raw === "1" }));
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
    if (!shouldProbeTiltSupport) {
      setTiltAvailable(false);
      setTiltPermissionNeeded(false);
      return;
    }
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    setTiltAvailable(hasDeviceOrientation);
    if (!hasDeviceOrientation) return;

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    setTiltPermissionNeeded(typeof DeviceOrientationEventWithPermission.requestPermission === "function");
  }, [shouldProbeTiltSupport]);

  useEffect(() => {
    if (!canUseTilt) {
      setMobileTiltPan({ x: 0, y: 0 });
      tiltBaselineRef.current = null;
      tiltFilteredReadingRef.current = null;
      tiltSignalSeenRef.current = false;
      tiltPanTargetRef.current = { x: 0, y: 0 };
      if (tiltPanFrameRef.current) {
        window.cancelAnimationFrame(tiltPanFrameRef.current);
        tiltPanFrameRef.current = undefined;
      }
      setTiltStatus((prev) => (prev === "blocked" ? prev : "idle"));
      return;
    }
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;

    tiltSignalSeenRef.current = false;
    setTiltStatus("listening");

    function handleDeviceOrientation(event: DeviceOrientationEvent) {
      if (event.beta == null || event.gamma == null) return;
      tiltSignalSeenRef.current = true;
      setTiltStatus("active");

      const rawReading = { beta: event.beta, gamma: event.gamma };
      const previousFiltered = tiltFilteredReadingRef.current ?? rawReading;
      const nextReading = {
        beta: previousFiltered.beta + (rawReading.beta - previousFiltered.beta) * 0.12,
        gamma: previousFiltered.gamma + (rawReading.gamma - previousFiltered.gamma) * 0.12,
      };
      tiltFilteredReadingRef.current = nextReading;

      if (!tiltBaselineRef.current) {
        tiltBaselineRef.current = nextReading;
      }

      const baseline = tiltBaselineRef.current;
      const deltaGamma = nextReading.gamma - baseline.gamma;
      const deltaBeta = nextReading.beta - baseline.beta;
      const movementDeadzone = { gamma: 1.6, beta: 1.6 };

      if (Math.abs(deltaGamma) < movementDeadzone.gamma && Math.abs(deltaBeta) < movementDeadzone.beta) {
        scheduleTiltPan({ x: 0, y: 0 });
        tiltBaselineRef.current = {
          beta: baseline.beta + (nextReading.beta - baseline.beta) * 0.18,
          gamma: baseline.gamma + (nextReading.gamma - baseline.gamma) * 0.18,
        };
        return;
      }

      const normalizedGamma = clamp(deltaGamma / 14, -1, 1);
      const normalizedBeta = clamp(deltaBeta / 16, -1, 1);
      const gammaWithDeadzone = Math.abs(normalizedGamma) < 0.12 ? 0 : normalizedGamma;
      const betaWithDeadzone = Math.abs(normalizedBeta) < 0.12 ? 0 : normalizedBeta;
      const shapedGamma = Math.sign(gammaWithDeadzone) * Math.pow(Math.abs(gammaWithDeadzone), 1.08);
      const shapedBeta = Math.sign(betaWithDeadzone) * Math.pow(Math.abs(betaWithDeadzone), 1.15);
      const xRange = Math.min(mobilePanLeftLimit, mobilePanRightLimit) * 0.88;
      const yRange = maxPanY * 0.78;
      const nextX = clamp(
        clamp(shapedGamma * xRange, -xRange, xRange),
        -mobilePanLeftLimit - mobilePan.x,
        mobilePanRightLimit - mobilePan.x,
      );
      const nextY = clamp(
        clamp(-shapedBeta * yRange, -yRange, yRange),
        -maxPanY - mobilePan.y,
        maxPanY - mobilePan.y,
      );

      scheduleTiltPan({ x: nextX, y: nextY });
    }

    const blockTimer = window.setTimeout(() => {
      if (!tiltSignalSeenRef.current) {
        setTiltStatus("blocked");
      }
    }, 1500);

    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    window.addEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
    return () => {
      window.clearTimeout(blockTimer);
      window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
      window.removeEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
    };
  }, [canUseTilt, maxPanX, maxPanY, mobilePan.x, mobilePan.y, scheduleTiltPan]);

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
    if (!isMobileViewport || !activeBackgroundVideo) return;
    const video = backgroundVideoRef.current;
    if (!video) return;

    let cancelled = false;
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
  }, [activeBackgroundVideo, backgroundVideoPlaybackRate, isMobileViewport, shouldNativeLoopBackgroundVideo]);

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
    const known = getKnownRoomImageSize(backgroundImageSrc);
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

  // ===== HOTSPOT RENDERERS =====

  function PillHotspotContent(spot: Hotspot) {
    return (
      <RoomPillHotspotContent
        spot={spot}
        roomSlug={room.slug}
        compactHotspotUi={compactHotspotUi}
        isMobileViewport={isMobileViewport}
        clickedHotspotId={clickedHotspotId}
        navCircleClass={navCircleClass}
        navPillClass={navPillClass}
      />
    );
  }

  function DotHotspotContent(spot: Hotspot) {
    return (
      <RoomDotHotspotContent
        spot={spot}
        clickedHotspotId={clickedHotspotId}
        prefersReducedMotion={prefersReducedMotion}
        isOrangeRoom={isOrangeRoom}
        isMobileViewport={isMobileViewport}
        viewportW={viewportW}
        compactHotspotUi={compactHotspotUi}
        roomSlug={room.slug}
        tooltipPosition={tooltipPosition}
        getDotPresentationState={getDotPresentationState}
      />
    );
  }

  return (
    <main
      className={[
        "relative min-h-[100dvh] w-full overflow-hidden bg-black text-white",
        canPanRoom ? "touch-none" : "",
      ].join(" ")}
      onClickCapture={(e) => {
        if (!isMobileViewport) return;
        if (!activeOverviewCard) return;
        if (isModalOpen || exploreOpen) return;
        if (isCardMinimized) return;
        minimizeOverviewCard();
      }}
      onTouchStart={canPanRoom ? ((e) => {
        if (e.touches.length !== 1) return;
        if (isInteractiveTarget(e.target)) return;
        const t = e.touches[0];
        touchPanStartRef.current = {
          x: t.clientX,
          y: t.clientY,
          panX: displayedPan.x,
          panY: displayedPan.y,
          dragging: false,
        };
      }) : undefined}
      onTouchMove={canPanRoom ? ((e) => {
        const start = touchPanStartRef.current;
        if (!start || e.touches.length !== 1) return;
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
      }) : undefined}
      onTouchEnd={canPanRoom ? (() => {
        touchPanStartRef.current = null;
      }) : undefined}
      onTouchCancel={canPanRoom ? (() => {
        touchPanStartRef.current = null;
      }) : undefined}
      onMouseMove={canDesktopCursorPan ? ((e) => {
        if (!desktopCoverMetrics) return;
        const rect = e.currentTarget.getBoundingClientRect();
        if (!rect.width) return;
        const rawNormalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const deadZone = 0.08;
        const normalizedX =
          Math.abs(rawNormalizedX) < deadZone
            ? 0
            : ((Math.abs(rawNormalizedX) - deadZone) / (1 - deadZone)) * Math.sign(rawNormalizedX);
        const edgeWeightedX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), 2);
        // Keep desktop pan slightly inside the true cover-image bounds so the black page background never peeks through.
        const rightPanLimit = desktopCoverMetrics.maxPanX * 0.97;
        const leftPanLimit = rightPanLimit * 1.15;
        const rawTargetX = -edgeWeightedX * desktopCoverMetrics.maxPanX;
        const targetX = clamp(rawTargetX, -rightPanLimit, leftPanLimit);
        scheduleDesktopPan({ x: targetX, y: 0 });
      }) : undefined}
      onMouseLeave={() => {}}
    >
      {/* Background */}
      <div
        data-moving-layer="true"
        className={[
          "absolute inset-0 transition-[filter] duration-300 ease-out",
          !isMobileViewport ? "will-change-transform" : "",
          exploreOpen ? "blur-xl" : "blur-0",
        ].join(" ")}
        style={{
          ...(isMobileViewport
            ? undefined
            : { transform: `translate3d(0, ${backgroundOffsetY}px, 0) scale(${sceneScale})` }),
          ...(shouldRenderImmediateBackgroundFallback
            ? {
                backgroundImage: `url("${backgroundImageSrc}")`,
                backgroundSize: useContainedBackground ? "contain" : "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition:
                  isMarketingRoom && !backgroundUsesMobileLayout
                    ? "50% 42%"
                    : backgroundUsesMobileLayout
                      ? room.slug === "lobby"
                        ? `calc(50% + ${displayedPan.x}px) calc(58% + ${displayedPan.y}px)`
                        : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                      : canDesktopCursorPan
                        ? `calc(50% + ${desktopCursorPan.x}px) ${backgroundObjectPositionY}%`
                        : `50% ${backgroundObjectPositionY}%`,
              }
            : undefined),
        }}
      >
        {useContainedBackground && shouldRenderStaticBackgroundImage ? (
          <NextImage
            src={backgroundImageSrc}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            priority={eagerBackgroundLoad}
            quality={60}
            className={[
              "absolute inset-0 h-full w-full object-cover scale-[1.12] blur-[18px]",
              isLobbyRoom ? "opacity-62" : "opacity-58",
            ].join(" ")}
            style={{ objectPosition: `50% ${backgroundObjectPositionY}%` }}
            draggable={false}
          />
        ) : null}
        {shouldRenderBackgroundImage && shouldUseNativeBackgroundImage ? (
          <img
            src={backgroundImageSrc}
            alt={room.title || room.slug}
            loading={eagerBackgroundLoad ? "eager" : "lazy"}
            fetchPriority={eagerBackgroundLoad ? "high" : "auto"}
            decoding={eagerBackgroundLoad ? "sync" : "async"}
            className={[
              "pointer-events-none absolute inset-0 h-full w-full select-none [-webkit-user-drag:none]",
              isMarketingRoom && backgroundUsesMobileLayout ? "scale-[1.16]" : "",
              useContainedBackground ? "object-contain" : "object-cover",
            ].join(" ")}
            style={{
              objectPosition: isMarketingRoom && !backgroundUsesMobileLayout
                ? "50% 42%"
                : backgroundUsesMobileLayout
                  ? room.slug === "lobby"
                    ? `calc(50% + ${displayedPan.x}px) calc(58% + ${displayedPan.y}px)`
                    : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                  : canDesktopCursorPan
                    ? `calc(50% + ${desktopCursorPan.x}px) ${backgroundObjectPositionY}%`
                    : `50% ${backgroundObjectPositionY}%`,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            onLoad={() => {
              logRoomNav("room:imageLoaded", { slug: room.slug, src: backgroundImageSrc });
            }}
            draggable={false}
          />
        ) : null}
        {shouldRenderBackgroundImage && !shouldUseNativeBackgroundImage ? (
          <NextImage
            src={backgroundImageSrc}
            alt={room.title || room.slug}
            fill
            sizes="100vw"
            priority={eagerBackgroundLoad}
            quality={70}
            className={[
              "pointer-events-none absolute inset-0 h-full w-full select-none [-webkit-user-drag:none]",
              isMarketingRoom && backgroundUsesMobileLayout ? "scale-[1.16]" : "",
              useContainedBackground ? "object-contain" : "object-cover",
            ].join(" ")}
            style={{
              objectPosition: isMarketingRoom && !backgroundUsesMobileLayout
                ? "50% 42%"
                : backgroundUsesMobileLayout
                  ? room.slug === "lobby"
                    ? `calc(50% + ${displayedPan.x}px) calc(58% + ${displayedPan.y}px)`
                    : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                  : canDesktopCursorPan
                    ? `calc(50% + ${desktopCursorPan.x}px) ${backgroundObjectPositionY}%`
                    : `50% ${backgroundObjectPositionY}%`,
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            onLoad={() => {
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
            poster={room.slug === "steeped-dreams-studio" || room.slug === "ten-ten-entertainment" ? backgroundImageSrc : undefined}
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
              video.pause();
              if (Number.isFinite(video.duration) && video.duration > 0) {
                try {
                  video.currentTime = Math.max(0, video.duration - 0.033);
                } catch {}
              }
            }}
            style={
              isMobileViewport
                ? {
                    backgroundColor: room.slug === "ten-ten-entertainment" ? "#000000" : undefined,
                    objectPosition:
                      room.slug === "ten-ten-entertainment"
                        ? `calc(50% + ${displayedPan.x}px) calc(62% + ${displayedPan.y}px)`
                        : `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`,
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }
                : room.slug === "ten-ten-entertainment"
                  ? {
                      backgroundColor: "#000000",
                      objectPosition: compactHotspotUi ? "50% 68%" : "50% 33%",
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
                        objectPosition: `50% ${backgroundObjectPositionY}%`,
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
              title="Website Development Interactive Screen"
              className="h-full w-full border-0"
              loading="eager"
            />
          </div>
        ) : null}
      </div>

      {isMobileViewport && tiltAvailable && !exploreOpen && !isModalOpen ? (
        <div className="absolute bottom-20 right-2 z-50 flex flex-col items-end gap-1.5 md:hidden" data-no-pan>
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
              {tiltPermissionNeeded ? "Enable Tilt" : "Tilt Off"}
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
        {isHotspotTierPilotRoom && !isLobbyRoom ? (
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
            "absolute left-1/2 z-50 -translate-x-1/2 transition-opacity duration-100",
            isMobileViewport ? "hidden" : "top-24 w-[min(calc(100vw-2.5rem),18rem)] px-3",
            exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          ].join(" ")}
          data-no-pan
        >
          {isHotspotTierPilotRoom ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={toggleShowMoreHotspots}
                className="inline-flex min-w-[7.25rem] items-center justify-center rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/88 shadow-[0_6px_14px_rgba(0,0,0,0.1)] backdrop-blur-md transition hover:border-white/28 hover:bg-black/28 hover:text-white"
              >
                {showAllRoomHotspots ? "Hide Rooms" : "Show Rooms"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

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
        resolvedHotspots={resolvedHotspots}
        areHotspotsPositionReady={areHotspotsPositionReady}
        sceneReady={sceneReady}
        isMobileViewport={isMobileViewport}
        isModalOpen={isModalOpen}
        exploreOpen={exploreOpen}
        isLobbyRoom={isLobbyRoom}
        isLobbyExploreHoverOpen={isLobbyExploreHoverOpen}
        isHotspotTierPilotRoom={isHotspotTierPilotRoom}
        showAllRoomHotspots={showAllRoomHotspots}
        showOverviewCard={!!activeOverviewCard}
        isCardCompact={isCardCompact}
        canDesktopCursorPan={canDesktopCursorPan}
        desktopCursorPanX={desktopCursorPan.x}
        hasHydrated={hasHydrated}
        roomSlug={room.slug}
        lobbyResponsiveIsMobile={lobbyResponsiveIsMobile}
        lobbyMobileHotspotsReady={lobbyMobileHotspotsReady}
        suppressLobbyResponsiveUiUntilHydrated={suppressLobbyResponsiveUiUntilHydrated}
        isOrangeRoom={isOrangeRoom}
        orangeSessionPreviewDotId={ORANGE_SESSION_PREVIEW_DOT_ID}
        cardConnectorAnchor={cardConnectorAnchor}
        getMobileHotspotStyle={getMobileHotspotStyle}
        getHotspotAnchorTransform={getHotspotAnchorTransform}
        connectorStyle={connectorStyle}
        renderHotspotContent={(spot) =>
          (spot.variant ?? "pill") === "dot" ? DotHotspotContent(spot) : PillHotspotContent(spot)
        }
        onOpenStartHere={(spot) => {
          if (room.slug === "lobby") {
            lobbyStartHereOpenedRef.current = true;
          }
          if (!spot.modal) return;
          setModalBackModal(null);
          openModal(spot.modal);
        }}
        onOpenExplore={(spot) => {
          triggerHotspotLabelGlow(spot);
          setExploreOpen(true);
        }}
        onOpenModal={(spot) => {
          triggerHotspotLabelGlow(spot);
          setModalBackModal(null);
          if (isOrangeRoom && isMobileViewport && spot.id === ORANGE_SESSION_PREVIEW_DOT_ID) {
            startOrangeMobileSessionAudio();
          }
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
        onOrangePreviewEnter={showOrangeSessionPreview}
        onOrangePreviewLeave={hideOrangeSessionPreview}
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
        activeModal={activeModal}
        closeModal={closeModal}
        openModal={openModal}
        modalBackModal={modalBackModal}
        setModalBackModal={setModalBackModal}
        isStartHereModal={isStartHereModal}
        isOrangeModal={isOrangeModal}
        isQuietModal={isQuietModal}
        isOrangeSessionModalOpen={isOrangeSessionModalOpen}
        isOrangePreviewMuted={isOrangePreviewMuted}
        toggleOrangePreviewMute={toggleOrangePreviewMute}
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
