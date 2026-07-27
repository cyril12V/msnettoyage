import { describe, expect, it } from "vitest";
import { detecterRobot } from "@/lib/anti-spam";
import type { ContactInput } from "@/schemas/contact";

/**
 * Garde-fous du filtrage anti-robots.
 *
 * La moitié de ces tests vérifie que des demandes LÉGITIMES passent. C'est le
 * risque réel : un filtre trop zélé écarte un client sans que personne ne s'en
 * aperçoive, puisque la réponse renvoyée est un succès factice.
 */

function demande(modifications: Partial<ContactInput> = {}): ContactInput {
  return {
    nom: "Claire Fontaine",
    email: "claire.fontaine@example.com",
    telephone: "06 12 34 56 78",
    prestation: "autre",
    ville: "Meaux",
    message: "Bonjour, je souhaite un devis pour le nettoyage de ma maison de 90 m² à Meaux.",
    consentement: true,
    dureeSaisieMs: 30_000,
    ...modifications,
  };
}

describe("demandes légitimes", () => {
  it("laisse passer une demande ordinaire", () => {
    expect(detecterRobot(demande())).toEqual({ robot: false });
  });

  it("laisse passer un message contenant un lien unique", () => {
    // Cas réel : un propriétaire colle l'adresse de son annonce Airbnb.
    const verdict = detecterRobot(
      demande({
        message:
          "Voici mon annonce https://www.airbnb.fr/rooms/12345, rotation entre deux séjours.",
      }),
    );

    expect(verdict.robot).toBe(false);
  });

  it("laisse passer les accents et la ponctuation française", () => {
    const verdict = detecterRobot(
      demande({
        nom: "Loïc Dupré-Château",
        message: "Après travaux : dépoussiérage intégral, vitrerie, sols. Délai ? Coût estimé ?",
      }),
    );

    expect(verdict.robot).toBe(false);
  });

  it("laisse passer une soumission longuement réfléchie", () => {
    const verdict = detecterRobot(demande({ dureeSaisieMs: 3_600_000 }));

    expect(verdict.robot).toBe(false);
  });

  it("laisse passer une saisie juste au-dessus du seuil", () => {
    // La durée vient d'une seule horloge, celle du navigateur : ni le décalage
    // avec l'heure du serveur, ni la latence, ni le démarrage à froid de la
    // fonction ne s'y ajoutent. 4 s mesurées sont donc 4 s réelles.
    const verdict = detecterRobot(demande({ dureeSaisieMs: 4_000 }));

    expect(verdict.robot).toBe(false);
  });
});

describe("soumissions automatisées", () => {
  it("écarte une soumission qui remplit le leurre", () => {
    const verdict = detecterRobot(demande({ societeWeb: "https://spam.example" }));

    expect(verdict).toEqual({ robot: true, motif: "leurre rempli" });
  });

  it("écarte une requête fabriquée hors du formulaire", () => {
    // Le formulaire calcule toujours la durée : son absence signifie que la
    // requête n'est pas passée par lui, donc que le contrôle de vitesse aurait
    // été purement et simplement contourné.
    const verdict = detecterRobot(demande({ dureeSaisieMs: undefined }));

    expect(verdict).toEqual({ robot: true, motif: "durée de saisie absente" });
  });

  it("écarte une soumission plus rapide qu'un remplissage humain", () => {
    const verdict = detecterRobot(demande({ dureeSaisieMs: 500 }));

    expect(verdict).toEqual({ robot: true, motif: "soumission trop rapide" });
  });

  it("écarte une soumission instantanée", () => {
    const verdict = detecterRobot(demande({ dureeSaisieMs: 0 }));

    expect(verdict).toEqual({ robot: true, motif: "soumission trop rapide" });
  });

  it("écarte un message qui dépose plusieurs liens", () => {
    const verdict = detecterRobot(
      demande({ message: "Super offre http://a.example et aussi www.b.example à voir." }),
    );

    expect(verdict).toEqual({ robot: true, motif: "2 liens dans la demande" });
  });

  it("compte aussi les liens glissés dans le nom", () => {
    const verdict = detecterRobot(
      demande({
        nom: "http://a.example",
        message: "Visitez https://b.example pour en savoir plus.",
      }),
    );

    expect(verdict.robot).toBe(true);
  });

  it("écarte le balisage de lien, même isolé", () => {
    for (const message of [
      "Bonjour [url=http://spam.example]cliquez ici[/url] merci beaucoup.",
      'Bonjour <a href="http://spam.example">ici</a> merci beaucoup.',
    ]) {
      expect(detecterRobot(demande({ message }))).toEqual({
        robot: true,
        motif: "balisage de lien dans le message",
      });
    }
  });

  it("écarte les écritures incompatibles avec la clientèle desservie", () => {
    for (const message of [
      "Привет, я предлагаю услуги продвижения сайта.",
      "您好，我们提供服务。",
    ]) {
      expect(detecterRobot(demande({ message }))).toEqual({
        robot: true,
        motif: "écriture non latine dans le message",
      });
    }
  });
});

describe("ordre des contrôles", () => {
  it("signale le leurre avant tout autre motif", () => {
    // Le leurre est le signal le plus sûr : il doit rester lisible dans les
    // logs même quand la soumission cumule les défauts.
    const verdict = detecterRobot(
      demande({
        societeWeb: "rempli",
        dureeSaisieMs: undefined,
        message: "http://a.example http://b.example",
      }),
    );

    expect(verdict).toEqual({ robot: true, motif: "leurre rempli" });
  });
});
