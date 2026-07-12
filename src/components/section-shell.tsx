import { cn } from "@/lib/utils";
import type { ReactNode, RefObject } from "react";

import { sitePaddingX } from "@/lib/site-layout";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  ariaLabelledBy?: string;
  sectionRef?: RefObject<HTMLElement | null>;
  /** Tall sections fill most of the viewport on desktop. */
  tall?: boolean;
};

export function SectionShell({
  id,
  children,
  className,
  innerClassName,
  ariaLabelledBy,
  sectionRef,
  tall = false,
}: SectionShellProps) {
  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative isolate w-full overflow-hidden py-20 sm:py-24",
        tall ? "md:min-h-dvh md:py-32" : "md:py-28",
        className,
      )}
    >
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
