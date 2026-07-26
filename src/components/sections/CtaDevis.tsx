import { DevisForm } from "@/components/forms/DevisForm";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { mailtoHref, site, telHref } from "@/lib/site";

type CtaDevisProps = {
  titre?: string;
  sousTitre?: string;
  prestationParDefaut?: string;
  /** Affiche le visuel du véhicule à côté du bloc de coordonnées. */
  avecVisuel?: boolean;
};

/** Bloc de conversion : coordonnées à gauche, formulaire de devis à droite. */
export function CtaDevis({
  titre = "Besoin d'un espace impeccable ?",
  sousTitre,
  prestationParDefaut,
  avecVisuel = false,
}: CtaDevisProps) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-br from-brand-dark via-brand to-brand-dark py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.09] [background-image:repeating-linear-gradient(115deg,#fff_0_1px,transparent_1px_46px)]"
      />

      <Container className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl leading-[1.12] font-bold tracking-tight text-white text-balance sm:text-4xl">
            {titre}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/85">
            {sousTitre ??
              `Décrivez votre besoin en quelques lignes. Nous revenons vers vous sous ${site.delaiReponse} avec un devis gratuit et sans engagement.`}
          </p>

          <div className={avecVisuel ? "mt-2 grid items-stretch gap-5 sm:grid-cols-2" : "mt-2 grid gap-5"}>
            {avecVisuel ? (
              <MediaSlot
                alt={`Véhicule utilitaire ${site.name}`}
                className="hidden min-h-56 rounded-2xl sm:block"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            ) : null}

            <ul className="flex flex-col gap-5 rounded-2xl bg-brand-deep/70 p-6">
              <li>
                <a href={telHref} className="flex items-center gap-3.5 text-white hover:opacity-80">
                  <Icon name="phone" className="size-5" />
                  <span className="text-[0.95rem] font-semibold">
                    {site.contact.phoneInternational}
                  </span>
                </a>
              </li>
              <li>
                <a href={mailtoHref} className="flex items-center gap-3.5 text-white hover:opacity-80">
                  <Icon name="mail" className="size-5" />
                  <span className="text-[0.95rem] break-all">{site.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3.5 text-white">
                <Icon name="pin" className="mt-0.5 size-5" />
                <span>
                  <span className="block text-[0.95rem]">
                    {site.address.city} ({site.address.postalCode})
                  </span>
                  <span className="mt-0.5 block text-xs text-white/70">
                    Interventions dans toute l&apos;Île-de-France
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3.5 text-white">
                <Icon name="clock" className="mt-0.5 size-5" />
                <span className="flex flex-col gap-0.5">
                  {site.openingHoursDisplay.map((creneau) => (
                    <span key={creneau.label} className="text-[0.95rem]">
                      {creneau.label} : {creneau.value}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <DevisForm prestationParDefaut={prestationParDefaut} className="shadow-[var(--shadow-float)]" />
      </Container>
    </section>
  );
}
