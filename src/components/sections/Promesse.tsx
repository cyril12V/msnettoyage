import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

const piliers: readonly { icon: IconName; titre: string; texte: string }[] = [
  {
    icon: "shield",
    titre: "Discrétion",
    texte:
      "Nous travaillons dans vos espaces sans perturber votre activité, vos équipes ou vos clients. Rien n'est déplacé sans raison, rien n'est laissé en désordre.",
  },
  {
    icon: "bolt",
    titre: "Réactivité",
    texte:
      "Devis sous 24 h, créneau confirmé par écrit et délais tenus. Si nous ne pouvons pas intervenir dans les temps, nous le disons avant, pas après.",
  },
  {
    icon: "sliders",
    titre: "Flexibilité",
    texte:
      "Horaires adaptés à votre activité, prestations à la carte, fréquence ajustable en cours de contrat sans repasser par une négociation.",
  },
  {
    icon: "trophy",
    titre: "Exigence",
    texte:
      "Contrôles qualité réguliers et engagement de réintervention gratuite si le résultat ne correspond pas à ce qui a été convenu.",
  },
];

export function Promesse() {
  return (
    <Section tone="white" id="apropos" className="scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Notre promesse"
          title="Ce sur quoi vous pouvez compter"
          align="center"
          description="Quatre engagements écrits dans chaque devis. Ce ne sont pas des slogans : ce sont les critères sur lesquels vous pouvez nous tenir."
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {piliers.map((pilier, index) => (
            <li
              key={pilier.titre}
              className={
                index > 0
                  ? "lg:border-line flex flex-col items-center gap-3.5 px-2 text-center lg:border-l lg:pl-8"
                  : "flex flex-col items-center gap-3.5 px-2 text-center"
              }
            >
              <Icon name={pilier.icon} className="text-brand size-8" />
              <h3 className="text-ink text-base font-semibold tracking-[0.04em] uppercase">
                {pilier.titre}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{pilier.texte}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
