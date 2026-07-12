"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { readConsent, writeConsent } from "@/lib/consent";
import {
  siteFocusRingClass,
  sitePaddingX,
  sitePillLinkClass,
} from "@/lib/site-layout";
import { cn } from "@/lib/utils";

const acceptClass = cn(
  "inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2 font-mono text-[0.625rem] font-semibold leading-none tracking-[0.15em] text-white uppercase transition-[filter,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
  "hover:brightness-110 active:scale-[0.98]",
  siteFocusRingClass,
);

export function CookieConsentBanner() {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setVisible(readConsent() === null);
  }, [mounted]);

  if (!mounted || !visible) return null;

  const dismiss = (analytics: boolean) => {
    writeConsent(analytics);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[1050]",
        "pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
        !prefersReducedMotion && "animate-consent-banner-enter",
      )}
    >
      <div className={cn("mx-auto w-full max-w-6xl", sitePaddingX)}>
        <div
          className={cn(
            "border border-border/40 border-t-brand/40 bg-background/92 shadow-[0_-12px_48px_color-mix(in_oklch,var(--background)_55%,transparent)] backdrop-blur-xl",
            "rounded-2xl p-4 sm:p-5 md:flex md:items-end md:justify-between md:gap-8 md:p-6",
          )}
        >
          <div className="flex min-w-0 flex-col gap-2 md:max-w-[48rem]">
            <p
              id="cookie-consent-title"
              className="font-mono text-[0.625rem] font-bold tracking-[0.28em] text-brand-accessible uppercase sm:text-xs sm:tracking-[0.32em]"
            >
              Privacy & cookies
            </p>
            <p
              id="cookie-consent-desc"
              className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]"
            >
              We use essential cookies to run this site. With your OK, we may
              also use analytics cookies. By accepting, you agree to our{" "}
              <Link
                href="/privacy"
                className={cn(
                  "text-brand-accessible underline underline-offset-4 transition-colors hover:text-foreground",
                  siteFocusRingClass,
                  "rounded-sm",
                )}
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className={cn(
                  "text-brand-accessible underline underline-offset-4 transition-colors hover:text-foreground",
                  siteFocusRingClass,
                  "rounded-sm",
                )}
              >
                Terms of Use
              </Link>
              .
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center md:mt-0 md:shrink-0">
            <button
              type="button"
              className={cn(sitePillLinkClass, "w-full sm:w-auto")}
              onClick={() => dismiss(false)}
            >
              Essential only
            </button>
            <button
              type="button"
              className={cn(acceptClass, "w-full sm:w-auto")}
              onClick={() => dismiss(true)}
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
