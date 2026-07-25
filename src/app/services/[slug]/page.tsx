import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";
import { getService, services, serviceSlugs } from "@/data/services";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type PageParams = { params: Promise<{ slug: string }> };

/** Génère les pages de service au build : elles sont entièrement statiques. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

/** Toute URL hors de cette liste renvoie un 404 plutôt qu'une page vide. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const fil = [
    { label: "Accueil", href: "/" },
    { label: "Nos services", href: "/services" },
    { label: service.shortName, href: `/services/${service.slug}` },
  ];

  const autresServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Prestation" title={service.title} lede={service.lede} breadcrumbs={fil}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#devis" icon="arrowRight">
            Demander un devis
          </Button>
          <Button
            href={`tel:${site.contact.phone}`}
            variant="secondary"
            icon="phone"
            iconPosition="left"
          >
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-ink text-2xl font-bold tracking-tight uppercase">
              Ce que comprend la prestation
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {service.includes.map((element) => (
                <li key={element} className="flex items-start gap-3">
                  <Icon name="checkCircle" className="text-brand mt-0.5 size-5 shrink-0" />
                  <span className="text-ink-soft text-[0.95rem] leading-relaxed">{element}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-5">
              {service.body.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)} className="text-muted leading-relaxed">
                  {paragraphe}
                </p>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <MediaSlot
              alt={`Intervention de ${site.name} — ${service.shortName.toLowerCase()}`}
              className="aspect-4/3 rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />

            <dl className="border-line bg-surface grid grid-cols-1 gap-4 rounded-2xl border p-6">
              {service.facts.map((fait) => (
                <div key={fait.label} className="flex flex-col gap-0.5">
                  <dt className="text-muted-light text-xs tracking-[0.08em] uppercase">
                    {fait.label}
                  </dt>
                  <dd className="text-ink text-base font-semibold">{fait.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">Pour qui ?</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {service.forWho.map((profil) => (
                  <li key={profil} className="text-muted flex items-start gap-2.5 text-sm">
                    <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                    {profil}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <Section tone="surface" spacing="compact">
        <Container>
          <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
            Autres prestations
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {autresServices.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/services/${autre.slug}`}
                  className="border-line hover:border-brand/40 hover:shadow-card flex h-full items-center justify-between gap-3 rounded-xl border bg-white px-5 py-4 transition duration-200"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={autre.icon} className="text-brand size-5" />
                    <span className="text-ink text-sm font-semibold">{autre.shortName}</span>
                  </span>
                  <Icon name="arrowRight" className="text-muted-light size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis
        titre={`Un devis pour votre ${service.shortName.toLowerCase()} ?`}
        prestationParDefaut={service.slug}
      />

      <JsonLd data={[serviceJsonLd(service), breadcrumbJsonLd(fil)]} />
    </>
  );
}
