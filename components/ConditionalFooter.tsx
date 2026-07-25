"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { isRoomHref } from "@/lib/roomRoutes";

export default function ConditionalFooter() {
  const pathname = usePathname() ?? "";

  // Hide footer on the gateway and all interactive room pages.
  const isInteractive = pathname === "/" || isRoomHref(pathname);

  if (isInteractive) return null;

  return <Footer />;
}
