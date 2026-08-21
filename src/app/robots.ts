import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * robots.txt.
 *
 * Les crawlers des moteurs génératifs (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended…) sont explicitement autorisés : les bloquer rendrait
 * l'entreprise invisible dans les réponses de ChatGPT, Claude, Perplexity et
 * Google AI Overviews, où se déplace une part croissante des recherches
 * « entreprise de nettoyage près de chez moi ».
 *
 * Seule `/api/` est interdite : elle ne contient aucun contenu indexable.
 */
export default function robots(): MetadataRoute.Robots {
  const crawlersIA = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "meta-externalagent",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...crawlersIA.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Pas de directive `host`. Elle n'est comprise que par Yandex : Google et
    // Bing l'ignorent, et une ligne inconnue dans un robots.txt n'apporte rien
    // qu'un doute au lecteur qui l'inspecte. Le domaine canonique est deja
    // porte par les balises `canonical` de chaque page.
  };
}
