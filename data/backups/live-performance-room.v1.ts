export const tenTenLivePerformanceV1 = {
  slug: "live",
  title: "Live Performance",
  backgroundImage: "/rooms/live-opt.jpg",
  hotspots: [
    { id: "next-room", label: "Board Room", href: "/rooms/EMTEEBusinessDept", x: 90, y: 20, direction: "right" },
    {
      id: "xperience-projects",
      label: "Xperience Projects",
      x: 55,
      y: 52,
      direction: "right",
      variant: "dot",
      modal: {
        title: "Xperience Projects",
        body:
          "Xperience Projects, commonly refered to as X-Projects, is a series of unique experiencial events designed to cater to guests and participants looking to engage with life in a new manner. The project is a collaborative effort between Mike Cannz Entertainment and The Emtee Group in which the two conglomerates redefine the social norms of entertainment and interactions between a human being and another human being or a human being and the world.",
        primaryLabel: "Get Tickets",
        primaryHref: "https://posh.vip/e/breaking-bread-xperience",
      },
    },
  ],
} as const;
