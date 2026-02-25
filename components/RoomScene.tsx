"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { getResourceContext } from "@/data/resource-context";

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  positions?: Partial<Record<"mobile" | "tablet" | "laptop" | "desktop", { x: number; y: number }>>;
  allowLargeResponsiveShift?: boolean;
  hidden?: boolean;
  href?: string;

  action?: "explore";
  direction?: "left" | "right" | "up" | "down";

  variant?: "pill" | "dot"; // default pill

  modal?: {
    title: string;
    body: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    links?: Array<{ label: string; href: string }>;
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
  hotspots: Hotspot[];
};

type InfoCard = {
  title: string;
  body: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  socialLinks?: Array<{ label: string; href: string }>;
};

const EXPLORE_ROOMS = [
  { label: "Request A Consultation", href: "/consultation" },
  { label: "Labels and Partners", href: "/labels-partners" },
  { label: "Lobby", href: "/rooms/front" },
  { label: "Board Room", href: "/rooms/EMTEEBusinessDept" },
  { label: "Studio", href: "/rooms/EMTEEMusicDept" },
  { label: "Media Room", href: "/rooms/EMTEEMarketingDept" },
  { label: "Yanchan Produced", href: "/rooms/orange" },
  { label: "Publishing and Distro", href: "/rooms/EMTEEPublishingandDistroDept" },
  { label: "The Strategy Suite", href: "/rooms/EMTEEARSalesDept" },
  { label: "Ten Ten Entertainment", href: "/rooms/live" },
  { label: "Steeped Dreams Studio", href: "/rooms/quiet" },
];

const BANK_VAULT_OVERVIEW_CARD: InfoCard = {
  title: "A&R / Sales Department Overview",
  body:
    "This room is a representation of EMTEE's A&R / Sales department. Core scope includes audience strategizing, community building, and revenue development so creative momentum turns into commercial momentum.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Request a Consultation",
  primaryHref: "/consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "A&R / Sales",
};

const STUDIO_OVERVIEW_CARD: InfoCard = {
  title: "Music Department Overview",
  body:
    "This room is a representation of EMTEE's Music department. Core scope includes studio sessions, custom production, and mixing/mastering so artists move from creative direction to release-ready execution.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Request a Consultation",
  primaryHref: "/consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "Music Department",
};

const MEDIA_OVERVIEW_CARD: InfoCard = {
  title: "Marketing Department Overview",
  body:
    "This room is a representation of EMTEE's Marketing department. Core scope includes content production, brand deck/media kits, and set/tour development to drive campaign clarity and repeatable audience growth.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Request a Consultation",
  primaryHref: "/consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "Marketing Department",
};

const BOARDROOM_OVERVIEW_CARD: InfoCard = {
  title: "Business Department Overview",
  body:
    "This room is a representation of EMTEE's Business department. Core scope includes accounting system setup, grant writing, and vision building so artists can operate with structure and long-term decision clarity.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Request a Consultation",
  primaryHref: "/consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "Business Department",
};


const ARTISTS_OVERVIEW_CARD: InfoCard = {
  title: "Distribution / Publishing Department Overview",
  body:
    "This room is a representation of EMTEE's Distribution / Publishing department. Core scope includes publishing workshops, catalog organization, and television/film sync preparation for cleaner release operations and stronger long-term rights monetization.\n\nExplore the room dots to view each package lane and what support is included.",
  primaryCta: "Request a Consultation",
  primaryHref: "/consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "Distribution / Publishing",
};

const WEBSITE_DESIGN_OVERVIEW_CARD: InfoCard = {
  title: "Website Design Overview",
  body:
    "This room is a representation of EMTEE's Website Design lane. Core scope includes clarifying your artist story, structuring your digital home, and building a site fans, media, and bookers can actually use.\n\nExplore the room dots to view process and package options.",
  primaryCta: "Request a Consultation",
  primaryHref: "/website-design-consultation",
  secondaryCta: "Resource Packages",
  secondaryHref: "/connect",
  eyebrow: "Website Design",
};

const PREVIOUS_ROOM_LINKS: Record<string, { href: string; label: string }> = {
  EMTEEBusinessDept: { href: "/rooms/front", label: "Back to Lobby" },
  EMTEEMusicDept: { href: "/rooms/EMTEEBusinessDept", label: "Back to Board Room" },
  EMTEEMarketingDept: { href: "/rooms/EMTEEMusicDept", label: "Back to Studio" },
  EMTEEPublishingandDistroDept: { href: "/rooms/EMTEEMarketingDept", label: "Back to Media Room" },
  EMTEEARSalesDept: { href: "/rooms/EMTEEPublishingandDistroDept", label: "Back to Publishing and Distro" },
  quiet: { href: "/rooms/EMTEEARSalesDept", label: "Back to The Strategy Suite" },
  orange: { href: "/rooms/quiet", label: "Back to Steeped Dreams Studio" },
  live: { href: "/rooms/orange", label: "Back to Orange Room" },
};
const ORANGE_SESSION_PREVIEW_DOT_ID = "apply-orange-room-session";

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

function clampHotspotShift(
  base: { x: number; y: number },
  override: { x: number; y: number },
  maxShift: number
) {
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  return {
    x: clamp(override.x, base.x - maxShift, base.x + maxShift),
    y: clamp(override.y, base.y - maxShift, base.y + maxShift),
  };
}

