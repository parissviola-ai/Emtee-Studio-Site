"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type DepartmentKey = "business" | "music" | "marketing" | "publishing" | "sales";

type Option = {
  label: string;
  description: string;
  scores: Record<DepartmentKey, number>;
};

type Question = {
  prompt: string;
  helper: string;
  options: Option[];
};

const DEPARTMENT_META: Record<
  DepartmentKey,
  {
    title: string;
    label: string;
    roomHref: string;
    roomLabel: string;
    summary: string;
    why: string[];
  }
> = {
  business: {
    title: "Business Department",
    label: "Business",
    roomHref: "/rooms/business",
    roomLabel: "Open Business Department",
    summary: "Best for artists and music entrepreneurs who need structure, operations, and clearer decision-making.",
    why: [
      "You need systems, offers, planning, and better business organization.",
      "You are trying to turn creative momentum into repeatable execution.",
      "You would benefit from a stronger operating foundation before scaling everything else.",
    ],
  },
  music: {
    title: "Music Department",
    label: "Music",
    roomHref: "/rooms/music",
    roomLabel: "Open Music Department",
    summary: "Best for artists who need stronger records, better creative direction, and clearer release readiness.",
    why: [
      "Your next move depends on the quality and clarity of the music itself.",
      "You need support around development, production, or song creation.",
      "You are focused on improving the actual product before amplifying it.",
    ],
  },
  marketing: {
    title: "Marketing Department",
    label: "Marketing",
    roomHref: "/rooms/marketing",
    roomLabel: "Open Marketing Department",
    summary: "Best for artists who need stronger brand presentation, content direction, and audience-facing rollout.",
    why: [
      "You already have momentum or music, but the presentation is not translating.",
      "You need better content structure, campaign framing, or visual positioning.",
      "You want the market to understand the artist more clearly and consistently.",
    ],
  },
  publishing: {
    title: "Publishing / Distribution Department",
    label: "Publishing / Distribution",
    roomHref: "/rooms/publishing-distribution",
    roomLabel: "Open Publishing / Distribution Department",
    summary: "Best for artists who need cleaner release structure, catalog setup, and backend organization.",
    why: [
      "You are preparing releases but need the backend handled properly.",
      "You need a better structure for distribution, catalog, and publishing operations.",
      "You want clean release execution and stronger ownership clarity.",
    ],
  },
  sales: {
    title: "A&R / Sales Department",
    label: "A&R / Sales",
    roomHref: "/rooms/ar-sales",
    roomLabel: "Open A&R / Sales Department",
    summary: "Best for artists who need stronger conversion, relationship management, and revenue-facing systems.",
    why: [
      "You need better CRM, partner flow, or outreach follow-through.",
      "You want to convert attention into relationships, opportunities, or sales.",
      "You are ready to organize demand and audience movement more intentionally.",
    ],
  },
};

