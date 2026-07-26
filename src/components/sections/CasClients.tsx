import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { casClients } from "@/data/cas-clients";

/**
 * Section « Cas clients ».
 *
 * Trois missions décrites avec des chiffres concrets. Les données viennent de
 * `data/cas-clients.ts`, où figure l'avertissement sur le caractère provisoire
 * des exemples repris de la maquette.
 */
export function CasClients() {
  return (
    <Section id="cas" tone="surface">
      <Container>
        <SectionHeading
          title="Des missions, des résultats"
          description="Trois interventions représentatives de ce que nous faisons au quotidien, avec le format et les délais réellement pratiqués."
        />

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {casClients.map((cas) => (
            <li
              key={cas.id}
              className="border-line grid grid-cols-[minmax(0,34%)_minmax(0,66%)] overflow-hidden rounded-xl border bg-white"
            >
              <MediaSlot
                alt={cas.photo}
                src={cas.src}
                className="h-full min-h-48 w-full"
                sizes="(max-width: 1024px) 34vw, 12vw"
              />

              <div className="flex flex-col gap-2.5 p-5">
                <h3 className="text-ink text-base leading-snug font-semibold">{cas.titre}</h3>
                <p className="text-muted text-sm leading-relaxed">{cas.description}</p>

                <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4">
                  {cas.chiffres.map((chiffre) => (
                    <div key={chiffre.libelle} className="flex flex-col">
                      <dd className="text-brand text-xl leading-none font-bold">
                        {chiffre.valeur}
                      </dd>
                      <dt className="text-muted-light mt-1 text-xs">{chiffre.libelle}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
