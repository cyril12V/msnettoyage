# Brief photo

Suivi des visuels du site : ce qui est en place, où chaque fichier est utilisé, et les contraintes à
respecter pour toute nouvelle photo.

---

## 1. État des lieux

**Tous les emplacements du site sont pourvus.** 21 visuels en place.

| Emplacement               | Fichier                                        | Format       | État     |
| ------------------------- | ---------------------------------------------- | ------------ | -------- |
| Visuel d'accroche         | `hero-accueil.jpg`                             | Portrait 4:5 | En place |
| Mosaïque, vitre           | `expertise-vitre.jpg`                          | Portrait 3:4 | En place |
| Mosaïque, lit préparé     | `expertise-lit-prepare.jpg`                    | Portrait 3:4 | En place |
| Mosaïque, matériel        | `materiel.jpg`                                 | Paysage 4:3  | En place |
| Univers, appartement      | `univers-appartement.jpg`                      | Paysage 16:9 | En place |
| Univers, bureau           | `univers-bureau.jpg`                           | Paysage 16:9 | En place |
| Univers, commerce         | `univers-commerce.jpg`                         | Paysage 16:9 | En place |
| Univers, Airbnb           | `univers-airbnb.jpg`                           | Paysage 16:9 | En place |
| Univers, industriel       | `univers-industriel.jpg`                       | Paysage 16:9 | En place |
| Univers, fin de chantier  | `univers-fin-chantier.jpg`                     | Paysage 16:9 | En place |
| Avant / après, séjour     | `avant-apres-sejour-avant.jpg` + `-apres.jpg`  | Paysage 4:3  | En place |
| Avant / après, cuisine    | `avant-apres-cuisine-avant.jpg` + `-apres.jpg` | Paysage 4:3  | En place |
| Avant / après, sol        | `avant-apres-sol-avant.jpg` + `-apres.jpg`     | Paysage 4:3  | En place |
| Cas client, Airbnb        | `cas-airbnb.jpg`                               | Portrait 3:4 | En place |
| Cas client, après travaux | `cas-apres-travaux.jpg`                        | Portrait 3:4 | En place |
| Cas client, bureaux       | `cas-bureaux.jpg`                              | Portrait 3:4 | En place |
| Bloc contact, véhicule    | `vehicule.jpg`                                 | Paysage 4:3  | En place |

Deux visuels envisagés au départ ont été abandonnés, et le site a été adapté en conséquence :

- **`equipe.jpg`**, une photo de l'équipe. Aucun emplacement ne lui était réservé, il n'y a donc
  rien à combler.
- **`meaux.jpg`**, une vue de la ville. L'emplacement de la page locale a été remplacé par quatre
  repères chiffrés : code postal, nombre de communes desservies, absence de frais de déplacement et
  délai de réponse. Ils informent davantage qu'une vue de ville générique.

La salle de réunion (`design/references/expertise-salle-reunion.jpg`) a quitté la mosaïque au profit
du chariot de matériel : elle faisait doublon avec le visuel « bureau » des univers d'intervention.

---

## 2. Point de vigilance sur le lot actuel

Les 21 visuels en place sont **générés par intelligence artificielle**. Ils sont cohérents,
correctement cadrés et au bon format, mais ils ne montrent aucune intervention réelle de
l'entreprise.

Deux conséquences à connaître :

1. **Les comparatifs avant / après ne documentent aucun chantier réel.** Tant que la section
   affiche des visuels générés, elle illustre une promesse plutôt qu'elle ne prouve un résultat.
   Les remplacer par de vraies paires reste l'action qui augmente le plus la crédibilité du site.
2. **Aucune contrainte légale n'est enfreinte** tant que ces images illustrent une prestation sans
   prétendre documenter une intervention précise. Les présenter comme des réalisations de
   l'entreprise le serait.

Les 14 photos réellement fournies par le client sont conservées dans `design/photos-client/`. Elles
ne sont plus affichées, toutes en portrait 9:16 et prises dans un seul lieu, mais elles restent la
seule matière authentique disponible.

---

## 3. Règles techniques, valables pour toute nouvelle photo

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
4. **Lignes droites.** Appareil tenu de niveau, à hauteur de poitrine. Une contre-plongée déforme
   les murs.
5. **Un point de netteté clair**, pas de flou de bougé.
6. Éviter le grand-angle du téléphone à moins de 1 m d'un mur : il courbe les perspectives.

### Cas particulier des paires avant / après

Les deux prises de vue doivent être faites **du même point, à la même hauteur, avec la même
focale**, et si possible sous la même lumière. Repérer la position au sol avant de commencer, ou
marquer l'emplacement du trépied.

Une paire dont une seule photo est fournie est refusée automatiquement par les tests du site : une
comparaison à moitié illustrée ne démontre rien.

---

## 4. Livraison

Déposer les fichiers dans `public/images/`, en respectant exactement les noms indiqués. Chaque
emplacement non pourvu affiche un aplat graphique aux couleurs de la marque, jamais une image
cassée : le site reste présentable pendant toute la durée de production.
