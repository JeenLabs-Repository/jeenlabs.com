import { cn } from "@/lib/utils";

import {
  siteEyebrowClass,
  siteSectionDescriptionClass,
  siteSectionTitleClass,
  siteTitleAccentClass,
} from "@/lib/site-layout";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  headingId?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  headingId,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3 sm:gap-4 md:gap-5",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className={siteEyebrowClass}>{eyebrow}</p>
      <h2 id={headingId} className={siteSectionTitleClass}>
        {title}
        {titleAccent ? (
          <>
            {" "}
            <span className={siteTitleAccentClass}>{titleAccent}</span>
          </>
        ) : null}
      </h2>
      <p
        className={cn(
          siteSectionDescriptionClass,
          centered && "mx-auto md:text-center",
        )}
      >
        {description}
      </p>
    </div>
  );
}
