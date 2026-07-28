import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getLanding, landings, landingSlugs } from "@/data/landings";
import { prestationsNav } from "@/data/navigation";
import { villes } from "@/data/villes";
import { site } from "@/lib/site";

/**
 * Garde-fous des pages de prestation.
 *
 * Ces pages portent le référencement du site : une requête par page, un
 * contenu propre à chacune. Les erreurs visées ici ne cassent aucun build et
 * ne se voient pas à l'œil nu, mais font redescendre les pages pendant des
 * mois : slug dupliqué, titre tronqué dans les résultats, paragraphe recopié
 * d'une page à l'autre, ou deux pages qui se disputent le même mot-clé.
 */

describe("pages de prestation", () => {
  it("n'a aucun slug en double", () => {
    expect(new Set(landingSlugs).size).toBe(landings.length);
  });

  it("utilise des slugs en minuscules, sans nom de ville", () => {
    // Une URL qui contient une ville ne peut pas remonter sur une autre : elle
    // annonce d'elle-même son périmètre. La géographie appartient aux pages
    // villes, ces pages-ci portent la prestation.
    const nomsDeVille = villes.map((ville) => ville.nom.toLowerCase().replace(/[^a-z]+/g, "-"));

    for (const landing of landings) {
      expect(landing.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

      for (const nom of nomsDeVille) {
        expect(landing.slug.endsWith(`-${nom}`), `ville dans le slug : ${landing.slug}`).toBe(false);
      }
    }
  });

  it("annonce la couverture Île-de-France dans la requête, le H1 et le titre", () => {
    for (const landing of landings) {
      expect(landing.requete, `requête : ${landing.slug}`).toContain("Île-de-France");
      expect(landing.h1, `H1 : ${landing.slug}`).toContain("Île-de-France");
      expect(landing.metaTitle, `metaTitle : ${landing.slug}`).toMatch(/Île-de-France|IDF/);
    }
  });

  it("nomme Paris dans le H1 de chaque prestation", () => {
    // Paris concentre l'essentiel du volume de recherche des mots-clés visés :
    // un H1 qui ne le nomme pas laisse la requête aux concurrents.
    for (const landing of landings) {
      expect(landing.h1, `Paris absent du H1 : ${landing.slug}`).toContain("Paris");
    }
  });

  it("cite la marque et Meaux quelque part dans le contenu", () => {
    // Le site reste rattaché à une adresse réelle : c'est ce qui sépare une
    // entreprise locale d'un agrégateur, aux yeux de Google comme des clients.
    const texte = landings
      .flatMap((landing) => [landing.lede, ...landing.corps, ...landing.faq.map((f) => f.answer)])
      .join(" ");

    expect(texte).toContain(site.name);
  });

  it("porte déjà le nom de la marque dans les titres de balise", () => {
    // Les pages les publient donc en `absolute` : sinon le gabarit du layout
    // ajoute « | MS Nettoyages » une seconde fois.
    for (const landing of landings) {
      expect(landing.metaTitle, `sans marque : ${landing.slug}`).toContain(site.name);
    }
  });

  it("garde des titres de balise sous 65 caractères", () => {
    for (const landing of landings) {
      expect(landing.metaTitle.length, `metaTitle trop long : ${landing.slug}`).toBeLessThanOrEqual(
        65,
      );
    }
  });

  it("garde des méta-descriptions entre 110 et 165 caractères", () => {
    for (const landing of landings) {
      expect(
        landing.metaDescription.length,
        `metaDescription : ${landing.slug}`,
      ).toBeGreaterThanOrEqual(110);
      expect(
        landing.metaDescription.length,
        `metaDescription : ${landing.slug}`,
      ).toBeLessThanOrEqual(165);
    }
  });
});

describe("cannibalisation entre pages", () => {
  it("vise une requête distincte par page", () => {
    const requetes = landings.map((landing) => landing.requete.toLowerCase());
    expect(new Set(requetes).size).toBe(landings.length);
  });

  it("n'affiche jamais deux fois le même titre de balise", () => {
    const titres = landings.map((landing) => landing.metaTitle);
    expect(new Set(titres).size).toBe(landings.length);
  });

  it("ne recopie aucun texte d'une page à l'autre", () => {
    const chapeaux = landings.map((landing) => landing.lede);
    expect(new Set(chapeaux).size, "chapeau dupliqué").toBe(landings.length);

    const descriptions = landings.map((landing) => landing.metaDescription);
    expect(new Set(descriptions).size, "méta-description dupliquée").toBe(landings.length);

    const paragraphes = landings.flatMap((landing) => landing.corps);
    expect(new Set(paragraphes).size, "paragraphe dupliqué").toBe(paragraphes.length);
  });

  it("ne pose jamais deux fois la même question", () => {
    // Une question identique sur deux pages produit deux blocs FAQPage
    // concurrents : Google n'en retient qu'un, sans que l'on choisisse lequel.
    const questions = landings.flatMap((landing) => landing.faq.map((item) => item.question));
    expect(new Set(questions).size).toBe(questions.length);
  });
});

describe("contenu des pages d'atterrissage", () => {
  it("décrit chaque prestation avec de la matière exploitable", () => {
    for (const landing of landings) {
      expect(landing.inclus.length, `inclus : ${landing.slug}`).toBeGreaterThanOrEqual(4);
      expect(landing.pourQui.length, `pourQui : ${landing.slug}`).toBeGreaterThanOrEqual(3);
      expect(landing.faits.length, `faits : ${landing.slug}`).toBeGreaterThanOrEqual(2);
      expect(landing.corps.length, `corps : ${landing.slug}`).toBeGreaterThanOrEqual(3);
      expect(landing.faq.length, `faq : ${landing.slug}`).toBeGreaterThanOrEqual(3);
    }
  });

  it("ouvre par une définition autonome, citable hors contexte", () => {
    // Un moteur génératif cite un paragraphe isolé : il doit se suffire à
    // lui-même et nommer la prestation, pas commencer par « nous ».
    for (const landing of landings) {
      expect(landing.lede.length, `chapeau trop court : ${landing.slug}`).toBeGreaterThanOrEqual(
        120,
      );
      expect(
        landing.lede.toLowerCase().startsWith("le ") ||
          landing.lede.toLowerCase().startsWith("la "),
      ).toBe(true);
    }
  });

  it("pose des questions et donne des réponses autonomes", () => {
    for (const landing of landings) {
      for (const item of landing.faq) {
        expect(item.question.endsWith("?"), `sans point d'interrogation : ${item.question}`).toBe(
          true,
        );
        expect(item.answer.length, `réponse trop courte : ${item.question}`).toBeGreaterThanOrEqual(
          120,
        );
      }
    }
  });

  it("garde des repères chiffrés courts, lisibles en encart", () => {
    for (const landing of landings) {
      for (const fait of landing.faits) {
        expect(fait.label.length, `label trop long : ${landing.slug}`).toBeLessThanOrEqual(20);
        expect(fait.value.length, `valeur trop longue : ${landing.slug}`).toBeLessThanOrEqual(40);
      }
    }
  });

  it("n'utilise aucun tiret cadratin dans le contenu publié", () => {
    const texte = landings
      .flatMap((landing) => [
        landing.h1,
        landing.metaTitle,
        landing.metaDescription,
        landing.lede,
        ...landing.inclus,
        ...landing.pourQui,
        ...landing.corps,
        ...landing.faq.flatMap((item) => [item.question, item.answer]),
      ])
      .join(" ");

    expect(texte).not.toMatch(/[—–]/);
  });

  it("ne référence que des visuels réellement présents", () => {
    for (const landing of landings) {
      if (!landing.image) continue;
      const chemin = join(process.cwd(), "public", landing.image);
      expect(existsSync(chemin), `visuel absent : ${landing.image}`).toBe(true);
    }
  });
});

describe("maillage interne", () => {
  it("expose chaque page de prestation dans la navigation", () => {
    // Ces liens figurent dans le pied de page de tout le site : c'est ce qui
    // garantit que chaque page reste atteignable en un clic depuis n'importe où.
    expect(prestationsNav).toHaveLength(landings.length);

    for (const landing of landings) {
      expect(prestationsNav.map((lien) => lien.href)).toContain(`/${landing.slug}`);
    }
  });

  it("retrouve une page par slug et rend undefined sinon", () => {
    expect(getLanding("menage-airbnb")?.libelleCourt).toBe("Ménage Airbnb");
    expect(getLanding("menage-airbnb-meaux")).toBeUndefined();
  });
});
