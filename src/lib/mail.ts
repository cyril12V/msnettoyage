import "server-only";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import type { MailEnv } from "@/lib/env";
import { libellePrestation, type ContactFormValues } from "@/schemas/contact";
import { site } from "@/lib/site";

/** Échappe les caractères qui casseraient le HTML de l'email. */
function echapperHtml(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Convertit les sauts de ligne du message en `<br>`, après échappement. */
function paragrapheHtml(valeur: string): string {
  return echapperHtml(valeur).replace(/\r?\n/g, "<br />");
}

/**
 * Clé d'idempotence dérivée du contenu et d'un créneau de 5 minutes.
 *
 * Un double-clic sur « Envoyer », ou un renvoi automatique du navigateur,
 * produit la même clé : Resend ne délivre alors qu'un seul email.
 */
function cleIdempotence(donnees: ContactFormValues, maintenant: number): string {
  const creneau = Math.floor(maintenant / (5 * 60 * 1000));
  const empreinte = `${donnees.email}|${donnees.telephone}|${donnees.message}|${creneau}`;

  return createHash("sha256").update(empreinte).digest("hex").slice(0, 32);
}

function construireSujet(donnees: ContactFormValues): string {
  return `Demande de devis — ${libellePrestation(donnees.prestation)} — ${donnees.ville} — ${donnees.nom}`;
}

function construireTexte(donnees: ContactFormValues): string {
  return [
    "Nouvelle demande de devis reçue depuis msnettoyage.fr",
    "",
    `Nom          : ${donnees.nom}`,
    `Téléphone    : ${donnees.telephone}`,
    `Email        : ${donnees.email}`,
    `Ville        : ${donnees.ville}`,
    `Prestation   : ${libellePrestation(donnees.prestation)}`,
    "",
    "Message :",
    donnees.message,
    "",
    "---",
    `Répondre directement à cet email écrit à ${donnees.email}.`,
    `Engagement affiché sur le site : réponse sous ${site.delaiReponse}.`,
  ].join("\n");
}

/**
 * Email de notification interne.
 *
 * Colonne unique, largeur maximale de 600 px, corps à 16 px : c'est ce qui
 * reste lisible sur mobile, où la majorité des emails sont ouverts.
 */
function construireHtml(donnees: ContactFormValues): string {
  const lignes: readonly { label: string; valeur: string; lien?: string }[] = [
    { label: "Nom", valeur: donnees.nom },
    {
      label: "Téléphone",
      valeur: donnees.telephone,
      lien: `tel:${donnees.telephone.replace(/[\s.\-]/g, "")}`,
    },
    { label: "Email", valeur: donnees.email, lien: `mailto:${donnees.email}` },
    { label: "Ville", valeur: donnees.ville },
    { label: "Prestation", valeur: libellePrestation(donnees.prestation) },
  ];

  const lignesHtml = lignes
    .map(({ label, valeur, lien }) => {
      const contenu = lien
        ? `<a href="${echapperHtml(lien)}" style="color:#0b4edb;text-decoration:none">${echapperHtml(valeur)}</a>`
        : echapperHtml(valeur);

      return `<tr>
        <td style="padding:8px 0;color:#646b7a;font-size:14px;width:120px;vertical-align:top">${label}</td>
        <td style="padding:8px 0;color:#0e1a3a;font-size:16px;font-weight:600">${contenu}</td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:24px;background:#f6f8fb;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
      <tr>
        <td style="background:#0b4edb;padding:20px 24px;border-radius:12px 12px 0 0">
          <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700">Nouvelle demande de devis</p>
          <p style="margin:4px 0 0;color:#d6e0ff;font-size:13px">Reçue depuis le formulaire du site</p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:24px;border:1px solid #e4e8ef;border-top:none">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${lignesHtml}</table>
          <p style="margin:24px 0 8px;color:#646b7a;font-size:14px">Message</p>
          <div style="padding:16px;background:#f6f8fb;border-radius:8px;color:#1e2735;font-size:16px;line-height:1.6">${paragrapheHtml(donnees.message)}</div>
          <p style="margin:24px 0 0">
            <a href="mailto:${echapperHtml(donnees.email)}" style="display:inline-block;padding:14px 22px;background:#0b4edb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px">Répondre au client</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:16px 24px 24px;border:1px solid #e4e8ef;border-top:none;border-radius:0 0 12px 12px">
          <p style="margin:0;color:#8892a4;font-size:12px">Répondre à cet email écrit directement au client. Engagement affiché sur le site : réponse sous ${site.delaiReponse}.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type ResultatEnvoi = { ok: true; id: string } | { ok: false; erreur: string };

/**
 * Transmet une demande de devis à la boîte de l'entreprise.
 *
 * `replyTo` pointe sur l'email du client : répondre depuis la boîte de
 * réception suffit, sans copier-coller d'adresse — c'est ce qui réduit le plus
 * le délai de réponse en pratique.
 */
export async function envoyerDemandeDevis(
  donnees: ContactFormValues,
  env: MailEnv,
  maintenant: number = Date.now(),
): Promise<ResultatEnvoi> {
  const resend = new Resend(env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send(
    {
      from: `${site.name} <${env.CONTACT_FROM_EMAIL}>`,
      to: env.CONTACT_TO_EMAIL,
      replyTo: donnees.email,
      subject: construireSujet(donnees),
      text: construireTexte(donnees),
      html: construireHtml(donnees),
    },
    { idempotencyKey: cleIdempotence(donnees, maintenant) },
  );

  if (error) {
    return { ok: false, erreur: `${error.name}: ${error.message}` };
  }

  if (!data) {
    return { ok: false, erreur: "Resend n'a retourné ni identifiant ni erreur." };
  }

  return { ok: true, id: data.id };
}
