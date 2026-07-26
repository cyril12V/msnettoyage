import type { MetadataRoute } from "next";
import { casClients } from "@/data/cas-clients";
import { realisations } from "@/data/realisations";
import { univers } from "@/data/univers";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * Le site tient sur une seule page : le sitemap ne liste donc que les quatre
 * adresses réellement indexables. Les ancres (`/#services`, `/#contact`) ne sont
 * pas des URLs distinctes et n'y figurent pas, Google les ignorerait.
 *
 * Les images de la page d'accueil y sont déclarées : c'est ce qui les rend
 * éligibles à Google Images, où la recherche « avant après nettoyage » ramène
 * un trafic que la recherche texte ne capte pas.
 */

/** Visuels de la page d'accueil, dans l'ordre d'apparition. */
function imagesAccueil(): string[] {
  const fixes = [
    "/images/hero-accueil.jpg",
    "/images/expertise-vitre.jpg",
    "/images/expertise-lit-prepare.jpg",
    "/images/materiel.jpg",
    "/images/vehicule.jpg",
  ];

  const depuisDonnees = [
    ...univers.map((item) => item.src),
    ...realisations.flatMap((item) => [item.avantSrc, item.apresSrc]),
    ...casClients.map((cas) => cas.src),
  ].filter((src): src is string => Boolean(src));

  // `Set` écarte les doublons, un visuel pouvant servir à deux endroits.
  return [...new Set([...fixes, ...depuisDonnees])].map((chemin) => absoluteUrl(chemin));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const derniereModification = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: derniereModification,
      changeFrequency: "monthly",
      priority: 1,
      images: imagesAccueil(),
    },
    {
      url: absoluteUrl("/meaux"),
      lastModified: derniereModification,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/mentions-legales"),
      lastModified: derniereModification,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/politique-de-confidentialite"),
      lastModified: derniereModification,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
