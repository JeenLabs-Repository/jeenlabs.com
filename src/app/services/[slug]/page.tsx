import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getServiceBySlug,
  SERVICE_SLUGS,
} from "@/lib/services-content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service not found",
      description: "The requested JeenLabs service page could not be found.",
      noIndex: true,
      path: `/services/${slug}`,
    });
  }

  return createPageMetadata({
    title: service.headline,
    description: `${service.heroSubtitle} ${service.description}`.slice(0, 160),
    path: `/services/${service.slug}`,
    keywords: [
      service.headline,
      service.title,
      ...service.tags,
      "JeenLabs",
      "software studio",
    ],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={serviceJsonLd(service.slug)} />
      <ServiceDetail service={service} />
    </>
  );
}
