"use client";

import { rooms } from "@/data/rooms";

const warmedImages = new Set<string>();
const warmedVideos = new Set<string>();
const imageReadyPromises = new Map<string, Promise<void>>();
const videoReadyPromises = new Map<string, Promise<void>>();

const ROOM_NAVIGATION_WAIT_TIMEOUT_MS = 2200;

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

function waitForVideoReady(src: string) {
  if (typeof document === "undefined") return Promise.resolve();
  const existingPromise = videoReadyPromises.get(src);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve) => {
    const video = document.createElement("video");
    const finish = () => {
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("canplay", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = src;
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("canplay", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    void video.load();
  });

  videoReadyPromises.set(src, promise);
  return promise;
}

export function warmImageAsset(src?: string | null) {
  if (!src || warmedImages.has(src) || typeof window === "undefined") return;
  warmedImages.add(src);
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

export function warmVideoAsset(src?: string | null) {
  if (!src || warmedVideos.has(src) || typeof document === "undefined") return;
  warmedVideos.add(src);
  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.src = src;
  void video.load();
}

export function warmRoomAssetsBySlug(slug?: string | null) {
  if (!slug) return;
  const room = rooms.find((entry) => entry.slug === slug);
  if (!room) return;
  warmImageAsset(room.backgroundImage);
  warmVideoAsset(room.backgroundVideo);
  warmVideoAsset(room.backgroundVideoMobile);
}

export function warmRoomAssetsByHref(href?: string | null) {
  if (!href?.startsWith("/rooms/")) return;
  const slug = href.replace("/rooms/", "").split("?")[0];
  warmRoomAssetsBySlug(slug);
}

export async function awaitRoomAssetsBySlug(slug?: string | null) {
  if (!slug || typeof window === "undefined") return;
  const room = rooms.find((entry) => entry.slug === slug);
  if (!room) return;

  logRoomNav("awaitRoomAssets:start", { slug });
  warmRoomAssetsBySlug(slug);

  const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
  const activeVideo =
    isMobileViewport && room.backgroundVideoMobile ? room.backgroundVideoMobile : room.backgroundVideo;

  if (activeVideo) {
    await waitWithTimeout(waitForVideoReady(activeVideo), ROOM_NAVIGATION_WAIT_TIMEOUT_MS);
    logRoomNav("awaitRoomAssets:ready", { slug, assetType: "video", src: activeVideo });
    return;
  }

  if (room.backgroundImage) {
    await waitWithTimeout(waitForImageReady(room.backgroundImage), ROOM_NAVIGATION_WAIT_TIMEOUT_MS);
    logRoomNav("awaitRoomAssets:ready", { slug, assetType: "image", src: room.backgroundImage });
  }
}

export function awaitRoomAssetsByHref(href?: string | null) {
  if (!href?.startsWith("/rooms/")) return Promise.resolve();
  const slug = href.replace("/rooms/", "").split("?")[0];
  return awaitRoomAssetsBySlug(slug);
}
