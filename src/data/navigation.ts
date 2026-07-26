export type NavLink = {
  href: string;
  label: string;
};

/**
 * Navigation principale.
 *
 * Le site tient sur une seule page : chaque entrée pointe vers une ancre.
 * Les liens sont écrits en absolu (`/#services` et non `#services`) afin de
 * fonctionner aussi depuis la page Meaux et les pages légales.
 */
export const mainNav: readonly NavLink[] = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#services", label: "Nos services" },
  { href: "/#univers", label: "Nos univers" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#cas", label: "Cas clients" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Navigation du pied de page, complétée des pages autonomes. */
export const footerNav: readonly NavLink[] = [
  { href: "/#services", label: "Nos services" },
  { href: "/#univers", label: "Nos univers" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#cas", label: "Cas clients" },
  { href: "/#faq", label: "Questions fréquentes" },
  { href: "/meaux", label: "Nettoyage à Meaux" },
  { href: "/#contact", label: "Demander un devis" },
] as const;

/** Liens légaux du pied de page. */
export const legalNav: readonly NavLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
] as const;
