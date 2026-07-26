import type { IconName } from "@/components/ui/Icon";

/**
 * Univers d'intervention, c'est à dire les types de lieux dans lesquels nous
 * travaillons.
 *
 * À ne pas confondre avec les prestations (`services.ts`), qui décrivent ce que
 * nous faisons : ici, on répond à « est-ce que vous intervenez chez moi ? ».
 */

export type Univers = {
  id: string;
  titre: string;
  accroche: string;
  icon: IconName;
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
    photo: "Séjour d'appartement lumineux et rangé",
    src: "/images/univers-appartement.jpg",
  },
  {
    id: "bureau",
    titre: "Bureau",
    accroche: "Espaces de travail sains, équipes performantes.",
    icon: "briefcase",
    photo: "Open space aux postes de travail dégagés",
    src: "/images/univers-bureau.jpg",
  },
  {
    id: "commerce",
    titre: "Commerce",
    accroche: "Des lieux accueillants qui inspirent confiance.",
    icon: "store",
    photo: "Boutique à la vitrine impeccable",
    src: "/images/univers-commerce.jpg",
  },
  {
    id: "airbnb",
    titre: "Airbnb",
    accroche: "Rotation rapide entre deux séjours.",
    icon: "bed",
    photo: "Chambre préparée pour l'arrivée d'un voyageur",
    src: "/images/univers-airbnb.jpg",
  },
  {
    id: "local-industriel",
    titre: "Local industriel",
    accroche: "Hygiène et sécurité au service de vos activités.",
    icon: "factory",
    photo: "Atelier au sol dégagé et aux allées balisées",
    src: "/images/univers-industriel.jpg",
  },
  {
    id: "fin-de-chantier",
    titre: "Fin de chantier",
    accroche: "Livraison propre, prête à l'emploi.",
    icon: "hardhat",
    photo: "Pièce fraîchement rénovée, débarrassée des résidus",
    src: "/images/univers-fin-chantier.jpg",
  },
] as const;
