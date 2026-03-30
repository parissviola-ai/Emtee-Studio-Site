const KNOWN_ROOM_IMAGE_SIZES: Record<string, { w: number; h: number }> = {
  "/rooms/finishedlobby-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/finallobby-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/finallobby2-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/lobbywithconcert-opt.jpg": { w: 2560, h: 1280 },
  "/rooms/updatedttbg1-poster-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/8-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/boardroom-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/cdshop-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/marketing1.png": { w: 3840, h: 2160 },
  "/rooms/finalfinalmarketing.png": { w: 4320, h: 2430 },
  "/rooms/front.jpg": { w: 2048, h: 1365 },
  "/rooms/live-opt.jpg": { w: 2560, h: 1440 },
  "/rooms/kymteabg-opt.jpg": { w: 1536, h: 1024 },
  "/rooms/SDSFinal-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/finalsds.png": { w: 3840, h: 2160 },
  "/rooms/sdspagefinal.png": { w: 1920, h: 1080 },
  "/rooms/sdspagefinal-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/quietroomvid-firstframe-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/dirtyelephant2-opt.jpg": { w: 3840, h: 2160 },
  "/rooms/colorizedmarketing-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/marketingfinal3-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/musicwithelephant-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/mrlargeelephant.png": { w: 1920, h: 1080 },
  "/rooms/mrlargeelephant-opt.jpg": { w: 1920, h: 1080 },
  "/rooms/orangeroomm-v2-opt.jpg": { w: 1536, h: 1024 },
  "/rooms/websitess-mobile-v2-opt.jpg": { w: 3840, h: 2160 },
};

const NATIVE_BACKGROUND_IMAGE_ROOMS = new Set([
  "lobby",
  "business",
  "music",
  "marketing",
  "publishing-distribution",
  "ar-sales",
  "steeped-dreams-studio",
]);

const SENSITIVE_TRANSITION_ROOMS = new Set([
  "lobby",
  "business",
  "music",
  "marketing",
  "publishing-distribution",
  "ar-sales",
  "dirty-elephant-studio",
  "ten-ten-entertainment",
  "steeped-dreams-studio",
]);

const DESKTOP_SCENE_SCALE_ONE_ROOMS = new Set([
  "lobby",
  "music",
  "marketing",
  "ar-sales",
  "EMTEEWebDesign",
]);

export function getKnownRoomImageSize(src: string) {
  return KNOWN_ROOM_IMAGE_SIZES[src] ?? null;
}

export function isSensitiveTransitionRoom(roomSlug: string) {
  return SENSITIVE_TRANSITION_ROOMS.has(roomSlug);
}

export function getRoomSceneBackgroundConfig({
  roomSlug,
  backgroundImage,
  backgroundVideo,
  backgroundVideoMobile,
  backgroundUsesMobileLayout,
  isMobileViewport,
  isModalOpen,
  exploreOpen,
  tiltEnabled,
  backgroundVideoEnabled,
}: {
  roomSlug: string;
  backgroundImage: string;
  backgroundVideo?: string;
  backgroundVideoMobile?: string;
  backgroundUsesMobileLayout: boolean;
  isMobileViewport: boolean;
  isModalOpen: boolean;
  exploreOpen: boolean;
  tiltEnabled: boolean;
  backgroundVideoEnabled: boolean;
}) {
  const isLobbyRoom = roomSlug === "lobby";
  const isArSalesRoom = roomSlug === "ar-sales";
  const isWebsiteDesignRoom = roomSlug === "EMTEEWebDesign";
  const useContainedBackground = false;
  const eagerBackgroundLoad = isLobbyRoom || SENSITIVE_TRANSITION_ROOMS.has(roomSlug);
  const mobileSceneScale = tiltEnabled && isMobileViewport ? 1.08 : 1;
  const desktopSceneScale = DESKTOP_SCENE_SCALE_ONE_ROOMS.has(roomSlug) ? 1 : 1.06;
  const sceneScale = backgroundUsesMobileLayout ? mobileSceneScale : desktopSceneScale;

  let backgroundObjectPositionY = 50;
  if (roomSlug === "lobby") backgroundObjectPositionY = 58;
  else if (roomSlug === "ar-sales") backgroundObjectPositionY = 64;
  else if (roomSlug === "EMTEEWebDesign") backgroundObjectPositionY = 60;

  let backgroundOffsetY = 0;
  if (roomSlug === "ar-sales") {
    backgroundOffsetY = isMobileViewport ? 43 : 0;
  } else if (roomSlug === "ten-ten-entertainment") {
    backgroundOffsetY = 50;
  }

  const backgroundImageSrc =
    isWebsiteDesignRoom && backgroundUsesMobileLayout ? "/rooms/websitess-mobile-v2-opt.jpg" : backgroundImage;
  const baseActiveBackgroundVideo =
    backgroundUsesMobileLayout && backgroundVideoMobile ? backgroundVideoMobile : backgroundVideo;
  const activeBackgroundVideo = backgroundVideoEnabled ? baseActiveBackgroundVideo : undefined;
  const shouldRenderBackgroundImage =
    !activeBackgroundVideo || roomSlug === "ten-ten-entertainment";
  const shouldRenderImmediateBackgroundFallback =
    shouldRenderBackgroundImage && SENSITIVE_TRANSITION_ROOMS.has(roomSlug);
  const shouldRenderStaticBackgroundImage = !activeBackgroundVideo;
  const shouldUseNativeBackgroundImage =
    shouldRenderBackgroundImage && NATIVE_BACKGROUND_IMAGE_ROOMS.has(roomSlug);
  const showWebsiteDesignEmbed =
    isWebsiteDesignRoom && !isMobileViewport && !isModalOpen && !exploreOpen;

  return {
    activeBackgroundVideo,
    backgroundImageSrc,
    backgroundObjectPositionY,
    backgroundOffsetY,
    eagerBackgroundLoad,
    sceneScale,
    shouldRenderBackgroundImage,
    shouldRenderImmediateBackgroundFallback,
    shouldRenderStaticBackgroundImage,
    shouldUseNativeBackgroundImage,
    showWebsiteDesignEmbed,
    useContainedBackground,
  };
}
