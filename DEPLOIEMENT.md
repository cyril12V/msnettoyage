# Mise en production

Checklist à dérouler dans l'ordre. Les points marqués **BLOQUANT** doivent être traités avant
l'ouverture du site au public.

---

## Le site est en ligne

|                     |                                                   |
| ------------------- | ------------------------------------------------- |
| **Site**            | https://msnettoyage.vercel.app                    |
| **Dépôt**           | https://github.com/cyril12V/msnettoyage (public)  |
| **Tableau de bord** | https://vercel.com/cyril12vs-projects/msnettoyage |

Le dépôt est connecté à Vercel : **chaque push sur `main` déclenche un déploiement**. Une branche
autre que `main` produit une prévisualisation avec sa propre URL.

### Variables d'environnement déjà configurées

| Variable               | Valeur                           | Environnements        |
| ---------------------- | -------------------------------- | --------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://msnettoyage.vercel.app` | Production et Preview |
| `CONTACT_TO_EMAIL`     | `msnettoyage211@gmail.com`       | Production et Preview |
| `CONTACT_FROM_EMAIL`   | `onboarding@resend.dev`          | Production et Preview |

### Il manque une seule variable

`RESEND_API_KEY` n'est pas renseignée : le formulaire de devis répond donc par un message invitant
à téléphoner, au lieu d'envoyer l'email. Voir la section 4 pour l'obtenir.

Une fois la clé créée :

```bash
printf 'la_cle_resend' | vercel env add RESEND_API_KEY production
printf 'la_cle_resend' | vercel env add RESEND_API_KEY preview
vercel --prod --force
```

> Utiliser `printf` et non `echo` : `echo` ajoute un saut de ligne à la valeur, ce qui a déjà fait
> échouer un déploiement.

### Le jour où le domaine est acheté

1. L'ajouter dans Vercel, onglet _Domains_ du projet.
2. Remplacer `NEXT_PUBLIC_SITE_URL` par le domaine retenu, **sans slash final**. Sans cette étape,
   les URL canoniques et le sitemap continuent de désigner l'adresse `vercel.app`, et Google
   indexera celle-ci plutôt que la vôtre.
3. Redéployer : `vercel --prod --force`.

---

## 0. État technique, vérifié sur le build de production

Tout ce qui relève du code est fait. Les points restants dépendent d'informations que seul le client
peut fournir.

### Audit Lighthouse, profil mobile

| Catégorie        | Score   |
| ---------------- | ------- |
| Accessibilité    | **100** |
| Bonnes pratiques | **100** |
| SEO              | **100** |
| Navigation agent | **100** |

Mesuré sur la page d'accueil et sur une page de prestation : 57 contrôles passés chacune, aucun
échec.

### Performances mesurées

| Indicateur                       | Valeur     | Seuil visé |
| -------------------------------- | ---------- | ---------- |
| LCP, plus grand rendu de contenu | **228 ms** | < 2500 ms  |
| CLS, décalage cumulé             | **0,00**   | < 0,1      |
| JavaScript transféré             | 72 Ko      |            |
| Poids total de la page           | 108 Ko     |            |

Mesures en local, sans limitation réseau : elles valident la structure de la page, pas les
conditions réelles. Refaire une mesure sur PageSpeed Insights après la mise en ligne.

### Contrôles automatisés

| Contrôle            | Résultat                                 |
| ------------------- | ---------------------------------------- |
| `npm run lint`      | 0 erreur, 0 avertissement                |
| `npm run typecheck` | 0 erreur                                 |
| `npm run test`      | 100 / 100                                |
| `npm run build`     | 18 routes, 17 statiques + `/api/contact` |

### Vérifications manuelles sur le serveur de production

- **En-têtes de sécurité** : CSP, HSTS, Referrer-Policy, Permissions-Policy et
  X-Content-Type-Options présents. `X-Powered-By` absent. `'unsafe-eval'` bien absent en production.
- **Aucune violation CSP** au chargement ni au défilement.
- **Redirections** : les 14 anciennes adresses répondent en 308 vers la bonne ancre ou la bonne page.
- **Page inexistante** : 404 correct. Un slug de prestation inconnu renvoie aussi un 404, et non une
  page vide (`dynamicParams = false`).
