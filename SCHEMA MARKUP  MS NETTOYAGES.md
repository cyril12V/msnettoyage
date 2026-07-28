# SCHEMA MARKUP — MS NETTOYAGES

Document technique contenant 3 blocs JSON-LD Schema.org complets et prêts à coller pour le site **ms-nettoyages.com**.

---

## BLOC 1 — LocalBusiness (CleaningService)

### 📍 Où coller ?

**À coller dans le `<head>` de TOUTES les pages du site**, avant la balise `</head>`.

### 🎯 Pourquoi ?

Ce bloc définit l'identité complète de l'entreprise MS Nettoyages : localisation, coordonnées, zones d'intervention, horaires et services. Google l'utilise pour :

- Enrichir les résultats de recherche avec les informations de l'entreprise
- Afficher les horaires d'ouverture dans les SERPs
- Générer les fiches Google My Business enrichies
- Valider la légitimité et la couverture géographique

### 📋 Code à coller

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "CleaningService"],
      "@id": "https://ms-nettoyages.com/#business",
      "name": "MS Nettoyages",
      "url": "https://ms-nettoyages.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ms-nettoyages.com/logo.png",
        "width": 546,
        "height": 271
      },
      "description": "Société de nettoyage professionnelle à Meaux, intervenant dans toute l'Île-de-France : nettoyage de maison, bureau, ménage particulier, après travaux, fin de chantier, après déménagement et Airbnb.",
      "telephone": "+33620460703",
      "email": "contact@ms-nettoyages.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2 square Courbet",
        "addressLocality": "Meaux",
        "postalCode": "77100",
        "addressCountry": "FR"
      },
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Paris",
          "areaCode": "75"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Seine-et-Marne",
          "areaCode": "77"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Yvelines",
          "areaCode": "78"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Essonne",
          "areaCode": "91"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Hauts-de-Seine",
          "areaCode": "92"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Seine-Saint-Denis",
          "areaCode": "93"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Val-de-Marne",
          "areaCode": "94"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Val-d'Oise",
          "areaCode": "95"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "priceRange": "€€",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de nettoyage MS Nettoyages",
        "itemListElement": [
          {
            "@type": "Offer",
            "position": 1,
            "itemOffered": {
              "@type": "Service",
              "name": "Nettoyage de maison"
            }
          },
          {
            "@type": "Offer",
            "position": 2,
            "itemOffered": {
              "@type": "Service",
              "name": "Nettoyage de bureau"
            }
          },
          {
            "@type": "Offer",
            "position": 3,
            "itemOffered": {
              "@type": "Service",
              "name": "Ménage particulier"
            }
          },
          {
            "@type": "Offer",
            "position": 4,
            "itemOffered": {
              "@type": "Service",
              "name": "Ménage après travaux"
            }
          },
          {
            "@type": "Offer",
            "position": 5,
            "itemOffered": {
              "@type": "Service",
              "name": "Nettoyage fin de chantier"
            }
          },
          {
            "@type": "Offer",
            "position": 6,
            "itemOffered": {
              "@type": "Service",
              "name": "Ménage après déménagement"
            }
          },
          {
            "@type": "Offer",
            "position": 7,
            "itemOffered": {
              "@type": "Service",
              "name": "Ménage Airbnb"
            }
          }
        ]
      },
      "sameAs": []
    }
  ]
}
</script>
```

---

## BLOC 2 — FAQPage

### 📍 Où coller ?

**À coller uniquement sur la page `/nettoyage-fin-de-chantier-paris`** dans le `<head>`.

### 🎯 Pourquoi ?

Ce bloc enrichit la page de service avec une FAQ structurée. Google l'utilise pour :

- Afficher les questions/réponses directement dans les SERPs (rich snippets FAQ)
- Améliorer le CTR en montrant des réponses pertinentes avant le clic
- Augmenter le temps passé sur la page (les utilisateurs trouvent les réponses immédiatement)
- Renforcer la pertinence pour les requêtes longue traîne

### 📋 Code à coller

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre ménage après travaux et fin de chantier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le ménage après travaux désigne le nettoyage final d'un logement après rénovation légère (peinture, pose de carrelage). Le nettoyage fin de chantier intervient après des travaux lourds (gros œuvre, démolition) et inclut l'évacuation des gravats et débris en plus du nettoyage approfondi. MS Nettoyages réalise les deux prestations en Île-de-France."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour un nettoyage fin de chantier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La durée dépend de la surface et de l'état du chantier. Pour un appartement de 50 m², comptez 4 à 6 heures. Pour un plateau de bureaux de 200 m², une journée complète avec une équipe de 2 à 3 personnes. Nous confirmons la durée estimée lors du devis."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous avant un état des lieux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Nous sommes habitués à intervenir avec une date butoir. Le créneau est confirmé par écrit et tenu. Nous intervenons dans tout Paris et l'Île-de-France."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous dans tout Paris et l'Île-de-France ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, MS Nettoyages intervient dans les 20 arrondissements de Paris ainsi que dans toute l'Île-de-France : Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d'Oise (95)."
      }
    },
    {
      "@type": "Question",
      "name": "Quand commander le nettoyage fin de chantier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Idéalement 48 à 72 heures avant la date de livraison ou d'état des lieux. Nous acceptons les demandes urgentes sous 24 h selon disponibilité. Contactez-nous pour un devis gratuit."
      }
    }
  ]
}
</script>
```

