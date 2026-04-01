import Link from "next/link";

function SocialIcon({ label, className = "" }: { label: string; className?: string }) {
  const common = `h-4 w-4 ${className}`.trim();
  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.98 1.38a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M13.5 21v-7.65h2.57l.38-2.97H13.5V8.48c0-.86.24-1.45 1.47-1.45h1.57V4.37c-.76-.08-1.52-.12-2.28-.12-2.25 0-3.8 1.38-3.8 3.92v2.21H8v2.97h2.46V21h3.04Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={common} fill="currentColor">
          <path d="M5.5 8.4H2.8V21h2.7V8.4Zm-1.35-4.5A1.57 1.57 0 1 0 4.2 7a1.57 1.57 0 0 0-.05-3.1ZM21 13.1c0-3.24-1.73-4.75-4.04-4.75a3.48 3.48 0 0 0-3.13 1.72V8.4h-2.7V21h2.7v-6.62c0-1.74.33-3.42 2.49-3.42 2.12 0 2.15 1.98 2.15 3.53V21H21v-7.9Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const careersHref = "mailto:contact@emteemusicgroup.com?subject=Career%20Inquiry";

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
              Identity, strategy and execution for artists ready to move from momentum to legacy.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy"
                target="_blank"
                rel="noopener noreferrer"
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
              <Link href="/rooms/lobby" className="text-white/75 transition hover:text-white">Lobby</Link>
              <Link href="/artist-affiliations" className="text-white/75 transition hover:text-white">Artists</Link>
              <Link href="/about" className="text-white/75 transition hover:text-white">About Us</Link>
              <Link href="/artist-affiliations#partners" className="text-white/75 transition hover:text-white">Partners</Link>
              <Link href="/resources" className="text-white/75 transition hover:text-white">Resources</Link>
              <a href={careersHref} className="text-white/75 transition hover:text-white">Careers</a>
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <SocialIcon label="Instagram" />
              </a>
              <a
                href="https://www.facebook.com/emteemusicgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <SocialIcon label="Facebook" />
              </a>
              <a
                href="https://www.linkedin.com/company/emteemusicgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <SocialIcon label="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
          </div>
          <div>© The Emtee Group</div>
        </div>
      </div>
    </footer>
  );
}
