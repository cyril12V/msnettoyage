import { describe, expect, it } from "vitest";
import { contactSchema, libellePrestation, prestationValues } from "@/schemas/contact";
import { services } from "@/data/services";

const demandeValide = {
  nom: "Marie Dupont",
  telephone: "06 20 46 07 03",
  email: "marie.dupont@example.fr",
  ville: "Meaux",
  prestation: "entretien-regulier",
  message: "Bonjour, je cherche un entretien hebdomadaire pour un bureau de 80 m².",
  consentement: true,
};

describe("contactSchema", () => {
  it("accepte une demande complète et valide", () => {
    const resultat = contactSchema.safeParse(demandeValide);

    expect(resultat.success).toBe(true);
  });

  it("supprime les espaces superflus autour des champs texte", () => {
    const resultat = contactSchema.safeParse({ ...demandeValide, nom: "  Marie Dupont  " });

    expect(resultat.success).toBe(true);
    if (resultat.success) {
      expect(resultat.data.nom).toBe("Marie Dupont");
    }
  });

  it.each([
    ["06 20 46 07 03", "mobile avec espaces"],
    ["0620460703", "mobile collé"],
    ["+33 6 20 46 07 03", "format international"],
    ["01.64.34.12.34", "fixe avec points"],
    ["06-20-46-07-03", "tirets"],
  ])("accepte le numéro %s (%s)", (telephone) => {
    expect(contactSchema.safeParse({ ...demandeValide, telephone }).success).toBe(true);
  });

  it.each([
    ["0620460", "trop court"],
    ["0020460703", "commence par 00 puis 2"],
    ["abcdefghij", "lettres"],
    ["06204607031", "trop long"],
  ])("rejette le numéro %s (%s)", (telephone) => {
    expect(contactSchema.safeParse({ ...demandeValide, telephone }).success).toBe(false);
  });

  it("rejette une adresse email invalide", () => {
    expect(contactSchema.safeParse({ ...demandeValide, email: "marie@" }).success).toBe(false);
  });

  it("exige le consentement explicite", () => {
    const resultat = contactSchema.safeParse({ ...demandeValide, consentement: false });

    expect(resultat.success).toBe(false);
  });

  it("rejette une prestation inconnue", () => {
    expect(
      contactSchema.safeParse({ ...demandeValide, prestation: "lavage-de-voiture" }).success,
    ).toBe(false);
  });

  it("rejette un message trop court", () => {
    expect(contactSchema.safeParse({ ...demandeValide, message: "bonjour" }).success).toBe(false);
  });

  it("rejette un message dépassant 2000 caractères", () => {
    const resultat = contactSchema.safeParse({ ...demandeValide, message: "a".repeat(2001) });

    expect(resultat.success).toBe(false);
  });

  it("laisse passer le leurre anti-robot rempli — c'est la route API qui l'écarte", () => {
    const resultat = contactSchema.safeParse({
      ...demandeValide,
      societeWeb: "https://spam.example",
    });

    expect(resultat.success).toBe(true);
    if (resultat.success) {
      expect(resultat.data.societeWeb).toBe("https://spam.example");
    }
  });

  it("n'émet que des messages d'erreur en français", () => {
    const resultat = contactSchema.safeParse({
      nom: "",
      telephone: "",
      email: "",
      ville: "",
      prestation: "",
      message: "",
      consentement: false,
    });

    expect(resultat.success).toBe(false);
    if (!resultat.success) {
      for (const issue of resultat.error.issues) {
        expect(issue.message, `message non traduit : ${issue.message}`).toMatch(
          /^[A-ZÀ-Ý].*[.!?]$/u,
        );
        // Formulations par défaut de Zod, restées en anglais.
        expect(issue.message).not.toMatch(
          /\b(expected|required|too big|too small|invalid input|unrecognized)\b/i,
        );
      }
    }
  });

  it("associe un message d'erreur en français à chaque champ invalide", () => {
    const resultat = contactSchema.safeParse({
      ...demandeValide,
      nom: "",
      email: "invalide",
      message: "court",
    });

    expect(resultat.success).toBe(false);
    if (!resultat.success) {
      const champs = resultat.error.issues.map((issue) => issue.path[0]);
      expect(champs).toContain("nom");
      expect(champs).toContain("email");
      expect(champs).toContain("message");
      expect(resultat.error.issues.every((issue) => issue.message.length > 0)).toBe(true);
    }
  });
});

describe("prestationValues", () => {
  it("couvre tous les services publiés, plus « autre »", () => {
    expect(prestationValues).toHaveLength(services.length + 1);
    for (const service of services) {
      expect(prestationValues).toContain(service.slug);
    }
    expect(prestationValues).toContain("autre");
  });
});

describe("libellePrestation", () => {
  it("retourne le nom court du service correspondant", () => {
    expect(libellePrestation("menage-airbnb")).toBe("Ménage Airbnb");
  });

  it("retombe sur « Autre demande » pour un slug inconnu", () => {
    expect(libellePrestation("autre")).toBe("Autre demande");
    expect(libellePrestation("slug-inexistant")).toBe("Autre demande");
  });
});
