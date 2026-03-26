"use client";

import NextImage from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { rooms } from "@/data/rooms";
import { warmRoomAssetsByHref, warmRoomAssetsBySlug } from "@/lib/warmRoomAssets";

type NavLink = { label: string; mobileLabel?: string; href: string };

const PRIMARY_LINKS: NavLink[] = [{ label: "Home", href: "/rooms/front" }];

const ABOUT_LINKS: NavLink[] = [
  { label: "Who We Are", href: "/rooms/front?modal=About" },
  { label: "What We Offer", href: "/rooms/front?modal=departments-sheet" },
  { label: "When Artists Have Taken Our Offers", href: "/case-studies" },
  { label: "How You Can Start", href: "/rooms/front?modal=how-you-start" },
  { label: "Start Path Quiz", href: "/path-quiz" },
];

const RESOURCE_LINKS: NavLink[] = [
  { label: "A&R / Sales", href: "/rooms/EMTEEARSalesDept" },
  { label: "Business", href: "/rooms/EMTEEBusinessDept" },
  { label: "Marketing", href: "/rooms/EMTEEMarketingDept" },
  { label: "Publishing & Distribution", href: "/rooms/EMTEEPublishingandDistroDept" },
  { label: "Music", href: "/rooms/EMTEEMusicDept" },
];

const CASE_STUDY_LINKS: NavLink[] = [
  { label: "Yanchan Produced", href: "/rooms/orange" },
  { label: "Ten Ten Entertainment", href: "/rooms/live" },
  { label: "Steeped Dreams Studios", href: "/rooms/quiet" },
  { label: "Other Artists", href: "/artist-roster-releases" },
];

export default function MainMenuBar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const routeSet = new Set<string>([
      "/rooms/front",
      "/about",
      "/connect",
      "/case-studies",
      "/artist-roster-releases",
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
  const resourcesActive = pathname === "/connect" || pathname.startsWith("/connect/") || RESOURCE_LINKS.some((item) => pathname === item.href);
  const caseStudiesActive =
    pathname === "/case-studies" ||
    pathname.startsWith("/case-studies") ||
    pathname.startsWith("/artist-roster-releases") ||
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
    if (pathname !== "/rooms/front") return;
    if (!href.startsWith("/rooms/front?modal=")) return;
    event.preventDefault();
    if (typeof window === "undefined") return;
    const modalId = new URL(href, window.location.origin).searchParams.get("modal");
    window.history.replaceState({}, "", href);
    window.dispatchEvent(new CustomEvent("emtee:open-front-modal", { detail: { modalId } }));
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
              href="/rooms/front"
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
              <Link key={item.label} href={item.href} className={navLinkClass(item.href)}>
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
              <Link href="/connect" className={desktopMenuLinkClass(resourcesActive)}>Resources</Link>

              <div className="pointer-events-none absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-64 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {RESOURCE_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
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
              <Link href="/case-studies" className={desktopMenuLinkClass(caseStudiesActive)}>Case Studies</Link>

              <div className="pointer-events-none absolute right-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="w-64 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {CASE_STUDY_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
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
            <Link href="/connect" className={[navLinkClass("/connect"), "sm:hidden"].join(" ")}>Resources</Link>
            <Link href="/case-studies" className={[navLinkClass("/case-studies"), "sm:hidden"].join(" ")}>Case Studies</Link>
            <Link href="/news" className={[navLinkClass("/news"), "sm:hidden"].join(" ")}>News</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
