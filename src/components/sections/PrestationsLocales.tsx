import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { landings } from "@/data/landings";

/**
 * Liens vers les pages d'atterrissage locales.
 *
 * Ce bloc n'est pas décoratif : c'est lui qui transmet l'autorité de la page
 * d'accueil, la plus liée du site, vers les six pages qui visent chacune une
 * requête précise. Sans ce maillage, ces pages resteraient orphelines et
 * Google les explorerait rarement.
 *
 * L'ancre de chaque lien reprend la requête visée, pas un « en savoir plus »
 * qui ne dit rien au moteur du contenu de la page de destination.
 */
export function PrestationsLocales() {
  return (
    <Section id="prestations" tone="surface">
      <Container>
        <SectionHeading
          title="Nos prestations de nettoyage en Île-de-France"
          description="Chaque prestation fait l'objet d'une page dédiée : ce qu'elle comprend, à qui elle s'adresse, combien de temps elle prend et comment nous la chiffrons, à Paris comme en grande couronne."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landings.map((landing) => (
            <li key={landing.slug}>
              <Link
                href={`/${landing.slug}`}
                className="border-line hover:border-brand/40 hover:shadow-card flex h-full flex-col rounded-xl border bg-white p-6 transition duration-200 hover:-translate-y-0.5"
              >
                <span className="bg-brand-soft text-brand inline-flex size-11 items-center justify-center rounded-lg">
                  <Icon name={landing.icon} className="size-5.5" />
                </span>
                <span className="text-ink mt-5 text-lg font-semibold">{landing.requete}</span>
                <span className="text-muted mt-2.5 text-sm leading-relaxed">{landing.lede}</span>
                {/*
                  La carte entière est le lien : son texte contient déjà la
                  requête via le titre ci-dessus. La répéter ici alourdirait la
                  lecture sans rien apporter au moteur.
                */}
                <span className="text-brand mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Voir la prestation
                  <Icon name="arrowRight" className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
