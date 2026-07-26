# MS Nettoyage, visuels à produire

Site : entreprise de nettoyage professionnel, basée à Meaux (77), intervient en Île-de-France.
Contact : msnettoyage211@gmail.com

Vingt et un visuels sont en place. Restent deux photos à produire, plus la reprise du visuel du
véhicule.

---

## Registre visuel à respecter

Toute nouvelle image doit se fondre dans le lot existant. Le registre est le suivant :

- **Lumière naturelle**, de jour, jamais de plafonnier seul
- **Tons clairs et neutres** : blanc cassé, beige, bois clair, gris chaud
- **Ambiance calme et aérée**, peu d'objets dans le champ
- **Couleur de marque** : bleu `#0B4EDB`. Elle vit dans l'interface du site, pas dans les photos.
  Ne pas ajouter de filtre bleu.

Une image sombre, saturée ou froide jurera immédiatement avec les autres.

---

## 1. `equipe.jpg`

**Priorité la plus haute.**

| Spécification  | Valeur                               |
| -------------- | ------------------------------------ |
| Nom du fichier | `equipe.jpg`                         |
| Format         | Paysage 4:3                          |
| Dimensions     | 2000 × 1500 px                       |
| Emplacement    | Bloc de présentation de l'entreprise |

### Sujet

L'équipe MS Nettoyage en tenue, sur un lieu d'intervention réel.

- **2 à 4 personnes**, cadrées à mi-corps ou en plan américain
- **Tenue noire** : polo et tablier noirs, comme sur les visuels déjà en ligne. La cohérence de
  tenue entre les images compte plus que le détail de la tenue elle-même.
- **Visages nets**, expressions naturelles. Un sourire franc, pas un sourire commercial.
- Deux options de mise en scène, au choix :
  - **en action** : une personne nettoie une surface, les autres travaillent en arrière-plan
  - **posée** : l'équipe face à l'objectif, dans une pièce claire qu'elle vient de traiter

### Décor

Intérieur clair et propre, lumière du jour, si possible une baie vitrée ou une grande fenêtre dans
le champ. Le lieu doit ressembler à un vrai chantier terminé, pas à un studio.

### À éviter

- Fond blanc de studio, cadrage type photo d'identité d'entreprise
- Bras croisés, pose « corporate » figée
- Produits d'entretien de supermarché visibles
- Une photo de banque d'images générique : elle se repère et annule tout l'effet recherché

### Contrainte juridique

Toute personne reconnaissable doit **signer une autorisation de droit à l'image** avant publication.
Prévoir le formulaire le jour de la prise de vue.

### Pourquoi ce visuel compte

C'est le seul du site qui montrerait des personnes réelles. Un visiteur qui voit une vraie équipe
identifie une entreprise structurée. Sans lui, le site reste une suite de belles pièces vides.

---

## 2. `meaux.jpg`

| Spécification  | Valeur                     |
| -------------- | -------------------------- |
| Nom du fichier | `meaux.jpg`                |
| Format         | Paysage 16:9               |
| Dimensions     | 2400 × 1350 px             |
| Emplacement    | Page locale dédiée à Meaux |

### Sujet

Un repère de Meaux immédiatement identifiable par un habitant. Par ordre de reconnaissance :

1. **La cathédrale Saint-Étienne**, en pied ou en plongée légère
2. **Les bords de Marne**, avec les moulins ou le vieux pont
3. **Le centre-ville**, place ou rue commerçante reconnaissable

### Contrainte impérative

**Ce doit être une vraie photographie.** C'est le seul visuel du site pour lequel une image générée
est exclue : elle ne ressemblerait à aucun lieu existant, et le premier habitant de Meaux qui la
verrait perdrait confiance dans tout le reste du site.

### Conditions de prise de vue

Lumière de fin de journée ou ciel dégagé. Éviter le ciel gris uniforme, qui écrase le sujet.

### Droits

Si la photo n'est pas prise par l'entreprise, vérifier que la licence couvre bien un **usage
commercial**. Une mention « gratuit pour usage personnel » ne suffit pas pour un site d'entreprise.

### Pourquoi ce visuel compte

Il ancre la page locale et rassure sur la proximité réelle de l'entreprise. Sans lui, la page Meaux
n'a aucun signal visuel de territoire.

---

## 3. Reprise du visuel véhicule

Le visuel d'utilitaire fourni porte un **logo inventé** : « MS Nettoyage » en lettres bleues avec
une virgule graphique, sans rapport avec le monogramme MS utilisé partout ailleurs.

**Il a été retiré du site** : un faux logo sur le site de la marque elle-même est un défaut visible.
Le fichier source est disponible dans `design/references/vehicule-a-retoucher.png` (1448 × 1086 px).

### Ce qui est attendu, au choix

**Option A, retouche.** Remplacer les deux logotypes par le logo officiel, fourni dans
`public/logo-ms-nettoyage.png`. Emplacements mesurés sur l'image source :

| Logotype       | Position                 | Inclinaison |
| -------------- | ------------------------ | ----------- |
| Flanc arrière  | x 145 à 353, y 223 à 343 | environ 2°  |
| Porte latérale | x 441 à 570, y 499 à 572 | environ 6°  |

La difficulté est la reconstitution du panneau : dégradé de carrosserie, nervure verticale et
reflets. Une reprise à la main est nécessaire, un aplat ne suffit pas. Une tentative automatisée a
laissé un rectangle visible, c'est pourquoi elle a été écartée.

**Option B, photographie.** Photographier le véritable utilitaire de l'entreprise : paysage 4:3,
2000 × 1500 px, de trois quarts avant, marquage bien lisible, sur un fond neutre et dégagé.

L'option B est préférable : elle donne une image réelle de l'entreprise, ce qu'aucune retouche ne
remplace.

### Remise en ligne

Une fois le fichier livré sous le nom `vehicule.jpg` dans `public/images/`, il reprendra sa place
dans le bloc de contact, à la place du chariot de matériel.

---

## Contraintes techniques communes

| Critère      | Consigne                                                                       |
| ------------ | ------------------------------------------------------------------------------ |
| Format       | JPEG qualité 85, ou WebP                                                       |
| Poids        | Moins de 400 Ko par fichier après compression                                  |
| Colorimétrie | Balance des blancs neutre, aucune dominante jaune ni bleue                     |
| Netteté      | Un point de netteté clair, aucun flou de bougé                                 |
| Perspective  | Appareil tenu de niveau. Une contre-plongée déforme les murs                   |
| Retouche     | Exposition et perspective : autorisé. Suppression d'éléments : à éviter        |
| Texte        | **Aucun texte ni logo incrusté dans l'image.** Le site gère les surimpressions |
| Nommage      | Exactement les noms indiqués, en minuscules, sans accent ni espace             |

---

## Livraison

Les fichiers, nommés exactement `equipe.jpg`, `meaux.jpg` et le cas échéant `vehicule.jpg`.

Ils peuvent être livrés séparément : chaque emplacement non pourvu affiche un aplat graphique aux
couleurs de la marque, jamais une image cassée. Le site reste donc présentable pendant toute la
durée de production.
