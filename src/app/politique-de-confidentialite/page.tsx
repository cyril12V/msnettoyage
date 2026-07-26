import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { mailtoHref, site, siteUrl } from "@/lib/site";

const fil = [
  { label: "Accueil", href: "/" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${site.name} collecte, utilise et conserve les données transmises via le formulaire de devis, et comment exercer vos droits.`,
  path: "/politique-de-confidentialite",
});

export default function Page() {
  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        lede={`${site.name} ne collecte que les données nécessaires au traitement de votre demande de devis. Aucune donnée n'est revendue, cédée ou utilisée à des fins publicitaires.`}
        breadcrumbs={fil}
      />

      <Section tone="white">
        <Container size="narrow">
          <div className="prose-legal">
            <h2>Qui est responsable du traitement ?</h2>
            <p>
              Le responsable du traitement est {site.legalName}, joignable à l&apos;adresse{" "}
              <a href={mailtoHref}>{site.contact.email}</a> ou par téléphone au{" "}
              {site.contact.phoneInternational}. Les coordonnées complètes figurent dans les{" "}
              <Link href="/mentions-legales">mentions légales</Link>.
            </p>

            <h2>Quelles données sont collectées ?</h2>
            <p>
              Seules les données que vous saisissez volontairement dans le formulaire de devis sont
              collectées :
            </p>
            <ul>
              <li>votre nom ;</li>
              <li>votre numéro de téléphone ;</li>
              <li>votre adresse email ;</li>
              <li>la ville de l&apos;intervention souhaitée ;</li>
              <li>le type de prestation demandé ;</li>
              <li>le contenu de votre message.</li>
            </ul>
            <p>
              Le site n&apos;utilise aucun cookie de mesure d&apos;audience, de publicité ou de
              traçage. Aucune bannière de consentement n&apos;est donc nécessaire.
            </p>

            <h2>Pourquoi ces données sont-elles traitées ?</h2>
            <p>
              Elles servent uniquement à vous recontacter et à établir le devis que vous avez
              demandé. La base légale est votre consentement, recueilli par la case à cocher du
              formulaire (article 6.1.a du RGPD), puis l&apos;exécution de mesures précontractuelles
              prises à votre demande (article 6.1.b) si une relation commerciale s&apos;engage.
            </p>

            <h2>Combien de temps sont-elles conservées ?</h2>
            <ul>
              <li>
                <strong>Demande sans suite :</strong> 12 mois à compter du dernier contact, puis
                suppression.
              </li>
              <li>
                <strong>Demande ayant donné lieu à une prestation :</strong> durée de la relation
                commerciale, puis conservation des pièces comptables pendant la durée légale de 10
                ans imposée par le code de commerce.
              </li>
            </ul>

            <h2>Qui a accès à ces données ?</h2>
            <p>
              Les données sont accessibles aux seules personnes de {site.legalName} chargées du
              traitement des demandes. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à
              des fins commerciales.
            </p>
            <p>
              Deux sous-traitants techniques interviennent dans l&apos;acheminement de votre demande
              :
            </p>
            <ul>
              <li>
                <strong>{site.legal.hebergeur.name}</strong> : hébergement du site et exécution du
                formulaire.
              </li>
              <li>
                <strong>Resend</strong> : acheminement de l&apos;email de notification vers notre
                boîte de réception.
              </li>
            </ul>
            <p>
              Ces prestataires peuvent traiter les données en dehors de l&apos;Union européenne. Les
              transferts sont alors encadrés par les clauses contractuelles types de la Commission
              européenne.
            </p>

            <h2>Quels sont vos droits ?</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
              limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de
              retirer votre consentement à tout moment.
            </p>
            <p>
              Pour les exercer, écrivez à <a href={mailtoHref}>{site.contact.email}</a> en précisant
              votre demande. Une réponse vous est apportée sous un mois. Si vous estimez, après nous
              avoir contactés, que vos droits ne sont pas respectés, vous pouvez saisir la CNIL,{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                www.cnil.fr
              </a>
              .
            </p>

            <h2>Sécurité</h2>
            <p>
              Le site est servi exclusivement en HTTPS. Le formulaire de devis est protégé contre
              les envois automatisés (limitation du nombre de soumissions par appareil et détection
              des robots) et les données transmises sont validées côté serveur avant tout
              traitement.
            </p>

            <h2>Modification de cette politique</h2>
            <p>
              Cette politique peut être mise à jour pour refléter une évolution du site ou de la
              réglementation. La version applicable est celle publiée sur {siteUrl} au moment de
              votre visite.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
