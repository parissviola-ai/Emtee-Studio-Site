type HotspotDirection = "left" | "right" | "up" | "down";

type PresenterHotspot = {
  id: string;
  hoverLabel?: string;
  x: number;
  y: number;
  direction?: HotspotDirection;
};

type PillPresentationInput = {
  roomSlug: string;
  spot: PresenterHotspot;
  compactHotspotUi: boolean;
};

type DotPresentationInput = {
  roomSlug: string;
  spot: PresenterHotspot;
  isMobileViewport: boolean;
  compactHotspotUi: boolean;
  viewportW: number;
  isOrangeRoom: boolean;
};

export function getPillPresentationState({
  roomSlug,
  spot,
  compactHotspotUi,
}: PillPresentationInput) {
  const isNavigationSpot = spot.id === "next-room";
  const isLobbyPill = roomSlug === "lobby" && !isNavigationSpot;
  const isWhoWeArePin = roomSlug === "lobby" && spot.id === "About";
  const isLobbyExplorePin = roomSlug === "lobby" && spot.id === "explore";
  const isLeftLabelLobbyPill =
    roomSlug === "lobby" &&
    (
      spot.id === "Board Rooms" ||
      spot.id === "departments" ||
      spot.id === "Ten Ten Entertainment" ||
      spot.id === "Dirty Elephant Studios" ||
      spot.id === "Steeped Dreams Studio"
    );

  return {
    isNavigationSpot,
    isLobbyPill,
    isWhoWeArePin,
    isLobbyExplorePin,
    showLabelOnLeft: isLeftLabelLobbyPill,
    lobbyPillCircleSize: compactHotspotUi
      ? "clamp(24px, 1.95vw, 28px)"
      : "clamp(26px, 2.05vw, 32px)",
    lobbyPillFontSize: "clamp(10px, 0.78vw, 12px)",
    lobbyPillPaddingX: "clamp(10px, 0.95vw, 14px)",
    lobbyPillPaddingY: "clamp(5px, 0.42vw, 7px)",
  };
}

export function getDotPresentationState({
  roomSlug,
  spot,
  isMobileViewport,
  compactHotspotUi,
  viewportW,
  isOrangeRoom,
}: DotPresentationInput) {
  const isOrangeSessionDot = spot.id === "dirty-elephant-studio-room-sessions";
  const isLobbyDot = roomSlug === "lobby";
  const isLiveRoomSocialDot =
    roomSlug === "ten-ten-entertainment" &&
    (spot.id === "mike-cannz-youtube" || spot.id === "mike-cannz-spotify");
  const liveRoomSocialLabel =
    spot.id === "mike-cannz-youtube"
      ? "YouTube"
      : spot.id === "mike-cannz-spotify"
        ? "Spotify"
        : null;
  const dotSize = isMobileViewport ? 8 : compactHotspotUi ? 9 : 10;
  const dotLabelMaxWidth = isMobileViewport
    ? Math.min(Math.max(viewportW * 0.62, 170), 240)
    : Math.min(Math.max(viewportW * 0.34, 180), 360);
  const dotLabelFontSize = isMobileViewport ? "11px" : compactHotspotUi ? "12px" : "13px";
  const resolvedTooltipDirection =
    isOrangeRoom && spot.id === "apply-custom-production" ? "up" : spot.direction;
  const customTooltipOffsetClass =
    isOrangeRoom && spot.id === "apply-custom-production" ? "translate-x-3 sm:translate-x-4" : "";
  const isChillOutCommunityDot = spot.id === "chill-out-community";
  const isQuietAccentDot =
    roomSlug === "steeped-dreams-studio" &&
    (
      spot.id === "kym-tea-music" ||
      spot.id === "eight-d-mixes" ||
      spot.id === "steeped-dreams-studio" ||
      spot.id === "chill-out-community"
    );
  const isWebsiteDesignEnterDot =
    roomSlug === "EMTEEWebDesign" && spot.id === "website-design-enter-website";
  const dotBase = isOrangeRoom
    ? "rounded-full bg-[#ff9f3f] shadow-[0_0_0_2px_rgba(255,159,63,0.35),0_0_22px_rgba(255,159,63,0.7)]"
    : isWebsiteDesignEnterDot
      ? "rounded-full bg-[#d6ae66] shadow-[0_0_0_2px_rgba(214,174,102,0.45),0_0_24px_rgba(214,174,102,0.8)]"
      : "rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.25),0_0_18px_rgba(255,255,255,0.55)]";
  const haloBase = isOrangeRoom
    ? "bg-[#ff9f3f]/35"
    : isWebsiteDesignEnterDot
      ? "bg-[#d6ae66]/40"
      : "bg-white/20";
  const ringBase = isOrangeRoom
    ? "border-[#ff9f3f]/70"
    : isWebsiteDesignEnterDot
      ? "border-[#d6ae66]/85"
      : "border-white/45";

  return {
    isOrangeSessionDot,
    isLobbyDot,
    isLiveRoomSocialDot,
    liveRoomSocialLabel,
    dotSize,
    dotLabelMaxWidth,
    dotLabelFontSize,
    resolvedTooltipDirection,
    customTooltipOffsetClass,
    isChillOutCommunityDot,
    isQuietAccentDot,
    dotBase,
    haloBase,
    ringBase,
  };
}
