import { landings } from "@/data/landings";
import { villes } from "@/data/villes";

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
  { href: "/#prestations", label: "Nos prestations" },
  { href: "/#villes", label: "Nos villes" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Prestations du pied de page.
 *
 * Dérivées de `landings.ts` : ajouter une page de prestation la fait apparaître
 * ici automatiquement. Ces liens présents sur toutes les pages garantissent que
 * Google atteint chacune d'elles.
 */
export const prestationsNav: readonly NavLink[] = landings.map((landing) => ({
  href: `/${landing.slug}`,
  label: landing.libelleCourt,
}));

/**
 * Villes du pied de page.
 *
 * Même rôle que ci-dessus pour les pages villes : sans lien depuis toutes les
 * pages, une page ville reste à deux clics de l'accueil et se fait explorer
 * rarement. Le texte du lien est la requête visée, pas le nom de ville seul.
 */
export const villesNav: readonly NavLink[] = villes.map((ville) => ({
  href: `/${ville.slug}`,
  label: `Nettoyage à ${ville.nom}`,
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
