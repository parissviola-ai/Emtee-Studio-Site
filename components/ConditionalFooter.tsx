"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname() ?? "";

  // Hide footer on the gateway and all interactive room pages.
  const isInteractive = pathname === "/" || pathname.startsWith("/rooms");

  if (isInteractive) return null;

  return <Footer />;
}