- **JSON-LD** : `LocalBusiness` et `WebSite` sur toutes les pages, `OfferCatalog` et `FAQPage` sur
  l'accueil, `Service` + `FAQPage` + `BreadcrumbList` sur chaque page de prestation.
- **Structure** : un seul `h1` par page, aucune image sans texte alternatif.
- **`sitemap.xml`** : 9 URLs canoniques, avec les visuels déclarés. **`robots.txt`** : crawlers IA
  autorisés.
- **Titres et canoniques** : uniques et corrects sur les 9 pages, aucun nom de marque en double.
- **Formulaire de devis** : validation, leurre anti-robot et limitation de débit vérifiés en
  conditions réelles. Renvoie 503 tant que la clé Resend n'est pas configurée, avec un message
  invitant à appeler.

### Ce qui reste, et qui ne dépend pas du code

1. Les informations légales, section 1 ci-dessous. **Bloquant.**
2. La configuration Resend et DNS, section 4. **Bloquant pour le formulaire.**
3. Le nom de domaine, section 3.
4. Les avis et cas clients réels, section 2.

---

## 1. Informations à récupérer auprès du client (BLOQUANT)

Ces champs vivent dans `src/lib/site.ts`, bloc `legal`. Tant qu'ils sont vides, la page **Mentions
légales** affiche « Information à compléter » en rouge, ce qui est visible par tous les visiteurs.

Les mentions légales sont obligatoires (art. 6-III de la LCEN). Leur absence est passible d'une
amende pouvant atteindre 75 000 € pour une personne morale.

### Reçu du client le 26 juillet 2026, déjà saisi

- [x] **SIRET** : 944 486 562 00019. Clé de contrôle vérifiée, un test la revalide à chaque build.
- [x] **Adresse du siège** : 2 square Courbet, 77100 Meaux. Publiée sur cette page et transmise à
      Google dans le JSON-LD `PostalAddress`.
- [x] **Responsable de la publication** : Mezouar Sabri.
- [x] **Capital social** : sans objet pour un entrepreneur individuel, affiché comme tel.

### Reste à obtenir

- [ ] **Forme juridique** → `legal.formeJuridique`
      Laissée vide à la demande du client, qui prépare un passage en SARL. **La mention reste
      obligatoire** et la page affiche un encart rouge visible par tous. En attendant le changement
      de statut, la valeur exacte est « Entrepreneur individuel (EI) ».
- [ ] **RCS ou RM** : ville et numéro d'immatriculation → `legal.rcs`
- [ ] **TVA intracommunautaire** si assujetti → `legal.tvaIntracommunautaire`
      En franchise en base, saisir plutôt « TVA non applicable, article 293 B du CGI ».
- [ ] **Assurance responsabilité civile professionnelle** : assureur et numéro de contrat →
      `legal.assuranceRcPro`. Le site affirme que le personnel est « déclaré et assuré » : cette
      affirmation doit pouvoir être justifiée.

### À confirmer également

- [ ] **Horaires d'ouverture** → `openingHours` et `openingHoursDisplay`
      Valeurs actuelles : lundi-vendredi 7h-19h, samedi 8h-13h. Elles alimentent la fiche Google.
