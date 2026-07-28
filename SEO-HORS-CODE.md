# Référencement local : ce que le code ne peut pas faire

Le site est techniquement au maximum de ce qui est faisable : structure une requête = une page,
balisage complet, sitemap, performance. **Cela représente environ un tiers du résultat sur une
recherche locale.** Les deux autres tiers se jouent en dehors du dépôt, et personne ne peut les
faire à votre place : ils demandent un accès au compte Google de l'entreprise et de vrais clients.

Ce document décrit exactement quoi faire, dans l'ordre d'impact.

---

## Comment Google classe une recherche locale

Quand quelqu'un tape « nettoyage de maison à Meaux », Google affiche deux blocs distincts :

1. **Le bloc de cartes** en haut, avec trois entreprises, leurs étoiles et leur distance. Il ne
   contient **que des fiches Google Business Profile**. Un site sans fiche n'y apparaît jamais,
   quelle que soit sa qualité.
2. **Les résultats bleus classiques** en dessous, qui eux viennent du site.

Le bloc de cartes capte la majorité des clics sur une recherche de service de proximité. C'est pour
cela que la fiche passe avant tout le reste, y compris avant le site.

Les trois critères que Google applique au bloc de cartes, dans l'ordre : la **pertinence** (la fiche
décrit-elle ce qui est recherché), la **distance** (par rapport à la personne qui cherche), et la
**notoriété** (avis, ancienneté, cohérence des informations sur le web).

---

## 1. Créer la fiche Google Business Profile : priorité absolue

À faire depuis le compte Google de l'entreprise, sur https://business.google.com.

### Les informations à saisir, au caractère près

**Recopier exactement ces valeurs.** Google recoupe le nom, l'adresse et le téléphone (le « NAP »)
entre la fiche, le site et les annuaires. Une différence, même minuscule (« 2 sq. Courbet » au lieu
de « 2 square Courbet », ou le téléphone écrit `+33 6 20…` d'un côté et `06 20…` de l'autre), et
Google considère qu'il s'agit peut-être de deux entreprises différentes. La fiche perd alors en
fiabilité, donc en classement.

| Champ                  | Valeur exacte                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Nom de l'établissement | `MS Nettoyages`                                                                                   |
| Adresse                | `2 square Courbet, 77100 Meaux`                                                                  |
| Téléphone              | `06 20 46 07 03`                                                                                 |
| Site web               | l'adresse du site en ligne                                                                       |
| Catégorie principale   | **Service de nettoyage**                                                                         |
| Catégories secondaires | Entreprise de nettoyage de bureaux · Service de ménage · Service de nettoyage après construction |

> **Le nom de l'établissement ne doit contenir que le nom.** La tentation est grande d'écrire
> « MS Nettoyages Meaux 77 » pour caser des mots-clés : c'est une infraction explicite aux règles de
> Google, elle est détectée automatiquement et entraîne la suspension de la fiche. Les mots-clés se
> placent dans la description et les services, pas dans le nom.

### Zone de service ou adresse visible

Deux configurations possibles, à choisir selon la réalité de l'activité :

- **Les clients viennent-ils au 2 square Courbet ?** Non, c'est une entreprise d'intervention. Il
  faut donc cocher **« Je livre des biens et des services à mes clients »** et **masquer l'adresse**.
- Google demandera alors la **zone desservie**. Y saisir, dans cet ordre : `Meaux`, les communes
  voisines (`Nanteuil-lès-Meaux`, `Villenoy`, `Trilport`, `Mareuil-lès-Meaux`,
  `Chauconin-Neufmontiers`, `Crégy-lès-Meaux`, `Poincy`, `Varreddes`), puis les villes qui ont
  désormais une page sur le site (`Paris`, `Chelles`, `Lagny-sur-Marne`, `Torcy`,
  `Noisy-le-Grand`, `Montreuil`, `Saint-Denis`, `Créteil`, `Vincennes`, `Boulogne-Billancourt`,
  `Pontault-Combault`), et enfin `Île-de-France`.

  Google limite la zone desservie à 20 entrées et à un rayon raisonnable autour de l'adresse. Ne
  pas chercher à saturer la liste : une zone qui couvre visiblement plus large que l'activité
  réelle affaiblit la fiche au lieu de l'étendre.

