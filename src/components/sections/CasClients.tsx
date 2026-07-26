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
    <section id="cas" className="bg-surface scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-brand text-xs font-bold tracking-[0.16em] uppercase">Cas clients</p>
          <h2 className="text-ink text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-4xl">
            Des missions, des résultats
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed">
            Trois interventions représentatives de ce que nous faisons au quotidien, avec le format
            et les délais réellement pratiqués.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {casClients.map((cas) => (
            <li key={cas.id}>
              <Link
                href={`/services/${cas.service}`}
                className="border-line hover:border-brand/40 hover:shadow-card grid h-full grid-cols-[minmax(0,34%)_minmax(0,66%)] overflow-hidden rounded-xl border bg-white transition duration-200 hover:-translate-y-0.5"
              >
                <MediaSlot
                  alt={cas.photo}
                  src={cas.src}
                  className="h-full min-h-44 w-full"
                  sizes="(max-width: 1024px) 34vw, 12vw"
                />

                <span className="flex flex-col gap-2.5 p-5">
                  <span className="text-ink text-[0.95rem] leading-tight font-semibold tracking-[0.02em] uppercase">
                    {cas.titre}
                  </span>
                  <span className="text-muted text-[0.82rem] leading-relaxed">
                    {cas.description}
                  </span>

                  <span className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-4">
                    {cas.chiffres.map((chiffre) => (
                      <span key={chiffre.libelle} className="flex flex-col">
                        <span className="text-brand text-xl leading-none font-bold">
                          {chiffre.valeur}
                        </span>
                        <span className="text-muted-light mt-1 text-[0.68rem]">
                          {chiffre.libelle}
                        </span>
                      </span>
                    ))}
                  </span>

                  <span className="text-brand inline-flex items-center gap-1.5 pt-3 text-[0.68rem] font-semibold tracking-[0.06em] uppercase">
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
