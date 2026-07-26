"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site, telHref } from "@/lib/site";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Écran d'erreur générique.
 *
 * Aucun détail technique n'est montré au visiteur : seul le `digest`, un
 * identifiant opaque produit par Next.js, est journalisé, ce qui permet de
 * retrouver la trace complète côté serveur sans rien divulguer côté client.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[erreur] Rendu interrompu", error.digest ?? error.message);
  }, [error]);

  return (
    <Section tone="white">
      <Container size="narrow" className="flex flex-col items-center py-10 text-center">
        <p className="text-brand text-xs font-bold tracking-[0.18em] uppercase">Erreur</p>

        <h1 className="text-ink mt-4 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
          Une erreur est survenue
        </h1>

        <p className="text-muted mt-4 max-w-lg leading-relaxed">
          La page n&apos;a pas pu s&apos;afficher correctement. Réessayez dans un instant. Si le
          problème persiste, appelez-nous au {site.contact.phoneDisplay} : nous prenons votre
          demande directement par téléphone.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Réessayer</Button>
          <Button href={telHref} variant="secondary" icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
