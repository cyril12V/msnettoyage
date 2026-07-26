import type { IconName } from "@/components/ui/Icon";

/**
 * Pages d'atterrissage locales.
 *
 * Chacune vise UNE requête précise, formulée telle que le client la tape dans
 * Google, avec la ville dans l'intitulé : « nettoyage de maison à Meaux ».
 *
 * Trois règles gouvernent ce fichier :
 *
 *  1. **Une requête, une page.** Deux pages qui visent le même mot-clé se
 *     cannibalisent : Google en retient une, arbitrairement, et les deux
 *     reculent. Les intitulés ci-dessous sont donc volontairement disjoints.
 *  2. **Le mot-clé dans l'URL, le titre et le H1.** C'est le signal le plus
 *     simple et le plus lisible pour un moteur.
 *  3. **Aucun contenu recopié d'une page à l'autre.** Du texte dupliqué sur
 *     plusieurs pages les fait toutes redescendre. Un test le vérifie.
 *
 * Pour couvrir une nouvelle ville, dupliquer ces entrées en remplaçant la ville
 * ET en réécrivant les paragraphes : un simple chercher-remplacer produirait des
 * pages jumelles, que Google traite comme du remplissage.
 */

export type Landing = {
  /** Slug, donc URL. Contient le mot-clé et la ville. */
  slug: string;
  /** Requête visée, telle qu'elle est tapée dans Google. */
  requete: string;
  /** Libellé court, pour les listes et le fil d'Ariane. */
  libelleCourt: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Définition autonome, citable hors contexte par un moteur génératif. */
  lede: string;
  icon: IconName;
  /** Ce que la prestation comprend concrètement. */
  inclus: readonly string[];
  /** À qui elle s'adresse. */
  pourQui: readonly string[];
  /** Repères chiffrés, affichés en encart. */
  faits: readonly { label: string; value: string }[];
  /** Corps de page, trois paragraphes minimum. */
  corps: readonly string[];
  /** Questions propres à cette prestation, balisées en FAQPage. */
  faq: readonly { question: string; answer: string }[];
  /** Visuel de la page, si disponible. */
  image?: string;
};

