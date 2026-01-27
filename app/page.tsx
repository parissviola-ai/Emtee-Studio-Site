
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-white text-black grid place-items-center p-8">
      <div className="max-w-lg text-center flex flex-col items-center">
        
        {/* Logo */}
        <Image
          src="/EMG2.png"
          alt="EMG Logo"
          width={180}
          height={180}
          priority
          className="mb-10"
        />

        {/* Optional subtitle */}
        <p className="text-black/60 text-sm tracking-wide">
             Interactive studio experience
        </p>

        {/* Enter button */}
        <Link
          href="/rooms/front"
          className="inline-block mt-10 rounded-full border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
        >
          Enter
        </Link>
      </div>
    </main>
  );
}

