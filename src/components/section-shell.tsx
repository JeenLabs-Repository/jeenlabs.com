import type { ReactNode, RefObject } from "react";
import {
  sitePaddingX,
  siteSectionYClass,
  siteSectionYTallClass,
} from "@/lib/site-layout";
import { cn } from "@/lib/utils";

export type SectionTone = "plain" | "studio" | "ember" | "ink";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  ariaLabelledBy?: string;
  sectionRef?: RefObject<HTMLElement | null>;
  /** Tall chapters gain extra vertical air on large monitors only. */
  tall?: boolean;
  /**
   * Non-hero section backgrounds (recommended studio surfaces):
   * - plain: ambient grid only
   * - studio: soft elevated panel + corner brand wash
   * - ember: stronger brand radial for desire/CTA moments
   * - ink: slightly deeper band for contrast rhythm
   */
  tone?: SectionTone;
};

const TONE_CLASS: Record<SectionTone, string> = {
  plain: "bg-transparent",
  studio: cn(
    "bg-[color-mix(in_oklch,var(--background)_88%,var(--foreground)_4%)]",
    "border-y border-border/25",
  ),
  ember: cn(
    "bg-[color-mix(in_oklch,var(--background)_92%,var(--brand)_3%)]",
    "border-y border-brand/15",
  ),
  ink: cn(
    "bg-[color-mix(in_oklch,var(--background)_82%,black_10%)]",
    "border-y border-border/20",
  ),
};

function SectionToneBackdrop({ tone }: { tone: SectionTone }) {
  if (tone === "plain") return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {tone === "studio" ? (
        <>
          <div className="absolute -top-24 right-[-10%] size-[min(70vw,28rem)] rounded-full bg-brand/[0.06] blur-[100px]" />
          <div className="absolute -bottom-28 left-[-8%] size-[min(60vw,24rem)] rounded-full bg-foreground/[0.04] blur-[90px]" />
        </>
      ) : null}
      {tone === "ember" ? (
        <>
          <div className="absolute top-1/2 left-1/2 size-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.09] blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,color-mix(in_oklch,var(--background)_70%,transparent)_75%)]" />
        </>
      ) : null}
      {tone === "ink" ? (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          <div className="absolute -top-20 left-1/3 size-[min(50vw,20rem)] rounded-full bg-brand/[0.05] blur-[80px]" />
        </>
      ) : null}
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className,
  innerClassName,
  ariaLabelledBy,
  sectionRef,
  tall = false,
  tone = "plain",
}: SectionShellProps) {
  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative isolate w-full overflow-x-hidden",
        tall ? siteSectionYTallClass : siteSectionYClass,
        TONE_CLASS[tone],
        className,
      )}
    >
      <SectionToneBackdrop tone={tone} />
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl",
          sitePaddingX,
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
