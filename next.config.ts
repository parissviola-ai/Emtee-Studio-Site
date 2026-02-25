import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        source: "/rooms/projects",
        destination: "/rooms/EMTEEBusinessDept",
        permanent: true,
      },
      {
        source: "/rooms/session",
        destination: "/rooms/EMTEEMusicDept",
        permanent: true,
      },
      {
        source: "/rooms/media",
        destination: "/rooms/EMTEEMarketingDept",
        permanent: true,
      },
      {
        source: "/rooms/artists",
        destination: "/rooms/EMTEEPublishingandDistroDept",
        permanent: true,
      },
      {
        source: "/rooms/vault",
        destination: "/rooms/EMTEEARSalesDept",
        permanent: true,
      },
      {
        source: "/rooms/website-design",
        destination: "/rooms/EMTEEARSalesDept",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEWebDesignDept",
        destination: "/rooms/EMTEEARSalesDept",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
