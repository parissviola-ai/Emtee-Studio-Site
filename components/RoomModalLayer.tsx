"use client";

import { getResourceContext } from "@/data/resource-context";
import NextImage from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState, type ComponentType, type MutableRefObject, type ReactNode } from "react";

type RoomModalLayerProps = {
  roomSlug: string;
  activeModal: any;
  closeModal: () => void;
  openModal: (modal: any) => void;
  modalBackModal: any;
  setModalBackModal: (modal: any) => void;
  isStartHereModal: boolean;
  isOrangeModal: boolean;
  isQuietModal: boolean;
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
  isCarouselModal: boolean;
  activeCarouselSlide: any;
  activeCarouselIndex: number;
  setActiveCarouselIndex: (value: number | ((prev: number) => number)) => void;
  setExpandedPackageIncludesByModal: (value: any) => void;
  renderModalBodyWithBoldIncludes: (text: string) => ReactNode;
  renderStartHereStepsWithBoldTitles: (text: string) => ReactNode;
  roomHotspots: any[];
  expandedPackageIncludesByModal: Record<string, boolean>;
  yanchanDiscographySpotlight: Array<{ src: string; label: string; isJunoNominated?: boolean; objectPosition?: string }>;
  SocialIcon: ComponentType<{ label: string; className?: string }>;
  openExploreMenu: () => void;
};

