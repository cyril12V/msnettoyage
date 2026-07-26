import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { services } from "@/data/services";

/** Les trois visuels de la mosaïque, du plus grand au plus petit. */
const visuels = [
  {
    src: "/images/chambre-lit-double-prepare.jpeg",
    alt: "Chambre préparée, lit fait et serviettes disposées",
  },
  {
    src: "/images/salle-de-bain-douche-italienne.jpeg",
    alt: "Salle de bains nettoyée, douche italienne sans trace",
  },
  {
    src: "/images/cuisine-equipee-buanderie.jpeg",
    alt: "Cuisine équipée dégraissée après intervention",
  },
] as const;

/**
 * Section « Nos services ».
 *
 * La liste des prestations est un accordéon natif : le site tient sur une seule
 * page, chaque prestation doit donc pouvoir se déplier sur place plutôt que de
 * renvoyer vers une page dédiée. Le contenu replié reste dans le HTML, donc
 * lisible par les moteurs et les assistants.
 */
export function Expertise() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,54%)_minmax(0,46%)] lg:gap-14">
        <div className="flex flex-col">
          <h2 className="text-ink text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl">
            Nous nettoyons tout votre <span className="text-brand">quotidien</span>
          </h2>

          <p className="text-muted mt-4 max-w-xl leading-relaxed">
            Sept prestations, du passage hebdomadaire au chantier ponctuel. Dépliez chacune pour
            voir précisément ce qu&apos;elle comprend.
          </p>

          <div className="divide-line border-line mt-8 divide-y rounded-xl border">
            {services.map((service) => (
              <details key={service.slug} className="group px-4 sm:px-5">
                <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <Icon name="checkCircle" className="text-brand size-5 shrink-0" />
                  <h3 className="text-ink-soft flex-1 text-[0.95rem] font-medium">
                    {service.listLabel}
                  </h3>
                  <Icon
                    name="plus"
                    className="text-brand size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>

                <div className="pb-5 pl-8">
                  <p className="text-muted text-sm leading-relaxed">{service.lede}</p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {service.includes.map((element) => (
                      <li key={element} className="flex items-start gap-2.5">
                        <Icon name="check" className="text-brand mt-1 size-3.5 shrink-0" />
                        <span className="text-ink-soft text-sm leading-snug">{element}</span>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                    {service.facts.map((fait) => (
                      <div key={fait.label} className="flex flex-col gap-0.5">
                        <dt className="text-muted-light text-xs">{fait.label}</dt>
                        <dd className="text-ink text-sm font-semibold">{fait.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="grid h-80 grid-cols-[1.1fr_0.9fr] grid-rows-2 gap-1.5 overflow-hidden rounded-2xl sm:h-96 lg:h-[34rem] lg:-skew-x-6 lg:rounded-none">
          <div className="relative row-span-2 overflow-hidden">
            <div className="absolute inset-0 lg:scale-125 lg:skew-x-6">
              <MediaSlot
                alt={visuels[0].alt}
                src={visuels[0].src}
                className="size-full"
                sizes="(max-width: 1024px) 60vw, 26vw"
              />
            </div>
          </div>
          {visuels.slice(1).map((visuel) => (
            <div key={visuel.alt} className="relative overflow-hidden">
              <div className="absolute inset-0 lg:scale-125 lg:skew-x-6">
                <MediaSlot
                  alt={visuel.alt}
                  src={visuel.src}
                  className="size-full"
                  sizes="(max-width: 1024px) 40vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
