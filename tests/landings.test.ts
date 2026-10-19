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
  /**
   * Seule URL de prestation autorisée à porter un nom de ville.
   *
   * Décision du client, prise dans
   * `docs/strategie-seo/02-optimisation-fin-de-chantier.md` : la requête visée est « nettoyage fin de chantier paris » et le
   * mot-clé doit y figurer entier, URL comprise. La contrepartie assumée est
   * que cette page ne remontera pas sur « nettoyage fin de chantier Chelles ».
   *
   * L'exception est nommée ici plutôt que la règle supprimée : c'est ce qui
   * empêche qu'elle se généralise silencieusement aux cinq autres pages.
   */
  const EXCEPTION_VILLE_DANS_SLUG = "nettoyage-fin-de-chantier-paris";

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

      if (landing.slug === EXCEPTION_VILLE_DANS_SLUG) continue;

      for (const nom of nomsDeVille) {
        expect(landing.slug.endsWith(`-${nom}`), `ville dans le slug : ${landing.slug}`).toBe(
          false,
        );
      }
    }
  });

  it("garde l'exception de slug limitée à la seule page fin de chantier", () => {
    expect(landings.filter((landing) => landing.slug === EXCEPTION_VILLE_DANS_SLUG)).toHaveLength(
      1,
    );
  });

  it("vise Paris ou l'Île-de-France dans la requête et le titre", () => {
    // Le H1 n'est plus tenu de nommer l'Île-de-France : l'audit de septembre
    // 2026 y place un argument de conversion, « devis gratuit en 24 h »,
    // « rotation en 2 h », qui compte davantage au moment du clic. La
    // couverture régionale reste portée par la requête visée et par le
    // contenu, et Paris reste imposé dans le H1 par le test suivant.
    for (const landing of landings) {
      expect(landing.requete, `requête : ${landing.slug}`).toContain("Île-de-France");
      expect(landing.metaTitle, `metaTitle : ${landing.slug}`).toMatch(/Paris|Île-de-France|IDF/);
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

  it("garde des méta-descriptions entre 110 et 160 caractères", () => {
    for (const landing of landings) {
      expect(
        landing.metaDescription.length,
        `metaDescription : ${landing.slug}`,
      ).toBeGreaterThanOrEqual(110);
      expect(
        landing.metaDescription.length,
        `metaDescription : ${landing.slug}`,
      ).toBeLessThanOrEqual(160);
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

  it("ne recopie aucune section tarifaire d'une page à l'autre", () => {
    const questions = landings.map((landing) => landing.tarification.question);
    expect(new Set(questions).size, "question de prix dupliquée").toBe(landings.length);

    const reponses = landings.map((landing) => landing.tarification.reponse);
    expect(new Set(reponses).size, "réponse de prix dupliquée").toBe(landings.length);

    const effets = landings.flatMap((landing) =>
      landing.tarification.facteurs.map((facteur) => facteur.effet),
    );
    expect(new Set(effets).size, "facteur de prix dupliqué").toBe(effets.length);
  });

  it("ne repose pas en FAQ la question déjà traitée par la section tarifaire", () => {
    // La même question posée deux fois sur une page, en H2 puis en H3, donne
    // deux réponses concurrentes : le lecteur en lit une au hasard et le moteur
    // ne sait pas laquelle extraire.
    const normaliser = (texte: string) =>
      texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    for (const landing of landings) {
      const prix = normaliser(landing.tarification.question);

      for (const item of landing.faq) {
        expect(normaliser(item.question), `question de prix répétée : ${landing.slug}`).not.toBe(
          prix,
        );
      }
    }
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
      expect(
        landing.tarification.facteurs.length,
        `facteurs de prix : ${landing.slug}`,
      ).toBeGreaterThanOrEqual(4);
    }
  });

  it("répond à la question du prix, par une question posée et une réponse directe", () => {
    // C'est la requête la plus tapée après le nom de la prestation, et celle
    // qu'un moteur génératif extrait le plus volontiers.
    for (const landing of landings) {
      const { question, reponse } = landing.tarification;

      expect(question.toLowerCase(), `sans « combien » : ${landing.slug}`).toContain("combien");
      expect(question.endsWith("?"), `sans point d'interrogation : ${landing.slug}`).toBe(true);
      expect(reponse.length, `réponse trop courte : ${landing.slug}`).toBeGreaterThanOrEqual(150);
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
        landing.tarification.question,
        landing.tarification.reponse,
        ...landing.tarification.facteurs.flatMap((f) => [f.label, f.effet]),
        ...landing.faq.flatMap((item) => [item.question, item.answer]),
        ...(landing.sectionsEditoriales ?? []).flatMap((section) => [
          section.titre,
          section.intro,
          ...section.elements.flatMap((element) => [element.titre, element.texte]),
          section.photos?.legende ?? "",
          ...(section.photos?.images ?? []).map((image) => image.alt),
        ]),
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

describe("sections éditoriales", () => {
  const toutes = landings.flatMap((landing) =>
    (landing.sectionsEditoriales ?? []).map((section) => ({ landing, section })),
  );

  it("répond à l'audit sur les deux pages prioritaires", () => {
    const ids = (slug: string) =>
      (landings.find((landing) => landing.slug === slug)?.sectionsEditoriales ?? []).map(
        (section) => section.id,
      );

    expect(ids("nettoyage-fin-de-chantier-paris")).toEqual(["types-de-chantiers", "processus"]);
    expect(ids("menage-airbnb")).toEqual(["rapport-photo", "pourquoi-nous"]);
  });

  it("décrit un processus de nettoyage fin de chantier en cinq étapes", () => {
    const processus = toutes.find(({ section }) => section.id === "processus")?.section;
    expect(processus?.format).toBe("etapes");
    expect(processus?.elements).toHaveLength(5);
  });

  it("donne à chaque élément un titre et un texte substantiel", () => {
    for (const { landing, section } of toutes) {
      expect(section.intro.length, `intro courte : ${section.id}`).toBeGreaterThanOrEqual(120);
      expect(section.elements.length, `section vide : ${section.id}`).toBeGreaterThanOrEqual(3);

      for (const element of section.elements) {
        expect(element.titre.length, `titre vide : ${landing.slug}`).toBeGreaterThan(5);
        expect(element.texte.length, `texte court : ${element.titre}`).toBeGreaterThanOrEqual(180);
      }
    }
  });

  it("ne recopie aucun texte, ni entre sections ni avec le corps de page", () => {
    const textes = [
      ...landings.flatMap((landing) => landing.corps),
      ...toutes.flatMap(({ section }) => [
        section.intro,
        ...section.elements.map((element) => element.texte),
      ]),
    ];
    expect(new Set(textes).size, "texte dupliqué").toBe(textes.length);

    const ids = toutes.map(({ landing, section }) => `${landing.slug}#${section.id}`);
    expect(new Set(ids).size, "ancre dupliquée").toBe(ids.length);
  });

  it("n'affiche que des photos réelles, présentes et décrites", () => {
    // Les visuels générés par IA du site ne documentent aucune intervention :
    // une section qui prétend montrer un résultat ne peut en utiliser aucun.
    // Les photos réelles de l'entreprise sont nommées `rapport-photo-*`.
    for (const { section } of toutes) {
      for (const image of section.photos?.images ?? []) {
        expect(image.src, `visuel non authentique : ${image.src}`).toMatch(
          /^\/images\/rapport-photo-/,
        );
        expect(existsSync(join(process.cwd(), "public", image.src)), image.src).toBe(true);
        expect(image.alt.length, `alt trop court : ${image.src}`).toBeGreaterThanOrEqual(40);
      }
    }
  });

  it("n'affiche aucun chiffre commercial invérifiable", () => {
    // L'audit suggérait « 8 ans d'expérience », « 150+ propriétés », « 98 % de
    // satisfaction », des tarifs copiés d'un concurrent et une « garantie sans
    // réserve ». Aucun n'est confirmé : les publier serait une pratique
    // commerciale trompeuse.
    const texte = toutes
      .flatMap(({ section }) => [
        section.titre,
        section.intro,
        ...section.elements.flatMap((element) => [element.titre, element.texte]),
      ])
      .join(" ");

    expect(texte).not.toMatch(/\bans d'expérience\b/);
    expect(texte).not.toMatch(/\d+ ?%/);
    expect(texte).not.toMatch(/\d+ ?€/);
    expect(texte).not.toMatch(/sans réserve/i);
    expect(texte).not.toMatch(/\+ ?(propriétés|clients|logements)/);
  });
});

describe("exactitude réglementaire", () => {
  it("annonce le plafond parisien en vigueur et cite sa source officielle", () => {
    // La Ville de Paris a abaissé le plafond de location d'une résidence
    // principale en meublé de tourisme de 120 à 90 jours par an au 1er janvier
    // 2025. La page Airbnb a longtemps affiché l'ancien chiffre.
    const airbnb = getLanding("menage-airbnb");
    const corps = airbnb?.corps.join(" ") ?? "";

    expect(corps).toContain("90 jours par an");
    expect(airbnb?.sources?.some((source) => source.url.startsWith("https://www.paris.fr/"))).toBe(
      true,
    );
  });

  it("ne mentionne plus l'ancien plafond de 120 jours nulle part", () => {
    const texte = JSON.stringify([landings, villes]);
    expect(texte).not.toMatch(/120 jours/);
  });
});
