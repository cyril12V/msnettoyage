import type { Metadata } from "next";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Promesse } from "@/components/sections/Promesse";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Temoignages } from "@/components/sections/Temoignages";
import { ZonesSection } from "@/components/sections/ZonesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqAccueil } from "@/data/faq";
import { services } from "@/data/services";
import { catalogueServicesJsonLd, faqJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — Entreprise de nettoyage en Île-de-France et à ${site.address.city}`,
    description: `Entreprise de nettoyage à ${site.address.city} et en Île-de-France : entretien de locaux, grand ménage, remise en état après travaux, ménage Airbnb, bureaux et commerces. Devis gratuit sous ${site.delaiReponse}.`,
    path: "/",
  }),
  // La page d'accueil porte déjà le titre par défaut du layout : on désactive
  // le gabarit pour éviter « MS Nettoyage | MS Nettoyage » en résultat de recherche.
  title: {
    absolute: `${site.name} — Entreprise de nettoyage en Île-de-France et à ${site.address.city}`,
  },
};

export default function Page() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Promesse />
      <Process />
      <Temoignages />
      <ZonesSection />
      <FaqSection items={faqAccueil} />
      <CtaDevis />

      <JsonLd data={[catalogueServicesJsonLd(services), faqJsonLd(faqAccueil)]} />
    </>
  );
}
