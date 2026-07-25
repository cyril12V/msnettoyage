import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { hasTemoignages, temoignages } from "@/data/temoignages";

/**
 * Avis clients.
 *
 * La section ne se rend pas tant qu'aucun avis réel n'a été saisi dans
 * `src/data/temoignages.ts`. Aucun témoignage n'est généré ou inventé.
 */
export function Temoignages() {
  if (!hasTemoignages) return null;

  return (
    <Section tone="surface">
      <Container>
        <SectionHeading eyebrow="Avis clients" title="Ils nous font confiance" />

        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {temoignages.map((avis) => (
            <li
              key={`${avis.auteur}-${avis.citation.slice(0, 24)}`}
              className="border-line flex flex-col gap-4 border-l pl-6"
            >
              <Icon name="quote" className="text-brand size-7" />
              <blockquote className="text-ink-soft text-sm leading-relaxed">
                {avis.citation}
              </blockquote>
              <div>
                <p className="text-ink text-sm font-semibold">{avis.auteur}</p>
                <p className="text-muted-light text-xs">{avis.contexte}</p>
                {avis.note ? (
                  <p
                    className="text-brand mt-1.5 flex items-center gap-1"
                    aria-label={`Note : ${avis.note} sur 5`}
                  >
                    {Array.from({ length: avis.note }, (_, index) => (
                      <Icon key={index} name="star" className="size-3.5" />
                    ))}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
