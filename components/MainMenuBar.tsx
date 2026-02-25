"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NewsFeedDropdown from "@/components/NewsFeedDropdown";

type NavLink = { label: string; mobileLabel?: string; href: string };

const LEFT_LINKS: NavLink[] = [
  { label: "Home", href: "/rooms/front" },
  { label: "About Us", mobileLabel: "About", href: "/about" },
];
const ARTIST_LINKS: NavLink[] = [{ label: "Case Studies", mobileLabel: "Studies", href: "/case-studies" }];
const RIGHT_LINKS: NavLink[] = [{ label: "News", href: "/news" }];

export default function MainMenuBar() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bookingsActive = pathname === "/connect" || pathname.startsWith("/connect/");
  const artistsActive = pathname === "/artist-roster-releases" || pathname.startsWith("/case-studies");

  function navLinkClass(href: string) {
    const isActive = pathname === href;
    return [
      "relative whitespace-nowrap rounded-full px-2 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-sm transition-all duration-200",
      isActive
        ? "bg-white/14 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]"
        : "text-white/80 hover:bg-white/10 hover:text-white",
    ].join(" ");
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

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5">
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm font-semibold text-white/85 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-none sm:overflow-visible sm:gap-4 md:gap-8">
            {LEFT_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className={navLinkClass(item.href)}>
                <span className="sm:hidden">{item.mobileLabel ?? item.label}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}

            <div className="relative hidden sm:block group">
              <Link
                href="/artist-roster-releases"
                className={[
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  artistsActive
                    ? "bg-white/14 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                Artist Roster & Releases
              </Link>

              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-48 rounded-xl border border-white/15 bg-black/70 p-2 backdrop-blur-xl">
                  {ARTIST_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={[
                        "block rounded-lg px-3 py-2 text-sm transition",
                        pathname === item.href
                          ? "bg-white/14 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <Link
                href="/connect"
                className={[
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  bookingsActive
                    ? "bg-white/14 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                Resources
              </Link>
            </div>

            <Link href="/artist-roster-releases" className={[navLinkClass("/artist-roster-releases"), "sm:hidden"].join(" ")}>
              Artists
            </Link>
            {ARTIST_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className={[navLinkClass(item.href), "sm:hidden"].join(" ")}>
                {item.mobileLabel ?? item.label}
              </Link>
            ))}

            <Link href="/connect" className={[navLinkClass("/connect"), "sm:hidden"].join(" ")}>
              Resources
            </Link>
          </nav>

          <div
            key={pathname}
            className="pointer-events-none absolute right-52 hidden text-base font-semibold tracking-[0.12em] text-white xl:block brand-route-glow"
          >
            EMTEE <span className="text-white">MUSIC GROUP</span>
          </div>

          <nav className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white/85 sm:gap-4 md:gap-8">
            {RIGHT_LINKS.map((item) =>
              item.label === "News" ? (
                <NewsFeedDropdown key={item.label} href={item.href} navLinkClass={navLinkClass} />
              ) : (
                <Link key={item.label} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
