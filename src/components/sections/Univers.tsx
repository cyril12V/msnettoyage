import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { univers } from "@/data/univers";

/**
 * Section « Nos univers d'intervention ».
 *
 * Six cartes visuelles répondant à la question « est-ce que vous intervenez
 * chez moi ? », là où la section prestations répond à « que faites-vous ? ».
 * Chaque carte renvoie vers la prestation correspondante.
 */
export function Univers() {
  return (
    <section id="univers" className="scroll-mt-20 bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Nos univers</p>
          <h2 className="text-3xl leading-[1.05] font-bold tracking-tight text-ink uppercase sm:text-4xl">
            Nos univers
            <br />
            d&apos;intervention
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted">
            Particuliers comme professionnels : nous adaptons le protocole, le matériel et les
            horaires au type de lieu, pas l&apos;inverse.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {univers.map((item) => (
            <li key={item.id}>
              <Link
                href={`/services/${item.service}`}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <MediaSlot
                  alt={item.photo}
                  src={item.src}
                  className="h-36 w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 17vw"
                />
                <span className="flex flex-1 flex-col gap-2.5 p-5">
                  <Icon name={item.icon} className="size-6 text-brand" />
                  <span className="text-sm font-semibold tracking-[0.03em] text-ink uppercase">
                    {item.titre}
                  </span>
                  <span className="text-[0.82rem] leading-relaxed text-muted">{item.accroche}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
