# Suivi, MS Nettoyages

## Tâche : exécution de la stratégie SEO Paris / Île-de-France (28 juillet 2026)

**Source.** `docs/strategie-seo/01-strategie-complete.md`, audit du 28 juillet 2026.

**Constat de départ, corrigé après lecture du code.** L'audit annonce « absence totale de schema
markup ». C'est faux : `src/lib/schema.ts` produit déjà LocalBusiness, WebSite, Service, FAQPage,
BreadcrumbList et OfferCatalog. L'audit a été mené sur un rendu qui n'exécutait pas le JSON-LD, ou
avant le dernier déploiement. Les vrais défauts sont ailleurs : le géo-verrouillage sur Meaux, le
nom de marque sans « s », et l'absence de pages villes.

### Plan

- [x] 1. Marque : « MS Nettoyage » → « MS Nettoyages » partout, `alternateName` sur l'ancienne
      graphie pour ne rien perdre
- [x] 2. Élargissement géographique : titres, H1, méta-descriptions et contenu des 6 pages de
      prestation vers Paris et l'Île-de-France
- [x] 3. URLs de prestation sans suffixe de ville, `/menage-apres-travaux-meaux` devenu
      `/nettoyage-fin-de-chantier-paris`, anciennes URLs redirigées en 301
- [x] 4. 12 pages villes, contenu local réellement distinct, aucune duplication
- [x] 5. Schema : `areaServed` élargi, `Service` par ville, `alternateName`, `areaServed` IDF
- [x] 6. Maillage interne : villes ↔ prestations, pied de page, page d'accueil
- [x] 7. Sitemap, redirections, navigation
- [x] 8. Tests de non-régression SEO étendus aux villes
- [x] 9. `docs/seo-hors-code.md` : plan d'action annuaires, GBP, netlinking

### Décisions prises et leur raison

| Décision                                             | Raison                                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Renommer les URLs maintenant, pas au mois 3          | Le site n'a aucun classement ni backlink : c'est le moment le moins coûteux de la vie du site pour changer une URL. Attendre trois mois n'aurait rien gagné. |
| Une seule page « fin de chantier + après travaux »   | L'intention de recherche est la même. Deux pages se cannibaliseraient. Le titre vise le mot-clé le plus cher (9,70 € de CPC).                                |
| Page d'accueil retitrée Paris & Île-de-France        | Demandé par la stratégie. La requête « nettoyage Meaux » est récupérée par une page ville dédiée, ce qui évite de l'abandonner.                              |
| Recréation d'une page Meaux, supprimée le 26 juillet | La suppression valait quand l'accueil visait Meaux. L'accueil vise désormais Paris : la requête Meaux redevient orpheline sans page dédiée.                  |
| Aucune note ni avis inventé dans le JSON-LD          | Un `AggregateRating` sans avis réel est une pratique commerciale trompeuse et un motif de pénalité manuelle Google.                                          |

---

## Tâche : documents fin de chantier, balisage et page pilier (28 juillet 2026)

**Sources.** `docs/strategie-seo/02-optimisation-fin-de-chantier.md`,
`docs/strategie-seo/03-schema-markup.md`, `docs/strategie-seo/04-page-pilier-paris.md`.

- [x] URL `/nettoyage-fin-de-chantier-paris`, titre et H1 imposés, 3 redirections 301 de plus
- [x] Balisage : `@type` double, `@id` `#business`, 8 départements avec `areaCode`, catalogue de 7
      prestations, `offers` du devis gratuit, `@id` `#service` par page
- [x] Les 5 questions du bloc FAQPage reprises mot pour mot, à l'écran comme dans le JSON-LD
- [x] `/nettoyage-paris` en page pilier : résumé, 7 prestations détaillées, 4 arguments, sources
- [x] Disponibilité passée à 24 h/24 et 7 j/7, avec les deux réponses de FAQ qui la contredisaient
- [x] Search Console : validé par DNS, constat acté dans `docs/seo-hors-code.md`

### Décision revue

L'URL de la page fin de chantier porte finalement la ville, `/nettoyage-fin-de-chantier-paris`.
J'avais d'abord retenu `/nettoyage-fin-de-chantier` sans ville, pour que la page puisse remonter
partout en Île-de-France. Le client a maintenu sa demande : le mot-clé visé est « nettoyage fin de
chantier paris » et doit figurer entier dans l'URL. Contrepartie assumée et documentée : cette page
ne remontera pas sur « nettoyage fin de chantier Chelles ». `tests/landings.test.ts` nomme
l'exception et vérifie qu'elle reste unique.

### Écarts assumés avec les documents fournis

| Point                        | Décision                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Horaires du bloc de balisage | Ceux du site font foi. Publier des horaires différents de la fiche Google dégrade précisément ce que le balisage cherche à servir.             |
| `logo.png`                   | Chemin réel `/logo-ms-nettoyage.png`. L'URL du document est un 404, et un logo introuvable invalide le bloc.                                   |
| `CleaningService`            | N'existe pas au vocabulaire schema.org, vérifié. Déclaré en tableau avec `LocalBusiness`, qui porte le sens ; l'autre est ignoré sans dommage. |

### Vérifications passées

| Contrôle                        | Résultat                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| `npm run verify`                | lint, types, 162 tests, build : tout au vert                 |
| Pages servies en production     | 21/21 en 200, titrées, canoniques, balisées, aucun `noindex` |
| Titres et canoniques            | 21 uniques sur 21, aucune cannibalisation                    |
| Redirections des anciennes URLs | 11/11 en 301                                                 |
| `sitemap.xml`                   | 21 URLs, aucune redirection ni 404                           |
| JSON-LD en production           | 24 blocs sur 24 valides                                      |
| Volume servi                    | 1 626 mots sur la page fin de chantier, 2 214 sur le pilier  |

---

## Tâche : rangement de la racine du dépôt (28 juillet 2026)

**Demande.** Sortir de la racine les fichiers qui n'ont pas à y être.

- [x] Les cinq documents fournis par le client regroupés dans `docs/strategie-seo/`, numérotés dans
      l'ordre où ils ont été appliqués, et renommés : les noms d'origine avaient perdu leurs accents
      (`STRATGIE`, `COMPLTE`, `quil`) et portaient des doubles espaces
- [x] `DEPLOIEMENT.md`, `SEO-HORS-CODE.md` et `BRIEF-PHOTO.md` déplacés dans `docs/`
- [x] `README.md`, `CLAUDE.md` et `AGENTS.md` laissés à la racine : leur emplacement est une
      convention d'outillage, pas un choix de rangement
- [x] Déplacements faits en `git mv`, l'historique de chaque fichier est conservé
- [x] Les 7 fichiers qui référençaient les anciens chemins mis à jour, code et documentation compris
- [x] `docs/README.md` : index qui dit à quoi sert chaque document

### Reste à faire, hors dépôt

Voir `docs/seo-hors-code.md`. Le netlinking et la fiche Google Business Profile pèsent plus que tout
ce qui précède, et aucun code ne peut les produire. L'audit du 28 juillet le confirme : 1 lien
entrant contre 58 à 138 chez les concurrents.
