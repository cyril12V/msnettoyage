/**
 * Avis clients affichés sur le site.
 *
 * Ce tableau est VOLONTAIREMENT VIDE au lancement. Publier des témoignages
 * inventés constitue une pratique commerciale trompeuse (art. L121-2 du code de
 * la consommation) et expose l'entreprise à une sanction. Les sections
 * concernées se masquent automatiquement tant qu'aucun avis réel n'est saisi.
 *
 * Pour activer la section : ajouter ici les avis réellement reçus, en reprenant
 * mot pour mot le texte laissé par le client et en limitant l'identification au
 * prénom et à l'initiale du nom.
 */

export type Temoignage = {
  /** Texte de l'avis, repris sans reformulation. */
  citation: string;
  /** Prénom et initiale — jamais le nom complet sans accord écrit. */
  auteur: string;
  /** Qualité de l'auteur et commune, par exemple « Propriétaire — Meaux ». */
  contexte: string;
  /** Note sur 5, si l'avis provient d'une plateforme qui en attribue une. */
  note?: 1 | 2 | 3 | 4 | 5;
  /** Plateforme d'origine, par exemple « Google ». Renseigner si applicable. */
  source?: string;
};

export const temoignages: readonly Temoignage[] = [] as const;

/** Indique si la section « avis clients » doit être rendue. */
export const hasTemoignages = temoignages.length > 0;
