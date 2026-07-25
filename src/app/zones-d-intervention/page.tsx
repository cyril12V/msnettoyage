import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { zones } from "@/data/zones";
import { breadcrumbJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "Zones d'intervention", href: "/zones-d-intervention" },
];

export const metadata: Metadata = buildMetadata({
  title: "Zones d'intervention en Île-de-France",
  description: `${site.name} intervient à ${site.address.city} et dans les huit départements d'Île-de-France : Seine-et-Marne, Paris, Seine-Saint-Denis, Val-de-Marne, Hauts-de-Seine, Val-d'Oise, Essonne et Yvelines.`,
  path: "/zones-d-intervention",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Où nous intervenons"
        title="Zones d'intervention en Île-de-France"
        lede={`${site.name} est basée à ${site.address.city} (${site.address.postalCode}) et intervient dans les huit départements franciliens. Les délais les plus courts sont sur ${site.address.city} et le nord de la Seine-et-Marne, où aucun frais de déplacement n'est facturé.`}
        breadcrumbs={fil}
      />

      <Section tone="white">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <li key={zone.slug}>
                <Link
                  href={`/zones-d-intervention/${zone.slug}`}
                  className="border-line hover:border-brand/40 hover:shadow-card flex h-full flex-col rounded-xl border bg-white p-6 transition duration-200 hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon name="pin" className="text-brand size-5" />
                    <span className="text-ink text-base font-semibold">{zone.name}</span>
                    <span className="bg-surface text-muted-light rounded px-1.5 py-0.5 text-[0.65rem] font-bold">
                      {zone.departement}
                    </span>
                    {zone.base ? (
                      <span className="bg-brand-soft text-brand rounded px-1.5 py-0.5 text-[0.65rem] font-bold">
                        Notre base
                      </span>
                    ) : null}
                  </span>
                  <span className="text-muted mt-3 text-sm leading-relaxed">{zone.lede}</span>
                  <span className="text-brand mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.06em] uppercase">
                    Voir la zone
                    <Icon name="arrowRight" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis
        titre="Votre commune n'est pas listée ?"
        sousTitre="Appelez-nous : nous vous dirons immédiatement si nous pouvons intervenir chez vous et sous quel délai."
      />

      <JsonLd data={breadcrumbJsonLd(fil)} />
    </>
  );
}
