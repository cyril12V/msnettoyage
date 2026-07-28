import { faq } from "@/data/faq";
import { getLanding, type Landing } from "@/data/landings";
import { services, type Service } from "@/data/services";
import type { Ville } from "@/data/villes";
import { villes } from "@/data/villes";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Générateurs de données structurées JSON-LD.
 *
 * Ces blocs sont ce que Google exploite pour le pack local et ce que les
 * moteurs génératifs (ChatGPT, Perplexity, AI Overviews) extraient le plus
 * facilement. Toutes les valeurs proviennent de `site.ts` : le NAP publié est
 * donc rigoureusement identique partout.
 */

export type JsonLdObject = Record<string, unknown>;

/**
 * Identifiant stable de l'entreprise, référencé par les autres blocs.
 *
 * `#business` est l'ancre imposée par `SCHEMA MARKUP MS NETTOYAGES.md`. Elle
 * doit rester identique partout : c'est elle qui dit à Google que la fiche
 * entreprise du pied de page et le `provider` de chaque service désignent la
 * même entité, et non deux entreprises homonymes.
 */
const idEntreprise = `${site.url}/#business`;

function adressePostale(): JsonLdObject {
  const adresse: JsonLdObject = {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };

  // Une adresse de rue inventée serait pire que pas d'adresse du tout : elle
  // désaligne le NAP et casse la cohérence avec la fiche Google.
  if (site.address.streetAddress) {
    adresse.streetAddress = site.address.streetAddress;
  }

  return adresse;
}

function reseauxSociaux(): string[] {
  const urls: string[] = Object.values(site.social);

  return urls.filter((url) => url.length > 0);
}

