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
      className={cn(id && "scroll-mt-20", toneClasses[tone], spacingClasses[spacing], className)}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Niveau de titre. `h2` par défaut. */
  as?: "h1" | "h2";
  /** Inverse les couleurs pour un fond bleu. */
  inverted?: boolean;
};

/**
 * Titre de section.
 *
 * Volontairement en casse normale. Un titre long tout en capitales perd la
 * silhouette des mots, que l'œil utilise pour lire vite, et les accents
 * français (É, À, Î) y sont mal rendus. Les capitales restent réservées aux
 * étiquettes très courtes.
 */
export function SectionHeading({
  title,
  description,
  className,
  align = "left",
  as: Tag = "h2",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}
    >
      <Tag
        className={cn(
          "text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl",
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
