import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaDevis } from "@/components/sections/CtaDevis";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";
import { getLanding, landings, landingSlugs } from "@/data/landings";
import { breadcrumbJsonLd, faqJsonLd, prestationLocaleJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

type PageParams = { params: Promise<{ prestation: string }> };

/**
 * Pages d'atterrissage locales, une par requête visée.
 *
 * Le segment dynamique est à la racine du site : l'URL reste courte et porte le
 * mot-clé, `/nettoyage-maison-meaux` plutôt que `/services/nettoyage-maison`.
 * Next.js résout d'abord les segments statiques, donc `/mentions-legales` et
 * `/politique-de-confidentialite` continuent de pointer sur leurs pages.
 */
export function generateStaticParams() {
  return landingSlugs.map((prestation) => ({ prestation }));
}

/** Toute URL hors de cette liste renvoie un 404, jamais une page vide. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { prestation } = await params;
  const landing = getLanding(prestation);

  if (!landing) return {};

  return {
    ...buildMetadata({
      title: landing.metaTitle,
      description: landing.metaDescription,
      path: `/${landing.slug}`,
    }),
    // Les titres portent déjà le nom de la marque : sans `absolute`, le gabarit
    // du layout l'ajouterait une seconde fois.
    title: { absolute: landing.metaTitle },
  };
}

export default async function Page({ params }: PageParams) {
  const { prestation } = await params;
  const landing = getLanding(prestation);

  if (!landing) notFound();

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

      <Section tone="surface">
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

      <Section tone="white" spacing="compact">
        <Container>
          <h2 className="text-ink text-sm font-semibold">
            Nos autres prestations à {site.address.city}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {autres.map((autre) => (
              <li key={autre.slug}>
                <Link
                  href={`/${autre.slug}`}
                  className="border-line text-ink-soft hover:border-brand/40 hover:text-brand inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors"
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
