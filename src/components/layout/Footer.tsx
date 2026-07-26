import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { footerNav, legalNav } from "@/data/navigation";
import { services } from "@/data/services";
import { zones } from "@/data/zones";
import { mailtoHref, site, telHref } from "@/lib/site";

const reseaux: readonly { cle: keyof typeof site.social; icon: IconName; label: string }[] = [
  { cle: "facebook", icon: "facebook", label: "Facebook" },
  { cle: "instagram", icon: "instagram", label: "Instagram" },
  { cle: "linkedin", icon: "linkedin", label: "LinkedIn" },
];

export function Footer() {
  const anneeCourante = new Date().getFullYear();
  const reseauxActifs = reseaux.filter(({ cle }) => site.social[cle].length > 0);

  return (
    <footer className="border-t border-line-soft bg-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Entreprise de nettoyage professionnel basée à {site.address.city}, au service des
              particuliers et des professionnels dans toute l&apos;Île-de-France.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={telHref}
                className="inline-flex items-center gap-2.5 text-ink-soft hover:text-brand"
              >
                <Icon name="phone" className="size-4 text-brand" />
                {site.contact.phoneInternational}
              </a>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2.5 break-all text-ink-soft hover:text-brand"
              >
                <Icon name="mail" className="size-4 text-brand" />
                {site.contact.email}
              </a>
              <p className="inline-flex items-center gap-2.5 text-ink-soft">
                <Icon name="pin" className="size-4 text-brand" />
                {site.address.city} ({site.address.postalCode}), toute l&apos;Île-de-France
              </p>
            </div>

            {reseauxActifs.length > 0 ? (
              <ul className="flex items-center gap-4">
                {reseauxActifs.map(({ cle, icon, label }) => (
                  <li key={cle}>
                    <a
                      href={site.social[cle]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand transition-opacity hover:opacity-70"
                    >
                      <Icon name={icon} className="size-5" title={label} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <FooterColonne titre="Navigation">
            {footerNav.map((lien) => (
              <FooterLien key={lien.href} href={lien.href}>
                {lien.label}
              </FooterLien>
            ))}
          </FooterColonne>

          <FooterColonne titre="Nos prestations">
            {services.map((service) => (
              <FooterLien key={service.slug} href="/#services">
                {service.shortName}
              </FooterLien>
            ))}
          </FooterColonne>

          <FooterColonne titre="Zones d'intervention">
            <FooterLien href="/meaux">{site.address.city}</FooterLien>
            {zones
              .filter((zone) => !zone.base)
              .map((zone) => (
                <li key={zone.slug} className="text-sm text-muted">
                  {zone.name}
                </li>
              ))}
          </FooterColonne>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-light">
            © {anneeCourante} {site.name}, tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href} className="text-xs text-muted hover:text-brand">
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColonne({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-ink">{titre}</h2>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLien({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted transition-colors hover:text-brand">
        {children}
      </Link>
    </li>
  );
}
