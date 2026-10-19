/**
 * Comparatifs avant / après.
 *
 * Chaque entrée attend DEUX photos du MÊME lieu, prises sous le même angle :
 * c'est le cadrage identique qui rend la comparaison crédible. Une photo
 * « après » prise sous un autre angle ne prouve rien et se voit immédiatement.
 *
 * Tant que `avantSrc` et `apresSrc` sont vides, les emplacements affichent un
 * aplat de marque, la section reste en place, prête à recevoir les visuels.
 *
 * Les paires en place sont des visuels générés (docs/brief-photo.md) : la
 * section les présente comme des illustrations, jamais comme des chantiers de
 * l'entreprise. La paire « séjour après travaux » a été retirée le 19/10/2026 :
 * sa photo « après » montrait un carrelage posé sur une chape brute, un
 * résultat de travaux et non de nettoyage.
 */

export type Realisation = {
  id: string;
  /** Intitulé de l'intervention, affiché en légende. */
  titre: string;
  /** Description de la photo « avant » attendue. */
  avant: string;
  /** Description de la photo « après » attendue. */
  apres: string;
  avantSrc?: string;
  apresSrc?: string;
  /** Met la paire en avant, en grand format. Une seule réalisation à la fois. */
  principale?: boolean;
};

export const realisations: readonly Realisation[] = [
  {
    id: "cuisine",
    titre: "Cuisine",
    avant: "Crédence et hotte encrassées par la graisse de cuisson",
    apres: "Crédence et hotte dégraissées, inox remis à neuf",
    avantSrc: "/images/avant-apres-cuisine-avant.jpg",
    apresSrc: "/images/avant-apres-cuisine-apres.jpg",
    principale: true,
  },
  {
    id: "sol-carrele",
    titre: "Sol carrelé",
    avant: "Carrelage terne et joints noircis",
    apres: "Carrelage détaché, joints éclaircis",
    avantSrc: "/images/avant-apres-sol-avant.jpg",
    apresSrc: "/images/avant-apres-sol-apres.jpg",
  },
] as const;

/** Réalisation mise en avant, ou la première de la liste par défaut. */
export const realisationPrincipale =
  realisations.find((item) => item.principale) ?? realisations[0];

/** Réalisations affichées en vignettes, à côté de la principale. */
export const realisationsSecondaires = realisations.filter(
  (item) => item.id !== realisationPrincipale?.id,
);
