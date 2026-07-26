import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { hasTemoignages, temoignages, temoignagesSontDeDemonstration } from "@/data/temoignages";

/**
 * Section « Ils nous font confiance ».
 *
 * La section disparaît si `data/temoignages.ts` est vide. Tant que le tableau
 * contient les avis de démonstration repris de la maquette, un bandeau visible
 * uniquement en développement rappelle qu'ils doivent être remplacés par de
 * vrais avis avant la mise en ligne.
 */
export function Temoignages() {
  if (!hasTemoignages) return null;

  const afficherAvertissement =
    temoignagesSontDeDemonstration && process.env.NODE_ENV === "development";

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {afficherAvertissement ? (
          <p className="border-danger/30 bg-danger/5 text-danger mb-8 rounded-lg border px-4 py-3 text-sm">
            Avis de démonstration repris de la maquette. À remplacer par de vrais avis clients dans{" "}
            <code>src/data/temoignages.ts</code> avant la mise en ligne.
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,26%)_minmax(0,74%)] lg:gap-12">
          <div className="flex flex-col gap-5">
            <p className="text-brand text-xs font-bold tracking-[0.16em] uppercase">Avis clients</p>
            <h2 className="text-ink text-3xl leading-[1.08] font-bold tracking-tight uppercase sm:text-4xl">
              Ils nous font
              <br />
              confiance
            </h2>
            <Button href="/devis" variant="secondary" icon="arrowRight" className="self-start">
              Demander un devis
            </Button>
          </div>

          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {temoignages.map((avis) => (
              <li
                key={`${avis.auteur}-${avis.citation.slice(0, 24)}`}
                className="border-line flex flex-col gap-4 border-l pl-6"
              >
                <Icon name="quote" className="text-brand size-7" />

                <blockquote className="text-ink-soft text-sm leading-relaxed">
                  {avis.citation}
                </blockquote>

                <div className="mt-auto">
                  {avis.note ? (
                    <p
                      className="text-brand mb-2 flex items-center gap-0.5"
                      aria-label={`Note : ${avis.note} sur 5`}
                    >
                      {Array.from({ length: avis.note }, (_, index) => (
                        <Icon key={index} name="star" className="size-3.5" />
                      ))}
                    </p>
                  ) : null}
                  <p className="text-ink text-sm font-semibold">{avis.auteur}</p>
                  <p className="text-muted-light text-xs">
                    {avis.contexte}
                    {avis.source ? ` · ${avis.source}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
