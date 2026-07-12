import Link from "next/link";

import { createPageMetadata } from "@/lib/seo/metadata";
import { sitePaddingX, sitePillLinkClass } from "@/lib/site-layout";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist or may have moved.",
  noIndex: true,
  path: "/404",
});

export default function NotFound() {
  return (
    <div
      className={`flex min-h-[60dvh] flex-col items-start justify-center gap-6 py-24 ${sitePaddingX}`}
    >
      <p className="font-mono text-[0.625rem] font-bold tracking-[0.35em] text-brand uppercase">
        404
      </p>
      <h1 className="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-sm text-muted-foreground sm:text-base">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className={sitePillLinkClass}>
        Back to home
      </Link>
    </div>
  );
}
