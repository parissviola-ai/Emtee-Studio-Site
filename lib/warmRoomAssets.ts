"use client";

import { rooms } from "@/data/rooms";

const warmedImages = new Set<string>();
const warmedVideos = new Set<string>();

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
