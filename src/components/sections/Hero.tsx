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
    <section className="border-line-soft border-b bg-white">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex animate-[var(--animate-fade-up)] flex-col">
          <p className="text-brand text-xs font-bold tracking-[0.18em] uppercase">
            {`${site.address.city} · toute l'Île-de-France`}
          </p>

          <h1 className="mt-5 text-[2.5rem] leading-[0.98] font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl">
            Entreprise de nettoyage
            <br />
            <span className="text-brand">en Île-de-France</span>
            <br />
            et à {site.address.city}
          </h1>

          {/*
            Paragraphe rédigé pour être cité tel quel : il définit l'entreprise,
            situe la zone et liste les prestations en une phrase autonome.
          */}
          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            MS Nettoyage est une entreprise de nettoyage basée à {site.address.city} (
            {site.address.postalCode}) qui intervient dans toute l&apos;Île-de-France : entretien
            régulier de locaux, nettoyage en profondeur, remise en état après travaux, ménage
            Airbnb, bureaux et commerces. Devis gratuit sous {site.delaiReponse}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/devis" size="lg" icon="arrowRight">
              Demander un devis
            </Button>
            <Button href={telHref} size="lg" variant="secondary" icon="phone" iconPosition="left">
              {site.contact.phoneDisplay}
            </Button>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {reassurances.map((item) => (
              <li key={item.texte} className="flex items-start gap-2.5">
                <Icon name={item.icon} className="text-brand mt-0.5 size-5" />
                <span className="text-muted text-[0.82rem] leading-snug">{item.texte}</span>
              </li>
            ))}
          </ul>
        </div>

        <MediaSlot
          alt="Intérieur lumineux et impeccable après une intervention MS Nettoyage"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-4/3 rounded-2xl lg:aspect-5/6"
        />
      </Container>
    </section>
  );
}
