import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getMailEnv } from "@/lib/env";

/**
 * Garde-fous de la configuration d'envoi.
 *
 * Le destinataire accepte plusieurs adresses depuis qu'une panne réelle a
 * montré le besoin : Gmail a rejeté en bloc les demandes de devis pendant que
 * le domaine n'avait pas d'enregistrement SPF, et rien ne subsistait côté site.
 * Une seconde boîte, sur le domaine lui-même, garantit qu'une demande reste
 * récupérable quoi qu'il arrive en aval.
 */

const VARIABLES = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
] as const;

const original = new Map<string, string | undefined>();

beforeEach(() => {
  for (const nom of VARIABLES) original.set(nom, process.env[nom]);

  process.env.SMTP_HOST = "smtp.example.com";
  process.env.SMTP_PORT = "465";
  process.env.SMTP_USER = "contact@example.com";
  process.env.SMTP_PASSWORD = "secret";
  process.env.CONTACT_FROM_EMAIL = "contact@example.com";
  process.env.CONTACT_TO_EMAIL = "boite@example.com";
});

afterEach(() => {
  for (const [nom, valeur] of original) {
    if (valeur === undefined) delete process.env[nom];
    else process.env[nom] = valeur;
  }
});

describe("configuration d'envoi", () => {
  it("accepte une configuration complète", () => {
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(true);
    if (resultat.ok) {
      expect(resultat.env.SMTP_PORT).toBe(465);
      expect(resultat.env.CONTACT_TO_EMAIL).toEqual(["boite@example.com"]);
    }
  });

  it("accepte plusieurs destinataires séparés par des virgules", () => {
    process.env.CONTACT_TO_EMAIL = "boite@example.com, secours@example.org";
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(true);
    if (resultat.ok) {
      expect(resultat.env.CONTACT_TO_EMAIL).toEqual(["boite@example.com", "secours@example.org"]);
    }
  });

  it("refuse une liste dont une seule adresse est invalide", () => {
    process.env.CONTACT_TO_EMAIL = "boite@example.com, pas-une-adresse";
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(false);
  });

  it("retombe sur le port 465 quand il n'est pas précisé", () => {
    delete process.env.SMTP_PORT;
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(true);
    if (resultat.ok) expect(resultat.env.SMTP_PORT).toBe(465);
  });

  it("refuse un port qui n'est pas un nombre", () => {
    process.env.SMTP_PORT = "quatre-cent-soixante-cinq";

    expect(getMailEnv().ok).toBe(false);
  });

  it("nomme chaque variable manquante, en français, sans exposer de valeur", () => {
    // Une variable absente doit produire un message actionnable : c'est celui
    // que lira la personne qui répare la configuration en urgence. Zod émet
    // sinon « Invalid input: expected string, received undefined », en anglais
    // et sans dire de quelle variable il s'agit.
    delete process.env.SMTP_PASSWORD;
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(false);
    if (!resultat.ok) {
      const message = resultat.erreurs.join(" ");
      expect(message).toContain("SMTP_PASSWORD");
      expect(message).not.toContain("Invalid input");
      expect(message).not.toContain("secret");
    }
  });

  it("nomme aussi les variables d'adresse absentes", () => {
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.SMTP_HOST;
    const resultat = getMailEnv();

    expect(resultat.ok).toBe(false);
    if (!resultat.ok) {
      const message = resultat.erreurs.join(" ");
      expect(message).toContain("CONTACT_TO_EMAIL");
      expect(message).toContain("SMTP_HOST");
      expect(message).not.toContain("Invalid input");
    }
  });
});
