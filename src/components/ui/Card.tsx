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
  return <div className={cn("rounded-xl border border-line bg-white p-6", className)}>{children}</div>;
}

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
  /** Rend la carte entièrement cliquable et ajoute l'affordance de lien. */
  href?: string;
  /** Libellé du lien, plus explicite que « En savoir plus ». */
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
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
        <Icon name={icon} className="size-5.5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{description}</p>
      {href ? (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
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
      <span className="text-2xl leading-none font-bold text-brand">{value}</span>
      <span className="text-xs text-muted-light">{label}</span>
    </div>
  );
}
