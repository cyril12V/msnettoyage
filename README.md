# MS Nettoyage

**En ligne :** https://msnettoyage.vercel.app · **Dépôt :** https://github.com/cyril12V/msnettoyage

Site vitrine de **MS Nettoyage**, entreprise de nettoyage professionnel basée à Meaux (77100) et
intervenant dans toute l'Île-de-France.

Objectif du site : sortir dans Google sur les recherches locales du type « nettoyage de maison à
Meaux » ou « société de nettoyage à Meaux », puis transformer la visite en demande de devis ou en
appel. L'architecture des pages découle directement de cette liste de requêtes, voir
[Architecture de référencement](#architecture-de-référencement).

---

## Stack

| Brique      | Choix                    | Pourquoi                                                      |
| ----------- | ------------------------ | ------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router)  | Rendu statique, indispensable au référencement local          |
| Langage     | TypeScript strict        | Zéro `any`, aucune erreur de compilation tolérée              |
| Styles      | Tailwind CSS v4          | Tokens de design centralisés dans `globals.css`               |
| Validation  | Zod 4                    | Un seul schéma partagé client + serveur                       |
| Emails      | Resend                   | Envoi des demandes de devis, avec authentification du domaine |
| Tests       | Vitest + Testing Library | 100 tests sur la validation, l'anti-spam et le contenu        |
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
| `npm run verify`     | **lint + typecheck + tests + build** : à lancer avant tout commit |

---

## Architecture de référencement

**Une requête = une page.** C'est la seule règle qui structure le site.

Le client vise huit recherches, toutes suffixées « à Meaux ». Six d'entre elles ont leur page
dédiée ; les deux autres (« société de nettoyage » et « prestation de nettoyage ») sont génériques
et portées par la page d'accueil, qui est de toute façon la page la plus forte du domaine.

