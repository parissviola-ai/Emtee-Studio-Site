"use client";

import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type UseHorizontalSwipeOptions = {
  maxOffAxisTravel?: number;
  minDistance?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

type SwipeStart = {
  pointerId: number;
  x: number;
  y: number;
};

export function useHorizontalSwipe({
  maxOffAxisTravel = 80,
  minDistance = 48,
  onSwipeLeft,
  onSwipeRight,
}: UseHorizontalSwipeOptions) {
  const startRef = useRef<SwipeStart | null>(null);

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (!event.isPrimary) return;
    if (event.pointerType === "mouse") return;
    startRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }

  function onPointerUp(event: ReactPointerEvent<HTMLElement>) {
    const start = startRef.current;
    startRef.current = null;
    if (!start) return;
    if (event.pointerId !== start.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < minDistance) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (Math.abs(deltaY) > maxOffAxisTravel) return;

    if (deltaX < 0) {
      onSwipeLeft?.();
      return;
    }

    onSwipeRight?.();
  }

  function onPointerCancel() {
    startRef.current = null;
  }

  return {
    onPointerCancel,
    onPointerDown,
    onPointerUp,
  };
}
