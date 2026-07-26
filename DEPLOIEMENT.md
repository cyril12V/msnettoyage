# Mise en production

Checklist à dérouler dans l'ordre. Les points marqués **BLOQUANT** doivent être traités avant
l'ouverture du site au public.

---

## 1. Informations à récupérer auprès du client (BLOQUANT)

Ces champs sont vides dans `src/lib/site.ts`. Tant qu'ils le sont, la page **Mentions légales**
affiche « Information à compléter » en rouge, ce qui est visible par tous.

Les mentions légales sont obligatoires (art. 6-III de la LCEN). Leur absence est passible d'une
amende pouvant atteindre 75 000 € pour une personne morale.

- [ ] **Forme juridique** : SASU, EURL, auto-entrepreneur… → `legal.formeJuridique`
- [ ] **SIRET** (14 chiffres) → `legal.siret`
- [ ] **RCS** : ville + numéro d'immatriculation → `legal.rcs`
- [ ] **N° TVA intracommunautaire** : si assujetti → `legal.tvaIntracommunautaire`
- [ ] **Capital social** : si société → `legal.capitalSocial`
- [ ] **Directeur de la publication** : nom du gérant → `legal.directeurPublication`
- [ ] **Assurance RC professionnelle** : assureur + n° de contrat → `legal.assuranceRcPro`
- [ ] **Adresse du siège** → `address.streetAddress`
      _Tant qu'elle est vide, le JSON-LD omet la rue plutôt que d'en publier une fausse._

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

Le détail complet, avec formats, cadrages et noms de fichiers, est dans
**[BRIEF-PHOTO.md](./BRIEF-PHOTO.md)**, document destiné au graphiste.

14 photos fournies par le client sont déjà en place. Restent à produire, par ordre de rentabilité :

- [ ] **Équipe, véhicule, matériel** (3 photos). La preuve que l'entreprise existe. Recueillir
      l'autorisation de droit à l'image de chaque personne reconnaissable.
- [ ] **Paires avant / après** (6 photos) → `src/data/realisations.ts`, champs `avantSrc` et
      `apresSrc`. **Même lieu, même cadrage** pour les deux prises de vue : c'est le cadrage
      identique qui rend la comparaison crédible. Un test échoue si une paire n'est illustrée qu'à
      moitié.
- [ ] **Univers d'intervention** (6 photos, format paysage 16:9) → `src/data/univers.ts`, champ
      `src`. Les photos actuelles sont toutes au format portrait et recadrées.
- [ ] Visuel d'accroche, mosaïque de services, cas clients, photo de Meaux

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

| Variable               | Exemple                      | Rôle                                    |
| ---------------------- | ---------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.msnettoyage.fr` | Canonical, Open Graph, sitemap, JSON-LD |
| `RESEND_API_KEY`       | `re_xxxxxxxx`                | Envoi des demandes de devis             |
| `CONTACT_FROM_EMAIL`   | `devis@msnettoyage.fr`       | Expéditeur (domaine à vérifier)         |
| `CONTACT_TO_EMAIL`     | `msnettoyage211@gmail.com`   | Boîte qui reçoit les demandes           |

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

C'est l'étape qui apporte réellement des appels. Le site seul ne suffit pas.

- [ ] **Créer la fiche Google Business Profile** : c'est le levier n°1 pour « nettoyage Meaux ».
      Le nom, l'adresse et le téléphone doivent être **rigoureusement identiques** à ceux de
      `src/lib/site.ts` : la moindre variation (« MS Nettoyage » vs « MS-Nettoyage ») dilue le
      signal local.
- [ ] Renseigner sur la fiche : catégorie « Service de nettoyage », zone desservie, horaires,
      photos, et le lien vers le site.
- [ ] **Google Search Console** : ajouter la propriété, valider par DNS, soumettre le sitemap.
- [ ] **Bing Webmaster Tools** : même opération (alimente aussi Copilot).
- [ ] Solliciter les premiers avis Google auprès des clients existants, puis les reporter dans
      `src/data/temoignages.ts` pour activer la section du site.
- [ ] Inscrire l'entreprise sur les annuaires locaux (Pages Jaunes, annuaire de la CCI de
      Seine-et-Marne), toujours avec le même NAP.

---

## 8. Maintenance

- [ ] Vérifier une fois par trimestre : formulaire fonctionnel, quota Resend, avis Google.
- [ ] Redéployer au moins une fois par an, l'année du pied de page est figée au moment du build.
- [ ] Suivre les montées de version : `npx next upgrade` gère la migration Next.js.
