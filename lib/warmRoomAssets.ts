"use client";

import { rooms } from "@/data/rooms";

const warmedImages = new Set<string>();
const warmedVideos = new Set<string>();
const imageReadyPromises = new Map<string, Promise<void>>();
const videoReadyPromises = new Map<string, Promise<void>>();
const roomWarmTimestamps = new Map<string, number>();

const ROOM_NAVIGATION_WAIT_TIMEOUT_MS = 2200;
const ROOM_WARM_DEDUP_MS = 4000;
const AGGRESSIVE_VIDEO_WARM_SLUGS = new Set(["steeped-dreams-studio"]);
const AGGRESSIVE_IMAGE_WARM_SLUGS = new Set(["lobby", "business"]);

export const ROOM_FLOW_SLUGS = [
  "lobby",
  "business",
  "music",
  "marketing",
  "ar-sales",
  "publishing-distribution",
  "dirty-elephant-studio",
  "ten-ten-entertainment",
  "steeped-dreams-studio",
] as const;

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

function waitWithTimeout(promise: Promise<void>, timeoutMs: number) {
  return Promise.race<void>([
    promise,
    new Promise((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    }),
  ]);
}

function waitForImageReady(src: string) {
  if (typeof window === "undefined") return Promise.resolve();
  const existingPromise = imageReadyPromises.get(src);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;

    if (img.complete) {
      if (typeof img.decode === "function") {
        void img.decode().catch(() => {}).finally(finish);
      } else {
        finish();
      }
    }
  });

  imageReadyPromises.set(src, promise);
  return promise;
}

function waitForVideoReady(src: string, options?: { aggressive?: boolean }) {
  if (typeof document === "undefined") return Promise.resolve();
  const cacheKey = `${src}:${options?.aggressive ? "aggressive" : "default"}`;
  const existingPromise = videoReadyPromises.get(cacheKey);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve) => {
    const video = document.createElement("video");
    const finish = () => {
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("canplay", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.preload = options?.aggressive ? "auto" : "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("canplay", finish, { once: true });
    if (options?.aggressive) {
      video.addEventListener("canplaythrough", finish, { once: true });
    }
    video.addEventListener("error", finish, { once: true });
    void video.load();
  });

  videoReadyPromises.set(cacheKey, promise);
  return promise;
}

