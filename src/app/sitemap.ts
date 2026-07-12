import type { MetadataRoute } from "next";

import { SERVICE_SLUGS } from "@/lib/services-content";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_SLUGS.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
