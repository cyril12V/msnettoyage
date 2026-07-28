import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués à toutes les routes.
 *
 * La CSP autorise `'unsafe-inline'` sur `script-src` : Next.js injecte des
 * scripts inline (flight data, bootstrap) et la seule alternative propre est un
 * nonce par requête, ce qui rendrait toutes les pages dynamiques et supprimerait
 * le rendu statique — inacceptable pour un site vitrine dont la performance est
 * un critère de référencement. Le site ne gère ni session ni compte utilisateur :
 * la seule entrée utilisateur est le formulaire de devis, dont le contenu n'est
 * jamais réaffiché côté client.
 */
const enDeveloppement = process.env.NODE_ENV === "development";

/**
 * `'unsafe-eval'` est ajouté au seul environnement de développement : React s'en
 * sert pour reconstituer les piles d'appel dans l'overlay d'erreur. Le build de
 * production n'appelle jamais `eval`, la directive n'y est donc pas émise.
 */
const scriptSrc = enDeveloppement
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 restreint `qualities` à [75] par défaut ; 85 sert aux visuels hero.
    qualities: [75, 85],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /**
   * Redirections permanentes.
   *
   * Trois familles :
   *  - les adresses de sections, qui ramènent à l'ancre correspondante de la
   *    page d'accueil. L'ancre n'est jamais transmise au serveur, c'est la
   *    redirection qui la réintroduit ;
   *  - les anciennes URLs de prestation, suffixées par la ville. Elles ont été
   *    dégéolocalisées pour pouvoir remonter ailleurs qu'à Meaux : une URL
   *    `/nettoyage-maison-meaux` annonce d'elle-même qu'elle ne parle pas de
   *    Paris. Le 301 transmet à la nouvelle URL le peu d'historique acquis et
   *    évite de casser un lien déjà partagé ;
   *  - les anciennes adresses génériques, conservées pour la même raison.
   *
   * `/meaux` pointe désormais sur `/nettoyage-meaux`. La page d'accueil visait
   * « société de nettoyage à Meaux » et interdisait donc une page Meaux ; elle
   * vise désormais Paris et l'Île-de-France, ce qui rend la page de ville non
   * seulement possible mais nécessaire, faute de quoi la requête serait
   * abandonnée.
   */
  async redirects() {
    const versAncre = (source: string, ancre: string) => ({
      source,
      destination: `/#${ancre}`,
      permanent: true,
    });

    const anciennePrestation = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });

    return [
      anciennePrestation("/nettoyage-maison-meaux", "/nettoyage-maison"),
      anciennePrestation("/nettoyage-bureau-meaux", "/nettoyage-bureau"),
      anciennePrestation("/menage-particulier-meaux", "/menage-particulier"),
      anciennePrestation("/menage-apres-travaux-meaux", "/nettoyage-fin-de-chantier"),
      anciennePrestation("/menage-apres-travaux", "/nettoyage-fin-de-chantier"),
      anciennePrestation("/menage-apres-demenagement-meaux", "/menage-apres-demenagement"),
      anciennePrestation("/menage-airbnb-meaux", "/menage-airbnb"),

      versAncre("/services", "prestations"),
      versAncre("/services/:slug", "prestations"),
      versAncre("/nos-services", "prestations"),
      versAncre("/prestations", "prestations"),
      versAncre("/univers", "univers"),
      versAncre("/realisations", "realisations"),
      versAncre("/cas-clients", "cas"),
      versAncre("/a-propos", "apropos"),
      versAncre("/faq", "faq"),
      versAncre("/devis", "contact"),
      versAncre("/contact", "contact"),
      { source: "/meaux", destination: "/nettoyage-meaux", permanent: true },
      { source: "/paris", destination: "/nettoyage-paris", permanent: true },
      { source: "/zones-d-intervention", destination: "/#villes", permanent: true },
      { source: "/zones-d-intervention/:slug", destination: "/#villes", permanent: true },
    ];
  },
};

export default nextConfig;
