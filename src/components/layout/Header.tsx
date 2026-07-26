"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { mainNav, prestationsNav } from "@/data/navigation";
import { site, telHref } from "@/lib/site";

export function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const fermerMenu = () => setMenuOuvert(false);

  // Panneau ouvert : on bloque le défilement de l'arrière-plan et on écoute Échap.
  useEffect(() => {
    if (!menuOuvert) return;

    const overflowInitial = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fermerSurEchap = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOuvert(false);
    };
    document.addEventListener("keydown", fermerSurEchap);

    return () => {
      document.body.style.overflow = overflowInitial;
      document.removeEventListener("keydown", fermerSurEchap);
    };
  }, [menuOuvert]);

  return (
    <header className="border-line-soft sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo priority height={44} />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="text-ink-soft hover:text-brand text-sm font-medium transition-colors"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={telHref}
            className="text-ink-soft hover:text-brand hidden items-center gap-2 text-sm font-semibold transition-colors md:inline-flex"
          >
            <Icon name="phone" className="text-brand size-4" />
            {site.contact.phoneDisplay}
          </a>

          <Button href="/#contact" className="hidden sm:inline-flex" icon="arrowRight">
            Devis gratuit
          </Button>

          <button
            type="button"
            onClick={() => setMenuOuvert((ouvert) => !ouvert)}
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="border-line text-ink inline-flex size-11 items-center justify-center rounded-lg border lg:hidden"
          >
            <Icon name={menuOuvert ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </Container>

      {menuOuvert ? (
        <div id="menu-mobile" className="border-line-soft border-t bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                onClick={fermerMenu}
                className="text-ink-soft hover:bg-surface rounded-lg px-3 py-3 text-base font-medium transition-colors"
              >
                {lien.label}
              </Link>
            ))}
            {/*
              Les pages d'atterrissage sont accessibles depuis le menu mobile :
              sans cela, un visiteur sur téléphone, majoritaire ici, n'y accède
              qu'en faisant défiler toute la page d'accueil.
            */}
            <p className="text-muted-light mt-3 px-3 pt-3 text-xs font-semibold">
              Nos prestations à {site.address.city}
            </p>
            {prestationsNav.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                onClick={fermerMenu}
                className="text-ink-soft hover:bg-surface rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors"
              >
                {lien.label}
              </Link>
            ))}

            <div className="border-line-soft mt-3 flex flex-col gap-2.5 border-t pt-4">
              <Button href="/#contact" size="lg" fullWidth icon="arrowRight" onClick={fermerMenu}>
                Demander un devis
              </Button>
              <Button
                href={telHref}
                variant="secondary"
                size="lg"
                fullWidth
                icon="phone"
                iconPosition="left"
                onClick={fermerMenu}
              >
                {site.contact.phoneDisplay}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
