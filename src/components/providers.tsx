"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { DeferredUntilInteraction } from "@/components/deferred-until-interaction";
import { SiteAmbientBackground } from "@/components/site-ambient-background";
import { siteGridClass } from "@/lib/site-layout";

function AmbientBackgroundFallback() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className={cn("absolute inset-0", siteGridClass)} />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            clamp(280px, 42vmax, 720px) circle at 50% 38%,
            color-mix(in oklch, var(--foreground) 9%, transparent) 0%,
            color-mix(in oklch, var(--brand) 4%, transparent) 32%,
            transparent 72%
          )`,
        }}
      />
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [enhanceAmbient, setEnhanceAmbient] = useState(false);

  useEffect(() => {
    setEnhanceAmbient(
      window.matchMedia("(pointer: fine) and (min-width: 48rem)").matches,
    );
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {enhanceAmbient ? (
        <DeferredUntilInteraction fallback={<AmbientBackgroundFallback />}>
          <SiteAmbientBackground />
        </DeferredUntilInteraction>
      ) : (
        <AmbientBackgroundFallback />
      )}
      <div className="relative z-[1] isolate">{children}</div>
    </ThemeProvider>
  );
}