- [ ] **Coordonnées GPS** → `geo` (centre-ville de Meaux par défaut)
- [ ] **Réseaux sociaux** → `social` (une valeur vide masque simplement l'icône)
- [ ] **Engagement de réponse** → `delaiReponse` (24 h actuellement, affiché partout)

---

## 2. Contenu à fournir

### Contenu de démonstration à remplacer (BLOQUANT)

Deux jeux de données reprennent le contenu de la maquette et ne décrivent aucune mission ni aucun
avis réels. Les publier en l'état revient à diffuser des allégations invérifiables, ce que
l'article L121-2 du code de la consommation qualifie de pratique commerciale trompeuse.

- [ ] **Avis clients** → `src/data/temoignages.ts`
      Remplacer les trois avis par de vrais retours (SMS, WhatsApp, avis Google), repris mot pour
      mot, limités au prénom et à l'initiale du nom. Passer ensuite
      `temoignagesSontDeDemonstration` à `false` : le bandeau d'avertissement affiché en
      développement disparaît. Vider complètement le tableau masque simplement la section.
- [ ] **Cas clients** → `src/data/cas-clients.ts`
      Remplacer les trois missions par des interventions réellement effectuées, avec des chiffres
      que l'entreprise peut justifier.

### Photographies

**Tous les emplacements du site sont pourvus.** Le suivi est dans [BRIEF-PHOTO.md](./BRIEF-PHOTO.md).

> **Les visuels en place sont générés par intelligence artificielle**, à l'exception du logo. Ils
> illustrent correctement les prestations, mais aucun ne documente une intervention réelle.
> Remplacer progressivement les paires avant / après par de vraies photos de chantier reste
> l'action qui augmente le plus la crédibilité du site.

### Logo

Le logo fourni est intégré (`public/logo-ms-nettoyage.png`), ainsi que le favicon, l'icône iOS et
les icônes du manifeste, tous dérivés du monogramme.

- [ ] Fournir la version vectorielle (`.svg`, `.ai` ou `.eps`) si elle existe : le rendu sera plus
      net sur les écrans à haute densité et le fichier plus léger.

---

## 3. Nom de domaine et variables d'environnement

- [ ] Domaine acheté et pointé sur Vercel.
- [ ] Choisir **une seule** forme canonique : `https://www.msnettoyage.fr` **ou**
      `https://msnettoyage.fr`, et rediriger l'autre. Servir les deux divise le référencement.
- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` avec cette forme exacte, **sans slash final**.

Variables à créer dans Vercel → _Settings_ → _Environment Variables_, pour les environnements
Production **et** Preview :

| Variable                               | Exemple                      | Rôle                                    |
| -------------------------------------- | ---------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | `https://www.msnettoyage.fr` | Canonical, Open Graph, sitemap, JSON-LD |
| `RESEND_API_KEY`                       | `re_xxxxxxxx`                | Envoi des demandes de devis             |
| `CONTACT_FROM_EMAIL`                   | `devis@msnettoyage.fr`       | Expéditeur (domaine à vérifier)         |
| `CONTACT_TO_EMAIL`                     | `msnettoyage211@gmail.com`   | Boîte qui reçoit les demandes           |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `AbCdEf123…`                 | Validation de Google Search Console     |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | `1A2B3C…`                    | Validation de Bing Webmaster Tools      |

Les deux dernières sont facultatives : sans elles, aucune balise de vérification n'est émise. La
marche à suivre est détaillée dans [SEO-HORS-CODE.md](./SEO-HORS-CODE.md).

> Aucune de ces valeurs ne doit apparaître dans le dépôt Git. `.env.local` est déjà ignoré.

---

## 4. Emails : Resend et authentification DNS (BLOQUANT pour le formulaire)

Sans authentification du domaine, Gmail et Yahoo **rejettent ou classent en spam** les emails
envoyés. Le formulaire semblerait fonctionner alors qu'aucune demande n'arriverait.

1. [ ] Créer un compte sur [resend.com](https://resend.com) (gratuit jusqu'à 100 emails/jour).
2. [ ] _Domains_ → _Add Domain_ → saisir `msnettoyage.fr`.
3. [ ] Ajouter chez le registrar les enregistrements DNS affichés par Resend :
   - **SPF** : enregistrement TXT : `v=spf1 include:_spf.resend.com ~all`
   - **DKIM** : enregistrement TXT sur `resend._domainkey` (clé fournie par Resend)
   - **MX** : pour le sous-domaine d'envoi, si Resend le demande
4. [ ] Ajouter un **DMARC** en TXT sur `_dmarc` :
       `v=DMARC1; p=none; rua=mailto:msnettoyage211@gmail.com`
       Passer à `p=quarantine` puis `p=reject` après quelques semaines de rapports sans anomalie.
5. [ ] Attendre le statut _Verified_ dans Resend, puis créer une clé API et la coller dans
       `RESEND_API_KEY`.
6. [ ] Vérifier la propagation :
   ```bash
   dig TXT msnettoyage.fr +short
   dig TXT resend._domainkey.msnettoyage.fr +short
   dig TXT _dmarc.msnettoyage.fr +short
   ```

**Avant que le domaine soit vérifié**, mettre `CONTACT_FROM_EMAIL="onboarding@resend.dev"` :
l'envoi fonctionne, mais uniquement vers l'adresse du titulaire du compte Resend.

- [ ] **Test réel après déploiement** : envoyer une demande depuis le site en production et
      confirmer sa réception dans `msnettoyage211@gmail.com`, y compris dans les spams.
- [ ] Vérifier que **Répondre** dans le mail reçu adresse bien le client (en-tête `Reply-To`).

---

## 5. Déploiement Vercel

```bash
npm install -g vercel     # une seule fois
vercel login
vercel --prod
```

Ou, plus simplement : pousser le dépôt sur GitHub et l'importer depuis
[vercel.com/new](https://vercel.com/new), chaque push déclenche alors un déploiement.

Aucune configuration particulière : Vercel détecte Next.js 16 et applique les bons réglages.

- [ ] Vérifier après déploiement que le HTTPS est actif et que `http://` redirige vers `https://`.
- [ ] Vérifier que `https://<domaine>/sitemap.xml` et `/robots.txt` répondent avec le bon domaine
      (ils reprennent `NEXT_PUBLIC_SITE_URL`, s'ils affichent `msnettoyage.fr` par défaut, la
      variable n'est pas prise en compte).

---

## 6. Contrôles techniques

- [ ] `npm run verify` passe intégralement (lint + types + tests + build).
- [ ] [PageSpeed Insights](https://pagespeed.web.dev), viser 90+ en performance sur mobile.
- [ ] [Test des résultats enrichis](https://search.google.com/test/rich-results), vérifier que
      `LocalBusiness` et `FAQPage` sont détectés sans erreur.
- [ ] [securityheaders.com](https://securityheaders.com), les en-têtes définis dans
      `next.config.ts` doivent apparaître (CSP, HSTS, X-Content-Type-Options…).
- [ ] Partager l'URL sur WhatsApp ou LinkedIn : la carte doit afficher l'image Open Graph bleue.
- [ ] Tester le formulaire sur un vrai téléphone, en 4G.

> **Note sur `npm audit`.** Les alertes remontées concernent des dépendances transitives de Next.js
> lui-même (postcss, sharp) et de l'outillage ESLint. `npm audit fix --force` proposerait de
> rétrograder Next.js en version 9 : à ne pas exécuter. Ces failles se corrigent par une montée de
> version de Next.js.

---

## 7. Référencement local, à faire après la mise en ligne

C'est l'étape qui apporte réellement des appels. **Le site ne représente qu'environ un tiers du
résultat sur une recherche locale**, le reste se joue sur la fiche Google et les avis.

La marche à suivre complète, avec les valeurs exactes à saisir et les textes prêts à coller, est
dans **[SEO-HORS-CODE.md](./SEO-HORS-CODE.md)**. Résumé des étapes, par ordre d'impact :

- [ ] **Créer la fiche Google Business Profile** et lancer la vérification. Le courrier de
      validation prend une à deux semaines : c'est la toute première chose à faire.
      Le nom, l'adresse et le téléphone doivent être **rigoureusement identiques** à ceux de
      `src/lib/site.ts` : la moindre variation (« MS Nettoyage » vs « MS-Nettoyage ») dilue le
      signal local.
- [ ] Y déclarer un service par requête visée, les six pages du site servant de descriptions.
- [ ] Reporter l'adresse publique de la fiche dans `src/lib/site.ts` → `social.googleBusiness`.
- [ ] **Obtenir 10 avis Google en trois mois**, puis 2 à 3 par mois. C'est le point faible actuel et
      le levier le plus déterminant.
- [ ] **Google Search Console** : ajouter la propriété, valider par la balise meta
      (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), soumettre le sitemap, puis demander l'indexation des
      six pages de prestation une par une.
- [ ] **Bing Webmaster Tools** : même opération (alimente aussi ChatGPT et Copilot).
- [ ] Reporter les vrais avis dans `src/data/temoignages.ts` pour activer la section du site.
- [ ] Inscrire l'entreprise sur les annuaires locaux (Pages Jaunes, annuaire de la CCI de
      Seine-et-Marne, Apple Plans), toujours avec le même NAP.

---

## 8. Maintenance

- [ ] Vérifier une fois par trimestre : formulaire fonctionnel, quota Resend, avis Google.
- [ ] Redéployer au moins une fois par an, l'année du pied de page est figée au moment du build.
- [ ] Suivre les montées de version : `npx next upgrade` gère la migration Next.js.
