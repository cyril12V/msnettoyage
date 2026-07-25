import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Élément HTML rendu. `div` par défaut. */
  as?: ElementType;
  /** Largeur maximale du contenu. */
  size?: "default" | "narrow";
};

/** Gouttière horizontale et largeur maximale communes à toutes les sections. */
export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
