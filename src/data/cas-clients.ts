/**
 * Cas clients — exemples de missions réalisées.
 *
 * ⚠️ CONTENU DE DÉMONSTRATION, repris de la maquette. Les intitulés décrivent
 * des missions plausibles, mais les chiffres affichés n'ont pas été mesurés.
 *
 * Avant la mise en ligne, chaque cas doit être remplacé par une mission
 * réellement effectuée, avec des chiffres vérifiables. Annoncer « 100 % de
 * satisfaction » sans base mesurable est une allégation commerciale que
 * l'entreprise doit pouvoir justifier (art. L121-2 du code de la consommation).
 *
 * Voir la checklist de DEPLOIEMENT.md.
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
  /** Prestation concernée, pour le lien contextuel. */
  service: string;
};

export const casClients: readonly CasClient[] = [
  {
    id: "rotation-airbnb",
    titre: "Rotation Airbnb express",
    description: "Nettoyage complet et préparation d'un T2 entre deux locations.",
    chiffres: [
      { valeur: "4 h", libelle: "Délai moyen" },
      { valeur: "5★", libelle: "Avis voyageurs" },
    ],
    photo: "Chambre d'un logement Airbnb prête pour l'arrivée",
    service: "menage-airbnb",
  },
  {
    id: "remise-en-etat",
    titre: "Remise en état après travaux",
    description: "Nettoyage en profondeur après rénovation d'un appartement de 120 m².",
    chiffres: [
      { valeur: "1 jour", libelle: "Intervention" },
      { valeur: "3 passes", libelle: "Lavage des sols" },
    ],
    photo: "Appartement rénové, livré propre",
    service: "remise-en-etat-apres-travaux",
  },
  {
    id: "entretien-bureaux",
    titre: "Entretien de bureaux",
    description: "Entretien régulier de 200 m² de bureaux, trois fois par semaine.",
    chiffres: [
      { valeur: "3×/sem.", libelle: "Fréquence" },
      { valeur: "Après 19 h", libelle: "Créneau d'intervention" },
    ],
    photo: "Open space propre en fin de journée",
    service: "bureaux-et-commerces",
  },
] as const;