L'adresse reste nécessaire pour la vérification, même masquée.

### Horaires

Reprendre exactement ceux du site, sinon Google détecte l'incohérence :

- Lundi au vendredi : **7h – 19h**
- Samedi : **8h – 13h**
- Dimanche : fermé

### Description de l'établissement (750 caractères maximum)

Texte prêt à coller, calibré pour contenir les requêtes visées sans être illisible :

> MS Nettoyages est une société de nettoyage professionnel basée à Meaux (77100), qui intervient à
> Paris et dans toute l'Île-de-France, chez les particuliers comme dans les locaux professionnels.
>
> Nos prestations : nettoyage de maison et d'appartement, ménage chez le particulier en formule
> régulière, nettoyage de bureaux et de locaux professionnels, nettoyage de fin de chantier et
> après travaux, ménage après déménagement avant état des lieux, et rotations de ménage pour
> locations Airbnb.
>
> Matériel et produits professionnels fournis, intervenants déclarés, devis gratuit sous 24 heures et
> aucun frais de déplacement sur Meaux, les communes limitrophes et Paris.

### Services à déclarer dans la fiche

Google permet de lister des services, chacun avec sa description. **Créer une entrée par requête
visée** : c'est ce qui fait remonter la fiche sur la recherche correspondante.

| Service à créer                  | Page du site à laquelle il correspond |
| -------------------------------- | ------------------------------------- |
| Nettoyage de maison              | `/nettoyage-maison`                   |
| Nettoyage de bureaux             | `/nettoyage-bureau`                   |
| Ménage particulier               | `/menage-particulier`                 |
| Nettoyage de fin de chantier     | `/nettoyage-fin-de-chantier`          |
| Ménage après déménagement        | `/menage-apres-demenagement`          |
| Ménage Airbnb                    | `/menage-airbnb`                      |

Les URLs ont changé le 28 juillet 2026 : elles ne portent plus le suffixe `-meaux`, qui empêchait
ces pages de remonter ailleurs qu'à Meaux. Les anciennes adresses redirigent, mais **c'est la
nouvelle qu'il faut saisir dans la fiche.**

Pour la description de chaque service, reprendre le paragraphe d'introduction de la page
correspondante du site : il est écrit pour se suffire à lui-même.

### Photos

C'est le point le plus sous-estimé. Une fiche avec des photos reçoit nettement plus de demandes
d'itinéraire et d'appels qu'une fiche sans. Google privilégie par ailleurs les fiches actives.

À charger depuis les visuels déjà présents dans `public/images/` :

- Le **logo** en photo de profil.
- Le **véhicule** (`vehicule.jpg`) : il porte le logo, c'est la preuve visuelle la plus efficace
  qu'il s'agit d'une vraie entreprise.
- Le **matériel** (`materiel.jpg`).
- Les **avant / après** (`avant-apres-*.jpg`) : ce sont ceux qui retiennent l'attention.
- Les visuels d'univers (`univers-*.jpg`).

Puis **ajouter une photo par mois**. Une fiche qui ne bouge plus perd du terrain face à une fiche
alimentée.

### Vérification

Google demande de prouver la détention de l'établissement : courrier postal avec code, appel
téléphonique, ou vidéo selon les cas. **La fiche n'apparaît nulle part avant cette étape.** Le
courrier prend une à deux semaines : c'est la raison pour laquelle cette démarche doit être lancée
en premier, avant tout le reste.

### Une fois la fiche en ligne

Récupérer son adresse publique (celle du type `https://g.page/…` ou le lien de partage) et la
renseigner dans `src/lib/site.ts` → `social.googleBusiness`. Cela ajoute la fiche au balisage
`sameAs` du site : Google relie alors explicitement le site et la fiche, ce qui renforce les deux.