const QUESTIONS: Question[] = [
  {
    prompt: "What do you need most right now?",
    helper: "Pick the answer that feels most true for your next move.",
    options: [
      {
        label: "Better music and stronger records",
        description: "I need development, production support, or stronger songs.",
        scores: { music: 4, marketing: 1, business: 0, publishing: 0, sales: 0 },
      },
      {
        label: "A stronger public presence",
        description: "I need clearer branding, content, and market presentation.",
        scores: { music: 0, marketing: 4, business: 0, publishing: 0, sales: 1 },
      },
      {
        label: "More structure in my business",
        description: "I need planning, systems, and better operations.",
        scores: { music: 0, marketing: 0, business: 4, publishing: 1, sales: 1 },
      },
      {
        label: "A cleaner release setup",
        description: "I need distribution, catalog, and publishing support.",
        scores: { music: 1, marketing: 0, business: 0, publishing: 4, sales: 0 },
      },
      {
        label: "Better conversion and opportunity flow",
        description: "I need CRM, sales, and relationship systems.",
        scores: { music: 0, marketing: 1, business: 1, publishing: 0, sales: 4 },
      },
    ],
  },
  {
    prompt: "What feels most stuck?",
    helper: "Choose the bottleneck slowing you down the most.",
    options: [
      {
        label: "The songs are not fully there yet",
        description: "The music needs more development before anything else.",
        scores: { music: 4, marketing: 0, business: 0, publishing: 0, sales: 0 },
      },
      {
        label: "The brand looks inconsistent",
        description: "People are not understanding the artist quickly enough.",
        scores: { music: 0, marketing: 4, business: 0, publishing: 0, sales: 1 },
      },
      {
        label: "Everything feels reactive and unorganized",
        description: "I need more clarity, planning, and operational control.",
        scores: { music: 0, marketing: 0, business: 4, publishing: 1, sales: 1 },
      },
      {
        label: "Release logistics are unclear",
        description: "I need a better backend for how the music is being released.",
        scores: { music: 1, marketing: 0, business: 0, publishing: 4, sales: 0 },
      },
      {
        label: "Attention is not converting",
        description: "I need a stronger way to follow up, sell, or move people.",
        scores: { music: 0, marketing: 1, business: 1, publishing: 0, sales: 4 },
      },
    ],
  },
  {
    prompt: "What are you preparing for over the next 90 days?",
    helper: "Think about the most immediate outcome you are working toward.",
    options: [
      {
        label: "Recording or finishing a project",
        description: "My focus is getting the actual music stronger and ready.",
        scores: { music: 4, marketing: 0, business: 0, publishing: 0, sales: 0 },
      },
      {
        label: "A campaign, rollout, or visual push",
        description: "I need the audience-facing strategy to land better.",
        scores: { music: 0, marketing: 4, business: 0, publishing: 1, sales: 1 },
      },
      {
        label: "A more organized business setup",
        description: "I want to stop guessing and build a stronger foundation.",
        scores: { music: 0, marketing: 0, business: 4, publishing: 1, sales: 1 },
      },
      {
        label: "A release with cleaner backend execution",
        description: "I need the release side handled more professionally.",
        scores: { music: 1, marketing: 1, business: 0, publishing: 4, sales: 0 },
      },
      {
        label: "More clients, buyers, partners, or booked opportunities",
        description: "I need demand and relationship flow to convert better.",
        scores: { music: 0, marketing: 1, business: 1, publishing: 0, sales: 4 },
      },
    ],
  },
  {
    prompt: "Which support sounds most valuable to you?",
    helper: "Choose the kind of support that would make the biggest difference.",
    options: [
      {
        label: "Creative direction and song development",
        description: "I need guidance around the music itself.",
        scores: { music: 4, marketing: 0, business: 0, publishing: 0, sales: 0 },
      },
      {
        label: "Brand and content strategy",
        description: "I need a stronger way to show up in the market.",
        scores: { music: 0, marketing: 4, business: 0, publishing: 0, sales: 1 },
      },
      {
        label: "Business operations and planning",
        description: "I need systems, process, and better decision support.",
        scores: { music: 0, marketing: 0, business: 4, publishing: 1, sales: 1 },
      },
      {
        label: "Publishing and distribution support",
        description: "I need backend release and catalog clarity.",
        scores: { music: 1, marketing: 0, business: 0, publishing: 4, sales: 0 },
      },
      {
        label: "CRM, outreach, and conversion systems",
        description: "I need better follow-up and monetization structure.",
        scores: { music: 0, marketing: 1, business: 1, publishing: 0, sales: 4 },
      },
    ],
  },
  {
    prompt: "Which statement sounds most like you right now?",
    helper: "Pick the line that best matches your current stage.",
    options: [
      {
        label: "I need stronger art before I scale anything",
        description: "The music still needs more depth and readiness.",
        scores: { music: 4, marketing: 0, business: 0, publishing: 0, sales: 0 },
      },
      {
        label: "I have something to show, but the presentation is not landing",
        description: "The audience-facing layer needs work.",
        scores: { music: 0, marketing: 4, business: 0, publishing: 0, sales: 1 },
      },
      {
        label: "I have motion, but no real operating system",
        description: "The business side needs to catch up.",
        scores: { music: 0, marketing: 0, business: 4, publishing: 1, sales: 1 },
      },
      {
        label: "I am releasing, but the backend is not clean enough",
        description: "My structure around distribution and catalog needs help.",
        scores: { music: 1, marketing: 0, business: 0, publishing: 4, sales: 0 },
      },
      {
        label: "I need a better system for turning attention into outcomes",
        description: "The commercial side needs more discipline.",
        scores: { music: 0, marketing: 1, business: 1, publishing: 0, sales: 4 },
      },
    ],
  },
];

