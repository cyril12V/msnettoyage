# Historique des bugs, MS Nettoyage

_Consulté avant de coder, pour ne pas reproduire une erreur déjà corrigée.
Format : symptôme → cause racine → correction → protection ajoutée._

---

## BUG-001, Le build échoue sur `/opengraph-image`

- **Date** : 25 juillet 2026
- **Symptôme** : `npm run build` s'interrompt à la génération des pages statiques :
  `Error: Expected <div> to have explicit "display: flex", "display: contents", or "display: none"
if it has more than one child node.`
- **Cause racine** : dans `src/app/opengraph-image.tsx`, un `<div>` contenait
  `{site.address.city} ({site.address.postalCode}) · Devis gratuit sous {site.delaiReponse}`.
  Satori compte chaque fragment de texte et chaque expression comme un nœud enfant distinct :
  l'élément en avait cinq, sans `display: flex`.
- **Correction** : remplacement par un unique littéral de gabarit.
- **Protection** : `npm run build` fait partie de `npm run verify`, la génération de l'image OG
  est donc exercée à chaque vérification pré-commit. Règle notée dans `lessons.md`.

---

## BUG-002, Le leurre anti-robot renvoyait une erreur en anglais

- **Date** : 25 juillet 2026
- **Symptôme** : `POST /api/contact` avec le champ `societeWeb` rempli répondait **422** et
  `{"champs":{"societeWeb":"Too big: expected string to have <=0 characters"}}`.
- **Cause racine** : le schéma déclarait `z.string().max(0)`. La validation Zod s'exécute **avant**
  le test du honeypot dans la route : le champ était donc rejeté par la validation, jamais absorbé
  silencieusement. Effet de bord : un message Zod par défaut, en anglais, exposé publiquement.
- **Correction** : `societeWeb: z.string().optional()`. La route détecte le champ rempli et répond
  un succès factice sans envoyer d'email.
- **Protection** : deux tests, `laisse passer le leurre anti-robot rempli` et
  `n'émet que des messages d'erreur en français` (celui-ci échoue sur toute formulation Zod par
  défaut restée en anglais).

---

## BUG-003, Espace perdu dans le sur-titre du hero

- **Date** : 25 juillet 2026
- **Symptôme** : affichage `MEAUX· TOUTE L'ÎLE-DE-FRANCE` au lieu de `MEAUX · TOUTE
L'ÎLE-DE-FRANCE`.
- **Cause racine** : JSX normalise les espaces autour des expressions ; combiné à
  `tracking-[0.18em]`, le séparateur se retrouvait collé au mot précédent.
- **Correction** : un unique littéral de gabarit
  (``{`${site.address.city} · toute l'Île-de-France`}``).
- **Protection** : aucun test automatisé (défaut purement visuel). Vérifié par capture d'écran du
  rendu réel, desktop et mobile.
