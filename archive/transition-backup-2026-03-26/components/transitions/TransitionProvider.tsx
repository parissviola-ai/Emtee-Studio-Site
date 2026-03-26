"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";

const ARRIVAL_STORAGE_KEY = "emtee-cinematic-arrival";

type TransitionContextValue = {
  prepareArrival: (route: string) => void;
  consumeArrival: (route: string) => boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pendingArrivalRef = useRef<string | null>(null);

  const prepareArrival = useCallback((route: string) => {
    pendingArrivalRef.current = route;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(ARRIVAL_STORAGE_KEY, route);
    }
  }, []);

  const consumeArrival = useCallback(
    (route: string) => {
      if (pendingArrivalRef.current === route) {
        pendingArrivalRef.current = null;
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(ARRIVAL_STORAGE_KEY);
        }
        return true;
      }

      if (typeof window === "undefined") return false;
      const storedRoute = window.sessionStorage.getItem(ARRIVAL_STORAGE_KEY);
      if (storedRoute === route) {
        window.sessionStorage.removeItem(ARRIVAL_STORAGE_KEY);
        return true;
      }

      return false;
    },
    []
  );

  const value = useMemo(
    () => ({
      prepareArrival,
      consumeArrival,
    }),
    [consumeArrival, prepareArrival]
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function useCinematicTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useCinematicTransition must be used within a TransitionProvider");
  }
  return context;
}
