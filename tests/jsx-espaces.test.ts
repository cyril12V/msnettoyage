import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Espace perdu entre une variable JSX et une apostrophe.
 *
 * Le compilateur de Next.js 16 supprime l'espace de tête d'un texte JSX qui
 * contient l'entité `&apos;`. Écrit `{site.name} s&apos;engage`, le texte
 * s'affiche « MS Nettoyagess'engage ». Le build passe, le lint passe, et le
 * défaut n'apparaît que dans le HTML servi : il est resté en production deux
 * mois sur la première phrase de la page d'accueil avant d'être repéré.
 *
 * Corriger à la main ne suffit pas : Prettier réécrit `{" "}` en espace simple
 * dès qu'il n'est pas en fin de ligne, ce qui réintroduit le défaut. La forme
 * sûre est un littéral de gabarit, `{`${site.name} s'engage`}`, qui ne
 * contient aucune entité.
 */

/** Tous les fichiers TSX de `src`, récursivement. */
function fichiersTsx(dossier: string): string[] {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) return fichiersTsx(chemin);
    return entree.name.endsWith(".tsx") ? [chemin] : [];
  });
}

/**
 * Texte JSX commençant par un espace après une expression `{...}` et contenant
 * `&apos;` avant la balise ou l'expression suivante.
 */
const MOTIF = /\}( [^<{}]*?&apos;)/g;

describe("espaces des textes JSX", () => {
  it("ne fait jamais suivre une expression d'un texte à apostrophe échappée", () => {
    const fautes = fichiersTsx(join(process.cwd(), "src")).flatMap((fichier) => {
      const contenu = readFileSync(fichier, "utf8");

      return [...contenu.matchAll(MOTIF)].map((correspondance) => {
        const ligne = contenu.slice(0, correspondance.index).split("\n").length;
        const extrait = correspondance[1]!.replace(/\s+/g, " ").slice(0, 50);
        return `${fichier.replace(process.cwd(), "")}:${ligne} «${extrait}»`;
      });
    });

    expect(fautes, fautes.join("\n")).toEqual([]);
  });
});
