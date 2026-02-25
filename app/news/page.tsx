import Link from "next/link";
import Image from "next/image";
import { NEWS_ITEMS } from "./newsData";

export const metadata = {
  title: "News | EMTEE Music Group",
};

function NewsTile({ item }: { item: (typeof NEWS_ITEMS)[number] }) {
  return (
    <a
      href={item.igUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      aria-label={item.title ? `Open Instagram: ${item.title}` : "Open Instagram post"}
    >
      <div className="accent-card-soft flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
        {/* Square image area */}
        <div className="relative aspect-square w-full overflow-hidden bg-black/[0.03]">
          {/* Lightweight shimmer so it never feels empty (no JS) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.04] via-black/[0.02] to-black/[0.04]" />
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-black/[0.02]" />

          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="relative z-[1] h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Caption */}
        <div className="flex flex-1 flex-col px-4 py-4">
          <div className="min-h-[3.5rem] text-sm leading-snug text-black/80">
            {item.title}
          </div>
          <div className="mt-auto pt-3 text-xs font-semibold text-black/55 transition group-hover:text-black/80">
            View Post →
          </div>
        </div>
      </div>
    </a>
  );
}

export default function NewsPage() {
  return (
    <main className="min-h-[100svh] bg-white">

      {/* 🔹 NEWS HERO HEADER */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[260px]">
        <Image
          src="/news/newsbanner-opt.jpg"
          alt="News banner"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        <div className="relative z-10 flex h-full items-end px-5 pb-6 sm:px-12 sm:pb-10">
          <h1 className="text-5xl font-semibold tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.9),0_8px_30px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl">
            News
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <Image
            src="/Logo2.png"
            alt="EMTEE logo"
            width={56}
            height={56}
            className="h-10 w-10 rounded-md object-contain opacity-80 sm:h-14 sm:w-14"
          />
          <div className="flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:items-end">
            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:bg-black/[0.03] sm:w-auto"
            >
              Back to Lobby
            </Link>

            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto"
            >
              View Our Case Studies →
            </Link>
          </div>
        </div>
      </div>

      {/* Uniform grid */}
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {NEWS_ITEMS.map((item) => (
            <NewsTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
