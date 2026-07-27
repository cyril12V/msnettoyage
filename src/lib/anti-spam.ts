import type { ContactInput } from "@/schemas/contact";
import { DELAI_MINIMAL_SOUMISSION_MS } from "@/schemas/contact";

/**
 * Filtrage des soumissions automatisées du formulaire de devis.
 *
 * Le formulaire d'une entreprise de nettoyage reçoit deux populations : des
 * prospects, et des robots qui parcourent le web à la recherche de formulaires
 * ouverts pour y déposer des liens. Les seconds ne cherchent pas à imiter un
 * humain, ils remplissent au plus vite le minimum accepté par la validation.
 *
 * ASYMÉTRIE DES ERREURS, qui gouverne tout ce fichier : laisser passer un spam
 * coûte un email à supprimer, écarter un vrai client coûte un chantier. Chaque
 * règle ci-dessous ne se déclenche donc que sur un signal qu'un prospect de
 * Meaux ne peut raisonnablement pas produire. Aucune heuristique de vocabulaire
 * n'est utilisée : « nous cherchons un prestataire pour notre site de
 * production » contient assez de mots suspects pour être écarté à tort.
 */

export type Verdict =
  | { robot: false }
  /** `motif` part dans les logs serveur, jamais dans la réponse. */
  | { robot: true; motif: string };

const PAS_UN_ROBOT: Verdict = { robot: false };

/** Décalage toléré entre l'horloge du visiteur et celle du serveur. */
const TOLERANCE_HORLOGE_MS = 60_000;

/** Compte les adresses web présentes dans un texte. */
function compterLiens(texte: string): number {
  return (texte.match(/\b(?:https?:\/\/|www\.)\S+/gi) ?? []).length;
}

/**
 * Écritures qu'un message adressé à une entreprise de Meaux ne contient pas.
 *
 * Volontairement limité au cyrillique et aux idéogrammes : les alphabets grec,
 * arabe ou hébreu sont exclus de la liste, car une personne installée en
 * Seine-et-Marne peut légitimement en faire usage dans une signature.
 */
const ECRITURES_ETRANGERES = /[\p{Script=Cyrillic}\p{Script=Han}\p{Script=Hiragana}]/u;

/** Balisage de lien : un prospect écrit dans un champ texte, pas en HTML. */
const BALISAGE_LIEN = /\[url[=\]]|\[\/url\]|<a\s|href\s*=/i;

/**
 * Détermine si une soumission provient d'un robot.
 *
 * L'appelant répond alors un succès factice : rejeter explicitement
 * apprendrait au robot quel signal l'a trahi, et lui permettrait d'ajuster.
 */
export function detecterRobot(donnees: ContactInput, maintenant: number = Date.now()): Verdict {
  // 1. Leurre rempli. Champ masqué visuellement et aux lecteurs d'écran :
  //    aucun humain ne le voit, donc aucun humain ne le remplit.
  if (donnees.societeWeb) {
    return { robot: true, motif: "leurre rempli" };
  }

  // 2. Horodatage d'affichage absent. Le formulaire du site le pose toujours,
  //    et il ne peut pas être soumis sans JavaScript : son absence signifie que
  //    la requête a été fabriquée hors du formulaire.
  if (donnees.affichageAt === undefined) {
    return { robot: true, motif: "horodatage d'affichage absent" };
  }

  // 3. Horodatage franchement postérieur à la réception : horloge falsifiée
  //    pour contourner le contrôle de vitesse.
  //
  //    L'horodatage vient du navigateur, donc d'une horloge que le serveur ne
  //    contrôle pas : un téléphone mal synchronisé avance couramment de
  //    quelques dizaines de secondes. TOLERANCE_HORLOGE_MS absorbe ce décalage,
  //    et se paie par un contournement possible du seul contrôle de vitesse
  //    pour qui décale son horodatage à l'intérieur de cette fenêtre. Les
  //    autres contrôles restent actifs, et un client écarté à tort coûte plus
  //    cher qu'un spam reçu.
  const ecoule = maintenant - donnees.affichageAt;

  if (ecoule < -TOLERANCE_HORLOGE_MS) {
    return { robot: true, motif: "horodatage d'affichage dans le futur" };
  }

  // 4. Formulaire soumis plus vite qu'un humain ne peut le remplir. Le contrôle
  //    ne s'applique qu'à un délai mesurable, sans quoi une horloge en avance
  //    produirait un délai négatif, donc un rejet.
  if (ecoule >= 0 && ecoule < DELAI_MINIMAL_SOUMISSION_MS) {
    return { robot: true, motif: "soumission trop rapide" };
  }

  // 5. Deux liens ou plus. Le dépôt de liens est la finalité même de ces
  //    robots. Un lien unique reste accepté : un propriétaire Airbnb colle
  //    légitimement l'adresse de son annonce.
  const liens = compterLiens(donnees.message) + compterLiens(donnees.nom);
  if (liens >= 2) {
    return { robot: true, motif: `${liens} liens dans la demande` };
  }

  // 6. Balisage de lien, quel qu'en soit le nombre. Aucun humain n'écrit de
  //    BBCode ou de HTML dans un champ de formulaire.
  if (BALISAGE_LIEN.test(donnees.message)) {
    return { robot: true, motif: "balisage de lien dans le message" };
  }

  // 7. Écriture incompatible avec la clientèle desservie.
  if (ECRITURES_ETRANGERES.test(donnees.message)) {
    return { robot: true, motif: "écriture non latine dans le message" };
  }

  return PAS_UN_ROBOT;
}
