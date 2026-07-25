import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { faq, faqCategories } from "@/data/faq";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "FAQ", href: "/faq" },
];

export const metadata: Metadata = buildMetadata({
  title: "Questions fréquentes",
  description: `Tarifs, délais, zones couvertes, garanties, matériel fourni : les réponses aux questions les plus posées à ${site.name}.`,
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        lede={`Les réponses aux ${faq.length} questions les plus posées à ${site.name} : prestations, tarifs, délais, organisation et garanties. Si la vôtre n'y figure pas, appelez-nous au ${site.contact.phoneDisplay}.`}
        breadcrumbs={fil}
      />

      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-14">
            {faqCategories.map((categorie) => {
              const questions = faq.filter((item) => item.categorie === categorie);

              if (questions.length === 0) return null;

              return (
                <div key={categorie}>
                  <h2 className="text-brand text-xs font-bold tracking-[0.14em] uppercase">
                    {categorie}
                  </h2>

                  <div className="divide-line border-line mt-5 divide-y rounded-xl border">
                    {questions.map((item) => (
                      <details key={item.question} className="group px-5 sm:px-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                          <h3 className="text-ink text-[0.95rem] font-semibold">{item.question}</h3>
                          <Icon
                            name="plus"
                            className="text-brand size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                          />
                        </summary>
                        <p className="text-muted pb-5 text-sm leading-relaxed">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaDevis titre="Votre question n'a pas de réponse ici ?" />

      <JsonLd data={[faqJsonLd(faq), breadcrumbJsonLd(fil)]} />
    </>
  );
}
