import { beforeEach, describe, expect, it } from "vitest";
import {
  consommer,
  FENETRE_MS,
  ipDepuisHeaders,
  LIMITE_PAR_FENETRE,
  reinitialiserLimites,
} from "@/lib/rate-limit";

describe("consommer", () => {
  beforeEach(() => {
    reinitialiserLimites();
  });

  it("autorise les requêtes jusqu'à la limite", () => {
    const debut = 1_000_000;

    for (let i = 0; i < LIMITE_PAR_FENETRE; i += 1) {
      expect(consommer("1.2.3.4", debut + i).autorise).toBe(true);
    }
  });

  it("décrémente le quota restant à chaque appel", () => {
    const debut = 1_000_000;

    expect(consommer("1.2.3.4", debut).restant).toBe(LIMITE_PAR_FENETRE - 1);
    expect(consommer("1.2.3.4", debut + 1).restant).toBe(LIMITE_PAR_FENETRE - 2);
  });

  it("bloque la requête qui dépasse la limite", () => {
    const debut = 1_000_000;

    for (let i = 0; i < LIMITE_PAR_FENETRE; i += 1) {
      consommer("1.2.3.4", debut + i);
    }

    const bloquee = consommer("1.2.3.4", debut + LIMITE_PAR_FENETRE);

    expect(bloquee.autorise).toBe(false);
    expect(bloquee.restant).toBe(0);
    expect(bloquee.reessayerDansSecondes).toBeGreaterThan(0);
  });

  it("isole les compteurs par clé", () => {
    const debut = 1_000_000;

    for (let i = 0; i < LIMITE_PAR_FENETRE; i += 1) {
      consommer("1.2.3.4", debut + i);
    }

    expect(consommer("1.2.3.4", debut).autorise).toBe(false);
    expect(consommer("5.6.7.8", debut).autorise).toBe(true);
  });

  it("réautorise une fois la fenêtre écoulée", () => {
    const debut = 1_000_000;

    for (let i = 0; i < LIMITE_PAR_FENETRE; i += 1) {
      consommer("1.2.3.4", debut + i);
    }

    expect(consommer("1.2.3.4", debut + FENETRE_MS - 1).autorise).toBe(false);
    expect(consommer("1.2.3.4", debut + FENETRE_MS + 1).autorise).toBe(true);
  });
});

describe("ipDepuisHeaders", () => {
  it("retient la première adresse de x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 70.41.3.18, 150.172.238.178" });

    expect(ipDepuisHeaders(headers)).toBe("203.0.113.7");
  });

  it("retombe sur x-real-ip si x-forwarded-for est absent", () => {
    const headers = new Headers({ "x-real-ip": "198.51.100.5" });

    expect(ipDepuisHeaders(headers)).toBe("198.51.100.5");
  });

  it("retourne « inconnue » quand aucun en-tête n'est présent", () => {
    expect(ipDepuisHeaders(new Headers())).toBe("inconnue");
  });
});