/** Lien Google Maps construit à partir de l'adresse publiée. */
function lienCarte(): string {
  const adresse = [site.address.streetAddress, site.address.postalCode, site.address.city]
    .filter(Boolean)
    .join(" ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
}

/**
 * Les huit départements franciliens, dans l'ordre et la forme imposés par
 * `SCHEMA MARKUP MS NETTOYAGES.md`.
 *
 * Paris y figure comme `AdministrativeArea` au même titre que les sept autres :
 * c'est à la fois une commune et un département, et c'est le découpage que
 * comprend un lecteur comme un moteur.
 */
const DEPARTEMENTS_IDF: readonly { name: string; areaCode: string }[] = [
  { name: "Paris", areaCode: "75" },
  { name: "Seine-et-Marne", areaCode: "77" },
  { name: "Yvelines", areaCode: "78" },
  { name: "Essonne", areaCode: "91" },
  { name: "Hauts-de-Seine", areaCode: "92" },
  { name: "Seine-Saint-Denis", areaCode: "93" },
  { name: "Val-de-Marne", areaCode: "94" },
  { name: "Val-d'Oise", areaCode: "95" },
] as const;

/**
 * Les sept prestations déclarées au catalogue de l'entreprise.
 *
 * Liste et ordre repris de `SCHEMA MARKUP MS NETTOYAGES.md`. Elle distingue
 * « ménage après travaux » et « nettoyage fin de chantier », qui sont deux
 * intitulés de recherche distincts même si le site les traite sur une seule
 * page : le catalogue décrit ce que l'entreprise sait faire, pas l'arborescence
 * du site.
 */
const CATALOGUE_ENTREPRISE: readonly string[] = [
  "Nettoyage de maison",
  "Nettoyage de bureau",
  "Ménage particulier",
  "Ménage après travaux",
  "Nettoyage fin de chantier",
  "Ménage après déménagement",
  "Ménage Airbnb",
] as const;

/**
 * Zone d'intervention publiée, du plus large au plus précis.
 *
 * Les huit départements viennent en premier, dans la forme imposée par le
 * document de balisage. Les communes nommées ensuite sont celles qui disposent
 * d'une page dédiée, c'est-à-dire celles pour lesquelles nous revendiquons
 * explicitement une présence. Déclarer trente villes sans page derrière serait
 * une revendication invérifiable, et Google traite ce genre de liste comme du
 * remplissage.
 */
function zoneDIntervention(): JsonLdObject[] {
  const communes = villes.map((ville) => ({
    "@type": "City",
    name: ville.nom,
    address: {
      "@type": "PostalAddress",
      addressLocality: ville.nom,
      postalCode: ville.codePostal,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  }));

  return [
    ...DEPARTEMENTS_IDF.map((departement) => ({
      "@type": "AdministrativeArea",
      name: departement.name,
      areaCode: departement.areaCode,
    })),
    ...communes,
  ];
}

/**
 * Fiche entreprise, à inclure une seule fois, dans le layout racine.
 *
 * C'est le bloc que Google exploite pour le pack local et que les moteurs
 * génératifs citent en priorité : il concentre tout ce qui identifie
 * l'entreprise, sa zone et ce qu'elle propose.
 */
export function entrepriseJsonLd(): JsonLdObject {
  const sameAs = reseauxSociaux();

  return {
    "@context": "https://schema.org",
    /**
     * Double typage voulu par le document de balisage.
     *
     * `CleaningService` n'existe pas au vocabulaire schema.org, vérifié :
     * https://schema.org/CleaningService renvoie une 404. Déclaré seul, il
     * serait ignoré et l'entreprise perdrait son type. Déclaré en tableau avec
     * `LocalBusiness`, le type valide porte le sens, l'autre est simplement
     * ignoré par les moteurs. Le bloc reste donc valide et l'intitulé métier
     * lisible pour les lecteurs humains du balisage.
     */
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": idEntreprise,
    name: site.name,
    legalName: site.legalName,
    // Rattache à la même entité les recherches au singulier, « MS Nettoyage »,
    // et les liens déjà émis sous cette graphie.
    alternateName: [...site.alternateNames],
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    // Déclarer les dimensions évite à Google de télécharger l'image pour les deviner.
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-ms-nettoyage.png"),
      width: 546,
      height: 271,
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Virement bancaire, chèque, espèces",
    address: adressePostale(),
    hasMap: lienCarte(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: zoneDIntervention(),
    // Domaines d'expertise : ce sont les intitulés que les moteurs génératifs
    // rapprochent d'une question posée en langage naturel.
    knowsAbout: services.map((service) => service.shortName),
    // Catalogue des sept prestations, dans l'ordre imposé par le document de
    // balisage. C'est ce bloc que Google lit pour savoir ce que vend
    // l'entreprise, indépendamment de l'arborescence du site.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services de nettoyage ${site.name}`,
      itemListElement: CATALOGUE_ENTREPRISE.map((intitule, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: { "@type": "Service", name: intitule },
      })),
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.lede,
      },
    })),
    openingHoursSpecification: site.openingHours.map((creneau) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: creneau.days,
      opens: creneau.opens,
      closes: creneau.closes,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/**
 * Identité du site lui-même, distincte de l'entreprise qu'il présente.
 *
 * Google s'en sert pour rattacher toutes les pages à une même entité et pour
 * afficher le nom du site plutôt que le nom de domaine dans les résultats.
 */
export function siteWebJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#site`,
    name: site.name,
    alternateName: `${site.name} ${site.address.city}`,
    url: site.url,
    inLanguage: site.lang,
    publisher: { "@id": idEntreprise },
  };
}

/**
 * Catalogue des prestations, rattaché à la fiche entreprise.
 *
 * Les prestations n'ont pas de page propre : elles vivent dans la section
 * services de la page unique. Aucune `url` n'est donc déclarée par offre, une
 * URL inexistante dans un balisage étant pire que pas d'URL du tout.
 */
