export type NavLink = {
  href: string;
  label: string;
};

/** Navigation principale — reprise à l'identique dans le header et le pied de page. */
export const mainNav: readonly NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/zones-d-intervention", label: "Zones d'intervention" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
] as const;

/** Liens légaux du pied de page. */
export const legalNav: readonly NavLink[] = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
] as const;
