/**
 * Avis clients affichés sur le site.
 *
 * ⚠️ CONTENU DE DÉMONSTRATION, repris de la maquette et adapté à l'Île-de-France.
 * Ces trois avis ne proviennent pas de vrais clients.
 *
 * Ils doivent être remplacés par des avis réellement reçus AVANT la mise en
 * ligne : publier de faux témoignages est une pratique commerciale trompeuse
 * (art. L121-2 du code de la consommation), sanctionnée et immédiatement
 * décrédibilisante si un visiteur s'en aperçoit.
 *
 * Pour saisir un vrai avis : reprendre le texte mot pour mot, se limiter au
 * prénom et à l'initiale du nom, indiquer la commune. Passer `demonstration` à
 * `false` une fois la section alimentée par de vrais avis, le bandeau
 * d'avertissement affiché en développement disparaît alors.
 */

export type Temoignage = {
  /** Texte de l'avis, repris sans reformulation. */
  citation: string;
  /** Prénom et initiale, jamais le nom complet sans accord écrit. */
  auteur: string;
  /** Qualité de l'auteur et commune, par exemple « Propriétaire, Meaux ». */
  contexte: string;
  /** Note sur 5, si l'avis provient d'une plateforme qui en attribue une. */
  note?: 1 | 2 | 3 | 4 | 5;
  /** Plateforme d'origine, par exemple « Google ». Renseigner si applicable. */
  source?: string;
};

/** Passer à `false` dès que les avis ci-dessous sont de vrais avis clients. */
export const temoignagesSontDeDemonstration = true;

// Les trois avis de la maquette (Laura M., Julien D., Sophie T., notés 5 sur 5)
// ont été retirés le 19/10/2026 : ils ne provenaient pas de vrais clients et
// étaient pourtant publiés. Tableau vide : la section n'est pas rendue. Pour
// la rétablir, saisir ici de vrais avis selon les règles ci-dessus.
export const temoignages: readonly Temoignage[] = [];

/** Indique si la section « avis clients » doit être rendue. */
export const hasTemoignages = temoignages.length > 0;
