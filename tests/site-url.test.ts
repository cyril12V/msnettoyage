import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Normalisation de l'URL du site.
 *
 * Ce module lit `NEXT_PUBLIC_SITE_URL` au chargement : chaque cas doit donc
 * réimporter `site.ts` après avoir posé la variable, d'où les `resetModules`.
 *
 * Ces tests existent à cause d'un incident réel : une valeur transmise par un
 * pipe PowerShell a emporté un caractère invisible, `new URL` a levé, et le
 * build Vercel entier a échoué sur « Invalid URL ».
 */

const URL_PAR_DEFAUT = "https://www.msnettoyage.fr";

async function chargerSiteUrl(valeur: string | undefined): Promise<string> {
  vi.resetModules();

  if (valeur === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = valeur;
  }

  const { siteUrl } = await import("@/lib/site");
  return siteUrl;
}

describe("normalisation de l'URL du site", () => {
  const valeurInitiale = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    if (valeurInitiale === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = valeurInitiale;
    }
    vi.resetModules();
  });

  it("retient une URL propre telle quelle", async () => {
    expect(await chargerSiteUrl("https://msnettoyage.vercel.app")).toBe(
      "https://msnettoyage.vercel.app",
    );
  });

  it("retire le slash final", async () => {
    expect(await chargerSiteUrl("https://exemple.fr/")).toBe("https://exemple.fr");
    expect(await chargerSiteUrl("https://exemple.fr///")).toBe("https://exemple.fr");
  });

  it.each([
    ["retour chariot", "https://exemple.fr\r"],
    ["saut de ligne", "https://exemple.fr\n"],
    ["retour chariot et saut de ligne", "https://exemple.fr\r\n"],
    ["espaces autour", "  https://exemple.fr  "],
    ["tabulation finale", "https://exemple.fr\t"],
  ])("nettoie une valeur polluée par un %s", async (_libelle, valeur) => {
    expect(await chargerSiteUrl(valeur)).toBe("https://exemple.fr");
  });

  it.each([
    ["valeur absente", undefined],
    ["chaîne vide", ""],
    ["espaces seuls", "   "],
    ["URL sans protocole", "msnettoyage.fr"],
    ["protocole non web", "ftp://exemple.fr"],
    ["texte quelconque", "à compléter"],
  ])("retombe sur l'URL par défaut pour %s", async (_libelle, valeur) => {
    expect(await chargerSiteUrl(valeur)).toBe(URL_PAR_DEFAUT);
  });

  it("produit toujours une URL que `new URL` accepte", async () => {
    // C'est la garantie qui compte : `metadataBase` construit une URL à partir
    // de cette valeur, et une exception y fait échouer le build complet.
    for (const valeur of ["", "   ", "pas une url", "https://ok.fr/", undefined]) {
      const resultat = await chargerSiteUrl(valeur);
      expect(() => new URL(resultat)).not.toThrow();
    }
  });
});
