import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-[100svh] bg-white text-black">
      {/* Page header */}
      <section className="accent-card-soft mx-auto mt-10 max-w-4xl rounded-2xl border border-black/10 bg-white px-6 pb-10 pt-16">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[0.35em] uppercase">
          Terms of Service
        </h1>

        <p className="mt-6 text-base text-black/80">
          Welcome to Emtee Music Group!
        </p>

        <p className="mt-4 text-sm leading-relaxed text-black/70">
          These terms and conditions outline the rules and regulations for the use
          of The Emtee Group, Emtee Music Group and Emtee Projects Website,
          located at{" "}
          <a
            href="http://emteemusicgroup.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            http://emteemusicgroup.com/
          </a>
          .
        </p>

        <p className="mt-4 text-sm leading-relaxed text-black/70">
          By accessing this website we assume you accept these terms and conditions.
          Do not continue to use Emtee Music Group if you do not agree to take all of
          the terms and conditions stated on this page.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-black/70">
          The following terminology applies to these Terms and Conditions, Privacy
          Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;,
          &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this
          website and compliant to the Company&apos;s terms and conditions.
          &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot;
          and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;,
          or &quot;Us&quot;, refers to both the Client and ourselves.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-black/70">
          All terms refer to the offer, acceptance and consideration of payment
          necessary to undertake the process of our assistance to the Client in the
          most appropriate manner for the express purpose of meeting the Client&apos;s
          needs in respect of provision of the Company&apos;s stated services, in
          accordance with and subject to, prevailing law of Netherlands.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-black/70">
          Any use of the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
      </section>

      {/* Content sections */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="space-y-10">
          <article className="accent-card-soft rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We employ the use of cookies. By accessing Emtee Music Group, you agreed
              to use cookies in agreement with The Emtee Group, Emtee Music Group and
              Emtee Music Group&apos;s Privacy Policy.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Most interactive websites use cookies to let us retrieve the user&apos;s
              details for each visit. Cookies are used by our website to enable the
              functionality of certain areas to make it easier for people visiting
              our website. Some of our affiliate/advertising partners may also use
              cookies.
            </p>
          </article>

          <article className="accent-card-soft rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">License</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Unless otherwise stated, The Emtee Group, Emtee Music Group and Emtee
              Music Group and/or its licensors own the intellectual property rights
              for all material on Emtee Music Group. All intellectual property rights
              are reserved. You may access this from Emtee Music Group for your own
              personal use subjected to restrictions set in these terms and conditions.
            </p>

            <p className="mt-4 text-sm font-semibold">You must not:</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-2">
              <li>Republish material from Emtee Music Group</li>
              <li>Sell, rent or sub-license material from Emtee Music Group</li>
              <li>Reproduce, duplicate or copy material from Emtee Music Group</li>
              <li>Redistribute content from Emtee Music Group</li>
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              This Agreement shall begin on the date hereof.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              Parts of this website offer an opportunity for users to post and exchange
              opinions and information in certain areas of the website. The Emtee Group,
              Emtee Music Group and Emtee Projects does not filter, edit, publish or
              review comments prior to their presence on the website. Comments do not
              reflect the views and opinions of The Emtee Group, Emtee Music Group and
              Emtee Projects, its agents and/or affiliates.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              To the extent permitted by applicable laws, The Emtee Group, Emtee Music
              Group and Emtee Projects shall not be liable for the comments or for any
              liability, damages or expenses caused and/or suffered as a result of any
              use of and/or posting of and/or appearance of the comments on this website.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              The Emtee Group, Emtee Music Group and Emtee Project reserves the right to
              monitor all Comments and to remove any Comments which can be considered
              inappropriate, offensive or causes breach of these Terms and Conditions.
            </p>

            <p className="mt-4 text-sm font-semibold">You warrant and represent that:</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-2">
              <li>
                You are entitled to post the Comments on our website and have all
                necessary licenses and consents to do so;
              </li>
              <li>
                The Comments do not invade any intellectual property right, including
                without limitation copyright, patent or trademark of any third party;
              </li>
              <li>
                The Comments do not contain any defamatory, libelous, offensive,
                indecent or otherwise unlawful material which is an invasion of privacy;
              </li>
              <li>
                The Comments will not be used to solicit or promote business or custom
                or present commercial activities or unlawful activity.
              </li>
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              You hereby grant The Emtee Group, Emtee Music Group and Emtee Projects a
              non-exclusive license to use, reproduce, edit and authorize others to use,
              reproduce and edit any of your Comments in any and all forms, formats or media.
            </p>
          </article>

          <article className="accent-card-soft rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Hyperlinking to our Content</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-2">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>
                Online directory distributors may link to our Website in the same manner as they
                hyperlink to the Websites of other listed businesses; and
              </li>
              <li>
                System wide Accredited Businesses except soliciting non-profit organizations,
                charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
              </li>
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              These organizations may link to our home page, to publications or to other Website information so
              long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products and/or services; and
              (c) fits within the context of the linking party&apos;s site.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              We may consider and approve other link requests from the following types of organizations:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-2">
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              If you are one of the organizations listed above and are interested in linking to our website,
              you must inform us by sending an e-mail to The Emtee Group, Emtee Music Group and Emtee Projects.
              Please include your name, your organization name, contact information as well as the URL of your site,
              a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to
              which you would like to link.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-black/70">
              No use of The Emtee Group, Emtee Music Group and Emtee Project&apos;s logo or other artwork will be allowed
              for linking absent a trademark license agreement.
            </p>
          </article>

          <article className="accent-card-soft rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">iFrames</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Without prior approval and written permission, you may not create frames around our Webpages that
              alter in any way the visual presentation or appearance of our Website.
            </p>
          </article>

          <article className="accent-card-soft rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">Content Liability</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We shall not be hold responsible for any content that appears on your Website. You agree to protect
              and defend us against all claims that is rising on your Website. No link(s) should appear on any Website
              that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates
              the infringement or other violation of, any third party rights.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Your Privacy</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Please read{" "}
              <Link href="/privacypolicy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Reservation of Rights</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We reserve the right to request that you remove all links or any particular link to our Website.
              You approve to immediately remove all links to our Website upon request. We also reserve the right
              to amend these terms and conditions and its linking policy at any time. By continuously linking to
              our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Removal of links from our website</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              If you find any link on our Website that is offensive for any reason, you are free to contact and inform
              us any moment. We will consider requests to remove links but we are not obligated to or so or to respond
              to you directly.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy;
              nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
            </p>
          </article>

          <article>
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating
              to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-2">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-black/70">
              The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer:
              (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer,
              including liabilities arising in contract, in tort and for breach of statutory duty.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              As long as the website and the information and services on the website are provided free of charge, we will not be
              liable for any loss or damage of any nature.
            </p>
          </article>
        </div>

        {/* CONTACT US block (simple replica) */}
        <div className="mt-14 border-t border-black/10 pt-10">
          <h2 className="text-2xl font-semibold">Contact Us</h2>

          <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="First Name"
            />
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="Artist Name"
            />
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="Last Name"
            />
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="Email"
              type="email"
            />
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="City"
            />
            <input
              className="rounded-xl border border-black/15 px-4 py-3 text-sm"
              placeholder="Country"
            />
            <textarea
              className="sm:col-span-2 rounded-xl border border-black/15 px-4 py-3 text-sm min-h-[120px]"
              placeholder="Write a message"
            />
            <button
              type="button"
              className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-black/90 transition"
            >
              Submit
            </button>
          </form>

          <p className="mt-6 text-sm text-black/60">
            Thanks for submitting — we will be in touch shortly!
          </p>
        </div>

        {/* CONNECT + footer-ish area (matches what you asked for) */}
        <div className="mt-14 border-t border-black/10 pt-10 pb-16">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-black/60">
            Connect
          </h3>

          <div className="mt-4 flex items-center gap-3">
            {/* Replace href values with the real links when you have them */}
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:border-black/30 transition"
            >
              IG
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:border-black/30 transition"
            >
              FB
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 hover:border-black/30 transition"
            >
              IN
            </a>
          </div>

          <div className="mt-6 text-sm text-black/70">
            <a href="mailto:contact@emteemusicgroup.com" className="underline underline-offset-4">
              contact@emteemusicgroup.com
            </a>
          </div>

          <div className="mt-6 text-sm text-black/70">
            <span>Subscribe</span>
            <span className="px-3 text-black/40">|</span>
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            <span className="px-3 text-black/40">|</span>
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>
          </div>

          <div className="mt-8 text-sm text-black/60">© The Emtee Group</div>
        </div>
      </section>
    </main>
  );
}
