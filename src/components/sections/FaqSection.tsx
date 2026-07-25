import type { FaqItem } from "@/data/faq";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

type FaqSectionProps = {
  items: readonly FaqItem[];
  titre?: string;
  eyebrow?: string;
  description?: string;
  /** Affiche le lien vers la page FAQ complète. */
  avecLienGlobal?: boolean;
  tone?: "white" | "surface";
};

/**
 * Accordéon de questions fréquentes.
 *
 * Construit sur `<details>` natif : le comportement d'ouverture, la navigation
 * clavier et l'exposition aux lecteurs d'écran sont assurés par le navigateur,
 * sans une ligne de JavaScript. Le contenu des réponses reste présent dans le
 * HTML même replié, donc lisible par les moteurs et les IA.
 */
export function FaqSection({
  items,
  titre = "Questions fréquentes",
  eyebrow = "FAQ",
  description,
  avecLienGlobal = true,
  tone = "surface",
}: FaqSectionProps) {
  return (
    <Section tone={tone} id="faq">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={titre} description={description} />

        <div className="divide-line border-line mt-10 divide-y rounded-xl border bg-white">
          {items.map((item) => (
            <details key={item.question} className="group px-5 sm:px-6">
              <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[0.95rem] font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-[0.95rem] font-semibold">{item.question}</h3>
                <Icon
                  name="plus"
                  className="text-brand size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="text-muted pb-5 text-sm leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>

        {avecLienGlobal ? (
          <div className="mt-8">
            <Button href="/faq" variant="secondary" icon="arrowRight">
              Toutes les questions
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
