"use client";

import TransitionWrapper from "./TransitionWrapper";

type FocusPoint = { x: number; y: number };

export default function BuildingPage({
  isTransitioning,
  focusPoint,
  children,
}: {
  isTransitioning: boolean;
  focusPoint?: FocusPoint | null;
  children: React.ReactNode;
}) {
  return (
    <TransitionWrapper variant="building" active={isTransitioning} focusPoint={focusPoint}>
      {children}
    </TransitionWrapper>
  );
}
