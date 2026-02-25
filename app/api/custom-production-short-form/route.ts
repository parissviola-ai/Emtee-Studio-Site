import { appendFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";

function cleanString(value: FormDataEntryValue | null, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isLikelyUrl(value: string) {
  return /^https?:\/\/\S+/i.test(value);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const honeypot = cleanString(formData.get("company"), 120);
  if (honeypot) {
    return NextResponse.redirect(new URL("/custom-production-short-form?status=success", request.url), 303);
  }

  const name = cleanString(formData.get("name"), 140);
  const musicLink = cleanString(formData.get("music_link"), 1000);

  if (!name || !musicLink || !isLikelyUrl(musicLink)) {
    return NextResponse.redirect(new URL("/custom-production-short-form?status=error", request.url), 303);
  }

  const submission = {
    submittedAt: new Date().toISOString(),
    source: "custom_production_short_form",
    name,
    musicLink,
    ip:
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await appendFile(
      "/tmp/studio-site-custom-production-short-form.ndjson",
      `${JSON.stringify(submission)}\n`,
      "utf8"
    );
  } catch (error) {
    console.error("Failed to write custom production short form submission", error);
    return NextResponse.redirect(new URL("/custom-production-short-form?status=error", request.url), 303);
  }

  return NextResponse.redirect(new URL("/custom-production-short-form?status=success", request.url), 303);
}
