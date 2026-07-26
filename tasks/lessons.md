# Leçons, MS Nettoyage

_Lu au début de chaque session. Une entrée = une erreur commise et la règle qui en découle._

---

## 2026-07-25, Ne pas coder Next.js de mémoire

**Contexte.** `create-next-app` a installé Next.js **16.2.12**, pas la 15 supposée. Le scaffold
affiche d'ailleurs un avertissement explicite : « This is NOT the Next.js you know ».

**Erreur évitée de justesse.** Écrire des pages avec `params` synchrones, et un script
`"lint": "next lint"`.

**Ce qui a changé en 16 et qui aurait cassé le code :**

- `params` et `searchParams` sont des `Promise`, l'accès synchrone est **supprimé**, plus
  seulement déprécié.
- Idem pour les props de `opengraph-image`, `icon`, `apple-icon`.
- `next lint` est supprimé : appeler `eslint` directement.
- Turbopack est le bundler par défaut de `dev` **et** de `build`.
- `middleware.ts` est renommé `proxy.ts`.
- `images.qualities` vaut `[75]` par défaut : toute autre valeur doit être déclarée.

**Règle.** Avant d'écrire la première ligne sur un projet Next.js, lire
`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-<major>.md`. La version installée
fait autorité, pas la version supposée.

---

## 2026-07-25, Un honeypot ne doit pas échouer à la validation

**Erreur.** Le champ leurre était déclaré `z.string().max(0)`. Rempli, il produisait une **422**
accompagnée du message Zod par défaut, en anglais : `Too big: expected string to have <=0
characters`.

**Double problème :** le robot apprenait qu'un piège existait, et un message anglais fuyait dans
une interface entièrement française.

**Correction.** Le schéma accepte le champ rempli (`z.string().optional()`) ; c'est la route API
qui l'écarte en répondant **200 « Demande enregistrée »** sans rien envoyer.

**Règle.** Un piège anti-robot doit être indiscernable d'un succès. Et tout message d'erreur d'un
schéma de validation destiné à l'utilisateur porte un `message` explicite, les valeurs par défaut
d'une librairie ne sont jamais traduites.

---

## 2026-07-25, `setState` dans un effet pour réagir à la navigation

**Erreur.** Le menu mobile se fermait via `useEffect(() => setMenuOuvert(false), [pathname])`.
ESLint (`react-hooks/set-state-in-effect`) l'a rejeté : cascade de rendus inutile.

**Correction.** Fermer le menu dans le `onClick` des liens, l'événement qui provoque réellement
la fermeture.

**Règle.** Un effet synchronise React avec un système **externe**. Réagir à un événement
utilisateur se fait dans le gestionnaire d'événement, pas dans un effet.

---

## 2026-07-25, `role="alert"` sur chaque champ en erreur

**Erreur.** Chaque message d'erreur de champ portait `role="alert"`. Résultat : plusieurs régions
d'alerte simultanées, annoncées en rafale par les lecteurs d'écran, et des tests incapables de
cibler l'alerte globale.

**Correction.** Une seule alerte de synthèse en tête de formulaire ; les erreurs de champ sont
reliées par `aria-invalid` + `aria-describedby`.

**Règle.** Un formulaire n'expose qu'**une** région `role="alert"`. Les erreurs de champ
s'associent à leur champ, elles ne s'annoncent pas d'elles-mêmes.

---

## 2026-07-25, `ImageResponse` n'est pas un moteur de rendu HTML

**Erreur.** Le build a échoué sur `/opengraph-image` :
`Expected <div> to have explicit "display: flex" ... if it has more than one child node`.

La cause : un `<div>` contenant `{ville} ({cp}) · texte {variable}`, soit plusieurs nœuds enfants
aux yeux de satori, alors que cela ressemble à une simple ligne de texte.

**Correction.** Un unique littéral de gabarit comme enfant.

**Règle.** Dans `ImageResponse` : flexbox uniquement (pas de grid), et tout élément à plus d'un
enfant, **les fragments de texte comptent** : déclare `display: flex`.
