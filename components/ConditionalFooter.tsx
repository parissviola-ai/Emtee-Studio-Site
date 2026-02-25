"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname() ?? "";

  // Hide footer on ALL interactive room pages
  const isInteractive = pathname.startsWith("/rooms");

  if (isInteractive) return null;

  return <Footer />;
}
