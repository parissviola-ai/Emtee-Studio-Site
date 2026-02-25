import Link from "next/link";

export default function SubscribePage() {
  return (
    <main className="min-h-[100svh] bg-white px-6 py-24 text-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold">Subscribe</h1>
        <p className="mt-3 text-black/70">
          Subscription updates are currently handled through consultation requests.
        </p>
        <Link
          href="/consultation"
          className="mt-6 inline-flex items-center rounded-full border border-black/15 px-5 py-2 text-sm font-semibold hover:bg-black/[0.03]"
        >
          Request Consultation
        </Link>
      </div>
    </main>
  );
}
