# MS Nettoyage — site vitrine

Site vitrine de **MS Nettoyage**, entreprise de nettoyage professionnel basée à Meaux (77100) et
intervenant dans toute l'Île-de-France.

Objectif du site : être trouvé sur les recherches locales (« entreprise de nettoyage Meaux »,
« nettoyage de bureaux Île-de-France ») et transformer la visite en demande de devis ou en appel.

---

## Stack

| Brique      | Choix                    | Pourquoi                                                      |
| ----------- | ------------------------ | ------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router)  | Rendu statique — indispensable au référencement local         |
| Langage     | TypeScript strict        | Zéro `any`, aucune erreur de compilation tolérée              |
| Styles      | Tailwind CSS v4          | Tokens de design centralisés dans `globals.css`               |
| Validation  | Zod 4                    | Un seul schéma partagé client + serveur                       |
| Emails      | Resend                   | Envoi des demandes de devis, avec authentification du domaine |
| Tests       | Vitest + Testing Library | 53 tests sur la validation, l'anti-spam et le contenu         |
| Hébergement | Vercel                   | Déploiement statique, SSL et domaine custom inclus            |

Node.js **20.9+** requis (imposé par Next.js 16).

---

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

Le site fonctionne sans aucune variable d'environnement : seul l'envoi du formulaire de devis
nécessite une clé Resend. Sans elle, le formulaire affiche un message invitant à appeler.

### Scripts

| Commande             | Effet                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `npm run dev`        | Serveur de développement (Turbopack)                              |
| `npm run build`      | Build de production                                               |
| `npm run start`      | Sert le build de production                                       |
| `npm run lint`       | ESLint                                                            |
| `npm run typecheck`  | Génération des types de routes + `tsc --noEmit`                   |
| `npm run test`       | Suite Vitest                                                      |
| `npm run test:watch` | Vitest en mode veille                                             |
| `npm run format`     | Prettier (écriture)                                               |
| `npm run verify`     | **lint + typecheck + tests + build** — à lancer avant tout commit |

---

## Structure

```
src/
├─ app/                          Routes (App Router)
│  ├─ layout.tsx                 Layout racine : police, header, footer, JSON-LD entreprise
│  ├─ page.tsx                   Accueil
│  ├─ services/[slug]/           7 pages de prestation, générées statiquement
│  ├─ zones-d-intervention/[slug]/  9 pages de zone (Meaux + 8 départements)
│  ├─ devis/                     Page de conversion (formulaire + coordonnées)
│  ├─ a-propos/  faq/            Pages éditoriales
│  ├─ mentions-legales/          Obligations légales (LCEN)
│  ├─ politique-de-confidentialite/  RGPD
│  ├─ api/contact/route.ts       Réception des demandes de devis
│  ├─ sitemap.ts  robots.ts      SEO technique
│  ├─ manifest.ts  icon.tsx  apple-icon.tsx  opengraph-image.tsx
│  ├─ not-found.tsx  error.tsx
│  └─ globals.css                Tokens de design (couleurs, ombres, animations)
│
├─ components/
│  ├─ ui/                        Briques génériques (Button, Icon, Field, Card, Section…)
│  ├─ layout/                    Header, Footer, Logo, PageHeader, MobileCallBar
│  ├─ sections/                  Blocs de page réutilisables (Hero, Services, FAQ, CTA…)
│  ├─ forms/DevisForm.tsx        Formulaire de devis (seul composant client interactif)
│  └─ seo/                       JsonLd, Breadcrumbs
│
├─ data/                         CONTENU ÉDITABLE — aucune logique
│  ├─ services.ts                Les 7 prestations
│  ├─ zones.ts                   Les 9 zones d'intervention
│  ├─ faq.ts                     Les 12 questions/réponses
│  ├─ temoignages.ts             Avis clients (vide au lancement — voir plus bas)
│  └─ navigation.ts              Menus
│
├─ lib/
│  ├─ site.ts                    ★ Source de vérité : NAP, horaires, mentions légales
│  ├─ schema.ts                  Générateurs JSON-LD
│  ├─ seo.ts                     Construction des métadonnées
│  ├─ mail.ts                    Composition et envoi de l'email de devis
│  ├─ rate-limit.ts              Limitation de débit du formulaire
│  ├─ env.ts                     Validation des variables serveur
│  └─ utils.ts                   `cn()`
│
└─ schemas/contact.ts            Schéma Zod partagé client + serveur

design/                          Maquette HTML d'origine et flyer de référence (non buildés)
tasks/                           Contexte projet, suivi, leçons, bugs
tests/                           Suite Vitest
```

