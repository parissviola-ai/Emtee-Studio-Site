"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { rooms, type Hotspot } from "@/data/rooms";

type Tier = "Tier 1" | "Tier 2" | "Tier 3";
const TIER_PRIORITY: Record<Tier, number> = { "Tier 1": 1, "Tier 2": 2, "Tier 3": 3 };

type QuizQuestion = {
  id: string;
  prompt: string;
  options: Array<{
    label: string;
    value: string;
    scores: Record<Tier, number>;
  }>;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "stage",
    prompt: "Where are you right now?",
    options: [
      {
        label: "Early stage: first releases / building presence",
        value: "early",
        scores: { "Tier 1": 3, "Tier 2": 1, "Tier 3": 0 },
      },
      {
        label: "Growing: dropping consistently and collaborating",
        value: "growing",
        scores: { "Tier 1": 1, "Tier 2": 3, "Tier 3": 1 },
      },
      {
        label: "Established: building a full artist world and fan ecosystem",
        value: "established",
        scores: { "Tier 1": 0, "Tier 2": 1, "Tier 3": 3 },
      },
    ],
  },
  {
    id: "goal",
    prompt: "What is your main priority right now?",
    options: [
      {
        label: "Look professional with one clear official page",
        value: "professional",
        scores: { "Tier 1": 3, "Tier 2": 1, "Tier 3": 0 },
      },
      {
        label: "Organize releases, media, and booking in one hub",
        value: "organize",
        scores: { "Tier 1": 1, "Tier 2": 3, "Tier 3": 1 },
      },
      {
        label: "Build a premium fan experience with deeper engagement",
        value: "experience",
        scores: { "Tier 1": 0, "Tier 2": 1, "Tier 3": 3 },
      },
    ],
  },
  {
    id: "release-cadence",
    prompt: "How active is your release cycle?",
    options: [
      {
        label: "Infrequent / first wave",
        value: "light",
        scores: { "Tier 1": 2, "Tier 2": 1, "Tier 3": 0 },
      },
      {
        label: "Consistent singles / videos / announcements",
        value: "steady",
        scores: { "Tier 1": 1, "Tier 2": 3, "Tier 3": 1 },
      },
      {
        label: "Campaign-based eras with deeper rollouts",
        value: "campaign",
        scores: { "Tier 1": 0, "Tier 2": 1, "Tier 3": 3 },
      },
    ],
  },
  {
    id: "fan-system",
    prompt: "How important is fan retention between releases?",
    options: [
      {
        label: "Important, but basic signup and social links are enough for now",
        value: "basic",
        scores: { "Tier 1": 2, "Tier 2": 1, "Tier 3": 0 },
      },
      {
        label: "Very important: I want stronger recurring engagement",
        value: "medium",
        scores: { "Tier 1": 1, "Tier 2": 2, "Tier 3": 2 },
      },
      {
        label: "Critical: I want fan-only experiences and deeper conversion",
        value: "advanced",
        scores: { "Tier 1": 0, "Tier 2": 1, "Tier 3": 3 },
      },
    ],
  },
];

const QUIZ_RESULT_COPY: Record<Tier, { subtitle: string; summary: string }> = {
  "Tier 1": {
    subtitle: "Starter Site",
    summary: "Best fit if you need a clean, official artist home to establish credibility and centralize your presence.",
  },
  "Tier 2": {
    subtitle: "Growth Site",
    summary: "Best fit if you are actively releasing and need a stronger release hub for fans, media, and booking.",
  },
  "Tier 3": {
    subtitle: "Artist World",
    summary: "Best fit if you are building a full brand universe and want immersive fan retention between drops.",
  },
};

const WEBSITE_DESIGN_ROOM = rooms.find((room) => room.slug === "EMTEEWebDesign");
const WEBSITE_DESIGN_TIER_IDS = [
  "website-design-starter-site",
  "website-design-growth-site",
  "website-design-artist-world",
] as const;

function budgetToTier(budgetRange: string): Tier | null {
  switch (budgetRange) {
    case "under-1k":
      return "Tier 1";
    case "1k-3k":
      return "Tier 2";
    case "3k-6k":
      return "Tier 3";
    case "6k-plus":
      return "Tier 3";
    default:
      return null;
  }
}

