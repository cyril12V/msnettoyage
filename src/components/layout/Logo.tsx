import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Adapte les couleurs du texte à un fond sombre. */
  inverted?: boolean;
  /** Rend le logo comme lien vers l'accueil. */
  asLink?: boolean;
};

/**
 * Marque MS Nettoyage.
 *
 * Le monogramme est dessiné en CSS plutôt qu'importé : le logo vectoriel
 * définitif n'a pas été fourni. Le remplacer consiste à substituer le bloc
 * `<span>` par un composant `<Image>` — aucune autre partie du site n'y touche.
 */
export function Logo({ className, inverted = false, asLink = true }: LogoProps) {
  const contenu = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl text-[1.05rem] font-extrabold tracking-tight",
          inverted ? "text-brand bg-white" : "bg-brand text-white",
        )}
      >
        MS
      </span>
      <span className="flex flex-col gap-0.5 leading-none">
        <span
          className={cn(
            "text-[0.95rem] font-extrabold tracking-[0.04em]",
            inverted ? "text-white" : "text-ink",
          )}
        >
          MS
        </span>
        <span
          className={cn(
            "text-[0.58rem] tracking-[0.22em] uppercase",
            inverted ? "text-white/70" : "text-muted-light",
          )}
        >
          Nettoyage
        </span>
      </span>
    </>
  );

  if (!asLink) {
    return <span className={cn("flex items-center gap-2.5", className)}>{contenu}</span>;
  }

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label={`${site.name} — retour à l'accueil`}
    >
      {contenu}
    </Link>
  );
}
