/**
 * Source de vérité unique des informations commerciales et légales.
 *
 * Le NAP (Name, Address, Phone) doit être STRICTEMENT identique ici, sur la
 * fiche Google Business Profile et sur les annuaires : toute divergence dégrade
 * le référencement local. Ne jamais dupliquer ces valeurs dans les composants.
 *
 * Les champs marqués « à compléter » sont obligatoires légalement (mentions
 * légales) ou fortement recommandés (horaires, note Google) et doivent être
 * renseignés avant la mise en ligne, voir la checklist de DEPLOIEMENT.md.
 */

/** URL utilisée si aucune variable d'environnement n'est fournie. */
const URL_PAR_DEFAUT = "https://www.msnettoyage.fr";

/**
 * Normalise l'URL du site.
 *
 * La valeur vient d'une variable d'environnement, donc d'une saisie humaine ou
 * d'un pipe de terminal : espaces, retours chariot et slash final sont écartés.
 * Une valeur qui reste inexploitable fait retomber sur l'URL par défaut plutôt
 * que de faire échouer le build sur un `new URL` invalide, ce qui casserait le
 * déploiement entier pour une coquille dans un panneau de configuration.
 */
function normaliserUrl(brut: string | undefined): string {
  const nettoye = (brut ?? "").trim().replace(/\/+$/, "");

  if (!nettoye) return URL_PAR_DEFAUT;

  try {
    const url = new URL(nettoye);
    if (url.protocol !== "http:" && url.protocol !== "https:") return URL_PAR_DEFAUT;
    return nettoye;
  } catch {
    return URL_PAR_DEFAUT;
  }
}

/**
 * Marque une mention légale qui ne s'applique pas au statut de l'entreprise,
 * par opposition à une information simplement manquante.
 */
export const SANS_OBJET = "Sans objet";

/** URL canonique, sans slash final. */
export const siteUrl = normaliserUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const site = {
  /**
   * Nom commercial, avec le « s » final.
   *
   * C'est la graphie du nom de domaine (ms-nettoyages.com) et de l'adresse de
   * contact, donc celle que tapent les clients qui cherchent l'entreprise. Le
   * site publiait « MS Nettoyage » au singulier : la requête de marque tombait
   * alors sur des homonymes de Besançon et de Thonon, mieux référencés.
   */
  name: "MS Nettoyages",
  legalName: "MS Nettoyages",

  /**
   * Graphies alternatives, publiées en `alternateName` dans le JSON-LD.
   *
   * Elles rattachent à la même entité les recherches au singulier et les liens
   * déjà émis sous l'ancienne orthographe, sans encombrer les pages.
   */
  alternateNames: ["MS Nettoyage", "MS Nettoyages Meaux", "MS Nettoyages Île-de-France"],

  tagline: "La propreté qui change votre quotidien",
  description:
    "MS Nettoyages est une société de nettoyage professionnel qui intervient à Paris et dans toute l'Île-de-France depuis sa base de Meaux : entretien régulier, nettoyage en profondeur, nettoyage de fin de chantier, ménage Airbnb, bureaux et commerces.",
  url: siteUrl,
  locale: "fr_FR",
  lang: "fr",

  contact: {
    /** Format E.164, utilisé par les liens tel: et le JSON-LD. */
    phone: "+33620460703",
    /** Format d'affichage français. */
    phoneDisplay: "06 20 46 07 03",
    /** Format international affiché dans les blocs de contact. */
    phoneInternational: "+33 6 20 46 07 03",
    /**
     * Adresse publiée, sur le domaine de l'entreprise.
     *
     * Imposée par `SCHEMA MARKUP MS NETTOYAGES.md`, et de toute façon
     * préférable à une adresse Gmail : une messagerie au nom du domaine est un
     * signal de légitimité que Google comme les clients savent lire. Les
     * demandes de devis continuent d'arriver sur les deux boîtes, la
     * configuration se trouve dans `CONTACT_TO_EMAIL`.
     */
    email: "contact@ms-nettoyages.com",
    /** Numéro sans « + » ni espaces, requis par les liens wa.me. */
    whatsapp: "33620460703",
  },

  /**
   * Adresse postale, communiquée par le client le 26 juillet 2026.
   *
   * Elle est publiée sur les mentions légales, où elle est obligatoire, et
   * transmise à Google dans le JSON-LD `PostalAddress`. Le NAP est donc complet :
   * il doit être repris à l'identique sur la fiche Google Business Profile.
   */
  address: {
    streetAddress: "2 square Courbet",
    postalCode: "77100",
    city: "Meaux",
    region: "Île-de-France",
    country: "FR",
  },

  /** Coordonnées du centre-ville de Meaux, point de référence du rayon d'intervention. */
  geo: {
    latitude: 48.9603,
    longitude: 2.8783,
  },

  /**
   * Horaires d'ouverture du standard téléphonique.
   * À valider avec le client avant mise en ligne : ils alimentent le JSON-LD
   * `openingHoursSpecification` et donc la fiche Google.
   */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "13:00" },
  ],
  openingHoursDisplay: [
    { label: "Lundi – Vendredi", value: "7h – 19h" },
    { label: "Samedi", value: "8h – 13h" },
  ],

  /**
   * Informations légales obligatoires sur les mentions légales (art. 6-III LCEN).
   *
   * Trois états possibles pour chaque champ :
   *  - une valeur, affichée telle quelle ;
   *  - `SANS_OBJET`, affiché en gris, pour ce qui ne s'applique pas au statut ;
   *  - une chaîne vide, signalée en rouge sur la page comme information manquante.
   */
  legal: {
    /**
     * Vide à la demande du client, le 26 juillet 2026 : il est aujourd'hui
     * auto-entrepreneur et prépare un passage en SARL. La mention reste pourtant
     * obligatoire, et « Entrepreneur individuel (EI) » serait la valeur exacte
     * en attendant le changement de statut.
     */
    formeJuridique: "",
    siret: "944 486 562 00019",
    rcs: "",
    tvaIntracommunautaire: "",
    /** Un entrepreneur individuel n'a pas de capital social. */
    capitalSocial: SANS_OBJET,
    directeurPublication: "Mezouar Sabri",
    assuranceRcPro: "",
    hebergeur: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      url: "https://vercel.com",
    },
  },

  /** Réseaux sociaux : laisser vide masque l'icône correspondante. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    googleBusiness: "",
  },

  /** Engagement commercial affiché : délai de réponse à une demande de devis. */
  delaiReponse: "24 h",
} as const;

export type Site = typeof site;

/** Lien `tel:` prêt à l'emploi. */
export const telHref = `tel:${site.contact.phone}`;

/** Lien `mailto:` prêt à l'emploi. */
export const mailtoHref = `mailto:${site.contact.email}`;

/** Lien WhatsApp avec message pré-rempli. */
export const whatsappHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  "Bonjour, je souhaite un devis pour une prestation de nettoyage.",
)}`;

/** Construit une URL absolue à partir d'un chemin interne. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
