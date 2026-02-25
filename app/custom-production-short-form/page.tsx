import Link from "next/link";

export default async function CustomProductionShortFormPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams?.status;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#0b0704] px-6 py-14 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-[-100px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,164,84,0.25),transparent_72%)]" />
        <div className="absolute right-[-120px] top-[22%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(251,191,118,0.18),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/rooms/orange"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
          >
            Back to Orange Room
          </Link>
          <a
            href="https://open.spotify.com/playlist/37i9dQZF1E4Abx1jG3AvIj?si=1kv1EGuXSfWyOJ44r1g4Zw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#f7c48a]/45 bg-[#f7c48a]/18 px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#f7c48a]/28"
          >
            Yanchan Playlist →
          </a>
        </div>

        <section className="mt-8 rounded-[30px] border border-orange-200/25 bg-[linear-gradient(160deg,rgba(18,12,8,0.94),rgba(9,7,5,0.92))] p-8 shadow-[0_0_0_1px_rgba(251,191,118,0.12),0_24px_72px_rgba(0,0,0,0.5)] backdrop-blur md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-orange-100/65">CUSTOM PRODUCTION</p>
            <h1 className="mt-3 text-4xl tracking-tight text-[#ffe3c2] md:text-5xl">
              Short Form
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Submit your name and a link to your music so we can review fit for custom production.
            </p>
          </div>

          {status === "success" ? (
            <div className="mt-7 rounded-2xl border border-emerald-300/45 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              Submission received. We will follow up.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-7 rounded-2xl border border-rose-300/45 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Please complete both required fields and try again.
            </div>
          ) : null}

          <form
            className="mt-8 grid grid-cols-1 gap-5"
            action="/api/custom-production-short-form"
            method="post"
          >
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Name</span>
              <input
                name="name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Link to Music</span>
              <input
                name="music_link"
                type="url"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Spotify, YouTube, Apple Music, SoundCloud, etc."
              />
            </label>

            <div className="mt-1 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-[#f7c48a]/45 bg-[#f7c48a]/18 px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#f7c48a]/28"
              >
                Submit Short Form →
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