| Requête visée                     | Page                               |
| --------------------------------- | ---------------------------------- |
| Société de nettoyage à Meaux      | `/` (page d'accueil)               |
| Prestation de nettoyage à Meaux   | `/` (page d'accueil)               |
| Nettoyage de maison à Meaux       | `/nettoyage-maison-meaux`          |
| Nettoyage de bureau à Meaux       | `/nettoyage-bureau-meaux`          |
| Ménage particulier à Meaux        | `/menage-particulier-meaux`        |
| Ménage après travaux à Meaux      | `/menage-apres-travaux-meaux`      |
| Ménage après déménagement à Meaux | `/menage-apres-demenagement-meaux` |
| Ménage Airbnb à Meaux             | `/menage-airbnb-meaux`             |

Trois conséquences qui ne se devinent pas à la lecture du code :

1. **Il n'y a plus de page `/meaux`.** Elle visait « nettoyage à Meaux », exactement comme la page
   d'accueil. Deux pages sur le même mot-clé se cannibalisent : Google en retient une, au hasard, et
   les deux reculent. Son contenu a été fondu dans la section `#zones` de l'accueil, et `/meaux`
   redirige en 301.
2. **Le contenu des six pages est unique, paragraphe par paragraphe.** Un chercher-remplacer sur le
   nom de la ville produirait des pages jumelles, que Google traite comme du remplissage.
   `tests/landings.test.ts` échoue si deux pages partagent un chapeau, une méta-description, un
   paragraphe ou une question de FAQ.
3. **Chaque page est atteignable depuis toutes les autres** : section `#prestations-meaux` de
   l'accueil, colonne du pied de page et menu mobile. Le texte des liens est la requête elle-même,
   jamais « en savoir plus » : c'est ce texte que Google lit pour qualifier la page d'arrivée.

Pour couvrir une nouvelle ville, dupliquer les entrées de `src/data/landings.ts` **en réécrivant les
paragraphes**, et ajouter la ville dans `src/data/zones.ts`. Le sitemap, le pied de page, le menu
mobile et le JSON-LD suivent automatiquement.

---

## Structure

Le site tient sur **une page d'accueil** qui déroule toutes les sections, plus les six pages de
prestation ci-dessus et deux pages légales. Les anciennes adresses (`/services`, `/devis`, `/faq`,
`/meaux`…) redirigent en 301 vers l'ancre ou la page correspondante, la règle est dans
`next.config.ts`.

```
src/
├─ app/                          Routes (App Router)
│  ├─ layout.tsx                 Layout racine : police, header, footer, JSON-LD entreprise + WebSite
│  ├─ page.tsx                   Page d'accueil, toutes les sections
│  ├─ [prestation]/page.tsx      Les 6 pages locales, générées depuis data/landings.ts
│  ├─ mentions-legales/          Obligations légales (LCEN)
│  ├─ politique-de-confidentialite/  RGPD
│  ├─ api/contact/route.ts       Réception des demandes de devis
│  ├─ sitemap.ts  robots.ts      SEO technique
│  ├─ manifest.ts  icon.png  apple-icon.png  opengraph-image.tsx
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
├─ data/                         CONTENU ÉDITABLE, aucune logique
│  ├─ landings.ts                ★ Les 6 pages locales, une par requête Google
│  ├─ services.ts                Les 7 prestations de la page d'accueil
│  ├─ zones.ts                   Les 9 zones d'intervention
│  ├─ univers.ts                 Les 6 univers d'intervention
│  ├─ realisations.ts            Paires avant / après
│  ├─ cas-clients.ts             Missions mises en avant (démo, voir plus bas)
│  ├─ faq.ts                     Les 12 questions/réponses
│  ├─ temoignages.ts             Avis clients (démo, voir plus bas)
│  └─ navigation.ts              Menus de l'en-tête et du pied de page
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
| Le texte d'une page de prestation   | `src/data/landings.ts`                              |
| Une prestation de l'accueil         | `src/data/services.ts`                              |
| Une zone d'intervention             | `src/data/zones.ts`                                 |
| La FAQ                              | `src/data/faq.ts`                                   |
| Les couleurs                        | `src/app/globals.css` → bloc `@theme`               |

Ajouter une entrée dans `landings.ts` crée la page, son URL, son entrée de sitemap, son lien dans le
pied de page et dans le menu mobile, et son JSON-LD. Ajouter une prestation dans `services.ts`
l'ajoute à la section services de l'accueil, aux options du formulaire de devis et au catalogue.

### Sections de la page d'accueil

L'enchaînement reprend celui de la maquette d'origine (`design/maquette-v2.html`) :

| Ordre | Section                    | Ancre                | Composant                         |
| ----- | -------------------------- | -------------------- | --------------------------------- |
| 1     | Accroche                   | `#accueil`           | `sections/Hero.tsx`               |
| 2     | Nos prestations à Meaux    | `#prestations-meaux` | `sections/PrestationsLocales.tsx` |
| 3     | Nos services (accordéon)   | `#services`          | `sections/Expertise.tsx`          |
| 4     | Nos univers d'intervention | `#univers`           | `sections/Univers.tsx`            |
| 5     | Des résultats qui parlent  | `#realisations`      | `sections/AvantApres.tsx`         |
| 6     | Cas clients                | `#cas`               | `sections/CasClients.tsx`         |
| 7     | Notre promesse             | `#apropos`           | `sections/Promesse.tsx`           |
| 8     | Ils nous font confiance    |                      | `sections/Temoignages.tsx`        |
| 9     | Comment ça se passe        |                      | `sections/Process.tsx`            |
| 10    | Zones d'intervention       | `#zones`             | `sections/ZonesSection.tsx`       |
| 11    | Questions fréquentes       | `#faq`               | `sections/FaqSection.tsx`         |
| 12    | Contact et devis           | `#contact`           | `sections/CtaDevis.tsx`           |

La section 2 est placée juste après l'accroche à dessein : c'est le maillage vers les six pages
locales, et un lien haut dans la page pèse plus qu'un lien en pied de page. Les sections 9 à 11 ne
figurent pas dans la maquette : elles portent le référencement local et le balisage `FAQPage`, qui
sont l'objectif premier du site.

### Typographie

Les capitales sont réservées aux étiquettes très courtes, les seules du site étant « Avant » et
« Après » sur les comparatifs. Un titre long tout en capitales perd la silhouette des mots, que
l'œil utilise pour lire vite, et les accents français (É, À, Î) y sont mal rendus. Titres, boutons
et libellés de champs sont donc en casse normale.

### Photos

Les emplacements photo passent par le composant `MediaSlot`, qui affiche un aplat graphique de
marque plutôt qu'une image cassée tant que `src` n'est pas renseigné. En développement, chaque
emplacement vide affiche le descriptif de la photo attendue.

14 photos fournies par le client sont déjà câblées. Les visuels restants sont listés dans
**[BRIEF-PHOTO.md](./BRIEF-PHOTO.md)**, avec format, cadrage et nom de fichier attendus.

Pour installer une photo : la déposer dans `public/images/`, puis renseigner `src` là où le visuel
est attendu, par exemple :

```tsx
<MediaSlot src="/images/hero-accueil.jpg" alt="Séjour lumineux après intervention" priority />
```

### Contenu de démonstration à remplacer

Deux fichiers reprennent le contenu de la maquette et ne décrivent **ni missions ni avis réels** :

- `src/data/temoignages.ts`, trois avis repris de la maquette. Un bandeau visible en développement
  le rappelle tant que `temoignagesSontDeDemonstration` vaut `true`.
- `src/data/cas-clients.ts`, trois missions aux chiffres non mesurés.

Publier des témoignages ou des résultats inventés est une pratique commerciale trompeuse
(art. L121-2 du code de la consommation). Les remplacer figure comme point **bloquant** dans
`DEPLOIEMENT.md`.

---

## Sécurité du formulaire de devis

La route `POST /api/contact` applique, dans cet ordre :

1. **Limitation de débit** : 5 envois par IP et par tranche de 10 minutes (`lib/rate-limit.ts`).
2. **Plafond de taille** : corps JSON limité à 16 Ko.
3. **Validation Zod stricte** : aucun champ inconnu ne franchit cette étape.
4. **Leurre anti-robot** : champ masqué ; s'il est rempli, la route répond un succès factice et
   n'envoie rien.
5. **Contrôle de vitesse** : une soumission en moins de 3 secondes est rejetée.

Aucune réponse d'erreur ne divulgue d'information technique : le détail part dans les logs serveur.

> **Limite connue.** Le compteur de débit vit en mémoire du processus. Sur Vercel, chaque instance a
> son propre compteur, suffisant contre un robot naïf, insuffisant contre une attaque distribuée.
> Si le volume de spam le justifie, remplacer l'implémentation de `consommer()` par un store partagé
> (Upstash Redis) : la signature est conçue pour rester identique.

---

## SEO et visibilité IA

- Métadonnées, URL canonique et carte Open Graph sur **chaque** page (`lib/seo.ts`).
- JSON-LD : `LocalBusiness` (22 propriétés), `WebSite`, `OfferCatalog`, `Service` avec
  `areaServed: City` sur chaque page locale, `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` : 9 URLs indexables, avec les 20 visuels de l'accueil déclarés en balises image, ce
  qui les rend éligibles à Google Images.
- `robots.txt` généré : les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) sont
  **explicitement autorisés**.
- Contenu rédigé pour l'extraction : définition autonome en tête de page, questions
  conversationnelles en `h2`/`h3`, données chiffrées concrètes.
- Le NAP provient d'un fichier unique : aucune divergence possible entre les pages, condition d'un
  bon référencement local.
- Vérification Search Console et Bing par balise meta, via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` et
  `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

Deux fichiers de tests protègent tout cela. `tests/contenu.test.ts` échoue si un titre dépasse
65 caractères ou si une méta-description sort de la fourchette 110–165. `tests/landings.test.ts`
échoue si deux pages locales partagent un chapeau, une méta-description, un paragraphe ou une
question de FAQ, si une page perd la ville dans son URL, son H1 ou son titre, ou si un lien du
maillage interne disparaît.

> **Le code ne fait pas tout.** Les deux premiers leviers de référencement local sont la fiche
> Google Business Profile et les avis clients, tous deux hors du dépôt. La marche à suivre est dans
> [SEO-HORS-CODE.md](./SEO-HORS-CODE.md).

---

## Avant la mise en ligne

Voir **[DEPLOIEMENT.md](./DEPLOIEMENT.md)** : checklist complète : informations à compléter,
configuration Resend et DNS, déploiement Vercel, référencement local.
