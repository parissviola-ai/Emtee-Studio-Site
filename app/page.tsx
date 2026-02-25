
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
