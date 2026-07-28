import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { site, telHref } from "@/lib/site";

const reassurances: readonly { icon: IconName; texte: string }[] = [
  // La disponibilité permanente est placée en premier : c'est le seul de ces
  // arguments qu'un concurrent ne peut pas revendiquer sans l'assumer, et celui
  // que cherchent les bureaux, les rotations Airbnb et les urgences.
  { icon: "clock", texte: "Disponible 24 h/24 et 7 j/7, urgences comprises" },
  { icon: "users", texte: "Équipe formée et déclarée" },
  { icon: "leaf", texte: "Produits professionnels adaptés à chaque support" },
  { icon: "shield", texte: "Satisfaction garantie ou réintervention" },
];

export function Hero() {
  return (
    <section id="accueil" className="border-line-soft scroll-mt-20 border-b bg-white">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="flex animate-[var(--animate-fade-up)] flex-col">
          {/*
            Le H1 reprend la requête que vise la balise title, « société de
            nettoyage Paris & Île-de-France » : un titre et un H1 qui désignent
            deux choses différentes obligent Google à trancher lui-même le sujet
            de la page.

            Le nom de la marque y figure explicitement. La requête « MS
            Nettoyages » était captée par des homonymes de Besançon et de
            Thonon : le premier levier pour la reprendre est de la nommer là où
            elle pèse le plus, dans le H1 et dans les cent premiers mots.

            « Île-de-France » ne doit jamais se couper sur ses traits d'union :
            une coupure y laisse un « Île-de- » orphelin en fin de ligne.
          */}
          <h1 className="text-ink text-[2.6rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            {site.name}, société de nettoyage à Paris et en{" "}
            <span className="text-brand whitespace-nowrap">Île-de-France</span>
          </h1>

          {/*
            Paragraphe rédigé pour être cité tel quel : il définit l'entreprise,
            situe la zone et liste les prestations en une phrase autonome.
          */}
          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {site.name} est une société de nettoyage professionnel qui intervient à Paris et dans
            toute l&apos;Île-de-France depuis sa base de {site.address.city} (
            {site.address.postalCode}) : prestation de nettoyage régulière, nettoyage en profondeur,
            fin de chantier, ménage Airbnb, bureaux et commerces. Devis gratuit sous{" "}
            {site.delaiReponse}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg" icon="arrowRight">
              Demander un devis
            </Button>
            <Button href={telHref} size="lg" variant="secondary" icon="phone" iconPosition="left">
              {site.contact.phoneDisplay}
            </Button>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {reassurances.map((item) => (
              <li key={item.texte} className="flex items-start gap-2.5">
                <Icon name={item.icon} className="text-brand mt-0.5 size-5" />
                <span className="text-muted text-[0.85rem] leading-snug">{item.texte}</span>
              </li>
            ))}
          </ul>
        </div>

        <MediaSlot
          src="/images/hero-accueil.jpg"
          alt={`Séjour lumineux et impeccable après le passage de ${site.name}`}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-4/3 rounded-2xl lg:aspect-4/5"
        />
      </Container>
    </section>
  );
}
