import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Why EMTEE Works",
};

const PILLARS = [
  {
    title: "Music",
    body: "Creative direction, production support, and release readiness built around artist identity.",
  },
  {
    title: "Brand",
    body: "Narrative, visual positioning, and market presentation that make the artist recognizable.",
  },
  {
    title: "Release",
    body: "Structured rollout systems that convert momentum into measurable campaign outcomes.",
  },
  {
    title: "Business",
    body: "Financial and operational systems that support long-term sustainability and decision quality.",
  },
  {
    title: "Live",
    body: "Performance strategy and showcase readiness that turn stage moments into career growth.",
  },
];

const FOUNDATIONS = [
  "Career organization and planning before campaign execution",
  "Structured strategy designed for sustainability over short-term spikes",
  "Family-led culture: treat collaborators and clients as our own",
  "Integrity and humility in decision-making, partnerships, and growth",
  "Longevity-first execution focused on legacy over gimmicks",
];

const PHILOSOPHY_BREAKDOWN = [
  {
    title: "Vision",
    body: "To move the industry away from short-term wins and toward a model that is competitive, durable, and sustainable like tech and finance.",
  },
  {
    title: "Mission",
    body: "To teach artists, producers, writers, engineers, and music entrepreneurs to organize and strategize their careers for long-term growth.",
  },
  {
    title: "Values",
    body: "Family, Hustle, Integrity, Humility, and Longevity guide every decision so execution stays principled, disciplined, and legacy-focused.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_-14%,rgba(214,174,102,0.20),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="accent-card rounded-2xl border border-[#d6ae66]/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.88))] p-6 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_90px_rgba(0,0,0,0.12)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            About Us
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Why EMTEE Works
            </h1>
            <Image
              src="/EMG2.png"
              alt="EMTEE Music Group logo"
              width={86}
              height={86}
              priority
              className="h-16 w-16 rounded-lg object-contain sm:h-20 sm:w-20 justify-self-end"
            />
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-700 sm:text-base">
            EMTEE Music Group is built as a creative business launch pad. Our model is simple:
            define philosophy, apply pillars, strengthen foundations, then execute with discipline.
            The result is a body of work that reads like a resume because every move is tied to a
            system and an outcome.
          </p>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <article className="accent-card-soft rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Philosophy
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              EMTEE exists to shift music careers away from short-term wins and toward the level of
              competitiveness and sustainability seen in technology and finance. Our mission is to
              teach artists, producers, writers, engineers, and music entrepreneurs how to organize,
              strategize, and execute for longevity. We apply this through five operating values:
              family (treat everyone as our own), hustle (work relentlessly for the dream),
              integrity (values over money), humility (stay level-headed), and longevity
              (long-term legacy over short-term gimmicks).
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PHILOSOPHY_BREAKDOWN.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#d6ae66]/28 bg-[#d6ae66]/[0.06] p-3"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                    {item.title}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700">{item.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="accent-card-soft rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Foundations
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {FOUNDATIONS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d6ae66]/85" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 overflow-hidden rounded-xl border border-[#d6ae66]/35 bg-white">
              <Image
                src="/rooms-misc/departmentschart.avif"
                alt="Foundations framework placeholder"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 560px"
                className="h-44 w-full object-cover sm:h-52"
              />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
              mock image
            </div>
          </article>
        </div>

        <section className="accent-card-soft mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Pillars</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-xl border border-[#d6ae66]/28 bg-[#d6ae66]/[0.06] p-4"
              >
                <h2 className="text-base font-semibold text-zinc-900">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="accent-card-soft mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_14px_46px_rgba(0,0,0,0.09)]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Method to Outcome
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            Across rooms, case studies, and news, the same sequence is applied: strategy first,
            structured resources second, then execution. That consistency is what converts activity
            into awards, placements, streams, and durable brand positioning.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[#d6ae66]/18 px-5 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/26 hover:text-[#3d2b0c]"
            >
              View Case Studies
            </Link>
            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:border-[#d6ae66]/45 hover:bg-zinc-50"
            >
              Enter Interactive Rooms
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition hover:border-[#d6ae66]/45 hover:bg-zinc-50"
            >
              Request Consultation
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
