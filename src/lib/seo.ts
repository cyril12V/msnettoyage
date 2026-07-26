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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
