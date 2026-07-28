# MS Nettoyages

**En ligne :** https://ms-nettoyages.com · **Dépôt :** https://github.com/cyril12V/msnettoyage

Site vitrine de **MS Nettoyages**, société de nettoyage professionnel basée à Meaux (77100) et
intervenant à Paris et dans toute l'Île-de-France.

Objectif du site : sortir dans Google sur les recherches du type « nettoyage fin de chantier
Paris », « nettoyage bureau Paris » ou « entreprise de nettoyage à Créteil », puis transformer la
visite en demande de devis ou en appel. L'architecture des pages découle directement de cette liste
de requêtes, voir [Architecture de référencement](#architecture-de-référencement).

Le nom s'écrit **avec un « s »**. La graphie au singulier renvoyait la recherche de marque vers des
homonymes de Besançon et de Thonon, mieux référencés.

---

## Stack

| Brique      | Choix                    | Pourquoi                                                     |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router)  | Rendu statique, indispensable au référencement local         |
| Langage     | TypeScript strict        | Zéro `any`, aucune erreur de compilation tolérée             |
| Styles      | Tailwind CSS v4          | Tokens de design centralisés dans `globals.css`              |
| Validation  | Zod 4                    | Un seul schéma partagé client + serveur                      |
| Emails      | SMTP Amen (nodemailer)   | Envoi depuis la messagerie du domaine, authentifiée SPF/DKIM |
| Tests       | Vitest + Testing Library | 161 tests sur la validation, l'anti-spam et le contenu       |
| Hébergement | Vercel                   | Déploiement statique, SSL et domaine custom inclus           |

Node.js **20.9+** requis (imposé par Next.js 16).

---

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

Le site fonctionne sans aucune variable d'environnement : seul l'envoi du formulaire de devis
nécessite les identifiants SMTP. Sans eux, le formulaire affiche un message invitant à appeler.

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

Deux familles de pages, qui répondent à deux questions différentes et ne se marchent jamais dessus :
les **prestations** disent _quoi_, les **villes** disent _où_.

