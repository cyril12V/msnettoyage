import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section } from "@/components/ui/Section";
import type { SectionEditoriale } from "@/data/landings";

type Props = {
  section: SectionEditoriale;
  tone: "white" | "surface";
};

/**
 * Section éditoriale d'une page de prestation.
 *
 * Le titre est un H2 formulé comme une question, chaque élément un H3 : c'est
 * la structure que Google et les moteurs génératifs découpent pour répondre à
 * une question précise. En format `etapes`, le numéro fait partie du H3, pas
 * seulement du décor, parce que « étape 2 » est ce que cherche un lecteur qui
 * veut savoir ce qui se passe après le devis.
 */
export function SectionEditorialeBloc({ section, tone }: Props) {
  const enEtapes = section.format === "etapes";

  return (
    <Section id={section.id} tone={tone}>
      <Container>
        <h2 className="text-ink text-2xl font-bold tracking-tight sm:text-3xl">{section.titre}</h2>
        <p className="text-muted mt-4 max-w-3xl leading-relaxed">{section.intro}</p>

        {enEtapes ? (
          <ol className="mt-10 flex flex-col gap-4">
            {section.elements.map((element, index) => (
              <li
                key={element.titre}
                className="border-line flex gap-5 rounded-xl border bg-white p-6 sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="bg-brand inline-flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-ink text-lg font-semibold">
                    Étape {index + 1} : {element.titre}
                  </h3>
                  <p className="text-muted mt-2 text-[0.95rem] leading-relaxed">{element.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {section.elements.map((element) => (
              <div key={element.titre} className="border-line rounded-xl border bg-white p-6">
                <h3 className="text-ink flex items-start gap-2.5 text-lg font-semibold">
                  <Icon name="checkCircle" className="text-brand mt-1 size-5 shrink-0" />
                  {element.titre}
                </h3>
                <p className="text-muted mt-3 text-[0.95rem] leading-relaxed">{element.texte}</p>
              </div>
            ))}
          </div>
        )}

        {section.photos ? (
          <figure className="mt-10">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {section.photos.images.map((image) => (
                <li key={image.src}>
                  <MediaSlot
                    src={image.src}
                    alt={image.alt}
                    className="aspect-9/16 rounded-xl"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </li>
              ))}
            </ul>
            <figcaption className="text-muted mt-4 text-sm leading-relaxed">
              {section.photos.legende}
            </figcaption>
          </figure>
        ) : null}
      </Container>
    </Section>
  );
}
