import "server-only";
import { createHash } from "node:crypto";
import nodemailer from "nodemailer";
import type { MailEnv } from "@/lib/env";
import { libellePrestation, type ContactFormValues } from "@/schemas/contact";
import { site, siteUrl } from "@/lib/site";

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
 * Identifiant de message, dérivé du contenu et d'un créneau de 5 minutes.
 *
 * Deux envois identiques rapprochés, cas d'un double-clic sur « Envoyer » ou
 * d'un renvoi automatique du navigateur, produisent le même `Message-ID`. Les
 * serveurs de réception, Gmail compris, écartent alors le doublon au lieu
 * d'afficher deux fois la même demande.
 *
 * Le domaine de l'identifiant est celui de l'expéditeur : un `Message-ID` dont
 * le domaine ne correspond à rien est un signal négatif pour les filtres.
 */
function identifiantMessage(donnees: ContactFormValues, expediteur: string, maintenant: number) {
  const creneau = Math.floor(maintenant / (5 * 60 * 1000));
  const empreinte = `${donnees.email}|${donnees.telephone}|${donnees.message}|${creneau}`;
  const condensat = createHash("sha256").update(empreinte).digest("hex").slice(0, 32);
  const domaine = expediteur.split("@")[1] ?? "localhost";

  return `<${condensat}@${domaine}>`;
}

function construireSujet(donnees: ContactFormValues): string {
  return `Demande de devis : ${libellePrestation(donnees.prestation)}, ${donnees.ville}, ${donnees.nom}`;
}

function construireTexte(donnees: ContactFormValues): string {
  return [
    `Nouvelle demande de devis reçue depuis ${siteUrl}`,
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
 * Transport SMTP, construit une fois puis réutilisé.
 *
 * Nodemailer garde le socket ouvert entre deux envois : sur une fonction
 * serverless, un transport recréé à chaque requête impose une poignée de main
 * TLS complète, soit plusieurs centaines de millisecondes pour rien.
 */
let transportMemorise: { cle: string; transport: nodemailer.Transporter } | undefined;

function obtenirTransport(env: MailEnv): nodemailer.Transporter {
  const cle = `${env.SMTP_HOST}:${env.SMTP_PORT}:${env.SMTP_USER}`;

  if (transportMemorise?.cle === cle) return transportMemorise.transport;

  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    // 465 impose TLS dès la connexion ; les autres ports négocient par STARTTLS.
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    // Sans plafond, une fonction serverless resterait bloquée jusqu'à son propre
    // délai d'expiration et le visiteur n'aurait aucune réponse.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    // Un certificat invalide côté serveur de messagerie doit faire échouer
    // l'envoi, jamais être ignoré : ce serait accepter un intermédiaire.
    tls: { rejectUnauthorized: true },
  });

  transportMemorise = { cle, transport };

  return transport;
}

/**
 * Transmet une demande de devis à la boîte de l'entreprise.
 *
 * L'expéditeur est l'adresse du domaine, jamais celle du visiteur : usurper
 * l'adresse du client ferait échouer les contrôles SPF et DKIM du serveur de
 * réception, et la demande finirait en indésirables.
 *
 * `replyTo` pointe en revanche sur l'email du client : répondre depuis la boîte
 * de réception suffit, sans copier-coller d'adresse, c'est ce qui réduit le
 * plus le délai de réponse en pratique.
 */
export async function envoyerDemandeDevis(
  donnees: ContactFormValues,
  env: MailEnv,
  maintenant: number = Date.now(),
): Promise<ResultatEnvoi> {
  try {
    const info = await obtenirTransport(env).sendMail({
      from: { name: site.name, address: env.CONTACT_FROM_EMAIL },
      to: [...env.CONTACT_TO_EMAIL],
      replyTo: donnees.email,
      subject: construireSujet(donnees),
      text: construireTexte(donnees),
      html: construireHtml(donnees),
      messageId: identifiantMessage(donnees, env.CONTACT_FROM_EMAIL, maintenant),
    });

    if (info.rejected.length > 0) {
      return {
        ok: false,
        erreur: `Destinataire refusé par le serveur : ${info.rejected.join(", ")}`,
      };
    }

    return { ok: true, id: info.messageId };
  } catch (cause) {
    // Le message d'erreur SMTP peut contenir l'identifiant du compte : il part
    // dans les logs serveur, jamais dans la réponse envoyée au visiteur.
    return { ok: false, erreur: cause instanceof Error ? cause.message : String(cause) };
  }
}
