import type { Metadata } from "next";
import { AvantApres } from "@/components/sections/AvantApres";
import { CasClients } from "@/components/sections/CasClients";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { Expertise } from "@/components/sections/Expertise";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Promesse } from "@/components/sections/Promesse";
import { Temoignages } from "@/components/sections/Temoignages";
import { Univers } from "@/components/sections/Univers";
import { ZonesSection } from "@/components/sections/ZonesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/data/faq";
import { services } from "@/data/services";
import { catalogueServicesJsonLd, faqJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name}, entreprise de nettoyage en Île-de-France et à ${site.address.city}`,
    description: `Entreprise de nettoyage à ${site.address.city} et en Île-de-France : entretien de locaux, grand ménage, remise en état après travaux, ménage Airbnb, bureaux et commerces. Devis gratuit sous ${site.delaiReponse}.`,
    path: "/",
  }),
  // La page d'accueil porte déjà le titre par défaut du layout : on désactive
  // le gabarit pour éviter « MS Nettoyage | MS Nettoyage » en résultat de recherche.
  title: {
    absolute: `${site.name}, entreprise de nettoyage en Île-de-France et à ${site.address.city}`,
  },
};

/**
 * Page unique du site.
 *
 * Toutes les sections tiennent sur cette page et sont atteintes par ancre.
 * Seule Meaux, ville d'implantation, dispose d'une page autonome, avec les
 * pages légales.
 *
 * La FAQ est affichée en entier ici : elle n'a plus de page dédiée, et son
 * balisage `FAQPage` doit correspondre exactement au contenu visible.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Expertise />
      <Univers />
      <AvantApres />
      <CasClients />
      <Promesse />
      <Temoignages />
      <Process />
      <ZonesSection />
      <FaqSection items={faq} />
      <CtaDevis avecVisuel />

      <JsonLd data={[catalogueServicesJsonLd(services), faqJsonLd(faq)]} />
    </>
  );
}
