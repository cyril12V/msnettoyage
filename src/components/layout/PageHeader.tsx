import type { ReactNode } from "react";
import { Breadcrumbs, type Fil } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  /** Paragraphe d'introduction — une définition autonome, citable hors contexte. */
  lede?: ReactNode;
  breadcrumbs: readonly Fil[];
  children?: ReactNode;
};

/** En-tête commun aux pages intérieures : fil d'Ariane, H1 et chapô. */
export function PageHeader({ eyebrow, title, lede, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="border-line-soft bg-surface border-b">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={breadcrumbs} />

        {eyebrow ? (
          <p className="text-brand mt-6 text-xs font-bold tracking-[0.16em] uppercase">{eyebrow}</p>
        ) : null}

        <h1 className="text-ink mt-3 max-w-3xl text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {lede ? (
          <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">{lede}</p>
        ) : null}

        {children ? <div className="mt-7">{children}</div> : null}
      </Container>
    </section>
  );
}
