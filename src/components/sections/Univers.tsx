import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { univers } from "@/data/univers";

/**
 * Section « Nos univers d'intervention ».
 *
 * Six vignettes qui répondent à la question « est ce que vous intervenez chez
 * moi ? », là où la section prestations répond à « que faites-vous ? ».
 */
export function Univers() {
  return (
    <Section id="univers" tone="surface">
      <Container>
        <SectionHeading
          title="Nos univers d'intervention"
          description="Particuliers comme professionnels : nous adaptons le protocole, le matériel et les horaires au type de lieu, pas l'inverse."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {univers.map((item) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-line bg-white"
            >
              <MediaSlot
                alt={item.photo}
                src={item.src}
                className="aspect-16/9 w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <Icon name={item.icon} className="size-6 text-brand" />
                <h3 className="text-lg font-semibold text-ink">{item.titre}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.accroche}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
