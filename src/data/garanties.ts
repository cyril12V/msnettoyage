/**
 * Engagements de l'entreprise, affichés sur chaque page de prestation.
 *
 * Chacun reprend un engagement déjà publié ailleurs sur le site, dans la FAQ
 * ou dans les pages, et déjà tenu par l'entreprise. Aucun n'a été créé pour la
 * section : une garantie affichée est un engagement commercial opposable, et
 * « garantie sans réserve » ou « conformité 100 % », suggérés par l'audit de
 * septembre 2026, promettraient ce que personne n'a validé.
 *
 * Toute nouvelle garantie doit être confirmée par le client avant d'être
 * ajoutée ici.
 */

export type Garantie = {
  titre: string;
  texte: string;
};

export const garanties: readonly Garantie[] = [
  {
    titre: "Réintervention gratuite sous 48 h",
    texte:
      "Un point vous semble mal traité ? Signalez-le dans les 48 h suivant l'intervention, par téléphone, par message ou par courriel : nous repassons gratuitement sur les points concernés. L'engagement s'applique à toutes les prestations, sans condition de montant.",
  },
  {
    titre: "Un prix ferme, annoncé avant l'intervention",
    texte:
      "Le prix inscrit au devis est celui qui est facturé. Les contraintes connues, étage, accès, surface réelle, sont chiffrées dès le départ, jamais ajoutées après coup. Aucune somme n'est due avant votre acceptation écrite du devis.",
  },
  {
    titre: "Un créneau confirmé par écrit, et tenu",
    texte:
      "La date, l'heure d'arrivée et le périmètre de l'intervention vous sont confirmés par écrit. Quand une échéance est imposée, état des lieux, réception de travaux ou arrivée d'un voyageur, nous planifions pour la tenir. Un imprévu de notre fait vous est signalé avant, jamais découvert sur place.",
  },
  {
    titre: "Des intervenants déclarés et assurés",
    texte:
      "Tous nos intervenants sont déclarés, et l'entreprise est couverte par une assurance responsabilité civile professionnelle. L'attestation d'assurance vous est transmise sur simple demande, avant la signature du devis.",
  },
  {
    titre: "Des photos de fin d'intervention, sur demande",
    texte:
      "À la fin de l'intervention, nous pouvons vous transmettre des photos des pièces traitées. Elles datent l'état des lieux à notre départ et vous protègent en cas de désaccord ultérieur avec un bailleur, un locataire ou un voyageur.",
  },
] as const;
