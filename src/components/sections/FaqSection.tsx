import type { FaqItem } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

type FaqSectionProps = {
  items: readonly FaqItem[];
  titre?: string;
  description?: string;
  tone?: "white" | "surface";
};

/**
 * Accordéon de questions fréquentes.
 *
 * Construit sur `<details>` natif : le comportement d'ouverture, la navigation
 * clavier et l'exposition aux lecteurs d'écran sont assurés par le navigateur,
 * sans une ligne de JavaScript. Le contenu des réponses reste présent dans le
 * HTML même replié, donc lisible par les moteurs et les assistants.
 */
export function FaqSection({ items, titre = "Questions fréquentes", description, tone = "surface" }: FaqSectionProps) {
  return (
    <Section id="faq" tone={tone}>
      <Container>
        <SectionHeading title={titre} description={description} />

        <div className="mt-10 divide-y divide-line rounded-xl border border-line bg-white">
          {items.map((item) => (
            <details key={item.question} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[0.95rem] font-medium text-ink">{item.question}</h3>
                <Icon
                  name="plus"
                  className="size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
