import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type Fil = { label: string; href: string };

type BreadcrumbsProps = {
  items: readonly Fil[];
  className?: string;
  /** Adapte les couleurs à un fond sombre. */
  inverted?: boolean;
};

/**
 * Fil d'Ariane visible.
 *
 * Le dernier élément représente la page courante : il n'est pas cliquable et
 * porte `aria-current="page"`.
 */
export function Breadcrumbs({ items, className, inverted = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {items.map((item, index) => {
          const dernier = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? (
                <Icon
                  name="arrowRight"
                  className={cn("size-3", inverted ? "text-white/50" : "text-muted")}
                />
              ) : null}
              {dernier ? (
                <span
                  aria-current="page"
                  className={cn("font-semibold", inverted ? "text-white" : "text-ink")}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-2 hover:underline",
                    inverted ? "text-white/80" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
