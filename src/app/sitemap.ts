import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * Le site tient sur une seule page : le sitemap ne liste donc que les quatre
 * adresses réellement indexables. Les ancres (`/#services`, `/#contact`) ne
 * sont pas des URLs distinctes et n'y figurent pas, Google les ignorerait.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const derniereModification = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: derniereModification,
      changeFrequency: "monthly",
      priority: 1,
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
