import Link from "next/link";

export default async function OrangeRoomSessionPage({
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
        <div className="absolute bottom-[-140px] left-[25%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,151,66,0.16),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/rooms/orange"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
          >
            Back to Orange Room
          </Link>
          <a
            href="https://www.instagram.com/p/DUqfIvGER2F/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#f7c48a]/45 bg-[#f7c48a]/18 px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#f7c48a]/28"
          >
            View Session Example →
          </a>
        </div>

        <section className="mt-8 rounded-[30px] border border-orange-200/25 bg-[linear-gradient(160deg,rgba(18,12,8,0.94),rgba(9,7,5,0.92))] p-8 shadow-[0_0_0_1px_rgba(251,191,118,0.12),0_24px_72px_rgba(0,0,0,0.5)] backdrop-blur md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-orange-100/65">ORANGE ROOM SESSIONS</p>
            <h1 className="mt-3 text-4xl tracking-tight text-[#ffe3c2] md:text-5xl">
              Book an Orange Room Session
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Submit this short booking request and we will follow up with available Orange Room Session slots.
            </p>
          </div>

          {status === "success" ? (
            <div className="mt-7 rounded-2xl border border-emerald-300/45 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              Submission received. We will review and follow up.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-7 rounded-2xl border border-rose-300/45 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Please complete the required fields and try again.
            </div>
          ) : null}

          <form
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
            action="/api/orange-room-session"
            method="post"
          >
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Artist / Stage Name</span>
              <input
                name="artist_name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Enter your artist name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="name@email.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Instagram Handle</span>
              <input
                name="instagram_handle"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="@yourhandle"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Music / Performance Link</span>
              <input
                name="music_link"
                type="url"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Spotify, YouTube, Instagram, SoundCloud, etc."
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Preferred Session Month</span>
              <input
                name="preferred_month"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="e.g. May 2026"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">City / Time Zone</span>
              <input
                name="city_timezone"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Toronto (EST), Los Angeles (PST), etc."
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-100/70">Session Concept</span>
              <textarea
                name="notes"
                rows={4}
                required
                className="mt-2 w-full rounded-xl border border-orange-200/20 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-200/45 focus:ring-2 focus:ring-orange-200/20"
                placeholder="Describe the type of Orange Room Session you want to create and the outcome you want."
              />
            </label>

            <div className="md:col-span-2 mt-1 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xl text-xs leading-relaxed text-white/55">
                By submitting, you agree to be contacted about session availability and next steps.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-[#f7c48a]/45 bg-[#f7c48a]/18 px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#f7c48a]/28"
              >
                Submit Booking Request →
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
