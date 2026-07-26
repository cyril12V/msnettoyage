# Visuels du site

Toutes les images affichées sur le site vivent ici. Le détail des formats et des sujets attendus est
dans **[BRIEF-PHOTO.md](../../BRIEF-PHOTO.md)**, à la racine du projet.

## Où chaque fichier est utilisé

| Fichier                         | Emplacement                          | Déclaré dans                        |
| ------------------------------- | ------------------------------------ | ----------------------------------- |
| `hero-accueil.jpg`              | Visuel d'accroche, haut de page      | `components/sections/Hero.tsx`      |
| `expertise-*.jpg`               | Mosaïque de la section services      | `components/sections/Expertise.tsx` |
| `univers-*.jpg`                 | Les 6 vignettes d'univers            | `data/univers.ts`                   |
| `avant-apres-*-avant/apres.jpg` | Comparatifs de résultats             | `data/realisations.ts`              |
| `cas-*.jpg`                     | Les 3 cas clients                    | `data/cas-clients.ts`               |
| `materiel.jpg`                  | Bloc contact, à côté des coordonnées | `components/sections/CtaDevis.tsx`  |

## Remplacer une image

Déposer le nouveau fichier sous le même nom : rien d'autre à faire. Pour ajouter une image à un
emplacement encore vide, renseigner la prop `src` du `MediaSlot` correspondant, ou le champ `src`
dans le fichier de données indiqué ci-dessus.

Tant qu'un emplacement n'a pas de `src`, il affiche un aplat graphique aux couleurs de la marque,
jamais une image cassée. En développement, la description de la photo attendue s'affiche par-dessus.

## Consignes techniques

- **Format** : JPEG qualité 85 ou WebP. Next.js reconvertit à la volée en AVIF et WebP.
- **Poids** : viser moins de 400 Ko par fichier. La vitesse de chargement est un critère de
  classement Google.
- **Nommage** : minuscules, sans accent ni espace, mots séparés par des tirets. Le nom de fichier
  compte pour le référencement des images.
- **Texte alternatif** : toujours renseigné dans le code, jamais vide. C'est une obligation
  d'accessibilité autant qu'un signal de référencement.

## Droits

N'utiliser que des photos prises par l'entreprise ou dont les droits commerciaux sont acquis. Toute
personne reconnaissable doit avoir signé une autorisation de droit à l'image.

Les visuels actuellement en place sont générés par intelligence artificielle : ils illustrent les
prestations mais ne documentent aucune intervention réelle. Les photos authentiques fournies par le
client sont conservées dans `design/photos-client/`.
