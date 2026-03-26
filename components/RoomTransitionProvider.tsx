"use client";

import React, { createContext, useMemo } from "react";

type RoomTransitionContextValue = Record<string, never>;

export const RoomTransitionContext = createContext<RoomTransitionContextValue>({});

export function RoomTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({}), []);

  return <RoomTransitionContext.Provider value={value}>{children}</RoomTransitionContext.Provider>;
}