export default function RoomModalLayer({
  roomSlug,
  activeModal,
  closeModal,
  openModal,
  modalBackModal,
  setModalBackModal,
  isStartHereModal,
  isOrangeModal,
  isQuietModal,
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
  isCarouselModal,
  activeCarouselSlide,
  activeCarouselIndex,
  setActiveCarouselIndex,
  setExpandedPackageIncludesByModal,
  renderModalBodyWithBoldIncludes,
  renderStartHereStepsWithBoldTitles,
  roomHotspots,
  expandedPackageIncludesByModal,
  yanchanDiscographySpotlight,
  SocialIcon,
  openExploreMenu,
}: RoomModalLayerProps) {
  const currentModal = activeModal ?? {
    title: "",
    body: "",
    links: [] as Array<{ label: string; href: string }>,
  };

  const isYanchanMusicModal = currentModal.title === "Yanchan Produced Music";
  const isYanchanDiscographyModal = currentModal.title === "Discography";
  const isJoinCommunityModal = currentModal.title === "Join Community";
  const isSteepedDreamsChillOutModal = currentModal.title === "Overstimulated? Chill Out";
  const shouldOverlayCornerLogo = isSteepedDreamsChillOutModal && resolvedCornerLogo === "/rooms/sdslogoforcard.png";
  const isCustomProductionModal = currentModal.title === "Apply For Custom Production";
  const isOrangeSessionModal =
    roomSlug === "dirty-elephant-studio" && currentModal.title === "Orange Room Session";
  const isYanchanLiveModal = currentModal.title === "Yanchan Produced Live";
  const isLivePackagesModal = roomSlug === "ten-ten-entertainment" && currentModal.title === "Packages";
  const isWebsiteDesignMainModal =
    roomSlug === "marketing" && currentModal.title === "Website Development";
  const isPackageGridModal = isLivePackagesModal || isWebsiteDesignMainModal;
  const isLivePackageDetailModal =
    roomSlug === "ten-ten-entertainment" &&
    (
      currentModal.title === "Up & Coming Artist Package" ||
      currentModal.title === "Rising Star Showcase Package" ||
      currentModal.title === "Ten Ten Community"
    );
  const isWebsiteDesignTierModal =
    roomSlug === "marketing" &&
    (
      currentModal.title === "Tier 1: Starter Site" ||
      currentModal.title === "Tier 2: Growth Site" ||
      currentModal.title === "Tier 3: Artist World"
    );
  const isLiveRoomModal = roomSlug === "ten-ten-entertainment" && !isPackageGridModal;
  const isTenTenCommunityModal = roomSlug === "ten-ten-entertainment" && currentModal.title === "Ten Ten Community";
  const isTenTenShowcaseModal = roomSlug === "ten-ten-entertainment" && currentModal.title === "Ten Ten Showcase";
  const isMikeCannzModal = roomSlug === "ten-ten-entertainment" && currentModal.title === "Mike Cannz";
  const activeResourceContext = isLivePackagesModal ? null : getResourceContext(currentModal.title);
  const parsedModalBody = parseIncludesFromModalBody(currentModal.body);
  const isPilotFoldablePackageModal =
    roomSlug === "ar-sales" && parsedModalBody.includes.length > 0;
  const modalIncludesKey = `${roomSlug}:${currentModal.title}`;
  const isPilotModalIncludesExpanded = expandedPackageIncludesByModal[modalIncludesKey] ?? false;
  const visiblePilotModalIncludes =
    isPilotFoldablePackageModal && !isPilotModalIncludesExpanded
      ? parsedModalBody.includes.slice(0, 3)
      : parsedModalBody.includes;

  const handleModalTarget = (href: string, backModal?: any) => {
    const modalLinkId = href.slice(6);
    const targetSpot = roomHotspots.find((spot) => spot.id === modalLinkId);
    if (!targetSpot?.modal) return;
    setModalBackModal(backModal ?? activeModal);
    openModal(targetSpot.modal);
  };

  const isResourceOnlyModal = !!activeResourceContext;
  const shouldUseCompactFooterButtons = isResourceOnlyModal || isPackageGridModal;
  const uniformModalButtonSizing = "px-3 py-1.5 text-[11px] font-medium";
  const isExternalActionHref = (href: string) =>
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const compactFooterButtonClass =
    `inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 ${uniformModalButtonSizing} text-white/82 transition hover:border-white/28 hover:bg-white/12 hover:text-white`;
  const quietFooterWrapClass = isQuietModal ? "flex flex-wrap items-center gap-3 self-end" : "inline-flex flex-nowrap items-center gap-3 self-end";
  const normalizeSocialIconLabel = (label: string) => {
    if (/(^|\s)IG($|\s)/i.test(label) || /instagram/i.test(label)) return "Instagram";
    return label;
  };

  const livePackageOptions = useMemo(() => {
    if (!isLivePackagesModal || !currentModal.links?.length) return [];

    return currentModal.links
      .map((link: any) => {
        if (!link.href?.startsWith("modal:")) return null;
        const modalLinkId = link.href.slice(6);
        const targetSpot = roomHotspots.find((spot) => spot.id === modalLinkId);
        if (!targetSpot?.modal) return null;
        return { id: modalLinkId, label: link.label, modal: targetSpot.modal };
      })
      .filter(Boolean) as Array<{ id: string; label: string; modal: any }>;
  }, [currentModal.links, isLivePackagesModal, roomHotspots]);
  const [selectedLivePackageId, setSelectedLivePackageId] = useState<string | null>(null);

  useEffect(() => {
    if (!livePackageOptions.length) {
      setSelectedLivePackageId(null);
      return;
    }

    setSelectedLivePackageId((prev) =>
      prev && livePackageOptions.some((option) => option.id === prev) ? prev : livePackageOptions[0].id
    );
  }, [livePackageOptions]);

  const selectedLivePackage =
    livePackageOptions.find((option) => option.id === selectedLivePackageId) ?? livePackageOptions[0] ?? null;

  if (!activeModal) return null;

  const secondaryButtonClass = [
    "inline-flex items-center justify-center rounded-full transition",
    isStartHereModal
      ? `border border-white/18 bg-white/5 ${uniformModalButtonSizing} text-white/76 hover:border-white/26 hover:bg-white/9 hover:text-white/88`
      : shouldUseCompactFooterButtons
      ? `border border-white/18 bg-white/8 ${uniformModalButtonSizing} text-white/82 hover:border-white/28 hover:bg-white/12 hover:text-white`
      : isOrangeModal
      ? `border border-dirty-elephant-studio-200/28 bg-black/35 ${uniformModalButtonSizing} text-dirty-elephant-studio-100/90 hover:border-dirty-elephant-studio-200/45 hover:bg-black/55`
      : isQuietModal
      ? `border border-emerald-200/38 bg-emerald-300/12 ${uniformModalButtonSizing} text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]`
      : isLiveRoomModal
      ? `border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 hover:bg-white/18 hover:text-white`
      : `border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 hover:bg-white/18 hover:text-white`,
  ].join(" ");

  const primaryButtonClass = [
    "inline-flex items-center justify-center rounded-full transition",
    isStartHereModal
      ? `border border-white/18 bg-white/9 ${uniformModalButtonSizing} text-white/86 hover:border-white/30 hover:bg-white/14 hover:text-white`
      : shouldUseCompactFooterButtons
      ? `border border-white/18 bg-white/10 ${uniformModalButtonSizing} text-white/88 hover:border-white/30 hover:bg-white/14 hover:text-white`
      : isOrangeModal
      ? `border border-dirty-elephant-studio-200/28 bg-black/35 ${uniformModalButtonSizing} text-dirty-elephant-studio-100/90 shadow-[0_0_0_1px_rgba(247,196,138,0.16),0_10px_24px_rgba(0,0,0,0.32)] hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white`
      : isQuietModal
      ? `border border-emerald-200/38 bg-emerald-300/12 ${uniformModalButtonSizing} text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]`
      : isLiveRoomModal
      ? `border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 hover:bg-white/18 hover:text-white`
      : `border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 hover:bg-white/18 hover:text-white`,
  ].join(" ");

  const isStructuredFooterModal = !isStartHereModal;
  const shouldUseCompactCardBody = isStructuredFooterModal && !isCarouselModal;
  const shouldUseCompactYanchanMusicLayout = isYanchanMusicModal;
  const footerActions: ReactNode[] = [];

  if (isCustomProductionModal && activeModal.primaryHref) {
    footerActions.push(
      activeModal.primaryHref.startsWith("http") ? (
        <a
          key={`custom-primary-${activeModal.primaryHref}`}
          href={activeModal.primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeModal}
          className={[
            `inline-flex items-center justify-center rounded-full ${uniformModalButtonSizing} transition`,
            isOrangeModal
              ? "border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 shadow-[0_0_0_1px_rgba(247,196,138,0.16),0_10px_24px_rgba(0,0,0,0.32)] hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
              : "bg-white text-black hover:bg-white/90",
          ].join(" ")}
        >
          {activeModal.primaryLabel ?? "View Details"} →
        </a>
      ) : (
        <Link
          key={`custom-primary-${activeModal.primaryHref}`}
          href={activeModal.primaryHref}
          onClick={closeModal}
          className={[
            `inline-flex items-center justify-center rounded-full ${uniformModalButtonSizing} transition`,
            isOrangeModal
              ? "border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 shadow-[0_0_0_1px_rgba(247,196,138,0.16),0_10px_24px_rgba(0,0,0,0.32)] hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
              : "bg-white text-black hover:bg-white/90",
          ].join(" ")}
        >
          {activeModal.primaryLabel ?? "View Details"} →
        </Link>
      )
    );
  }

  if (!isLivePackagesModal && activeModal.links?.length) {
    activeModal.links.forEach((link: any) => {
      const modalLinkId = link.href.startsWith("modal:") ? link.href.slice(6) : null;
      const normalizedSocialIconLabel = normalizeSocialIconLabel(link.label);
      const shouldUseIconOnlySocialLink =
        (
          isYanchanMusicModal ||
          isTenTenCommunityModal ||
          roomSlug === "ten-ten-entertainment"
        ) &&
        ["Instagram", "TikTok", "YouTube", "Spotify", "Facebook", "Wikipedia"].includes(normalizedSocialIconLabel) &&
        !/^DM on IG/i.test(link.label);
      if (modalLinkId) {
        const targetSpot = roomHotspots.find((spot) => spot.id === modalLinkId);
        if (!targetSpot?.modal) return;
        footerActions.push(
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
                ? `inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] ${uniformModalButtonSizing} text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white`
                : shouldUseCompactFooterButtons
                  ? compactFooterButtonClass
                : isPackageGridModal
                  ? isWebsiteDesignMainModal
                    ? `inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 ${uniformModalButtonSizing} text-[#d6ae66] transition hover:border-[#d6ae66]/55 hover:bg-white/14 hover:text-[#f7deb0]`
                    : `inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 ${uniformModalButtonSizing} text-white/85 transition hover:border-white/28 hover:bg-white/15 hover:text-white`
                : shouldUseIconOnlySocialLink
                ? isOrangeModal
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
                : isOrangeModal
                ? `inline-flex items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 ${uniformModalButtonSizing} text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white`
                : isQuietModal
                ? `inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 ${uniformModalButtonSizing} text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]`
                : `inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`
            }
          >
            {shouldUseIconOnlySocialLink ? <SocialIcon label={normalizedSocialIconLabel} /> : `${link.label} →`}
          </button>
        );
        return;
      }

      if (link.href.startsWith("/")) {
        footerActions.push(
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            onClick={closeModal}
            className={
              isStartHereModal
                ? `inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] ${uniformModalButtonSizing} text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white`
                : shouldUseCompactFooterButtons
                ? compactFooterButtonClass
                : `inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`
            }
          >
            {`${link.label} →`}
          </Link>
        );
        return;
      }

      footerActions.push(
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={
            isStartHereModal
              ? `inline-flex w-full items-center justify-between rounded-2xl border border-white/14 bg-white/[0.06] ${uniformModalButtonSizing} text-white/88 transition hover:border-white/24 hover:bg-white/[0.1] hover:text-white`
              : shouldUseCompactFooterButtons
              ? compactFooterButtonClass
              : isPackageGridModal
                ? isWebsiteDesignMainModal
                  ? `inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 ${uniformModalButtonSizing} text-[#d6ae66] transition hover:border-[#d6ae66]/55 hover:bg-white/14 hover:text-[#f7deb0]`
                : `inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 ${uniformModalButtonSizing} text-white/85 transition hover:border-white/28 hover:bg-white/15 hover:text-white`
              : shouldUseIconOnlySocialLink
              ? isOrangeModal
                ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 transition hover:bg-white/18 hover:text-white"
              : isOrangeModal
              ? `inline-flex items-center justify-center rounded-full border border-dirty-elephant-studio-200/28 bg-black/35 ${uniformModalButtonSizing} text-dirty-elephant-studio-100/90 transition hover:border-dirty-elephant-studio-200/45 hover:bg-black/55 hover:text-white`
              : isQuietModal
              ? `inline-flex items-center justify-center rounded-full border border-emerald-200/38 bg-emerald-300/12 ${uniformModalButtonSizing} text-emerald-50 transition hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]`
              : `inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`
          }
        >
          {shouldUseIconOnlySocialLink ? <SocialIcon label={normalizedSocialIconLabel} /> : `${link.label} →`}
        </a>
      );
    });
  }

  if (!isCustomProductionModal && (activeModal.primaryAction === "openExplore" || !!activeModal.primaryHref)) {
    footerActions.push(
      activeModal.primaryAction === "openExplore" ? (
        <button key="modal-primary-open-explore" type="button" onClick={() => { closeModal(); openExploreMenu(); }} className={primaryButtonClass}>
          {activeModal.primaryLabel ?? "Open Explore"} →
        </button>
      ) : activeModal.primaryHref.startsWith("modal:") ? (
        <button key="modal-primary-modal" type="button" onClick={() => handleModalTarget(activeModal.primaryHref)} className={primaryButtonClass}>
          {activeModal.primaryLabel ?? "View Details"} →
        </button>
      ) : isExternalActionHref(activeModal.primaryHref) ? (
        <a
          key="modal-primary-http"
          href={activeModal.primaryHref}
          target={activeModal.primaryHref.startsWith("http") ? "_blank" : undefined}
          rel={activeModal.primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={closeModal}
          className={primaryButtonClass}
        >
          {activeModal.primaryLabel ?? "View Details"} →
        </a>
      ) : (
        <Link key="modal-primary-link" href={activeModal.primaryHref} onClick={closeModal} className={primaryButtonClass}>
          {activeModal.primaryLabel ?? "View Details"} →
        </Link>
      )
    );
  }

  if (activeModal.secondaryHref && activeModal.secondaryLabel) {
    footerActions.push(
      isExternalActionHref(activeModal.secondaryHref) ? (
        <a
          key="modal-secondary-http"
          href={activeModal.secondaryHref}
          target={activeModal.secondaryHref.startsWith("http") ? "_blank" : undefined}
          rel={activeModal.secondaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={closeModal}
          className={secondaryButtonClass}
        >
          {activeModal.secondaryLabel} →
        </a>
      ) : activeModal.secondaryHref.startsWith("modal:") ? (
        <button key="modal-secondary-modal" type="button" onClick={() => handleModalTarget(activeModal.secondaryHref)} className={secondaryButtonClass}>
          {activeModal.secondaryLabel} →
        </button>
      ) : (
        <Link key="modal-secondary-link" href={activeModal.secondaryHref} onClick={closeModal} className={secondaryButtonClass}>
          {activeModal.secondaryLabel} →
        </Link>
      )
    );
  }

  if (isCarouselModal && activeCarouselSlide?.secondaryHref && activeCarouselSlide.secondaryLabel) {
    footerActions.push(
      activeCarouselSlide.secondaryHref.startsWith("http") ? (
        <a key="carousel-secondary-http" href={activeCarouselSlide.secondaryHref} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`}>
          {activeCarouselSlide.secondaryLabel} →
        </a>
      ) : activeCarouselSlide.secondaryHref.startsWith("modal:") ? (
        <button key="carousel-secondary-modal" type="button" onClick={() => handleModalTarget(activeCarouselSlide.secondaryHref)} className={`inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`}>
          {activeCarouselSlide.secondaryLabel} →
        </button>
      ) : (
        <Link key="carousel-secondary-link" href={activeCarouselSlide.secondaryHref} onClick={closeModal} className={`inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 ${uniformModalButtonSizing} text-white/90 transition hover:bg-white/18 hover:text-white`}>
          {activeCarouselSlide.secondaryLabel} →
        </Link>
      )
    );
  }

  if (isCarouselModal && activeCarouselSlide?.primaryHref && activeCarouselSlide.primaryLabel) {
    footerActions.push(
      activeCarouselSlide.primaryHref.startsWith("http") ? (
        <a key="carousel-primary-http" href={activeCarouselSlide.primaryHref} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center rounded-full bg-white ${uniformModalButtonSizing} text-black transition hover:bg-white/90`}>
          {activeCarouselSlide.primaryLabel} →
        </a>
      ) : activeCarouselSlide.primaryTargetBlank ? (
        <a
          key="carousel-primary-link-new-tab"
          href={activeCarouselSlide.primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-full bg-white ${uniformModalButtonSizing} text-black transition hover:bg-white/90`}
        >
          {activeCarouselSlide.primaryLabel} →
        </a>
      ) : (
        <Link key="carousel-primary-link" href={activeCarouselSlide.primaryHref} onClick={closeModal} className={`inline-flex items-center justify-center rounded-full bg-white ${uniformModalButtonSizing} text-black transition hover:bg-white/90`}>
          {activeCarouselSlide.primaryLabel} →
        </Link>
      )
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom)+1rem)] md:p-6 pointer-events-auto">
      <button type="button" aria-label="Close modal" onClick={closeModal} className="absolute inset-0 bg-black/60" />

      <div
        className={[
          isStartHereModal
            ? "relative z-10 flex w-full max-w-[320px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isCustomProductionModal
            ? "relative z-10 flex w-full max-w-[450px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isOrangeSessionModal
            ? "relative z-10 flex w-full max-w-[450px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : shouldUseCompactYanchanMusicLayout
            ? "relative z-10 flex w-full max-w-[572px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isYanchanLiveModal
            ? "relative z-10 flex w-full max-w-[640px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isTenTenShowcaseModal
            ? "relative z-10 flex w-full max-w-[470px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isMikeCannzModal
            ? "relative z-10 flex w-full max-w-[470px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isLivePackagesModal
            ? "relative z-10 flex w-full max-w-[470px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : isResourceOnlyModal
            ? "relative z-10 flex w-full max-w-[470px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]"
            : "relative z-10 flex w-full max-w-[900px] max-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl md:max-h-[85svh]",
          isOrangeModal
            ? "border border-dirty-elephant-studio-300/28 bg-[linear-gradient(160deg,rgba(15,10,6,0.9),rgba(10,8,6,0.86))] shadow-[0_0_0_1px_rgba(251,191,118,0.12),0_30px_80px_rgba(0,0,0,0.62)]"
            : isLivePackagesModal
            ? "border border-[#d6ae66]/28 bg-[linear-gradient(160deg,rgba(24,17,10,0.92),rgba(11,8,6,0.9))] shadow-[0_0_0_1px_rgba(214,174,102,0.14),0_30px_80px_rgba(0,0,0,0.62)]"
            : isResourceOnlyModal
            ? "border border-white/15 bg-black/55"
            : "border border-white/15 bg-black/55",
        ].join(" ")}
      >
        <div className={[shouldUseCompactCardBody ? "overflow-y-auto" : "flex-1 overflow-y-auto", isStartHereModal ? "p-2 md:p-2.5" : isResourceOnlyModal ? "p-4 md:p-5" : shouldUseCompactYanchanMusicLayout ? "p-4 pb-3 md:p-4 md:pb-3" : shouldUseCompactCardBody ? "p-6 pb-4 md:pb-4" : "p-6 pb-8 md:pb-10"].join(" ")}>
          <div className={["flex items-start justify-between gap-4", shouldOverlayCornerLogo ? "relative min-h-[92px] pr-24 sm:min-h-[104px] sm:pr-28" : ""].join(" ")}>
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
                    isLivePackagesModal ? "text-[#f7deb0] [text-shadow:0_0_18px_rgba(214,174,102,0.22)]" : "",
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
                  shouldOverlayCornerLogo ? "absolute right-0 top-0 shrink-0" : "shrink-0",
                  "transition-all duration-700 ease-out",
                  revealStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
              >
                <div className="flex flex-col items-end gap-3">
                  <NextImage
                    src={resolvedCornerLogo}
                    alt={resolvedCornerLogoAlt ?? activeModal.title}
                    width={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? 144 : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? 120 : resolvedCornerLogo === "/rooms/sdslogoforcard.png" ? 120 : 66}
                    height={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? 72 : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? 48 : resolvedCornerLogo === "/rooms/sdslogoforcard.png" ? 48 : 26}
                    sizes={resolvedCornerLogo === "/rooms/TenTenlogo.png" ? "144px" : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ? "120px" : resolvedCornerLogo === "/rooms/sdslogoforcard.png" ? "120px" : "66px"}
                    className={[
                      resolvedCornerLogo === "/rooms/TenTenlogo.png"
                        ? "h-auto w-auto max-w-[132px] object-contain"
                        : resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png"
                        ? "h-auto w-auto max-w-[110px] object-contain"
                        : resolvedCornerLogo === "/rooms/sdslogoforcard.png"
                        ? shouldOverlayCornerLogo
                          ? "h-auto w-auto max-w-[88px] object-contain"
                          : "h-auto w-auto max-w-[110px] object-contain"
                        : "h-auto w-auto max-w-[60px] object-contain",
                      resolvedCornerLogo === "/logotransparent.png" ? "invert" : "",
                      resolvedCornerLogo === "/rooms/yanchanblack6-removebg.png" ||
                      resolvedCornerLogo === "/rooms/TenTenlogo.png" ||
                      resolvedCornerLogo === "/rooms/sdslogoforcard.png"
                        ? "invert"
                        : "",
                    ].join(" ")}
                  />
                </div>
              </div>
            ) : null}
          </div>

            <div className={["min-w-0 w-full", isResourceOnlyModal ? "mx-auto max-w-[430px]" : shouldUseCompactYanchanMusicLayout ? "mx-auto max-w-[494px]" : ""].join(" ")}>
            {activeModal.videoEmbed ? (
              <div
                className={[
                  "mt-6 flex justify-center transition-all duration-700 ease-out",
                  revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
              >
                <div className={["relative w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]", isYanchanLiveModal ? "max-w-[520px]" : "max-w-[640px]"].join(" ")}>
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
                        className={`absolute bottom-3 right-3 rounded-full border border-white/25 bg-black/50 ${uniformModalButtonSizing} text-white/85 backdrop-blur-md transition hover:bg-black/65 hover:text-white`}
                      >
                        {videoMuted ? "Unmute" : "Mute"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {activeModal.image && isYanchanMusicModal ? (
              <div className={["mt-4 transition-all duration-700 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                <div className="w-full overflow-hidden rounded-2xl bg-black/25 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <NextImage
                      src={activeModal.image}
                      alt={activeModal.title}
                      fill
                      sizes="(max-width: 572px) calc(100vw - 3rem), 494px"
                      className="object-cover"
                      style={{ objectPosition: "center 44%" }}
                      priority
                    />
                  </div>
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

            <div className={[isSteepedDreamsChillOutModal ? "mt-1 grid gap-4" : shouldUseCompactYanchanMusicLayout ? "mt-3 grid gap-2.5" : "mt-4 grid gap-4", activeResourceContext ? "md:grid-cols-1" : ""].join(" ")}>
              {!activeResourceContext ? <div className="min-w-0">
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
                          className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 ${uniformModalButtonSizing} text-white/86 transition hover:bg-white/14 hover:text-white`}
                        >
                          ← Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!activeModal?.carouselSlides?.length) return;
                            setActiveCarouselIndex((prev) => (prev + 1) % activeModal.carouselSlides.length);
                          }}
                          className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 ${uniformModalButtonSizing} text-white/86 transition hover:bg-white/14 hover:text-white`}
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
                ) : activeModal.imageGallery?.length ? (
                  <div
                    className={[
                      "mb-4 grid gap-3 sm:grid-cols-3 transition-all duration-700 ease-out",
                      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                  >
                    {activeModal.imageGallery.map((image: any) => (
                      <div
                        key={image.src}
                        className="relative overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]"
                      >
                        <NextImage
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={1600}
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="h-full max-h-[320px] w-full object-cover"
                        />
                      </div>
                    ))}
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

                {isLivePackagesModal && selectedLivePackage ? (
                  <div className={["transition-all duration-600 ease-out", revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
                    <p className={["leading-relaxed whitespace-pre-line", isOrangeModal ? "text-white/88" : "text-white/80"].join(" ")}>
                      {activeModal.body}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {livePackageOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedLivePackageId(option.id)}
                          className={
                            option.id === selectedLivePackage.id
                              ? "inline-flex items-center justify-center rounded-full border border-[#d6ae66]/45 bg-[#d6ae66]/14 px-3 py-1.5 text-[11px] font-medium text-[#f7deb0] shadow-[0_0_0_1px_rgba(214,174,102,0.12),0_10px_24px_rgba(0,0,0,0.28)] transition hover:border-[#d6ae66]/60 hover:bg-[#d6ae66]/20 hover:text-white"
                              : "inline-flex items-center justify-center rounded-full border border-[#d6ae66]/24 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/82 transition hover:border-[#d6ae66]/42 hover:bg-[#d6ae66]/10 hover:text-white"
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 space-y-4 rounded-2xl border border-[#d6ae66]/24 bg-[linear-gradient(180deg,rgba(214,174,102,0.1),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.34)]">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.25)]">
                        {selectedLivePackage.modal.title}
                      </div>
                      <p className="leading-relaxed whitespace-pre-line text-white/84">
                        {selectedLivePackage.modal.body}
                      </p>

                      {selectedLivePackage.modal.highlights?.length ? (
                        <div className="space-y-3">
                          <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.25)]">
                            {selectedLivePackage.modal.highlightsTitle ?? "Package Includes"}
                          </div>
                          <ul className="space-y-1.5 text-sm text-white/84">
                            {selectedLivePackage.modal.highlights.map((item: string) => (
                              <li key={item} className="flex gap-2 leading-relaxed">
                                <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#d6ae66] shadow-[0_0_10px_rgba(214,174,102,0.75)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {selectedLivePackage.modal.primaryHref ? (
                        selectedLivePackage.modal.primaryHref.startsWith("http") ? (
                          <a
                            href={selectedLivePackage.modal.primaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeModal}
                            className={primaryButtonClass}
                          >
                            {selectedLivePackage.modal.primaryLabel ?? "View Details"} →
                          </a>
                        ) : (
                          <Link
                            href={selectedLivePackage.modal.primaryHref}
                            onClick={closeModal}
                            className={primaryButtonClass}
                          >
                            {selectedLivePackage.modal.primaryLabel ?? "View Details"} →
                          </Link>
                        )
                      ) : null}
                    </div>
                  </div>
                ) : isCarouselModal ? null : activeResourceContext ? null : isPilotFoldablePackageModal ? (
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

                {activeModal.highlights?.length ? (
                  <div
                    className={[
                      "mt-6 space-y-4 rounded-2xl p-4 transition-all duration-700 ease-out",
                      isOrangeModal
                        ? "border border-dirty-elephant-studio-200/20 bg-gradient-to-b from-[#2a1b10]/78 to-[#130d08]/72"
                        : "border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                      revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                    ].join(" ")}
                  >
                    <div className={["text-[12px] font-semibold uppercase tracking-[0.2em]", isOrangeModal ? "text-dirty-elephant-studio-200/90" : "text-dirty-elephant-studio-300/90"].join(" ")}>
                      {activeModal.highlightsTitle ?? "Package Includes"}
                    </div>
                    {isYanchanDiscographyModal ? (
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {yanchanDiscographySpotlight.map((item, index) => (
                          <figure
                            key={`${item.label}-${item.src}-${index}`}
                            className="group relative overflow-hidden rounded-xl border border-dirty-elephant-studio-200/24 bg-black/45 shadow-[0_10px_24px_rgba(0,0,0,0.34)]"
                          >
                            {item.isJunoNominated ? (
                              <span className="absolute right-1.5 top-1.5 z-10 inline-flex items-center rounded-md border border-[#f7c48a]/55 bg-black/65 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#ffd8a4] backdrop-blur-sm">
                                JUNO Nominated
                              </span>
                            ) : null}
                            <div className="relative aspect-[4/3]">
                              <NextImage
                                src={item.src}
                                alt={item.label}
                                fill
                                sizes="(max-width: 640px) 50vw, 33vw"
                                className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                style={{ objectPosition: item.objectPosition ?? "center" }}
                              />
                              <figcaption className="absolute inset-x-0 bottom-0 border-t border-dirty-elephant-studio-200/14 bg-gradient-to-t from-black/90 to-black/45 px-2 py-1 text-[10px] font-medium leading-snug text-dirty-elephant-studio-50/92">
                                {item.label}
                              </figcaption>
                            </div>
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <ul className={isLivePackageDetailModal ? "mt-2 space-y-1.5 text-sm text-white/84" : "grid gap-2 sm:grid-cols-2"}>
                        {activeModal.highlights.map((item: string) => {
                          const parts = item.split("::");
                          const isFeaturedMilestone = parts.length === 2 && parts[0] === "FEATURE";
                          const label = isFeaturedMilestone ? parts[1] : item;
                          return (
                            <li
                              key={item}
                              className={[
                                isLivePackageDetailModal
                                  ? "flex gap-2 leading-relaxed"
                                  : "group rounded-xl px-3 py-2 text-sm leading-relaxed shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition",
                                isLivePackageDetailModal
                                  ? ""
                                  : isOrangeModal
                                    ? "border border-dirty-elephant-studio-200/18 bg-black/35 text-white/90 hover:border-dirty-elephant-studio-200/42 hover:bg-[#1a120b]"
                                    : "border border-white/10 bg-black/35 text-white/84 hover:border-dirty-elephant-studio-300/40 hover:bg-black/45",
                              ].join(" ")}
                            >
                              <span className="inline-flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-dirty-elephant-studio-300 shadow-[0_0_10px_rgba(253,186,116,0.75)]" />
                                <span>{label}</span>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div> : null}

              {activeResourceContext ? (
                <aside
                  className={[
                    "rounded-2xl border px-4 py-3 transition-all duration-700 ease-out",
                    isResourceOnlyModal
                      ? "border-white/16 bg-black/30 shadow-[0_16px_36px_rgba(0,0,0,0.36)]"
                      : "border-white/45 bg-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_0_10px_rgba(255,255,255,0.16),0_12px_24px_rgba(0,0,0,0.24)]",
                    revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  ].join(" ")}
                >
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.35)]">
                      What It Is
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-white/88">{activeResourceContext.what}</p>
                  </div>
                  <div className="mt-3">
                    <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d6ae66] [text-shadow:0_0_10px_rgba(214,174,102,0.35)]">
                      Why It Matters for Artists
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-white/88">{activeResourceContext.why}</p>
                  </div>
                </aside>
              ) : null}
            </div>

            {activeModal.image && !isYanchanMusicModal && !isJoinCommunityModal ? (
              <div
                className={[
                  "mt-8 transition-all duration-700 ease-out",
                  revealStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
              >
                <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
                  <NextImage
                    src={activeModal.image}
                    alt={activeModal.title}
                    width={1200}
                    height={840}
                    sizes="(max-width: 900px) 100vw, 900px"
                    className={[
                      "w-full max-h-[420px] object-contain transition-opacity duration-300",
                      activeModal.title === "What We Offer" ? "opacity-94 brightness-[0.97]" : "",
                    ].join(" ")}
                  />
                </div>
              </div>
            ) : null}

            <div className={[isStartHereModal ? "shrink-0 flex w-full flex-col items-stretch gap-1 px-2 pb-2 md:px-2.5 md:pb-2.5 transition-all duration-600 ease-out" : isResourceOnlyModal ? "mt-3 shrink-0 px-1 pb-1 pt-0 transition-all duration-600 ease-out" : shouldUseCompactYanchanMusicLayout ? "mt-4 shrink-0 border-t border-white/10 px-4 pb-3 pt-3 transition-all duration-600 ease-out" : "mt-7 shrink-0 border-t border-white/10 px-6 pb-3 pt-5 transition-all duration-600 ease-out", revealStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"].join(" ")}>
              {isStructuredFooterModal ? (
                <div className={["flex w-full items-end", isResourceOnlyModal ? "max-w-[430px] mx-auto" : shouldUseCompactYanchanMusicLayout ? "max-w-[494px] mx-auto" : ""].join(" ")}>
                  <div className={[isResourceOnlyModal ? "inline-flex flex-nowrap items-center gap-2 self-end" : shouldUseCompactYanchanMusicLayout ? "inline-flex flex-wrap items-center gap-2 self-end" : `-ml-6 ${quietFooterWrapClass}`].join(" ")}>
                    {footerActions}
                  </div>

                  <div className="flex-1" />

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
                      shouldUseCompactFooterButtons ? "inline-flex shrink-0 items-center justify-center self-end rounded-full transition" : "relative left-4 inline-flex shrink-0 items-center justify-center self-end rounded-full transition",
                      isOrangeModal
                        ? `border border-dirty-elephant-studio-200/28 bg-black/35 ${uniformModalButtonSizing} text-dirty-elephant-studio-100/90 hover:border-dirty-elephant-studio-200/45 hover:bg-black/55`
                        : shouldUseCompactFooterButtons
                        ? `border border-white/18 bg-white/8 ${uniformModalButtonSizing} text-white/82 hover:border-white/28 hover:bg-white/12 hover:text-white`
                        : isQuietModal
                        ? `border border-emerald-200/38 bg-emerald-300/12 ${uniformModalButtonSizing} text-emerald-50 hover:border-emerald-200/58 hover:bg-emerald-300/20 hover:text-white hover:[text-shadow:0_0_10px_rgba(110,231,183,0.5)]`
                        : `border border-white/20 bg-white/10 ${uniformModalButtonSizing} text-white/85 hover:bg-white/15 hover:text-white`,
                    ].join(" ")}
                  >
                    {modalBackModal ? "Back" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  {footerActions}
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
                    className={`inline-flex items-center justify-center rounded-full border border-white/18 bg-white/5 ${uniformModalButtonSizing} text-white/76 transition hover:border-white/26 hover:bg-white/9 hover:text-white/88`}
                  >
                    {modalBackModal ? "Back" : "Back to Lobby"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function parseIncludesFromModalBody(text: string) {
  const marker = "Includes:";
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) {
    return {
      before: text,
      includes: [] as string[],
      after: "",
    };
  }

  const before = text.slice(0, markerIndex).trimEnd();
  const afterMarker = text.slice(markerIndex + marker.length).trimStart();
  const lines = afterMarker.split("\n");
  const includes: string[] = [];
  const trailingLines: string[] = [];
  let readingIncludes = true;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (readingIncludes && line.startsWith("•")) {
      includes.push(line.replace(/^•\s*/, "").trim());
      continue;
    }
    readingIncludes = false;
    trailingLines.push(rawLine);
  }

  return {
    before,
    includes,
    after: trailingLines.join("\n").trim(),
  };
}
