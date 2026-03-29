"use client";

import NextImage from "next/image";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type OrangeRoomExtrasHandle = {
  openSessionPreview: () => void;
  closeSessionPreview: () => void;
  startMobileSessionAudio: () => void;
  togglePreviewMute: () => void;
};

type OrangeRoomExtrasProps = {
  isOrangeRoom: boolean;
  isMobileViewport: boolean;
  isSessionModalOpen: boolean;
  isPreviewMuted: boolean;
  onPreviewMutedChange: (muted: boolean) => void;
};

const OrangeRoomExtras = forwardRef<OrangeRoomExtrasHandle, OrangeRoomExtrasProps>(
  function OrangeRoomExtras(
    {
      isOrangeRoom,
      isMobileViewport,
      isSessionModalOpen,
      isPreviewMuted,
      onPreviewMutedChange,
    }: OrangeRoomExtrasProps,
    ref
  ) {
    const [isSessionPreviewVisible, setIsSessionPreviewVisible] = useState(false);
    const [isMobileSessionAudioActive, setIsMobileSessionAudioActive] = useState(false);
    const orangePreviewVideoRef = useRef<HTMLVideoElement | null>(null);
    const orangeMobileAudioRef = useRef<HTMLVideoElement | null>(null);
    const previewHideTimerRef = useRef<number | undefined>(undefined);

    const shouldShowSessionPreview =
      isOrangeRoom && !isMobileViewport && (isSessionPreviewVisible || isSessionModalOpen);
    const shouldRenderMobileAudioWidget =
      isOrangeRoom &&
      isMobileViewport &&
      (isSessionModalOpen || isMobileSessionAudioActive);

    const clearPreviewHideTimer = useCallback(() => {
      if (previewHideTimerRef.current === undefined) return;
      window.clearTimeout(previewHideTimerRef.current);
      previewHideTimerRef.current = undefined;
    }, []);

    const openSessionPreview = useCallback(() => {
      clearPreviewHideTimer();
      setIsSessionPreviewVisible(true);
    }, [clearPreviewHideTimer]);

    const closeSessionPreview = useCallback(() => {
      clearPreviewHideTimer();
      previewHideTimerRef.current = window.setTimeout(() => {
        setIsSessionPreviewVisible(false);
        previewHideTimerRef.current = undefined;
      }, 140);
    }, [clearPreviewHideTimer]);

    const forcePlayPreviewWithSound = useCallback(() => {
      const video = orangeMobileAudioRef.current ?? orangePreviewVideoRef.current;
      if (!video) return;
      video.muted = false;
      video.defaultMuted = false;
      video.removeAttribute("muted");
      video.volume = Math.max(video.volume, 0.2);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      requestAnimationFrame(() => {
        video.muted = false;
        video.defaultMuted = false;
        video.removeAttribute("muted");
      });
      onPreviewMutedChange(false);
    }, []);

    const togglePreviewMute = useCallback(() => {
      const video = orangeMobileAudioRef.current ?? orangePreviewVideoRef.current;
      if (!video) return;
      const nextMuted = !isPreviewMuted;
      video.muted = nextMuted;
      video.defaultMuted = nextMuted;
      if (nextMuted) {
        video.setAttribute("muted", "true");
      } else {
        video.removeAttribute("muted");
        video.volume = Math.max(video.volume, 0.2);
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }
      onPreviewMutedChange(nextMuted);
    }, [isPreviewMuted, onPreviewMutedChange]);

    const startMobileSessionAudio = useCallback(() => {
      const video = orangeMobileAudioRef.current;
      if (!video) return;
      video.muted = false;
      video.defaultMuted = false;
      video.removeAttribute("muted");
      video.volume = Math.max(video.volume, 0.2);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      onPreviewMutedChange(false);
      setIsMobileSessionAudioActive(true);
    }, [onPreviewMutedChange]);

    useImperativeHandle(
      ref,
      () => ({
        openSessionPreview,
        closeSessionPreview,
        startMobileSessionAudio,
        togglePreviewMute,
      }),
      [closeSessionPreview, openSessionPreview, startMobileSessionAudio, togglePreviewMute]
    );

    useEffect(() => {
      if (!isOrangeRoom) return;
      const video = orangePreviewVideoRef.current;
      if (!video) return;
      video.muted = false;
      video.defaultMuted = false;
      video.removeAttribute("muted");
      video.pause();
      onPreviewMutedChange(false);
    }, [isOrangeRoom, onPreviewMutedChange]);

    useEffect(() => {
      if (isOrangeRoom) return;
      setIsSessionPreviewVisible(false);
    }, [isOrangeRoom]);

    useEffect(() => {
      if (isSessionModalOpen) return;
      setIsSessionPreviewVisible(false);
    }, [isSessionModalOpen]);

    useEffect(() => {
      return () => {
        clearPreviewHideTimer();
      };
    }, [clearPreviewHideTimer]);

    useEffect(() => {
      const video = orangePreviewVideoRef.current;
      if (!video) return;
      if (!shouldShowSessionPreview) {
        video.pause();
        return;
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }, [shouldShowSessionPreview]);

    useEffect(() => {
      if (!isOrangeRoom || !isMobileViewport) return;
      const video = orangeMobileAudioRef.current;
      if (!video) return;

      video.muted = isPreviewMuted;
      video.defaultMuted = isPreviewMuted;
      video.playsInline = true;
      video.setAttribute("playsinline", "true");
    }, [isOrangeRoom, isMobileViewport, isPreviewMuted]);

    useEffect(() => {
      if (!isMobileViewport) return;
      if (isSessionModalOpen) return;
      const video = orangeMobileAudioRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "true");
      onPreviewMutedChange(true);
      setIsMobileSessionAudioActive(false);
    }, [isMobileViewport, isSessionModalOpen, onPreviewMutedChange]);

    if (!isOrangeRoom) return null;

    return (
      <>
        {shouldShowSessionPreview ? (
          <div
            className="absolute left-12 bottom-24 z-50 hidden items-end gap-3 md:flex"
            data-no-pan
            onMouseEnter={openSessionPreview}
            onMouseLeave={closeSessionPreview}
          >
            <div className="relative h-[411px] w-[232px] overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-[width,height] duration-300 ease-out">
              <video
                ref={orangePreviewVideoRef}
                className="dirty-elephant-studio-preview-video absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-opacity duration-200"
                loop
                muted={isPreviewMuted}
                playsInline
                preload="auto"
                onVolumeChange={(e) => {
                  onPreviewMutedChange(e.currentTarget.muted);
                }}
                onLoadedMetadata={(e) => {
                  e.currentTarget.volume = 0.2;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  forcePlayPreviewWithSound();
                }}
              >
                <source src="/rooms/yanchanvibes.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        ) : null}

        {shouldRenderMobileAudioWidget ? (
          <div className="absolute bottom-20 left-2 z-50 flex flex-col items-start gap-2 md:hidden" data-no-pan>
            <video
              ref={orangeMobileAudioRef}
              className="hidden"
              loop
                muted={isPreviewMuted}
              playsInline
              preload="none"
              onLoadedMetadata={(e) => {
                e.currentTarget.volume = 0.2;
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
            {isMobileSessionAudioActive ? (
              <button
                type="button"
                onClick={togglePreviewMute}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/65 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md transition hover:bg-black/80"
                aria-label={isPreviewMuted ? "Unmute music" : "Mute music"}
              >
                <span>{isPreviewMuted ? "Unmute Music" : "Mute Music"}</span>
              </button>
            ) : null}
          </div>
        ) : null}
      </>
    );
  }
);

export default OrangeRoomExtras;
