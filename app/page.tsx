"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { startLandingTransitionHold } from "@/lib/roomTransitionHold";
import { awaitRoomAssetsByHref, getRoomWarmNeighborhoodBySlug, warmImageAsset, warmRoomNeighborhoodBySlug } from "@/lib/warmRoomAssets";

const LANDING_DESKTOP_IMAGE = "/rooms/prelobbyphotocn.png";
const LANDING_MOBILE_IMAGE = "/rooms/prelobbyphotocn.png";
const LANDING_DESKTOP_NATURAL_SIZE = { w: 1344, h: 768 };
const LANDING_BUTTON_COORDS = {
  mobile: { x: 52.38, y: 92.04 },
  desktop: { x: 45.38, y: 87.04 },
};
const LANDING_CARD_COORDS = {
  mobile: { x: 50, y: 54 },
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
    maxPanX: Math.max((renderedW - viewportW) / 2, 0),
    maxPanY: Math.max((renderedH - viewportH) / 2, 0),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getObjectPositionY(viewportW: number, isMobile: boolean) {
  if (isMobile) return 0;
  if (viewportW >= 1536) return 0.78;
  if (viewportW >= 1280) return 0.7;
  if (viewportW >= 1024) return 0.74;
  return 0.64;
}

function getObjectPositionX(viewportW: number, isMobile: boolean) {
  if (isMobile) return 0.38;
  if (viewportW >= 1536) return 0.5;
  if (viewportW >= 1280) return 0.47;
  if (viewportW >= 1024) return 0.44;
  return 0.5;
}

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [mobileNaturalSize, setMobileNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [isEnteringLobby, setIsEnteringLobby] = useState(false);
  const [mobilePan, setMobilePan] = useState({ x: 0, y: 0 });
  const touchPanStartRef = useRef<{ x: number; y: number; panX: number; panY: number; dragging: boolean } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 760);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    router.prefetch("/rooms/lobby");
    warmImageAsset("/rooms/lobbynewstv-opt.jpg");
    warmRoomNeighborhoodBySlug("lobby", { includeVideo: false });
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
      warmRoomNeighborhoodBySlug("lobby", { includeVideo: false });
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
  const activeObjectPositionX = getObjectPositionX(viewport.w, isMobileViewport);
  const activeObjectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
  const activeAnchorObjectPositionX = isMobileViewport ? 0.5 : activeObjectPositionX;
  const imageMetrics = useMemo(
    () =>
      activeNaturalSize
        ? getCoverImageMetrics(viewport.w, viewport.h, activeNaturalSize.w, activeNaturalSize.h)
        : null,
    [activeNaturalSize, viewport.h, viewport.w]
  );
  const mobilePanBounds = useMemo(() => {
    if (!isMobileViewport || !imageMetrics) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const baseOffsetX = (viewport.w - imageMetrics.renderedW) * activeObjectPositionX;
    const baseOffsetY = (viewport.h - imageMetrics.renderedH) * activeObjectPositionY;

    return {
      minX: viewport.w - imageMetrics.renderedW - baseOffsetX,
      maxX: -baseOffsetX,
      minY: viewport.h - imageMetrics.renderedH - baseOffsetY,
      maxY: -baseOffsetY,
    };
  }, [activeObjectPositionX, activeObjectPositionY, imageMetrics, isMobileViewport, viewport.h, viewport.w]);
  const displayedPan = isMobileViewport
    ? {
        x: clamp(mobilePan.x, mobilePanBounds.minX, mobilePanBounds.maxX),
        y: clamp(mobilePan.y, mobilePanBounds.minY, mobilePanBounds.maxY),
      }
    : { x: 0, y: 0 };

  const buttonAnchorPoint = useMemo(() => {
    if (!imageMetrics) return null;
    const objectPositionX = activeAnchorObjectPositionX;
    const objectPositionY = activeObjectPositionY;
    const offsetX = (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const offsetY = (viewport.h - imageMetrics.renderedH) * objectPositionY;
    return {
      x: offsetX + (activeCoords.x / 100) * imageMetrics.renderedW + displayedPan.x,
      y: offsetY + (activeCoords.y / 100) * imageMetrics.renderedH + displayedPan.y,
    };
  }, [
    activeAnchorObjectPositionX,
    activeCoords.x,
    activeCoords.y,
    activeObjectPositionY,
    displayedPan.x,
    displayedPan.y,
    imageMetrics,
    viewport.h,
    viewport.w,
  ]);

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
    const objectPositionX = activeAnchorObjectPositionX;
    const objectPositionY = activeObjectPositionY;
    const offsetX = (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const offsetY = (viewport.h - imageMetrics.renderedH) * objectPositionY;
    const activeCardCoords = isMobileViewport ? LANDING_CARD_COORDS.mobile : LANDING_CARD_COORDS.desktop;
    return {
      left: `${offsetX + (activeCardCoords.x / 100) * imageMetrics.renderedW}px`,
      top: `${offsetY + (activeCardCoords.y / 100) * imageMetrics.renderedH}px`,
    };
  }, [activeAnchorObjectPositionX, activeObjectPositionY, imageMetrics, isMobileViewport, viewport.h, viewport.w]);

  useEffect(() => {
    if (!isMobileViewport) {
      setMobilePan({ x: 0, y: 0 });
      return;
    }
    setMobilePan((prev) => ({
      x: clamp(prev.x, mobilePanBounds.minX, mobilePanBounds.maxX),
      y: clamp(prev.y, mobilePanBounds.minY, mobilePanBounds.maxY),
    }));
  }, [isMobileViewport, mobilePanBounds.maxX, mobilePanBounds.maxY, mobilePanBounds.minX, mobilePanBounds.minY]);

  async function handleEnterLobby() {
    if (isEnteringLobby) return;
    logRoomNav("nav:click", { from: "/", to: "/rooms/lobby", source: "landing-enter" });
    setIsEnteringLobby(true);
    startLandingTransitionHold("/rooms/lobby");
    await awaitRoomAssetsByHref("/rooms/lobby");
    logRoomNav("nav:push", { from: "/", to: "/rooms/lobby", source: "landing-enter" });
    router.push("/rooms/lobby");
  }

  return (
    <main
      className={[
        "group relative h-screen overflow-hidden bg-black text-white",
        isMobileViewport ? "touch-none" : "",
      ].join(" ")}
      onTouchStart={(e) => {
        if (!isMobileViewport || e.touches.length !== 1) return;
        const target = e.target;
        if (target instanceof Element && target.closest("button,a")) return;
        const touch = e.touches[0];
        touchPanStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          panX: displayedPan.x,
          panY: displayedPan.y,
          dragging: false,
        };
      }}
      onTouchMove={(e) => {
        const start = touchPanStartRef.current;
        if (!isMobileViewport || !start || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (!start.dragging && Math.hypot(dx, dy) < 6) return;
        if (!start.dragging) {
          start.dragging = true;
          touchPanStartRef.current = start;
        }
        e.preventDefault();
        setMobilePan({
          x: clamp(start.panX + dx * 0.7, mobilePanBounds.minX, mobilePanBounds.maxX),
          y: clamp(start.panY + dy * 0.58, mobilePanBounds.minY, mobilePanBounds.maxY),
        });
      }}
      onTouchEnd={() => {
        touchPanStartRef.current = null;
      }}
      onTouchCancel={() => {
        touchPanStartRef.current = null;
      }}
    >
      <img
        src={LANDING_MOBILE_IMAGE}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[38%_top] sm:hidden"
        draggable={false}
        style={{
          objectPosition: `calc(38% + ${displayedPan.x}px) calc(0% + ${displayedPan.y}px)`,
        }}
      />
      <img
        src={LANDING_DESKTOP_IMAGE}
        alt=""
        data-landing-hero="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[50%_64%] transition-transform duration-[1800ms] ease-out sm:block lg:object-[44%_74%] xl:object-[47%_70%] 2xl:object-[50%_78%] group-hover:scale-[1.02]"
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
            "absolute z-10 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition-[opacity,transform,background-color,border-color,box-shadow] duration-[2900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-black/40",
            isVisible && !isEnteringLobby ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none",
          ].join(" ")}
          style={buttonStyle}
          disabled={isEnteringLobby}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/75 bg-black/18 text-xs leading-none">
            <span>←</span>
          </span>
          ENTER
        </button>
      ) : null}
    </main>
  );
}