function getRecommendedTier(answers: Record<string, string | undefined>, budgetRange: string) {
  const totals: Record<Tier, number> = { "Tier 1": 0, "Tier 2": 0, "Tier 3": 0 };

  for (const question of QUIZ_QUESTIONS) {
    const selected = answers[question.id];
    if (!selected) continue;
    const option = question.options.find((candidate) => candidate.value === selected);
    if (!option) continue;
    totals["Tier 1"] += option.scores["Tier 1"];
    totals["Tier 2"] += option.scores["Tier 2"];
    totals["Tier 3"] += option.scores["Tier 3"];
  }

  const rankedByScore = (Object.entries(totals) as Array<[Tier, number]>).sort((a, b) => b[1] - a[1]);
  const bestScore = rankedByScore[0][1];
  const tiedTiers = rankedByScore.filter((entry) => entry[1] === bestScore).map((entry) => entry[0]);
  let recommended: Tier;

  if (tiedTiers.length === 1) {
    recommended = tiedTiers[0];
  } else {
    const budgetTier = budgetToTier(budgetRange);
    if (budgetTier && tiedTiers.includes(budgetTier)) {
      recommended = budgetTier;
    } else {
      recommended = tiedTiers.sort((a, b) => TIER_PRIORITY[a] - TIER_PRIORITY[b])[0];
    }
  }

  return {
    totals,
    recommended,
  };
}

function getHotspotWithModal(id: string): Hotspot | null {
  if (!WEBSITE_DESIGN_ROOM) return null;
  const hotspot = WEBSITE_DESIGN_ROOM.hotspots.find((candidate) => candidate.id === id);
  if (!hotspot?.modal) return null;
  return hotspot;
}

function labelToTierName(label: string) {
  const split = label.split(":");
  return split.length > 1 ? split[1].trim() : label;
}

function renderModalBody(body: string) {
  const paragraphs = body.split("\n\n").filter(Boolean);
  return paragraphs.map((paragraph, idx) => (
    <p key={`${paragraph}-${idx}`} className="text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
      {paragraph}
    </p>
  ));
}

function extractPurposePoints(body: string) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("• "))
    .map((line) => line.replace(/^•\s*/, ""));
}

function extractStepParts(stepText: string) {
  const [head, ...rest] = stepText.split(":");
  return {
    head: head.trim(),
    detail: rest.join(":").trim(),
  };
}

function extractStepLabel(stepHead: string) {
  const parts = stepHead.split("-");
  return parts.length > 1 ? parts[1].trim() : stepHead;
}

function extractStepMeta(stepHead: string) {
  const numberMatch = stepHead.match(/Step\s*(\d+)/i);
  const stepLabel = numberMatch ? `Step ${numberMatch[1]}` : stepHead;
  const stepName = extractStepLabel(stepHead);
  return { stepLabel, stepName };
}

function parseResourceBodySections(body: string) {
  const tightenParagraphSpacing = (text: string) => text.replace(/\n{2,}/g, "\n").trim();
  const marker = "What this changes:";
  const idx = body.indexOf(marker);
  if (idx === -1) {
    return {
      what: tightenParagraphSpacing(body),
      why: "This package helps artists move with more clarity, credibility, and momentum.",
    };
  }
  const what = tightenParagraphSpacing(body.slice(0, idx));
  const why = tightenParagraphSpacing(body.slice(idx + marker.length));
  return {
    what,
    why: why || "This package helps artists move with more clarity, credibility, and momentum.",
  };
}

type ActiveModalState =
  | { type: "hotspot"; hotspot: Hotspot }
  | { type: "step"; hotspot: Hotspot; stepLabel: string; stepName: string; stepDetail: string };

