import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Fond de la section. */
  tone?: "white" | "surface" | "brand";
  /** Espacement vertical. */
  spacing?: "default" | "compact";
  /** Libellé accessible de la région, si la section n'a pas de titre visible. */
  ariaLabel?: string;
};

const toneClasses = {
  white: "bg-white",
  surface: "bg-surface",
  brand: "bg-brand text-white",
} as const;

const spacingClasses = {
  default: "py-16 sm:py-20 lg:py-24",
  compact: "py-12 sm:py-14",
} as const;

export function Section({
  children,
  className,
  id,
  tone = "white",
  spacing = "default",
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  /** Sur-titre en petites capitales, au-dessus du titre. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Niveau de titre — `h2` par défaut, `h1` sur les pages de tête. */
  as?: "h1" | "h2";
  /** Inverse les couleurs pour un fond bleu. */
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  as: Tag = "h2",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-bold tracking-[0.16em] uppercase",
            inverted ? "text-white/80" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "text-3xl leading-[1.08] font-bold tracking-tight uppercase sm:text-4xl lg:text-[2.75rem]",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            inverted ? "text-white/85" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
