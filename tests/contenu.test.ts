import { describe, expect, it } from "vitest";
import { faq, faqAccueil, faqCategories } from "@/data/faq";
import { getService, services, serviceSlugs } from "@/data/services";
import { getZone, zones, zoneSlugs } from "@/data/zones";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

/**
 * Garde-fous sur le contenu publié.
 *
 * Ces tests protègent le référencement : un slug dupliqué, un titre trop long
 * ou une méta-description manquante ne casse aucun build, mais dégrade
 * silencieusement les résultats de recherche pendant des mois.
 */

describe("services", () => {
  it("n'a aucun slug en double", () => {
    expect(new Set(serviceSlugs).size).toBe(services.length);
  });

  it("utilise des slugs en minuscules séparés par des tirets", () => {
    for (const slug of serviceSlugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("garde des titres de balise sous 65 caractères", () => {
    for (const service of services) {
      expect(service.metaTitle.length, `metaTitle trop long : ${service.slug}`).toBeLessThanOrEqual(
        65,
      );
    }
  });

  it("garde des méta-descriptions entre 110 et 165 caractères", () => {
    for (const service of services) {
      expect(
        service.metaDescription.length,
        `metaDescription : ${service.slug}`,
      ).toBeGreaterThanOrEqual(110);
      expect(
        service.metaDescription.length,
        `metaDescription : ${service.slug}`,
      ).toBeLessThanOrEqual(165);
    }
  });

  it("décrit chaque prestation avec du contenu exploitable", () => {
    for (const service of services) {
      expect(service.includes.length).toBeGreaterThanOrEqual(4);
      expect(service.forWho.length).toBeGreaterThanOrEqual(3);
      expect(service.body.length).toBeGreaterThanOrEqual(2);
      expect(service.facts.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("retrouve un service par slug et rend undefined sinon", () => {
    expect(getService("menage-airbnb")?.shortName).toBe("Ménage Airbnb");
    expect(getService("inexistant")).toBeUndefined();
  });
});

describe("zones", () => {
  it("n'a aucun slug en double", () => {
    expect(new Set(zoneSlugs).size).toBe(zones.length);
  });

  it("expose exactement une zone marquée comme base", () => {
    expect(zones.filter((zone) => zone.base)).toHaveLength(1);
    expect(zones.find((zone) => zone.base)?.name).toBe(site.address.city);
  });

  it("ne référence que des services existants dans les prestations phares", () => {
    for (const zone of zones) {
      for (const slug of zone.servicesPhares) {
        expect(getService(slug), `${zone.slug} → ${slug}`).toBeDefined();
      }
    }
  });

  it("donne à chaque zone un contenu propre, non dupliqué", () => {
    const chapeaux = zones.map((zone) => zone.lede);
    expect(new Set(chapeaux).size).toBe(zones.length);

    const premiersParagraphes = zones.map((zone) => zone.body[0]);
    expect(new Set(premiersParagraphes).size).toBe(zones.length);

    for (const zone of zones) {
      expect(zone.communes.length).toBeGreaterThanOrEqual(5);
      expect(zone.body.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("retrouve une zone par slug et rend undefined sinon", () => {
    expect(getZone("meaux")?.departement).toBe("77");
    expect(getZone("marseille")).toBeUndefined();
  });
});

describe("faq", () => {
  it("n'a aucune question en double", () => {
    expect(new Set(faq.map((item) => item.question)).size).toBe(faq.length);
  });

  it("pose des questions et donne des réponses autonomes", () => {
    for (const item of faq) {
      expect(item.question.endsWith("?"), `sans point d'interrogation : ${item.question}`).toBe(
        true,
      );
      expect(item.answer.length).toBeGreaterThanOrEqual(80);
    }
  });

  it("range chaque question dans une catégorie déclarée", () => {
    for (const item of faq) {
      expect(faqCategories).toContain(item.categorie);
    }
  });

  it("extrait un sous-ensemble non vide pour la page d'accueil", () => {
    expect(faqAccueil.length).toBeGreaterThan(0);
    expect(faqAccueil.length).toBeLessThanOrEqual(faq.length);
  });
});

describe("configuration du site", () => {
  it("expose un téléphone au format E.164", () => {
    expect(site.contact.phone).toMatch(/^\+33[1-9]\d{8}$/);
  });

  it("expose une URL canonique sans slash final", () => {
    expect(siteUrl.endsWith("/")).toBe(false);
    expect(siteUrl.startsWith("https://")).toBe(true);
  });

  it("construit des URLs absolues correctes", () => {
    expect(absoluteUrl("/services")).toBe(`${siteUrl}/services`);
    expect(absoluteUrl("services")).toBe(`${siteUrl}/services`);
    expect(absoluteUrl()).toBe(`${siteUrl}/`);
  });
});
