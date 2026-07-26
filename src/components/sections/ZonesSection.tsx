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
              className="border-brand/30 bg-brand-soft hover:border-brand hover:shadow-card flex flex-col justify-between gap-5 rounded-xl border p-6 transition duration-200"
            >
              <div>
                <span className="flex items-center gap-2.5">
                  <Icon name="pin" className="text-brand size-5" />
                  <span className="text-ink text-lg font-semibold">{meaux.name}</span>
                  <span className="text-brand rounded bg-white px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide uppercase">
                    Notre base
                  </span>
                </span>
                <p className="text-ink-soft mt-3 text-sm leading-relaxed">{meaux.lede}</p>
              </div>
              <span className="text-brand inline-flex items-center gap-2 text-sm font-semibold">
                Voir la page Meaux
                <Icon name="arrowRight" className="size-4" />
              </span>
            </Link>
          ) : null}

          <div className="border-line rounded-xl border p-6">
            <h3 className="text-ink text-sm font-semibold">Départements couverts</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {autresZones.map((zone) => (
                <li
                  key={zone.slug}
                  className="bg-surface text-ink-soft inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm"
                >
                  {zone.name}
                  {/*
                    `muted-light` est calibré pour le fond blanc. Sur le fond
                    teinté de cette pastille, il retombe à 4,42:1, sous le seuil
                    AA : on passe donc au ton `muted`, qui tient 5,03:1.
                  */}
                  <span className="text-muted text-xs">{zone.departement}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted mt-5 text-sm leading-relaxed">
              Votre commune n&apos;est pas listée ? Appelez-nous, nous vous dirons immédiatement si
              nous pouvons intervenir chez vous et sous quel délai.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
