import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";
import { type Landing, landings } from "@/data/landings";
import { villes } from "@/data/villes";
import { breadcrumbJsonLd, faqJsonLd, prestationLocaleJsonLd } from "@/lib/schema";
import { site, telHref } from "@/lib/site";

/**
 * Page d'une prestation.
 *
 * Elle vise la prestation, pas la ville : la géographie est portée par les
 * pages villes, vers lesquelles la section « Où intervenons-nous » renvoie. Ce
 * maillage croisé prestation ↔ ville est ce qui permet à Google d'associer
 * chaque service à chaque commune sans créer une page par combinaison.
 */
export function PrestationPage({ landing }: { landing: Landing }) {
  const fil = [
    { label: "Accueil", href: "/" },
    { label: landing.libelleCourt, href: `/${landing.slug}` },
  ];

  const autres = landings.filter((item) => item.slug !== landing.slug);

  return (
    <>
      <PageHeader title={landing.h1} lede={landing.lede} breadcrumbs={fil}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/#contact" icon="arrowRight">
            Demander un devis
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
              Ce que comprend la prestation
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {landing.inclus.map((element) => (
                <li key={element} className="flex items-start gap-3">
                  <Icon name="checkCircle" className="text-brand mt-0.5 size-5 shrink-0" />
                  <span className="text-ink-soft text-[0.95rem] leading-relaxed">{element}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col gap-5">
              {landing.corps.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)} className="text-muted leading-relaxed">
                  {paragraphe}
                </p>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <MediaSlot
              src={landing.image}
              alt={`${landing.requete}, intervention ${site.name}`}
              className="aspect-4/3 rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />

            <dl className="border-line bg-surface grid grid-cols-1 gap-4 rounded-2xl border p-6">
              {landing.faits.map((fait) => (
                <div key={fait.label} className="flex flex-col-reverse gap-0.5">
                  <dt className="text-muted text-xs">{fait.label}</dt>
                  <dd className="text-ink text-base font-semibold">{fait.value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-line rounded-2xl border p-6">
              <h2 className="text-ink text-sm font-semibold">Pour qui ?</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {landing.pourQui.map((profil) => (
                  <li key={profil} className="text-muted flex items-start gap-2.5 text-sm">
                    <Icon name="check" className="text-brand mt-0.5 size-4 shrink-0" />
                    {profil}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>

      {/*
        Couverture géographique.

        Chaque lien porte la prestation ET la ville dans son texte : c'est
        l'ancre qui dit à Google que cette page-ci traite « nettoyage de
        bureaux » et que la page de destination traite « nettoyage de bureaux à
        Créteil ». Un « voir la ville » ne dirait rien.
      */}
      <Section tone="surface">
        <Container>
          <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
            {landing.libelleCourt} : où intervenons-nous ?
          </h2>
          <p className="text-muted mt-4 max-w-3xl leading-relaxed">
            {site.name} couvre l&apos;ensemble de l&apos;Île-de-France depuis {site.address.city}.
            Les communes ci-dessous disposent d&apos;une page dédiée qui détaille les délais, les
            contraintes d&apos;accès et les prestations les plus demandées sur place.
          </p>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {villes.map((ville) => (
              <li key={ville.slug}>
                <Link
                  href={`/${ville.slug}`}
                  className="border-line hover:border-brand/40 hover:text-brand text-ink-soft flex items-center justify-between gap-3 rounded-lg border bg-white px-4 py-3 text-sm transition-colors"
                >
                  <span>
                    {landing.libelleCourt} à {ville.nom}
                  </span>
                  <span className="text-muted text-xs">{ville.departement}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">
            Questions fréquentes
          </h2>

          <div className="divide-line border-line mt-8 divide-y rounded-xl border bg-white">
            {landing.faq.map((item) => (
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
          <h2 className="text-ink text-sm font-semibold">Nos autres prestations</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {autres.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/${autre.slug}`}
                  className="border-line text-ink-soft hover:border-brand/40 hover:text-brand inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition-colors"
                >
                  <Icon name={autre.icon} className="text-brand size-4" />
                  {autre.libelleCourt}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaDevis titre={`Un devis pour votre ${landing.libelleCourt.toLowerCase()} ?`} />

      <JsonLd
        data={[prestationLocaleJsonLd(landing), faqJsonLd(landing.faq), breadcrumbJsonLd(fil)]}
      />
    </>
  );
}
