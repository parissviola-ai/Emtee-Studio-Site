"use client";

import type { ReactNode } from "react";
import type { DeviceTiltStatus } from "@/lib/useDeviceTiltPan";

type TiltPannableRoomProps = {
  children?: ReactNode;
  showControl: boolean;
  tiltEnabled: boolean;
  tiltStatus: DeviceTiltStatus;
  tiltAvailable: boolean;
  tiltPermissionNeeded: boolean;
  onEnableTilt: () => void;
  onDisableTilt: () => void;
};

export default function TiltPannableRoom({
  children,
  showControl,
  tiltEnabled,
  tiltStatus,
  tiltAvailable,
  tiltPermissionNeeded,
  onEnableTilt,
  onDisableTilt,
}: TiltPannableRoomProps) {
  return (
    <>
      {children}
      {showControl ? (
        <div className="absolute bottom-20 right-2 z-50 flex flex-col items-end gap-1.5" data-no-pan>
          {tiltEnabled ? (
            <button
              type="button"
              onClick={onDisableTilt}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88 backdrop-blur-md transition hover:bg-black/70"
            >
              {tiltStatus === "active" ? "Tilt On" : "Tilt Ready"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onEnableTilt}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/78 backdrop-blur-md transition hover:bg-black/60 hover:text-white"
            >
              {tiltPermissionNeeded || tiltAvailable ? "Enable Tilt" : "Tilt Off"}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
