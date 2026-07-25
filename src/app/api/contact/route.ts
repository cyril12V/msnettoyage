import type { NextRequest } from "next/server";
import { getMailEnv } from "@/lib/env";
import { envoyerDemandeDevis } from "@/lib/mail";
import { consommer, ipDepuisHeaders } from "@/lib/rate-limit";
import { contactSchema, DELAI_MINIMAL_SOUMISSION_MS } from "@/schemas/contact";

/**
 * Réception des demandes de devis.
 *
 * Défenses appliquées, dans cet ordre :
 *  1. limitation de débit par IP ;
 *  2. rejet des corps trop volumineux ;
 *  3. validation Zod stricte — aucun champ inconnu n'est transmis plus loin ;
 *  4. leurre anti-robot (honeypot) et contrôle de vitesse de soumission.
 *
 * Les réponses d'erreur ne divulguent jamais d'information technique : le
 * détail part dans les logs serveur, le visiteur reçoit un message actionnable.
 */

/** Taille maximale acceptée pour le corps JSON. */
const TAILLE_MAX_CORPS = 16 * 1024;

type ReponseErreur = {
  message: string;
  /** Erreurs par champ, exploitées par le formulaire pour l'affichage inline. */
  champs?: Record<string, string>;
};

function erreur(message: string, statut: number, champs?: Record<string, string>): Response {
  const corps: ReponseErreur = champs ? { message, champs } : { message };

  return Response.json(corps, { status: statut });
}

export async function POST(request: NextRequest): Promise<Response> {
  const ip = ipDepuisHeaders(request.headers);
  const limite = consommer(ip);

  if (!limite.autorise) {
    const minutes = Math.ceil(limite.reessayerDansSecondes / 60);

    return Response.json(
      {
        message: `Trop de demandes envoyées depuis cet appareil. Réessayez dans ${minutes} minute${minutes > 1 ? "s" : ""} ou appelez-nous directement.`,
      } satisfies ReponseErreur,
      {
        status: 429,
        headers: { "Retry-After": String(limite.reessayerDansSecondes) },
      },
    );
  }

  const brut = await request.text();

  if (brut.length > TAILLE_MAX_CORPS) {
    return erreur("Votre message est trop long. Réduisez-le puis réessayez.", 413);
  }

  let corps: unknown;
  try {
    corps = JSON.parse(brut);
  } catch {
    return erreur("Requête invalide.", 400);
  }

  const resultat = contactSchema.safeParse(corps);

  if (!resultat.success) {
    const champs: Record<string, string> = {};

    for (const issue of resultat.error.issues) {
      const champ = issue.path[0];
      if (typeof champ === "string" && !(champ in champs)) {
        champs[champ] = issue.message;
      }
    }

    return erreur("Certains champs sont incomplets ou invalides.", 422, champs);
  }

  const { societeWeb, affichageAt, ...donnees } = resultat.data;

  // Leurre rempli : robot quasi certain. On répond 200 pour ne pas lui
  // apprendre que la soumission a été rejetée, sans rien envoyer.
  if (societeWeb) {
    return Response.json({ message: "Demande enregistrée." }, { status: 200 });
  }

  // Formulaire soumis plus vite qu'un humain ne peut le remplir.
  if (affichageAt !== undefined && Date.now() - affichageAt < DELAI_MINIMAL_SOUMISSION_MS) {
    return erreur("Merci de prendre un instant pour vérifier vos informations avant l'envoi.", 422);
  }

  const env = getMailEnv();

  if (!env.ok) {
    console.error("[contact] Configuration email invalide :", env.erreurs.join(" | "));

    return erreur(
      "L'envoi du formulaire est momentanément indisponible. Contactez-nous par téléphone, nous répondons immédiatement.",
      503,
    );
  }

  const envoi = await envoyerDemandeDevis(donnees, env.env);

  if (!envoi.ok) {
    console.error("[contact] Échec de l'envoi via Resend :", envoi.erreur);

    return erreur(
      "Votre demande n'a pas pu être transmise. Réessayez dans quelques minutes ou appelez-nous directement.",
      502,
    );
  }

  return Response.json({ message: "Demande envoyée." }, { status: 200 });
}
