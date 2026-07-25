import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";

type ServicesGridProps = {
  /** Masque l'en-tête quand la section est utilisée sous un titre de page. */
  avecEntete?: boolean;
  /** Affiche le bouton vers la page listant toutes les prestations. */
  avecLienGlobal?: boolean;
  tone?: "white" | "surface";
};

export function ServicesGrid({
  avecEntete = true,
  avecLienGlobal = true,
  tone = "surface",
}: ServicesGridProps) {
  return (
    <Section tone={tone} id="services" ariaLabel={avecEntete ? undefined : "Nos prestations"}>
      <Container>
        {avecEntete ? (
          <SectionHeading
            eyebrow="Notre expertise"
            title={
              <>
                Nous nettoyons
                <br />
                tout votre <span className="text-brand">quotidien</span>
              </>
            }
            description="Sept prestations, du passage hebdomadaire au chantier ponctuel. Chacune fait l'objet d'un devis détaillé : vous savez exactement ce qui est inclus avant de vous engager."
          />
        ) : null}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <FeatureCard
              key={service.slug}
              icon={service.icon}
              title={service.shortName}
              description={service.lede}
              href={`/services/${service.slug}`}
              linkLabel={`Découvrir ${service.shortName.toLowerCase()}`}
            />
          ))}
        </div>

        {avecLienGlobal ? (
          <div className="mt-10">
            <Button href="/services" variant="secondary" icon="arrowRight">
              Voir toutes les prestations
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
