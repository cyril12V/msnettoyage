import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { Promesse } from "@/components/sections/Promesse";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { zones } from "@/data/zones";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
];

const reperes: readonly { valeur: string; libelle: string }[] = [
  { valeur: site.address.city, libelle: "Ville d'implantation" },
  { valeur: `${zones.length}`, libelle: "Zones couvertes en Île-de-France" },
  { valeur: `${services.length}`, libelle: "Prestations proposées" },
  { valeur: site.delaiReponse, libelle: "Délai de réponse à un devis" },
];

export const metadata: Metadata = buildMetadata({
  title: "À propos de MS Nettoyage",
  description: `Qui est ${site.name} : une entreprise de nettoyage basée à ${site.address.city} qui intervient en Île-de-France pour les particuliers et les professionnels. Méthode, engagements et zone d'intervention.`,
  path: "/a-propos",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Qui sommes-nous"
        title={`${site.name}, entreprise de nettoyage à ${site.address.city}`}
        lede={`${site.name} est une entreprise de nettoyage professionnel implantée à ${site.address.city} (${site.address.postalCode}) qui intervient dans toute l'Île-de-France, auprès des particuliers comme des professionnels.`}
        breadcrumbs={fil}
      />

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-ink text-2xl font-bold tracking-tight uppercase">Notre approche</h2>

            <p className="text-muted leading-relaxed">
              Le nettoyage professionnel ne se juge pas sur ce qui se voit au premier coup
              d&apos;œil, mais sur ce qui reste propre trois jours plus tard. C&apos;est ce qui
              distingue une prestation menée avec méthode d&apos;un passage rapide : l&apos;ordre
              des opérations, le produit adapté à chaque support et le temps réellement passé sur
              les zones qui comptent.
            </p>

            <p className="text-muted leading-relaxed">
              Chaque intervention part d&apos;un cahier des charges écrit. Il précise les zones
              traitées, les opérations réalisées, leur fréquence et le créneau d&apos;intervention.
              Ce document sert de référence commune : il évite les malentendus sur le périmètre et
              permet de contrôler objectivement le résultat.
            </p>

            <p className="text-muted leading-relaxed">
              Nous affectons les mêmes intervenants à un même site. Ils connaissent la configuration
              des lieux, les accès, les contraintes de sécurité et les points sensibles — ce qui
              réduit le temps d&apos;intervention et rend le résultat régulier d&apos;une fois sur
              l&apos;autre. Tous sont déclarés, et l&apos;entreprise est couverte par une assurance
              responsabilité civile professionnelle.
            </p>

            <p className="text-muted leading-relaxed">
              Nous préférons annoncer un délai tenable plutôt qu&apos;un délai flatteur. Quand une
              demande sort de notre capacité ou de notre zone, nous le disons avant le devis, pas
              après la signature.
            </p>
          </div>

          <aside className="flex flex-col gap-6">
            <MediaSlot
              alt={`Équipe ${site.name} en intervention`}
              className="aspect-4/3 rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />

            <dl className="border-line bg-surface grid grid-cols-2 gap-5 rounded-2xl border p-6">
              {reperes.map((repere) => (
                <div key={repere.libelle} className="flex flex-col gap-1">
                  <dt className="sr-only">{repere.libelle}</dt>
                  <dd>
                    <span className="text-brand block text-xl font-bold">{repere.valeur}</span>
                    <span className="text-muted mt-1 block text-xs leading-snug">
                      {repere.libelle}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                Nos engagements
              </h2>
              <ul className="text-muted mt-4 flex flex-col gap-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                  Personnel déclaré et assuré
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                  Matériel et produits professionnels fournis
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                  Devis gratuit, détaillé et sans engagement
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                  Réintervention gratuite sous 48 h si besoin
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      <Promesse />

      <CtaDevis titre="Travaillons ensemble" />

      <JsonLd data={breadcrumbJsonLd(fil)} />
    </>
  );
}
