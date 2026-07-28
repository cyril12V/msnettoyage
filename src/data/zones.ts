export type Zone = {
  slug: string;
  /** Nom de la zone tel qu'affiché dans les listes et le fil d'Ariane. */
  name: string;
  /**
   * Nom précédé de sa préposition, pour être inséré dans une phrase.
   *
   * Le français ne permet pas de la déduire du nom : on dit « à Paris », « en
   * Essonne », « dans le Val-de-Marne » et « dans les Yvelines ». Concaténer
   * « en » devant chaque nom produisait « en Paris » dans les titres de
   * section, une faute visible par tout lecteur et par tout moteur.
   */
  avecPreposition: string;
  /** Numéro de département, affiché en badge. */
  departement: string;
  metaTitle: string;
  metaDescription: string;
  /** Phrase de définition autonome, citable hors contexte (GEO). */
  lede: string;
  /** Communes réellement desservies, listées pour la recherche locale. */
  communes: readonly string[];
  /** Contenu spécifique à la zone, jamais dupliqué d'une page à l'autre. */
  body: readonly string[];
  /** Slugs des services les plus demandés sur cette zone. */
  servicesPhares: readonly string[];
  /** Zone historique de l'entreprise, mise en avant sur la page d'accueil. */
  base?: boolean;
};

