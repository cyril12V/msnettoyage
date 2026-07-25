import { z } from "zod";
import { services } from "@/data/services";

/**
 * Schéma de la demande de devis, partagé par le formulaire client et la route
 * API. Une seule définition, donc aucune divergence possible entre la
 * validation affichée à l'utilisateur et celle qui protège le serveur.
 *
 * La validation serveur reste la seule qui fasse autorité : celle du navigateur
 * n'est qu'un confort et peut être contournée.
 */

/**
 * Valeurs acceptées pour le type de prestation, dérivées des services publiés.
 * Ajouter un service à `data/services.ts` l'autorise automatiquement ici.
 */
export const prestationValues: readonly string[] = [
  ...services.map((service) => service.slug),
  "autre",
];

/** Numéro français, fixe ou mobile, avec ou sans indicatif international. */
const telephoneFrancais = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

/** Délai minimal entre l'affichage du formulaire et son envoi, en millisecondes. */
export const DELAI_MINIMAL_SOUMISSION_MS = 3_000;

export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum).")
    .max(80, "Le nom ne peut pas dépasser 80 caractères."),

  email: z.email("Adresse email invalide.").max(160, "Adresse email trop longue."),

  telephone: z
    .string()
    .trim()
    .regex(telephoneFrancais, "Numéro de téléphone français invalide (ex. 06 20 46 07 03)."),

  prestation: z.enum(prestationValues, {
    message: "Sélectionnez le type de prestation souhaité.",
  }),

  ville: z
    .string()
    .trim()
    .min(2, "Indiquez la ville de l'intervention.")
    .max(80, "Le nom de la ville ne peut pas dépasser 80 caractères."),

  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre besoin en quelques mots (10 caractères minimum).")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères."),

  consentement: z.literal(true, {
    message: "Votre accord est nécessaire pour que nous puissions vous recontacter.",
  }),

  /**
   * Leurre anti-robot : ce champ est masqué visuellement et aux lecteurs
   * d'écran. Un humain ne le remplit jamais, un robot le remplit souvent.
   *
   * Le schéma l'accepte volontairement rempli : c'est la route API qui l'écarte,
   * en répondant un succès factice. Le rejeter ici renverrait une erreur de
   * validation au robot, donc l'information qu'un piège existe.
   */
  societeWeb: z.string().optional(),

  /**
   * Horodatage de l'affichage du formulaire, posé par le client. Une soumission
   * plus rapide que `DELAI_MINIMAL_SOUMISSION_MS` est presque toujours
   * automatisée.
   */
  affichageAt: z.number().int().positive().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Champs réellement saisis par l'utilisateur, hors dispositifs anti-robot. */
export type ContactFormValues = Omit<ContactInput, "societeWeb" | "affichageAt">;

/** Libellé lisible d'une prestation, pour l'email et les récapitulatifs. */
export function libellePrestation(slug: string): string {
  return services.find((service) => service.slug === slug)?.shortName ?? "Autre demande";
}
