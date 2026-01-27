export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div>
            <p className="text-xs tracking-widest text-white/60">CONNECT</p>

            <div className="mt-4 flex items-center gap-5 text-white/80">
              <a href="https://www.instagram.com/emteemusicgroup/" aria-label="Instagram" className="hover:text-white transition">
                Instagram
              </a>
              <a href="https://www.facebook.com/emteemusicgroup/" aria-label="Facebook" className="hover:text-white transition">
                Facebook
              </a>
              <a href="https://www.linkedin.com/company/emteemusicgroup/" aria-label="LinkedIn" className="hover:text-white transition">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="text-sm text-white/70">
            <a
              href="mailto:contact@emteemusicgroup.com"
              className="hover:text-white transition"
            >
              contact@emteemusicgroup.com
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-white/50">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white transition">
              Subscribe
            </a>
            <span>|</span>
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>

          <div>© The Emtee Group</div>
        </div>
      </div>
    </footer>
  );
}