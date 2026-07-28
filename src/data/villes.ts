/**
 * Pages villes.
 *
 * Google rattache chaque page à une zone géographique. Pour ressortir sur
 * « nettoyage Chelles » ou « entreprise de nettoyage Créteil », il faut une page
 * qui parle de cette ville, pas une page d'Île-de-France où la ville est citée
 * dans une liste.
 *
 * Trois règles, non négociables :
 *
 *  1. **Aucun gabarit rempli par chercher-remplacer.** Une page ville produite
 *     en remplaçant « Meaux » par « Chelles » est une page satellite : Google
 *     les identifie depuis 2012 et les désindexe par paquets. Chaque entrée
 *     ci-dessous décrit un parc immobilier, un tissu économique et des
 *     contraintes d'accès réels, propres à la commune.
 *  2. **Une ville, une page.** Les communes limitrophes sont citées dans
 *     `communesProches` et rattachées à la page de la ville-centre, elles n'ont
 *     pas de page à elles. Trente pages jumelles valent moins que dix pages
 *     denses.
 *  3. **La ville n'est pas seule dans le titre.** Le titre porte aussi
 *     l'intitulé de service que les gens tapent : « entreprise de nettoyage »,
 *     « société de nettoyage », « ménage ».
 *
 * `tests/villes.test.ts` verrouille l'unicité des textes et la longueur des
 * balises. Toute nouvelle ville doit être écrite, pas dupliquée.
 */

export type Ville = {
  /** Slug, donc URL : `/nettoyage-paris`. */
  slug: string;
  /** Nom de la commune, tel qu'il s'écrit. */
  nom: string;
  /** Numéro de département, affiché en badge. */
  departement: string;
  /** Code postal principal, affiché et publié dans le JSON-LD. */
  codePostal: string;
  /** Requête visée, telle qu'elle est tapée dans Google. */
  requete: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Définition autonome, citable hors contexte, qui nomme la ville. */
  lede: string;
  /** Quartiers et secteurs réellement desservis. */
  secteurs: readonly string[];
  /** Corps de page, propre à la commune. */
  corps: readonly string[];
  /** Prestations les plus demandées ici, et la raison locale. */
  prestationsPhares: readonly { slug: string; raison: string }[];
  /** Repères pratiques, affichés en encart. */
  faits: readonly { label: string; value: string }[];
  /** Questions propres à cette ville, balisées en FAQPage. */
  faq: readonly { question: string; answer: string }[];
  /** Communes limitrophes couvertes depuis cette page. */
  communesProches: readonly string[];
  /** Coordonnées de la commune, publiées dans le JSON-LD de la zone servie. */
  geo: { latitude: number; longitude: number };
  /** Commune d'implantation de l'entreprise. */
  base?: boolean;

  /**
   * Champs réservés à la page pilier.
   *
   * Seule Paris les renseigne aujourd'hui. Une page pilier vise les requêtes
   * les plus larges du secteur (« entreprise de nettoyage paris », 720
   * recherches par mois, « société de nettoyage paris », 590) : elle doit
   * couvrir l'offre entière plutôt qu'un angle, ce que ne fait aucune autre
   * page ville.
   *
   * Ils sont facultatifs pour que les onze autres communes gardent un gabarit
   * court, qui est le bon format pour une requête locale.
   */

  /** Résumé autonome en tête de page, extrait tel quel par les moteurs génératifs. */
  enBref?: string;
  /** Catalogue détaillé, une entrée par prestation, avec lien vers sa page. */
  servicesDetailles?: readonly {
    titre: string;
    texte: string;
    /** Slug de la page de prestation, si elle existe. */
    lien?: string;
    libelleLien?: string;
  }[];
  /** Arguments différenciants, développés. */
  pourquoiNous?: readonly { titre: string; texte: string }[];
  /** Sources externes citées, signal d'expertise pour Google comme pour les IA. */
  sources?: readonly { titre: string; url: string }[];
};

