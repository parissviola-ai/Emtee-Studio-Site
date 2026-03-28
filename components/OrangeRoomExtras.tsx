"use client";

import NextImage from "next/image";
import type { MutableRefObject } from "react";

type OrangeRoomExtrasProps = {
  shouldShowOrangeSessionPreview: boolean;
  onPreviewMouseEnter: () => void;
  onPreviewMouseLeave: () => void;
  orangePreviewVideoRef: MutableRefObject<HTMLVideoElement | null>;
  isOrangePreviewMuted: boolean;
  onPreviewVolumeChange: (muted: boolean) => void;
  onPreviewLoadedMetadata: (video: HTMLVideoElement) => void;
  onPreviewClick: () => void;
  shouldRenderOrangeMobileAudioWidget: boolean;
  orangeMobileAudioRef: MutableRefObject<HTMLVideoElement | null>;
  isOrangeMobileSessionAudioActive: boolean;
  onToggleOrangePreviewMute: () => void;
};

export default function OrangeRoomExtras({
  shouldShowOrangeSessionPreview,
  onPreviewMouseEnter,
  onPreviewMouseLeave,
  orangePreviewVideoRef,
  isOrangePreviewMuted,
  onPreviewVolumeChange,
  onPreviewLoadedMetadata,
  onPreviewClick,
  shouldRenderOrangeMobileAudioWidget,
  orangeMobileAudioRef,
  isOrangeMobileSessionAudioActive,
  onToggleOrangePreviewMute,
}: OrangeRoomExtrasProps) {
  return (
    <>
      {shouldShowOrangeSessionPreview ? (
        <div
          className="absolute left-12 bottom-24 z-50 hidden items-end gap-3 md:flex"
          data-no-pan
          onMouseEnter={onPreviewMouseEnter}
          onMouseLeave={onPreviewMouseLeave}
        >
          <div className="relative h-[411px] w-[232px] overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-[width,height] duration-300 ease-out">
            <video
              ref={(node) => {
                orangePreviewVideoRef.current = node;
              }}
              className="dirty-elephant-studio-preview-video absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-opacity duration-200"
              loop
              muted={isOrangePreviewMuted}
              playsInline
              preload="auto"
              onVolumeChange={(e) => {
                onPreviewVolumeChange(e.currentTarget.muted);
              }}
              onLoadedMetadata={(e) => {
                onPreviewLoadedMetadata(e.currentTarget);
              }}
              onClick={(e) => {
                e.preventDefault();
                onPreviewClick();
              }}
            >
              <source src="/rooms/yanchanvibes.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}

      {shouldRenderOrangeMobileAudioWidget ? (
        <div className="absolute bottom-20 left-2 z-50 flex flex-col items-start gap-2 md:hidden" data-no-pan>
          <video
            ref={(node) => {
              orangeMobileAudioRef.current = node;
            }}
            className="hidden"
            loop
            muted={isOrangePreviewMuted}
            playsInline
            preload="none"
            onLoadedMetadata={(e) => {
              onPreviewLoadedMetadata(e.currentTarget);
            }}
          >
            <source src="/rooms/yanchanvibes.mp4" type="video/mp4" />
          </video>
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/25 bg-black/25 shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
            <NextImage
              src="/case-studies/yanchan.png"
              alt="Yanchan"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          {isOrangeMobileSessionAudioActive ? (
            <button
              type="button"
              onClick={onToggleOrangePreviewMute}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/65 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80"
              aria-label={isOrangePreviewMuted ? "Unmute music" : "Mute music"}
            >
              <span>{isOrangePreviewMuted ? "Unmute Music" : "Mute Music"}</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
