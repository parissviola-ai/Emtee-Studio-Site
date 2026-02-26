import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Labels & Partners | EMTEE Music Group",
};

const PARTNERS = [
  { name: "UMusic", src: "/partners/umusic.png", href: "https://www.universalmusic.com" },
  { name: "Republic Records", src: "/partners/republic.png", href: "https://www.republicrecords.com" },
  { name: "Sony", src: "/partners/sony.png", href: "https://www.sonymusic.com" },
  { name: "Cadence", src: "/partners/cadence.png", href: "https://cadencemusicgroup.com/" },
  { name: "Dharma Studio", src: "/partners/dharmastudio.png", href: "https://www.dharmaworldwide.com/" },
  { name: "Bonfire Records", src: "/partners/bonfire.png", href: "https://www.bonfiremusicgroup.com/about/" },
  { name: "Spinnin’ Records", src: "/partners/spinnin2.svg", href: "https://www.spinninrecords.com" },
];

export default function LabelsPartnersPage() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Luxury depth background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_-10%,rgba(214,174,102,0.16),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_25%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_55%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />
      </div>

      {/* Page content */}
      <div className="relative">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-6 sm:pt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Labels & Partners
              </h1>
              <p className="mt-3 max-w-2xl text-white/70">
                A selection of labels and partners we’ve collaborated with to
                elevate our artists’ careers.
              </p>
              <div className="mt-2 text-xs tracking-widest uppercase text-white/50">
                Trusted by industry leaders
              </div>
              <div className="mt-2 h-px w-24 bg-gradient-to-r from-[#d6ae66]/80 via-white/45 to-transparent" />
              <Image
                src="/logotransparent.png"
                alt="EMTEE logo"
                width={168}
                height={52}
                className="mt-4 h-9 w-auto object-contain brightness-0 invert opacity-85 sm:h-10"
              />
            </div>

            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 transition hover:border-[#d6ae66]/45 hover:bg-white/15 hover:text-white hover:shadow-[0_0_24px_rgba(214,174,102,0.24),0_0_18px_rgba(255,255,255,0.14)]"
            >
              Back to Lobby
            </Link>
          </div>
        </div>

        {/* Partner grid */}
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 md:grid-cols-3">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                title={p.name}
                className="
                  group
                  relative
                  flex items-center justify-center
                  rounded-3xl
                  border border-white/12
                  bg-black/35
                  px-8 py-10 sm:px-12 sm:py-16
                  backdrop-blur-md
                  shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_25px_80px_rgba(0,0,0,0.55)]
                  transition-all duration-300 ease-out
                  hover:border-[#d6ae66]/45
                  hover:bg-black/45
                  hover:-translate-y-1
                  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_0_1px_rgba(214,174,102,0.16),0_30px_90px_rgba(0,0,0,0.65),0_0_40px_rgba(255,255,255,0.10),0_0_52px_rgba(214,174,102,0.18)]
                  hover:after:content-['']
                  hover:after:absolute
                  hover:after:bottom-6
                  hover:after:h-px
                  hover:after:w-12
                  hover:after:bg-gradient-to-r hover:after:from-[#d6ae66]/85 hover:after:via-white/40 hover:after:to-transparent
                "
              >
                <div className="relative h-16 w-full sm:h-24">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                    className="
                      object-contain
                      opacity-90
                      transition
                      group-hover:opacity-100
                      group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.16)]
                      group-hover:drop-shadow-[0_0_24px_rgba(214,174,102,0.2)]
                    "
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-xs text-white/45">
            Want to be listed as a partner?{" "}
            <Link href="/consultation" className="underline hover:text-white/80">
              Request a consultation
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
