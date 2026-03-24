"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="group relative h-screen overflow-hidden bg-black text-white">
      <Image
        src="/rooms/stillbuildingfinal.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top sm:hidden"
      />
      <Image
        src="/rooms/fullimagecity.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[center_18%] transition-transform duration-[1800ms] ease-out group-hover:scale-[1.02] sm:block lg:object-[center_50%] 2xl:object-[center_58%]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.38),rgba(6,6,6,0.24)_35%,rgba(6,6,6,0.54))]" />

      <div className="relative z-10 flex h-full items-end justify-center px-6 py-12 sm:justify-center sm:pb-28 sm:pl-6 lg:pb-32 lg:pl-6">
        <div className="flex flex-col items-center gap-4">
          <div
            className={[
              "w-full max-w-[19.5rem] rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.016))] px-3.5 py-3 text-center shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-[7px] transition-all duration-[1200ms] ease-out sm:max-w-[22rem] sm:px-4 sm:py-3.5",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            ].join(" ")}
          >
            <Image
              src="/logotransparent.png"
              alt="EMTEE Music Group logo"
              width={180}
              height={180}
              priority
              className="mx-auto mb-2 h-auto w-[52px] object-contain invert sm:w-[58px]"
            />

            <div className="mx-auto max-w-[16.5rem] text-center sm:max-w-[18rem]">
              <h1 className="text-[0.98rem] font-semibold leading-[1.08] text-white sm:text-[1.2rem]">
                Welcome to Emtee Music Group
              </h1>

              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/54 sm:text-[11px]">
                The First Ever Creative Business Launchpad
              </p>

              <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/72 sm:text-[12px]">
                When you enter the building, you&apos;ll notice multiple interactive rooms to explore. For the
                best experience, click the glowing dots to enter each room and use Explore to switch
                between rooms and departments.
              </p>
            </div>
          </div>

          <Link
            href="/rooms/front"
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/28 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition hover:bg-black/40 max-sm:flex-row-reverse sm:-translate-x-8 sm:translate-y-[7rem] lg:translate-y-[4.25rem]"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/75 bg-black/18 text-xs leading-none">
              <span className="sm:hidden">→</span>
              <span className="hidden sm:inline">←</span>
            </span>
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