| Requête visée                               | Page                               |
| ------------------------------------------- | ---------------------------------- |
| Société de nettoyage Paris et Île-de-France | `/` (page d'accueil)               |
| Prestation de nettoyage                     | `/` (page d'accueil)               |
| Nettoyage de maison Paris et IDF            | `/nettoyage-maison`                |
| Nettoyage de bureaux Paris et IDF           | `/nettoyage-bureau`                |
| Ménage particulier Paris et IDF             | `/menage-particulier`              |
| Nettoyage fin de chantier Paris             | `/nettoyage-fin-de-chantier-paris` |
| Ménage après déménagement Paris et IDF      | `/menage-apres-demenagement`       |
| Ménage Airbnb Paris et IDF                  | `/menage-airbnb`                   |
| Entreprise de nettoyage à Paris             | `/nettoyage-paris` (page pilier)   |
| Société de nettoyage à Meaux                | `/nettoyage-meaux`                 |
| … et dix autres communes                    | `/nettoyage-<commune>`             |

`/nettoyage-paris` est la **page pilier** : elle vise les requêtes les plus larges du secteur
(« entreprise de nettoyage paris », 720 recherches par mois ; « société de nettoyage paris », 590) et
suit un gabarit plus long que les onze autres communes, avec résumé en tête, catalogue des sept
prestations, arguments développés et sources externes. Les champs correspondants de
`src/data/villes.ts` sont facultatifs et ne sont renseignés que sur Paris.

Quatre conséquences qui ne se devinent pas à la lecture du code :

1. **Aucun slug de prestation ne contient de ville, sauf un.** Une URL `/nettoyage-maison-meaux`
   annonce d'elle-même qu'elle ne parle pas de Paris, et ne remonte donc jamais dessus. Les
   anciennes URLs redirigent en 301 depuis `next.config.ts` ; elles ne doivent pas réapparaître.
   L'exception est `/nettoyage-fin-de-chantier-paris`, décidée par le client : la requête visée est
   « nettoyage fin de chantier paris » et le mot-clé doit figurer entier dans l'URL. La contrepartie
   assumée est que cette page ne remontera pas sur « nettoyage fin de chantier Chelles ».
   `tests/landings.test.ts` nomme cette exception et vérifie qu'elle reste unique.
2. **Un seul segment dynamique à la racine**, `src/app/[slug]`, qui aiguille vers
   `PrestationPage` ou `VillePage`. Next.js n'autorise qu'un segment dynamique par niveau, et
   l'URL doit rester courte : `/nettoyage-paris`, pas `/villes/paris`.
3. **Le contenu de chaque page est unique, paragraphe par paragraphe.** Un chercher-remplacer sur
   le nom de la ville produirait des pages satellites, que Google désindexe.
   `tests/landings.test.ts` et `tests/villes.test.ts` échouent si deux pages partagent un chapeau,
   une méta-description, un paragraphe, une question ou une réponse.
4. **Maillage croisé complet** : chaque page de prestation liste les douze communes, chaque page
   ville liste les six prestations, et le pied de page porte les dix-huit liens sur tout le site.
   Le texte des liens est toujours le couple prestation + commune, jamais « en savoir plus » :
   c'est ce texte que Google lit pour qualifier la page d'arrivée.

Pour couvrir une nouvelle commune, ajouter une entrée dans `src/data/villes.ts` **en écrivant son
contenu**, jamais en dupliquant une entrée existante. Le sitemap, le pied de page, le maillage et le
JSON-LD suivent automatiquement.

---

## Structure

Le site tient sur **une page d'accueil** qui déroule toutes les sections, plus six pages de
prestation, douze pages villes et deux pages légales. Les anciennes adresses (`/services`,
`/devis`, `/faq`, `/meaux`, les slugs suffixés `-meaux`…) redirigent en 301 vers l'ancre ou la page
correspondante, la règle est dans `next.config.ts`.

```
src/
├─ app/                          Routes (App Router)
│  ├─ layout.tsx                 Layout racine : police, header, footer, JSON-LD entreprise + WebSite
│  ├─ page.tsx                   Page d'accueil, toutes les sections
│  ├─ [slug]/page.tsx            Aiguillage : 6 pages de prestation + 12 pages villes
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
│  ├─ landings.ts                ★ Les 6 pages de prestation, une par requête Google
│  ├─ villes.ts                  ★ Les 12 pages villes, une par commune couverte
│  ├─ services.ts                Les 7 prestations de la page d'accueil
│  ├─ zones.ts                   Les 9 zones d'intervention (Meaux + 8 départements)
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

| Ordre | Section                    | Ancre           | Composant                         |
| ----- | -------------------------- | --------------- | --------------------------------- |
| 1     | Accroche                   | `#accueil`      | `sections/Hero.tsx`               |
| 2     | Nos prestations en IDF     | `#prestations`  | `sections/PrestationsLocales.tsx` |
| 3     | Nos services (accordéon)   | `#services`     | `sections/Expertise.tsx`          |
| 4     | Nos univers d'intervention | `#univers`      | `sections/Univers.tsx`            |
| 5     | Des résultats qui parlent  | `#realisations` | `sections/AvantApres.tsx`         |
| 6     | Cas clients                | `#cas`          | `sections/CasClients.tsx`         |
| 7     | Notre promesse             | `#apropos`      | `sections/Promesse.tsx`           |
| 8     | Ils nous font confiance    |                 | `sections/Temoignages.tsx`        |
| 9     | Comment ça se passe        |                 | `sections/Process.tsx`            |
| 10    | Nos villes d'intervention  | `#villes`       | `sections/VillesSection.tsx`      |
| 11    | Zones d'intervention       | `#zones`        | `sections/ZonesSection.tsx`       |
| 12    | Questions fréquentes       | `#faq`          | `sections/FaqSection.tsx`         |
| 13    | Contact et devis           | `#contact`      | `sections/CtaDevis.tsx`           |

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
configuration SMTP et DNS, déploiement Vercel, référencement local.
