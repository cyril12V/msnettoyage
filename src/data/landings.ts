import type { IconName } from "@/components/ui/Icon";

/**
 * Pages de prestation.
 *
 * Chacune vise UNE requête précise, formulée telle que le client la tape dans
 * Google : « nettoyage fin de chantier paris », « nettoyage bureau paris ».
 *
 * Quatre règles gouvernent ce fichier :
 *
 *  1. **Une requête, une page.** Deux pages qui visent le même mot-clé se
 *     cannibalisent : Google en retient une, arbitrairement, et les deux
 *     reculent. Les intitulés ci-dessous sont donc volontairement disjoints.
 *  2. **Le mot-clé dans l'URL, le titre et le H1.** C'est le signal le plus
 *     simple et le plus lisible pour un moteur.
 *  3. **Pas de ville dans le slug.** Une URL `/nettoyage-maison-meaux` ne peut
 *     pas remonter sur « nettoyage maison Paris » : elle annonce d'elle-même
 *     qu'elle parle d'ailleurs. La géographie est portée par les pages villes
 *     de `villes.ts`, ces pages-ci portent la prestation.
 *  4. **Aucun contenu recopié d'une page à l'autre.** Du texte dupliqué sur
 *     plusieurs pages les fait toutes redescendre. Un test le vérifie.
 *
 * Les anciennes URLs suffixées `-meaux` sont redirigées en 301 dans
 * `next.config.ts` : elles ne doivent jamais réapparaître ici.
 */

export type Landing = {
  /** Slug, donc URL. Contient le mot-clé, jamais la ville. */
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
  /**
   * Section tarifaire.
   *
   * « Combien ça coûte » est la première question de tout visiteur et l'une des
   * plus tapées dans Google. Une page qui ne la traite pas laisse partir le
   * visiteur chez un concurrent qui, lui, y répond.
   *
   * Aucun barème n'est publié : l'entreprise chiffre sur devis, et inventer une
   * grille tarifaire qui ne serait pas appliquée serait une annonce trompeuse.
   * Ce qui est publié, c'est ce qui fait réellement le prix, ce qui a plus de
   * valeur pour le lecteur qu'un « à partir de » invérifiable.
   */
  tarification: {
    /** Question posée en H2, formulée comme elle est tapée. */
    question: string;
    /** Réponse directe et autonome, placée juste après le H2. */
    reponse: string;
    /** Ce qui fait varier le prix, du plus au moins déterminant. */
    facteurs: readonly { label: string; effet: string }[];
  };
  /** Questions propres à cette prestation, balisées en FAQPage. */
  faq: readonly { question: string; answer: string }[];
  /** Visuel de la page, si disponible. */
  image?: string;
};

