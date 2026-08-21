import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { faq } from "@/data/faq";
import { landings } from "@/data/landings";
import { services } from "@/data/services";
import { villes } from "@/data/villes";
import {
  breadcrumbJsonLd,
  catalogueServicesJsonLd,
  entrepriseJsonLd,
  faqJsonLd,
  type JsonLdObject,
  prestationLocaleJsonLd,
  siteWebJsonLd,
  villeJsonLd,
} from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Contrat des données structurées.
 *
 * Ces blocs sont invisibles : ils ne s'affichent pas, ne cassent aucun build, et
 * une erreur y survit des mois. Deux audits successifs ont d'ailleurs affirmé
 * qu'ils étaient absents du site alors qu'ils y étaient, parce que l'outil
 * n'inspectait que le `<head>`. Ces tests permettent de trancher la question par
 * une commande plutôt que par la lecture du code source d'une page.
 *
 * Google accepte le JSON-LD dans le `<head>` comme dans le `<body>`. Le site
 * l'émet en fin de `<body>` : un bloc qui dépend des données de la page ne peut
 * pas passer par l'API `metadata` de Next.js, qui ne gère que les balises
 * `meta` et `link`.
 */

/** Types d'un bloc, que `@type` soit une chaîne ou un tableau. */
function types(bloc: JsonLdObject): string[] {
  const valeur = bloc["@type"];
  if (Array.isArray(valeur)) return valeur as string[];
  return [String(valeur)];
}

/** Ce que chaque famille de page publie réellement, gabarit par gabarit. */
const PAGES = [
  {
    nom: "accueil",
    blocs: [entrepriseJsonLd(), siteWebJsonLd(), catalogueServicesJsonLd(services), faqJsonLd(faq)],
    attendus: ["LocalBusiness", "WebSite", "OfferCatalog", "FAQPage"],
  },
  {
    nom: "prestation",
    blocs: [
      entrepriseJsonLd(),
      siteWebJsonLd(),
      prestationLocaleJsonLd(landings[0]!),
      faqJsonLd(landings[0]!.faq),
      breadcrumbJsonLd([{ label: "Accueil", href: "/" }]),
    ],
    attendus: ["LocalBusiness", "WebSite", "Service", "FAQPage", "BreadcrumbList"],
  },
  {
    nom: "ville",
    blocs: [
      entrepriseJsonLd(),
      siteWebJsonLd(),
      villeJsonLd(villes[0]!),
      faqJsonLd(villes[0]!.faq),
      breadcrumbJsonLd([{ label: "Accueil", href: "/" }]),
    ],
    attendus: ["LocalBusiness", "WebSite", "Service", "FAQPage", "BreadcrumbList"],
  },
] as const;

describe("blocs publiés par gabarit de page", () => {
  it("publie les types attendus sur chaque gabarit", () => {
    for (const page of PAGES) {
      const publies = page.blocs.flatMap(types);

      for (const attendu of page.attendus) {
        expect(publies, `${attendu} absent du gabarit ${page.nom}`).toContain(attendu);
      }
    }
  });

  it("produit un JSON sérialisable, sans valeur perdue", () => {
    // `JSON.stringify` supprime silencieusement les `undefined` : un champ mal
    // orthographié disparaît du balisage sans la moindre erreur.
    for (const page of PAGES) {
      for (const bloc of page.blocs) {
        const serialise = JSON.stringify(bloc);
        expect(serialise, `bloc vide sur ${page.nom}`).toBeTruthy();
        expect(serialise).not.toContain("undefined");
        expect(() => JSON.parse(serialise)).not.toThrow();
      }
    }
  });

  it("déclare un contexte schema.org sur chaque bloc", () => {
    for (const page of PAGES) {
      for (const bloc of page.blocs) {
        expect(bloc["@context"], `contexte absent sur ${page.nom}`).toBe("https://schema.org");
      }
    }
  });

  it("ne publie jamais deux blocs du même type sur une page", () => {
    // Deux FAQPage concurrents sur une même page : Google n'en retient qu'un,
    // sans que l'on choisisse lequel.
    for (const page of PAGES) {
      const publies = page.blocs.flatMap(types);
      expect(new Set(publies).size, `type dupliqué sur ${page.nom}`).toBe(publies.length);
    }
  });
});

