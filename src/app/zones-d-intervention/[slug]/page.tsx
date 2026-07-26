import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getService } from "@/data/services";
import { getZone, zoneSlugs, zones } from "@/data/zones";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return zoneSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZone(slug);

  if (!zone) return {};

  return buildMetadata({
    title: zone.metaTitle,
    description: zone.metaDescription,
    path: `/zones-d-intervention/${zone.slug}`,
  });
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const zone = getZone(slug);

  if (!zone) notFound();

  const fil = [
    { label: "Accueil", href: "/" },
    { label: "Zones d'intervention", href: "/zones-d-intervention" },
    { label: zone.name, href: `/zones-d-intervention/${zone.slug}` },
  ];

  const servicesPhares = zone.servicesPhares
    .map((slugService) => getService(slugService))
    .filter((service) => service !== undefined);

  const autresZones = zones.filter((item) => item.slug !== zone.slug).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow={`Département ${zone.departement}`}
        title={`Entreprise de nettoyage — ${zone.name}`}
        lede={zone.lede}
        breadcrumbs={fil}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#contact" icon="arrowRight">
            Demander un devis
          </Button>
          <Button href={telHref} variant="secondary" icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-ink text-2xl font-bold tracking-tight uppercase">
              Nos interventions à {zone.name}
            </h2>
            {zone.body.map((paragraphe) => (
              <p key={paragraphe.slice(0, 40)} className="text-muted leading-relaxed">
                {paragraphe}
              </p>
            ))}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="border-line bg-surface rounded-2xl border p-6">
              <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                Communes desservies
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {zone.communes.map((commune) => (
                  <li
                    key={commune}
                    className="border-line text-ink-soft rounded-lg border bg-white px-3 py-1.5 text-xs"
                  >
                    {commune}
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-4 text-xs leading-relaxed">
                Cette liste n&apos;est pas limitative. Appelez-nous pour toute autre commune du
                département {zone.departement}.
              </p>
            </div>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                Prestations les plus demandées
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {servicesPhares.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-ink-soft hover:text-brand flex items-center gap-2.5 text-sm"
                    >
                      <Icon name={service.icon} className="text-brand size-4" />
                      {service.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <Section tone="surface" spacing="compact">
        <Container>
          <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">Autres zones</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {autresZones.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/zones-d-intervention/${autre.slug}`}
                  className="border-line text-ink-soft hover:border-brand/40 hover:text-brand inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors"
                >
                  <Icon name="pin" className="text-brand size-4" />
                  {autre.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis titre={`Un devis pour une intervention à ${zone.name} ?`} />

      <JsonLd data={breadcrumbJsonLd(fil)} />
    </>
  );
}