function getResults(answers: number[]) {
  const totals: Record<DepartmentKey, number> = {
    business: 0,
    music: 0,
    marketing: 0,
    publishing: 0,
    sales: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const option = QUESTIONS[questionIndex]?.options[optionIndex];
    if (!option) return;
    (Object.keys(totals) as DepartmentKey[]).forEach((key) => {
      totals[key] += option.scores[key];
    });
  });

  const ranked = (Object.entries(totals) as Array<[DepartmentKey, number]>).sort((a, b) => b[1] - a[1]);
  return {
    totals,
    primary: ranked[0][0],
    secondary: ranked[1][0],
  };
}

export default function PathQuizClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));

  const currentQuestion = QUESTIONS[currentStep];
  const selectedOption = answers[currentStep];
  const completedCount = answers.filter((answer) => answer !== -1).length;
  const isComplete = answers.every((answer) => answer !== -1);

  const results = useMemo(() => (isComplete ? getResults(answers) : null), [answers, isComplete]);
  const primaryDepartment = results ? DEPARTMENT_META[results.primary] : null;
  const secondaryDepartment = results ? DEPARTMENT_META[results.secondary] : null;
  const entertainmentResults = useMemo(() => {
    const hasAnyAnswer = answers.some((answer) => answer !== -1);
    if (!hasAnyAnswer) return null;
    return getResults(answers);
  }, [answers]);
  const entertainmentPrimaryDepartment = entertainmentResults ? DEPARTMENT_META[entertainmentResults.primary] : null;
  const entertainmentSecondaryDepartment = entertainmentResults ? DEPARTMENT_META[entertainmentResults.secondary] : null;

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentStep] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (selectedOption === -1) return;
    setCurrentStep((prev) => Math.min(prev + 1, QUESTIONS.length));
  }

  function goBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  function restart() {
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setCurrentStep(0);
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-zinc-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(920px_420px_at_50%_-16%,rgba(214,174,102,0.19),transparent_70%),radial-gradient(760px_520px_at_12%_95%,rgba(15,23,42,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.035)_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <section className="relative mx-auto max-w-[68rem] px-6 pb-20 pt-28">
        <div className="overflow-hidden rounded-[28px] border border-[#d6ae66]/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,250,242,0.9))] p-4 shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_28px_90px_rgba(0,0,0,0.12)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2f]">
              EMTEE Routing Quiz
            </div>
            <div className="rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
              5 Questions
            </div>
          </div>
          <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d6ae66]/85">
            EMTEE Routing Quiz
          </div>
          <div className="mt-2.5 flex items-center gap-3">
            <h1 className="max-w-3xl text-[2rem] font-semibold tracking-tight text-zinc-900 sm:text-[2.35rem]">
              Which EMTEE Path Should You Start With?
            </h1>
            <Image
              src="/Logo2.png"
              alt="EMTEE logo"
              width={44}
              height={44}
              className="h-9 w-9 rounded-md object-contain opacity-80 sm:h-10 sm:w-10"
            />
          </div>
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-zinc-700 sm:text-sm">
            This quiz recommends the department that best matches your current bottleneck, goals, and next move.
            It is built to help artists, producers, writers, engineers, and music entrepreneurs find the clearest
            starting lane inside EMTEE.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Back to About
            </Link>
            <Link
              href="/rooms/lobby"
              className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
            >
              Back to Lobby
            </Link>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-5 lg:grid-cols-[minmax(0,1.12fr)_300px]">
          <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(250,250,249,0.96))] p-4 shadow-[0_18px_56px_rgba(0,0,0,0.09)] sm:p-5">
            {!isComplete ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Guided Pathing
                  </div>
                  <div className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold text-zinc-500">
                    {completedCount} answered
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {QUESTIONS.map((_, index) => {
                    const isCurrent = index === currentStep;
                    const isDone = answers[index] !== -1;
                    return (
                      <div
                        key={`step-${index}`}
                        className={[
                          "h-2.5 rounded-full transition-all duration-300",
                          isCurrent
                            ? "w-12 bg-[linear-gradient(90deg,#d6ae66,#8b6a2f)] shadow-[0_0_18px_rgba(214,174,102,0.35)]"
                            : isDone
                              ? "w-6 bg-[#d6ae66]/55"
                              : "w-6 bg-zinc-200",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 h-1.5 rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#d6ae66,#8b6a2f)] shadow-[0_0_18px_rgba(214,174,102,0.45)] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <div className="mt-7 rounded-[28px] border border-[#d6ae66]/18 bg-[linear-gradient(145deg,rgba(255,252,246,0.92),rgba(255,255,255,0.98))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b6a2f]/75">
                    Question {currentStep + 1}
                  </div>
                  <h2 className="mt-2.5 text-[1.55rem] font-semibold tracking-tight text-zinc-900 sm:text-[1.8rem] sm:leading-[1.08]">
                    {currentQuestion.prompt}
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]">
                    {currentQuestion.helper}
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  {currentQuestion.options.map((option, optionIndex) => {
                    const isSelected = selectedOption === optionIndex;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => selectAnswer(optionIndex)}
                        className={[
                          "group rounded-[24px] border p-3 text-left transition-all duration-200 sm:p-3.5",
                          isSelected
                            ? "border-[#d6ae66]/60 bg-[linear-gradient(145deg,rgba(214,174,102,0.14),rgba(255,255,255,0.98))] shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_22px_48px_rgba(0,0,0,0.07)]"
                            : "border-zinc-200 bg-white hover:-translate-y-[2px] hover:border-[#d6ae66]/40 hover:bg-[#d6ae66]/[0.04] hover:shadow-[0_22px_48px_rgba(0,0,0,0.07)]",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={[
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition",
                              isSelected
                                ? "border-[#d6ae66]/55 bg-[#d6ae66]/14 text-[#8b6a2f]"
                                : "border-zinc-200 bg-zinc-50 text-zinc-500 group-hover:border-[#d6ae66]/35 group-hover:text-[#8b6a2f]",
                            ].join(" ")}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[15px] font-semibold tracking-tight text-zinc-900">
                              {option.label}
                            </div>
                            <div className="mt-1 text-[13px] leading-relaxed text-zinc-600 sm:text-[14px]">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={selectedOption === -1}
                    className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[linear-gradient(145deg,rgba(214,174,102,0.22),rgba(255,255,255,0.95))] px-4 py-1.5 text-[13px] font-semibold text-[#6f511a] shadow-[0_14px_28px_rgba(214,174,102,0.18)] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {currentStep === QUESTIONS.length - 1 ? "See My Result" : "Next"}
                  </button>
                </div>
              </>
            ) : primaryDepartment && secondaryDepartment ? (
              <>
                <div className="inline-flex rounded-full border border-[#d6ae66]/35 bg-[#d6ae66]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]">
                  Your Result
                </div>
                <h2 className="mt-3.5 max-w-3xl text-[2rem] font-semibold tracking-tight text-zinc-900 sm:text-[2.35rem] sm:leading-[1.08]">
                  Start with the {primaryDepartment.title}
                </h2>
                <p className="mt-2.5 max-w-3xl text-[13px] leading-relaxed text-zinc-700 sm:text-sm">
                  {primaryDepartment.summary}
                </p>

                <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                  <article className="rounded-[24px] border border-[#d6ae66]/30 bg-[linear-gradient(145deg,rgba(214,174,102,0.12),rgba(255,255,255,0.98))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                      Primary Path
                    </div>
                    <div className="mt-2 text-[1.2rem] font-semibold tracking-tight text-zinc-900">{primaryDepartment.title}</div>
                    <ul className="mt-3.5 space-y-2 text-[13px] text-zinc-700">
                      {primaryDepartment.why.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d6ae66]/85" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Secondary Support Lane
                    </div>
                    <div className="mt-2 text-[1.05rem] font-semibold text-zinc-900">{secondaryDepartment.title}</div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-700">
                      This is the second lane likely to support your next phase once the main bottleneck is addressed.
                    </p>
                  </article>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={primaryDepartment.roomHref}
                    className="inline-flex items-center justify-center rounded-full border border-[#d6ae66]/55 bg-[linear-gradient(145deg,rgba(214,174,102,0.22),rgba(255,255,255,0.95))] px-4 py-1.5 text-[13px] font-semibold text-[#6f511a] shadow-[0_14px_28px_rgba(214,174,102,0.18)] transition hover:bg-[#d6ae66]/24 hover:text-[#3e2d0d]"
                  >
                    {primaryDepartment.roomLabel}
                  </Link>
                  <Link
                    href="https://api.leadconnectorhq.com/widget/form/OCZlqiAaqvcyzZofALhy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-1.5 text-[13px] font-semibold text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                  >
                    Book a Consultation
                  </Link>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-4 py-1.5 text-[13px] font-semibold text-black/75 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition hover:border-[#d6ae66]/45 hover:bg-black/[0.03]"
                  >
                    Retake Quiz
                  </button>
                </div>
              </>
            ) : null}
          </section>

          <aside className="self-start rounded-[28px] border border-zinc-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(249,250,251,0.96))] p-3.5 shadow-[0_18px_56px_rgba(0,0,0,0.09)] lg:sticky lg:top-28">
            {!isComplete ? (
              <>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Live Path Preview
                </div>
                <div className="mt-3 rounded-[24px] border border-[#d6ae66]/26 bg-[linear-gradient(145deg,rgba(214,174,102,0.08),rgba(255,255,255,0.98))] p-3.5">
                  {entertainmentPrimaryDepartment ? (
                    <>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                        Currently Leading
                      </div>
                      <div className="mt-1.5 text-[1.1rem] font-semibold tracking-tight text-zinc-900">
                        {entertainmentPrimaryDepartment.title}
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">
                        {entertainmentPrimaryDepartment.summary}
                      </p>

                      <div className="mt-3 rounded-2xl border border-white/70 bg-white/80 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Secondary Support Lane
                        </div>
                        <div className="mt-1.5 text-[14px] font-semibold text-zinc-900">
                          {entertainmentSecondaryDepartment?.title}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                        No Path Yet
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">
                        Start answering and the strongest EMTEE path will begin to surface here in real time.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    EMTEE Paths
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {(Object.values(DEPARTMENT_META)).map((department) => (
                      <span
                        key={department.title}
                        className={[
                          "rounded-full border px-3 py-1 text-[11px] font-semibold shadow-[0_8px_18px_rgba(0,0,0,0.04)]",
                          entertainmentPrimaryDepartment?.title === department.title
                            ? "border-[#d6ae66]/45 bg-[#d6ae66]/12 text-[#8b6a2f]"
                            : "border-[#d6ae66]/28 bg-white text-zinc-700",
                        ].join(" ")}
                      >
                        {department.label}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Next Step
                </div>
                <div className="mt-4 rounded-[26px] border border-[#d6ae66]/26 bg-[linear-gradient(145deg,rgba(214,174,102,0.08),rgba(255,255,255,0.98))] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b6a2f]/85">
                    Recommended Start
                  </div>
                  <div className="mt-2 text-[1.2rem] font-semibold tracking-tight text-zinc-900">
                    {primaryDepartment?.label}
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-700">
                    Move into the recommended department to review the room, offers, and next-fit resources before
                    booking your consultation.
                  </p>
                </div>
                <div className="mt-5 text-[13px] leading-relaxed text-zinc-700">
                  The result is a starting point, not a limit. EMTEE is designed so departments can support each other
                  as your path develops.
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
