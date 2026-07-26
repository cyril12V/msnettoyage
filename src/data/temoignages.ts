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
 * `false` une fois la section alimentée par de vrais avis — le bandeau
 * d'avertissement affiché en développement disparaît alors.
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

/** Passer à `false` dès que les avis ci-dessous sont de vrais avis clients. */
export const temoignagesSontDeDemonstration = true;

export const temoignages: readonly Temoignage[] = [
  {
    citation:
      "Service irréprochable pour nos locations Airbnb. L'équipe est rapide, fiable et toujours aux petits soins.",
    auteur: "Laura M.",
    contexte: "Propriétaire — Paris 11ᵉ",
    note: 5,
  },
  {
    citation:
      "Nos bureaux sont toujours impeccables. Réactivité et professionnalisme au rendez-vous.",
    auteur: "Julien D.",
    contexte: "Responsable administratif — Meaux",
    note: 5,
  },
  {
    citation:
      "Après notre chantier, l'appartement était comme neuf. Travail minutieux et très sérieux.",
    auteur: "Sophie T.",
    contexte: "Architecte d'intérieur — Seine-et-Marne",
    note: 5,
  },
] as const;

/** Indique si la section « avis clients » doit être rendue. */
export const hasTemoignages = temoignages.length > 0;
