import { faq } from "@/data/faq";
import type { Service } from "@/data/services";
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

/** Fiche entreprise, à inclure une seule fois, dans le layout racine. */
export function entrepriseJsonLd(): JsonLdObject {
  const sameAs = reseauxSociaux();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": idEntreprise,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: absoluteUrl("/opengraph-image"),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: adressePostale(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      ...zones.map((zone) => ({ "@type": "City" as const, name: zone.name })),
    ],
    openingHoursSpecification: site.openingHours.map((creneau) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: creneau.days,
      opens: creneau.opens,
      closes: creneau.closes,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Catalogue des prestations, rattaché à la fiche entreprise. */
export function catalogueServicesJsonLd(services: readonly Service[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Prestations de nettoyage, ${site.name}`,
    url: absoluteUrl("/services"),
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.lede,
        url: absoluteUrl(`/services/${service.slug}`),
        provider: { "@id": idEntreprise },
      },
    })),
  };
}

/** Fiche d'une prestation. */
export function serviceJsonLd(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.lede,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.shortName,
    provider: { "@id": idEntreprise },
    areaServed: { "@type": "AdministrativeArea", name: "Île-de-France" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations incluses : ${service.shortName}`,
      itemListElement: service.includes.map((intitule, index) => ({
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
