import { Suspense } from "react";
import CaseStudies2Client from "@/app/artist-affiliations/case-studies-2/CaseStudies2Client";

export const metadata = {
  title: "Case Studies | EMTEE Music Group",
};

function CaseStudiesFallback() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_340px_at_50%_-10%,rgba(214,174,102,0.2),transparent_72%),radial-gradient(800px_420px_at_8%_95%,rgba(15,23,42,0.05),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_55px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.09)] sm:p-8">
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Case Studies
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 sm:text-base">
            Explore artist case studies through individual department lanes, with each card highlighting the specific EMTEE resources used to support development, rollout and execution.
          </p>
        </div>

        <section className="mt-8 grid gap-7 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_12px_38px_rgba(0,0,0,0.07)]"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-center rounded-2xl border border-black/10 bg-[#f8f8f8] p-4">
                  <div className="h-[320px] w-full animate-pulse rounded-2xl bg-black/[0.05]" />
                </div>
                <div className="mt-4 h-7 w-40 animate-pulse rounded-full bg-[#d6ae66]/18" />
                <div className="mt-3 h-8 w-56 animate-pulse rounded-xl bg-black/[0.06]" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-black/[0.05]" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-black/[0.05]" />
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={<CaseStudiesFallback />}>
      <CaseStudies2Client />
    </Suspense>
  );
}
