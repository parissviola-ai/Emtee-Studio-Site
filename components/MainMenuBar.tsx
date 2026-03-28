"use client";

import NextImage from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { rooms } from "@/data/rooms";
import { awaitRoomAssetsByHref, warmRoomAssetsByHref, warmRoomAssetsBySlug } from "@/lib/warmRoomAssets";

type NavLink = { label: string; mobileLabel?: string; href: string };

const PRIMARY_LINKS: NavLink[] = [{ label: "Home", href: "/rooms/lobby" }];

const ABOUT_LINKS: NavLink[] = [
  { label: "Who We Are", href: "/rooms/lobby?modal=About" },
  { label: "What We Offer", href: "/rooms/lobby?modal=departments-sheet" },
  { label: "What We’ve Done", href: "/rooms/lobby?modal=case-study-tour" },
  { label: "How You Can Start", href: "/rooms/lobby?modal=how-you-start" },
];

const RESOURCE_LINKS: NavLink[] = [
  { label: "Business", href: "/rooms/business" },
  { label: "Music", href: "/rooms/music" },
  { label: "Marketing", href: "/rooms/marketing" },
  { label: "A&R / Sales", href: "/rooms/ar-sales" },
  { label: "Publishing & Distribution", href: "/rooms/publishing-distribution" },
];

const CASE_STUDY_LINKS: NavLink[] = [
  { label: "Dirty Elephant Studios", href: "/rooms/dirty-elephant-studio" },
  { label: "Ten Ten Entertainment", href: "/rooms/ten-ten-entertainment" },
  { label: "Steeped Dreams Studio", href: "/rooms/steeped-dreams-studio" },
  { label: "Case Studies", href: "/case-studies" },
];

function shouldDebugRoomNav() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("emtee-debug-nav") === "1";
  } catch {
    return false;
  }
}

function logRoomNav(event: string, detail: Record<string, unknown>) {
  if (!shouldDebugRoomNav()) return;
  const stamp = typeof performance !== "undefined" ? performance.now().toFixed(1) : Date.now().toString();
  console.log(`[emtee-nav ${stamp}ms] ${event}`, detail);
}

