import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getService } from "@/data/services";
import { getZone } from "@/data/zones";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: `Nettoyage à ${site.address.city}`, href: "/meaux" },
];

const zone = getZone("meaux");

/** Repères locaux affichés en tête de colonne latérale. */
const reperes: readonly { valeur: string; libelle: string }[] = [
  { valeur: site.address.postalCode, libelle: `Code postal de ${site.address.city}` },
  { valeur: `${zone?.communes.length ?? 0}`, libelle: "Communes desservies autour" },
  { valeur: "0 €", libelle: "Frais de déplacement sur les communes limitrophes" },
  { valeur: site.delaiReponse, libelle: "Délai de réponse à une demande de devis" },
];

const titre = zone?.metaTitle ?? `Entreprise de nettoyage à ${site.address.city} | ${site.name}`;

export const metadata: Metadata = {
  ...buildMetadata({
    title: titre,
    description: zone?.metaDescription ?? site.description,
    path: "/meaux",
  }),
  // Les titres de `data/zones.ts` portent déjà le nom de la marque, écrit pour
  // s'afficher tel quel en résultat de recherche. Sans `absolute`, le gabarit du
  // layout l'ajouterait une seconde fois.
  title: { absolute: titre },
};

/**
 * Page locale de Meaux.
 *
 * Seule page de zone du site : c'est la ville d'implantation, donc celle sur
 * laquelle le référencement local a le plus de valeur. Les autres départements
 * sont mentionnés sur la page d'accueil sans page dédiée.
 */
export default function Page() {
  if (!zone) notFound();

  const servicesPhares = zone.servicesPhares
    .map((slug) => getService(slug))
    .filter((service) => service !== undefined);

  return (
    <>
      <PageHeader
        title={`Entreprise de nettoyage à ${zone.name} (${site.address.postalCode})`}
        lede={zone.lede}
        breadcrumbs={fil}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/#contact" icon="arrowRight">
            Demander un devis
          </Button>
          <Button href={telHref} variant="secondary" icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
              Nos interventions à {zone.name}
            </h2>
            {zone.body.map((paragraphe) => (
              <p key={paragraphe.slice(0, 40)} className="text-muted leading-relaxed">
                {paragraphe}
              </p>
            ))}
          </div>

          <aside className="flex flex-col gap-6">
            {/*
              Cet emplacement portait une photo de Meaux. Faute de visuel réel,
              il accueille des repères chiffrés : ils informent davantage qu'une
              vue de ville générique, et n'ont rien à attendre d'un photographe.
            */}
            <dl className="bg-brand-soft border-brand/20 grid grid-cols-2 gap-5 rounded-2xl border p-6">
              {reperes.map((repere) => (
                <div key={repere.libelle} className="flex flex-col gap-1">
                  <dt className="sr-only">{repere.libelle}</dt>
                  <dd>
                    <span className="text-brand block text-xl leading-tight font-bold">
                      {repere.valeur}
                    </span>
                    <span className="text-muted mt-1 block text-xs leading-snug">
                      {repere.libelle}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-line bg-surface rounded-2xl border p-6">
              <h2 className="text-ink text-sm font-semibold">Communes desservies</h2>
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
                Cette liste n&apos;est pas limitative. Appelez-nous pour toute autre commune du Pays
                de {zone.name}.
              </p>
            </div>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-sm font-semibold">Prestations les plus demandées</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {servicesPhares.map((service) => (
                  <li
                    key={service.slug}
                    className="text-ink-soft flex items-center gap-2.5 text-sm"
                  >
                    <Icon name={service.icon} className="text-brand size-4" />
                    {service.shortName}
                  </li>
                ))}
              </ul>
              <Button href="/#services" variant="ghost" className="mt-4 -ml-3" icon="arrowRight">
                Voir toutes les prestations
              </Button>
            </div>
          </aside>
        </Container>
      </Section>

      <CtaDevis titre={`Un devis pour une intervention à ${zone.name} ?`} />

      <JsonLd data={breadcrumbJsonLd(fil)} />
    </>
  );
}
