"use client";

import { usePathname } from "next/navigation";
import MainMenuBar from "@/components/MainMenuBar";

export default function ConditionalMenuBar() {
  const pathname = usePathname() ?? "";

  // Room routes already render their own menu bar.
  if (pathname.startsWith("/rooms")) return null;

  // Keep landing page clean.
  if (pathname === "/") return null;

  return <MainMenuBar />;
}
