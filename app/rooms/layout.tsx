import type { ReactNode } from "react";
import Link from "next/link";

const LEFT_LINKS = [
  { label: "About", href: "/rooms/front" },     // temp safe route
  { label: "EMTEE Projects", href: "/rooms/front" },  // temp safe route
  { label: "News", href: "/rooms/front" },      // temp safe route
];

const RIGHT_LINKS = [{ label: "Contact Us", href: "/rooms/front" }]; // temp safe route

export default function RoomsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100svh] w-full bg-black text-white">
      {/* Top glass menu bar */}
      <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none">
        <div className="pointer-events-auto mx-auto w-full px-6 pt-5">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl px-6 py-4 shadow-lg shadow-black/30">
            {/* Left links */}
            <nav className="flex items-center gap-8 text-sm font-semibold text-white/85">
              {LEFT_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Center brand */}
            <div className="text-base font-semibold text-white/90">
              EMTEE Music Group
            </div>

            {/* Right links */}
            <nav className="flex items-center gap-8 text-sm font-semibold text-white/85">
              {RIGHT_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Push room content down so it isn't hidden under the menu */}
      <div className="pt-28">{children}</div>
    </div>
  );
}