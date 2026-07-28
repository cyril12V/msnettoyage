import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getLanding, landings } from "@/data/landings";
import { type Ville, villes } from "@/data/villes";
import { breadcrumbJsonLd, faqJsonLd, villeJsonLd } from "@/lib/schema";
import { site, telHref } from "@/lib/site";

/**
 * Page d'une commune.
 *
 * Elle répond à « entreprise de nettoyage à Créteil », que la page d'accueil ne
 * peut pas viser sans se disperser. Tout son intérêt tient à ce qu'elle dit de
 * la commune et que les autres pages ne disent pas : parc immobilier, tissu
 * économique, contraintes d'accès, délais réels. Une page ville qui se contente
 * de remplacer un nom de ville dans un gabarit est une page satellite, que
 * Google désindexe.
 */
export function VillePage({ ville }: { ville: Ville }) {
  const fil = [
    { label: "Accueil", href: "/" },
    { label: ville.nom, href: `/${ville.slug}` },
  ];

  const phares = ville.prestationsPhares.flatMap((phare) => {
    const landing = getLanding(phare.slug);
    return landing ? [{ landing, raison: phare.raison }] : [];
  });

  const autresPrestations = landings.filter(
    (landing) => !ville.prestationsPhares.some((phare) => phare.slug === landing.slug),
  );

  const autresVilles = villes.filter((autre) => autre.slug !== ville.slug);

  return (
    <>
      <PageHeader title={ville.h1} lede={ville.lede} breadcrumbs={fil}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/#contact" icon="arrowRight">
            Devis gratuit sous {site.delaiReponse}
          </Button>
          <Button href={telHref} variant="secondary" icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
              Le nettoyage à {ville.nom}, concrètement
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {ville.corps.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)} className="text-muted leading-relaxed">
                  {paragraphe}
                </p>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <dl className="border-line bg-surface grid grid-cols-1 gap-4 rounded-2xl border p-6">
              {ville.faits.map((fait) => (
                <div key={fait.label} className="flex flex-col-reverse gap-0.5">
                  <dt className="text-muted text-xs">{fait.label}</dt>
                  <dd className="text-ink text-base font-semibold">{fait.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-brand/20 bg-brand-soft rounded-2xl border p-6">
              <h2 className="text-ink flex items-center gap-2.5 text-sm font-semibold">
                <Icon name="pin" className="text-brand size-4.5" />
                Secteurs desservis à {ville.nom}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ville.secteurs.map((secteur) => (
                  <li
                    key={secteur}
                    className="border-line text-ink-soft rounded-lg border bg-white px-3 py-1.5 text-xs"
                  >
                    {secteur}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-sm font-semibold">Communes voisines couvertes</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ville.communesProches.map((commune) => (
                  <li
                    key={commune}
                    className="bg-surface text-ink-soft rounded-lg px-3 py-1.5 text-xs"
                  >
                    {commune}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      {/*
        Prestations les plus demandées sur la commune.

        L'ancre de chaque lien associe la prestation à la ville : c'est ce
        couple que Google doit retenir, et c'est ce que tape l'internaute.
      */}
      <Section tone="surface">
        <Container>
          <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
            Nos prestations les plus demandées à {ville.nom}
          </h2>

          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {phares.map(({ landing, raison }) => (
              <li key={landing.slug}>
                <Link
                  href={`/${landing.slug}`}
                  className="border-line hover:border-brand/40 hover:shadow-card flex h-full flex-col rounded-xl border bg-white p-6 transition duration-200 hover:-translate-y-0.5"
                >
                  <span className="bg-brand-soft text-brand inline-flex size-11 items-center justify-center rounded-lg">
                    <Icon name={landing.icon} className="size-5.5" />
                  </span>
                  <span className="text-ink mt-5 text-lg font-semibold">
                    {landing.libelleCourt} à {ville.nom}
                  </span>
                  <span className="text-muted mt-2.5 text-sm leading-relaxed">{raison}</span>
                  <span className="text-brand mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Voir la prestation
                    <Icon name="arrowRight" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-ink mt-12 text-sm font-semibold">Également assuré à {ville.nom}</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {autresPrestations.map((landing) => (
              <li key={landing.slug}>
                <Link
                  href={`/${landing.slug}`}
                  className="border-line text-ink-soft hover:border-brand/40 hover:text-brand inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors"
                >
                  <Icon name={landing.icon} className="text-brand size-4" />
                  {landing.libelleCourt} à {ville.nom}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
            Questions fréquentes sur {ville.nom}
          </h2>

          <div className="divide-line border-line mt-8 divide-y rounded-xl border bg-white">
            {ville.faq.map((item) => (
              <details key={item.question} className="group px-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-ink text-[0.95rem] font-medium">{item.question}</h3>
                  <Icon
                    name="plus"
                    className="text-brand size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="text-muted pb-5 text-sm leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="compact">
        <Container>
          <h2 className="text-ink text-sm font-semibold">Nos autres villes d&apos;intervention</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {autresVilles.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/${autre.slug}`}
                  className="border-line text-ink-soft hover:border-brand/40 hover:text-brand inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors"
                >
                  <Icon name="pin" className="text-brand size-4" />
                  Nettoyage à {autre.nom}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis titre={`Un devis pour une intervention à ${ville.nom} ?`} />

      <JsonLd data={[villeJsonLd(ville), faqJsonLd(ville.faq), breadcrumbJsonLd(fil)]} />
    </>
  );
}
