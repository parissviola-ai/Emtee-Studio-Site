"use client";

import { useState } from "react";
import { useCinematicTransition } from "./TransitionProvider";
import TransitionWrapper from "./TransitionWrapper";

export default function LobbyPage({
  route,
  children,
}: {
  route: string;
  children: React.ReactNode;
}) {
  const { consumeArrival } = useCinematicTransition();
  const [shouldAnimate] = useState(() => consumeArrival(route));

  return (
    <TransitionWrapper variant="lobby" active={shouldAnimate}>
      {children}
    </TransitionWrapper>
  );
}
