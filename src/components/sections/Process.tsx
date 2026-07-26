import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/site";

const etapes: readonly { titre: string; texte: string }[] = [
  {
    titre: "Vous décrivez votre besoin",
    texte:
      "Par téléphone, par email ou via le formulaire : surface, type de local, fréquence souhaitée et délai. Quelques minutes suffisent.",
  },
  {
    titre: "Nous chiffrons",
    texte: `Vous recevez un devis détaillé sous ${site.delaiReponse}, gratuit et sans engagement. Pour les grandes surfaces, une visite préalable gratuite précise le chiffrage.`,
  },
  {
    titre: "Nous intervenons",
    texte:
      "Créneau confirmé par écrit, équipe attitrée, matériel et produits fournis. Vous n'avez rien à préparer.",
  },
  {
    titre: "Vous validez",
    texte:
      "Un point est fait après la première intervention. Si un détail ne convient pas, nous repassons gratuitement sous 48 h.",
  },
];

export function Process() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeading
          title="De la demande à l'intervention, en quatre étapes"
          description="Aucun engagement avant la signature du devis, aucun frais de déplacement pour l'établir."
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {etapes.map((etape, index) => (
            <li
              key={etape.titre}
              className="border-line flex flex-col gap-3 rounded-xl border bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="bg-brand inline-flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className="text-ink text-base font-semibold">{etape.titre}</h3>
              <p className="text-muted text-sm leading-relaxed">{etape.texte}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
