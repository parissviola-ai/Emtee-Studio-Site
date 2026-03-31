"use client";

import Link from "next/link";
import { type CSSProperties, type MouseEvent, type ReactNode } from "react";

type Hotspot = {
  id: string;
  label: string;
  hidden?: boolean;
  x: number;
  y: number;
  tier?: "core" | "secondary";
  direction?: "left" | "right" | "up" | "down";
  variant?: "pill" | "dot";
  href?: string;
  modal?: any;
  action?: "explore";
};

type RoomHotspotLayerProps = {
  visibleHotspots?: Hotspot[];
  areHotspotsPositionReady: boolean;
  isMobileViewport: boolean;
  isModalOpen: boolean;
  exploreOpen: boolean;
  isLobbyRoom: boolean;
  isLobbyExploreHoverOpen: boolean;
  canDesktopCursorPan: boolean;
  desktopCursorPanX: number;
  hasHydrated: boolean;
  roomSlug: string;
  lobbyResponsiveIsMobile: boolean;
  getMobileHotspotStyle: (spot: any) => CSSProperties;
  getHotspotAnchorTransform: (spot: any) => string | undefined;
  renderHotspotContent: (spot: any) => ReactNode;
  onOpenExplore: (spot: any) => void;
  onOpenModal: (spot: any) => void;
  onExternalLinkClick: (spot: any) => void;
  onInternalLinkClick: (event: MouseEvent, spot: any) => void;
  prefetchExploreRoute: (href: string) => void;
};

export default function RoomHotspotLayer({
  visibleHotspots,
  areHotspotsPositionReady,
  isMobileViewport,
  isModalOpen,
  exploreOpen,
  isLobbyRoom,
  isLobbyExploreHoverOpen,
  canDesktopCursorPan,
  desktopCursorPanX,
  hasHydrated,
  roomSlug,
  lobbyResponsiveIsMobile,
  getMobileHotspotStyle,
  getHotspotAnchorTransform,
  renderHotspotContent,
  onOpenExplore,
  onOpenModal,
  onExternalLinkClick,
  onInternalLinkClick,
  prefetchExploreRoute,
}: RoomHotspotLayerProps) {
  const hotspots = visibleHotspots ?? [];

  return (
    <>
      <div
        className={[
          "pointer-events-none absolute inset-0 z-30 transition-opacity duration-50",
          areHotspotsPositionReady ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={
          canDesktopCursorPan && !isMobileViewport
            ? { transform: `translate3d(${desktopCursorPanX}px, 0, 0)` }
            : undefined
        }
      >
        {areHotspotsPositionReady
          ? hotspots.map((spot) => {
            const isMobileNextRoomPin = isMobileViewport && spot.id === "next-room";
            const hotspotTransform = getHotspotAnchorTransform(spot);
            const sharedClassName = [
              isMobileNextRoomPin
                ? "absolute z-40 transition-opacity duration-100"
                : "absolute z-20 transition-opacity duration-100",
              isModalOpen || exploreOpen || (isLobbyRoom && isLobbyExploreHoverOpen)
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100",
            ].join(" ");

            const sharedStyle = {
              ...getMobileHotspotStyle(spot),
              ...(hotspotTransform ? { transform: hotspotTransform } : {}),
            };

            const content = renderHotspotContent(spot);

            if (spot.action === "explore") {
              if (isLobbyRoom && !hasHydrated) {
                return null;
              }
              const isLobbyDesktopExplorePin =
                roomSlug === "lobby" && !lobbyResponsiveIsMobile && spot.id === "explore";
              if (isLobbyDesktopExplorePin) {
                return null;
              }
              return (
                <button
                  key={spot.id}
                  type="button"
                  className={sharedClassName}
                  style={sharedStyle}
                  onClick={() => onOpenExplore(spot)}
                >
                  {content}
                </button>
              );
            }

            if (spot.modal) {
              return (
                <button
                  key={spot.id}
                  type="button"
                  className={sharedClassName}
                  style={sharedStyle}
                  onClick={() => onOpenModal(spot)}
                >
                  {content}
                </button>
              );
            }

            if (!spot.href) {
              return (
                <div key={spot.id} className={sharedClassName} style={sharedStyle}>
                  {content}
                </div>
              );
            }

            if (spot.href.startsWith("http")) {
              return (
                <a
                  key={spot.id}
                  href={spot.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sharedClassName}
                  style={sharedStyle}
                  onClick={() => onExternalLinkClick(spot)}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={spot.id}
                href={spot.href}
                className={sharedClassName}
                style={sharedStyle}
                onMouseEnter={() => prefetchExploreRoute(spot.href!)}
                onFocus={() => prefetchExploreRoute(spot.href!)}
                onTouchStart={() => prefetchExploreRoute(spot.href!)}
                onClick={(event) => onInternalLinkClick(event, spot)}
              >
                {content}
              </Link>
            );
          })
          : null}
      </div>
    </>
  );
}
