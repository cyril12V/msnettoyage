export type NavLink = {
  href: string;
  label: string;
};

/**
 * Navigation principale — reprise à l'identique de la maquette.
 *
 * Deux entrées pointent vers des ancres de la page d'accueil : les univers
 * d'intervention et les cas clients n'ont pas de page dédiée, ils illustrent
 * l'offre plutôt qu'ils ne la décrivent.
 */
export const mainNav: readonly NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/#univers", label: "Nos univers" },
  { href: "/a-propos", label: "À propos" },
  { href: "/#cas", label: "Cas clients" },
  { href: "/devis", label: "Contact" },
] as const;

/**
 * Navigation du pied de page.
 *
 * Plus complète que l'en-tête : elle expose les zones d'intervention et la FAQ,
 * deux pages importantes pour le référencement local qui alourdiraient une barre
 * de navigation déjà remplie.
 */
export const footerNav: readonly NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/zones-d-intervention", label: "Zones d'intervention" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/devis", label: "Demander un devis" },
] as const;

/** Liens légaux du pied de page. */
export const legalNav: readonly NavLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
] as const;
