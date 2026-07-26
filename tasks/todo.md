# Suivi, MS Nettoyage

## Tâche : création du site vitrine (25 juillet 2026)

### Réalisé

- [x] Archivage de la maquette et du flyer dans `design/`
- [x] Initialisation Next.js 16 + TypeScript strict + Tailwind v4
- [x] Configuration : ESLint (zéro `any`, zéro `console`), Prettier, Vitest, en-têtes de sécurité
- [x] `src/lib/site.ts`, source unique du NAP et des mentions légales
- [x] Données métier : 7 prestations, 9 zones d'intervention, 12 questions de FAQ
- [x] Design system : tokens Tailwind, `Icon` (30 icônes inlinées), `Button`, `Field`, `Card`,
      `Section`, `Container`, `MediaSlot`
- [x] Layout : header sticky + menu mobile, footer, barre d'appel fixe mobile, lien d'évitement
- [x] Page d'accueil : hero, prestations, promesse, processus, zones, FAQ, bloc de conversion
- [x] 9 pages secondaires + 33 pages statiques générées au total
- [x] `POST /api/contact` : rate limit, plafond de taille, Zod, honeypot, contrôle de vitesse, Resend
- [x] Formulaire de devis accessible (labels, `aria-invalid`, `aria-describedby`, alerte focusable)
- [x] SEO : métadonnées par page, canonical, JSON-LD (LocalBusiness, Service, FAQPage,
      BreadcrumbList, OfferCatalog), sitemap, robots
- [x] GEO : crawlers IA autorisés, définitions autonomes en tête de page, FAQ conversationnelle
- [x] Images générées : favicon, icône Apple, carte Open Graph
- [x] Mentions légales et politique de confidentialité (RGPD)
- [x] 53 tests Vitest
- [x] README + DEPLOIEMENT.md

### Vérifications passées

| Contrôle                             | Résultat                                               |
| ------------------------------------ | ------------------------------------------------------ |
| `npm run lint`                       | 0 erreur, 0 avertissement                              |
| `npm run typecheck`                  | 0 erreur                                               |
| `npm run test`                       | 53/53                                                  |
| `npm run build`                      | 33 pages statiques, 1 route dynamique (`/api/contact`) |
| Rendu réel (desktop + mobile 390 px) | Conforme, aucun message de console                     |
| API testée en conditions réelles     | 422 / 200 silencieux / 503 / 429 conformes             |

### Revue

Ce qui a bien marché :

- Piloter tout le contenu par `src/data/*` : ajouter une prestation propage automatiquement la
  page, le menu, l'option du formulaire, le JSON-LD et le sitemap.
- Tester le contenu (longueur des titres, unicité des textes de zone) autant que le code : ce sont
  les régressions SEO qui coûtent le plus cher et qui ne cassent aucun build.
- Lire la documentation embarquée de Next.js 16 avant de coder : les `params` asynchrones et la
  suppression de `next lint` auraient produit du code faux.

Ce qui reste ouvert : voir la checklist de `DEPLOIEMENT.md`, informations légales, photos,
avis clients, configuration DNS Resend, fiche Google Business Profile.

---

## Tâche : architecture de référencement local (26 juillet 2026)

**Demande.** Le client veut ressortir sur huit recherches, toutes suffixées « à Meaux » :
nettoyage de maison, nettoyage de bureau, prestation de nettoyage, société de nettoyage, ménage
après travaux, ménage après déménagement, ménage Airbnb, ménage particulier. Extension à d'autres
villes plus tard.

### Réalisé

- [x] Cartographie requête → page. Deux requêtes génériques (« société » et « prestation de
      nettoyage ») confiées à la page d'accueil, six requêtes spécifiques à leur page dédiée
- [x] `src/data/landings.ts` : 6 pages, contenu intégralement distinct (chapeau, corps, FAQ, faits)
- [x] `src/app/[prestation]/page.tsx` : segment dynamique à la racine, `dynamicParams = false`
- [x] Suppression de `/meaux`, qui cannibalisait la page d'accueil. Contenu local absorbé par la
      section `#zones`, URL redirigée en 301
- [x] Page d'accueil retitrée « Société de nettoyage à Meaux », 52 caractères
- [x] Maillage interne : section `PrestationsLocales`, colonne du pied de page, menu mobile. Texte
      de lien = la requête, jamais « en savoir plus »
- [x] JSON-LD : `Service` + `areaServed: City` par page, `WebSite`, `LocalBusiness` porté à
      22 propriétés, `serviceJsonLd` mort supprimé, URLs `/services/...` devenues 404 corrigées
- [x] Sitemap : 9 URLs, 26 visuels déclarés
- [x] Variables de vérification Search Console et Bing dans le layout
- [x] `tests/landings.test.ts` : 18 tests anti-duplication et anti-régression SEO
- [x] `SEO-HORS-CODE.md` : fiche Google Business Profile, avis clients, Search Console, annuaires
- [x] Correctif WCAG : suppression de `--color-muted-light`, non conforme sur fond teinté
- [x] Durées corrigées à la demande du client : nettoyage en profondeur 2 à 6 h, rotation Airbnb 2 h

### Vérifications passées

| Contrôle                    | Résultat                                                      |
| --------------------------- | ------------------------------------------------------------- |
| `npm run verify`            | lint, types, 100 tests, build : tout au vert                  |
| 9 URLs en production        | 200, titres et canoniques uniques et corrects                 |
| Redirections                | `/meaux`, `/services`, `/faq`, `/devis`… en 308 vers la cible |
| Slug inconnu                | 404, pas de page vide                                         |
| `sitemap.xml` en production | 9 `<loc>`, 26 `<image:loc>`                                   |
| JSON-LD en production       | 5 blocs valides sur une page de prestation                    |
| Lighthouse mobile           | 100 en SEO, bonnes pratiques et navigation agent              |

### Revue

Ce qui a bien marché :

- Partir de la liste de requêtes du client plutôt que d'une arborescence supposée : la structure du
  site en découle mécaniquement, sans arbitrage.
- Traiter la cannibalisation avant d'ajouter des pages. Supprimer `/meaux` était contre-intuitif,
  c'est pourtant ce qui débloque la page d'accueil sur sa requête principale.
- Verrouiller l'unicité du contenu par des tests : c'est la seule protection contre la tentation du
  chercher-remplacer le jour où il faudra couvrir Chelles ou Melun.

Ce qui reste ouvert : la fiche Google Business Profile et les avis clients, hors du dépôt, qui
pèsent plus que tout le reste. Voir `SEO-HORS-CODE.md`.
