import Link from "next/link";

import { CONTACT_EMAIL } from "@/lib/contact-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  siteEyebrowClass,
  siteInteriorPageYClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
} from "@/lib/site-layout";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "How JeenLabs handles information submitted through the contact form and site.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8 ${sitePaddingX} ${siteInteriorPageYClass}`}
    >
      <div className="flex flex-col gap-4">
        <p className={siteEyebrowClass}>Legal</p>
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
          Privacy
        </h1>
        <p className={siteSectionDescriptionClass}>
          Last updated July 13, 2026. This page explains what we collect when
          you use jeenlabs.com.
        </p>
      </div>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            What we collect
          </h2>
          <p>
            The contact form opens your email client with the details you typed
            (name, email, optional company, subject, and message). That content
            is sent to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-accessible underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            via your own mail app — we do not host a message database on this
            site.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            Cookies & analytics
          </h2>
          <p>
            We use essential cookies needed to run the site. Optional analytics
            cookies (Google Analytics, when configured for this deployment) only
            load after you choose Accept all on the consent banner. Essential
            only keeps analytics off. You can also block analytics with browser
            settings or extensions.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>
            Questions about this policy: write to{" "}
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