---

## Modifier le contenu

**Aucune de ces modifications ne demande de toucher à un composant.**

| Pour changer…                       | Éditer                                              |
| ----------------------------------- | --------------------------------------------------- |
| Téléphone, email, adresse, horaires | `src/lib/site.ts`                                   |
| Mentions légales (SIRET, RCS, TVA…) | `src/lib/site.ts` → `legal`                         |
| Réseaux sociaux                     | `src/lib/site.ts` → `social` (vide = icône masquée) |
| Une prestation                      | `src/data/services.ts`                              |
| Une zone d'intervention             | `src/data/zones.ts`                                 |
| La FAQ                              | `src/data/faq.ts`                                   |
| Les couleurs                        | `src/app/globals.css` → bloc `@theme`               |

Ajouter une prestation dans `services.ts` crée automatiquement sa page, son entrée de menu, son
option dans le formulaire de devis, sa fiche JSON-LD et sa ligne de sitemap.

### Photos

Le site est livré sans photographies. Les emplacements sont matérialisés par le composant
`MediaSlot`, qui affiche un aplat graphique de marque plutôt qu'une image cassée.

Pour installer une photo : la déposer dans `public/images/`, puis renseigner la prop `src` de
l'emplacement correspondant, par exemple dans `src/components/sections/Hero.tsx` :

```tsx
<MediaSlot src="/images/hero-salon.jpg" alt="Salon lumineux après intervention" priority />
```

En développement, chaque emplacement vide affiche le descriptif de la photo attendue.

### Avis clients

`src/data/temoignages.ts` est **volontairement vide**. Publier des témoignages inventés est une
pratique commerciale trompeuse (art. L121-2 du code de la consommation). La section « Avis clients »
ne s'affiche qu'une fois de vrais avis saisis dans ce fichier.

---

## Sécurité du formulaire de devis

La route `POST /api/contact` applique, dans cet ordre :

1. **Limitation de débit** — 5 envois par IP et par tranche de 10 minutes (`lib/rate-limit.ts`).
2. **Plafond de taille** — corps JSON limité à 16 Ko.
3. **Validation Zod stricte** — aucun champ inconnu ne franchit cette étape.
4. **Leurre anti-robot** — champ masqué ; s'il est rempli, la route répond un succès factice et
   n'envoie rien.
5. **Contrôle de vitesse** — une soumission en moins de 3 secondes est rejetée.

Aucune réponse d'erreur ne divulgue d'information technique : le détail part dans les logs serveur.

> **Limite connue.** Le compteur de débit vit en mémoire du processus. Sur Vercel, chaque instance a
> son propre compteur — suffisant contre un robot naïf, insuffisant contre une attaque distribuée.
> Si le volume de spam le justifie, remplacer l'implémentation de `consommer()` par un store partagé
> (Upstash Redis) : la signature est conçue pour rester identique.

---

## SEO et visibilité IA

- Métadonnées, URL canonique et carte Open Graph sur **chaque** page (`lib/seo.ts`).
- JSON-LD : `LocalBusiness`, `Service`, `OfferCatalog`, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` et `robots.txt` générés — les crawlers IA (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended…) sont **explicitement autorisés**.
- Contenu rédigé pour l'extraction : définition autonome en tête de page, questions
  conversationnelles en `h2`/`h3`, données chiffrées concrètes.
- Le NAP provient d'un fichier unique : aucune divergence possible entre les pages, condition d'un
  bon référencement local.

Des tests (`tests/contenu.test.ts`) échouent si un titre dépasse 65 caractères, si une
méta-description sort de la fourchette 110–165, ou si deux zones partagent le même texte.

---

## Avant la mise en ligne

Voir **[DEPLOIEMENT.md](./DEPLOIEMENT.md)** — checklist complète : informations à compléter,
configuration Resend et DNS, déploiement Vercel, référencement local.
