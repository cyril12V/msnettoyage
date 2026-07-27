import "server-only";
import { z } from "zod";

/**
 * Validation des variables d'environnement serveur.
 *
 * La validation est volontairement PARESSEUSE : elle s'exécute à la première
 * requête, pas à l'import. Un `next build` sur une machine sans secrets doit
 * réussir, c'est le cas sur Vercel, où les variables ne sont injectées qu'au
 * runtime pour les fonctions serveur.
 *
 * Ces valeurs ne sont jamais exposées au client : ce module importe
 * `server-only`, ce qui fait échouer la compilation si un composant client
 * tente de l'importer.
 */

/**
 * Port SMTP.
 *
 * Accepté sous forme de chaîne, puisque c'est ce que fournit toute plateforme
 * d'hébergement, et converti une seule fois ici plutôt qu'à chaque usage.
 */
const portSchema = z
  .string()
  .min(1, "SMTP_PORT est vide.")
  .regex(/^\d+$/, "SMTP_PORT doit être un nombre.")
  .transform(Number)
  .refine((port) => port > 0 && port <= 65535, "SMTP_PORT est hors plage.");

/**
 * Destinataires, séparés par des virgules.
 *
 * Plusieurs adresses sont acceptées afin qu'une demande reste récupérable si
 * l'une des boîtes refuse le message. Le cas s'est produit : Gmail a rejeté en
 * bloc les demandes tant que le domaine n'avait pas d'enregistrement SPF, et
 * les seules traces étaient les rapports de non-remise dans la boîte d'envoi.
 */
const destinatairesSchema = z
  .string()
  .min(1, "CONTACT_TO_EMAIL est vide ou absente.")
  .transform((brut) =>
    brut
      .split(",")
      .map((adresse) => adresse.trim())
      .filter(Boolean),
  )
  .refine((adresses) => adresses.length > 0, "CONTACT_TO_EMAIL ne contient aucune adresse.")
  .refine(
    (adresses) => adresses.every((adresse) => z.email().safeParse(adresse).success),
    "CONTACT_TO_EMAIL contient une adresse invalide.",
  );

const mailEnvSchema = z.object({
  SMTP_HOST: z.string().min(1, "SMTP_HOST est vide ou absent."),
  SMTP_PORT: portSchema,
  SMTP_USER: z.string().min(1, "SMTP_USER est vide ou absent."),
  SMTP_PASSWORD: z.string().min(1, "SMTP_PASSWORD est vide ou absent."),
  CONTACT_FROM_EMAIL: z.email("CONTACT_FROM_EMAIL n'est pas une adresse valide."),
  CONTACT_TO_EMAIL: destinatairesSchema,
});

export type MailEnv = z.infer<typeof mailEnvSchema>;

export type MailEnvResult = { ok: true; env: MailEnv } | { ok: false; erreurs: readonly string[] };

/**
 * Lit et valide la configuration d'envoi d'emails.
 *
 * Renvoie un résultat au lieu de lever : l'appelant décide quoi répondre au
 * visiteur, et le détail des erreurs reste côté serveur.
 */
export function getMailEnv(): MailEnvResult {
  /*
    Une variable absente est ramenée à la chaîne vide, et non laissée à
    `undefined`. Sans cela, Zod signale d'abord une erreur de type et émet son
    message par défaut, en anglais et sans nommer la variable : « Invalid input:
    expected string, received undefined ». C'est ce message que lirait la
    personne chargée de réparer la configuration en urgence.
  */
  const lire = (nom: string, defaut = "") => process.env[nom] ?? defaut;

  const parsed = mailEnvSchema.safeParse({
    SMTP_HOST: lire("SMTP_HOST"),
    // 465 par défaut : TLS dès le premier octet, sans fenêtre de négociation
    // en clair contrairement au 587, qui chiffre après un STARTTLS.
    SMTP_PORT: lire("SMTP_PORT", "465"),
    SMTP_USER: lire("SMTP_USER"),
    SMTP_PASSWORD: lire("SMTP_PASSWORD"),
    CONTACT_FROM_EMAIL: lire("CONTACT_FROM_EMAIL"),
    CONTACT_TO_EMAIL: lire("CONTACT_TO_EMAIL"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      erreurs: parsed.error.issues.map((issue) => issue.message),
    };
  }

  return { ok: true, env: parsed.data };
}
