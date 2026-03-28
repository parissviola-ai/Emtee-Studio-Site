"use client";

import Link from "next/link";

const INTEREST_OPTIONS = [
  { value: "join-community", label: "Join Community" },
  { value: "showcase-slot", label: "Get a Showcase Slot" },
  { value: "live-set-development", label: "Live Set Development" },
  { value: "all", label: "All" },
] as const;

type InterestValue = (typeof INTEREST_OPTIONS)[number]["value"];

const TJ_EMAIL = "tj@emteemusicgroup.com";

export default function TenTenInterestFormClient({
  initialInterest,
}: {
  initialInterest: InterestValue;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    const artistName = String(formData.get("artist_name") ?? "").trim();
    const emailAddress = String(formData.get("email_address") ?? "").trim();
    const igHandle = String(formData.get("ig_handle") ?? "").trim();
    const phoneNumber = String(formData.get("phone_number") ?? "").trim();
    const interest = String(formData.get("interest") ?? "").trim();
    const interestLabel =
      INTEREST_OPTIONS.find((option) => option.value === interest)?.label ?? "All";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const allOptionsLabel = "Join Community, Get a Showcase Slot, Live Set Development";

    if (!firstName || !lastName || !artistName || !emailAddress || !interest) return;

    const subject = `Ten Ten Interest Form - ${interestLabel}`;
    const body = [
      "Hi TJ,",
      "",
      "I'm reaching out through the Ten Ten short form.",
      "",
      `First Name Last Name: ${fullName}`,
      `Artist: ${artistName}`,
      `Email Address: ${emailAddress}`,
      igHandle ? `Optional IG Handle: ${igHandle}` : "Optional IG Handle: Not provided",
      phoneNumber ? `Phone Number: ${phoneNumber}` : "Phone Number: Not provided",
      interest === "all" ? `All: ${allOptionsLabel}` : `Interested In: ${interestLabel}`,
      "",
      "Thank you,",
    ].join("\n");

    window.location.href = `mailto:${TJ_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#08090f] px-6 py-14 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-90px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.20),transparent_72%)]" />
        <div className="absolute right-[-120px] top-[18%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/rooms/ten-ten-entertainment"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15"
          >
            Back to Ten Ten
          </Link>
          <a
            href="https://ig.me/m/tenten_ent"
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/12 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400/20"
          >
            DM on Instagram →
          </a>
        </div>

        <section className="mt-8 rounded-[30px] border border-white/15 bg-black/45 p-8 shadow-[0_24px_72px_rgba(0,0,0,0.5)] backdrop-blur md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-white/60">Ten Ten Entertainment</p>
          <h1 className="mt-3 text-4xl tracking-tight text-white md:text-5xl">Interest Short Form</h1>
          <p className="mt-4 text-white/75">
            Fill this out and your email app will open a draft to TJ with your info prefilled.
          </p>

          <form className="mt-8 grid grid-cols-1 gap-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">First Name</span>
              <input
                name="first_name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="First name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Last Name</span>
              <input
                name="last_name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="Last name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Artist</span>
              <input
                name="artist_name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="Artist name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Email Address</span>
              <input
                name="email_address"
                type="email"
                required
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Optional IG Handle</span>
              <input
                name="ig_handle"
                type="text"
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="@instagramhandle"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Optional Phone Number</span>
              <input
                name="phone_number"
                type="tel"
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
                placeholder="Phone number"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">I Want To</span>
              <select
                name="interest"
                defaultValue={initialInterest}
                required
                className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-black/35 px-4 text-sm text-white outline-none transition focus:border-white/45 focus:ring-2 focus:ring-white/20"
              >
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#08090f] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-1 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/12 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400/20"
              >
                Email TJ →
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
