"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { NEWS_ITEMS, type NewsItem } from "./newsData";

const INITIAL_COUNT = 39;
const STEP = 18;

function NewsTile({ post }: { post: NewsItem }) {
  return (
    <a
      href={post.igUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={post.title ? `Open Instagram: ${post.title}` : "Open Instagram post"}
    >
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
        {/* placeholder (CSS-only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-black/[0.02] to-black/[0.04]" />

        <div className="relative aspect-square w-full">
          <Image
            src={post.imageSrc}
            alt={post.title ?? "News image"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            priority={false}
          />
        </div>

        {post.title ? (
          <div className="px-3 py-3">
            <div className="text-sm leading-snug text-black/80">{post.title}</div>
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function NewsClient() {
  const [count, setCount] = useState(INITIAL_COUNT);

  const visible = useMemo(() => NEWS_ITEMS.slice(0, count), [count]);
  const canLoadMore = count < NEWS_ITEMS.length;

  return (
    <main className="min-h-[100svh] w-full bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">News</h1>
            <p className="mt-3 max-w-2xl text-black/60">
              Highlights, placements, moments, and milestones.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <Link
              href="/rooms/front"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold text-black/75 transition hover:bg-black/[0.03]"
            >
              Back to Lobby
            </Link>

            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
            >
              Request a Consultation →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visible.map((post) => (
            <NewsTile key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          {canLoadMore ? (
            <button
              type="button"
              onClick={() => setCount((c) => Math.min(c + STEP, NEWS_ITEMS.length))}
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-2.5 text-sm font-semibold text-black/80 transition hover:bg-black/[0.03]"
            >
              Load more
            </button>
          ) : (
            <div className="text-sm text-black/50">You’re all caught up.</div>
          )}
        </div>
      </div>
    </main>
  );
}
