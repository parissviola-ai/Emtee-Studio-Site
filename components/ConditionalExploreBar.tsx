"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";

const EXPLORE_LINKS = [
  { label: "Request A Consultation", href: "/consultation" },
  { label: "Labels and Partners", href: "/labels-partners" },
  { label: "Lobby", href: "/rooms/front" },
  { label: "Board Room", href: "/rooms/EMTEEBusinessDept" },
  { label: "Studio", href: "/rooms/EMTEEMusicDept" },
  { label: "Media Room", href: "/rooms/EMTEEMarketingDept" },
  { label: "Yanchan Produced", href: "/rooms/orange" },
  { label: "Publishing and Distro", href: "/rooms/EMTEEPublishingandDistroDept" },
  { label: "The Strategy Suite", href: "/rooms/EMTEEARSalesDept" },
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-left text-white backdrop-blur-xl transition hover:bg-black/65"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40">
              <span className="text-white/80">⌕</span>
            </span>

            <div className="flex-1">
              <div className="text-sm font-semibold text-white/92">Explore</div>
              <div className="text-xs text-white/65">Open navigation</div>
            </div>

            <span className="text-white/75">→</span>
          </button>
        </div>
      )}

      <div
        className={[
          "fixed inset-0 z-[70] transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close Explore"
          className="absolute inset-0 bg-black/45"
          onClick={() => setOpen(false)}
        />

        <div className="absolute left-0 top-0 h-full w-[340px] max-w-[85vw] border-r border-white/10 bg-black/50 p-8 backdrop-blur-2xl">
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

            <div className="mt-10 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-2 pb-[calc(env(safe-area-inset-bottom)+7.5rem)]">
              {EXPLORE_LINKS.map((item) => {
                const isApply = item.label.toLowerCase().includes("apply");
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
                        : `
                          group relative block py-1.5 text-[22px] leading-snug font-medium
                          tracking-tight text-white/65 transition hover:text-white
                        `
                    }
                  >
                    {isApply ? (
                      <>
                        <span>{item.label}</span>
                        <span className="text-white/75">→</span>
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
                src="/Logo2.png"
                alt="EMTEE logo"
                width={96}
                height={32}
                className="h-6 w-auto object-contain opacity-55 md:h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
