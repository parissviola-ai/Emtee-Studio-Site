"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import RoomScene from "@/components/RoomScene";
import type { Room } from "@/data/rooms/types";

type PosterSize = { w: number; h: number } | null;

function useIsMobileViewport() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia("(max-width: 767px)");
      const handler = () => onStoreChange();
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false),
    () => false
  );
}

export default function RoomPageShell({
  room,
  posterSize,
  initialPosterPosition,
}: {
  room: Room;
  posterSize: PosterSize;
  initialPosterPosition: string;
}) {
  const isMobileViewport = useIsMobileViewport();
  const isLobbyRoom = room.slug === "lobby";
  const [hideLobbyPoster, setHideLobbyPoster] = useState(false);

  useEffect(() => {
    setHideLobbyPoster(false);
  }, [isMobileViewport, room.backgroundImage, room.slug]);

  useEffect(() => {
    if (!isLobbyRoom || !isMobileViewport || typeof window === "undefined") return;

    const markPosterReadyToHide = () => {
      setHideLobbyPoster(true);
    };

    window.addEventListener("emtee:lobby-hero-ready", markPosterReadyToHide);

    const foregroundHero = window.document.querySelector<HTMLImageElement>(
      'img[data-room-foreground-hero="true"]'
    );
    let frameId: number | undefined;

    if (foregroundHero?.complete) {
      frameId = window.requestAnimationFrame(markPosterReadyToHide);
    }

    return () => {
      window.removeEventListener("emtee:lobby-hero-ready", markPosterReadyToHide);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [isLobbyRoom, isMobileViewport]);

  const shouldFadePoster = isLobbyRoom && isMobileViewport && hideLobbyPoster;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black">
      <img
        src={room.backgroundImage}
        alt=""
        width={posterSize?.w}
        height={posterSize?.h}
        fetchPriority="high"
        decoding="async"
        data-lobby-hero={room.slug === "lobby" ? "true" : undefined}
        className={[
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out",
          shouldFadePoster ? "opacity-0" : "opacity-100",
        ].join(" ")}
        style={{ objectPosition: initialPosterPosition }}
      />
      <RoomScene room={room} transparentShell />
    </div>
  );
}
