import Link from "next/link";

const PROJECT_BUTTONS = [
  {
    title: "What We Do",
    desc: "Artist development + music education—built for sustainable careers.",
    href: "#what-we-do",
  },
  {
    title: "Major Label Services (Independent)",
    desc: "Identity-first development across music, branding, release, business + live.",
    href: "#major-label-services",
  },
  {
    title: "Labels We’ve Worked With",
    desc: "A quick scan of partners and collaborators.",
    href: "#labels",
  },
  {
    title: "4 Day Intensive",
    desc: "The first step to working with EMG—music, brand, and business support.",
    href: "#intensive",
  },
  {
    title: "Apply",
    desc: "Start your submission for the Intensive and next steps.",
    href: "/apply",
    featured: true,
  },
  {
    title: "Contact",
    desc: "Questions? Reach the team directly.",
    href: "#contact",
  },
];

export default function EmteeProjectsPage() {
  return (
    <main className="min-h-[100svh] bg-black text-white">
      {/* Top spacing consistent with your room UI */}
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="flex items-center justify-between">
          <Link
            href="/rooms/front"
            className="text-sm text-white/70 hover:text-white transition"
          >
            ← Back to Lobby
          </Link>

          <div className="text-sm font-semibold text-white/80">
            EMTEE Projects
          </div>
        </div>

        {/* Hero */}
        <header className="mt-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Emtee Projects
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
            Artist development and music education—built to help artists and
            labels create long-lasting, fulfilling careers.
          </p>
        </header>

        {/* Interactive Buttons / Cards */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECT_BUTTONS.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className={[
                "group rounded-2xl border p-5 transition",
                "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20",
                "backdrop-blur-xl shadow-lg shadow-black/30",
                b.featured
                  ? "relative overflow-hidden"
                  : "",
              ].join(" ")}
            >
              {b.featured && (
                <div className="absolute inset-0 pointer-events-none opacity-60">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                </div>
              )}

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-white">
                    {b.title}
                  </h2>
                  <span className="text-white/70 group-hover:text-white transition">
                    →
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/65 leading-relaxed">
                  {b.desc}
                </p>

                <div className="mt-4 text-xs font-semibold tracking-wide text-white/60 group-hover:text-white/80 transition">
                  Explore
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Content Sections (anchors the buttons scroll to) */}
        <section id="what-we-do" className="mt-16">
          <h3 className="text-2xl font-semibold">What We Do</h3>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            Emtee Projects is the artist development and music education division
            of Emtee Music Group—providing tools and services to build a
            sustainable career.  [oai_citation:1‡Emtee Music Group](https://www.emteemusicgroup.com/emteeprojects)
          </p>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            We focus on mentorship and education, supported by professionals
            across music, brand, release, business, and live development.  [oai_citation:2‡Emtee Music Group](https://www.emteemusicgroup.com/emteeprojects)
          </p>
        </section>

        <section id="major-label-services" className="mt-14">
          <h3 className="text-2xl font-semibold">
            Major Label Services for the Independent Artist
          </h3>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            We start with defining the artist—because confidence in identity
            drives everything else: music, branding, release, business, and live.
            Artists who finance their own development keep ownership and
            creative control.  [oai_citation:3‡Emtee Music Group](https://www.emteemusicgroup.com/emteeprojects)
          </p>
        </section>

        <section id="labels" className="mt-14">
          <h3 className="text-2xl font-semibold">Labels We’ve Worked With</h3>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            The site displays a rotating strip of label/partner logos in this
            section.  [oai_citation:4‡Emtee Music Group](https://www.emteemusicgroup.com/emteeprojects)
          </p>

          {/* Optional: placeholder grid (until you decide what to show) */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
              "Partner / Label",
            ].map((x, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70"
              >
                {x}
              </div>
            ))}
          </div>
        </section>

        <section id="intensive" className="mt-14">
          <h3 className="text-2xl font-semibold">4 Day Intensive</h3>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            The Intensive is the first step to working with EMG—giving
            independent artists a real “industry-level” experience with a team
            supporting music, brand, and business.  [oai_citation:5‡Emtee Music Group](https://www.emteemusicgroup.com/emteeprojects)
          </p>

          <div className="mt-6">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 hover:border-white/35 transition"
            >
              Apply for the Intensive <span className="text-white/80">→</span>
            </Link>
          </div>
        </section>

        <section id="contact" className="mt-14 pb-10">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
            For the demo, you can keep this simple and link to your contact
            email or embed a form later.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">
              Email:{" "}
              <span className="text-white/90 font-semibold">
                contact@emteemusicgroup.com
              </span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

