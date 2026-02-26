
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-white text-black grid place-items-center p-8">
      <div className="accent-card-soft max-w-lg rounded-3xl border border-black/10 bg-white/90 px-8 py-10 text-center flex flex-col items-center">
        
        {/* Logo */}
        <Image
          src="/EMG2.png"
          alt="EMG Logo"
          width={180}
          height={180}
          priority
          className="mb-10"
        />

        <div className="mb-6 max-w-sm text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/55">How to Navigate</div>
          <p className="mt-2 text-xs leading-relaxed text-black/70">
            Tap dots to explore rooms. Use Explore <span className="inline-block align-middle text-[13px]">⌕</span> to switch departments. Open resource cards to learn more, then book consultation.
          </p>
        </div>

        <Link
          href="/rooms/front"
          className="inline-block mt-2 rounded-full border border-black px-8 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
        >
          Enter
        </Link>
      </div>
    </main>
  );
}
