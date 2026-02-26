export type Hotspot = {
  id: string;
  label: string;
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
    primaryLabel?: string;
    primaryHref?: string;
    primaryAction?: "openExplore";
    secondaryLabel?: string;
    secondaryHref?: string;
    links?: Array<{ label: string; href: string }>;
    topImage?: string;
    topImageAlt?: string;
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
  hotspots: Hotspot[];
};
