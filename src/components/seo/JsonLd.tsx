import type { JsonLdObject } from "@/lib/schema";

type JsonLdProps = {
  data: JsonLdObject | readonly JsonLdObject[];
};

/**
 * Injecte des données structurées JSON-LD.
 *
 * `JSON.stringify` échappe déjà les guillemets ; on neutralise en plus la
 * séquence `</` afin qu'une valeur contenant `</script>` ne puisse pas clore la
 * balise prématurément.
 */
export function JsonLd({ data }: JsonLdProps) {
  const charge = Array.isArray(data) ? data : [data];

  return (
    <>
      {charge.map((bloc, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bloc).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
