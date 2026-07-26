import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { zones } from "@/data/zones";
import { site } from "@/lib/site";

/**
 * Zones d'intervention.
 *
 * Le site tient sur une seule page : seule Meaux, ville d'implantation, dispose
 * d'une page dédiée. Les autres zones sont listées comme information, sans lien.
 */
export function ZonesSection() {
  const meaux = zones.find((zone) => zone.base);
  const autresZones = zones.filter((zone) => !zone.base);

  return (
    <Section id="zones" tone="white">
      <Container>
        <SectionHeading
          title={`De ${site.address.city} à toute l'Île-de-France`}
          description={`Basés à ${site.address.city} (${site.address.postalCode}), nous couvrons les huit départements franciliens. Les délais les plus courts sont sur ${site.address.city} et le nord de la Seine-et-Marne, sans frais de déplacement sur les communes limitrophes.`}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {meaux ? (
            <Link
              href="/meaux"
              className="flex flex-col justify-between gap-5 rounded-xl border border-brand/30 bg-brand-soft p-6 transition duration-200 hover:border-brand hover:shadow-card"
            >
              <div>
                <span className="flex items-center gap-2.5">
                  <Icon name="pin" className="size-5 text-brand" />
                  <span className="text-lg font-semibold text-ink">{meaux.name}</span>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-brand uppercase">
                    Notre base
                  </span>
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{meaux.lede}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Voir la page Meaux
                <Icon name="arrowRight" className="size-4" />
              </span>
            </Link>
          ) : null}

          <div className="rounded-xl border border-line p-6">
            <h3 className="text-sm font-semibold text-ink">Départements couverts</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {autresZones.map((zone) => (
                <li
                  key={zone.slug}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface px-3.5 py-2 text-sm text-ink-soft"
                >
                  {zone.name}
                  <span className="text-xs text-muted-light">{zone.departement}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Votre commune n&apos;est pas listée ? Appelez-nous, nous vous dirons immédiatement si
              nous pouvons intervenir chez vous et sous quel délai.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
