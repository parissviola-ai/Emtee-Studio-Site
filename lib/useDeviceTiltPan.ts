"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DeviceTiltStatus = "idle" | "listening" | "active" | "blocked";

export type DeviceTiltPanProfile = {
  animationLerp: number;
  readingLerp: number;
  baselineLerp: number;
  horizontalDivisor: number;
  verticalDivisor: number;
  deadzone: number;
  normalizedDeadzone: number;
  horizontalRangeFactor: number;
  verticalRangeFactor: number;
  horizontalExponent: number;
  verticalExponent: number;
};

type DeviceTiltPanOptions = {
  enabled: boolean;
  viewportEnabled: boolean;
  suspended: boolean;
  isPortraitViewport: boolean;
  basePan: { x: number; y: number };
  leftLimit: number;
  rightLimit: number;
  maxVerticalPan: number;
  profile: DeviceTiltPanProfile;
  onEnabledChange: (next: boolean) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getScreenAdjustedTilt(beta: number, gamma: number, isPortraitViewport: boolean) {
  if (typeof window === "undefined") {
    return { horizontal: gamma, vertical: beta };
  }

  const screenOrientation = window.screen?.orientation;
  const rawAngle =
    screenOrientation && typeof screenOrientation.angle === "number"
      ? screenOrientation.angle
      : typeof (window as typeof window & { orientation?: number }).orientation === "number"
        ? Number((window as typeof window & { orientation?: number }).orientation)
        : isPortraitViewport
          ? 0
          : 90;
  const normalizedAngle = ((Math.round(rawAngle / 90) * 90) % 360 + 360) % 360;

  switch (normalizedAngle) {
    case 90:
      return { horizontal: beta, vertical: -gamma };
    case 180:
      return { horizontal: -gamma, vertical: -beta };
    case 270:
      return { horizontal: -beta, vertical: gamma };
    default:
      return { horizontal: gamma, vertical: beta };
  }
}

export function useDeviceTiltPan({
  enabled,
  viewportEnabled,
  suspended,
  isPortraitViewport,
  basePan,
  leftLimit,
  rightLimit,
  maxVerticalPan,
  profile,
  onEnabledChange,
}: DeviceTiltPanOptions) {
  const [available, setAvailable] = useState(false);
  const [permissionNeeded, setPermissionNeeded] = useState(false);
  const [status, setStatus] = useState<DeviceTiltStatus>("idle");
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const filteredRef = useRef<{ horizontal: number; vertical: number } | null>(null);
  const baselineRef = useRef<{ horizontal: number; vertical: number } | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const targetRef = useRef({ x: 0, y: 0 });
  const signalSeenRef = useRef(false);
  const activeSourceRef = useRef<"orientation" | "motion" | null>(null);

  const schedulePan = useCallback(
    (nextPan: { x: number; y: number }) => {
      targetRef.current = nextPan;
      if (frameRef.current) return;

      const animate = () => {
        setPan((prev) => {
          const nextX = prev.x + (targetRef.current.x - prev.x) * profile.animationLerp;
          const nextY = prev.y + (targetRef.current.y - prev.y) * profile.animationLerp;

          if (Math.abs(nextX - targetRef.current.x) < 0.15 && Math.abs(nextY - targetRef.current.y) < 0.15) {
            frameRef.current = undefined;
            return { x: targetRef.current.x, y: targetRef.current.y };
          }

          frameRef.current = window.requestAnimationFrame(animate);
          return { x: nextX, y: nextY };
        });
      };

      frameRef.current = window.requestAnimationFrame(animate);
    },
    [profile.animationLerp]
  );

  const disable = useCallback(() => {
    onEnabledChange(false);
    setPan({ x: 0, y: 0 });
    filteredRef.current = null;
    baselineRef.current = null;
    signalSeenRef.current = false;
    activeSourceRef.current = null;
    targetRef.current = { x: 0, y: 0 };
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
    setStatus("idle");
  }, [onEnabledChange]);

  const enable = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!("DeviceOrientationEvent" in window)) {
      setStatus("blocked");
      return;
    }

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    try {
      if (typeof DeviceOrientationEventWithPermission.requestPermission === "function") {
        const permission = await DeviceOrientationEventWithPermission.requestPermission();
        if (permission !== "granted") {
          setStatus("blocked");
          return;
        }
      }
      const DeviceMotionEventWithPermission = DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof DeviceMotionEventWithPermission.requestPermission === "function") {
        const permission = await DeviceMotionEventWithPermission.requestPermission();
        if (permission !== "granted") {
          setStatus("blocked");
          return;
        }
      }
    } catch {
      setStatus("blocked");
      return;
    }

    filteredRef.current = null;
    baselineRef.current = null;
    signalSeenRef.current = false;
    activeSourceRef.current = null;
    targetRef.current = { x: 0, y: 0 };
    setPermissionNeeded(false);
    setStatus("listening");
    onEnabledChange(true);
  }, [onEnabledChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    const hasDeviceMotion = "DeviceMotionEvent" in window;
    setAvailable(hasDeviceOrientation || hasDeviceMotion);
    if (!hasDeviceOrientation && !hasDeviceMotion) return;

    const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DeviceMotionEventWithPermission = DeviceMotionEvent as typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    setPermissionNeeded(
      typeof DeviceOrientationEventWithPermission.requestPermission === "function" ||
      typeof DeviceMotionEventWithPermission.requestPermission === "function"
    );
  }, []);

  useEffect(() => {
    if (!(enabled && viewportEnabled) || suspended) {
      setPan({ x: 0, y: 0 });
      filteredRef.current = null;
      baselineRef.current = null;
      signalSeenRef.current = false;
      activeSourceRef.current = null;
      targetRef.current = { x: 0, y: 0 };
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }
      setStatus((prev) => (prev === "blocked" ? prev : "idle"));
      return;
    }
    if (typeof window === "undefined") return;
    const hasDeviceOrientation = "DeviceOrientationEvent" in window;
    const hasDeviceMotion = "DeviceMotionEvent" in window;
    if (!hasDeviceOrientation && !hasDeviceMotion) return;

    signalSeenRef.current = false;
    activeSourceRef.current = null;
    setStatus("listening");

    const applyTiltReading = (
      reading: { horizontal: number; vertical: number },
      source: "orientation" | "motion"
    ) => {
      if (activeSourceRef.current && activeSourceRef.current !== source) return;
      if (!activeSourceRef.current) {
        activeSourceRef.current = source;
      }
      signalSeenRef.current = true;
      setStatus("active");

      const previousFiltered = filteredRef.current ?? reading;
      const nextReading = {
        horizontal: previousFiltered.horizontal + (reading.horizontal - previousFiltered.horizontal) * profile.readingLerp,
        vertical: previousFiltered.vertical + (reading.vertical - previousFiltered.vertical) * profile.readingLerp,
      };
      filteredRef.current = nextReading;

      if (!baselineRef.current) {
        baselineRef.current = nextReading;
      }

      const baseline = baselineRef.current;
      const deltaHorizontal = nextReading.horizontal - baseline.horizontal;
      const deltaVertical = nextReading.vertical - baseline.vertical;

      if (Math.abs(deltaHorizontal) < profile.deadzone && Math.abs(deltaVertical) < profile.deadzone) {
        schedulePan({ x: 0, y: 0 });
        baselineRef.current = {
          horizontal: baseline.horizontal + (nextReading.horizontal - baseline.horizontal) * profile.baselineLerp,
          vertical: baseline.vertical + (nextReading.vertical - baseline.vertical) * profile.baselineLerp,
        };
        return;
      }

      const normalizedHorizontal = clamp(deltaHorizontal / profile.horizontalDivisor, -1, 1);
      const normalizedVertical = clamp(deltaVertical / profile.verticalDivisor, -1, 1);
      const horizontal = Math.abs(normalizedHorizontal) < profile.normalizedDeadzone ? 0 : normalizedHorizontal;
      const vertical = Math.abs(normalizedVertical) < profile.normalizedDeadzone ? 0 : normalizedVertical;

      const shapedHorizontal = Math.sign(horizontal) * Math.pow(Math.abs(horizontal), profile.horizontalExponent);
      const shapedVertical = Math.sign(vertical) * Math.pow(Math.abs(vertical), profile.verticalExponent);

      const availableLeft = Math.max(0, leftLimit + basePan.x);
      const availableRight = Math.max(0, rightLimit - basePan.x);
      const xTravel = shapedHorizontal >= 0 ? availableRight * profile.horizontalRangeFactor : availableLeft * profile.horizontalRangeFactor;
      const yTravel = maxVerticalPan * profile.verticalRangeFactor;

      schedulePan({
        x: clamp(shapedHorizontal * xTravel, -availableLeft, availableRight),
        y: clamp(-shapedVertical * yTravel, -maxVerticalPan - basePan.y, maxVerticalPan - basePan.y),
      });
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      applyTiltReading(getScreenAdjustedTilt(event.beta, event.gamma, isPortraitViewport), "orientation");
    };

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const gravity = event.accelerationIncludingGravity;
      if (!gravity || gravity.x == null || gravity.y == null) return;
      applyTiltReading(
        getScreenAdjustedTilt(gravity.y * 5.2, gravity.x * 5.2, isPortraitViewport),
        "motion"
      );
    };

    const blockTimer = window.setTimeout(() => {
      if (!signalSeenRef.current) {
        setStatus("blocked");
      }
    }, 2200);

    let motionFallbackTimer: number | undefined;

    if (hasDeviceOrientation) {
      // Some tablets/browser shells emit only one of these orientation streams.
      window.addEventListener("deviceorientation", handleDeviceOrientation, true);
      window.addEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
    }

    if (hasDeviceMotion) {
      motionFallbackTimer = window.setTimeout(() => {
        if (!signalSeenRef.current) {
          window.addEventListener("devicemotion", handleDeviceMotion, true);
        }
      }, 650);
    }

    return () => {
      window.clearTimeout(blockTimer);
      if (motionFallbackTimer !== undefined) {
        window.clearTimeout(motionFallbackTimer);
      }
      if (hasDeviceOrientation) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
        window.removeEventListener("deviceorientationabsolute", handleDeviceOrientation as EventListener, true);
      }
      if (hasDeviceMotion) {
        window.removeEventListener("devicemotion", handleDeviceMotion, true);
      }
    };
  }, [
    basePan.x,
    basePan.y,
    enabled,
    isPortraitViewport,
    leftLimit,
    maxVerticalPan,
    profile.animationLerp,
    profile.baselineLerp,
    profile.deadzone,
    profile.horizontalDivisor,
    profile.horizontalExponent,
    profile.horizontalRangeFactor,
    profile.normalizedDeadzone,
    profile.readingLerp,
    profile.verticalDivisor,
    profile.verticalExponent,
    profile.verticalRangeFactor,
    rightLimit,
    schedulePan,
    suspended,
    viewportEnabled,
  ]);

  return {
    pan,
    available,
    permissionNeeded,
    status,
    enable,
    disable,
  };
}
