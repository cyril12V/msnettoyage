import { describe, expect, it } from "vitest";
import { getLanding } from "@/data/landings";
import { villesNav } from "@/data/navigation";
import { getVille, villes, villeSlugs } from "@/data/villes";
import { site } from "@/lib/site";

/**
 * Garde-fous des pages villes.
 *
 * Le risque de cette famille de pages est unique et connu : produire douze
 * pages identiques à un nom de ville près. Google appelle cela des pages
 * satellites, les repère et les désindexe, souvent en emportant la confiance
 * accordée au reste du site.
 *
 * Ces tests rendent la duplication impossible à commettre par inadvertance :
 * aucun chapeau, aucun paragraphe, aucune question, aucune réponse ne peut
 * réapparaître d'une ville à l'autre. Un chercher-remplacer échoue au premier
 * lancement de `npm run test`, avant d'atteindre la production.
 */

describe("pages villes", () => {
  it("n'a aucun slug en double", () => {
    expect(new Set(villeSlugs).size).toBe(villes.length);
  });

  it("préfixe chaque slug par la prestation, en minuscules", () => {
    for (const ville of villes) {
      expect(ville.slug).toMatch(/^nettoyage-[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("nomme la ville dans la requête, le H1, le titre et le chapeau", () => {
    for (const ville of villes) {
      expect(ville.requete, `requête : ${ville.slug}`).toContain(ville.nom);
      expect(ville.h1, `H1 : ${ville.slug}`).toContain(ville.nom);
      expect(ville.metaTitle, `metaTitle : ${ville.slug}`).toContain(ville.nom);
      expect(ville.metaDescription, `metaDescription : ${ville.slug}`).toContain(ville.nom);
      expect(ville.lede, `chapeau : ${ville.slug}`).toContain(ville.nom);
    }
  });

  it("porte le nom de la marque dans les titres de balise", () => {
    // Les pages les publient en `absolute` : sinon le gabarit du layout ajoute
    // « | MS Nettoyages » une seconde fois.
    for (const ville of villes) {
      expect(ville.metaTitle, `sans marque : ${ville.slug}`).toContain(site.name);
    }
  });

  it("garde des titres de balise sous 65 caractères", () => {
    for (const ville of villes) {
      expect(ville.metaTitle.length, `metaTitle trop long : ${ville.slug}`).toBeLessThanOrEqual(65);
    }
  });

  it("garde des méta-descriptions entre 110 et 165 caractères", () => {
    for (const ville of villes) {
      expect(ville.metaDescription.length, `trop courte : ${ville.slug}`).toBeGreaterThanOrEqual(
        110,
      );
      expect(ville.metaDescription.length, `trop longue : ${ville.slug}`).toBeLessThanOrEqual(165);
    }
  });

  it("publie un code postal et un département cohérents", () => {
    for (const ville of villes) {
      expect(ville.codePostal, `code postal : ${ville.slug}`).toMatch(/^\d{5}$/);
      expect(ville.departement, `département : ${ville.slug}`).toMatch(/^\d{2}$/);
      expect(
        ville.codePostal.startsWith(ville.departement),
        `code postal hors département : ${ville.slug}`,
      ).toBe(true);
    }
  });

  it("publie des coordonnées situées en Île-de-France", () => {
    // Une coordonnée fausse envoie la zone servie à des centaines de kilomètres
    // et se voit uniquement dans le JSON-LD, jamais à l'écran.
    for (const ville of villes) {
      expect(ville.geo.latitude, `latitude : ${ville.slug}`).toBeGreaterThan(48.1);
      expect(ville.geo.latitude, `latitude : ${ville.slug}`).toBeLessThan(49.3);
      expect(ville.geo.longitude, `longitude : ${ville.slug}`).toBeGreaterThan(1.4);
      expect(ville.geo.longitude, `longitude : ${ville.slug}`).toBeLessThan(3.6);
    }
  });

  it("désigne exactement une commune d'implantation", () => {
    const base = villes.filter((ville) => ville.base);
    expect(base).toHaveLength(1);
    expect(base[0]?.nom).toBe(site.address.city);
  });
});

describe("duplication entre pages villes", () => {
  it("ne recopie aucun chapeau, titre ni description", () => {
    const uniques = <T>(valeurs: readonly T[]) => new Set(valeurs).size;

    expect(uniques(villes.map((v) => v.lede)), "chapeau dupliqué").toBe(villes.length);
    expect(uniques(villes.map((v) => v.metaTitle)), "titre dupliqué").toBe(villes.length);
    expect(uniques(villes.map((v) => v.metaDescription)), "description dupliquée").toBe(
      villes.length,
    );
    expect(uniques(villes.map((v) => v.h1)), "H1 dupliqué").toBe(villes.length);
    expect(uniques(villes.map((v) => v.requete)), "requête dupliquée").toBe(villes.length);
  });

  it("ne recopie aucun paragraphe d'une ville à l'autre", () => {
    const paragraphes = villes.flatMap((ville) => ville.corps);
    expect(new Set(paragraphes).size, "paragraphe dupliqué").toBe(paragraphes.length);
  });

  it("ne pose jamais deux fois la même question, ni la même réponse", () => {
    const questions = villes.flatMap((ville) => ville.faq.map((item) => item.question));
    expect(new Set(questions).size, "question dupliquée").toBe(questions.length);

    const reponses = villes.flatMap((ville) => ville.faq.map((item) => item.answer));
    expect(new Set(reponses).size, "réponse dupliquée").toBe(reponses.length);
  });

  it("ne recopie aucune justification de prestation phare", () => {
    const raisons = villes.flatMap((ville) => ville.prestationsPhares.map((p) => p.raison));
    expect(new Set(raisons).size, "justification dupliquée").toBe(raisons.length);
  });

  it("ne recopie aucune liste de secteurs", () => {
    const listes = villes.map((ville) => [...ville.secteurs].sort().join("|"));
    expect(new Set(listes).size, "liste de secteurs dupliquée").toBe(villes.length);
  });
});

describe("contenu des pages villes", () => {
  it("fournit assez de matière pour ne pas être une page vide", () => {
    for (const ville of villes) {
      expect(ville.corps.length, `corps : ${ville.slug}`).toBeGreaterThanOrEqual(3);
      expect(ville.secteurs.length, `secteurs : ${ville.slug}`).toBeGreaterThanOrEqual(5);
      expect(ville.communesProches.length, `communes : ${ville.slug}`).toBeGreaterThanOrEqual(5);
      expect(ville.faq.length, `faq : ${ville.slug}`).toBeGreaterThanOrEqual(3);
      expect(ville.faits.length, `faits : ${ville.slug}`).toBeGreaterThanOrEqual(3);
      expect(ville.prestationsPhares.length, `phares : ${ville.slug}`).toBeGreaterThanOrEqual(3);
    }
  });

  it("publie au moins 600 mots de texte par page ville", () => {
    // Seuil repris de la stratégie de référencement : sous 600 mots, une page
    // ville n'a rien de local à dire et sera lue comme une page satellite,
    // quel que soit le soin apporté au balisage.
    //
    // Le décompte porte sur tout le texte réellement affiché, pas sur le seul
    // corps : les questions fréquentes et les justifications de prestation
    // pèsent autant aux yeux d'un moteur, et davantage aux yeux d'un lecteur.
    for (const ville of villes) {
      const texte = [
        ville.lede,
        ...ville.corps,
        ...ville.secteurs,
        ...ville.communesProches,
        ...ville.prestationsPhares.map((phare) => phare.raison),
        ...ville.faq.flatMap((item) => [item.question, item.answer]),
      ].join(" ");

      const mots = texte.split(/\s+/).filter(Boolean).length;
      expect(mots, `page trop courte : ${ville.slug}`).toBeGreaterThanOrEqual(600);
    }
  });

  it("pose des questions et donne des réponses autonomes", () => {
    for (const ville of villes) {
      for (const item of ville.faq) {
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
    for (const ville of villes) {
      for (const fait of ville.faits) {
        expect(fait.label.length, `label trop long : ${ville.slug}`).toBeLessThanOrEqual(20);
        expect(fait.value.length, `valeur trop longue : ${ville.slug}`).toBeLessThanOrEqual(40);
      }
    }
  });

  it("n'utilise aucun tiret cadratin dans le contenu publié", () => {
    const texte = villes
      .flatMap((ville) => [
        ville.h1,
        ville.metaTitle,
        ville.metaDescription,
        ville.lede,
        ...ville.secteurs,
        ...ville.corps,
        ...ville.communesProches,
        ...ville.prestationsPhares.map((p) => p.raison),
        ...ville.faq.flatMap((item) => [item.question, item.answer]),
      ])
      .join(" ");

    expect(texte).not.toMatch(/[—–]/);
  });
});

describe("maillage des pages villes", () => {
  it("ne référence que des prestations existantes", () => {
    for (const ville of villes) {
      for (const phare of ville.prestationsPhares) {
        expect(getLanding(phare.slug), `${ville.slug} → ${phare.slug}`).toBeDefined();
      }
    }
  });

  it("expose chaque ville dans la navigation du pied de page", () => {
    expect(villesNav).toHaveLength(villes.length);

    for (const ville of villes) {
      expect(villesNav.map((lien) => lien.href)).toContain(`/${ville.slug}`);
    }
  });

  it("ne se cite jamais elle-même dans ses communes voisines", () => {
    for (const ville of villes) {
      expect(ville.communesProches, `${ville.slug} se cite elle-même`).not.toContain(ville.nom);
    }
  });

  it("retrouve une ville par slug et rend undefined sinon", () => {
    expect(getVille("nettoyage-creteil")?.departement).toBe("94");
    expect(getVille("nettoyage-marseille")).toBeUndefined();
  });
});