export const zones: readonly Zone[] = [
  {
    slug: "meaux",
    name: "Meaux",
    avecPreposition: "à Meaux",
    departement: "77",
    base: true,
    metaTitle: "Entreprise de nettoyage à Meaux (77100) | MS Nettoyages",
    metaDescription:
      "MS Nettoyages est basée à Meaux : entretien de locaux, grand ménage, remise en état après travaux et ménage Airbnb à Meaux et dans l'agglomération. Devis sous 24 h.",
    lede: "MS Nettoyages est une entreprise de nettoyage basée à Meaux (77100) qui intervient dans la ville et l'ensemble du Pays de Meaux.",
    communes: [
      "Meaux",
      "Nanteuil-lès-Meaux",
      "Villenoy",
      "Mareuil-lès-Meaux",
      "Trilport",
      "Chauconin-Neufmontiers",
      "Crégy-lès-Meaux",
      "Poincy",
      "Fublaines",
      "Quincy-Voisins",
    ],
    body: [
      "Meaux est notre ville d'implantation. C'est la zone où nos délais sont les plus courts : une demande formulée le matin peut généralement être planifiée dans la journée ou le lendemain, y compris pour une urgence.",
      "Le tissu local mêle commerces de centre-ville, cabinets et professions libérales, copropriétés et logements en location. Nos interventions les plus fréquentes ici sont l'entretien régulier de commerces et de parties communes, et la remise en état de logements entre deux locataires.",
      "Nous ne facturons aucun frais de déplacement sur Meaux et les communes limitrophes.",
    ],
    servicesPhares: ["entretien-regulier", "bureaux-et-commerces", "nettoyage-en-profondeur"],
  },
  {
    slug: "seine-et-marne",
    name: "Seine-et-Marne",
    avecPreposition: "en Seine-et-Marne",
    departement: "77",
    metaTitle: "Nettoyage professionnel en Seine-et-Marne (77) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage en Seine-et-Marne : entretien de bureaux et commerces, grand ménage, fin de chantier et ménage Airbnb. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages couvre la Seine-et-Marne depuis Meaux, avec une présence renforcée sur le nord et le centre du département.",
    communes: [
      "Chelles",
      "Torcy",
      "Lagny-sur-Marne",
      "Melun",
      "Coulommiers",
      "Serris",
      "Bussy-Saint-Georges",
      "Claye-Souilly",
      "Mitry-Mory",
      "Dammartin-en-Goële",
    ],
    body: [
      "La Seine-et-Marne est le plus vaste département d'Île-de-France : les temps de trajet y varient fortement d'une commune à l'autre. Nous en tenons compte dans la planification et vous annonçons un créneau réaliste plutôt qu'une promesse intenable.",
      "Le secteur de Marne-la-Vallée et Val d'Europe concentre une forte demande de rotation Airbnb et de nettoyage de bureaux, liée à l'activité touristique et aux zones d'affaires. Le nord du département relève davantage du logistique et de l'industriel.",
      "Pour les communes les plus éloignées, un volume minimum ou un regroupement d'interventions peut être proposé afin de rester compétitif sur le prix.",
    ],
    servicesPhares: ["entretien-regulier", "menage-airbnb", "nettoyage-fin-de-chantier"],
  },
  {
    slug: "paris",
    name: "Paris",
    avecPreposition: "à Paris",
    departement: "75",
    metaTitle: "Entreprise de nettoyage à Paris (75) | MS Nettoyages",
    metaDescription:
      "Nettoyage de bureaux, commerces et logements à Paris : entretien régulier, grand ménage, remise en état après travaux et rotation Airbnb. Devis gratuit.",
    lede: "MS Nettoyages intervient dans les 20 arrondissements de Paris, principalement sur le nettoyage de bureaux, la rotation de locations courte durée et la remise en état de logements.",
    communes: [
      "Paris 1er au 20e arrondissement",
      "Quartier central des affaires",
      "Gare du Nord et Gare de l'Est",
      "Bastille et Marais",
      "Montmartre",
      "Batignolles",
    ],
    body: [
      "Paris impose ses propres contraintes : accès en étage sans ascenseur, stationnement difficile, créneaux de livraison réglementés, codes et interphones multiples. Ces éléments sont pris en compte dans le devis, pas découverts le jour de l'intervention.",
      "La rotation Airbnb représente une part importante de notre activité parisienne. La densité de logements en location courte durée y crée une exigence forte sur le respect des créneaux entre check-out et check-in.",
      "Pour les bureaux, nous intervenons avant l'ouverture ou après la fermeture, avec un jeu de clés ou un badge remis au démarrage du contrat et restitué à sa fin.",
    ],
    servicesPhares: ["bureaux-et-commerces", "menage-airbnb", "remise-en-etat-apres-travaux"],
  },
  {
    slug: "seine-saint-denis",
    name: "Seine-Saint-Denis",
    avecPreposition: "en Seine-Saint-Denis",
    departement: "93",
    metaTitle: "Nettoyage professionnel en Seine-Saint-Denis (93) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage en Seine-Saint-Denis : bureaux, commerces, entrepôts, remise en état après travaux et parties communes. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient dans toute la Seine-Saint-Denis, avec une activité concentrée sur les locaux professionnels et les entrepôts.",
    communes: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Bobigny",
      "Noisy-le-Grand",
      "Aulnay-sous-Bois",
      "Le Blanc-Mesnil",
      "Pantin",
      "Bondy",
      "Rosny-sous-Bois",
    ],
    body: [
      "Le département concentre une forte densité de zones d'activité, d'entrepôts et de plateformes logistiques. C'est le secteur où nous réalisons le plus de nettoyage industriel et de locaux techniques.",
      "L'axe Plaine Saint-Denis – Pantin – Aubervilliers, en pleine reconversion tertiaire, génère par ailleurs une demande soutenue de remise en état après travaux et d'entretien de bureaux neufs.",
      "Depuis Meaux, la desserte du 93 est directe par l'A4 et la N3, ce qui permet des interventions matinales sans surcoût de déplacement.",
    ],
    servicesPhares: [
      "nettoyage-industriel",
      "bureaux-et-commerces",
      "remise-en-etat-apres-travaux",
    ],
  },
  {
    slug: "val-de-marne",
    name: "Val-de-Marne",
    avecPreposition: "dans le Val-de-Marne",
    departement: "94",
    metaTitle: "Entreprise de nettoyage dans le Val-de-Marne (94) | MS Nettoyages",
    metaDescription:
      "Nettoyage de bureaux, commerces et logements dans le Val-de-Marne : entretien régulier, grand ménage et remise en état après travaux. Devis gratuit.",
    lede: "MS Nettoyages couvre le Val-de-Marne, du nord du département jusqu'aux communes de la vallée de la Marne et de la Seine.",
    communes: [
      "Créteil",
      "Vitry-sur-Seine",
      "Saint-Maur-des-Fossés",
      "Champigny-sur-Marne",
      "Ivry-sur-Seine",
      "Nogent-sur-Marne",
      "Vincennes",
      "Maisons-Alfort",
      "Alfortville",
      "Charenton-le-Pont",
    ],
    body: [
      "Le Val-de-Marne mêle habitat pavillonnaire, copropriétés et zones tertiaires. Nos interventions y sont réparties entre l'entretien de parties communes, le grand ménage de logements et l'entretien de commerces de proximité.",
      "Les communes de la boucle de la Marne (Saint-Maur, Nogent, Champigny) concentrent une demande de nettoyage en profondeur et de remise en état liée aux rénovations de maisons individuelles.",
      "Nous établissons les devis pour les copropriétés sur la base d'un état des lieux des parties communes : surfaces, nombre de niveaux, présence d'ascenseur et fréquence souhaitée.",
    ],
    servicesPhares: ["entretien-regulier", "nettoyage-en-profondeur", "bureaux-et-commerces"],
  },
  {
    slug: "hauts-de-seine",
    name: "Hauts-de-Seine",
    avecPreposition: "dans les Hauts-de-Seine",
    departement: "92",
    metaTitle: "Nettoyage de bureaux dans les Hauts-de-Seine (92) | MS Nettoyages",
    metaDescription:
      "Entretien de bureaux, commerces et logements dans les Hauts-de-Seine. Intervention hors heures d'ouverture, équipe déclarée. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient dans les Hauts-de-Seine, principalement sur le nettoyage de bureaux et de surfaces tertiaires.",
    communes: [
      "Boulogne-Billancourt",
      "Nanterre",
      "Courbevoie",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Clichy",
      "Neuilly-sur-Seine",
      "Asnières-sur-Seine",
      "Puteaux",
      "Rueil-Malmaison",
    ],
    body: [
      "Le 92 est le département le plus tertiaire d'Île-de-France. La demande y porte majoritairement sur des contrats d'entretien de bureaux, avec des cahiers des charges détaillés et des contrôles qualité formalisés.",
      "Les immeubles de bureaux imposent souvent des règles d'accès strictes : badge nominatif, enregistrement des intervenants, plages horaires imposées par le gestionnaire de l'immeuble. Nous fournissons la liste nominative de nos intervenants et leurs justificatifs au démarrage.",
      "Pour les prestations récurrentes, nous privilégions une équipe fixe afin de limiter les formalités d'accès à chaque passage.",
    ],
    servicesPhares: ["bureaux-et-commerces", "entretien-regulier", "nettoyage-en-profondeur"],
  },
  {
    slug: "val-d-oise",
    name: "Val-d'Oise",
    avecPreposition: "dans le Val-d'Oise",
    departement: "95",
    metaTitle: "Entreprise de nettoyage dans le Val-d'Oise (95) | MS Nettoyages",
    metaDescription:
      "Nettoyage professionnel dans le Val-d'Oise : entretien de locaux, fin de chantier, remise en état après travaux et ménage Airbnb. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages couvre le Val-d'Oise, avec une desserte rapide de l'est du département depuis Meaux.",
    communes: [
      "Cergy",
      "Argenteuil",
      "Sarcelles",
      "Garges-lès-Gonesse",
      "Goussainville",
      "Roissy-en-France",
      "Villiers-le-Bel",
      "Ermont",
      "Franconville",
      "Gonesse",
    ],
    body: [
      "L'est du Val-d'Oise, autour de Roissy et de Gonesse, concentre hôtellerie, logistique et zones d'activité. C'est le secteur du département où nous intervenons le plus fréquemment, avec un accès direct depuis Meaux.",
      "La demande y porte notamment sur les rotations de logements courte durée liées à la proximité de l'aéroport, et sur le nettoyage de locaux professionnels.",
      "Sur l'ouest du département, autour de Cergy, nous intervenons sur programmation, en regroupant les interventions pour maîtriser les temps de trajet.",
    ],
    servicesPhares: ["menage-airbnb", "nettoyage-industriel", "nettoyage-fin-de-chantier"],
  },
  {
    slug: "essonne",
    name: "Essonne",
    avecPreposition: "en Essonne",
    departement: "91",
    metaTitle: "Nettoyage professionnel en Essonne (91) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage en Essonne : entretien de bureaux et commerces, grand ménage, remise en état après travaux. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient en Essonne sur programmation, principalement pour des contrats d'entretien et des remises en état.",
    communes: [
      "Évry-Courcouronnes",
      "Massy",
      "Corbeil-Essonnes",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Palaiseau",
      "Athis-Mons",
      "Viry-Châtillon",
      "Longjumeau",
      "Yerres",
    ],
    body: [
      "L'Essonne est située à l'opposé de notre base de Meaux : nous y intervenons sur planification anticipée plutôt qu'en urgence, ce que nous annonçons dès la demande de devis.",
      "Les prestations les plus adaptées à cette organisation sont les contrats d'entretien récurrents, dont les créneaux sont fixés à l'avance, et les remises en état après travaux, dont la date est connue plusieurs jours à l'avance.",
      "Le plateau de Saclay et le secteur de Massy concentrent l'essentiel de la demande tertiaire du département.",
    ],
    servicesPhares: ["entretien-regulier", "remise-en-etat-apres-travaux", "bureaux-et-commerces"],
  },
  {
    slug: "yvelines",
    name: "Yvelines",
    avecPreposition: "dans les Yvelines",
    departement: "78",
    metaTitle: "Entreprise de nettoyage dans les Yvelines (78) | MS Nettoyages",
    metaDescription:
      "Nettoyage professionnel dans les Yvelines : entretien de locaux, grand ménage, remise en état après travaux. Intervention sur planification. Devis gratuit.",
    lede: "MS Nettoyages intervient dans les Yvelines sur planification, pour des prestations d'entretien régulier et de remise en état.",
    communes: [
      "Versailles",
      "Saint-Germain-en-Laye",
      "Sartrouville",
      "Mantes-la-Jolie",
      "Poissy",
      "Conflans-Sainte-Honorine",
      "Montigny-le-Bretonneux",
      "Le Chesnay-Rocquencourt",
      "Houilles",
      "Trappes",
    ],
    body: [
      "Les Yvelines constituent la limite ouest de notre zone d'intervention. Comme pour l'Essonne, nous y travaillons sur planification et non en intervention d'urgence.",
      "Le parc immobilier ancien de Versailles et Saint-Germain-en-Laye génère une demande spécifique de nettoyage en profondeur et de remise en état après rénovation, sur des supports parfois délicats (parquets anciens, marbre, boiseries) qui imposent des produits adaptés.",
      "Pour toute demande dans ce secteur, nous confirmons la faisabilité et le créneau avant d'établir le devis, afin de ne jamais engager un délai que nous ne pourrions pas tenir.",
    ],
    servicesPhares: [
      "nettoyage-en-profondeur",
      "remise-en-etat-apres-travaux",
      "entretien-regulier",
    ],
  },
] as const;

/** Retrouve une zone par son slug, ou `undefined` si le slug est inconnu. */
export function getZone(slug: string): Zone | undefined {
  return zones.find((zone) => zone.slug === slug);
}

/** Slugs de toutes les zones, utilisés par `generateStaticParams` et le sitemap. */
export const zoneSlugs = zones.map((zone) => zone.slug);
