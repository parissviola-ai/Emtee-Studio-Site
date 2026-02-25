import { NextRequest, NextResponse } from "next/server";
import { NEWS_ITEMS } from "@/app/news/newsData";

type CacheShape = {
  createdAt: number;
  dates: Record<string, string | null>;
  hasAnyDate: boolean;
};

const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const FAILED_CACHE_TTL_MS = 1000 * 60; // 1 minute if all dates fail
let cache: CacheShape | null = null;

function normalizeUrl(url: string) {
  try {
    const u = new URL(url);
    u.search = "";
    const clean = u.toString();
    return clean.endsWith("/") ? clean : `${clean}/`;
  } catch {
    return url;
  }
}

function extractInstagramPostPath(url: string) {
  try {
    const u = new URL(normalizeUrl(url));
    if (!u.hostname.includes("instagram.com")) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && (parts[0] === "p" || parts[0] === "reel" || parts[0] === "tv")) {
      return `${parts[0]}/${parts[1]}`;
    }
    return null;
  } catch {
    return null;
  }
}

function parseInstagramDate(html: string): string | null {
  const uploadDate = html.match(/"uploadDate":"([^"]+)"/);
  if (uploadDate?.[1]) return uploadDate[1];

  const datePublished = html.match(/"datePublished":"([^"]+)"/);
  if (datePublished?.[1]) return datePublished[1];

  const ts = html.match(/"taken_at_timestamp":(\d{10,})/);
  if (ts?.[1]) {
    const asNum = Number(ts[1]);
    if (!Number.isNaN(asNum)) {
      return new Date(asNum * 1000).toISOString();
    }
  }

  return null;
}

function parseInstagramEmbedDate(html: string): string | null {
  const timeTag = html.match(/<time[^>]*datetime="([^"]+)"/i);
  if (timeTag?.[1]) return timeTag[1];

  const articlePublished = html.match(/property="article:published_time"\s+content="([^"]+)"/i);
  if (articlePublished?.[1]) return articlePublished[1];

  const ogDescriptionDate = html.match(/content="[^"]*on\s+([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})/i);
  if (ogDescriptionDate?.[1]) {
    const parsed = new Date(ogDescriptionDate[1]);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  return null;
}

async function fetchDateForUrl(url: string): Promise<string | null> {
  const path = extractInstagramPostPath(url);
  if (!path) return null;

  try {
    const headers = {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "accept-language": "en-US,en;q=0.9",
    };

    const res = await fetch(`https://www.instagram.com/${path}/`, {
      headers,
      next: { revalidate: 21600 },
    });

    if (res.ok) {
      const html = await res.text();
      const date = parseInstagramDate(html);
      if (date) return date;
    }

    // Fallback source: embed endpoint is often easier to parse.
    const embedRes = await fetch(`https://www.instagram.com/${path}/embed/captioned/`, {
      headers,
      next: { revalidate: 21600 },
    });

    if (!embedRes.ok) return null;
    const embedHtml = await embedRes.text();
    return parseInstagramEmbedDate(embedHtml);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const now = Date.now();
  const forceRefresh = req.nextUrl.searchParams.get("refresh") === "1";

  if (!forceRefresh && cache) {
    const ttl = cache.hasAnyDate ? CACHE_TTL_MS : FAILED_CACHE_TTL_MS;
    if (now - cache.createdAt < ttl) {
      return NextResponse.json({ dates: cache.dates });
    }
  }

  const uniqueUrls = Array.from(new Set(NEWS_ITEMS.map((item) => item.igUrl)));
  const results = await Promise.all(uniqueUrls.map(async (url) => [url, await fetchDateForUrl(url)] as const));

  const dates: Record<string, string | null> = {};
  let hasAnyDate = false;
  results.forEach(([url, date]) => {
    dates[url] = date;
    if (date) hasAnyDate = true;
  });

  cache = { createdAt: now, dates, hasAnyDate };
  return NextResponse.json({ dates });
}
