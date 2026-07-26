import type { IconName } from "@/components/ui/Icon";

/**
 * Univers d'intervention — les types de lieux dans lesquels nous travaillons.
 *
 * À ne pas confondre avec les prestations (`services.ts`), qui décrivent ce que
 * nous faisons : ici, on répond à « est-ce que vous intervenez chez moi ? ».
 * Chaque univers renvoie vers la prestation la plus adaptée.
 */

export type Univers = {
  id: string;
  titre: string;
  accroche: string;
  icon: IconName;
  /** Slug du service vers lequel pointe la carte. */
  service: string;
  /** Description de la photo attendue, en attendant le visuel définitif. */
  photo: string;
  /** Chemin de la photo dans `public/images/`, une fois fournie. */
  src?: string;
};

export const univers: readonly Univers[] = [
  {
    id: "appartement",
    titre: "Appartement",
    accroche: "Du studio au loft, propreté impeccable.",
    icon: "home",
    service: "nettoyage-en-profondeur",
    photo: "Séjour d'appartement lumineux et rangé",
  },
  {
    id: "bureau",
    titre: "Bureau",
    accroche: "Espaces de travail sains, équipes performantes.",
    icon: "briefcase",
    service: "bureaux-et-commerces",
    photo: "Open space moderne, postes de travail dégagés",
  },
  {
    id: "commerce",
    titre: "Commerce",
    accroche: "Des lieux accueillants qui inspirent confiance.",
    icon: "store",
    service: "bureaux-et-commerces",
    photo: "Boutique avec vitrine impeccable",
  },
  {
    id: "airbnb",
    titre: "Airbnb",
    accroche: "Rotation rapide entre deux séjours.",
    icon: "bed",
    service: "menage-airbnb",
    photo: "Chambre préparée pour l'arrivée d'un voyageur",
  },
  {
    id: "local-industriel",
    titre: "Local industriel",
    accroche: "Hygiène et sécurité au service de vos activités.",
    icon: "factory",
    service: "nettoyage-industriel",
    photo: "Entrepôt ou atelier, sol dégagé et propre",
  },
  {
    id: "fin-de-chantier",
    titre: "Fin de chantier",
    accroche: "Livraison propre, prête à l'emploi.",
    icon: "hardhat",
    service: "nettoyage-fin-de-chantier",
    photo: "Pièce fraîchement rénovée, débarrassée des résidus",
  },
] as const;