export const landings: readonly Landing[] = [
  {
    slug: "nettoyage-maison",
    requete: "Nettoyage de maison à Paris et en Île-de-France",
    libelleCourt: "Nettoyage de maison",
    h1: "Nettoyage de maison à Paris et en Île-de-France",
    metaTitle: "Nettoyage de maison Paris & Île-de-France | MS Nettoyages",
    metaDescription:
      "Nettoyage de maison et d'appartement à Paris et en Île-de-France : grand ménage complet, dégraissage cuisine, détartrage, vitres et sols. Devis sous 24 h.",
    lede: "Le nettoyage de maison est une intervention complète qui traite toutes les pièces d'un logement en une seule fois : cuisine, sanitaires, chambres, sols et vitres. MS Nettoyages l'assure à Paris, en petite couronne et dans toute l'Île-de-France.",
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
      "Maisons individuelles et pavillons de grande couronne",
      "Appartements parisiens et de petite couronne",
      "Propriétaires occupants souhaitant une remise à niveau",
      "Logements restés fermés plusieurs semaines",
      "Familles avant ou après une réception",
    ],
    faits: [
      { label: "Durée type", value: "3 à 7 h pour 100 m²" },
      { label: "Matériel", value: "Fourni par nos soins" },
      { label: "Format", value: "Ponctuel ou récurrent" },
    ],
    corps: [
      "Une maison se nettoie du haut vers le bas et des pièces sèches vers les pièces d'eau. Cet ordre n'est pas une habitude : il évite de redéposer de la poussière sur ce qui vient d'être lavé, et de transporter l'humidité de la salle de bains vers les chambres. C'est ce qui fait la différence entre un logement propre deux heures et un logement propre une semaine.",
      "Le poste le plus long est presque toujours la cuisine. La graisse de cuisson se dépose en couches successives sur la hotte, la crédence et le dessus des meubles hauts, à un endroit que personne ne regarde au quotidien. Il faut un dégraissant adapté et du temps de pose, pas de l'huile de coude : frotter à sec sur une crédence laquée la raye définitivement.",
      "Le parc francilien impose des méthodes différentes selon les secteurs. Dans Paris et la petite couronne, l'immeuble haussmannien concentre parquets à points de Hongrie, moulures, cheminées en marbre et double rideau : autant de supports qui ne tolèrent ni l'eau en excès ni les produits universels. En grande couronne, le pavillon des années 1970 à 1990 mélange carrelage au rez-de-chaussée et parquet flottant à l'étage. Un parquet flottant lavé à grande eau gonfle aux joints, et le dommage est irréversible.",
      "Nous établissons le devis à partir de la surface, du nombre de pièces d'eau et de l'état de départ, que vous pouvez nous décrire par téléphone ou nous montrer en photos. Aucun déplacement n'est facturé pour chiffrer, où que vous soyez en Île-de-France.",
    ],
    tarification: {
      question: "Combien coûte un nettoyage de maison à Paris et en Île-de-France ?",
      reponse:
        "Le nettoyage de maison se chiffre sur devis, à partir de la surface, du nombre de pièces d'eau et de l'état de départ. MS Nettoyages transmet un devis gratuit sous 24 h, établi sur description ou sur photos, sans visite obligatoire et sans frais de déplacement pour chiffrer.",
      facteurs: [
        {
          label: "Surface et nombre de pièces",
          effet:
            "C'est la base du calcul, mais le nombre de pièces pèse davantage que les mètres carrés : quatre petites pièces prennent plus de temps qu'un plateau de même surface.",
        },
        {
          label: "Nombre de pièces d'eau",
          effet:
            "Cuisine et salles de bains concentrent l'essentiel du temps passé. Une salle de bains supplémentaire compte plus que vingt mètres carrés de séjour.",
        },
        {
          label: "État de départ",
          effet:
            "Un logement entretenu régulièrement se traite deux fois plus vite qu'un logement laissé plusieurs mois. C'est le facteur qui fait les plus gros écarts de devis.",
        },
        {
          label: "Accès et étage",
          effet:
            "À Paris et en petite couronne, un étage élevé sans ascenseur allonge réellement l'intervention. Il est chiffré au devis, jamais ajouté après coup.",
        },
        {
          label: "Fréquence",
          effet:
            "Un passage récurrent se facture moins cher qu'une intervention unique, à prestation identique : le logement reste en meilleur état d'une fois sur l'autre.",
        },
      ],
    },
    faq: [
      {
        question: "Faut-il être présent pendant le nettoyage de la maison ?",
        answer:
          "Non. Beaucoup de clients nous confient un jeu de clés ou un code d'accès. Nous convenons du créneau par écrit avant l'intervention et nous vous confirmons la fin des travaux. Vous pouvez évidemment être présent si vous le préférez.",
      },
      {
        question: "Le nettoyage de maison comprend-il les vitres ?",
        answer:
          "Oui, les vitres accessibles depuis l'intérieur sans nacelle ni échafaudage sont comprises, ainsi que les rebords et les rails de fenêtre. Les vitres en hauteur ou en façade font l'objet d'un devis distinct, comme les verrières et les baies d'immeuble.",
      },
      {
        question: "Intervenez-vous dans les appartements parisiens sans ascenseur ?",
        answer:
          "Oui. L'étage et l'absence d'ascenseur sont pris en compte au moment du devis, pas découverts sur place : ils allongent le temps de montée du matériel, en particulier pour un nettoyage en profondeur qui mobilise une monobrosse ou un injecteur-extracteur. Signalez-le à la demande, le chiffrage en tient compte.",
      },
    ],
  },
  {
    slug: "nettoyage-bureau",
    requete: "Nettoyage de bureaux à Paris et en Île-de-France",
    libelleCourt: "Nettoyage de bureaux",
    h1: "Nettoyage de bureaux à Paris et en Île-de-France",
    metaTitle: "Nettoyage de bureaux Paris & Île-de-France | MS Nettoyages",
    metaDescription:
      "Nettoyage de bureaux à Paris et en Île-de-France : entretien hors heures d'ouverture, sanitaires, espaces de restauration et postes de travail. Devis sous 24 h.",
    lede: "Le nettoyage de bureaux est un contrat d'entretien récurrent réalisé en dehors des heures d'activité, afin de ne gêner ni vos équipes ni vos visiteurs. MS Nettoyages intervient dans les bureaux et locaux professionnels de Paris et de toute l'Île-de-France.",
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
      "PME, startups et cabinets du quartier central des affaires",
      "Professions libérales et cabinets médicaux",
      "Espaces de coworking et sièges sociaux",
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
      "Les immeubles de bureaux franciliens, en particulier dans le quartier central des affaires, à La Défense et sur les axes tertiaires du 92 et du 93, imposent des règles d'accès strictes : badge nominatif, enregistrement préalable des intervenants au poste de sécurité, plages horaires fixées par le gestionnaire de l'immeuble, parfois obligation de passer par le monte-charge. Nous fournissons la liste nominative de nos intervenants et leurs justificatifs au démarrage du contrat, ce qui évite de perdre une intervention sur un refus d'accès.",
      "Nous affectons les mêmes intervenants à votre site. Ils connaissent la configuration des lieux, l'alarme, les codes d'accès et les zones sensibles, ce qui réduit le temps d'intervention et rend le résultat régulier d'une semaine sur l'autre. Tous sont déclarés, et l'entreprise est couverte par une assurance responsabilité civile professionnelle.",
    ],
    tarification: {
      question: "Combien coûte le nettoyage de bureaux à Paris ?",
      reponse:
        "Un contrat de nettoyage de bureaux se chiffre au mètre carré et à la fréquence, jamais au forfait. MS Nettoyages établit le devis à partir d'un cahier des charges écrit, annexé au contrat, et le transmet gratuitement sous 24 h.",
      facteurs: [
        {
          label: "Surface et configuration",
          effet:
            "Un open space se traite plus vite qu'un même nombre de mètres carrés découpé en bureaux individuels et en salles de réunion.",
        },
        {
          label: "Fréquence des passages",
          effet:
            "De un à cinq passages hebdomadaires. C'est le paramètre qui pèse le plus sur le montant mensuel, et celui qui se révise le plus facilement en cours de contrat.",
        },
        {
          label: "Sanitaires et restauration",
          effet:
            "Le nombre de sanitaires et la présence d'un espace de restauration comptent davantage que la surface : ce sont les postes traités à chaque passage sans exception.",
        },
        {
          label: "Densité d'occupation",
          effet:
            "Trente personnes sur 200 m² salissent plus que dix. Le nombre de postes de travail est demandé au chiffrage.",
        },
        {
          label: "Contraintes d'accès",
          effet:
            "Badge nominatif, enregistrement au poste de sécurité, plage horaire imposée par le gestionnaire : ces formalités prennent du temps et sont intégrées au prix.",
        },
      ],
    },
    faq: [
      {
        question: "À quelle heure intervenez-vous dans les bureaux ?",
        answer:
          "Avant l'ouverture ou après la fermeture, selon ce qui vous arrange. Le créneau le plus courant se situe entre 18 h et 21 h : les locaux sont vides, l'intervention est plus rapide et vos équipes retrouvent des bureaux propres le lendemain matin. Un passage matinal avant 8 h est possible sur les sites qui l'imposent.",
      },
      {
        question: "Faut-il un engagement de durée pour un contrat de bureaux ?",
        answer:
          "Non. Les contrats d'entretien de bureaux de MS Nettoyages sont sans durée minimale et résiliables avec un préavis d'un mois. La fréquence des passages peut être modifiée en cours de contrat pour s'adapter à votre activité.",
      },
      {
        question: "Fournissez-vous les consommables sanitaires ?",
        answer:
          "Oui, sur demande. Papier toilette, essuie-mains et savon peuvent être inclus au contrat et réapprovisionnés à chaque passage, ou rester à votre charge si vous avez déjà un fournisseur. Les deux formules sont chiffrées séparément dans le devis.",
      },
    ],
  },
  {
    slug: "menage-particulier",
    requete: "Ménage chez le particulier à Paris et en Île-de-France",
    libelleCourt: "Ménage particulier",
    h1: "Ménage chez le particulier à Paris et en Île-de-France",
    metaTitle: "Ménage particulier Paris & Île-de-France | MS Nettoyages",
    metaDescription:
      "Service de ménage à domicile à Paris et en Île-de-France : passage hebdomadaire ou bimensuel, même intervenant, matériel et produits fournis. Devis sous 24 h.",
    lede: "Le ménage chez le particulier est un service de ménage à domicile récurrent, assuré par le même intervenant à chaque passage, selon un rythme défini avec vous : hebdomadaire, bimensuel ou mensuel.",
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
      "Actifs et familles d'Île-de-France",
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
      "Avoir le même intervenant à chaque passage change concrètement le résultat. Il sait où sont les produits, quels supports sont fragiles, ce que vous voulez qu'on ne déplace pas, et il repère ce qui a changé depuis la dernière fois. Un roulement d'intervenants oblige à tout réexpliquer et fait retomber la qualité à chaque changement. C'est la principale différence entre une entreprise de nettoyage et une plateforme de mise en relation, où l'intervenant change au gré des disponibilités.",
      "Nous venons avec notre matériel et nos produits professionnels. Si vous préférez que l'on utilise vos propres produits, pour une allergie, un label écologique ou une exigence particulière, il suffit de le préciser à la demande de devis : c'est sans supplément.",
      "Les prestations chez le particulier peuvent ouvrir droit à un avantage fiscal au titre des services à la personne, sous réserve que le prestataire soit déclaré pour cette activité. Nous vous indiquons précisément ce qu'il en est lors de l'établissement du devis, sans promesse en l'air.",
    ],
    tarification: {
      question: "Combien coûte un service de ménage à domicile à Paris ?",
      reponse:
        "Le ménage chez le particulier se facture à l'heure de présence, avec un nombre d'heures fixé à l'avance selon le logement et le rythme retenu. MS Nettoyages fournit le matériel et les produits, et le tarif reste stable pendant toute la durée du contrat.",
      facteurs: [
        {
          label: "Durée du passage",
          effet:
            "Deux à quatre heures selon la surface et le rythme. C'est la durée, pas la surface, qui détermine le montant.",
        },
        {
          label: "Rythme retenu",
          effet:
            "Hebdomadaire, bimensuel ou mensuel. Un rythme espacé demande plus d'heures par passage, ce qui annule souvent l'économie attendue.",
        },
        {
          label: "Repassage",
          effet:
            "Chiffré séparément et à l'heure : il n'entre jamais dans le forfait ménage, faute de quoi c'est lui qui déborde sur le reste.",
        },
        {
          label: "Statut fiscal",
          effet:
            "Les prestations de services à la personne peuvent ouvrir droit à un avantage fiscal, sous réserve que le prestataire soit déclaré pour cette activité. Nous précisons ce qu'il en est au devis.",
        },
      ],
    },
    faq: [
      {
        question: "Quelle différence entre une femme de ménage et un service de ménage ?",
        answer:
          "Une femme de ménage employée en direct est votre salariée : vous gérez le contrat, les cotisations, les congés et le remplacement en cas d'absence. Avec un service de ménage comme MS Nettoyages, vous signez une prestation : l'entreprise emploie, déclare et assure l'intervenant, fournit le matériel et organise le remplacement. Le coût horaire est plus élevé, la charge administrative est nulle.",
      },
      {
        question: "Faut-il fournir les produits de ménage ?",
        answer:
          "Non. MS Nettoyages vient avec son matériel et ses produits professionnels, adaptés à chaque type de support. Si vous souhaitez que l'on utilise vos propres produits, pour une allergie ou une préférence écologique, précisez-le à la demande de devis : c'est sans supplément.",
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
    slug: "nettoyage-fin-de-chantier-paris",
    requete: "Nettoyage de fin de chantier à Paris et en Île-de-France",
    libelleCourt: "Fin de chantier",
    h1: "Nettoyage fin de chantier à Paris et en Île-de-France",
    metaTitle: "Nettoyage fin de chantier Paris & IDF | MS Nettoyages",
    metaDescription:
      "Nettoyage fin de chantier à Paris et en Île-de-France : évacuation des résidus, dépoussiérage intégral, vitrerie et sols. Intervention possible sous 48 h.",
    lede: "Le nettoyage de fin de chantier est l'intervention qui rend un local livrable après des travaux : évacuation des résidus, retrait des traces de peinture, de colle et d'enduit, et élimination de la poussière fine déposée sur toutes les surfaces.",
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
      "Entreprises du bâtiment et artisans franciliens",
      "Maîtres d'œuvre et conducteurs de travaux avant livraison",
      "Architectes d'intérieur et décorateurs",
      "Particuliers en fin de rénovation",
      "Agences immobilières avant mise en location",
    ],
    faits: [
      { label: "Passes de lavage", value: "2 à 3 selon l'empoussièrement" },
      { label: "Délai type", value: "1 journée pour 120 m²" },
      { label: "Objectif", value: "Local livrable en l'état" },
    ],
    corps: [
      "La poussière de plâtre et de ponçage est extrêmement fine : elle reste en suspension et se redépose plusieurs heures après le premier lavage. C'est la raison pour laquelle un nettoyage de fin de chantier sérieux comporte toujours plusieurs passes, du haut vers le bas, et se termine par les sols. Une seule passe donne un résultat qui se dégrade dans la journée, et c'est exactement ce que voit le client à la réception.",
      "Les traces de peinture et de colle se retirent mécaniquement, avec des grattoirs adaptés à chaque support. C'est là que se concentrent les dégâts quand l'opération est confiée à des non-professionnels : sur du verre, un mauvais geste raye la vitre définitivement ; sur une menuiserie laquée, un solvant trop agressif ternit la finition sans retour possible. Le coût du remplacement dépasse toujours celui de la prestation.",
      "En Île-de-France, la contrainte dominante n'est pas technique mais logistique. Dans Paris intra-muros, il faut composer avec le stationnement réglementé, les autorisations de voirie déjà expirées à la fin du chantier, les cages d'escalier étroites et les copropriétés qui interdisent le passage du matériel après 18 h. Nous calons le créneau et l'accès au moment du devis, pas le matin de l'intervention.",
      "Nous intervenons une fois les corps de métier partis. Sur un chantier lourd, la prestation commence par l'évacuation des gravats et des débris résiduels, avant tout nettoyage : laver un sol encore encombré ne sert à rien. Sur une rénovation légère, cette étape disparaît et l'intervention démarre directement au dépoussiérage. Cette prestation est fréquemment commandée avant une réception de travaux ou un état des lieux, avec une date butoir : le créneau est confirmé par écrit et tenu.",
    ],
    tarification: {
      question: "Combien coûte un nettoyage de fin de chantier à Paris ?",
      reponse:
        "Le nettoyage de fin de chantier se chiffre au mètre carré, majoré selon l'empoussièrement et l'accessibilité du site. MS Nettoyages transmet un devis gratuit sous 24 h et confirme le créneau par écrit, une intervention sous 48 h restant possible selon nos disponibilités.",
      facteurs: [
        {
          label: "Nature du chantier",
          effet:
            "C'est le premier facteur, loin devant la surface. Une reprise de peinture se traite deux fois plus vite qu'une dépose de cloisons, à mètres carrés égaux.",
        },
        {
          label: "Nombre de passes nécessaires",
          effet:
            "Deux à trois passes selon l'empoussièrement. La poussière de ponçage se redépose plusieurs heures après le premier lavage : une seule passe ne tient pas la journée.",
        },
        {
          label: "Surface vitrée",
          effet:
            "Châssis, rails et menuiseries neuves demandent un traitement mécanique long. Un local très vitré change nettement le chiffrage.",
        },
        {
          label: "Accessibilité",
          effet:
            "Étage sans ascenseur, stationnement impossible, monte-charge à réserver : à Paris intra-muros, ces contraintes pèsent autant que la surface.",
        },
        {
          label: "Délai imposé",
          effet:
            "Une livraison à date fixe peut demander plusieurs intervenants en parallèle. Nous l'annonçons au devis plutôt que de promettre une date intenable.",
        },
      ],
    },
    faq: [
      {
        question: "Quelle est la différence entre ménage après travaux et fin de chantier ?",
        answer:
          "Le ménage après travaux désigne le nettoyage final d'un logement après rénovation légère (peinture, pose de carrelage). Le nettoyage fin de chantier intervient après des travaux lourds (gros œuvre, démolition) et inclut l'évacuation des gravats et débris en plus du nettoyage approfondi. MS Nettoyages réalise les deux prestations en Île-de-France.",
      },
      {
        question: "Combien de temps faut-il pour un nettoyage fin de chantier ?",
        answer:
          "La durée dépend de la surface et de l'état du chantier. Pour un appartement de 50 m², comptez 4 à 6 heures. Pour un plateau de bureaux de 200 m², une journée complète avec une équipe de 2 à 3 personnes. Nous confirmons la durée estimée lors du devis.",
      },
      {
        question: "Intervenez-vous avant un état des lieux ?",
        answer:
          "Oui. Nous sommes habitués à intervenir avec une date butoir. Le créneau est confirmé par écrit et tenu. Nous intervenons dans tout Paris et l'Île-de-France.",
      },
      {
        question: "Intervenez-vous dans tout Paris et l'Île-de-France ?",
        answer:
          "Oui, MS Nettoyages intervient dans les 20 arrondissements de Paris ainsi que dans toute l'Île-de-France : Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d'Oise (95).",
      },
      {
        question: "Quand commander le nettoyage fin de chantier ?",
        answer:
          "Idéalement 48 à 72 heures avant la date de livraison ou d'état des lieux. Nous acceptons les demandes urgentes sous 24 h selon disponibilité. Contactez-nous pour un devis gratuit.",
      },
    ],
  },
  {
    slug: "menage-apres-demenagement",
    requete: "Ménage après déménagement à Paris et en Île-de-France",
    libelleCourt: "Après déménagement",
    h1: "Ménage après déménagement à Paris et en Île-de-France",
    metaTitle: "Ménage après déménagement Paris & IDF | MS Nettoyages",
    metaDescription:
      "Ménage après déménagement à Paris et en Île-de-France : logement vide nettoyé de fond en comble avant l'état des lieux de sortie. Devis gratuit sous 24 h.",
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
      "Agences immobilières et syndics franciliens",
    ],
    faits: [
      { label: "Moment idéal", value: "Logement entièrement vidé" },
      { label: "Durée type", value: "3 à 6 h pour un T3" },
      { label: "Objectif", value: "Restitution sans retenue" },
    ],
    corps: [
      "Un logement vide se nettoie beaucoup mieux qu'un logement meublé, et c'est tout l'intérêt de faire intervenir après le départ du camion plutôt qu'avant. Les zones habituellement inaccessibles deviennent traitables : derrière et sous l'électroménager, le fond des placards, les plinthes, les angles de pièce.",
      "L'enjeu financier est concret, et il l'est particulièrement en Île-de-France où les dépôts de garantie atteignent des montants élevés. Sur un état des lieux de sortie, la propreté est l'un des premiers motifs de retenue, et l'un des plus faciles à contester quand le travail a été fait sérieusement. Un nettoyage professionnel coûte presque toujours moins cher que la retenue qu'il évite.",
      "Les points systématiquement vérifiés par un agent lors d'un état des lieux sont toujours les mêmes : l'intérieur du four, les joints de la salle de bains, le fond des placards, les traces de meubles au sol et l'état des vitres. Nous les traitons en priorité, parce que ce sont eux qui font la décision.",
      "Si vous le souhaitez, nous vous transmettons des photos du logement à la fin de l'intervention. Elles datent l'état de propreté à notre départ, ce qui vous protège en cas de désaccord ultérieur avec le bailleur ou l'agence.",
    ],
    tarification: {
      question: "Combien coûte un ménage après déménagement en Île-de-France ?",
      reponse:
        "Le ménage après déménagement se chiffre sur la surface et l'état de départ du logement vidé. MS Nettoyages établit un devis gratuit sous 24 h et le compare volontiers au montant de la retenue qu'il évite : c'est presque toujours l'argument décisif.",
      facteurs: [
        {
          label: "Surface et nombre de pièces",
          effet:
            "Un T3 se traite en trois à six heures. Le logement étant vide, le rendement est meilleur qu'à surface équivalente en logement meublé.",
        },
        {
          label: "Électroménager laissé sur place",
          effet:
            "Four, plaques, réfrigérateur et hotte sont les postes les plus longs et les plus systématiquement vérifiés à l'état des lieux.",
        },
        {
          label: "État des sols et des murs",
          effet:
            "Traces de meubles, adhésifs, marques de fixation : leur retrait relève parfois de la remise en état et non du nettoyage, ce qui est signalé avant intervention.",
        },
        {
          label: "Délai avant l'état des lieux",
          effet:
            "Une intervention calée la veille se planifie sans surcoût. Une demande à traiter le jour même dépend de nos disponibilités.",
        },
      ],
    },
    faq: [
      {
        question: "Quand faire le ménage après un déménagement ?",
        answer:
          "Une fois le logement entièrement vidé, et idéalement la veille de l'état des lieux. Un logement vide permet d'accéder aux zones habituellement masquées par les meubles et l'électroménager, là où se concentrent justement les remarques lors de l'état des lieux.",
      },
      {
        question: "Le ménage avant l'état des lieux évite-t-il une retenue sur la caution ?",
        answer:
          "La propreté est l'un des premiers motifs de retenue sur un dépôt de garantie. Un nettoyage professionnel documenté par des photos horodatées vous place en position solide en cas de désaccord, et coûte en général moins cher que la retenue qu'il évite. En Île-de-France, où les loyers et donc les dépôts sont élevés, l'écart est encore plus net.",
      },
      {
        question: "Nettoyez-vous l'intérieur du four et du réfrigérateur ?",
        answer:
          "Oui, l'électroménager laissé sur place est nettoyé intérieurement : four, plaques, réfrigérateur, lave-vaisselle et hotte. C'est l'un des points les plus systématiquement vérifiés lors d'un état des lieux de sortie.",
      },
      {
        question: "Intervenez-vous le jour même du déménagement ?",
        answer:
          "Oui, à condition que le logement soit vidé au moment de notre arrivée. Le cas le plus courant en Île-de-France est un déménagement le matin et notre passage l'après-midi, pour un état des lieux le lendemain. Prévenez-nous du créneau à la demande de devis, nous réservons la plage.",
      },
    ],
  },
  {
    slug: "menage-airbnb",
    requete: "Ménage Airbnb à Paris et en Île-de-France",
    libelleCourt: "Ménage Airbnb",
    h1: "Ménage Airbnb à Paris et en Île-de-France",
    metaTitle: "Ménage Airbnb Paris & Île-de-France | MS Nettoyages",
    metaDescription:
      "Ménage Airbnb à Paris et en Île-de-France : rotation en 2 h entre deux séjours, changement du linge, réassort des consommables et compte rendu photo horodaté.",
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
      "Propriétaires de locations courte durée à Paris",
      "Conciergeries et gestionnaires de biens franciliens",
      "Résidences et appart-hôtels",
      "Loueurs saisonniers proches des gares et de Roissy",
    ],
    faits: [
      { label: "Rotation", value: "2 h en moyenne" },
      { label: "Créneau", value: "Entre check-out et check-in" },
      { label: "Compte rendu", value: "Photos après chaque passage" },
    ],
    corps: [
      "La difficulté d'une rotation n'est pas le nettoyage lui-même, c'est la fenêtre horaire. Entre un départ à 11 h et une arrivée à 15 h, tout doit être fait, vérifié et remis en ordre. Nous comptons deux heures en moyenne pour un logement de type T2, et nous planifions les rotations à partir de votre calendrier de réservation, pas l'inverse.",
      "Paris est le premier marché européen de la location courte durée, et c'est aussi celui où la contrainte réglementaire est la plus forte : plafond de 120 jours par an pour une résidence principale, numéro d'enregistrement obligatoire, contrôles municipaux réguliers. Un prestataire régulier, qui documente chaque passage, fait partie des éléments qui rendent une exploitation défendable.",
      "Le compte rendu photo protège les deux parties. Il date l'état du logement à la fin de notre intervention : en cas de litige avec un voyageur sur une dégradation, vous disposez d'une preuve horodatée, et nous d'une trace de ce qui a été livré.",
      "Nous signalons systématiquement ce qui sort de l'ordinaire : ampoule grillée, joint qui moisit, stock de consommables au plus bas, équipement qui commence à fatiguer. Traiter ces détails avant qu'un voyageur ne les mentionne est exactement ce qui préserve une note élevée sur la durée, bien plus qu'un nettoyage parfait le jour J.",
    ],
    tarification: {
      question: "Combien coûte un ménage Airbnb à Paris ?",
      reponse:
        "Le ménage Airbnb se facture à la rotation, avec un tarif fixe convenu à la signature et refacturable au voyageur via les frais de ménage de l'annonce. La prestation est donc neutre financièrement pour la plupart des hôtes.",
      facteurs: [
        {
          label: "Type de logement",
          effet:
            "Une heure trente pour un studio, deux heures pour un T2, trois heures pour un T4. Le nombre de couchages compte autant que la surface.",
        },
        {
          label: "Gestion du linge",
          effet:
            "Le changement des draps est compris. La fourniture et le lavage du linge sont une option, chiffrée séparément et facilement comparable à un blanchisseur.",
        },
        {
          label: "Fréquence des rotations",
          effet:
            "Un logement à forte rotation bénéficie d'un tarif plus favorable : le trajet est amorti et l'intervenant connaît déjà les lieux.",
        },
        {
          label: "Contrainte horaire",
          effet:
            "Une rotation à caler entre un check-out à 11 h et un check-in à 15 h mobilise un créneau réservé, qui ne peut pas être partagé avec une autre intervention.",
        },
      ],
    },
    faq: [
      {
        question: "Combien de temps prend une rotation Airbnb ?",
        answer:
          "Deux heures en moyenne pour un logement de type T2, entre le check-out et le check-in. La rotation comprend le nettoyage complet, le changement du linge, le réassort des consommables et la remise en configuration d'accueil. Un studio se traite en une heure trente, un T4 en trois heures.",
      },
      {
        question: "Gérez-vous le linge de la location ?",
        answer:
          "Le changement des draps et du linge de toilette est compris. La fourniture et le lavage du linge peuvent être pris en charge en option, ou rester à votre charge si vous avez déjà un prestataire. Les deux formules sont chiffrées séparément.",
      },
      {
        question: "Que se passe-t-il si un voyageur a dégradé quelque chose ?",
        answer:
          "Nous vous le signalons immédiatement, photos à l'appui, avant l'arrivée du voyageur suivant. Le compte rendu horodaté de chaque rotation vous permet d'établir à quel moment la dégradation est survenue, ce qui est déterminant en cas de réclamation auprès de la plateforme.",
      },
    ],
  },
] as const;

/** Retrouve une page de prestation par son slug. */
export function getLanding(slug: string): Landing | undefined {
  return landings.find((landing) => landing.slug === slug);
}

/** Slugs de toutes les pages, pour `generateStaticParams` et le sitemap. */
export const landingSlugs = landings.map((landing) => landing.slug);