export const villes: readonly Ville[] = [
  {
    slug: "nettoyage-paris",
    nom: "Paris",
    departement: "75",
    codePostal: "75000",
    requete: "Entreprise de nettoyage à Paris",
    h1: "Entreprise de nettoyage à Paris",
    metaTitle: "Entreprise de nettoyage à Paris (75) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage à Paris : bureaux, appartements, fin de chantier et rotation Airbnb dans les 20 arrondissements. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages est une entreprise de nettoyage qui intervient dans les 20 arrondissements de Paris, principalement sur le nettoyage de bureaux, la rotation de locations courte durée et la remise en état de logements après travaux.",
    secteurs: [
      "Quartier central des affaires (8e, 9e, 2e)",
      "Opéra, Bourse et Grands Boulevards",
      "Marais et Bastille (3e, 4e, 11e)",
      "Gare du Nord et Gare de l'Est (10e)",
      "Batignolles et Clichy (17e)",
      "Montmartre et Pigalle (18e)",
      "Rive gauche : 5e, 6e, 7e, 14e, 15e",
      "Est parisien : 12e, 19e, 20e",
    ],
    corps: [
      "Nettoyer à Paris, c'est d'abord résoudre un problème d'accès. Le stationnement est réglementé partout, la livraison de matériel est cantonnée à des créneaux courts, beaucoup d'immeubles n'ont pas d'ascenseur au-delà du cinquième étage et l'accès à la cour ou au monte-charge dépend du gardien. Nous chiffrons ces contraintes au devis, à partir de trois informations que nous demandons systématiquement : l'étage, la présence d'un ascenseur et le mode d'accès à l'immeuble. Une intervention qui découvre un sixième sans ascenseur le jour même déborde toujours.",
      "Le bâti parisien impose ses méthodes. L'immeuble haussmannien concentre des supports qui ne pardonnent pas : parquet massif à points de Hongrie, moulures et rosaces en plâtre, marbre de cheminée, boiseries peintes à l'ancienne, tomettes. L'eau en excès sur un parquet massif ancien le fait griser, et un détartrant acide sur du marbre le mate en quelques secondes, sans retour possible. À l'inverse, les programmes récents des 13e, 17e et 19e arrondissements demandent surtout de la vitrerie et de l'entretien de parties communes.",
      "Deux marchés dominent notre activité parisienne. Le premier est le nettoyage de bureaux : le quartier central des affaires, l'Opéra et le Sentier concentrent des surfaces tertiaires où l'intervention se fait avant 8 h ou après 18 h, avec un badge nominatif enregistré au poste de sécurité de l'immeuble. Le second est la rotation de locations courte durée, très dense dans les 1er, 3e, 4e, 10e, 11e et 18e arrondissements, où la fenêtre entre un départ à 11 h et une arrivée à 15 h ne se négocie pas.",
      "Nous ne facturons pas de frais de déplacement sur Paris. Notre base est à Meaux, mais l'accès par l'A4 et le RER place l'essentiel de nos interventions parisiennes dans les créneaux du matin et de la soirée, précisément ceux que réclament les bureaux et les rotations.",
      "Les copropriétés parisiennes forment un marché à part. Beaucoup d'immeubles n'ont plus de gardien logé et confient les parties communes à un prestataire qui passe deux à trois fois par semaine : hall, escaliers, local à poubelles, sortie et rentrée des conteneurs aux jours de collecte. Le cahier des charges est établi par le syndic et voté en assemblée générale, ce qui impose un devis lisible ligne à ligne et comparable à celui d'un concurrent. Nous chiffrons sur un relevé du hall, du nombre de niveaux, de la cour et du local à poubelles, jamais au forfait.",
      "Nos délais dans la capitale dépendent du type de prestation. Une rotation de location courte durée se cale sur un calendrier de réservation connu des semaines à l'avance. Une intervention ponctuelle, grand ménage ou remise en état, se planifie sous deux à quatre jours ouvrés. Nous ne promettons pas l'intervention le jour même à Paris : entre le trajet et les contraintes d'accès, ce serait un engagement que nous ne tiendrions pas systématiquement, et un créneau annoncé puis manqué coûte plus cher qu'un délai annoncé franchement.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison:
          "Le tertiaire parisien impose des interventions hors heures d'activité et un accès badgé, que nous formalisons au démarrage du contrat.",
      },
      {
        slug: "menage-airbnb",
        raison:
          "Paris est le premier marché européen de la location courte durée : la rotation entre check-out et check-in y est la contrainte numéro un.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "La rénovation d'appartements anciens est constante à Paris, et la livraison se fait presque toujours à date imposée.",
      },
    ],
    faits: [
      { label: "Couverture", value: "20 arrondissements" },
      { label: "Déplacement", value: "Non facturé" },
      { label: "Créneaux", value: "Avant 8 h et après 18 h" },
    ],
    faq: [
      {
        question: "Intervenez-vous dans tous les arrondissements de Paris ?",
        answer:
          "Oui, du 1er au 20e. La densité de nos interventions est plus forte sur l'est et le centre, du 2e au 11e et du 17e au 20e, mais aucun arrondissement n'est exclu et aucun frais de déplacement n'est facturé dans Paris intra-muros.",
      },
      {
        question: "Comment se passe l'accès à un immeuble parisien sans gardien ?",
        answer:
          "Nous convenons du mode d'accès avant la première intervention : code de porte, boîte à clés, remise d'un jeu de clés contre décharge écrite, ou présence d'un contact sur place. Pour les contrats récurrents, la solution retenue est inscrite au contrat et les clés sont restituées à sa fin, également contre décharge.",
      },
      {
        question: "Combien coûte le nettoyage d'un appartement à Paris ?",
        answer:
          "Le devis dépend de la surface, du nombre de pièces d'eau, de l'état de départ et de l'accès. À surface égale, un sixième étage sans ascenseur se chiffre plus cher qu'un rez-de-chaussée : le temps de montée du matériel est réel. Le devis est gratuit, transmis sous 24 h et établi sur photos, sans visite préalable obligatoire.",
      },
      {
        question: "Proposez-vous des contrats d'entretien pour les commerces parisiens ?",
        answer:
          "Oui, boutiques, salons, cabinets et restaurants compris. Le passage se fait avant l'ouverture, du lundi au samedi selon vos jours d'activité. La vitrine, les sanitaires accessibles au public et les zones vues par la clientèle sont traités à chaque passage : ce sont les trois points sur lesquels un client juge la propreté d'un commerce en quelques secondes.",
      },
    ],
    communesProches: [
      "Levallois-Perret",
      "Neuilly-sur-Seine",
      "Clichy",
      "Saint-Ouen",
      "Pantin",
      "Le Pré-Saint-Gervais",
      "Charenton-le-Pont",
      "Ivry-sur-Seine",
    ],
    geo: { latitude: 48.8566, longitude: 2.3522 },
  },
  {
    slug: "nettoyage-meaux",
    nom: "Meaux",
    departement: "77",
    codePostal: "77100",
    base: true,
    requete: "Société de nettoyage à Meaux",
    h1: "Société de nettoyage à Meaux (77100)",
    metaTitle: "Société de nettoyage à Meaux (77100) | MS Nettoyages",
    metaDescription:
      "MS Nettoyages est implantée à Meaux : entretien de locaux, grand ménage, fin de chantier et ménage Airbnb à Meaux et dans le Pays de Meaux. Devis sous 24 h.",
    lede: "MS Nettoyages est une société de nettoyage implantée à Meaux (77100), au 2 square Courbet, qui intervient dans la ville et dans l'ensemble des communes du Pays de Meaux.",
    secteurs: [
      "Centre-ville et quartier de la cathédrale",
      "Beauval et Dunant",
      "Hôpital et Colisée",
      "Zone d'activité de Mareuil",
      "Quartier de la gare",
      "Villenoy et Chauconin-Neufmontiers",
    ],
    corps: [
      "Meaux est notre ville d'implantation, et cela change deux choses concrètes. La première est le délai : une demande formulée le matin peut être planifiée dans la journée ou le lendemain, y compris pour une urgence, ce que nous ne promettons nulle part ailleurs en Île-de-France. La seconde est le prix : aucun frais de déplacement n'est facturé sur Meaux et les communes limitrophes.",
      "Le tissu local mêle commerces de centre-ville, cabinets et professions libérales, copropriétés et logements en location. Nos interventions les plus fréquentes ici sont l'entretien régulier de commerces et de parties communes, et la remise en état de logements entre deux locataires. Le centre ancien, autour de la cathédrale Saint-Étienne et du Vieux Chapitre, compte beaucoup de logements en étage sans ascenseur et des surfaces atypiques, souvent mansardées.",
      "La proximité de Roissy et la ligne P vers Paris-Est font de Meaux une ville de passage : location courte durée près de la gare, séjours professionnels, arrivées et départs fréquents. Cela génère une demande constante de rotation et de nettoyage entre deux occupants, sur des créneaux serrés.",
      "Notre adresse et notre numéro publiés ici sont strictement les mêmes que sur notre fiche Google et sur les annuaires professionnels. Cette cohérence n'est pas cosmétique : c'est ce que Google vérifie pour décider quelles entreprises apparaissent dans le bloc local d'une recherche « entreprise de nettoyage près de chez moi ».",
      "Le nettoyage de fin de chantier occupe une place croissante dans notre activité meldoise. Le centre ancien fait l'objet de réhabilitations continues, et les quartiers de Beauval et du Colisée voient passer des campagnes de rénovation énergétique traitées par tranches d'immeubles. Ces opérations se terminent par une livraison à date fixe, ce qui nous vaut des interventions planifiées longtemps à l'avance et tenues sans marge de report.",
      "Nos contrats d'entretien meldois sont majoritairement de petite taille : un commerce nettoyé trois fois par semaine avant l'ouverture, un cabinet nettoyé deux fois, les parties communes d'une résidence de trente logements. C'est une échelle où le prestataire est identifiable et joignable, et où un changement d'intervenant se remarque immédiatement. Nous affectons donc la même personne à chaque site, y compris sur des passages d'une heure, et le remplacement en congés est préparé plutôt que subi.",
    ],
    prestationsPhares: [
      {
        slug: "menage-apres-demenagement",
        raison:
          "La rotation locative est forte sur Meaux, et l'état des lieux de sortie reste le premier motif de commande.",
      },
      {
        slug: "nettoyage-maison",
        raison:
          "Le pavillonnaire du Pays de Meaux demande des grands ménages complets, souvent saisonniers.",
      },
      {
        slug: "nettoyage-bureau",
        raison:
          "Cabinets, commerces et petites structures du centre-ville forment le gros de nos contrats d'entretien récurrents.",
      },
    ],
    faits: [
      { label: "Siège", value: "2 square Courbet, 77100" },
      { label: "Déplacement", value: "0 € sur Meaux" },
      { label: "Délai", value: "Souvent sous 24 h" },
    ],
    faq: [
      {
        question: "Où est située MS Nettoyages à Meaux ?",
        answer:
          "L'entreprise est établie au 2 square Courbet, 77100 Meaux. C'est l'adresse du siège, identique à celle publiée sur notre fiche Google Business Profile et sur nos documents commerciaux. Les demandes de devis se traitent par téléphone, par courriel ou via le formulaire du site, sans déplacement obligatoire.",
      },
      {
        question: "Facturez-vous des frais de déplacement autour de Meaux ?",
        answer:
          "Non, aucun frais de déplacement n'est facturé sur Meaux ni sur les communes limitrophes : Villenoy, Nanteuil-lès-Meaux, Mareuil-lès-Meaux, Trilport, Crégy-lès-Meaux, Chauconin-Neufmontiers, Poincy et Fublaines. Au-delà, le déplacement est intégré au prix de la prestation et annoncé dans le devis, jamais ajouté après coup.",
      },
      {
        question: "Pouvez-vous intervenir en urgence à Meaux ?",
        answer:
          "C'est la zone où c'est le plus souvent possible. Une demande formulée le matin peut être planifiée dans la journée ou le lendemain selon nos disponibilités. Appelez plutôt que d'écrire si le délai est contraint : nous vous répondons immédiatement sur la faisabilité.",
      },
      {
        question: "Travaillez-vous avec les agences immobilières de Meaux ?",
        answer:
          "Oui, sur la remise en état de logements entre deux locataires et sur le nettoyage avant visite. Les agences ont besoin d'un prestataire qui tienne une date et qui documente son passage : nous confirmons le créneau par écrit et transmettons des photos horodatées en fin d'intervention, ce qui sert directement au dossier de restitution.",
      },
    ],
    communesProches: [
      "Villenoy",
      "Nanteuil-lès-Meaux",
      "Mareuil-lès-Meaux",
      "Trilport",
      "Crégy-lès-Meaux",
      "Chauconin-Neufmontiers",
      "Poincy",
      "Fublaines",
      "Quincy-Voisins",
    ],
    geo: { latitude: 48.9603, longitude: 2.8783 },
  },
  {
    slug: "nettoyage-chelles",
    nom: "Chelles",
    departement: "77",
    codePostal: "77500",
    requete: "Entreprise de nettoyage à Chelles",
    h1: "Entreprise de nettoyage à Chelles (77500)",
    metaTitle: "Entreprise de nettoyage à Chelles (77500) | MS Nettoyages",
    metaDescription:
      "Nettoyage à Chelles : ménage de maison, entretien de bureaux, fin de chantier et remise en état avant état des lieux. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient à Chelles (77500), première commune de Seine-et-Marne par sa population, pour le ménage de maison, l'entretien de locaux professionnels et la remise en état de logements.",
    secteurs: [
      "Centre-ville et quartier de la gare",
      "Chelles-Gournay et Coteaux de la Marne",
      "Mont Chalâts et Grande Prairie",
      "Zone d'activité de la Trentaine",
      "Quartier Castermant",
      "Bords de Marne",
    ],
    corps: [
      "Chelles est la commune la plus peuplée de Seine-et-Marne, et son parc est très majoritairement pavillonnaire. Cela oriente nettement la demande : grand ménage de maison, nettoyage de fin de rénovation, entretien récurrent chez des actifs qui travaillent à Paris. Les maisons chellois-es des lotissements des années 1960 à 1980 présentent le mélange classique carrelage en bas, moquette ou parquet flottant en haut, avec des vérandas et des sous-sols aménagés qui allongent le temps d'intervention par rapport à la surface annoncée.",
      "La gare de Chelles-Gournay est desservie par le RER E et la ligne P, et l'arrivée de la ligne 16 du Grand Paris Express y concentre depuis plusieurs années des chantiers et des programmes immobiliers neufs. Cela nous vaut une demande soutenue de nettoyage de fin de chantier et de livraison de logements neufs, où la date de remise des clés fixe la date de notre passage sans marge de manœuvre.",
      "Depuis Meaux, Chelles est à une vingtaine de minutes par la N3 puis la D934, hors heures de pointe. C'est l'une des communes où nous intervenons le plus fréquemment en dehors de notre agglomération d'origine, ce qui nous permet d'y proposer des créneaux matinaux sans surcoût.",
      "L'entretien de copropriétés est le second marché de la commune. Les résidences des Coteaux de la Marne et du secteur Castermant ont des parties communes classiques : hall, cage d'escalier, local à vélos, local à poubelles, avec un espace encombrants souvent sous-dimensionné. La fréquence utile y est de deux à trois passages hebdomadaires, calés sur les jours de collecte plutôt que sur un calendrier théorique, faute de quoi les conteneurs restent sur le trottoir entre deux passages et c'est exactement ce que voient les résidents.",
      "Une demande propre à Chelles concerne les logements mis en vente. Le marché immobilier y est actif, porté par des acheteurs qui quittent Paris et la petite couronne, et un pavillon se présente d'autant mieux qu'il a été nettoyé avant les visites. Nous intervenons à ce moment précis, avant la mise en vente, aussi souvent qu'après le déménagement du vendeur. Les deux prestations n'ont pas le même périmètre : la première soigne ce qui se voit, la seconde traite ce qui est enfin accessible.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-maison",
        raison:
          "Le parc pavillonnaire domine largement, avec des surfaces qui justifient un grand ménage complet plutôt qu'un passage court.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Les programmes neufs autour de la gare et les rénovations de pavillons génèrent une demande continue.",
      },
      {
        slug: "menage-particulier",
        raison:
          "Beaucoup d'actifs font Chelles-Paris tous les jours et cherchent un passage régulier plutôt qu'une intervention ponctuelle.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 20 min" },
      { label: "Parc dominant", value: "Pavillonnaire" },
      { label: "Créneaux", value: "Matin et soirée" },
    ],
    faq: [
      {
        question: "Intervenez-vous pour des maisons individuelles à Chelles ?",
        answer:
          "Oui, c'est même l'essentiel de notre activité sur la commune. Les demandes portent surtout sur le grand ménage de maison, la remise en état après rénovation et l'entretien régulier. Les sous-sols aménagés, vérandas et combles sont chiffrés à part de la surface habitable, car ils changent réellement le temps passé.",
      },
      {
        question: "Sous quel délai pouvez-vous intervenir à Chelles ?",
        answer:
          "Comptez deux à quatre jours ouvrés pour une intervention ponctuelle, selon la période. Pour un contrat d'entretien régulier, le premier passage est calé sous une semaine. Les demandes liées à un état des lieux ou à une livraison de chantier sont prioritaires quand la date est imposée.",
      },
      {
        question: "Facturez-vous le déplacement jusqu'à Chelles ?",
        answer:
          "Le déplacement est intégré au prix de la prestation et figure dans le devis, il n'est jamais ajouté après l'intervention. Sur Chelles, la fréquence de nos passages nous permet de rester au même niveau tarifaire que sur le nord de la Seine-et-Marne.",
      },
      {
        question: "Nettoyez-vous les vitres et les vérandas des pavillons chellois ?",
        answer:
          "Oui. Les vitres accessibles depuis le sol ou avec une perche sont comprises dans un grand ménage. Une véranda se chiffre à part : la surface vitrée y dépasse souvent celle de toutes les fenêtres du pavillon réunies, et le nettoyage de la toiture vitrée demande un accès sécurisé que nous validons avant d'accepter l'intervention.",
      },
    ],
    communesProches: [
      "Gournay-sur-Marne",
      "Vaires-sur-Marne",
      "Brou-sur-Chantereine",
      "Courtry",
      "Le Pin",
      "Montfermeil",
      "Neuilly-sur-Marne",
    ],
    geo: { latitude: 48.8833, longitude: 2.5931 },
  },
  {
    slug: "nettoyage-lagny-sur-marne",
    nom: "Lagny-sur-Marne",
    departement: "77",
    codePostal: "77400",
    requete: "Nettoyage à Lagny-sur-Marne",
    h1: "Nettoyage professionnel à Lagny-sur-Marne (77400)",
    metaTitle: "Nettoyage à Lagny-sur-Marne (77400) | MS Nettoyages",
    metaDescription:
      "Nettoyage professionnel à Lagny-sur-Marne : ménage à domicile, entretien de commerces, remise en état de logements anciens. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient à Lagny-sur-Marne (77400) et dans les communes de la boucle de la Marne, pour le ménage à domicile, l'entretien de commerces et la remise en état de logements.",
    secteurs: [
      "Centre historique et abbatiale",
      "Quartier de la gare de Lagny-Thorigny",
      "Orly Parc et Saint-Jean",
      "Bords de Marne et quai de la Gourdine",
      "Zone commerciale des Vallières",
    ],
    corps: [
      "Lagny-sur-Marne a un centre ancien resserré, hérité de son abbaye, avec des immeubles étroits, des escaliers en colimaçon et des logements souvent répartis sur deux niveaux. Ce type de bâti demande plus de temps qu'une surface équivalente en plateau : le matériel se déplace mal, les pièces sont petites et multiples, et les sols mélangent tomettes, parquets anciens et carrelages refaits. Nous en tenons compte au chiffrage plutôt que de découvrir le problème sur place.",
      "Le centre-ville concentre une densité inhabituelle de commerces indépendants, de cabinets et de restaurants pour une commune de cette taille. Ce sont eux qui forment la majorité de nos contrats d'entretien régulier sur Lagny, avec des passages courts et fréquents, calés avant l'ouverture. La vitrine et les sanitaires y pèsent davantage que le reste : ce sont les deux points que voit un client.",
      "La commune fait partie de l'agglomération de Marne-la-Vallée, à proximité immédiate de Thorigny, Pomponne et Saint-Thibault-des-Vignes. Nous traitons ces communes depuis la même tournée, ce qui permet des créneaux plus souples qu'ailleurs en grande couronne.",
      "Les bords de Marne ajoutent une contrainte rare ailleurs : l'humidité. Les logements en rez-de-chaussée et les caves du secteur du quai de la Gourdine présentent régulièrement de la condensation et des développements de moisissures sur les joints et les angles froids. Le nettoyage traite la surface, il ne règle pas la cause, qui relève de la ventilation. Nous le disons plutôt que de laisser croire à un résultat durable qui ne tiendrait pas trois semaines.",
      "La ville accueille un centre hospitalier et plusieurs résidences pour personnes âgées. Cela alimente une demande d'entretien de logement chez des personnes âgées ou à mobilité réduite, sur des créneaux fixes et avec le même intervenant à chaque passage. C'est la condition pour que la prestation soit acceptée et non subie : entrer chez quelqu'un qui sort peu n'est pas une opération technique, et un roulement d'intervenants suffit à faire arrêter le contrat.",
    ],
    prestationsPhares: [
      {
        slug: "menage-particulier",
        raison:
          "Le centre ancien compte beaucoup de logements occupés à l'année par des actifs et des retraités, demandeurs d'un passage régulier.",
      },
      {
        slug: "nettoyage-bureau",
        raison:
          "Commerces, cabinets et restaurants indépendants du centre forment l'essentiel de nos contrats d'entretien ici.",
      },
      {
        slug: "menage-apres-demenagement",
        raison:
          "La rotation locative dans le centre historique est rapide, et les états des lieux y sont exigeants sur les sols anciens.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 25 min" },
      { label: "Bâti dominant", value: "Ancien de centre-ville" },
      { label: "Tournée", value: "Groupée avec Thorigny" },
    ],
    faq: [
      {
        question: "Nettoyez-vous les parquets et tomettes anciens ?",
        answer:
          "Oui, avec une méthode adaptée à chaque support et jamais à grande eau. Un parquet massif ancien se nettoie humide, essoré, avec un produit neutre : l'eau stagnante le fait griser et soulève les lames. Les tomettes se traitent également sans excès d'eau, les joints étant souvent poreux dans les logements du centre de Lagny.",
      },
      {
        question: "Intervenez-vous pour les commerces avant l'ouverture ?",
        answer:
          "Oui, c'est la formule la plus demandée sur Lagny. Le passage se fait avant l'ouverture, généralement entre 6 h et 8 h 30, ce qui laisse la vitrine et les sanitaires impeccables à l'arrivée des premiers clients sans jamais gêner le service.",
      },
      {
        question: "Couvrez-vous Thorigny, Pomponne et Saint-Thibault ?",
        answer:
          "Oui, ces communes sont traitées dans la même tournée que Lagny-sur-Marne, tout comme Dampmart, Chalifert et Montévrain. Le regroupement des interventions nous permet d'y proposer des créneaux plus souples et sans majoration de déplacement.",
      },
      {
        question: "Quel est le délai pour une première intervention à Lagny-sur-Marne ?",
        answer:
          "Comptez deux à quatre jours ouvrés pour une intervention ponctuelle et moins d'une semaine pour le premier passage d'un contrat d'entretien. Les demandes liées à un état des lieux ou à une date de remise de clés sont traitées en priorité : indiquez la date butoir dès la demande de devis, elle conditionne la planification.",
      },
    ],
    communesProches: [
      "Thorigny-sur-Marne",
      "Pomponne",
      "Saint-Thibault-des-Vignes",
      "Dampmart",
      "Chalifert",
      "Montévrain",
      "Bussy-Saint-Georges",
    ],
    geo: { latitude: 48.8722, longitude: 2.7053 },
  },
  {
    slug: "nettoyage-torcy",
    nom: "Torcy",
    departement: "77",
    codePostal: "77200",
    requete: "Nettoyage à Torcy",
    h1: "Nettoyage professionnel à Torcy (77200)",
    metaTitle: "Nettoyage professionnel à Torcy (77200) | MS Nettoyages",
    metaDescription:
      "Nettoyage à Torcy et dans le Val Maubuée : entretien de bureaux, ménage de résidence, fin de chantier et rotation locative. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient à Torcy (77200), ville-centre du Val Maubuée, pour l'entretien de bureaux, le ménage de résidences et la remise en état de logements.",
    secteurs: [
      "Centre urbain et gare RER A",
      "Arche Guédon",
      "Les Deux Parcs et Le Segrais",
      "Zone d'activité de Torcy",
      "Base de loisirs et bord du lac",
    ],
    corps: [
      "Torcy a été bâtie pour l'essentiel entre 1975 et 1995, dans le cadre de la ville nouvelle de Marne-la-Vallée. Le parc est donc homogène et récent à l'échelle francilienne : résidences en copropriété, parties communes larges, halls vitrés, parkings souterrains. La demande y porte beaucoup sur l'entretien de parties communes et sur les surfaces vitrées, deux postes où le résultat se voit immédiatement et où l'irrégularité d'un prestataire se remarque tout de suite.",
      "Le pôle de la gare RER A concentre des bureaux, des sièges régionaux et des services publics. Les contrats de bureaux y ressemblent à ceux de la petite couronne : cahier des charges écrit, passage en soirée, badge d'accès, contrôle qualité formalisé. La différence est le stationnement, largement plus simple qu'à Paris, ce qui permet des interventions plus rapides à surface égale.",
      "Le Val Maubuée forme un ensemble cohérent avec Noisiel, Lognes, Champs-sur-Marne et Émerainville. Nous y intervenons dans une même tournée, y compris pour des passages courts et fréquents qui ne seraient pas rentables sur une commune isolée.",
      "L'entretien des halls vitrés est le poste le plus sensible du Val Maubuée. Les résidences des années 1980 ont des entrées largement vitrées, exposées plein sud pour beaucoup d'entre elles : les traces de pluie et les projections y sont visibles en permanence, et un passage hebdomadaire ne suffit pas à donner l'impression d'un hall propre. Nous recommandons deux passages courts plutôt qu'un passage long, et le devis est construit sur cette base.",
      "Le secteur compte aussi des équipements publics et associatifs qui fonctionnent en horaires décalés : salles polyvalentes, gymnases, locaux associatifs, structures d'accueil de jeunes enfants. Ces sites imposent un nettoyage entre deux créneaux d'occupation, parfois en milieu de journée, avec un protocole de désinfection renforcé là où des enfants sont accueillis. Le créneau est fixé au contrat et ne bouge pas d'une semaine sur l'autre, car il conditionne l'ouverture du site.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison:
          "Le pôle tertiaire de la gare RER A concentre des surfaces de bureaux à entretenir hors heures d'activité.",
      },
      {
        slug: "menage-particulier",
        raison:
          "Les résidences en copropriété demandent un entretien régulier des parties communes autant que des logements.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Les réhabilitations de résidences des années 1980 alimentent une demande continue de remise en état.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 30 min" },
      { label: "Parc dominant", value: "Copropriétés récentes" },
      { label: "Tournée", value: "Groupée sur le Val Maubuée" },
    ],
    faq: [
      {
        question: "Entretenez-vous les parties communes de copropriété à Torcy ?",
        answer:
          "Oui. Le devis se construit sur un relevé précis : nombre de niveaux, présence d'un ascenseur, surface des halls, nature des sols, local à poubelles et fréquence souhaitée. Ces éléments pèsent bien plus que le nombre de logements de la résidence, qui ne dit rien du temps réel d'intervention.",
      },
      {
        question: "Nettoyez-vous les surfaces vitrées des halls et cages d'escalier ?",
        answer:
          "Oui, toutes les surfaces vitrées accessibles depuis le sol ou avec une perche sont comprises. Les vitrages en hauteur qui exigent une nacelle ou un échafaudage font l'objet d'un devis distinct, avec un prestataire de levage quand le site le demande.",
      },
      {
        question: "Couvrez-vous Noisiel, Lognes et Champs-sur-Marne ?",
        answer:
          "Oui, ces communes du Val Maubuée sont traitées dans la même tournée que Torcy, avec Émerainville et Croissy-Beaubourg. Ce regroupement rend possibles des passages courts et fréquents, y compris quotidiens, à un coût qui resterait dissuasif sur une commune isolée.",
      },
      {
        question: "Pouvez-vous intervenir en journée à Torcy ?",
        answer:
          "Oui, c'est même fréquent sur les équipements collectifs et les parties communes, où l'intervention ne gêne personne. Pour les bureaux, nous restons sur des créneaux avant 8 h ou après 18 h : nettoyer un plateau occupé prend plus de temps, dérange les équipes et donne un résultat moins régulier.",
      },
    ],
    communesProches: [
      "Noisiel",
      "Lognes",
      "Champs-sur-Marne",
      "Émerainville",
      "Croissy-Beaubourg",
      "Collégien",
      "Bussy-Saint-Georges",
    ],
    geo: { latitude: 48.8503, longitude: 2.6503 },
  },
  {
    slug: "nettoyage-noisy-le-grand",
    nom: "Noisy-le-Grand",
    departement: "93",
    codePostal: "93160",
    requete: "Société de nettoyage à Noisy-le-Grand",
    h1: "Société de nettoyage à Noisy-le-Grand (93160)",
    metaTitle: "Société de nettoyage à Noisy-le-Grand | MS Nettoyages",
    metaDescription:
      "Société de nettoyage à Noisy-le-Grand : bureaux du Mont d'Est, résidences, fin de chantier et ménage à domicile. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages est une société de nettoyage qui intervient à Noisy-le-Grand (93160), sur le pôle tertiaire du Mont d'Est comme dans les quartiers résidentiels de la commune.",
    secteurs: [
      "Mont d'Est et quartier d'affaires",
      "Noisy-Champs et Pavé Neuf",
      "Les Yvris et Le Champy",
      "Centre-ville et Villeflix",
      "Bords de Marne",
    ],
    corps: [
      "Noisy-le-Grand a deux visages, et ils appellent deux métiers différents. Le Mont d'Est est un pôle de bureaux constitué autour de la gare RER A et de la future ligne 15, avec des immeubles tertiaires de grande hauteur, des halls vitrés et des règles d'accès dignes de La Défense. Le reste de la commune est résidentiel, entre pavillonnaire ancien et copropriétés, avec une demande de ménage à domicile et de remise en état entre deux occupants.",
      "Sur le tertiaire, l'enjeu est la régularité mesurable. Les gestionnaires d'immeubles de la zone d'affaires travaillent avec des cahiers des charges détaillés et des visites qualité planifiées. Nous fournissons la liste nominative des intervenants au démarrage, ce qui évite les refus d'accès au poste de sécurité, et nous affectons une équipe fixe pour que le badge ne soit pas à refaire tous les mois.",
      "Le chantier permanent qu'est devenu le secteur Noisy-Champs, avec le prolongement du Grand Paris Express, alimente une demande soutenue de nettoyage de fin de chantier sur des livraisons de bureaux et de logements neufs, à dates fixées longtemps à l'avance.",
      "Le bâti des années 1980 du Pavé Neuf, dont les ensembles en béton moulé sont connus bien au-delà de la commune, demande une prudence particulière. Le béton architectonique est poreux et se marque définitivement sous un nettoyeur haute pression mal réglé : la façade blanchit par zones et l'irrégularité reste visible des années. Nous traitons ces surfaces à basse pression avec des produits neutres, ou nous renvoyons vers un ravaleur quand l'état relève du ravalement et non du nettoyage.",
      "La commune est aussi l'un des points où nous assurons le plus de rotations de logements meublés loués à des cadres en mission, du fait de la proximité immédiate du pôle tertiaire. Ces rotations ressemblent à celles d'une location courte durée, avec des séjours plus longs : le rythme est mensuel plutôt qu'hebdomadaire, mais l'exigence sur le linge, les consommables et l'état de présentation à l'arrivée est exactement la même.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison:
          "Le Mont d'Est concentre des surfaces tertiaires avec cahier des charges écrit et contrôle qualité formalisé.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Les livraisons de programmes neufs autour de Noisy-Champs imposent des interventions à date fixe.",
      },
      {
        slug: "nettoyage-maison",
        raison:
          "Les quartiers pavillonnaires de la commune demandent des grands ménages complets, souvent avant ou après une vente.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 35 min" },
      { label: "Deux marchés", value: "Tertiaire et résidentiel" },
      { label: "Créneaux", value: "Avant 8 h et après 18 h" },
    ],
    faq: [
      {
        question: "Travaillez-vous avec les gestionnaires d'immeubles du Mont d'Est ?",
        answer:
          "Oui. Nous transmettons au démarrage la liste nominative des intervenants, leurs justificatifs de déclaration et notre attestation de responsabilité civile professionnelle. C'est ce que demandent les postes de sécurité des immeubles tertiaires, et c'est ce qui évite qu'une intervention soit perdue sur un refus d'accès.",
      },
      {
        question: "Pouvez-vous intervenir sur une livraison de programme neuf ?",
        answer:
          "Oui, c'est une demande fréquente sur le secteur Noisy-Champs. Nous intervenons après le départ des corps de métier, en plusieurs passes selon l'empoussièrement, avec un créneau confirmé par écrit. Quand la livraison porte sur plusieurs lots, nous mobilisons plusieurs intervenants en parallèle pour tenir la date.",
      },
      {
        question: "Faites-vous aussi du ménage chez les particuliers à Noisy-le-Grand ?",
        answer:
          "Oui, en entretien régulier comme en intervention ponctuelle. Les demandes les plus fréquentes sur la commune sont le passage hebdomadaire chez des actifs et le grand ménage avant une vente ou une mise en location, deux prestations que nous chiffrons séparément.",
      },
      {
        question:
          "Combien coûte l'entretien des parties communes d'une résidence à Noisy-le-Grand ?",
        answer:
          "Le devis se construit sur un relevé et non sur le nombre de logements : nombre de cages et de niveaux, surface des halls, nature des sols, local à poubelles, présence d'un ascenseur et fréquence retenue. Deux résidences de taille identique peuvent avoir des devis très différents selon la surface vitrée et le nombre d'entrées à traiter.",
      },
    ],
    communesProches: [
      "Champs-sur-Marne",
      "Bry-sur-Marne",
      "Villiers-sur-Marne",
      "Neuilly-sur-Marne",
      "Gournay-sur-Marne",
      "Le Perreux-sur-Marne",
    ],
    geo: { latitude: 48.8486, longitude: 2.5528 },
  },
  {
    slug: "nettoyage-montreuil",
    nom: "Montreuil",
    departement: "93",
    codePostal: "93100",
    requete: "Entreprise de nettoyage à Montreuil",
    h1: "Entreprise de nettoyage à Montreuil (93100)",
    metaTitle: "Entreprise de nettoyage à Montreuil (93100) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage à Montreuil : lofts et ateliers du Bas-Montreuil, bureaux, coworking, fin de chantier et ménage à domicile. Devis sous 24 h.",
    lede: "MS Nettoyages est une entreprise de nettoyage qui intervient à Montreuil (93100), du Bas-Montreuil tertiaire aux quartiers résidentiels des hauts de la commune.",
    secteurs: [
      "Bas-Montreuil et Croix-de-Chavaux",
      "Mairie de Montreuil et centre-ville",
      "Robespierre et La Noue",
      "Murs à pêches et Saint-Antoine",
      "Boissière et Ruffins",
    ],
    corps: [
      "Le Bas-Montreuil est un cas particulier en Île-de-France : d'anciens ateliers et usines y ont été reconvertis en bureaux, en studios et en lofts, souvent sans être totalement standardisés. Cela donne des volumes ouverts, des hauteurs sous plafond de quatre à six mètres, des verrières, des sols en béton ciré ou en résine, et des mezzanines. Chacun de ces éléments change la méthode : une verrière en hauteur ne se traite pas à la raclette depuis un escabeau, un béton ciré ne supporte pas les produits acides.",
      "La commune abrite une densité forte de structures associatives, de sociétés de production, d'agences et d'espaces de coworking. Ces clients ont des besoins que le contrat de bureaux standard ne couvre pas : usage intensif des espaces partagés, cuisines communes très sollicitées, horaires étendus qui repoussent notre créneau après 21 h. Nous adaptons le cahier des charges plutôt que d'imposer un forfait.",
      "Sur les hauts de Montreuil, autour des murs à pêches et du quartier Saint-Antoine, le parc redevient pavillonnaire et la demande bascule vers le ménage à domicile et la remise en état de logements. Les deux marchés coexistent sur la même commune, à quinze minutes l'un de l'autre.",
      "Le marché des tournages et de la post-production est une particularité montreuilloise. Studios, plateaux et locaux de production alternent des périodes d'occupation intense et des périodes creuses, ce qui rend le contrat à fréquence fixe inadapté. Nous travaillons sur ces sites à la demande, avec un délai de prévenance court et un tarif convenu d'avance, plutôt qu'avec un calendrier figé que personne ne respecterait au bout d'un mois.",
      "L'entretien de locaux associatifs représente un autre volume notable sur la commune, avec des budgets contraints et des surfaces partagées entre plusieurs structures. La question n'y est pas le niveau de prestation mais son juste dimensionnement. Nous chiffrons une base réellement tenable, quitte à ce qu'elle soit modeste, plutôt qu'un cahier des charges complet qui serait abandonné au bout de trois mois faute de trésorerie.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison:
          "Agences, sociétés de production et espaces de coworking du Bas-Montreuil demandent des cahiers des charges sur mesure.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "La reconversion d'ateliers en logements et en bureaux est continue depuis vingt ans sur la commune.",
      },
      {
        slug: "menage-particulier",
        raison:
          "Les quartiers résidentiels des hauts de Montreuil demandent surtout un passage régulier à domicile.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 40 min" },
      { label: "Spécificité", value: "Ateliers et lofts reconvertis" },
      { label: "Créneaux", value: "Soirée, jusqu'à 21 h" },
    ],
    faq: [
      {
        question: "Nettoyez-vous les verrières et volumes en hauteur des lofts ?",
        answer:
          "Les surfaces accessibles depuis le sol ou avec une perche télescopique sont comprises dans la prestation. Au-delà de quatre mètres, l'intervention relève du travail en hauteur et exige un moyen d'accès adapté : nous le chiffrons séparément et faisons appel à un prestataire de levage quand la configuration l'impose. Nous ne montons jamais sur un mobilier ou un escabeau non prévu pour cela.",
      },
      {
        question: "Comment traitez-vous un sol en béton ciré ou en résine ?",
        answer:
          "Avec un produit neutre et sans excès d'eau. Un béton ciré est protégé par une cire ou un vernis que les détergents acides ou fortement alcalins attaquent : quelques passages suffisent à ternir la surface de façon irréversible. Le protocole est calé lors du premier passage, en fonction de la finition réellement posée.",
      },
      {
        question: "Intervenez-vous en soirée dans les espaces de coworking ?",
        answer:
          "Oui, jusqu'à 21 h et au-delà si le site le demande. Les espaces partagés de Montreuil ferment souvent tard : le créneau est fixé au contrat, avec les modalités d'accès et de fermeture. Les cuisines communes et les sanitaires sont traités à chaque passage, ce sont les deux postes les plus sollicités.",
      },
      {
        question: "Utilisez-vous des produits écologiques à Montreuil ?",
        answer:
          "Oui sur demande, sans supplément. Nous travaillons par défaut avec des produits professionnels choisis pour leur efficacité sur chaque support. Si vous préférez des produits porteurs d'un écolabel, ou vos propres produits, précisez-le à la demande de devis : nous adaptons le protocole et le notons au contrat pour que tous les intervenants l'appliquent.",
      },
    ],
    communesProches: [
      "Bagnolet",
      "Vincennes",
      "Fontenay-sous-Bois",
      "Romainville",
      "Rosny-sous-Bois",
      "Noisy-le-Sec",
      "Paris 20e",
    ],
    geo: { latitude: 48.8638, longitude: 2.4485 },
  },
  {
    slug: "nettoyage-saint-denis",
    nom: "Saint-Denis",
    departement: "93",
    codePostal: "93200",
    requete: "Société de nettoyage à Saint-Denis",
    h1: "Société de nettoyage à Saint-Denis (93200)",
    metaTitle: "Société de nettoyage à Saint-Denis (93200) | MS Nettoyages",
    metaDescription:
      "Société de nettoyage à Saint-Denis : bureaux de la Plaine, locaux d'activité, fin de chantier et entretien de parties communes. Devis sous 24 h.",
    lede: "MS Nettoyages est une société de nettoyage qui intervient à Saint-Denis (93200), avec une activité concentrée sur les bureaux de la Plaine Saint-Denis et les locaux professionnels.",
    secteurs: [
      "Plaine Saint-Denis et Landy",
      "Pleyel et Stade de France",
      "Centre-ville et basilique",
      "Confluence et Île-Saint-Denis",
      "Franc-Moisin et Bel-Air",
    ],
    corps: [
      "La Plaine Saint-Denis est l'un des premiers pôles tertiaires d'Île-de-France, avec des sièges sociaux, des studios de tournage et des surfaces de bureaux qui se comptent en centaines de milliers de mètres carrés. Les contrats y sont structurés comme dans le 92 : cahier des charges écrit, badge nominatif, plage horaire imposée par le gestionnaire, contrôle qualité planifié. Nous fournissons au démarrage les justificatifs de déclaration de chaque intervenant, ce que les postes de sécurité exigent sans exception.",
      "Le secteur Pleyel a été profondément remodelé par les aménagements de 2024 et la reconversion des équipements qui les ont suivis. Il en résulte un parc de bureaux et de logements récents, livrés par vagues, avec une demande régulière de nettoyage de fin de chantier et de premier entretien avant occupation.",
      "Le centre ancien, autour de la basilique, présente un tout autre profil : logements en copropriété souvent anciens, commerces de proximité denses, parties communes très sollicitées. Nous y intervenons surtout sur l'entretien récurrent de halls et de cages d'escalier, avec des passages courts et fréquents plutôt qu'un grand nettoyage mensuel.",
      "Les locaux d'activité et les entrepôts constituent notre troisième marché sur la commune. Les zones du Landy et de la Plaine mêlent logistique urbaine, ateliers et petites unités de production, avec des salissures qui ne relèvent pas de l'entretien courant : huile, poussière technique, résidus de manutention. Le dégraissant et la méthode se décident sur site, après constat, jamais sur un devis établi au téléphone.",
      "Les délais que nous annonçons à Saint-Denis intègrent un facteur que peu de prestataires chiffrent honnêtement : la circulation. L'A1 et l'A86 sont saturées sur des plages larges, et une intervention calée à 8 h peut coûter une heure de trajet de plus que le même passage à 6 h 30. Nous privilégions donc les créneaux très matinaux, qui conviennent aussi le mieux aux sites tertiaires, et nous annonçons une heure d'arrivée plutôt qu'une demi-journée.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison: "La Plaine Saint-Denis concentre le tissu de bureaux le plus dense du département.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Les livraisons de programmes tertiaires et résidentiels sur Pleyel sont continues.",
      },
      {
        slug: "menage-apres-demenagement",
        raison:
          "La rotation locative est rapide dans le centre ancien, avec des états des lieux exigeants.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 40 min" },
      { label: "Marché principal", value: "Bureaux et tertiaire" },
      { label: "Accès", value: "A1, A86 et ligne 13" },
    ],
    faq: [
      {
        question: "Intervenez-vous dans les immeubles de bureaux de la Plaine Saint-Denis ?",
        answer:
          "Oui, c'est notre première activité sur la commune. L'intervention se fait avant l'ouverture ou après la fermeture, avec un badge nominatif enregistré au poste de sécurité. Nous transmettons la liste des intervenants, leurs justificatifs et notre attestation d'assurance dès la signature, pour que le premier passage ne bute pas sur un contrôle d'accès.",
      },
      {
        question: "Entretenez-vous les parties communes de copropriété à Saint-Denis ?",
        answer:
          "Oui. Sur le centre ancien, la formule la plus efficace est le passage court et fréquent, deux à trois fois par semaine, plutôt qu'un nettoyage mensuel approfondi. Les halls et cages d'escalier très sollicités se dégradent en quelques jours : c'est la fréquence, pas la durée du passage, qui tient le résultat.",
      },
      {
        question: "Prenez-vous en charge des locaux d'activité et des entrepôts ?",
        answer:
          "Oui, sur visite préalable. La surface seule ne dit rien du temps réel d'intervention : la hauteur sous plafond, l'encombrement et la nature des salissures pèsent davantage. Nous partons du protocole de sécurité du site plutôt que d'imposer le nôtre, et le devis est établi après constat sur place.",
      },
      {
        question: "Intervenez-vous le week-end à Saint-Denis ?",
        answer:
          "Le samedi oui, le dimanche uniquement sur les sites qui l'imposent et avec une majoration annoncée dans le devis. Sur les locaux tertiaires, le week-end sert surtout aux opérations lourdes qui ne peuvent pas se faire en semaine : remise à niveau des sols, vitrerie complète, nettoyage après réaménagement de plateaux.",
      },
    ],
    communesProches: [
      "Aubervilliers",
      "Saint-Ouen-sur-Seine",
      "L'Île-Saint-Denis",
      "Épinay-sur-Seine",
      "Villetaneuse",
      "Pierrefitte-sur-Seine",
      "La Courneuve",
    ],
    geo: { latitude: 48.9362, longitude: 2.3574 },
  },
  {
    slug: "nettoyage-creteil",
    nom: "Créteil",
    departement: "94",
    codePostal: "94000",
    requete: "Entreprise de nettoyage à Créteil",
    h1: "Entreprise de nettoyage à Créteil (94000)",
    metaTitle: "Entreprise de nettoyage à Créteil (94000) | MS Nettoyages",
    metaDescription:
      "Entreprise de nettoyage à Créteil : parties communes de copropriété, bureaux, cabinets médicaux et remise en état de logements. Devis sous 24 h.",
    lede: "MS Nettoyages est une entreprise de nettoyage qui intervient à Créteil (94000), préfecture du Val-de-Marne, sur les copropriétés, les locaux professionnels et les logements.",
    secteurs: [
      "Créteil Préfecture et Échat",
      "Le Palais et Croix des Mèches",
      "Mont-Mesly et Habette",
      "Bords de Marne et Brèche",
      "Université et Henri-Mondor",
    ],
    corps: [
      "Créteil est une ville de grandes copropriétés. Le parc construit entre 1965 et 1985, autour du lac, du Palais et du Mont-Mesly, aligne des résidences de plusieurs centaines de logements avec des parties communes étendues : halls, coursives, cages d'escalier multiples, locaux à poubelles, parkings souterrains. C'est le principal marché du nettoyage sur la commune, et c'est un marché de syndics, où le devis se construit sur un relevé précis et se compare ligne à ligne.",
      "La présence du centre hospitalier Henri-Mondor, de l'université Paris-Est Créteil et de la préfecture crée par ailleurs une densité inhabituelle de cabinets médicaux, de laboratoires et de professions libérales. Ces locaux imposent un protocole plus strict que des bureaux classiques : désinfection systématique des points de contact, salles d'attente traitées entre deux vacations, produits virucides conformes aux normes en vigueur, et traçabilité des passages.",
      "Le secteur des bords de Marne et de la Brèche est plus résidentiel, avec du pavillonnaire et des petites copropriétés. La demande y ressemble à celle de la grande couronne : grand ménage, remise en état avant état des lieux, entretien à domicile.",
      "Le renouvellement des marchés de nettoyage de copropriétés est un exercice à part. Les syndics consultent régulièrement plusieurs prestataires et comparent des devis dont les périmètres ne se recouvrent pas toujours. Nous détaillons donc systématiquement ce qui est inclus et ce qui ne l'est pas, en particulier la vitrerie, les parkings et les encombrants, pour que la comparaison porte sur les mêmes prestations et pas seulement sur un montant mensuel.",
      "La commune compte enfin un volume important de logements étudiants et de résidences services, liés à l'université et au centre hospitalier. Ces logements tournent à date fixe, en fin d'année universitaire, et concentrent la demande sur quelques semaines. Nous planifions ces campagnes à l'avance et mobilisons plusieurs intervenants en parallèle, plutôt que de les traiter au fil de l'eau au risque de faire glisser les dates de relocation.",
    ],
    prestationsPhares: [
      {
        slug: "menage-particulier",
        raison:
          "Les grandes copropriétés cristolliennes demandent un entretien récurrent des parties communes autant que des logements.",
      },
      {
        slug: "nettoyage-bureau",
        raison:
          "Cabinets médicaux, laboratoires et professions libérales imposent un protocole de désinfection formalisé.",
      },
      {
        slug: "menage-apres-demenagement",
        raison: "La rotation locative est soutenue autour de l'université et de l'hôpital.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 45 min" },
      { label: "Parc dominant", value: "Grandes copropriétés" },
      { label: "Spécificité", value: "Locaux médicaux" },
    ],
    faq: [
      {
        question: "Travaillez-vous avec les syndics de copropriété à Créteil ?",
        answer:
          "Oui. Le devis est établi après un relevé des parties communes : nombre de cages et de niveaux, présence d'ascenseurs, surface des halls, nature des sols, local à poubelles, parking. Ces éléments déterminent le temps réel d'intervention, bien plus que le nombre de logements de la résidence. Le cahier des charges est annexé au contrat et sert de base aux contrôles.",
      },
      {
        question: "Nettoyez-vous les cabinets médicaux et paramédicaux ?",
        answer:
          "Oui, avec un protocole distinct de celui des bureaux : désinfection systématique des points de contact, traitement des salles d'attente et des salles de soins, produits conformes aux normes de désinfection en vigueur, et créneau calé entre deux vacations. Les consommables sanitaires peuvent être inclus au contrat.",
      },
      {
        question: "Intervenez-vous dans les parkings souterrains des résidences ?",
        answer:
          "Oui, en balayage mécanique et lavage selon la configuration. C'est une prestation à chiffrer séparément de l'entretien des parties communes : elle mobilise du matériel différent et se planifie généralement à une fréquence bien plus basse, souvent une à quatre fois par an.",
      },
      {
        question: "Quelle fréquence de nettoyage pour un cabinet médical à Créteil ?",
        answer:
          "Un passage quotidien est la règle pour un cabinet recevant du public tous les jours, avec traitement de la salle d'attente, des salles de soins et des sanitaires. Un cabinet ouvert deux à trois jours par semaine se nettoie après chaque journée de consultation. Ce qui compte n'est pas la surface mais le nombre de passages de patients entre deux interventions.",
      },
    ],
    communesProches: [
      "Maisons-Alfort",
      "Alfortville",
      "Saint-Maur-des-Fossés",
      "Bonneuil-sur-Marne",
      "Limeil-Brévannes",
      "Valenton",
      "Choisy-le-Roi",
    ],
    geo: { latitude: 48.7904, longitude: 2.4556 },
  },
  {
    slug: "nettoyage-vincennes",
    nom: "Vincennes",
    departement: "94",
    codePostal: "94300",
    requete: "Nettoyage à Vincennes",
    h1: "Nettoyage professionnel à Vincennes (94300)",
    metaTitle: "Nettoyage professionnel à Vincennes (94300) | MS Nettoyages",
    metaDescription:
      "Nettoyage à Vincennes : ménage à domicile, entretien d'immeubles anciens, cabinets libéraux et remise en état de logements. Devis gratuit sous 24 h.",
    lede: "MS Nettoyages intervient à Vincennes (94300) pour le ménage à domicile, l'entretien de cabinets libéraux et la remise en état de logements dans un parc immobilier majoritairement ancien.",
    secteurs: [
      "Centre-ville et rue du Midi",
      "Quartier du Château",
      "Domaine du Bois",
      "Jarry et Sud-Est",
      "Abords du bois de Vincennes",
    ],
    corps: [
      "Vincennes est l'une des communes les plus denses de France, avec un parc constitué pour l'essentiel d'immeubles construits entre 1900 et 1939. Cela veut dire des parquets massifs, des moulures, des carreaux de ciment, des salles de bains d'origine et des cages d'escalier avec tapis et cuivres. Ce sont exactement les supports sur lesquels un produit inadapté fait un dégât visible et définitif, et sur lesquels un prestataire qui applique le même protocole partout se trompe systématiquement.",
      "La densité de professions libérales est élevée : cabinets médicaux et dentaires, avocats, architectes, souvent installés en rez-de-chaussée ou au premier étage d'immeubles d'habitation. Ces locaux imposent des créneaux courts, entre deux rendez-vous ou tôt le matin, et un niveau de discrétion que le contrat doit prévoir explicitement.",
      "La demande des particuliers porte principalement sur l'entretien régulier à domicile plutôt que sur des interventions ponctuelles. Le format le plus courant sur la commune est un passage hebdomadaire de deux à trois heures, avec le même intervenant, dans un appartement de trois ou quatre pièces.",
      "L'entretien de parties communes est un marché important sur la commune, très différent de celui des grands ensembles. Les immeubles vincennois comptent souvent trois à six étages, une seule cage, un escalier avec tapis ou nez de marche en laiton, et parfois une cour pavée. Les cuivres et les laitons demandent un produit dédié et un rythme espacé : un passage trop fréquent au produit acide finit par les user, un passage trop rare les laisse ternir au point qu'un rattrapage devient nécessaire.",
      "La proximité immédiate de Paris et la difficulté de stationnement pèsent sur l'organisation. Nous groupons nos interventions vincennoises sur une même demi-journée pour limiter le temps perdu à se garer, ce qui explique que nous proposions des créneaux plutôt qu'un choix libre d'horaire. En contrepartie, le créneau annoncé est tenu et le tarif n'intègre aucun surcoût de déplacement.",
    ],
    prestationsPhares: [
      {
        slug: "menage-particulier",
        raison:
          "Le passage hebdomadaire avec un intervenant attitré est de loin la formule la plus demandée sur la commune.",
      },
      {
        slug: "nettoyage-maison",
        raison:
          "Les appartements anciens exigent un grand ménage adapté aux parquets massifs et aux carreaux de ciment.",
      },
      {
        slug: "nettoyage-bureau",
        raison:
          "Les cabinets libéraux en pied d'immeuble demandent des créneaux courts et une grande discrétion.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 40 min" },
      { label: "Parc dominant", value: "Immeubles 1900-1939" },
      { label: "Format courant", value: "2 à 3 h par semaine" },
    ],
    faq: [
      {
        question: "Comment entretenez-vous un parquet massif ancien ?",
        answer:
          "Aspiration puis passage humide essoré, avec un produit neutre et sans stagnation d'eau. Un parquet massif ancien, souvent huilé ou vitrifié il y a longtemps, grise et se soulève aux joints dès qu'il reste mouillé. Les parquets cirés demandent en plus un lustrage périodique, que nous chiffrons séparément de l'entretien courant.",
      },
      {
        question: "Nettoyez-vous les carreaux de ciment ?",
        answer:
          "Oui, avec un produit neutre exclusivement. Les carreaux de ciment sont poreux et non vitrifiés : un détartrant acide ou une eau de Javel les décolore en une seule application, et le motif ne se rattrape pas. Nous vérifions systématiquement la nature du sol avant le premier passage plutôt que de nous fier à l'aspect.",
      },
      {
        question: "Proposez-vous un intervenant fixe à Vincennes ?",
        answer:
          "Oui, c'est le principe de nos contrats d'entretien à domicile. Le même intervenant vous est affecté et connaît votre logement, ses supports fragiles et vos habitudes. En cas de congé ou d'absence, un remplaçant est briefé sur votre dossier avant son passage, jamais envoyé à l'aveugle.",
      },
      {
        question: "Le ménage à domicile ouvre-t-il droit à un avantage fiscal ?",
        answer:
          "Les prestations de ménage chez le particulier peuvent ouvrir droit à un avantage fiscal au titre des services à la personne, sous réserve que le prestataire soit déclaré pour cette activité. Nous vous indiquons précisément ce qu'il en est au moment du devis, sans promesse en l'air : la règle dépend du statut du prestataire, pas du type de logement.",
      },
    ],
    communesProches: [
      "Saint-Mandé",
      "Fontenay-sous-Bois",
      "Montreuil",
      "Nogent-sur-Marne",
      "Joinville-le-Pont",
      "Paris 12e",
      "Paris 20e",
    ],
    geo: { latitude: 48.8479, longitude: 2.4396 },
  },
  {
    slug: "nettoyage-boulogne-billancourt",
    nom: "Boulogne-Billancourt",
    departement: "92",
    codePostal: "92100",
    requete: "Nettoyage à Boulogne-Billancourt",
    h1: "Nettoyage professionnel à Boulogne-Billancourt (92100)",
    metaTitle: "Nettoyage à Boulogne-Billancourt (92100) | MS Nettoyages",
    metaDescription:
      "Nettoyage à Boulogne-Billancourt : bureaux, sièges d'entreprise, appartements et remise en état après travaux. Intervention hors heures. Devis sous 24 h.",
    lede: "MS Nettoyages intervient à Boulogne-Billancourt (92100), première commune des Hauts-de-Seine par sa population, sur le nettoyage de bureaux et l'entretien de logements.",
    secteurs: [
      "Trapèze et Île Seguin",
      "Centre-ville et Marcel-Sembat",
      "Jean-Jaurès et Billancourt",
      "Parchamp et Albert-Kahn",
      "Point du Jour et Silly-Gallieni",
    ],
    corps: [
      "Boulogne-Billancourt concentre une densité de sièges d'entreprise, de sociétés de médias et d'agences que peu de communes égalent hors de Paris. Les contrats de bureaux y sont exigeants : cahier des charges détaillé, contrôles qualité planifiés, badge nominatif, accès par le monte-charge et parfois enregistrement préalable des intervenants auprès du gestionnaire de l'immeuble. C'est le type de site où une équipe fixe fait toute la différence, parce que refaire les formalités d'accès à chaque passage coûte plus cher que l'intervention elle-même.",
      "Le quartier du Trapèze, bâti sur les anciens terrains Renault, est un parc de logements et de bureaux récent, avec des halls vitrés, des parkings en sous-sol et des parties communes soignées. À l'opposé, le centre historique et le secteur Parchamp comptent un patrimoine Art déco et moderne remarquable, où les copropriétés tiennent à des prestations discrètes et à des produits qui ne marquent ni les pierres ni les métaux d'origine.",
      "Depuis Meaux, Boulogne est la commune la plus éloignée de notre zone d'intervention régulière. Nous y travaillons donc sur planification plutôt qu'en urgence, ce que nous annonçons à la demande de devis : mieux vaut un créneau tenu qu'un délai promis et manqué.",
      "Le tissu de commerces et de restaurants du centre-ville constitue un second marché sur la commune. L'entretien y est quotidien ou pluri-hebdomadaire, avant l'ouverture, avec une exigence forte sur la vitrine, les sanitaires accessibles au public et les abords. Les établissements de restauration relèvent en plus d'un protocole d'hygiène distinct, dont le nettoyage n'est qu'une composante : nous intervenons en complément du plan de maîtrise sanitaire de l'établissement, jamais à sa place.",
      "Les copropriétés du Parchamp et du Point du Jour conservent un patrimoine architectural notable des années 1920 et 1930 : halls en pierre, ferronneries, mosaïques d'origine. Ces matériaux se dégradent sous les produits d'entretien courants, la pierre calcaire étant sensible aux acides et les ferronneries peintes au chlore. Le protocole est arrêté lors du premier passage, après identification des matériaux réellement en place, et non d'après leur aspect.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-bureau",
        raison: "Sièges d'entreprise, médias et agences forment le tissu dominant de la commune.",
      },
      {
        slug: "nettoyage-maison",
        raison:
          "Les appartements du centre et du Trapèze demandent des grands ménages avant emménagement ou après travaux.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Les réaménagements de plateaux de bureaux y sont fréquents et se livrent à date imposée.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Sur planification" },
      { label: "Marché principal", value: "Bureaux et sièges" },
      { label: "Accès", value: "Badge et monte-charge" },
    ],
    faq: [
      {
        question: "Intervenez-vous à Boulogne-Billancourt sans délai d'attente ?",
        answer:
          "Non, et nous préférons le dire clairement : Boulogne se situe à l'opposé de notre base de Meaux. Nous y travaillons sur planification anticipée, ce qui convient parfaitement aux contrats d'entretien récurrents et aux remises en état dont la date est connue à l'avance, mais pas aux interventions d'urgence à la demi-journée.",
      },
      {
        question: "Gérez-vous les formalités d'accès imposées par les immeubles de bureaux ?",
        answer:
          "Oui. Nous transmettons au démarrage la liste nominative des intervenants, leurs justificatifs de déclaration et notre attestation de responsabilité civile professionnelle, et nous affectons une équipe fixe pour éviter de refaire les badges à chaque changement. C'est ce que réclament les gestionnaires d'immeubles du secteur.",
      },
      {
        question: "Nettoyez-vous les parties communes des copropriétés du Trapèze ?",
        answer:
          "Oui, halls vitrés, coursives, ascenseurs, locaux à vélos et à poubelles compris. Ce parc récent a beaucoup de surfaces vitrées : c'est le poste qui se dégrade le plus vite visuellement et celui qui détermine, en pratique, la fréquence à retenir dans le contrat.",
      },
      {
        question: "Quel préavis faut-il pour arrêter un contrat d'entretien ?",
        answer:
          "Un mois, et sans durée minimale d'engagement. Nous ne pratiquons pas les contrats à reconduction longue : un prestataire qui doit être retenu par une clause plutôt que par la qualité de ses passages ne tient pas la durée de toute façon. La fréquence peut aussi être révisée en cours de contrat sans repasser par une négociation complète.",
      },
    ],
    communesProches: [
      "Issy-les-Moulineaux",
      "Sèvres",
      "Saint-Cloud",
      "Meudon",
      "Vanves",
      "Paris 15e",
      "Paris 16e",
    ],
    geo: { latitude: 48.8352, longitude: 2.2409 },
  },
  {
    slug: "nettoyage-pontault-combault",
    nom: "Pontault-Combault",
    departement: "77",
    codePostal: "77340",
    requete: "Nettoyage à Pontault-Combault",
    h1: "Nettoyage professionnel à Pontault-Combault (77340)",
    metaTitle: "Nettoyage à Pontault-Combault (77340) | MS Nettoyages",
    metaDescription:
      "Nettoyage à Pontault-Combault : ménage de pavillon, entretien de locaux d'activité, fin de chantier et remise en état de logements. Devis sous 24 h.",
    lede: "MS Nettoyages intervient à Pontault-Combault (77340) et dans les communes voisines de la Brie francilienne, pour le ménage de pavillon, l'entretien de locaux d'activité et la remise en état de logements.",
    secteurs: [
      "Centre-ville et Pontault",
      "Combault et Le Vieux Pays",
      "Parc d'activité de la Régale",
      "Zone d'activité des Berchères",
      "Quartier de la gare RER E d'Émerainville",
    ],
    corps: [
      "Pontault-Combault est une commune de pavillons, née de la fusion de deux villages et développée par lotissements successifs à partir des années 1960. La demande y est très majoritairement résidentielle : grand ménage de maison, entretien régulier chez des familles, remise en état après une rénovation. Les surfaces habitables dépassent souvent 100 m², avec garage, sous-sol et jardin, ce qui rend le chiffrage au mètre carré habitable trompeur si l'on ne demande pas ce qui est réellement à traiter.",
      "Les parcs d'activité de la Régale et des Berchères regroupent des PME, des artisans et de la logistique légère le long de la francilienne. Ces locaux mêlent bureaux, ateliers et sanitaires de chantier : le protocole de nettoyage n'y est pas celui d'un plateau tertiaire, et les salissures sont plus techniques que ménagères.",
      "La commune est bien reliée à Meaux par la N104 et la N4. C'est une zone où nous groupons nos interventions avec Roissy-en-Brie, Ozoir-la-Ferrière et Émerainville, ce qui rend possibles des créneaux matinaux réguliers sans surcoût de déplacement.",
      "Les extensions et les aménagements de combles sont une constante du pavillonnaire local, et ils produisent un chantier d'un type particulier : petite surface, très empoussiérée, dans un logement resté occupé pendant les travaux. Le nettoyage y prend plus de temps que la même surface en logement vide, parce qu'il faut protéger, déplacer et remettre en place. Nous le chiffrons sur cette base plutôt que sur la seule surface rénovée.",
      "L'autre demande récurrente vient des résidences pavillonnaires en copropriété horizontale, nombreuses sur la commune : voiries privées, espaces verts communs, locaux techniques et abris à conteneurs. L'entretien y est mixte, entre nettoyage et propreté extérieure, et le périmètre doit être écrit précisément dans le contrat. Nous distinguons systématiquement ce qui relève de nos prestations et ce qui relève d'un paysagiste, pour éviter que la copropriété découvre un trou entre deux marchés.",
    ],
    prestationsPhares: [
      {
        slug: "nettoyage-maison",
        raison:
          "Le pavillonnaire domine, avec des surfaces qui appellent un grand ménage complet plutôt qu'un passage court.",
      },
      {
        slug: "nettoyage-fin-de-chantier-paris",
        raison:
          "Extensions, aménagements de combles et rénovations de pavillons sont continus sur la commune.",
      },
      {
        slug: "nettoyage-bureau",
        raison:
          "Les PME et artisans des parcs d'activité demandent un entretien mixte bureaux et ateliers.",
      },
    ],
    faits: [
      { label: "Depuis Meaux", value: "Environ 35 min" },
      { label: "Parc dominant", value: "Pavillonnaire" },
      { label: "Tournée", value: "Groupée avec Roissy-en-Brie" },
    ],
    faq: [
      {
        question: "Comment chiffrez-vous le ménage d'un pavillon ?",
        answer:
          "Sur la surface réellement à traiter, pas sur la surface habitable annoncée. Un garage aménagé, un sous-sol, une véranda ou des combles changent le temps d'intervention sans figurer sur l'acte de vente. Nous demandons donc le détail des pièces à la demande de devis, ou quelques photos, et le prix annoncé ne bouge pas ensuite.",
      },
      {
        question: "Intervenez-vous dans les locaux d'activité de la Régale et des Berchères ?",
        answer:
          "Oui, sur visite préalable. Ces sites mêlent bureaux, ateliers et zones de stockage : les salissures y sont techniques et le protocole n'est pas celui d'un plateau tertiaire. Nous partons des consignes de sécurité du site et le devis est établi après constat, jamais sur la seule surface au sol.",
      },
      {
        question: "Couvrez-vous Roissy-en-Brie et Ozoir-la-Ferrière ?",
        answer:
          "Oui, ces communes sont traitées dans la même tournée que Pontault-Combault, avec Émerainville, Lésigny et Férolles-Attilly. Le regroupement permet des créneaux matinaux réguliers et évite d'appliquer un surcoût de déplacement sur des interventions courtes.",
      },
      {
        question: "Pouvez-vous reprendre un contrat déjà en cours avec un autre prestataire ?",
        answer:
          "Oui, et c'est un cas fréquent. Nous partons du cahier des charges existant, nous relevons ce qui n'était pas tenu, et nous chiffrons sur cette base plutôt que de proposer un périmètre différent impossible à comparer. La reprise se cale sur la fin du préavis en cours pour qu'il n'y ait aucune interruption de passage.",
      },
    ],
    communesProches: [
      "Roissy-en-Brie",
      "Ozoir-la-Ferrière",
      "Émerainville",
      "Lésigny",
      "Férolles-Attilly",
      "Brie-Comte-Robert",
      "Croissy-Beaubourg",
    ],
    geo: { latitude: 48.7975, longitude: 2.6069 },
  },
] as const;

/** Retrouve une page ville par son slug. */
export function getVille(slug: string): Ville | undefined {
  return villes.find((ville) => ville.slug === slug);
}

/** Slugs de toutes les villes, pour `generateStaticParams` et le sitemap. */
export const villeSlugs = villes.map((ville) => ville.slug);

/** Ville d'implantation de l'entreprise. */
export const villeBase = villes.find((ville) => ville.base);
