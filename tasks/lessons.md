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

---

## 2026-07-26, Un jeton de couleur conforme « sur fond blanc » est un piège

**Erreur.** Le jeton `--color-muted-light` (#6c7484) avait été calibré à 4,70:1 **sur fond blanc**,
donc conforme WCAG AA. Posé sur `--color-surface` (#f6f8fb), il retombe à 4,42:1. Lighthouse a
sorti l'échec sur une page d'atterrissage, plusieurs semaines après que le jeton ait été « validé ».

**Correction.** Suppression du jeton. Tout passe sur `--color-muted` (#646b7a), qui tient sur les
trois fonds du site : 5,35:1 sur blanc, 5,03:1 sur `surface`, 4,63:1 sur `brand-soft`. L'écart
visuel entre les deux valeurs était de toute façon imperceptible.

**Règle.** Un jeton de couleur se valide contre **tous** les fonds sur lesquels le système de design
permet de le poser, pas contre le blanc. Si un jeton n'est conforme que sur un fond, il ne mérite
pas d'exister : sa seule fonction est de produire une régression le jour où quelqu'un l'utilise
ailleurs.

---

## 2026-07-26, Deux pages ne peuvent pas viser la même requête

**Erreur.** Le site avait une page `/meaux` visant « nettoyage à Meaux » **et** une page d'accueil
visant la même chose. Les deux se cannibalisaient : Google en retient une, arbitrairement, et les
deux reculent.

**Correction.** `/meaux` supprimée, son contenu local fondu dans la section `#zones` de l'accueil,
l'URL redirigée en 301. La page d'accueil vise « société de nettoyage à Meaux », les six pages
d'atterrissage visent chacune une requête disjointe.

**Règle.** Une requête = une page, et une page = une requête. Avant de créer une page, vérifier
qu'aucune page existante ne vise déjà le même intitulé. `tests/landings.test.ts` verrouille
l'absence de doublon de titre, de chapeau, de paragraphe et de question.

---

## 2026-07-27, Ne jamais mesurer une durée entre deux horloges différentes

**Erreur.** Le contrôle anti-robot comparait un horodatage posé par le navigateur à l'heure du
serveur. Un test de bout en bout sur la production a montré qu'une soumission **instantanée**
passait le seuil de trois secondes et déclenchait un envoi.

**Fausse piste.** J'ai d'abord accusé le décalage d'horloge du poste de test. Mesuré : 0,1 s. La
vraie cause était la latence du réseau plus le démarrage à froid de la fonction serverless, qui
s'ajoutent au délai perçu par le serveur. Un envoi instantané passait pour un remplissage de trois
secondes dès que la fonction démarrait à froid.

**Correction.** Le navigateur transmet une **durée**, calculée entre l'affichage et l'envoi sur sa
seule horloge. La tolérance de 60 s ajoutée pour absorber le décalage a disparu avec le problème.

**Règle.** Une durée se mesure toujours sur une seule horloge, et la soustraction se fait avant le
transport. Comparer `Date.now()` serveur à un horodatage client mélange trois grandeurs sans rapport :
le délai réel, le décalage des horloges et le temps de transport.

**Règle secondaire.** Vérifier une hypothèse avant de la corriger. La tolérance d'horloge ajoutée sur
la foi du mauvais diagnostic était une complexité inutile qui masquait le vrai défaut.

---

## 2026-07-27, Un champ anti-robot optionnel ne protège rien

**Erreur.** Le champ `affichageAt` était `optional()` dans le schéma, et la route ne testait la
vitesse que `if (affichageAt !== undefined)`. Un robot qui postait du JSON brut sans ce champ
contournait donc intégralement le contrôle, sans rien avoir à deviner.

**Correction.** L'absence du champ est devenue un motif de rejet à part entière. Le formulaire du
site le calcule toujours et ne peut pas être soumis sans JavaScript : son absence prouve que la
requête n'est pas passée par lui.

**Règle.** Un contrôle de sécurité dont la donnée d'entrée est facultative se désactive tout seul à
la demande de l'attaquant. Soit le champ est obligatoire, soit son absence est un signal.
