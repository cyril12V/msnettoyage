import { faq } from "@/data/faq";
import { getLanding, type Landing } from "@/data/landings";
import { services, type Service } from "@/data/services";
import type { Ville } from "@/data/villes";
import { villes } from "@/data/villes";
import { zones } from "@/data/zones";
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

/** Identifiant stable de l'entreprise, référencé par les autres blocs. */
const idEntreprise = `${site.url}/#entreprise`;

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
 * Zone d'intervention publiée, du plus large au plus précis.
 *
 * L'entreprise couvre l'Île-de-France entière ; les villes nommées sont celles
 * qui disposent d'une page dédiée, c'est-à-dire celles pour lesquelles nous
 * revendiquons explicitement une présence. Déclarer trente villes sans page
 * derrière serait une revendication invérifiable, et Google traite ce genre de
 * liste comme du remplissage.
 */
function zoneDIntervention(): JsonLdObject[] {
  const communes = new Map<string, JsonLdObject>();

  for (const ville of villes) {
    communes.set(ville.nom, {
      "@type": "City",
      name: ville.nom,
      address: {
        "@type": "PostalAddress",
        addressLocality: ville.nom,
        postalCode: ville.codePostal,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    });
  }

  return [
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    ...zones.map((zone) => ({ "@type": "AdministrativeArea" as const, name: zone.name })),
    ...communes.values(),
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
    "@type": "LocalBusiness",
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
 * Fiche d'une prestation locale, pour une page d'atterrissage.
 *
 * `areaServed` désigne la ville et non la région : c'est ce qui rattache la
 * page à une recherche géolocalisée. `serviceType` reprend la requête visée mot
 * pour mot, ce qui aide les moteurs génératifs à faire le rapprochement avec
 * une question posée en langage naturel.
 */
export function prestationLocaleJsonLd(landing: Landing): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/${landing.slug}`)}#prestation`,
    name: landing.requete,
    serviceType: landing.requete,
    description: landing.lede,
    url: absoluteUrl(`/${landing.slug}`),
    provider: { "@id": idEntreprise },
    areaServed: {
      "@type": "City",
      name: site.address.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        postalCode: site.address.postalCode,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
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
