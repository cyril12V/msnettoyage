import { describe, expect, it } from "vitest";
import { casClients } from "@/data/cas-clients";
import { faq, faqAccueil, faqCategories } from "@/data/faq";
import { realisationPrincipale, realisations, realisationsSecondaires } from "@/data/realisations";
import { getService, services, serviceSlugs } from "@/data/services";
import { temoignages } from "@/data/temoignages";
import { univers } from "@/data/univers";
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

  it("porte déjà le nom de la marque dans les titres de balise", () => {
    // La page Meaux doit donc les publier en `absolute`, sinon le gabarit du
    // layout ajoute « | MS Nettoyages » une seconde fois.
    for (const zone of zones) {
      expect(zone.metaTitle, `sans marque : ${zone.slug}`).toContain(site.name);
    }
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

describe("univers d'intervention", () => {
  it("expose six univers aux identifiants uniques", () => {
    expect(univers).toHaveLength(6);
    expect(new Set(univers.map((item) => item.id)).size).toBe(univers.length);
  });

  it("décrit la photo attendue pour chaque emplacement vide", () => {
    for (const item of univers) {
      if (!item.src) {
        expect(item.photo.length, `photo non décrite : ${item.id}`).toBeGreaterThan(15);
      }
    }
  });
});

describe("réalisations avant / après", () => {
  it("n'a aucun identifiant en double", () => {
    expect(new Set(realisations.map((item) => item.id)).size).toBe(realisations.length);
  });

  it("désigne une seule réalisation principale", () => {
    expect(realisations.filter((item) => item.principale)).toHaveLength(1);
    expect(realisationPrincipale).toBeDefined();
    expect(realisationsSecondaires).toHaveLength(realisations.length - 1);
    expect(realisationsSecondaires.map((item) => item.id)).not.toContain(realisationPrincipale?.id);
  });

  it("décrit les deux photos de chaque paire", () => {
    for (const item of realisations) {
      expect(item.avant.length, `avant non décrit : ${item.id}`).toBeGreaterThan(15);
      expect(item.apres.length, `après non décrit : ${item.id}`).toBeGreaterThan(15);
    }
  });

  it("fournit les deux photos d'une paire, ou aucune", () => {
    for (const item of realisations) {
      expect(
        Boolean(item.avantSrc) === Boolean(item.apresSrc),
        `paire incomplète : ${item.id} — une comparaison à moitié illustrée n'a pas de sens`,
      ).toBe(true);
    }
  });
});

describe("cas clients", () => {
  it("n'a aucun identifiant en double", () => {
    expect(new Set(casClients.map((cas) => cas.id)).size).toBe(casClients.length);
  });

  it("affiche des chiffres courts et libellés", () => {
    for (const cas of casClients) {
      expect(cas.chiffres.length).toBeGreaterThanOrEqual(2);
      for (const chiffre of cas.chiffres) {
        expect(chiffre.valeur.length, `valeur trop longue : ${cas.id}`).toBeLessThanOrEqual(12);
        expect(chiffre.libelle.length).toBeGreaterThan(3);
      }
    }
  });
});

describe("témoignages", () => {
  it("identifie chaque auteur par un prénom et une initiale, jamais un nom complet", () => {
    for (const avis of temoignages) {
      expect(avis.auteur, `auteur non anonymisé : ${avis.auteur}`).toMatch(
        /^\p{Lu}[\p{L}-]+ \p{Lu}\.$/u,
      );
    }
  });

  it("attribue une note comprise entre 1 et 5, lorsqu'elle est renseignée", () => {
    for (const avis of temoignages) {
      if (avis.note !== undefined) {
        expect(avis.note).toBeGreaterThanOrEqual(1);
        expect(avis.note).toBeLessThanOrEqual(5);
      }
    }
  });

  it("situe chaque avis par une qualité et un lieu", () => {
    for (const avis of temoignages) {
      expect(avis.contexte, `contexte incomplet : ${avis.auteur}`).toMatch(/.+, .+/);
    }
  });
});

/**
 * Contrôle de Luhn appliqué au SIREN et au SIRET.
 *
 * Les deux numéros portent une clé de contrôle : une faute de frappe change la
 * somme et devient détectable sans rien interroger d'extérieur.
 */
function luhnValide(numero: string): boolean {
  const chiffres = numero.replace(/\s/g, "").split("").map(Number);

  const somme = chiffres.reduce((total, chiffre, index) => {
    // Les positions paires en partant de la gauche sont doublées.
    if ((index + 1) % 2 !== 0) return total + chiffre;
    const double = chiffre * 2;
    return total + (double > 9 ? double - 9 : double);
  }, 0);

  return somme % 10 === 0;
}

describe("mentions légales", () => {
  it("expose un SIRET à 14 chiffres dont la clé est correcte", () => {
    const siret = site.legal.siret.replace(/\s/g, "");

    expect(siret, "SIRET absent").not.toBe("");
    expect(siret).toMatch(/^\d{14}$/);
    expect(luhnValide(siret), "clé de contrôle du SIRET invalide").toBe(true);
    expect(luhnValide(siret.slice(0, 9)), "clé de contrôle du SIREN invalide").toBe(true);
  });

  it("publie une adresse de siège complète", () => {
    expect(site.address.streetAddress, "rue du siège absente").not.toBe("");
    expect(site.address.postalCode).toMatch(/^\d{5}$/);
    expect(site.address.city).not.toBe("");
  });

  it("désigne un responsable de la publication", () => {
    expect(site.legal.directeurPublication).not.toBe("");
  });
});

describe("configuration du site", () => {
  it("expose un téléphone au format E.164", () => {
    expect(site.contact.phone).toMatch(/^\+33[1-9]\d{8}$/);
  });

  it("déclare des horaires exploitables par Google", () => {
    // Ces valeurs partent telles quelles dans `openingHoursSpecification`, donc
    // dans la fiche Google. Un nom de jour mal orthographié ou une heure au
    // mauvais format ne casse aucun build : le créneau est simplement ignoré,
    // et la fiche affiche des horaires incomplets sans que personne ne le voie.
    const joursValides = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    expect(site.openingHours.length).toBeGreaterThan(0);
    expect(site.openingHoursDisplay.length).toBeGreaterThan(0);

    for (const creneau of site.openingHours) {
      expect(creneau.days.length, "créneau sans jour").toBeGreaterThan(0);

      for (const jour of creneau.days) {
        expect(joursValides, `jour inconnu : ${jour}`).toContain(jour);
      }

      expect(creneau.opens, `ouverture : ${creneau.opens}`).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
      expect(creneau.closes, `fermeture : ${creneau.closes}`).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
      expect(creneau.opens < creneau.closes, "fermeture avant ouverture").toBe(true);
    }

    // Un même jour déclaré deux fois produit deux créneaux concurrents.
    const tousLesJours = site.openingHours.flatMap((creneau) => creneau.days);
    expect(new Set(tousLesJours).size, "jour déclaré deux fois").toBe(tousLesJours.length);
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
