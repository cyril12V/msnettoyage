# Suivi — MS Nettoyage

## Tâche : création du site vitrine (25 juillet 2026)

### Réalisé

- [x] Archivage de la maquette et du flyer dans `design/`
- [x] Initialisation Next.js 16 + TypeScript strict + Tailwind v4
- [x] Configuration : ESLint (zéro `any`, zéro `console`), Prettier, Vitest, en-têtes de sécurité
- [x] `src/lib/site.ts` — source unique du NAP et des mentions légales
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

Ce qui reste ouvert : voir la checklist de `DEPLOIEMENT.md` — informations légales, photos,
avis clients, configuration DNS Resend, fiche Google Business Profile.
