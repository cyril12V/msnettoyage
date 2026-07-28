# Suivi, MS Nettoyages

## Tâche : exécution de la stratégie SEO Paris / Île-de-France (28 juillet 2026)

**Source.** `STRATGIE SEO COMPLTE  MS NETTOYAGES.md`, audit du 28 juillet 2026.

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
      `/nettoyage-fin-de-chantier`, anciennes URLs redirigées en 301
- [x] 4. 12 pages villes, contenu local réellement distinct, aucune duplication
- [x] 5. Schema : `areaServed` élargi, `Service` par ville, `alternateName`, `areaServed` IDF
- [x] 6. Maillage interne : villes ↔ prestations, pied de page, page d'accueil
- [x] 7. Sitemap, redirections, navigation
- [x] 8. Tests de non-régression SEO étendus aux villes
- [x] 9. `SEO-HORS-CODE.md` : plan d'action annuaires, GBP, netlinking

### Décisions prises et leur raison

| Décision                                                | Raison                                                                                                                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Renommer les URLs maintenant, pas au mois 3             | Le site n'a aucun classement ni backlink : c'est le moment le moins coûteux de la vie du site pour changer une URL. Attendre trois mois n'aurait rien gagné. |
| Une seule page « fin de chantier + après travaux »      | L'intention de recherche est la même. Deux pages se cannibaliseraient. Le titre vise le mot-clé le plus cher (9,70 € de CPC).                                |
| Page d'accueil retitrée Paris & Île-de-France           | Demandé par la stratégie. La requête « nettoyage Meaux » est récupérée par une page ville dédiée, ce qui évite de l'abandonner.                              |
| Recréation d'une page Meaux, supprimée le 26 juillet    | La suppression valait quand l'accueil visait Meaux. L'accueil vise désormais Paris : la requête Meaux redevient orpheline sans page dédiée.                  |
| Aucune note ni avis inventé dans le JSON-LD             | Un `AggregateRating` sans avis réel est une pratique commerciale trompeuse et un motif de pénalité manuelle Google.                                          |

### Vérifications

| Contrôle            | Résultat                                    |
| ------------------- | ------------------------------------------- |
| `npm run lint`      | 0 erreur, 0 avertissement                   |
| `npm run typecheck` | 0 erreur                                    |
| `npm run test`      | 137/137                                     |
| `npm run build`     | 46 pages statiques                          |

### Reste à faire, hors dépôt

Voir `SEO-HORS-CODE.md`. Le netlinking et la fiche Google Business Profile pèsent plus que tout ce
qui précède, et aucun code ne peut les produire.
