"use client";

export default function ApplyPage() {
  return (
    <main className="min-h-[100svh] bg-white text-black px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold">Artist Application</h1>
          <p className="mt-4 text-black/70">
            Emtee Music Group works with a small number of artists at a time.
            Please complete the application thoughtfully.
          </p>
        </header>

        <form className="space-y-12">
          {/* 1. Basic Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              1. Basic Information & Logistics
            </h2>

            <div className="grid gap-6">
              <input
                type="text"
                placeholder="Legal Name & Artist / Stage Name"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Current Location (City, State/Province, Country)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Primary Genre (e.g., Hip-Hop, R&B, Pop)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Primary Role (Vocalist, Producer, Songwriter, etc.)"
                className="border border-black/20 p-3 rounded-md"
              />
            </div>
          </section>

          {/* 2. Digital Presence */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              2. Digital Presence & Reach
            </h2>

            <div className="grid gap-6">
              <input
                type="text"
                placeholder="Social Media Links (Instagram, TikTok, Twitter/X)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Streaming Links (Spotify, Apple Music, SoundCloud, YouTube)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Current Monthly Listeners (approximate)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="EPK Link (optional)"
                className="border border-black/20 p-3 rounded-md"
              />
            </div>
          </section>

          {/* 3. Artistry & Development */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              3. Artistry & Development
            </h2>

            <div className="grid gap-6">
              <textarea
                rows={4}
                placeholder="Mission Statement — In 2–3 sentences, describe the core message or vibe of your brand."
                className="border border-black/20 p-3 rounded-md"
              />

              <textarea
                rows={3}
                placeholder="Career Stage — Independent or prior management / label experience?"
                className="border border-black/20 p-3 rounded-md"
              />

              <textarea
                rows={3}
                placeholder="Education Interest — What areas of the music business do you need the most guidance in?"
                className="border border-black/20 p-3 rounded-md"
              />

              <textarea
                rows={3}
                placeholder="Recent Accomplishments — List 2–3 milestones from the past 12 months."
                className="border border-black/20 p-3 rounded-md"
              />
            </div>
          </section>

          {/* 4. Management Fit */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              4. Management Fit
            </h2>

            <div className="grid gap-6">
              <textarea
                rows={4}
                placeholder="Why Emtee? What about our approach resonates with you?"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Your Current Team (Manager, Lawyer, Publicist, or Solo)"
                className="border border-black/20 p-3 rounded-md"
              />

              <textarea
                rows={3}
                placeholder="Short-term Goals — What do you want to achieve in the next 6 months?"
                className="border border-black/20 p-3 rounded-md"
              />

              <textarea
                rows={3}
                placeholder="Long-term Vision — Where do you see your career in 5 years?"
                className="border border-black/20 p-3 rounded-md"
              />
            </div>
          </section>

          {/* 5. Materials */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              5. Materials Submission
            </h2>

            <div className="grid gap-6">
              <input
                type="text"
                placeholder="Unreleased Music (Dropbox / Drive / Private SoundCloud)"
                className="border border-black/20 p-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Performance Video (Live or rehearsal footage)"
                className="border border-black/20 p-3 rounded-md"
              />
            </div>
          </section>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full rounded-full bg-black text-white py-4 text-sm font-semibold transition hover:bg-black/90"
            >
              Submit Application
            </button>

            <p className="mt-4 text-center text-xs text-black/60">
              Submission does not guarantee acceptance. Emtee reviews all
              applications internally.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
