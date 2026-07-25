# Contexte projet — MS Nettoyage

_Créé le 25 juillet 2026. Ce fichier est lu au début de chaque session : ne plus redemander ces
informations._

## Identité

- **Nom du projet** : MS Nettoyage — site vitrine
- **Problème résolu** : donner à une entreprise de nettoyage locale une présence en ligne qui la
  rend trouvable sur les recherches géolocalisées et transforme la visite en demande de devis ou
  en appel téléphonique.
- **Type de projet** : site vitrine / génération de leads (pas de compte utilisateur, pas de
  paiement, pas de base de données).

## Stack

Next.js 16.2 (App Router) · React 19.2 · TypeScript strict · Tailwind CSS v4 · Zod 4 · Resend ·
Vitest + Testing Library · déploiement Vercel.

Node.js 20.9+ requis.

## Cible

- **B2C** : particuliers d'Île-de-France (grand ménage, remise en état après travaux, ménage de
  location saisonnière).
- **B2B** : bureaux, commerces, copropriétés, entrepôts et entreprises du bâtiment.
- Majorité des visites attendues **depuis un mobile**, via Google ou le bouche-à-oreille.

## Priorités, dans l'ordre

1. **SEO local** — être trouvé sur « entreprise de nettoyage Meaux » et équivalents IDF.
2. **Conversion** — appel téléphonique ou formulaire de devis.
3. **Performance** — critère de classement, et l'audience est majoritairement mobile.
4. **GEO** — apparaître dans les réponses de ChatGPT, Perplexity et Google AI Overviews.
5. Sécurité : surface réduite (un seul formulaire), mais anti-spam indispensable.

## Coordonnées officielles (NAP)

Toute modification passe par `src/lib/site.ts` — jamais en dur dans un composant.

- **Téléphone** : +33 6 20 46 07 03
- **Email** : msnettoyage211@gmail.com
- **Base** : Meaux (77100)
- **Zone couverte** : toute l'Île-de-France (8 départements + Meaux)

## Décisions structurantes

| Décision                                   | Raison                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Next.js plutôt que Vite/SPA                | Le rendu statique est la condition du référencement local ; une SPA aurait handicapé l'objectif n°1.          |
| Contenu dans `src/data/*`                  | Le client doit pouvoir faire modifier un texte sans qu'on touche à un composant.                              |
| `src/lib/site.ts` unique source du NAP     | Une divergence de NAP entre pages dégrade le référencement local.                                             |
| Témoignages vides au lancement             | Inventer des avis est une pratique commerciale trompeuse (L121-2). La section se masque toute seule.          |
| Adresse de rue laissée vide                | Une adresse inventée casserait la cohérence avec la fiche Google. Le JSON-LD l'omet proprement.               |
| `MediaSlot` au lieu de photos              | Livrer une mise en page complète avant réception des photos, sans image cassée.                               |
| Rate limit en mémoire                      | Suffisant pour un site vitrine ; évite d'imposer Redis. Signature prête pour un store partagé.                |
| CSP avec `'unsafe-inline'` sur les scripts | Un nonce imposerait le rendu dynamique et supprimerait le statique. Aucune session ni donnée sensible en jeu. |

## Sources de référence

- `design/maquette-v2.html` — maquette d'origine (palette, structure, ton).
- `design/references/flyer-ms-nettoyage.png` — flyer client (coordonnées, promesses).

Attention : la maquette d'origine mentionnait Lyon (contenu de gabarit). Toutes les références
géographiques ont été reprises pour l'Île-de-France et Meaux.
