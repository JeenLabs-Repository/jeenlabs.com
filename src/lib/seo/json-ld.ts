import {
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-seo";
import { SERVICE_SLUGS, SERVICES_CONTENT } from "@/lib/services-content";
import { absoluteUrl } from "@/lib/seo/metadata";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    description: ORGANIZATION.description,
    areaServed: ORGANIZATION.areaServed,
    knowsAbout: ORGANIZATION.knowsAbout,
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: ORGANIZATION.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professional-service`,
    name: SITE_NAME,
    url: SITE_URL,
    email: ORGANIZATION.email,
    description: ORGANIZATION.description,
    areaServed: ORGANIZATION.areaServed,
    serviceType: ORGANIZATION.knowsAbout,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function homeJsonLd() {
  return [organizationJsonLd(), websiteJsonLd(), professionalServiceJsonLd()];
}

export function serviceJsonLd(slug: (typeof SERVICE_SLUGS)[number]) {
  const service = SERVICES_CONTENT[slug];
  const url = absoluteUrl(`/services/${slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.description,
      url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ORGANIZATION.areaServed,
      serviceType: service.headline,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_URL}/#services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.headline,
          item: url,
        },
      ],
    },
  ];
}
