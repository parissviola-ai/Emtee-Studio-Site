"use client";

import NextImage from "next/image";
import Link from "next/link";
import { Fragment, type ComponentType, type MutableRefObject, type ReactNode } from "react";

type RoomModalLayerProps = {
  activeModal: any;
  closeModal: () => void;
  openModal: (modal: any) => void;
  modalBackModal: any;
  setModalBackModal: (modal: any) => void;
  isStartHereModal: boolean;
  isOrangeModal: boolean;
  isQuietModal: boolean;
  isOrangeSessionModalOpen: boolean;
  isOrangePreviewMuted: boolean;
  toggleOrangePreviewMute: () => void;
  resolvedCornerLogo?: string;
  resolvedCornerLogoAlt?: string;
  revealStep: number;
  iframeRef: MutableRefObject<HTMLIFrameElement | null>;
  resolvedVideoEmbedSrc: string | null;
  isYoutubeEmbed: boolean;
  videoMuted: boolean;
  setVideoMuted: (muted: boolean) => void;
  muteYoutube: () => void;
  unmuteYoutube: () => void;
  isYanchanMusicModal: boolean;
  isJoinCommunityModal: boolean;
  isCarouselModal: boolean;
  activeCarouselSlide: any;
  activeCarouselIndex: number;
  setActiveCarouselIndex: (value: number | ((prev: number) => number)) => void;
  activeResourceContext: any;
  isWebsiteDesignTierModal: boolean;
  parsedModalBody: { before: string; includes: string[]; after: string };
  isPilotFoldablePackageModal: boolean;
  visiblePilotModalIncludes: string[];
  modalIncludesKey: string;
  isPilotModalIncludesExpanded: boolean;
  setExpandedPackageIncludesByModal: (value: any) => void;
  renderModalBodyWithBoldIncludes: (text: string) => ReactNode;
  renderStartHereStepsWithBoldTitles: (text: string) => ReactNode;
  roomHotspots: any[];
  isPackageGridModal: boolean;
  isWebsiteDesignMainModal: boolean;
  isLiveRoomModal: boolean;
  SocialIcon: ComponentType<{ label: string; className?: string }>;
  openExploreMenu: () => void;
};