export const landings: readonly Landing[] = [
  {
    slug: "nettoyage-maison-meaux",
    requete: "Nettoyage de maison à Meaux",
    libelleCourt: "Nettoyage de maison",
    h1: "Nettoyage de maison à Meaux",
    metaTitle: "Nettoyage de maison à Meaux (77100) | MS Nettoyage",
    metaDescription:
      "Nettoyage de maison à Meaux : grand ménage complet, dégraissage de la cuisine, détartrage des sanitaires, vitres et sols. Devis gratuit sous 24 h.",
    lede: "Le nettoyage de maison est une intervention complète qui traite toutes les pièces d'un logement en une seule fois : cuisine, sanitaires, chambres, sols et vitres. MS Nettoyage l'assure à Meaux et dans les communes du Pays de Meaux.",
    icon: "home",
    image: "/images/hero-accueil.jpg",
    inclus: [
      "Dégraissage de la cuisine : plans de travail, crédence, hotte, four et plaques",
      "Détartrage des sanitaires, de la robinetterie et des parois de douche",
      "Aspiration et lavage de tous les sols, méthode adaptée au revêtement",
      "Dépoussiérage des meubles, plinthes, encadrements et interrupteurs",
      "Nettoyage des vitres accessibles, rebords et rails de fenêtre",
      "Changement des draps et rangement, sur demande",
    ],
    pourQui: [
      "Maisons individuelles du Pays de Meaux",
      "Propriétaires occupants souhaitant une remise à niveau",
      "Logements restés fermés plusieurs semaines",
      "Familles avant ou après une réception",
    ],
    faits: [
      { label: "Durée type", value: "3 à 7 h pour une maison de 100 m²" },
      { label: "Matériel", value: "Fourni par nos soins" },
      { label: "Format", value: "Ponctuel ou récurrent" },
    ],
    corps: [
      "Une maison se nettoie du haut vers le bas et des pièces sèches vers les pièces d'eau. Cet ordre n'est pas une habitude : il évite de redéposer de la poussière sur ce qui vient d'être lavé, et de transporter l'humidité de la salle de bains vers les chambres. C'est ce qui fait la différence entre un logement propre deux heures et un logement propre une semaine.",
      "Le poste le plus long est presque toujours la cuisine. La graisse de cuisson se dépose en couches successives sur la hotte, la crédence et le dessus des meubles hauts, à un endroit que personne ne regarde au quotidien. Il faut un dégraissant adapté et du temps de pose, pas de l'huile de coude : frotter à sec sur une crédence laquée la raye définitivement.",
      "À Meaux, une grande partie du parc est constituée de maisons de ville et de pavillons des années 1970 à 1990, souvent avec des sols mixtes : carrelage au rez-de-chaussée, parquet flottant à l'étage. Chacun impose son produit. Un parquet flottant lavé à grande eau gonfle aux joints, et le dommage est irréversible.",
      "Nous établissons le devis à partir de la surface, du nombre de pièces d'eau et de l'état de départ, que vous pouvez nous décrire par téléphone ou nous montrer en photos. Aucun déplacement n'est facturé pour chiffrer.",
    ],
    faq: [
      {
        question: "Combien coûte un nettoyage de maison à Meaux ?",
        answer:
          "Le prix dépend de la surface, du nombre de pièces d'eau et de l'état de départ. MS Nettoyage établit un devis gratuit et sans engagement sous 24 h, à partir de vos informations ou de photos. Aucun frais de déplacement n'est facturé sur Meaux et les communes limitrophes.",
      },
      {
        question: "Faut-il être présent pendant le nettoyage de la maison ?",
        answer:
          "Non. Beaucoup de clients nous confient un jeu de clés ou un code d'accès. Nous convenons du créneau par écrit avant l'intervention et nous vous confirmons la fin des travaux. Vous pouvez évidemment être présent si vous le préférez.",
      },
      {
        question: "Le nettoyage de maison comprend-il les vitres ?",
        answer:
          "Oui, les vitres accessibles depuis l'intérieur sans nacelle ni échafaudage sont comprises, ainsi que les rebords et les rails de fenêtre. Les vitres en hauteur ou en façade font l'objet d'un devis distinct.",
      },
    ],
  },
  {
    slug: "nettoyage-bureau-meaux",
    requete: "Nettoyage de bureau à Meaux",
    libelleCourt: "Nettoyage de bureau",
    h1: "Nettoyage de bureau à Meaux",
    metaTitle: "Nettoyage de bureau à Meaux (77100) | MS Nettoyage",
    metaDescription:
      "Nettoyage de bureaux à Meaux : entretien régulier hors heures d'ouverture, sanitaires, espaces de restauration et postes de travail. Devis sous 24 h.",
    lede: "Le nettoyage de bureau est un contrat d'entretien récurrent réalisé en dehors des heures d'activité, afin de ne gêner ni vos équipes ni vos visiteurs. MS Nettoyage intervient dans les bureaux et locaux professionnels de Meaux.",
    icon: "briefcase",
    image: "/images/univers-bureau.jpg",
    inclus: [
      "Open spaces, bureaux individuels et salles de réunion",
      "Désinfection des postes de travail et des points de contact",
      "Sanitaires, avec réapprovisionnement des consommables",
      "Espaces de restauration, micro-ondes et réfrigérateurs",
      "Sols : aspiration, lavage, autolaveuse au-delà de 300 m²",
      "Gestion des déchets et respect du tri sélectif",
    ],
    pourQui: [
      "PME et cabinets du centre de Meaux",
      "Professions libérales et cabinets médicaux",
      "Espaces de coworking",
      "Agences et locaux recevant du public",
    ],
    faits: [
      { label: "Créneau", value: "Avant 8 h ou après 18 h" },
      { label: "Fréquence", value: "1 à 5 passages par semaine" },
      { label: "Engagement", value: "Sans durée minimale" },
    ],
    corps: [
      "Un contrat d'entretien de bureaux repose sur un cahier des charges écrit : liste des zones, opérations à réaliser, fréquence de chacune et créneau d'intervention. Ce document sert de référence lors des contrôles qualité et évite les malentendus sur ce qui est inclus. Il est annexé au devis, avant signature.",
      "Deux postes pèsent bien plus que les autres dans la perception qu'ont vos équipes de la propreté des locaux : les sanitaires et l'espace de restauration. Ce sont les deux endroits où un manquement se remarque immédiatement, et les deux qui reviennent systématiquement dans les remontées internes. Nous les traitons à chaque passage, quelle que soit la fréquence retenue.",
      "Nous affectons les mêmes intervenants à votre site. Ils connaissent la configuration des lieux, l'alarme, les codes d'accès et les zones sensibles, ce qui réduit le temps d'intervention et rend le résultat régulier d'une semaine sur l'autre. Tous sont déclarés, et l'entreprise est couverte par une assurance responsabilité civile professionnelle.",
      "Les accès sont formalisés au démarrage du contrat : remise d'un jeu de clés ou d'un badge, code d'alarme, consignes de fermeture. Ces éléments sont restitués à la fin du contrat, sur décharge.",
    ],
    faq: [
      {
        question: "À quelle heure intervenez-vous dans les bureaux à Meaux ?",
        answer:
          "Avant l'ouverture ou après la fermeture, selon ce qui vous arrange. Le créneau le plus courant se situe entre 18 h et 21 h : les locaux sont vides, l'intervention est plus rapide et vos équipes retrouvent des bureaux propres le lendemain matin.",
      },
      {
        question: "Faut-il un engagement de durée pour un contrat de bureaux ?",
        answer:
          "Non. Les contrats d'entretien de bureaux de MS Nettoyage sont sans durée minimale et résiliables avec un préavis d'un mois. La fréquence des passages peut être modifiée en cours de contrat pour s'adapter à votre activité.",
      },
      {
        question: "Fournissez-vous les consommables sanitaires ?",
        answer:
          "Oui, sur demande. Papier toilette, essuie-mains et savon peuvent être inclus au contrat et réapprovisionnés à chaque passage, ou rester à votre charge si vous avez déjà un fournisseur. Les deux formules sont chiffrées séparément dans le devis.",
      },
    ],
  },
  {
    slug: "menage-particulier-meaux",
    requete: "Ménage particulier à Meaux",
    libelleCourt: "Ménage particulier",
    h1: "Ménage chez le particulier à Meaux",
    metaTitle: "Ménage particulier à Meaux (77100) | MS Nettoyage",
    metaDescription:
      "Ménage chez le particulier à Meaux : passage hebdomadaire ou bimensuel, même intervenant à chaque fois, matériel et produits fournis. Devis sous 24 h.",
    lede: "Le ménage chez le particulier est un entretien récurrent du domicile, assuré par le même intervenant à chaque passage, selon un rythme défini avec vous : hebdomadaire, bimensuel ou mensuel.",
    icon: "calendar",
    image: "/images/univers-appartement.jpg",
    inclus: [
      "Dépoussiérage des surfaces, meubles et objets",
      "Aspiration et lavage des sols de toutes les pièces",
      "Nettoyage complet de la cuisine et des sanitaires",
      "Changement des draps et du linge de toilette, sur demande",
      "Sortie des déchets et remplacement des sacs",
      "Repassage, en option et chiffré séparément",
    ],
    pourQui: [
      "Actifs et familles du Pays de Meaux",
      "Personnes âgées ou à mobilité réduite",
      "Propriétaires de résidences secondaires",
      "Copropriétés pour leurs parties communes",
    ],
    faits: [
      { label: "Rythme", value: "Hebdomadaire à mensuel" },
      { label: "Intervenant", value: "Le même à chaque passage" },
      { label: "Durée type", value: "2 à 4 h par passage" },
    ],
    corps: [
      "La régularité vaut mieux que l'intensité. Un passage hebdomadaire de deux heures maintient un logement en meilleur état qu'un grand ménage mensuel de huit heures, pour un coût comparable, parce que rien n'a le temps de s'incruster. C'est ce que nous recommandons dans la grande majorité des cas.",
      "Avoir le même intervenant à chaque passage change concrètement le résultat. Il sait où sont les produits, quels supports sont fragiles, ce que vous voulez qu'on ne déplace pas, et il repère ce qui a changé depuis la dernière fois. Un roulement d'intervenants oblige à tout réexpliquer et fait retomber la qualité à chaque changement.",
      "Nous venons avec notre matériel et nos produits professionnels. Si vous préférez que l'on utilise vos propres produits, pour une allergie, un label écologique ou une exigence particulière, il suffit de le préciser à la demande de devis : c'est sans supplément.",
      "Les prestations chez le particulier peuvent ouvrir droit à un avantage fiscal au titre des services à la personne, sous réserve que le prestataire soit déclaré pour cette activité. Nous vous indiquons précisément ce qu'il en est lors de l'établissement du devis, sans promesse en l'air.",
    ],
    faq: [
      {
        question: "Faut-il fournir les produits de ménage ?",
        answer:
          "Non. MS Nettoyage vient avec son matériel et ses produits professionnels, adaptés à chaque type de support. Si vous souhaitez que l'on utilise vos propres produits, pour une allergie ou une préférence écologique, précisez-le à la demande de devis : c'est sans supplément.",
      },
      {
        question: "Est-ce toujours la même personne qui vient ?",
        answer:
          "Oui, c'est le principe même de la formule. Le même intervenant vous est affecté et connaît votre logement, vos habitudes et les points auxquels vous tenez. En cas d'absence pour congés ou maladie, un remplaçant est briefé sur votre dossier avant son passage.",
      },
      {
        question: "Quelle fréquence choisir pour un ménage à domicile ?",
        answer:
          "Un passage hebdomadaire convient à la majorité des logements occupés au quotidien. Un rythme bimensuel suffit pour une personne seule ou un logement peu occupé. Nous ajustons la fréquence en cours de contrat, sans repasser par une négociation.",
      },
    ],
  },
  {
    slug: "menage-apres-travaux-meaux",
    requete: "Ménage après travaux à Meaux",
    libelleCourt: "Ménage après travaux",
    h1: "Ménage après travaux à Meaux",
    metaTitle: "Ménage après travaux à Meaux (77100) | MS Nettoyage",
    metaDescription:
      "Ménage après travaux à Meaux : retrait des traces de peinture, colle et enduit, dépoussiérage intégral, vitrerie et sols en plusieurs passes. Devis sous 24 h.",
    lede: "Le ménage après travaux est le nettoyage final qui rend un logement habitable après une rénovation : élimination des traces de peinture, de colle et d'enduit, et de la poussière fine déposée sur toutes les surfaces.",
    icon: "trowel",
    image: "/images/avant-apres-sejour-apres.jpg",
    inclus: [
      "Retrait des traces de peinture, colle, enduit et silicone",
      "Décollage des protections, adhésifs et étiquettes de chantier",
      "Dépoussiérage intégral, y compris plafonds, gaines et luminaires",
      "Nettoyage des vitres, châssis et rails de menuiserie",
      "Lavage des sols en plusieurs passes, jusqu'à disparition du voile de plâtre",
      "Nettoyage complet des sanitaires et de la cuisine neufs",
    ],
    pourQui: [
      "Particuliers en fin de rénovation à Meaux",
      "Artisans et maîtres d'œuvre avant livraison",
      "Architectes d'intérieur",
      "Agences immobilières avant mise en location",
    ],
    faits: [
      { label: "Passes de lavage", value: "2 à 3 selon l'empoussièrement" },
      { label: "Délai type", value: "1 journée pour 120 m²" },
      { label: "Objectif", value: "Local livrable en l'état" },
    ],
    corps: [
      "La poussière de plâtre et de ponçage est extrêmement fine : elle reste en suspension et se redépose plusieurs heures après le premier lavage. C'est la raison pour laquelle un ménage après travaux sérieux comporte toujours plusieurs passes, du haut vers le bas, et se termine par les sols. Une seule passe donne un résultat qui se dégrade dans la journée.",
      "Les traces de peinture et de colle se retirent mécaniquement, avec des grattoirs adaptés à chaque support. C'est là que se concentrent les dégâts quand l'opération est confiée à des non-professionnels : sur du verre, un mauvais geste raye la vitre définitivement ; sur une menuiserie laquée, un solvant trop agressif ternit la finition sans retour possible.",
      "Nous intervenons une fois les corps de métier partis et le gros des gravats évacué. Si l'évacuation reste à faire, la prestation relève d'abord du nettoyage de fin de chantier, que nous réalisons également. Quand les deux sont commandés ensemble, nous les planifions à 24 ou 48 h d'intervalle pour laisser la poussière retomber.",
      "Cette prestation est fréquemment commandée avant un état des lieux de sortie ou une livraison. Nous savons donc travailler avec une date butoir : le créneau est confirmé par écrit et tenu.",
    ],
    faq: [
      {
        question: "Quelle est la différence entre ménage après travaux et fin de chantier ?",
        answer:
          "Le nettoyage de fin de chantier est la première passe : il évacue les résidus et dégage les surfaces juste après le départ des corps de métier. Le ménage après travaux vient ensuite et rend le local livrable : retrait des traces de peinture et de colle, dépoussiérage fin, vitrerie, lavage des sols en plusieurs passes.",
      },
      {
        question: "Combien de temps faut-il pour un ménage après travaux ?",
        answer:
          "Comptez une journée complète pour un logement de 120 m². Le facteur déterminant n'est pas la surface mais l'empoussièrement : un chantier de peinture se traite plus vite qu'une dépose de cloisons, à surface égale.",
      },
      {
        question: "Intervenez-vous avant un état des lieux ?",
        answer:
          "Oui, c'est un cas fréquent. Indiquez-nous la date de l'état des lieux à la demande de devis : nous planifions l'intervention pour qu'elle se termine la veille, ce qui laisse le temps de traiter un éventuel point de reprise.",
      },
    ],
  },
  {
    slug: "menage-apres-demenagement-meaux",
    requete: "Ménage après déménagement à Meaux",
    libelleCourt: "Ménage après déménagement",
    h1: "Ménage après déménagement à Meaux",
    metaTitle: "Ménage après déménagement à Meaux | MS Nettoyage",
    metaDescription:
      "Ménage après déménagement à Meaux : logement vide nettoyé de fond en comble avant l'état des lieux. Placards, sanitaires, sols et vitres. Devis sous 24 h.",
    lede: "Le ménage après déménagement est le nettoyage complet d'un logement vidé de ses meubles, réalisé avant l'état des lieux de sortie ou avant l'emménagement des occupants suivants.",
    icon: "sparkle",
    image: "/images/cas-apres-travaux.jpg",
    inclus: [
      "Nettoyage intérieur et extérieur de tous les placards et rangements",
      "Dégraissage complet de la cuisine et de l'électroménager laissé sur place",
      "Détartrage des sanitaires et des parois de douche",
      "Traces de meubles, plinthes, encadrements et interrupteurs",
      "Vitres, rebords et rails de fenêtre",
      "Lavage des sols, méthode adaptée à chaque revêtement",
    ],
    pourQui: [
      "Locataires sortants avant état des lieux",
      "Propriétaires entre deux locataires",
      "Nouveaux arrivants avant emménagement",
      "Agences immobilières et syndics",
    ],
    faits: [
      { label: "Moment idéal", value: "Logement entièrement vidé" },
      { label: "Durée type", value: "3 à 6 h pour un T3" },
      { label: "Objectif", value: "Restitution sans retenue" },
    ],
    corps: [
      "Un logement vide se nettoie beaucoup mieux qu'un logement meublé, et c'est tout l'intérêt de faire intervenir après le départ du camion plutôt qu'avant. Les zones habituellement inaccessibles deviennent traitables : derrière et sous l'électroménager, le fond des placards, les plinthes, les angles de pièce.",
      "L'enjeu financier est concret. Sur un état des lieux de sortie, la propreté est l'un des premiers motifs de retenue sur le dépôt de garantie, et l'un des plus faciles à contester quand le travail a été fait sérieusement. Un nettoyage professionnel coûte presque toujours moins cher que la retenue qu'il évite.",
      "Les points systématiquement vérifiés par un agent lors d'un état des lieux sont toujours les mêmes : l'intérieur du four, les joints de la salle de bains, le fond des placards, les traces de meubles au sol et l'état des vitres. Nous les traitons en priorité, parce que ce sont eux qui font la décision.",
      "Si vous le souhaitez, nous vous transmettons des photos du logement à la fin de l'intervention. Elles datent l'état de propreté à notre départ, ce qui vous protège en cas de désaccord ultérieur.",
    ],
    faq: [
      {
        question: "Quand faire le ménage après un déménagement ?",
        answer:
          "Une fois le logement entièrement vidé, et idéalement la veille de l'état des lieux. Un logement vide permet d'accéder aux zones habituellement masquées par les meubles et l'électroménager, là où se concentrent justement les remarques lors de l'état des lieux.",
      },
      {
        question: "Le ménage après déménagement évite-t-il une retenue sur la caution ?",
        answer:
          "La propreté est l'un des premiers motifs de retenue sur un dépôt de garantie. Un nettoyage professionnel documenté par des photos horodatées vous place en position solide en cas de désaccord, et coûte en général moins cher que la retenue qu'il évite.",
      },
      {
        question: "Nettoyez-vous l'intérieur du four et du réfrigérateur ?",
        answer:
          "Oui, l'électroménager laissé sur place est nettoyé intérieurement : four, plaques, réfrigérateur, lave-vaisselle et hotte. C'est l'un des points les plus systématiquement vérifiés lors d'un état des lieux de sortie.",
      },
    ],
  },
  {
    slug: "menage-airbnb-meaux",
    requete: "Ménage Airbnb à Meaux",
    libelleCourt: "Ménage Airbnb",
    h1: "Ménage Airbnb à Meaux",
    metaTitle: "Ménage Airbnb à Meaux (77100) | MS Nettoyage",
    metaDescription:
      "Ménage Airbnb à Meaux : rotation en 2 h entre deux séjours, changement du linge, réassort des consommables et compte rendu photo. Devis gratuit sous 24 h.",
    lede: "Le ménage Airbnb est une prestation de rotation entre deux séjours : nettoyage complet du logement, changement du linge, réapprovisionnement des consommables et remise en configuration d'accueil.",
    icon: "bed",
    image: "/images/cas-airbnb.jpg",
    inclus: [
      "Nettoyage complet du logement entre deux séjours",
      "Changement des draps et du linge de toilette",
      "Réassort des consommables : papier, savon, produits d'accueil",
      "Contrôle de l'équipement et signalement de toute dégradation",
      "Remise en configuration d'accueil, rangement et présentation",
      "Compte rendu photo horodaté après chaque rotation",
    ],
    pourQui: [
      "Propriétaires de locations courte durée à Meaux",
      "Conciergeries et gestionnaires de biens",
      "Résidences et appart-hôtels",
      "Loueurs saisonniers à proximité de la gare",
    ],
    faits: [
      { label: "Rotation", value: "2 h en moyenne" },
      { label: "Créneau", value: "Entre check-out et check-in" },
      { label: "Compte rendu", value: "Photos après chaque passage" },
    ],
    corps: [
      "La difficulté d'une rotation n'est pas le nettoyage lui-même, c'est la fenêtre horaire. Entre un départ à 11 h et une arrivée à 15 h, tout doit être fait, vérifié et remis en ordre. Nous comptons deux heures en moyenne pour un logement de type T2, et nous planifions les rotations à partir de votre calendrier de réservation, pas l'inverse.",
      "Le compte rendu photo protège les deux parties. Il date l'état du logement à la fin de notre intervention : en cas de litige avec un voyageur sur une dégradation, vous disposez d'une preuve horodatée, et nous d'une trace de ce qui a été livré.",
      "Nous signalons systématiquement ce qui sort de l'ordinaire : ampoule grillée, joint qui moisit, stock de consommables au plus bas, équipement qui commence à fatiguer. Traiter ces détails avant qu'un voyageur ne les mentionne est exactement ce qui préserve une note élevée sur la durée, bien plus qu'un nettoyage parfait le jour J.",
      "Meaux capte une clientèle de passage liée à la proximité de Paris et de l'aéroport de Roissy, avec des séjours courts et des rotations rapprochées. La régularité du prestataire compte donc davantage ici que sur un marché de longue durée.",
    ],
    faq: [
      {
        question: "Combien de temps prend une rotation Airbnb à Meaux ?",
        answer:
          "Deux heures en moyenne pour un logement de type T2, entre le check-out et le check-in. La rotation comprend le nettoyage complet, le changement du linge, le réassort des consommables et la remise en configuration d'accueil.",
      },
      {
        question: "Gérez-vous le linge de la location ?",
        answer:
          "Le changement des draps et du linge de toilette est compris. La fourniture et le lavage du linge peuvent être pris en charge en option, ou rester à votre charge si vous avez déjà un prestataire. Les deux formules sont chiffrées séparément.",
      },
      {
        question: "Que se passe-t-il si un voyageur a dégradé quelque chose ?",
        answer:
          "Nous vous le signalons immédiatement, photos à l'appui, avant l'arrivée du voyageur suivant. Le compte rendu horodaté de chaque rotation vous permet d'établir à quel moment la dégradation est survenue, ce qui est déterminant en cas de réclamation.",
      },
    ],
  },
] as const;

/** Retrouve une page d'atterrissage par son slug. */
export function getLanding(slug: string): Landing | undefined {
  return landings.find((landing) => landing.slug === slug);
}

/** Slugs de toutes les pages, pour `generateStaticParams` et le sitemap. */
export const landingSlugs = landings.map((landing) => landing.slug);
