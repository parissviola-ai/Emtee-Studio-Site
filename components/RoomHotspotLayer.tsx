"use client";

import Link from "next/link";
import { useMemo, type CSSProperties, type MouseEvent, type ReactNode } from "react";

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
  resolvedHotspots: Hotspot[];
  areHotspotsPositionReady: boolean;
  sceneReady: boolean;
  isMobileViewport: boolean;
  isModalOpen: boolean;
  exploreOpen: boolean;
  isLobbyRoom: boolean;
  isLobbyExploreHoverOpen: boolean;
  isHotspotTierPilotRoom: boolean;
  showAllRoomHotspots: boolean;
  showOverviewCard: boolean;
  isCardCompact: boolean;
  canDesktopCursorPan: boolean;
  desktopCursorPanX: number;
  hasHydrated: boolean;
  roomSlug: string;
  lobbyResponsiveIsMobile: boolean;
  lobbyMobileHotspotsReady: boolean;
  suppressLobbyResponsiveUiUntilHydrated: boolean;
  isOrangeRoom: boolean;
  orangeSessionPreviewDotId: string;
  cardConnectorAnchor: { x: number; y: number };
  getMobileHotspotStyle: (spot: any) => CSSProperties;
  getHotspotAnchorTransform: (spot: any) => string | undefined;
  connectorStyle: (spot: any, anchor: { x: number; y: number }) => CSSProperties;
  renderHotspotContent: (spot: any) => ReactNode;
  onOpenStartHere: (spot: Hotspot) => void;
  onOpenExplore: (spot: any) => void;
  onOpenModal: (spot: any) => void;
  onExternalLinkClick: (spot: any) => void;
  onInternalLinkClick: (event: MouseEvent, spot: any) => void;
  onOrangePreviewEnter: () => void;
  onOrangePreviewLeave: () => void;
  prefetchExploreRoute: (href: string) => void;
};

export default function RoomHotspotLayer({
  resolvedHotspots,
  areHotspotsPositionReady,
  sceneReady,
  isMobileViewport,
  isModalOpen,
  exploreOpen,
  isLobbyRoom,
  isLobbyExploreHoverOpen,
  isHotspotTierPilotRoom,
  showAllRoomHotspots,
  showOverviewCard,
  isCardCompact,
  canDesktopCursorPan,
  desktopCursorPanX,
  hasHydrated,
  roomSlug,
  lobbyResponsiveIsMobile,
  lobbyMobileHotspotsReady,
  suppressLobbyResponsiveUiUntilHydrated,
  isOrangeRoom,
  orangeSessionPreviewDotId,
  cardConnectorAnchor,
  getMobileHotspotStyle,
  getHotspotAnchorTransform,
  connectorStyle,
  renderHotspotContent,
  onOpenStartHere,
  onOpenExplore,
  onOpenModal,
  onExternalLinkClick,
  onInternalLinkClick,
  onOrangePreviewEnter,
  onOrangePreviewLeave,
  prefetchExploreRoute,
}: RoomHotspotLayerProps) {
  const visibleHotspots = useMemo(
    () =>
      resolvedHotspots.filter((spot) => {
        if (spot.hidden) return false;
        if (spot.id === "next-room") return false;
        if (isLobbyRoom && !hasHydrated && spot.id === "explore") return false;
        if (isLobbyRoom && lobbyResponsiveIsMobile && spot.id === "explore") return false;
        if (isLobbyRoom && !showAllRoomHotspots) return false;
        if (!isHotspotTierPilotRoom) return true;
        if (showAllRoomHotspots) return true;
        return (spot.tier ?? "core") === "core";
      }),
    [
      hasHydrated,
      isHotspotTierPilotRoom,
      isLobbyRoom,
      lobbyResponsiveIsMobile,
      resolvedHotspots,
      showAllRoomHotspots,
    ]
  );
  const connectableDots = useMemo(
    () => visibleHotspots.filter((spot) => spot.variant === "dot"),
    [visibleHotspots]
  );
  const showDotConnectors =
    sceneReady &&
    showOverviewCard &&
    connectableDots.length > 0 &&
    !isModalOpen &&
    !exploreOpen &&
    !isCardCompact &&
    !isMobileViewport;
  const lobbyStartHereAnchor = useMemo(
    () => (isLobbyRoom ? resolvedHotspots.find((spot) => spot.id === "start-here") : undefined),
    [isLobbyRoom, resolvedHotspots]
  );
  const lobbyStartHereSpot = useMemo(
    () =>
      isLobbyRoom && lobbyStartHereAnchor
        ? { ...lobbyStartHereAnchor, id: "start-here-floating" }
        : undefined,
    [isLobbyRoom, lobbyStartHereAnchor]
  );
  const startHereHotspot = useMemo(
    () =>
      resolvedHotspots.find((spot) => spot.id === "About") ??
      resolvedHotspots.find((spot) => spot.id === "start-here") ??
      resolvedHotspots.find((spot) => spot.id === "how-you-start") ??
      resolvedHotspots.find((spot) => spot.id === "departments"),
    [resolvedHotspots]
  );

  return (
    <>
      {isLobbyRoom && lobbyStartHereSpot && !suppressLobbyResponsiveUiUntilHydrated && lobbyMobileHotspotsReady ? (
        <div
          className={[
            "absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-100",
            isModalOpen || exploreOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          ].join(" ")}
          style={{
            ...getMobileHotspotStyle(lobbyStartHereSpot),
            transform:
              canDesktopCursorPan && !isMobileViewport
                ? `translate3d(${desktopCursorPanX}px, 0, 0) translate(-50%, -50%)`
                : "translate(-50%, -50%)",
          }}
          data-no-pan
        >
          <button
            type="button"
            onClick={() => {
              if (startHereHotspot?.modal) {
                onOpenStartHere(startHereHotspot);
              }
            }}
            className="start-here-priority inline-flex min-w-[6.5rem] items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.02em] transition"
          >
            Start Here
          </button>
        </div>
      ) : null}

      {showDotConnectors ? (
        <div
          className="pointer-events-none absolute inset-0 z-[35] opacity-100 transition-opacity duration-150"
          style={
            canDesktopCursorPan && !isMobileViewport
              ? { transform: `translate3d(${desktopCursorPanX}px, 0, 0)` }
              : undefined
          }
        >
          {connectableDots.map((spot) => (
            <div
              key={`connector-${spot.id}`}
              className="connector-line"
              style={connectorStyle(spot, cardConnectorAnchor)}
            />
          ))}
        </div>
      ) : null}

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
          ? visibleHotspots.map((spot) => {
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
                  onMouseEnter={
                    isOrangeRoom && spot.id === orangeSessionPreviewDotId ? onOrangePreviewEnter : undefined
                  }
                  onMouseLeave={
                    isOrangeRoom && spot.id === orangeSessionPreviewDotId ? onOrangePreviewLeave : undefined
                  }
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
