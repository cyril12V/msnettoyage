/**
 * Cas clients, exemples de missions réalisées.
 *
 * ATTENTION : contenu de démonstration, repris de la maquette. Les intitulés
 * décrivent des missions plausibles, mais les chiffres affichés n'ont pas été
 * mesurés.
 *
 * Avant la mise en ligne, chaque cas doit être remplacé par une mission
 * réellement effectuée, avec des chiffres vérifiables. Annoncer « 100 % de
 * satisfaction » sans base mesurable est une allégation commerciale que
 * l'entreprise doit pouvoir justifier (art. L121-2 du code de la consommation).
 *
 * Voir la checklist de docs/deploiement.md.
 */

export type CasClient = {
  id: string;
  titre: string;
  description: string;
  /** Deux à trois chiffres clés, courts et concrets. */
  chiffres: readonly { valeur: string; libelle: string }[];
  /** Description de la photo attendue. */
  photo: string;
  src?: string;
};

// Les trois cas de la maquette (rotation Airbnb en 2 h et « 5 étoiles avis
// voyageurs », 120 m² en une journée, 200 m² de bureaux trois fois par semaine)
// ont été retirés le 19/10/2026 : aucun ne décrivait une mission réelle et leurs
// chiffres n'avaient pas été mesurés. Tableau vide : la section n'est pas
// rendue. La rétablir avec des missions réellement effectuées.
export const casClients: readonly CasClient[] = [];