export function warmImageAsset(src?: string | null) {
  if (!src || warmedImages.has(src) || typeof window === "undefined") return;
  warmedImages.add(src);
  logRoomNav("warmImageAsset:start", { src });
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

export function warmVideoAsset(src?: string | null, options?: { aggressive?: boolean }) {
  if (!src || warmedVideos.has(src) || typeof document === "undefined") return;
  warmedVideos.add(src);
  logRoomNav("warmVideoAsset:start", { src, aggressive: !!options?.aggressive });
  const video = document.createElement("video");
  video.preload = options?.aggressive ? "auto" : "metadata";
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  void video.load();
}

function getRoomBySlug(slug?: string | null) {
  if (!slug) return null;
  return rooms.find((entry) => entry.slug === slug) ?? null;
}

function shouldSkipRoomWarm(slug: string) {
  if (typeof performance === "undefined") return false;
  const lastWarm = roomWarmTimestamps.get(slug);
  const now = performance.now();
  if (lastWarm && now - lastWarm < ROOM_WARM_DEDUP_MS) {
    return true;
  }
  roomWarmTimestamps.set(slug, now);
  return false;
}

function getRoomHref(slug: string) {
  return `/rooms/${slug}`;
}

export function getRoomWarmNeighborhoodBySlug(slug?: string | null) {
  if (!slug) return [];
  const flowIndex = ROOM_FLOW_SLUGS.indexOf(slug as (typeof ROOM_FLOW_SLUGS)[number]);
  if (flowIndex < 0) return [slug];

  const neighborhood = new Set<string>([
    slug,
    ROOM_FLOW_SLUGS[(flowIndex - 1 + ROOM_FLOW_SLUGS.length) % ROOM_FLOW_SLUGS.length],
    ROOM_FLOW_SLUGS[(flowIndex + 1) % ROOM_FLOW_SLUGS.length],
  ]);

  const nextRoom = getRoomBySlug(ROOM_FLOW_SLUGS[(flowIndex + 1) % ROOM_FLOW_SLUGS.length]);
  if (nextRoom?.backgroundVideo || nextRoom?.backgroundVideoMobile) {
    neighborhood.add(ROOM_FLOW_SLUGS[(flowIndex + 2) % ROOM_FLOW_SLUGS.length]);
  }

  return Array.from(neighborhood);
}

export function getRoomWarmNeighborhoodHrefsBySlug(slug?: string | null) {
  return getRoomWarmNeighborhoodBySlug(slug).map(getRoomHref);
}

export function warmRoomAssetsBySlug(slug?: string | null, options?: { force?: boolean }) {
  if (!slug) return;
  const room = getRoomBySlug(slug);
  if (!room) return;
  if (!options?.force && shouldSkipRoomWarm(slug)) return;
  const useAggressiveVideoWarm = AGGRESSIVE_VIDEO_WARM_SLUGS.has(slug);
  const useAggressiveImageWarm = AGGRESSIVE_IMAGE_WARM_SLUGS.has(slug);
  logRoomNav("warmRoomAssets:start", {
    slug,
    backgroundImage: room.backgroundImage ?? null,
    backgroundVideo: room.backgroundVideo ?? null,
    backgroundVideoMobile: room.backgroundVideoMobile ?? null,
    aggressiveImageWarm: useAggressiveImageWarm,
    aggressiveVideoWarm: useAggressiveVideoWarm,
  });
  warmImageAsset(room.backgroundImage);
  if (useAggressiveImageWarm && room.backgroundImage) {
    void waitForImageReady(room.backgroundImage);
  }
  warmVideoAsset(room.backgroundVideo, { aggressive: useAggressiveVideoWarm });
  warmVideoAsset(room.backgroundVideoMobile, { aggressive: useAggressiveVideoWarm });
}

export function warmRoomAssetsByHref(href?: string | null) {
  if (!href?.startsWith("/rooms/")) return;
  const slug = href.replace("/rooms/", "").split("?")[0];
  warmRoomAssetsBySlug(slug);
}

export function warmRoomNeighborhoodBySlug(slug?: string | null) {
  const neighborhood = getRoomWarmNeighborhoodBySlug(slug);
  neighborhood.forEach((neighborSlug) => warmRoomAssetsBySlug(neighborSlug));
}

export async function awaitRoomAssetsBySlug(slug?: string | null) {
  if (!slug || typeof window === "undefined") return;
  const room = getRoomBySlug(slug);
  if (!room) return;

  const useAggressiveVideoWarm = AGGRESSIVE_VIDEO_WARM_SLUGS.has(slug);
  const useAggressiveImageWarm = AGGRESSIVE_IMAGE_WARM_SLUGS.has(slug);
  const timeoutMs = useAggressiveVideoWarm || useAggressiveImageWarm ? 3200 : ROOM_NAVIGATION_WAIT_TIMEOUT_MS;
  logRoomNav("awaitRoomAssets:start", { slug });
  warmRoomAssetsBySlug(slug, { force: true });

  const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
  const activeVideo =
    isMobileViewport && room.backgroundVideoMobile ? room.backgroundVideoMobile : room.backgroundVideo;

  if (activeVideo) {
    await waitWithTimeout(waitForVideoReady(activeVideo, { aggressive: useAggressiveVideoWarm }), timeoutMs);
    logRoomNav("awaitRoomAssets:ready", { slug, assetType: "video", src: activeVideo });
    return;
  }

  if (room.backgroundImage) {
    await waitWithTimeout(waitForImageReady(room.backgroundImage), timeoutMs);
    logRoomNav("awaitRoomAssets:ready", { slug, assetType: "image", src: room.backgroundImage });
  }
}

export function awaitRoomAssetsByHref(href?: string | null) {
  if (!href?.startsWith("/rooms/")) return Promise.resolve();
  const slug = href.replace("/rooms/", "").split("?")[0];
  return awaitRoomAssetsBySlug(slug);
}
