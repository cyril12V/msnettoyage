/**
 * FAQ du site.
 *
 * Les questions sont formulées telles qu'un visiteur les poserait à un moteur
 * de recherche ou à un assistant IA, et chaque réponse est autonome : elle se
 * comprend sans le reste de la page. C'est la condition pour être extraite et
 * citée (JSON-LD `FAQPage` + optimisation GEO).
 */

export type FaqItem = {
  question: string;
  answer: string;
  /** Regroupement affiché sur la page /faq. */
  categorie: "Prestations" | "Devis et tarifs" | "Organisation" | "Garanties";
};

export const faq: readonly FaqItem[] = [
  {
    question: "Dans quelles villes MS Nettoyage intervient-il ?",
    answer:
      "MS Nettoyage est basée à Meaux (77100) et intervient dans toute l'Île-de-France : Seine-et-Marne, Paris, Seine-Saint-Denis, Val-de-Marne, Hauts-de-Seine, Val-d'Oise, Essonne et Yvelines. Les délais les plus courts sont sur Meaux et le nord de la Seine-et-Marne.",
    categorie: "Organisation",
  },
  {
    question: "Combien coûte une prestation de nettoyage ?",
    answer:
      "Le prix dépend de la surface, du type de prestation et de la fréquence : un entretien régulier ne se chiffre pas comme une remise en état après travaux. MS Nettoyage établit un devis gratuit et sans engagement, transmis sous 24 h après la demande. Aucun tarif n'est facturé avant acceptation écrite du devis.",
    categorie: "Devis et tarifs",
  },
  {
    question: "Sous quel délai puis-je obtenir un devis ?",
    answer:
      "Sous 24 h après réception de votre demande, jours ouvrés. Pour les prestations simples, le devis est établi à distance à partir des informations transmises. Pour les grandes surfaces et les sites industriels, une visite préalable gratuite est nécessaire pour chiffrer correctement.",
    categorie: "Devis et tarifs",
  },
  {
    question: "Faut-il fournir les produits et le matériel ?",
    answer:
      "Non. MS Nettoyage vient avec son propre matériel et ses produits professionnels, adaptés à chaque type de support. Si vous souhaitez que des produits spécifiques soient utilisés (allergies, label écologique, protocole interne), il suffit de le préciser lors de la demande de devis.",
    categorie: "Prestations",
  },
  {
    question:
      "Quelle est la différence entre un nettoyage de fin de chantier et une remise en état ?",
    answer:
      "Le nettoyage de fin de chantier est la première passe : il évacue les résidus et dégage les surfaces juste après le départ des corps de métier. La remise en état après travaux vient ensuite et rend le local livrable : retrait des traces de peinture et de colle, dépoussiérage fin, vitrerie, lavage des sols en plusieurs passes.",
    categorie: "Prestations",
  },
  {
    question: "Peut-on intervenir en dehors des heures d'ouverture ?",
    answer:
      "Oui, c'est même la règle pour les bureaux et les commerces : l'intervention a lieu avant l'ouverture ou après la fermeture, afin de ne gêner ni les équipes ni la clientèle. Les accès, codes et consignes de sécurité sont formalisés au démarrage du contrat.",
    categorie: "Organisation",
  },
  {
    question: "Le personnel est-il déclaré et assuré ?",
    answer:
      "Oui. Tous les intervenants de MS Nettoyage sont déclarés et l'entreprise est couverte par une assurance responsabilité civile professionnelle. L'attestation d'assurance et les justificatifs de déclaration sont transmis sur simple demande.",
    categorie: "Garanties",
  },
  {
    question: "Que se passe-t-il si le résultat ne me convient pas ?",
    answer:
      "Signalez-le dans les 48 h suivant l'intervention : MS Nettoyage repasse gratuitement sur les points concernés. Cet engagement de réintervention s'applique à toutes les prestations, sans condition de montant.",
    categorie: "Garanties",
  },
  {
    question: "Y a-t-il une durée d'engagement sur un contrat d'entretien ?",
    answer:
      "Non. Les contrats d'entretien régulier sont sans durée minimale et résiliables avec un préavis d'un mois. La fréquence des passages peut être modifiée en cours de contrat pour s'adapter à votre activité.",
    categorie: "Devis et tarifs",
  },
  {
    question: "Intervenez-vous pour des particuliers ou uniquement pour des professionnels ?",
    answer:
      "Les deux. MS Nettoyage travaille pour des particuliers (grand ménage, remise en état après travaux, ménage de location saisonnière) comme pour des professionnels : bureaux, commerces, copropriétés, entrepôts et locaux techniques.",
    categorie: "Prestations",
  },
  {
    question: "Combien de temps dure une intervention de nettoyage en profondeur ?",
    answer:
      "Entre 2 et 6 heures pour un logement de type T3, selon l'état de départ et le nombre de pièces d'eau. Une remise en état après travaux sur 120 m² représente en général une journée complète d'intervention.",
    categorie: "Prestations",
  },
  {
    question: "Comment se passe une rotation de ménage Airbnb ?",
    answer:
      "L'intervention est planifiée entre le check-out et le check-in à partir de votre calendrier de réservation. Elle comprend le nettoyage complet du logement, le changement du linge, le réassort des consommables et un compte rendu photo horodaté après chaque rotation.",
    categorie: "Prestations",
  },
] as const;

/** Sous-ensemble affiché sur la page d'accueil : les questions les plus fréquentes. */
export const faqAccueil = faq.slice(0, 6);

/** Catégories dans l'ordre d'affichage de la page /faq. */
export const faqCategories = [
  "Prestations",
  "Devis et tarifs",
  "Organisation",
  "Garanties",
] as const;
