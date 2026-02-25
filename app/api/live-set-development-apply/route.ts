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
  if (honeypot) return NextResponse.redirect(new URL("/live-set-development-apply?status=success", request.url), 303);

  const name = cleanString(formData.get("name"), 140);
  const email = cleanString(formData.get("email"), 200).toLowerCase();
  const instagramHandle = cleanString(formData.get("instagram_handle"), 120);
  const performanceLink = cleanString(formData.get("performance_link"), 1000);
  const developmentGoal = cleanString(formData.get("development_goal"), 3000);

  if (!name || !email || !instagramHandle || !performanceLink || !developmentGoal || !isValidEmail(email) || !isLikelyUrl(performanceLink)) {
    return NextResponse.redirect(new URL("/live-set-development-apply?status=error", request.url), 303);
  }

  const submission = {
    submittedAt: new Date().toISOString(),
    source: "live_set_development_apply",
    name,
    email,
    instagramHandle,
    performanceLink,
    developmentGoal,
    ip: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await appendFile("/tmp/studio-site-live-set-development-apply.ndjson", `${JSON.stringify(submission)}\n`, "utf8");
  } catch {
    return NextResponse.redirect(new URL("/live-set-development-apply?status=error", request.url), 303);
  }

  return NextResponse.redirect(new URL("/live-set-development-apply?status=success", request.url), 303);
}
