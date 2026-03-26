import type { Metadata } from "next";
import PathQuizClient from "./PathQuizClient";

export const metadata: Metadata = {
  title: "Which EMTEE Path Should You Start With? | EMTEE Music Group",
  description: "Take the EMTEE path quiz to find the department that best fits your current stage, bottleneck, and next move.",
};

export default function PathQuizPage() {
  return <PathQuizClient />;
}
