"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function shouldDebugRoomNav() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("emtee-debug-nav") === "1";
  } catch {
    return false;
  }
}

function logRoomNav(event: string, detail: Record<string, unknown>) {
  if (!shouldDebugRoomNav()) return;
  const stamp = typeof performance !== "undefined" ? performance.now().toFixed(1) : Date.now().toString();
  console.log(`[emtee-nav ${stamp}ms] ${event}`, detail);
}

export function RoomNavDebugCapture() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (typeof document === "undefined") return;

    function handleClick(event: MouseEvent) {
      if (!shouldDebugRoomNav()) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (anchor instanceof HTMLAnchorElement) {
        const hrefAttr = anchor.getAttribute("href");
        const href = anchor.href;
        if (hrefAttr?.startsWith("/rooms/") || href.includes("/rooms/")) {
          logRoomNav("dom:click", {
            from: pathname,
            hrefAttr,
            href,
            tag: anchor.tagName,
            text: anchor.textContent?.trim()?.slice(0, 80) ?? "",
            classes: anchor.className || "",
          });
        }
        return;
      }

      const button = target.closest("button");
      if (button instanceof HTMLButtonElement) {
        logRoomNav("dom:buttonClick", {
          from: pathname,
          text: button.textContent?.trim()?.slice(0, 80) ?? "",
          classes: button.className || "",
        });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  return null;
}
