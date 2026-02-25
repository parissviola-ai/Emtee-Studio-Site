import Link from "next/link";

export default async function TenTenCommunityJoinPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams?.status;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#08090f] px-6 py-14 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-90px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/rooms/live"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
          >
            Back to Live Performance
          </Link>
          <a
            href="https://www.instagram.com/tenten_ent/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/12 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400/20"
          >
            Ten Ten IG →
          </a>
        </div>

        <section className="mt-8 rounded-[30px] border border-white/15 bg-black/45 p-8 shadow-[0_24px_72px_rgba(0,0,0,0.5)] backdrop-blur md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">Ten Ten Community</p>
          <h1 className="mt-3 text-4xl tracking-tight text-white md:text-5xl">Join Short Form</h1>
          <p className="mt-4 text-white/75">Monthly membership: $35/month. Join for motivation, growth, and community support.</p>

          {status === "success" ? (
            <div className="mt-7 rounded-2xl border border-emerald-300/45 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              Submission received. Team will follow up.
            </div>
          ) : null}
          {status === "error" ? (
            <div className="mt-7 rounded-2xl border border-rose-300/45 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Please complete all required fields and try again.
            </div>
          ) : null}

          <form className="mt-8 grid grid-cols-1 gap-5" action="/api/ten-ten-community-join" method="post">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Name</span>
              <input name="name" type="text" required className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20" placeholder="Your name" />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Email</span>
              <input name="email" type="email" required className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20" placeholder="name@email.com" />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Instagram Handle</span>
              <input name="instagram_handle" type="text" required className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20" placeholder="@yourhandle" />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">City</span>
              <input name="city" type="text" required className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20" placeholder="Toronto, Montreal, Vancouver..." />
            </label>

            <div className="mt-1 flex items-center justify-end">
              <button type="submit" className="inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/12 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400/20">
                Join Community →
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
