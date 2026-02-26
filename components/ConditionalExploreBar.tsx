"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";

const EXPLORE_LINKS = [
  { label: "Request A Consultation", href: "/consultation" },
  { label: "Labels and Partners", href: "/labels-partners" },
  { label: "Lobby", href: "/rooms/front" },
  { label: "Business Department", href: "/rooms/EMTEEBusinessDept" },
  { label: "Music Department", href: "/rooms/EMTEEMusicDept" },
  { label: "Marketing Department", href: "/rooms/EMTEEMarketingDept" },
  { label: "Publishing / Distribution Department", href: "/rooms/EMTEEPublishingandDistroDept" },
  { label: "A&R / Sales Department", href: "/rooms/EMTEEARSalesDept" },
  { label: "Yanchan Produced", href: "/rooms/orange" },
  { label: "Ten Ten Entertainment", href: "/rooms/live" },
  { label: "Steeped Dreams Studio", href: "/rooms/quiet" },
];

export default function ConditionalExploreBar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const prefetchedExploreRoutesRef = useRef<Set<string>>(new Set());
  const isMobileViewportRaw = useSyncExternalStore(
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
  const isMobileViewport = hasHydrated ? isMobileViewportRaw : false;
  const nextExploreEntry = useMemo(() => {
    const currentIndex = EXPLORE_LINKS.findIndex((item) => item.href === pathname);
    if (currentIndex === -1) return { href: "/rooms/front", label: "Lobby" };
    if (currentIndex >= EXPLORE_LINKS.length - 1) return EXPLORE_LINKS[0];
    return EXPLORE_LINKS[currentIndex + 1];
  }, [pathname]);

  const prefetchExploreRoute = useCallback((href: string) => {
    if (prefetchedExploreRoutesRef.current.has(href)) return;
    prefetchedExploreRoutesRef.current.add(href);
    router.prefetch(href);
  }, [router]);

  // Room pages already render their own explore bar in RoomScene.
  if (pathname.startsWith("/rooms")) return null;
  if (pathname === "/") return null;
  if (pathname === "/website-design") return null;

  return (
    <>
      {isMobileViewport ? (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            aria-label="Open Explore menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-xl transition hover:bg-black/65"
          >
            <span className="text-white/80">⌕</span>
          </button>
        </div>
      ) : (
        <div className="fixed bottom-6 left-6 right-6 z-40">
          <div className="flex w-full items-stretch gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-left text-white backdrop-blur-xl transition hover:bg-black/65"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40">
                <span className="text-white/80">⌕</span>
              </span>

              <div className="flex-1">
                <div className="text-sm font-semibold text-white/92">Explore</div>
                <div className="text-xs text-white/65">Open navigation</div>
              </div>
            </button>
            <button
              type="button"
              aria-label="Go to next page"
              title={`Next: ${nextExploreEntry.label}`}
              onClick={() => router.push(nextExploreEntry.href)}
              className="group relative inline-flex w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/55 text-white/75 backdrop-blur-xl transition hover:bg-black/65 hover:text-white"
            >
              →
              <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg border border-white/15 bg-black/80 px-2 py-1 text-[11px] font-medium text-white/90 opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
                {nextExploreEntry.label}
              </span>
            </button>
          </div>
        </div>
      )}

      <div
        className={[
          "fixed inset-0 z-[70] transition-opacity duration-300 ease-out",
          open ? "pointer-events-auto" : "pointer-events-none",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close Explore"
          className="absolute inset-0 bg-black/45"
          onClick={() => setOpen(false)}
        />

        <div
          className={[
            "absolute left-0 top-0 h-full w-[300px] max-w-[78vw] border-r border-white/10 bg-black/50 p-7 backdrop-blur-2xl md:w-[340px] md:max-w-[85vw] md:p-8",
            "transform-gpu will-change-[transform,opacity] transition-[transform,opacity] duration-[380ms] ease-out",
            open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
          ].join(" ")}
        >
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between">
              <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">Explore</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/75 transition hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-10 flex-1 space-y-3 overflow-y-auto overflow-x-hidden overscroll-contain pr-2 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {EXPLORE_LINKS.map((item, index) => {
                const isApply = item.label.toLowerCase().includes("apply");
                const isUtilityLink =
                  item.href === "/consultation" || item.href === "/labels-partners";
                const isLastUtilityLink = item.href === "/labels-partners";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => prefetchExploreRoute(item.href)}
                    onFocus={() => prefetchExploreRoute(item.href)}
                    onTouchStart={() => prefetchExploreRoute(item.href)}
                    className={
                      isApply
                        ? `
                          mb-6 inline-flex items-center justify-center gap-2
                          rounded-full border border-white/20 bg-white/10 px-5 py-2.5
                          text-sm font-semibold text-white/90 backdrop-blur-xl
                          shadow-lg shadow-black/25 transition hover:border-white/35 hover:bg-white/15
                        `
                        : isUtilityLink
                          ? `
                            group relative block
                            border-b border-white/8
                            py-1.5 ${isLastUtilityLink ? "mb-8 md:mb-6" : ""}
                            text-[11px] font-semibold uppercase tracking-[0.16em]
                            text-white/52
                            transition
                            hover:border-white/18 hover:text-white/78
                          `
                        : `
                          group relative block py-1.5 text-[18px] leading-snug font-medium
                          tracking-[0.01em] text-white/64 transition hover:text-white
                        `
                    }
                    style={{
                      transitionDelay: open
                        ? `${Math.min(index * (isMobileViewport ? 72 : 56), isMobileViewport ? 720 : 560)}ms`
                        : "80ms",
                      transitionProperty: "opacity, transform",
                      transitionDuration: isMobileViewport ? "760ms" : "620ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      opacity: open ? 1 : 0,
                      transform: open ? "translate3d(0,0,0)" : "translate3d(-8px,0,0)",
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
                        <span
                          className="
                            pointer-events-none absolute left-0 top-1/2 h-[1px] w-0
                            -translate-y-1/2 bg-white/28 transition-all duration-300 group-hover:w-4
                          "
                        />
                        <span className="pl-0 transition-all duration-300 group-hover:pl-5">{item.label}</span>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/44 transition group-hover:text-white/75">→</span>
                      </>
                    ) : (
                      <>
                        <span
                          className="
                            pointer-events-none absolute left-0 top-1/2 h-[1px] w-0
                            -translate-y-1/2 bg-white/35 transition-all duration-300 group-hover:w-6
                          "
                        />
                        <span className="pl-0 transition-all duration-300 group-hover:pl-8">{item.label}</span>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 shrink-0">
              <Image
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
