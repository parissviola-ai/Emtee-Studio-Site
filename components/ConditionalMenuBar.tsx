"use client";

import { usePathname } from "next/navigation";
import MainMenuBar from "@/components/MainMenuBar";
import { isRoomHref } from "@/lib/roomRoutes";

export default function ConditionalMenuBar() {
  const pathname = usePathname() ?? "";

  // Room routes already render their own menu bar.
  if (isRoomHref(pathname)) return null;

  // Keep landing page clean.
  if (pathname === "/") return null;

  return <MainMenuBar />;
}