export default function RoomModalLayer({
  activeModal,
  closeModal,
  openModal,
  modalBackModal,
  setModalBackModal,
  isStartHereModal,
  isOrangeModal,
  isQuietModal,
  isOrangeSessionModalOpen,
  isOrangePreviewMuted,
  toggleOrangePreviewMute,
  resolvedCornerLogo,
  resolvedCornerLogoAlt,
  revealStep,
  iframeRef,
  resolvedVideoEmbedSrc,
  isYoutubeEmbed,
  videoMuted,
  setVideoMuted,
  muteYoutube,
  unmuteYoutube,
  isYanchanMusicModal,
  isJoinCommunityModal,
  isCarouselModal,
  activeCarouselSlide,
  activeCarouselIndex,
  setActiveCarouselIndex,
  activeResourceContext,
  isWebsiteDesignTierModal,
  parsedModalBody,
  isPilotFoldablePackageModal,
  visiblePilotModalIncludes,
  modalIncludesKey,
  isPilotModalIncludesExpanded,
  setExpandedPackageIncludesByModal,
  renderModalBodyWithBoldIncludes,
  renderStartHereStepsWithBoldTitles,
  roomHotspots,
  isPackageGridModal,
  isWebsiteDesignMainModal,
  isLiveRoomModal,
  SocialIcon,
  openExploreMenu,
}: RoomModalLayerProps) {
  if (!activeModal) return null;

  const handleModalTarget = (href: string, backModal?: any) => {
    const modalLinkId = href.slice(6);
    const targetSpot = roomHotspots.find((spot) => spot.id === modalLinkId);
    if (!targetSpot?.modal) return;
    setModalBackModal(backModal ?? activeModal);
    openModal(targetSpot.modal);
  };

  const secondaryButtonClass = [
    "inline-flex items-center justify-center rounded-full transition",
    isStartHereModal
      ? "border border-white/18 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium text-white/76 hover:border-white/26 hover:bg-white/9 hover:text-white/88"
      : isOrangeModal
      ? "border border-dirty-elephant-studio-200/28 bg-black/35 px-5 py-2 text-sm font-semibold text-dirty-elephant-studio-100/90 hover:border-dirty-elephant-studio-200/45 hover:bg-black/55"
      : isQuietModal
      ? "border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
      : isLiveRoomModal
      ? "border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/18 hover:text-white"
      : "border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/18 hover:text-white",
  ].join(" ");

  const primaryButtonClass = [
    "inline-flex items-center justify-center rounded-full transition",
    isStartHereModal
      ? "border border-white/18 bg-white/9 px-3.5 py-1.5 text-[11px] font-medium text-white/86 hover:border-white/30 hover:bg-white/14 hover:text-white"
      : isOrangeModal
      ? "border border-dirty-elephant-studio-200/28 bg-black/35 px-5 py-2 text-sm font-semibold text-dirty-elephant-studio-100/90 shadow-[0_0_0_1px_rgba(247,196,138,0.16),0_10px_24px_rgba(0,0,0,0.32)] hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
      : isQuietModal
      ? "border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
      : isLiveRoomModal
      ? "border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/18 hover:text-white"
      : "border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-white/18 hover:text-white",
  ].join(" ");

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom)+1rem)] md:items-center md:p-6 pointer-events-auto">
      <button type="button" aria-label="Close modal" onClick={closeModal} className="absolute inset-0 bg-black/60" />

      <div
        className={[
          isStartHereModal
            ? "relative z-10 my-2 flex w-full max-w-[320px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:my-0 md:max-h-[85svh]"
            : "relative z-10 my-2 flex w-full max-w-[900px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:my-0 md:max-h-[85svh]",
          isOrangeModal
            ? "border border-dirty-elephant-studio-300/28 bg-[linear-gradient(160deg,rgba(15,10,6,0.9),rgba(10,8,6,0.86))] shadow-[0_0_0_1px_rgba(251,191,118,0.12),0_30px_80px_rgba(0,0,0,0.62)]"
            : "border border-white/15 bg-black/55",
        ].join(" ")}
      >
        <div className={["flex-1 overflow-y-auto", isStartHereModal ? "p-2 md:p-2.5" : "p-6 pb-8 md:pb-10"].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 w-full">
              {activeModal.headerLogo ? (
                <div
                  className={[
                    "mb-2 transition-all duration-700 ease-out",
                    revealStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  ].join(" ")}
                >
                  <NextImage
                    src={activeModal.headerLogo}
                    alt={activeModal.headerLogoAlt ?? activeModal.title}
                    width={activeModal.headerLogo === "/rooms/sdslogo2.png" ? 96 : 220}
                    height={activeModal.headerLogo === "/rooms/sdslogo2.png" ? 96 : 60}
                    sizes={activeModal.headerLogo === "/rooms/sdslogo2.png" ? "96px" : "220px"}
                    className={[
                      activeModal.headerLogo === "/rooms/sdslogo2.png"
                        ? "h-20 w-20 object-contain"
                        : "h-auto w-auto max-w-[180px] object-contain",
                      activeModal.headerLogo === "/rooms/yanchanblack6-removebg.png" ? "invert" : "",
                    ].join(" ")}
                  />
                </div>
              ) : null}

              {!activeModal.hideTitle ? (
                <h2
                  className={[
                    isStartHereModal
                      ? "text-[1.35rem] font-semibold tracking-wide whitespace-pre-line transition-all duration-700 ease-out"
                      : "text-2xl font-semibold tracking-wide whitespace-pre-line transition-all duration-700 ease-out",
                    isOrangeModal ? "text-[#ffd9ab] [text-shadow:0_0_20px_rgba(251,191,118,0.28)]" : "",
                    revealStep >= 1
                      ? "opacity-100 translate-y-0 drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                      : "opacity-0 translate-y-2",
                  ].join(" ")}
                >
                  {activeModal.title.split("\n").map((line: string, index: number, lines: string[]) => (
                    <Fragment key={`${line}-${index}`}>
                      {line}
                      {index < lines.length - 1 ? <br /> : null}
                    </Fragment>
                  ))}
                </h2>
              ) : null}
            </div>

            {resolvedCornerLogo ? (
              <div
                className={[
                  "shrink-0 transition-all duration-700 ease-out",
                  revealStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
              >
                <div className="flex flex-col items-end gap-3">
                  <NextImage
                    src={resolvedCornerLogo}
                    alt={resolvedCornerLogoAlt ?? activeModal.title}
                    width={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? 144 : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? 120 : 66}
                    height={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? 72 : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? 48 : 26}
                    sizes={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? "144px" : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? "120px" : "66px"}
                    className={[
                      resolvedCornerLogo === "/rooms/TenTenlogo.png"
                        ? "h-auto w-auto max-w-[132px] object-contain"
                        : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png"
                        ? "h-auto w-auto max-w-[110px] object-contain"
                        : "h-auto w-auto max-w-[60px] object-contain",
                      resolvedCornerLogo === "/logotransparent.png" ? "invert" : "",
                      resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" || resolvedCornerLogo === "/rooms/TenTenlogo.png" ? "invert" : "",
                    ].join(" ")}
                  />
                  {isOrangeSessionModalOpen ? (
                    <button
                      type="button"
                      onClick={toggleOrangePreviewMute}
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-dirty-elephant-studio-200/30 bg-black/45 px-4 py-2 text-xs font-semibold text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/50 hover:bg-black/60"
                    >
                      {isOrangePreviewMuted ? "Unmute Music" : "Mute Music"}
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 w-full">
            {activeModal.videoEmbed ? (
              <div
                className={[
                  "mt-6 flex justify-center transition-all duration-700 ease-out",
                  revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
              >
                <div className="relative w-full max-w-[640px] overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="relative aspect-video">
                    <iframe
                      ref={iframeRef}
                      src={resolvedVideoEmbedSrc ?? activeModal.videoEmbed}
                      title={activeModal.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                    {isYoutubeEmbed ? (
                      <button
                        type="button"
                        onClick={() => {
                          const nextMuted = !videoMuted;
                          setVideoMuted(nextMuted);
                          if (nextMuted) muteYoutube();
                          else unmuteYoutube();
                        }}
                        className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md transition hover:bg-black/65 hover:text-white"
                      >
                        {videoMuted ? "Unmute" : "Mute"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {activeModal.image && isYanchanMusicModal ? (
              <div className={["mt-6 transition-all duration-700 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                  <NextImage src={activeModal.image} alt={activeModal.title} fill sizes="(max-width: 900px) 100vw, 900px" className="object-contain" style={{ objectPosition: "center -60px" }} />
                </div>
              </div>
            ) : null}

            {activeModal.image && isJoinCommunityModal ? (
              <div className={["mt-6 transition-all duration-700 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                  <NextImage src={activeModal.image} alt={activeModal.title} width={1200} height={840} sizes="(max-width: 900px) 100vw, 900px" className="w-full max-h-[420px] object-contain" />
                </div>
              </div>
            ) : null}

            <div className={["mt-4 grid gap-5", activeResourceContext ? (isWebsiteDesignTierModal ? "md:grid-cols-1" : "md:grid-cols-[minmax(0,1fr)_420px] md:items-start") : ""].join(" ")}>
              <div className="min-w-0">
                {isCarouselModal && activeCarouselSlide ? (
                  <div className={["mb-4 transition-all duration-700 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                      <NextImage src={activeCarouselSlide.src} alt={activeCarouselSlide.alt} width={1400} height={1600} sizes="(max-width: 900px) 100vw, 900px" className="w-full max-h-[460px] object-contain" />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/16 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_18px_rgba(214,174,102,0.18)]">
                        {activeCarouselSlide.eyebrow}
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!activeModal?.carouselSlides?.length) return;
                            setActiveCarouselIndex((prev) => (prev - 1 + activeModal.carouselSlides.length) % activeModal.carouselSlides.length);
                          }}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/86 transition hover:bg-white/14 hover:text-white"
                        >
                          ← Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!activeModal?.carouselSlides?.length) return;
                            setActiveCarouselIndex((prev) => (prev + 1) % activeModal.carouselSlides.length);
                          }}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/86 transition hover:bg-white/14 hover:text-white"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{activeCarouselSlide.title}</h3>
                    {activeCarouselSlide.body ? <p className="mt-3 leading-relaxed text-white/80">{activeCarouselSlide.body}</p> : null}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {activeModal.carouselSlides?.map((slide: any, index: number) => (
                        <button
                          key={`${slide.title}-${index}`}
                          type="button"
                          onClick={() => setActiveCarouselIndex(index)}
                          className={["h-2 rounded-full transition-all", index === activeCarouselIndex ? "w-8 bg-[#d6ae66]" : "w-2 bg-white/30 hover:bg-white/50"].join(" ")}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : activeModal.topImage ? (
                  <div className={["mb-4 transition-all duration-700 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                      <NextImage
                        src={activeModal.topImage}
                        alt={activeModal.topImageAlt ?? `${activeModal.title} overview chart`}
                        width={1200}
                        height={840}
                        sizes="(max-width: 900px) 100vw, 900px"
                        className={["w-full max-h-[420px] object-contain transition-opacity duration-300", activeModal.title === "How You Start" ? "opacity-94 brightness-[0.97]" : ""].join(" ")}
                      />
                    </div>
                  </div>
                ) : null}

                {isCarouselModal ? null : activeResourceContext ? (
                  <p className={["leading-relaxed whitespace-pre-line transition-all duration-600 ease-out", isOrangeModal ? "text-white/88" : "text-white/80", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>{parsedModalBody.before}</p>
                ) : isPilotFoldablePackageModal ? (
                  <div className={["transition-all duration-600 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    <p className={["leading-relaxed whitespace-pre-line", isOrangeModal ? "text-white/88" : "text-white/80"].join(" ")}>{parsedModalBody.before}</p>
                    <div className="mt-4">
                      <div className={["text-[12px] font-semibold uppercase tracking-[0.2em]", isOrangeModal ? "text-dirty-elephant-studio-200/90" : "text-dirty-elephant-studio-300/90"].join(" ")}>Includes:</div>
                      <ul className={["mt-2 space-y-1.5 text-sm", isOrangeModal ? "text-white/90" : "text-white/84"].join(" ")}>
                        {visiblePilotModalIncludes.map((item) => (
                          <li key={item} className="flex gap-2 leading-relaxed">
                            <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-dirty-elephant-studio-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {parsedModalBody.includes.length > 3 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!modalIncludesKey) return;
                            setExpandedPackageIncludesByModal((prev: any) => ({ ...prev, [modalIncludesKey]: !isPilotModalIncludesExpanded }));
                          }}
                          className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-dirty-elephant-studio-200/85 transition hover:text-white"
                        >
                          {isPilotModalIncludesExpanded ? "Show less" : "View full package details"}
                        </button>
                      ) : null}
                      {parsedModalBody.after ? <p className={["mt-4 leading-relaxed whitespace-pre-line", isOrangeModal ? "text-white/88" : "text-white/80"].join(" ")}>{parsedModalBody.after}</p> : null}
                    </div>
                  </div>
                ) : isStartHereModal ? (
                  <div className={["transition-all duration-600 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    <p className={["text-center leading-relaxed", isOrangeModal ? "text-white/92" : "text-white/86"].join(" ")}>{activeModal.body.split("\n\n")[0]}</p>
                    <p className={["mt-4 leading-relaxed whitespace-pre-line", isOrangeModal ? "text-white/88" : "text-white/80"].join(" ")}>
                      {renderStartHereStepsWithBoldTitles(activeModal.body.split("\n\n").slice(1).join("\n\n"))}
                    </p>
                  </div>
                ) : (
                  <p className={["leading-relaxed whitespace-pre-line transition-all duration-600 ease-out", isOrangeModal ? "text-white/88" : "text-white/80", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    {renderModalBodyWithBoldIncludes(activeModal.body)}
                  </p>
                )}
              </div>
            </div>

            <div className={[isPackageGridModal ? "shrink-0 grid w-full gap-3 border-t border-white/10 bg-black/24 px-6 pb-6 pt-4 sm:grid-cols-2 transition-all duration-600 ease-out" : isStartHereModal ? "shrink-0 flex w-full flex-col items-stretch gap-1 px-2 pb-2 md:px-2.5 md:pb-2.5 transition-all duration-600 ease-out" : "shrink-0 flex flex-wrap items-center gap-3 border-t border-white/10 bg-black/24 px-6 pb-6 pt-4 transition-all duration-600 ease-out", revealStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
              {activeModal.links?.length
                ? activeModal.links.map((link: any) => {
                    const modalLinkId = link.href.startsWith("modal:") ? link.href.slice(6) : null;
                    if (modalLinkId) {
                      const targetSpot = roomHotspots.find((spot) => spot.id === modalLinkId);
                      if (!targetSpot?.modal) return null;
                      return (
                        <button
                          key={`${link.label}-${link.href}`}
                          type="button"
                          aria-label={link.label}
                          title={link.label}
                          onClick={() => {
                            setModalBackModal(activeModal);
                            openModal(targetSpot.modal);
                          }}
                          className={
                            isStartHereModal
                              ? "inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] px-3 py-2.25 text-[13px] font-semibold text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white"
                              : isPackageGridModal
                              ? isWebsiteDesignMainModal
                                ? "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-[#d6ae66] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-[#d6ae66]/55 hover:bg-black/45 hover:text-[#f7deb0]"
                                : "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-white/84 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-dirty-elephant-studio-300/40 hover:bg-black/45 hover:text-white"
                              : isYanchanMusicModal
                              ? isOrangeModal
                                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
                              : isOrangeModal
                              ? "inline-flex items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 px-5 py-2 text-sm font-semibold text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                              : isQuietModal
                              ? "inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
                              : "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white"
                          }
                        >
                          {isYanchanMusicModal ? <SocialIcon label={link.label} /> : `${link.label} →`}
                        </button>
                      );
                    }
                    if (link.href.startsWith("/")) {
                      return (
                        <Link
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          onClick={closeModal}
                          className={
                            isStartHereModal
                              ? "inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] px-3 py-2.25 text-[13px] font-semibold text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white"
                              : "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white"
                          }
                        >
                          {`${link.label} →`}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className={
                          isStartHereModal
                            ? "inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] px-3 py-2.25 text-[13px] font-semibold text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white"
                            : isPackageGridModal
                            ? isWebsiteDesignMainModal
                              ? "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-[#d6ae66] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-[#d6ae66]/55 hover:bg-black/45 hover:text-[#f7deb0]"
                              : "inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-white/84 shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-dirty-elephant-studio-300/40 hover:bg-black/45 hover:text-white"
                            : isYanchanMusicModal
                            ? isOrangeModal
                              ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                              : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
                            : isOrangeModal
                            ? "inline-flex items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 px-5 py-2 text-sm font-semibold text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                            : isQuietModal
                            ? "inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
                            : "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white"
                        }
                      >
                        {isYanchanMusicModal ? <SocialIcon label={link.label} /> : `${link.label} →`}
                      </a>
                    );
                  })
                : null}

              {!activeModal.primaryAction && !activeModal.primaryHref ? null : activeModal.primaryAction === "openExplore" ? (
                <button type="button" onClick={() => { closeModal(); openExploreMenu(); }} className={primaryButtonClass}>
                  {activeModal.primaryLabel ?? "Open Explore"} →
                </button>
              ) : activeModal.primaryHref.startsWith("modal:") ? (
                <button type="button" onClick={() => handleModalTarget(activeModal.primaryHref)} className={primaryButtonClass}>
                  {activeModal.primaryLabel ?? "View Details"} →
                </button>
              ) : activeModal.primaryHref.startsWith("http") ? (
                <a href={activeModal.primaryHref} target="_blank" rel="noopener noreferrer" onClick={closeModal} className={primaryButtonClass}>
                  {activeModal.primaryLabel ?? "View Details"} →
                </a>
              ) : (
                <Link href={activeModal.primaryHref} onClick={closeModal} className={primaryButtonClass}>
                  {activeModal.primaryLabel ?? "View Details"} →
                </Link>
              )}

              {activeModal.secondaryHref && activeModal.secondaryLabel ? (
                activeModal.secondaryHref.startsWith("http") ? (
                  <a href={activeModal.secondaryHref} target="_blank" rel="noopener noreferrer" onClick={closeModal} className={secondaryButtonClass}>
                    {activeModal.secondaryLabel} →
                  </a>
                ) : activeModal.secondaryHref.startsWith("modal:") ? (
                  <button type="button" onClick={() => handleModalTarget(activeModal.secondaryHref)} className={secondaryButtonClass}>
                    {activeModal.secondaryLabel} →
                  </button>
                ) : (
                  <Link href={activeModal.secondaryHref} onClick={closeModal} className={secondaryButtonClass}>
                    {activeModal.secondaryLabel} →
                  </Link>
                )
              ) : null}

              {isCarouselModal && activeCarouselSlide?.secondaryHref && activeCarouselSlide.secondaryLabel ? (
                activeCarouselSlide.secondaryHref.startsWith("http") ? (
                  <a href={activeCarouselSlide.secondaryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white">
                    {activeCarouselSlide.secondaryLabel} →
                  </a>
                ) : activeCarouselSlide.secondaryHref.startsWith("modal:") ? (
                  <button type="button" onClick={() => handleModalTarget(activeCarouselSlide.secondaryHref)} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white">
                    {activeCarouselSlide.secondaryLabel} →
                  </button>
                ) : (
                  <Link href={activeCarouselSlide.secondaryHref} onClick={closeModal} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/18 hover:text-white">
                    {activeCarouselSlide.secondaryLabel} →
                  </Link>
                )
              ) : null}

              {isCarouselModal && activeCarouselSlide?.primaryHref && activeCarouselSlide.primaryLabel ? (
                activeCarouselSlide.primaryHref.startsWith("http") ? (
                  <a href={activeCarouselSlide.primaryHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
                    {activeCarouselSlide.primaryLabel} →
                  </a>
                ) : (
                  <Link href={activeCarouselSlide.primaryHref} onClick={closeModal} className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
                    {activeCarouselSlide.primaryLabel} →
                  </Link>
                )
              ) : null}

              <button
                type="button"
                onClick={() => {
                  if (modalBackModal) {
                    const backModal = modalBackModal;
                    setModalBackModal(null);
                    openModal(backModal);
                    return;
                  }
                  closeModal();
                }}
                className={[
                  "inline-flex items-center justify-center rounded-full transition",
                  isStartHereModal
                    ? "border border-white/18 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium text-white/76 hover:border-white/26 hover:bg-white/9 hover:text-white/88"
                    : isOrangeModal
                    ? "border border-dirty-elephant-studio-200/28 bg-black/35 px-5 py-2 text-sm font-semibold text-dirty-elephant-studio-100/90 hover:border-dirty-elephant-studio-200/45 hover:bg-black/55"
                    : isQuietModal
                    ? "border border-emerald-200/38 bg-emerald-300/12 px-5 py-2 text-sm font-semibold text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]"
                    : "border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 hover:bg-white/15 hover:text-white",
                ].join(" ")}
              >
                {modalBackModal ? "Back" : isStartHereModal ? "Back to Lobby" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
