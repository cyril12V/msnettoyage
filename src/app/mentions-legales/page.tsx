import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { mailtoHref, SANS_OBJET, site, siteUrl, telHref } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteUrl} : éditeur, hébergeur, propriété intellectuelle et responsabilité.`,
  path: "/mentions-legales",
});

/**
 * Affiche une information légale.
 *
 * Ces mentions sont obligatoires (art. 6-III de la LCEN) : un champ vide doit
 * sauter aux yeux plutôt que disparaître silencieusement de la page. Une mention
 * qui ne s'applique pas au statut de l'entreprise s'affiche en revanche
 * sobrement, sans alerte : elle n'appelle aucune action.
 */
function InfoLegale({ label, valeur }: { label: string; valeur: string }) {
  const sansObjet = valeur === SANS_OBJET;

  return (
    <li>
      <span className="text-ink font-semibold">{label} :</span>{" "}
      {valeur ? (
        <span className={sansObjet ? "text-muted-light" : undefined}>{valeur}</span>
      ) : (
        <span className="bg-danger/10 text-danger rounded px-1.5 py-0.5">
          Information à compléter
        </span>
      )}
    </li>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader title="Mentions légales" breadcrumbs={fil} />

      <Section tone="white">
        <Container size="narrow">
          <div className="prose-legal">
            <h2>Éditeur du site</h2>
            <ul className="list-none pl-0">
              <InfoLegale label="Dénomination sociale" valeur={site.legalName} />
              <InfoLegale label="Forme juridique" valeur={site.legal.formeJuridique} />
              <InfoLegale label="Capital social" valeur={site.legal.capitalSocial} />
              <InfoLegale
                label="Siège social"
                valeur={
                  site.address.streetAddress
                    ? `${site.address.streetAddress}, ${site.address.postalCode} ${site.address.city}`
                    : ""
                }
              />
              <InfoLegale label="SIRET" valeur={site.legal.siret} />
              <InfoLegale label="RCS" valeur={site.legal.rcs} />
              <InfoLegale
                label="TVA intracommunautaire"
                valeur={site.legal.tvaIntracommunautaire}
              />
              <InfoLegale
                label="Directeur de la publication"
                valeur={site.legal.directeurPublication}
              />
              <InfoLegale
                label="Assurance responsabilité civile professionnelle"
                valeur={site.legal.assuranceRcPro}
              />
              <li>
                <span className="text-ink font-semibold">Téléphone :</span>{" "}
                <a href={telHref}>{site.contact.phoneInternational}</a>
              </li>
              <li>
                <span className="text-ink font-semibold">Email :</span>{" "}
                <a href={mailtoHref}>{site.contact.email}</a>
              </li>
            </ul>

            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par {site.legal.hebergeur.name}, {site.legal.hebergeur.address}.
              Site :{" "}
              <a href={site.legal.hebergeur.url} target="_blank" rel="noopener noreferrer">
                {site.legal.hebergeur.url}
              </a>
              .
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur {siteUrl}, à savoir les textes, visuels,
              logo, arborescence et mise en forme, est la propriété de {site.legalName} ou fait
              l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction,
              représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable
              est interdite et constitue une contrefaçon au sens des articles L335-2 et suivants du
              code de la propriété intellectuelle.
            </p>

            <h2>Responsabilité</h2>
            <p>
              {site.legalName} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations publiées sur ce site. Les descriptions de prestations, délais et
              modalités sont fournies à titre indicatif : seul le devis signé fait foi quant au
              périmètre, au prix et aux délais d&apos;une intervention.
            </p>
            <p>
              Le site peut contenir des liens vers des sites tiers. {site.legalName} n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Le traitement des données collectées via le formulaire de devis est décrit dans notre{" "}
              <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
            </p>

            <h2>Médiation de la consommation</h2>
            <p>
              Conformément à l&apos;article L612-1 du code de la consommation, tout consommateur a
              le droit de recourir gratuitement à un médiateur de la consommation en vue de la
              résolution amiable d&apos;un litige. Les coordonnées du médiateur compétent sont
              communiquées sur demande à l&apos;adresse{" "}
              <a href={mailtoHref}>{site.contact.email}</a>.
            </p>

            <h2>Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige et à
              défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