---

## 2. Les avis clients : le deuxième levier, et le plus durable

Aucun avis pour le moment. C'est **le** point faible face à un concurrent qui en a trente.

Les avis pèsent de deux façons : ils entrent directement dans le classement du bloc de cartes, et ils
déterminent qui appelle. Entre deux entreprises côte à côte, celle qui a 4,8 étoiles sur 25 avis
capte l'essentiel des appels, même en second.

### Objectif réaliste

**10 avis dans les trois premiers mois, puis 2 à 3 par mois.** Dix avis suffisent à sortir de la
zone rouge. Le rythme régulier compte davantage que le total : trente avis tous datés du même mois
est un signal d'achat d'avis, et Google le traite comme tel.

### Comment les obtenir

Le moment décisif est **juste après l'intervention, sur place, quand le client constate le
résultat**. C'est là que le taux de réponse est le plus élevé. Un message envoyé trois jours plus
tard tombe dans le vide.

La méthode qui fonctionne : demander de vive voix à la fin du chantier, puis envoyer le lien par SMS
ou WhatsApp dans la foulée, pendant que le client a encore le téléphone en main.

Le lien court se récupère dans la fiche Google : bouton **« Demander des avis »**, qui donne une
adresse du type `https://g.page/r/…/review` ouvrant directement le formulaire.

### Message prêt à envoyer

> Bonjour [Prénom],
>
> Merci de votre confiance pour l'intervention d'aujourd'hui, j'espère que le résultat vous convient.
>
> Si vous avez deux minutes, un avis Google m'aiderait beaucoup : c'est ce qui permet aux gens de
> Meaux de trouver l'entreprise quand ils cherchent une prestation de nettoyage.
>
> Voici le lien direct : [LIEN]
>
> Merci beaucoup,
> Sabri, MS Nettoyages

### Ce qu'il ne faut pas faire

- **Ne jamais offrir de contrepartie** (remise, geste commercial) en échange d'un avis. C'est
  interdit par Google, détectable, et sanctionné par la suppression de tous les avis de la fiche.
- **Ne pas demander à des proches** qui ne sont pas clients. Google recoupe les adresses IP et les
  historiques de compte.
- **Ne pas laisser un avis négatif sans réponse.** Une réponse calme et factuelle sous 48 h vaut
  mieux que le silence : les lecteurs jugent autant la réponse que l'avis. Répondre à **tous** les
  avis, positifs compris, est par ailleurs un signal d'activité pris en compte par Google.

---

## 3. Search Console : mesurer, et faire indexer plus vite

Sans Search Console, on ne sait pas sur quoi le site ressort, ni s'il est indexé. C'est
l'instrumentation, elle ne fait pas monter le site mais elle dit quoi corriger.

### Mise en place

1. Aller sur https://search.google.com/search-console, se connecter avec le compte Google de
   l'entreprise, **le même que celui de la fiche**.
2. Ajouter une propriété de type **« Préfixe d'URL »** avec l'adresse exacte du site.
3. Choisir la méthode **« Balise HTML »**. Google affiche une ligne du type
   `<meta name="google-site-verification" content="AbCdEf123..." />`. **Copier uniquement le contenu
   de `content`**, pas la balise entière.
4. Dans Vercel → projet `msnettoyage` → Settings → Environment Variables, ajouter :
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = la valeur copiée. Cocher Production et Preview.
5. Redéployer (Deployments → Redeploy). La balise est alors présente sur toutes les pages.
6. Revenir dans Search Console et cliquer sur **Valider**.

Le code nécessaire est déjà en place dans `src/app/layout.tsx` : il n'y a que la variable à
renseigner.

### Immédiatement après la validation

1. **Sitemaps** → saisir `sitemap.xml` → Envoyer. Cela déclare les 9 pages d'un coup, sans attendre
   que Google les découvre.
