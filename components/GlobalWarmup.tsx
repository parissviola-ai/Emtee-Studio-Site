"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoomWarmNeighborhoodBySlug, warmImageAsset, warmRoomAssetsByHref, warmRoomNeighborhoodBySlug } from "@/lib/warmRoomAssets";

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
      "/rooms/business",
      "/rooms/steeped-dreams-studio",
    ]);

    const warmAll = () => {
      routeSet.forEach((href) => {
        router.prefetch(href);
        warmRoomAssetsByHref(href);
      });

      getRoomWarmNeighborhoodBySlug("lobby").forEach((slug) => {
        router.prefetch(`/rooms/${slug}`);
      });
      warmRoomNeighborhoodBySlug("lobby");
      warmImageAsset("/rooms/lobbywithconcert-opt.jpg");
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
