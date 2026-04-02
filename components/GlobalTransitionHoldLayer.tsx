"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ROOM_HERO_READY_EVENT, ROOM_TRANSITION_HOLD_START_EVENT } from "@/lib/roomTransitionHold";

type TransitionHoldState = {
  fading: boolean;
  objectFit: string;
  objectPosition: string;
  src: string;
  targetPath: string;
  transform?: string;
};

export default function GlobalTransitionHoldLayer() {
  const pathname = usePathname() ?? "";
  const [transitionHold, setTransitionHold] = useState<TransitionHoldState | null>(null);
  const transitionHoldTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const beginFadeOut = () => {
      if (transitionHoldTimerRef.current !== undefined) {
        window.clearTimeout(transitionHoldTimerRef.current);
      }
      setTransitionHold((prev) => (prev ? { ...prev, fading: true } : prev));
      transitionHoldTimerRef.current = window.setTimeout(() => {
        setTransitionHold(null);
        transitionHoldTimerRef.current = undefined;
      }, 120);
    };

    const handleTransitionStart = (event: Event) => {
      const detail = (event as CustomEvent<{
        objectFit: string;
        objectPosition: string;
        sourcePath?: string;
        src: string;
        targetPath: string;
        transform?: string;
      }>).detail;

      if (!detail?.src || !detail.targetPath) return;
      if ((detail.sourcePath ?? "").startsWith("/rooms/")) return;
      setTransitionHold({ ...detail, fading: false });
    };

    const handleHeroReady = (event: Event) => {
      const path = (event as CustomEvent<{ path?: string }>).detail?.path;
      if (!path) return;
      if (transitionHold && path === transitionHold.targetPath) {
        beginFadeOut();
      }
    };

    window.addEventListener(ROOM_TRANSITION_HOLD_START_EVENT, handleTransitionStart as EventListener);
    window.addEventListener(ROOM_HERO_READY_EVENT, handleHeroReady as EventListener);

    return () => {
      window.removeEventListener(ROOM_TRANSITION_HOLD_START_EVENT, handleTransitionStart as EventListener);
      window.removeEventListener(ROOM_HERO_READY_EVENT, handleHeroReady as EventListener);
      if (transitionHoldTimerRef.current !== undefined) {
        window.clearTimeout(transitionHoldTimerRef.current);
      }
    };
  }, [transitionHold]);

  useEffect(() => {
    if (!transitionHold) return;
    if (pathname !== transitionHold.targetPath) return;
    if (typeof window === "undefined") return;

    if (transitionHoldTimerRef.current !== undefined) {
      window.clearTimeout(transitionHoldTimerRef.current);
    }

    transitionHoldTimerRef.current = window.setTimeout(() => {
      setTransitionHold((prev) => (prev ? { ...prev, fading: true } : prev));
      transitionHoldTimerRef.current = window.setTimeout(() => {
        setTransitionHold(null);
        transitionHoldTimerRef.current = undefined;
      }, 120);
    }, 1600);

    return () => {
      if (transitionHoldTimerRef.current !== undefined) {
        window.clearTimeout(transitionHoldTimerRef.current);
        transitionHoldTimerRef.current = undefined;
      }
    };
  }, [pathname, transitionHold]);

  if (!transitionHold) return null;

  return (
    <div
      className={[
        "pointer-events-none fixed inset-0 z-[55] overflow-hidden bg-black transition-opacity duration-120 ease-out",
        transitionHold.fading ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: transitionHold.transform,
        }}
      >
        <img
          src={transitionHold.src}
          alt=""
          className="h-full w-full"
          style={{
            objectFit: transitionHold.objectFit as "contain" | "cover" | "fill" | "none" | "scale-down",
            objectPosition: transitionHold.objectPosition,
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
