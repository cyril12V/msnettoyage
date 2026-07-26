import { landings } from "@/data/landings";

export type NavLink = {
  href: string;
  label: string;
};

/**
 * Navigation principale.
 *
 * La page d'accueil concentre la vitrine, chaque entrée pointe donc vers une
 * ancre. Les liens sont écrits en absolu (`/#services` et non `#services`) afin
 * de fonctionner aussi depuis les pages d'atterrissage et les pages légales.
 */
export const mainNav: readonly NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/#prestations-meaux", label: "Nos prestations" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Prestations locales du pied de page.
 *
 * Dérivées de `landings.ts` : ajouter une page d'atterrissage la fait
 * apparaître ici automatiquement. Ces liens présents sur toutes les pages
 * garantissent que Google atteint chacune d'elles.
 */
export const prestationsNav: readonly NavLink[] = landings.map((landing) => ({
  href: `/${landing.slug}`,
  label: landing.requete,
}));

/** Navigation générale du pied de page. */
export const footerNav: readonly NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/#univers", label: "Nos univers" },
  { href: "/#cas", label: "Cas clients" },
  { href: "/#zones", label: "Zones d'intervention" },
  { href: "/#faq", label: "Questions fréquentes" },
  { href: "/#contact", label: "Demander un devis" },
] as const;

/** Liens légaux du pied de page. */
export const legalNav: readonly NavLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
] as const;
