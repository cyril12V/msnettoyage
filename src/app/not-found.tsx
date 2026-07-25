import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { mainNav } from "@/data/navigation";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone="white">
      <Container size="narrow" className="flex flex-col items-center py-10 text-center">
        <p className="text-brand text-xs font-bold tracking-[0.18em] uppercase">Erreur 404</p>

        <h1 className="text-ink mt-4 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
          Cette page n&apos;existe pas
        </h1>

        <p className="text-muted mt-4 max-w-lg leading-relaxed">
          Le lien est peut-être obsolète ou l&apos;adresse mal saisie. Vous pouvez revenir à
          l&apos;accueil, consulter nos prestations, ou nous appeler directement au{" "}
          {site.contact.phoneDisplay}.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" icon="arrowLeft" iconPosition="left">
            Retour à l&apos;accueil
          </Button>
          <Button href={telHref} variant="secondary" icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
        </div>

        <nav aria-label="Pages principales" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {mainNav.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="text-muted hover:text-brand text-sm underline-offset-2"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
