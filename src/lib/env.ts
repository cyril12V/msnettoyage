import "server-only";
import { z } from "zod";

/**
 * Validation des variables d'environnement serveur.
 *
 * La validation est volontairement PARESSEUSE : elle s'exécute à la première
 * requête, pas à l'import. Un `next build` sur une machine sans secrets doit
 * réussir — c'est le cas sur Vercel, où les variables ne sont injectées qu'au
 * runtime pour les fonctions serveur.
 *
 * Ces valeurs ne sont jamais exposées au client : ce module importe
 * `server-only`, ce qui fait échouer la compilation si un composant client
 * tente de l'importer.
 */

const mailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY est vide ou absente."),
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
    RESEND_API_KEY: process.env.RESEND_API_KEY,
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
