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

  async redirects() {
    return [
      { source: "/contact", destination: "/devis", permanent: true },
      { source: "/nos-services", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
