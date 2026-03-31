"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoomWarmNeighborhoodBySlug, warmImageAsset, warmRoomAssetsByHref, warmRoomNeighborhoodBySlug } from "@/lib/warmRoomAssets";

const GLOBAL_ROUTES = [
  "/",
  "/rooms/lobby",
  "/about",
  "/resources",
  "/case-studies",
  "/artist-affiliations",
  "/news",
];

export default function GlobalWarmup() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const routeSet = new Set<string>([
      ...GLOBAL_ROUTES,
      "/rooms/business",
      "/rooms/steeped-dreams-studio",
    ]);
    const isLandingPage = pathname === "/";

    const warmAll = () => {
      routeSet.forEach((href) => {
        router.prefetch(href);
        if (isLandingPage && href.startsWith("/rooms/")) {
          warmRoomAssetsByHref(href, { includeVideo: false });
        }
      });

      if (isLandingPage) {
        getRoomWarmNeighborhoodBySlug("lobby").forEach((slug) => {
          router.prefetch(`/rooms/${slug}`);
        });
        warmRoomNeighborhoodBySlug("lobby", { includeVideo: false });
        warmImageAsset("/rooms/lobbynewstv-opt.jpg");
        warmImageAsset("/rooms/fullimagecity-opt.jpg");
        warmImageAsset("/rooms/stillbuildingfinal-opt.jpg");
        warmImageAsset("/rooms/departmentdeck.png");
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmAll, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = globalThis.setTimeout(warmAll, 500);
    return () => globalThis.clearTimeout(timer);
  }, [pathname, router]);

  return null;
}
