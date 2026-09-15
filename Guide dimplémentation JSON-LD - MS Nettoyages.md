## Guide d'implémentation JSON-LD pour MS Nettoyages

### 📋 Instructions d'intégration

1. **Localisation du code**
   - Copiez l'intégralité du bloc JSON-LD fourni
   - Collez-le dans la section `<head>` de votre page d'accueil (avant la balise `</head>`)
   - Utilisez la balise : `<script type="application/ld+json">` ... `</script>`

2. **Vérification et validation**
   - Testez votre implémentation avec l'outil Google Rich Results Test : https://search.google.com/test/rich-results
   - Validez également avec le validateur Schema.org : https://validator.schema.org/

### 🔧 Personnalisations requises

Avant de mettre en ligne, complétez les éléments suivants :

| Élément | Valeur actuelle | À remplacer par |
|---------|-----------------|-----------------|
| `streetAddress` | Vide | Votre adresse complète (ex: "123 Rue de la Paix") |
| `logo` | `https://ms-nettoyages.com/logo.png` | URL réelle de votre logo (format PNG/SVG, min 112x112px) |
| `sameAs` - Facebook | `https://www.facebook.com/msnettoyages` | Votre URL Facebook réelle |
| `sameAs` - Instagram | `https://www.instagram.com/msnettoyages` | Votre URL Instagram réelle |
| `sameAs` - LinkedIn | `https://www.linkedin.com/company/ms-nettoyages` | Votre URL LinkedIn réelle |
| `sameAs` - Pages Jaunes | `https://www.pagesjaunes.fr/ms-nettoyages` | Votre URL Pages Jaunes réelle |
| `urlTemplate` (SearchAction) | `/search?q={search_term_string}` | Adaptez selon votre système de recherche |

### 📊 Structure @graph expliquée

Le bloc utilise une structure `@graph` avec 4 entités interconnectées :

1. **LocalBusiness** (Type: CleaningService)
   - Informations métier complètes
   - Services détaillés
   - Zones de couverture (8 départements Île-de-France)
   - Horaires 24/7

2. **Organization**
   - Données d'entreprise générales
   - Logo et identité
   - Liens sociaux

3. **WebSite**
   - Métadonnées du site
   - SearchAction pour la barre de recherche
   - Langue (fr-FR)

4. **BreadcrumbList**
   - Navigation pour la page d'accueil
   - Améliore le fil d'Ariane dans les résultats Google

### ✅ Bénéfices SEO attendus

- ✓ Apparition d'un **Knowledge Panel** Google
- ✓ Affichage des **horaires d'ouverture** dans les résultats
- ✓ Meilleure visibilité en **recherche locale**
- ✓ Amélioration du **CTR** (taux de clic)
- ✓ Support des **featured snippets**
- ✓ Meilleure compréhension du contenu par les moteurs de recherche

### 🌍 Couverture géographique

Les 8 départements Île-de-France inclus :
- Paris (75)
- Seine-et-Marne (77)
- Yvelines (78)
- Essonne (91)
- Hauts-de-Seine (92)
- Seine-Saint-Denis (93)
- Val-de-Marne (94)
- Val-d'Oise (95)

### 📱 Recommandations supplémentaires

- Ajoutez des **reviews/ratings** avec le type `AggregateRating` pour renforcer la confiance
- Créez des pages de **service détaillées** avec leur propre JSON-LD `Service`
- Implémentez un **FAQ Schema** pour les questions fréquentes
- Utilisez **LocalBusiness Schema** sur chaque page de service

### 🔗 Ressources utiles

- [Documentation Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Test Rich Results Google](https://search.google.com/test/rich-results)
