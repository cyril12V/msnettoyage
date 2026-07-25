import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/services";
import { zoneSlugs } from "@/data/zones";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * Il ne contient que des URLs canoniques et indexables : ni `/contact`
 * (redirection permanente vers `/devis`), ni les pages d'erreur. Un sitemap qui
 * liste des redirections ou des 404 dégrade la confiance accordée au fichier.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const derniereModification = new Date();

  const pagesFixes: {
    chemin: string;
    priorite: number;
    frequence: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { chemin: "/", priorite: 1, frequence: "monthly" },
    { chemin: "/services", priorite: 0.9, frequence: "monthly" },
    { chemin: "/zones-d-intervention", priorite: 0.8, frequence: "monthly" },
    { chemin: "/devis", priorite: 0.9, frequence: "yearly" },
    { chemin: "/a-propos", priorite: 0.6, frequence: "yearly" },
    { chemin: "/faq", priorite: 0.7, frequence: "monthly" },
    { chemin: "/mentions-legales", priorite: 0.2, frequence: "yearly" },
    { chemin: "/politique-de-confidentialite", priorite: 0.2, frequence: "yearly" },
  ];

  return [
    ...pagesFixes.map(({ chemin, priorite, frequence }) => ({
      url: absoluteUrl(chemin),
      lastModified: derniereModification,
      changeFrequency: frequence,
      priority: priorite,
    })),
    ...serviceSlugs.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: derniereModification,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...zoneSlugs.map((slug) => ({
      url: absoluteUrl(`/zones-d-intervention/${slug}`),
      lastModified: derniereModification,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