function getCoverImageMetrics(
  viewportW: number,
  viewportH: number,
  naturalW: number,
  naturalH: number,
  scale = 1
) {
  if (!viewportW || !viewportH || !naturalW || !naturalH) {
    return null;
  }

  const coverScale = Math.max(viewportW / naturalW, viewportH / naturalH);
  const renderedW = naturalW * coverScale * scale;
  const renderedH = naturalH * coverScale * scale;
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

export default function RoomScene({ room }: { room: Room }) {
  const router = useRouter();
  const isLiveRoom = room.slug === "live";
  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [exploreOpen, setExploreOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<Hotspot["modal"] | null>(null);
  const [modalBackModal, setModalBackModal] = useState<Hotspot["modal"] | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [minimizedByRoom, setMinimizedByRoom] = useState<Record<string, boolean>>({});
  const [contentVisibleByRoom, setContentVisibleByRoom] = useState<Record<string, boolean>>({});
  const [clickedHotspotIdByRoom, setClickedHotspotIdByRoom] = useState<Record<string, string | null>>({});
  const [isOrangePreviewMuted, setIsOrangePreviewMuted] = useState(false);
  const [isOrangePreviewMinimized, setIsOrangePreviewMinimized] = useState(false);
  const [isOrangeSessionPreviewVisible, setIsOrangeSessionPreviewVisible] = useState(false);
  const [isOrangeMobileSessionAudioActive, setIsOrangeMobileSessionAudioActive] = useState(false);
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
  const [imageNaturalSize, setImageNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const orangePreviewVideoRef = useRef<HTMLVideoElement | null>(null);
  const orangeMobileAudioRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const orangePreviewHideTimerRef = useRef<number | undefined>(undefined);

  // video audio state
  const [videoMuted, setVideoMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  function openModal(modal: Hotspot["modal"]) {
    setActiveModal(modal);
    setRevealStep(0);
    setVideoMuted(true);

    requestAnimationFrame(() => setRevealStep(1));
    setTimeout(() => setRevealStep(2), 140);
    setTimeout(() => setRevealStep(3), 280);
  }

  function closeModal() {
    setActiveModal(null);
    setModalBackModal(null);
    setRevealStep(0);
    setVideoMuted(true);
  }

  // YouTube IFrame Player API (postMessage) unmute
  function unmuteYoutube() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    win.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*");
    win.postMessage(JSON.stringify({ event: "command", func: "setVolume", args: [100] }), "*");
    win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
  }

  const forcePlayOrangePreviewWithSound = useCallback(() => {
    const video = orangePreviewVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.defaultMuted = false;
    video.removeAttribute("muted");
    video.volume = Math.max(video.volume, 0.2);
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    requestAnimationFrame(() => {
      video.muted = false;
      video.defaultMuted = false;
      video.removeAttribute("muted");
    });
    setIsOrangePreviewMuted(false);
  }, []);

  const startOrangeMobileSessionAudio = useCallback(() => {
    const video = orangeMobileAudioRef.current;
    if (!video) return;
    video.muted = false;
    video.defaultMuted = false;
    video.removeAttribute("muted");
    video.volume = Math.max(video.volume, 0.2);
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    setIsOrangePreviewMuted(false);
    setIsOrangeMobileSessionAudioActive(true);
  }, []);

  const showOrangeSessionPreview = useCallback(() => {
    if (orangePreviewHideTimerRef.current !== undefined) {
      window.clearTimeout(orangePreviewHideTimerRef.current);
      orangePreviewHideTimerRef.current = undefined;
    }
    setIsOrangeSessionPreviewVisible(true);
  }, []);

  const hideOrangeSessionPreview = useCallback(() => {
    if (orangePreviewHideTimerRef.current !== undefined) {
      window.clearTimeout(orangePreviewHideTimerRef.current);
    }
    orangePreviewHideTimerRef.current = window.setTimeout(() => {
      setIsOrangeSessionPreviewVisible(false);
      orangePreviewHideTimerRef.current = undefined;
    }, 140);
  }, []);

  const isModalOpen = !!activeModal;
  const showVaultCards = room.slug === "EMTEEARSalesDept";
  const showStudioCard = room.slug === "EMTEEMusicDept";
  const showMediaCard = room.slug === "EMTEEMarketingDept";
  const showBoardRoomCard = room.slug === "EMTEEBusinessDept";
  const showArtistsCard = room.slug === "EMTEEPublishingandDistroDept";
  const showWebsiteDesignCard = room.slug === "EMTEEWebDesign";
  const showOrangeCard = room.slug === "orange";
  const isMarketingRoom = room.slug === "EMTEEMarketingDept";
  const isWebsiteDesignRoom = room.slug === "EMTEEWebDesign";
  const isOrangeRoom = room.slug === "orange";
  const activeOverviewCard = showVaultCards
    ? BANK_VAULT_OVERVIEW_CARD
    : showStudioCard
      ? STUDIO_OVERVIEW_CARD
      : showMediaCard
        ? MEDIA_OVERVIEW_CARD
        : showBoardRoomCard
          ? BOARDROOM_OVERVIEW_CARD
        : showArtistsCard
          ? ARTISTS_OVERVIEW_CARD
        : showWebsiteDesignCard
          ? WEBSITE_DESIGN_OVERVIEW_CARD
          : null;
  const previousRoomLink = PREVIOUS_ROOM_LINKS[room.slug];
  const [mobilePanByContext, setMobilePanByContext] = useState<Record<string, { x: number; y: number }>>({});
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
  const prefersReducedMotion = hasHydrated ? prefersReducedMotionRaw : false;
  const viewportKey = hasHydrated ? viewportKeyRaw : "0x0";
  const isCardMinimized = minimizedByRoom[room.slug] ?? false;
  const isCardContentVisible = contentVisibleByRoom[room.slug] ?? true;
  const isCardCompact = isCardMinimized || !isCardContentVisible;
  const isYoutubeEmbed = !!activeModal?.videoEmbed?.includes("youtube.com/embed");
  const isYanchanMusicModal = activeModal?.title === "Yanchan Produced Music";
  const isYanchanDiscographyModal = activeModal?.title === "Yanchan Produced Discography";
  const isJoinCommunityModal = activeModal?.title === "Join Community";
  const isCustomProductionModal = activeModal?.title === "Apply For Custom Production";
  const isLivePackagesModal = room.slug === "live" && activeModal?.title === "Packages";
  const isWebsiteDesignMainModal =
    room.slug === "EMTEEMarketingDept" && activeModal?.title === "Website Design";
  const isPackageGridModal = isLivePackagesModal || isWebsiteDesignMainModal;
  const isLivePackageDetailModal =
    room.slug === "live" &&
    (
      activeModal?.title === "Up & Coming Artist Package" ||
      activeModal?.title === "Rising Star Showcase Package" ||
      activeModal?.title === "Ten Ten Community"
    );
  const isOrangeModal = isOrangeRoom && !!activeModal;
  const isOrangeSessionModalOpen = isOrangeRoom && activeModal?.title === "Apply For An Orange Room Session";
  const shouldShowOrangeSessionPreview = isOrangeRoom && !isMobileViewport && (isOrangeSessionPreviewVisible || isOrangeSessionModalOpen);
  const activeResourceContext = activeModal ? getResourceContext(activeModal.title) : null;
  const isQuietModal = room.slug === "quiet" && !!activeModal;
  const [viewportW, viewportH] = viewportKey.split("x").map((n) => Number(n) || 0);
  const hotspotBreakpoint = getHotspotBreakpoint(viewportW);
  const resolvedHotspots = useMemo(
    () =>
      room.hotspots.map((spot) => {
        const override = spot.positions?.[hotspotBreakpoint];
        const baseResolved =
          !override
            ? { x: spot.x, y: spot.y }
            : spot.allowLargeResponsiveShift
              ? { x: override.x, y: override.y }
              : clampHotspotShift({ x: spot.x, y: spot.y }, override, 0);
        const mobileBoardroomDotOffset =
          room.slug === "EMTEEBusinessDept" && hotspotBreakpoint === "mobile" && spot.variant === "dot" ? -1 : 0;
        const nonMobileBoardroomBusinessOpsYOffset =
          room.slug === "EMTEEBusinessDept" && hotspotBreakpoint !== "mobile" && spot.id === "business-operations-set-up" ? 1 : 0;
        const websiteDesignEnterSiteMobilePosition =
          room.slug === "EMTEEWebDesign" && hotspotBreakpoint === "mobile" && spot.id === "website-design-enter-website"
            ? { x: 65, y: 67 }
            : null;
        const mobileArSalesCrmSetUpDirection =
          room.slug === "EMTEEARSalesDept" && hotspotBreakpoint === "mobile" && spot.id === "ar-sales-crm-set-up"
            ? "left"
            : spot.direction;
        return {
          ...spot,
          x: websiteDesignEnterSiteMobilePosition?.x ?? baseResolved.x,
          y:
            websiteDesignEnterSiteMobilePosition?.y ??
            (baseResolved.y + mobileBoardroomDotOffset + nonMobileBoardroomBusinessOpsYOffset),
          direction: mobileArSalesCrmSetUpDirection,
        };
      }),
    [hotspotBreakpoint, room.hotspots, room.slug]
  );
  const isPortraitViewport = viewportH >= viewportW;
  const mobileOrientationKey = isPortraitViewport ? "portrait" : "landscape";
  const panContextKey = `${room.slug}:${isMobileViewport ? mobileOrientationKey : "desktop"}`;
  const mobilePan = mobilePanByContext[panContextKey] ?? { x: 0, y: 0 };
  const cardConnectorAnchor = isMobileViewport ? { x: 50, y: 66 } : { x: 23, y: 70 };
  const connectableDots = resolvedHotspots.filter((spot) => spot.variant === "dot");
  const showDotConnectors =
    hasHydrated &&
    !!activeOverviewCard &&
    connectableDots.length > 0 &&
    !isModalOpen &&
    !exploreOpen &&
    !isCardCompact &&
    !isMobileViewport;
  const navCircleClass = "flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/85 bg-black/10 backdrop-blur-sm";
  const navPillClass = "inline-flex h-9 sm:h-7 items-center whitespace-nowrap rounded-full border border-white/85 bg-black/10 px-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/30 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.2)] group-hover:[text-shadow:0_0_12px_rgba(255,255,255,0.52)]";
  const compactHotspotUi = viewportW > 0 && viewportW < 1280;
  const eagerBackgroundLoad = room.slug === "front" || room.slug === "live";
  const mobileSceneScale = 1;
  const desktopSceneScale = room.slug === "EMTEEWebDesign" ? 1 : 1.06;
  const sceneScale = isMobileViewport ? mobileSceneScale : desktopSceneScale;
  const backgroundObjectPositionY =
    room.slug === "EMTEEWebDesign" ? 60 : room.slug === "EMTEEARSalesDept" ? 64 : 50;
  const backgroundOffsetY = room.slug === "EMTEEARSalesDept" ? 43 : 0;
  const backgroundImageSrc =
    isWebsiteDesignRoom && isMobileViewport ? "/rooms/websitess-mobile-v2-opt.jpg" : room.backgroundImage;
  const showWebsiteDesignEmbed =
    isWebsiteDesignRoom && !isMobileViewport && !isModalOpen && !exploreOpen;
  const parsedModalBody = useMemo(
    () => (activeModal ? parseIncludesFromModalBody(activeModal.body) : { before: "", includes: [] as string[], after: "" }),
    [activeModal]
  );
  const mobileImageMetrics = useMemo(
    () =>
      isMobileViewport && imageNaturalSize
        ? getCoverImageMetrics(viewportW, viewportH, imageNaturalSize.w, imageNaturalSize.h, sceneScale)
        : null,
    [imageNaturalSize, isMobileViewport, sceneScale, viewportH, viewportW]
  );

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  const clickedHotspotId = clickedHotspotIdByRoom[room.slug] ?? null;

  const prefetchExploreRoute = useCallback((href: string) => {
    if (prefetchedExploreRoutesRef.current.has(href)) return;
    prefetchedExploreRoutesRef.current.add(href);
    router.prefetch(href);
  }, [router]);

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

  function isInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof Element)) return false;
    return !!target.closest("a,button,input,textarea,select,iframe,[data-no-pan]");
  }

  const canPanRoom = isMobileViewport && !isModalOpen && !exploreOpen;
  const rawMaxPanX = mobileImageMetrics?.maxPanX ?? 0;
  const rawMaxPanY = mobileImageMetrics?.maxPanY ?? 0;
  const maxPanX = rawMaxPanX;
  const maxPanY = rawMaxPanY;
  const displayedPan = isMobileViewport
    ? {
        x: clamp(mobilePan.x, -maxPanX, maxPanX),
        y: clamp(mobilePan.y, -maxPanY, maxPanY),
      }
    : mobilePan;

  function getMobileHotspotStyle(spot: Hotspot) {
    const shiftConversationBlueprintRight =
      room.slug === "EMTEEARSalesDept" && spot.id === "ar-sales-conversion-blueprint";
    const shiftLivePackagesDown =
      room.slug === "live" &&
      (spot.id === "up-and-coming-artist-package" ||
        spot.id === "rising-star-showcase-package" ||
        spot.id === "live-packages");

    if (isMobileViewport && spot.id === "next-room") {
      return {
        right: "1rem",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      };
    }
    if (!isMobileViewport || !mobileImageMetrics) {
      return {
        left: shiftConversationBlueprintRight
          ? `calc(${spot.x}% + 2in)`
          : `${spot.x}%`,
        top: shiftLivePackagesDown ? `calc(${spot.y}% + 3in)` : `${spot.y}%`,
      };
    }
    const left = mobileImageMetrics.offsetX + (spot.x / 100) * mobileImageMetrics.renderedW + displayedPan.x;
    const top = mobileImageMetrics.offsetY + (spot.y / 100) * mobileImageMetrics.renderedH + displayedPan.y;
    return {
      left: shiftConversationBlueprintRight
        ? `calc(${left}px + 2in)`
        : `${left}px`,
      top: shiftLivePackagesDown ? `calc(${top}px + 3in)` : `${top}px`,
    };
  }

  useEffect(() => {
    const timers = cardToggleTimerRef.current;
    const clickedHotspotTimer = clickedHotspotTimerRef.current;
    const panFrame = panFrameRef.current;
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
    };
  }, []);

  useEffect(() => {
    if (room.slug === "front") return;

    // Warm route + key lobby asset so "Back to Lobby" feels snappier.
    router.prefetch("/rooms/front");
    const lobbyImg = new Image();
    lobbyImg.src = "/rooms/lobby-opt.jpg";
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
    if (room.slug !== "front") return;

    // Keep lobby startup light: warm only top two next-click routes.
    ["/rooms/EMTEEBusinessDept", "/rooms/EMTEEMusicDept"].forEach((href) => {
      router.prefetch(href);
    });
  }, [room.slug, router]);

  useEffect(() => {
    if (!isOrangeRoom) return;
    const video = orangePreviewVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.defaultMuted = false;
    video.removeAttribute("muted");
    video.pause();
    setIsOrangePreviewMuted(false);
  }, [isOrangeRoom]);

  useEffect(() => {
    if (isOrangeRoom) return;
    setIsOrangeSessionPreviewVisible(false);
  }, [isOrangeRoom]);

  useEffect(() => {
    if (isOrangeSessionModalOpen) return;
    setIsOrangeSessionPreviewVisible(false);
  }, [isOrangeSessionModalOpen]);

  useEffect(() => {
    return () => {
      if (orangePreviewHideTimerRef.current !== undefined) {
        window.clearTimeout(orangePreviewHideTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = orangePreviewVideoRef.current;
    if (!video) return;
    if (!shouldShowOrangeSessionPreview) {
      video.pause();
      return;
    }
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [shouldShowOrangeSessionPreview]);

  useEffect(() => {
    if (!isOrangeRoom || !isMobileViewport) return;
    const video = orangeMobileAudioRef.current;
    if (!video) return;

    video.muted = isOrangePreviewMuted;
    video.defaultMuted = isOrangePreviewMuted;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
  }, [isOrangeRoom, isMobileViewport, isOrangePreviewMuted]);

  useEffect(() => {
    if (!isMobileViewport) return;
    if (isOrangeSessionModalOpen) return;
    const video = orangeMobileAudioRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "true");
    setIsOrangePreviewMuted(true);
    setIsOrangeMobileSessionAudioActive(false);
  }, [isMobileViewport, isOrangeSessionModalOpen]);

  useEffect(() => {
    if (!isMobileViewport || !room.backgroundVideo) return;
    const video = backgroundVideoRef.current;
    if (!video) return;

    let cancelled = false;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("autoplay", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.load();

    const tryPlay = () => {
      if (cancelled) return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    const retryInterval = window.setInterval(() => {
      if (video.paused && !cancelled) tryPlay();
    }, 800);
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
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
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("pageshow", handleVisibilityOrFocus);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [isMobileViewport, room.backgroundVideo, room.slug]);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => {
      const w = probe.naturalWidth || probe.width;
      const h = probe.naturalHeight || probe.height;
      if (!w || !h) return;
      setImageNaturalSize({ w, h });
    };
    probe.src = backgroundImageSrc;
  }, [backgroundImageSrc]);

  useEffect(() => {
    if (room.slug !== "EMTEEWebDesign" && room.slug !== "EMTEEPublishingandDistroDept") return;
    router.prefetch("/website-design-consultation");
  }, [room.slug, router]);

  // ===== HOTSPOT RENDERERS =====

  function PillHotspotContent(spot: Hotspot) {
    const isNavigationSpot = spot.id === "next-room";
    const isMobileNavigationSpot = isNavigationSpot && isMobileViewport;
    const isClickedLabelVisible = clickedHotspotId === spot.id && !isNavigationSpot;
    const isLobbyPill = room.slug === "front" && !isNavigationSpot;
    const isExpanded = true;
    const isWhoWeArePin = room.slug === "front" && spot.id === "About";
    return (
      <span className={["group inline-flex items-center", isMobileNavigationSpot ? "flex-row-reverse" : ""].join(" ")}>
        {/* Circle */}
        <span
          className={[
            isNavigationSpot
              ? `relative ${navCircleClass}`
              : [
                  "relative flex items-center justify-center rounded-full border bg-black/10 backdrop-blur-sm",
                  compactHotspotUi ? "h-7 w-7 sm:h-6 sm:w-6" : "h-8 w-8 sm:h-7 sm:w-7",
                ].join(" "),
            isWhoWeArePin
              ? "border-[#d6ae66]/90 shadow-[0_0_0_2px_rgba(214,174,102,0.28),0_0_22px_rgba(214,174,102,0.6)]"
              : "border-white/85",
          ].join(" ")}
        >
          {isWhoWeArePin ? (
            <span
              className={[
                "pointer-events-none absolute -inset-2 rounded-full border border-[#d6ae66]/65",
                prefersReducedMotion ? "" : "animate-ping",
              ].join(" ")}
            />
          ) : null}
          <span className="text-xs leading-none">{getArrow(spot.direction)}</span>
        </span>

        {/* Label */}
        <span className={`${isMobileNavigationSpot ? "mr-2" : "ml-2"} ${isNavigationSpot ? navPillClass : "overflow-hidden rounded-full border border-white/85 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 ease-out"} ${
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
            isClickedLabelVisible ? "[text-shadow:0_0_12px_rgba(255,255,255,0.55)]" : ""
          }`}>
            {spot.label}
          </span>
        </span>
      </span>
    );
  }

  function DotHotspotContent(spot: Hotspot) {
    const isClickedLabelVisible = clickedHotspotId === spot.id;
    const isOrangeSessionDot = spot.id === "orange-room-sessions";
    const isMediaRoom = room.slug === "EMTEEMarketingDept";
    const isLobbyDot = room.slug === "front";
    const isLiveRoomSocialDot =
      room.slug === "live" &&
      (spot.id === "mike-cannz-youtube" || spot.id === "mike-cannz-spotify");
    const liveRoomSocialLabel =
      spot.id === "mike-cannz-youtube"
        ? "YouTube"
        : spot.id === "mike-cannz-spotify"
          ? "Spotify"
          : null;
    const isLobbyWhitePulseDot = isLobbyDot && (spot.id === "departments" || spot.id === "how-you-start");
    const dotSize = isMobileViewport ? 8 : compactHotspotUi ? 9 : 10;
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
      room.slug === "quiet" &&
      (spot.id === "kym-tea-music" ||
        spot.id === "eight-d-mixes" ||
        spot.id === "steeped-dreams-studio" ||
        spot.id === "chill-out-community");
    const isWebsiteDesignEnterDot =
      room.slug === "EMTEEWebDesign" && spot.id === "website-design-enter-website";
    const dotBase = isOrangeRoom
      ? "rounded-full bg-[#ff9f3f] shadow-[0_0_0_2px_rgba(255,159,63,0.35),0_0_22px_rgba(255,159,63,0.7)]"
      : isWebsiteDesignEnterDot
        ? "rounded-full bg-[#d6ae66] shadow-[0_0_0_2px_rgba(214,174,102,0.45),0_0_24px_rgba(214,174,102,0.8)]"
        : isMediaRoom
        ? "rounded-full bg-zinc-800 shadow-[0_0_0_2px_rgba(39,39,42,0.48),0_0_18px_rgba(39,39,42,0.42)]"
        : "rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_0_18px_rgba(255,255,255,0.55)]";
    const haloBase = isOrangeRoom
      ? "bg-[#ff9f3f]/35"
      : isWebsiteDesignEnterDot
        ? "bg-[#d6ae66]/40"
      : isMediaRoom
          ? "bg-zinc-800/35"
          : "bg-white/20";
    const ringBase = isOrangeRoom
      ? "border-[#ff9f3f]/70"
      : isWebsiteDesignEnterDot
          ? "border-[#d6ae66]/85"
      : isMediaRoom
          ? "border-zinc-800/65"
          : "border-white/45";

    if (isLiveRoomSocialDot && liveRoomSocialLabel) {
      const isYoutube = liveRoomSocialLabel === "YouTube";
      return (
        <span className="group relative inline-flex items-center">
          <span
            className={[
              "relative inline-flex items-center justify-center gap-2 rounded-full px-2.5 py-1.5 text-white",
              "border border-white/22 bg-black/42 backdrop-blur-sm",
              "drop-shadow-[0_0_14px_rgba(255,255,255,0.6)] transition-transform duration-200 group-hover:scale-105",
              isYoutube ? "pr-3" : "pr-2.5",
            ].join(" ")}
          >
            {isYoutube ? (
              <span className="inline-flex h-5 w-7 items-center justify-center rounded-[6px] bg-[#FF0033]">
                <span className="ml-0.5 h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white" />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center text-[#1ED760]">
                <SocialIcon label="Spotify" className="h-5 w-5" />
              </span>
            )}
            <span
              className={[
                "font-semibold tracking-tight text-white",
                isMobileViewport ? "text-[13px]" : compactHotspotUi ? "text-[15px]" : "text-[17px]",
              ].join(" ")}
            >
              {liveRoomSocialLabel}
            </span>
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
            "relative",
            dotBase,
            isOrangeSessionDot && !prefersReducedMotion ? "animate-[softPulse_1.35s_ease-in-out_infinite]" : "",
          ].join(" ")}
          style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
        >
          {/* Soft halo */}
          <span className={["pointer-events-none absolute -inset-2 rounded-full blur-md", haloBase].join(" ")} />

          {/* Pulse ring (subtle) */}
          <span
            className={[
              "pointer-events-none absolute rounded-full border-2",
              "-inset-4 animate-[ping_1.55s_cubic-bezier(0,0,0.2,1)_infinite]",
              prefersReducedMotion ? "animate-none" : "",
              isOrangeSessionDot
                ? (
                    isOrangeRoom
                      ? "border-[#ff9f3f]/85"
                      : isMediaRoom
                          ? "border-zinc-800/85"
                          : "border-white/70"
                  )
                : isLobbyDot
                  ? isLobbyWhitePulseDot
                    ? ringBase
                    : "border-[#d6ae66]/95 shadow-[0_0_26px_rgba(214,174,102,0.72)]"
                  : ringBase,
            ].join(" ")}
          />
          {isLobbyDot && !isLobbyWhitePulseDot ? (
            <span
              className={[
                "pointer-events-none absolute -inset-5 rounded-full border-2",
                "border-[#d6ae66]/72",
                "animate-[ping_2.15s_cubic-bezier(0,0,0.2,1)_infinite]",
                "shadow-[0_0_34px_rgba(214,174,102,0.5)]",
                prefersReducedMotion ? "animate-none" : "[animation-delay:320ms]",
              ].join(" ")}
            />
          ) : null}
        </span>

        {/* Dot label */}
        <span
          className={[
            "absolute z-50",
            tooltipPosition(resolvedTooltipDirection, spot.x, spot.y, isMobileViewport, viewportW),
            customTooltipOffsetClass,
            isChillOutCommunityDot
              ? "whitespace-pre-line break-words md:whitespace-pre-line rounded-full leading-tight"
              : "whitespace-normal break-words md:whitespace-nowrap rounded-full leading-tight",
            "border border-white/18 bg-black/55 backdrop-blur-xl",
            "px-2.5 py-1 font-semibold text-white/85 sm:px-3 sm:py-1.5 md:px-3.5",
            "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            "pointer-events-auto cursor-pointer",
            "opacity-100 translate-y-0",
            "transition-all duration-200",
            isQuietAccentDot
              ? "border-emerald-200/35 bg-emerald-300/12 text-emerald-50 shadow-[0_0_0_1px_rgba(110,231,183,0.22),0_14px_40px_rgba(0,0,0,0.52),0_0_22px_rgba(16,185,129,0.26)] group-hover:border-emerald-200/55 group-hover:bg-emerald-300/18 group-hover:text-white group-hover:[text-shadow:0_0_10px_rgba(110,231,183,0.58)] group-hover:shadow-[0_0_0_1px_rgba(110,231,183,0.28),0_14px_40px_rgba(0,0,0,0.52),0_0_24px_rgba(16,185,129,0.34)]"
              : "group-hover:border-white/40 group-hover:bg-black/72 group-hover:text-white group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.48)] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_14px_40px_rgba(0,0,0,0.52),0_0_22px_rgba(255,255,255,0.16)]",
            isClickedLabelVisible
              ? "pointer-events-auto cursor-pointer opacity-100 translate-y-0 border-white/45 bg-black/75 text-white [text-shadow:0_0_12px_rgba(255,255,255,0.52)] shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_44px_rgba(0,0,0,0.55),0_0_24px_rgba(255,255,255,0.18)]"
              : "",
          ].join(" ")}
          style={{ maxWidth: `${dotLabelMaxWidth}px`, fontSize: dotLabelFontSize }}
        >
          {spot.label}
        </span>
      </span>
    );
  }

  return (
    <main
      className={[
        "relative min-h-[100dvh] w-full overflow-hidden bg-black text-white",
        canPanRoom ? "touch-none" : "",
      ].join(" ")}
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
        const nextX = clamp(start.panX + dx * 0.7, -maxPanX, maxPanX);
        const nextY = clamp(start.panY + dy * 0.58, -maxPanY, maxPanY);
        scheduleMobilePan({ x: nextX, y: nextY });
      }}
      onTouchEnd={() => {
        touchPanStartRef.current = null;
      }}
      onTouchCancel={() => {
        touchPanStartRef.current = null;
      }}
    >
      {/* Background */}
      <div
        data-moving-layer="true"
        className={[
          "absolute inset-0 transition-[filter] duration-300 ease-out",
          !isMobileViewport ? "will-change-transform" : "",
          exploreOpen ? "blur-xl" : "blur-0",
        ].join(" ")}
        style={
          isMobileViewport
            ? undefined
            : { transform: `translate3d(${displayedPan.x}px, ${displayedPan.y + backgroundOffsetY}px, 0) scale(${sceneScale})` }
        }
      >
        <NextImage
          src={backgroundImageSrc}
          alt={room.title || room.slug}
          fill
          sizes="100vw"
          priority={eagerBackgroundLoad}
          quality={70}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: isMarketingRoom && !isMobileViewport
              ? "50% 42%"
              : isMobileViewport
                ? `calc(50% + ${displayedPan.x}px) calc(${backgroundObjectPositionY}% + ${displayedPan.y}px)`
                : `50% ${backgroundObjectPositionY}%`,
          }}
          draggable={false}
        />
        {room.backgroundVideo ? (
          <video
            ref={backgroundVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload={isLiveRoom ? "auto" : "metadata"}
            style={
              isMobileViewport
                ? { objectPosition: `calc(50% + ${displayedPan.x}px) calc(50% + ${displayedPan.y}px)` }
                : undefined
            }
          >
            <source src={room.backgroundVideo} type="video/mp4" />
          </video>
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

      {shouldShowOrangeSessionPreview ? (
        <div
          className="absolute left-12 bottom-24 z-50 hidden items-end gap-3 md:flex"
          data-no-pan
          onMouseEnter={showOrangeSessionPreview}
          onMouseLeave={hideOrangeSessionPreview}
        >
          <div
            className={[
              "relative overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-[width,height] duration-300 ease-out",
              isOrangePreviewMinimized ? "h-12 w-12" : "h-[411px] w-[232px]",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setIsOrangePreviewMinimized((v) => !v)}
              className={[
                "absolute z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/65 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80",
                isOrangePreviewMinimized ? "left-2 top-2" : "right-2 top-2",
              ].join(" ")}
              aria-label={isOrangePreviewMinimized ? "Maximize preview video" : "Minimize preview video"}
            >
              {isOrangePreviewMinimized ? ">" : "<"}
            </button>
            <video
              ref={orangePreviewVideoRef}
              className={[
                "orange-preview-video absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200",
                isOrangePreviewMinimized ? "pointer-events-none opacity-0" : "opacity-100",
              ].join(" ")}
              loop
              muted={isOrangePreviewMuted}
              playsInline
              controls
              controlsList="nofullscreen noremoteplayback nodownload"
              disablePictureInPicture
              preload="none"
              poster="/rooms/yanchanbiopic-opt.jpg"
              onVolumeChange={(e) => {
                setIsOrangePreviewMuted(e.currentTarget.muted);
              }}
              onLoadedMetadata={(e) => {
                e.currentTarget.volume = 0.2;
              }}
              onClick={(e) => {
                e.preventDefault();
                forcePlayOrangePreviewWithSound();
              }}
            >
              <source src="/rooms/yanchanvibes.mp4" type="video/mp4" />
            </video>
            {!isOrangePreviewMinimized ? (
              <a
                href="https://www.instagram.com/p/DTac5MCDsVx/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 z-20 inline-flex items-center justify-center rounded-full border border-white/30 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80"
              >
                Open Instagram
              </a>
            ) : null}
            {!isOrangePreviewMinimized ? (
              <button
                type="button"
                onClick={() => {
                  if (isOrangePreviewMuted) {
                    forcePlayOrangePreviewWithSound();
                    return;
                  }
                  const video = orangePreviewVideoRef.current;
                  if (!video) return;
                  video.muted = true;
                  video.defaultMuted = true;
                  video.setAttribute("muted", "true");
                  setIsOrangePreviewMuted(true);
                }}
                className="absolute bottom-3 right-3 z-20 inline-flex items-center justify-center rounded-full border border-white/30 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80"
              >
                {isOrangePreviewMuted ? "Unmute" : "Mute"}
              </button>
            ) : null}
          </div>
          {isOrangePreviewMinimized ? (
            <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-white/25 bg-black/25 shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
              <NextImage
                src="/case-studies/yanchan.png"
                alt="Yanchan"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {isOrangeRoom && isMobileViewport ? (
        <div className="absolute bottom-20 left-2 z-50 flex flex-col items-start gap-2 md:hidden" data-no-pan>
          <video
            ref={orangeMobileAudioRef}
            className="hidden"
            loop
            muted={isOrangePreviewMuted}
            playsInline
            preload="none"
            onLoadedMetadata={(e) => {
              e.currentTarget.volume = 0.2;
            }}
          >
            <source src="/rooms/yanchanvibes.mp4" type="video/mp4" />
          </video>
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/25 bg-black/25 shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
            <NextImage
              src="/case-studies/yanchan.png"
              alt="Yanchan"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          {isOrangeMobileSessionAudioActive ? (
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isOrangePreviewMuted;
                const video = orangeMobileAudioRef.current;
                if (video) {
                  video.muted = nextMuted;
                  if (!nextMuted) {
                    video.volume = Math.max(video.volume, 0.2);
                    const playPromise = video.play();
                    if (playPromise && typeof playPromise.catch === "function") {
                      playPromise.catch(() => {});
                    }
                  }
                }
                setIsOrangePreviewMuted(nextMuted);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/65 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80"
              aria-label={isOrangePreviewMuted ? "Unmute music" : "Mute music"}
            >
              <span>{isOrangePreviewMuted ? "Unmute Music" : "Mute Music"}</span>
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Room label */}
      <div className="absolute left-6 top-28 z-50">
        <div className="flex items-center gap-2">
          <div className="text-xs tracking-widest text-white/60">ROOM</div>
        </div>
        <div className="mt-1 flex items-center gap-3">
          <div
            className={[
              "text-3xl font-semibold",
              room.slug === "orange"
                ? "text-[#ff9f3f] [text-shadow:0_0_10px_rgba(255,159,63,0.75),0_0_24px_rgba(255,159,63,0.45)]"
                : "",
            ].join(" ")}
          >
            {room.title || "Lobby"}
          </div>
          {previousRoomLink ? (
            <Link
              href={previousRoomLink.href}
              className="group inline-flex items-center"
            >
              <span className={navCircleClass}>
                <span className="text-xs leading-none">←</span>
              </span>
              <span className={`ml-2 ${navPillClass}`}>
                {previousRoomLink.label}
              </span>
            </Link>
          ) : null}
        </div>
      </div>

      {showDotConnectors && (
        <div className="pointer-events-none absolute inset-0 z-[35]">
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
      {activeOverviewCard && (
        <div
          className={[
            "absolute z-40 overflow-hidden origin-right transition-[width] duration-300 ease-out",
            showOrangeCard
                ? "bottom-32 left-4 md:bottom-24"
              : showStudioCard && isMobileViewport
                ? "bottom-32 left-4 md:bottom-28"
              : "bottom-52 left-4 md:bottom-28",
            isCardMinimized
              ? "w-12"
              : showOrangeCard
                ? "w-[min(84vw,340px)]"
                : "w-[min(94vw,420px)]",
            isModalOpen || exploreOpen
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100",
          ].join(" ")}
        >
          <div
            className={[
              "relative rounded-2xl border border-white/15 bg-black/45 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
              isCardCompact
                ? "h-12 p-2"
                : showOrangeCard
                  ? "p-4"
                  : "p-5",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => {
                const slug = room.slug;
                const isMin = minimizedByRoom[slug] ?? false;
                const pending = cardToggleTimerRef.current[slug];
                if (pending) window.clearTimeout(pending);

                if (isMin) {
                  // Open: widen first, then reveal content.
                  setMinimizedByRoom((prev) => ({ ...prev, [slug]: false }));
                  cardToggleTimerRef.current[slug] = window.setTimeout(() => {
                    setContentVisibleByRoom((prev) => ({ ...prev, [slug]: true }));
                  }, 240);
                } else {
                  // Close: hide content first, then collapse width.
                  setContentVisibleByRoom((prev) => ({ ...prev, [slug]: false }));
                  cardToggleTimerRef.current[slug] = window.setTimeout(() => {
                    setMinimizedByRoom((prev) => ({ ...prev, [slug]: true }));
                  }, 16);
                }
              }}
              aria-label={isCardMinimized ? "Expand overview card" : "Minimize overview card"}
              className={[
                "absolute inline-flex items-center justify-center rounded-full overflow-visible",
                "border border-white/35 bg-white/12 text-xs font-semibold text-white",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.32),0_0_34px_rgba(255,255,255,0.18)]",
                "transition hover:bg-white/24 hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.28),0_0_22px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.24)]",
                isCardCompact ? "right-2 top-2 h-8 w-8" : "right-3 top-3 h-8 w-8",
              ].join(" ")}
            >
              <span
                className={[
                  "pointer-events-none absolute -inset-1 rounded-full border border-white/35",
                  prefersReducedMotion ? "opacity-70" : "animate-[softPulse_1.8s_ease-in-out_infinite]",
                ].join(" ")}
              />
              {isCardMinimized ? ">" : "<"}
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
                <p
                  className={[
                    "mt-3 text-sm leading-relaxed text-white/75",
                    "",
                  ].join(" ")}
                >
                  {activeOverviewCard.body}
                </p>
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
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-8" />
            )}
          </div>
        </div>
      )}

      {/* Hotspots */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={isMobileViewport ? undefined : { transform: `translate3d(${displayedPan.x}px, ${displayedPan.y}px, 0)` }}
      >
        {resolvedHotspots.map((spot) => {
          if (spot.hidden) return null;
          const isMobileNextRoomPin = isMobileViewport && spot.id === "next-room";
          const sharedClassName = [
            isMobileNextRoomPin
              ? "absolute z-40 transition-opacity duration-200"
              : "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200",
            isModalOpen || exploreOpen
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100",
          ].join(" ");

          const sharedStyle = getMobileHotspotStyle(spot);

          const variant = spot.variant ?? "pill";
          const content =
            variant === "dot" ? DotHotspotContent(spot) : PillHotspotContent(spot);

          // Action hotspot (opens Explore panel)
          if (spot.action === "explore") {
            return (
              <button
                key={spot.id}
                type="button"
                className={sharedClassName}
                style={sharedStyle}
                onClick={() => {
                  triggerHotspotLabelGlow(spot);
                  setExploreOpen(true);
                }}
              >
                {content}
              </button>
            );
          }

          // Modal hotspot
          if (spot.modal) {
            return (
              <button
                key={spot.id}
                type="button"
                className={sharedClassName}
                style={sharedStyle}
                onMouseEnter={
                  isOrangeRoom && spot.id === ORANGE_SESSION_PREVIEW_DOT_ID
                    ? showOrangeSessionPreview
                    : undefined
                }
                onMouseLeave={
                  isOrangeRoom && spot.id === ORANGE_SESSION_PREVIEW_DOT_ID
                    ? hideOrangeSessionPreview
                    : undefined
                }
                onClick={() => {
                  triggerHotspotLabelGlow(spot);
                  setModalBackModal(null);
                  if (isOrangeRoom && isMobileViewport && spot.id === ORANGE_SESSION_PREVIEW_DOT_ID) {
                    startOrangeMobileSessionAudio();
                  }
                  openModal(spot.modal!);
                }}
              >
                {content}
              </button>
            );
          }

          // Link hotspot
          if (!spot.href) {
            return (
              <div key={spot.id} className={sharedClassName} style={sharedStyle}>
                {content}
              </div>
            );
          }

          if (spot.href.startsWith("http")) {
            return (
              <a
                key={spot.id}
                href={spot.href}
                target="_blank"
                rel="noopener noreferrer"
                className={sharedClassName}
                style={sharedStyle}
                onClick={() => {
                  triggerHotspotLabelGlow(spot);
                }}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={spot.id}
              href={spot.href}
              className={sharedClassName}
              style={sharedStyle}
              onClick={() => {
                triggerHotspotLabelGlow(spot);
              }}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* Bottom Explore bar */}
      {isMobileViewport ? (
        <div className="absolute bottom-6 left-6 z-50">
          <button
            type="button"
            aria-label="Open Explore menu"
            onClick={openExploreMenu}
            data-no-pan
            className="inline-flex h-12 w-12 touch-manipulation select-none items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-xl transition hover:bg-black/60"
          >
            <span className="text-white/85">⌕</span>
          </button>
        </div>
      ) : (
        <div className="absolute bottom-6 left-6 right-6 z-40">
          <button
            type="button"
            onClick={openExploreMenu}
            data-no-pan
            className="flex w-full touch-manipulation select-none items-center gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-left backdrop-blur-xl transition hover:bg-black/45"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30">
              <span className="text-white/80">⌕</span>
            </span>

            <div className="flex-1">
              <div className="text-sm font-semibold text-white/90">Explore</div>
              <div className="text-xs text-white/60">Open navigation</div>
            </div>

            <span className="text-white/70">→</span>
          </button>
        </div>
      )}

      {/* Explore overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-200",
          exploreOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close Explore"
          className="absolute inset-0 bg-black/40"
          onClick={() => setExploreOpen(false)}
        />

        <div className="absolute left-0 top-0 h-full w-[340px] max-w-[85vw] border-r border-white/10 bg-black/45 backdrop-blur-2xl p-8 pt-[max(2rem,env(safe-area-inset-top))]">
          <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between">
            <div className="text-[11px] font-medium tracking-[0.28em] uppercase text-white/55">
              Explore
            </div>

            <button
              type="button"
              onClick={() => setExploreOpen(false)}
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/75 hover:text-white transition"
            >
              Close
            </button>
          </div>

          <div className="mt-10 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-2 pb-[calc(env(safe-area-inset-bottom)+7.5rem)]">
            {EXPLORE_ROOMS.map((item) => {
              const isApply = item.label.toLowerCase().includes("apply");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setExploreOpen(false)}
                  onMouseEnter={() => prefetchExploreRoute(item.href)}
                  onFocus={() => prefetchExploreRoute(item.href)}
                  onTouchStart={() => prefetchExploreRoute(item.href)}
                  className={
                    isApply
                      ? `
                        mb-6 inline-flex items-center justify-center gap-2
                        rounded-full
                        border border-white/20
                        bg-white/10
                        px-5 py-2.5
                        text-sm font-semibold text-white/90
                        backdrop-blur-xl
                        shadow-lg shadow-black/25
                        transition
                        hover:border-white/35 hover:bg-white/15
                      `
                      : `
                        group relative block
                        py-1.5
                        text-[22px] leading-snug
                        font-medium
                        tracking-tight
                        text-white/65
                        transition
                        hover:text-white
                      `
                  }
                >
                  {isApply ? (
                    <>
                      <span>{item.label}</span>
                      <span className="text-white/75">→</span>
                    </>
                  ) : (
                    <>
                      <span
                        className="
                          pointer-events-none absolute left-0 top-1/2 h-[1px] w-0
                          -translate-y-1/2 bg-white/35
                          transition-all duration-300
                          group-hover:w-6
                        "
                      />
                      <span className="pl-0 group-hover:pl-8 transition-all duration-300">
                        {item.label}
                      </span>
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 shrink-0">
            <NextImage
              src="/Logo2.png"
              alt="EMTEE logo"
              width={96}
              height={32}
              className="h-6 w-auto object-contain opacity-55 md:h-8"
            />
          </div>
          </div>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {activeModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom)+1rem)] md:items-center md:p-6 pointer-events-auto">
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeModal}
            className="absolute inset-0 bg-black/60"
          />

          <div
            className={[
              "relative z-10 my-2 flex w-full max-w-[900px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:my-0 md:max-h-[85svh]",
              isOrangeModal
                ? "border border-orange-300/28 bg-[linear-gradient(160deg,rgba(15,10,6,0.9),rgba(10,8,6,0.86))] shadow-[0_0_0_1px_rgba(251,191,118,0.12),0_30px_80px_rgba(0,0,0,0.62)]"
                : "border border-white/15 bg-black/55",
            ].join(" ")}
          >
            <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 w-full">
                <h2
                  className={[
                    "text-2xl font-semibold tracking-wide whitespace-pre-line transition-all duration-700 ease-out",
                    isOrangeModal ? "text-[#ffd9ab] [text-shadow:0_0_20px_rgba(251,191,118,0.28)]" : "",
                    revealStep >= 1
                      ? "opacity-100 translate-y-0 drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                      : "opacity-0 translate-y-2",
                  ].join(" ")}
                >
                  {activeModal.title.split("\n").map((line, index, lines) => (
                    <Fragment key={`${line}-${index}`}>
                      {line}
                      {index < lines.length - 1 ? <br /> : null}
                    </Fragment>
                  ))}
                </h2>

                {activeModal.videoEmbed && (
                  <div
                    className={[
                      "mt-6 flex justify-center transition-all duration-700 ease-out",
                      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                  >
                    <div className="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                      <div className="relative aspect-video">
                        <iframe
                          ref={iframeRef}
                          src={activeModal.videoEmbed}
                          title={activeModal.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

                        {isYoutubeEmbed && videoMuted && (
                          <button
                            type="button"
                            onClick={() => {
                              setVideoMuted(false);
                              unmuteYoutube();
                            }}
                            className="
                              absolute bottom-3 right-3
                              rounded-full
                              border border-white/25
                              bg-black/50
                              px-3 py-1.5
                              text-xs font-medium
                              text-white/85
                              backdrop-blur-md
                              transition
                              hover:bg-black/65
                              hover:text-white
                            "
                          >
                            🔇 Sound off · Click to unmute
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeModal.image && isYanchanMusicModal ? (
                  <div
                    className={[
                      "mt-6 transition-all duration-700 ease-out",
                      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                  >
                    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                      <NextImage
                        src={activeModal.image}
                        alt={activeModal.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        className="object-contain"
                        style={{ objectPosition: "center -60px" }}
                      />
                    </div>
                  </div>
                ) : null}
                {activeModal.image && isJoinCommunityModal ? (
                  <div
                    className={[
                      "mt-6 transition-all duration-700 ease-out",
                      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                  >
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                      <NextImage
                        src={activeModal.image}
                        alt={activeModal.title}
                        width={1200}
                        height={840}
                        sizes="(max-width: 900px) 100vw, 900px"
                        className="w-full max-h-[420px] object-contain"
                      />
                    </div>
                  </div>
                ) : null}

                <div
                  className={[
                    "mt-4 grid gap-5",
                    activeResourceContext ? "md:grid-cols-[minmax(0,1fr)_420px] md:items-start" : "",
                  ].join(" ")}
                >
                  <div className="min-w-0">
                    <p
                      className={[
                        "leading-relaxed whitespace-pre-line transition-all duration-600 ease-out",
                        isOrangeModal ? "text-white/88" : "text-white/80",
                        revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                      ].join(" ")}
                    >
                      {activeResourceContext ? parsedModalBody.before : renderModalBodyWithBoldIncludes(activeModal.body)}
                    </p>

                    {activeResourceContext ? (
                      <div
                        className={[
                          "mt-6 space-y-4 transition-all duration-700 ease-out",
                          revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "text-[12px] font-semibold uppercase tracking-[0.2em]",
                            isOrangeModal ? "text-orange-200/90" : "text-orange-300/90",
                          ].join(" ")}
                        >
                          Includes:
                        </div>
                        <ul className={["mt-2 space-y-1.5 text-sm", isOrangeModal ? "text-white/90" : "text-white/84"].join(" ")}>
                          {(parsedModalBody.includes.length ? parsedModalBody.includes : activeModal.highlights ?? []).map((item) => (
                            <li key={item} className="flex gap-2 leading-relaxed">
                              <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {parsedModalBody.after ? (
                          <p className={["leading-relaxed whitespace-pre-line", isOrangeModal ? "text-white/88" : "text-white/80"].join(" ")}>
                            {parsedModalBody.after}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {!activeResourceContext && activeModal.highlights?.length ? (
                      <div
                        className={[
                          "mt-6 space-y-4 rounded-2xl p-4 transition-all duration-700 ease-out",
                          isOrangeModal
                            ? "border border-orange-200/20 bg-gradient-to-b from-[#2a1b10]/78 to-[#130d08]/72"
                            : "border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                          revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                        ].join(" ")}
                      >
                        <div>
                          <div
                            className={[
                              "text-[12px] font-semibold uppercase tracking-[0.2em]",
                              isOrangeModal ? "text-orange-200/90" : "text-orange-300/90",
                            ].join(" ")}
                          >
                            {activeModal.highlightsTitle ?? "Package Includes"}
                          </div>
                        </div>
                        <ul className={isLivePackageDetailModal ? "mt-2 space-y-1.5 text-sm text-white/84" : "grid gap-2 sm:grid-cols-2"}>
                          {activeModal.highlights.map((item) => {
                            const parts = item.split("::");
                            const isFeaturedMilestone = parts.length === 2 && parts[0] === "FEATURE";
                            const label = isFeaturedMilestone ? parts[1] : item;
                            return (
                              <li
                                key={item}
                                className={[
                                  isLivePackageDetailModal
                                    ? "flex gap-2 leading-relaxed"
                                    : "group rounded-xl px-3 py-2 text-sm leading-relaxed shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition",
                                  isLivePackageDetailModal
                                    ? ""
                                    : isOrangeModal
                                      ? "border border-orange-200/18 bg-black/35 text-white/90 hover:border-orange-200/42 hover:bg-[#1a120b]"
                                      : "border border-white/10 bg-black/35 text-white/84 hover:border-orange-300/40 hover:bg-black/45",
                                  !isLivePackageDetailModal && isYanchanDiscographyModal && isFeaturedMilestone
                                    ? "sm:col-span-2 border-orange-200/46 bg-gradient-to-r from-[#3a2414]/90 to-[#1e140d]/90 shadow-[0_0_0_1px_rgba(251,191,118,0.2),0_14px_30px_rgba(0,0,0,0.38)]"
                                    : "",
                                ].join(" ")}
                              >
                                {isYanchanDiscographyModal && isFeaturedMilestone ? (
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full border border-[#f7c48a]/45 bg-[#f7c48a]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffe6c6]">
                                      JUNO Nominated
                                    </span>
                                    <span className="text-white">{label}</span>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                                    <span>{label}</span>
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {activeResourceContext ? (
                    <aside
                      className={[
                        "rounded-2xl border px-4 py-3 transition-all duration-700 ease-out md:sticky md:top-28",
                        "border-white/45 bg-white/[0.08]",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_0_10px_rgba(255,255,255,0.16),0_12px_24px_rgba(0,0,0,0.24)]",
                        revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                      ].join(" ")}
                    >
                      <div>
                        <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.35)]">
                          What It Is
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/88">{activeResourceContext.what}</p>
                      </div>
                      <div className="mt-3">
                        <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.35)]">
                          Why It Matters for Artists
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/88">{activeResourceContext.why}</p>
                      </div>
                    </aside>
                  ) : null}
                </div>

                {activeModal.image && !isYanchanMusicModal && !isJoinCommunityModal && (
  <div
    className={[
      "mt-8",
      "transition-all duration-700 ease-out",
      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
    ].join(" ")}
  >
    <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
      <NextImage
        src={activeModal.image}
        alt={activeModal.title}
        width={1200}
        height={840}
        sizes="(max-width: 900px) 100vw, 900px"
        className="w-full max-h-[420px] object-contain"
      />
    </div>
  </div>
)}
              </div>
            </div>

            </div>

            <div
              className={[
                isPackageGridModal
                  ? "shrink-0 grid w-full gap-3 px-6 pb-6 sm:grid-cols-2 transition-all duration-600 ease-out"
                  : "shrink-0 flex flex-wrap items-center gap-3 px-6 pb-6 transition-all duration-600 ease-out",
                revealStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              ].join(" ")}
            >
              {isCustomProductionModal && activeModal.primaryHref ? (
                activeModal.primaryHref.startsWith("http") ? (
                  <a
                    href={activeModal.primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-[#f7c48a]/45 bg-[#f7c48a]/18 text-white shadow-[0_0_0_1px_rgba(247,196,138,0.22),0_10px_24px_rgba(0,0,0,0.36)] hover:bg-[#f7c48a]/28"
                        : "bg-white text-black hover:bg-white/90",
                    ].join(" ")}
                  >
                    {activeModal.primaryLabel ?? "View Details"} →
                  </a>
                ) : (
                  <Link
                    href={activeModal.primaryHref}
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-[#f7c48a]/45 bg-[#f7c48a]/18 text-white shadow-[0_0_0_1px_rgba(247,196,138,0.22),0_10px_24px_rgba(0,0,0,0.36)] hover:bg-[#f7c48a]/28"
                        : "bg-white text-black hover:bg-white/90",
                    ].join(" ")}
                  >
                    {activeModal.primaryLabel ?? "View Details"} →
                  </Link>
                )
              ) : null}
              {activeModal.links?.length
                ? activeModal.links.map((link) => {
                    const modalLinkId = link.href.startsWith("modal:") ? link.href.slice(6) : null;
                    if (modalLinkId) {
                      const targetSpot = room.hotspots.find((spot) => spot.id === modalLinkId);
                      if (!targetSpot?.modal) return null;
                      return (
                        <button
                          key={`${link.label}-${link.href}`}
                          type="button"
                          aria-label={link.label}
                          title={link.label}
                          onClick={() => {
                            setModalBackModal(activeModal);
                            openModal(targetSpot.modal!);
                          }}
                          className={
                            isPackageGridModal
                              ? isWebsiteDesignMainModal
                                ? "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-[#d6ae66] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-[#d6ae66]/55 hover:bg-black/45 hover:text-[#f7deb0]"
                                : "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-white/84 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-orange-300/40 hover:bg-black/45 hover:text-white"
                              : isYanchanMusicModal
                              ? isOrangeModal
                                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200/28 bg-black/35 text-orange-100/90 transition hover:border-orange-200/45 hover:bg-black/55 hover:text-white"
                                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
                              : isQuietModal
                                ? "inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
                              : "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white"
                          }
                        >
                          {isYanchanMusicModal ? <SocialIcon label={link.label} /> : `${link.label} →`}
                        </button>
                      );
                    }
                    return (
                      <a
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className={
                          isPackageGridModal
                            ? isWebsiteDesignMainModal
                              ? "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-[#d6ae66] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-[#d6ae66]/55 hover:bg-black/45 hover:text-[#f7deb0]"
                              : "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-white/84 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-orange-300/40 hover:bg-black/45 hover:text-white"
                            : isYanchanMusicModal
                            ? isOrangeModal
                              ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200/28 bg-black/35 text-orange-100/90 transition hover:border-orange-200/45 hover:bg-black/55 hover:text-white"
                              : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
                            : isQuietModal
                              ? "inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
                            : "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white"
                        }
                      >
                        {isYanchanMusicModal ? <SocialIcon label={link.label} /> : `${link.label} →`}
                      </a>
                    );
                  })
                : null}
              {!isCustomProductionModal && activeModal.primaryHref && (
                activeModal.primaryHref.startsWith("http") ? (
                  <a
                    href={activeModal.primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-[#f7c48a]/45 bg-[#f7c48a]/18 text-white shadow-[0_0_0_1px_rgba(247,196,138,0.22),0_10px_24px_rgba(0,0,0,0.36)] hover:bg-[#f7c48a]/28"
                        : "bg-white text-black hover:bg-white/90",
                    ].join(" ")}
                  >
                    {activeModal.primaryLabel ?? "View Details"} →
                  </a>
                ) : (
                  <Link
                    href={activeModal.primaryHref}
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-[#f7c48a]/45 bg-[#f7c48a]/18 text-white shadow-[0_0_0_1px_rgba(247,196,138,0.22),0_10px_24px_rgba(0,0,0,0.36)] hover:bg-[#f7c48a]/28"
                        : "bg-white text-black hover:bg-white/90",
                    ].join(" ")}
                  >
                    {activeModal.primaryLabel ?? "View Details"} →
                  </Link>
                )
              )}
              {activeModal.secondaryHref && activeModal.secondaryLabel ? (
                activeModal.secondaryHref.startsWith("http") ? (
                  <a
                    href={activeModal.secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-orange-200/28 bg-black/35 text-orange-100/90 hover:border-orange-200/45 hover:bg-black/55"
                        : "border border-white/25 bg-white/10 text-white/90 hover:bg-white/18 hover:text-white",
                    ].join(" ")}
                  >
                    {activeModal.secondaryLabel} →
                  </a>
                ) : (
                  <Link
                    href={activeModal.secondaryHref}
                    onClick={closeModal}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                      isOrangeModal
                        ? "border border-orange-200/28 bg-black/35 text-orange-100/90 hover:border-orange-200/45 hover:bg-black/55"
                        : "border border-white/25 bg-white/10 text-white/90 hover:bg-white/18 hover:text-white",
                    ].join(" ")}
                  >
                    {activeModal.secondaryLabel} →
                  </Link>
                )
              ) : null}

              <button
                type="button"
                onClick={() => {
                  if (modalBackModal) {
                    const backModal = modalBackModal;
                    setModalBackModal(null);
                    openModal(backModal);
                    return;
                  }
                  closeModal();
                }}
                className={[
                  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                  isOrangeModal
                    ? "border border-orange-200/24 bg-black/30 text-orange-50/88 hover:border-orange-200/42 hover:bg-black/50"
                    : isQuietModal
                      ? "border border-emerald-200/32 bg-emerald-300/10 text-emerald-50/90 hover:border-emerald-200/55 hover:bg-emerald-300/18"
                    : "border border-white/20 bg-white/10 text-white/85 hover:bg-white/15 hover:text-white",
                ].join(" ")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
