"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

const WEBSITE_GOAL_OPTIONS = [
  "Look professional",
  "Promote releases",
  "Get bookings",
  "Build fanbase",
  "Sell merch",
  "Create brand experience",
];

export default function WebsiteDesignConsultationPage() {
  const search = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("popstate", onStoreChange);
      return () => window.removeEventListener("popstate", onStoreChange);
    },
    () => (typeof window !== "undefined" ? window.location.search : ""),
    () => ""
  );
  const status = useMemo(() => new URLSearchParams(search).get("status"), [search]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [hasWebsite, setHasWebsite] = useState("");
  const goalsLimitReached = selectedGoals.length >= 3;
  const canSubmit = useMemo(() => selectedGoals.length > 0 && selectedGoals.length <= 3, [selectedGoals]);

  function toggleGoal(goal: string) {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) return prev.filter((item) => item !== goal);
      if (prev.length >= 3) return prev;
      return [...prev, goal];
    });
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#ffffff] px-6 py-14 text-[#111827] md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-90px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(214,174,102,0.18),transparent_72%)]" />
        <div className="absolute right-[-130px] top-[35%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.06),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/website-design"
            className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/35 bg-white px-5 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#fff8ed]"
          >
            Back to Website Design
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8b6a2f]">Website Design</p>
          <h1 className="mt-3 text-4xl tracking-tight text-[#111827] md:text-5xl">
            Consultation Form
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#52525b]">
            Completing this form helps me prepare for our consultation in advance. On the call, we’ll review your current stage, goals, content readiness, and timeline, then walk through the website tier that best fits your next release phase.
          </p>

          {status === "success" ? (
            <div className="mt-7 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Submission received. We will follow up to schedule your pre-consultation call.
            </div>
          ) : null}
          {status === "error" ? (
            <div className="mt-7 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              Please complete all required fields and select up to 3 goals.
            </div>
          ) : null}

          <form className="mt-8 grid grid-cols-1 gap-6" action="/api/website-design-consultation" method="post">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="rounded-2xl border border-[#d6ae66]/30 bg-[#fffaf0] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8b6a2f]">Section 1 - Artist Overview</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Artist Name</span>
                  <input name="artist_name" type="text" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" placeholder="Artist / stage name" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Email</span>
                  <input name="email" type="email" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" placeholder="name@email.com" />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Primary Genre</span>
                  <input name="primary_genre" type="text" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" placeholder="Hip-Hop, R&B, Pop, etc." />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Releasing Music Timing</span>
                  <select name="release_timing" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Already released</option>
                    <option>Releasing within 30 days</option>
                    <option>Releasing later</option>
                    <option>Just starting</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d6ae66]/30 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8b6a2f]">Section 2 - Current Presence</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Do you currently have a website?</span>
                  <select
                    name="has_website"
                    required
                    value={hasWebsite}
                    onChange={(event) => setHasWebsite(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25"
                  >
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                {hasWebsite === "Yes" ? (
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Current Website URL</span>
                    <input
                      name="current_website_url"
                      type="url"
                      required
                      placeholder="https://yourwebsite.com"
                      className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25"
                    />
                  </label>
                ) : null}
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Where do people mainly find you right now?</span>
                  <select name="discovery_channel" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Streaming platforms</option>
                    <option>Word of mouth/live shows</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Rough follower range</span>
                  <select name="follower_range" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>0-500</option>
                    <option>500-2k</option>
                    <option>2k-10k</option>
                    <option>10k+</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d6ae66]/30 bg-[#fffaf0] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8b6a2f]">Section 3 - Your Goals</h2>
              <p className="mt-2 text-sm text-[#52525b]">What do you want your website to help with most? (check up to 3)</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {WEBSITE_GOAL_OPTIONS.map((goal) => {
                  const checked = selectedGoals.includes(goal);
                  const disabled = !checked && goalsLimitReached;
                  return (
                    <label
                      key={goal}
                      className={[
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                        checked
                          ? "border-[#d6ae66]/60 bg-white"
                          : "border-[#d6ae66]/35 bg-white",
                        disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer",
                      ].join(" ")}
                    >
                      <input
                        type="checkbox"
                        name="website_goals"
                        value={goal}
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggleGoal(goal)}
                        className="h-4 w-4 accent-[#b88b3a]"
                      />
                      <span>{goal}</span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-[#8b6a2f]">{selectedGoals.length}/3 selected</p>
            </div>

            <div className="rounded-2xl border border-[#d6ae66]/30 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8b6a2f]">Section 4 - Content Level</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Professional photos?</span>
                  <select name="has_professional_photos" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Multiple songs released?</span>
                  <select name="has_multiple_songs" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Music videos?</span>
                  <select name="has_music_videos" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Upcoming shows?</span>
                  <select name="has_upcoming_shows" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Merch?</span>
                  <select name="has_merch" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d6ae66]/30 bg-[#fffaf0] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8b6a2f]">Section 5 - Timeline</h2>
              <label className="mt-3 block">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6a2f]">Ideal launch timeframe</span>
                <select name="launch_timeframe" required className="mt-2 h-11 w-full rounded-xl border border-[#d6ae66]/35 bg-white px-3 text-sm outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/25" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>ASAP</option>
                  <option>Within 1 month</option>
                  <option>Within 3 months</option>
                  <option>Just exploring</option>
                </select>
              </label>
            </div>

            <div className="mt-1 flex items-center justify-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition",
                  canSubmit ? "border border-[#d6ae66]/45 bg-[#d6ae66]/16 text-[#6f511a] hover:bg-[#d6ae66]/24" : "cursor-not-allowed bg-[#d4d4d8]",
                ].join(" ")}
              >
                Submit Pre-Consultation Form →
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
