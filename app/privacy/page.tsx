import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | EMTEE",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-[100svh] bg-white text-black">
      {/* Top nav (simple, clean) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">
            EMTEE
          </Link>

          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/about" className="hover:opacity-70">
              ABOUT
            </Link>

            {/* simple Projects + Apply */}
            <div className="relative group">
              <Link href="/emteeprojects" className="hover:opacity-70">
                EMTEE PROJECTS
              </Link>
              <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition absolute left-0 mt-2 w-40 rounded-xl border border-black/10 bg-white shadow-lg p-2">
                <Link
                  href="/apply"
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5"
                >
                  APPLY
                </Link>
              </div>
            </div>

            <Link href="/news" className="hover:opacity-70">
              NEWS
            </Link>
            <Link href="/contact" className="hover:opacity-70">
              CONTACT
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.35em] uppercase">
          P R I V A C Y&nbsp;&nbsp;P O L I C Y
        </h1>

        <div className="mt-10 space-y-5 leading-relaxed text-black/80">
          <p>
            The Emtee Group, Emtee Music Group and Emtee Projects receives,
            collects and stores any information only entered by a user on our
            website or provided to us in any other mode.
          </p>

          <p>We collect such non-personal and personal Information for the following purposes:</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              To evaluate candidates and decide whether an artist, writer,
              producer or a&amp;r is a good match for a development programs;
            </li>
            <li>
              To provide our users with ongoing customer assistance and technical support;
            </li>
            <li>
              To be able to contact our visitors and users with general or personalized
              service-related notices, opportunities and promotional messages;
            </li>
            <li>
              To inform our users and guests of different updates and news about Emtee Music Group
              and the music industry;
            </li>
            <li>To comply with any applicable laws and regulations.</li>
          </ol>

    

          <p>
            All direct payment gateways offered by Wix.com and used by our company adhere to the standards
            set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of
            brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure
            the secure handling of credit card information by our store and its service providers.
          </p>

          <p>
            We may contact you to notify you regarding your account, to troubleshoot problems with your
            account, to resolve a dispute, to collect fees or monies owed, to poll your opinions through
            surveys or questionnaires, to send updates about our company, or as otherwise necessary to
            contact you to enforce our User Agreement, applicable national laws, and any agreement we may
            have with you. For these purposes we may contact you via email, telephone, text messages, and
            postal mail.
          </p>

          <p>
            If you don’t want us to process your data anymore, please contact us at{" "}
            <a className="underline" href="mailto:contact@emteemusicgroup.com">
              contact@emteemusicgroup.com
            </a>
            .
          </p>

          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently.
            Changes and clarifications will take effect immediately upon the posting on the website. If we
            make material changes to this policy, we will notify you here that it has been updated, so that
            you are aware of what information we collect, how we use it, and under what circumstances, if
            any, we use and/or disclose it.
          </p>

          <p>
            If you would like to: access, correct, amend or delete any personal information we have about you,
            you are invited to contact us at{" "}
            <a className="underline" href="mailto:contact@emteemusicgroup.com">
              contact@emteemusicgroup.com
            </a>
            .
          </p>
        </div>

        {/* Contact section (simple replica) */}
        <section className="mt-16">
          <h2 className="text-lg font-semibold tracking-wide uppercase">CONTACT US</h2>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="First Name" />
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="Artist Name" />
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="Last Name" />
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="Email" />
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="City" />
            <input className="border border-black/15 rounded-xl px-4 py-3" placeholder="Country" />
            <textarea
              className="md:col-span-2 border border-black/15 rounded-xl px-4 py-3 min-h-[140px]"
              placeholder="Write a message"
            />
            <button
              type="button"
              className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90"
            >
              Submit
            </button>
          </form>

          <p className="mt-4 text-sm text-black/60">
            Thanks for submitting — we will be in touch shortly!
          </p>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="text-sm font-semibold tracking-wide uppercase">CONNECT</div>

          <div className="mt-4 flex items-center gap-3">
            {/* Replace # with real URLs */}
            <a
              href="#"
              className="h-9 w-9 grid place-items-center rounded-full border border-black/15 hover:bg-black/5"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="#"
              className="h-9 w-9 grid place-items-center rounded-full border border-black/15 hover:bg-black/5"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href="#"
              className="h-9 w-9 grid place-items-center rounded-full border border-black/15 hover:bg-black/5"
              aria-label="LinkedIn"
            >
              IN
            </a>
          </div>

          <div className="mt-6 text-sm text-black/75">
            <a className="underline" href="mailto:contact@emteemusicgroup.com">
              contact@emteemusicgroup.com
            </a>
          </div>

          <div className="mt-6 text-sm text-black/70 flex flex-wrap items-center gap-2">
            <Link href="/subscribe" className="underline">
              Subscribe
            </Link>
            <span>|</span>
            <Link href="/privacypolicy" className="underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/termsofservice" className="underline">
              Terms of Service
            </Link>
          </div>

          <div className="mt-6 text-sm text-black/60">© The Emtee Group</div>
        </div>
      </footer>
    </main>
  );
}
