import type { IconName } from "@/components/ui/Icon";

export type Service = {
  slug: string;
  /** Libellé court utilisé dans les cartes, la navigation et le formulaire de devis. */
  shortName: string;
  /** Intitulé complet de la prestation, tel qu'il apparaît dans la liste d'expertise. */
  listLabel: string;
  /** Titre H1 de la page dédiée. */
  title: string;
  /**
   * Définition directe de la prestation, en une à deux phrases autonomes.
   * Rédigée pour être citable telle quelle par un moteur génératif (GEO).
   */
  lede: string;
  metaTitle: string;
  metaDescription: string;
  icon: IconName;
  /** Ce que la prestation comprend concrètement. */
  includes: readonly string[];
  /** Profils de clients concernés. */
  forWho: readonly string[];
  /** Rythme ou durée typique, affiché en encart factuel. */
  facts: readonly { label: string; value: string }[];
  /** Paragraphes de contenu de la page dédiée. */
  body: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "entretien-regulier",
    shortName: "Entretien régulier",
    listLabel: "Entretien régulier (quotidien, hebdomadaire, mensuel)",
    title: "Entretien régulier de locaux en Île-de-France",
    lede: "L'entretien régulier est un contrat de nettoyage récurrent — quotidien, hebdomadaire ou mensuel — assuré par la même équipe, selon un cahier des charges défini avec vous.",
    metaTitle: "Entretien régulier de locaux — Île-de-France | MS Nettoyage",
    metaDescription:
      "Contrat de nettoyage récurrent en Île-de-France : passage quotidien, hebdomadaire ou mensuel, même équipe à chaque intervention. Devis gratuit sous 24 h.",
    icon: "calendar",
    includes: [
      "Dépoussiérage des surfaces, mobilier et équipements",
      "Nettoyage et désinfection des sanitaires",
      "Entretien des sols : aspiration, lavage, traitement adapté au revêtement",
      "Désinfection des points de contact (poignées, interrupteurs, rampes)",
      "Vitrerie intérieure accessible sans nacelle",
      "Sortie des déchets et remplacement des sacs",
      "Réapprovisionnement des consommables sanitaires",
    ],
    forWho: [
      "Bureaux et espaces de coworking",
      "Cabinets médicaux et professions libérales",
      "Commerces et points de vente",
      "Parties communes de copropriétés",
      "Particuliers souhaitant un passage régulier",
    ],
    facts: [
      { label: "Fréquence", value: "1 à 7 passages / semaine" },
      { label: "Engagement", value: "Sans durée minimale" },
      { label: "Équipe", value: "Intervenants attitrés" },
    ],
    body: [
      "Un contrat d'entretien régulier repose sur un cahier des charges écrit : liste des zones, opérations à réaliser, fréquence de chacune et créneau d'intervention. Ce document sert de référence lors des contrôles qualité et évite les malentendus sur ce qui est inclus.",
      "Nous affectons les mêmes intervenants à votre site. Ils connaissent la configuration des lieux, les codes d'accès, les contraintes de sécurité et les points sensibles — ce qui réduit le temps d'intervention et améliore la régularité du résultat.",
      "Les horaires s'adaptent à votre activité : avant l'ouverture, après la fermeture ou pendant les heures creuses. Pour les bureaux, l'intervention en soirée reste la formule la plus courante car elle évite toute gêne pour vos équipes.",
    ],
  },
  {
    slug: "nettoyage-en-profondeur",
    shortName: "Nettoyage en profondeur",
    listLabel: "Nettoyage en profondeur",
    title: "Nettoyage en profondeur (grand ménage)",
    lede: "Le nettoyage en profondeur est une intervention ponctuelle qui traite ce que l'entretien courant ne couvre pas : détartrage, dégraissage, intérieur des équipements, plinthes, encadrements et zones difficiles d'accès.",
    metaTitle: "Nettoyage en profondeur — grand ménage | MS Nettoyage",
    metaDescription:
      "Grand ménage en Île-de-France : dégraissage cuisine, détartrage sanitaires, intérieur des placards et électroménager, plinthes et encadrements. Devis gratuit.",
    icon: "sparkle",
    includes: [
      "Dégraissage complet de la cuisine : plans de travail, crédence, hotte, four",
      "Détartrage des sanitaires, robinetterie et parois de douche",
      "Nettoyage intérieur des placards et de l'électroménager",
      "Plinthes, encadrements de portes, interrupteurs et radiateurs",
      "Vitres, rebords et volets accessibles",
      "Traitement des sols adapté au revêtement (carrelage, parquet, vinyle)",
    ],
    forWho: [
      "Emménagement ou déménagement",
      "Logement resté inoccupé plusieurs mois",
      "Remise à niveau avant reprise d'un contrat d'entretien",
      "Locaux professionnels avant une visite ou un audit",
    ],
    facts: [
      { label: "Durée type", value: "4 à 8 h pour un T3" },
      { label: "Produits", value: "Professionnels, adaptés au support" },
      { label: "Format", value: "Intervention unique" },
    ],
    body: [
      "Un grand ménage se distingue de l'entretien courant par la nature des opérations : on ne se contente pas de nettoyer les surfaces visibles, on traite l'accumulation. Calcaire dans les sanitaires, graisse sur les hottes et crédences, poussière dans les gorges de fenêtre et derrière les radiateurs.",
      "Chaque support impose un produit et une méthode. Un parquet huilé ne se traite pas comme un carrelage, une plaque vitrocéramique pas comme de l'inox. Utiliser un produit inadapté abîme durablement le support : c'est le premier motif de dégradation constaté sur les logements nettoyés sans précaution.",
      "Cette prestation est souvent commandée avant un état des lieux. Nous établissons alors un devis à partir de la surface, du nombre de pièces d'eau et de l'état de départ, que nous évaluons sur photos ou lors d'une visite.",
    ],
  },
  {
    slug: "remise-en-etat-apres-travaux",
    shortName: "Remise en état après travaux",
    listLabel: "Remise en état après travaux",
    title: "Remise en état après travaux",
    lede: "La remise en état après travaux est le nettoyage final qui rend un local habitable après une rénovation : élimination des résidus de chantier, des traces de peinture, de colle et d'enduit, et des poussières fines déposées partout.",
    metaTitle: "Remise en état après travaux — Île-de-France | MS Nettoyage",
    metaDescription:
      "Nettoyage après rénovation en Île-de-France : dépose des traces de peinture, colle et enduit, dépoussiérage complet, vitrerie. Livraison prête à l'emploi.",
    icon: "trowel",
    includes: [
      "Retrait des traces de peinture, colle, enduit et silicone",
      "Décollage des protections, adhésifs et étiquettes",
      "Dépoussiérage intégral, y compris plafonds, gaines et luminaires",
      "Nettoyage des vitres, châssis et rails de menuiserie",
      "Lavage des sols en plusieurs passes jusqu'à disparition du voile de plâtre",
      "Nettoyage complet des sanitaires et de la cuisine neuve",
    ],
    forWho: [
      "Particuliers après rénovation d'un logement",
      "Architectes d'intérieur et maîtres d'œuvre",
      "Agences immobilières avant mise en location",
      "Entreprises après réaménagement de locaux",
    ],
    facts: [
      { label: "Passes de lavage", value: "2 à 3 selon l'empoussièrement" },
      { label: "Délai type", value: "1 journée pour 120 m²" },
      { label: "Objectif", value: "Local livrable en l'état" },
    ],
    body: [
      "La poussière de plâtre et de ponçage est extrêmement fine : elle se redépose plusieurs heures après le premier lavage. C'est pourquoi une remise en état sérieuse comporte toujours plusieurs passes, du haut vers le bas, et se termine par les sols.",
      "Les traces de peinture et de colle se retirent mécaniquement, avec des grattoirs adaptés au support. Sur du verre, un mauvais geste raye définitivement la vitre ; sur une menuiserie laquée, un solvant trop agressif ternit la finition. Ce sont les deux dégâts les plus fréquents quand l'opération est confiée à des non-professionnels.",
      "Nous intervenons une fois les corps de métier partis et le gros des gravats évacué. Si l'évacuation reste à faire, la prestation relève du nettoyage de fin de chantier, que nous réalisons également.",
    ],
  },
  {
    slug: "menage-airbnb",
    shortName: "Ménage Airbnb",
    listLabel: "Ménage Airbnb & locations saisonnières",
    title: "Ménage Airbnb et locations saisonnières",
    lede: "Le ménage Airbnb est une prestation de rotation entre deux séjours : nettoyage complet du logement, changement du linge, réapprovisionnement des consommables et remise en configuration d'accueil.",
    metaTitle: "Ménage Airbnb et location saisonnière | MS Nettoyage",
    metaDescription:
      "Rotation Airbnb en Île-de-France : nettoyage entre deux séjours, changement du linge, réassort et compte rendu photo, entre le check-out et le check-in.",
    icon: "bed",
    includes: [
      "Nettoyage complet du logement entre deux séjours",
      "Changement des draps et du linge de toilette",
      "Réassort des consommables : papier, savon, produits d'accueil",
      "Contrôle de l'équipement et signalement de toute dégradation",
      "Remise en configuration d'accueil (rangement, présentation)",
      "Compte rendu photo après chaque rotation",
    ],
    forWho: [
      "Propriétaires de locations courte durée",
      "Conciergeries et gestionnaires de biens",
      "Résidences et appart-hôtels",
    ],
    facts: [
      { label: "Créneau", value: "Entre check-out et check-in" },
      { label: "Compte rendu", value: "Photos après chaque rotation" },
      { label: "Linge", value: "Gestion possible sur demande" },
    ],
    body: [
      "La contrainte d'une rotation n'est pas la difficulté du nettoyage, c'est la fenêtre horaire. Entre un départ à 11 h et une arrivée à 15 h, tout doit être fait, vérifié et remis en ordre. Nous planifions les rotations à partir de votre calendrier de réservation, pas l'inverse.",
      "Le compte rendu photo protège les deux parties : il date l'état du logement à la fin de notre intervention. En cas de litige avec un voyageur sur une dégradation, vous disposez d'une preuve horodatée.",
      "Nous signalons systématiquement ce qui sort de l'ordinaire : ampoule grillée, joint moisi, stock de consommables bas. Traiter ces détails avant qu'un voyageur ne les mentionne est ce qui préserve une note d'avis élevée sur la durée.",
    ],
  },
  {
    slug: "bureaux-et-commerces",
    shortName: "Bureaux & commerces",
    listLabel: "Nettoyage de bureaux et commerces",
    title: "Nettoyage de bureaux et de commerces",
    lede: "Le nettoyage de bureaux et de commerces couvre l'entretien des espaces de travail et des surfaces recevant du public, en dehors des heures d'activité, avec un niveau d'exigence adapté aux zones vues par vos clients.",
    metaTitle: "Nettoyage de bureaux et commerces — IDF | MS Nettoyage",
    metaDescription:
      "Entretien de bureaux, boutiques et locaux recevant du public en Île-de-France. Intervention hors heures d'ouverture, équipe déclarée, devis gratuit sous 24 h.",
    icon: "briefcase",
    includes: [
      "Open spaces, bureaux individuels et salles de réunion",
      "Accueil, vitrines et zones vues par la clientèle",
      "Sanitaires et espaces de restauration",
      "Désinfection des postes de travail et points de contact",
      "Sols : aspiration, lavage, autolaveuse selon la surface",
      "Gestion des déchets et du tri sélectif",
    ],
    forWho: [
      "PME, startups et cabinets",
      "Boutiques, salons et restaurants",
      "Espaces de coworking",
      "Cabinets médicaux et paramédicaux",
    ],
    facts: [
      { label: "Horaires", value: "Avant ouverture ou après fermeture" },
      { label: "Personnel", value: "Déclaré et assuré" },
      { label: "Contrôle", value: "Visites qualité planifiées" },
    ],
    body: [
      "Dans un commerce, la propreté fait partie de l'expérience client au même titre que l'accueil ou la présentation des produits. Une vitrine marquée ou un sanitaire négligé produit un effet disproportionné sur la perception du lieu — c'est souvent ce que les clients retiennent.",
      "Dans un bureau, l'enjeu est différent : il porte sur l'hygiène collective et sur le confort quotidien des équipes. La désinfection des points de contact et l'entretien des espaces de restauration sont les deux postes qui pèsent le plus.",
      "Nous intervenons en dehors des heures d'activité. Les accès, alarmes et consignes de sécurité sont formalisés au démarrage du contrat, et nos intervenants sont déclarés et couverts par notre responsabilité civile professionnelle.",
    ],
  },
  {
    slug: "nettoyage-industriel",
    shortName: "Nettoyage industriel",
    listLabel: "Nettoyage industriel et locaux professionnels",
    title: "Nettoyage industriel et locaux professionnels",
    lede: "Le nettoyage industriel s'applique aux entrepôts, ateliers et locaux techniques : grandes surfaces, salissures spécifiques et contraintes d'hygiène et de sécurité propres au site.",
    metaTitle: "Nettoyage industriel et locaux techniques | MS Nettoyage",
    metaDescription:
      "Nettoyage d'entrepôts, ateliers et locaux techniques en Île-de-France : grandes surfaces, dégraissage, respect des consignes de sécurité du site. Devis sur mesure.",
    icon: "factory",
    includes: [
      "Entrepôts, ateliers, quais de chargement",
      "Dégraissage des sols et des zones de production",
      "Nettoyage des locaux sociaux, vestiaires et réfectoires",
      "Sanitaires et zones à hygiène renforcée",
      "Traitement des surfaces techniques selon protocole du site",
      "Interventions programmées ou ponctuelles",
    ],
    forWho: [
      "Entrepôts et plateformes logistiques",
      "Ateliers et petites unités de production",
      "Garages et locaux techniques",
      "Sites nécessitant un protocole d'hygiène formalisé",
    ],
    facts: [
      { label: "Surfaces", value: "Adapté aux grands volumes" },
      { label: "Sécurité", value: "Respect du protocole du site" },
      { label: "Planning", value: "Programmé ou ponctuel" },
    ],
    body: [
      "Un site industriel impose ses propres règles : port des équipements de protection, zones interdites, plages horaires compatibles avec la production, procédures de consignation. Nous partons de votre protocole existant plutôt que d'imposer le nôtre.",
      "Les salissures rencontrées — huile, graisse technique, poussière métallique, résidus de production — ne se traitent pas avec des produits d'entretien courants. Le choix du dégraissant et de la méthode se décide sur site, après constat.",
      "Un chiffrage sérieux suppose une visite préalable. La surface seule ne dit rien du temps réel d'intervention : la hauteur sous plafond, l'encombrement et la nature des salissures pèsent davantage.",
    ],
  },
  {
    slug: "nettoyage-fin-de-chantier",
    shortName: "Fin de chantier",
    listLabel: "Nettoyage de fin de chantier",
    title: "Nettoyage de fin de chantier",
    lede: "Le nettoyage de fin de chantier est la première passe réalisée juste après les travaux : évacuation des déchets résiduels, dépoussiérage grossier et dégagement des surfaces, avant la remise en état finale.",
    metaTitle: "Nettoyage de fin de chantier — Île-de-France | MS Nettoyage",
    metaDescription:
      "Nettoyage de fin de chantier en Île-de-France : évacuation des résidus, dépoussiérage grossier, dégagement des surfaces avant livraison. Intervention rapide.",
    icon: "hardhat",
    includes: [
      "Ramassage et regroupement des déchets résiduels de chantier",
      "Dépoussiérage grossier des sols, murs et menuiseries",
      "Retrait des protections de sol et des bâches",
      "Balayage et premier lavage des surfaces",
      "Dégagement des accès et des circulations",
      "Préparation du local pour la remise en état finale",
    ],
    forWho: [
      "Entreprises du bâtiment et artisans",
      "Maîtres d'œuvre et conducteurs de travaux",
      "Promoteurs avant livraison",
      "Particuliers en fin de rénovation",
    ],
    facts: [
      { label: "Position", value: "Avant la remise en état" },
      { label: "Réactivité", value: "Intervention sous 48 h possible" },
      { label: "Suite logique", value: "Remise en état après travaux" },
    ],
    body: [
      "Fin de chantier et remise en état sont deux prestations distinctes, souvent confondues. La fin de chantier dégage le terrain : elle retire ce qui reste physiquement sur place. La remise en état vient ensuite et rend le local livrable, propre au détail près.",
      "Enchaîner directement sur une remise en état sans cette première passe fait exploser le temps d'intervention, donc le coût. Quand les deux sont commandées ensemble, nous les planifions à 24 ou 48 h d'intervalle pour laisser la poussière retomber.",
      "Nous intervenons une fois les corps de métier sortis. L'évacuation des gravats lourds en déchetterie relève d'un prestataire spécialisé : nous regroupons et signalons, nous ne transportons pas de déchets de construction.",
    ],
  },
] as const;

/** Retrouve un service par son slug, ou `undefined` si le slug est inconnu. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Slugs de tous les services — utilisé par `generateStaticParams` et le sitemap. */
export const serviceSlugs = services.map((service) => service.slug);
