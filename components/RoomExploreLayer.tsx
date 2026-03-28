"use client";

import NextImage from "next/image";
import Link from "next/link";

type ExploreRoom = {
  label: string;
  href: string;
};

type RoomExploreLayerProps = {
  suppressLobbyResponsiveUiUntilHydrated: boolean;
  isMobileViewport: boolean;
  isStartHereModal: boolean;
  isLobbyRoom: boolean;
  explorePrevLabel: string;
  explorePrevHref: string;
  exploreArrowLabel: string;
  exploreArrowHref: string;
  navigateToRoomHref: (href: string, source?: string) => Promise<void>;
  openExploreMenu: (e?: { preventDefault?: () => void; stopPropagation?: () => void }) => void;
  exploreOpen: boolean;
  setExploreOpen: (open: boolean) => void;
  exploreRooms: ExploreRoom[];
  prefetchExploreRoute: (href: string) => void;
};

export default function RoomExploreLayer({
  suppressLobbyResponsiveUiUntilHydrated,
  isMobileViewport,
  isStartHereModal,
  isLobbyRoom,
  explorePrevLabel,
  explorePrevHref,
  exploreArrowLabel,
  exploreArrowHref,
  navigateToRoomHref,
  openExploreMenu,
  exploreOpen,
  setExploreOpen,
  exploreRooms,
  prefetchExploreRoute,
}: RoomExploreLayerProps) {
  return (
    <>
      {!suppressLobbyResponsiveUiUntilHydrated ? (
        isMobileViewport ? (
          <div className={["absolute bottom-6 right-6 flex items-center gap-2", isStartHereModal ? "z-[10010]" : "z-50"].join(" ")}>
            <button
              type="button"
              aria-label="Open Explore menu"
              onClick={openExploreMenu}
              data-no-pan
              className="inline-flex h-12 w-12 touch-manipulation select-none items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-xl transition hover:bg-black/60"
            >
              <span className="text-white/85">⌕</span>
            </button>
            {!isLobbyRoom ? (
              <button
                type="button"
                data-no-pan
                aria-label={`Previous room: ${explorePrevLabel}`}
                onClick={() => void navigateToRoomHref(explorePrevHref, "room-scene-prev-mobile")}
                className="inline-flex h-12 w-12 touch-manipulation select-none items-center justify-center rounded-full border border-white/20 bg-black/45 text-white/80 backdrop-blur-xl transition hover:bg-black/60 hover:text-white"
              >
                ←
              </button>
            ) : null}
            <button
              type="button"
              data-no-pan
              aria-label={`Next room: ${exploreArrowLabel}`}
              onClick={() => void navigateToRoomHref(exploreArrowHref, "room-scene-next-mobile")}
              className="inline-flex h-12 w-12 touch-manipulation select-none items-center justify-center rounded-full border border-white/20 bg-black/45 text-white/80 backdrop-blur-xl transition hover:bg-black/60 hover:text-white"
            >
              →
            </button>
          </div>
        ) : (
          <div className={["absolute bottom-6 right-6", isStartHereModal ? "z-[10010]" : "z-40"].join(" ")}>
            <div className="flex items-stretch justify-end gap-2">
              {!isLobbyRoom ? (
                <button
                  type="button"
                  data-no-pan
                  aria-label="Go to previous room"
                  title={`Previous: ${explorePrevLabel}`}
                  onClick={() => void navigateToRoomHref(explorePrevHref, "room-scene-prev-desktop")}
                  className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-black/30 text-white/66 backdrop-blur-xl transition hover:bg-black/42 hover:text-white"
                >
                  ←
                  <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg border border-white/15 bg-black/80 px-2 py-1 text-[11px] font-medium text-white/90 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                    {explorePrevLabel}
                  </span>
                </button>
              ) : null}
              <button
                type="button"
                onClick={openExploreMenu}
                data-no-pan
                className="flex h-11 w-[min(25vw,188px)] min-w-[148px] touch-manipulation select-none items-center gap-2.5 rounded-2xl border border-white/14 bg-black/30 px-3.5 py-2 text-left backdrop-blur-xl transition-[width,background-color,border-color] duration-250 ease-out hover:w-[min(30vw,220px)] hover:bg-black/42"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/18 bg-black/26">
                  <span className="text-white/76">⌕</span>
                </span>

                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white/88">Explore</div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-white/52">All Rooms</div>
                </div>
              </button>
              <button
                type="button"
                data-no-pan
                aria-label="Go to next page"
                title={`Next: ${exploreArrowLabel}`}
                onClick={() => void navigateToRoomHref(exploreArrowHref, "room-scene-next-desktop")}
                className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-black/30 text-white/66 backdrop-blur-xl transition hover:bg-black/42 hover:text-white"
              >
                →
                <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg border border-white/15 bg-black/80 px-2 py-1 text-[11px] font-medium text-white/90 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                  {exploreArrowLabel}
                </span>
              </button>
            </div>
          </div>
        )
      ) : null}

      <div
        className={[
          "fixed inset-0",
          isStartHereModal ? "z-[10020]" : "z-[60]",
          exploreOpen ? "pointer-events-auto" : "pointer-events-none",
          isMobileViewport ? "" : "transition-opacity duration-300 ease-out",
          exploreOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close Explore"
          className={[
            "absolute inset-0 transition-opacity ease-out",
            isMobileViewport ? "bg-black/60 duration-150" : "bg-black/40 duration-300",
            exploreOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setExploreOpen(false)}
        />

        <div
          className={[
            "absolute left-0 top-0 h-full w-[272px] max-w-[72vw] border-r border-white/10 bg-black/45 backdrop-blur-2xl p-5 pt-[max(1rem,env(safe-area-inset-top))] md:w-[340px] md:max-w-[85vw] md:p-6",
            "transform-gpu will-change-[transform,opacity] transition-[transform,opacity] duration-[380ms] ease-out",
            exploreOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
          ].join(" ")}
        >
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between">
              <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">
                Explore
              </div>

              <button
                type="button"
                onClick={() => setExploreOpen(false)}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/75 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-3 overflow-y-auto overflow-x-hidden overscroll-contain pr-2 pb-[calc(env(safe-area-inset-bottom)+6rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {exploreRooms.map((item, index) => {
                const isApply = false;
                const isUtilityLink =
                  item.label === "Apply For A Consultation" || item.label === "Our Artists";
                const isLastUtilityLink = item.label === "Our Artists";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(event) => {
                      if (!item.href.startsWith("/rooms/")) {
                        setExploreOpen(false);
                        return;
                      }
                      event.preventDefault();
                      setExploreOpen(false);
                      void navigateToRoomHref(item.href, "room-scene-explore");
                    }}
                    onMouseEnter={() => prefetchExploreRoute(item.href)}
                    onFocus={() => prefetchExploreRoute(item.href)}
                    onTouchStart={() => prefetchExploreRoute(item.href)}
                    className={
                      isApply
                        ? "mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-xl shadow-lg shadow-black/25 transition hover:border-white/35 hover:bg-white/15"
                        : isUtilityLink
                          ? `group relative block border-b border-white/8 py-1.5 ${isLastUtilityLink ? "mb-8 md:mb-6" : ""} text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:border-white/18 hover:text-white/78`
                          : "group relative block py-1.5 text-[18px] font-medium leading-snug tracking-[0.01em] text-white/64 transition hover:text-white"
                    }
                    style={{
                      transitionDelay: exploreOpen
                        ? `${Math.min(index * (isMobileViewport ? 72 : 56), isMobileViewport ? 720 : 560)}ms`
                        : "80ms",
                      transitionProperty: "opacity, transform",
                      transitionDuration: isMobileViewport ? "760ms" : "620ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      opacity: exploreOpen ? 1 : 0,
                      transform: exploreOpen ? "translate3d(0,0,0)" : "translate3d(-8px,0,0)",
                      willChange: "opacity, transform",
                    }}
                  >
                    {isApply ? (
                      <>
                        <span>{item.label}</span>
                        <span className="text-white/75">→</span>
                      </>
                    ) : isUtilityLink ? (
                      <>
                        <span className="pointer-events-none absolute left-0 top-1/2 h-[1px] w-0 -translate-y-1/2 bg-white/28 transition-all duration-300 group-hover:w-4" />
                        <span className="pl-0 transition-all duration-300 group-hover:pl-5">{item.label}</span>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/44 transition group-hover:text-white/75">→</span>
                      </>
                    ) : (
                      <>
                        <span className="pointer-events-none absolute left-0 top-1/2 h-[1px] w-0 -translate-y-1/2 bg-white/35 transition-all duration-300 group-hover:w-6" />
                        <span className="pl-0 transition-all duration-300 group-hover:pl-8">{item.label}</span>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 shrink-0">
              <NextImage
                src="/logotransparent.png"
                alt="EMTEE logo"
                width={132}
                height={40}
                className="h-7 w-auto object-contain brightness-0 invert opacity-75 md:h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
