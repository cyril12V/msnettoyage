import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrestationPage } from "@/components/pages/PrestationPage";
import { VillePage } from "@/components/pages/VillePage";
import { getLanding, landingSlugs } from "@/data/landings";
import { getVille, villeSlugs } from "@/data/villes";
import { buildMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ slug: string }> };

/**
 * Segment unique de la racine du site.
 *
 * Deux familles de pages y vivent, chacune avec son gabarit :
 *
 *  - les prestations, `/nettoyage-bureau`, qui répondent à « quoi » ;
 *  - les villes, `/nettoyage-creteil`, qui répondent à « où ».
 *
 * Elles partagent le même segment parce que Next.js n'autorise qu'un seul
 * segment dynamique par niveau, et parce que l'URL doit rester courte et porter
 * le mot-clé : `/nettoyage-paris` et non `/villes/paris`.
 *
 * Next.js résout d'abord les segments statiques : `/mentions-legales` et
 * `/politique-de-confidentialite` continuent de pointer sur leurs pages.
 */
export function generateStaticParams() {
  return [...landingSlugs, ...villeSlugs].map((slug) => ({ slug }));
}

/** Toute URL hors de cette liste renvoie un 404, jamais une page vide. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const cible = getLanding(slug) ?? getVille(slug);

  if (!cible) return {};

  return {
    ...buildMetadata({
      title: cible.metaTitle,
      description: cible.metaDescription,
      path: `/${slug}`,
    }),
    // Les titres portent déjà le nom de la marque : sans `absolute`, le gabarit
    // du layout l'ajouterait une seconde fois.
    title: { absolute: cible.metaTitle },
  };
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;

  const landing = getLanding(slug);
  if (landing) return <PrestationPage landing={landing} />;

  const ville = getVille(slug);
  if (ville) return <VillePage ville={ville} />;

  notFound();
}
