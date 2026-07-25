import { Icon } from "@/components/ui/Icon";
import { site, telHref, whatsappHref } from "@/lib/site";

/**
 * Barre d'action fixe en bas d'écran, sur mobile uniquement.
 *
 * Sur un site de service local, la majorité des visites vient du téléphone et
 * la conversion attendue est un appel. Garder l'action à portée de pouce en
 * permanence supprime l'effort de remontée vers l'en-tête.
 */
export function MobileCallBar() {
  return (
    <div className="border-line fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={telHref}
          className="bg-brand inline-flex h-12 items-center justify-center gap-2 rounded-lg text-[0.78rem] font-semibold tracking-[0.05em] text-white uppercase"
        >
          <Icon name="phone" className="size-4" />
          Appeler
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border-line text-ink-soft inline-flex h-12 items-center justify-center gap-2 rounded-lg border text-[0.78rem] font-semibold tracking-[0.05em] uppercase"
        >
          <Icon name="whatsapp" className="text-brand size-4" />
          WhatsApp
        </a>
      </div>
      <span className="sr-only">
        Contacter {site.name} au {site.contact.phoneDisplay}
      </span>
    </div>
  );
}
