# Publier, vérifier, revenir en arrière

Procédure à suivre à chaque mise en ligne. Vercel déploie `main` à chaque push : **le push est la
mise en production**.

## Avant le push

```bash
npm run verify   # lint, types, tests, build : tout doit être vert
```

Vercel refait le build et refuse la mise en ligne s'il échoue, mais il ne rejoue ni le lint ni les
tests : `npm run verify` reste à lancer à la main.

Noter le commit en ligne avant de pousser, c'est le point de retour :

```bash
git rev-parse origin/main
```

## Après le push (une fois le déploiement terminé dans Vercel)

1. Pages clés en 200, redirections en place :

   ```bash
   for p in / /nettoyage-meaux /nettoyage-paris /nettoyage-fin-de-chantier-paris /menage-airbnb \
            /sitemap.xml /robots.txt; do
     curl -s -o /dev/null -w "$p %{http_code}\n" "https://ms-nettoyages.com$p"
   done
   curl -s -o /dev/null -w "www %{http_code} %{redirect_url}\n" https://www.ms-nettoyages.com/nettoyage-paris
   curl -s -o /dev/null -w "404 %{http_code}\n" https://ms-nettoyages.com/page-inexistante
   ```

   Attendu : 200 partout, `www` en 308 vers `https://ms-nettoyages.com/nettoyage-paris`, 404 sur la
   page inexistante.

2. Audit technique et maillage : relancer l'audit ELM sur le domaine (`audit.mjs`). Aucune
   anomalie P0 ne doit apparaître.

3. Budget de performance, mesuré avec PageSpeed Insights en profil mobile sur l'accueil, une page
   prestation et une page ville :

   | Indicateur                | Budget          |
   | ------------------------- | --------------- |
   | LCP (laboratoire, mobile) | 2,5 s maximum   |
   | CLS                       | 0,1 maximum     |
   | Poids de la page          | 600 Kio maximum |

   Un dépassement se corrige avant toute autre évolution.

4. Sitemap : le soumettre à nouveau dans la Search Console si des URL ont été ajoutées.

## Revenir en arrière

Deux voies, de la plus rapide à la plus propre :

- **Vercel** : onglet Deployments, choisir le déploiement précédent, « Promote to Production ».
  Effet immédiat, sans toucher au dépôt.
- **Git** : annuler le ou les commits fautifs puis pousser, Vercel redéploie.

  ```bash
  git revert <commit>      # un commit précis
  git push
  ```

  Pour revenir exactement à l'état noté avant le push : `git revert --no-edit <ancien>..HEAD`
  puis `git push`.

Ne jamais réécrire l'historique de `main` (`push --force`) : Vercel et le dépôt public s'en
trouveraient désynchronisés.
