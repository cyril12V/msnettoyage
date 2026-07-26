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
    <section id="univers" className="bg-surface scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-brand text-xs font-bold tracking-[0.16em] uppercase">Nos univers</p>
          <h2 className="text-ink text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-4xl">
            Nos univers
            <br />
            d&apos;intervention
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed">
            Particuliers comme professionnels : nous adaptons le protocole, le matériel et les
            horaires au type de lieu, pas l&apos;inverse.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {univers.map((item) => (
            <li key={item.id}>
              <Link
                href={`/services/${item.service}`}
                className="border-line hover:border-brand/40 hover:shadow-card flex h-full flex-col overflow-hidden rounded-xl border bg-white transition duration-200 hover:-translate-y-0.5"
              >
                <MediaSlot
                  alt={item.photo}
                  src={item.src}
                  className="h-36 w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 17vw"
                />
                <span className="flex flex-1 flex-col gap-2.5 p-5">
                  <Icon name={item.icon} className="text-brand size-6" />
                  <span className="text-ink text-sm font-semibold tracking-[0.03em] uppercase">
                    {item.titre}
                  </span>
                  <span className="text-muted text-[0.82rem] leading-relaxed">{item.accroche}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
