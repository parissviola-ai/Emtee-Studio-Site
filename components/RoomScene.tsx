"use client";

import Link from "next/link";
import { useState } from "react";

type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  href?: string;
  modal?: {
    title: string;
    body: string;
    primaryLabel?: string;
    primaryHref?: string;
    image?: string; //
  };
};

type Room = {
  slug: string;
  title?: string;
  backgroundImage: string;
  hotspots: Hotspot[];
};

const EXPLORE_ROOMS = [
  { label: "Apply", href: "/apply" },
  { label: "Book a Session", href: "/booking" },
  { label: "Lobby", href: "/rooms/front" },
  { label: "Session Room", href: "/rooms/session" },
  { label: "Artist Room", href: "/rooms/booth" },
];

export default function RoomScene({ room }: { room: Room }) {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<Hotspot["modal"] | null>(null);
  const isModalOpen = !!activeModal;
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Background layer */}
      <div
        data-moving-layer="true"
        className={[
          "absolute inset-0 will-change-transform transition-[filter] duration-300 ease-out",
          exploreOpen ? "blur-xl" : "blur-0",
        ].join(" ")}
        style={{ transform: "translate3d(0,0,0) scale(1.06)" }}
      >
        <img
          src={room.backgroundImage}
          alt={room.title || room.slug}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* vignette */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Room label */}
      <div className="absolute left-6 top-6 z-20">
        <div className="text-xs tracking-widest text-white/60">ROOM</div>
        <div className="text-3xl font-semibold">{room.title || "Lobby"}</div>
      </div>

      {/* Hotspots */}
      <div className="absolute inset-0 z-30">
        {room.hotspots.map((spot) => {
          const sharedClassName = [
            "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200",
            isModalOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          ].join(" ");

          const sharedStyle = { left: `${spot.x}%`, top: `${spot.y}%` };

          const content = (
            <span className="group inline-flex items-center">
              {/* Circle */}
              <span className="hotspot-dot flex h-10 w-10 items-center justify-center rounded-full border border-white/85">
                <span className="hotspot-arrow">←</span>
              </span>

              {/* Expanding pill */}
              <span className="ml-2 overflow-hidden rounded-full border border-white/85 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 ease-out max-w-0 group-hover:max-w-[260px]">
                <span className="block whitespace-nowrap px-0 py-2 text-sm font-medium opacity-0 transition-all duration-300 ease-out group-hover:px-4 group-hover:opacity-100">
                  {spot.label}
                </span>
              </span>
            </span>
          );

          // ✅ Modal hotspot
          if (spot.modal) {
            return (
              <button
                key={spot.id}
                type="button"
                className={sharedClassName}
                style={sharedStyle}
                onClick={() => setActiveModal(spot.modal!)}
              >
                {content}
              </button>
            );
          }

          // ✅ Link hotspot (href required)
          if (!spot.href) {
            // Safety fallback: don't crash if href is missing
            return (
              <div key={spot.id} className={sharedClassName} style={sharedStyle}>
                {content}
              </div>
            );
          }

          return (
            <Link
              key={spot.id}
              href={spot.href}
              className={sharedClassName}
              style={sharedStyle}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* Bottom Explore bar */}
      <div className="absolute bottom-6 left-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setExploreOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-left backdrop-blur-xl transition hover:bg-black/45"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30">
            <span className="text-white/80">⌕</span>
          </span>

          <div className="flex-1">
            <div className="text-sm font-semibold text-white/90">Explore</div>
            <div className="text-xs text-white/60">Open navigation</div>
          </div>

          <span className="text-white/70">→</span>
        </button>
      </div>

      {/* Explore overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-200",
          exploreOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close Explore"
          className="absolute inset-0 bg-black/40"
          onClick={() => setExploreOpen(false)}
        />

        {/* Left panel */}
        <div className="absolute left-0 top-0 h-full w-[340px] max-w-[85vw] border-r border-white/10 bg-black/45 backdrop-blur-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/70">
              Explore
            </div>

            <button
              type="button"
              onClick={() => setExploreOpen(false)}
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/75 hover:text-white transition"
            >
              Close
            </button>
          </div>

          <div className="mt-10 space-y-5">
            {EXPLORE_ROOMS.map((item) => {
              const isApply = item.label.toLowerCase().includes("apply");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setExploreOpen(false)}
                  className={
                    isApply
                      ? "mb-8 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-xl shadow-lg shadow-black/30 transition hover:border-white/40 hover:bg-white/15"
                      : "block text-3xl font-semibold leading-tight text-white/70 hover:text-white transition"
                  }
                >
                  {isApply ? (
                    <span className="flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="text-white/80">→</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-8 text-sm font-semibold text-white/75">
            EMTEE
          </div>
        </div>
      </div>

    {/* ✅ MODAL OVERLAY */}
{activeModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-auto">
    {/* Backdrop (click to close) */}
    <button
      type="button"
      aria-label="Close modal"
      onClick={() => setActiveModal(null)}
      className="absolute inset-0 bg-black/60"
    />

    {/* Panel */}
    <div className="relative z-10 w-full max-w-[900px] rounded-3xl border border-white/15 bg-black/55 backdrop-blur-2xl shadow-2xl overflow-hidden">
      
      <div className="flex items-start justify-between gap-6 p-6">
        <div className="min-w-0">
          
          <h2 className="text-2xl font-semibold">{activeModal.title}</h2>
          <p className="mt-3 text-white/80 leading-relaxed whitespace-pre-line">
            {activeModal.body}
          </p>

{/* Image under sentence */}
{activeModal.image && (
  <div className="mt-6 flex justify-center">
    <img
      src={activeModal.image}
      alt={activeModal.title}
      className="w-full max-w-[760px] max-h-[360px] object-contain rounded-lg"
    />
  </div>
)}
        </div>

        
      </div>

      {/* Bottom buttons */}
      <div className="flex flex-wrap items-center gap-3 px-6 pb-6">
        {activeModal.primaryHref && (
          <Link
            href={activeModal.primaryHref}
            onClick={() => setActiveModal(null)}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            {activeModal.primaryLabel ?? "View Details"} →
          </Link>
        )}

        <button
          type="button"
          onClick={() => setActiveModal(null)}
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 hover:bg-white/15 hover:text-white transition"
        >
          Back
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}