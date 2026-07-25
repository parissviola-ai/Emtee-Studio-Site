const CLEAN_ROOM_PATH_BY_SLUG: Record<string, string> = {
  "dirty-elephant-studio": "/dirtyelephantstudios",
  "ten-ten-entertainment": "/tentenentertainment",
  "steeped-dreams-studio": "/steepeddreamsstudio",
};

const CLEAN_ROOM_SLUG_BY_PATH = new Map(
  Object.entries(CLEAN_ROOM_PATH_BY_SLUG).map(([slug, path]) => [path, slug])
);

function getPathname(href: string) {
  return href.split("#", 1)[0].split("?", 1)[0].replace(/\/$/, "") || "/";
}

export function getPublicRoomHref(slug: string) {
  return CLEAN_ROOM_PATH_BY_SLUG[slug] ?? `/rooms/${slug}`;
}

export function getRoomSlugFromHref(href?: string | null) {
  if (!href) return null;
  const pathname = getPathname(href);
  const cleanSlug = CLEAN_ROOM_SLUG_BY_PATH.get(pathname);
  if (cleanSlug) return cleanSlug;
  if (!pathname.startsWith("/rooms/")) return null;
  return pathname.slice("/rooms/".length).split("/")[0] || null;
}

export function isRoomHref(href?: string | null) {
  return !!getRoomSlugFromHref(href);
}
