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

  // Basic bot trap: if this hidden field is filled, silently accept and move on.
  const honeypot = cleanString(formData.get("company"), 120);
  if (honeypot) {
    return NextResponse.redirect(new URL("/consultation?status=success", request.url), 303);
  }

  const artistName = cleanString(formData.get("artist_name"), 140);
  const email = cleanString(formData.get("email"), 200).toLowerCase();
  const cityMarket = cleanString(formData.get("city_market"), 200);
  const primaryGenre = cleanString(formData.get("primary_genre"), 120);
  const departmentFocus = cleanString(formData.get("department_focus"), 120);
  const preferredPackageTier = cleanString(formData.get("preferred_package_tier"), 120);
  const currentStage = cleanString(formData.get("current_stage"), 120);
  const goal90Day = cleanString(formData.get("goal_90_day"), 3000);
  const artistLinks = cleanString(formData.get("artist_links"), 3000);
  const whyEmtee = cleanString(formData.get("why_emtee"), 3000);
  const additionalNotesOrDepartments = cleanString(
    formData.get("additional_notes_or_departments"),
    3000
  );
  const multiDepartment1 = cleanString(formData.get("multi_department_1"), 120);
  const multiResource1 = cleanString(formData.get("multi_resource_1"), 240);
  const multiDepartment2 = cleanString(formData.get("multi_department_2"), 120);
  const multiResource2 = cleanString(formData.get("multi_resource_2"), 240);
  const multiDepartment3 = cleanString(formData.get("multi_department_3"), 120);
  const multiResource3 = cleanString(formData.get("multi_resource_3"), 240);

  if (!artistName || !email || !primaryGenre || !departmentFocus || !currentStage || !goal90Day || !whyEmtee) {
    return NextResponse.redirect(new URL("/consultation?status=error", request.url), 303);
  }

  if (!isValidEmail(email)) {
    return NextResponse.redirect(new URL("/consultation?status=error", request.url), 303);
  }

  const submission = {
    submittedAt: new Date().toISOString(),
    source: "consultation_form",
    artistName,
    email,
    cityMarket,
    primaryGenre,
    departmentFocus,
    preferredPackageTier,
    currentStage,
    goal90Day,
    artistLinks,
    whyEmtee,
    additionalNotesOrDepartments,
    multiDepartment1,
    multiResource1,
    multiDepartment2,
    multiResource2,
    multiDepartment3,
    multiResource3,
    ip:
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await appendFile(
      "/tmp/studio-site-consultation-intakes.ndjson",
      `${JSON.stringify(submission)}\n`,
      "utf8"
    );
  } catch (error) {
    console.error("Failed to write consultation intake", error);
    return NextResponse.redirect(new URL("/consultation?status=error", request.url), 303);
  }

  return NextResponse.redirect(new URL("/consultation?status=success", request.url), 303);
}
