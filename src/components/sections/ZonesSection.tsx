import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { zones } from "@/data/zones";
import { site } from "@/lib/site";

/** Repères locaux, chiffrés et vérifiables. */
const reperes: readonly { valeur: string; libelle: string }[] = [
  { valeur: site.address.postalCode, libelle: `Code postal de ${site.address.city}` },
  { valeur: "0 €", libelle: "Frais de déplacement sur les communes limitrophes" },
  { valeur: site.delaiReponse, libelle: "Délai de réponse à une demande de devis" },
];

/**
 * Zone d'intervention.
 *
 * Le contenu local de Meaux vit ici plutôt que sur une page séparée : une page
 * dédiée viserait exactement la même requête que la page d'accueil, et deux
 * pages qui se disputent un mot-clé perdent toutes les deux.
 */
export function ZonesSection() {
  const meaux = zones.find((zone) => zone.base);
  const autresZones = zones.filter((zone) => !zone.base);

  return (
    <Section id="zones" tone="white">
      <Container>
        <SectionHeading
          title={`De ${site.address.city} à toute l'Île-de-France`}
          description={`${site.name} est implantée à ${site.address.city} (${site.address.postalCode}). C'est là que nos délais sont les plus courts : une demande formulée le matin peut être planifiée dans la journée ou le lendemain, y compris en urgence.`}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="border-brand/20 bg-brand-soft rounded-xl border p-6">
            <h3 className="text-ink flex items-center gap-2.5 text-lg font-semibold">
              <Icon name="pin" className="text-brand size-5" />
              Communes desservies autour de {site.address.city}
            </h3>

            <ul className="mt-4 flex flex-wrap gap-2">
              {(meaux?.communes ?? []).map((commune) => (
                <li
                  key={commune}
                  className="border-line text-ink-soft rounded-lg border bg-white px-3 py-1.5 text-xs"
                >
                  {commune}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/70 pt-5">
              {reperes.map((repere) => (
                <div key={repere.libelle} className="flex flex-col-reverse gap-1">
                  <dt className="text-muted text-xs leading-snug">{repere.libelle}</dt>
                  <dd className="text-brand text-xl leading-tight font-bold">{repere.valeur}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-line rounded-xl border p-6">
            <h3 className="text-ink text-sm font-semibold">Départements également couverts</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {autresZones.map((zone) => (
                <li
                  key={zone.slug}
                  className="bg-surface text-ink-soft inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm"
                >
                  {zone.name}
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