---

## BLOC 3 — Service

### 📍 Où coller ?

**À coller dans le `<head>` de chaque page de service** (exemple : `/nettoyage-fin-de-chantier-paris`).

### 🎯 Pourquoi ?

Ce bloc décrit un service spécifique avec ses caractéristiques, zone d'intervention et offre. Google l'utilise pour :

- Enrichir les pages de service avec des informations structurées
- Afficher les détails du service dans les résultats locaux
- Améliorer la compréhension du contenu par les moteurs de recherche
- Renforcer la pertinence pour les requêtes spécifiques par service

### 📋 Code à coller (exemple pour `/nettoyage-fin-de-chantier-paris`)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ms-nettoyages.com/nettoyage-fin-de-chantier-paris#service",
  "name": "Nettoyage fin de chantier Paris",
  "serviceType": "Nettoyage fin de chantier",
  "provider": {
    "@id": "https://ms-nettoyages.com/#business"
  },
  "areaServed": {
    "@type": "Region",
    "name": "Île-de-France"
  },
  "description": "Nettoyage professionnel fin de chantier à Paris et en Île-de-France : évacuation des gravats, dépoussiérage intégral multi-passes, retrait des traces de peinture et colle, nettoyage des vitres et sols. Devis gratuit sous 24 h.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Devis gratuit sous 24 h"
  },
  "url": "https://ms-nettoyages.com/nettoyage-fin-de-chantier-paris"
}
</script>
```

**Note :** Dupliquer ce bloc pour chaque page de service en adaptant :

- `@id` : URL unique de la page
- `name` : Titre du service
- `serviceType` : Type de service
- `description` : Description spécifique au service
- `url` : URL de la page

Exemples d'URLs à adapter :

- `/nettoyage-maison-paris` → "Nettoyage de maison Paris"
- `/nettoyage-bureau-paris` → "Nettoyage de bureau Paris"
- `/menage-particulier-paris` → "Ménage particulier Paris"
- `/menage-apres-travaux-paris` → "Ménage après travaux Paris"
- `/menage-apres-demenagement-paris` → "Ménage après déménagement Paris"
- `/menage-airbnb-paris` → "Ménage Airbnb Paris"

---

## 📚 Comment implémenter

### Étape 1 : Préparation

1. Télécharger les 3 blocs JSON-LD ci-dessus
2. Adapter les URLs et données si nécessaire (logo, adresse, email)
3. Vérifier que les URLs sont correctes et accessibles

### Étape 2 : Intégration

1. **BLOC 1 (LocalBusiness)** : Coller dans le `<head>` de **TOUTES les pages** (une seule fois, même @id)
2. **BLOC 2 (FAQPage)** : Coller dans le `<head>` de la page `/nettoyage-fin-de-chantier-paris` uniquement
3. **BLOC 3 (Service)** : Coller dans le `<head>` de **chaque page de service**, en adaptant les valeurs

### Étape 3 : Validation

1. **Google Rich Results Test** : https://search.google.com/test/rich-results
   - Coller l'URL complète de chaque page
   - Vérifier qu'aucune erreur n'apparaît
   - Valider que les rich snippets s'affichent correctement

2. **Schema.org Validator** : https://validator.schema.org/
   - Coller le code JSON-LD
   - Vérifier la conformité avec le standard

3. **Google Search Console**
   - Attendre 24-48 h après l'implémentation
   - Consulter l'onglet "Améliorations" pour voir les rich snippets détectés

### Étape 4 : Bonnes pratiques

- ✅ **Ne pas dupliquer le LocalBusiness** : utiliser le même `@id` sur toutes les pages
- ✅ **Adapter le Service par page** : chaque service doit avoir son propre `@id` et `url`
- ✅ **Vérifier les URLs** : s'assurer que toutes les URLs pointent vers des pages existantes
- ✅ **Mettre à jour régulièrement** : si les horaires, téléphone ou adresse changent, mettre à jour le JSON-LD
- ❌ **Éviter les doublons** : ne pas coller le même bloc plusieurs fois sur la même page

### Étape 5 : Suivi

- Consulter Google Search Console chaque semaine pendant 1 mois
- Vérifier que les impressions et clics augmentent
- Analyser le CTR des rich snippets
- Ajuster les descriptions si nécessaire

---

## 📞 Support

Pour toute question sur l'implémentation, consulter :

- Documentation officielle Schema.org : https://schema.org/
- Guide Google Rich Results : https://developers.google.com/search/docs/appearance/structured-data
- Aide Google Search Console : https://support.google.com/webmasters

---

**Document généré le :** 28 juillet 2026  
**Version :** 1.0  
**Domaine :** ms-nettoyages.com
