import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
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
    <section id="cas" className="scroll-mt-20 bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Cas clients</p>
          <h2 className="text-3xl leading-[1.05] font-bold tracking-tight text-ink uppercase sm:text-4xl">
            Des missions, des résultats
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted">
            Trois interventions représentatives de ce que nous faisons au quotidien, avec le format
            et les délais réellement pratiqués.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {casClients.map((cas) => (
            <li key={cas.id}>
              <Link
                href={`/services/${cas.service}`}
                className="grid h-full grid-cols-[minmax(0,34%)_minmax(0,66%)] overflow-hidden rounded-xl border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <MediaSlot
                  alt={cas.photo}
                  src={cas.src}
                  className="h-full min-h-44 w-full"
                  sizes="(max-width: 1024px) 34vw, 12vw"
                />

                <span className="flex flex-col gap-2.5 p-5">
                  <span className="text-[0.95rem] leading-tight font-semibold tracking-[0.02em] text-ink uppercase">
                    {cas.titre}
                  </span>
                  <span className="text-[0.82rem] leading-relaxed text-muted">{cas.description}</span>

                  <span className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4">
                    {cas.chiffres.map((chiffre) => (
                      <span key={chiffre.libelle} className="flex flex-col">
                        <span className="text-xl leading-none font-bold text-brand">
                          {chiffre.valeur}
                        </span>
                        <span className="mt-1 text-[0.68rem] text-muted-light">
                          {chiffre.libelle}
                        </span>
                      </span>
                    ))}
                  </span>

                  <span className="inline-flex items-center gap-1.5 pt-3 text-[0.68rem] font-semibold tracking-[0.06em] text-brand uppercase">
                    Voir la prestation
                    <Icon name="arrowRight" className="size-3.5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
