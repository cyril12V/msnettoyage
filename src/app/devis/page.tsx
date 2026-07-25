import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { faq } from "@/data/faq";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "Devis gratuit", href: "/devis" },
];

/** Questions qui lèvent les freins juste avant l'envoi du formulaire. */
const faqDevis = faq.filter((item) => item.categorie === "Devis et tarifs");

const garanties: readonly { icon: IconName; titre: string; texte: string }[] = [
  {
    icon: "document",
    titre: "Devis détaillé",
    texte: "Chaque ligne est chiffrée : vous savez ce qui est inclus et ce qui ne l'est pas.",
  },
  {
    icon: "bolt",
    titre: `Réponse sous ${site.delaiReponse}`,
    texte: "Jours ouvrés. Pour une urgence, l'appel téléphonique reste le plus rapide.",
  },
  {
    icon: "shield",
    titre: "Sans engagement",
    texte:
      "Le devis est gratuit et ne vous engage à rien. Aucun frais de déplacement pour l'établir.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Devis gratuit de nettoyage",
  description: `Demandez un devis gratuit et sans engagement à ${site.name}. Réponse sous ${site.delaiReponse} pour toute intervention de nettoyage en Île-de-France et à ${site.address.city}.`,
  path: "/devis",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Devis gratuit"
        title="Demandez votre devis de nettoyage"
        lede={`Décrivez votre besoin en quelques lignes : ${site.name} vous transmet un devis gratuit, détaillé et sans engagement sous ${site.delaiReponse}. Pour une demande urgente, appelez le ${site.contact.phoneDisplay}.`}
        breadcrumbs={fil}
      />

      <Section tone="white" spacing="compact">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-3">
            {garanties.map((garantie) => (
              <li
                key={garantie.titre}
                className="border-line flex flex-col gap-2.5 rounded-xl border p-6"
              >
                <Icon name={garantie.icon} className="text-brand size-6" />
                <h2 className="text-ink text-sm font-semibold tracking-[0.02em] uppercase">
                  {garantie.titre}
                </h2>
                <p className="text-muted text-sm leading-relaxed">{garantie.texte}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis titre="Parlons de votre besoin" />

      <FaqSection
        items={faqDevis}
        eyebrow="Avant d'envoyer"
        titre="Devis et tarifs : ce qu'il faut savoir"
        avecLienGlobal
        tone="surface"
      />

      <JsonLd data={[faqJsonLd(faqDevis), breadcrumbJsonLd(fil)]} />
    </>
  );
}
