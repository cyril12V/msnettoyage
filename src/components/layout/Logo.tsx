import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hauteur de rendu en pixels. Le ratio du fichier source est conservé. */
  height?: number;
  /** Charge le logo en priorité — à activer uniquement dans l'en-tête. */
  priority?: boolean;
  /** Rend le logo comme lien vers l'accueil. */
  asLink?: boolean;
};

/** Ratio du fichier `public/logo-ms-nettoyage.png` (546 × 271). */
const RATIO = 546 / 271;

export function Logo({ className, height = 44, priority = false, asLink = true }: LogoProps) {
  const image = (
    <Image
      src="/logo-ms-nettoyage.png"
      alt={`${site.name} — nettoyage professionnel en Île-de-France`}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className="h-auto w-auto"
      style={{ height }}
    />
  );

  if (!asLink) {
    return <span className={cn("inline-flex items-center", className)}>{image}</span>;
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${site.name} — retour à l'accueil`}
    >
      {image}
    </Link>
  );
}