export function catalogueServicesJsonLd(services: readonly Service[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Prestations de nettoyage, ${site.name}`,
    url: absoluteUrl("/#services"),
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.lede,
        provider: { "@id": idEntreprise },
      },
    })),
  };
}

/**
 * Fiche d'une prestation, pour une page de service.
 *
 * `areaServed` couvre l'Île-de-France entière et nomme les villes qui ont une
 * page dédiée. La version précédente désignait la seule ville de Meaux, ce qui
 * disait à Google que la prestation s'arrêtait aux limites de la commune :
 * c'était le verrou géographique le plus coûteux du site.
 *
 * `serviceType` reprend la requête visée mot pour mot, ce qui aide les moteurs
 * génératifs à faire le rapprochement avec une question posée en langage
 * naturel.
 */
export function prestationLocaleJsonLd(landing: Landing): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    // Ancre `#service` imposée par le document de balisage, distincte du
    // `#business` de l'entreprise : deux entités, deux identifiants.
    "@id": `${absoluteUrl(`/${landing.slug}`)}#service`,
    name: landing.requete,
    serviceType: landing.libelleCourt,
    description: landing.lede,
    url: absoluteUrl(`/${landing.slug}`),
    provider: { "@id": idEntreprise },
    // La région vient en tête, dans la forme imposée par le document de
    // balisage ; les communes qui suivent portent le signal local que la seule
    // mention « Île-de-France » ne donne pas.
    areaServed: [{ "@type": "Region", name: "Île-de-France" }, ...zoneDIntervention()],
    // Le devis est gratuit : c'est l'offre réellement faite au visiteur, et
    // c'est ce que déclare le document de balisage. Le prix de la prestation
    // elle-même n'est pas publié, faute de barème appliqué.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: `Devis gratuit sous ${site.delaiReponse}`,
    },
    audience: {
      "@type": "Audience",
      audienceType: landing.pourQui.join(", "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations incluses : ${landing.libelleCourt}`,
      itemListElement: landing.inclus.map((intitule, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: { "@type": "Service", name: intitule },
      })),
    },
  };
}

/**
 * Fiche d'intervention sur une ville, pour une page ville.
 *
 * C'est le bloc qui rattache explicitement l'entreprise à une commune. Le
 * `areaServed` est ici réduit à la seule ville, communes limitrophes comprises :
 * l'intérêt d'une page ville est justement de dire « ici », là où les pages de
 * prestation disent « en Île-de-France ».
 */
export function villeJsonLd(ville: Ville): JsonLdObject {
  const url = absoluteUrl(`/${ville.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#intervention`,
    name: ville.requete,
    serviceType: `Nettoyage professionnel à ${ville.nom}`,
    description: ville.lede,
    url,
    provider: { "@id": idEntreprise },
    areaServed: [
      {
        "@type": "City",
        name: ville.nom,
        address: {
          "@type": "PostalAddress",
          addressLocality: ville.nom,
          postalCode: ville.codePostal,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: ville.geo.latitude,
          longitude: ville.geo.longitude,
        },
      },
      ...ville.communesProches.map((commune) => ({
        "@type": "City" as const,
        name: commune,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations de nettoyage à ${ville.nom}`,
      itemListElement: ville.prestationsPhares.flatMap((phare, index) => {
        const landing = getLanding(phare.slug);
        if (!landing) return [];

        return [
          {
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: `${landing.libelleCourt} à ${ville.nom}`,
              description: phare.raison,
              url: absoluteUrl(`/${landing.slug}`),
              provider: { "@id": idEntreprise },
            },
          },
        ];
      }),
    },
  };
}

/**
 * Questions/réponses extractibles.
 *
 * @param items Sous-ensemble de la FAQ effectivement affiché sur la page :
 * publier un JSON-LD qui ne correspond pas au contenu visible est considéré
 * comme du balisage trompeur par Google.
 */
export function faqJsonLd(
  items: readonly { question: string; answer: string }[] = faq,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Fil d'Ariane. `items` doit reprendre exactement le fil affiché. */
export function breadcrumbJsonLd(items: readonly { label: string; href: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
