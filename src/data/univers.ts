import type { IconName } from "@/components/ui/Icon";

/**
 * Univers d'intervention, c'est à dire les types de lieux dans lesquels nous
 * travaillons.
 *
 * À ne pas confondre avec les prestations (`services.ts`), qui décrivent ce que
 * nous faisons : ici, on répond à « est-ce que vous intervenez chez moi ? ».
 *
 * Les visuels renseignés proviennent du lot de photos fourni par le client. Les
 * emplacements encore vides attendent les photos décrites dans BRIEF-PHOTO.md,
 * au format paysage 16:9.
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
    src: "/images/chambre-familiale-sous-combles.jpeg",
  },
  {
    id: "bureau",
    titre: "Bureau",
    accroche: "Espaces de travail sains, équipes performantes.",
    icon: "briefcase",
    photo: "Open space moderne, postes de travail dégagés",
  },
  {
    id: "commerce",
    titre: "Commerce",
    accroche: "Des lieux accueillants qui inspirent confiance.",
    icon: "store",
    photo: "Boutique avec vitrine impeccable",
  },
  {
    id: "airbnb",
    titre: "Airbnb",
    accroche: "Rotation rapide entre deux séjours.",
    icon: "bed",
    photo: "Chambre préparée pour l'arrivée d'un voyageur",
    src: "/images/chambre-sous-combles-poutres.jpeg",
  },
  {
    id: "local-industriel",
    titre: "Local industriel",
    accroche: "Hygiène et sécurité au service de vos activités.",
    icon: "factory",
    photo: "Entrepôt ou atelier, sol dégagé et propre",
  },
  {
    id: "fin-de-chantier",
    titre: "Fin de chantier",
    accroche: "Livraison propre, prête à l'emploi.",
    icon: "hardhat",
    photo: "Pièce fraîchement rénovée, débarrassée des résidus",
    src: "/images/salle-de-bain-combles-chevrons.jpeg",
  },
] as const;
