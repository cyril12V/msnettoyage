import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { garanties } from "@/data/garanties";
import { site } from "@/lib/site";

/**
 * Engagements de l'entreprise, identiques sur chaque page de prestation.
 *
 * Le bloc est volontairement le même partout, comme un pied de page : ce sont
 * les engagements de l'entreprise, pas ceux d'une prestation. Le contenu propre
 * à chaque page est ailleurs, et c'est lui que protègent les tests d'unicité.
 */
export function GarantiesSection({ tone }: { tone: "white" | "surface" }) {
  return (
    <Section id="garanties" tone={tone}>
      <Container>
        <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">Nos garanties</h2>
        <p className="text-muted mt-4 max-w-3xl leading-relaxed">
          {`Ce que ${site.name} s'engage à tenir sur chaque intervention, quelle que soit la prestation et quel que soit son montant.`}
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {garanties.map((garantie) => (
            <li key={garantie.titre} className="border-line rounded-xl border bg-white p-6">
              <h3 className="text-ink flex items-start gap-2.5 text-[0.95rem] font-semibold">
                <Icon name="shield" className="text-brand mt-0.5 size-5 shrink-0" />
                {garantie.titre}
              </h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{garantie.texte}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
