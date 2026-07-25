import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/** Conteneur bordé standard : fond blanc, bord fin, coins arrondis. */
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("border-line rounded-xl border bg-white p-6", className)}>{children}</div>
  );
}

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
  /** Rend la carte entièrement cliquable et ajoute l'affordance de lien. */
  href?: string;
  /** Libellé accessible du lien, plus explicite que « En savoir plus ». */
  linkLabel?: string;
  className?: string;
};

/** Carte de service ou d'atout, avec ou sans lien. */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  linkLabel,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <span className="bg-brand-soft text-brand inline-flex size-11 items-center justify-center rounded-lg">
        <Icon name={icon} className="size-5.5" />
      </span>
      <h3 className="text-ink mt-5 text-base font-semibold tracking-[0.02em] uppercase">{title}</h3>
      <p className="text-muted mt-2.5 text-sm leading-relaxed">{description}</p>
      {href ? (
        <span className="text-brand mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.06em] uppercase">
          {linkLabel ?? "En savoir plus"}
          <Icon name="arrowRight" className="size-4" />
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    "flex flex-col rounded-xl border border-line bg-white p-6 transition duration-200",
    href && "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

type StatProps = {
  value: string;
  label: string;
  className?: string;
};

/** Chiffre clé mis en avant. */
export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-brand text-2xl leading-none font-bold">{value}</span>
      <span className="text-muted-light text-xs">{label}</span>
    </div>
  );
}
