import Link from "next/link";

import { CONTACT_EMAIL } from "@/lib/contact-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  siteEyebrowClass,
  siteHeaderOffsetClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
  siteSectionYClass,
} from "@/lib/site-layout";

export const metadata = createPageMetadata({
  title: "Terms",
  description: "Terms of use for the JeenLabs marketing site.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8 ${sitePaddingX} ${siteHeaderOffsetClass} ${siteSectionYClass}`}
    >
      <div className="flex flex-col gap-4">
        <p className={siteEyebrowClass}>Legal</p>
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
          Terms
        </h1>
        <p className={siteSectionDescriptionClass}>
          Last updated July 13, 2026. These terms cover use of the public
          jeenlabs.com site.
        </p>
      </div>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">The site</h2>
          <p>
            Content on this site is for information about JeenLabs services. It
            is not a binding proposal. Project scope, fees, and timelines are
            agreed separately in writing.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">Acceptable use</h2>
          <p>
            Do not misuse the contact form, attempt to disrupt the site, or
            scrape content for competing marketing without permission.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>
            Questions about these terms: write to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-accessible underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <Link href="/" className={sitePillLinkClass}>
        Back to home
      </Link>
    </div>
  );
}
