"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type RoomTransitionContextValue = {
  // Keep this empty for now (or add fields later if you need them)
};

export const RoomTransitionContext = createContext<RoomTransitionContextValue>({});

export function RoomTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [overlayOn, setOverlayOn] = useState(false);

  useEffect(() => {
    setOverlayOn(true);

    const t1 = window.setTimeout(() => {
      setOverlayOn(false);
    }, 420);

    return () => window.clearTimeout(t1);
  }, [pathname]);

  const value = useMemo(() => ({}), []);

  return (
  <RoomTransitionContext.Provider value={value}>
    {children}

    {/* Fade overlay (always on top) */}
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.28)", // cinematic but not harsh
        opacity: overlayOn ? 1 : 0,
        transition: "opacity 420ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        pointerEvents: "none",
        zIndex: 70
      }}
    />
  </RoomTransitionContext.Provider>
);

}
