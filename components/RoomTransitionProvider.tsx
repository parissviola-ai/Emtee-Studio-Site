"use client";

import React, { createContext, useMemo } from "react";
import { usePathname } from "next/navigation";

type RoomTransitionContextValue = Record<string, never>;

export const RoomTransitionContext = createContext<RoomTransitionContextValue>({});

export function RoomTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const value = useMemo(() => ({}), []);

  return (
    <RoomTransitionContext.Provider value={value}>
      {children}

      {/* Keying by pathname replays the fade each route change without effect state churn */}
      <div
        key={pathname}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.28)", // cinematic but not harsh
          opacity: 0,
          transition: "opacity 420ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          pointerEvents: "none",
          zIndex: 70,
          animation: "roomFadeInOut 420ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      />
    </RoomTransitionContext.Provider>
  );
}
