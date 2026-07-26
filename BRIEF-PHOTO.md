# Brief photo

Document destiné au graphiste et au photographe. Il liste ce qui est en place, ce qui manque, et
les contraintes de production.

Contact projet : msnettoyage211@gmail.com

---

## 1. État des lieux

**20 visuels sur 23 sont en place.** Tous les emplacements du site sont donc pourvus, sauf trois.

| Emplacement                | Fichier                                        | Format       | État         |
| -------------------------- | ---------------------------------------------- | ------------ | ------------ |
| Visuel d'accroche          | `hero-accueil.jpg`                             | Portrait 4:5 | En place     |
| Mosaïque, vitre            | `expertise-vitre.jpg`                          | Portrait 3:4 | En place     |
| Mosaïque, lit préparé      | `expertise-lit-prepare.jpg`                    | Portrait 3:4 | En place     |
| Mosaïque, salle de réunion | `expertise-salle-reunion.jpg`                  | Portrait 3:4 | En place     |
| Univers, appartement       | `univers-appartement.jpg`                      | Paysage 16:9 | En place     |
| Univers, bureau            | `univers-bureau.jpg`                           | Paysage 16:9 | En place     |
| Univers, commerce          | `univers-commerce.jpg`                         | Paysage 16:9 | En place     |
| Univers, Airbnb            | `univers-airbnb.jpg`                           | Paysage 16:9 | En place     |
| Univers, industriel        | `univers-industriel.jpg`                       | Paysage 16:9 | En place     |
| Univers, fin de chantier   | `univers-fin-chantier.jpg`                     | Paysage 16:9 | En place     |
| Avant / après, séjour      | `avant-apres-sejour-avant.jpg` + `-apres.jpg`  | Paysage 4:3  | En place     |
| Avant / après, cuisine     | `avant-apres-cuisine-avant.jpg` + `-apres.jpg` | Paysage 4:3  | En place     |
| Avant / après, sol         | `avant-apres-sol-avant.jpg` + `-apres.jpg`     | Paysage 4:3  | En place     |
| Cas client, Airbnb         | `cas-airbnb.jpg`                               | Portrait 3:4 | En place     |
| Cas client, après travaux  | `cas-apres-travaux.jpg`                        | Portrait 3:4 | En place     |
| Cas client, bureaux        | `cas-bureaux.jpg`                              | Portrait 3:4 | En place     |
| Bloc contact, véhicule     | `vehicule.jpg`                                 | Paysage 4:3  | En place     |
| Bloc à propos, équipe      | `equipe.jpg`                                   | Paysage 4:3  | **Manquant** |
| Matériel professionnel     | `materiel.jpg`                                 | Paysage 4:3  | **Manquant** |
| Page Meaux                 | `meaux.jpg`                                    | Paysage 16:9 | **Manquant** |

---

## 2. Les trois visuels manquants

### 2.1 L'équipe, priorité haute

| Champ  | Valeur                                                                         |
| ------ | ------------------------------------------------------------------------------ |
| Format | Paysage 4:3, minimum 1600 × 1200 px                                            |
| Nom    | `equipe.jpg`                                                                   |
| Sujet  | L'équipe en tenue, sur un lieu d'intervention. Visages nets, sourires naturels |

C'est le visuel le plus rentable du site. Un visiteur qui voit une vraie équipe identifie une
entreprise structurée, pas un particulier qui bricole. Aucun autre visuel ne remplit ce rôle.

**Autorisation à recueillir** : toute personne reconnaissable doit signer une autorisation de droit
à l'image avant publication.

### 2.2 Le matériel

| Champ  | Valeur                                                  |
| ------ | ------------------------------------------------------- |
| Format | Paysage 4:3, minimum 1600 × 1200 px                     |
| Nom    | `materiel.jpg`                                          |
| Sujet  | Chariot, autolaveuse ou produits professionnels alignés |

Le matériel professionnel distingue visuellement une entreprise d'un service à la personne.

### 2.3 Meaux

