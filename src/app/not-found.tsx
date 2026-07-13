import Link from "next/link";

import { CONTACT_EMAIL } from "@/lib/contact-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  siteInteriorPageYClass,
  sitePaddingX,
  sitePillLinkClass,
} from "@/lib/site-layout";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist or may have moved.",
  noIndex: true,
  path: "/404",
});

export default function NotFound() {
  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col items-start justify-center gap-6 ${sitePaddingX} ${siteInteriorPageYClass} min-h-[70svh]`}
    >
      <p className="font-mono text-[0.625rem] font-bold tracking-[0.35em] text-brand uppercase">
        404
      </p>
      <h1 className="text-3xl font-black tracking-tight text-foreground uppercase text-balance sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
        That URL is missing or moved. Head home, or email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-brand-accessible underline underline-offset-4"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        if you expected something here.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className={sitePillLinkClass}>
          Back to home
        </Link>
        <Link href="/#contact" className={sitePillLinkClass}>
          Contact
        </Link>
      </div>
    </div>
  );
}
