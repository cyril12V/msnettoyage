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

/**
 * Titre de la page d'accueil, 54 caractères.
 *
 * Il vise « entreprise de nettoyage Île-de-France » et laisse délibérément la
 * requête « nettoyage Meaux » à la page `/meaux`. Deux pages qui visent le même
 * mot-clé se cannibalisent : Google en choisit une, arbitrairement, et les deux
 * perdent en position.
 *
 * Sous 60 caractères, il s'affiche entier dans les résultats de recherche.
 */
const TITRE = `Entreprise de nettoyage en Île-de-France | ${site.name}`;

export const metadata: Metadata = {
  ...buildMetadata({
    title: TITRE,
    description: `Entreprise de nettoyage basée à ${site.address.city}, intervention dans toute l'Île-de-France : entretien de locaux, grand ménage, remise en état après travaux, ménage Airbnb, bureaux et commerces. Devis gratuit sous ${site.delaiReponse}.`,
    path: "/",
  }),
  // Le titre porte déjà le nom de la marque : sans `absolute`, le gabarit du
  // layout ajouterait « | MS Nettoyage » une seconde fois.
  title: { absolute: TITRE },
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