export default function MainMenuBar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const prefetchedRoomRoutesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const routeSet = new Set<string>([
      "/rooms/lobby",
      "/about",
      "/resources",
      "/case-studies",
      "/artist-affiliations",
      "/news",
      "/path-quiz",
      ...rooms.map((room) => `/rooms/${room.slug}`),
    ]);

    const warmRoutes = () => {
      routeSet.forEach((href) => {
        router.prefetch(href);
        warmRoomAssetsByHref(href);
      });
      rooms.forEach((room) => warmRoomAssetsBySlug(room.slug));
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmRoutes, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = globalThis.setTimeout(warmRoutes, 400);
    return () => globalThis.clearTimeout(timer);
  }, [router]);

  const aboutActive = pathname === "/about" || pathname === "/consultation" || pathname === "/path-quiz";
  const resourcesActive = pathname === "/resources" || pathname.startsWith("/resources/") || RESOURCE_LINKS.some((item) => pathname === item.href);
  const caseStudiesActive =
    pathname === "/case-studies" ||
    pathname.startsWith("/case-studies") ||
    pathname.startsWith("/artist-affiliations") ||
    CASE_STUDY_LINKS.some((item) => pathname === item.href);

  function navLinkClass(href: string) {
    const isActive = pathname === href;
    return [
      "relative whitespace-nowrap px-2 py-1 text-[11px] sm:px-0 sm:py-0 sm:text-sm transition-all duration-200",
      "sm:group-hover/menu:opacity-45 sm:hover:opacity-100 sm:focus-visible:opacity-100",
      isActive ? "text-white sm:group-hover/menu:opacity-100" : "text-white/68 sm:hover:text-white",
    ].join(" ");
  }

  function desktopMenuLinkClass(isActive: boolean) {
    return [
      "relative whitespace-nowrap px-0 py-0 text-sm transition-all duration-200",
      "sm:group-hover/menu:opacity-45 sm:hover:opacity-100 sm:focus-visible:opacity-100",
      isActive ? "text-white sm:group-hover/menu:opacity-100" : "text-white/68 sm:hover:text-white",
    ].join(" ");
  }

  function handleFrontModalNav(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname !== "/rooms/lobby") return;
    if (!href.startsWith("/rooms/lobby?modal=")) return;
    event.preventDefault();
    if (typeof window === "undefined") return;
    const modalId = new URL(href, window.location.origin).searchParams.get("modal");
    window.history.replaceState({}, "", href);
    window.dispatchEvent(new CustomEvent("emtee:open-lobby-modal", { detail: { modalId } }));
  }

  const prefetchRoomRoute = useCallback((href: string) => {
    if (!href.startsWith("/rooms/")) return;
    if (prefetchedRoomRoutesRef.current.has(href)) return;
    prefetchedRoomRoutesRef.current.add(href);
    router.prefetch(href);
    warmRoomAssetsByHref(href);
  }, [router]);

  async function navigateToRoom(href: string) {
    logRoomNav("nav:click", { from: pathname, to: href, source: "main-menu" });
    await awaitRoomAssetsByHref(href);
    logRoomNav("nav:push", { from: pathname, to: href, source: "main-menu" });
    router.push(href);
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div
        className={[
          "relative w-full backdrop-blur-2xl transition-all duration-300",
          scrolled
            ? "bg-[linear-gradient(180deg,rgba(9,9,9,0.78),rgba(9,9,9,0.62))] shadow-[0_10px_44px_rgba(0,0,0,0.45)]"
            : "bg-[linear-gradient(180deg,rgba(14,14,14,0.58),rgba(14,14,14,0.35))] shadow-[0_8px_34px_rgba(0,0,0,0.35)]",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(580px_180px_at_50%_-20%,rgba(193,157,88,0.13),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/12" />

        <div className="relative flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6 sm:py-3.5">
          <div className="shrink-0">
            <Link
              href="/rooms/lobby"
              onMouseEnter={() => prefetchRoomRoute("/rooms/lobby")}
              onFocus={() => prefetchRoomRoute("/rooms/lobby")}
              onTouchStart={() => prefetchRoomRoute("/rooms/lobby")}
              onClick={(event) => {
                event.preventDefault();
                void navigateToRoom("/rooms/lobby");
              }}
              className="inline-flex items-center gap-2.5 transition hover:opacity-100"
            >
              <NextImage
                src="/logotransparent.png"
                alt="EMTEE Music Group"
                width={66}
                height={26}
                className="h-6 w-auto object-contain invert opacity-80 sm:h-7"
                priority
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 sm:text-sm">
                EMTEE <span className="text-white">Music Group</span>
              </span>
            </Link>
          </div>

          <nav className="flex min-w-0 items-center justify-end gap-1 overflow-x-auto text-sm font-semibold text-white/85 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:gap-4 md:gap-7 sm:group/menu">
            {PRIMARY_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => prefetchRoomRoute(item.href)}
                onFocus={() => prefetchRoomRoute(item.href)}
                onTouchStart={() => prefetchRoomRoute(item.href)}
                onClick={(event) => {
                  if (!item.href.startsWith("/rooms/")) return;
                  event.preventDefault();
                  void navigateToRoom(item.href);
                }}
                className={navLinkClass(item.href)}
              >
                <span className="sm:hidden">{item.mobileLabel ?? item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}

            <div className="relative hidden sm:block group">
              <Link href="/about" className={desktopMenuLinkClass(aboutActive)}>About</Link>

              <div className="pointer-events-none absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-56 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {ABOUT_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(event) => handleFrontModalNav(event, item.href)}
                      onMouseEnter={() => prefetchRoomRoute(item.href)}
                      onFocus={() => prefetchRoomRoute(item.href)}
                      onTouchStart={() => prefetchRoomRoute(item.href)}
                      className={[
                        "block rounded-lg px-3 py-2 text-sm transition",
                        pathname === item.href ? "bg-white/14 text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden sm:block group">
              <Link href="/resources" className={desktopMenuLinkClass(resourcesActive)}>Resources</Link>

              <div className="pointer-events-none absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-64 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {RESOURCE_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => prefetchRoomRoute(item.href)}
                      onFocus={() => prefetchRoomRoute(item.href)}
                      onTouchStart={() => prefetchRoomRoute(item.href)}
                      onClick={(event) => {
                        if (!item.href.startsWith("/rooms/")) return;
                        event.preventDefault();
                        void navigateToRoom(item.href);
                      }}
                      className={[
                        "block rounded-lg px-3 py-2 text-sm transition",
                        pathname === item.href ? "bg-white/14 text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden sm:block group">
              <Link href="/artist-affiliations" className={desktopMenuLinkClass(caseStudiesActive)}>Artists &amp; Partners</Link>

              <div className="pointer-events-none absolute right-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-64 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {CASE_STUDY_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => prefetchRoomRoute(item.href)}
                      onFocus={() => prefetchRoomRoute(item.href)}
                      onTouchStart={() => prefetchRoomRoute(item.href)}
                      onClick={(event) => {
                        if (!item.href.startsWith("/rooms/")) return;
                        event.preventDefault();
                        void navigateToRoom(item.href);
                      }}
                      className={[
                        "block rounded-lg px-3 py-2 text-sm transition",
                        pathname === item.href ? "bg-white/14 text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/news" className={[navLinkClass("/news"), "hidden sm:inline"].join(" ")}>News</Link>

            <Link href="/about" className={[navLinkClass("/about"), "sm:hidden"].join(" ")}>About</Link>
            <Link href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy" target="_blank" rel="noopener noreferrer" className={[navLinkClass("/consultation"), "sm:hidden"].join(" ")}>Consult</Link>
            <Link href="/resources" className={[navLinkClass("/resources"), "sm:hidden"].join(" ")}>Resources</Link>
            <Link href="/artist-affiliations" className={[navLinkClass("/artist-affiliations"), "sm:hidden"].join(" ")}>Artists &amp; Partners</Link>
            <Link href="/case-studies" className={[navLinkClass("/case-studies"), "sm:hidden"].join(" ")}>Case Studies</Link>
            <Link href="/news" className={[navLinkClass("/news"), "sm:hidden"].join(" ")}>News</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
