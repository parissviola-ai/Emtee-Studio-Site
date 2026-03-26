"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import BuildingPage from "@/components/transitions/BuildingPage";
import { useCinematicTransition } from "@/components/transitions/TransitionProvider";

const LANDING_DESKTOP_IMAGE = "/rooms/fullimagecity.png";
const LANDING_MOBILE_IMAGE = "/rooms/stillbuildingfinal.png";
const LOBBY_PRELOAD_IMAGE = "/rooms/finishedlobby.png";
const LANDING_DESKTOP_NATURAL_SIZE = { w: 6240, h: 3510 };
const LANDING_BUTTON_COORDS = {
  mobile: { x: 54, y: 73 },
  desktop: { x: 45.38, y: 86.04 },
};
const LANDING_CARD_COORDS = {
  desktop: { x: 46.37, y: 38.08 },
};

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
  const { prepareArrival } = useCinematicTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnterVisible, setIsEnterVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasEnterBeenClicked, setHasEnterBeenClicked] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [mobileNaturalSize, setMobileNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [showPinHelper, setShowPinHelper] = useState(false);
  const [pinHelperLocked, setPinHelperLocked] = useState(false);
  const pinHelperLockedRef = useRef(false);
  const [pinHelperPoint, setPinHelperPoint] = useState<{
    left: number;
    top: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    router.prefetch("/rooms/front");
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 760);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setTimeout(() => setIsEnterVisible(true), 3200);
    return () => window.clearTimeout(timer);
  }, [isVisible]);

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
      transform: isMobileViewport
        ? `translate(calc(-100% + ${arrowTipInset}px), -50%)`
        : `translate(-${arrowTipInset}px, -50%)`,
    };
  }, [buttonAnchorPoint, isMobileViewport]);

  const cardStyle = useMemo(() => {
    if (isMobileViewport || !imageMetrics) return undefined;
    const objectPositionX = 0.5;
    const objectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
    const offsetX = (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const offsetY = (viewport.h - imageMetrics.renderedH) * objectPositionY;
    return {
      left: `${offsetX + (LANDING_CARD_COORDS.desktop.x / 100) * imageMetrics.renderedW}px`,
      top: `${offsetY + (LANDING_CARD_COORDS.desktop.y / 100) * imageMetrics.renderedH}px`,
    };
  }, [imageMetrics, isMobileViewport, viewport.h, viewport.w]);

  function updatePinHelperPosition(clientX: number, clientY: number, rect: DOMRect) {
    if (!showPinHelper || pinHelperLockedRef.current || !imageMetrics) return;
    const objectPositionX = 0.5;
    const objectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
    const renderedLeft = rect.left + (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const renderedTop = rect.top + (viewport.h - imageMetrics.renderedH) * objectPositionY;
    const x = Math.min(100, Math.max(0, Number((((clientX - renderedLeft) / imageMetrics.renderedW) * 100).toFixed(2))));
    const y = Math.min(100, Math.max(0, Number((((clientY - renderedTop) / imageMetrics.renderedH) * 100).toFixed(2))));
    setPinHelperPoint({
      left: clientX - rect.left,
      top: clientY - rect.top,
      x,
      y,
    });
  }

  function lockPinHelperPosition(clientX: number, clientY: number, rect: DOMRect) {
    if (!showPinHelper || !imageMetrics) return;
    const objectPositionX = 0.5;
    const objectPositionY = getObjectPositionY(viewport.w, isMobileViewport);
    const renderedLeft = rect.left + (viewport.w - imageMetrics.renderedW) * objectPositionX;
    const renderedTop = rect.top + (viewport.h - imageMetrics.renderedH) * objectPositionY;
    const x = Math.min(100, Math.max(0, Number((((clientX - renderedLeft) / imageMetrics.renderedW) * 100).toFixed(2))));
    const y = Math.min(100, Math.max(0, Number((((clientY - renderedTop) / imageMetrics.renderedH) * 100).toFixed(2))));
    setPinHelperPoint({
      left: clientX - rect.left,
      top: clientY - rect.top,
      x,
      y,
    });
    pinHelperLockedRef.current = true;
    setPinHelperLocked(true);
  }

  function handleEnter() {
    if (hasEnterBeenClicked || isTransitioning) return;
    setHasEnterBeenClicked(true);
    prepareArrival("/rooms/front");
    window.setTimeout(() => {
      setIsTransitioning(true);
    }, 160);
    window.setTimeout(() => {
      router.push("/rooms/front");
    }, 1320);
  }

  return (
    <BuildingPage isTransitioning={isTransitioning} focusPoint={buttonAnchorPoint}>
      <main
        className="group relative h-screen overflow-hidden bg-black text-white"
        onMouseMove={(e) => {
          updatePinHelperPosition(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
        }}
        onMouseLeave={() => {
          if (!pinHelperLockedRef.current) setPinHelperPoint(null);
        }}
        onClickCapture={(e) => {
          const target = e.target;
          if (!(target instanceof Element)) return;
          if (!showPinHelper || hasEnterBeenClicked) return;
          if (target.closest("a,button,[data-no-pin-helper]")) return;
          lockPinHelperPosition(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
        }}
      >
        <Image
          src={LANDING_MOBILE_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top sm:hidden"
        />
        <Image
          src={LANDING_DESKTOP_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[center_18%] transition-transform duration-[1800ms] ease-out sm:block lg:object-[center_50%] 2xl:object-[center_58%] group-hover:scale-[1.02]"
        />
        <Image
          src={LOBBY_PRELOAD_IMAGE}
          alt=""
          width={1}
          height={1}
          priority
          sizes="1px"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <div className="absolute left-3 top-3 z-20 flex flex-col items-start gap-2" data-no-pin-helper>
          <button
            type="button"
            onClick={() => {
              if (hasEnterBeenClicked) return;
              setShowPinHelper((prev) => {
                const next = !prev;
                if (!next) {
                  setPinHelperPoint(null);
                  pinHelperLockedRef.current = false;
                  setPinHelperLocked(false);
                }
                return next;
              });
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88 backdrop-blur-md transition hover:bg-black/70"
          >
            {showPinHelper ? "Pin Helper On" : "Pin Helper Off"}
          </button>

          {showPinHelper ? (
            <div className="min-w-[11rem] rounded-2xl border border-white/14 bg-black/60 px-3 py-2 text-[11px] text-white/84 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="font-semibold uppercase tracking-[0.14em] text-white/62">Landing Coordinates</div>
              <div className="mt-1 text-[10px] text-white/58">{isMobileViewport ? "Mobile image" : "Desktop image"}</div>
              <div className="mt-1">{pinHelperPoint ? `x: ${pinHelperPoint.x}%` : "x: move cursor"}</div>
              <div>{pinHelperPoint ? `y: ${pinHelperPoint.y}%` : "y: move cursor"}</div>
              <div className="mt-1 text-[10px] text-white/58">
                {pinHelperLocked ? "Locked." : "Move cursor, then click scene to lock."}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    pinHelperLockedRef.current = false;
                    setPinHelperLocked(false);
                  }}
                  disabled={!pinHelperLocked}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Unlock
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPinHelperPoint(null);
                    pinHelperLockedRef.current = false;
                    setPinHelperLocked(false);
                  }}
                  disabled={!pinHelperPoint}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Clear
                </button>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!pinHelperPoint || typeof navigator === "undefined" || !navigator.clipboard) return;
                  await navigator.clipboard.writeText(`x: ${pinHelperPoint.x}, y: ${pinHelperPoint.y}`);
                }}
                disabled={!pinHelperPoint}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86 transition hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Copy Coordinates
              </button>
            </div>
          ) : null}
        </div>

        {showPinHelper && pinHelperPoint ? (
          <div
            className="pointer-events-none absolute z-[15] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 bg-cyan-300/35 shadow-[0_0_0_4px_rgba(103,232,249,0.12),0_0_18px_rgba(34,211,238,0.45)]"
            style={{ left: `${pinHelperPoint.left}px`, top: `${pinHelperPoint.top}px` }}
          />
        ) : null}

        <div className="relative z-10 flex h-full items-end justify-center px-6 py-12 sm:px-0 sm:py-0">
          <div
            className={[
              "flex flex-col items-center gap-4",
              !viewportReady || isMobileViewport ? "" : "absolute -translate-x-1/2",
            ].join(" ")}
            style={cardStyle}
          >
            <div
              className={[
                "w-full max-w-[19.5rem] rounded-[20px] border border-white/14 bg-[linear-gradient(180deg,rgba(10,10,10,0.44),rgba(10,10,10,0.28))] px-3.5 py-3 text-center shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-[9px] transition-all duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[22rem] sm:px-4 sm:py-3.5",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              ].join(" ")}
            >
              <Image
                src="/logotransparent.png"
                alt="EMTEE Music Group logo"
                width={180}
                height={180}
                priority
                className="mx-auto mb-2 h-auto w-[52px] object-contain invert sm:w-[58px]"
              />

              <div className="mx-auto max-w-[16.5rem] text-center sm:max-w-[18rem]">
                <h1 className="text-[0.98rem] font-semibold leading-[1.08] text-white sm:text-[1.2rem]">
                  Welcome to
                  <br />
                  Emtee Music Group
                </h1>

                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/54 sm:text-[11px]">
                  The First Ever Creative Business Launchpad
                </p>

                <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/72 sm:text-[12px]">
                  When you &quot;ENTER&quot; the building, you&apos;ll notice multiple interactive rooms to explore. For
                  the best experience, click &quot;Start Here&quot; to begin the tour. To have a self-led tour click
                  &quot;Show Rooms&quot; or &quot;Explore All Rooms.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {buttonStyle ? (
          <button
            type="button"
            onClick={handleEnter}
            className={[
              "absolute z-10 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-black/40",
              isEnterVisible && !hasEnterBeenClicked ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none",
            ].join(" ")}
            style={buttonStyle}
            disabled={hasEnterBeenClicked}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/75 bg-black/18 text-xs leading-none">
              <span>{isMobileViewport ? "→" : "←"}</span>
            </span>
            ENTER
          </button>
        ) : null}
      </main>
    </BuildingPage>
  );
}
