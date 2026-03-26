export type Hotspot = {
  id: string;
  label: string;
  hoverLabel?: string;
  x: number;
  y: number;
  positions?: Partial<Record<"mobile" | "tablet" | "laptop" | "desktop", { x: number; y: number }>>;
  allowLargeResponsiveShift?: boolean;
  hidden?: boolean;
  href?: string;
  action?: "explore";
  direction?: "left" | "right" | "up" | "down";
  variant?: "pill" | "dot";
  tier?: "core" | "secondary";
  modal?: {
    title: string;
    body: string;
    carouselSlides?: Array<{
      src: string;
      alt: string;
      eyebrow?: string;
      title: string;
      body?: string;
      primaryLabel?: string;
      primaryHref?: string;
      secondaryLabel?: string;
      secondaryHref?: string;
    }>;
    primaryLabel?: string;
    primaryHref?: string;
    primaryAction?: "openExplore";
    secondaryLabel?: string;
    secondaryHref?: string;
    links?: Array<{ label: string; href: string }>;
    headerLogo?: string;
    headerLogoAlt?: string;
    cornerLogo?: string;
    cornerLogoAlt?: string;
    hideTitle?: boolean;
    topImage?: string;
    topImageAlt?: string;
    imageGallery?: Array<{ src: string; alt: string }>;
    image?: string;
    videoEmbed?: string;
    highlightsTitle?: string;
    highlights?: string[];
  };
};

export type Room = {
  slug: string;
  title: string;
  backgroundImage: string;
  backgroundVideo?: string;
  backgroundVideoMobile?: string;
  hotspots: Hotspot[];
};
