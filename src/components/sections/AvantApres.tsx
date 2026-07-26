import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { realisationPrincipale, realisationsSecondaires } from "@/data/realisations";
import type { Realisation } from "@/data/realisations";
import { cn } from "@/lib/utils";

type EtiquetteProps = { children: string; ton: "avant" | "apres" };

/**
 * Étiquette « avant » ou « après ».
 *
 * Seul endroit du site où les capitales sont conservées : sur un mot de cinq
 * lettres posé en surimpression, elles servent à distinguer l'étiquette de la
 * photo, pas à décorer un titre.
 */
function Etiquette({ children, ton }: EtiquetteProps) {
  return (
    <span
      className={cn(
        "absolute top-3 left-3 rounded px-2 py-1 text-[0.62rem] font-bold tracking-[0.12em] text-white uppercase",
        ton === "avant" ? "bg-ink" : "bg-brand",
      )}
    >
      {children}
    </span>
  );
}

type PaireProps = {
  realisation: Realisation;
  /** Format d'affichage : grande paire en vedette ou vignette. */
  taille: "grande" | "vignette";
};

function Paire({ realisation, taille }: PaireProps) {
  const grande = taille === "grande";

  return (
    <figure className={cn("flex flex-col", grande && "h-full")}>
      <div
        className={cn(
          "relative grid grid-cols-2 overflow-hidden rounded-xl",
          grande ? "h-64 sm:h-80" : "h-40",
        )}
      >
        <div className="relative">
          <MediaSlot
            alt={realisation.avant}
            src={realisation.avantSrc}
            className="size-full"
            sizes={grande ? "(max-width: 1024px) 50vw, 30vw" : "(max-width: 1024px) 50vw, 18vw"}
          />
          <Etiquette ton="avant">Avant</Etiquette>
        </div>
        <div className="relative">
          <MediaSlot
            alt={realisation.apres}
            src={realisation.apresSrc}
            className="size-full"
            sizes={grande ? "(max-width: 1024px) 50vw, 30vw" : "(max-width: 1024px) 50vw, 18vw"}
          />
          <Etiquette ton="apres">Après</Etiquette>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white"
        />
      </div>

      <figcaption className="mt-3 text-sm font-medium text-ink-soft">{realisation.titre}</figcaption>
    </figure>
  );
}

/**
 * Section « Des résultats qui parlent d'eux-mêmes ».
 *
 * Les paires avant / après sont l'argument le plus convaincant du métier :
 * elles montrent l'écart plutôt que de le décrire. La section reste en place
 * tant que les photos ne sont pas fournies, avec des emplacements décrits, pour
 * que le photographe sache exactement quoi cadrer.
 */
export function AvantApres() {
  if (!realisationPrincipale) return null;

  return (
    <Section id="realisations" tone="white">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,28%)_minmax(0,72%)] lg:gap-12">
        <SectionHeading
          title="Des résultats qui parlent d'eux-mêmes"
          description="Mêmes lieux, même cadrage, avant et après notre passage."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Paire realisation={realisationPrincipale} taille="grande" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {realisationsSecondaires.map((realisation) => (
              <Paire key={realisation.id} realisation={realisation} taille="vignette" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
