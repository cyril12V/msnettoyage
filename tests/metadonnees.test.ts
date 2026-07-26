import { describe, expect, it } from "vitest";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * Garde-fous sur les métadonnées produites pour chaque page.
 *
 * Ces oublis sont invisibles : la page s'affiche, le build passe, et le défaut
 * ne se voit que le jour où quelqu'un partage le lien ou consulte le rapport
 * d'indexation. La carte Open Graph manquait ainsi sur les huit pages autres que
 * l'accueil, parce que la convention de fichier `opengraph-image.tsx` ne
 * s'applique qu'au segment qui contient le fichier.
 */

describe("buildMetadata", () => {
  const meta = buildMetadata({
    title: "Nettoyage de maison à Meaux",
    description: "Description de la page.",
    path: "/nettoyage-maison-meaux",
  });

  it("publie une URL canonique absolue", () => {
    expect(meta.alternates?.canonical).toBe(absoluteUrl("/nettoyage-maison-meaux"));
  });

  it("publie une carte Open Graph, sur toute page sans exception", () => {
    const images = meta.openGraph?.images;
    expect(Array.isArray(images) && images.length > 0, "og:image absent").toBe(true);

    const premiere = Array.isArray(images) ? images[0] : undefined;
    const url = typeof premiere === "object" && premiere && "url" in premiere ? premiere.url : "";
    expect(String(url).startsWith(siteUrl), "og:image doit être absolue").toBe(true);
  });

  it("accompagne la carte Twitter d'une image", () => {
    // `summary_large_image` sans image produit un partage vide sur X : soit les
    // deux, soit aucun des deux.
    //
    // `Twitter` est une union de types selon la valeur de `card` : on restreint
    // par `in` plutôt qu'en forçant le type, ce qui ferait passer le test même
    // si la propriété disparaissait.
    const twitter = meta.twitter;
    expect(twitter && "card" in twitter && twitter.card).toBe("summary_large_image");
    const images = twitter?.images;
    expect(Array.isArray(images) && images.length > 0, "twitter:image absent").toBe(true);
  });

  it("laisse l'indexation ouverte par défaut, et la ferme sur demande", () => {
    expect(meta.robots).toBeUndefined();
    expect(
      buildMetadata({ title: "t", description: "d", path: "/x", noindex: true }).robots,
    ).toEqual({ index: false, follow: true });
  });

  it("reprend le titre et la description dans les trois jeux de balises", () => {
    expect(meta.openGraph?.title).toBe("Nettoyage de maison à Meaux");
    expect(meta.twitter?.title).toBe("Nettoyage de maison à Meaux");
    expect(meta.openGraph?.description).toBe("Description de la page.");
  });
});
