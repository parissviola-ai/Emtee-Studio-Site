import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-black/10 bg-[#0d0d0d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-[8%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(193,157,88,0.28),transparent_70%)]" />
        <div className="absolute bottom-[-110px] right-[12%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-8">
        <div className="grid gap-8 md:gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/45">EMTEE MUSIC GROUP</p>
            <h3 className="mt-3 text-2xl tracking-tight text-white md:text-[1.65rem]">
              Building artist foundations that scale.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              Identity, strategy, and execution for artists ready to move from momentum to legacy.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Request Consultation
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Navigate</p>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-sm">
              <Link href="/rooms/front" className="text-white/75 transition hover:text-white">Lobby</Link>
              <Link href="/about" className="text-white/75 transition hover:text-white">About Us</Link>
              <Link href="/news" className="text-white/75 transition hover:text-white">News</Link>
              <Link href="/labels-partners" className="text-white/75 transition hover:text-white">Partners</Link>
              <Link href="/connect" className="text-white/75 transition hover:text-white">Resource Packages</Link>
              <Link href="/artist-roster-releases" className="text-white/75 transition hover:text-white">Artists & Releases</Link>
              <Link href="/consultation" className="text-white/75 transition hover:text-white">Consultation</Link>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Social</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://www.instagram.com/emteemusicgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/emteemusicgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/emteemusicgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
            <a
              href="mailto:contact@emteemusicgroup.com"
              className="mt-4 block text-sm text-white/65 transition hover:text-white"
            >
              contact@emteemusicgroup.com
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
          </div>
          <div>© {year} EMTEE Music Group</div>
        </div>
      </div>
    </footer>
  );
}
