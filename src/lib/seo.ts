import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

type MetadataOptions = {
  title: string;
  description: string;
  /** Chemin interne de la page, par exemple `/services/entretien-regulier`. */
  path: string;
  /** Empêche l'indexation, réservé aux pages sans valeur pour la recherche. */
  noindex?: boolean;
};

/**
 * Carte Open Graph du site, générée par `app/opengraph-image.tsx`.
 *
 * Elle est déclarée explicitement plutôt que laissée à la convention de
 * fichier : celle-ci ne s'applique qu'au segment qui contient le fichier, donc
 * à la seule page d'accueil. Les pages d'atterrissage et les pages légales
 * partaient sans `og:image`, avec une carte Twitter `summary_large_image`
 * annoncée mais vide, ce qui produit un partage sans visuel sur WhatsApp,
 * Facebook et LinkedIn.
 */
const carteOpenGraph = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.tagline}`,
};

/**
 * Construit les métadonnées d'une page.
 *
 * Centraliser la construction garantit qu'aucune page ne parte en production
 * sans URL canonique ni carte Open Graph, les deux oublis les plus coûteux en
 * référencement.
 */
export function buildMetadata({ title, description, path, noindex }: MetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      images: [carteOpenGraph],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [carteOpenGraph.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
