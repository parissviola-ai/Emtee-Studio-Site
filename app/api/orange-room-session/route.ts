import { appendFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";

function cleanString(value: FormDataEntryValue | null, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isLikelyUrl(value: string) {
  return /^https?:\/\/\S+/i.test(value);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const honeypot = cleanString(formData.get("company"), 120);
  if (honeypot) {
    return NextResponse.redirect(new URL("/orange-room-session?status=success", request.url), 303);
  }

  const artistName = cleanString(formData.get("artist_name"), 140);
  const email = cleanString(formData.get("email"), 200).toLowerCase();
  const instagramHandle = cleanString(formData.get("instagram_handle"), 120);
  const musicLink = cleanString(formData.get("music_link"), 1000);
  const preferredMonth = cleanString(formData.get("preferred_month"), 120);
  const cityTimezone = cleanString(formData.get("city_timezone"), 180);
  const notes = cleanString(formData.get("notes"), 3000);

  if (!artistName || !email || !instagramHandle || !musicLink || !preferredMonth || !cityTimezone || !notes) {
    return NextResponse.redirect(new URL("/orange-room-session?status=error", request.url), 303);
  }

  if (!isValidEmail(email) || !isLikelyUrl(musicLink)) {
    return NextResponse.redirect(new URL("/orange-room-session?status=error", request.url), 303);
  }

  const submission = {
    submittedAt: new Date().toISOString(),
    source: "orange_room_session_short_form",
    artistName,
    email,
    instagramHandle,
    musicLink,
    preferredMonth,
    cityTimezone,
    notes,
    ip:
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await appendFile(
      "/tmp/studio-site-orange-room-session.ndjson",
      `${JSON.stringify(submission)}\n`,
      "utf8"
    );
  } catch (error) {
    console.error("Failed to write orange room session submission", error);
    return NextResponse.redirect(new URL("/orange-room-session?status=error", request.url), 303);
  }

  return NextResponse.redirect(new URL("/orange-room-session?status=success", request.url), 303);
}
