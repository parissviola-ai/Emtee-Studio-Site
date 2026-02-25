"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

const PACKAGE_OPTIONS_BY_DEPARTMENT: Record<string, string[]> = {
  "A&R / Sales": [
    "CRM Set-Up",
    "CRM Fee/Retainer",
    "Community Building",
    "Merchandise",
    "Event Planning",
    "Event Planner",
  ],
  Business: [
    "Consultation",
    "Brand Evaluation",
    "Income Evaluation",
    "6-Month Rollout Strategy Plan",
    "12-Month Rollout Strategy Plan",
    "Business Operations Set-Up",
  ],
  Marketing: [
    "Content Creation",
    "Brand Deck",
    "Brand Deck + EPK",
    "30min Live Performance Set Development",
    "60min Live Performance Set Development",
    "Brand Deals",
    "Tour Management",
  ],
  Music: [
    "Single Creation",
    "3 Song Creation",
    "Project Creation (5 Songs)",
  ],
  "Publishing / Distribution": ["Publishing/Distro Workshop"],
  "Website Design": ["Website Creation"],
};

export default function ConsultationPage() {
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
  const [departmentFocus, setDepartmentFocus] = useState("");
  const [preferredPackage, setPreferredPackage] = useState("Not Sure Yet");
  const [showMultiResourcePlanner, setShowMultiResourcePlanner] = useState(false);
  const [multiDepartment1, setMultiDepartment1] = useState("");
  const [multiDepartment2, setMultiDepartment2] = useState("");
  const [multiDepartment3, setMultiDepartment3] = useState("");
  const [multiResource1, setMultiResource1] = useState("Not Sure Yet");
  const [multiResource2, setMultiResource2] = useState("Not Sure Yet");
  const [multiResource3, setMultiResource3] = useState("Not Sure Yet");

  const departmentOptions = useMemo(
    () => Object.keys(PACKAGE_OPTIONS_BY_DEPARTMENT),
    []
  );

  const availablePackages = useMemo(
    () => (departmentFocus ? PACKAGE_OPTIONS_BY_DEPARTMENT[departmentFocus] ?? [] : []),
    [departmentFocus]
  );

  const availablePackagesMulti1 = useMemo(
    () => (multiDepartment1 ? PACKAGE_OPTIONS_BY_DEPARTMENT[multiDepartment1] ?? [] : []),
    [multiDepartment1]
  );
  const availablePackagesMulti2 = useMemo(
    () => (multiDepartment2 ? PACKAGE_OPTIONS_BY_DEPARTMENT[multiDepartment2] ?? [] : []),
    [multiDepartment2]
  );
  const availablePackagesMulti3 = useMemo(
    () => (multiDepartment3 ? PACKAGE_OPTIONS_BY_DEPARTMENT[multiDepartment3] ?? [] : []),
    [multiDepartment3]
  );

  const normalizedPreferredPackage = availablePackages.includes(preferredPackage)
    ? preferredPackage
    : "Not Sure Yet";

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white px-6 py-14 text-black md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-[-90px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(193,157,88,0.22),transparent_70%)]" />
        <div className="absolute right-[-120px] top-[24%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(35,31,24,0.12),transparent_72%)]" />
        <div className="absolute bottom-[-140px] left-[30%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(193,157,88,0.18),transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/rooms/front"
            className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:bg-black/[0.03]"
          >
            Back to Lobby
          </Link>
          <a
            href="mailto:info@emtee.com"
            className="inline-flex items-center justify-center rounded-full border border-[#c19d58]/40 bg-[#f8f4eb] px-5 py-2 text-sm font-semibold text-black/80 transition hover:bg-[#f2ead9]"
          >
            Email Direct →
          </a>
        </div>

        <section className="accent-card relative mt-8 rounded-[34px] border border-black/10 bg-white/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur md:p-12">
          <Image
            src="/Logo2.png"
            alt="EMTEE logo"
            width={54}
            height={54}
            className="absolute right-5 top-5 h-10 w-10 rounded-md object-contain opacity-75 sm:right-8 sm:top-8 sm:h-[54px] sm:w-[54px]"
          />
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">EMTEE MUSIC GROUP</p>
            <h1 className="mt-3 text-4xl tracking-tight text-black md:text-6xl">
              Request a Consultation
            </h1>
            <p className="mt-5 text-base leading-relaxed text-black/65 md:text-lg">
              We accept artists who are serious about building a lasting foundation.
              Complete the intake below and our team will review your fit, direction, and next-step strategy.
            </p>
          </div>

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Intake submitted. Our team will review and follow up soon.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-8 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              Please complete all required fields and try again.
            </div>
          ) : null}

          <form
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
            action="/api/consultation"
            method="post"
          >
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Artist / Stage Name</span>
              <input
                name="artist_name"
                type="text"
                required
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="Enter your artist name"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="name@email.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">City / Market</span>
              <input
                name="city_market"
                type="text"
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="Los Angeles, Atlanta, Toronto..."
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Primary Genre</span>
              <select
                name="primary_genre"
                required
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                defaultValue=""
              >
                <option value="" disabled>Select your lane</option>
                <option>Hip-Hop / Rap</option>
                <option>R&amp;B / Soul</option>
                <option>Pop</option>
                <option>Afrobeats / Amapiano</option>
                <option>Alternative / Indie</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Department Focus</span>
              <select
                name="department_focus"
                required
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                value={departmentFocus}
                onChange={(event) => {
                  setDepartmentFocus(event.target.value);
                  setPreferredPackage("Not Sure Yet");
                }}
              >
                <option value="" disabled>Select your priority department</option>
                {departmentOptions.map((department) => (
                  <option key={`focus-${department}`} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Preferred Resource / Package</span>
              <select
                name="preferred_package_tier"
                className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                value={normalizedPreferredPackage}
                onChange={(event) => setPreferredPackage(event.target.value)}
                disabled={!departmentFocus}
              >
                <option>Not Sure Yet</option>
                {availablePackages.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-black/45">
                {departmentFocus
                  ? `Showing resources for ${departmentFocus}.`
                  : "Select a department first to view matching resources."}
              </p>
            </label>

            <div className="block md:col-span-2">
              <button
                type="button"
                onClick={() => setShowMultiResourcePlanner((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/70 transition hover:bg-black/[0.03]"
              >
                {showMultiResourcePlanner
                  ? "Hide Multi-Resource Planner"
                  : "Interested in More Than One Resource?"}
              </button>

              {showMultiResourcePlanner ? (
                <div className="accent-card-soft mt-4 rounded-2xl border border-black/10 bg-[#faf8f2] p-4 md:p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">
                    Additional Department + Resource Interests
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Department 1</span>
                      <select
                        name="multi_department_1"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiDepartment1}
                        onChange={(event) => {
                          setMultiDepartment1(event.target.value);
                          setMultiResource1("Not Sure Yet");
                        }}
                      >
                        <option value="">Optional</option>
                        {departmentOptions.map((department) => (
                          <option key={`multi-dept-1-${department}`} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Resource 1</span>
                      <select
                        name="multi_resource_1"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiResource1}
                        onChange={(event) => setMultiResource1(event.target.value)}
                        disabled={!multiDepartment1}
                      >
                        <option>Not Sure Yet</option>
                        {availablePackagesMulti1.map((pkg) => (
                          <option key={`multi-resource-1-${pkg}`} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Department 2</span>
                      <select
                        name="multi_department_2"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiDepartment2}
                        onChange={(event) => {
                          setMultiDepartment2(event.target.value);
                          setMultiResource2("Not Sure Yet");
                        }}
                      >
                        <option value="">Optional</option>
                        {departmentOptions.map((department) => (
                          <option key={`multi-dept-2-${department}`} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Resource 2</span>
                      <select
                        name="multi_resource_2"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiResource2}
                        onChange={(event) => setMultiResource2(event.target.value)}
                        disabled={!multiDepartment2}
                      >
                        <option>Not Sure Yet</option>
                        {availablePackagesMulti2.map((pkg) => (
                          <option key={`multi-resource-2-${pkg}`} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Department 3</span>
                      <select
                        name="multi_department_3"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiDepartment3}
                        onChange={(event) => {
                          setMultiDepartment3(event.target.value);
                          setMultiResource3("Not Sure Yet");
                        }}
                      >
                        <option value="">Optional</option>
                        {departmentOptions.map((department) => (
                          <option key={`multi-dept-3-${department}`} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">Resource 3</span>
                      <select
                        name="multi_resource_3"
                        className="mt-1 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                        value={multiResource3}
                        onChange={(event) => setMultiResource3(event.target.value)}
                        disabled={!multiDepartment3}
                      >
                        <option>Not Sure Yet</option>
                        {availablePackagesMulti3.map((pkg) => (
                          <option key={`multi-resource-3-${pkg}`} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ) : null}
            </div>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Current Stage</span>
              <div className="mt-3 grid gap-2 text-sm text-black/80 md:grid-cols-2">
                <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf8f2] px-3 py-2"><input type="radio" name="current_stage" value="Emerging" required /> Emerging</label>
                <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf8f2] px-3 py-2"><input type="radio" name="current_stage" value="Building Momentum" required /> Building Momentum</label>
                <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf8f2] px-3 py-2"><input type="radio" name="current_stage" value="Repositioning" required /> Repositioning</label>
                <label className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf8f2] px-3 py-2"><input type="radio" name="current_stage" value="Established / Scaling" required /> Established / Scaling</label>
              </div>
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">What are you trying to unlock in the next 90 days?</span>
              <textarea
                name="goal_90_day"
                rows={4}
                required
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="Tell us what outcome you want, and we will build a department-specific plan and roadmap..."
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Links (Spotify, Apple, Instagram, YouTube)</span>
              <textarea
                name="artist_links"
                rows={3}
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="Paste key links here..."
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Why EMTEE?</span>
              <textarea
                name="why_emtee"
                rows={3}
                required
                className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/35 focus:ring-2 focus:ring-[#c19d58]/35"
                placeholder="Tell us why this is the right partnership."
              />
            </label>

            <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xl text-xs leading-relaxed text-black/50">
                By submitting, you agree that our team can contact you about consultation fit and next steps.
                We review every inquiry carefully.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
              >
                Submit Artist Intake →
              </button>
            </div>
          </form>

          <div className="mt-8 grid gap-4 rounded-2xl border border-[#c19d58]/35 bg-[linear-gradient(120deg,#faf4e6_0%,#fff_45%,#f6efde_100%)] p-5 text-sm text-black/70 md:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-black/45">Step 1</div>
              <div className="mt-1 font-semibold">Intake Review</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-black/45">Step 2</div>
              <div className="mt-1 font-semibold">Department Fit Call</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-black/45">Step 3</div>
              <div className="mt-1 font-semibold">Department Plan + Roadmap</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
