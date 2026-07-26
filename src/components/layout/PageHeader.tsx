import type { ReactNode } from "react";
import { Breadcrumbs, type Fil } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  title: string;
  /** Paragraphe d'introduction, une définition autonome citable hors contexte. */
  lede?: ReactNode;
  breadcrumbs: readonly Fil[];
  children?: ReactNode;
};

/** En-tête commun aux pages autonomes : fil d'Ariane, titre et chapô. */
export function PageHeader({ title, lede, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="border-b border-line-soft bg-surface">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mt-6 max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {lede ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
        ) : null}

        {children ? <div className="mt-7">{children}</div> : null}
      </Container>
    </section>
  );
}
