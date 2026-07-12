"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { type ComponentProps, useEffect, useRef } from "react";

import { getGsap } from "@/lib/gsap-lazy";

const ringClass = cn(
  "flex size-11 items-center justify-center overflow-hidden rounded-full border transition-all duration-500 sm:size-12 md:size-14",
  "border-[color-mix(in_oklab,var(--brand)_35%,var(--foreground)_15%)]",
  "group-hover:border-brand group-hover:shadow-[0_0_20px_color-mix(in_oklab,var(--brand)_35%,transparent)]",
);

const fillClass =
  "flex size-full items-center justify-center rounded-full bg-transparent transition-colors duration-500 group-hover:bg-brand";

const labelClass = cn(
  "font-mono text-[10px] font-bold tracking-[0.18em] text-foreground uppercase transition-colors duration-300 sm:text-[11px] sm:tracking-[0.2em]",
  "group-hover:text-brand dark:group-hover:text-[color-mix(in_oklab,var(--brand)_90%,white)]",
);

type RingCtaButtonProps = Omit<ComponentProps<"button">, "children"> & {
  label?: string;
};

export function RingCtaButton({
  label = "Get Started",
  className,
  type = "button",
  ...props
}: RingCtaButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 64rem)");
    if (!mq.matches) return;

    let cancelled = false;

    let removeListener: (() => void) | undefined;

    void getGsap().then((gsap) => {
      if (cancelled) return;

      const handleMouseMove = (e: MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 150) {
          gsap.to(button, {
            x: (e.clientX - centerX) * 0.4,
            y: (e.clientY - centerY) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      removeListener = () =>
        window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => {
      cancelled = true;
      removeListener?.();
    };
  }, [prefersReducedMotion]);

  return (
    <button
      ref={buttonRef}
      type={type}
      className={cn(
        "group relative z-10 flex w-fit min-h-11 shrink-0 cursor-pointer touch-manipulation items-center gap-4 self-start border-0 bg-transparent p-0 sm:gap-5",
        className,
      )}
      {...props}
    >
      <div className={ringClass}>
        <div className={fillClass}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-foreground transition-colors duration-500 group-hover:stroke-white"
            aria-hidden
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className={labelClass}>{label}</span>
    </button>
  );
}
