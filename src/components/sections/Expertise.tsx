import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { services } from "@/data/services";

/** Trois visuels de la mosaïque, décrits en attendant les photos définitives. */
const visuels = [
  { alt: "Intervenante nettoyant une vitre", src: undefined },
  { alt: "Lit préparé dans un logement remis en état", src: undefined },
  { alt: "Bureau moderne après entretien", src: undefined },
] as const;

/**
 * Section « Notre expertise ».
 *
 * Reprend la composition de la maquette : la liste des prestations à gauche, une
 * mosaïque de trois photos inclinée à droite. L'inclinaison est annulée en
 * dessous de `lg` — sur mobile, elle rogne les visuels sans rien apporter.
 */
export function Expertise() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-16">
        <div className="flex flex-col">
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Notre expertise</p>

          <h2 className="mt-4 text-3xl leading-[1.05] font-bold tracking-tight text-ink uppercase sm:text-4xl">
            Nous nettoyons
            <br />
            tout votre <span className="text-brand">quotidien</span>
          </h2>

          <ul className="mt-8 flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.slug} className="flex items-start gap-3">
                <Icon name="checkCircle" className="mt-0.5 size-5 shrink-0 text-brand" />
                <span className="text-[0.95rem] leading-snug text-ink-soft">
                  {service.listLabel}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/services" variant="secondary" icon="arrowRight">
              Voir le détail des prestations
            </Button>
          </div>
        </div>

        <div className="grid h-80 grid-cols-[1.1fr_0.9fr] grid-rows-2 gap-1.5 overflow-hidden rounded-2xl sm:h-96 lg:h-[31rem] lg:-skew-x-6 lg:rounded-none">
          <div className="relative row-span-2 overflow-hidden">
            <div className="absolute inset-0 lg:skew-x-6 lg:scale-125">
              <MediaSlot
                alt={visuels[0].alt}
                src={visuels[0].src}
                className="size-full"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </div>
          </div>
          {visuels.slice(1).map((visuel) => (
            <div key={visuel.alt} className="relative overflow-hidden">
              <div className="absolute inset-0 lg:skew-x-6 lg:scale-125">
                <MediaSlot
                  alt={visuel.alt}
                  src={visuel.src}
                  className="size-full"
                  sizes="(max-width: 1024px) 40vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
