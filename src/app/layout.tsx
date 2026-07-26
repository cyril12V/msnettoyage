import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { entrepriseJsonLd } from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}, nettoyage professionnel en Île-de-France et à Meaux`,
    // Chaque page fournit son titre court ; le suffixe assure la cohérence en SERP.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "entreprise de nettoyage",
    "société de nettoyage Île-de-France",
    "nettoyage Meaux",
    "nettoyage de bureaux",
    "ménage Airbnb",
    "remise en état après travaux",
    "nettoyage fin de chantier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name}, nettoyage professionnel en Île-de-France`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b4edb",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-scroll-behavior` demande à Next.js de neutraliser le défilement
    // doux le temps d'une navigation, pour que le changement de page reste
    // instantané tout en gardant le glissement sur les ancres de la page unique.
    <html
      lang={site.lang}
      data-scroll-behavior="smooth"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="focus:bg-brand sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>

        <Header />

        <main id="contenu" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileCallBar />

        <JsonLd data={entrepriseJsonLd()} />
      </body>
    </html>
  );
}
