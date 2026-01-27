import Link from "next/link";

export default function BookingPage() {
  return (
    <main className="min-h-[100svh] bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/rooms/front" className="text-white/70 hover:text-white text-sm">
          ← Back to Lobby
        </Link>

        <h1 className="mt-6 text-3xl font-semibold">Book a Session</h1>
        <p className="mt-3 text-white/70 leading-relaxed">
          Placeholder page. Later, this can embed Calendly/Acuity or link to your booking form,
          plus show session types and rates.
        </p>

        <div className="mt-6 rounded-xl border border-white/15 p-5 text-white/70">
          <p className="text-sm">
            ✅ Next: add booking link / embed here.
          </p>
        </div>
      </div>
    </main>
  );
}
