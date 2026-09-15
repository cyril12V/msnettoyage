import Link from "next/link";
import type { ReactNode } from "react";
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

            Chaque prestation citée renvoie vers sa page. Un lien placé dans une
            phrase, au milieu d'un texte qui parle du sujet, pèse davantage aux
            yeux de Google qu'un lien de menu : c'est le premier paragraphe de la
            page la plus forte du site, il transmet son autorité là où elle
            rapporte.
          */}
          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {`${site.name} est une société de nettoyage professionnel qui intervient à Paris et dans toute l'Île-de-France depuis sa base de ${site.address.city} (${site.address.postalCode}) : `}
            <LienContextuel href="/menage-particulier">
              prestation de nettoyage régulière
            </LienContextuel>
            , <LienContextuel href="/nettoyage-maison">nettoyage en profondeur</LienContextuel>,{" "}
            <LienContextuel href="/nettoyage-fin-de-chantier-paris">fin de chantier</LienContextuel>
            , <LienContextuel href="/menage-airbnb">ménage Airbnb</LienContextuel>,{" "}
            <LienContextuel href="/nettoyage-bureau">bureaux et commerces</LienContextuel>. Devis
            gratuit sous {site.delaiReponse}.
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

/**
 * Lien placé dans le fil d'une phrase.
 *
 * Souligné discrètement plutôt que coloré comme un bouton : il doit se lire
 * comme du texte, sans détourner le regard des deux boutons d'action placés
 * juste en dessous.
 */
function LienContextuel({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-ink-soft decoration-brand/40 hover:text-brand hover:decoration-brand underline underline-offset-4 transition-colors"
    >
      {children}
    </Link>
  );
}
