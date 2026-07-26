import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaSlotProps = {
  /**
   * Chemin de la photo dans `public/`, par exemple `/images/hero-salon.jpg`.
   * Tant qu'il vaut `undefined`, un aplat graphique de marque est rendu à la
   * place, jamais une image cassée.
   */
  src?: string;
  /** Texte alternatif. Obligatoire : il décrit la photo attendue. */
  alt: string;
  className?: string;
  /** Charge l'image en priorité. À réserver au visuel au-dessus de la ligne de flottaison. */
  priority?: boolean;
  /** Indication de taille pour le calcul du srcset. */
  sizes?: string;
};

/**
 * Emplacement photo.
 *
 * Les photos du site sont fournies par le client. Ce composant permet de livrer
 * une mise en page complète et cohérente avant leur réception : il suffit
 * ensuite de renseigner `src` pour que la vraie image prenne la place du
 * remplissage, sans toucher au reste du code.
 */
export function MediaSlot({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: MediaSlotProps) {
  if (src) {
    return (
      <div className={cn("bg-surface relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={priority ? 85 : 75}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "from-brand-soft via-surface to-brand-soft relative overflow-hidden bg-linear-to-br",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:repeating-linear-gradient(115deg,var(--color-brand)_0_1px,transparent_1px_28px)] opacity-[0.13]"
      />
      {process.env.NODE_ENV === "development" ? (
        <span className="text-brand-dark/70 absolute inset-x-3 bottom-3 line-clamp-2 text-[0.68rem] leading-snug font-semibold">
          {alt}
        </span>
      ) : null}
    </div>
  );
}
