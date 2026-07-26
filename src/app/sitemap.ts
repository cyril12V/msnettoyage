import type { MetadataRoute } from "next";
import { casClients } from "@/data/cas-clients";
import { landings } from "@/data/landings";
import { realisations } from "@/data/realisations";
import { univers } from "@/data/univers";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * Il ne liste que des URLs canoniques et indexables : ni les ancres, qui ne
 * sont pas des adresses distinctes, ni les redirections. Un sitemap qui
 * contient des 301 ou des 404 perd la confiance que Google lui accorde.
 *
 * Les images de la page d'accueil y sont déclarées : c'est ce qui les rend
 * éligibles à Google Images, où « avant après nettoyage » ramène un trafic que
 * la recherche texte ne capte pas.
 */

/** Visuels de la page d'accueil, dédoublonnés. */
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

    // Les pages d'atterrissage portent le référencement local : priorité haute,
    // juste sous la page d'accueil.
    ...landings.map((landing) => ({
      url: absoluteUrl(`/${landing.slug}`),
      lastModified: derniereModification,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(landing.image ? { images: [absoluteUrl(landing.image)] } : {}),
    })),

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
