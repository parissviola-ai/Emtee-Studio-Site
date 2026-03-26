"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { rooms } from "@/data/rooms";
import { warmImageAsset, warmRoomAssetsByHref, warmRoomAssetsBySlug } from "@/lib/warmRoomAssets";

const GLOBAL_ROUTES = [
  "/",
  "/rooms/lobby",
  "/about",
  "/resources",
  "/case-studies",
  "/artist-roster-releases",
  "/news",
  "/path-quiz",
];

export default function GlobalWarmup() {
  const router = useRouter();

  useEffect(() => {
    const routeSet = new Set<string>([
      ...GLOBAL_ROUTES,
      ...rooms.map((room) => `/rooms/${room.slug}`),
    ]);

    const warmAll = () => {
      routeSet.forEach((href) => {
        router.prefetch(href);
        warmRoomAssetsByHref(href);
      });

      rooms.forEach((room) => warmRoomAssetsBySlug(room.slug));
      warmImageAsset("/rooms/finishedlobby-opt.jpg");
      warmImageAsset("/rooms/fullimagecity.png");
      warmImageAsset("/rooms/stillbuildingfinal.png");
      warmImageAsset("/rooms/departmentdeck.png");
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmAll, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = globalThis.setTimeout(warmAll, 500);
    return () => globalThis.clearTimeout(timer);
  }, [router]);

  return null;
}