2. **Inspection d'URL** → coller l'adresse de chaque page de prestation → **Demander une indexation**.
   À faire une fois par page : c'est ce qui fait passer le délai d'indexation de plusieurs semaines à
   quelques jours.

### Ce qu'il faut regarder ensuite, une fois par mois

- **Performances** : les requêtes réelles qui ramènent des visiteurs. Une requête en position 11 à
  20 signale une page proche de la première page : c'est celle-là qu'il faut enrichir en priorité,
  pas les autres.
- **Indexation → Pages** : vérifier que les 9 pages sont bien indexées. Une page « détectée mais non
  indexée » signale un contenu jugé trop faible.
- **Expérience → Signaux Web essentiels** : doit rester au vert.

Les premières données apparaissent 48 à 72 h après la validation. **Rien avant, c'est normal.**

### Bing

Même démarche sur https://www.bing.com/webmasters, avec la variable
`NEXT_PUBLIC_BING_SITE_VERIFICATION`. Bing pèse peu en trafic direct en France, mais il alimente les
réponses de ChatGPT et de Copilot : l'inscription y prend cinq minutes et vaut d'être faite.

---

## 4. Annuaires et cohérence des informations

Google recoupe les mentions de l'entreprise sur le web. Plus le nom, l'adresse et le téléphone
apparaissent à l'identique sur des sites tiers, plus la fiche est jugée fiable.

À faire dans l'ordre, en recopiant **exactement** les mêmes valeurs qu'au chapitre 1 :

1. **Pages Jaunes** (pagesjaunes.fr) : inscription gratuite, forte autorité en France.
2. **Annuaire de la Chambre de commerce** et annuaires locaux du Pays de Meaux.
3. **Facebook Page professionnelle** : à créer, elle sert de second point de contact et est indexée
   par Google. Renseigner ensuite l'adresse dans `src/lib/site.ts` → `social.facebook`.
4. **Apple Plans** (mapsconnect.apple.com) : indispensable pour les recherches faites depuis un
   iPhone, souvent oublié par les concurrents.

Éviter les annuaires payants qui promettent un référencement : leur valeur est nulle, et
l'accumulation d'inscriptions de mauvaise qualité peut nuire.

---

## Ce qui se passe et quand

Le référencement local n'est pas instantané. Voici ce qui est réaliste :

| Échéance       | Ce qui doit être visible                                                             |
| -------------- | ------------------------------------------------------------------------------------ |
| Semaine 1      | Fiche Google créée, vérification lancée, Search Console validé, sitemap envoyé       |
| Semaines 2 à 4 | Fiche en ligne et visible, pages indexées, premières impressions dans Search Console |
| Mois 2 à 3     | 10 avis atteints, positions qui se stabilisent sur les requêtes longues              |
| Mois 4 à 6     | Présence dans le bloc de cartes sur les requêtes principales à Meaux                 |

**Le facteur limitant n'est pas le site, il est les avis.** Une fiche à 15 avis récents battra
durablement un site techniquement parfait sans aucun avis. C'est là qu'il faut mettre l'énergie.

---

## Étendre à d'autres villes, plus tard

Quand Meaux sera acquis, la même mécanique se réplique. **Une ville = un jeu de pages**, avec du
contenu réellement réécrit.

Concrètement : dupliquer les entrées de `src/data/landings.ts` en remplaçant la ville, **puis
réécrire les paragraphes**. Un simple chercher-remplacer produit des pages jumelles, que Google
identifie immédiatement comme du remplissage et n'indexe pas. `tests/landings.test.ts` échoue
d'ailleurs si deux pages partagent le même texte : le garde-fou est déjà en place.

Ordre suggéré, par population et proximité : Chelles, Melun, Torcy, Lagny-sur-Marne, Coulommiers.
Ne pas viser Paris avant d'être solidement installé en Seine-et-Marne : la concurrence y est d'un
tout autre ordre et l'effort serait perdu.
