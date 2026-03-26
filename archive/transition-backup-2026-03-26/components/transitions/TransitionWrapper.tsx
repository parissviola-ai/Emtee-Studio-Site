"use client";

import { AnimatePresence, motion } from "framer-motion";

type FocusPoint = { x: number; y: number };

type TransitionWrapperProps = {
  variant: "building" | "lobby";
  active: boolean;
  children: React.ReactNode;
  focusPoint?: FocusPoint | null;
};

const CINEMATIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function buildLightOverlay(focusPoint?: FocusPoint | null) {
  if (!focusPoint) {
    return {
      backgroundImage:
        "radial-gradient(circle at 50% 56%, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 24%, rgba(255,255,255,0) 42%)",
    };
  }

  return {
    backgroundImage: `radial-gradient(circle at ${focusPoint.x}px ${focusPoint.y}px, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 24%, rgba(255,255,255,0) 42%)`,
  };
}

export default function TransitionWrapper({
  variant,
  active,
  children,
  focusPoint,
}: TransitionWrapperProps) {
  const transformOrigin = focusPoint ? `${focusPoint.x}px ${focusPoint.y}px` : "50% 50%";

  if (variant === "building") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <motion.div
          initial={false}
          animate={
            active
              ? {
                  scale: [1, 1.04, 1.08],
                  opacity: [1, 0.98, 0],
                  filter: ["blur(0px)", "blur(1.5px)", "blur(5px)"],
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 1.2,
            ease: CINEMATIC_EASE,
            times: [0, 0.68, 1],
          }}
          style={{ transformOrigin }}
          className="relative h-full w-full will-change-transform"
        >
          {children}
        </motion.div>

        <AnimatePresence>
          {active ? (
            <>
              <motion.div
                key="building-light"
                className="pointer-events-none absolute inset-0 z-[30]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.04, 0.08, 0.02] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: CINEMATIC_EASE, times: [0, 0.48, 0.72, 1] }}
                style={buildLightOverlay(focusPoint)}
              />
              <motion.div
                key="building-whiteout"
                className="pointer-events-none absolute inset-0 z-[32] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.08, 0.45, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: CINEMATIC_EASE, times: [0, 0.52, 0.8, 1] }}
              />
              <motion.div
                key="building-grain"
                className="pointer-events-none absolute inset-0 z-[31] mix-blend-soft-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.04, 0.02] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: CINEMATIC_EASE, times: [0, 0.6, 1] }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
                }}
              />
            </>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-white">
      <motion.div
        initial={active ? { opacity: 0, scale: 1.006, filter: "blur(28px)" } : false}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.85, ease: CINEMATIC_EASE }}
        className="relative min-h-full w-full will-change-transform"
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {active ? (
          <>
            <motion.div
              key="lobby-whitewash"
              className="pointer-events-none absolute inset-0 z-[20] bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: CINEMATIC_EASE }}
            />
            <motion.div
              key="lobby-light"
              className="pointer-events-none absolute inset-0 z-[21]"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.7, ease: CINEMATIC_EASE }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 52%, rgba(255,255,255,0.12), rgba(255,255,255,0.0) 34%)",
              }}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
