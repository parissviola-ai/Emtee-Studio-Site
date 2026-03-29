"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { awaitRoomAssetsByHref, getRoomWarmNeighborhoodBySlug, warmImageAsset, warmRoomNeighborhoodBySlug } from "@/lib/warmRoomAssets";

const LANDING_DESKTOP_IMAGE = "/rooms/fullimagecity-opt.jpg";
const LANDING_MOBILE_IMAGE = "/rooms/stillbuildingfinal-opt.jpg";
const LANDING_DESKTOP_NATURAL_SIZE = { w: 6240, h: 3510 };
const LANDING_BUTTON_COORDS = {
  mobile: { x: 59, y: 84 },
  desktop: { x: 45.38, y: 86.04 },
};
const LANDING_CARD_COORDS = {
  mobile: { x: 50, y: 50 },
  desktop: { x: 50, y: 50 },
};
const LANDING_WARMUP_ROUTES = [
  "/about",
  "/resources",
  "/case-studies",
  "/artist-affiliations",
  "/news",
  "/subscribe",
  "/labels-partners",
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

function getCoverImageMetrics(
  viewportW: number,
  viewportH: number,
  naturalW: number,
  naturalH: number
) {
  if (!viewportW || !viewportH || !naturalW || !naturalH) return null;
  const imageScale = Math.max(viewportW / naturalW, viewportH / naturalH);
  const renderedW = naturalW * imageScale;
  const renderedH = naturalH * imageScale;
  return {
    renderedW,
    renderedH,
  };
}

function getObjectPositionY(viewportW: number, isMobile: boolean) {
  if (isMobile) return 0;
  if (viewportW >= 1536) return 0.58;
  if (viewportW >= 1024) return 0.5;
  return 0.18;
}

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [mobileNaturalSize, setMobileNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [isEnteringLobby, setIsEnteringLobby] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 760);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    router.prefetch("/rooms/lobby");
    warmImageAsset("/rooms/finallobby2-opt.jpg");
    warmRoomNeighborhoodBySlug("lobby");
  }, [router]);

  useEffect(() => {
    const warmLandingNetwork = () => {
      router.prefetch("/");
      warmImageAsset(LANDING_DESKTOP_IMAGE);
      warmImageAsset(LANDING_MOBILE_IMAGE);

      LANDING_WARMUP_ROUTES.forEach((href) => {
        router.prefetch(href);
      });

      getRoomWarmNeighborhoodBySlug("lobby").forEach((slug) => {
        router.prefetch(`/rooms/${slug}`);
      });
      warmRoomNeighborhoodBySlug("lobby");
    };

    const timer = window.setTimeout(warmLandingNetwork, 2200);
    return () => window.clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => {
      const w = probe.naturalWidth || probe.width;
      const h = probe.naturalHeight || probe.height;
      if (w && h) {
        setMobileNaturalSize({ w, h });
      }
    };
    probe.src = LANDING_MOBILE_IMAGE;
  }, []);

  const isMobileViewport = viewport.w > 0 ? viewport.w < 640 : true;
  const viewportReady = viewport.w > 0 && viewport.h > 0;
  const activeCoords = isMobileViewport ? LANDING_BUTTON_COORDS.mobile : LANDING_BUTTON_COORDS.desktop;
  const activeNaturalSize = isMobileViewport ? mobileNaturalSize : LANDING_DESKTOP_NATURAL_SIZE;
  const imageMetrics = useMemo(
    () =>
      activeNaturalSize
        ? getCoverImageMetrics(viewport.w, viewport.h, activeNaturalSize.w, activeNaturalSize.h)
        : null,
    [activeNaturalSize, viewport.h, viewport.w]
  );

  const buttonAnchorPoint = useMemo(() => {
    if (!imageMetrics) return null;
    const objectPositionX = 0.5;
    const objectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
    const offsetX = (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const offsetY = (viewport.h - imageMetrics.renderedH) * objectPositionY;
    return {
      x: offsetX + (activeCoords.x / 100) * imageMetrics.renderedW,
      y: offsetY + (activeCoords.y / 100) * imageMetrics.renderedH,
    };
  }, [activeCoords.x, activeCoords.y, imageMetrics, isMobileViewport, viewport.h, viewport.w]);

  const buttonStyle = useMemo(() => {
    if (!buttonAnchorPoint) return undefined;
    const arrowTipInset = 8;
    return {
      left: `${buttonAnchorPoint.x}px`,
      top: `${buttonAnchorPoint.y}px`,
      transform: `translate(-${arrowTipInset}px, -50%)`,
    };
  }, [buttonAnchorPoint]);

  const cardStyle = useMemo(() => {
    if (!imageMetrics) return undefined;
    const objectPositionX = 0.5;
    const objectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
    const offsetX = (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const offsetY = (viewport.h - imageMetrics.renderedH) * objectPositionY;
    const activeCardCoords = isMobileViewport ? LANDING_CARD_COORDS.mobile : LANDING_CARD_COORDS.desktop;
    return {
      left: `${offsetX + (activeCardCoords.x / 100) * imageMetrics.renderedW}px`,
      top: `${offsetY + (activeCardCoords.y / 100) * imageMetrics.renderedH}px`,
    };
  }, [imageMetrics, isMobileViewport, viewport.h, viewport.w]);

  async function handleEnterLobby() {
    if (isEnteringLobby) return;
    logRoomNav("nav:click", { from: "/", to: "/rooms/lobby", source: "landing-enter" });
    setIsEnteringLobby(true);
    await awaitRoomAssetsByHref("/rooms/lobby");
    logRoomNav("nav:push", { from: "/", to: "/rooms/lobby", source: "landing-enter" });
    router.push("/rooms/lobby");
  }

  return (
    <main className="group relative h-screen overflow-hidden bg-black text-white">
      <img
        src={LANDING_MOBILE_IMAGE}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top sm:hidden"
        draggable={false}
      />
      <img
        src={LANDING_DESKTOP_IMAGE}
        alt=""
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[center_18%] transition-transform duration-[1800ms] ease-out sm:block lg:object-[center_50%] 2xl:object-[center_58%] group-hover:scale-[1.02]"
        draggable={false}
      />

      <div className="relative z-10 flex h-full items-end justify-center px-6 py-12 sm:px-0 sm:py-0">
        <div
          className={[
            "flex flex-col items-center gap-4",
            viewportReady
              ? "absolute -translate-x-1/2 -translate-y-1/2"
              : "",
          ].join(" ")}
          style={cardStyle}
        >
          <div
            className={[
              "w-[min(21rem,calc(100vw-1.5rem))] rounded-[20px] border border-white/14 bg-[linear-gradient(180deg,rgba(10,10,10,0.44),rgba(10,10,10,0.28))] px-3 py-2.5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-[9px] transition-all duration-[2900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-full sm:max-w-[21rem] sm:px-3.5 sm:py-3",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            ].join(" ")}
          >
            <Image
              src="/logotransparent.png"
              alt="EMTEE Music Group logo"
              width={180}
              height={180}
              priority
              className="mx-auto mb-1.5 h-auto w-[42px] object-contain invert sm:w-[46px]"
            />

            <div className="mx-auto max-w-[18.5rem] text-center sm:max-w-[18.75rem]">
              <h1 className="text-[0.9rem] font-semibold leading-[1.08] text-white sm:text-[1.05rem]">
                Welcome to
                <br />
                Emtee Music Group
              </h1>

              <p className="mt-1 whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.12em] text-white/54 sm:text-[9px]">
                The First Ever Creative Business Launchpad
              </p>

              <p className="mt-2 text-[10.5px] leading-relaxed text-white/72 sm:text-[11px]">
                When you &quot;ENTER&quot; the building, you&apos;ll notice multiple interactive rooms to explore. For
                the best experience, click &quot;Start Here&quot; to begin the tour.&nbsp;To have a self-led tour click
                &quot;Show Rooms&quot; or &quot;Explore All Rooms.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {buttonStyle ? (
        <button
          type="button"
          onClick={handleEnterLobby}
          className={[
            "absolute z-10 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition-all duration-[2900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-black/40",
            isVisible && !isEnteringLobby ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none",
          ].join(" ")}
          style={buttonStyle}
          disabled={isEnteringLobby}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/75 bg-black/18 text-xs leading-none">
            <span>{isMobileViewport ? "→" : "←"}</span>
          </span>
          ENTER
        </button>
      ) : null}
    </main>
  );
}
