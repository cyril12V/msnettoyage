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
export function detecterRobot(donnees: ContactInput): Verdict {
  // 1. Leurre rempli. Champ masqué visuellement et aux lecteurs d'écran :
  //    aucun humain ne le voit, donc aucun humain ne le remplit.
  if (donnees.societeWeb) {
    return { robot: true, motif: "leurre rempli" };
  }

  // 2. Durée de saisie absente. Le formulaire du site la calcule toujours, et
  //    il ne peut pas être soumis sans JavaScript : son absence signifie que la
  //    requête a été fabriquée hors du formulaire.
  if (donnees.dureeSaisieMs === undefined) {
    return { robot: true, motif: "durée de saisie absente" };
  }

  // 3. Formulaire soumis plus vite qu'un humain ne peut le remplir.
  //
  //    La durée est mesurée par le navigateur entre l'affichage et l'envoi,
  //    donc sur une seule horloge. Ni le décalage entre l'heure du visiteur et
  //    celle du serveur, ni la latence du réseau, ni le démarrage à froid de la
  //    fonction n'entrent dans le calcul. La version précédente comparait un
  //    horodatage client à l'heure du serveur : un envoi instantané y passait
  //    pour un remplissage de trois secondes dès que la fonction démarrait à
  //    froid.
  if (donnees.dureeSaisieMs < DELAI_MINIMAL_SOUMISSION_MS) {
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
