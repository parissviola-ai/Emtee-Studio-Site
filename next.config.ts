import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/wiki/Special:FilePath/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/wiki/Special:Redirect/file/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.lifestyleasia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shiftermagazine.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.melodicmag.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hiphopcanada.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "r2.theaudiodb.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "preview.redd.it",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s1.ticketm.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "theshaderoom.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pagesix.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th-i.thgim.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.rollingstone.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.genius.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.socanmagazine.ca",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.shedoesthecity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "welcometothemusic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "readrange.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "g5afoundation.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bookingagentinfo.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/rooms/front",
        destination: "/rooms/lobby",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEBusinessDept",
        destination: "/rooms/business",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEMusicDept",
        destination: "/rooms/music",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEMarketingDept",
        destination: "/rooms/marketing",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEPublishingandDistroDept",
        destination: "/rooms/publishing-distribution",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEARSalesDept",
        destination: "/rooms/ar-sales",
        permanent: true,
      },
      {
        source: "/rooms/orange",
        destination: "/rooms/dirty-elephant-studio",
        permanent: true,
      },
      {
        source: "/rooms/live",
        destination: "/rooms/ten-ten-entertainment",
        permanent: true,
      },
      {
        source: "/rooms/quiet",
        destination: "/rooms/steeped-dreams-studio",
        permanent: true,
      },
      {
        source: "/connect",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/connect/booking-calendar",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/rooms/projects",
        destination: "/rooms/business",
        permanent: true,
      },
      {
        source: "/rooms/session",
        destination: "/rooms/music",
        permanent: true,
      },
      {
        source: "/rooms/media",
        destination: "/rooms/marketing",
        permanent: true,
      },
      {
        source: "/rooms/artists",
        destination: "/rooms/publishing-distribution",
        permanent: true,
      },
      {
        source: "/rooms/vault",
        destination: "/rooms/ar-sales",
        permanent: true,
      },
      {
        source: "/rooms/website-design",
        destination: "/rooms/ar-sales",
        permanent: true,
      },
      {
        source: "/rooms/EMTEEWebDesignDept",
        destination: "/rooms/ar-sales",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