| Champ  | Valeur                                                                               |
| ------ | ------------------------------------------------------------------------------------ |
| Format | Paysage 16:9, minimum 1600 × 900 px                                                  |
| Nom    | `meaux.jpg`                                                                          |
| Sujet  | Un repère identifiable de Meaux : la cathédrale, les bords de Marne, le centre-ville |

Cette photo ancre la page locale et rassure sur la proximité réelle de l'entreprise. C'est la seule
du lot qui doit impérativement être une **vraie photo** : une vue générée ne ressemblerait à aucun
lieu réel, et un habitant de Meaux le verrait immédiatement.

---

## 3. Point de vigilance sur le lot actuel

Les 20 visuels en place sont **générés par intelligence artificielle**. Ils sont cohérents,
correctement cadrés et au bon format, mais ils ne montrent aucune intervention réelle de
l'entreprise.

Trois conséquences à connaître :

1. **Le logo sur le véhicule n'est pas le vrai logo.** L'image `vehicule.jpg` affiche un logotype
   inventé, « MS Nettoyage » en lettres bleues avec une virgule graphique, qui ne correspond pas au
   monogramme MS du site. Un visiteur attentif voit l'incohérence. À reprendre en priorité, soit par
   retouche du visuel, soit par une photo du véritable utilitaire.
2. **Les comparatifs avant / après ne documentent aucun chantier réel.** Tant que la section affiche
   des visuels générés, elle illustre une promesse plutôt qu'elle ne prouve un résultat. Les
   remplacer par de vraies paires reste l'action qui augmente le plus la crédibilité du site.
3. **Aucune contrainte légale n'est enfreinte** par ces images tant qu'elles illustrent une
   prestation sans prétendre documenter une intervention précise. En revanche, les présenter comme
   des réalisations de l'entreprise le serait.

Les 14 photos réellement fournies par le client sont conservées dans `design/photos-client/`. Elles
ne sont plus affichées, car toutes en portrait 9:16 et prises dans un seul lieu, mais elles restent
la seule matière authentique disponible.

---

## 4. Règles techniques, valables pour toute nouvelle photo

| Critère           | Consigne                                                                        |
| ----------------- | ------------------------------------------------------------------------------- |
| Format de fichier | JPEG qualité 85, ou WebP. Le site reconvertit automatiquement en AVIF/WebP      |
| Largeur minimale  | 1600 px sur le grand côté, 2000 px de préférence                                |
| Poids             | Moins de 400 Ko par fichier après compression                                   |
| Colorimétrie      | Balance des blancs neutre, pas de dominante jaune ni bleue                      |
| Retouche          | Correction d'exposition et de perspective autorisée, pas de suppression d'objet |
| Nommage           | Minuscules, sans accent ni espace, mots séparés par des tirets                  |

### Ce qui fait qu'une photo de propreté fonctionne

1. **Lumière naturelle, de jour**, volets ouverts. Une pièce éclairée au plafonnier paraît sale.
2. **Surfaces sèches et sans reflet.** Un sol qui brille de flaques donne l'impression d'un travail
   en cours, pas terminé.
3. **Aucun objet personnel** dans le champ : produits d'entretien, sacs, câbles, chaussures.
4. **Lignes droites.** Appareil tenu de niveau, à hauteur de poitrine. Une photo en contre-plongée
   déforme les murs.
5. **Un point de netteté clair**, pas de flou de bougé.
6. Éviter le grand-angle du téléphone à moins de 1 m d'un mur : il courbe les perspectives.

### Cas particulier des paires avant / après

Les deux prises de vue doivent être faites **du même point, à la même hauteur, avec la même
focale**, et si possible sous la même lumière. Repérer la position au sol avant de commencer, ou
marquer l'emplacement du trépied.

Une paire dont une seule photo est fournie est refusée automatiquement par les tests du site : une
comparaison à moitié illustrée ne démontre rien.

---

## 5. Livraison

Déposer les fichiers dans `public/images/`, en respectant exactement les noms indiqués. Chaque
emplacement non pourvu affiche un aplat graphique aux couleurs de la marque, jamais une image
cassée : le site reste présentable pendant toute la durée de production.
