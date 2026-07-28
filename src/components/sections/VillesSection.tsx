import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { villes } from "@/data/villes";
import { site } from "@/lib/site";

/**
 * Villes disposant d'une page dédiée.
 *
 * Ce bloc transmet l'autorité de la page d'accueil, la mieux liée du site, vers
 * les pages villes. Sans lui, elles resteraient à deux clics et Google les
 * explorerait rarement.
 *
 * Le texte de chaque lien est la requête visée par la page de destination,
 * « Nettoyage à Créteil », jamais un nom de ville seul : c'est l'ancre qui dit
 * au moteur de quoi parle la page d'arrivée.
 */
export function VillesSection() {
  return (
    <Section id="villes" tone="surface">
      <Container>
        <SectionHeading
          title="Nos villes d'intervention en Île-de-France"
          description={`${site.name} intervient dans les huit départements franciliens. Les communes ci-dessous ont une page dédiée : délais réels depuis ${site.address.city}, contraintes d'accès, parc immobilier et prestations les plus demandées sur place.`}
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {villes.map((ville) => (
            <li key={ville.slug}>
              <Link
                href={`/${ville.slug}`}
                className="border-line hover:border-brand/40 hover:shadow-card flex h-full items-start gap-3 rounded-xl border bg-white p-5 transition duration-200 hover:-translate-y-0.5"
              >
                <span className="bg-brand-soft text-brand mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon name="pin" className="size-4.5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-ink text-[0.95rem] font-semibold">
                    Nettoyage à {ville.nom}
                  </span>
                  <span className="text-muted mt-1 text-xs">
                    {ville.codePostal} · département {ville.departement}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-muted mt-8 text-sm leading-relaxed">
          Votre commune n&apos;est pas dans la liste ? Nous intervenons dans toute
          l&apos;Île-de-France. Appelez-nous, nous vous dirons immédiatement si nous pouvons
          intervenir chez vous et sous quel délai.
        </p>
      </Container>
    </Section>
  );
}
