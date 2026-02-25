import { appendFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";

function cleanString(value: FormDataEntryValue | null, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const honeypot = cleanString(formData.get("company"), 120);
  if (honeypot) {
    return NextResponse.redirect(new URL("/website-design-consultation?status=success", request.url), 303);
  }

  const artistName = cleanString(formData.get("artist_name"), 140);
  const email = cleanString(formData.get("email"), 200).toLowerCase();
  const primaryGenre = cleanString(formData.get("primary_genre"), 140);
  const releaseTiming = cleanString(formData.get("release_timing"), 120);
  const hasWebsite = cleanString(formData.get("has_website"), 40);
  const discoveryChannel = cleanString(formData.get("discovery_channel"), 120);
  const followerRange = cleanString(formData.get("follower_range"), 60);
  const websiteGoals = formData.getAll("website_goals").map((goal) => cleanString(goal, 120)).filter(Boolean);
  const hasProfessionalPhotos = cleanString(formData.get("has_professional_photos"), 40);
  const hasMultipleSongs = cleanString(formData.get("has_multiple_songs"), 40);
  const hasMusicVideos = cleanString(formData.get("has_music_videos"), 40);
  const hasUpcomingShows = cleanString(formData.get("has_upcoming_shows"), 40);
  const hasMerch = cleanString(formData.get("has_merch"), 40);
  const launchTimeframe = cleanString(formData.get("launch_timeframe"), 60);

  if (
    !artistName ||
    !email ||
    !primaryGenre ||
    !releaseTiming ||
    !hasWebsite ||
    !discoveryChannel ||
    !followerRange ||
    !hasProfessionalPhotos ||
    !hasMultipleSongs ||
    !hasMusicVideos ||
    !hasUpcomingShows ||
    !hasMerch ||
    !launchTimeframe ||
    !isValidEmail(email) ||
    websiteGoals.length < 1 ||
    websiteGoals.length > 2
  ) {
    return NextResponse.redirect(new URL("/website-design-consultation?status=error", request.url), 303);
  }

  const submission = {
    submittedAt: new Date().toISOString(),
    source: "website_design_pre_consultation",
    artistName,
    email,
    primaryGenre,
    releaseTiming,
    hasWebsite,
    discoveryChannel,
    followerRange,
    websiteGoals,
    hasProfessionalPhotos,
    hasMultipleSongs,
    hasMusicVideos,
    hasUpcomingShows,
    hasMerch,
    launchTimeframe,
    ip: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await appendFile("/tmp/studio-site-website-design-pre-consultation.ndjson", `${JSON.stringify(submission)}\n`, "utf8");
  } catch {
    return NextResponse.redirect(new URL("/website-design-consultation?status=error", request.url), 303);
  }

  return NextResponse.redirect(new URL("/website-design-consultation?status=success", request.url), 303);
}

