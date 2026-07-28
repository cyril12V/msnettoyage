import type { Metadata } from "next";
import { AvantApres } from "@/components/sections/AvantApres";
import { CasClients } from "@/components/sections/CasClients";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { Expertise } from "@/components/sections/Expertise";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { PrestationsLocales } from "@/components/sections/PrestationsLocales";
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
 * Titre de la page d'accueil, 57 caractères.
 *
 * Il vise « société de nettoyage Paris » et « société de nettoyage
 * Île-de-France », les deux requêtes les plus larges que le client veut capter,
 * et couvre au passage « prestation de nettoyage ». La page d'accueil est
 * toujours la page la mieux liée d'un site, donc la plus forte : c'est elle qui
 * doit porter la requête la plus large.
 *
 * Le titre visait auparavant Meaux uniquement. Cette requête n'est pas
 * abandonnée : elle est reprise par `/nettoyage-meaux`, qui la traite en
 * profondeur. Les requêtes de ville et les requêtes de prestation vivent
 * chacune sur leur page, aucune ne se chevauche.
 *
 * Point de vigilance : `/nettoyage-paris` vise « entreprise de nettoyage à
 * Paris », un intitulé voisin. Si Search Console montre les deux pages qui
 * alternent sur une même requête, c'est ce titre-ci qu'il faut resserrer sur
 * l'Île-de-France seule.
 *
 * Sous 60 caractères, le titre s'affiche entier dans les résultats de recherche.
 */
const TITRE = `Société de nettoyage Paris & Île-de-France | ${site.name}`;

export const metadata: Metadata = {
  ...buildMetadata({
    title: TITRE,
    description: `${site.name}, société de nettoyage à Paris et en Île-de-France : nettoyage de maison et de bureaux, ménage particulier, fin de chantier, déménagement et Airbnb. Devis sous ${site.delaiReponse}.`,
    path: "/",
  }),
  // Le titre porte déjà le nom de la marque : sans `absolute`, le gabarit du
  // layout ajouterait « | MS Nettoyages » une seconde fois.
  title: { absolute: TITRE },
};

/**
 * Page d'accueil.
 *
 * Elle sert deux rôles : vitrine complète de l'entreprise, et point de départ
 * vers les six pages d'atterrissage locales. La section `PrestationsLocales`
 * assure ce maillage, sans lequel ces pages resteraient orphelines.
 *
 * La FAQ est affichée en entier ici : son balisage `FAQPage` doit correspondre
 * exactement au contenu visible.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <PrestationsLocales />
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
