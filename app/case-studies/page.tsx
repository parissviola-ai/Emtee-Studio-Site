import { Suspense } from "react";
import CaseStudies2Client from "@/app/artist-affiliations/case-studies-2/CaseStudies2Client";

export const metadata = {
  title: "Case Studies | EMTEE Music Group",
};

function CaseStudiesPageFallback() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="relative min-h-[100svh] overflow-hidden bg-white text-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_340px_at_50%_-10%,rgba(214,174,102,0.2),transparent_72%),radial-gradient(800px_420px_at_8%_95%,rgba(15,23,42,0.05),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_55px_rgba(0,0,0,0.08),0_0_0_1px_rgba(214,174,102,0.09)] sm:p-8">
          <div aria-hidden className="h-10 w-52 rounded-full bg-black/6" />
          <div aria-hidden className="mt-4 h-4 max-w-3xl rounded-full bg-black/6" />
          <div aria-hidden className="mt-2 h-4 max-w-2xl rounded-full bg-black/6" />
        </div>
      </section>
    </main>
  );
}

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={<CaseStudiesPageFallback />}>
      <CaseStudies2Client />
    </Suspense>
  );
}
