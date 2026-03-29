"use client";

import { getPillPresentationState } from "@/components/roomHotspotPresentation";

type Hotspot = {
  id: string;
  label: string;
  hoverLabel?: string;
  x: number;
  y: number;
  direction?: "left" | "right" | "up" | "down";
};

function getArrow(direction?: "left" | "right" | "up" | "down") {
  switch (direction) {
    case "right":
      return "→";
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "left":
    default:
      return "←";
  }
}

function HotspotLabelText({
  spot,
  showHoverLabel,
}: {
  spot: Hotspot;
  showHoverLabel: boolean | "hover";
}) {
  if (!spot.hoverLabel) {
    return <>{spot.label}</>;
  }

  if (showHoverLabel === "hover") {
    return (
      <span className="relative inline-flex w-full items-center justify-center text-center">
        <span className="transition-all duration-200 group-hover:opacity-0">
          {spot.label}
        </span>
        <span className="absolute inset-0 inline-flex items-center justify-center text-center opacity-0 transition-all duration-200 group-hover:opacity-100">
          {spot.hoverLabel}
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-flex w-full items-center justify-center text-center">
      <span
        className={[
          "transition-all duration-200",
          showHoverLabel ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {spot.label}
      </span>
      <span
        className={[
          "absolute inset-0 inline-flex items-center justify-center text-center transition-all duration-200",
          showHoverLabel ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {spot.hoverLabel}
      </span>
    </span>
  );
}

export default function RoomPillHotspotContent({
  spot,
  roomSlug,
  compactHotspotUi,
  isMobileViewport,
  clickedHotspotId,
  navCircleClass,
  navPillClass,
}: {
  spot: Hotspot;
  roomSlug: string;
  compactHotspotUi: boolean;
  isMobileViewport: boolean;
  clickedHotspotId: string | null;
  navCircleClass: string;
  navPillClass: string;
}) {
  const {
    isNavigationSpot,
    isLobbyPill,
    isWhoWeArePin,
    isLobbyExplorePin,
    showLabelOnLeft,
    lobbyPillCircleSize,
    lobbyPillFontSize,
    lobbyPillPaddingX,
    lobbyPillPaddingY,
  } = getPillPresentationState({
    roomSlug,
    spot,
    compactHotspotUi,
  });
  const isMobileNavigationSpot = isNavigationSpot && isMobileViewport;
  const isClickedLabelVisible = clickedHotspotId === spot.id && !isNavigationSpot;
  const isExpanded = true;

  return (
    <span
      className={[
        "group inline-flex items-center",
        isMobileNavigationSpot ? "flex-row-reverse" : "",
        showLabelOnLeft ? "flex-row-reverse" : "",
      ].join(" ")}
    >
      {!isLobbyExplorePin ? (
        <span
          className={[
            isNavigationSpot
              ? `relative ${navCircleClass}`
              : [
                  "relative flex items-center justify-center rounded-full border bg-black/10 backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/28 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)]",
                  isLobbyPill
                    ? ""
                    : compactHotspotUi
                      ? "h-7 w-7 sm:h-6 sm:w-6"
                      : "h-8 w-8 sm:h-7 sm:w-7",
                ].join(" "),
            isWhoWeArePin
              ? "border-[#d6ae66]/90 shadow-[0_0_0_2px_rgba(214,174,102,0.28),0_0_22px_rgba(214,174,102,0.6)]"
              : "border-white/85",
          ].join(" ")}
          style={
            isLobbyPill && !isNavigationSpot
              ? { width: lobbyPillCircleSize, height: lobbyPillCircleSize }
              : undefined
          }
        >
          <span className="text-xs leading-none">{getArrow(spot.direction)}</span>
        </span>
      ) : null}

      <span
        className={`${isMobileNavigationSpot || showLabelOnLeft ? "mr-2" : "ml-2"} ${isNavigationSpot ? navPillClass : "overflow-hidden rounded-full border border-white/85 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-white/95 group-hover:bg-black/28 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_18px_rgba(255,255,255,0.22)]"} ${
          isExpanded ? "max-w-[300px]" : "max-w-0 group-hover:max-w-[260px]"
        } ${
          isClickedLabelVisible
            ? "border-white/95 bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.26),0_0_22px_rgba(255,255,255,0.34)]"
            : ""
        }`}
      >
        <span
          className={`block whitespace-nowrap font-medium transition-all duration-300 ease-out ${
            isLobbyPill ? "py-1.5" : "py-2"
          } ${
            isExpanded
              ? isLobbyPill
                ? "px-3 opacity-100"
                : "px-4 opacity-100"
              : "px-0 opacity-0 group-hover:px-4 group-hover:opacity-100"
          } ${
            isLobbyPill ? "text-[11px] sm:text-[12px]" : compactHotspotUi ? "text-xs sm:text-[11px]" : "text-sm"
          } ${
            isClickedLabelVisible
              ? "[text-shadow:0_0_12px_rgba(255,255,255,0.55)]"
              : "group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.48)]"
          }`}
          style={
            isLobbyPill
              ? {
                  fontSize: lobbyPillFontSize,
                  paddingLeft: lobbyPillPaddingX,
                  paddingRight: lobbyPillPaddingX,
                  paddingTop: lobbyPillPaddingY,
                  paddingBottom: lobbyPillPaddingY,
                }
              : undefined
          }
        >
          <HotspotLabelText
            spot={spot}
            showHoverLabel={isLobbyPill && !!spot.hoverLabel ? "hover" : false}
          />
        </span>
      </span>
    </span>
  );
}
