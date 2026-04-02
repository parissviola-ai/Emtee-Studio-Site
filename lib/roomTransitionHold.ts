"use client";

export const ROOM_TRANSITION_HOLD_START_EVENT = "emtee:room-transition-hold-start";
export const ROOM_HERO_READY_EVENT = "emtee:room-hero-ready";

type RoomTransitionHoldDetail = {
  objectFit: string;
  objectPosition: string;
  sourcePath: string;
  src: string;
  targetPath: string;
  transform?: string;
};

function getTargetPath(href?: string | null) {
  if (!href) return "";
  return href.split("#")[0]?.split("?")[0] ?? "";
}

type StartTransitionHoldOptions = {
  heroSelector: string;
  href?: string | null;
  surfaceSelector?: string;
};

function startTransitionHold({
  heroSelector,
  href,
  surfaceSelector,
}: StartTransitionHoldOptions) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(max-width: 1023px)").matches) return;

  const targetPath = getTargetPath(href);
  if (!targetPath.startsWith("/rooms/")) return;

  const hero = window.document.querySelector<HTMLImageElement>(heroSelector);
  if (!hero) return;

  const src = hero.currentSrc || hero.src;
  if (!src) return;

  const heroStyle = window.getComputedStyle(hero);
  const surface = surfaceSelector ? hero.closest<HTMLElement>(surfaceSelector) : null;
  const surfaceStyle = surface ? window.getComputedStyle(surface) : null;
  const detail: RoomTransitionHoldDetail = {
    objectFit: heroStyle.objectFit || "cover",
    objectPosition: heroStyle.objectPosition || "50% 50%",
    sourcePath: window.location.pathname,
    src,
    targetPath,
  };

  if (surfaceStyle?.transform && surfaceStyle.transform !== "none") {
    detail.transform = surfaceStyle.transform;
  } else if (heroStyle.transform && heroStyle.transform !== "none") {
    detail.transform = heroStyle.transform;
  }

  window.dispatchEvent(new CustomEvent<RoomTransitionHoldDetail>(ROOM_TRANSITION_HOLD_START_EVENT, { detail }));
}

export function startRoomTransitionHold(href?: string | null) {
  startTransitionHold({
    heroSelector: 'img[data-room-foreground-hero="true"]',
    href,
    surfaceSelector: '[data-room-hero-surface="true"]',
  });
}

export function startLandingTransitionHold(href?: string | null) {
  startTransitionHold({
    heroSelector: 'img[data-landing-hero="true"]',
    href,
  });
}

export function dispatchRoomHeroReady(path?: string | null) {
  if (typeof window === "undefined" || !path) return;
  window.dispatchEvent(new CustomEvent(ROOM_HERO_READY_EVENT, { detail: { path } }));
}
