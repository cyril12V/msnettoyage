import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { zones } from "@/data/zones";
import { site } from "@/lib/site";

export function ZonesSection() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Zones d'intervention"
          title={
            <>
              De {site.address.city} à toute
              <br />
              l&apos;<span className="text-brand">Île-de-France</span>
            </>
          }
          description={`Basés à ${site.address.city} (${site.address.postalCode}), nous couvrons les huit départements franciliens. Les délais les plus courts sont sur ${site.address.city} et le nord de la Seine-et-Marne, sans frais de déplacement sur les communes limitrophes.`}
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => (
            <li key={zone.slug}>
              <Link
                href={`/zones-d-intervention/${zone.slug}`}
                className="border-line hover:border-brand/40 hover:shadow-card flex items-center justify-between gap-3 rounded-xl border bg-white px-5 py-4 transition duration-200"
              >
                <span className="flex items-center gap-3">
                  <Icon name="pin" className="text-brand size-5" />
                  <span className="text-ink text-sm font-semibold">{zone.name}</span>
                  <span className="bg-surface text-muted-light rounded px-1.5 py-0.5 text-[0.65rem] font-bold">
                    {zone.departement}
                  </span>
                </span>
                <Icon name="arrowRight" className="text-muted-light size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
