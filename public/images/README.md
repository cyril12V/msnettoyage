# Photographies du site

Déposer ici les photos fournies par le client, puis renseigner la prop `src` du `MediaSlot`
correspondant. Tant que `src` est absent, un aplat graphique de marque est affiché — jamais une
image cassée.

## Emplacements prévus

| Fichier suggéré      | Où le brancher                     | Sujet attendu                                     |
| -------------------- | ---------------------------------- | ------------------------------------------------- |
| `hero-accueil.jpg`   | `src/components/sections/Hero.tsx` | Intérieur lumineux et impeccable, format portrait |
| `service-<slug>.jpg` | `src/app/services/[slug]/page.tsx` | Une photo par prestation, format paysage 4:3      |
| `equipe.jpg`         | `src/app/a-propos/page.tsx`        | Équipe en intervention, format paysage 4:3        |

Exemple de branchement :

```tsx
<MediaSlot src="/images/hero-accueil.jpg" alt="Salon lumineux après intervention" priority />
```

## Consignes techniques

- **Format** : JPG ou WebP. Next.js les reconvertit automatiquement en AVIF/WebP à la volée.
- **Largeur** : 1600 px minimum pour le hero, 1200 px pour les autres.
- **Poids** : viser moins de 400 Ko par fichier avant traitement — la vitesse de chargement est un
  critère de classement Google.
- **Nommage** : minuscules, sans accent ni espace, mots séparés par des tirets.
- **Texte alternatif** : toujours renseigner `alt` avec une description utile. Ce n'est pas
  optionnel : c'est une obligation d'accessibilité et un signal de référencement.

## Droits

N'utiliser que des photos prises par l'entreprise ou dont les droits commerciaux sont acquis. Les
photos de banque d'images génériques desservent une entreprise locale : les vraies interventions
convertissent mieux.
