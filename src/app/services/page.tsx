import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { breadcrumbJsonLd, catalogueServicesJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "Nos services", href: "/services" },
];

export const metadata: Metadata = buildMetadata({
  title: "Nos prestations de nettoyage",
  description: `Les ${services.length} prestations de nettoyage proposées par ${site.name} en Île-de-France : entretien régulier, grand ménage, remise en état après travaux, ménage Airbnb, bureaux, industriel, fin de chantier.`,
  path: "/services",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Notre expertise"
        title="Nos prestations de nettoyage"
        lede={`${site.name} propose ${services.length} prestations de nettoyage en Île-de-France, du contrat d'entretien récurrent à l'intervention ponctuelle après travaux. Chaque prestation fait l'objet d'un devis détaillé, gratuit et sans engagement, transmis sous ${site.delaiReponse}.`}
        breadcrumbs={fil}
      >
        <Button href="/devis" icon="arrowRight">
          Demander un devis
        </Button>
      </PageHeader>

      <ServicesGrid avecEntete={false} avecLienGlobal={false} tone="white" />

      <CtaDevis titre="Une prestation sur mesure ?" />

      <JsonLd data={[catalogueServicesJsonLd(services), breadcrumbJsonLd(fil)]} />
    </>
  );
}
