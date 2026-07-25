/**
 * Source de vérité unique des informations commerciales et légales.
 *
 * Le NAP (Name, Address, Phone) doit être STRICTEMENT identique ici, sur la
 * fiche Google Business Profile et sur les annuaires : toute divergence dégrade
 * le référencement local. Ne jamais dupliquer ces valeurs dans les composants.
 *
 * Les champs marqués « à compléter » sont obligatoires légalement (mentions
 * légales) ou fortement recommandés (horaires, note Google) et doivent être
 * renseignés avant la mise en ligne — voir la checklist de DEPLOIEMENT.md.
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.msnettoyage.fr";

/** URL canonique sans slash final, quel que soit le format saisi en variable d'env. */
export const siteUrl = RAW_SITE_URL.replace(/\/+$/, "");

export const site = {
  name: "MS Nettoyage",
  legalName: "MS Nettoyage",
  tagline: "La propreté qui change votre quotidien",
  description:
    "MS Nettoyage est une entreprise de nettoyage professionnel basée à Meaux qui intervient dans toute l'Île-de-France : entretien régulier, nettoyage en profondeur, remise en état après travaux, ménage Airbnb, bureaux et commerces.",
  url: siteUrl,
  locale: "fr_FR",
  lang: "fr",

  contact: {
    /** Format E.164 — utilisé par les liens tel: et le JSON-LD. */
    phone: "+33620460703",
    /** Format d'affichage français. */
    phoneDisplay: "06 20 46 07 03",
    /** Format international affiché dans les blocs de contact. */
    phoneInternational: "+33 6 20 46 07 03",
    email: "msnettoyage211@gmail.com",
    /** Numéro sans « + » ni espaces, requis par les liens wa.me. */
    whatsapp: "33620460703",
  },

  /**
   * Adresse postale. `streetAddress` est volontairement vide : l'adresse exacte
   * n'a pas été communiquée. Le JSON-LD l'omet tant qu'elle est vide plutôt que
   * de publier une adresse inventée.
   */
  address: {
    streetAddress: "",
    postalCode: "77100",
    city: "Meaux",
    region: "Île-de-France",
    country: "FR",
  },

  /** Coordonnées du centre-ville de Meaux — point de référence du rayon d'intervention. */
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
   * Laisser vide affiche « Information à compléter » sur la page dédiée.
   */
  legal: {
    formeJuridique: "",
    siret: "",
    rcs: "",
    tvaIntracommunautaire: "",
    capitalSocial: "",
    directeurPublication: "",
    assuranceRcPro: "",
    hebergeur: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      url: "https://vercel.com",
    },
  },

  /** Réseaux sociaux — laisser vide masque l'icône correspondante. */
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