describe("fiche entreprise", () => {
  const entreprise = entrepriseJsonLd();

  it("porte le double typage et l'ancre imposés par le document de balisage", () => {
    expect(types(entreprise)).toEqual(["LocalBusiness", "CleaningService"]);
    expect(entreprise["@id"]).toBe(`${site.url}/#business`);
  });

  it("publie un NAP complet, identique à la source unique", () => {
    expect(entreprise.name).toBe(site.name);
    expect(entreprise.telephone).toBe(site.contact.phone);
    expect(entreprise.email).toBe(site.contact.email);

    const adresse = entreprise.address as Record<string, string>;
    expect(adresse.streetAddress).toBe(site.address.streetAddress);
    expect(adresse.postalCode).toBe(site.address.postalCode);
    expect(adresse.addressLocality).toBe(site.address.city);
  });

  it("couvre les huit départements franciliens avec leur numéro", () => {
    const zones = entreprise.areaServed as Record<string, string>[];
    const departements = zones.filter((zone) => zone["@type"] === "AdministrativeArea");

    expect(departements).toHaveLength(8);
    expect(departements.map((zone) => zone.areaCode).sort()).toEqual([
      "75",
      "77",
      "78",
      "91",
      "92",
      "93",
      "94",
      "95",
    ]);
  });

  it("nomme chaque commune disposant d'une page dédiée", () => {
    const zones = entreprise.areaServed as Record<string, string>[];
    const communes = zones.filter((zone) => zone["@type"] === "City").map((zone) => zone.name);

    for (const ville of villes) {
      expect(communes, `commune absente : ${ville.nom}`).toContain(ville.nom);
    }
  });

  it("déclare les sept prestations du catalogue", () => {
    const catalogue = entreprise.hasOfferCatalog as { itemListElement: unknown[] };
    expect(catalogue.itemListElement).toHaveLength(7);
  });

  it("annonce les mêmes horaires que la source unique", () => {
    const creneaux = entreprise.openingHoursSpecification as Record<string, unknown>[];
    expect(creneaux).toHaveLength(site.openingHours.length);
    expect(creneaux[0]?.dayOfWeek).toEqual([...site.openingHours[0]!.days]);
  });

  it("n'invente aucune note ni aucun avis", () => {
    // Un AggregateRating sans avis réel est une pratique commerciale trompeuse
    // et un motif de pénalité manuelle.
    expect(entreprise.aggregateRating).toBeUndefined();
    expect(entreprise.review).toBeUndefined();
  });
});

describe("blocs de service", () => {
  it("rattache chaque prestation à la fiche entreprise", () => {
    for (const landing of landings) {
      const bloc = prestationLocaleJsonLd(landing);

      expect(types(bloc)).toEqual(["Service"]);
      expect(bloc["@id"]).toBe(`${site.url}/${landing.slug}#service`);
      expect(bloc.url).toBe(`${site.url}/${landing.slug}`);
      expect(bloc.provider).toEqual({ "@id": `${site.url}/#business` });
      expect(bloc.offers, `offre absente : ${landing.slug}`).toBeDefined();
    }
  });

  it("rattache chaque ville à la fiche entreprise et à sa commune", () => {
    for (const ville of villes) {
      const bloc = villeJsonLd(ville);
      const zones = bloc.areaServed as Record<string, string>[];

      expect(types(bloc)).toEqual(["Service"]);
      expect(bloc["@id"]).toBe(`${site.url}/${ville.slug}#intervention`);
      expect(bloc.provider).toEqual({ "@id": `${site.url}/#business` });
      expect(zones[0]?.name, `commune absente : ${ville.slug}`).toBe(ville.nom);
    }
  });
});

describe("questions fréquentes", () => {
  it("reprend exactement les questions affichées, sans en ajouter", () => {
    // Un FAQPage qui ne correspond pas au texte visible est considéré comme du
    // balisage trompeur par Google, et sanctionné comme tel.
    for (const landing of landings) {
      const bloc = faqJsonLd(landing.faq) as { mainEntity: Record<string, unknown>[] };
      expect(bloc.mainEntity).toHaveLength(landing.faq.length);

      bloc.mainEntity.forEach((question, index) => {
        const source = landing.faq[index]!;
        expect(question.name).toBe(source.question);
        expect((question.acceptedAnswer as Record<string, string>).text).toBe(source.answer);
      });
    }

    for (const ville of villes) {
      const bloc = faqJsonLd(ville.faq) as { mainEntity: unknown[] };
      expect(bloc.mainEntity, `FAQ incomplète : ${ville.slug}`).toHaveLength(ville.faq.length);
    }
  });
});

describe("robots.txt", () => {
  const regles = robots();

  it("laisse le site explorable et déclare le sitemap", () => {
    expect(regles.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(Array.isArray(regles.rules)).toBe(true);
  });

  it("n'émet aucune directive Host", () => {
    // Host n'est comprise que par Yandex. Google et Bing l'ignorent, et une
    // ligne inconnue dans un robots.txt n'apporte qu'un doute à qui l'inspecte.
    expect(regles.host).toBeUndefined();
  });

  it("autorise explicitement les robots des moteurs génératifs", () => {
    const regleList = Array.isArray(regles.rules) ? regles.rules : [regles.rules];
    const agents = regleList.flatMap((regle) =>
      Array.isArray(regle.userAgent) ? regle.userAgent : [regle.userAgent],
    );

    for (const robot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      expect(agents, `robot non autorisé : ${robot}`).toContain(robot);
    }
  });
});
