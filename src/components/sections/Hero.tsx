import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { site, telHref } from "@/lib/site";

const reassurances: readonly { icon: IconName; texte: string }[] = [
  { icon: "users", texte: "Équipe formée et déclarée" },
  { icon: "leaf", texte: "Produits professionnels adaptés à chaque support" },
  { icon: "shield", texte: "Satisfaction garantie ou réintervention" },
];

export function Hero() {
  return (
    <section id="accueil" className="scroll-mt-20 border-b border-line-soft bg-white">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex animate-[var(--animate-fade-up)] flex-col">
          <p className="text-sm font-semibold text-brand">
            {`${site.address.city} et toute l'Île-de-France`}
          </p>

          <h1 className="mt-4 text-[2.6rem] leading-[1.05] font-bold tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]">
            Entreprise de nettoyage en <span className="text-brand">Île-de-France</span> et à{" "}
            {site.address.city}
          </h1>

          {/*
            Paragraphe rédigé pour être cité tel quel : il définit l'entreprise,
            situe la zone et liste les prestations en une phrase autonome.
          */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            MS Nettoyage est une entreprise de nettoyage basée à {site.address.city} (
            {site.address.postalCode}) qui intervient dans toute l&apos;Île-de-France : entretien
            régulier de locaux, nettoyage en profondeur, remise en état après travaux, ménage Airbnb,
            bureaux et commerces. Devis gratuit sous {site.delaiReponse}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg" icon="arrowRight">
              Demander un devis
            </Button>
            <Button href={telHref} size="lg" variant="secondary" icon="phone" iconPosition="left">
              {site.contact.phoneDisplay}
            </Button>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {reassurances.map((item) => (
              <li key={item.texte} className="flex items-start gap-2.5">
                <Icon name={item.icon} className="mt-0.5 size-5 text-brand" />
                <span className="text-[0.85rem] leading-snug text-muted">{item.texte}</span>
              </li>
            ))}
          </ul>
        </div>

        <MediaSlot
          src="/images/salle-de-bain-baignoire-ilot.jpeg"
          alt="Grande salle de bains lumineuse remise en état par MS Nettoyage"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-4/3 rounded-2xl lg:aspect-4/5"
        />
      </Container>
    </section>
  );
}
