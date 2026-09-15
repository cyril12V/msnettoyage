# Documentation

Tout ce qui n'est ni du code, ni du suivi de tâches. Le suivi vit dans [`../tasks/`](../tasks/).

## Documents de travail

| Document                             | À quoi il sert                                                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [seo-hors-code.md](seo-hors-code.md) | **Le plus important.** Ce que le dépôt ne peut pas produire : fiche Google, avis clients, annuaires, netlinking. À suivre dans l'ordre. |
| [deploiement.md](deploiement.md)     | Mise en ligne, variables d'environnement, DNS, checklist avant livraison.                                                               |
| [brief-photo.md](brief-photo.md)     | Photos attendues du client, cadrage et usage prévu de chacune.                                                                          |

## Documents fournis par le client

[`strategie-seo/`](strategie-seo/) rassemble les documents de stratégie transmis par le client,
numérotés dans l'ordre où ils ont été appliqués au site.

| Document                                                                               | Contenu                                                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [01-strategie-complete.md](strategie-seo/01-strategie-complete.md)                     | Audit initial, mots-clés visés avec leurs volumes, plan en trois phases.                                 |
| [02-optimisation-fin-de-chantier.md](strategie-seo/02-optimisation-fin-de-chantier.md) | Plan détaillé de la page qui vise « nettoyage fin de chantier paris ».                                   |
| [03-schema-markup.md](strategie-seo/03-schema-markup.md)                               | Les trois blocs JSON-LD à publier, et sur quelles pages.                                                 |
| [04-page-pilier-paris.md](strategie-seo/04-page-pilier-paris.md)                       | Le contenu rédigé de la page pilier `/nettoyage-paris`.                                                  |
| [05-audit-etat-des-lieux.md](strategie-seo/05-audit-etat-des-lieux.md)                 | Point d'étape client : ce qui est fait, où en est Google, ce qui reste à faire.                          |
| [06-audit-complet-plan-action.md](strategie-seo/06-audit-complet-plan-action.md)       | Audit de septembre 2026 : autorité, concurrents, plan fin de chantier et Airbnb.                         |
| [07-section-types-de-chantiers.md](strategie-seo/07-section-types-de-chantiers.md)     | Texte de la section « Pour quels chantiers intervenons-nous ? ».                                         |
| [08-guide-json-ld.md](strategie-seo/08-guide-json-ld.md)                               | Guide d'intégration du bloc JSON-LD proposé.                                                             |
| [09-json-ld-propose.json](strategie-seo/09-json-ld-propose.json)                       | Bloc JSON-LD proposé. **Non appliqué** : il ferait régresser le balisage en place, voir `tasks/todo.md`. |

**Ces documents sont des archives, pas des consignes vivantes.** Ils décrivent l'état visé à
leur date. Quand le code et un de ces documents divergent, c'est le code qui fait foi : les
écarts assumés et leur raison sont consignés dans [`../tasks/todo.md`](../tasks/todo.md), et les
règles qui en découlent sont verrouillées par les tests.

## Où se trouve quoi ailleurs

- [`../README.md`](../README.md) : architecture de référencement, structure du code, scripts.
- [`../tasks/lessons.md`](../tasks/lessons.md) : erreurs commises et règles qui en découlent.
- [`../tasks/bugs.md`](../tasks/bugs.md) : historique des bugs.
- [`../public/images/README.md`](../public/images/README.md) : visuels attendus et leur nommage.
