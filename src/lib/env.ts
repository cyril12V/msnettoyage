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
  .regex(/^\d+$/, "SMTP_PORT doit être un nombre.")
  .transform(Number)
  .refine((port) => port > 0 && port <= 65535, "SMTP_PORT est hors plage.");

const mailEnvSchema = z.object({
  SMTP_HOST: z.string().min(1, "SMTP_HOST est vide ou absent."),
  SMTP_PORT: portSchema,
  SMTP_USER: z.string().min(1, "SMTP_USER est vide ou absent."),
  SMTP_PASSWORD: z.string().min(1, "SMTP_PASSWORD est vide ou absent."),
  CONTACT_FROM_EMAIL: z.email("CONTACT_FROM_EMAIL n'est pas une adresse valide."),
  CONTACT_TO_EMAIL: z.email("CONTACT_TO_EMAIL n'est pas une adresse valide."),
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
  const parsed = mailEnvSchema.safeParse({
    SMTP_HOST: process.env.SMTP_HOST,
    // 465 par défaut : TLS dès le premier octet, sans fenêtre de négociation
    // en clair contrairement au 587, qui chiffre après un STARTTLS.
    SMTP_PORT: process.env.SMTP_PORT ?? "465",
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  });

  if (!parsed.success) {
    return {
      ok: false,
      erreurs: parsed.error.issues.map((issue) => issue.message),
    };
  }

  return { ok: true, env: parsed.data };
}
