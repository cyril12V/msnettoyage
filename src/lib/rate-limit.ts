/**
 * Limitation de débit à fenêtre glissante, en mémoire.
 *
 * Limite volontairement assumée : l'état vit dans le processus. Sur une
 * plateforme serverless, chaque instance a son propre compteur, donc la limite
 * réelle est « N requêtes par instance ». C'est suffisant pour arrêter un robot
 * naïf sur un formulaire de devis, et cela évite d'imposer une dépendance
 * externe (Redis/Upstash) à un site vitrine.
 *
 * Si le volume de spam le justifie, remplacer `consommer` par un appel à un
 * store partagé : la signature est conçue pour rester identique.
 */

type Fenetre = {
  /** Horodatages des requêtes encore dans la fenêtre. */
  horodatages: number[];
};

const compteurs = new Map<string, Fenetre>();

/** Nombre maximal de requêtes autorisées par fenêtre et par clé. */
export const LIMITE_PAR_FENETRE = 5;

/** Durée de la fenêtre glissante, en millisecondes. */
export const FENETRE_MS = 10 * 60 * 1000;

/** Au-delà de ce nombre de clés suivies, les entrées expirées sont purgées. */
const SEUIL_PURGE = 5_000;

export type ResultatLimite = {
  autorise: boolean;
  /** Requêtes encore disponibles dans la fenêtre courante. */
  restant: number;
  /** Secondes à attendre avant une nouvelle tentative, si la limite est atteinte. */
  reessayerDansSecondes: number;
};

function purger(maintenant: number): void {
  for (const [cle, fenetre] of compteurs) {
    const actifs = fenetre.horodatages.filter((t) => maintenant - t < FENETRE_MS);
    if (actifs.length === 0) {
      compteurs.delete(cle);
    } else {
      fenetre.horodatages = actifs;
    }
  }
}

/**
 * Enregistre une tentative pour `cle` et indique si elle est autorisée.
 *
 * @param cle Identifiant de l'appelant, typiquement son adresse IP.
 * @param maintenant Horodatage courant, injectable pour les tests.
 */
export function consommer(cle: string, maintenant: number = Date.now()): ResultatLimite {
  if (compteurs.size > SEUIL_PURGE) {
    purger(maintenant);
  }

  const fenetre = compteurs.get(cle) ?? { horodatages: [] };
  const recents = fenetre.horodatages.filter((t) => maintenant - t < FENETRE_MS);

  if (recents.length >= LIMITE_PAR_FENETRE) {
    const plusAncien = recents[0] ?? maintenant;
    const attente = Math.ceil((FENETRE_MS - (maintenant - plusAncien)) / 1000);

    compteurs.set(cle, { horodatages: recents });

    return { autorise: false, restant: 0, reessayerDansSecondes: Math.max(attente, 1) };
  }

  recents.push(maintenant);
  compteurs.set(cle, { horodatages: recents });

  return {
    autorise: true,
    restant: LIMITE_PAR_FENETRE - recents.length,
    reessayerDansSecondes: 0,
  };
}

/** Vide l'état. Réservé aux tests. */
export function reinitialiserLimites(): void {
  compteurs.clear();
}

/**
 * Extrait l'adresse IP de l'appelant depuis les en-têtes du proxy.
 *
 * `x-forwarded-for` est une liste : la première entrée est l'IP cliente
 * d'origine, les suivantes sont les proxys traversés.
 */
export function ipDepuisHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const premiere = forwardedFor.split(",")[0]?.trim();
    if (premiere) return premiere;
  }

  return headers.get("x-real-ip")?.trim() || "inconnue";
}