export default function WebsiteDesignPage() {
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({});
  const [budgetRange, setBudgetRange] = useState("");
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [activeModal, setActiveModal] = useState<ActiveModalState | null>(null);

  const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const complete = answeredCount === QUIZ_QUESTIONS.length;
  const result = useMemo(() => getRecommendedTier(answers, budgetRange), [answers, budgetRange]);
  const requiredQuestionCount = QUIZ_QUESTIONS.length;
  const totalQuizSteps = requiredQuestionCount + 1;
  const atBudgetStep = currentQuizStep === requiredQuestionCount;
  const currentQuestion = atBudgetStep ? null : QUIZ_QUESTIONS[currentQuizStep];
  const questionsEmail = "contact@emteemusicgroup.com";
  const questionsHref = `mailto:${questionsEmail}?subject=${encodeURIComponent("Website Design Question")}&body=${encodeURIComponent("Hi EMTEE team,\n\nI have a question about Website Design.\n\nThanks,")}`;
  const backRoomHref = "/rooms/EMTEEWebDesign";

  const tierHotspots = useMemo(
    () => WEBSITE_DESIGN_TIER_IDS.map((id) => getHotspotWithModal(id)).filter(Boolean) as Hotspot[],
    []
  );
  const howItWorksHotspot = useMemo(() => getHotspotWithModal("website-design-how-it-works"), []);
  const activeHotspotModal = activeModal?.type === "hotspot" ? activeModal.hotspot.modal : undefined;
  const isResourceModal =
    activeModal?.type === "hotspot" &&
    Boolean(
      activeModal?.hotspot.id === "website-design-starter-site" ||
        activeModal?.hotspot.id === "website-design-growth-site" ||
        activeModal?.hotspot.id === "website-design-artist-world"
    );
  const resourceSections =
    activeHotspotModal && isResourceModal
      ? parseResourceBodySections(activeHotspotModal.body)
      : null;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(920px_440px_at_50%_-10%,rgba(214,174,102,0.23),transparent_72%),radial-gradient(760px_560px_at_0%_100%,rgba(15,23,42,0.07),transparent_70%)]"
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-24 sm:px-6 md:pt-28">
        <div className="rounded-[30px] border border-[#d6ae66]/30 bg-white/95 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_24px_72px_rgba(0,0,0,0.1)] backdrop-blur">
          <div className="relative rounded-t-[30px] border-b border-[#d6ae66]/22 bg-[linear-gradient(120deg,rgba(255,255,255,0.98),rgba(255,250,238,0.96))] px-5 py-6 sm:px-8">
            <Link
              href={backRoomHref}
              className="absolute right-5 top-5 inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 sm:right-8 sm:top-6"
            >
              Back
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6a2f]">Website Design</div>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  Build Your Official Artist Space
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
                  Pari V is a digital space curator who loves building custom websites that reflect the work, discipline, and creative identity artists pour into their craft. Her goal is to shape a unique digital home that represents who you are today and who you are becoming next.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/website-design-consultation"
                  className="inline-flex items-center rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/12 px-5 py-2.5 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/20"
                >
                  Request a Consultation
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Credibility", "Identity", "Conversion", "Unified Hub", "Platform Ownership"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-xs font-medium text-[#7a5a24]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-6">
              <div className="rounded-2xl border border-[#d6ae66]/24 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7a5a24]">Resources</h2>
                  <span className="text-xs text-zinc-500">Click to view full package details</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {tierHotspots.map((hotspot) => {
                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        onClick={() => setActiveModal({ type: "hotspot", hotspot })}
                        className={[
                          "rounded-xl border p-4 text-left transition",
                          "border-zinc-200 bg-zinc-50 hover:border-[#d6ae66]/45 hover:bg-[#fffaf0]",
                        ].join(" ")}
                      >
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                          {hotspot.label.split(":")[0]}
                        </div>
                        <div className="mt-1 text-base font-semibold text-zinc-900">{labelToTierName(hotspot.label)}</div>
                        <div className="mt-2 text-xs font-medium text-zinc-500">Open package details</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-[#d6ae66]/24 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7a5a24]">How It Works</h2>
                  <button
                    type="button"
                    onClick={() => {
                      if (!howItWorksHotspot) return;
                      setActiveModal({ type: "hotspot", hotspot: howItWorksHotspot });
                    }}
                    className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    Open Details
                  </button>
                </div>
                {howItWorksHotspot?.modal ? (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {howItWorksHotspot.modal.highlights?.map((item) => {
                      const step = extractStepParts(item);
                      const meta = extractStepMeta(step.head);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setActiveModal({
                              type: "step",
                              hotspot: howItWorksHotspot,
                              stepLabel: meta.stepLabel,
                              stepName: meta.stepName,
                              stepDetail: step.detail,
                            })
                          }
                          className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-3 text-center transition hover:border-[#d6ae66]/45 hover:bg-[#fffaf0]"
                        >
                          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-700">{meta.stepLabel}</div>
                          <div className="mt-1 text-xs font-medium text-zinc-800">{meta.stepName}</div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-[#d6ae66]/24 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7a5a24]">Questions?</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Send your question directly and we will point you to the best next step.
                </p>
                <a
                  href={questionsHref}
                  className="mt-4 inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[#d6ae66]/45 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  Email Direct
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d6ae66]/28 bg-[linear-gradient(175deg,rgba(255,255,255,1),rgba(252,249,242,1))] p-5 shadow-[0_16px_44px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#7a5a24]">Quick Tier Quiz</h2>
                  <p className="mt-1 text-sm text-zinc-600">Answer a few questions to get a package recommendation.</p>
                </div>
                <div className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
                  {answeredCount}/{QUIZ_QUESTIONS.length}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    {atBudgetStep ? `Step ${totalQuizSteps} of ${totalQuizSteps}` : `Question ${currentQuizStep + 1} of ${requiredQuestionCount}`}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentQuizStep((prev) => Math.max(prev - 1, 0))}
                    disabled={currentQuizStep === 0}
                    className={[
                      "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      currentQuizStep === 0
                        ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    Previous
                  </button>
                </div>

                {currentQuestion ? (
                  <fieldset>
                    <legend className="px-1 text-sm font-semibold text-zinc-900">{currentQuestion.prompt}</legend>
                    <div className="mt-3 space-y-2">
                      {currentQuestion.options.map((option) => {
                        const checked = answers[currentQuestion.id] === option.value;
                        return (
                          <label
                            key={option.value}
                            className={[
                              "flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition",
                              checked
                                ? "border-[#d6ae66]/50 bg-[#d6ae66]/10 text-zinc-900"
                                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100",
                            ].join(" ")}
                          >
                            <input
                              type="radio"
                              name={currentQuestion.id}
                              value={option.value}
                              checked={checked}
                              onChange={() => {
                                setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.value }));
                                if (currentQuizStep < requiredQuestionCount - 1) {
                                  setCurrentQuizStep((prev) => prev + 1);
                                } else {
                                  setCurrentQuizStep(requiredQuestionCount);
                                }
                              }}
                              className="mt-0.5 h-4 w-4 accent-[#b88b3a]"
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : (
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-900">Optional: Budget Range</span>
                    <select
                      value={budgetRange}
                      onChange={(event) => setBudgetRange(event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-[#d6ae66]/60 focus:ring-2 focus:ring-[#d6ae66]/30"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="under-1k">Under $1k</option>
                      <option value="1k-3k">$1k-$3k</option>
                      <option value="3k-6k">$3k-$6k</option>
                      <option value="6k-plus">$6k+</option>
                    </select>
                  </label>
                )}

                <div className="mt-4 rounded-xl border border-[#d6ae66]/35 bg-[#fffaf0] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a2f]">
                      Suggested Package
                    </div>
                    <div className="text-[11px] font-medium text-zinc-500">
                      Based on {answeredCount}/{QUIZ_QUESTIONS.length} answers
                    </div>
                  </div>
                  {answeredCount === 0 ? (
                    <p className="mt-1 text-sm text-zinc-500">No suggestion yet. Start the quiz to see your package match.</p>
                  ) : (
                    <>
                      <div className="mt-1 text-base font-semibold text-zinc-900">
                        {result.recommended} - {QUIZ_RESULT_COPY[result.recommended].subtitle}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-700">
                        {QUIZ_RESULT_COPY[result.recommended].summary}
                      </p>
                    </>
                  )}
                  {answeredCount > 0 && !complete ? (
                    <p className="mt-2 text-xs text-zinc-500">
                      Continue the quiz for a finalized recommendation.
                    </p>
                  ) : answeredCount > 0 && budgetRange ? (
                    <p className="mt-2 text-xs text-zinc-500">Budget context: {budgetRange}</p>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/website-design-consultation"
                    className="inline-flex items-center rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/12 px-4 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/20"
                  >
                    Request Consultation for This Recommendation
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setBudgetRange("");
                      setCurrentQuizStep(0);
                    }}
                    className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    Reset Quiz
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {activeModal?.hotspot.modal ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className={[
              "max-h-[88svh] w-full overflow-y-auto rounded-[28px] border border-[#d6ae66]/40 bg-[linear-gradient(165deg,rgba(255,255,255,1),rgba(255,248,232,0.96))] text-zinc-900 shadow-[0_0_0_1px_rgba(214,174,102,0.16),0_30px_90px_rgba(0,0,0,0.32)]",
              isResourceModal ? "max-w-[900px]" : "max-w-2xl",
            ].join(" ")}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-[#d6ae66]/35 bg-[linear-gradient(120deg,rgba(255,255,255,0.98),rgba(255,246,224,0.95))] px-5 py-4">
              <div>
                {activeModal.type === "step" ? (
                  <>
                    <h3 className="text-lg font-bold text-zinc-900">{activeModal.stepLabel}</h3>
                    <div className="mt-0.5 text-sm text-zinc-600">{activeModal.stepName}</div>
                  </>
                ) : (
                  <h3 className="text-lg font-semibold text-zinc-900">{activeModal.hotspot.modal.title}</h3>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-full border border-[#d6ae66]/45 bg-white px-3 py-1 text-xs font-semibold text-[#6f511a] transition hover:bg-[#fff7e8]"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 p-5">
              {activeModal.type === "step" ? (
                <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">Step Details</div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700">{activeModal.stepDetail}</p>
                </div>
              ) : isResourceModal && resourceSections ? (
                <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                  <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">
                      {activeModal.hotspot.modal.highlightsTitle ?? "Includes"}
                    </div>
                    <ul className="mt-2 columns-1 gap-x-6 text-sm text-zinc-700 sm:columns-2">
                      {(activeModal.hotspot.modal.highlights ?? []).map((item) => (
                        <li key={item} className="mb-2 break-inside-avoid flex gap-2 leading-relaxed">
                          <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">What It Is</div>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-700">{resourceSections.what}</p>
                    </div>
                    <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">Why It Matters</div>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-700">{resourceSections.why}</p>
                    </div>
                  </div>
                </div>
              ) : (
                renderModalBody(activeModal.hotspot.modal.body)
              )}
              {activeModal.type === "hotspot" && activeModal.hotspot.id === "website-design-how-it-works" ? (
                <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">Purpose</div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {extractPurposePoints(activeModal.hotspot.modal.body).map((point) => (
                      <div
                        key={point}
                        className="rounded-xl border border-[#d6ae66]/32 bg-white px-3 py-2 text-sm text-zinc-700 shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {activeModal.type === "hotspot" && !isResourceModal && activeModal.hotspot.modal.highlights?.length ? (
                <div className="rounded-xl border border-[#d6ae66]/35 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a2f]">
                    {activeModal.hotspot.modal.highlightsTitle ?? "Includes"}
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {activeModal.hotspot.modal.highlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-[#d6ae66]/32 bg-white px-3 py-2 text-sm text-zinc-700 shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                          <span>{item}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {activeModal.hotspot.modal.primaryHref ? (
                  <Link
                    href={activeModal.hotspot.modal.primaryHref}
                    onClick={() => setActiveModal(null)}
                    className="inline-flex items-center rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/12 px-4 py-2 text-sm font-semibold text-[#6f511a] transition hover:bg-[#d6ae66]/20"
                  >
                    {activeModal.hotspot.modal.primaryLabel ?? "Request a Consultation"}
                  </Link>
                ) : null}
                {activeModal.hotspot.modal.secondaryHref ? (
                  <Link
                    href={activeModal.hotspot.modal.secondaryHref}
                    onClick={() => setActiveModal(null)}
                    className="inline-flex items-center rounded-full border border-[#d6ae66]/35 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-[#d6ae66]/55 hover:bg-[#fff8ed]"
                  >
                    {activeModal.hotspot.modal.secondaryLabel ?? "Resource Packages"}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
