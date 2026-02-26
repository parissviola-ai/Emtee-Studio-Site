"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NEWS_ITEMS } from "@/app/news/newsData";

type Props = {
  href: string;
  navLinkClass: (href: string) => string;
};

type DatesResponse = {
  dates?: Record<string, string | null>;
};

const NEWS_DATES_SESSION_KEY = "emtee_news_dates_v1";

function formatDate(value?: string | null) {
  if (!value) return "Date unavailable";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Date unavailable";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NewsFeedDropdown({ href, navLinkClass }: Props) {
  const [datesByUrl, setDatesByUrl] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDates() {
      const cachedRaw = typeof window !== "undefined" ? window.sessionStorage.getItem(NEWS_DATES_SESSION_KEY) : null;
      if (cachedRaw) {
        try {
          const cached = JSON.parse(cachedRaw) as Record<string, string | null>;
          if (mounted) setDatesByUrl(cached);
          return;
        } catch {
          // fall through to network fetch
        }
      }

      try {
        setLoading(true);
        const res = await fetch("/api/news-feed-dates");
        if (!res.ok) return;
        const data = (await res.json()) as DatesResponse;
        if (!mounted || !data.dates) return;

        const hasAny = Object.values(data.dates).some((d) => !!d);
        if (hasAny) {
          setDatesByUrl(data.dates);
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(NEWS_DATES_SESSION_KEY, JSON.stringify(data.dates));
          }
          return;
        }

        // Retry once if first pull is all-null.
        const refreshRes = await fetch("/api/news-feed-dates?refresh=1");
        if (!refreshRes.ok) return;
        const refreshData = (await refreshRes.json()) as DatesResponse;
        if (!mounted || !refreshData.dates) return;
        setDatesByUrl(refreshData.dates);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(NEWS_DATES_SESSION_KEY, JSON.stringify(refreshData.dates));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDates();

    return () => {
      mounted = false;
    };
  }, []);

  const items = useMemo(
    () =>
      NEWS_ITEMS.map((item) => ({
        id: item.id,
        title: item.title,
        igUrl: item.igUrl,
        dateLabel: formatDate(datesByUrl[item.igUrl]),
      })),
    [datesByUrl]
  );

  return (
    <>
      <div className="relative hidden sm:block group">
        <Link href={href} className={navLinkClass(href)}>
          News
        </Link>

        <div className="pointer-events-none absolute right-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-260 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="w-[430px] max-h-[62svh] overflow-auto rounded-2xl border border-white/15 bg-black/82 p-3 backdrop-blur-2xl shadow-[0_20px_55px_rgba(0,0,0,0.55),0_0_0_1px_rgba(214,174,102,0.14)]">
            <div className="mb-2 flex items-center justify-between px-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d6ae66]/85">News Feed</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d6ae66]/65">
                {loading ? "Syncing dates..." : `${items.length} items`}
              </div>
            </div>

            <div className="space-y-1">
              {items.map((news, idx) => (
                <a
                  key={news.id}
                  href={news.igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item relative block rounded-xl px-3 py-3 transition hover:bg-white/8 hover:shadow-[0_0_0_1px_rgba(214,174,102,0.2),0_0_24px_rgba(214,174,102,0.15),0_0_18px_rgba(255,255,255,0.1)]"
                >
                  <div className="pr-3 text-xs leading-relaxed text-white/84 transition group-hover/item:text-white">
                    {news.title}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d6ae66]/75">
                    {news.dateLabel}
                  </div>
                  {idx < items.length - 1 ? (
                    <div className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6ae66]/55 to-transparent" />
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Link href={href} className={[navLinkClass(href), "sm:hidden"].join(" ")}>
        News
      </Link>
    </>
  );
}
